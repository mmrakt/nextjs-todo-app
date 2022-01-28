/*
  Warnings:

  - You are about to drop the column `done` on the `Task` table. All the data in the column will be lost.
  - Added the required column `completedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "done",
ADD COLUMN     "completedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
