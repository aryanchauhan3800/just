'use client'

import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import PasswordInput from "../auth-components/PasswordInput";
import { submitFormOne } from "@/services/registrationService";
import { PersonalDetails } from "@/types/dashboardAndInvoiceTypes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormOne = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useRouter()
  const [input, setInput] = useState<PersonalDetails>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    countryCode: "",
    contactNumber: ""
  });

  useEffect(() => {
    const phoneData = localStorage.getItem("phoneNumber");

    if (phoneData) {
      try {
        const parsed = JSON.parse(phoneData);
        const { countryCode, contactNumber } = parsed;

        setInput(prev => ({
          ...prev,
          countryCode: countryCode || "",
          contactNumber: contactNumber || ""
        }));
      } catch (err) {
        console.error("Invalid phone data in localStorage:", err);
      }
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!input.firstName.trim()) newErrors.firstname = "First name is required";
    if (!input.lastName.trim()) newErrors.lastname = "Last name is required";

    if (!input.password) {
      newErrors.password = "Password is required";
    } else if (input.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (input.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [input, confirmPassword]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return { success: false, error: "Validation failed" };
    try {
      console.log("Submitting form with input:", input);
      const res = await submitFormOne(input);

      if (res.success) {
        toast.success("Form submitted successfully!");
        console.log("Form submission response:", res);
        navigate.replace("/sign-up/form/2");
        // return true;
      } else {
        throw new Error("Form submission failed: " + JSON.stringify(res.errors || res.error));
      }
    } catch (error: unknown) {
      let errorMessage = "Unknown error";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Error submitting form:", error);
      toast.error("Error submitting form: " + errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [input, validateForm]);

  useEffect(() => {
    const listener = (e: CustomEvent) => {
      e.detail(handleSubmit());
    };
    window.addEventListener("submitFormStep", listener as EventListener);
    return () => window.removeEventListener("submitFormStep", listener as EventListener);
  }, [handleSubmit, validateForm]);

  return (
    <div className="w-full">
      <h1 className="text-2xl mb-6 mr-auto">👋🏻 Hi, tell us about yourself...</h1>
      <div>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 mb-4'>
          <div className="w-full md:w-2/3">
            <label className="text-sm font-normal"><span className="text-red-500 ml-1">*</span> Your First Name:</label>
            <Input
              type="text"
              placeholder="Ex. Arun"
              value={input.firstName}
              onChange={(e) => setInput({ ...input, firstName: e.target.value })}
              className={errors.firstname ? "border-red-500" : ""}
              required
            />
            {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
          </div>
          <div className="w-full md:w-1/3">
            <label className="text-sm font-normal"><span className="text-red-500 ml-1">*</span> Your Last Name:</label>
            <Input
              type="text"
              placeholder="Ex. Tiwari"
              value={input.lastName}
              onChange={(e) => setInput({ ...input, lastName: e.target.value })}
              className={errors.lastname ? "border-red-500" : ""}
              required
            />
            {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
          </div>
        </div>

        <div className="mb-8">
          <label className="text-sm font-normal">Your Email:</label>
          <Input
            type="email"
            placeholder="Please enter your Email ID"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-4">
          <div>
            <PasswordInput
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              borderColor={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="text-sm font-normal"><span className="text-red-500 ml-1">*</span> Confirm Password:</label>
            <Input
              type="password"
              placeholder="Re-enter the password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "border-red-500" : ""}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormOne;