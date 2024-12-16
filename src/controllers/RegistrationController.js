import prisma from "../config/prisma.js";
import moment from 'moment';

export default class RegistrationController {
  static async getByIdRegistration(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const result = await prisma.registration.findUnique({
        where: { id },
        include: { student: true, module: true, payments: true },
      });
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json({ message: "Inscription introuvable." });
      }
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la récupération de l'inscription." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async getAllRegistrations(_req, res, next) {
    try {
      const result = await prisma.registration.findMany({
        include: { student: true, module: true, payments: true },
      });
      res.json({ result });
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la récupération des inscriptions." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async createRegistration(req, res, next) {
    try {
      const { dateRegister, startDate, studentId, moduleId } = req.body;
      const module = await prisma.module.findFirst({ where: { id: Number(moduleId) } });
      const duration = Number(module.duration);
      const endDate = moment(startDate).add(duration, "days").format("YYYY-MM-DD"); // Formater la date de fin
      const amount = parseFloat(module.price); // Prix du module
      
      const result = await prisma.registration.create({
        data: {
          dateRegister: new Date(dateRegister).toISOString(),
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          mount: amount,
          studentId: Number(studentId),
          moduleId: Number(moduleId),
        },
      });

      res.status(201).json({ message: "Inscription créée avec succès.", result });
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la création de l'inscription.", error: error.message });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async updateRegistration(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { dateRegister, startDate, mount, studentId, moduleId } = req.body;
      const module = await prisma.module.findFirst({ where: { id: Number(moduleId) } });
      const duration = Number(module.duration);
      const endDate = moment(startDate).add(duration, "days").format("YYYY-MM-DD"); // Formater la date de fin

      const result = await prisma.registration.update({
        where: { id },
        data: {
          dateRegister: new Date(dateRegister).toISOString(),
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          mount: parseFloat(mount),
          studentId: Number(studentId),
          moduleId: Number(moduleId),
        },
      });

      res.status(200).json({ message: "Inscription mise à jour avec succès.", result });
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la mise à jour de l'inscription." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async deleteRegistration(req, res, next) {
    try {
      const id = Number(req.params.id);
      await prisma.registration.delete({ where: { id } });
      res.status(200).json({ message: "Inscription supprimée avec succès." });
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la suppression de l'inscription." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }
}
