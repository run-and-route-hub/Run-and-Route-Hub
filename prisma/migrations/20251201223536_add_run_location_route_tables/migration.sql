-- CreateTable
CREATE TABLE "Run" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "pace" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);
