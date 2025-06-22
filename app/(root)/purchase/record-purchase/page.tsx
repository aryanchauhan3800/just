'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { RiSettingsLine } from 'react-icons/ri';
import { Switch } from '@/components/ui/switch';
import { ChevronRight, Edit2, Plus, Search, Upload, X } from 'lucide-react';
import { BiReceipt } from 'react-icons/bi';
import { cn } from '@/lib/utils';
import { format } from "date-fns";
import { Card } from '@/components/ui/card';
import { ProductTable } from '@/components/ProductTable';
import { ProductItem } from '@/types/dashboardAndInvoiceTypes';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { LiaSave } from 'react-icons/lia';
import { IoShareSocial } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { BsUpcScan } from 'react-icons/bs';

const DatePickerComponent = ({ date, setDate, children }: { date?: Date, setDate: (date?: Date) => void, children: React.ReactNode }) => (
    <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-auto p-0">
            <div className="p-4">
                <Label className="text-sm font-medium">Select Date</Label>
                <Input
                    type="date"
                    value={date ? date.toISOString().split('T')[0] : ''}
                    onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
                    className="mt-2 w-full"
                />
            </div>
        </PopoverContent>
    </Popover>
);

const page = () => {
    const router = useRouter()
    const [pOId, setPOId] = useState("PO-000001");
    const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(new Date());
    const [validDate, setValidDate] = useState<Date | undefined>();

    const [productItems, setProductItems] = useState<ProductItem[]>([
        { id: '1', name: 'Sample Product', rate: 100, quantity: 2, amount: 200, cost: 80, cgst: 9, sgst: 9, discount: 0 },
    ]);

    const addProductItem = () => {
        setProductItems([...productItems, {
            id: String(productItems.length + 1),
            name: '',
            rate: 0,
            quantity: 1,
            amount: 0,
        }]);
    };

    const removeProductItem = (id: string) => {
        setProductItems(productItems.filter(item => item.id !== id));
    };

    const handleItemChange = (id: string, field: keyof ProductItem, value: number | string) => {
        setProductItems(productItems.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };
                if (field === 'rate' || field === 'quantity' || field === 'discount') {
                    const rate = Number(updatedItem.rate) || 0;
                    const quantity = Number(updatedItem.quantity) || 0;
                    const discount = Number(updatedItem.discount) || 0;
                    updatedItem.amount = (rate * quantity) * (1 - discount / 100);
                }
                return updatedItem;
            }
            return item;
        }));
    };

    const subTotal = productItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subTotal * 0.18;
    const totalInvoiceAmount = subTotal + taxAmount;

    const handleSaveAsDraft = async () => {
        router.push(`/purchase/view`);
    };

    return (
        <div>
            <div>
                <div className="flex justify-between items-center py-3 px-4 border-b bg-white">
                    <h1 className="text-2xl text-[#474747]">Record New Purchase</h1>
                </div>

                <div className="space-y-6 p-6">

                    <div className='flex flex-row justify-between'>
                        <div className="space-y-8 w-1/2">

                            <div className='flex flex-row justify-between items-start'>
                                <Label htmlFor="poNo" className="text-sm font-medium text-gray-700 flex items-center">
                                    <span className="text-red-500 ml-1">*</span>
                                    Puchase No:
                                </Label>
                                <div className="flex items-center w-2/3">
                                    <Input id="poNo" defaultValue="INV-000001" className="rounded-r-none p-5" onChange={(e) => setPOId(e.target.value)} />
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="rounded-l-none py-5 border-l-0 bg-[#FAFAFA]">
                                                <RiSettingsLine className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="min-w-xl w-full [&>button]:hidden p-0 rounded-none">
                                            <DialogHeader className="flex flex-row justify-between items-center py-4 mb-4 border-b px-6">
                                                <div className="flex flex-row items-center space-x-2">
                                                    <BiReceipt className="h-4 w-4" />
                                                    <DialogTitle className="text-lg font-medium">Purchase Order Settings</DialogTitle>
                                                </div>
                                                <DialogClose asChild>
                                                    <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                                                </DialogClose>
                                            </DialogHeader>
                                            <DialogDescription className='flex flex-col px-6 gap-4 mb-2'>
                                                <span>The Serial numbers are auto generated.We recommend you do not alter with it for audit and ledger purposes</span>
                                            </DialogDescription>
                                            <div className='flex flex-row items-center px-6 gap-2 mb-2'>
                                                <div className='w-1/3'>
                                                    <Label htmlFor='invoicePrefix'>Purchase Order Prefix:</Label>
                                                    <Input
                                                        id="poPrefix"
                                                        defaultValue="PO"
                                                        className="mt-1"
                                                        placeholder="Enter PO Prefix"
                                                    />
                                                </div>
                                                <div className='w-2/3'>
                                                    <Label htmlFor='invoiceNumber'>PO Number:</Label>
                                                    <Input id="invoiceNumber" className="mt-1" placeholder='Enter Number' />
                                                </div>
                                            </div>
                                            <div className="w-full px-6">
                                                <div className="flex items-center space-x-2">
                                                    <Switch />
                                                    <Label htmlFor="recurringInvoice" className="text-sm font-normal">Set as Recurring Invoice</Label>
                                                </div>
                                                <p className="text-xs text-gray-500">Recurring Invoices auto-repeat after certain interval</p>
                                            </div>
                                            <DialogFooter className="mt-4 border-t py-4 px-6 shadow-2xl">
                                                <Button variant="ghost" className='mr-auto'>Cancel</Button>
                                                <Button variant="primary" className='ml-52'>Save & continue<ChevronRight /></Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between items-start'>
                                <Label htmlFor="customerName" className="text-sm font-medium text-red-500 flex items-center">
                                    <span className="ml-1">*</span>Vendor Name:
                                </Label>
                                <div className="flex items-center mt-1 w-2/3">
                                    <Input id="customerName" placeholder="Enter Party name" className="rounded-r-none py-5" />
                                    <Button variant="outline" className="rounded-none border-l-0 bg-[#FAFAFA] py-5">
                                        <Search className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" className="ml-2 border py-5">
                                        <Plus className="h-4 w-4 text-blue-500" />
                                    </Button>
                                </div>
                            </div>
                            <div className="pl-64">
                                <Button variant="link" size="icon">
                                    <span className="text-gray-500">Billing Address</span>
                                    <Edit2 />
                                </Button>
                            </div>
                            <div className='flex flex-row justify-between items-start'>
                                <Label htmlFor="customerName" className="text-sm font-medium text-gray-700 flex items-center">
                                    <span className="text-red-500 ml-1">*</span>Ship To:
                                </Label>
                                <div className="flex items-center mt-1 w-2/3">
                                    <Select defaultValue="pratapgarh">
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select warehouse" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pratapgarh">Pratapgarh</SelectItem>
                                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                            <SelectItem value="credit_card">Credit Card</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/4 space-y-4 flex flex-col">
                            <div>
                                <Label htmlFor="invoiceDate" className="text-sm font-medium text-gray-700">
                                    <span className="text-red-500 ml-1">*</span>Date Created
                                </Label>
                                <DatePickerComponent date={purchaseDate} setDate={setPurchaseDate}>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal mt-1", !purchaseDate && "text-muted-foreground")}
                                    >
                                        {purchaseDate ? format(purchaseDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </DatePickerComponent>
                            </div>
                            <div>
                                <Label htmlFor="dueDate" className="text-sm font-medium text-red-500 flex items-center">
                                    <span className="text-red-500 ml-1">*</span>Items Recieved In:
                                </Label>
                                <DatePickerComponent date={validDate} setDate={setValidDate}>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal mt-1", !validDate && "text-muted-foreground")}
                                    >
                                        {validDate ? format(validDate, "PPP") : <span>Select Due Date</span>}
                                    </Button>
                                </DatePickerComponent>
                            </div>
                            <div>
                                <Label htmlFor="paymentMode" className="text-sm font-medium text-gray-700">
                                    <span className="text-red-500 ml-1">*</span>Payment Mode
                                </Label>
                                <Select defaultValue="cash">
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select payment mode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                        <SelectItem value="credit_card">Credit Card</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <Card className='border-none rounded-none shadow-none p-4'>
                        <div>
                            <ProductTable
                                productItems={productItems}
                                onItemChange={handleItemChange}
                                onAddItem={addProductItem}
                                onRemoveItem={removeProductItem}
                            />
                        </div>

                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2 mt-4 text-blue-700">
                                <BsUpcScan className='h-4 w-4' />
                                <Label htmlFor="scanItems" className="text-base font-normal">Scan Items (POS)</Label>
                            </div>
                            <div className="w-full md:w-1/3 space-y-2 p-4 bg-[#FAFAFA]">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Sub Total (₹)</span>
                                    <span className="font-medium text-gray-800">{subTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (₹)</span>
                                    <span className="font-medium text-gray-800">{taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className='flex flex-row items-center gap-2'><Checkbox />Roundoff:</span>
                                    <span className="font-medium text-gray-800">{taxAmount.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-lg">
                                    <span className="text-[#474747]">Total Invoice Amt:</span>
                                    <span className="text-indigo-600">{totalInvoiceAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className='flex flex-col justify-between border-none rounded-none shadow-none p-4'>
                        <div className='flex flex-row justify-between'>
                            <div className="w-1/2 flex flex-col gap-6">
                                <div>
                                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                                    <Textarea id="description" placeholder="Start writing..." className="mt-1 min-h-[80px]" />
                                    <div className="flex justify-end items-center space-x-2 mt-2">
                                        <Checkbox id="descDefault" className='border-2 border-blue-500' />
                                        <Label htmlFor="descDefault" className="text-xs font-normal">Set as Default</Label>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
                                    <Textarea id="notes" placeholder="Start writing..." className="mt-1 min-h-[80px]" />
                                    <div className="flex justify-end items-center space-x-2 mt-2">
                                        <Checkbox id="notesDefault" className='border-2 border-blue-500' />
                                        <Label htmlFor="notesDefault" className="text-xs font-normal">Set as Default</Label>
                                    </div>
                                </div>
                                <div className='flex flex-row items-center gap-4'>
                                    <Label className='text-sm font-medium'>Attachments:</Label>
                                    <Button variant="outline" style={{ padding: '4px 6px' }}>
                                        <Upload className='h-4 w-4' />
                                        <span className='text-black text-sm'>Click to Upload</span>
                                    </Button>
                                </div>
                            </div>
                            <div className='w-2/5 mt-auto'>
                                <label className="text-sm font-medium">Upload Digital Signature:</label>
                                <div className="w-full border-2 border-dashed border-blue-500 bg-blue-50 rounded-md p-6 text-center cursor-pointer hover:border-blue-400 focus:outline-none">
                                    <Upload className="mx-auto text-blue-500 mb-2" size={24} />
                                    <p className="text-sm text-gray-600">
                                        Drag & Drop file here or{" "}
                                        <span className="text-blue-600 font-medium hover:underline">
                                            Click here
                                        </span>
                                    </p>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        name="logo"
                                        className="hidden"
                                    />
                                </div>
                                <div className="flex justify-end items-center space-x-2 mt-2">
                                    <Checkbox id="notesDefault" className='border-2 border-blue-500' />
                                    <Label htmlFor="notesDefault" className="text-xs font-normal">Set as Default</Label>
                                </div>
                            </div>
                        </div>
                    </Card>

                </div>

                <div className="p-6 border-t flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                    <Button variant="outline" className='text-base'>Cancel</Button>
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            className='text-blue-700 hover:text-blue-800 text-base'
                            onClick={handleSaveAsDraft}
                        >
                            <LiaSave />Save as Draft
                        </Button>
                        <Button variant="primary" className='text-base'><IoShareSocial />Save & Send</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default page