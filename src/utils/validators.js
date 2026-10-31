export function validarEmail(email) {
  if (email === undefined || email === null) {
    return "El email es requerido";
  }

  if (typeof email !== "string") {
    return "El email debe ser un texto";
  }

  if (!email.trim()) {
    return "El email es requerido";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    return "El formato del email es inválido";
  }

  return null;
}

export function validarNombre(nombre) {
  if (nombre === undefined || nombre === null) {
    return "El nombre es requerido";
  }

  if (typeof nombre !== "string") {
    return "El nombre debe ser un texto";
  }

  if (nombre.trim().length === 0) {
    return "El nombre no puede estar vacío";
  }

  if (nombre.trim().length < 2 || nombre.trim().length > 100) {
    return "El nombre debe tener entre 2 y 100 caracteres";
  }

  return null;
}

export function validarTitulo(title) {
  if (typeof title !== "string" || !title.trim()) {
    return "El título es requerido";
  }

  if (title.trim().length > 200) {
    return "El título no puede superar los 200 caracteres";
  }

  return null;
}

export function validarContenido(content) {
  if (typeof content !== "string" || !content.trim()) {
    return "El contenido es requerido";
  }

  return null;
}

export function validarAuthorId(authorId) {
  if (
    authorId === undefined ||
    authorId === null ||
    authorId === "" ||
    !Number.isInteger(Number(authorId)) ||
    Number(authorId) <= 0
  ) {
    return "El ID del autor debe ser un número entero positivo";
  }

  return null;
}
