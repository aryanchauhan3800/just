import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MoreVertical, Plus } from 'lucide-react';
import WarehouseInventory from './Warehouse-details';

const warehouses = [
  {
    name: 'Pratapgarh',
    address: '14-5 Country downtown ro..',
  },
  {
    name: 'Raigarh',
    address: '478-5 Udaypur Old station..',
  },
  {
    name: 'Zaminzilla',
    address: '24 / 8 park street view roa..',
  },
];

const Warehouse = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[280px] bg-white h-screen fixed top-[72px] border-r border-gray-200 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4 px-4">
          <div>
            <h2 className="text-sm text-gray-500">
              Warehouses · <span className="text-blue-600 font-medium">{warehouses.length}</span>
            </h2>
            <p className="text-xs text-gray-400">Click to see details</p>
          </div>
          <button className="w-10 h-10 rounded bg-white shadow border border-gray-200 flex items-center justify-center">
            <Plus size={20} className="text-brand" />
          </button>
        </div>

        <div className="flex flex-col space-y-1 overflow-y-auto max-h-[calc(100vh-150px)]">
          {warehouses.map((wh, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={wh.name}
                onClick={() => setActiveIndex(index)}
                className={`flex cursor-pointer rounded ${
                  isActive ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col px-3 py-2 w-full">
                  <div
                    className={`flex items-center gap-2 ${
                      isActive ? 'text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    <FaMapMarkerAlt className="text-sm pt-[1px]" />
                    <span className="text-sm">{wh.name}</span>
                  </div>
                  <p className="text-xs text-gray-400 ml-5">{wh.address}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content area */}
      <div className="pl-[300px] pt-5 flex flex-col gap-4 pr-9 w-full">
        {/* Basics card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 w-full min-w-[750px] shadow-sm max-w-[900px]">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
            <h3 className="text-sm font-medium text-gray-800">Basics</h3>
            <MoreVertical size={18} className="text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded">
                <FaMapMarkerAlt className="text-gray-500 text-lg" />
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900">Pratapgarh</h4>
                <p className="text-sm text-gray-400">Warehouse</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded">
              <div className="w-1 h-8 bg-green-500 rounded mr-3" />
              <div>
                <p className="text-xs text-gray-400">Items worth</p>
                <p className="text-base font-medium text-gray-900">₹ 1,20,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="bg-white border rounded-lg shadow-sm min-w-[750px] w-full pl-2">
          <div className="flex justify-between items-center px-3 pt-3">
            <div className="text-sm font-medium text-gray-800">Billing Address</div>
            <span className="text-gray-400 cursor-pointer">✎</span>
          </div>

          <div className="border-t border-gray-200 mt-2 mb-4" />

          <div className="grid grid-cols-3 gap-y-4 px-4 pb-4 text-sm text-gray-800">
            <div>
              <div className="text-xs text-gray-500">Address Line</div>
              275 - B Tana Sahib Road
            </div>
            <div>
              <div className="text-xs text-gray-500">State</div>
              NCR
            </div>
            <div>
              <div className="text-xs text-gray-500">Country</div>
              INDIA
            </div>
            <div>
              <div className="text-xs text-gray-500">Address Line 2</div>
              Opp Metali Optics
            </div>
            <div>
              <div className="text-xs text-gray-500">PIN</div>
              615223
            </div>
            <div className="col-span-3">
              <div className="text-xs text-gray-500">City</div>
              New Delhi
            </div>
          </div>
        </div>

        {/* Warehouse Inventory (DataGrid) */}
        <WarehouseInventory />
      </div>
    </div>
  );
};

export default Warehouse;
