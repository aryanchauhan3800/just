// components/Sidebar.tsx
'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const items = [
    { label: 'Basics', active: true },
    { label: 'Billing Address' },
    { label: 'Shipping Address' },
    { label: 'Credit and Bank' },
    { label: 'Party Tags' },
  ];

  return (
    <div
      className="w-[280px] h-[700px] border-r pt-6 pb-6 bg-white "
    >
      <ul className="space-y-4 px-6 pt-60">
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex items-center justify-between text-sm font-medium ${
              item.active
                ? 'text-blue-600'
                : 'text-gray-500'
            }`}
          >
            {item.label}
            {item.active && (
              <ChevronRight size={16} className="text-blue-600" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
