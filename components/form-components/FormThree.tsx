'use client'

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AddressDetails } from "@/types/dashboardAndInvoiceTypes";
import { submitFormThree } from "@/services/registrationService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormThree = () => {
  const navigate = useRouter();
  const [address, setAddress] = useState<AddressDetails>({
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    pinCode: ""
  })

  const handleSubmit = useCallback(async () => {
    try {
      console.log("Submitting form with input:", address);
      const res = await submitFormThree(address);

      if (res.success) {
        toast.success("Form submitted successfully!");
        navigate.replace("/pricing");
      } else {
        throw new Error("Form submission failed: " + JSON.stringify(res.error));
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
  }, [address]);

  useEffect(() => {
    const listener = (e: CustomEvent) => {
      e.detail(handleSubmit());
    };
    window.addEventListener("submitFormStep", listener as EventListener);
    return () => window.removeEventListener("submitFormStep", listener as EventListener);
  }, [handleSubmit]);

  return (
    <div className="w-full">
      <p className="text-lg text-gray-500">Almost there</p>
      <h1 className="text-2xl mb-6 mr-auto">Please mention your company&apos;s address..</h1>

      <div className="space-y-4 mb-8">
        <div>
          <label className="text-sm font-normal"><span className="text-red-500">*</span> Address Line 1:</label>
          <Input
            placeholder="Enter the street name"
            onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-normal">
            Address Line 2
            <span className="text-xs text-gray-500 ml-1">(optional)</span>:
          </label>
          <Input
            placeholder="Enter the street name"
            onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
          />
        </div>
      </div>

      <div className="w-full space-y-4">
        <div>
          <label className="text-sm font-normal"><span className="text-red-500">*</span> Country:</label>
          <Input
            placeholder="Enter the country name"
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
          />
        </div>

        <div className="flex flex-row justify-between items-center gap-2 mb-4">
          <div className="w-1/2">
            <label className="text-sm font-normal"><span className="text-red-500">*</span> State:</label>
            <Input
              placeholder="Enter the state name"
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-normal"><span className="text-red-500">*</span> City:</label>
            <Input
              placeholder="Enter the city name"
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-normal"><span className="text-red-500">*</span> Pin Code:</label>
          <Input
            placeholder="Enter the pin code"
            onChange={(e) => setAddress({ ...address, pinCode: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default FormThree;
