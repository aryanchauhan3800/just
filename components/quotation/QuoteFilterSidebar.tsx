"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import {
  AmountRange,
  DateRangeOption,
  FilterState,
  QuotationFilterComponentProps,
  QuoteStatus,
} from "@/types/quotationTypes";
import calculateDateRange from "./DateUtility";



// this is the default state, return to this when user click CANCEL
const defaultFilters: FilterState = {
  statuses: [],
  validTo: "all",
  createdAt: "all",
  amount: "all",
};



const quoteStatusOptions = [
  { label: "Sent", value: "sent" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Overdue", value: "overdue" },
  { label: "Draft", value: "draft" },
];


const quoteValidDateOptions = [
  { label: "All", value: "all", date: "Show all quotes regardless of validity date" },
  { label: "Within 7 days", value: "7_days", date: calculateDateRange({ count: 7, direction: "next", unit: "days", format: "long" }) },
  { label: "This month", value: "this_month", date: calculateDateRange({ count: 1, direction: "next", unit: "months", format: "long" }) },
  { label: "This Quarter (3 months)", value: "this_quarter", date: calculateDateRange({ count: 3, direction: "next", unit: "months", format: "long" }) },
  { label: "Current Fiscal Year", value: "this_year", date: calculateDateRange({ count: 1, direction: "next", unit: "years", format: "long" }) },
];

const quoteCreateOptions = [
  { label: "All", value: "all", date: "Show all quotes regardless of validity date" },
  { label: "Within 7 days", value: "7_days", date: calculateDateRange({ count: 7, direction: "next", unit: "days", format: "long" }) },
  { label: "This month", value: "this_month", date: calculateDateRange({ count: 1, direction: "next", unit: "months", format: "long" }) },
  { label: "This Half-Year (6 months)", value: "this_half_year", date: calculateDateRange({ count: 6, direction: "next", unit: "months", format: "long" }) },
  { label: "Current Fiscal Year", value: "this_year", date: calculateDateRange({ count: 1, direction: "next", unit: "years", format: "long" }) },
];

const quoteAmountWise = [
  { label: "Show all", value: "all" },
  { label: "Less than ₹9,999 due", value: "lt_9999" },
  { label: "₹10,000 - ₹49,999 due", value: "10000_49999" },
  { label: "₹50,000 - ₹99,999 due", value: "50000_99999" },
];




const QuoteFilterSidebar: React.FC<QuotationFilterComponentProps> = ({ isOpen, onClose, filters, setFilters }) => {


  // State to hold filter values that arent saved, then saved pushing this data to parent component
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);


  // State to control the expand of Quotes valid to part
  const [validToExpanded, setValidToExpanded] = useState(true);


  //  State to control the expand of Quotes created part
  const [createdExpanded, setCreatedExpanded] = useState(true);


  // State to control the expand of Quotes amout wise part
  const [amountExpanded, setAmountExpanded] = useState(true);



  // this function updates the values in localFilter state. 
  // If value already present then remove it and add new
  // if value not present then add it

  const toggleStatus = (status: QuoteStatus) => {
    setLocalFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }));
  };


  // handles the color of quotes type buttons
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


  // apply settings button -- send data to parent component + close the modal
  const apply = () => {
    setFilters(localFilters);
    onClose();
  };


  // cancel button function -- clears all states + close the modal
  const clear = () => {
    setLocalFilters(defaultFilters);
    setFilters(defaultFilters);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>

      <SheetContent side="right" className="w-[400px] p-0 bg-white">

        <SheetHeader className="p-4 border-b bg-gray-50">

          <SheetTitle className="text-lg font-medium text-gray-900 whitespace-nowrap flex items-center gap-2">
            <Filter className="size-6" />
            <span>Filter</span>
          </SheetTitle>

        </SheetHeader>



        <div className="flex flex-col h-full overflow-y-auto">


          <div className="flex-1 overflow-y-auto p-4 space-y-6">


            {/* show quotes status options */}
            <div>
              <h3 className="font-medium mb-3 text-gray-900">Show Quotes</h3>
              <div className="grid grid-cols-2 gap-2">
                {quoteStatusOptions.map((status) => (
                  <div key={status.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status.value}`}
                      checked={localFilters.statuses.includes(
                        status.value as QuoteStatus
                      )}
                      onCheckedChange={() => toggleStatus(status.value as QuoteStatus)}
                      className="h-4 w-4"
                    />
                    <label
                      htmlFor={`status-${status.value}`}
                      className={`text-xs px-2 py-1 rounded border cursor-pointer ${getStatusColor(status.value)}`}
                    >
                      {status.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>



            {/* Show Quotes Valid options */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer py-2"
                onClick={() => setValidToExpanded(!validToExpanded)} >
                <h3 className="font-medium text-gray-900">Show Quotes valid to</h3>
                {validToExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>

              {validToExpanded && (
                <RadioGroup
                  value={localFilters.validTo}
                  onValueChange={(val) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      validTo: val as DateRangeOption,
                    }))
                  }
                >
                  <div className="space-y-3 mt-3">
                    {quoteValidDateOptions.map((opt, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <RadioGroupItem value={opt.value} id={`valid-${i}`} />
                        <div className="flex-1">
                          <label
                            htmlFor={`valid-${i}`}
                            className="text-sm text-gray-900 cursor-pointer block"
                          >
                            {opt.label}
                          </label>
                          <span className="text-xs text-gray-500">{opt.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}
            </div>



            {/* Show Quotes Created */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer py-2"
                onClick={() => setCreatedExpanded(!createdExpanded)}
              >
                <h3 className="font-medium text-gray-900">Show Quotes created</h3>
                {createdExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>

              {createdExpanded && (
                <RadioGroup
                  value={localFilters.createdAt}
                  onValueChange={(val) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      createdAt: val as DateRangeOption,
                    }))
                  }
                >
                  <div className="space-y-3 mt-3">
                    {quoteCreateOptions.map((val, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <RadioGroupItem value={val.value} id={`created-${i}`} />
                        <div className="flex-1">
                          <label
                            htmlFor={`created-${i}`}
                            className="text-sm text-gray-900 cursor-pointer block"
                          >
                            {val.label}
                          </label>
                          <span className="text-xs text-gray-500">{val.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}
            </div>




            {/* Quote Amount Wise */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer py-2"
                onClick={() => setAmountExpanded(!amountExpanded)}
              >
                <h3 className="font-medium text-gray-900">Quote Amount wise</h3>
                {amountExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>

              {amountExpanded && (
                <RadioGroup
                  value={localFilters.amount}
                  onValueChange={(val) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      amount: val as AmountRange,
                    }))
                  }
                >
                  <div className="space-y-3 mt-3">
                    {quoteAmountWise.map((val, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <RadioGroupItem value={val.value} id={`amount-${i}`} />
                        <label
                          htmlFor={`amount-${i}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {val.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}
            </div>

          </div>

        </div>



        {/* Footer Buttons */}
        <div className="border-t p-4 bg-white">
          <div className="flex justify-between gap-3">

            <Button
              onClick={apply}
              className="flex-1 bg-blue-600 hover:bg-blue-700" >
              Apply Filters
            </Button>

            <Button
              variant="outline"
              onClick={clear}
              className="flex-1">
              Cancel
            </Button>

          </div>
        </div>

      </SheetContent>
    </Sheet>
  );
};

export default QuoteFilterSidebar;