"use client"
import React from 'react';
import { Search, PlusCircle, Bell, User } from 'lucide-react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { ProfileButton } from './shared/profile-button';
import { AuthModal } from './shared/modals/auth-modal/auth-modal';

export default function Header() {
  const [openAuthModal, setOpenAuthModal] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              MarketSpot
            </Link>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/adt/create"
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Post Ad</span>
            </Link>
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button>

            <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
            
            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

            {/* <Link
              href="/profile"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <User className="h-6 w-6 text-gray-600" />
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  );
}