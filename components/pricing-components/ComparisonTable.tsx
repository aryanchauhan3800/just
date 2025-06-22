import CompTable from "@/components/CompTable";

interface PlanComparisonRow {
  feature: string;
  standard: string;
  premium: string;
  enterprise: string;
}

const columns = [
  { label: "Features", key: "feature" },
  { label: "₹1440 Standard Plan", key: "standard" },
  { label: "₹2799 Premium Plan", key: "premium" },
  { label: "₹3999 Enterprise Plan", key: "enterprise" },
] as const;

const data: PlanComparisonRow[] = [
  { feature: "Invoices", standard: "80", premium: "100", enterprise: "Unlimited" },
  { feature: "Quotes", standard: "80", premium: "100", enterprise: "Unlimited" },
  { feature: "Clients", standard: "50", premium: "100", enterprise: "Unlimited" },
  { feature: "Companies", standard: "3", premium: "5", enterprise: "20" },
  { feature: "GSTR-1 Reports", standard: "❌", premium: "✅", enterprise: "✅" },
  { feature: "GSTR-3B Reports", standard: "✅", premium: "✅", enterprise: "✅" },
  { feature: "HRMS", standard: "❌", premium: "❌", enterprise: "✅" },
  { feature: "CA Connect", standard: "❌", premium: "❌", enterprise: "✅" },
  { feature: "Admin", standard: "❌", premium: "❌", enterprise: "✅" },
];

export default function ComparisonTable() {
  return (
    <div className="mt-10">
      <div className="py-10 text-center">
        <h2 className="text-2xl font-semibold">Compare Plans</h2>
        <p className="text-gray-600">
          Choose the pricing plan best suited for your business
        </p>
      </div>

      <CompTable<PlanComparisonRow>
        columns={columns as unknown as { key: keyof PlanComparisonRow; label: string }[]}
        data={data}
        showPagination={false}
        enableSorting={false}
      />
    </div>
  );
}