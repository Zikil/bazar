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
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Bazar
            </Link>
          </div>
          
          {/* Desktop Search */}
          <div className="hidden sm:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center gap-3">
            <button 
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search className="h-6 w-6 text-gray-600" />
            </button>
            
            <Link
              href="/adt/create"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <PlusCircle className="h-6 w-6 text-indigo-600" />
            </Link>

            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/adt/create"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <PlusCircle className="h-6 w-6 text-indigo-600" />
            </Link>
            {/* <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button> */}

            <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
            
            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          </div>
        </div>

        {/* Mobile Search */}
        {mobileSearchOpen && (
          <div className="sm:hidden py-2 border-t">
            <div className="relative">
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}