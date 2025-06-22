'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '../ui/button'
import { Calendar, ChevronRight } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { useGetExpensePieChart } from '@/hooks/useDashboard'

const data = [
    { name: 'IT & Internet Expenses', value: 5200, color: '#00C49F' },
    { name: 'Meal & Entertainment', value: 8100, color: '#FFBB28' },
    { name: 'Labour Charges', value: 3500, color: '#FF4C4C' },
    { name: 'Others', value: 4000, color: '#9F2BFF' },
]
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
const ExpenseCategoryCard = () => {
    const [isMounted, setIsMounted] = useState(false)
    const [timeRange, setTimeRange] = useState<'year' | 'month' | 'week'>('year')
    const { startDate: defaultStart, endDate: defaultEnd } = getFinancialYearDates();
    const [startDate, setStartDate] = React.useState(defaultStart);
    const [endDate, setEndDate] = React.useState(defaultEnd);
    const { data: dashboardData, isLoading } = useGetExpensePieChart({ startDate, endDate,rangeType:timeRange })
    
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

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <Card className="w-full md:w-1/3 p-4 space-y-4 border-none shadow-none">
            <div className="flex justify-between items-center">
                <h2 className="dashboard_card_heading">Expense Categories</h2>
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

            <div className="flex flex-col items-center">
                {(isMounted && dashboardData?.data) ? (
                    <ResponsiveContainer width={250} height={250}>
                        <PieChart>
                            <Pie
                                data={dashboardData?.data}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={110}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="w-[250px] h-[250px] flex items-center justify-center rounded-full">
                        <div className="w-28 h-28 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
                    </div>
                )}
            </div>

            <div className="space-y-2 text-sm">
                {dashboardData && dashboardData?.data?.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className='text-gray-500'>{item.name}</span>
                        </div>
                        <span>₹ {item.value}</span>
                    </div>
                ))}

                <div className="flex justify-between items-center text-gray-500 cursor-pointer mt-8">
                    {dashboardData?.data && <span className="flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: dashboardData?.data?.[3].color }}
                        />
                        Others...
                    </span>}
                    <span className="view_all_btn">View all <ChevronRight className='h-4 w-4' /></span>
                </div>
            </div>
        </Card>
    )
}

export default ExpenseCategoryCard