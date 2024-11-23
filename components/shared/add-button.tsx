'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { AuthModal } from './modals/auth-modal/auth-modal';
import toast from 'react-hot-toast';

export default function AddButton() {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { data: session } = useSession();

  const handleClick = () => {
    if (!session) {
      toast.error("Authorization required")
      setOpenAuthModal(true);
      return;
    }
  };

  return (
    <>
      <Link
        href={session ? "/adt/create" : "#"}
        onClick={handleClick}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <PlusCircle className="h-6 w-6 text-indigo-600" />
      </Link>

      <AuthModal 
        open={openAuthModal} 
        onClose={() => setOpenAuthModal(false)} 
      />
    </>
  );
}
