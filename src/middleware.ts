import { Elysia, t } from "elysia"
import { openapi } from "@elysiajs/openapi"

const app = new Elysia()
.use(openapi())

// =======================
// PRAKTIKUM 5 - beforeHandle
// =======================
.get(
  "/admin",
  () => {
    return {
      stats: 99
    }
  },
  {
    beforeHandle({ headers, set }) {

      if (headers.authorization !== "Bearer 123") {

        set.status = 401

        return {
          success: false,
          message: "Unauthorized"
        }

      }

    }
  }
)


// =======================
// PRAKTIKUM 6 - afterHandle
// =======================

// afterHandle GLOBAL
.onAfterHandle(({ response }) => {
  return {
    success: true,
    message: "data tersedia",
    data: response
  }
})

.get("/product", () => {
  return {
    id: 1,
    name: "Laptop"
  }
})


// =======================
// PRAKTIKUM 7 - onError
// =======================
.post(
  "/login",
  ({ body }) => {
    return {
      message: "Login success"
    }
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 8 })
    })
  }
)

.onError(({ code, set }) => {

  if (code === "VALIDATION") {

    set.status = 400

    return {
      success: false,
      error: "Validation Error"
    }

  }

})

.listen(3000)

console.log("Server running at http://localhost:3000")