/*
  Warnings:

  - You are about to drop the column `parentFolderIdn` on the `Folder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "parentFolderIdn",
ADD COLUMN     "parentFolderId" INTEGER;
