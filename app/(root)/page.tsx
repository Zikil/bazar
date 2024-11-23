// "use client"

import Categories from "@/components/Categories";
import ListingCard from "@/components/ListingCard";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const adts = await prisma.adt.findMany()
  const session = await getUserSession()
  
  // if (!session) {
  //   return redirect('/not-auth')
  // }
  
  // const user = await prisma.user.findFirst({
  //   where: {
  //     id: Number(session?.id)
  //   }
  // })

  // console.log(user)
  console.log("session",session)

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Categories />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Featured Listings</h2>
            <div className="flex gap-2">
              <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white">
                <option>Most Recent</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adts.map((adt) => (
              <ListingCard key={adt.id} title={adt.title} image={String(adt.image)} price={String(adt.price)} location={String(adt.location)} date={String(adt.createdAt)} id={String(adt.id)} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}