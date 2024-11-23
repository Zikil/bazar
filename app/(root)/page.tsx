// "use client"

import Categories from "@/components/Categories";
import ListingCard from "@/components/ListingCard";
import { BlockAdts } from "@/components/shared/block-adts";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import toast from "react-hot-toast";

export default async function Home() {
  const adts = await prisma.adt.findMany()
  // const session = await getUserSession()
  // // console.log(user)
  // console.log("session",session)

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Categories />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BlockAdts />
        </main>
      </div>
    </>
  );
}