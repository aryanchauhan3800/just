import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { createOrder, verifyOrder } from "@/services/razorpayService";

type Plan = {
  id: string;
  name: string;
  originalPrice: number;
  monthlyPrice: number;
  yearlyPrice: number;
  features: {
    invoices: number;
    quotes: number;
    clients: number;
    companies: number;
    reports: string;
  };
  recommended?: boolean;
}

// Type definitions for Razorpay
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open(): void;
}

interface WindowWithRazorpay extends Window {
  Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
}

export default function PricingCard({ plan, planType }: { plan: Plan, planType: string }) {
  const featureList = [
    [`${plan.features.invoices} Invoices/month`],
    [`${plan.features.quotes} Quotes/month`],
    [`${plan.features.clients} Clients`],
    [`${plan.features.companies} Businesses`],
    [`${plan.features.reports} Reports`],
  ];

  const handleCheckout = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const planId = plan.id;

    try {
      const { order_id, amount, currency } = await createOrder(planId);

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Your App Name",
        description: plan.name,
        order_id,
        handler: async function (response: RazorpayResponse) {
          const verifyRes = await verifyOrder({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            planId,
          });

          if (verifyRes.success) {
            alert("Payment successful!");
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const windowWithRazorpay = window as unknown as WindowWithRazorpay;
      if (!windowWithRazorpay.Razorpay) {
        alert("Razorpay not loaded properly.");
        return;
      }

      const razorpay = new windowWithRazorpay.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong during checkout.");
    }
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <Card
      className={`relative w-full max-w-sm flex flex-col justify-between border-2 border-muted ${plan.recommended ? "border-blue-100 shadow-xl py-8" : "border-gray-300"
        }`}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-1/3 text-xs bg-blue-600 text-white px-4 py-2 rounded-full shadow-md z-10">
          Recommended
        </span>
      )}

      <CardHeader className="pt-4">
        <div className="flex flex-col items-center">
          <CardTitle className="mt-2 text-2xl">{plan.name}</CardTitle>
          <p className="text-md text-gray-500 line-through">₹{plan.originalPrice}</p>
          <p className="text-3xl font-bold">
            ₹{planType === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
          </p>
          <p className="text-sm text-muted-foreground">
            per {planType === "yearly" ? "Year" : "Month"}*
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-4 text-md font-light">
          Best for Corporation with less than 10 employees
        </p>
        <ul className="space-y-4 text-sm text-gray-700">
          {featureList.map((feature, index) => (
            <li key={index} className="flex flex-row items-center gap-2">
              <Check className="rounded-full w-4 h-4 p-0.5 bg-blue-700 text-white" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex flex-col">
        <p className="mr-auto text-xs text-gray-500">*Inclusive of GST</p>
        <Button
          onClick={handleCheckout}
          className={`w-full p-6 hover:bg-blue-600 ${plan.recommended ? "bg-blue-500" : "bg-white text-black border hover:text-white"
            }`}
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}