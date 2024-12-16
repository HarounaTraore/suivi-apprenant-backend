import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

export const addRequestValidator = [
  check("fullName")
    .trim()
    .notEmpty()
    .withMessage("Le nom est requis.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom doit contenir entre 2 et 100 caractères.")
    .bail()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("Le nom ne doit contenir que des lettres.")
    .bail(),

  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Le numéro de téléphone est requis.")
    .bail()
    .isNumeric()
    .withMessage("Le numéro de téléphone doit contenir uniquement des chiffres.")
    .bail()
    .isLength({ min: 8, max: 8 })
    .withMessage("Le numéro de téléphone doit être exactement de 8 caractères.")
    .bail()
    .custom(async (value) => {
      const result = await prisma.student.findFirst({
        where: { phoneNumber: value },
      });
      if (result !== null) {
        throw new Error("Ce numéro de téléphone est déjà utilisé.");
      }
      return true;
    }),

  check("tutor")
    .trim()
    .notEmpty()
    .withMessage("Le nom du tuteur est requis.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom du tuteur doit contenir entre 2 et 50 caractères.")
    .bail()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("Le nom du tuteur ne doit contenir que des lettres.")
    .bail(),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis.")
    .bail()
    .isLength({ max: 100 })
    .withMessage("L'email ne doit pas dépasser 100 caractères.")
    .bail()
    .isEmail()
    .withMessage("Veuillez entrer un email valide.")
    .bail()
    .custom(async (value) => {
      const result = await prisma.student.findFirst({
        where: { email: value },
      });
      if (result !== null) {
        throw new Error("Cet email est déjà utilisé.");
      }
      return true;
    }),

  check("address")
    .trim()
    .notEmpty()
    .withMessage("Le adresse est requis.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le adresse doit contenir entre 2 et 50 caractères.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,'-]*$/)
    .withMessage("L'adresse contient des caractères invalides.")
    .bail()
    .custom((value) => {
      // Vérifier que l'adresse n'est pas seulement des chiffres
      if (/^\d+$/.test(value)) {
        throw new Error("L'adresse ne peut pas être uniquement composée de chiffres.");
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

// Validation pour la mise à jour d'utilisateur
export const updateRequestValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID est requis.")
    .bail()
    .custom(async (id) => {
      const result = await prisma.student.findUnique({
        where: { id: Number(id) },
      });
      if (!result) {
        throw new Error("L'utilisateur n'existe pas.");
      }
      return true;
    }),
  check("fullName")
    .trim()
    .notEmpty()
    .withMessage("Le nom est requis.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom doit contenir entre 2 et 100 caractères.")
    .bail()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("Le nom ne doit contenir que des lettres.")
    .bail(),

  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Le numéro de téléphone est requis.")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("Le numéro de téléphonene doit être entre 8 et 15 caractères.")
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await prisma.student.findFirst({
        where: {
          AND: [{ id: { not: id } }, { phoneNumber: value }],
        },
      });
      if (result !== null) {
        throw new Error("Ce numéro de téléphone est déjà utilisé.");
      }
      return true;
    }),

  check("tutor")
    .trim()
    .notEmpty()
    .withMessage("Le nom du tuteur est requis.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom du tuteur doit contenir entre 2 et 50 caractères.")
    .bail()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("Le nom du tuteur ne doit contenir que des lettres.")
    .bail(),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis.")
    .bail()
    .isLength({ max: 100 })
    .withMessage("L'email ne doit pas dépasser 100 caractères.")
    .bail()
    .isEmail()
    .withMessage("Veuillez entrer un email valide.")
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await prisma.student.findFirst({
        where: {
          AND: [{ id: { not: id } }, { email: value }],
        },
      });
      if (result !== null) {
        throw new Error("Cet email est déjà utilisé.");
      }
      return true;
    }),

  check("address")
    .trim()
    .notEmpty()
    .withMessage("Le adresse est requis.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le adresse doit contenir entre 2 et 50 caractères.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,'-]*$/)
    .withMessage("L'adresse contient des caractères invalides.")
    .bail()
    .custom((value) => {
      // Vérifier que l'adresse n'est pas seulement des chiffres
      if (/^\d+$/.test(value)) {
        throw new Error("L'adresse ne peut pas être uniquement composée de chiffres.");
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

// Validation pour la suppression d'utilisateur
export const deleteRequestValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID est requis.")
    .bail()
    .custom(async (id) => {
      const result = await prisma.student.findUnique({
        where: { id: Number(id) },
      });
      if (!result) {
        throw new Error("L'utilisateur n'existe pas.");
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

// Validation pour la récupération d'utilisateur
export const getRequestValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID est requis.")
    .bail()
    .custom(async (id) => {
      const result = await prisma.student.findUnique({
        where: { id: Number(id) },
      });
      if (!result) {
        throw new Error("L'utilisateur n'existe pas.");
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
