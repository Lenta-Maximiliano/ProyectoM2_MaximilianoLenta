import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("GET /authors", () => {
  test("devuelve una lista de autores", async () => {
    const response = await request(app).get("/authors");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /authors/:id", () => {
  test("devuelve un autor por su ID", async () => {
    const authorsResponse = await request(app).get("/authors");

    const authorId = authorsResponse.body[0].id;

    const response = await request(app).get(`/authors/${authorId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(authorId);
    expect(response.body).toHaveProperty("name");
  });
});

describe("GET /authors/:id - errores", () => {
  test("devuelve 404 si el autor no existe", async () => {
    const response = await request(app).get("/authors/999999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});

describe("POST /authors", () => {
  test("crea un nuevo autor", async () => {
    const newAuthor = {
      name: "Autor de prueba",
      email: `prueba-${Date.now()}@example.com`,
      bio: "Autor creado durante las pruebas",
    };

    const response = await request(app).post("/authors").send(newAuthor);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newAuthor.name);
    expect(response.body.email).toBe(newAuthor.email);
  });

  test("devuelve 400 si el nombre está vacío", async () => {
    const newAuthor = {
      name: "   ",
      email: `prueba-${Date.now()}@example.com`,
      bio: "Autor de prueba",
    };

    const response = await request(app).post("/authors").send(newAuthor);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("devuelve 409 si el email ya está registrado", async () => {
    const email = `duplicado-${Date.now()}@example.com`;

    const newAuthor = {
      name: "Autor de prueba",
      email,
      bio: "Autor de prueba",
    };

    await request(app).post("/authors").send(newAuthor);

    const response = await request(app).post("/authors").send(newAuthor);

    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty("error");
  });
});

describe("PUT /authors/:id", () => {
  test("actualiza un autor existente", async () => {
    const newAuthor = {
      name: "Autor original",
      email: `original-${Date.now()}@example.com`,
      bio: "Biografía original",
    };

    const createdAuthor = await request(app).post("/authors").send(newAuthor);

    const updatedData = {
      name: "Autor actualizado",
      email: `actualizado-${Date.now()}@example.com`,
      bio: "Biografía actualizada",
    };

    const response = await request(app)
      .put(`/authors/${createdAuthor.body.id}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.email).toBe(updatedData.email);
  });

  test("devuelve 404 si el autor no existe", async () => {
    const updatedData = {
      name: "Autor actualizado",
      email: `inexistente-${Date.now()}@example.com`,
      bio: "Biografía actualizada",
    };

    const response = await request(app)
      .put("/authors/999999")
      .send(updatedData);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});

describe("DELETE /authors/:id", () => {
  test("elimina un autor existente", async () => {
    const newAuthor = {
      name: "Autor para eliminar",
      email: `eliminar-${Date.now()}@example.com`,
      bio: "Autor creado para probar DELETE",
    };

    const createdAuthor = await request(app).post("/authors").send(newAuthor);

    const authorId = createdAuthor.body.id;

    const response = await request(app).delete(`/authors/${authorId}`);

    expect(response.statusCode).toBe(204);
  });

  test("devuelve 404 si el autor no existe", async () => {
    const response = await request(app).delete("/authors/999999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
