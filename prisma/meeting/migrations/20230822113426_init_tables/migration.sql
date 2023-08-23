-- CreateTable
CREATE TABLE "meeting" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "status" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 0,
    "memberId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" SMALLINT NOT NULL DEFAULT 1,
    "meetingId" TEXT NOT NULL,
    "status" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_estimation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "meetingId" TEXT NOT NULL,
    "averageEstimation" DOUBLE PRECISION,
    "status" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "task_estimation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member_estimation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 0,
    "meetingMemberId" TEXT NOT NULL,
    "estimation" DOUBLE PRECISION,
    "taskEstimationId" TEXT NOT NULL,

    CONSTRAINT "member_estimation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meeting_id_key" ON "meeting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "member_id_key" ON "member"("id");

-- CreateIndex
CREATE INDEX "member_meetingId_idx" ON "member"("meetingId");

-- CreateIndex
CREATE UNIQUE INDEX "task_estimation_id_key" ON "task_estimation"("id");

-- CreateIndex
CREATE INDEX "task_estimation_meetingId_idx" ON "task_estimation"("meetingId");

-- CreateIndex
CREATE UNIQUE INDEX "member_estimation_id_key" ON "member_estimation"("id");

-- CreateIndex
CREATE INDEX "member_estimation_taskEstimationId_idx" ON "member_estimation"("taskEstimationId");

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_estimation" ADD CONSTRAINT "task_estimation_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_estimation" ADD CONSTRAINT "member_estimation_taskEstimationId_fkey" FOREIGN KEY ("taskEstimationId") REFERENCES "task_estimation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
