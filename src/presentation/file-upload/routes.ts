import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middelwares/file-upload.middelware";
import { TypeMiddleware } from "../middelwares/type.middelware";

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const fileUploadService = new FileUploadService();
    const controller = new FileUploadController(fileUploadService);
    router.use([
      FileUploadMiddleware.containFile,
      TypeMiddleware.validTypes(["users", "products", "categories"]),
    ]);
    router.post("/single/:type", controller.uploadFile);
    router.post("/multiple/:type", controller.uploadMultipleFile);
    return router;
  }
}
