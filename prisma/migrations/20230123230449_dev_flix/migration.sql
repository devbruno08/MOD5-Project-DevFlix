/*
  Warnings:

  - You are about to drop the `_ChannelToProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChannelToProfile" DROP CONSTRAINT "_ChannelToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelToProfile" DROP CONSTRAINT "_ChannelToProfile_B_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "channelId" DROP NOT NULL;

-- DropTable
DROP TABLE "_ChannelToProfile";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
