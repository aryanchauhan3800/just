import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBankMethod } from '@/context/BankMethodContext';
import Image from 'next/image';
import React, { useState } from 'react'

const banks = [
    {
        name: "SBI Bank",
        logo: "/sbi-logo.png"
    },
    {
        name: "Axis Bank",
        logo: "/axis-bank.png"
    },
    {
        name: "ICICI Bank",
        logo: "/icici-bank.png"
    },
    {
        name: "HDFC Bank",
        logo: "/hdfc-bank.png"
    },
    {
        name: "PNB Bank",
        logo: "/pnb-bank.png"
    },
    {
        name: "Bank of Baroda",
        logo: "/baroda-bank.png"
    },
    {
        name: "IDBI Bank",
        logo: "/idbi-logo.png"
    },
    {
        name: "Central Bank of India",
        logo: "/cent-bank.png"
    },
    {
        name: "Kotak Mahindra Bank",
        logo: "/kotak-bank.png"
    },
    {
        name: "Yes Bank",
        logo: "/yes-bank.png"
    },
]

const AddBanks = () => {
    const { setStep, setSelectedBank, setDialogOpen } = useBankMethod();
    const [selected, setSelected] = useState("");

    const handleSelectBank = (bankName: string) => {
        setSelected(bankName)
    }

    const handleProceed = () => {
        if (selected) {
            setSelectedBank(selected);
            setStep("bank-form");
        }
    };

    return (
        <div>
            <div className="flex flex-row items-start justify-between px-6">
                <Label className='text-sm'><span className="text-red-500 ml-1">*</span>Enter Bank Name:</Label>
                <Input
                    type="text"
                    placeholder="Enter the Street name"
                    className="w-2/3"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                />
            </div>
            <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-2 text-gray-500 text-sm">or</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>
            <div className='px-6 mb-10'>
                <h1 className='mb-2 text-[#6B6B6B] text-lg'>Select Your Bank</h1>
                <div className='grid grid-cols-2 gap-6'>
                    {
                        banks.map((bank) => (
                            <div
                                key={bank.name}
                                className='bg-[#FAFAFA] text-[#6B6B6B] text-lg py-3 flex flex-row items-center gap-2 hover:cursor-pointer'
                                onClick={() => handleSelectBank(bank.name)}
                            >
                                <Image src={bank.logo} alt={bank.name} width={40} height={40} />
                                <h1>{bank.name}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="border-t py-2 flex justify-between px-6">
                <Button variant="ghost" onClick={() => setDialogOpen?.(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleProceed}>
                    Proceed
                </Button>
            </div>
        </div>
    )
}

export default AddBanks