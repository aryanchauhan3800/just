'use client';



import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import {
  ArrowDownWideNarrow,
  BanknoteIcon,
  Clock,
  Crown,
 
  NotepadText,
} from 'lucide-react';
import { useState } from 'react';
import router from 'next/router';
import { LocationCity, LocationOnSharp } from '@mui/icons-material';
import { Party } from '@/types/party-types';


import AccountSummarySwitch from './AccountSummarySwitch';

const dummyParty: Party = {
  partyID: 'P12345',
  companyName: 'Ashok Srivastav',
  type: 'Customer',
  toPay: '6,20,000.00',
  toReceive: '80,000.00',
  lastActivity: '24',
  highValue: true,
  status: 'Active',
};

const handleNewInvoice = () => {
  router.push("/parties/new");
};

export function PartyDetailsDrawer({
  open,

  party = dummyParty,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  party?: Party;
}) {
  const [status, setStatus] = useState(party.status || 'Active');

  const handleToggle = () => {
    setStatus((prev) => (prev === 'Active' ? 'Inactive' : 'Active'));
  };

  return (
    <>  

    
<div className='flex flex-row  '>
    <div className="     border-l border-gray-200 rounded flex flex-col p-0  bg-white left-full top-0  ">
   <div className="w-full max-w-[480px] overflow-hidden">

        
        
        <ScrollArea className="h-[700px]    ">
          <div className="    relative h-32 bg-cover bg-center" style={{ backgroundImage: 'url("/part-bg.svg")' }}>
 
            <div className=' '>
              <img
                src="/bgPartydetail.png"
                className=" w-[480px] h-[120px] "
                alt="Party Background"
              />

             

              <div className="absolute -bottom-4 left-6 flex items-center gap-4 z-10   ">
                <div className="h-16 w-16 bg-red-500 text-white rounded-full flex font-lato items-center justify-center text-[24px] font-light ring-4 ring-white shadow-md ">
                  {party.companyName?.split(' ').map((w) => w[0]).join('')}
                </div>
              </div>
              <div className="absolute pt-8 ml-7 gap-16 ">

                <h2 className="text-lg font-semibold flex items-center gap-2 text-[#242424]">
                  {party.companyName}
                  {party.highValue && (
                      <div className="flex items-center justify-center ml-0">
                     <span className="flex items-center justify-center gap-1 px-2 h-[20px] w-[95px] rounded-[10px] bg-[#F5A623] text-white text-[12px] font-medium">
  <Crown className="w-3 h-3" />
  High value    
</span>
                    </div>
                  )}
                </h2>
                <div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-[#8F8F8F] text-[14px]">
                      {party.type} - Individual
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
          </div>

<div className='pt-21'> <hr className="border-t border-gray-100 " /></div>

          

          <div className="px-4 sm:px-6 pt-8 flex flex-col gap-8 text-sm text-gray-800 ">
            <div className="space-y-6 text-sm text-gray-800">
              <div className="flex items-center gap-4">
                <div className="text-gray-400 min-w-[100px]">📞 Contact :</div>
                <div className="text-blue-600 font-medium">+91 8955898589</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-gray-400 min-w-[100px] flex">
                  <span className="pr-2">@</span> Email :
                </div>
                <div className="text-blue-600 font-medium">singharchana07@gmail.com</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-gray-400 min-w-[100px]">🕒 Last Activity :</div>
                <div className="text-gray-800">24 days ago</div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="text-gray-400 min-w-[100px]">Status :</div>
                  <div
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-sm font-medium ${
                      status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    {status}
                  </div>
                  <div className="pl-5">
                    <Switch checked={status === 'Active'} onCheckedChange={handleToggle} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-gray-400 min-w-[100px]">Added on :</div>
                <div className="text-gray-800">24 Mar, 2024</div>
              </div>
            </div>

            {/* Business Details */}
            <div>
              <div className="w-[700px] bg-[#FAFAFA] border-y border-gray-200 h-[62px] -ml-8 ">
                <div className="px-4 py-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg  text-[#202020] pt-1 text-[18px] font-light">Business Details</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5 text-sm text-gray-800 pt-7">
                <div className="flex items-start gap-4">
                  <div className="text-gray-400 min-w-[120px] flex gap-1">
                    <LocationCity />
                    Billing Address
                  </div>
                  <div className="pl-8">
                    24/5 Chadni Chowk Road<br />
                    Gautam Buddha Nagar<br />
                    Uttar Pradesh , India
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-gray-400 min-w-[120px] flex gap-1">
                    <LocationOnSharp />
                    PIN
                  </div>
                  <div className="pl-8">214026</div>
                </div>

                <div className="flex flex-wrap items-center justify-between w-full gap-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full text-gray-400">
                        <LocationOnSharp />
                      </div>
                      <span>Shipping Address</span>
                    </div>
                    <div className="flex  pl-4">
                      <div className="w-5 h-5 flex items-center justify-center bg-[#F3F4F6] text-[#3B82F6] text-[13px] rounded-full font-semibold ">
                        3
                      </div>
                      <span className='pl-2'>Shipping Address</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-700 cursor-pointer hover:underline pl-16">
                    view
                  </div>
                  </div>

                  
                  
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-gray-400 min-w-[120px] flex gap-1">
                    <NotepadText /> GST
                  </div>
                  <div className="text-gray-900  pl-8">27AAAPA1234A1Z5</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-gray-400 min-w-[120px] flex gap-1">
                    <NotepadText /> PAN
                  </div>
                  <div className="text-gray-900 pl-8">SPDOF4457G</div>
                </div>




<div className="w-[700px] bg-[#FAFAFA] border-y border-gray-200 h-[62px] -ml-8 ">
                <div className="px-4 py-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg  text-[#202020] pt-1 text-[18px] font-light">Bank Details</span>
                  </div>
                </div>
             </div>    
<div
  className="w-full max-w-[414px] h-[72px] rounded-[8px] px-2 py-2 bg-white hover:bg-gray-100
    transition-colors cursor-pointer"
>
  <label className="flex items-center justify-between w-full h-full cursor-pointer">
    {/* Left: Radio + Logo + Bank Info */}
    <div className="flex items-center gap-3 sm:gap-4">
      <input
        type="radio"
        name="gateway"
        defaultChecked
        className="accent-blue-600 w-4 h-4"
      />

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="border-2 border-dashed rounded-md w-[80px] h-[52px] flex items-center justify-center">
          <img
            src="/baroda-logo.png"
            alt="Bank Logo"
            className="h-5 object-contain"
          />
        </div>

        <div className="flex flex-col justify-center text-sm leading-tight">
          <p className="font-semibold text-black">
            Bank of Baroda - <span className="font-normal text-gray-700">4588</span>
          </p>
          <p className="text-gray-500">Current Account</p>
        </div>
      </div>
    </div>

    {/* Right side badge */}
    <p className="text-sm text-gray-400 whitespace-nowrap">Default</p>
  </label>
</div>







<div
  className="w-full max-w-[414px] h-[72px] rounded-[8px] px-2 py-2 bg-white hover:bg-gray-100
    transition-colors cursor-pointer"
>
  <label className="flex items-center justify-between w-full h-full cursor-pointer">
    {/* Left: Radio + Logo + Bank Info */}
    <div className="flex items-center gap-3 sm:gap-4">
      <input
        type="radio"
        name="gateway"
        defaultChecked
        className="accent-blue-600 w-4 h-4"
      />

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="border-2 border-dashed rounded-md w-[80px] h-[52px] flex items-center justify-center">
          <img
            src="/idbi-bank.png"
            alt="Bank Logo"
            className="h-5 object-contain"
          />
        </div>

        <div className="flex flex-col justify-center text-sm leading-tight">
          <p className="font-semibold text-black">
           IDBI Bank - <span className="font-normal text-gray-700">4588</span>
          </p>
          <p className="text-gray-500">Current Account</p>
        </div>
      </div>
    </div>

    {/* Right side badge */}
   
  </label>
</div>



<div className="flex items-center gap-2  ">
                
                <span className='text-gray-400'><BanknoteIcon/></span>
                <div className="text-gray-400 min-w-[100px] flex   "> Opening Balance</div>
                <div className="   pl-8">₹ 24,000</div>
              </div>



<div className="flex items-center gap-2  ">
                
                <span className='text-gray-400'><BanknoteIcon/></span>
                <div className="text-gray-400 min-w-[100px] flex   "> Payment Terms</div>
                <div className="   pl-10">Custom</div>
              </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
       
    </div>
  
   


 <div>
<div>

  
</div>

 
</div>
  
<div className=" w-full overflow-hidden bg-white h-[700px] ">


<div className='px-3 '>
   	<h2 className="text-[#474747] text-[22px] min-h-[66px] px-6 flex items-center border-b border-[#E8E8E8] pt-5 pl-2">
						Account  Summary
					</h2>
  <div className="mt-4 flex flex-wrap  gap-3">
   
    {/* To Receive */}
    <div className="flex-1 h-[68px] bg-green-50 rounded-md shadow p-2  ">
      <div className="text-xs text-gray-700 flex items-center gap-1 mt-0">
        <ArrowDownWideNarrow className="h-4 w-4 text-green-600 " />
        To Receive
      </div>
      <div className="text-green-800 text-lg font-lato  mt-2 pl-2">
        ₹ {party.toReceive}
      </div>
    </div>

    {/* To Pay */}
    <div className="flex-1 w-[220px] h-[68px] bg-red-50 rounded-md shadow p-2">
      <div className="text-xs text-gray-700 flex items-center gap-1">
        <ArrowDownWideNarrow className="h-4 w-4 text-red-600 rotate-180" />
        To Pay
      </div>
      <div className="text-red-600 text-lg font-lato mt-2 pl-2">
        ₹ {party.toPay}
      </div>
    </div>

    {/* Transaction this month */}
    <div className="flex-1 w-[220px] h-[68px] bg-yellow-50 rounded-md shadow p-2">
      <div className="text-xs text-gray-700 flex items-center gap-1 whitespace-nowrap">
  <Clock className="h-3 w-3 text-yellow-600" />
  Transaction this month
</div>

      <div className="text-gray-900 text-lg font-lato mt-2 pl-1">
        ₹ {party.toReceive}
      </div>
    </div>

    {/* Avg Payment Time */}
    <div className="flex-1 min-w-[220px] h-[68px] bg-gray-100 rounded-md shadow p-2">
      <div className="text-xs text-gray-700 flex items-center gap-1">
        <Clock className="h-3 w-3 text-gray-600" />
        Avg Payment time
      </div>
      <div className="text-gray-800 text-lg font-lato mt-2 pl-2">
        24 <span className="text-sm font-normal">hrs</span>
      </div>

    </div>
  </div>

</div>
<div className='pt-8 bg-white overflow-y-auto'>

  <AccountSummarySwitch   />

</div>

</div>



</div>







  
   
    </>
    
  );
}
