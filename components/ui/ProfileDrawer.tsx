'use client';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import {
  X,
  Crown,
  ArrowDownWideNarrow,
  ArrowUpDownIcon,
  IndianRupeeIcon,
  LocationEditIcon,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Party } from '@/types/party-types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BankAccount } from '@/types/party-types';
import { Employee } from '@/types/party-types'; 

export function PartyDetailsDrawer({
  open,
  onOpenChangeAction ,
}: {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  party?: Party;
}) {

  const router = useRouter(); 



  const handleNewInvoice = () => {
    router.push('/dashboard/user-profile'); 
  };

const [activeTab, setActiveTab] = useState<'banks' | 'employees'>('banks');

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      name: 'Bank of Baroda',
      accountNumber: '4588',
      type: 'Current Acc.',
      isDefault: true,
      logoUrl: '/baroda-logo.png',
    },
    {
      id: '2',
      name: 'IDBI Bank',
      accountNumber: '4588',
      type: 'Current Acc.',
      logoUrl: '/baroda-logo.png',
    },
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Ashok Srivastav',
      location: 'Pratapgarh',
      color: 'bg-blue-500',
    },
    {
      id: '2',
      name: 'Balwant Singh Joshi',
      location: 'Pratapgarh',
      color: 'bg-violet-500',
    },
    {
      id: '3',
      name: 'Tirtha Sankar',
      location: 'Raigarh',
      color: 'bg-lime-400',
    },
    {
      id: '4',
      name: 'Agniya Mitra',
      location: 'Zamin Zilla',
      color: 'bg-yellow-500',
    },
    {
      id: '5',
      name: 'Tejas Singh',
      location: 'Pratapgarh',
      color: 'bg-red-500',
    },
  ]);
  return (
   <Drawer open={open} onOpenChange={onOpenChangeAction} direction="right">
         <DrawerContent className="!w-[45vw] !max-w-none h-full border-l border-gray-200 rounded flex flex-col p-0 overflow-hidden bg-white">
           <div className="flex-1 overflow-hidden">
             <ScrollArea className="h-full">
               <div className="relative  bg-cover bg-center border bottom-1"  >
                 <DrawerHeader className="flex flex-row justify-between items-center py-4 px-4 bg-white bg-opacity-80 backdrop-blur-sm">
                   <DrawerTitle className="text-lg font-semibold"> Your Company </DrawerTitle>
                   <DrawerClose asChild>
                     <Button variant="ghost" size="icon" className="border border-gray-500 px-4 py-4 rounded-3xl" >
                       <X/>
                     </Button>
                   </DrawerClose>
                 </DrawerHeader>
   
                 <div>
                   
               
   
   
             
   
                  </div>
               </div>



     <div className=" max-w-[690px]  shadow-md p-4">
      <p className="text-sm text-[#6B6B6B] mb-3">Active Company</p>
      <div className="flex items-center justify-between bg-[#FAFAFA] rounded-full px-4 py-2  border border-gray-200">
        <div className="flex items-center gap-3 ">
          <div className="w-15 h-15 rounded-full bg-[#F3F3F3] flex items-center justify-center">
            <Image
              src="/building-icon.png" // replace with actual icon path
              alt="Company Icon"
              width={30}
              height={30}
            />
          </div>
          <div>
            <p className="text-[22px] text-lato font-light text-[#242424] mb-1">Duleux Enterprise Pvt Ltd</p>
            <div className="flex items-center gap-4">
              <p className="text-xs text-[#6B6B6B]">B2B Wholesale Business</p>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-[2px] rounded-md">
                ● Selected
              </span>
            </div>
          </div>
        </div>
        <span className=' border-1 bg-white border-gray-200 rounded-full px-1 py-1'>
 <ChevronDown className=" text-[#6B6B6B]" />

        </span>
       
      </div>
    </div>








   
               <div className="px-4  pt-7 pb-6 flex flex-col gap-8 text-sm text-gray-800 pl-4">
                 <div className="grid grid-cols-3 gap-4  ml-5 mr-5">
                   <div className="bg-white border border-gray-200 rounded   shadow p-2 text-center space-y-1 h-[68px] ">
                     <div className="text-xs tracking-wide text-[#242424] flex justify-center items-center gap-1  inset-inline-start: -1px;  -ml-5 ">
                       <ArrowUpDownIcon className="h-3 w-3" />
                       Amount Receivable
                     </div>
                     <div className="text-[20px] uppercase tracking-wide text-zinc-900 flex justify-center items-center gap-1  inset-inline-start: -1px; pt-1 -ml-4 ">
                      ₹ 80,24,000
                     </div>
                   </div>
                   <div className="bg-white  border border-gray-200 rounded     shadow p-2 text-center space-y-1 h-[68px]  ">
                     <div className="text-xs tracking-wide text-[#242424] flex justify-center items-center gap-1  -ml-10">
                       <ArrowDownWideNarrow className="h-3 w-3" />
                       Amount Payable
                     </div>
                     <div className="text-[20px] tracking-wide text-zinc-900 flex justify-center items-center gap-1  inset-inline-start: -1px;  -ml-3 pt-1">
                     ₹ 80,24,000
                     </div>
                   </div>
                   <div className="bg-white   border-gray-200 border rounded shadow p-2 text-center space-y-1 h-[68px]">
                     <div className="text-xs tracking-wide text-[#242424] flex justify-center items-center gap-1 -ml-14">
     <IndianRupeeIcon className="h-3 w-3" />
     <span>Warehouses</span>
   </div>
   
                     
                    <div className="text-[20px] text-[#242424] ml-[-110px] pt-1">
     4
   </div>


   
                   </div>
                 </div>









      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium  ">
            <div className='pl-1 min-w-[210px]'>
     <span className=' flex pl-14 '>Owner :</span>
     </div>
      <div className="flex items-center gap-4 bg-gray-50 border-1 border-gray-200 rounded-full px-3 py-2 cursor-pointer ">
        <Image
          src="/Profile.png" // replace this with actual image URL
          alt="Avatar"
          
          width={32}
          height={32}
          className='border-1 border-white rounded-full '
         
        />
        <div className="flex flex-col leading-none">
          <span className="text-sm text-[#1C1C1C] font-medium min-w-[200px]">Puneet Mishra Singh</span>
          <span className="text-xs text-[#8E8E8E]">You</span>
        </div>


        <span className='pl-4 rounded-full border-1 border-gray-200 py-3 px-3'>


       
        <ChevronRight className="w-5 h-5 text-gray-400" />

       </span>
      </div>
    </div>






   <div className="space-y-6 text-sm text-gray-800">
     {/* Contact Section */}
     <div className="flex items-start space-x-2">
      
      <div className="flex items-center text-[14px] mb-2">
     <div className="text-gray-400  min-w-[250px] pl-9"><span className='pr-2'>📞</span>Contact :</div>
     <div className="text-blue-600 font-medium ">+91 8955898589</div>
   </div>
   
     </div>
   
     {/* Email Section */}
    <div className="flex items-start gap-4 pl-15">
     {/* Icon + Label */}
     <div className="flex items-center space-x-1  ">
       <div className="text-gray-400 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center text-xs ">
         @
       </div>
       <div className="text-gray-400 text-sm min-w-[150px]">Mail :</div>
     </div>
   
     {/* Emails */}
     <div className="flex flex-col text-blue-600 text-sm">
       <div>singharchana07@gmail.com</div>
       <div>archanagtor07@gmail.com</div>
     </div>
   </div>
   
   
   
     <hr className="border-gray-200 " />
   
     {/* Billing Address */}
     <div className="flex items-start gap-3 pl-7">
     {/* Icon */}
     <div className="-mt-1 text-gray-400">
       <LocationEditIcon  />
     </div>
   
     {/* Label + Address */}
     <div className="flex">
       {/* Label */}
       <div className="text-gray-400 text-xs min-w-[190px]">Address :</div>
   
       {/* Address */}
       <div className="text-sm">
         14/2 Ramnagar Street<br />
         Gautam Buddha Nagar, Noida<br />
         Uttar Pradesh, India
       </div>
     </div>
   </div>
   
   
   
   
     {/* PIN */}
     <div className="flex items-start space-x-2 pl-10">
       <span className="text-gray-400 -mt-0">📌</span>
       <div className=' flex '>
         <div className="text-gray-400 text-xs mb-1  min-w-[190px]">PIN :</div>
         <div>213013</div>
       </div>
     </div>
   
     {/* GSTIN */}
     <div className="flex items-start space-x-2 pl-6">
       <span className="text-gray-400 -mt-0">🧾</span>
       <div className='flex'>
         <div className="text-gray-400 text-xs mb-1  min-w-[200px] ">GSTIN :</div>
         <div>19AAACC1206D2ZC</div>
       </div>
     </div>
   
     {/* PAN */}
     <div className="flex items-start space-x-2 pl-9">
       <span className="text-gray-400 mt-1">💳</span>
       <div className='flex'>
         <div className="text-gray-400 text-xs mb-1  min-w-[190px] ">PAN :</div>
         <div>HDFFR7874G</div>
       </div>
     </div>
   </div>
   
   
                 
   
                <div className=" pt-4">
      {/* Tabs */}
     <div>
      {/* Tabs */}
     <div className="flex items-center justify-between text-sm text-muted-foreground border-b ">
        <div className="flex gap-6">
          <div
            className={`cursor-pointer text-sm font-medium pb-1 border-b-2 ${
              activeTab === 'banks' ? 'text-blue-600 border-blue-600' : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab('banks')}
          >
            Cash & Banks
          </div>
          <div
            className={`cursor-pointer text-sm font-medium pb-1 border-b-2 ${
              activeTab === 'employees' ? 'text-blue-600 border-blue-600' : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab('employees')}
          >
            Employees
          </div>
        </div>
        <div className="text-blue-600 font-medium cursor-pointer">View all &gt;</div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {/* Banks */}
        {activeTab === 'banks' && (
          <>
            {bankAccounts.length === 0 ? (
              <div className="text-center mt-12">
                <img src="/empty-bank-icon.svg" alt="No Bank Accounts" className="mx-auto w-10 h-10" />
                <p className="mt-2 text-gray-500">No Bank Accounts Linked</p>
                <button className="mt-1 text-blue-600 font-medium">+ Link Bank Account</button>
              </div>
            ) : (
              <>
                {bankAccounts.map((bank, idx) => (
                  <div
                    key={bank.id}
                    className="flex items-center justify-between p-3  hover:bg-gray-100 rounded-lg mb-3 shadow-sm "
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" name="bankSelect" defaultChecked={idx === 0} />
                      <div className="p-2 border-dashed border rounded-md">
                        <img src={bank.logoUrl || '/default-bank-logo.svg'} alt={bank.name} className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {bank.name} - {bank.accountNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {bank.type}
                          {bank.isDefault && <span className="text-gray-400"> - Default</span>}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 text-xl border rounded-full px-1 py-1"><ChevronRight className=" text-gray-400" /></button>
                  </div>
                ))}
                <button className="text-blue-600 font-medium mt-2 ml-60">+ New Bank</button>
              </>
            )}
          </>
        )}

        {/* Employees */}
        {activeTab === 'employees' && (
          <>
            {employees.length === 0 ? (
              <div className="text-center mt-12 m">
                <img src="/empty-employee-icon.svg" alt="No Employees" className="mx-auto w-10 h-10" />
                <p className="mt-2 text-gray-500">No Employees added</p>
                <button className="mt-1 text-zinc font-medium ">+ Add Employee</button>
              </div>
            ) : (
              employees.map((emp) => (
                <div
                  key={emp.id}
                  className="flex items-center justify-between p-1.5 border rounded-full mb-3 bg-white shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${emp.color || 'bg-gray-400'}`}
                    >
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{emp.name}</div>
                      <div className="text-sm text-gray-500">{emp.location}</div>
                    </div>
                  </div>
                  <button className="text-gray-400 text-xl px-1 py-1 rounded-full border"><ChevronRight className=" text-gray-400" />
</button>
                </div>
              ))
            )}
          </>
        )}
      </div>
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
