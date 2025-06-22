'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from '../ui/scroll-area';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import Image from 'next/image';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';

const MakePaymentTabs = () => {
    const [selectedReason, setSelectedReason] = useState("cheque")
    const [splitMethods, setSplitMethods] = useState([{ id: Date.now(), mode: '', amount: '' }])

    const addSplitMethod = () => {
        setSplitMethods((prev) => [...prev, { id: Date.now(), mode: '', amount: '' }])
    }

    const removeSplitMethod = (id) => {
        setSplitMethods(prev => prev.filter(method => method.id !== id))
    }

    const options = [
        {
            value: "cheque",
            image: "/checck.png",
            alt: "cheque",
            title: "Pay via",
            description: "Cheque"
        },
        {
            value: "cash",
            image: "/cash.png",
            alt: "cash",
            title: "Pay via",
            description: "Cash"
        },
        {
            value: "split",
            image: "/split.png",
            alt: "split",
            title: "Received as",
            description: "Split"
        },
    ]

    return (
        <div className='mt-4 h-[250px]'> {/* adjust height as needed */}
            <Tabs defaultValue="bank" className="w-full h-full flex flex-col">

                <TabsList className="gap-5 border-b pb-1 px-8 shadow-md w-full bg-white">
                    <TabsTrigger className="recievable_tab !py-5" value="bank">Bank Details</TabsTrigger>
                    <TabsTrigger className="recievable_tab !py-5" value="upi">UPI</TabsTrigger>
                    <TabsTrigger className="recievable_tab !py-5" value="cash">Cash & others</TabsTrigger>
                </TabsList>

                <TabsContent value="bank" className='border-none flex-1 overflow-hidden'>
                    <ScrollArea className="h-full px-4 pt-4">
                        <div className="text-[#474747]">
                            <p className="text-lg">Bank Details</p>
                            <p className='text-base'>Bank details of Vendor</p>
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value='upi' className='border-none flex-1 overflow-hidden'>
                    <ScrollArea className="h-full px-4 pt-4">
                        <div className="text-[#474747]">
                            <p className="text-lg">UPI</p>
                            <p className='text-base'>Instant Pay via Unified Payment Interface</p>
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value='cash' className='border-none flex-1 overflow-hidden'>
                    <ScrollArea className="h-full px-4 pt-4">
                        <div className="text-[#474747]">
                            <p className="text-lg">Cash & others</p>
                            <p className='text-base'>Pay via Cash or Cheque</p>
                        </div>

                        <div className='flex flex-row justify-between my-2'>
                            <div className='flex items-center gap-2'>
                                <BsArrowUpRightCircleFill className='text-[#F5222D] w-8 h-8 p-1 rounded-full' />
                                I paid
                            </div>
                            <div className='flex items-center gap-2'>
                                <Checkbox />
                                <Label>Full Amount settled</Label>
                            </div>
                        </div>

                        <div className='mt-4 flex flex-row justify-between'>
                            <RadioGroup
                                className="w-2/3"
                                value={selectedReason}
                                onValueChange={(val) => setSelectedReason(val)}
                            >
                                {options.map((option) => {
                                    const isSelected = selectedReason === option.value
                                    return (
                                        <div
                                            key={option.value}
                                            className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-colors duration-200 
                                                        ${isSelected ? 'bg-[#E6F7FF] border-blue-500' : 'bg-white border-gray-200'}`}
                                            onClick={() => setSelectedReason(option.value)}
                                        >
                                            <RadioGroupItem value={option.value} id={option.value} />
                                            <Image className='rounded-full' src={option.image} alt={option.alt} width={40} height={40} />
                                            <Label className="text-[#6B6B6B]" htmlFor={option.value}>
                                                {option.title}{' '}
                                                <span className='text-[#242424]'>{option.description}</span>
                                            </Label>
                                        </div>
                                    )
                                })}
                            </RadioGroup>

                            {
                                selectedReason === "split" ? (
                                    <div onClick={addSplitMethod} className='flex flex-col justify-end items-start mx-auto pb-6'>
                                        <p className='text-[#025AE0]'>+ Another Method</p>
                                    </div>
                                ) : (
                                    <div className='flex flex-col justify-center items-start'>
                                        <p className='text-sm text-[#474747] mb-1'>You Paid <span className='text-[#6B6B6B]'>(₹)</span></p>
                                        <Input placeholder='₹ Enter amount paid' />
                                    </div>
                                )
                            }
                        </div>
                        {
                            selectedReason === "split" && (
                                <div className='mt-2 space-y-4'>
                                    {splitMethods.map((method, index) => (
                                        <div key={method.id} className='flex gap-4 items-start justify-between'>
                                            <div className='flex flex-col w-full gap-2 sm:flex-row'>
                                                <div className='flex flex-col flex-1'>
                                                    <p className='text-sm text-[#474747]'>Mode:</p>
                                                    <Select defaultValue="cash">
                                                        <SelectTrigger className="w-full mt-1">
                                                            <SelectValue placeholder="Cash" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="cash">Cash</SelectItem>
                                                            <SelectItem value="upi">UPI</SelectItem>
                                                            <SelectItem value="cheque">Cheque</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className='flex flex-col flex-1'>
                                                    <p className='text-sm text-[#474747]'>Amount Paid (₹):</p>
                                                    <Input
                                                        placeholder='₹ Enter amount paid'
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type='button'
                                                onClick={() => removeSplitMethod(method.id)}
                                                className='text-red-600 text-2xl hover:text-red-800 px-2'
                                                title="Remove this method"
                                            >
                                                -
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )
                        }

                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default MakePaymentTabs
