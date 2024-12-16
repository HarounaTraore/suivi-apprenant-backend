import prisma from "../config/prisma.js";

export default class Student {
  static async getByIdStudent(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const result = await prisma.student.findUnique({
        where: { id: Number(id) },
      });
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json({ message: "Etudiant introuvable." });
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erreur lors de la récupération de l'étudiant." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async getAllStudents(_req, res, next) {
    try {
      const result = await prisma.student.findMany();
      res.json({ result });
    } catch (error) {
      res
        .status(400)
        .json({
          message: "Erreur lors de la récupération de tous les étudiants.",
        });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async createStudent(req, res, next) {
    try {
      const { fullName, email, phoneNumber, address, tutor } = req.body;

      const result = await prisma.student.create({
        data: { fullName, email, phoneNumber, address, tutor },
      });
      res.status(201).json({ message: "Etudiant créé avec succès." });
      return result;
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erreur lors de la création de l'étudiant." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async updateStudent(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { fullName, email, phoneNumber, address, tutor } = req.body;

      await prisma.student.update({
        where: { id },
        data: { fullName, email, phoneNumber, address, tutor },
      });
      res.status(200).json({ message: "Etudiant mis à jour avec succès." });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erreur lors de la mise à jour de l'étudiant." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async deleteStudent(req, res, next) {
    try {
      const id = Number(req.params.id);
      await prisma.student.delete({ where: { id } });
      res.status(200).json({ message: "Etudiant supprimé avec succès." });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erreur lors de la suppression de l'étudiant." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }
}
