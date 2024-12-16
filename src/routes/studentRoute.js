import { Router } from "express";
import Student from "../controllers/StudentController.js";
import {
  addRequestValidator,
  deleteRequestValidator,
  updateRequestValidator,
} from "../validators/studentValidator.js";

const router = Router();

router.post("/student", addRequestValidator, Student.createStudent,);
router.get("/students", Student.getAllStudents);
router.get("/student/:id", Student.getByIdStudent);
router.put("/student/:id", updateRequestValidator, Student.updateStudent);
router.delete("/student/:id", deleteRequestValidator, Student.deleteStudent);

export default router;
