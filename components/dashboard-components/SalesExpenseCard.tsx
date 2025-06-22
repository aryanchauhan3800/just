'use client'

import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useGetSalesExpenseGraph } from '@/hooks/useDashboard'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import SkeletonCard from '../SkeletonCard'

const data = [
    { month: 'Jan', sales: 4800, expenses: 4000 },
    { month: 'Feb', sales: 5600, expenses: 4200 },
    { month: 'Mar', sales: 5300, expenses: 3800 },
    { month: 'Apr', sales: 6900, expenses: 3100 },
    { month: 'May', sales: 7800, expenses: 3600 },
    { month: 'Jun', sales: 10200, expenses: 4900 },
    { month: 'Jul', sales: 12750, expenses: 6400 },
    { month: 'Aug', sales: 10800, expenses: 4600 },
    { month: 'Sep', sales: 9200, expenses: 4100 },
    { month: 'Oct', sales: 9500, expenses: 4700 },
    { month: 'Nov', sales: 8400, expenses: 3700 },
    { month: 'Dec', sales: 6600, expenses: 4300 }
]

type FilterType = 'all' | 'sales' | 'expenses';

function isFilterType(value: string): value is FilterType {
    return value === 'all' || value === 'sales' || value === 'expenses';
}
const getFinancialYearDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const isBeforeApril = today.getMonth() < 3; // Jan, Feb, Mar
  
    const startYear = isBeforeApril ? year - 1 : year;
    const endYear = isBeforeApril ? year : year + 1;
  
    const startDate = new Date(startYear, 3, 1); // April 1
    const endDate = new Date(endYear, 2, 31);   // March 31
  
    return { startDate, endDate };
  };
export function SalesExpenseCard() {
    const [filter, setFilter] = useState<FilterType>('all')
    const [timeRange, setTimeRange] = useState<'year' | 'month' | 'week'>('year')
    const { startDate: defaultStart, endDate: defaultEnd } = getFinancialYearDates();
    const [startDate, setStartDate] = React.useState(defaultStart);
    const [endDate, setEndDate] = React.useState(defaultEnd);
    const { data: dashboardData, isLoading } = useGetSalesExpenseGraph({ startDate, endDate,rangeType:timeRange })
    console.log({dashboardData})
    const handleRangeChange = (value) => {
        const now = new Date();
        let newStart: Date, newEnd: Date;
    
        switch (value) {
          case "year":
            newStart = new Date(now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear(), 3, 1); // Apr 1st
            newEnd = new Date(now.getMonth() < 3 ? now.getFullYear() : now.getFullYear() + 1, 2, 31); // Mar 31st
            break;
          case "month":
            newStart = startOfMonth(now);
            newEnd = endOfMonth(now);
            break;
          case "week":
            newStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday as start of week
            newEnd = endOfWeek(now, { weekStartsOn: 1 });
            break;
          default:
            return;
        }
    
        setStartDate(newStart);
        setEndDate(newEnd);
      };
    const timeRangeText = {
        year: 'This Year',
        month: 'This Month',
        week: 'This Week'
    }

    const filteredData = dashboardData?.data?.map(d => ({
        ...d,
        sales: filter === 'expenses' ? 0 : d.sales,
        expenses: filter === 'sales' ? 0 : d.expenses
    }))

    return (
        <Card className="w-2/3 p-4 space-y-2 border-none shadow-none relative">
            <div className="flex justify-between items-start relative">
                <div>
                    <h2 className="dashboard_card_heading">Sales & Expense summary</h2>
                    <p className="dashboard_card_subheading">
                        Customize graph to study see pattern of your business
                    </p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="gap-2 text-base text-[#474747]"
                        >
                            <Calendar size={16} />
                            {timeRangeText[timeRange]}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onSelect={() => {
                            setTimeRange('year')
                            handleRangeChange('year')
                        }}>
                            This Year
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => {
                            setTimeRange('month')
                            handleRangeChange('month')

                            }}>
                            This Month
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => {
                            setTimeRange('week')
                            handleRangeChange('week')
                            }}>
                            This Week
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Tabs
                defaultValue="all"
                className="w-full"
                onValueChange={(val) => {
                    if (isFilterType(val)) {
                        setFilter(val)
                    }
                }}
            >
                <TabsList className="grid grid-cols-3 gap-2 bg-gray-50">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="expenses">Only Expense</TabsTrigger>
                    <TabsTrigger value="sales">Only Sales</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip formatter={(val: number) => `₹ ${val}`} />
                        {filter !== 'expenses' && (
                            <Area type="linear" dataKey="sales" stroke="#22c55e" fill="url(#colorSales)" />
                        )}
                        {filter !== 'sales' && (
                            <Area type="linear" dataKey="expenses" stroke="#ef4444" fill="url(#colorExpenses)" />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 mt-2 ml-2 gap-4">
                {
                    isLoading && (
                        Array.from({ length: 2 }).map((_, i) => (
                            <SkeletonCard />
                        ))
                    )
                }
                {
                    !isLoading && (
                        <>
                        <div className="text-left space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#22B947]" />
                        <span className="text-sm text-gray-500">Sales</span>
                    </div>
                    <p className="text-xl font-normal">₹ {dashboardData?.totals?.sales?.value}</p>
                    <p className="text-xs">
                        {
                            dashboardData?.totals?.sales?.change >= 0 ? (
                                <span className="text-green-600">▲ {dashboardData?.totals?.sales?.percentage}%</span>
                            ) : (
                                <span className="text-red-600">▼ {dashboardData?.totals?.sales?.percentage}%</span>
                            )
                        }  than last {timeRange}
                    </p>
                </div>
                <div className="text-left space-y-1 border-l-2 pl-6">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#F5222D]" />
                        <span className="text-sm text-gray-500">Expenses</span>
                    </div>
                    <p className="text-xl font-normal">₹ {dashboardData?.totals?.expenses?.value}</p>
                    <p className="text-xs">
                        {
                            dashboardData?.totals?.expenses?.change >= 0 ? (
                                <span className="text-green-600">▲ {dashboardData?.totals?.expenses?.percentage}%</span>
                            ) : (
                                <span className="text-red-600">▼ {dashboardData?.totals?.expenses?.percentage}%</span>
                            )
                        }  than last {timeRange}
                    </p>
                </div>
                </>
                    )
                }
            </div>
        </Card>
    )
}
