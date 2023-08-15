export interface PrismaDelegate {
  aggregate(data: unknown): Promise<unknown>;

  count(data: unknown): Promise<unknown>;

  create(data: unknown): Promise<unknown>;

  createMany(
    args: { data: any[] } | { data: any[]; skipDuplicates?: boolean },
  ): Promise<unknown>;

  delete(data: unknown): Promise<unknown>;

  deleteMany(data: unknown): Promise<unknown>;

  findFirst(data: unknown): Promise<unknown>;

  findMany(data: unknown): Promise<unknown>;

  findUnique(data: unknown): Promise<unknown> | unknown;

  update(data: unknown): Promise<unknown>;

  updateMany(data: unknown): Promise<unknown>;

  upsert(data: unknown): Promise<unknown>;
}
