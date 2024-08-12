import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class BuyItemController {

  public async createBuyItem(request: Request, response: Response) {
    try {
      const { orderId, productId, quantity, unitaryPrice } = request.body;
      const newBuyItem = await prisma.buyItem.create({
        data: {
          orderId,
          productId,
          quantity,
          unitaryPrice,
        },
      });

      return response.status(201).json({
        message: "Item de compra criado com sucesso",
        buyItem: newBuyItem,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getBuyItemById(request: Request, response: Response) {
    try {
      const { orderId, productId } = request.params;
      const buyItem = await prisma.buyItem.findUnique({
        where: {
          orderId_productId: {
            orderId: Number(orderId),
            productId: Number(productId),
          },
        },
      });

      if (buyItem) {
        return response.status(200).json({
          buyItem,
          message: "Item localizado na compra",
        });
      } else {
        return response.status(404).json({
          message: "Item não encontrado na compra",
        });
      }
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllBuyItems(request: Request, response: Response) {
    try {
      const buyItems = await prisma.buyItem.findMany();

      return response.status(200).json({
        buyItems,
        message: "Itens localizados na compra",
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateBuyItem(request: Request, response: Response) {
    try {
      const { orderId, productId } = request.params;
      const { quantity, unitaryPrice } = request.body;
      const updatedBuyItem = await prisma.buyItem.update({
        where: {
          orderId_productId: {
            orderId: Number(orderId),
            productId: Number(productId),
          },
        },
        data: {
          quantity,
          unitaryPrice,
        },
      });

      return response.status(200).json({
        buyItem: updatedBuyItem,
        message: "Item atualizado na compra",
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteBuyItem(request: Request, response: Response) {
    try {
      const { orderId, productId } = request.params;
      await prisma.buyItem.delete({
        where: {
          orderId_productId: {
            orderId: Number(orderId),
            productId: Number(productId),
          },
        },
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }
}

export const buyItemController = new BuyItemController();
