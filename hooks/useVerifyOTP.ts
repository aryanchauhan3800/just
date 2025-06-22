import { useState } from "react";
import api from "@/services/api";
import { EmailPayload, PhonePayload, VerificationPayload } from "@/types/dashboardAndInvoiceTypes";

function useVerifyOTP(method: "phone" | "email") {
    const [loading, setLoading] = useState(false);

    const verify = async (payload: VerificationPayload) => {
        console.log(method)
        console.log(payload)
        setLoading(true);

        const endpoint = `/auth/verify-${method === "phone" ? "ph" : "mail"}-otp`;

        const requestData = method === "phone"
            ? {
                countryCode: (payload as PhonePayload).countryCode,
                contactNumber: (payload as PhonePayload).contactNumber,
                otp: payload.otp
            }
            : {
                email: (payload as EmailPayload).email,
                otp: payload.otp
            };

        try {
            const response = await api.post(endpoint, requestData);
            return response.data;
        } catch (error) {
            console.error("OTP verification failed:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, verify };
}

export default useVerifyOTP;