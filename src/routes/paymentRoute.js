import { Router } from "express";
import PaymentController from "../controllers/PaymentController.js";
import { addPaymentValidator, deletePaymentValidator, updatePaymentValidator } from "../validators/PaymentValidator.js";


const router = Router();
router.post("/payment",addPaymentValidator , PaymentController.createPayment);
router.get("/payments", PaymentController.getAllPayments);
router.get("/payment/:id", PaymentController.getByIdPayment);
router.put("/payment/:id", updatePaymentValidator, PaymentController.updatePayment);
router.delete("/payment/:id", deletePaymentValidator, PaymentController.deletePayment);

export default router;
