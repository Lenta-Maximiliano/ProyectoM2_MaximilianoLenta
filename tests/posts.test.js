import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("GET /posts", () => {
  test("devuelve una lista de publicaciones", async () => {
    const response = await request(app).get("/posts");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /posts/:id", () => {
  test("devuelve una publicación por su ID", async () => {
    const postsResponse = await request(app).get("/posts");

    const postId = postsResponse.body[0].id;

    const response = await request(app).get(`/posts/${postId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(postId);
    expect(response.body).toHaveProperty("title");
  });
});

describe("GET /posts/:id - errores", () => {
  test("devuelve 404 si la publicación no existe", async () => {
    const response = await request(app).get("/posts/999999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});

describe("GET /posts/author/:authorId", () => {
  test("devuelve las publicaciones de un autor con sus datos", async () => {
    const postsResponse = await request(app).get("/posts");

    const authorId = postsResponse.body[0].author_id;

    const response = await request(app).get(`/posts/author/${authorId}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach((post) => {
      expect(post.author_id).toBe(authorId);
      expect(post.author_name).toBeDefined();
      expect(post.author_email).toBeDefined();
      expect(post.author_bio).toBeDefined();
    });
  });
});

describe("POST /posts", () => {
  test("crea una nueva publicación", async () => {
    const authorsResponse = await request(app).get("/authors");
    const authorId = authorsResponse.body[0].id;

    const newPost = {
      title: "Publicación de prueba",
      content: "Contenido de prueba para el MiniBlog",
      author_id: authorId,
      published: false,
    };

    const response = await request(app).post("/posts").send(newPost);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(newPost.title);
    expect(response.body.author_id).toBe(authorId);
  });

  test("devuelve 400 si el título está vacío", async () => {
    const authorsResponse = await request(app).get("/authors");
    const authorId = authorsResponse.body[0].id;

    const newPost = {
      title: "   ",
      content: "Contenido de prueba",
      author_id: authorId,
      published: false,
    };

    const response = await request(app).post("/posts").send(newPost);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("devuelve 400 si el contenido está vacío", async () => {
    const authorsResponse = await request(app).get("/authors");
    const authorId = authorsResponse.body[0].id;

    const newPost = {
      title: "Título de prueba",
      content: "   ",
      author_id: authorId,
      published: false,
    };

    const response = await request(app).post("/posts").send(newPost);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("devuelve 400 si el autor no existe", async () => {
    const newPost = {
      title: "Publicación de prueba",
      content: "Contenido de prueba",
      author_id: 999999,
      published: false,
    };

    const response = await request(app).post("/posts").send(newPost);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("PUT /posts/:id", () => {
  test("actualiza una publicación existente", async () => {
    const authorsResponse = await request(app).get("/authors");
    const authorId = authorsResponse.body[0].id;

    const newPost = {
      title: "Publicación original",
      content: "Contenido original",
      author_id: authorId,
      published: false,
    };

    const createdPost = await request(app).post("/posts").send(newPost);

    const updatedData = {
      title: "Publicación actualizada",
      content: "Contenido actualizado",
      author_id: authorId,
      published: true,
    };

    const response = await request(app)
      .put(`/posts/${createdPost.body.id}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.content).toBe(updatedData.content);
    expect(response.body.published).toBe(true);
  });

  test("devuelve 404 si la publicación no existe", async () => {
    const authorsResponse = await request(app).get("/authors");
    const authorId = authorsResponse.body[0].id;

    const updatedData = {
      title: "Publicación actualizada",
      content: "Contenido actualizado",
      author_id: authorId,
      published: true,
    };

    const response = await request(app).put("/posts/999999").send(updatedData);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});

describe("DELETE /posts/:id", () => {
  test("elimina una publicación existente", async () => {
    const authorsResponse = await request(app).get("/authors");
    const authorId = authorsResponse.body[0].id;

    const newPost = {
      title: "Publicación para eliminar",
      content: "Contenido creado para probar DELETE",
      author_id: authorId,
      published: false,
    };

    const createdPost = await request(app).post("/posts").send(newPost);

    const postId = createdPost.body.id;

    const response = await request(app).delete(`/posts/${postId}`);

    expect(response.statusCode).toBe(204);
  });

  test("devuelve 404 si la publicación no existe", async () => {
    const response = await request(app).delete("/posts/999999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
