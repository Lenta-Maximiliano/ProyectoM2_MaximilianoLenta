# 🤖 Documentación del uso de inteligencia artificial

Durante el desarrollo del proyecto se utilizó inteligencia artificial como herramienta de apoyo para comprender conceptos, resolver dudas técnicas, analizar errores y evaluar posibles implementaciones.

La IA no fue utilizada para desarrollar el proyecto de forma automática, sino como recurso complementario para comprender la lógica del backend, analizar alternativas y adaptar las soluciones a la estructura y los requerimientos de la API.

A continuación se documentan tres casos representativos del uso de inteligencia artificial durante el desarrollo.

---

### 🗄️ 1. Configuración de PostgreSQL y codificación UTF-8

#### Objetivo

Utilizar inteligencia artificial como herramienta de apoyo para comprender el funcionamiento de la codificación de caracteres en PostgreSQL y diagnosticar problemas de visualización de caracteres especiales, como tildes y la letra ñ.

También se buscó comprender la diferencia entre la codificación del servidor y la del cliente, y cómo configurar correctamente la conexión para evitar problemas al insertar y consultar datos.

#### Prompt utilizado

> Estoy desarrollando una API REST para gestionar autores y publicaciones utilizando Node.js, Express y PostgreSQL como parte del Módulo 2 de Soy Henry.
>
> Estoy teniendo problemas con la visualización de caracteres especiales en los datos almacenados en PostgreSQL, por ejemplo, tildes y la letra ñ.
>
> Explicá las posibles causas y las soluciones, priorizando una implementación clara y comprensible para alguien que está comenzando con PostgreSQL.

#### Resultado obtenido

La respuesta permitió comprender la diferencia entre:

- `SERVER_ENCODING`: codificación utilizada por la base de datos.
- `CLIENT_ENCODING`: codificación utilizada para la comunicación entre el cliente y PostgreSQL.

También se explicó cómo consultar ambas configuraciones mediante `SHOW` y cómo establecer la codificación de la sesión mediante:

```sql
SET client_encoding = 'UTF8';
```

Además, se analizó cómo configurar el cliente `psql` mediante la variable de entorno `PGCLIENTENCODING`.

#### Aplicación en el proyecto

A partir del diagnóstico realizado, se corrigieron los datos que ya se encontraban almacenados con una codificación incorrecta.

También se incorporó la siguiente instrucción al inicio del archivo `src/db/seed.sql`:

```sql
SET client_encoding = 'UTF8';
```

De esta manera, se explicita la codificación que debe utilizarse al ejecutar el script de datos iniciales.

La IA se utilizó como herramienta de apoyo para comprender el problema, interpretar los resultados de PostgreSQL y evaluar las alternativas de solución. Los cambios fueron aplicados y verificados mediante consultas a la base de datos y comprobaciones de la API desplegada.

---

### 🔗 2. Consultas SQL y relaciones entre tablas

#### Objetivo

Utilizar inteligencia artificial como herramienta de apoyo para comprender cómo consultar información relacionada entre las tablas `posts` y `authors`.

Se buscó implementar un endpoint que permitiera obtener las publicaciones correspondientes a un autor, incluyendo información adicional del autor asociado a cada publicación.

#### Prompt utilizado

> Estoy desarrollando una API REST con Node.js, Express y PostgreSQL.
>
> Tengo dos tablas relacionadas:
>
> - `authors`, que almacena los datos de los autores.
> - `posts`, que almacena las publicaciones y tiene una clave foránea `author_id` que referencia a `authors.id`.
>
> Necesito implementar un endpoint GET `/posts/author/:authorId` que devuelva las publicaciones de un autor incluyendo también sus datos, como nombre, email y biografía.
>
> Explicá el funcionamiento paso a paso, priorizando una solución clara y adecuada para alguien que está aprendiendo SQL.

#### Resultado obtenido

La respuesta explicó el funcionamiento de `INNER JOIN` y cómo utilizarlo para combinar registros de dos tablas a partir de una relación entre sus claves.

También se explicó la importancia de:

- Utilizar la condición `ON` para establecer la relación entre ambas tablas.
- Utilizar `WHERE` para filtrar las publicaciones según el identificador del autor.
- Utilizar alias para identificar los campos provenientes de la tabla relacionada.
- Utilizar parámetros SQL (`$1`) para evitar concatenar directamente valores recibidos desde las solicitudes.

#### Aplicación en el proyecto

El enfoque se incorporó en el servicio `getPostsByAuthorService`, ubicado en `src/services/postsService.js`.

La consulta implementada utiliza `INNER JOIN` para obtener las publicaciones junto con los datos del autor:

```sql
SELECT
  posts.*,
  authors.name AS author_name,
  authors.email AS author_email,
  authors.bio AS author_bio
FROM posts
INNER JOIN authors ON posts.author_id = authors.id
WHERE posts.author_id = $1
ORDER BY posts.id ASC;
```

De esta manera, el endpoint devuelve las publicaciones del autor junto con los campos adicionales `author_name`, `author_email` y `author_bio`.

La IA se utilizó como herramienta de apoyo para comprender las relaciones entre tablas y la construcción de consultas SQL. La implementación fue adaptada a la estructura existente del proyecto y posteriormente comprobada mediante pruebas del endpoint.

---

### 📄 3. Documentación de la API con OpenAPI y Swagger

#### Objetivo

Utilizar inteligencia artificial como herramienta de apoyo para comprender cómo documentar una API REST mediante la especificación OpenAPI y cómo visualizar esa documentación utilizando Swagger UI.

Se buscó describir los endpoints desarrollados, sus parámetros, los cuerpos de las solicitudes, las respuestas posibles y los esquemas de datos utilizados por la API.

#### Prompt utilizado

> Siguiendo con mi proyecto M2  de Soy Henry. 
>
> Ya tengo implementados los endpoints CRUD de ambas entidades y necesito documentarlos utilizando OpenAPI en un archivo YAML e integrarlos con Swagger UI.
>
> Necesito comprender cómo definir la información general de la API, los servidores, las rutas, los parámetros, los requestBody, las respuestas HTTP y los schemas reutilizables.
>
> Explicá cómo organizar la documentación y cómo relacionarla con los endpoints que ya están implementados, priorizando una solución clara y comprensible para alguien que está aprendiendo a documentar APIs REST.

#### Resultado obtenido

La respuesta permitió comprender la estructura general de un documento OpenAPI y la función de sus principales elementos:

- `openapi` e `info`: identifican la versión de la especificación y la información general de la API.
- `servers`: define las direcciones de los servidores disponibles.
- `paths`: describe los endpoints y sus operaciones HTTP.
- `parameters`: documenta los parámetros recibidos por las rutas.
- `requestBody`: describe los datos enviados en las solicitudes.
- `responses`: documenta los códigos HTTP y sus respuestas.
- `components/schemas`: permite definir estructuras de datos reutilizables.

También se explicó cómo integrar el archivo YAML con Swagger UI para visualizar y consultar la documentación desde el navegador.

#### Aplicación en el proyecto

Se incorporó el archivo `src/docs/openapi.yaml`, donde se documentaron los endpoints de autores y publicaciones.

Además, se integró Swagger UI en la aplicación Express para permitir consultar la documentación desde la ruta `/api-docs`.

La documentación también contempla los esquemas de respuesta y las particularidades de los endpoints, incluyendo la consulta de publicaciones junto con los datos de sus autores.

La IA se utilizó como herramienta de apoyo para comprender la especificación OpenAPI, organizar el documento YAML y revisar la correspondencia entre la documentación y los endpoints implementados.

---

### Consideraciones finales

La inteligencia artificial fue utilizada como herramienta complementaria durante el desarrollo del proyecto, principalmente para comprender conceptos nuevos, analizar errores, revisar alternativas de implementación y mejorar la documentación.

Las soluciones propuestas fueron evaluadas y adaptadas según los requerimientos de la consigna y la estructura del proyecto. Las funcionalidades fueron implementadas y verificadas mediante consultas a PostgreSQL, pruebas automatizadas y comprobaciones manuales de los endpoints.

El objetivo fue utilizar la IA como apoyo al aprendizaje y no como sustituto de la comprensión de los conceptos y del trabajo de desarrollo.