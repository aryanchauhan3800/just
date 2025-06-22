'use client';
import { Crown } from 'lucide-react';
import React, { useState } from 'react';


export default function PartyTagSection() {
  const [isActive, setIsActive] = useState(true);
  const [isHighValue, setIsHighValue] = useState(true);

  return (
    <div className="p-8 max-w-xl text-[#242424]">
      <h2 className="text-xl font-semibold mb-1">Almost there...</h2>
      <p className="text-sm text-gray-500 mb-6">
        Tag the party for better management
      </p>

      <div className="flex items-start mb-5">
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <div className="ml-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            Mark Party as
            <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              Active
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            You can make Invoices, and other transactions only with Active parties
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          checked={isHighValue}
          onChange={() => setIsHighValue(!isHighValue)}
          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
       

<div className="ml-3">
  <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
    Mark Party as
    <span className="bg-[#f59e0b] text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
      <Crown size={12} className="text-white" /> High value
    </span>
  </div>
  <p className="text-sm text-gray-500 mt-1">
    You will be promptly notified about any updates from a “High Value” Party
  </p>
</div>

      </div>
    </div>
  );
}
