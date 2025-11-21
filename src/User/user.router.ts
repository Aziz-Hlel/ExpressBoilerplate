import { Router } from "express";
import { validateDto } from "../core/validate";
import { userController } from "./Controller/user.controller";
import { CreateUserDto } from "./Dto/CreateUserDto";

import { Request, Response } from "express";

const router = Router();

router.post(
  "/",
  validateDto(CreateUserDto),
  (req: Request<{}, {}, CreateUserDto>, res) => userController.create(req, res),
);

// router.get("/:id", (req, res) => userController.getOne(req, res));

export const UserRouter = router;
