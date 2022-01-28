/*
  Warnings:

  - You are about to drop the column `completedAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "completedAt",
DROP COLUMN "isCompleted",
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;
