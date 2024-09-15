-- DropIndex
DROP INDEX "order_id_key";

-- AlterTable
ALTER TABLE "order" ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");
