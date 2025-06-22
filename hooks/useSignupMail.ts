import api from "@/services/api";
import { useState } from "react";

function useSignupMail() {
    const [loading, setLoading] = useState(false)

    const signupMail = async (mail: string) => {
        setLoading(true);

        try {
            const res = await api.post("/auth/signup-mail", {
                email: mail
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
    }

    return { loading, signupMail }
}

export default useSignupMail;