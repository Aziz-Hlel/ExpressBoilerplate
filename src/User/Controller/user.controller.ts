import { CreateUserDto } from "../Dto/CreateUserDto";

import { Request, Response } from "express";
import { userService } from "../Service/UserService";

class UserController {
  async create(req: Request<{}, {}, CreateUserDto>, res: Response) {
    const { tokenId } = req.body;

    const user = await userService.createUser(tokenId);

    res.status(201).json(user);
  }
}

export const userController = new UserController();
