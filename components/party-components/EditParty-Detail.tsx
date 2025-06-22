'use client';

import { SetStateAction, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import EditItemForm from "./EditNav";
import { PiUploadSimpleBold } from "react-icons/pi";
import { FaChevronDown, FaRupeeSign } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineBan } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { Check, CheckSquare, Crown } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { partyService } from "@/services/partyService";
import { useRouter, useSearchParams } from 'next/navigation';

import { useQuery } from "@tanstack/react-query";
import { useUpdateParty } from "@/hooks/useParty";



export default function PartyFormPage() {
const { mutate } = useUpdateParty();

const searchParams = useSearchParams();
const id = searchParams.get("id");
  const [selectedRole, setSelectedRole] = useState("Customer");
  const [partyType, setPartyType] = useState("Business");
  const [activeSection, setActiveSection] = useState("Basics");

const { data: partyData, isLoading } = useQuery({
  queryKey: ["party", id],
  queryFn: () => partyService.getOne(id as string),
  enabled: !!id,
});




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


const initialValues = {
  name: "",
  partyType: "BUSINESS",
  contactNumber: "",
  countryCode: "+91",
  email: "",
  gstin: "",
  pan: "",
  billing: {
    address: "",
    address2: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
  },
  shipping: [""],
};




const validationSchema = Yup.object().shape({
  name: Yup.string().required("Party name is required"),
   partyType: Yup.string().oneOf(["BUSINESS", "INDIVIDUAL"], "Party Type is required").required("Party Type is required"),
  contactNumber: Yup.string().required("Contact number is required"),
  email: Yup.string()
  .email("Invalid email address")
  .nullable()
  .notRequired(),
gstin: Yup.string()
  .matches(/^[0-9A-Z]{15}$/, {
    message: "GSTIN must be 15 characters",
    excludeEmptyString: true,
  })
  .nullable()
  .notRequired(),

  pan: Yup.string(),
  billing: Yup.object().shape({
    address: Yup.string().required("Address Line 1 is required"),
    address2: Yup.string(),
    country: Yup.string().required(),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.string().required("PIN code is required"),
  }),
  shipping: Yup.array().of(Yup.string().required("Shipping address is required")),
});



 const [addresses, setAddresses] = useState([
    "42/7 Savalkar Street, Annapurna Market",
    "123 Havildar Street, opp Ordinance",
    "78/9 Gopal ghosh Lane, Baithakhana",
  ]);

  const formik = useFormik({
  initialValues: {
    ...initialValues,
    ...partyData,
    shipping: partyData?.shipping?.length ? partyData.shipping : [""],
    billing: {
      ...initialValues.billing,
      ...partyData?.billing,
    },
  },
  validationSchema,
  enableReinitialize: true,
  onSubmit: (values) => {
    mutate(
      {
        id: partyData._id,
        data: values,
      },
      {
        onSuccess: () => {
          alert("Party updated successfully");
        },
        onError: () => {
          alert("Failed to update party");
        },
      }
    );
  },
  validateOnBlur: true,
  validateOnChange: true,
});

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
// Removed misplaced code block causing syntax error
  return (
    <>
     <form onSubmit={formik.handleSubmit} className="space-y-6 px-8 py-4">
    <div className="">
      <div className="pl-70">
        <EditItemForm />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[280px] bg-white h-screen  fixed  top-[72px] border-r pt-50  pb-6 px-4">
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










        {/* Main Content */}


          <div className="ml-[280px] flex-1 min-h-screen overflow-y-auto pr-12 -mt-[20px]">
            <div className="mb-5 pt-10">
              {/* Party Type */}
              <div className="flex items-start gap-8">
                <div className="w-[180px] pl-6">
                  <div className="text-sm text-gray-600 font-medium">Party Type</div>
                  <div className="text-xs text-gray-400">You are adding...</div>
                </div>

                <div className="flex items-center gap-4 mb-10 pl-35">
                  {roles.map((role) => (
                    <div
                      key={role.label}
                      className={clsx(
                        "border px-6 py-2 flex flex-col items-center cursor-pointer w-[160px] h-[90px] justify-center rounded",
                        selectedRole === role.label
                          ? "border-blue-600"
                          : "border-gray-300"
                      )}
                      onClick={() => setSelectedRole(role.label)}
                    >
                      <Image
                        src={role.image}
                        alt={role.label}
                        width={40}
                        height={30}
                        className="mb-1" />
                      <span className="text-sm">{role.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Basic Details */}
              <div className="bg-white border rounded p-7 mb-8 w-full max-w-[850px] ml-4 h-[600px]">
                <h2 className="text-base font-medium border-l-2 border-blue-600 pl-2 mb-4">
                  Basic Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-2">
                  {/* Left side: Upload logo */}
                  <div className="rounded h-[280px] w-[280px] flex  gap-2 justify-center items-center border-dashed border border-blue-400 bg-blue-50/5">
                    <PiUploadSimpleBold className="size-5 text-blue-400" />
                    <div className="flex gap-1 items-center">
                      <span className="text-[#6B6B6B]">Upload logo</span>
                      <span className="text-blue-600 font-medium text-base cursor-pointer">Click here</span>
                    </div>
                  </div>

                  {/* Right side: Form fields parallel layout */}
                  
                  <div className="flex flex-col space-y-4  w-[400px] pl-15">
                    {/* Party Full Name */}
                     <form onSubmit={formik.handleSubmit}>
                    <div className="flex items-center gap-4  ">
                      <label className="min-w-[150px] text-sm font-medium text-gray-700 -pl-30">
                        <span className="text-red-500 pt-1">* </span> <span className="text-red-500"> Party Full Name</span>
                      </label>
                     
    <input
  type="text"
  name="name"
  value={formik.values.name}
  onChange={(e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      formik.setFieldValue("name", value);
    }
  }}
  onBlur={formik.handleBlur}
  placeholder="Eg. John Doe"
  className="min-w-[250px] max-w-[700px] border rounded px-4 py-2 text-sm"
/>
{formik.touched.name && formik.errors.name && typeof formik.errors.name === 'string' && (
  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
)}


                    </div>

                    {/* Party Type */}
                    <div className="flex items-center gap-4 pt-2">
                      <label className="min-w-[160px] text-sm font-medium text-gray-700 ">
                        <span className="text-red-500">*</span> Party Type :
                      </label>

                      <div className="flex items-center gap-4">
  {[
    { label: "Business", value: "BUSINESS" },
    { label: "Individual", value: "INDIVIDUAL" },
  ].map(({ label, value }) => (
    <label
      key={value}
      className={clsx(
        "flex items-center gap-2 px-3 py-2 border rounded-full cursor-pointer",
        formik.values.partyType === value
          ? "border-blue-500 text-gray-900 bg-white"
          : "border-gray-300 text-gray-600 bg-gray-50"
      )}
    >
      <input
        type="radio"
        name="partyType"
        value={value}
        checked={formik.values.partyType === value}
        onChange={() => formik.setFieldValue("partyType", value)}
        className="form-radio text-blue-500 focus:ring-0 focus:ring-offset-0"
      />
      <span className="text-sm">{label}</span>
    </label>
  ))}


  {formik.touched.partyType && typeof formik.errors.partyType === 'string' && (
    <div className="text-red-500 text-xs pl-1 pt-1">
      {formik.errors.partyType}
    </div>
  )}
</div>

        

                    </div>
                    







                    {/* Contact Number */}
                    <div className="flex items-center gap-4 pt-10">
  <label className="min-w-[145px] text-sm font-medium text-gray-700">
    <span className="text-red-500">*</span> Contact Number :
  </label>

  <div className="relative flex items-center border rounded px-2 py-1 bg-white text-gray-950 flex-1">
    <div
      className="flex items-center cursor-pointer pr-2 border-r"
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <span className="mr-1 text-xl">{selectedCountry.flag}</span>
      <span className="text-sm mr-1">{selectedCountry.code}</span>
      <FaChevronDown className="text-gray-500 text-xs" />
    </div>

    <input
      type="text"
      name="contactNumber"
      value={formik.values.contactNumber}
      onChange={(e) => {
        const onlyNums = e.target.value.replace(/\D/g, '');
        formik.setFieldValue("contactNumber", onlyNums);
      }}
      placeholder="Enter party’s Contact No"
      className="min-w-[120px] text-sm text-gray-900 placeholder:text-[#B3B3B3] placeholder:text-sm focus:outline-none px-2"
    />

    {dropdownOpen && (
      <div className="absolute top-10 left-0 bg-white z-10 w-20 shadow-md border">
        {countries.map((country) => (
          <div
            key={country.code}
            className="flex items-center px-2 py-4 cursor-pointer hover:bg-gray-100"
            onClick={() => handleCountrySelect(country)}
          >
            <span className="mr-2 text-xl">{country.flag}</span>
            <span className="text-sm">{country.code}</span>
          </div>
        ))}
      </div>
    )}
  </div>
</div> 
{/* ✅ Contact Number error */}
{formik.touched.contactNumber && typeof formik.errors.contactNumber === "string" && (
  <div className="text-red-500 text-xs pl-[145px] pt-1">
    {formik.errors.contactNumber}
  </div>
)}





                    {/* Party Email ID */}
                    <div className="flex flex-col space-y-4 w-full max-w-[800px] pl-4">
                      {/* Party Email ID */}
                      <div className="flex items-center gap-4 pt-3">
                        <label className="  min-w-[110px] text-sm font-medium text-gray-700 mr-5">
                          Party Email ID :
                        </label>
                        <input
                          type="text"
                          value={formik.values.email}
                          placeholder="Enter Email ID"
                          className="min-w-[260px] border rounded px-3 py-2 bg-white text-sm text-gray-900 placeholder:text-[#B3B3B3] focus:outline-none " />
                      </div>
                    </div>


                    {/* GSTIN */}
                    <div className="flex items-center gap-4 pt-10">
                      <label className="min-w-[140px] text-sm font-medium text-gray-700">
                        GSTIN :
                      </label>
                     <input
  type="text"
  name="gstin"
  value={formik.values.gstin}
  onChange={formik.handleChange}
  placeholder="Enter Party’s GSTIN"
  className="min-w-[260px] flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900 placeholder:text-[#B3B3B3] placeholder:text-sm focus:outline-none"
/>
                    </div>

                    {/* PAN */}
                    <div className="flex items-center gap-4 pt-2">
                      <label className="min-w-[140px] text-sm font-medium text-gray-700">
                        PAN :
                      </label>
                     <input
  type="text"
  name="pan"
  value={formik.values.pan}
  onChange={formik.handleChange}
  placeholder="Enter Party’s PAN Number"
  className="flex-1 border min-w-[260px] rounded px-3 py-2 bg-white text-sm text-gray-900 placeholder:text-[#B3B3B3] placeholder:text-sm focus:outline-none"
/>
 </div>
                     </form>
                  </div>
                 
                   
                </div>
                
                
              </div>
            </div>







            {/* You can add more sections here and they will scroll! */}
          </div>
        </div>
       



    </div><div className="ml-[280px] flex-1 min-h-screen overflow-y-auto pr-12 -mt-[39px]">
        <div className="mb-5 pt-10">
          {/* Party Type */}


          {/* Basic Details */}
          <div className="bg-white border rounded p-8  w-full max-w-[850px] ml-4 h-[488px]">
            <h2 className="text-base text-gray-500 font-medium border-l-2 border-blue-600 pl-2 mb-4">
              Billing Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-70 ">
              {/* Left side: Upload logo */}


              {/* Right side: Form fields parallel layout */}
              <div className="flex flex-col space-y-4  w-[300px] pl-15  -pt-[20px]]">

                <div className="flex items-center gap-4">
                  <label className="min-w-[140px] text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span>Address Line 1 :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Email ID"
                    className="flex-1 min-w-[260px] border rounded px-3 py-2 bg-white text-sm text-gray-900 placeholder:text-[#B3B3B3] placeholder:text-sm focus:outline-none" />
                </div>

                {/* GSTIN */}
                <div className="flex items-center gap-4">
                  <label className="min-w-[140px] text-sm font-medium text-gray-700">
                    Address Line 2 : <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the Street name"
                    className="flex-1 border  min-w-[260px] rounded px-3 py-2 bg-white text-sm text-gray-900 placeholder:text-[#B3B3B3] placeholder:text-sm focus:outline-none" />
                </div>

                {/* PAN */}
                <div className="flex items-center gap-4">
                  <label className="min-w-[140px] text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> Country :
                  </label>
                  <input
                    type="text"
                    placeholder="India"
                    className="flex-1 border min-w-[260px] rounded px-3 py-2 bg-white text-sm text-gray-950 placeholder:text-gray-950 placeholder:text-sm focus:outline-none" />
                </div>

                <div className="flex items-center gap-4">
                  <label className="min-w-[140px] text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> State
                  </label>
                  <input
                    type="text"
                    placeholder="Select the State Name"
                    className="flex-1 min-w-[260px] border rounded px-3 py-2 bg-white text-sm text-gray-900 placeholder:text-[#B3B3B3] placeholder:text-sm focus:outline-none" />
                </div>

                <div className="flex items-center gap-4">
                  <label className="min-w-[140px] text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> City
                  </label>
                  <input
                    type="text"
                    placeholder="Select the City"
                    className="flex-1 border  min-w-[260px] rounded px-3 py-2 bg-white text-sm text-gray-900 placeholder:text-[#B3B3B3] placeholder:text-sm focus:outline-none" />
                </div>

                <div className="flex items-center gap-4">
                  <label className="min-w-[140px] text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> PIN code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Party’s PAN Number"
                    className="flex-1 border  min-w-[260px] rounded px-3 py-2 bg-white text-sm text-gray-900 placeholder:text-[#B3B3B3] placeholder:text-sm focus:outline-none" />
                </div>
              </div>
            </div>
          </div>









          {/* You can add more sections here and they will scroll! */}
        </div>







        <div className="bg-white border rounded p-8 w-full max-w-[840px] ml-6 mr-10 mb-8">
          {/* Main Row */}
          <div className="flex justify-between items-start">
            {/* Left side */}
            <div className="flex items-start gap-2">


              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg text-gray-800 font-medium border-l-2 border-blue-600 pl-2">
                    <HiOutlineLocationMarker className="text-gray-500 mt-1" size={20} />
                    Shipping Address
                    <div className="text-sm text-gray-500">Click to Edit each Address</div>
                  </h2>

                </div>

              </div>
            </div>

            {/* Right side */}
            <div className="relative w-[350px]   pr-8 ">
              {/* Add button absolutely positioned top right */}
              <button
                className="absolute top-0 right-15 text-blue-600 text-sm font-medium hover:underline pt-8"
                onClick={() => setIsModalOpen(true)} // <--- only this change
              >
                + Add
              </button>


              <div></div>

              {/* Address pills */}
              <div className="flex flex-col gap-3  mt-6  -ml-[120px] -mr-[-120px]">
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between min-h-[40px] border border-gray-300 rounded-full px-4 py-2 text-gray-700 text-sm cursor-pointer hover:shadow-sm transition"
                  >
                    <span>{address}</span>
                    <FiEdit2 className="text-gray-500" size={16} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg w-full max-w-[500px] p-6 relative">
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full border border-[#E8E8E8] h-8 w-8"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>

              {/* Modal title */}
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Shipping Address of Party
              </h2>

              {/* Top Row */}
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" className="border-gray-300" />
                  Same as Billing Address
                </label>
                <button className="text-red-600 text-sm font-lato flex items-center gap-1 ">
                  Delete Address
                </button>
              </div>

              {/* Address Form */}
              <div className="flex flex-col space-y-3">
                {/* Address Line 1 */}
                <div className="flex items-center gap-2">
                  <label className="min-w-[120px] text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> Address Line 1 :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the Street name"
                    className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900" />
                </div>

                {/* Address Line 2 */}
                <div className="flex items-center gap-2">
                  <label className="min-w-[120px] text-sm font-medium text-gray-700">
                    Address Line 2 <span className="text-gray-500 text-xs">(optional)</span> :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the Street name"
                    className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900" />
                </div>

                {/* Country */}
                <div className="flex items-center gap-2">
                  <label className="min-w-[120px] text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> Country :
                  </label>
                  <input
                    type="text"
                    value="India"
                    readOnly
                    className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900" />
                </div>

                {/* State */}
                <div className="flex items-center gap-2">
                  <label className="min-w-[120px] text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> State :
                  </label>
                  <input
                    type="text"
                    placeholder="Select the State Name"
                    className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900" />
                </div>

                {/* City */}
                <div className="flex items-center gap-2">
                  <label className="min-w-[120px] text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> City :
                  </label>
                  <input
                    type="text"
                    placeholder="Select the City"
                    className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900" />
                </div>

                {/* PIN Code */}
                <div className="flex items-center gap-2">
                  <label className="min-w-[120px] text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> PIN Code :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the Street name"
                    className="flex-1 border rounded px-3 py-2 bg-white text-sm text-gray-900" />
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
                  className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded hover:bg-blue-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✓ Update
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
                    Credit details & Bank
                    <div className="text-sm text-gray-500">
                      Add Party’s Bank Details for quick payment
                    </div>
                  </h2>
                </div>

              </div>
            </div>

            {/* Right side */}
            <div className="relative w-[450px] flex flex-col gap-4">
              {/* Opening Balance */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="min-w-[150px] text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> Opening Balance :
                  </label>
                  <div className="flex items-center w-full">
                    <FaRupeeSign className="text-gray-400 text-xs -mr-9" />
                    <div className="flex items-center border rounded px-3 py-2 bg-white">
                      <span className="text-sm text-gray-400 mr-1">₹</span>
                      <input
                        type="text"
                        placeholder="24000"
                        className="w-full  text-sm text-black placeholder:text-gray-950 placeholder:text-sm focus:outline-none" />
                    </div>
                  </div>
                </div>


                <button
                  className="absolute top-0 -right-7 text-blue-600 text-sm font-medium hover:underline pr-25 pt-2"
                  onClick={() => alert("Add clicked")}
                >
                  + Add
                </button>
              </div>

              {/* Payment Terms */}


              <div className="flex items-center gap-2">
                <label className="min-w-[125px] text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span> Payment Terms :
                </label>
                <div className="relative">
                  <select
                    className="border rounded px-3 py-2 min-w-[190px] text-sm text-gray-400 focus:outline-none"
                    defaultValue="Custom"
                  >
                    <option>Custom</option>
                    <option>30 Days</option>
                    <option>45 Days</option>
                  </select>
                </div>
              </div>



            </div>
          </div>

          {/* Bank Cards */}
          <div className="flex flex-col gap-3 mt-4  w-[340px] ml-80">
            {banks.map((bank) => (
              <div
                key={bank.name}
                className={`flex items-center justify-between border ${selectedBank === bank.name ? "border-blue-500" : "border-gray-200"} rounded-lg px-4 py-3 cursor-pointer hover:shadow-sm transition`}
                onClick={() => setSelectedBank(bank.name)}
              >
                <div className="flex items-center gap-4 h-[48px]">
                  {/* Radio */}
                  <div className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="bank"
                      checked={selectedBank === bank.name}
                      onChange={() => setSelectedBank(bank.name)}
                      className="form-radio text-blue-600 w-4 h-4" />
                  </div>

                  {/* Logo */}
                  <div className="border-2 border-dashed p-2 rounded w-[80px] h-[56px] flex items-center justify-center">
                    <img src={bank.logo} alt={bank.name} className="h-6 w-auto" />
                  </div>

                  {/* Bank name and last 4 digits */}
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-800 font-medium">
                      {bank.name} - {bank.last4}
                    </div>
                    {selectedBank === bank.name && (
                      <div className="text-xs text-gray-500">Default</div>
                    )}
                  </div>
                </div>

                {/* Edit icon */}
                <FiEdit2 className="text-gray-500" size={16} />
              </div>
            ))}
          </div>
        </div>











        <div className="bg-white p-6 shadow-sm max-w-[850px] ml-4 mb-30">
          <h2 className="text-lg font-medium flex items-center mb-6">
            <span className="w-0.5 h-6 bg-blue-600 mr-3 rounded-sm" />
            Party Tags
          </h2>

          {/* Active Tag */}
          <div className="flex items-start gap-3 mb-6 ml-80">
            <label className="relative flex items-start mt-1">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                className="appearance-none h-5 w-5 border-2 border-blue-600 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 flex items-center justify-center" />
              {isActive && (
                <Check
                  className="absolute left-0 top-0 text-white p-[2px]"
                  size={20} />
              )}
            </label>

            <div>
              <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                Mark Party as{" "}
                <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  ● Active
                </span>
              </p>
              <p className="text-sm text-gray-600">
                You can make Invoices, and other transactions only
                <br />
                with Active parties
              </p>
            </div>
          </div>

          {/* High Value Tag */}
          <div className="flex items-start gap-3 ml-80 mb-10">
            <label className="relative flex items-start mt-1">
              <input
                type="checkbox"
                checked={isHighValue}
                onChange={() => setIsHighValue(!isHighValue)}
                className="appearance-none h-5 w-5 border-2 border-blue-600 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 flex items-center justify-center" />
              {isHighValue && (
                <Check
                  className="absolute left-0 top-0 text-white p-[2px]"
                  size={20} />
              )}
            </label>

            <div>
              <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                Mark Party as{" "}
                <span className="text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="flex items-center justify-center gap-1 px-2 h-[20px] w-[95px] rounded-[10px] bg-[#F5A623] text-white text-[12px] font-medium">
                    <Crown className="w-3 h-3" />
                    High value
                  </span>
                </span>
              </p>
              <p className="text-sm text-gray-600">
                You will be promptly notified about any updates
                <br />
                from a “High Value” Party
              </p>
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
          <div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 ">
              <Check size={16} className="mr-2" />
              Update Changes
            </Button>
          </div>
        </div>
      </div>
   
    </form>
     </>
  );
}
