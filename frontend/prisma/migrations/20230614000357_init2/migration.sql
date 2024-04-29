/*
  Warnings:

  - You are about to drop the column `userQuiz` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userQuiz_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userQuiz";

-- CreateTable
CREATE TABLE "_UserQuiz" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserQuiz_AB_unique" ON "_UserQuiz"("A", "B");

-- CreateIndex
CREATE INDEX "_UserQuiz_B_index" ON "_UserQuiz"("B");

-- AddForeignKey
ALTER TABLE "_UserQuiz" ADD CONSTRAINT "_UserQuiz_A_fkey" FOREIGN KEY ("A") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserQuiz" ADD CONSTRAINT "_UserQuiz_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
