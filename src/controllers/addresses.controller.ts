import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AddressController {
  public async create(request: Request, response: Response) {
    try {
      const { number, apartament, cep, userId } = request.body;
      const newAddress = await prisma.address.create({
        data: {
          number,
          apartament,
          cep,
          userId,
        },
      });
      return response.status(201).json({
        message: "Endereço criado com sucesso",
        address: newAddress,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAddressById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const address = await prisma.address.findUnique({
        where: { id: Number(id) },
        include: {
          user: true,
        },
      });

      if (address) {
        return response.status(200).json({
          address,
          message: "Endereço localizado",
        });
      } else {
        return response.status(404).json({
          message: 'Endereço não encontrado',
        });
      }
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async getAllAddresses(request: Request, response: Response) {
    try {
      const addresses = await prisma.address.findMany({
        include: {
          user: true,
        },
      });
      return response.status(200).json({
        addresses,
        message: "Endereços localizados",
      });
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async updateAddress(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { number, apartament, cep } = request.body;
      const address = await prisma.address.update({
        where: { id: Number(id) },
        data: {
          number,
          apartament,
          cep,
        },
      });
      return response.status(200).json({
        address,
        message: "Endereço atualizado",
      });
    } catch (error) {
      return response.status(400).json({
        messageError: "Erro interno no servidor",
        error: error,
      });
    }
  }

  public async deleteAddress(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await prisma.address.delete({
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

export const addressController = new AddressController();
