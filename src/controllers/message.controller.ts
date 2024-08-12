import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class MessageController {
  
  public async createMessage(request: Request, response: Response) {
    try {
      const { content, senderId, receiverId } = request.body;

     
      const newMessage = await prisma.message.create({
        data: {
          content,
          sender: { connect: { id: senderId } },
          receiver: { connect: { id: receiverId } }, 
          
        },
      });

      return response.status(201).json({
        message: "Mensagem criada com sucesso",
        data: newMessage,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error, 
      });
    }
  }

  public async getMessageById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const message = await prisma.message.findUnique({
        where: { id: Number(id) },
        include: {
          sender: true,
          receiver: true,
        },
      });

      if (message) {
        return response.status(200).json({
          message: "Mensagem localizada",
          data: message,
        });
      } else {
        return response.status(404).json({
          message: 'Mensagem não encontrada',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateMessage(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { content } = request.body;
      const updatedMessage = await prisma.message.update({
        where: { id: Number(id) },
        data: {
          content,
        },
      });
      return response.status(200).json({
        message: "Mensagem atualizada com sucesso",
        data: updatedMessage,
      });
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteMessage(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.message.delete({
        where: { id: Number(id) },
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }
}

export const messageController = new MessageController();
