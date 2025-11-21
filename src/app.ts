import { UserRouter } from "./User/user.router";
import express from "express";

const app = express();

app.use(express.json());

app.use("/users", UserRouter);

export default app;
