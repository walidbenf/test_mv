-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "releaseDate" TIMESTAMP(3),
ADD COLUMN     "summary" TEXT;
