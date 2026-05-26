-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lineup" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "venue" TEXT NOT NULL,
    "address" TEXT,
    "category" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "tags" TEXT[],
    "imageUrl" TEXT,
    "priceMin" DOUBLE PRECISION,
    "priceMax" DOUBLE PRECISION,
    "pricingModel" TEXT,
    "capacity" INTEGER,
    "ticketUrl" TEXT,
    "isSafe" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
