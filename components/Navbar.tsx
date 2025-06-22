'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useState } from 'react'
import Image from 'next/image'
import { SidebarTrigger } from './ui/sidebar'
import { MdOutlineLocalPhone } from "react-icons/md"
import { Button } from "./ui/button"
import { NotificationIcon } from "@/assets/svgIcons/CustomIcons"
import { Company } from "@/types/party-types"
import { PartyDetailsDrawer } from "./ui/ProfileDrawer" // ✅ Make sure this is the right export
import { useGetProfile } from "@/hooks/useUser"

const initialCompany: Company = {
  companyName: "Deluxe Enterprise Pvt Ltd",
  Name: "Puneet Mishra",
}

const Navbar = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company>(initialCompany)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const {data:userData,isLoading:isUserLoading}=useGetProfile()
  const handleCompanyClick = () => {
    setDrawerOpen(true)
  }

  return (
    <div className='w-full flex justify-between border-b py-1'>
      <div className='flex items-center pl-2'>
        <SidebarTrigger />
      </div>

      <div className='flex flex-row items-center p-2 gap-4 pr-6'>
        <a
          href="https://play.google.com/store/apps/details?id=com.karosauda.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className='flex flex-row space-x-2 items-center bg-black hover:bg-black/80 px-4 py-2 rounded-sm'>
            <div className='flex flex-row items-center gap-2'>
              <Image src="/applestore.svg" alt='store-icon' width={15} height={15} />
              <Image src="/playstore.svg" alt='store-icon' width={13} height={13} />
            </div>
            <span className='text-white text-sm'>Download App</span>
          </Button>
        </a>

        <a href="tel:+916202126679">
          <Button variant="ghost" className='flex flex-row items-center gap-2'>
            <MdOutlineLocalPhone className='w-4 h-4 text-[#474747]' />
            <span className='text-base'>Contact Us</span>
          </Button>
        </a>

        <div className='p-1 border rounded-full text-[#6B6B6B]'>
          <NotificationIcon className='w-6 h-6' />
        </div>

        <div
          onClick={handleCompanyClick}
          className='flex flex-row items-center gap-2 bg-blue-50 py-1 px-4 rounded-full cursor-pointer'
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='text-sm text-[#242424]'>{userData?.selectedCompany?.companyName || "Brihat Infotech"}</span>
            <span className='text-sm text-[#6B6B6B]'>{selectedCompany.Name}</span>
          </div>
        </div>
      </div>

      {selectedCompany && (
        <PartyDetailsDrawer
          open={drawerOpen}
          onOpenChangeAction={setDrawerOpen} 
        />
      )}
    </div>
  )
}

export default Navbar
