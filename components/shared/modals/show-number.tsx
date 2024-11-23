'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getUserSession } from "@/lib/get-user-session";
import React from "react";
import { Phone } from "lucide-react";
import { Session } from "next-auth";

interface Props {
    phoneNumber: string;
    session: Session["user"] | null;
}

export const ShowNumberModal: React.FC<Props> = ({ phoneNumber, session }) => {
    const [open, setOpen] = React.useState(false);
    // const [session, setSession] = React.useState<any>(null);

    // React.useEffect(() => {
    //     const getSession = async () => {
    //         const userSession = await getUserSession();
    //         setSession(userSession);
    //     };
    //     getSession();
    // }, []);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
                <Phone className="h-5 w-5" />
                <span>Show Phone Number</span>
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[450px] bg-white p-10">
                    {session ? (
                        <h1 className="text-2xl font-bold mb-4">{phoneNumber}</h1>
                    ) : (
                        <h2 className="text-xl text-center">Please login to see the phone number</h2>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};