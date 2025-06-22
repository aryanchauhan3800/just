'use client'

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RiSettingsFill, RiSettingsLine } from "react-icons/ri";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvoicePreferencesDrawer } from "@/components/invoice-components/InvoicePreferenceDrawer";
import { Search, Plus, Upload, X, User, CalendarIcon, ChevronLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { BsUpcScan } from "react-icons/bs";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Switch } from '@/components/ui/switch';
import { ProductItem } from '@/types/dashboardAndInvoiceTypes';
import AddCustomerDrawer from '@/components/invoice-components/AddCustomerDrawer';
import PaymentMethodDialog from '@/components/invoice-components/payment-gateway-components/PaymentMethodDailog';
import { ProductTable } from '@/components/ProductTable';
import { CiBank } from 'react-icons/ci';
import { CgCreditCard } from "react-icons/cg";
import { Card } from '@/components/ui/card';
import { LiaSave } from "react-icons/lia";
import { IoShareSocial } from 'react-icons/io5';
import { BiReceipt } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import BankMethodDialog from '@/components/invoice-components/bank-setup-components/BankMethodDialog';
import { useGetInvoiceNumber } from '@/hooks/useId';
import { useGetItemDropdown, useGetPartiesDropdown } from '@/hooks/useDropdown';
import { useFormik } from 'formik';
import CommandSuggestion from '@/components/ui/commandSuggestion';
import { FaRegEdit } from 'react-icons/fa';
import { RecordCombobox } from '@/components/expenses/RecordCombobox';
import { UserFillIcon } from '@/assets/svgIcons/CustomIcons';
import NewProductTable from '@/components/NewProductTable';
import { useCreateInvoice } from '@/hooks/useInvoice';

const DatePickerComponent = ({
    value,
    onChange,
    children
}: {
    value?: Date,
    onChange: (date?: Date) => void,
    children: React.ReactNode
}) => (
    <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-auto p-0">
            <div className="p-4">
                <Label className="text-sm ">Select Date</Label>
                <Input
                    type="date"
                    value={value ? value.toISOString().split('T')[0] : ''}
                    onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : undefined)}
                    className="mt-2 w-full"
                />
            </div>
        </PopoverContent>
    </Popover>
);

const NewInvoicePage = () => {
    const router = useRouter();
    const [isPreferencesDrawerOpen, setIsPreferencesDrawerOpen] = useState(false);
    const [isAddCustomerDrawerOpen, setIsAddCustomerDrawerOpen] = useState(false);
    const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
    const [isBankDialogOpen, setIsBankDialogOpen] = useState(false);
    const [isDraft, setIsDraft] = useState<Boolean>(true);
    const { mutate: createInvoice } = useCreateInvoice();

    // APIs calls
    const { data: getInvoiceNumber, isLoading: isGetInvoiceNumberLoading } = useGetInvoiceNumber()
    const { data: parties, isLoading: isPartiesLoading } = useGetPartiesDropdown()
    const { data: itemList, isLoading: isItemListLoading } = useGetItemDropdown()

    const formik = useFormik({
        initialValues: {
            invoiceNumber: getInvoiceNumber?.invoiceNumber || "",
            invoiceDate: "",
            dueDate: "",
            paymentMode: "",
            paymentTerms: "",
            isIgst: false,
            recurring: {
                enabled: false,
                frequency: 'daily',
                startDate: "",
                endDate: "",
            },
            bankId: "",
            partyId: '',
            payment: "",
            status: "",
            items: [
                { id: '1', name: 'Sample Product', rate: 100, quantity: 2, amount: 200, cost: 80, cgst: 9, sgst: 9, discount: 0 }
            ] as ProductItem[],
            description: "",
            notes: "",
            attachments: [] as any[],
            totalDiscount: "",
            totalTax: 0,
            roundOffAmount: "",
            signature: "",
            totalTaxableAmount: "",
            isRoundedOff: false,
            totalAmount: "",
            termsAndConditions: '',
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log('Form submitted:', values);
            const payload = { ...values };
            if (isDraft) {
                payload.status = "draft";
            } else {
                payload.status = "sent";
            }

            createInvoice(payload, {
                onSuccess: (data) => {
                    console.log('Invoice created successfully:', data);
                    if (isDraft) {
                        alert('Invoice saved as draft successfully!');
                    } else {
                        alert('Invoice saved and sent successfully!');
                    }
                    router.push(`/invoice/view/${data?.invoiceNumber || values.invoiceNumber}`);
                },
                onError: (error: any) => {
                    console.error('Failed to create invoice:', error);
                    alert(`Failed to save invoice: ${error?.response?.data?.message || error.message || 'An unknown error occurred'}`);
                },
            });
        }
    });

    useEffect(() => {
        console.log("Current Formik Values:", formik.values);
    }, [formik.values]);

    const addProductItem = () => {
        const newItem: ProductItem = {
            id: String(formik.values.items.length + 1),
            name: '',
            rate: 0,
            quantity: 1,
            amount: 0,
        };
        formik.setFieldValue('items', [...formik.values.items, newItem]);
    };

    const removeProductItem = (id: string) => {
        formik.setFieldValue('items', formik.values.items.filter(item => item.id !== id));
    };

    const handleItemChange = (id: string, field: keyof ProductItem, value: number | string) => {
        const updatedItems = formik.values.items.map(item => {
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
        });
        formik.setFieldValue('items', updatedItems);
    };

    const partyOptions = parties?.map((party) => ({
        id: party._id,
        label: party.name
    })) || [];

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex justify-between items-center py-3 px-4 border-b bg-white">
                    <div className='flex items-center gap-4'>
                        <span
                            onClick={() => router.push("/invoice")}
                            className='border border-[#E8E8E8] p-2 rounded-full text-[#8F8F8F]'
                        >
                            <ChevronLeft />
                        </span>
                        <h1 className="text-2xl text-[#474747]">New Invoice</h1>
                    </div>
                    <div className='flex flex-row items-center gap-4'>
                        <Button variant='outline' onClick={() => setIsPreferencesDrawerOpen(true)}>
                            <RiSettingsFill className="h-4 w-4 text-[#474747]" />
                            <span className='text-base text-[#474747]'>Invoice Preferences</span>
                        </Button>
                        <span onClick={() => router.push("/invoice")}>
                            <X className="h-10 w-10 p-2 bg-white hover:bg-gray-100 text-[#8F8F8F] rounded-full border" />
                        </span>
                    </div>
                </div>

                <div className="space-y-6 p-6">
                    <div className='flex flex-row justify-between'>
                        <div className="space-y-8 w-1/2">
                            <div className='flex flex-row justify-between items-start'>
                                <Label htmlFor="invoiceNo" className="text-sm  text-gray-700 flex items-center">
                                    <span className="text-red-500 ml-1">*</span>
                                    Invoice No:
                                </Label>
                                <div className="flex items-center w-2/3">
                                    <Input
                                        id="invoiceNumber"
                                        name="invoiceNumber"
                                        value={formik.values.invoiceNumber}
                                        onChange={formik.handleChange}
                                        className="rounded-r-none p-5"
                                    />
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="rounded-l-none py-5 border-l-0 bg-[#FAFAFA]">
                                                <RiSettingsLine className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-xl w-full [&>button]:hidden p-0 rounded-none">
                                            <DialogHeader className="flex flex-row justify-between items-center py-4 mb-4 border-b px-6">
                                                <div className="flex flex-row items-center space-x-2">
                                                    <BiReceipt className="h-4 w-4" />
                                                    <DialogTitle className="text-lg ">Invoice Settings</DialogTitle>
                                                </div>
                                                <DialogClose asChild>
                                                    <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                                                </DialogClose>
                                            </DialogHeader>
                                            <DialogDescription className='flex flex-col px-6 gap-4 mb-2'>
                                                <span>The Invoice numbers are auto-generated. We recommend you do not alter with it for audit and ledger purposes</span>
                                            </DialogDescription>
                                            <div className='flex flex-row items-center px-6 gap-2 mb-2'>
                                                <div className='w-1/3'>
                                                    <Label htmlFor='invoicePrefix'>Invoice Prefix:</Label>
                                                    <Input
                                                        id="invoicePrefix"
                                                        defaultValue="INV"
                                                        className="mt-1"
                                                        placeholder="Enter Invoice Prefix"
                                                    />
                                                </div>
                                                <div className='w-2/3'>
                                                    <Label htmlFor='invoiceNumber'>Invoice Number:</Label>
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
                                                <Button variant="primary" className='ml-52'>Save</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between items-start'>
                                <Label htmlFor="customerName" className="text-sm  text-[#F5222D] flex items-center">
                                    <span className="ml-1">*</span>Customer Name:
                                </Label>

                                <div className="flex items-center mt-1 w-2/3">
                                    <RecordCombobox
                                        items={partyOptions}
                                        value={formik.values.partyId} // this should match item.id
                                        onChange={(value) => formik.setFieldValue("partyId", value)}
                                        onCreateNew={() => {
                                            // open your "create party" drawer/modal
                                        }}
                                        searchPlaceholder="Search party..."
                                        placeholder={
                                            <div className="flex gap-2 font-normal items-center text-[#B3B3B3]">
                                                <UserFillIcon className="text-[#B3B3B3]" />
                                                Select party if applicable
                                            </div>
                                        }
                                        renderItem={(item) => (
                                            <div className="flex items-center gap-2">
                                                <div className="size-9 rounded-md text-white flex items-center justify-center text-sm font-semibold bg-danger">
                                                    {item.label[0]}
                                                </div>
                                                <span>{item.label}</span>
                                            </div>
                                        )}
                                        createNewText="New Party"
                                    />
                                    <Button variant="outline" className="ml-2 border py-5" onClick={() => setIsAddCustomerDrawerOpen(true)}>
                                        <Plus className="h-4 w-4 text-blue-500" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-row justify-around items-center text-sm pl-40">
                                <Button className='cursor-pointer' variant="link" size="icon" onClick={() => setIsAddCustomerDrawerOpen(true)}>
                                    <span className="text-[#8F8F8F] flex items-center gap-2">Billing Address <FaRegEdit /></span>
                                </Button>
                                <Button className='cursor-pointer' variant="link" size="icon" onClick={() => setIsAddCustomerDrawerOpen(true)}>
                                    <span className="text-[#8F8F8F] flex items-center gap-2">Shipping Address <FaRegEdit /></span>
                                </Button>
                            </div>
                        </div>

                        <div className="w-1/4 space-y-4 flex flex-col">
                            <div>
                                <Label htmlFor="invoiceDate" className="text-sm  text-gray-700">
                                    <span className="text-red-500 ml-1">*</span>Invoice Date
                                </Label>
                                <DatePickerComponent
                                    value={formik.values.invoiceDate ? new Date(formik.values.invoiceDate) : undefined}
                                    onChange={(date) => formik.setFieldValue('invoiceDate', date)}
                                >
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal mt-1", !formik.values.invoiceDate && "text-muted-foreground")}
                                    >
                                        {formik.values.invoiceDate ? format(formik.values.invoiceDate, "PPP") : <span className='flex items-center justify-between w-full'>Pick a date <CalendarIcon /></span>}
                                    </Button>
                                </DatePickerComponent>
                            </div>
                            <div>
                                <Label htmlFor="paymentTerms" className="text-sm  text-gray-700">Payment Terms</Label>
                                <Select
                                    value={formik.values.paymentTerms}
                                    onValueChange={(value) => formik.setFieldValue('paymentTerms', value)}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select payment terms" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DUE_ON_RECEIPT">Due on Receipt</SelectItem>
                                        <SelectItem value="NET_7">Net 7</SelectItem>
                                        <SelectItem value="NET_15">Net 15</SelectItem>
                                        <SelectItem value="NET_30">Net 30</SelectItem>
                                        <SelectItem value="NET_60">Net 60</SelectItem>
                                        <SelectItem value="CUSTOM_DATE">CUSTOM_DATE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="dueDate" className="text-sm  text-red-500 flex items-center">
                                    <span className="text-red-500 ml-1">*</span>Due Date
                                </Label>
                                <DatePickerComponent
                                    value={formik.values.dueDate ? new Date(formik.values.dueDate) : undefined}
                                    onChange={(date) => formik.setFieldValue('dueDate', date)}
                                >
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal mt-1", !formik.values.dueDate && "text-muted-foreground")}
                                    >
                                        {formik.values.dueDate ? format(formik.values.dueDate, "PPP") : <span className='flex items-center justify-between w-full'>Select Due Date<CalendarIcon /></span>}
                                    </Button>
                                </DatePickerComponent>
                            </div>
                            <div>
                                <Label htmlFor="paymentMode" className="text-sm  text-gray-700">
                                    <span className="text-red-500 ml-1">*</span>Payment Mode
                                </Label>
                                <Select
                                    value={formik.values.paymentMode}
                                    onValueChange={(value) => formik.setFieldValue('paymentMode', value)}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select payment mode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CASH">Cash</SelectItem>
                                        <SelectItem value="CHEQUE">Cheque</SelectItem>
                                        <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                                        <SelectItem value="UPI">Upi</SelectItem>
                                        <SelectItem value="CARD">Card</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <Card className='border-none rounded-none shadow-none p-4'>
                        <NewProductTable
                            rows={Array.isArray(formik.values.items) ? formik.values.items : []}
                            setRows={(newRows) => formik.setFieldValue('items', newRows)}
                            formik={formik}
                            onTotalsChange={(totals) => {
                                if (formik.values.totalTax !== totals.taxAmount) {
                                    formik.setFieldValue('totalTax', totals.taxAmount);
                                    formik.setFieldValue('totalTaxableAmount', totals.totalInvoiceAmount)
                                    formik.setFieldValue('totalAmount', totals.subTotal)
                                    formik.setFieldValue('isRoundedOff', totals.isRoundedOff)
                                    formik.setFieldValue('roundOffAmount', totals.roundOffAmount)
                                    formik.setFieldValue('totalDiscount', totals.totalDiscount)
                                }
                            }}
                        />
                    </Card>

                    <Card className='flex flex-col justify-between border-none rounded-none shadow-none p-4'>
                        <div className="flex flex-row justify-between">
                            <div className="w-1/2 space-y-4">
                                <div className='w-3/4 flex flex-row justify-between items-center py-2'>
                                    <div className='flex flex-row justify-start gap-3'>
                                        <CiBank className='h-6 w-6 text-[#474747]' />
                                        <div className="flex flex-col justify-start">
                                            <Label className="text-base text-[#474747]">Add Bank Account</Label>
                                            <p className="text-sm text-[#6B6B6B]">Link Bank & UPI account to receive payments</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className='text-blue-500'
                                        onClick={() => setIsBankDialogOpen(true)}
                                    >
                                        <Plus className="mr-1 h-4 w-4" /> Add
                                    </Button>
                                </div>
                                <div className='w-3/4 flex flex-row justify-between items-center py-2'>
                                    <div className='flex flex-row justify-start gap-3'>
                                        <CgCreditCard className='rotate-180 h-5 w-5 text-[#474747]' />
                                        <div className="flex flex-col justify-start">
                                            <Label className="text-base text-[#474747]">Add Payment Gateways</Label>
                                            <p className="text-sm text-[#6B6B6B]">Get paid instantly from customers</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className='text-blue-500'
                                        onClick={() => setIsPaymentDrawerOpen(true)}
                                    >
                                        <Plus className="mr-1 h-4 w-4" /> Setup
                                    </Button>
                                </div>
                            </div>

                            <div className="w-1/3 space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={formik.values.recurring.enabled}
                                        onCheckedChange={(checked) => formik.setFieldValue('recurring.enabled', checked)}
                                    />
                                    <Label htmlFor="recurringInvoice" className="text-sm font-normal">Set as Recurring Invoice</Label>
                                </div>
                                <p className="text-xs text-gray-500">Invoice will be auto-repeat after certain interval</p>
                            </div>
                        </div>

                        <Separator />

                        <div className='flex flex-row justify-between'>
                            <div className="w-1/2 flex flex-col gap-6">
                                <div>
                                    <Label htmlFor="description" className="text-sm ">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        placeholder="Start writing..."
                                        className="mt-1 min-h-[80px]"
                                    />
                                    <div className="flex justify-end items-center space-x-2 mt-2">
                                        <Checkbox
                                            id="descDefault"
                                            className='border-2 border-blue-500'
                                        />
                                        <Label htmlFor="descDefault" className="text-xs font-normal">Set as Default</Label>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="notes" className="text-sm ">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        name="notes"
                                        value={formik.values.notes}
                                        onChange={formik.handleChange}
                                        placeholder="Start writing..."
                                        className="mt-1 min-h-[80px]"
                                    />
                                    <div className="flex justify-end items-center space-x-2 mt-2">
                                        <Checkbox id="notesDefault" className='border-2 border-blue-500' />
                                        <Label htmlFor="notesDefault" className="text-xs font-normal">Set as Default</Label>
                                    </div>
                                </div>
                                <div className='flex flex-row items-center gap-4'>
                                    <Label className='text-sm '>Attachments:</Label>
                                    <Button
                                        variant="outline"
                                        style={{ padding: '4px 6px' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Upload className='h-4 w-4' />
                                        <span className='text-black text-sm'>Click to Upload</span>
                                    </Button>
                                </div>
                            </div>
                            <div className='w-2/5 mt-auto'>
                                <label className="text-sm ">Upload Digital Signature:</label>
                                <div className="w-full border-2 border-dashed border-blue-500 bg-blue-50 rounded-md p-6 text-center cursor-pointer hover:border-blue-400 focus:outline-none">
                                    <Upload className="mx-auto text-blue-500 mb-2" size={24} />
                                    <p className="text-sm text-gray-600">
                                        Drag & Drop file here or{" "}
                                        <span className="text-blue-600  hover:underline">
                                            Click here
                                        </span>
                                    </p>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        name="signature"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                formik.setFieldValue('signature', e.target.files[0]);
                                            }
                                        }}
                                        className="hidden"
                                    />
                                </div>
                                <div className="flex justify-end items-center space-x-2 mt-2">
                                    <Checkbox
                                        id="signatureDefault"
                                        className='border-2 border-blue-500'
                                    />
                                    <Label htmlFor="signatureDefault" className="text-xs font-normal">Set as Default</Label>
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
                            type='button'
                            className='text-blue-700 hover:text-blue-800 text-base'
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsDraft(true);
                                formik.submitForm();
                            }}
                        >
                            <LiaSave />Save as Draft
                        </Button>
                        <Button
                            type='submit'
                            variant="primary"
                            className='text-base'
                            onClick={() => setIsDraft(false)}
                        >
                            <IoShareSocial />Save & Send
                        </Button>
                    </div>
                </div>
            </form>

            <InvoicePreferencesDrawer open={isPreferencesDrawerOpen} onOpenChange={setIsPreferencesDrawerOpen} />
            <AddCustomerDrawer open={isAddCustomerDrawerOpen} onOpenChange={setIsAddCustomerDrawerOpen} />
            <PaymentMethodDialog open={isPaymentDrawerOpen} onOpenChange={setIsPaymentDrawerOpen} />
            <BankMethodDialog open={isBankDialogOpen} onOpenChange={setIsBankDialogOpen} />
        </div >
    );
};

export default NewInvoicePage;