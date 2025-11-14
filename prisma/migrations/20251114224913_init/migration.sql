/*
  Warnings:

  - You are about to drop the `Route` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RunLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('excellent', 'good', 'fair', 'poor');

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_userId_fkey";

-- DropForeignKey
ALTER TABLE "RunLog" DROP CONSTRAINT "RunLog_routeId_fkey";

-- DropForeignKey
ALTER TABLE "RunLog" DROP CONSTRAINT "RunLog_userId_fkey";

-- DropTable
DROP TABLE "Route";

-- DropTable
DROP TABLE "RunLog";

-- CreateTable
CREATE TABLE "Stuff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "condition" "Condition" NOT NULL DEFAULT 'good',
    "owner" TEXT NOT NULL,

    CONSTRAINT "Stuff_pkey" PRIMARY KEY ("id")
);
