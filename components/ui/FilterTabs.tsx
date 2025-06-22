'use client';

import React from 'react';

interface FilterTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = ['All', 'Customers', 'Vendors', 'Both', 'POS Customers'];

const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex bg-[#fafafa] p-1 rounded-lg space-x-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
              ${isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-blue-600'}
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;
