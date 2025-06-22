import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { BankMethodProvider, useBankMethod } from '@/context/BankMethodContext'
import { CiBank } from 'react-icons/ci';
import AddBanks from './AddBanks';
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes';
import SelectAccount from './SelectAccount';
import BankForm from './BankForm';
import { X } from 'lucide-react';

const BankDialogInner = () => {
    const { step, setStep } = useBankMethod();

    useEffect(() => {
        setStep("select-account");
    }, []);

    if (step === "select-account") return <SelectAccount />;
    if (step === "select-bank") return <AddBanks />;
    if (step === "bank-form") return <BankForm />;
    return null;
};

const BankMethodDialog = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    return (
        <BankMethodProvider onOpenChange={onOpenChange}>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="min-w-2xl w-full [&>button]:hidden p-0">
                    <DialogHeader className="flex flex-row justify-between items-center border-b px-6 py-4">
                        <div className="flex flex-row items-center space-x-2">
                            <CiBank className="h-4 w-4" />
                            <DialogTitle className="text-lg font-medium">Bank Account</DialogTitle>
                        </div>
                        <DialogClose asChild>
                            <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                        </DialogClose>
                    </DialogHeader>
                    <div>
                        <BankDialogInner />
                    </div>
                </DialogContent>
            </Dialog>
        </BankMethodProvider>
    );
};

export default BankMethodDialog