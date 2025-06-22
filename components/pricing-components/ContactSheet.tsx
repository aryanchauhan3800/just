import React from 'react'
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { CircleAlert, Phone } from 'lucide-react'

const ContactSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className='text-white p-2 rounded-md bg-black'>
                    <CircleAlert />
                </button>
            </SheetTrigger>
            <SheetContent side="right" className='flex justify-start p-6'>
                <SheetHeader className='mt-6'>
                    <SheetDescription>Not sure which plan to choose?</SheetDescription>
                    <SheetTitle className='text-2xl mb-10'>Contact Us</SheetTitle>

                    <SheetDescription className='contact_info'>
                        <span><Phone size={20} /></span> +91 8989778785
                    </SheetDescription>

                    <SheetDescription className='contact_info'>
                        <span className='text-lg'>@</span>
                        <a href="mailto:info@karosauda.com" className="hover:underline text-blue-600">
                            info@karosauda.com
                        </a>
                    </SheetDescription>

                    <SheetDescription className='contact_info'>
                        <span className='text-lg'>@</span>
                        <a href="mailto:support@karosauda.com" className="hover:underline text-blue-600">
                            support@karosauda.com
                        </a>
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <SheetClose>
                        <Button className='w-full' variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default ContactSheet
