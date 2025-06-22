'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from "@/components/ui/input-otp";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { resendOtp, verifyOtp } from '@/services/authService';
import { toast } from 'sonner';
import { initializeCsrfToken } from '@/services/api';

type VerificationMethod = 'phone' | 'email';

type PhoneContact = {
    countryCode: string;
    contactNumber: string;
};

type EmailContact = {
    email: string;
};

type ContactType = PhoneContact | EmailContact;

const isPhoneContact = (contact: ContactType): contact is PhoneContact =>
    'countryCode' in contact && 'contactNumber' in contact;

const isEmailContact = (contact: ContactType): contact is EmailContact =>
    'email' in contact;

const OTPVerification = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const method = (searchParams.get("method") || "phone") as VerificationMethod;

    const [verifyLoading, setVerifyLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const [otp, setOtp] = useState<string>("");
    const [contact, setContact] = useState<ContactType | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(120);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storageKey = method === "phone" ? "phoneNumber" : "email";
        const stored = localStorage.getItem(storageKey);

        if (!stored) {
            router.push("/sign-up");
            return;
        }

        try {
            if (method === "phone") {
                const parsed = JSON.parse(stored) as PhoneContact;
                if (parsed.countryCode && parsed.contactNumber) {
                    setContact(parsed);
                } else {
                    throw new Error("Invalid phone data format");
                }
            } else {
                setContact({ email: stored });
            }
        } catch (err) {
            console.error("Invalid data format in localStorage", err);
            router.push("/sign-up");
        }
    }, [method, router]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number): string => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const handleSubmit = async (): Promise<void> => {
        if (!contact || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        setError(null);
        setVerifyLoading(true);

        try {
            const payload = { ...contact, otp };
            const result = await verifyOtp(method, payload);
            console.log("OTP verification result:", result);

            if (result.data?.otpToken) {
                const csrfResponse = await initializeCsrfToken(result.data.otpToken);

                if (csrfResponse.status === 200) {
                    await new Promise(resolve => setTimeout(resolve, 100));

                    const csrfToken = Cookies.get("XSRF-TOKEN");
                    if (csrfToken) {
                        console.log("CSRF token successfully set:", csrfToken);
                        toast.success("OTP verified successfully!");
                        router.push("/sign-up/form/1");
                    } else {
                        console.error("CSRF token was not set in cookies");
                        setError("Authentication setup failed. Please try again.");
                    }
                } else {
                    throw new Error("Failed to fetch CSRF token");
                }
            } else {
                setError("Verification failed. Invalid token");
                throw new Error("Invalid OTP token received");
            }
        } catch (err) {
            toast.error("Verification failed. Invalid token.");
            setError("Verification failed. Please try again.");
            console.error("OTP verification error:", err);
        } finally {
            setVerifyLoading(false);
        }
    };

    const handleResend = async (): Promise<void> => {
        if (!contact) return;

        setError(null);
        setResendLoading(true);
        try {
            let success = false;

            if (isPhoneContact(contact)) {
                success = await resendOtp({
                    contactNumber: contact.contactNumber,
                    countryCode: contact.countryCode
                });
            } else if (isEmailContact(contact)) {
                success = await resendOtp({
                    email: contact.email
                });
            }

            if (success) {
                setTimeLeft(120);
                setOtp("");
            } else {
                setError("Failed to resend code. Please try again.");
            }
        } catch (err) {
            setError("Error resending code. Please try again later.");
            console.error("Resend OTP error:", err);
        } finally {
            setResendLoading(false);
        }
    };

    const handleSwitchMethod = () => {
        if (method === "phone") {
            router.push(`/sign-up/email`);
        } else {
            router.push(`/sign-up`);
        }
    };

    const otpSlots = Array.from({ length: 6 }, (_, index) => (
        <InputOTPGroup className="w-1/2" key={index}>
            <InputOTPSlot className="w-full" index={index} />
        </InputOTPGroup>
    ));

    return (
        <div className="auth_page_container">
            <h1 className="text-3xl font-semibold mb-4 flex items-center gap-2">
                <Image src="/logo.svg" alt="logo" width={20} height={20} />
                OTP Verification
            </h1>

            <p className="text-xs mb-4">
                A 6-digit OTP has been sent to your {method === "phone" ? "phone number" : "email address"}.
            </p>

            <div className="mt-2">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    {otpSlots}
                </InputOTP>
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            {timeLeft > 0 ? (
                <p className="flex justify-end my-6 text-sm font-semibold">
                    Resend code in {formatTime(timeLeft)}
                </p>
            ) : (
                <div className="flex justify-end my-4">
                    <Button
                        onClick={handleResend}
                        className="bg-blue-500 hover:bg-blue-700 text-sm"
                        disabled={resendLoading}
                    >
                        {resendLoading ? "Sending..." : "Resend Code"}
                    </Button>
                </div>
            )}

            <div className="flex flex-col gap-4 mb-8">
                <Button
                    className="w-full authbtn"
                    onClick={handleSubmit}
                    disabled={verifyLoading || otp.length !== 6}
                >
                    {verifyLoading ? "Verifying..." : "Verify"}
                </Button>

                <Button
                    className="w-full auth_btn_secondary"
                    onClick={handleSwitchMethod}
                >
                    {method === "phone" ? "Verify Email Instead" : "Verify Phone Number Instead"}
                </Button>
            </div>

            <div className="flex justify-center space-x-2 text-sm">
                <span>Already a User?</span>
                <Link href="/sign-in" className="text-blue-500 font-semibold">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default OTPVerification;