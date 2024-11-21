import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

interface Props {
    onClickSignIn?: () => void;
    classname?: string;
}

export const ProfileButton: React.FC<Props> = ({ onClickSignIn, classname}) => {
    const { data: session } = useSession();
    
    
    return (
        <div className={classname}>
            {
                !session ? <Button onClick={onClickSignIn} variant='outline' className="relative p-2 rounded-full">
                <div className='flex items-center gap-2'>
                <User className="h-6 w-6 text-gray-600" />
                SignIn
                </div>
                </Button> : <Link href="/profile">
                <Button variant='secondary' className="flex items-center  gap-2">
                    <CircleUser size={18} />
                </Button>
                
                </Link>
            }

        </div>


    )
}