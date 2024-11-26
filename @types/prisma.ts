import { Adt, Category, City, Country, User } from "@prisma/client";

export type AdtWithRelations = Adt & { category: Category; city: City; country: Country; user: User };