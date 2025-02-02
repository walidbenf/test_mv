-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "genres" JSONB,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "releaseDate" TIMESTAMP(3),
ADD COLUMN     "screenshots" JSONB,
ADD COLUMN     "summary" TEXT;
