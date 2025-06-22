// components/Banner.jsx
'use client'; // only if you're using Next.js app router

import { useState } from 'react';
import Image from 'next/image';
import { Crown, Router } from 'lucide-react';
import NavbarBusiness from '../dashboard-components/Profile-detail-Navbar';
import React from "react";
import { useRouter } from "next/navigation";
export default function UserProfile() {
  const [isVisible, setIsVisible] = useState(true);
  const [razorpayEnabled, setRazorpayEnabled] = useState(true);
  const [paytmEnabled, setPaytmEnabled] = useState(false);
const [isOpen, setIsOpen] = useState(false);
 const hasPlan = true;
const router = useRouter();



  if (!isVisible) return null;

  return (

    <>
    <NavbarBusiness/>


{hasPlan ?(

   
    <><div className='pt-6 p-4 '>

              </div><div className="max-w-8xl mx-auto bg-[#f9fafa] p-4 text-sm text-gray-800 lg:flex gap-4">
                      {/* Left Section */}
                      <div className="lg:w-2/3 space-y-4">
                          {/* Top Profile Card */}
                          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                              <div className="bg-white   overflow-hidden border border-gray-200">
                                  {/* Banner */}
                                  <div className="relative h-[120px] bg-cover bg-center" style={{ backgroundImage: "url('/ProfileBg.png')" }}>
                                      <div className="absolute inset-0 flex justify-between items-center px-6 py-5"
                                          style={{
                                              background: 'linear-gradient(90deg, #FDFDFD 0%, rgba(253, 253, 253, 0.8) 40%, rgba(253, 253, 253, 0.4) 70%, transparent 100%)'
                                          }}
                                      >
                                          <div className="text-black">
                                              <p className="text-sm text-gray-600 mb-1 font-lato text-[14px]">Currently ongoing</p>
                                              <h2 className="text-2xl font-lato text-[32px]">Free Trial</h2>
                                          </div>

                                          <div className='pt-15'>

                                          <span className="bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded shadow ">05 - days left</span>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Section 1: Dates */}
                                  <div className="px-6 py-4">
                                      <div className="flex justify-between flex-wrap gap-6">
                                          <div>
                                              <p className="text-sm text-gray-500 mb-1">Subscription Start</p>
                                              <p className="text-base font-medium text-gray-900">07 Mar, 2025</p>
                                              <p className="text-sm text-gray-500">14:60</p>
                                          </div>
                                          <div>
                                              <p className="text-sm text-gray-500 mb-1">Expires on</p>
                                              <p className="text-base font-medium text-gray-900">14 Mar, 2025</p>
                                              <p className="text-sm text-gray-500">14:60</p>
                                          </div>
                                      </div>
                                  </div>

                                  {/* Divider */}


                                  {/* Section 2: Avatars & Button */}
                                  <div className="px-6 py-6">
                                      <div className="flex items-center gap-3 mb-6">
                                          <div className="flex -space-x-2 rounded ">
                                              <img src="/avatar1.png" alt="user1" className="w-8 h-8 rounded-full border-2 border-white" />
                                              <img src="/avatar2.png" alt="user2" className="w-8 h-8 rounded-full border-2 border-white" />
                                              <img src="/avatar3.png" alt="user3" className="w-8 h-8 rounded-full border-2 border-white" />
                                          </div>
                                          <div className="text-sm font-medium text-gray-700">
                                              <p>1000+<br /><span className="text-gray-400 font-normal">Users</span></p>
                                          </div>
                                      </div>

                                      <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded shadow inline-flex items-center gap-1">
                                          Purchase Plan
                                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                          </svg>
                                      </button>
                                  </div>

                                  {/* Divider */}
                                  <div className="border-t border-gray-200" />

                                  {/* Section 3: Feature List */}



                                  <div className="border-t border-gray-200" />

                                  <div className="px-6 py-4 bg-white">
                                      <h3 className="text-base font-medium text-gray-800">
                                          Purchase a plan today to get the following
                                      </h3>
                                  </div>

                                  <div className="border-b border-gray-200 " />

                                  <div className='p-6'>


                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm rounded ">
                                          <div className="flex items-center gap-3">
                                              <img src="/icons/invoice.png" alt="invoice" className="w-6 h-6" />
                                              <span>100 <span className="font-semibold">Invoice</span></span>
                                          </div>
                                          <div className="flex items-center gap-3">
                                              <img src="/icons/building.png" alt="business" className="w-6 h-6" />
                                              <span>3 <span className="font-semibold">Business(s)</span></span>
                                          </div>

                                          <div className="flex items-center gap-3">
                                              <img src="/icons/quotes.png" alt="quotes" className="w-6 h-6" />
                                              <span>100 <span className="font-semibold">Quotes</span></span>
                                          </div>
                                          <div className="flex items-center gap-3">
                                              <img src="/icons/customers.png" alt="customers" className="w-6 h-6" />
                                              <span>Unlimited <span className="font-semibold">Customers</span></span>
                                          </div>

                                          <div className="flex items-center gap-3">
                                              <img src="/icons/challan.png" alt="challans" className="w-6 h-6" />
                                              <span>100 <span className="font-semibold">Challans</span></span>
                                          </div>
                                          <div className="flex items-center gap-3">
                                              <img src="/icons/vendors.png" alt="vendors" className="w-6 h-6" />
                                              <span>Unlimited <span className="font-semibold">Vendors</span></span>
                                          </div>

                                          <div className="flex items-center gap-3">
                                              <img src="/icons/items.png" alt="items" className="w-6 h-6" />
                                              <span>100 <span className="font-semibold">Items</span></span>
                                          </div>
                                      </div>
                                  </div>
                              </div>










                              <div className='p-6'>


                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm">
                                      <div className="flex items-center gap-3">
                                          <img src="/icons/invoice.png" alt="invoice" className="w-6 h-6" />
                                          <span>GSTR-1 <span className="font-semibold">Reports</span></span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                          <img src="/icons/building.png" alt="business" className="w-6 h-6" />
                                          <span>GSTR-2 <span className="font-semibold">Reports</span></span>
                                      </div>

                                      <div className="flex items-center gap-3">
                                          <img src="/icons/quotes.png" alt="quotes" className="w-6 h-6" />
                                          <span>GSTR-2 <span className="font-semibold">Reports</span></span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                          <img src="/icons/customers.png" alt="customers" className="w-6 h-6" />
                                          <span>ITR<span className="font-semibold">Reports</span></span>
                                      </div>

                                      <div className="flex items-center gap-3">
                                          <img src="/icons/challan.png" alt="challans" className="w-6 h-6" />
                                          <span>CA<span className="font-semibold">Connect</span></span>
                                      </div>

                                  </div>

                              </div>


                          </div>









                      </div>









                      {/* Right Subscription Section */}





                      <div className="w-full max-w-sm">
                          <div className="bg-white rounded-lg p-4 shadow border border-gray-200 text-center min-h-[770px] flex flex-col justify-between">
                              {/* Top: Title with border */}
                              <div className="border-b border-gray-200 pb-3 text-left">
                                  <h3 className="font-lato text-[16px] text-gray-800">History</h3>
                              </div>

                              {/* Center: No Plan Message */}
                              <div className="flex-grow flex flex-col justify-center items-center text-gray-500 gap-2">
                                  {/* Icon */}
                                  <div className="text-4xl opacity-40">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l2 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                  </div>
                                  <p className="text-sm">You have not purchased any plan yet</p>
                              </div>

                              {/* Bottom: Purchase Plan */}
                              <div className="pb-3">
                                  <button className="text-sm font-semibold text-gray-800 hover:underline">
                                      Purchase Plan
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div></>



):(
       
    <><div className='pt-6 p-4 '>

                  </div><div className="max-w-8xl mx-auto bg-[#f9fafa] p-4 text-sm text-gray-800 lg:flex gap-4">
                          {/* Left Section */}
                          <div className="lg:w-2/3 space-y-4">
                              {/* Top Profile Card */}
                              <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                                  <div className="bg-white   overflow-hidden border border-gray-200">
                                      {/* Banner */}
                                    <div
  className="relative h-[120px] bg-cover bg-center rounded-lg overflow-hidden"
  style={{ backgroundImage: "url('/ProfileBg.png')" }}
>
  <div className="absolute inset-0 flex justify-between items-center px-6 py-5">
    {/* Left Content */}
    <div className="text-gray-800">
      <p className="text-[32px] font-lato ">
        ₹ 2599 <span className="text-sm font-normal text-gray-600">/year</span>
      </p>
      <h2 className="text-xl font-semibold mt-1">Standard Plan</h2>
      <p className="text-sm text-gray-500 mt-0.5">Currently ongoing</p>
    </div>

    {/* Right Badge */}
    <div className='pt-15'>
    <span className="bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded shadow">
      24 - days left
    </span>
    </div>
  </div>
</div>

                                      {/* Section 1: Dates */}
                                      <div className="px-6  pt-10">
                                          <div className="flex justify-between flex-wrap gap-6">
                                              <div>
                                                  <p className="text-sm text-gray-500 mb-1">Subscription Start</p>
                                                  <p className="text-base font-lato text-gray-900">07 Mar, 2025</p>
                                                  <p className="text-sm text-gray-500">14:60</p>
                                              </div>
                                              <div className='mr-52'>
                                                  <p className="text-sm text-gray-500 mb-1">Expires on</p>
                                                  <p className="text-base font-lato text-gray-900">14 Mar, 2025</p>
                                                  <p className="text-sm text-gray-500">14:60</p>
                                              </div>
                                          </div>
                                      </div>

                                      {/* Divider */}


                                      {/* Section 2: Avatars & Button */}
                                      <div className="px-6 py-6 pt-10 mb-7">
                                     

                                          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded shadow inline-flex items-center gap-1">
                                              Purchase Plan
                                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                              </svg>
                                          </button>
                                      </div>

                                      {/* Divider */}
                                      <div className="border-t border-gray-200" />

                                      {/* Section 3: Feature List */}



                                      <div className="border-t border-gray-200" />

                                      <div className="px-6 py-4 bg-white">
                                          <h3 className="text-base font-medium text-gray-800">
                                              Purchase a plan today to get the following
                                          </h3>
                                      </div>

                                      <div className="border-b border-gray-200 " />

                                      <div className='p-6'>


                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm">
                                              <div className="flex items-center gap-3">
                                                  <img src="/icons/invoice.png" alt="invoice" className="w-6 h-6" />
                                                  <span>100 <span className="font-semibold">Invoice</span></span>
                                              </div>
                                              <div className="flex items-center gap-3">
                                                  <img src="/icons/building.png" alt="business" className="w-6 h-6" />
                                                  <span>3 <span className="font-semibold">Business(s)</span></span>
                                              </div>

                                              <div className="flex items-center gap-3">
                                                  <img src="/icons/quotes.png" alt="quotes" className="w-6 h-6" />
                                                  <span>100 <span className="font-semibold">Quotes</span></span>
                                              </div>
                                              <div className="flex items-center gap-3">
                                                  <img src="/icons/customers.png" alt="customers" className="w-6 h-6" />
                                                  <span>Unlimited <span className="font-semibold">Customers</span></span>
                                              </div>

                                              <div className="flex items-center gap-3">
                                                  <img src="/icons/challan.png" alt="challans" className="w-6 h-6" />
                                                  <span>100 <span className="font-semibold">Challans</span></span>
                                              </div>
                                              <div className="flex items-center gap-3">
                                                  <img src="/icons/vendors.png" alt="vendors" className="w-6 h-6" />
                                                  <span>Unlimited <span className="font-semibold">Vendors</span></span>
                                              </div>

                                              <div className="flex items-center gap-3">
                                                  <img src="/icons/items.png" alt="items" className="w-6 h-6" />
                                                  <span>100 <span className="font-semibold">Items</span></span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>










                                  <div className='p-6'>


                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm">
                                          <div className="flex items-center gap-3">
                                              <img src="/icons/invoice.png" alt="invoice" className="w-6 h-6" />
                                              <span>GSTR-1 <span className="font-semibold">Reports</span></span>
                                          </div>
                                          <div className="flex items-center gap-3">
                                              <img src="/icons/building.png" alt="business" className="w-6 h-6" />
                                              <span>GSTR-2 <span className="font-semibold">Reports</span></span>
                                          </div>

                                          <div className="flex items-center gap-3">
                                              <img src="/icons/quotes.png" alt="quotes" className="w-6 h-6" />
                                              <span>GSTR-2 <span className="font-semibold">Reports</span></span>
                                          </div>
                                          <div className="flex items-center gap-3">
                                              <img src="/icons/customers.png" alt="customers" className="w-6 h-6" />
                                              <span>ITR<span className="font-semibold">Reports</span></span>
                                          </div>

                                          <div className="flex items-center gap-3">
                                              <img src="/icons/challan.png" alt="challans" className="w-6 h-6" />
                                              <span>CA<span className="font-semibold">Connect</span></span>
                                          </div>

                                      </div>

                                  </div>


                              </div>









                          </div>









                          {/* Right Subscription Section */}





                          <div className="w-full max-w-sm">
                <div className="bg-white rounded-lg p-4 shadow border border-gray-200 text-left min-h-[770px] flex flex-col">
  {/* Top: Title */}
  <div className="border-b border-gray-200 pb-3 mb-4">
    <h3 className="text-[16px] font-semibold text-gray-800">History</h3>
  </div>

  {/* Scrollable Plan List */}
  <div className="overflow-y-auto pr-2 space-y-6" style={{ maxHeight: '680px' }}>
    {[
      { name: "Standard Plan", date: "12 Jan, 2025", price: "₹2400", isLatest: true },
      { name: "Standard Plan", date: "12 Mar, 2024", price: "₹2400" },
      { name: "Premium Plan", date: "12 Mar, 2023", price: "₹2400" },
      // Add more entries here to test scroll
    ].map((plan, i) => (
      <div key={i} className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="bg-gray-100 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l2 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="text-left">
            <h4 className="text-sm font-medium text-gray-800">{plan.name}</h4>
            <p className="text-sm text-gray-500">
              {plan.isLatest ? (
                <>
                  <span className="text-blue-600 underline">Upgraded on</span> {plan.date}
                </>
              ) : (
                <>Upgraded on {plan.date}</>
              )}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="text-sm font-medium text-gray-900">{plan.price}</div>
      </div>
    ))}
  </div>
</div>


                          </div>
                      </div></>


)}


 </>

  );
}
