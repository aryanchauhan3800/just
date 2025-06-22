'use client'

import { Button } from '@/components/ui/button'
import {
    Checkbox, FormControl, FormControlLabel, Typography
} from '@mui/material';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ExpandMore } from '@mui/icons-material';
import React, { useState } from 'react';
import { InvoiceFiltersProps, InvoiceFiltersState, ShowInvoicesFilter } from '@/types/dashboardAndInvoiceTypes';
import { Card } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { ChevronRight } from 'lucide-react';
import { FiFilter } from 'react-icons/fi';
import { Badge } from '../ui/badge';
import DateRangePicker from '../DatePicker';

const InvoiceFilters: React.FC<InvoiceFiltersProps> = ({
    filters,
    setFilters,
    expandedSections,
    toggleSection,
    applyFilters,
    cancelFilters,
    isFilterOpen,
    setIsFilterOpen
}) => {
    const handleFilterChange = (
        key: keyof ShowInvoicesFilter,
        value: boolean
    ) => {
        setFilters(prev => ({
            ...prev,
            showInvoices: {
                ...prev.showInvoices,
                [key]: value
            }
        }));
    };

    const handleSingleFilterChange = (
        section: keyof InvoiceFiltersState,
        value: boolean | string
    ) => {
        setFilters((prev) => ({
            ...prev,
            [section]: value
        }));
    };

    const [dateRange, setDateRange] = useState<{
        startDate: Date | null;
        endDate: Date | null;
    }>({
        startDate: null,
        endDate: null
    });

    const handleDateRangeChange = (range: {
        startDate: Date | null;
        endDate: Date | null;
    }) => {
        setDateRange(range);
        console.log('Selected date range:', dateRange);
    };

    return (
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTitle></SheetTitle>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    className="border border-[#D6D6D6] text-[#025AE0] font-medium rounded-sm flex items-center hover:cursor-pointer hover:text-blue-800"
                    onClick={() => setIsFilterOpen(true)}
                >
                    <FiFilter className='w-4 h-4' />
                    Filter
                </Button>
            </SheetTrigger>

            <SheetContent className="max-w-sm bg-[#FAFAFA]">
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b bg-white">
                        <Typography variant="h6" className="font-medium">Filter</Typography>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4">
                        <Card className='py-2 border-0 border-b rounded-none shadow-none'>
                            <Typography className="text-base px-4">Show Invoices Created</Typography>
                            <div className='px-6'>
                                <DateRangePicker onRangeChange={handleDateRangeChange} className='w-full' />
                            </div>
                            <div className='border-t pt-2'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showRecurring}
                                            onChange={(e) => handleSingleFilterChange('showRecurring', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<span className="text-sm">Show Today&apos;s Invoices</span>}
                                    className="px-6"
                                />
                            </div>
                        </Card>

                        <Card className='py-2 border-0 border-b rounded-none shadow-none'>
                            <Typography className="text-base px-4">Show Invoices</Typography>
                            <div className="flex flex-wrap px-6">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showInvoices.paid}
                                            onChange={e => handleFilterChange('paid', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 bg-green-100 rounded-full text-sm text-[#22B947]'>Paid</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showInvoices.partiallyPaid}
                                            onChange={(e) => handleFilterChange('partiallyPaid', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 bg-yellow-100 rounded-full text-sm text-[#FAAD14]'>Partially Paid</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showInvoices.due}
                                            onChange={(e) => handleFilterChange('due', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 bg-yellow-100 rounded-full text-sm text-[#FAAD14]'>Due</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showInvoices.overdue}
                                            onChange={(e) => handleFilterChange('overdue', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 bg-red-100 rounded-full text-sm text-[#F30000]'>Overdue</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showInvoices.draft}
                                            onChange={(e) => handleFilterChange('draft', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 bg-blue-100 rounded-full text-sm text-[#025AE0]'>Draft</Badge>}
                                />
                            </div>
                            <div className='border-t pt-2'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showRecurring}
                                            onChange={(e) => handleSingleFilterChange('showRecurring', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<span className="text-sm">Show Recurring Invoices</span>}
                                    className="px-6"
                                />
                            </div>
                        </Card>

                        <Card className='p-2 border-0 border-b rounded-none shadow-none'>
                            <Button
                                onClick={() => toggleSection('upcomingDueDates')}
                                className="w-full bg-white hover:bg-white text-black border-none shadow-none"
                            >
                                <Typography className="text-base font-medium">Upcoming Due Dates</Typography>
                                <ExpandMore className={`ml-auto transform ${expandedSections.upcomingDueDates ? 'rotate-180' : ''}`} />
                            </Button>
                            {expandedSections.upcomingDueDates && (
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

                        <Card className='p-2 border-0 border-b rounded-none shadow-none'>
                            <Button
                                onClick={() => toggleSection('showInvoicesCreated')}
                                className="w-full bg-white hover:bg-white text-black border-none shadow-none p-0"
                            >
                                <Typography className="text-base font-medium">Show Invoices created</Typography>
                                <ExpandMore className={`ml-auto transform ${expandedSections.showInvoicesCreated ? 'rotate-180' : ''}`} />
                            </Button>
                            {expandedSections.showInvoicesCreated && (
                                <FormControl component="fieldset" className="mt-2">
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
                                </FormControl>
                            )}
                        </Card>

                        <Card className='p-2 rounded-none border-none shadow-none'>
                            <Button
                                onClick={() => toggleSection('dueAmountWise')}
                                className="w-full bg-white hover:bg-white text-black border-none shadow-none p-0"
                            >
                                <Typography className="text-base font-medium">₹ Due Amount wise</Typography>
                                <ExpandMore className={`ml-auto transform ${expandedSections.dueAmountWise ? 'rotate-180' : ''}`} />
                            </Button>
                            {expandedSections.dueAmountWise && (
                                <FormControl component="fieldset" className="mt-2">
                                    <RadioGroup
                                        className='px-6 space-y-2'
                                        value={filters.dueAmountWise}
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
                    </div>

                    <div className="border-t px-2 py-4 flex gap-2 shadow-lg bg-white">
                        <Button
                            variant="primary"
                            onClick={applyFilters}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 py-5"
                        >
                            Apply Filters
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={cancelFilters}
                            className="flex-1 py-5"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </SheetContent >
        </Sheet >
    );
};

export default InvoiceFilters;