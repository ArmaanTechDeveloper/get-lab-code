-- CreateTable
CREATE TABLE "Snippets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "snippet" TEXT NOT NULL,

    CONSTRAINT "Snippets_pkey" PRIMARY KEY ("id")
);
