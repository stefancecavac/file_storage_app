-- DropIndex
DROP INDEX "Folder_name_key";

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "parentFolderIdn" INTEGER;
