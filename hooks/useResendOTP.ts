import { useState } from 'react';
import api from '@/services/api';

type PhoneResendPayload = {
    contactNumber: string;
};

type EmailResendPayload = {
    email: string;
};

type ResendPayload = PhoneResendPayload | EmailResendPayload;

interface UseResendOTPReturn {
    resendLoading: boolean;
    error: string | null;
    resend: (payload: ResendPayload) => Promise<boolean>;
}

const useResendOTP = (): UseResendOTPReturn => {
    const [resendLoading, setResendLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const resend = async (payload: ResendPayload): Promise<boolean> => {
        setResendLoading(true);
        setError(null);

        try {
            const endpoint = 'email' in payload
                ? '/auth/resend-mail-otp'
                : '/auth/resend-ph-otp';

            const response = await api.post(endpoint, payload);

            if (response.status === 200) {
                return true;
            } else {
                setError('Failed to resend OTP. Please try again.');
                return false;
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'An unknown error occurred';

            console.error('Error resending OTP:', errorMessage);
            setError(`Error: ${errorMessage}`);
            return false;
        } finally {
            setResendLoading(false);
        }
    };

    return {
        resendLoading,
        error,
        resend
    };
};

export default useResendOTP;