import React, { useState } from "react";
import {
  Filter,
  X,
  Crown,
  IndianRupee,
  Wallet,
  ChevronDown,
} from "lucide-react";

interface FilterButtonWithMenuProps {
  onApplyFilter: (filters: {
    showActive: boolean;
    showInactive: boolean;
    highValueOnly: boolean;
    toReceive: string;
    toPay: string;
  }) => void;
}

const FilterButtonWithMenu: React.FC<FilterButtonWithMenuProps> = ({
  onApplyFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [filters, setFilters] = useState({
    showActive: true,
    showInactive: false,
    highValueOnly: false,
    toReceive: "Show all",
    toPay: "Show all",
  });

  const handleApply = () => {
    onApplyFilter(filters);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const receiveOptions = [
    "Show all",
    "To receive < ₹9,999",
    "To receive from ₹10,000 - ₹49,999",
    "To receive > ₹50,000",
  ];

  const payOptions = [
    "Show all",
    "To pay < ₹9,999",
    "To pay from ₹10,000 - ₹49,999",
    "To pay > ₹50,000",
  ];

  const [toReceiveDropdownOpen, setToReceiveDropdownOpen] = useState(false);
  const [toPayDropdownOpen, setToPayDropdownOpen] = useState(false);

  const handleReceiveSelect = (value: string) => {
    setFilters({ ...filters, toReceive: value });
    setToReceiveDropdownOpen(false);
  };

  const handlePaySelect = (value: string) => {
    setFilters({ ...filters, toPay: value });
    setToPayDropdownOpen(false);
  };

  return (
    <>
      {/* Filter Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded border border-[#D6D6D6] bg-white text-[#0057FF] text-sm font-medium"
      >
        <Filter size={14} />
        Filter
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div className="flex-1 bg-black/10" onClick={handleCancel} />

          {/* Drawer */}
          <div className="w-[350px] max-w-full h-full bg-white flex flex-col shadow-lg">
            {/* Header */}
            <div className="sticky top-0 bg-white px-6 py-4 z-10  flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#6B6B6B] text-lg font-semibold">
                <Filter size={18} />
                Filter
              </div>
              <button onClick={handleCancel}>
                <X className="text-gray-500 hover:text-black transition" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Show Party Section */}
              <div className="mb-6">
                <p className="text-sm font-medium text-[#6B6B6B] mb-3">
                  Show Party
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <label className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      checked={filters.showActive}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          showActive: e.target.checked,
                        })
                      }
                    />
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      checked={filters.showInactive}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          showInactive: e.target.checked,
                        })
                      }
                    />
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                      Inactive
                    </span>
                  </label>
                </div>
                <label className="flex items-center gap-2 text-sm text-[#6B6B6B] font-medium">
                  <input
                    type="checkbox"
                    className="accent-blue-500"
                    checked={filters.highValueOnly}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        highValueOnly: e.target.checked,
                      })
                    }
                  />
                  <Crown size={16} className="text-[#F4A825]" />
                  Show High-value Party only
                </label>
              </div>

              {/* To Receive Dropdown */}
              <div className="rounded p-5 mb-6 ">
                <div className="flex items-center gap-2 text-[#6B6B6B] font-medium mb-3 text-sm">
                  <IndianRupee size={16} />
                  To Receive Amount wise
                </div>
                <div className="relative">
                  <button
                    onClick={() =>
                      setToReceiveDropdownOpen(!toReceiveDropdownOpen)
                    }
                    className="w-full flex justify-between items-center  rounded px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filters.toReceive}
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>
                  {toReceiveDropdownOpen && (
                    <div className="absolute z-10 w-full bg-white shadow-md mt-1 rounded ">
                      {receiveOptions.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          <input
                            type="radio"
                            name="toReceive"
                            value={option}
                            checked={filters.toReceive === option}
                            onChange={() => handleReceiveSelect(option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* To Pay Dropdown */}
              <div className=" rounded-lg p-5 mb-6 relative">
                <div className="flex items-center gap-2 text-[#6B6B6B] font-medium mb-3 text-sm">
                  <Wallet size={16} />
                  To Pay Amount wise
                </div>
                <div className="relative">
                  <button
                    onClick={() => setToPayDropdownOpen(!toPayDropdownOpen)}
                    className="w-full flex justify-between items-center  rounded px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filters.toPay}
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>
                  {toPayDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow">
                      {payOptions.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="toPay"
                            value={option}
                            checked={filters.toPay === option}
                            onChange={() => handlePaySelect(option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-between items-center z-10">
              <button
                onClick={handleCancel}
                className="text-sm px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                ✓ Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterButtonWithMenu;
