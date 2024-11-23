import { useSession, signOut } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { CircleUser, User, LogOut } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
    onClickSignIn?: () => void;
    classname?: string;
}

export const ProfileButton: React.FC<Props> = ({ onClickSignIn, classname}) => {
    const { data: session } = useSession();
    
    return (
        <div className={classname}>
            {
                !session ? (
                    <Button onClick={onClickSignIn} variant='outline' className="relative p-2 rounded-full">
                        <div className='flex items-center gap-2'>
                            <User className="h-6 w-6 text-gray-600" />
                            SignIn
                        </div>
                    </Button>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='secondary' className="flex items-center gap-2">
                                <CircleUser size={18} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <Link href="/profile">
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Профиль</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => signOut()}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Выйти</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        </div>
    )
}