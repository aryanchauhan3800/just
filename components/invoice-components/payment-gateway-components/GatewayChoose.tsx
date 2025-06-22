import { usePaymentMethod } from "@/context/PaymentMethodContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const GATEWAYS = ["razorpay", "paytm", "stripe"] as const;
export type Gateway = typeof GATEWAYS[number];

const gatewayOptions: { id: Gateway; name: string; description: string }[] = [
    {
        id: "razorpay",
        name: "Razorpay",
        description: "Enable UPI, cards, net banking, and more with seamless integration and real-time tracking.",
    },
    {
        id: "paytm",
        name: "Paytm",
        description: "Accept UPI, Cards, and wallet payments with fast settlement and zero setup hassle.",
    },
    {
        id: "stripe",
        name: "Stripe",
        description: "Ideal for international payments—secure, scalable, and built for modern businesses.",
    },
];

const GatewayChoose = () => {
    const { setStep, setSelectedGateway } = usePaymentMethod();
    const [selected, setSelected] = useState<Gateway>();

    const handleProceed = () => {
        if (selected) {
            setSelectedGateway(selected);
            setStep("setup-form");
        }
    };

    return (
        <div>
            <div className="space-y-2 px-6 mb-2">
                <RadioGroup value={selected ?? ""} onValueChange={(val) => setSelected(val as Gateway)}>
                    {gatewayOptions.map((gateway) => (
                        <div
                            key={gateway.id}
                            onClick={() => setSelected(gateway.id)}
                            className="flex flex-row gap-2 bg-[#FAFAFA] p-4 cursor-pointer rounded-md"
                        >
                            <RadioGroupItem
                                value={gateway.id}
                                id={gateway.id}
                                className="mt-1 mr-4"
                            />
                            <div>
                                <p className="text-lg text-gray-900">{gateway.name}</p>
                                <p className="text-base text-[#474747]">{gateway.description}</p>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <div className="border-t pt-4 pb-2 flex justify-between px-6">
                <Button variant="ghost">
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleProceed} disabled={!selected}>
                    Proceed
                </Button>
            </div>
        </div>
    );
};

export default GatewayChoose;