import axios from "axios";
import { useState } from "react";

function useLogin() {
    const [loading, setLoading] = useState(false)

    const login = async ({
        countryCode, contactNumber, password
    }: {
        countryCode: string, contactNumber: string, password: string
    }) => {
        setLoading(true);

        try {
            const res = await axios.post("https://invoicebackend.baerp.com/api/auth/login", {
                countryCode,
                contactNumber,
                password,
                rememberMe: true
            });

            const data = res.data
            console.log('Login successful:', data);
            return true
        } catch (error) {
            console.log('Error is from catch')
            return false
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}

export default useLogin;