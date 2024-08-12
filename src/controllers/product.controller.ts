import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class ProductController {
  public async create(req: Request, res: Response) {
    const { name, description, price, quantity } = req.body;
    try {
      const newProduct = await prisma.product.create({
        data: {
          name,
          description,
          price,
          quantity
        }
      });
      return res.status(201).json({
        message: "Produto criado com sucesso",
        product: newProduct,
      });
    } catch (error) {
      return res.status(500).json({
        messageError: "Erro criando produto",
        error
      });
    }
  }

  public async readAll(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({
        messageError: "Erro lendo produtos",
        error
      });
    }
  }

  public async read(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) }
      });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({
        messageError: "Erro lendo produto",
        error
      });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    try {
      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          price,
          quantity
        }
      });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({
        messageError: "Erro atualizando produto",
        error
      });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await prisma.product.delete({
        where: { id: Number(id) }
      });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({
        messageError: "Erro deletando produto",
        error
      });
    }
  }

}
export const productController = new ProductController();
