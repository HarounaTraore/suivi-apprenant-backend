import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

// Validation pour l'ajout d'un module
export const addModuleValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom du module est requis.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom du module doit contenir entre 2 et 50 caractères.")
    .bail()
    .isAlpha('fr-FR', { ignore: ' ' })
    .withMessage("Le nom du module doit contenir uniquement des lettres.")
    .bail()
    .custom(async (name) => {
      const existingModule = await prisma.module.findFirst({ where: { name } });
      if (existingModule) {
        throw new Error("Un module avec ce nom existe déjà. Veuillez choisir un autre nom.");
      }
      return true;
    }),

  check("duration")
    .notEmpty()
    .withMessage("La durée est requise.")
    .bail()
    .isInt({ min: 1 })
    .withMessage("La durée doit être un nombre entier positif."),

  check("price")
    .notEmpty()
    .withMessage("Le prix est requis.")
    .bail()
    .isDecimal({ decimal_digits: '2' })
    .withMessage("Le prix doit être un nombre décimal avec 2 chiffres après la virgule."),

  check("status")
    .notEmpty()
    .withMessage("Le statut est requis.")
    .bail()
    .isBoolean()
    .withMessage("Le statut doit être un booléen (true ou false)."),

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

// Validation pour la mise à jour d'un module
export const updateModuleValidator = [
  param("id")
    .isInt()
    .withMessage("L'ID du module doit être un nombre entier.")
    .custom(async (value) => {
      const module = await prisma.module.findUnique({ where: { id: parseInt(value) } });
      if (!module) {
        return Promise.reject("Le module avec cet ID n'existe pas. Veuillez vérifier l'ID.");
      }
    }),

  check("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom du module doit contenir entre 2 et 50 caractères.")
    .isAlpha('fr-FR', { ignore: ' ' })
    .withMessage("Le nom du module doit contenir uniquement des lettres.")
    .bail(),

  check("duration")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La durée doit être un nombre entier positif."),

  check("price")
    .optional()
    .isDecimal({ decimal_digits: '2' })
    .withMessage("Le prix doit être un nombre décimal avec 2 chiffres après la virgule."),

  check("status")
    .optional()
    .isBoolean()
    .withMessage("Le statut doit être un booléen (true ou false)."),

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

// Validation pour la suppression d'un module
export const deleteModuleValidator = [
  param("id")
    .isInt()
    .withMessage("L'ID du module doit être un nombre entier.")
    .custom(async (value) => {
      const module = await prisma.module.findUnique({ where: { id: parseInt(value) } });
      if (!module) {
        return Promise.reject("Le module avec cet ID n'existe pas. Veuillez vérifier l'ID.");
      }
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
