import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import asyncHandler from 'express-async-handler';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, asyncHandler(this.user.getUsers));
    this.router.get(`${this.path}/:id(\\d+)`, asyncHandler(this.user.getUserById));
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), asyncHandler(this.user.createUser));
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateUserDto, true), asyncHandler(this.user.updateUser));
    this.router.delete(`${this.path}/:id(\\d+)`, asyncHandler(this.user.deleteUser));
  }
}
