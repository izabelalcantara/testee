/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cartId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_cartId_key" ON "User"("cartId");
