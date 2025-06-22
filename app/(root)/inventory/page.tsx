import { buttonVariants } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { PiUploadSimpleBold } from "react-icons/pi";
import InventoryTable from "@/components/inventory/InventoryTable";
import Link from "next/link";
import { Metadata } from "next";
import InventoryInfoCard from "@/components/inventory/InventoryInfoCard";

export const metadata: Metadata = {
  title: "Karosauda - Inventory",
  description: "Manage your inventory",
};




const Page = () => {

  return (
    <div className="flex-1 h-full space-y-5">

      {/* heading and info cards */}
      <div className="flex-1 flex flex-col h-[200px] bg-white m-5 rounded p-5">


        {/* heading with btns */}
        <div className="flex justify-between h-10 items-center">

          <h2 className="text-2xl font-medium text-[#474747]">
            Inventory
          </h2>

          <div className="flex gap-x-4 items-center">

            <Link
              href={"/inventory/bulk-import"}
              className={buttonVariants({ variant: "outline" })}>
              <PiUploadSimpleBold className="size-4" /> Bulk
              Upload
            </Link>

            <Link
              href={"/inventory/create-item"}
              className={buttonVariants()} >
              <FaPlus className="size-4" /> New Item
            </Link>

          </div>

        </div>


        {/* Inventory cards */}
        <InventoryInfoCard />

      </div>


      {/* table */}
      <InventoryTable />


    </div>
  );
};

export default Page;
