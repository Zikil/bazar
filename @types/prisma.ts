import { Adt, Category, City, User } from "@prisma/client";

export type AdtWithRelations = Adt & { category: Category; city: City; user: User };