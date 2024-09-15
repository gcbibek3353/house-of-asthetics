/*
  Warnings:

  - Added the required column `city` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL,
ALTER COLUMN "createdDate" SET DEFAULT CURRENT_TIMESTAMP;
