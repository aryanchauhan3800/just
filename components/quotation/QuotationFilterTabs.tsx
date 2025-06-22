"use client";

import React from "react";
import { X } from "lucide-react";
import { FilterState } from "@/types/quotationTypes";



interface FilterChipsProps {
  filters: FilterState;
  onRemoveFilter: (filterType: keyof FilterState, value?: string) => void;
  onClearAll: () => void;
}





const QuotationFilterTabs: React.FC<FilterChipsProps> = ({ filters, onRemoveFilter, onClearAll }) => {

  const getStatusLabel = (status: string) => {

    const statusMap: Record<string, string> = {
      sent: "Sent",
      confirmed: "Confirmed",
      overdue: "Overdue",
      draft: "Draft"
    };

    return statusMap[status] || status;

  };



  // colors for tabs
  const getStatusColor = (status: string) => {

    switch (status) {

      case "sent":
        return "bg-blue-100 text-blue-800 border-blue-200";

      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";

      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";

      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";

      default:
        return "bg-gray-100 text-gray-800 border-gray-200";

    }
  };



  // get value from the labels
  const getDateLabel = (value: string) => {

    const dateMap: Record<string, string> = {
      "7_days": "Within 7 days",
      "this_month": "This month",
      "this_quarter": "This quarter",
      "this_half_year": "This half-year",
      "this_year": "This year",
      "all": "All"
    };

    return dateMap[value] || value;
  };



  // label for amounts
  const getAmountLabel = (value: string) => {

    const amountMap: Record<string, string> = {
      "all": "All amounts",
      "lt_9999": "< ₹9,999",
      "10000_49999": "₹10K - ₹49K",
      "50000_99999": "₹50K - ₹99K"
    };

    return amountMap[value] || value;
  };



  // state for storing currently active filters
  const activeFilters = [];




  // Add status filters
  filters.statuses.forEach(status => {
    activeFilters.push({
      type: "status" as const,
      value: status,
      label: getStatusLabel(status),
      color: getStatusColor(status)
    });
  });



  // Add date filters only if not ALL
  if (filters.validTo && filters.validTo !== "all") {
    activeFilters.push({
      type: "validTo" as const,
      value: filters.validTo,
      label: `Valid: ${getDateLabel(filters.validTo)}`,
      color: "bg-purple-100 text-purple-800 border-purple-200"
    });
  }


  if (filters.createdAt && filters.createdAt !== "all") {
    activeFilters.push({
      type: "createdAt" as const,
      value: filters.createdAt,
      label: `Created: ${getDateLabel(filters.createdAt)}`,
      color: "bg-orange-100 text-orange-800 border-orange-200"
    });
  }


  // Add amount filter (only if not "all")
  if (filters.amount && filters.amount !== "all") {
    activeFilters.push({
      type: "amount" as const,
      value: filters.amount,
      label: getAmountLabel(filters.amount),
      color: "bg-emerald-100 text-emerald-800 border-emerald-200"
    });
  }



  // no active filter then dont return anything
  if (activeFilters.length === 0) {
    return null;
  }



  return (
    <div className="flex items-center gap-2 flex-wrap">

      <span className="text-sm text-gray-600 font-medium">Active filters:</span>

      {activeFilters.map((filter, index) => (
        <div
          key={`${filter.type}-${filter.value}-${index}`}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs border ${filter.color}`}>

          <span>{filter.label}</span>

          <button
            onClick={() => onRemoveFilter(filter.type, filter.value)}
            className="hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors">
            <X className="h-3 w-3" />
          </button>

        </div>
      ))}



      {activeFilters.length > 1 && (
        <button className="text-xs text-gray-500 hover:text-gray-700 underline ml-2" onClick={onClearAll}>
          Clear all
        </button>
      )}

    </div>
  );
};

export default QuotationFilterTabs;