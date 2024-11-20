import React from 'react';
import { Settings, Package, Heart, Bell } from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import { adts } from '@/data/adt';
import Header from '@/components/Header';

export default function Profile() {
  return (
    <>
    <Header />

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="relative h-48 rounded-t-xl bg-gradient-to-r from-indigo-500 to-purple-600">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150"
            alt="Profile"
            className="absolute -bottom-12 left-8 w-24 h-24 rounded-full border-4 border-white"
          />
        </div>
        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-gray-500">San Francisco, CA</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <Settings className="h-5 w-5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
        <div className="border-t">
          <nav className="flex divide-x">
            <button className="flex-1 px-4 py-3 text-indigo-600 border-b-2 border-indigo-600">
              <div className="flex items-center justify-center gap-2">
                <Package className="h-5 w-5" />
                <span>My Listings</span>
              </div>
            </button>
            <button className="flex-1 px-4 py-3 text-gray-500 hover:text-gray-700">
              <div className="flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                <span>Favorites</span>
              </div>
            </button>
            <button className="flex-1 px-4 py-3 text-gray-500 hover:text-gray-700">
              <div className="flex items-center justify-center gap-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adts.slice(0, 3).map((adt) => (
          <ListingCard key={adt.id} {...adt} />
        ))}
      </div>
    </main>
    </>
  );
  
}