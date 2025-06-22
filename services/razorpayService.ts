// services/payment/razorpay.service.ts
import api from "./api";

export async function createOrder(planId: string) {
    try {
        const { data } = await api.post("/payment/create-order", {
            planId,
        });

        return data;
    } catch (error: any) {
        console.error("Error creating Razorpay order:", error.response?.data || error.message);
        throw error;
    }
}

export async function verifyOrder({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    planId,
}: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    planId: string;
}) {
    try {
        const { data } = await api.post("/payment/verify", {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            planId,
        });

        return data;
    } catch (error: any) {
        console.error("Error verifying Razorpay order:", error.response?.data || error.message);
        throw error;
    }
}
