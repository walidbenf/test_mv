/*
  Warnings:

  - The `genres` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `screenshots` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "genres",
ADD COLUMN     "genres" JSONB,
DROP COLUMN "screenshots",
ADD COLUMN     "screenshots" JSONB;
