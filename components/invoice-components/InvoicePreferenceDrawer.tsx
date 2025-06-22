import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { InvoiceDrawerProps, Warehouse } from "@/types/dashboardAndInvoiceTypes";
import { PiWarehouse } from "react-icons/pi";
import { MdOutlineLocationOn } from "react-icons/md";
import { BiReceipt } from "react-icons/bi";
import { Card } from "../ui/card";

const warehouses: Warehouse[] = [
    { id: "w1", name: "Pratapgarh", address: "24-8 Khan Darbar, Ratu Road, Ranchi" },
    { id: "w2", name: "Raigarh", address: "14/2 Rana Pratap Road, Ranchi" },
    { id: "w3", name: "Zamin Zilla", address: "427 Sab Havidar Thana, Noida" },
    { id: "w4", name: "Jhaarganj", address: "427 Ashutosh Colony Road, Noida" },
];

export function InvoicePreferencesDrawer({ open, onOpenChange }: InvoiceDrawerProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="h-full w-[500px] bg-[#FAFAFA] max-w-md rounded-none flex flex-col">
                <DrawerHeader className="flex flex-row justify-between items-center border-b px-4 flex-shrink-0">
                    <DrawerTitle className="text-lg text-[#474747]">Invoice Preferences</DrawerTitle>
                    <DrawerClose asChild>
                        <Button variant="ghost" size="icon" className="border rounded-full">
                            <X className="h-5 w-5" />
                        </Button>
                    </DrawerClose>
                </DrawerHeader>

                <ScrollArea className="flex-1 min-h-0">
                    <div className="pb-4">
                        <Card className="border-b rounded-none pt-0 pb-10 shadow-none mb-4">
                            <div className="flex flex-row items-center gap-2 px-4 py-2 border-b">
                                <PiWarehouse className="h-6 w-6 text-[#474747]" />
                                <div>
                                    <Label className="text-base text-[#474747]">Warehouse</Label>
                                    <DrawerDescription className="text-sm text-[#8F8F8F]">Show items only from this Warehouse</DrawerDescription>
                                </div>
                            </div>
                            <RadioGroup defaultValue="w2" className="-mt-4">
                                {warehouses.map((warehouse) => (
                                    <div key={warehouse.id} className="flex justify-start items-center border-b px-5 pb-1">
                                        <RadioGroupItem value={warehouse.id} id={warehouse.id} className="mt-1 mr-4" />
                                        <MdOutlineLocationOn className="h-8 w-8 p-1 bg-[#FAFAFA] text-[#8F8F8F] rounded-full" />
                                        <div className="flex flex-col justify-start cursor-pointer ml-4">
                                            <span className="text-base text-[#474747] w-full">{warehouse.name}</span>
                                            <span className="text-sm text-[#8F8F8F]">{warehouse.address}</span>
                                        </div>
                                    </div>
                                ))}
                            </RadioGroup>
                        </Card>

                        <Card className="border-none rounded-none shadow-none pt-2 pb-10">
                            <div className="flex flex-row items-center gap-2 px-4 py-2 border-b">
                                <BiReceipt className="h-6 w-6 text-[#474747]" />
                                <div>
                                    <Label className="text-base text-[#474747]">Invoice Fields</Label>
                                    <DrawerDescription className="text-sm text-[#8F8F8F]">Customize the invoice fields</DrawerDescription>
                                </div>
                            </div>
                            <div className="-mt-6">
                                <div className="flex items-center space-x-2 py-4 pl-8 border-b">
                                    <Checkbox id="discount" defaultChecked />
                                    <Label htmlFor="discount" className="text-sm font-normal cursor-pointer">Discount on each item</Label>
                                </div>
                                <div className="flex items-center space-x-2 py-4 pl-8 border-b">
                                    <Checkbox id="cess" />
                                    <Label htmlFor="cess" className="text-sm font-normal cursor-pointer">CESS %</Label>
                                </div>
                                <div className="flex items-center space-x-2 py-4 pl-8 border-b">
                                    <Checkbox id="hsn" />
                                    <Label htmlFor="hsn" className="text-sm font-normal cursor-pointer">HSN codes of Items</Label>
                                </div>
                            </div>
                        </Card>
                    </div>
                </ScrollArea>

                <DrawerFooter className="border-t p-4 flex-row justify-between space-x-2 flex-shrink-0">
                    <Button>Save</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}