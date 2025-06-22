import axios from "./axios";
import api from "./api";
import { EmailPayload, PhonePayload, VerificationPayload } from "@/types/dashboardAndInvoiceTypes";

// 📲 Sign up with phone
export async function signupWithPhone(payload: { countryCode: string; contactNumber: string }) {
    const res = await api.post(`/auth/signup-ph`, payload);
    return res.data;
}

// 📩 Sign up with email
export async function signupWithEmail(email: string) {
    const res = await api.post(`/auth/signup-mail`, { email });
    return res.data;
}

// 🔐 Login
export async function login(payload: {
    email: string;
    password: string;
}) {
    const res = await axios.post(`/api/auth/login`, {
        ...payload,
        rememberMe: true,
    });
    return res.data;
}

// ✅ Verify OTP (phone or email)
export async function verifyOtp(method: "phone" | "email", payload: VerificationPayload) {
    console.log("Verifying OTP for method:", method, "with payload:", payload);
    const endpoint =
        method === "phone"
            ? `/auth/verify-ph-otp`
            : `/auth/verify-mail-otp`;

    const requestData =
        method === "phone"
            ? {
                countryCode: (payload as PhonePayload).countryCode,
                contactNumber: (payload as PhonePayload).contactNumber,
                otp: payload.otp,
            }
            : {
                email: (payload as EmailPayload).email,
                otp: payload.otp,
            };

    console.log("Endpoint:", endpoint, "Request Data:", requestData);

    try {
        const res = await api.post(endpoint, requestData);
        return res.data;
    } catch (error) {
        // if (axios.isAxiosError(error)) {
        //     console.error("Axios error response:", error.response?.data);
        // } else {
        //     console.error("Unknown error:", error);
        // }
        throw error;
    }
}

// 🔁 Resend OTP (email or phone)
export async function resendOtp(payload: { contactNumber?: string; email?: string;countryCode?:string  }) {
    const endpoint = payload.email
        ? `/auth/resend-mail-otp`
        : `/auth/resend-ph-otp`;

    const res = await api.post(endpoint, payload);
    return res.data;
}
