/*
  Warnings:

  - You are about to drop the column `type` on the `bus_operators` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bus_operators" DROP COLUMN "type",
ADD COLUMN     "is_private" BOOLEAN NOT NULL DEFAULT true;
