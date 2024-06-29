import express, { ErrorRequestHandler } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(routes);

const ErrorHandle: ErrorRequestHandler = (error, req, res, next) => {
  if (error) {
    res.json({ error: "Acesso negado!" });
  }
};
app.use(ErrorHandle);
app.use((req, res) => {
  res.json({ error: "Acesso negado!" });
});

app.get("/teste", (req, res) =>
  res.json({ message: "Welcome to this new API!" })
);

app.listen(process.env.PORT);
