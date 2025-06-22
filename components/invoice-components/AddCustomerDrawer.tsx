import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight, X } from "lucide-react";
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import { Input } from "../ui/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { HiOutlineUsers } from "react-icons/hi2";

const AddCustomerDrawer = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="left">
            <DrawerContent className="min-w-lg h-full rounded-none flex flex-col">
                <DrawerHeader className="flex flex-row justify-between items-center py-4 mb-4 border-b flex-shrink-0">
                    <div className="flex flex-row items-center space-x-2">
                        <HiOutlineUsers className="h-4 w-4" />
                        <DrawerTitle className="text-lg font-medium">New Customer</DrawerTitle>
                    </div>
                    <DrawerClose asChild>
                        <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                    </DrawerClose>
                </DrawerHeader>

                <div className="p-4 space-y-4 flex-shrink-0">
                    <div className="flex flex-row items-center space-x-16 text-sm">
                        <Label><span className="text-red-500 ml-1">*</span>Party Type:</Label>
                        <RadioGroup defaultValue="business" className="flex flex-row items-center space-x-4 ml-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="business" id="business" />
                                <Label htmlFor="business">Business</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="individual" id="individual" />
                                <Label htmlFor="individual">Individual</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="flex flex-row items-center justify-between text-sm">
                        <Label><span className="text-red-500 ml-1">*</span>Party Name:</Label>
                        <Input type="text" placeholder="Enter Full Name" className="w-2/3" />
                    </div>

                    <div className="flex flex-row items-center justify-between text-sm">
                        <Label><span className="text-red-500 ml-1">*</span>Contact Number:</Label>
                        <PhoneInput
                            country={"in"}
                            containerStyle={{
                                width: "67%",
                                border: "1px solid #e5e7eb",
                                borderRadius: "6px",
                            }}
                            inputStyle={{
                                width: "67%",
                                border: "none",
                                height: "40px",
                                borderRadius: "6px",
                                paddingLeft: "40px",
                            }}
                            buttonStyle={{
                                border: "none",
                            }}
                            countryCodeEditable
                        />
                    </div>

                    <div className="flex flex-row items-center justify-between text-sm">
                        <Label>Party Email ID:</Label>
                        <Input type="text" placeholder="Enter the company&apos;s Email ID" className="w-2/3" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                    <Tabs defaultValue="basic" className="w-full flex-1 flex flex-col">
                        <TabsList className="w-full bg-transparent gap-10 border-b-2 pb-2 shadow-md mx-auto flex-shrink-0">
                            <TabsTrigger className="recievable_tab !py-5" value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger className="recievable_tab !py-5" value="billing">Billing Address</TabsTrigger>
                            <TabsTrigger className="recievable_tab !py-5" value="shipping">Shipping Address</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="flex-1 min-h-0">
                            <ScrollArea className="h-full px-4">
                                <div className="mt-4 space-y-4 pb-4">
                                    <div className="flex flex-row items-center justify-between">
                                        <Label>Opening Balance:</Label>
                                        <Input type="text" placeholder="Enter Opening Balance" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label>GST Number:</Label>
                                        <Input type="text" placeholder="Enter GST Number" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label>PAN Number:</Label>
                                        <Input type="text" placeholder="Enter the PAN Number" className="w-2/3" />
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="billing" className="flex-1 min-h-0">
                            <ScrollArea className="h-full px-4">
                                <div className="mt-4 space-y-4 pb-4">
                                    <div className="flex flex-row items-center justify-between">
                                        <Label><span className="text-red-500 ml-1">*</span>Address Line 1:</Label>
                                        <Input type="text" placeholder="Enter the Street name" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label className="flex flex-col">
                                            <span>Address Line 2</span>
                                            <span className="text-xs text-gray-600">(optional):</span>
                                        </Label>
                                        <Input type="text" placeholder="Enter the Street name" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label><span className="text-red-500 ml-1">*</span>Country:</Label>
                                        <Input type="text" placeholder="Enter Country" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label><span className="text-red-500 ml-1">*</span>State:</Label>
                                        <Input type="text" placeholder="Enter State" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label><span className="text-red-500 ml-1">*</span>City:</Label>
                                        <Input type="text" placeholder="Enter City" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label><span className="text-red-500 ml-1">*</span>Pin Code:</Label>
                                        <Input type="text" placeholder="Enter Pin Code" className="w-2/3" />
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="shipping" className="flex-1 min-h-0">
                            <ScrollArea className="h-full px-4">
                                <div className="mt-4 space-y-4 pb-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Same as Billing Address
                                        </label>
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label>Contact Person:</Label>
                                        <Input type="text" placeholder="Enter Full Name" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label><span className="text-red-500 ml-1">*</span>Address Line 1:</Label>
                                        <Input type="text" placeholder="Enter the Street name" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label className="flex flex-col">
                                            <span>Address Line 2</span>
                                            <span className="text-xs text-gray-600">(optional):</span>
                                        </Label>
                                        <Input type="text" placeholder="Enter the Street name" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label><span className="text-red-500 ml-1">*</span>Country:</Label>
                                        <Input type="text" placeholder="Enter Country" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label><span className="text-red-500 ml-1">*</span>State:</Label>
                                        <Input type="text" placeholder="Enter State" className="w-2/3" />
                                    </div>
                                    <div className="flex flex-row items-center justify-between">
                                        <Label><span className="text-red-500 ml-1">*</span>City:</Label>
                                        <Input type="text" placeholder="Enter City" className="w-2/3" />
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>

                <DrawerFooter className="border-t p-4 flex-row justify-between space-x-2 flex-shrink-0">
                    <DrawerClose asChild>
                        <Button variant="ghost">Close</Button>
                    </DrawerClose>
                    <Button variant="primary">Save <ChevronRight /></Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default AddCustomerDrawer;