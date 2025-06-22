'use client'

import { Button } from '@/components/ui/button'
import {
    Checkbox, FormControl, FormControlLabel, Typography
} from '@mui/material';
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ExpandMore } from '@mui/icons-material';
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PurchaseTableWithFilter {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    filters: {
        createdToday: boolean;
        showRecurring: boolean;
        statuses: string[];
        dateRange: { startDate: string, endDate: string } | null;
    };
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}


const PurchaseFilter = ({ open, onOpenChange, filters, setFilters }: PurchaseTableWithFilter) => {
    const [showAmountWise, setShowAmountWise] = useState(false);
    const [showReturnDate, setShowReturnDate] = useState(false);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTitle></SheetTitle>
            <SheetContent className="max-w-sm bg-[#FAFAFA]">
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b bg-white">
                        <Typography variant="h6" className="font-medium">Filter</Typography>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4">
                        <Card className='py-2 border-0 border-b rounded-none shadow-none'>
                            <Typography className="text-base px-4">Show Challans</Typography>
                            <div className="flex flex-wrap px-6">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={filters.statuses.includes("Accepted")}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    statuses: checked
                                                        ? [...prev.statuses, "Accepted"]
                                                        : prev.statuses.filter((s) => s !== "Accepted"),
                                                }));
                                            }}
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 bg-green-100 rounded-full text-sm text-[#22B947]'>Accepted</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={filters.statuses.includes("Draft")}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    statuses: checked
                                                        ? [...prev.statuses, "Draft"]
                                                        : prev.statuses.filter((s) => s !== "Draft"),
                                                }));
                                            }}
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 rounded-full text-sm bg-blue-200 text-[#025AE0]'>Draft</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={filters.statuses.includes("Overdue")}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    statuses: checked
                                                        ? [...prev.statuses, "Overdue"]
                                                        : prev.statuses.filter((s) => s !== "Overdue"),
                                                }));
                                            }}
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 rounded-full text-sm bg-yellow-100 text-[#FAAD14]'>Overdue</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={filters.statuses.includes("Pending")}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    statuses: checked
                                                        ? [...prev.statuses, "Pending"]
                                                        : prev.statuses.filter((s) => s !== "Pending"),
                                                }));
                                            }}
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 rounded-full text-sm bg-red-100 text-[#F5222D]'>Pending</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={filters.statuses.includes("Rejected")}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    statuses: checked
                                                        ? [...prev.statuses, "Rejected"]
                                                        : prev.statuses.filter((s) => s !== "Rejected"),
                                                }));
                                            }}
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 rounded-full text-sm bg-red-100 text-[#F5222D]'>Rejected</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={filters.statuses.includes("PartiallyDelivered")}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    statuses: checked
                                                        ? [...prev.statuses, "PartiallyDelivered"]
                                                        : prev.statuses.filter((s) => s !== "PartiallyDelivered"),
                                                }));
                                            }}
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 rounded-full text-sm bg-green-100 text-[#22B947]'>Partially Delivered</Badge>}
                                />
                            </div>
                            <div className='border-t pt-2'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                        />
                                    }
                                    label={<span className="text-sm">Show only Billed Purchase Orders</span>}
                                    className="px-6"
                                />
                            </div>
                        </Card>

                        <Card className='p-2 rounded-none border-none shadow-none'>
                            <Button
                                onClick={() => setShowAmountWise(prev => !prev)}
                                className="w-full bg-white hover:bg-white text-black border-none shadow-none p-0"
                            >
                                <Typography className="text-base font-medium">₹ Purchase Amount wise</Typography>
                                <ExpandMore className={`ml-auto transform ${showAmountWise ? 'rotate-180' : ''}`} />
                            </Button>
                            {setShowAmountWise && (
                                <FormControl component="fieldset" className="mt-2">
                                    <RadioGroup
                                        className='px-6 space-y-2'
                                    >
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="showAll" className='text-base text-[#474747]'>Show all</Label>
                                            <RadioGroupItem value="showAll" id="showAll" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="lessThan" className='text-base text-[#474747]'>Less than ₹9,999 due</Label>
                                            <RadioGroupItem value="lessThan" id="lessThan" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="10000" className='text-base text-[#474747]'>₹10,000 to ₹49,999 due</Label>
                                            <RadioGroupItem value="10000" id="10000" />
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                            )}
                        </Card>

                        <Card className='p-2 border-0 border-b rounded-none shadow-none'>
                            <Button
                                onClick={() => setShowReturnDate(prev => !prev)}
                                className="w-full bg-white hover:bg-white text-black border-none shadow-none"
                            >
                                <Typography className="text-base font-medium">Show Purchase Order made</Typography>
                                <ExpandMore className={`ml-auto transform ${showReturnDate ? 'rotate-180' : ''}`} />
                            </Button>
                            {showReturnDate && (
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        className='px-6'
                                        defaultValue="week"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <Label htmlFor='week' className='text-base text-[#474747]'>Within 7 days</Label>
                                                <div className="text-sm text-[#8F8F8F]">16 Apr, 2025 - 22 Apr, 2025</div>
                                            </div>
                                            <RadioGroupItem value="week" id="week" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <Label htmlFor='month' className='text-base text-[#474747]'>This month</Label>
                                                <div className="text-sm text-[#8F8F8F]">01 Apr, 2025 - 30 Apr, 2025</div>
                                            </div>
                                            <RadioGroupItem value="month" id="month" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <Label htmlFor='quarter' className='text-base text-[#474747]'>This Quarter (3 months)</Label>
                                                <div className="text-sm text-[#8F8F8F]">01 Jan, 2025 - 31 Mar, 2025</div>
                                            </div>
                                            <RadioGroupItem value="quarter" id="quarter" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <Label htmlFor='fiscal' className='text-base text-[#474747]'>Current Fiscal Year</Label>
                                                <div className="text-sm text-[#8F8F8F]">01 Apr, 2025 - 31 Mar, 2026</div>
                                            </div>
                                            <RadioGroupItem value="fiscal" id="fiscal" />
                                        </div>
                                    </RadioGroup>
                                    <div className='px-3'>
                                        <Button
                                            variant="ghost"
                                            className="flex justify-between w-full mt-2 shadow-none hover:bg-white"
                                        >
                                            <Typography className="text-base font-medium">Set Custom</Typography>
                                            <ChevronRight className='text-blue-700 h-4 w-4' />
                                        </Button>
                                    </div>
                                </FormControl>
                            )}
                        </Card>
                    </div>

                    <div className="border-t px-2 py-4 flex gap-2 shadow-lg bg-white">
                        <Button
                            variant="primary"
                            // onClick={applyFilters}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 py-5"
                        >
                            Apply Filters
                        </Button>
                        <Button
                            variant="ghost"
                            // onClick={cancelFilters}
                            className="flex-1 py-5"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </SheetContent >
        </Sheet >
    )
}

export default PurchaseFilter