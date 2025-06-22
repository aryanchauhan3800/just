"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FormWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const currentStep = useMemo(() => {
    const match = pathname?.match(/\/sign-up\/form\/(\d)/);
    return match ? parseInt(match[1], 10) : 1;
  }, [pathname]);

  const handleNext = async () => {
    setIsLoading(true);

    const result: { success: boolean; errors?: Record<string, string> } = await new Promise((resolve) => {
      window.dispatchEvent(new CustomEvent("submitFormStep", {
        detail: (res: typeof result) => resolve(res),
      }));
    });

    setIsLoading(false);

    if (result.success) {
      if (currentStep < 3) {
        router.push(`/sign-up/form/${currentStep + 1}`);
      } else {
        router.push("/pricing");
      }
    } else {
      window.dispatchEvent(new CustomEvent("formErrors", {
        detail: { step: currentStep, errors: result.errors },
      }));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(`/sign-up/form/${currentStep - 1}`);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <div className="w-full max-w-xl px-8 md:px-4 pt-10 mx-auto flex flex-col justify-between items-center">
        <div className="w-full flex flex-col justify-between py-2 gap-2 md:py-4 md:gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-md">Account Setup</h1>
            <p className="font-semibold">{currentStep}/3</p>
          </div>

          <div className="flex justify-between items-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className={`flex-1 h-1 ${currentStep >= step ? "bg-blue-600" : "bg-gray-300"}`} />
            ))}
          </div>

          <div className="w-10 flex justify-center items-center rounded-full p-2 border self-start md:self-auto">
            <ChevronLeft
              onClick={currentStep > 1 ? handlePrevious : undefined}
              className={currentStep > 1 ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
            />
          </div>
        </div>

        <div className="w-full">{children}</div>
      </div>

      <div className="py-4 px-4 text-right border-t border-gray-200 shadow-md bg-white">
        <Button
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 md:px-14 py-3 md:py-6 rounded"
          disabled={isLoading}
        >
          {isLoading ? (
            currentStep === 3 ? "Submitting..." : "Processing..."
          ) : (
            <span className="flex flex-row justify-center items-center gap-2">
              {currentStep === 3 ? "Complete Signup" : "Next"}
              {currentStep < 3 && <ChevronRight />}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}