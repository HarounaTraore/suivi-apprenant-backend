import { Router } from "express";
import RegistrationController from "../controllers/RegistrationController.js";
import {
  addRegistrationValidator,
  updateRegistrationValidator,
  deleteRegistrationValidator,
} from "../validators/registrationValidator.js";

const router = Router();
router.post("/registration", addRegistrationValidator, RegistrationController.createRegistration);
router.get("/registrations", RegistrationController.getAllRegistrations);
router.get("/registration/:id", RegistrationController.getByIdRegistration);
router.put("/registration/:id", updateRegistrationValidator, RegistrationController.updateRegistration);
router.delete("/registration/:id", deleteRegistrationValidator, RegistrationController.deleteRegistration);

export default router;
