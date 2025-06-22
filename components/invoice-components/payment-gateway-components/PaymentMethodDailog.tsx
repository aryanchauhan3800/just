import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { InvoiceDrawerProps } from "@/types/dashboardAndInvoiceTypes";
import { PaymentMethodProvider, usePaymentMethod } from "@/context/PaymentMethodContext";
import GatewaySelection from "./GatewaySelection";
import GatewayChoose from "./GatewayChoose";
import GatewaySetupForm from "./GatewaySetupForm";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { X } from "lucide-react";

const PaymentDialogInner = () => {
    const { step } = usePaymentMethod();

    if (step === "select-active") return <GatewaySelection />;
    if (step === "choose-gateway") return <GatewayChoose />;
    if (step === "setup-form") return <GatewaySetupForm />;
    return null;
};

const PaymentMethodDialog = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    return (
        <PaymentMethodProvider>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-xl w-full [&>button]:hidden p-0 rounded-none">
                    <DialogHeader className="flex flex-row justify-between items-center py-4 border-b px-6">
                        <div className="flex flex-row items-center space-x-2">
                            <HiOutlineBanknotes className="rotate-180 h-4 w-4" />
                            <DialogTitle className="text-lg font-medium">Payment Gateways</DialogTitle>
                        </div>
                        <DialogClose asChild>
                            <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                        </DialogClose>
                    </DialogHeader>

                    <div>
                        <PaymentDialogInner />
                    </div>
                </DialogContent>
            </Dialog>
        </PaymentMethodProvider>
    );
};

export default PaymentMethodDialog;
