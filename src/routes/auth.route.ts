import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import asyncHandler from 'express-async-handler';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, asyncHandler(ValidationMiddleware(CreateUserDto)), asyncHandler(this.auth.signUp));
    this.router.post(`${this.path}login`, ValidationMiddleware(CreateUserDto), asyncHandler(this.auth.logIn));
    this.router.post(`${this.path}logout`, asyncHandler(AuthMiddleware), asyncHandler(this.auth.logOut));
  }
}
