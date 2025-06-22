"use client";

import { useEffect, useState } from "react";
import PricingCard from "@/components/pricing-components/PricingCard";
import ComparisonTable from "@/components/pricing-components/ComparisonTable";
import { Button } from "@/components/ui/button";
import ReferalPopup from "@/components/pricing-components/ReferalPopup";
import ContactSheet from "@/components/pricing-components/ContactSheet";
import Link from "next/link";

const plans = [
  {
    id: "enterprise",
    name: "Enterprise Plan",
    originalPrice: 500,
    monthlyPrice: 200,
    yearlyPrice: 1440,
    features: {
      invoices: 100,
      quotes: 100,
      clients: 100,
      companies: 5,
      reports: "GSTR-1",
    },
  },
  {
    id: "premium",
    name: "Premium Plan",
    originalPrice: 500,
    monthlyPrice: 300,
    yearlyPrice: 2799,
    features: {
      invoices: 100,
      quotes: 100,
      clients: 100,
      companies: 5,
      reports: "GSTR-1",
    },
    recommended: true,
  },
  {
    id: "standard",
    name: "Standard Plan",
    originalPrice: 500,
    monthlyPrice: 450,
    yearlyPrice: 3999,
    features: {
      invoices: 100,
      quotes: 100,
      clients: 100,
      companies: 5,
      reports: "GSTR-1",
    },
  },
];

export default function Page() {
  const [discountedPlans, setDiscountedPlans] = useState(plans);
  const [planType, setPlanType] = useState("monthly");

  useEffect(() => {
    const updated = plans.map((plan) => ({
      ...plan,
      discountedPrice: planType === "monthly" ? plan.monthlyPrice : plan.yearlyPrice,
    }));
    setDiscountedPlans(updated);
  }, [planType]);

  return (
    <div className="w-full mx-auto py-8">

      <div className="border-b border-gray-300 mb-16 pb-6 shadow-md">
        <Link href={"/pricing/coupon"}>
          <span className="flex justify-end mr-20 text-blue-500 font-semibold">
            Discount Coupons
          </span>
        </Link>

        <h1 className="pricing_coupon_heading">Choose a Pricing Plan</h1>
        <p className="pricing_coupon_subheading">Personalised Pricing plans for your business</p>

        <div className="flex justify-center gap-4 mt-4">
          <Button
            className={`pricing_plan_btn ${planType === "monthly" ? "bg-blue-500" : "bg-white text-black"
              }`}
            onClick={() => setPlanType("monthly")}
          >
            Monthly
          </Button>

          <Button
            className={`pricing_plan_btn ${planType === "yearly" ? "bg-blue-500" : "bg-white text-black"
              }`}
            onClick={() => setPlanType("yearly")}
          >
            Yearly
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-0">

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {discountedPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} planType={planType} />
          ))}
        </div>

        <div className="flex justify-end my-2">
          <ContactSheet />
        </div>
        <div className="flex flex-row justify-center items-center space-x-2 mt-12 mb-14">
          <span>Have a Referral Code ?</span>
          <ReferalPopup />
        </div>

        <ComparisonTable />
      </div>
    </div>
  );
}
