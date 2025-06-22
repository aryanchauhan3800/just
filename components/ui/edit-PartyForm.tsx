import React, { useState } from 'react'
import RoleCard from './roleCard';

function EditPartyForm1() {
  const [selectedRole, setSelectedRole] = useState<"Customer" | "Vendor" | "Both">("Customer");
   

  return (
    <div className="flex flex-col ">
			{/* heading and switch option */}
			<div className="space-y-5 border-b">
				<h2 className="text-2xl text-[#474747] font-medium">
					You are adding a...
				</h2>
				<div className="flex w-full mb-4 gap-3 items-center text-lato ]">
  <RoleCard
        label="Customer"
        imgSrc="/customer.png" // replace with your customer image path
        
      />

	  <RoleCard
		label="Vendor"
		imgSrc="/vendor.png" // replace with your vendor image path
		selected={selectedRole === "Vendor"}
		onClick={() => setSelectedRole("Vendor")}
	  />
  <RoleCard
		label="Both"
		imgSrc="/Both.png" // replace with your vendor image path
		selected={selectedRole === "Both"}
		onClick={() => setSelectedRole("Both")}
	  />
			</div>
			</div>
          </div>
  )
}

export default EditPartyForm1