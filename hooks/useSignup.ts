import { useState } from "react";
import api from "@/services/api";

function useSignup() {
    const [loading, setLoading] = useState(false);

    const signup = async ({ countryCode, contactNumber }: { countryCode: string, contactNumber: string }) => {
        setLoading(true);

        try {
            const res = await api.post("/auth/signup-ph", {
                countryCode,
                contactNumber
            });

            const data = res.data
            console.log('Signup successful:', data);
            return true
        } catch (error) {
            console.log('Error is from catch')
            return false
        } finally {
            setLoading(false)
        }
    };

    return { loading, signup };
}

export default useSignup;