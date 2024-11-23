import { Dialog } from "@/components/ui/dialog";
import { getUserSession } from "@/lib/get-user-session";
import React from "react";

interface Props {
    open: boolean;
    onClose: () => void;
}

export const ShowNumberModal: React.FC<Props> = ({ open, onClose}) => {

    const [ session, setSession ] = React.useState<any>(null)

    React.useEffect(() => {
        const getSession = async () => {
            const userSession = await getUserSession()
            setSession(userSession)
        }
        getSession()
    }, [])
    // const session = await getUserSession()
    // const handleClose = () => {
    //     onClose()
    // }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            {/* <DialogContent className="w-[450px] bg-white p-10"> */}
                {/* {
                    // session && (
                    //     <h1 className="text-2xl font-bold mb-4">892348924823</h1>
                    // ) 
                } */}

                {/* <h1 className="text-2xl font-bold mb-4">892348924823</h1> */}
                <hr />
                <div className="flex gap-2">
                    

                </div>
            {/* </DialogContent> */}

        </Dialog>
    )
}