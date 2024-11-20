"use client"

import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import Link from 'next/link';
// import { Link } from 'next/navigation';

interface ListingCardProps {
  id: string;
  title: string;
  price?: string;
  location?: string;
  image?: string;
  date: string;
}

export default function ListingCard({ id, title, price, location, image, date }: ListingCardProps) {
  return (
    <Link href={`/adt/${id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-t-xl"
          />
          <button 
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              // Handle favorite toggle
            }}
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{title}</h3>
            <span className="text-lg font-semibold text-indigo-600">{price}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="mt-2 text-sm text-gray-400">{date}</div>
        </div>
      </div>
    </Link>
  );
}