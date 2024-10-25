/*
  Warnings:

  - Added the required column `editorial` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageAmount` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "editorial" TEXT NOT NULL,
ADD COLUMN     "pageAmount" INTEGER NOT NULL;
