import { PersonalDetails, BusinessDetails, AddressDetails, SubscriptionPlanDetails, PaymentDetails } from "@/types/dashboardAndInvoiceTypes";
import api, { ensureCsrfToken } from "./api";
import Cookies from 'js-cookie';

function getCsrfToken() {
  return Cookies.get('XSRF-TOKEN') || '';
}

export async function submitFormOne(input: PersonalDetails) {
    const errors: Record<string, string> = {};
    if (!input.firstName.trim()) errors.firstname = "First name is required";
    if (!input.lastName.trim()) errors.lastname = "Last name is required";
    if (!input.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(input.email)) errors.email = "Email is invalid";
    if (!input.password || input.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (!input.contactNumber) errors.contactNumber = "Contact number is required";

    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    }

    try {
        await ensureCsrfToken();
        
        const csrfToken = getCsrfToken();
        const res = await api.post('registration/1', input, {
            headers: {
                'X-CSRF-Token': csrfToken
            }
        });
                
        console.log("Form 1 submission success:", res.data);
        return { success: true, data: res.data };
    } catch (error) {
        console.error("Form 1 submission error:", error);
        return { success: false, error };
    }
}

export async function submitFormTwo(input: BusinessDetails) {
    try {
        // Ensure CSRF token is initialized before making the request
        await ensureCsrfToken();
        let payload = {
            ...input,
        };
        // Convert BusinessDetails to match backend expectations
     
      
        
        // if (payload.businessLogo) {
        //     payload.imageUrl = payload.businessLogo;
        // }
        
        const csrfToken = getCsrfToken();
        
        const res = await api.post('registration/2', payload, {
            headers: {
                'X-CSRF-Token': csrfToken,
                // 'Content-Type': 'multipart/form-data'
            }
        });
        console.log("Form 2 submission success:", res.data);
        return { success: true, data: res.data };
    } catch (error) {
        console.error("Form 2 submission error:", error);
        return { success: false, error };
    }
}

export async function submitFormThree(input: AddressDetails) {
    try {
        // Ensure CSRF token is initialized before making the request
        await ensureCsrfToken();
        
        const payload = {
            addressLine1: input.addressLine1,
            addressLine2: input.addressLine2 || '',
            country: input.country,
            state: input.state,
            city: input.city,
            pinCode: input.pinCode
        };
        
        const csrfToken = getCsrfToken();
        const res = await api.post('registration/3', payload, {
            headers: {
                'X-CSRF-Token': csrfToken
            }
        });
        console.log("Form 3 submission success:", res.data);
        return { success: true, data: res.data };
    } catch (error) {
        console.error("Form 3 submission error:", error);
        return { success: false, error };
    }
}

export async function submitFormFour(input: SubscriptionPlanDetails) {
    try {
        // Ensure CSRF token is initialized before making the request
        await ensureCsrfToken();
        
        const csrfToken = getCsrfToken();
        const res = await api.post('registration/4', input, {
            headers: {
                'X-CSRF-Token': csrfToken
            }
        });
        console.log("Form 4 submission success:", res.data);
        return { success: true, data: res.data };
    } catch (error) {
        console.error("Form 4 submission error:", error);
        return { success: false, error };
    }
}

export async function submitFormFive(input: PaymentDetails) {
    try {
        // Ensure CSRF token is initialized before making the request
        await ensureCsrfToken();
        
        const csrfToken = getCsrfToken();
        const res = await api.post('registration/5', input, {
            headers: {
                'X-CSRF-Token': csrfToken
            }
        });
        console.log("Form 5 submission success:", res.data);
        return { success: true, data: res.data };
    } catch (error) {
        console.error("Form 5 submission error:", error);
        return { success: false, error };
    }
}

export async function getRegistrationStatus() {
    try {
        // Ensure CSRF token is initialized before making the request
        await ensureCsrfToken();
        
        const csrfToken = getCsrfToken();
        const res = await api.get('registration/status', {
            headers: {
                'X-CSRF-Token': csrfToken
            }
        });
        return { success: true, data: res.data };
    } catch (error) {
        console.error("Get registration status error:", error);
        return { success: false, error };
    }
}