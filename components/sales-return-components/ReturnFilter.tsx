import { Button } from '@/components/ui/button'
import {
    Checkbox, FormControl, FormControlLabel, Typography
} from '@mui/material';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ExpandMore } from '@mui/icons-material';
import React from 'react';
import { Card } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { ReturnFiltersProps, ReturnFiltersState, ShowReturnFilter } from '@/types/salesReturnTypes';
import { Badge } from '../ui/badge';
import { FiFilter } from 'react-icons/fi';

const ReturnFilters: React.FC<ReturnFiltersProps> = ({
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
        key: keyof ShowReturnFilter,
        value: boolean
    ) => {
        setFilters(prev => ({
            ...prev,
            showReturns: {
                ...prev.showReturns,
                [key]: value
            }
        }));
    };

    const handleSingleFilterChange = (
        section: keyof ReturnFiltersState,
        value: boolean | string
    ) => {
        setFilters((prev) => ({
            ...prev,
            [section]: value
        }));
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
                            <Typography className="text-base px-4">Show Sales Returns Delivery</Typography>
                            <div className="flex flex-wrap px-6">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showReturns.recieved}
                                            onChange={e => handleFilterChange('recieved', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 bg-green-100 rounded-full text-sm text-[#22B947]'>Recieved</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showReturns.pending}
                                            onChange={(e) => handleFilterChange('pending', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 bg-red-100 rounded-full text-sm text-[#F30000]'>Pending</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showReturns.draft}
                                            onChange={(e) => handleFilterChange('draft', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 bg-blue-100 rounded-full text-sm text-[#025AE0]'>Draft</Badge>}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showReturns.partiallyRecieved}
                                            onChange={(e) => handleFilterChange('partiallyRecieved', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<Badge variant="outline"
                                        className='px-3 py-1 bg-yellow-100 rounded-full text-sm text-[#FAAD14]'>Partially Recieved</Badge>}
                                />
                            </div>
                            <div className='border-t pt-2'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.showCreditNotes}
                                            onChange={(e) => handleSingleFilterChange('showCreditNotes', e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label={<span className="text-sm">Show Returns with Credit Note</span>}
                                    className="px-6"
                                />
                            </div>
                        </Card>

                        <Card className='p-2 border-0 border-b rounded-none shadow-none'>
                            <Button
                                onClick={() => toggleSection('amountWise')}
                                className="w-full bg-white hover:bg-white text-black border-none shadow-none p-0"
                            >
                                <Typography className="text-base font-medium">₹ Due Amount wise</Typography>
                                <ExpandMore className={`ml-auto transform ${expandedSections.amountWise ? 'rotate-180' : ''}`} />
                            </Button>
                            {expandedSections.amountWise && (
                                <FormControl component="fieldset" className="mt-2">
                                    <RadioGroup
                                        className='px-6 space-y-2'
                                        value={filters.amountWise}
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

                        <Card className='p-2 border-none rounded-none shadow-none'>
                            <Button
                                onClick={() => toggleSection('returnsMade')}
                                className="w-full bg-white hover:bg-white text-black border-none shadow-none p-0"
                            >
                                <Typography className="text-base font-medium">Show Invoices created</Typography>
                                <ExpandMore className={`ml-auto transform ${expandedSections.returnsMade ? 'rotate-180' : ''}`} />
                            </Button>
                            {expandedSections.returnsMade && (
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

export default ReturnFilters;
