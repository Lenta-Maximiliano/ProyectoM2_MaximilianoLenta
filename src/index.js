import "dotenv/config";
import express from "express";
import authorsRouter from "./routes/authors.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API MiniBlog funcionando correctamente",
  });
});

app.use("/authors", authorsRouter);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
