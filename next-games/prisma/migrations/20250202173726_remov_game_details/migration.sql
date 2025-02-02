/*
  Warnings:

  - You are about to drop the column `coverUrl` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "coverUrl",
DROP COLUMN "rating",
DROP COLUMN "releaseDate",
DROP COLUMN "summary";
