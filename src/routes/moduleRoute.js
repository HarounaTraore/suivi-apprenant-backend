import { Router } from "express";
import ModuleController from "../controllers/ModuleController.js";
import {
  addModuleValidator,
  updateModuleValidator,
  deleteModuleValidator,
} from "../validators/moduleValidator.js";

const router = Router();
router.post("/module", addModuleValidator, ModuleController.createModule);
router.get("/modules", ModuleController.getAllModules);
router.get("/module/:id", ModuleController.getByIdModule);
router.put("/module/:id", updateModuleValidator, ModuleController.updateModule);
router.delete("/module/:id", deleteModuleValidator, ModuleController.deleteModule);

export default router;
