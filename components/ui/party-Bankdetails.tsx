'use client';

import { FC, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check } from 'lucide-react';

const banks = [
  {
    name: "HDFC Bank",
    logo: "/hdfc-bank.png", // store this in your public/banks folder
  },
  {
    name: "SBI Bank",
    logo: "/sbi-bank.png",
  },
  {
    name: "Axis Bank",
    logo: "/axis-bank.png",
  },
];

interface CreditBankDetailsProps {
  itemType: 'Customer' | 'Vendor' | 'Both';
  toggleItemType: () => void;
}

const CreditBankDetails: FC<CreditBankDetailsProps> = ({ itemType, toggleItemType }) => {
  const [bankSearch, setBankSearch] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);

    function onManualSelect(event: React.MouseEvent<HTMLDivElement>): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div className="flex flex-col px-8 py-4 gap-6 rounded-md w-full max-w-2xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[#333]">Credit & Bank Details</h2>
          <p className="text-sm text-[#999]">Pay via UPI or other payment Gateways</p>
        </div>
        <button className="text-sm text-blue-600 font-medium">Skip for Now</button>
      </div>

      {/* Opening Balance */}
     <div className="flex items-center gap-4">
  <label className="min-w-[160px] text-sm font-medium text-gray-900">
    <span className="text-red-500 mr-1">*</span> Opening Balance:
  </label>

  <div className="relative flex w-full max-w-md bg-white">
    {/* Input */}
    <Input
      placeholder="Enter opening balance"
      className="rounded pr-28" // leave space for select
    />

    {/* Select styled like part of input */}
      <Select>
      <SelectTrigger className="absolute right-0 top-0 h-full w-28 rounded border-l-0 bg-gray-100 text-gray-500 font-medium">
        <SelectValue placeholder="I Receive" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="receive">I Receive</SelectItem>
        <SelectItem value="pay">I Pay</SelectItem>
      </SelectContent>
      </Select>
  </div> 
</div>


      {/* Payment Terms */}
      <div className="flex items-center gap-4">
        <span className="min-w-[160px] text-sm font-medium text-gray-900">
          <span className="text-red-500">*</span> Payment Terms:
        </span>
        <Select>
          <SelectTrigger className="bg-white w-full">
            <SelectValue placeholder="Custom" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Custom</SelectItem>
            <SelectItem value="15days">15 Days</SelectItem>
            <SelectItem value="30days">30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bank Name Autocomplete */}



       <div className="flex items-center gap-4">
        <span className="min-w-[160px] text-sm font-medium text-gray-900">
          <span className="text-red-500">*</span> Payment Terms:
        </span>
     <div>
        
       <Select>
      <SelectTrigger className="w-[430px] bg-white border rounded px-4 py-2">
        <SelectValue placeholder="Select Bank" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        {banks.map((bank, index) => (
          <SelectItem
            key={index}
            value={bank.name}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={bank.logo}
              alt={bank.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            {bank.name}
          </SelectItem>
        ))}

        <div
          onClick={onManualSelect}
          className="text-blue-600 text-sm cursor-pointer px-3 py-2 hover:underline"
        >
          Enter Manually
        </div>
      </SelectContent>
    </Select>
        {bankSearch && !showManualEntry && (
          <div className="ml-[16px] border rounded-md shadow bg-white max-h-48 overflow-y-auto w-[400px]">
            {banks
              .filter((b) => b.name.toLowerCase().includes(bankSearch.toLowerCase()))
              .map((bank, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setBankSearch(bank.name);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                >
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span>{bank.name}</span>
                </div>
              ))}
            <div
              className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
              onClick={() => setShowManualEntry(true)}
            >
              Enter Manually
            </div>
          </div>
        )}
      </div>

      </div>
      

      {/* Account Details */}
      <div className="space-y-4">
        {[
          { label: 'Account Holder Name', required: true },
          { label: 'Account Number', required: true },
          { label: 'IFSC Code', required: true },
          { label: 'Branch Name', required: true },
          { label: 'Location', required: true },
        ].map((field, i) => (
          <div className="flex items-center gap-4  " key={i}>
            <span className="min-w-[160px] text-sm font-medium text-gray-900">
              {field.required && <span className="text-red-500">*</span>} {field.label}:
            </span>
            <Input className="flex-1 bg-white" placeholder={`Enter ${field.label.toLowerCase()}`} />
          </div>
        ))}

        {/* UPI Field */}




<div className="flex items-start gap-4">
  <label className="min-w-[80px] text-sm font-medium text-gray-900 mt-2">
    <span className="text-red-500">*</span> UPI ID:
  </label>

  <div className="flex flex-col flex-1 bg-white">
    <div className="flex rounded border border-gray-300 overflow-hidden">
      <input
        type="text"
        placeholder="Enter UPI ID"
        className="flex-1 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none"
      />
      <div className="flex items-center px-3 border-l text-sm text-gray-600 bg-white">
        @UPI
      </div>
    </div>
    <span className="text-green-600 text-sm mt-1">UPI ID confirmed</span>
  </div>
</div>


       
      </div>









      {/* Optional: Vendor specific toggle */}
      {itemType === 'Vendor' && (
        <div className="flex items-center gap-2 mt-4">
          <span
            onClick={toggleItemType}
            className="size-5 border rounded cursor-pointer flex items-center justify-center bg-blue-600"
          >
            <Check className="text-white w-4 h-4" />
          </span>
          <span className="text-sm font-medium text-gray-800">
            Toggle Vendor Mode
          </span>
        </div>
      )}
    </div>
  );
};

export default CreditBankDetails;
