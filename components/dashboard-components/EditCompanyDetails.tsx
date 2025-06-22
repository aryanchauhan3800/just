'use client';

import { SetStateAction, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { PiUploadSimpleBold } from "react-icons/pi";
import { FaChevronDown, FaRupeeSign } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineBan } from "react-icons/hi";
import { FiEdit2, FiRepeat } from "react-icons/fi";
import { Check, CheckSquare, Crown } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "@mui/material";

import { FiRefreshCw } from 'react-icons/fi';
import { Trash2 } from 'lucide-react';
import PhoneInputBar from "../ui/placeHolder";
import NavbarBusiness from "../ui/BusinessNavbar";


export default function PartyFormPage() {
  const [selectedRole, setSelectedRole] = useState("Customer");
  const [partyType, setPartyType] = useState("Business");
  const [activeSection, setActiveSection] = useState("Basics");
  const [phone, setPhone] = useState('');
  const roles = [
    { label: "Customer", image: "/customer.png" },
    { label: "Vendor", image: "/vendor.png" },
    { label: "Both", image: "/both.png" },
  ];

  const sidebarItems = [
    "Basics",
    "Billing Address",
    "Shipping Address",
    "Credit and Bank",
    "Party Tags",
  ];

  const countries = [
    { code: "+91", flag: "🇮🇳" },
    { code: "+1", flag: "🇺🇸" },
    { code: "+44", flag: "🇬🇧" },
  ];




 const [addresses, setAddresses] = useState([
    "42/7 Savalkar Street, Annapurna Market",
    "123 Havildar Street, opp Ordinance",
    "78/9 Gopal ghosh Lane, Baithakhana",
  ]);

const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedBank, setSelectedBank] = useState("Bank of Baroda");

  const banks = [
    {
      name: "Bank of Baroda",
      last4: "4588",
      logo: "/baroda-logo.png", // your logo image path
    },
    {
      name: "IDBI Bank",
      last4: "4588",
      logo: "/idbi-bank.png", // your logo image path
    },
  ];



  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const [isActive, setIsActive] = useState(true);
  const [isHighValue, setIsHighValue] = useState(true);

  const handleCountrySelect = (country: SetStateAction<{ code: string; flag: string; }>) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };

    function onDelete(index: number): void {
        throw new Error("Function not implemented.");
    }

    function onEdit(index: number): void {
        throw new Error("Function not implemented.");
    }

  return (
    <>
  <div className="z-10">
    <NavbarBusiness />

  </div>

  
    <div className="">
       
      <div className="pl-70">
       
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[280px] bg-white h-full  fixed   border-r pt-50  pb-6 px-4">
          <div className="flex flex-col space-y-1">
            {sidebarItems.map((item) => (
              <div
                key={item}
                onClick={() => setActiveSection(item)}
                className={clsx(
                  "flex justify-between items-center px-3 py-2 text-sm cursor-pointer",
                  activeSection === item
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                )}
              >
                {item}
                {activeSection === item && (
                  <span className="text-blue-500 ml-2">&gt;</span>
                )}
              </div>
            ))}
          </div>
        </div>










  


        
      </div>






       <div className="ml-[280px] flex-1 min-h-screen overflow-y-auto pr-12  pt-4">
       







       
  
{isModalOpen && (
  <div className="fixed inset-0 pt-4 z-100 flex items-center h-[700px] justify-center bg-black/50">
    <div className="bg-white rounded-xl w-full max-w-[620px] p-6 shadow relative">
      {/* Close Button */}
      <button
        className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 border border-[#E8E8E8] h-8 w-8 rounded-full flex items-center justify-center"
        onClick={() => setIsModalOpen(false)}
      >
        ✕
      </button>

      {/* Header */}
      <div className="flex items-center gap-2 mb-6 border-b pb-4">
        <h2 className="text-lg font-semibold text-gray-800">New Warehouse</h2>
      </div>

      {/* Form Start */}
      <div className="space-y-4">
        {/* Warehouse Name */}
        <div className="flex items-center gap-4">
          <label className="w-44 text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> Warehouse Name :
          </label>
          <input
            type="text"
            placeholder="Enter Full Name"
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Contact Person */}
        <div className="flex items-center gap-4">
          <label className="w-44 text-sm font-medium text-gray-700">Contact Person :</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Contact Number */}
        <div className="flex items-center gap-4">
          <label className="w-44 text-sm font-medium text-gray-700">Contact number :</label>
          <div className="flex-1 flex">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l bg-gray-100 text-sm">🇮🇳</span>
            <input
              type="text"
              placeholder="Enter the Party’s Contact Number"
              className="w-full border border-gray-300 rounded-r px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Address Heading */}
        <div className="pt-4 border-t mt-4">
          <h3 className="text-base font-medium text-gray-700 mb-2 mt-4">Address</h3>
        </div>

        {/* Address Line 1 */}
        <div className="flex items-center gap-4">
          <label className="w-44 text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> Address Line 1 :
          </label>
          <input
            type="text"
            placeholder="Enter the Street name"
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Address Line 2 */}
        <div className="flex items-center gap-4">
          <label className="w-44 text-sm font-medium text-gray-700">
            Address Line 2 <span className="text-xs text-gray-500">(optional)</span> :
          </label>
          <input
            type="text"
            placeholder="Enter the Street name"
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Country */}
        <div className="flex items-center gap-4">
          <label className="w-44 text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> Country :
          </label>
          <input
            type="text"
            value="India"
            readOnly
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* State */}
        <div className="flex items-center gap-4">
          <label className="w-44 text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> State :
          </label>
          <input
            type="text"
            placeholder="Select the State Name"
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* City */}
        <div className="flex items-center gap-4">
          <label className="w-44 text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> City :
          </label>
          <input
            type="text"
            placeholder="Select the City"
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* PIN Code */}
        <div className="flex items-center gap-4">
          <label className="w-44 text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> PIN Code :
          </label>
          <input
            type="text"
            placeholder="Enter the Street name"
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        <button
          className="text-sm font-medium text-gray-600 hover:text-gray-800"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(false)}
        >
          Save →
        </button>
      </div>
    </div>
  </div>
)}






 <div className="bg-white border rounded p-8 w-full max-w-[850px] ml-4 mb-8">
      {/* Main Row */}
      <div className="flex justify-between items-start mb-6">
        {/* Left side */}
        <div className="flex items-start gap-2">
          {/* Icon */}
          

          <div>
            <div className="flex items-center gap-2 mb-1">
      
              <h2 className="text-lg text-gray-800 font-medium border-l-2 border-blue-600 pl-2">
                          <HiOutlineBan className="text-gray-500 mt-1" size={20} />
                Basic Details
                 <div className="text-sm text-gray-500">
             Click to edit Address
            </div>
              </h2>
            </div>
           
          </div>
        </div>

        {/* Right side */}
        <div className="relative w-[420px] flex flex-col gap-4">
          {/* Opening Balance */}
          <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
          <label className="min-w-[140px] text-sm font-medium text-red-500">
           *Business Name :
          </label>
          <input
            type="text"
            placeholder="Eg. Duleux Enterprise"
            className="flex-1 border rounded min-w-[270px] px-3 py-2 bg-white text-sm text-gray-900"
          />
        </div>
          
           

           


          </div>

            <div className="flex items-center gap-2">
          <label className="min-w-[140px] text-sm flex font-medium text-gray-700">
           <span className="text-red-500">*</span>Business Type :
          </label>
          
          <input
            type="text"
            placeholder="Select Type of business"
            className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900"
          />
        </div>

            <div className="flex items-center gap-2 pt-8">
      <label className="min-w-[160px] text-sm font-medium text-gray-700 -ml-5">
        <span className="text-red-500">*</span> Company Contact :
      </label>

      <div className="flex min-w-[270px] items-center border border-gray-300 rounded overflow-hidden  bg-white">
        {/* Country Flag + Dropdown */}
        <div className="flex items-center px-2 bg-gray-100">
          <img
            src="/indian-flag.png"
            alt="India Flag"
            className="w-5 h-3 mr-1"
          />
          
          <svg
            className="w-3 h-3 ml-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="tel"
          placeholder="Enter Contact No"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 px-3 py-2 text-sm outline-none"
        />
      </div>
    </div>
          <div className="flex items-center gap-2">
          <label className="min-w-[140px] text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> Company Email ID
          </label>
          <input
            type="text"
            placeholder="Enter Email ID"
            className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900"
          />
        </div>



          <div className="flex items-center gap-2">
          <label className="min-w-[140px] text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> GSTIN :
          </label>
          <input
            type="text"
            placeholder="Enter the GSTIN Number"
            className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900"
          />
        </div>

          <div className="flex items-center gap-2">
          <label className="min-w-[140px] text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span>PIN Code :
          </label>
          <input
            type="text"
            placeholder="Enter the Street Code"
            className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900"
          />
        </div>

          {/* Payment Terms */}


  


          
        </div>
      </div>


     
    </div>





 <div className="bg-white border rounded p-8 w-full max-w-[850px] ml-4 mb-8">
      {/* Main Row */}
      <div className="flex justify-between items-start mb-6">
        {/* Left side */}
        <div className="flex items-start gap-2">
          {/* Icon */}
          

          <div>
            <div className="flex items-center gap-2 mb-1">
      
              <h2 className="text-lg text-gray-800 font-medium border-l-2 border-blue-600 pl-2">
                          <HiOutlineBan className="text-gray-500 mt-1" size={20} />
                Billing Address
                 <div className="text-sm text-gray-500">
             Click to edit Address
            </div>
              </h2>
            </div>
           
          </div>
        </div>

        {/* Right side */}
        <div className="relative w-[420px] flex flex-col gap-4">
          {/* Opening Balance */}
          <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
          <label className="min-w-[120px] text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> Address Line 1 :
          </label>
          <input
            type="text"
            placeholder="Enter the Street name"
            className="flex-1 border rounded min-w-[290px] px-3 py-2 bg-white text-sm text-gray-900"
          />
        </div>
          
           

           


          </div>

            <div className="flex items-center gap-2">
          <label className="min-w-[120px] text-sm flex font-medium text-gray-700">
           Address Line 2 :
          </label>
          
          <input
            type="text"
            placeholder="Enter the Street name"
            className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900"
          />
        </div>

          <div className="flex items-center gap-2">
          <label className="min-w-[120px] text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> Country
          </label>
          <input
            type="text"
            placeholder="India"
            className="flex-1 border rounded px-3 py-2 bg-white text-sm text-black"
          />

        </div>
          <div className="flex items-center gap-2">
          <label className="min-w-[120px] text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> State :
          </label>
          <input
            type="text"
            placeholder="Select the State"
            className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900"
          />
        </div>



          <div className="flex items-center gap-2">
          <label className="min-w-[120px] text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> City :
          </label>
          <input
            type="text"
            placeholder="Select the City"
            className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900"
          />
        </div>

          <div className="flex items-center gap-2">
          <label className="min-w-[120px] text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span>PIN Code :
          </label>
          <input
            type="text"
            placeholder="Enter the Street name"
            className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900"
          />
        </div>

          {/* Payment Terms */}


  


          
        </div>
      </div>


     
    </div>




    <div className="bg-white border rounded p-8 w-full max-w-[840px]  ml-6 mr-10 mb-8">
      {/* Main Row */}
      <div className="flex justify-between items-start">
        {/* Left Section */}
        <div className="flex gap-2 min-w-[200px]">
          {/* Blue vertical line */}
          <div className="w-1 bg-blue-600 rounded-sm mt-1" />

          {/* Icon & Text */}
          <div>
            <div className="flex items-center gap-2">
              <HiOutlineLocationMarker className="text-gray-500" size={20} />
              <h2 className="text-base font-medium text-gray-800">Warehouses</h2>
              <span className="text-[10px] bg-blue-100 text-blue-600 font-semibold px-[6px] py-[1px] rounded-full">
                {addresses.length}
              </span>
            </div>
            <span className="text-sm text-gray-500 mt-1 block">Click to Edit each Address</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[380px] pr-4">
          <div className="flex flex-col gap-3 mt-2">
            {addresses.map((address, index) => (
              <div key={index} className="relative">
                {/* Address Pill */}
                <div className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 bg-white shadow-sm">
                  <span className="truncate max-w-[250px]">{address}</span>
                  <FiEdit2
                    className="text-gray-500 hover:text-blue-600 cursor-pointer"
                    size={16}
                    onClick={() => onEdit(index)}
                  />
                </div>

                {/* Trash Icon outside pill */}
                <Trash2
                  className="absolute top-1/2 -right-8 -translate-y-1/2 text-red-500 hover:text-red-600 cursor-pointer"
                  size={16}
                  onClick={() => onDelete(index)}
                />
              </div>
            ))}
          </div>

          {/* Add Button */}
          <button
            className="text-blue-600 text-sm font-medium hover:underline mt-4"
            onClick={() => setIsModalOpen(true)}
          >
            + Add
          </button>
        </div>
      </div>
    </div>






 <div className=" pl-4">
    <div className="flex items-center justify-between bg-white px-6 py-5 shadow-sm max-w-[850px] h-[160px] rounded-md mb-20 ">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Vertical Blue Line */}

        
       
        <div className="h-20 w-1 bg-blue-600 rounded-sm" />

       
      
        <div className="flex items-start gap-3">
          {/* Custom Checkbox Style (Checked Circle) */}
         

          {/* Label Text */}
         
          <div>
             <HiOutlineBan className="text-gray-500 mt-1" size={20} />

            <p className="text-sm font-medium text-gray-900">Ownership</p>
            <p className="text-sm text-gray-500">Change ownership of the company</p>
          </div>
        </div>
      </div>

      {/* Center Section: User Info */}
      <div className="flex items-center gap-3 pb-20">
        <Image
          src="/Profile.png" // Place avatar.png in /public
          alt="User Avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">Puneet Mishra</p>
          <p className="text-sm text-gray-500">You</p>
        </div>
      </div>

      {/* Right Section: Action */}
      <div>
        <button className="flex items-center text-lato  text-brand hover:underline pb-25">
          <FiRepeat className="mr-1" size={14} />
          Transfer Ownership
        </button>
      </div>
    </div>
</div>





<div
  style={{ boxShadow: "0 -4px 6px -4px rgba(0, 0, 0, 0.1)" }}
  className="fixed bottom-0 px-10 py-4 border-t bg-white border-[#E8E8E8] flex justify-between items-center z-50 w-[500px] lg:w-[1000px] max-w-full overflow-x-auto"
>
      <Button variant="outline" className="text-sm px-5">
        Cancel
      </Button>
<div >
      <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 ">
        <Check size={16} className="mr-2" />
        Update Changes
      </Button>
      </div>
    </div>


        </div>
    </div>
     </>
  );
}



