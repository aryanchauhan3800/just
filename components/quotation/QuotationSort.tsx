"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowUpDown, Calendar, IndianRupee } from "lucide-react";

export type SortOption = "" | "expiry_date" | "amount_high_low" | "amount_low_high";

interface SortPopupProps {
  sortValue: SortOption;
  setSortValue: (value: SortOption) => void;
}

const sortOptions = [
  {
    label: "Upcoming Expiry Dates",
    value: "expiry_date",
    icon: Calendar,
    description: "Sort by expiry date (earliest first)"
  },
  {
    label: "Quote amount - High to low",
    value: "amount_high_low",
    icon: IndianRupee,
    description: "Sort by amount (highest first)"
  },
  {
    label: "Quote amount - Low to high",
    value: "amount_low_high",
    icon: IndianRupee,
    description: "Sort by amount (lowest first)"
  },
];



const QuotationSort: React.FC<SortPopupProps> = ({ sortValue, setSortValue }) => {


  return (
    <Popover>
      <PopoverTrigger asChild>

        <Button
          variant="outline"
          className="flex items-center gap-2 text-[#025AE0] font-semibold">

          <ArrowUpDown className="h-4 w-4" />
          Sort

        </Button>

      </PopoverTrigger>


      <PopoverContent className="w-80 p-0" align="end">

        <div className="p-4">

          <h3 className="font-medium text-gray-900 mb-4">Sort Quotes</h3>

          <RadioGroup
            value={sortValue}
            onValueChange={(value) => setSortValue(value as SortOption)}>

            <div className="space-y-3">

              {sortOptions.map((option) => {

                return (

                  <div key={option.value} className="flex items-start space-x-3">

                    <RadioGroupItem
                      value={option.value}
                      id={`sort-${option.value}`}
                      className="mt-1"
                    />

                    <div className="flex-1 cursor-pointer" onClick={() => setSortValue(option.value as SortOption)}>

                      <label
                        htmlFor={`sort-${option.value}`}
                        className="flex items-center gap-2 text-sm font-medium text-gray-900 cursor-pointer">

                        <option.icon className="h-4 w-4 text-gray-600" />

                        {option.label}

                      </label>

                      <p className="text-xs text-gray-500 mt-1 ml-6">
                        {option.description}
                      </p>

                    </div>

                  </div>
                );
              })}
            </div>
          </RadioGroup>

          {sortValue && (
            <div className="mt-4 pt-3 border-t">

              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800"
                onClick={() => setSortValue("")}  >

                Clear sorting

              </Button>

            </div>
          )}

        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QuotationSort;