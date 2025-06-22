"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Share2, SquarePen } from "lucide-react";
import { Button } from "./button";

const NavbarBusiness = () => {
  const router = useRouter();

  const handleEditParty = () => {
    router.push("/parties/edit-party");
  };

  return (
    <div className="w-full flex justify-between border-b py-1 h-[64px]">
      <div className="flex items-center pl-2">
        <button>
          <ChevronLeft className="border-1 text-gray-500 rounded-full p-1 w-[40px] h-[40px]" />
        </button>
        <span className="ml-4">Edit Company Details</span>
      </div>

   
    </div>
  );
};

export default NavbarBusiness;
