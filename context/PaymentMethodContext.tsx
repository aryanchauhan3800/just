import { createContext, useContext, useState } from "react";

type Gateway = "razorpay" | "paytm" | "stripe" | null;
type Step = "select-active" | "choose-gateway" | "setup-form";

interface PaymentMethodContextType {
    step: Step;
    selectedGateway: Gateway;
    setStep: (step: Step) => void;
    setSelectedGateway: (gateway: Gateway) => void;
    reset: () => void;
}

const PaymentMethodContext = createContext<PaymentMethodContextType | null>(null);

export const usePaymentMethod = () => {
    const ctx = useContext(PaymentMethodContext);
    if (!ctx) throw new Error("Must be used within PaymentMethodProvider");
    return ctx;
};

export const PaymentMethodProvider = ({ children }: { children: React.ReactNode }) => {
    const [step, setStep] = useState<Step>("select-active");
    const [selectedGateway, setSelectedGateway] = useState<Gateway>(null);

    const reset = () => {
        setStep("select-active");
        setSelectedGateway(null);
    };

    return (
        <PaymentMethodContext.Provider value={{ step, setStep, selectedGateway, setSelectedGateway, reset }}>
            {children}
        </PaymentMethodContext.Provider>
    );
};