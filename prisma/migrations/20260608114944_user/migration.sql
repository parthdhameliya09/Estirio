/*
  Warnings:

  - You are about to drop the column `type` on the `bus_operators` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "auth_provider" AS ENUM ('google', 'phone');

-- AlterTable
ALTER TABLE "bus_operators" DROP COLUMN "type",
ADD COLUMN     "is_private" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_hash" TEXT NOT NULL;
