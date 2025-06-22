"use client";


import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Settings, Share2, SquarePen } from "lucide-react";
import { Button } from "../ui/button";

const NavbarBusiness = () => {
const router = useRouter();

const handleEditParty = () => {
router.push("/dashboard/edit-self-detail");
  };

  return (
    <div className="w-full flex justify-between border-b py-1 h-[64px]">
      <div className="flex items-center pl-2">
       
        <button>
          <ChevronLeft className="border-1 text-gray-500 rounded-full p-1 w-[40px] h-[40px]" />
        </button>
        <span className="ml-4">Peronal Details</span>
      </div>

      <div className="flex flex-row items-center p-2 gap-4 pr-6">
        <div className="flex flex-row items-center gap-2">
          <span>
           <Settings/>
          </span>
          <span className="text-base">Setting </span>
        </div>

        <div className="flex flex-row justify-between items-center">
          <Button
            className="bg-[#025AE0] border rounded-[4px]"
            onClick={handleEditParty}
          >
            <span className="text-xl">
              <SquarePen />
            </span>
            Edit Details
          </Button>
        </div>
         <div className="border-1 rounded-full  p-1">
            hellow
        </div>
      </div>
    </div>
  );
};

export default NavbarBusiness;
