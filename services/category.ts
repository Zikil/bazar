import { Category } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constant";

export const getAll = async (): Promise<Category[]> => {
    const {data} = await axiosInstance.get<Category[]>(ApiRoutes.CATEGORY);

    return data;
}
