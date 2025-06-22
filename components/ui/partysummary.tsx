import { ChevronLeft, Share2, SquarePen } from 'lucide-react';
import React from 'react'
import { Button } from './button';

const PartyAccountSummary = () => {
    return (
       <div>
         <div className='w-[892px] flex justify-between border-b py-1 h-[64px]'>
            <div className='flex items-center pl-2'>
                <button>
                      <ChevronLeft className="border-1 text-gray-500 rounded-full p-1 w-[40px] h-[40px]" />
                </button>
                <span className="ml-4">Party Details</span>
             
            </div>
            <div className='flex flex-row items-center p-2 gap-4 pr-6'>
               
                <div className='flex flex-row items-center gap-2'>
                    <span><Share2 className='w-4 h-4' /></span>
                    <span className='text-base'>Share</span>
                </div>
               
                <div className="flex flex-row justify-between items-center">
            
                <Button className="bg-[#025AE0] border rounded-[4px] " >
                    <span className="text-xl"> <SquarePen /></span>Edit Party Info
                </Button>
            </div>
            </div>
        </div>
       </div>
    )
}

export default PartyAccountSummary;