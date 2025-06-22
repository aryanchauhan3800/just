import { createContext, useContext, useState } from "react";

type Bank = string | null;
type Step = "select-account" | "select-bank" | "bank-form";

interface BankMethodContextType {
    step: Step;
    selectedBank: Bank;
    setStep: (step: Step) => void;
    setSelectedBank: (bank: Bank) => void;
    setDialogOpen?: (open: boolean) => void;
    reset: () => void;
}

const BankMethodContext = createContext<BankMethodContextType | null>(null);

export const useBankMethod = () => {
    const ctx = useContext(BankMethodContext);
    if (!ctx) throw new Error("Must be used within BankMethodProvider");
    return ctx;
};

export const BankMethodProvider = ({
    children,
    onOpenChange,
}: {
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void; // Accept this as a prop
}) => {
    const [step, setStep] = useState<Step>("select-account");
    const [selectedBank, setSelectedBank] = useState<Bank>("");

    const reset = () => {
        setStep("select-account");
        setSelectedBank(null);
        if (onOpenChange) onOpenChange(false); // Close dialog
    };

    return (
        <BankMethodContext.Provider
            value={{
                step,
                setStep,
                selectedBank,
                setSelectedBank,
                setDialogOpen: onOpenChange,
                reset,
            }}
        >
            {children}
        </BankMethodContext.Provider>
    );
};
