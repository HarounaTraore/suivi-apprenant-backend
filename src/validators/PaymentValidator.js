import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

// Validation pour l'ajout d'un paiement
export const addPaymentValidator = [
  check("amount")
    .notEmpty()
    .withMessage("Le montant est requis.")
    .bail()
    .isFloat({ min: 0.01 })
    .withMessage("Le montant doit être supérieur à 0.")
    .bail(),


  check("registrationId")
    .notEmpty()
    .withMessage("L'ID de l'étudiant est requis.")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

// Validation pour la mise à jour d'un paiement
export const updatePaymentValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID du paiement est requis.")
    .bail()
    .custom(async (id) => {
      const payment = await prisma.payment.findUnique({ where: { id: Number(id) } });
      if (!payment) {
        throw new Error("Le paiement spécifié n'existe pas.");
      }
      return true;
    }),

  check("amount")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("Le montant doit être supérieur à 0.")
    .bail(),

  check("paymentDate")
    .optional()
    .isISO8601()
    .withMessage("La date de paiement doit être une date valide.")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

// Validation pour la suppression d'un paiement
export const deletePaymentValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID du paiement est requis.")
    .bail()
    .custom(async (id) => {
      const payment = await prisma.payment.findUnique({ where: { id: Number(id) } });
      if (!payment) {
        throw new Error("Le paiement spécifié n'existe pas.");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

// Validation pour la récupération d'un paiement
export const getPaymentValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID du paiement est requis.")
    .bail()
    .custom(async (id) => {
      const payment = await prisma.payment.findUnique({ where: { id: Number(id) } });
      if (!payment) {
        throw new Error("Le paiement spécifié n'existe pas.");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];
