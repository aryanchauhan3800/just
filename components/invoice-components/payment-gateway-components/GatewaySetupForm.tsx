import { usePaymentMethod } from "@/context/PaymentMethodContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const GatewaySetupForm = () => {
    const { selectedGateway } = usePaymentMethod();

    const [formData, setFormData] = useState({
        merchantId: "",
        merchantKey: "",
        bankAccount: "",
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        // Submit the form data
        console.log("Submitted config for", selectedGateway, formData);
        // You could call an API here
    };

    if (!selectedGateway) return null;

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-medium capitalize px-6">{selectedGateway}</h2>

            {selectedGateway === "paytm" && (
                <>
                    <div className="space-y-4 px-6">
                        <div className="flex flex-row items-center justify-between text-sm">
                            <Label><span className="text-red-500 ml-1">*</span>Merchant ID:</Label>
                            <Input type="text" placeholder="Enter Full Name" className="w-2/3" />
                        </div>
                        <div className="flex flex-row items-center justify-between text-sm">
                            <Label><span className="text-red-500 ml-1">*</span>Merchant Key:</Label>
                            <Input type="text" placeholder="Enter Full Name" className="w-2/3" />
                        </div>
                        <div className="flex flex-row items-center justify-between text-sm">
                            <Label><span className="text-red-500 ml-1">*</span>Bank Account:</Label>
                            <Select
                                onValueChange={(value) => handleChange("bankAccount", value)}
                                value={formData.bankAccount}
                            >
                                <SelectTrigger className="w-2/3">
                                    <SelectValue placeholder="Select Bank Account" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bank-1">Bank of Baroda</SelectItem>
                                    <SelectItem value="bank-2">ICICI Business</SelectItem>
                                    <SelectItem value="bank-3">HDFC Settlement</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="py-4 text-sm space-y-2 px-6 bg-[#FAFAFA]">
                        <div>
                            <h1 className="text-lg text-[#474747] font-semibold">Online Payments</h1>
                            <p className="text-base text-[#474747]">
                                Configure your merchant details to enable seamless online payment transactions.
                            </p>
                        </div>
                        <div>
                            <h1 className="text-lg text-[#474747] font-semibold">Transaction Charges</h1>
                            <p className="text-base text-[#474747]">
                                As per your payment gateway&apos;s plan.
                                No additional platform fees.
                            </p>
                        </div>
                        <div>
                            <h1 className="text-lg text-[#474747] font-semibold">Supported Payment Methods</h1>
                            <ul className="list-disc list-inside text-base text-[#474747] ml-2">
                                <li>Wallet</li>
                                <li>Upi</li>
                                <li>Netbanking</li>
                                <li>Credit cards and Debit cards</li>
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {selectedGateway === "razorpay" && (
                <div className="text-sm text-gray-600 italic px-6">
                    Razorpay does not need additional setup here.
                </div>
            )}

            {selectedGateway === "stripe" && (
                <div className="text-sm text-gray-600 italic px-6">
                    Stripe setup coming soon.
                </div>
            )}

            <div className="border-t pt-4 pb-2 flex justify-between px-6">
                <Button variant="ghost">
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>Save</Button>
            </div>
        </div>
    );
};

export default GatewaySetupForm;