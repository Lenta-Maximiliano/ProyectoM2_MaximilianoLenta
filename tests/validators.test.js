import { describe, test, expect } from "vitest";
import {
  validarEmail,
  validarNombre,
  validarTitulo,
  validarContenido,
  validarAuthorId,
} from "../src/utils/validators.js";

describe("validarEmail", () => {
  test("acepta un email válido", () => {
    expect(validarEmail("test@example.com")).toBe(null);
  });

  test("rechaza un email sin @", () => {
    expect(validarEmail("testexample.com")).toContain("inválido");
  });

  test("rechaza un email vacío", () => {
    expect(validarEmail("")).toContain("requerido");
  });

  test("rechaza un email null", () => {
    expect(validarEmail(null)).toContain("requerido");
  });

  test("rechaza un email sin dominio", () => {
    expect(validarEmail("test@")).toContain("inválido");
  });
});

describe("validarNombre", () => {
  test("acepta un nombre válido", () => {
    expect(validarNombre("Juan Pérez")).toBe(null);
  });

  test("rechaza un nombre undefined", () => {
    expect(validarNombre(undefined)).toContain("requerido");
  });

  test("rechaza un nombre vacío", () => {
    expect(validarNombre("")).toContain("vacío");
  });

  test("rechaza un nombre con espacios", () => {
    expect(validarNombre("   ")).toContain("vacío");
  });

  test("rechaza un nombre de un carácter", () => {
    expect(validarNombre("J")).toContain("entre 2 y 100");
  });

  test("rechaza un nombre que no es texto", () => {
    expect(validarNombre(123)).toContain("texto");
  });
});

describe("validarTitulo", () => {
  test("acepta un título válido", () => {
    expect(validarTitulo("Introducción a Node.js")).toBe(null);
  });

  test("rechaza un título vacío", () => {
    expect(validarTitulo("")).toContain("requerido");
  });

  test("rechaza un título con espacios", () => {
    expect(validarTitulo("   ")).toContain("requerido");
  });

  test("rechaza un título que no es texto", () => {
    expect(validarTitulo(123)).toContain("requerido");
  });

  test("rechaza un título de más de 200 caracteres", () => {
    const tituloLargo = "A".repeat(201);
    expect(validarTitulo(tituloLargo)).toContain("200 caracteres");
  });
});

describe("validarContenido", () => {
  test("acepta un contenido válido", () => {
    expect(validarContenido("Node.js permite ejecutar JavaScript fuera del navegador.")).toBe(null);
  });

  test("rechaza un contenido vacío", () => {
    expect(validarContenido("")).toContain("requerido");
  });

  test("rechaza un contenido con espacios", () => {
    expect(validarContenido("   ")).toContain("requerido");
  });

  test("rechaza un contenido que no es texto", () => {
    expect(validarContenido(123)).toContain("requerido");
  });
});

describe("validarAuthorId", () => {
  test("acepta un ID de autor válido", () => {
    expect(validarAuthorId(2)).toBe(null);
  });

  test("rechaza un ID vacío", () => {
    expect(validarAuthorId("")).toContain("entero positivo");
  });

  test("rechaza un ID igual a cero", () => {
    expect(validarAuthorId(0)).toContain("entero positivo");
  });

  test("rechaza un ID negativo", () => {
    expect(validarAuthorId(-5)).toContain("entero positivo");
  });

  test("rechaza un ID que no es numérico", () => {
    expect(validarAuthorId("abc")).toContain("entero positivo");
  });

  test("rechaza un ID decimal", () => {
    expect(validarAuthorId(2.5)).toContain("entero positivo");
  });
});