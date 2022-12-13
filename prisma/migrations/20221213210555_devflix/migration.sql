/*
  Warnings:

  - Made the column `channelId` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_channelId_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "channelId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_ChannelToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelToProfile_AB_unique" ON "_ChannelToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelToProfile_B_index" ON "_ChannelToProfile"("B");

-- AddForeignKey
ALTER TABLE "_ChannelToProfile" ADD CONSTRAINT "_ChannelToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToProfile" ADD CONSTRAINT "_ChannelToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
