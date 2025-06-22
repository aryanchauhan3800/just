import { usePaymentMethod } from "@/context/PaymentMethodContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const GatewaySelection = () => {
    const { setStep } = usePaymentMethod();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-6">
                <h2 className="text-base">Apply the Payment Gateway</h2>
                <button
                    className="text-base text-blue-600 hover:underline"
                    onClick={() => setStep("choose-gateway")}
                >
                    + Set up New Method
                </button>
            </div>

            <div className="space-y-4 px-6">
                <div className="flex flex-row items-start gap-2 bg-[#FAFAFA] p-4">
                    <Switch />
                    <div className="flex flex-col items-start">
                        <span className="text-blue-600">Razorpay</span>
                        <p className="text-base text-[#474747]">Modes: <span className="font-semibold">Card, Bank, Wallet</span></p>
                        <p className="text-base text-[#474747]">Status: <span className="text-green-600 font-semibold">Active</span></p>
                    </div>
                </div>

                <div className="flex flex-row items-start gap-2 bg-[#FAFAFA] p-4">
                    <Switch />
                    <div className="flex flex-col items-start">
                        <span className="text-blue-600">Paytm</span>
                        <p className="text-base text-[#474747]">Modes: <span className="font-semibold">Card, Bank, Wallet</span></p>
                        <p className="text-base text-[#474747]">Status: <span className="text-green-600 font-semibold">Active</span></p>
                    </div>
                </div>
            </div>

            <div className="border-t pt-4 pb-2 flex justify-between px-6">
                <Button variant="ghost">Cancel</Button>
                <Button variant="primary">Apply</Button>
            </div>
        </div>
    );
};

export default GatewaySelection;