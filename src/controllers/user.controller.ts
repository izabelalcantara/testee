import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



class UserController {
  
  public async create(request: Request, response: Response) {
    try {
      const { name, email, hash,salt ,cpf } = request.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          hash,
          salt,
          cpf,
        },
      });
       console.log(newUser)
      return response.status(201).json({ 
        message: "Usuário criado com sucesso",
        user: newUser,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          addresses: true,
          seller: true,
          order: true,
          cart: true,
          favorites: true,
          sentMessages: true,
          receivedMessages: true,
        },
      });

      if (user) {
        return response.status(200).json({
          user,
          message: "Usuário localizado",
        });
      } else {
        return response.status(404).json({ 
          message: 'Usuário não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllUsers(request: Request, response: Response) {
    try {
      const users = await prisma.user.findMany({
        include: {
          addresses: true,
          seller: true,
          order: true,
          cart: true,
          favorites: true,
          sentMessages: true,
          receivedMessages: true,
        },
      });
      return response.status(200).json({
        users,
        message: "Usuários localizados",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, email, hash, salt, cpf } = request.body;
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          hash,
          salt,
          cpf,
        },
      });
      return response.status(200).json({
        user,
        message: "Usuário atualizado",
      });
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.user.delete({
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

  public async getUserMessages(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          sentMessages: true,
          receivedMessages: true,
        },
      });

      if (user) {
        return response.status(200).json({
          sentMessages: user.sentMessages,
          receivedMessages: user.receivedMessages,
        });
      } else {
        return response.status(404).json({ 
          message: 'Usuário não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getUserOrders(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { order: true },
      });

      if (user) {
        return response.status(200).json(user.order);
      } else {
        return response.status(404).json({ 
          message: 'Usuário não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getUserCart(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { cart: true },
      });

      if (user) {
        return response.status(200).json(user.cart);
      } else {
        return response.status(404).json({ 
          message: 'Usuário não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getUserFavorites(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { favorites: true },
      });

      if (user) {
        return response.status(200).json(user.favorites);
      } else {
        return response.status(404).json({ 
          message: 'Usuário não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({ 
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }
}

export const userController = new UserController();