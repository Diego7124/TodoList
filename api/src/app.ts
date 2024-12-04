import Express, { Application, Request, Response } from "express";
import cors from "cors";
import UsersController from "./controllers/UsersController";
import ActivitiesController from "./controllers/ActivitiesController";

const app: Application = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hola desde mi servidor con Ts");
});

// Rutas de usuario
app.post("/user/create", UsersController.signUp);
app.post("/user/sign-in", UsersController.signIn);

// Ruta para crear la tarea
app.post("/createtask", ActivitiesController.create);

export default app;
