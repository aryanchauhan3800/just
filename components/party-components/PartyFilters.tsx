import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { FilterAltOutlined, ExpandMore } from "@mui/icons-material";
import React from "react";
import {
  PartyFiltersProps,
  PartyFiltersState,
} from "@/types/party-types";


const PartyFilters: React.FC<PartyFiltersProps> = ({
  filters,
  setFilters,
  expandedSectionsParty,
  toggleSection,
  applyFilters,
  cancelFilters,
  isFilterOpen,
  setIsFilterOpen,
}) => {
  const handleFilterChange = (
    key: keyof PartyFiltersState["status"],
    value: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      status: {
        ...prev.status,
        [key]: value,
      },
    }));
  };

  const handleSingleFilterChange = (
    section: keyof PartyFiltersState,
    value: boolean | string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTitle />
      <SheetTrigger asChild>
        <Button
          variant="outlined"
          className="border-2 border-blue-500 px-4 py-1 rounded-md text-blue-500 items-center hover:bg-blue-50"
          onClick={() => setIsFilterOpen(true)}
        >
          <FilterAltOutlined className="p-0.5 mr-1" />
          Filter
        </Button>
      </SheetTrigger>

      <SheetContent className="w-80 p-0 flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Typography variant="h6" className="font-medium">
            Filter
          </Typography>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Show Party */}
          <div>
            <Typography
              variant="subtitle2"
              className="font-medium mb-3"
            >
              Show Party
            </Typography>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "active", label: "Active", color: "text-green-600" },
                { key: "inactive", label: "Inactive", color: "text-red-500" },
              ].map(({ key, label, color }) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={
                        filters.status[key as keyof PartyFiltersState["status"]]
                      }
                      onChange={(e) =>
                        handleFilterChange(
                          key as keyof PartyFiltersState["status"],
                          e.target.checked
                        )
                      }
                      size="small"
                    />
                  }
                  label={<span className={`text-sm ${color}`}>{label}</span>}
                  className="!ml-1"
                />
              ))}
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.highValueOnly}
                  onChange={(e) =>
                    handleSingleFilterChange(
                      "highValueOnly",
                      e.target.checked
                    )
                  }
                  size="small"
                />
              }
              label={
                <span className="text-sm">
                  Show High-value Party only
                </span>
              }
              className="mt-2 !ml-1"
            />
          </div>

          <Divider />

          {/* To Receive Amount */}
          <div>
            <Button
              onClick={() => toggleSection("toReceiveAmount")}
              className="w-full justify-between p-0 text-left normal-case"
              endIcon={
                <ExpandMore
                  className={`transform transition-transform duration-200 ${
                    expandedSectionsParty.toReceiveAmount
                      ? "rotate-180"
                      : ""
                  }`}
                />
              }
            >
              <Typography variant="subtitle2" className="font-medium">
                ₹ To Receive Amount wise
              </Typography>
            </Button>
            {expandedSectionsParty.toReceiveAmount && (
              <FormControl component="fieldset" className="mt-2">
                <RadioGroup
                  value={filters.toReceiveAmount}
                  onChange={(e) =>
                    handleSingleFilterChange("toReceiveAmount", e.target.value)
                  }
                >
                  {[
                    { value: "ALL", label: "Show all" },
                    { value: "LESS_THAN_9999", label: "Te receive < ₹9,999" },
                    {
                      value: "BETWEEN_10000_AND_49999",
                      label: "To receive from ₹10,000 - ₹49,999",
                    },
                    {
                      value: "LESS_THAN_50000",
                      label: "To Receive < ₹50,00",
                    },
                    {
                      value: "ABOVE_50000",
                      label: "To Receive > ₹50,000",
                    },
                  ].map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio size="small" />}
                      label={<span className="text-sm">{label}</span>}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          </div>

          <Divider />

          {/* To Pay Amount */}
          <div>
            <Button
              onClick={() => toggleSection("toPayAmount")}
              className="w-full justify-between p-0 text-left normal-case"
              endIcon={
                <ExpandMore
                  className={`transform transition-transform duration-200 ${
                    expandedSectionsParty.toPayAmount ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <Typography variant="subtitle2" className="font-medium">
                🏠 To Pay Amount wise
              </Typography>
            </Button>
            {expandedSectionsParty.toPayAmount && (
              <FormControl component="fieldset" className="mt-2">
                <RadioGroup
                  value={filters.toPayAmount}
                  onChange={(e) =>
                    handleSingleFilterChange("toPayAmount", e.target.value)
                  }
                >
                  {[
                    { value: "ALL", label: "Show all" },
                    { value: "LESS_THAN_9999", label: "Te receive < ₹9,999" },
                    {
                      value: "BETWEEN_10000_AND_49999",
                      label: "To receive from ₹10,000 - ₹49,999",
                    },
                    {
                      value: "LESS_THAN_50000",
                      label: "To Receive < ₹50,000",
                    },
                    {
                      value: "ABOVE_50000",
                      label: "To Receive > ₹50,000",
                    },
                  ].map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio size="small" />}
                      label={<span className="text-sm">{label}</span>}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          </div>
        </div>

        {/* Sticky Footer */}
        <div
          style={{ boxShadow: "0 -4px 6px -4px rgba(0, 0, 0, 0.1)" }}
          className="p-4 border-t bg-white border-[#E8E8E8] flex justify-between items-center"
        >
          <Button
            onClick={cancelFilters}
            variant="outlined"
            className="text-gray-600 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={applyFilters}
            variant="contained"
            className="bg-blue-600 text-white"
          >
            ✓ Update Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PartyFilters;
