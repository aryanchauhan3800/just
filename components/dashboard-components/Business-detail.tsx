'use client'
import React, { useState } from 'react'
import NavbarBusiness from '../ui/BusinessNavbar'
import Link from 'next/link'
import { FaBuilding } from 'react-icons/fa'
import { FaBox, FaWarehouse, FaUsers, FaUserTie } from 'react-icons/fa'
import BusinessInfoStrip from '../ui/businessInfoStrip'
import { CompanyDetailStripInfo } from '@/types/dashboardAndInvoiceTypes'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
function Businessdetail() {
  const [isVisible, setIsVisible] = useState(true)
  const [activeTab, setActiveTab] = useState<'company' | 'cash' | 'users'>('company')

const warehouses = [
  { name: 'Pratapgarh', address: '24-8 Khan Darbar , Ratu Road, Ranchi' },
  { name: 'Raigarh', address: '14/2 Rana Pratap Road , Ranchi' },
  { name: 'Zamin Zilla', address: '427 Sab Havildar Thana , Noida' },
];

  const exampleItems: CompanyDetailStripInfo[] = [
    {
      icon: FaBox,
      title: "Total Products",
      value: 1340,
      color: "border-green-500",
      growth: -8.5,
},
     {
      icon: FaWarehouse,
      title: "Total Warehouses",
      value: 15,
      color: "border-yellow-500",
      growth: -3.2,
    },
    {
      icon: FaUsers,
      title: "Total Parties",
      value: 9320,
      color: "border-purple-500",
      growth: 14.6,
    },
    {
      icon: FaUserTie,
      title: "Total Employees",
      value: 112,
      color: "border-yellow-500",
      growth: 6.9,
    },
  ]

  return (
    <>
      <NavbarBusiness />

      <div className="pt-6">
        <div className="max-w-8xl mx-auto px-4">
          {/* Gradient Banner */}
          {isVisible && (
            <div
              className="relative flex justify-between items-center px-5 py-4 rounded-lg"
              style={{
                background:
                  'linear-gradient(95.3deg, #F4C99F 2.39%, #F1AA80 17.88%, #EE8160 40.42%, #EB9F90 59.2%, #F065D1 75.16%, #C76CE2 87.84%, #8F7AE2 100.05%)',
              }}
            >
              {/* Left Section */}
              <div className="flex flex-col gap-2 text-white max-w-sm">
                <span className="text-sm font-semibold">Karosauda</span>
                <h1 className="text-3xl font-bold">Online Store</h1>
                <p className="text-sm">
                  Now Sell your products at your very own Online Store
                </p>
                <button className="mt-4 ml-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-1 rounded-full flex items-center gap-2 text-sm w-fit">
                  Set up <span className="text-lg">›</span>
                </button>
              </div>

              {/* Right Section Image */}
              <div className="hidden md:block pr-28 pt-4">
                <img
                  src="/Profile-banner-shop.png"
                  alt="Banner illustration"
                  width={186}
                  height={28}
                  loading="eager"
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
          )}

          {/* Company Card */}
          <div className="mt-6 rounded-lg overflow-hidden shadow-sm bg-white font-sans w-full">
            {/* Header Image */}
            <div
              className="h-30 bg-cover bg-no-repeat bg-right-top"
              style={{
                backgroundImage: 'url("/businessBg.png")',
              }}
            />

            <div className="flex items-center justify-between px-6 py-5">
              {/* Left Info */}
              <div>
                <div className='w-15 -mt-[50px]'>
                  <div className="bg-gray-200 p-4 rounded-md">
                    <FaBuilding className="text-gray-500" size={24} />
                  </div>
                </div>
                <div className="text-lg font-lato text-gray-900 pt-4">
                  Deluxe Enterprises Pvt Ltd
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                  <span>B2B Wholesale Business</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">
                    Created in - <span className="font-lato">12 Apr, 2024</span>
                  </span>
                </div>
              </div>

              {/* Reports Link */}
              <div>
                <Link href="#">
                  <span className="text-[16px] text-zinc cursor-pointer">
                    View Reports ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Panels */}
      <div className='p-4'>
        <div className="bg-white p-4 rounded-md shadow-sm">
          {/* Tabs */}
          <div className="border-b flex space-x-6 text-sm font-medium text-gray-700">
            <button
              className={`pb-2 ${activeTab === 'company' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
              onClick={() => setActiveTab('company')}
            >
              Company Details
            </button>
            <button
              className={`pb-2 ${activeTab === 'cash' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
              onClick={() => setActiveTab('cash')}
            >
              Cash & Banks
            </button>
            <button
              className={`pb-2 ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              User & Roles
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'company' && (
              <>
                <BusinessInfoStrip items={exampleItems} />

                {/* Business Contact Card */}
                
     
    <div className="p-4 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        {/* LEFT Column: Wider */}
        <div className="space-y-4">
          {/* Business Contact */}
          <div className="bg-white border rounded-lg shadow-sm p-4 w-full">
            <div className="text-sm font-medium text-gray-800 mb-4">Business Contact</div>
            <div className="border-t mb-3" />
            <div className="flex flex-wrap gap-y-4">
              <div className="flex items-center gap-2 flex-grow basis-[60%] min-w-[250px] p-4">
                <Phone size={13} className="text-gray-400 -mt-[30px]" />
                <div >
                  <div className="text-xs text-gray-400 pb-2">Business Contact</div>
                  <a href="tel:+918955898589" className="text-sm text-blue-600 font-medium ">
                    +91 8955898589
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 basis-[40%] min-w-[200px]">
                <Mail size={13} className="text-gray-400 -mt-[31px]" />
                <div>
                  <div className="text-xs text-gray-400 pb-2">Business Email</div>
                  
                  <a href="mailto:singharchana07@gmail.com" className="text-sm text-blue-600 font-medium  ">
                    singharchana07@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
        <div className="bg-white border rounded-lg shadow-sm">
  {/* Header */}
  <div className="flex justify-between items-center px-4 pt-3">
    <div className="text-sm font-medium text-gray-800">Billing Address</div>
    <span className="text-gray-400 cursor-pointer">
      ✎
    </span>
  </div>

  {/* Divider */}
  <div className="border-t border-gray-200 mt-2 mb-4" />

  {/* Address Details Grid */}
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
    {/* Full-width row for City */}
    <div className="col-span-3">
      <div className="text-xs text-gray-500">City</div>
      New Delhi
    </div>
  </div>
</div>



          {/* Warehouses */}
        <div className="bg-white border rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-medium text-gray-800">Warehouse(s)</div>
        <a className="text-sm text-blue-600 font-medium cursor-pointer">+ New Warehouse</a>
      </div>

      <div className="space-y-2">
        {warehouses.map((wh, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-md border px-4 py-3 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 rounded-md p-2">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-2 font-medium text-gray-800">
                  {wh.name}
                  <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                    240
                  </span>
                  <span className="text-xs font-normal text-gray-400">items</span>
                </div>
                <div className="text-xs text-gray-500">{wh.address}</div>
              </div>
            </div>
            <div className="text-gray-400 text-xl">›</div>
          </div>
        ))}
      </div>
    </div>
        </div>

        {/* RIGHT Column: Narrower */}
        <div className="space-y-4">
          {/* Business Credentials */}
        <div className="space-y-4">
  {/* Business Credentials */}
  <div className="bg-white border rounded-lg shadow-sm ">
    <div className="text-sm font-medium text-gray-800 mb-2 m-4">Business Credentials</div>
    <div className="border-t mb-3" />
    <div className="space-y-3 text-sm text-gray-800  p-4">
      <div>
        <div className="text-xs text-gray-400">Owner</div>
        <div className="flex justify-between items-center -pt-[-50px]">
          <div className="flex items-center space-x-2b pt-2">
            <img
              src="https://avatars.githubusercontent.com/u/1?v=4" // Replace with avatar image URL
              alt="Owner Avatar"
              className="w-8 h-8 rounded-full "
            />
            <span className='pl-2'>Puneet Mishra</span>
          </div>
          <a className="text-brand font-lato text-[16px] cursor-pointer">View Profile</a>
        </div>
      </div>
      <div className='pt-2'>
        <div className="text-xs text-gray-400">GSTIN</div>
        <div className='pt-2'>86565825421541</div>
      </div>
      <div className='pt-2'>
        <div className="text-xs text-gray-400">PAN</div>
        <div className='pt-1'>47854AADR5</div>
      </div>
      <div className='pt-2'>
        <div className="text-xs text-gray-400">Business Type</div>
        <div className='pt-2'>Wholesale Business</div>
      </div>
    </div>
  </div>
</div>


          {/* Financial Year */}
          <div className="bg-white border rounded-lg shadow-sm ">
            <div className="text-sm font-medium text-gray-800 mb-2 pt-4 pl-4">Financial Year</div>
             <div className="border-t mb-3" />
            <div className="flex items-center justify-between p-2">
              <div>
                <div className="text-xs text-gray-400">Active Financial Year</div>
                <div className="text-sm text-gray-800 mt-1">2023-2024</div>
              </div>
              <a className="text-sm text-blue-600 font-medium cursor-pointer">Close Financial Year</a>
            </div>
          </div>
        </div>
      </div>
    </div>
              </>
            )}

            {activeTab === 'cash' && (
               <><BusinessInfoStrip items={exampleItems}/>
               <div className="  p-8 flex  flex-col items-center justify-center text-center ">
                <div className="flex flex-col items-center space-y-2 pt-50 h-[400px]">
                  {/* Icon */}
                  <div className="bg-blue-50 p-3 rounded-full">
                    <img
                      src="https://www.svgrepo.com/show/448227/bank.svg" // Replace with your bank icon
                      alt="Bank Icon"
                      className="w-8 h-8" />
                  </div>

                  {/* Text */}
                  <p className="text-sm text-gray-700 font-medium">No Banks Added</p>

                  {/* Link */}
                  <a href="#" className="text-sm text-blue-600 font-medium hover:underline">
                    + Link Bank Account
                  </a>
                </div>
              </div></>
            )}

            {activeTab === 'users' && (
              <div className="text-gray-700 text-sm">
                
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Businessdetail
