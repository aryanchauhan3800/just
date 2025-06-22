import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import { ArrowUpDown, ListFilter, SortAscIcon } from 'lucide-react';
import { SortTwoTone } from '@mui/icons-material';

const SortPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popupRef}>
     <button
  onClick={() => setOpen((prev) => !prev)}
  aria-haspopup="true"
  className="flex items-center gap-2 px-4 py-2  border border-[#D6D6D6] rounded bg-white hover:bg-gray-100 transition"
>
  <ArrowUpDown className="text-gray-700 w-5 h-4" />
  <span className="text-[#474747]; font-medium">Sort</span>
</button>

     {open && (
        <div className="absolute right-0 mt-2 w-72 max-w-[90vw]  bg-white rounded shadow-md border border-[#E8E8E8] z-50">
          <div className="text-[#6B6B6B] font-semibold px-4 py-3 border-b border-[#E8E8E8]">
            Sort Customers
          </div>

          <button
            className="flex items-center w-full px-4 py-3 hover:bg-gray-50 transition border-b border-[#E8E8E8]"
          >
            <FaCalendarAlt className="mr-3 text-[#6B6B6B] text-base" />
            <span className="text-[#6B6B6B] text-sm">Last Activity - Recent to Oldest</span>
          </button>

          <button
            className="flex items-center w-full px-4 py-3 hover:bg-gray-50 transition"
          >
            <FaRupeeSign className="mr-3 text-[#6B6B6B] text-base" />
            <span className="text-[#6B6B6B] text-sm">To Receive - High to low</span>
          </button>
        </div>
      )}
    </div>
  );
};



export default SortPopup;
