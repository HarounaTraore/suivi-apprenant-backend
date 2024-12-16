import prisma from "../config/prisma.js";

export default class ModuleController {
  static async getByIdModule(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const result = await prisma.module.findUnique({
        where: { id },
      });
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json({ message: "Module introuvable." });
      }
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la récupération du module." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async getAllModules(_req, res, next) {
    try {
      const result = await prisma.module.findMany();
      res.json({ result });
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la récupération de tous les modules." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async createModule(req, res, next) {
    try {
      const { name, duration, price, status } = req.body;

      const result = await prisma.module.create({
        data: { name, duration, price, status },
      });
      res.status(201).json({ message: "Module créé avec succès.", result });
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la création du module." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async updateModule(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { name, duration, price, status } = req.body;

      const result = await prisma.module.update({
        where: { id },
        data: { name, duration, price, status },
      });
      res.status(200).json({ message: "Module mis à jour avec succès.", result });
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la mise à jour du module." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async deleteModule(req, res, next) {
    try {
      const id = Number(req.params.id);
      await prisma.module.delete({ where: { id } });
      res.status(200).json({ message: "Module supprimé avec succès." });
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la suppression du module." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }
}
