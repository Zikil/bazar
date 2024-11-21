import Header from "@/components/Header"
import { ProfileForm } from "@/components/shared/profile-form"
import { getUserSession } from "@/lib/get-user-session"
import { prisma } from "@/prisma/prisma-client"
import { redirect } from "next/navigation"


export default async function Profile() {
    const session = await getUserSession()
    
    if (!session) {
      return redirect('/not-auth')
    }
    
    const user = await prisma.user.findFirst({
      where: {
        id: Number(session?.id)
      },
      include: {
        adts: true
      }
    })
  
    if (!user) {
      return redirect('/not-auth')
    }

    console.log(user?.adts)
  
    return (
      <ProfileForm data={user} />
    )
}