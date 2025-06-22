'use client'

import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { submitFormTwo } from "@/services/registrationService";
import { BusinessDetails } from "@/types/dashboardAndInvoiceTypes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormTwo = () => {
  const navigate = useRouter()
  const [input, setInput] = useState<BusinessDetails>({
    businessLogo: null,
    businessName: "",
    businessType: "",
    gstNumber: "",
    hasGST : false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setInput((prev) => ({
      ...prev,
      hasGST : !input?.hasGST,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setInput((prev) => ({
      ...prev,
      businessLogo: file,
    }));
  };

  const handleBusinessTypeChange = (value: string) => {
    setInput((prev) => ({
      ...prev,
      businessType: value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    try {
      console.log("Submitting form with input:", input);
      const res = await submitFormTwo(input);

      if (res.success) {
        toast.success("Form submitted successfully!");
        navigate.replace("/sign-up/form/3"); // Replace with your success ur
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
  }, [input]);

  useEffect(() => {
    const listener = (e: CustomEvent) => {
      e.detail(handleSubmit());
    };
    window.addEventListener("submitFormStep", listener as EventListener);
    return () => window.removeEventListener("submitFormStep", listener as EventListener);
  }, [handleSubmit]);

  return (
    <div className="w-full">
      <h1 className="text-2xl mb-6 mr-auto">Tell us about your business</h1>

      <div>
        {/* Business Logo */}
        <div>
          <label className="text-sm font-normal">Business Logo:</label>
          <div className="w-full border-2 border-dashed border-blue-500 bg-blue-50 rounded-md p-6 text-center cursor-pointer hover:border-blue-400 focus:outline-none">
            <Upload className="mx-auto text-blue-500 mb-2" size={24} />
            <p className="text-sm text-gray-600">
              Drag & Drop file here or{" "}
              <span className="text-blue-600 font-medium hover:underline">
                Click here
              </span>
            </p>
            <Input
              type="file"
              accept="image/*"
              name="businessLogo"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Business Name and Type */}
        <div className="flex flex-row justify-between items-center gap-2 mb-10 mt-4">
          <div className="w-2/3">
            <label className="text-sm font-normal"><span className="text-red-500">*</span> Business Name:</label>
            <Input
              name="businessName"
              placeholder="Ex. Deluxe Enterprise"
              value={input.businessName}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-2/5">
            <label className="text-sm font-normal"><span className="text-red-500">*</span> Business Type:</label>
            <Select onValueChange={handleBusinessTypeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* GST Section */}
        <div className="flex justify-end items-center space-x-2 mb-2">
          <Checkbox
            id="terms2"
            checked={!input.hasGST }
            onCheckedChange={handleCheckboxChange}
          />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I don&apos;t have a GST number
          </label>
        </div>

        <div>
          <label className="text-sm font-normal"><span className="text-red-500">*</span> GST Number:</label>
          <Input
            name="gstNumber"
            value={input.gstNumber}
            onChange={handleInputChange}
            disabled={!input.hasGST }
            placeholder="Enter GST number"
          />
        </div>
      </div>
    </div>
  );
};

export default FormTwo;