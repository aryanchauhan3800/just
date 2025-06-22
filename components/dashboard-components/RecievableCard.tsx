import React from 'react'
import { Card } from '../ui/card'
import Customtable from '../Customtable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, ChevronsLeft, CircleAlert, History } from 'lucide-react'

const RecievableCard = () => {
    const recievableData = [
        { name: 'Ashok Srivastav', invoice: 'INV-000100', invoiceAmount: '80,000', dueAmount: '24,000', dueDate: '12-Apr-2025', avatarInitial: 'A', avatarColor: '#ff4b4b' },
        { name: 'Akansha Mishra', invoice: 'INV-000100', invoiceAmount: '80,000', dueAmount: '24,000', dueDate: '12-Apr-2025', avatarInitial: 'A', avatarColor: '#4b9eff' },
        { name: 'Balwant Singh Joshi', invoice: 'INV-000100', invoiceAmount: '80,000', dueAmount: '24,000', dueDate: '12-Apr-2025', avatarInitial: 'B', avatarColor: '#ffb52e' },
        { name: 'Prabir Joshi', invoice: 'INV-000100', invoiceAmount: '80,000', dueAmount: '24,000', dueDate: '12-Apr-2025', avatarInitial: 'P', avatarColor: '#ff8b4b' },
    ];

    return (
        <Card className="w-full p-4 border-none shadow-none">
            <Tabs defaultValue="invoices" className="w-full">
                <div className='flex flex-row justify-between items-end border-b-1 pb-2'>
                    <div>
                        <h1 className="dashboard_card_heading">Total Recievables</h1>
                        <p className="dashboard_card_subheading">A summary of the income on track from clients</p>
                    </div>
                    <div className='flex flex-row items-center gap-8'>
                        <TabsList className="bg-transparent gap-4">
                            <TabsTrigger className="recievable_tab" value="invoices">Invoices</TabsTrigger>
                            <TabsTrigger className="recievable_tab" value="quotes">Quotes</TabsTrigger>
                            <TabsTrigger className="recievable_tab" value="challans">Challans</TabsTrigger>
                            <TabsTrigger className="recievable_tab" value="purchase">Purchase</TabsTrigger>
                            <TabsTrigger className="recievable_tab" value="sales">Sales</TabsTrigger>
                        </TabsList>
                        <span className="view_all_btn">View all <ChevronRight className='h-4 w-4' /></span>
                    </div>
                </div>
                <div className='flex flex-row items-start'>

                    <div className='w-3/4'>
                        <TabsContent value="invoices" className='mt-2'>
                            <Customtable
                                tableType="dashboard"
                                mainColumn="Client / Company"
                                columns={['Invoice', 'Invoice Amount', 'Due Amount', 'Due Date']}
                                data={recievableData}
                            />
                        </TabsContent>
                        <TabsContent value="quotes">Change your password here.</TabsContent>
                    </div>

                    <div className='w-1/4 mt-4 pl-6'>
                        <div className='flex flex-col gap-2 mb-6'>
                            <span className='text-base text-green-500 flex items-center'>
                                <ChevronsLeft className="w-4 h-4 -rotate-145" />
                                Total Recievable</span>
                            <span className='text-2xl'>₹ 4200000</span>
                        </div>
                        <div className='flex flex-col gap-2 mb-6'>
                            <span className='flex flex-row items-center gap-2 text-blue-500 text-sm'>
                                <CircleAlert className='h-4 w-4' />
                                Order on Track
                            </span>
                            <span className='text-base'>₹ 1200000</span>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-col gap-2'>
                                <span className='pl-2 border-l-2 border-[#FAAD14] text-[#FAAD14] text-sm mb-6'>
                                    <History className='w-3 h-3' />
                                    Pending Invoice
                                </span>
                                <span className='text-lg'>₹ 3000000</span>
                            </div>

                            <div className="w-px h-24 bg-gray-300 mx-4" />

                            <div className='flex flex-col gap-2'>
                                <span className='pl-2 border-l-2 border-[#F5222D] text-[#F5222D] text-sm mb-6'>
                                    <CircleAlert className='h-3 w-3' />
                                    Overdue Invoice
                                </span>
                                <span className='text-lg'>₹ 1200000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Tabs>
        </Card>
    )
}

export default RecievableCard