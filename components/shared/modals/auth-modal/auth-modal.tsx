import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

interface Props {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose}) => {
    const [ type, setType ] = React.useState<'login' | 'register'>('login');

    const onSwitchType = () => {
        setType(type === 'login' ? 'register' : 'login')
    }

    const handleClose = () => {
        onClose()
        setType('login')
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[90%] sm:w-[450px] bg-white p-4 sm:p-10 max-h-[90vh] overflow-y-auto">
                
                {
                    type === 'login' ? <LoginForm onClose={handleClose} /> : <RegisterForm onClose={handleClose} />
                }

                <hr className="my-4" />
                <div className="flex flex-col sm:flex-row gap-2">
                    {/* <Button 
                        variant='secondary'
                        onClick={() => 
                            signIn('github', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1"    
                    >
                        <img className="2-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
                        GitHub
                    </Button> */}

                    {/* <Button 
                        variant='secondary'
                        onClick={() => 
                            signIn('google', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1"    
                    >
                        <img className="2-6 h-6" src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />
                        Google
                    </Button> */}

                </div>
                <Button variant='outline' onClick={onSwitchType} type='button' className="h-12 w-full mt-2">
                    {type === 'login' ? 'Sign Up' : 'Login'}
                </Button>
            </DialogContent>
        </Dialog>
    )
}