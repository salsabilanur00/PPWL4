import { Elysia, t } from "elysia"
import { openapi } from "@elysiajs/openapi"

const app = new Elysia()

  // =========================
  // OPENAPI
  // =========================
  .use(
    openapi({
      path: "/openapi"
    })
  )

  // =========================
  // PRAKTIKUM 1
  // VALIDASI RESPONSE
  // =========================
  .get(
    "/ping",
    () => ({
      success: true,
      message: "Server OK"
    }),
    {
      response: t.Object({
        success: t.Boolean(),
        message: t.String()
      })
    }
  )

  // =========================
  // VALIDASI PARAMS
  // =========================
  .get(
    "/user/:id",
    ({ params }) => ({
      userId: params.id
    }),
    {
      params: t.Object({
        id: t.Number()
      }),
      response: t.Object({
        userId: t.Number()
      })
    }
  )

  // =========================
  // VALIDASI QUERY
  // =========================
  .get(
    "/search",
    ({ query }) => ({
      keyword: query.keyword,
      page: query.page ?? 1
    }),
    {
      query: t.Object({
        keyword: t.String(),
        page: t.Optional(t.Number())
      }),
      response: t.Object({
        keyword: t.String(),
        page: t.Number()
      })
    }
  )

  // =========================
  // PRAKTIKUM 2
  // PARAMS + QUERY
  // =========================
  .get(
    "/products/:id",
    ({ params, query }) => ({
      productId: params.id,
      sort: query.sort ?? "asc"
    }),
    {
      params: t.Object({
        id: t.Number()
      }),
      query: t.Object({
        sort: t.Optional(
          t.Union([t.Literal("asc"), t.Literal("desc")])
        )
      }),
      response: t.Object({
        productId: t.Number(),
        sort: t.String()
      })
    }
  )

  // =========================
  // PRAKTIKUM 3
  // VALIDASI RESPONSE
  // =========================
  .get(
    "/stats",
    () => ({
      total: 120,
      active: 85
    }),
    {
      response: t.Object({
        total: t.Number(),
        active: t.Number()
      })
    }
  )

  // =========================
  // PRAKTIKUM 4
  // VALIDASI REQUEST BODY
  // =========================
  .post(
    "/request",
    ({ body }) => ({
      message: "Success",
      data: body
    }),
    {
      body: t.Object({
        name: t.String({ minLength: 3 }),
        email: t.String({ format: "email" }),
        age: t.Number({ minimum: 18 })
      }),
      response: t.Object({
        message: t.String(),
        data: t.Object({
          name: t.String(),
          email: t.String(),
          age: t.Number()
        })
      })
    }
  )

  // =========================
  // PRAKTIKUM 5
  // QUERY VALIDATION
  // =========================
  .get(
    "/users",
    ({ query }) => ({
      limit: query.limit,
      active: query.active
    }),
    {
      query: t.Object({
        limit: t.Number(),
        active: t.Boolean()
      }),
      response: t.Object({
        limit: t.Number(),
        active: t.Boolean()
      })
    }
  )

  .listen(3000)

console.log("🦊 Elysia running at http://localhost:3000")