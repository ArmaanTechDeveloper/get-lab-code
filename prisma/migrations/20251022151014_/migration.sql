/*
  Warnings:

  - The primary key for the `Paths` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Paths` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `Paths` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Snippets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paths" DROP CONSTRAINT "Paths_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Paths_pkey" PRIMARY KEY ("path");

-- AlterTable
ALTER TABLE "Snippets" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Paths_path_key" ON "Paths"("path");

-- AddForeignKey
ALTER TABLE "Snippets" ADD CONSTRAINT "Snippets_slug_fkey" FOREIGN KEY ("slug") REFERENCES "Paths"("path") ON DELETE RESTRICT ON UPDATE CASCADE;
