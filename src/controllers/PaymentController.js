import prisma from "../config/prisma.js";

export default class PaymentController {
  static async getByIdPayment(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const result = await prisma.payment.findUnique({
        where: { id },
        include: { registration: { include: { student: true, module: true } } },
      });
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json({ message: "Paiement introuvable." });
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erreur lors de la récupération du paiement." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async getAllPayments(_req, res, next) {
    try {
      const result = await prisma.payment.findMany({
        include: { registration: { include: { student: true, module: true } } },
      });
      res.json({ result });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erreur lors de la récupération des paiements." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async createPayment(req, res, next) {
    try {
      const { payer, amount, payerNumber, paymentMode, registrationId } =
        req.body;
      const paymentDate = new Date();

      const result = await prisma.payment.create({
        data: {
          paymentDate: new Date(paymentDate).toISOString(),
          amount: parseFloat(amount),
          payer,
          payerNumber,
          paymentMode,
          registrationId,
        },
      });
      res.status(201).json({ message: "Paiement créé avec succès.", result });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erreur lors de la création du paiement." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async updatePayment(req, res, next) {
    try {
      const id = Number(req.params.id);
      const {
        paymentDate,
        amount,
        payer,
        payerNumber,
        paymentMode,
        registrationId,
      } = req.body;

      const result = await prisma.payment.update({
        where: { id },
        data: {
          paymentDate: new Date(paymentDate).toISOString(),
          amount: parseFloat(amount),
          payer,
          payerNumber,
          paymentMode,
          registrationId,
        },
      });
      res
        .status(200)
        .json({ message: "Paiement mis à jour avec succès.", result });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erreur lors de la mise à jour du paiement." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }

  static async deletePayment(req, res, next) {
    try {
      const id = Number(req.params.id);
      await prisma.payment.delete({ where: { id } });
      res.status(200).json({ message: "Paiement supprimé avec succès." });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erreur lors de la suppression du paiement." });
    } finally {
      await prisma.$disconnect();
    }
    next();
  }
}
