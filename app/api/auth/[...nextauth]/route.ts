import NextAuth from "next-auth"
import { authOptions } from "@/constants/auth-options"

 const handler = NextAuth(authOptions)

// Экспортируем напрямую функции GET и POST, без промежуточной переменной
export const GET = handler
export const POST = handler