// 'use client'

import React from 'react';
import { ImagePlus, X } from 'lucide-react';
import { AdtCreateForm } from '@/components/shared/adt-create/adt-create-form';

export default function CreateListing() {
  return (

    <AdtCreateForm />


    // <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //   <div className="bg-white rounded-xl shadow-sm p-6">
    //     <h1 className="text-2xl font-semibold mb-6">Create New Listing</h1>
        
    //     <form className="space-y-6">
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">
    //           Title
    //         </label>
    //         <input
    //           type="text"
    //           className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
    //           placeholder="Enter listing title"
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">
    //           Category
    //         </label>
    //         <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
    //           <option>Select a category</option>
    //           <option>Vehicles</option>
    //           <option>Real Estate</option>
    //           <option>Electronics</option>
    //           <option>Fashion</option>
    //           <option>Jobs</option>
    //           <option>Sports</option>
    //           <option>Art</option>
    //           <option>Books</option>
    //         </select>
    //       </div>

    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">
    //           Price
    //         </label>
    //         <div className="relative">
    //           <span className="absolute left-4 top-2 text-gray-500">$</span>
    //           <input
    //             type="number"
    //             className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
    //             placeholder="0.00"
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">
    //           Description
    //         </label>
    //         <textarea
    //           rows={4}
    //           className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
    //           placeholder="Describe your item..."
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">
    //           Photos
    //         </label>
    //         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    //           <button className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-indigo-500 hover:bg-indigo-50">
    //             <ImagePlus className="h-8 w-8 text-gray-400" />
    //             <span className="mt-2 text-sm text-gray-500">Add Photo</span>
    //           </button>
    //         </div>
    //       </div>

    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">
    //           Location
    //         </label>
    //         <input
    //           type="text"
    //           className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
    //           placeholder="Enter location"
    //         />
    //       </div>

    //       <div className="flex gap-3">
    //         <button
    //           type="submit"
    //           className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
    //         >
    //           Create Listing
    //         </button>
    //         <button
    //           type="button"
    //           className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </main>
  );
}