import React, { useState } from 'react'
import { useBankMethod } from '@/context/BankMethodContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useBank } from '@/hooks/useInvoice';

const SelectAccount = () => {
    const { setStep, setDialogOpen } = useBankMethod();
    const [selectedGateway, setSelectedGateway] = useState(null);

    const { data: banks = [] } = useBank();

    console.log(banks)

    return (
        <div>
            <div className="flex justify-between items-center px-6 pb-4">
                <h2 className="text-lg font-medium">Choose Your Bank Account</h2>
                <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => setStep("select-bank")}
                >
                    + New Bank
                </button>
            </div>

            <div className="space-y-4 px-6 mb-4">
                {banks.map((bank) => (
                    <label
                        key={bank.id}
                        className={`p-4 flex items-center gap-4 bg-[#FAFAFA] cursor-pointer rounded-md`}
                    >
                        <input
                            type="radio"
                            name="gateway"
                            value={bank.id}
                            checked={selectedGateway === bank.id}
                            onChange={() => setSelectedGateway(bank.id)}
                        />
                        <div className="flex flex-row items-center gap-4">
                            <div className="border-2 border-[#B3B3B3] border-dashed rounded-xs p-2">
                                <Image src={bank.logo} alt={bank.label} width={50} height={50} />
                            </div>
                            <div>
                                <p className="text-[#242424] text-base">
                                    {bank.label} <span className="text-sm">- {bank.last4}</span>
                                </p>
                                <p className="text-sm text-[#6B6B6B]">{bank.type}</p>
                            </div>
                        </div>
                    </label>
                ))}
            </div>

            <div className="border-t pt-4 pb-2 flex justify-between px-6">
                <Button variant="ghost" onClick={() => setDialogOpen?.(false)}>
                    Cancel
                </Button>
                <Button variant="primary">Apply</Button>
            </div>
        </div>
    );
};

export default SelectAccount