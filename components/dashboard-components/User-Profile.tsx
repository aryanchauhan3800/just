// components/Banner.jsx
'use client'; // only if you're using Next.js app router

import { useState } from 'react';
import Image from 'next/image';
import { Crown, Router } from 'lucide-react';
import NavbarBusiness from '../dashboard-components/Profile-detail-Navbar';
import React from "react";
import { useRouter } from "next/navigation";
import { FaBox, FaUsers, FaUserTie, FaWarehouse } from 'react-icons/fa';
import { StripItem } from '@/types/dashboardAndInvoiceTypes'
export default function UserProfile() {
  const [isVisible, setIsVisible] = useState(true);
  const [razorpayEnabled, setRazorpayEnabled] = useState(true);
  const [paytmEnabled, setPaytmEnabled] = useState(false);
const [isOpen, setIsOpen] = useState(false);





const router = useRouter();



  if (!isVisible) return null;

  return (

    <>
    <NavbarBusiness/>
   
    <div className='pt-6 p-4 '>
    <div className="relative flex justify-between items-center px-5 -py-2 rounded-lg "
         style={{ background: 'linear-gradient(95.3deg, #F4C99F 2.39%, #F1AA80 17.88%, #EE8160 40.42%, #EB9F90 59.2%, #F065D1 75.16%, #C76CE2 87.84%, #8F7AE2 100.05%)' }}>
      
      {/* Left Section */}
      <div className="flex flex-col gap-2 text-white max-w-sm">
        <span className="text-sm font-semibold">Karosauda</span>
        <h1 className="text-3xl font-bold">Online Store</h1>
        <p className="text-sm">Now Sell your products at your very own Online Store</p>
        <button className="mt-4 ml-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-1 rounded-full flex items-center gap-2 text-sm w-fit ">
          Set up
          <span className="text-lg">›</span>
        </button>
      </div>

      {/* Right Section Image */}
      <div className="hidden md:block pr-28 pt-4">
        <Image
          src="/Profile-banner-shop.png"
          alt="Banner illustration"
          width={186}
          height={28}
          priority
        />
      </div>

      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-4 text-white text-xl font-bold hover:scale-110 transition"
        aria-label="Close banner"
      >
        ×
      </button>
    </div>
    </div>
       <div className="max-w-8xl mx-auto bg-[#f9fafa] p-4 text-sm text-gray-800 lg:flex gap-4">
      {/* Left Section */}
      <div className="lg:w-2/3 space-y-4">
        {/* Top Profile Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div >
      <div
  className="h-35 bg-cover bg-center relative"
  style={{ backgroundImage: "url('/ProfileBg.png')" }} // ← Replace with your image path
></div>
            <div className="absolute inset-0 bg-no-repeat bg-right-top opacity-10"></div>
          </div>
          <div className="relative p-4">
            <Image
              src="/profilePhoto.png"
              alt="avatar"
              width={74}
              height={74}
              className="rounded-full border-4 border-white absolute -top-8 left-4"
            />
            <div className="absolute top-4 right-4 text-xs text-gray-400">
              from - <span className="text-gray-700 font-medium mr-4 ">12 Apr, 2024</span>
            </div>
            <div className="ml-3 mt-5 border-b border-gray-200 pb-4 mb-4  pt-4">
              <h2 className="text-lg font-semibold  text-[22px]">Punet Mishra</h2>
              <p className="text-gray-500 m">
                Owner <span className="mx-1 text-gray-300">-</span>
                <span className="text-blue-600 font-bold ">3</span> companies
              </p>
            </div>
            <div className="flex gap-8 mt-8 ml-3 text-blue-600">
              <div>
                <p className="text-xs text-gray-500 pb-2">📞 Contact</p>
                <a href="tel:+918955898589" className="hover:underline">
                  +91 8955898589
                </a>
              </div>
              <div className='pl-60'>
                <p className="text-xs text-gray-500 pb-2">📧 Email</p>
                <a href="mailto:singharchana07@gmail.com" className="hover:underline">
                  singharchana07@gmail.com
                </a>
              </div>



              
            </div>





        {/* Session Details */}
        <div className='pt-10'>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200  " >
  {/* Header with full-width bottom border */}
  <div className="border-b border-gray-200 pb-3 mb-4 bottom-full">
    <h3 className="font-lato text-[18px] text-[#474747]">Session Details</h3>
  </div>

  {/* Key-Value Grid */}
  <div className="grid grid-cols-2 md:grid-cols-2 gap-y-4 text-sm">
    <div className="flex items-center space-x-2">
  <span className="text-gray-500">Last Session</span>
  <span className="font-lato ml-30 text-sm">24 Mar, 2024</span>
</div>

    <div className="flex items-center space-x-2">
      <span className="text-gray-500">Session Duration</span>
      <span className="font-medium font-lato ml-10">02:30</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-gray-500">Location</span>
      <span className="font-lato  ml-36 ">Pratapgarh, UP</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-gray-500">IP</span>
      <span className="font-lato  break-words ml-33 ">875642158421542</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-gray-500">Device</span>
      <span className="font-lato  ml-38">Lenovo ThinkPad</span>
    </div>
  </div>

  {/* Logout Button */}
  <div className="mt-8 pt-3 border-t p-5 border-gray-200">
    <button className="text-red-600 flex items-center gap-2 font-lato hover:underline pt-2 text-[16px]">
      <span>🔓</span> Logout
    </button>
  </div>
</div>
</div>











        {/* Companies */}
        <div className='pt-5'>
       <div className="pt-4">
  <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
    <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
      <h3 className="font-lato text-[18px] text-[#474747]">Companies you own</h3>
      <button className="text-blue-600 text-sm hover:underline"  onClick={() => router.push('/dashboard/add-new-item')} >+ New Business</button>
    </div>

    <ul>
      {[
        "Duleux Enterprises",
        "Avani Prints and Paint Services",
        "DeGanga Travels and Tours",
      ].map((name, idx) => (
        <li key={idx} className="py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/company-logo.png"
              alt="Company Logo"
              width={40}
              height={40}
              className="rounded-md mr-3"
            />
            <div>
              <p className="text-gray-800 font-medium text-sm">{name}</p>
              <p className="text-gray-500 text-xs">Created on 12 Jan, 2024</p>
            </div>
          </div>
          <span className="text-blue-600 text-[29px] pr-5">›</span>
        </li>
      ))}
    </ul>
  </div>
</div>


<div className='pt-10'>




      {/* Payment Gateways */}
        <div className="bg-white rounded-xl p-4    shadow border border-gray-200">
           <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-5">
      <h3 className="font-lato text-[18px] text-[#474747]">Payment Gateways</h3>
     
    </div>

          {/* Razorpay */}
      
    <div className="flex items-center gap-2 mb-4">
      {/* Gray Box: Content only */}
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg w-full min-w-[630px] max-w-md">
        {/* Left Section: Logo + Info */}
        <div>
          <img
            src="/razorpay-icon.png" // Replace with actual path
            alt="Razorpay"
            className="h-4 mb-1"
          />

          <p className="font-lato text-gray-600 text-[16px]">
            Modes: <span className="text-gray-600 font-semibold text-[14px]">Card, Bank, Wallet</span>
          </p>

          <p className="text-xs mt-1">
            Status : <span className={`${paytmEnabled ? 'text-green-400' : 'text-red-400'} font-lato`}>
              {paytmEnabled ? 'Active' : 'Inactive'}
            </span>
          </p>
        </div>

        {/* Toggle Switch */}
        <label className="inline-flex relative items-center cursor-pointer mb-9">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={paytmEnabled}
            onChange={() => setPaytmEnabled(!paytmEnabled)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 relative" />
        </label>
      </div>

      {/* Pencil Icon Outside */}
      <button className="text-gray-600 hover:text-black text-sm -mt-15 ml-8">
        ✏️
      </button>
    </div>
          {/* Paytm */}


            <div className="flex items-center gap-2 mb-4">
      {/* Gray Box: Content only */}
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg w-full min-w-[630px] max-w-md">
        {/* Left Section: Logo + Info */}
        <div>
          <img
            src="/razorpay-icon.png" // Replace with actual path
            alt="Razorpay"
            className="h-4 mb-1"
          />

         <p className="font-lato text-gray-600 text-[16px]">
            Modes: <span className="text-gray-600 font-semibold text-[14px]">Card, Bank, Wallet</span>
          </p>

          <p className="text-xs mt-1">
            Status : <span className={`${razorpayEnabled? 'text-green-500': 'text-red-400'} font-lato`}>
              
              {razorpayEnabled ? 'Active' : 'Inactive'}
              </span>
          </p>
        </div>

        {/* Toggle Switch */}
        <label className="inline-flex relative items-center cursor-pointer mb-9">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={razorpayEnabled}
            onChange={() => setRazorpayEnabled(!razorpayEnabled)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 relative" />
        </label>
      </div>

      {/* Pencil Icon Outside */}
      <button className="text-gray-600 hover:text-black text-sm -mt-15 ml-8">
        ✏️
      </button>
    </div>

          {/* Stripe */}
        <div className="flex justify-between items-start p-4 bg-gray-50 rounded-lg w-[630px] ">
      {/* Left: Logo and Description */}
      <div>
        {/* Stripe Logo Image */}
        <img
          src="/stripe.png" // 🔁 Replace with actual logo path
          alt="Stripe"
          className="h-6 mb-2"
        />

        {/* Description Text */}
        <p className="text-sm text-gray-600">
          Ideal for international payments—secure, scalable, and built<br />
          for modern businesses.
        </p>
      </div>

      {/* Right: "+ Setup" Button */}
      <div className="ml-4 mt-1">
        <button     onClick={() => setIsOpen(true)} className="text-sm font-medium text-brand text-[14px] hover:underline">
          + Setup
        </button>
      </div>
    </div>




    

    
        </div>
      </div>


{isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
         <div className="bg-white w-[640px] rounded-xl shadow-xl p-6">

            <div className="flex justify-between items-center mb-4 border-b border-gray-300  pb-4">
              <h2 className="text-lg font-medium">Set up Payment Gateways</h2>
              <button onClick={() => setIsOpen(false)} className="text-xl">×</button>
            </div>

            <img src="/Paytm-logo.png" alt="Paytm" className="w-[60px] mb-4" />

            {/* Form */}
            <div className="space-y-4">
             <div className="space-y-4">
  {/* Merchant ID */}
  
  <div className="flex items-center">
    <label className="w-40 text-sm font-medium text-zinc">
     <span className='text-red-500'>*</span> Merchant ID :
    </label>
    <input
      type="text"
      className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
    />
  </div>

  {/* Merchant Key */}
  <div className="flex items-center">
    <label className="w-40 text-sm font-medium text-zinc">
     <span className='text-red-500'>* </span> Merchant Key :
    </label>
    <input
      type="text"
      className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
    />
  </div>

  {/* Bank Account */}
  <div className="flex items-center">
    <label className="w-40 text-sm font-medium text-zinc">
    <span className='text-red-500'>*</span>   Bank Account :
    </label>
    <select className="flex-1 p-2 border border-gray-300 rounded-md text-sm">
      <option>Select Account</option>
    </select>
  </div>
</div>

            </div>

            {/* Info Section */}
        <div className="bg-gray-50 mt-6 w-full   rounded-md text-sm">
  <div className="p-4">
    <p className="font-medium mb-1">Online Payments</p>
    <p className="text-gray-600 mb-2">
      Configure your merchant details...
    </p>
              <p className="font-medium mb-1">Transaction Charges</p>
              <p className="text-gray-600 mb-2">
                Transaction charges are applicable as per your payment gateway’s plan. Karosauda won’t charge any additional fees.
              </p>
              <p className="font-medium mb-1">Supported Payment Methods</p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Wallet</li>
                <li>UPI</li>
                <li>Netbanking</li>
                <li>Credit cards and Debit cards</li>
              </ul>
              <div className="flex gap-3 mt-2">
                <img src="/visa.png" className="h-3" />
                <img src="/mastercard.png" className="h-3" />
                <img src="/rupay.png" className="h-3" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 text-sm px-4 py-2"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white text-sm px-5 py-2 rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
        </div>
      )}






</div>



          </div>
        </div>
        </div>







    

      {/* Right Subscription Section */}

<div className="w-full max-w-sm ">
  <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
    {/* Title */}
    <div className='border-b border-gray-200 pb-3 mb-4 bottom-[500px]'>
    <h3 className="font-lato text-[18px] text-gray-800 mb-">Subscription</h3>
</div>
    {/* Subscription Dates */}
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
      <div>
        <p className="text-gray-400 text-xs mb-1">Subscription Start</p>
        <p className="text-sm font-medium text-gray-800">24 Mar, 2025</p>
        <span className="text-xs text-gray-400">14:60</span>
      </div>
      <div>
        <p className="text-gray-400 text-xs mb-1">Expires on</p>
        <p className="text-sm font-medium text-gray-800">24 Mar, 2026</p>
        <span className="text-xs text-gray-400">14:60</span>
      </div>
    </div>

    {/* Plan Section */}
    <div className="border-t border-gray-100 -pt-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <span ><Crown/></span>
          Premium Plan
        </div>
        <div className="text-right pt-5">
          <span className="font-semibold text-gray-800  text-lato text-[20px]">₹266</span>
          <div className="text-sm font-alto text-gray-500 ">Monthly</div>
        </div>
      </div>

      <div className="text-xs text-gray-600 scroll-pt-4 ">Save 52% monthly</div>

      {/* Progress Bar */}
      <div className="bg-gray-200 w-full h-2 rounded-full mt-3">
        <div className="bg-brand h-2 rounded-full w-[75%]"></div>
      </div>
    </div>

    {/* Plan Link */}
    <button className="w-full mt-4 text-sm font-medium text-zinc hover:underline flex items-center justify-center gap-1">
      View Plan Details <span className="text-xl">›</span>
    </button>
  </div>
</div>







    </div>
 </>

  );
}
