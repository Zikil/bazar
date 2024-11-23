// "use client"

import React from 'react';
// import { useParams } from 'next/navigation';
import { MapPin, Calendar, Phone, MessageCircle, Share2, Flag, Heart } from 'lucide-react';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { ShowNumberModal } from '@/components/shared/modals/show-number';
import { getUserSession } from '@/lib/get-user-session';

type Params = Promise<{ id: string }>

export default async function AdtPage(props: { params: Params }) {
    const params = await props.params;


    const session = await getUserSession();
    const adt = await prisma.adt.findFirst({
        where: {
            id: Number(params.id),
        },
        include: {
            user: true
        }
    })

    if (!adt) {
        return notFound();
    }

    const user = adt.user

    // const { id } = params();
    // const adt = adts.find(l => l.id === id) || adts[0];

    return (
        <>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img src={String(adt.image)} alt={adt.title} className="w-full h-[400px] object-cover" />
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-2xl font-semibold">{adt.title}</h1>
                        <span className="text-2xl font-bold text-indigo-600">{adt.price}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-gray-500 mb-6">
                        <div className="flex items-center gap-1">
                        <MapPin className="h-5 w-5" />
                        <span>{adt.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                        <Calendar className="h-5 w-5" />
                        <span>{String(adt.createdAt)}</span>
                        </div>
                    </div>

                    <h2 className="font-semibold text-lg mb-3">Description</h2>
                    <p className="text-gray-600 mb-6">
                        {adt.description}
                    </p>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                        <Share2 className="h-5 w-5" />
                        <span>Share</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                        <Flag className="h-5 w-5" />
                        <span>Report</span>
                        </button>
                    </div>
                </div>
            </div>
            </div>

            <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100"
                        alt="Seller"
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <h3 className="font-semibold">{user?.name}</h3>
                        <p className="text-sm text-gray-500">Member {String(user?.createdAt)}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <ShowNumberModal phoneNumber={String(adt.user?.email)} session={session} />
                    {/* <button 
                        // onClick={() => setOpenShowNumberModal(true)}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700" 
                    >
                        <Phone className="h-5 w-5" />
                        <span>Show Phone Number</span>
                    </button> */}
                    <button className="w-full flex items-center justify-center gap-2 bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50">
                        <MessageCircle className="h-5 w-5" />
                        <span>Send Message (In development)</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
                        <Heart className="h-5 w-5" />
                        <span>Save to Favorites (In development)</span>
                    </button>
                </div>
            </div>
            </div>
        </div>
        </main>
        </>
    );
}