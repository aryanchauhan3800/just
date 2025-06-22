'use client';

import { Check, ChevronLeft, ChevronRight, Plus, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import React, { useState, FC } from 'react';
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { PiUploadSimpleBold } from "react-icons/pi";
import { Textarea } from "../ui/textarea";
import RoleCard from "../ui/roleCard";
import PartyTypeSwitch from "../ui/partySwitch";
import PhoneInputBar from "../ui/placeHolder";
import { CustomModal } from "./SuccessPopUp";
import CreditBankDetails from "../ui/party-Bankdetails";
import PartyTagSection from "../ui/partyTagSection";

interface AddFormProps {}

const Addform: FC<AddFormProps> = ({}) => {
	const [partyType, setPartyType] = useState<"Customer" | "Vendor" | "Both">("Customer");
	const [openScuccess, setOpenSuccess] = useState(false);
	const [position, setPosition] = useState<number>(1);
	const [dontShowAgain, setDontShowAgain] = useState(false);

	const router = useRouter();

	const maxItemPosition = 5;
	const maxServicePosition = 3;

	const moveForward = () => {
		if (partyType === 'Customer') {
			if (position < maxItemPosition) {
				setPosition((prev) => prev + 1);
			}
		} else {
			if (position < maxServicePosition) {
				setPosition((prev) => prev + 1);
			}
		}
	};

	const moveBackward = () => {
		if (position > 1) {
			setPosition((prev) => prev - 1);
		}
	};

	const toggleItemType = () => {
		setPartyType((prev) => {
			if (prev === "Customer") {
				return "Customer";
			} else if (prev === "Vendor") {
				return "Vendor";
			} else {
				return "Both";
			}
		});
	};

	return (
		<div className="min-h-screen flex flex-col bg-brand/[2%]">

			{/* Header */}
			<div className="max-h-[66px] flex px-7 items-center justify-between sticky top-0 z-40 py-2 bg-white border-b border-[#E8E8E8]">
				<Button
					variant={"outline"}
					size={"icon"}
					disabled={position === 1}
					className="rounded-full"
					onClick={moveBackward}
				>
					<ChevronLeft className="size-5" />
				</Button>

				<div className="flex flex-1 max-w-[70%] flex-col space-y-2">
					<div className="flex flex-1 justify-between items-center">
						<span className="text-[#474747] capitalize">
							Add New {partyType}
						</span>
						<span className="text-[#242424]">
							{position} /{" "}
							{partyType === "Customer"
								? maxItemPosition
								: maxServicePosition}
						</span>
					</div>
					<div className="flex h-5 gap-x-5 flex-1 justify-between items-center">
						{Array.from(
							{
								length:
									partyType === "Customer"
										? maxItemPosition
										: maxServicePosition,
							},
							(_, i) => i + 1
						).map((pos) => (
							<span
								key={pos}
								className={`h-2 rounded-full flex-1 transition-colors duration-300 ${
									pos <= position
										? "bg-brand"
										: "bg-[#E8E8E8]"
								}`}
							/>
						))}
					</div>
				</div>

				<Button
					variant={"outline"}
					size={"icon"}
					className="rounded-full"
					onClick={() => router.push("/parties")}
				>
					<X className="size-5 text-[#8F8F8F]" />
				</Button>
			</div>

			{/* Scrollable Content */}
			<div className="flex-1 overflow-y-auto">
				<div className="flex-1 min-h-[400px] max-w-[717px] min-w-[717px] mx-auto py-5">
					{position === 1 && (
						<BasicDetailsComponent
							itemType={partyType}
							toggleItemType={toggleItemType}
						/>
					)}
					{position === 2 && (
                        <BasicDetailsComponent3
							itemType={partyType}
							toggleItemType={toggleItemType}
						/>

						
					)}
                    {position === 3 && (
                        <BasicDetailsComponent4
							itemType={partyType}
							toggleItemType={toggleItemType}
						/>
                        
						
					)}
                     {position === 4 && (
                     <CreditBankDetails
                            itemType={partyType}
                            toggleItemType={toggleItemType}
                        />
                        
						
					)}
                       {position === 5 && (
                     <PartyTagSection
                         
                        />
                        
						
					)}
				</div>
			</div>

			{/* Footer (Fixed at Bottom) */}
			<div
				style={{ boxShadow: "0 -4px 6px -4px rgba(0, 0, 0, 0.1)" }}
				className="px-10 py-4 border-t bg-white border-[#E8E8E8] flex justify-between items-center"
			>
				{position === 1 ? (
					<Button variant={"outline"} onClick={() => router.push("/inventory")}>
						Cancel
					</Button>
				) : (
					<Button variant={"outline"} onClick={moveBackward}>
						<ChevronLeft /> Back
					</Button>
				)}

				{(partyType === "Customer" && position < maxItemPosition) ||
				(partyType !== "Customer" && position < maxServicePosition) ? (
					<Button onClick={moveForward}>
						Next <ChevronRight />
					</Button>
				) : (
					<div>
						<Button onClick={() => setOpenSuccess(true)}>Save</Button>

						<CustomModal
							open={openScuccess}
							message="Item added successfully"
							showAgain={dontShowAgain}
							setShowAgainAction={setDontShowAgain}
							onClose={() => {
								router.push("/inventory");
							}}
							setOpenAction={() => {}}
						/>
					</div>
				)}
			</div>

		</div>
	);
};




const BasicDetailsComponent: FC<{
	itemType: "Customer" | "Vendor" | "Both";
	toggleItemType: () => void;
}> = ({ itemType, toggleItemType }) => {
	const [addVendor, setAddVendor] = useState<boolean>(false);
	const [isKnowVendor, setIsKnowVendor] = useState<boolean>(true);
	const [selectedUnit, setSelectedUnit] = useState<string>("");
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
        selected={selectedRole === "Customer"}
        onClick={() => setSelectedRole("Customer")}
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
			<div className="flex flex-col gap-y-5 ml-2  text-sm">
				{/* image uploads */}
				<div className="flex flex-col">
					
					{/* images */}
					<div className="gap-1 ">
                        
						{/* square image */}
                        <div className="pt-8 flex">


                        </div>
						
						{/* two long images */}
                        		<div className="flex-1    w-[600px] ">
							   <div className="flex flex-1 ">
					<span className="text-sm min-w-40 capitalize">
						Party logo :
					</span>
					<div className="flex-1    w-[500px] ">
								<div className=" rounded h-[100px] flex flex-col gap-2 justify-center items-center border-dashed border border-brand bg-brand/5">
									<PiUploadSimpleBold className="size-5 text-brand" />
									<div className="flex gap-1 items-center">
										<span className="text-[#6B6B6B]">
										Drag & Drop file here or
										</span>
										<span className="text-brand font-medium text-base">
											Click here
										</span>
									</div>
								</div>
							</div>
				</div>
							</div>
			
					</div>
				</div>
				{/* item name */}
				<div className="flex flex-1 pl-3">
					<span className="text-danger min-w-40 capitalize">
						* Party Full Name
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3]"
						placeholder={
							itemType === "Customer"
								? "Eg. John Doe"
								: "Eg. John Doe"
						}
					/>
				</div>


                <PartyTypeSwitch/>
             
				{/* item description */}
			<div className="flex flex-1 items-center space-x-4 py-4">
    <label className="text-gray-950 min-w-40 capitalize" htmlFor="contactNumber">
       <span  className="text-red-500 mt-15">*</span> Contact number:
    </label>
    <div className="w-[800px] ">
<PhoneInputBar/>
    </div>
   
</div>

                <div className="flex flex-1 pl-3" >
					<span className="text-gray-950 min-w-40 capitalize">
						Party Email ID :
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3]"
						placeholder={
							itemType === "Customer"
								? "Enter the Company’s Email ID"
								: "Enter the Company’s Email ID"
						}
					/>
				</div>
                <div className="flex flex-1 pt-10 pl-3">
					<span className="text-gray-950 min-w-40 capitalize">
						GSTIN:
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3]"
						placeholder={
							itemType === `${selectedRole}`
								? "Enter Party’s GST Number"
								: "Enter Party’s GST Number"
						}
					/>
				</div>
                <div className="flex flex-1 pl-3">
					<span className="text-gray-950 min-w-40 capitalize">
						PAN :
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3]"
						placeholder={
							itemType === "Customer"
								? "Enter Party’s PAN Number"
								: "Enter Party’s PAN Number"
						}
					/>
				</div>


                
				{/* vendor */}
				{itemType === "Vendor" && (
					<div className="flex flex-1">
						<span className="min-w-40">
							<span className="text-danger">*</span> Vendor
						</span>
						<div className="space-y-2 flex-1">
							<div className="flex-1 items-center flex gap-x-4">
								<Select>
									<SelectTrigger className="w-1/2 bg-white placeholder:text-[#B3B3B3]">
										<SelectValue placeholder="Select vendor" />
									</SelectTrigger>
									<SelectContent>
										{["ram", "shyam", "bhole", "chole"].map(
											(option, i) => (
												<SelectItem
													key={i}
													value={option}
												>
													{option}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<Button
									onClick={() => setAddVendor(true)}
									variant={"outline"}
									size={"icon"}
								>
									<Plus className="size-5 text-brand" />
								</Button>
							</div>
							<div className="flex items-center gap-x-2">
								<span
									onClick={() =>
										setIsKnowVendor((prev) => !prev)
									}
									className={`size-4 mt-1 border-brand border rounded-xs ${
										!isKnowVendor ? "bg-brand" : "bg-white"
									}`}
								>
									<Check className="size-4 text-white pr-[2px]" />
								</span>
								<span className="text-[#242424]">
									I don't remember the Vendor
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
			{/* unit */}
			
			
			{/* hsn/sac code */}
			
		
		</div>
	);
};




const BasicDetailsComponent2: FC<{
	itemType: "Customer" | "Vendor" | "Both";
	toggleItemType: () => void;
}> = ({ itemType, toggleItemType }) => {
	const [addVendor, setAddVendor] = useState<boolean>(false);
	const [isKnowVendor, setIsKnowVendor] = useState<boolean>(true);
	const [selectedUnit, setSelectedUnit] = useState<string>("");
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
        selected={selectedRole === "Customer"}
        onClick={() => setSelectedRole("Customer")}
      />

	  <RoleCard
		label="Vendor"
		imgSrc="/customer.png" // replace with your vendor image path
		selected={selectedRole === "Vendor"}
		onClick={() => setSelectedRole("Vendor")}
	  />
  <RoleCard
		label="Vendor"
		imgSrc="/customer.png" // replace with your vendor image path
		selected={selectedRole === "Both"}
		onClick={() => setSelectedRole("Both")}
	  />
			</div>
			</div>
			<div className="flex flex-col gap-y-5 ml-2  text-sm">
				{/* image uploads */}
				<div className="flex flex-col">
					
					{/* images */}
					<div className="gap-1 ">
                        
						{/* square image */}
                        <div className="pt-8 flex">


                        </div>
						
						{/* two long images */}
                        		<div className="flex-1    w-[600px] ">
							   <div className="flex flex-1 ">
					<span className="text-sm min-w-40 capitalize">
						Party logo :
					</span>
					<div className="flex-1    w-[500px] ">
								<div className=" rounded h-[100px] flex flex-col gap-2 justify-center items-center border-dashed border border-brand bg-brand/5">
									<PiUploadSimpleBold className="size-5 text-brand" />
									<div className="flex gap-1 items-center">
										<span className="text-[#6B6B6B]">
										Drag & Drop file here or
										</span>
										<span className="text-brand font-medium text-base">
											Click here
										</span>
									</div>
								</div>
							</div>
				</div>
							</div>
			
					</div>
				</div>
				{/* item name */}
				<div className="flex flex-1 pl-3">
					<span className="text-danger min-w-40 capitalize">
						* {itemType} Name
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3]"
						placeholder={
							itemType === "Customer"
								? "Eg. Britannia Marie"
								: "Eg. computer Repair & Maintenance"
						}
					/>
				</div>


                <PartyTypeSwitch/>
             
				{/* item description */}
			<div className="flex flex-1 items-center space-x-4 py-4">
    <label className="text-gray-950 min-w-40 capitalize" htmlFor="contactNumber">
        Contact number:
    </label>
    <div className="w-[800px] ">
<PhoneInputBar/>
    </div>
   
</div>

                <div className="flex flex-1 pl-3" >
					<span className="text-gray-950 min-w-40 capitalize">
						Party Email ID :
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3]"
						placeholder={
							itemType === "Customer"
								? "Enter the Company’s Email ID"
								: "Enter the Company’s Email ID"
						}
					/>
				</div>
                <div className="flex flex-1 pt-10 pl-3">
					<span className="text-gray-950 min-w-40 capitalize">
						GSTIN:
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3]"
						placeholder={
							itemType === `${selectedRole}`
								? "Enter Party’s PAN Number"
								: "Enter Party’s PAN Number"
						}
					/>
				</div>
                <div className="flex flex-1 pl-3">
					<span className="text-gray-950 min-w-40 capitalize">
						PAN :
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3]"
						placeholder={
							itemType === "Customer"
								? "Eg. Britannia Marie"
								: "Eg. computer Repair & Maintenance"
						}
					/>
				</div>


                
				{/* vendor */}
				{itemType === "Vendor" && (
					<div className="flex flex-1">
						<span className="min-w-40">
							<span className="text-danger">*</span> Vendor
						</span>
						<div className="space-y-2 flex-1">
							<div className="flex-1 items-center flex gap-x-4">
								<Select>
									<SelectTrigger className="w-1/2 bg-white placeholder:text-[#B3B3B3]">
										<SelectValue placeholder="Select vendor" />
									</SelectTrigger>
									<SelectContent>
										{["ram", "shyam", "bhole", "chole"].map(
											(option, i) => (
												<SelectItem
													key={i}
													value={option}
												>
													{option}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<Button
									onClick={() => setAddVendor(true)}
									variant={"outline"}
									size={"icon"}
								>
									<Plus className="size-5 text-brand" />
								</Button>
							</div>
							<div className="flex items-center gap-x-2">
								<span
									onClick={() =>
										setIsKnowVendor((prev) => !prev)
									}
									className={`size-4 mt-1 border-brand border rounded-xs ${
										!isKnowVendor ? "bg-brand" : "bg-white"
									}`}
								>
									<Check className="size-4 text-white pr-[2px]" />
								</span>
								<span className="text-[#242424]">
									I don't remember the Vendor
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
			{/* unit */}
			
			
			{/* hsn/sac code */}
			
		
		</div>
	);
};






const BasicDetailsComponent3: FC<{
	itemType: "Customer" | "Vendor" | "Both";
	toggleItemType: () => void;
}> = ({ itemType, toggleItemType }) => {
	const [addVendor, setAddVendor] = useState<boolean>(false);
	const [isKnowVendor, setIsKnowVendor] = useState<boolean>(true);
	const [selectedUnit, setSelectedUnit] = useState<string>("");
	const [selectedRole, setSelectedRole] = useState<"Customer" | "Vendor" | "Both">("Customer");

	return (
		<div className="flex flex-col ">
			{/* heading and switch option */}
			<div className="space-y-5 ">
				<h2 className="text-2xl text-[#474747] font-medium">
					Enter the Billing Address of the party
				</h2>
				<div className="flex w-full mb-4 gap-3 items-center text-lato ]">

			</div>
			</div>
			<div className="flex flex-col gap-y-5 ml-2  text-sm">
				{/* image uploads */}
				<div className="flex flex-col">
					
					{/* images */}
					<div className="gap-1 ">
                        
						{/* square image */}
                        
						
						{/* two long images */}
                        		<div className="flex-1    w-[600px] ">
							   <div className="flex flex-1 ">
					
					<div className="flex-1    w-[500px] ">
								
							</div>
				</div>
							</div>
			
					</div>
				</div>
				


              
             

	

                <div className="flex flex-1 pl-3" >
					<span className="text-gray-950 min-w-40 capitalize">
				<span className="text-red-500">*</span>		Address Line 1 :
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3] rounded "
						placeholder={
							itemType === "Customer"
								? "Enter the Company’s Email ID"
								: "Enter the Company’s Email ID"
						}
					/>
				</div>

                 <div className="flex flex-1 pl-3" >
					<span className="text-gray-950 min-w-40 capitalize">
						Address Line 2 :
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3] rounded "
						placeholder={
							itemType === "Customer"
								? "Enter the Company’s Email ID"
								: "Enter the Company’s Email ID"
						}
					/>
				</div>
                <div className="flex flex-1 pt-10 pl-3">
					<span className="text-gray-950 min-w-40 capitalize">
					<span className="text-red-500">*</span>	Country :
					</span>
					<Input
						className="bg-white placeholder:text-gray-950 rounded"
						placeholder={
							itemType === `${selectedRole}`
								? "India"
								: "India"
						}
					/>
				</div>
                <div className="flex flex-1 pl-3">
					<span className="text-gray-950 min-w-40 capitalize">
						<span className="text-red-700">* </span>
                           State :  
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3] rounded"
						placeholder={
							itemType === "Customer"
								? "Select the State Name"
								: "Select the State Name"
						}
					/>
				</div>

                 <div className="flex flex-1 pl-3">
					<span className="text-gray-950 min-w-40 capitalize">
						<span className="text-red-700">* </span>
                          City : 
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3] rounded"
						placeholder={
							itemType === "Customer"
								? "Select the City"
								: "Select the City"
						}
					/>
				</div>

                 <div className="flex flex-1 pl-3">
					<span className="text-gray-950 min-w-40 capitalize">
						<span className="text-red-700">* </span>
                         Pincode
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3] rounded"
						placeholder={
							itemType === "Customer"
								? "Enter the Street name"
								: "Enter the Street name"
						}
					/>
				</div>


                
				{/* vendor */}
				{itemType === "Vendor" && (
					<div className="flex flex-1">
						<span className="min-w-40">
							<span className="text-danger">*</span> Vendor
						</span>
						<div className="space-y-2 flex-1">
							<div className="flex-1 items-center flex gap-x-4">
								<Select>
									<SelectTrigger className="w-1/2 bg-white placeholder:text-[#B3B3B3]">
										<SelectValue placeholder="Select vendor" />
									</SelectTrigger>
									<SelectContent>
										{["ram", "shyam", "bhole", "chole"].map(
											(option, i) => (
												<SelectItem
													key={i}
													value={option}
												>
													{option}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<Button
									onClick={() => setAddVendor(true)}
									variant={"outline"}
									size={"icon"}
								>
									<Plus className="size-5 text-brand" />
								</Button>
							</div>
							<div className="flex items-center gap-x-2">
								<span
									onClick={() =>
										setIsKnowVendor((prev) => !prev)
									}
									className={`size-4 mt-1 border-brand border rounded-xs ${
										!isKnowVendor ? "bg-brand" : "bg-white"
									}`}
								>
									<Check className="size-4 text-white pr-[2px]" />
								</span>
								<span className="text-[#242424]">
									I don't remember the Vendor
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
			{/* unit */}
			
			
			{/* hsn/sac code */}
			
		
		</div>
	);
};






const BasicDetailsComponent4: FC<{
	itemType: "Customer" | "Vendor" | "Both";
	toggleItemType: () => void;
}> = ({ itemType, toggleItemType }) => {

  const [addVendor, setAddVendor] = useState(false);
  const [isKnowVendor, setIsKnowVendor] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'Customer' | 'Vendor' | 'Both'>('Customer');

  return (
    <div className="flex flex-col px-8 py-4 gap-6  rounded-md">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[#333]">Enter Shipping Address</h2>
          <p className="text-sm text-[#999]">You can skip it for now</p>
        </div>
        <button className="text-sm text-blue-600 font-medium">Skip for Now</button>
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-2 ">
        <span
          onClick={() => setIsKnowVendor(!isKnowVendor)}
          className={`size-5 border rounded flex items-center justify-center cursor-pointer border-brand  ${
            isKnowVendor ? 'bg-white border-brand' : 'bg-blue-600'
          }`}
        >
          {!isKnowVendor && <Check className="text-white w-4 h-4" />}
        </span>
        <label className="text-sm font-medium text-gray-900">Same as Billing Address</label>
      </div>

      {/* Address fields */}
      <div className="space-y-4 w-full max-w-2xl">
           <div className="flex flex-1 ">
					<span className="text-gray-950 min-w-40 capitalize">
						<span className="text-red-700">* </span>
                          Address Line 1 :
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3] rounded"
						placeholder={
							itemType === "Customer"
								? "Enter The Street Name"
								: "Enter The Street Name"
						}
					/>
				</div>

           <div className="flex flex-1 ">
					<span className="text-gray-950 min-w-40 capitalize">
					
                          Address Line 2: <span className="text-gray-400 text-sm">(optional)</span>
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3] rounded"
						placeholder={
							itemType === "Customer"
								? "Enter The Street Name"
								: "Enter The Street Name"
						}
					/>
				</div>

         <div className="flex flex-1 ">
					<span className="text-gray-950 min-w-40 capitalize">
					<span className="text-red-700">* </span>
                          Country : 
					</span>
					<Input
						className="bg-white placeholder:text-gray-950 rounded"
						placeholder={
							itemType === "Customer"
								? "India"
								: "India"
						}
					/>
				</div>


                    <div className="flex flex-1 ">
					<span className="text-gray-950 min-w-40 capitalize">
					<span className="text-red-700">* </span>
                        State : 
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3] rounded"
						placeholder={
							itemType === "Customer"
								? "Enter The Street Name"
								: "Enter The Street Name"
						}
					/>
				</div>

        
   <div className="flex flex-1 ">
					<span className="text-gray-950 min-w-40 capitalize">
					<span className="text-red-700">* </span>
                        City : 
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3] rounded"
						placeholder={
							itemType === "Customer"
								? "Enter The City"
								: "Enter The City"
						}
					/>
				</div>



                 <div className="flex flex-1 ">
					<span className="text-gray-950 min-w-40 capitalize">
					<span className="text-red-700">* </span>
                        Pincode : 
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3] rounded"
						placeholder={
							itemType === "Customer"
								? "PIN Code"
								: "PIN Code"
						}
					/>
				</div>

      </div>

      {/* Vendor dropdown if applicable */}
      {itemType === 'Vendor' && (
        <div className="space-y-2 w-full max-w-2xl">
          <div className="flex items-center gap-4">
            <label className="min-w-[100px] font-medium text-sm">
              <span className="text-red-500 mr-1">*</span>Vendor:
            </label>
            <Select>
              <SelectTrigger className="w-1/2 bg-white">
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                {['ram', 'shyam', 'bhole', 'chole'].map((vendor, i) => (
                  <SelectItem value={vendor} key={i}>
                    {vendor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setAddVendor(true)} variant="outline" size="icon">
              <Plus className="text-brand w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span
              onClick={() => setIsKnowVendor((prev) => !prev)}
              className={`size-4 mt-1 border border-brand rounded-sm cursor-pointer flex items-center justify-center ${
                !isKnowVendor ? 'bg-brand' : 'bg-white'
              }`}
            >
              <Check className="size-3 text-white" />
            </span>
            <span className="text-sm text-[#242424]">I don't remember the Vendor</span>
          </div>
        </div>
      )}
    </div>
  );
};





export default Addform;
