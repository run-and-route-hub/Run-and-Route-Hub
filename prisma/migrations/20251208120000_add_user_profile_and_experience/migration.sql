-- Create enum for experience levels
CREATE TYPE "ExperienceLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- Add profile columns to User
ALTER TABLE "User" ADD COLUMN "name" TEXT;
ALTER TABLE "User" ADD COLUMN "username" TEXT;
ALTER TABLE "User" ADD COLUMN "bio" TEXT;
ALTER TABLE "User" ADD COLUMN "avatarUrl" TEXT;
ALTER TABLE "User" ADD COLUMN "location" TEXT;
ALTER TABLE "User" ADD COLUMN "joinedDate" TIMESTAMP(3) NOT NULL DEFAULT now();
ALTER TABLE "User" ADD COLUMN "experienceLevel" "ExperienceLevel" NOT NULL DEFAULT 'BEGINNER';

-- Add running stats to User
ALTER TABLE "User" ADD COLUMN "totalMilesMonth" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN "totalRunsMonth" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN "avgPace" TEXT;
ALTER TABLE "User" ADD COLUMN "fastestMile" TEXT;
ALTER TABLE "User" ADD COLUMN "streakDays" INTEGER NOT NULL DEFAULT 0;

-- Add username unique index
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
