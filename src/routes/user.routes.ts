import { Routes } from "@/interfaces";
import { Router } from "express";

class UserRouter implements Routes {
  path = "/api/users";
  router = Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`);
  }
}

export default UserRouter;
