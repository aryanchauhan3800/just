'use client'

import React, { useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { AiOutlineSwapRight } from 'react-icons/ai'

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface DateRangePickerProps {
    onRangeChange?: (range: DateRange) => void;
    initialRange?: DateRange;
    className?: string;
    disabled?: boolean;
}

const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const daysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
}

const firstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    onRangeChange,
    initialRange,
    className,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(initialRange?.startDate || null);
    const [endDate, setEndDate] = useState<Date | null>(initialRange?.endDate || null);
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

    const handleSelectDate = (date: Date): void => {
        if (!startDate || (startDate && endDate) || date < startDate) {
            setStartDate(date);
            setEndDate(null);
        } else if (date >= startDate && !endDate) {
            setEndDate(date);
            if (onRangeChange) {
                onRangeChange({ startDate: startDate, endDate: date });
            }
        }
    }

    const handleMouseEnter = (date: Date): void => {
        setHoveredDate(date);
    }

    const isInRange = (date: Date): boolean => {
        if (startDate && !endDate && hoveredDate) {
            return date >= startDate && date <= hoveredDate;
        }
        return !!startDate && !!endDate && date >= startDate && date <= endDate;
    }

    const isStartOrEnd = (date: Date): boolean => {
        return (!!startDate && date.getTime() === startDate.getTime()) ||
            (!!endDate && date.getTime() === endDate.getTime());
    }

    const goToPreviousMonth = (): void => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    }

    const goToNextMonth = (): void => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }

    const handleClear = (): void => {
        setStartDate(null);
        setEndDate(null);
        if (onRangeChange) {
            onRangeChange({ startDate: null, endDate: null });
        }
    }

    const renderCalendar = (): React.ReactNode[] => {
        const days: React.ReactNode[] = [];
        const daysCount = daysInMonth(currentYear, currentMonth);
        const firstDay = firstDayOfMonth(currentYear, currentMonth);

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
        }

        for (let i = 1; i <= daysCount; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const isSelected = isStartOrEnd(date);
            const inRange = isInRange(date);

            days.push(
                <div
                    key={i}
                    className={cn(
                        "h-8 w-8 rounded-md flex items-center justify-center text-sm",
                        {
                            "bg-primary text-primary-foreground": isSelected,
                            "bg-primary/10 hover:bg-primary/20": inRange && !isSelected,
                            "hover:bg-gray-100 cursor-pointer": !isSelected && !inRange
                        }
                    )}
                    onMouseEnter={() => handleMouseEnter(date)}
                    onClick={() => handleSelectDate(date)}
                >
                    {i}
                </div>
            );
        }

        return days;
    }

    const monthNames: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <Popover open={isOpen} onOpenChange={disabled ? undefined : setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn("justify-start font-normal h-10 px-3", className)}
                    disabled={disabled}
                >
                    <div className="w-full flex justify-between items-center text-gray-500">
                        <div>
                            {startDate ? formatDate(startDate) : "Start date"}
                        </div>
                        <div className="flex flex-row items-center">
                            <div className="mx-2"><AiOutlineSwapRight /></div>
                            {endDate ? formatDate(endDate) : "End date"}
                        </div>
                        <Calendar className="ml-2 h-4 w-4 opacity-50" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={goToPreviousMonth}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="font-medium">
                            {monthNames[currentMonth]} {currentYear}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={goToNextMonth}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                            <div key={day} className="text-xs text-center font-medium text-gray-500">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {renderCalendar()}
                    </div>
                    <div className="flex justify-end mt-4 gap-2">
                        <Button
                            variant="outline"
                            onClick={handleClear}
                        >
                            Clear
                        </Button>
                        <Button
                            onClick={() => {
                                if (startDate) setIsOpen(false);
                            }}
                            disabled={!startDate}
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default DateRangePicker;