-- CreateEnum
CREATE TYPE "TerrainPreference" AS ENUM ('FLAT', 'HILLS', 'MIXED');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "daysAvailable" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "experienceLevel" "ExperienceLevel" DEFAULT 'BEGINNER',
ADD COLUMN     "location" TEXT,
ADD COLUMN     "paceMax" DOUBLE PRECISION,
ADD COLUMN     "paceMin" DOUBLE PRECISION,
ADD COLUMN     "preferredDistanceKm" DOUBLE PRECISION,
ADD COLUMN     "prefersAfternoon" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prefersEvening" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prefersMorning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "terrainPreference" "TerrainPreference";
