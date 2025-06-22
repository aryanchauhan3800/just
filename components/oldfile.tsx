'use client';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerFooter,
	DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
	X,
	Crown,
	ArrowDownWideNarrow,
	ArrowUpDownIcon,
	IndianRupeeIcon,
	LocationEditIcon,
} from "lucide-react";
// import { Party } from "@/types/dashboardAndInvoiceTypes";
import { Party } from '@/types/party-types';
import { FC, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct for App Router

const dummyParty: Party = {
	partyID: "P12345",
	companyName: "Ashok Srivastav",
	type: "Customer",
	toPay: "6,20,000.00",
	toReceive: "80,000.00",
	lastActivity: "24",
	highValue: true,
	status: "Active",
};

export function PartyDetailsDrawer({
  open,
  onOpenChangeAction,
  party = dummyParty,
}: {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  party?: Party;
}) {
  const [status, setStatus] = useState(party.status || 'Active');
  const router = useRouter(); // ✅ useRouter for client-side navigation

  const handleToggle = () => {
    setStatus((prev) => (prev === 'Active' ? 'Inactive' : 'Active'));
  };

  const handleNewInvoice = () => {
    router.push('/parties/new/1'); 
  };

  return (
   <Drawer open={open} onOpenChange={onOpenChangeAction} direction="right">
         <DrawerContent className="!w-[45vw] !max-w-none h-full border-l border-gray-200 rounded flex flex-col p-0 overflow-hidden bg-white">
           <div className="flex-1 overflow-hidden">
             <ScrollArea className="h-full">
               <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: 'url("/party-bg.svg")' }}>
                 <DrawerHeader className="flex flex-row justify-between items-center py-4 px-4 bg-white bg-opacity-80 backdrop-blur-sm">
                   <DrawerTitle className="text-lg font-semibold">Party Basics</DrawerTitle>
                   <DrawerClose asChild>
                     <Button variant="ghost" size="icon">
                       <X className="h-5 w-5" />
                     </Button>
                   </DrawerClose>
                 </DrawerHeader>
   
                 <div>
                   <img src="/bgPartydetail.png" className="!w-[50vw] !h-[120px]" />
                   <div className="absolute -bottom-19 left-6 flex items-center gap-4 z-10 ">
                     <div className="h-16 w-16 bg-red-500 text-white rounded-full flex items-center justify-center text-[24px] font-light ring-4 ring-white shadow-md">
                       {party.companyName?.split(' ').map((w) => w[0]).join('')}
                     </div>
                   </div>
   
                   <div>
                     <div className="absolute pt-6 ml-6 gap-16  ">
                       <h2 className="text-lg font-semibold flex items-center gap-2 text-[#242424]">
                         {party.companyName}
                         {party.highValue && (
                           <div className="text-[14px] text-[#474747] pt-1 ml-3 pb-1">
                            <span className='text-[#8F8F8F] text-[12px] font-light'> Last Activity - </span> {dummyParty.lastActivity} days ago
                           </div>
                         )}
                       </h2>
   
                       <div >
                         <div className="flex items-center gap-4">
                           <div className="text-xs text-[#8F8F8F] text-[14px]  ">
                             {party.type} - Individual
                           </div>
                           <div className='-ml-3'>
                           <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full flex w-[92px] items-center gap-1">
                             <Crown className="h-3 w-3" />
                             High value
                           </span>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
   
                   <div className="relative mr-6">
     <div className="flex items-center gap-2 absolute right-0 top-[30px]  ">
       <div
         className={`flex items-center gap-2 px-2 py-1 rounded-md text- font-medium ${
           status === 'Active'
             ? 'bg-green-100 text-green-600'
             : 'bg-red-100 text-red-600'
         }`}
       >
         <span
           className={`w-3 h-3 rounded-full ${
             status === 'Active' ? 'bg-green-500' : 'bg-red-500'
           }`}
         />
         {status}
       </div>
       <Switch checked={status === 'Active'} onCheckedChange={handleToggle} />
     </div>
   </div>
   
                  </div>
               </div>
   
               <div className="px-6 pt-45 pb-6 flex flex-col gap-8 text-sm text-gray-800">
                 <div className="grid grid-cols-3 gap-4 ">
                   <div className="bg-[#c3f6d0]  shadow p-2 text-center space-y-1 h-[68px] ">
                     <div className="text-xs tracking-wide text-[#242424] flex justify-center items-center gap-1  inset-inline-start: -1px;  -ml-20 ">
                       <ArrowUpDownIcon className="h-3 w-3" />
                       To Receive
                     </div>
                     <div className="text-[20px] uppercase tracking-wide text-[#034714] flex justify-center items-center gap-1  inset-inline-start: -1px; pt-1 -ml-15 ">
                       ₹ {party.toReceive}
                     </div>
                   </div>
                   <div className="bg-red-50    shadow p-2 text-center space-y-1 h-[68px]  ">
                     <div className="text-xs tracking-wide text-[#242424] flex justify-center items-center gap-1  -ml-26 ">
                       <ArrowDownWideNarrow className="h-3 w-3" />
                       To Pay
                     </div>
                     <div className="text-[20px] tracking-wide text-[#F5222D] flex justify-center items-center gap-1  inset-inline-start: -1px;  -ml-15 pt-1">
                       ₹ {party.toPay}
                     </div>
                   </div>
                   <div className="bg-yellow-50  border-yellow-200  shadow p-2 text-center space-y-1 h-[68px]">
                     <div className="text-xs tracking-wide text-[#242424] flex justify-center items-center gap-1 -ml-2">
     <IndianRupeeIcon className="h-3 w-3" />
     <span>Transaction this month</span>
   </div>
   
                     
                    <div className="text-[20px] text-[#242424] ml-[-30px] pt-1">
     ₹ 24,000.00
   </div>
   
                   </div>
                 </div>
   <div className="space-y-6 text-sm text-gray-800">
     {/* Contact Section */}
     <div className="flex items-start space-x-2">
       <span className="text-gray-400 mt-1">📞</span>
      <div className="flex items-center text-[14px] mb-2">
     <div className="text-gray-400  min-w-[160px]">Contact :</div>
     <div className="text-blue-600 font-medium ml-4">+91 8955898589</div>
   </div>
   
     </div>
   
     {/* Email Section */}
    <div className="flex items-start gap-4">
     {/* Icon + Label */}
     <div className="flex items-center space-x-1">
       <div className="text-gray-400 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center text-xs">
         @
       </div>
       <div className="text-gray-400 text-sm min-w-[160px]">Mail :</div>
     </div>
   
     {/* Emails */}
     <div className="flex flex-col text-blue-600 text-sm">
       <div>singharchana07@gmail.com</div>
       <div>archanagtor07@gmail.com</div>
     </div>
   </div>
   
   
   
     <hr className="border-gray-200" />
   
     {/* Billing Address */}
     <div className="flex items-start gap-3">
     {/* Icon */}
     <div className="mt-1 text-gray-400">
       <LocationEditIcon />
     </div>
   
     {/* Label + Address */}
     <div className="flex">
       {/* Label */}
       <div className="text-gray-400 text-xs min-w-[190px]">Billing Address :</div>
   
       {/* Address */}
       <div className="text-sm">
         14/2 Ramnagar Street<br />
         Gautam Buddha Nagar, Noida<br />
         Uttar Pradesh, India
       </div>
     </div>
   </div>
   
   
   
   
     {/* PIN */}
     <div className="flex items-start space-x-2">
       <span className="text-gray-400 mt-1">📌</span>
       <div className=' flex '>
         <div className="text-gray-400 text-xs mb-1  min-w-[220px]">PIN :</div>
         <div>213013</div>
       </div>
     </div>
   
     {/* GSTIN */}
     <div className="flex items-start space-x-2">
       <span className="text-gray-400 mt-1">🧾</span>
       <div className='flex'>
         <div className="text-gray-400 text-xs mb-1  min-w-[220px] ">GSTIN :</div>
         <div>19AAACC1206D2ZC</div>
       </div>
     </div>
   
     {/* PAN */}
     <div className="flex items-start space-x-2">
       <span className="text-gray-400 mt-1">💳</span>
       <div className='flex'>
         <div className="text-gray-400 text-xs mb-1  min-w-[220px] ">PAN :</div>
         <div>HDFFR7874G</div>
       </div>
     </div>
   </div>
   
   
                 
   
                 <div className="border-t pt-4">
                   <div className="flex items-center justify-between text-sm text-muted-foreground">
                     <div className="flex gap-6">
                       <div className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Transactions</div>
                       <div>Quotations</div>
                       <div>Challans</div>
                     </div>
                     <div className="text-blue-600 font-medium cursor-pointer">View all &gt;</div>
                   </div>
   
                   <div className="mt-4 flex items-center justify-between">
                     <span className="text-sm text-blue-600 font-medium cursor-pointer">#INV-0000001</span>
                     <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Full Amount Due</span>
                   </div>
                 </div>
               </div>
             </ScrollArea>
           </div>

        <DrawerFooter className="flex justify-between items-center px-6 py-4 border-t bg-white rounded-b-lg">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="items-center gap-2 text-sm font-medium"
              onClick={handleNewInvoice}
            >
              View Full Details
              <span className="text-base">&#8250;</span>
            </Button>

            <DrawerClose asChild>
              <button className="text-sm text-gray-700 hover:underline font-medium ml-4  pl-[360]">
                Close
              </button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
