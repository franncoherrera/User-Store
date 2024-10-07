import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middelwares/auth.middelware";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const categoryService = new CategoryService();
    const controller = new CategoryController(categoryService);
    router.get("/", controller.getCategory);
    router.post("/", [AuthMiddleware.validateJWT],controller.createCategory);
    return router;
  }
}
