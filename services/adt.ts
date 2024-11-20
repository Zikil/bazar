import { Adt } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constant";

export const search = async (query: string): Promise<Adt[]> => {
    const {data} = await axiosInstance.get<Adt[]>(ApiRoutes.ADT, {params: {query}});

    return data;
}