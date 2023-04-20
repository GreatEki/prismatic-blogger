/*
  Warnings:

  - You are about to drop the column `userPreferenceId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserPreferences` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_userPreferenceId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `userPreferenceId`;

-- AlterTable
ALTER TABLE `userpreferences` ADD COLUMN `userId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserPreferences_userId_key` ON `UserPreferences`(`userId`);

-- AddForeignKey
ALTER TABLE `UserPreferences` ADD CONSTRAINT `UserPreferences_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
