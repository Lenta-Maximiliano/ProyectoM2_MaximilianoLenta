# MiniBlog API REST

## Contexto del proyecto

**MiniBlog** es una API REST desarrollada para administrar autores y publicaciones de un sistema de blog. Permite realizar operaciones de creación, consulta, actualización y eliminación de registros, manteniendo la relación entre autores y sus publicaciones.

Este proyecto fue desarrollado como parte del **Módulo 2 - Backend y APIs de Soy Henry**, utilizando Node.js, Express y PostgreSQL.

La API permite gestionar autores y publicaciones mediante diferentes endpoints HTTP, validar los datos recibidos, manejar errores y consultar la información almacenada en una base de datos relacional.

## 📑 Índice

- [🚀 Demo en vivo](#-demo-en-vivo)
- [🚀 Funcionalidades](#-funcionalidades)
  - [Autores](#autores)
  - [Publicaciones](#publicaciones)
  - [Validaciones y manejo de errores](#validaciones-y-manejo-de-errores)
- [🛠️ Tecnologías utilizadas](#️-tecnologías-utilizadas)
- [📁 Estructura del proyecto](#-estructura-del-proyecto)
- [📥 Instalación y ejecución local](#-instalación-y-ejecución-local)
- [🗄️ Configuración de la base de datos](#️-configuración-de-la-base-de-datos)
- [⚙️ Variables de entorno](#️-variables-de-entorno)
- [📖 Endpoints disponibles](#-endpoints-disponibles)
  - [Autores](#endpoints-de-autores)
  - [Publicaciones](#endpoints-de-publicaciones)
- [🧪 Tests](#-tests)
- [📚 Documentación de la API](#-documentación-de-la-api)
- [💡 Decisiones técnicas](#-decisiones-técnicas)
  - [Arquitectura](#arquitectura)
  - [Base de datos](#base-de-datos)
  - [Validaciones](#validaciones)
  - [Manejo de errores](#manejo-de-errores)
- [🌐 Despliegue](#-despliegue)
- [🤖 Uso de inteligencia artificial](#-uso-de-inteligencia-artificial)
- [👨‍💻 Autor](#-autor)

## 🚀 Demo en vivo

La API se encuentra desplegada en **Render** y puede consultarse públicamente.

- **API REST:** [https://proyectom2-maximilianolenta.onrender.com/](https://proyectom2-maximilianolenta.onrender.com/)
- **Documentación interactiva (Swagger UI):** [https://proyectom2-maximilianolenta.onrender.com/api-docs](https://proyectom2-maximilianolenta.onrender.com/api-docs)
- **Health check:** [https://proyectom2-maximilianolenta.onrender.com/health](https://proyectom2-maximilianolenta.onrender.com/health)

La documentación interactiva permite consultar los endpoints, visualizar los esquemas de datos y realizar solicitudes de prueba directamente desde el navegador.

## 🚀 Funcionalidades

### Autores

La API permite realizar las siguientes operaciones sobre los autores:

- Obtener todos los autores registrados.
- Consultar un autor mediante su ID.
- Crear nuevos autores.
- Actualizar los datos de un autor existente.
- Eliminar autores.

Cada autor cuenta con los siguientes campos:

- `id`: identificador único.
- `name`: nombre del autor.
- `email`: dirección de correo electrónico única.
- `bio`: biografía del autor.
- `created_at`: fecha de creación del registro.

### Publicaciones

La API permite gestionar publicaciones asociadas a los autores:

- Obtener todas las publicaciones.
- Consultar una publicación mediante su ID.
- Obtener las publicaciones de un autor determinado, incluyendo los datos del autor.
- Crear nuevas publicaciones.
- Actualizar publicaciones existentes.
- Eliminar publicaciones.

Cada publicación cuenta con los siguientes campos:

- `id`: identificador único.
- `author_id`: identificador del autor asociado.
- `title`: título de la publicación.
- `content`: contenido de la publicación.
- `published`: estado de publicación.
- `created_at`: fecha de creación del registro.

### Validaciones y manejo de errores

Se implementaron validaciones para controlar los datos recibidos en las solicitudes:

- El nombre del autor es obligatorio y debe tener entre 2 y 100 caracteres.
- El email es obligatorio y debe tener un formato válido.
- No se permiten emails duplicados.
- El título de una publicación es obligatorio y no puede superar los 200 caracteres.
- El contenido de una publicación es obligatorio.
- El ID del autor debe ser un número entero positivo.
- El autor asociado a una publicación debe existir.
- El estado de publicación debe ser un valor booleano cuando se envía.

La API utiliza códigos de estado HTTP para informar el resultado de las operaciones:

| Código | Descripción |
|---|---|
| 200 | Solicitud procesada correctamente. |
| 201 | Recurso creado correctamente. |
| 204 | Recurso eliminado correctamente. |
| 400 | Solicitud incorrecta o datos inválidos. |
| 404 | Recurso no encontrado. |
| 409 | Conflicto por email duplicado. |
| 500 | Error interno del servidor. |

## 🛠️ Tecnologías utilizadas

- Node.js
- JavaScript (ES Modules)
- Express
- PostgreSQL
- node-postgres (`pg`)
- dotenv
- Vitest
- Supertest
- Swagger UI
- OpenAPI
- YAML
- Git
- GitHub
- Render

El proyecto fue desarrollado utilizando **JavaScript con módulos ES (ES Modules)**, separando las responsabilidades de las diferentes partes de la aplicación.

Para interactuar con PostgreSQL se utiliza `pg`, mediante consultas SQL parametrizadas, sin incorporar un ORM.


## 📁 Estructura del proyecto

```text
ProyectoM2_MaximilianoLenta/
├── src/
│   ├── controllers/
│   │   ├── authorsController.js
│   │   └── postsController.js
│   ├── db/
│   │   ├── config.js
│   │   ├── setup.sql
│   │   └── seed.sql
│   ├── docs/
│   │   └── openapi.yaml
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── indexRouter.js
│   │   ├── authorsRouter.js
│   │   └── postsRouter.js
│   ├── services/
│   │   ├── authorsService.js
│   │   └── postsService.js
│   ├── utils/
│   │   ├── error.js
│   │   └── validators.js
│   ├── app.js
│   └── index.js
├── tests/
│   ├── authors.test.js
│   ├── posts.test.js
│   └── validators.test.js
├── documentacion/
│   ├── capturas/
│   └── ia/
│       ├── capturas/
│       └── README.md
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

El archivo `.env` se crea localmente y está excluido del repositorio mediante `.gitignore`.

## 📥 Instalación y ejecución local

Para ejecutar el proyecto localmente es necesario tener instalado:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### 1. Clonar el repositorio

```bash
git clone https://github.com/Lenta-Maximiliano/ProyectoM2_MaximilianoLenta.git
```

### 2. Ingresar al directorio del proyecto

```bash
cd ProyectoM2_MaximilianoLenta
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto, tomando como referencia el archivo `.env.example`.

Completar los valores correspondientes a la configuración local de PostgreSQL.

Los detalles se encuentran en la sección [Variables de entorno](#️-variables-de-entorno).

### 5. Configurar la base de datos

Crear la base de datos y ejecutar los scripts SQL incluidos en `src/db/`.

Los pasos detallados se encuentran en la sección [Configuración de la base de datos](#️-configuración-de-la-base-de-datos).

### 6. Iniciar el servidor

Para iniciar el servidor en modo normal:

```bash
npm start
```

Para iniciar el servidor en modo desarrollo, utilizando la opción `--watch` de Node.js:

```bash
npm run dev
```

Una vez iniciado, el servidor estará disponible localmente en:

```text
http://localhost:3000
```

La API puede probarse utilizando herramientas como Postman. La documentación interactiva también estará disponible en `http://localhost:3000/api-docs`.

## 🗄️ Configuración de la base de datos

El proyecto utiliza PostgreSQL como sistema de gestión de base de datos relacional.

La base de datos contiene dos tablas principales: `authors` y `posts`.

### Tabla `authors`

Almacena la información de los autores.

| Campo | Tipo | Descripción |
|---|---|---|
| id | SERIAL | Clave primaria. |
| name | VARCHAR(100) | Nombre del autor. |
| email | VARCHAR(150) | Email único del autor. |
| bio | TEXT | Biografía del autor. |
| created_at | TIMESTAMPTZ | Fecha de creación. |

### Tabla `posts`

Almacena las publicaciones asociadas a los autores.

| Campo | Tipo | Descripción |
|---|---|---|
| id | SERIAL | Clave primaria. |
| title | VARCHAR(200) | Título de la publicación. |
| content | TEXT | Contenido de la publicación. |
| author_id | INTEGER | Clave foránea relacionada con `authors.id`. |
| published | BOOLEAN | Estado de publicación. |
| created_at | TIMESTAMPTZ | Fecha de creación. |

La relación entre ambas tablas se establece mediante `author_id`, que referencia a `authors.id`.

Se utiliza la restricción `ON DELETE CASCADE`, por lo que al eliminar un autor también se eliminan sus publicaciones asociadas.

### Crear y preparar la base de datos

1. Crear una base de datos en PostgreSQL:

```sql
CREATE DATABASE miniblog;
```

2. Conectarse a la base de datos creada.

3. Ejecutar el archivo `src/db/setup.sql` para crear las tablas:

```bash
psql -U postgres -d miniblog -f src/db/setup.sql
```

4. Ejecutar el archivo `src/db/seed.sql` para insertar los datos iniciales de prueba:

```bash
psql -U postgres -d miniblog -f src/db/seed.sql
```

Los scripts SQL se encuentran dentro de la carpeta `src/db/`.

**Importante:** los scripts de creación y carga inicial están destinados a preparar una base de datos nueva. No deben ejecutarse nuevamente sobre una base que ya contiene las tablas y los registros del proyecto sin revisar previamente sus instrucciones.

## ⚙️ Variables de entorno

El proyecto utiliza variables de entorno para configurar el servidor y establecer la conexión con PostgreSQL.

El archivo `.env.example` contiene la estructura de referencia:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog
DB_USER=postgres
DB_PASSWORD=tu_contraseña

DATABASE_URL=
```

Los valores deben adaptarse a la configuración de cada entorno.

La aplicación contempla dos formas de conexión:

- **Entorno local:** utiliza las variables `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` y `DB_PASSWORD`.
- **Entorno de producción (Render):** utiliza `DATABASE_URL`, proporcionada por la base de datos PostgreSQL de Render.

El archivo `.env` contiene información de configuración privada y no debe subirse al repositorio.

Para compartir la estructura de configuración se utiliza `.env.example`, sin incluir credenciales reales.

## 📖 Endpoints disponibles

La API expone los siguientes endpoints.

Las rutas se encuentran organizadas bajo los recursos `/authors` y `/posts`.

### Endpoints de autores

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/authors` | Obtener todos los autores. |
| GET | `/authors/:id` | Obtener un autor por ID. |
| POST | `/authors` | Crear un nuevo autor. |
| PUT | `/authors/:id` | Actualizar un autor. |
| DELETE | `/authors/:id` | Eliminar un autor. |

### Endpoints de publicaciones

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/posts` | Obtener todas las publicaciones. |
| GET | `/posts/:id` | Obtener una publicación por ID. |
| GET | `/posts/author/:authorId` | Obtener las publicaciones de un autor con sus datos. |
| POST | `/posts` | Crear una nueva publicación. |
| PUT | `/posts/:id` | Actualizar una publicación. |
| DELETE | `/posts/:id` | Eliminar una publicación. |

### Ejemplos de solicitudes

**Crear un autor — POST `/authors`**

```json
{
  "name": "Ana García",
  "email": "ana@example.com",
  "bio": "Desarrolladora full-stack."
}
```

**Crear una publicación — POST `/posts`**

```json
{
  "title": "Introducción a Node.js",
  "content": "Node.js es un entorno de ejecución de JavaScript.",
  "author_id": 1,
  "published": true
}
```

**Consultar publicaciones por autor — GET `/posts/author/1`**

Este endpoint devuelve las publicaciones asociadas al autor indicado, incluyendo los datos del autor obtenidos mediante una consulta SQL con `INNER JOIN`.

## 🧪 Tests

El proyecto utiliza **Vitest** como herramienta de pruebas y **Supertest** para realizar solicitudes HTTP a la aplicación Express.

Se desarrollaron **48 pruebas automatizadas** distribuidas en tres archivos:

- `validators.test.js`: pruebas de los validadores.
- `authors.test.js`: pruebas de los endpoints de autores.
- `posts.test.js`: pruebas de los endpoints de publicaciones.

Las pruebas permiten verificar:

- El funcionamiento de los validadores.
- Las respuestas correctas de la API.
- Las validaciones de datos.
- El manejo de recursos inexistentes.
- Los errores relacionados con restricciones de la base de datos.
- El comportamiento de las operaciones CRUD.

### Ejecutar los tests

Para ejecutar todas las pruebas:

```bash
npm test
```

Para ejecutar únicamente las pruebas de autores:

```bash
npx vitest run tests/authors.test.js
```

Para ejecutar únicamente las pruebas de publicaciones:

```bash
npx vitest run tests/posts.test.js
```

Para ejecutar únicamente las pruebas de validadores:

```bash
npx vitest run tests/validators.test.js
```

Las pruebas de integración utilizan la configuración de base de datos definida mediante las variables de entorno.

**Importante:** ejecutar las pruebas con una base de datos local preparada para testing. No ejecutar pruebas que modifiquen registros sobre una base de producción.

## 📚 Documentación de la API

La documentación de la API fue desarrollada utilizando el estándar **OpenAPI** y se encuentra definida en:

```text
src/docs/openapi.yaml
```

Para visualizar la documentación de manera interactiva se utiliza **Swagger UI**.

Con el servidor en ejecución, acceder a:

```text
http://localhost:3000/api-docs
```

También se encuentra disponible públicamente en:

[https://proyectom2-maximilianolenta.onrender.com/api-docs](https://proyectom2-maximilianolenta.onrender.com/api-docs)

Desde Swagger UI es posible consultar los endpoints disponibles, visualizar los parámetros y esquemas de datos, conocer las respuestas HTTP y realizar solicitudes de prueba.

## 💡 Decisiones técnicas

### Arquitectura

Se organizó el proyecto separando las responsabilidades en diferentes carpetas:

- **Routes:** definen los endpoints y conectan las solicitudes con sus controladores.
- **Controllers:** reciben las solicitudes HTTP, ejecutan las validaciones y gestionan las respuestas.
- **Services:** contienen la lógica de acceso a la base de datos.
- **Middlewares:** permiten centralizar el manejo de errores.
- **Utils:** agrupan funciones auxiliares, validaciones y creación de errores.
- **DB:** contiene la configuración de conexión y los scripts SQL.
- **Docs:** contiene la documentación OpenAPI.

Esta organización permite mantener el código ordenado y facilita su mantenimiento.

### Base de datos

Se utilizó PostgreSQL para almacenar la información de autores y publicaciones.

La conexión se realiza mediante la librería `pg`, utilizando un pool de conexiones.

Las consultas SQL se ejecutan mediante parámetros para evitar concatenar directamente los datos recibidos en las solicitudes.

También se implementó una relación mediante clave foránea entre las tablas `authors` y `posts`.

### Validaciones

Se desarrollaron funciones independientes para validar los datos recibidos por los endpoints.

Estas funciones se encuentran en `src/utils/validators.js` y permiten reutilizar las mismas reglas en diferentes operaciones.

### Manejo de errores

Se implementó un middleware global para centralizar el tratamiento de errores de la aplicación.

Los errores se generan mediante funciones auxiliares y se envían al middleware utilizando `next(error)`.

De esta manera, los controladores pueden delegar el manejo de errores y mantener una estructura uniforme en las respuestas de la API.

### Configuración de la aplicación

Se separó la configuración de Express del inicio del servidor.

- `app.js`: configura Express, los middlewares, las rutas y Swagger UI.
- `index.js`: inicia el servidor y establece el puerto de escucha.

Esta separación permite reutilizar la aplicación en las pruebas automatizadas sin iniciar un servidor independiente.

## 🌐 Despliegue

El proyecto se encuentra desplegado en **Render**, utilizando un servicio web para ejecutar la API y una instancia de PostgreSQL para almacenar la información.

### Configuración del despliegue

Para realizar el despliegue se utilizaron los siguientes pasos:

1. Subir el repositorio a GitHub.
2. Crear una instancia de PostgreSQL en Render.
3. Crear un servicio Web Service a partir del repositorio de GitHub.
4. Configurar las variables de entorno necesarias para la conexión con PostgreSQL.
5. Utilizar `npm install` como comando de instalación de dependencias.
6. Utilizar `npm start` como comando de inicio del servidor.
7. Configurar `DATABASE_URL` con la URL de conexión interna de PostgreSQL proporcionada por Render.
8. Ejecutar los scripts SQL de creación y carga inicial en la base de datos.
9. Verificar el funcionamiento de la API y generar el dominio público.

### Verificación del despliegue

Una vez publicado el proyecto, se puede comprobar su funcionamiento mediante:

- **Health check:** `/health`
- **Documentación Swagger:** `/api-docs`
- **Autores:** `/authors`
- **Publicaciones:** `/posts`

### Enlaces del proyecto

- **Repositorio GitHub:** [ProyectoM2_MaximilianoLenta](https://github.com/Lenta-Maximiliano/ProyectoM2_MaximilianoLenta)
- **API pública:** [proyectom2-maximilianolenta.onrender.com](https://proyectom2-maximilianolenta.onrender.com/)
- **Documentación Swagger:** [Swagger UI](https://proyectom2-maximilianolenta.onrender.com/api-docs)
- **Health check:** [Estado de la API](https://proyectom2-maximilianolenta.onrender.com/health)

## 🤖 Uso de inteligencia artificial

Durante el desarrollo del proyecto se utilizó inteligencia artificial como herramienta de apoyo para:

- Resolver dudas conceptuales sobre Node.js, Express y PostgreSQL.
- Comprender el funcionamiento de las consultas SQL.
- Analizar y revisar fragmentos de código.
- Recibir orientación sobre la organización y separación de responsabilidades.
- Revisar validaciones y manejo de errores.
- Desarrollar y comprender pruebas automatizadas.
- Revisar la documentación OpenAPI.
- Identificar posibles mejoras y buenas prácticas.

La inteligencia artificial se utilizó como herramienta de acompañamiento y aprendizaje. Las sugerencias fueron revisadas y adaptadas al código del proyecto, buscando comprender el funcionamiento de cada implementación.

## 👨‍💻 Autor

**Maximiliano Lenta**

- GitHub: [Lenta-Maximiliano](https://github.com/Lenta-Maximiliano)
- LinkedIn: [Maximiliano Lenta](https://www.linkedin.com/in/maximiliano-l-72a9b539a/)