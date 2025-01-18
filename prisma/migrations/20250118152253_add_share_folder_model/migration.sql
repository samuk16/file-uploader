-- CreateTable
CREATE TABLE "ShareFolder" (
    "id" SERIAL NOT NULL,
    "shareUrl" TEXT NOT NULL,
    "folderId" INTEGER NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShareFolder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShareFolder_shareUrl_key" ON "ShareFolder"("shareUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ShareFolder_folderId_key" ON "ShareFolder"("folderId");

-- AddForeignKey
ALTER TABLE "ShareFolder" ADD CONSTRAINT "ShareFolder_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
