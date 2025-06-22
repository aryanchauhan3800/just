'use client';

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from 'cmdk';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SearchableInputProps<T> {
  data: T[];
  value: string;
  onSelect: (item: T) => void;
  displayKey: keyof T;
  valueKey?: keyof T;
  placeholder?: string;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
}

export default function SearchableInput<T>({
  data,
  value,
  onSelect,
  displayKey,
  valueKey,
  placeholder = 'Search...',
  LeftIcon,
  RightIcon,
}: SearchableInputProps<T>) {
  // Find initial display value from data
  const getDisplayValue = () => {
    if (!value) return '';
    const item = data.find(item => 
      String(valueKey ? item[valueKey] : item) === value
    );
    return item ? String(item[displayKey]) : '';
  };

  const [search, setSearch] = useState(getDisplayValue());
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync display value when value/data changes
  useEffect(() => {
    setSearch(getDisplayValue());
  }, [value, data]);

  // Filter logic
  const filtered = data.filter(item =>
    String(item[displayKey]).toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="flex items-center border rounded-md overflow-hidden shadow-sm bg-white">
        {LeftIcon && <div className="px-3 text-gray-400">{LeftIcon}</div>}

        <Command className="w-full">
          <CommandInput
            value={search}
            onValueChange={(val) => {
              setSearch(val);
              setIsOpen(true);
            }}
            onInput={(event) => {
              console.log(event)
            }} // Dummy handler to satisfy React
            placeholder={placeholder}
            className="w-full border-0 focus:outline-none py-2 px-2"
          />
          
          {isOpen && (
            <CommandList className="absolute w-full bg-white border mt-1 z-50 shadow-lg rounded-md max-h-60 overflow-auto top-full">
              {filtered.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                filtered.map((item, index) => (
                  <CommandItem
                    key={String(valueKey ? item[valueKey] : index)}
                    onSelect={() => {
                      setSearch(String(item[displayKey]));
                      setIsOpen(false);
                      onSelect(item);
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {String(item[displayKey])}
                  </CommandItem>
                ))
              )}
            </CommandList>
          )}
        </Command>

        {RightIcon && <div className="px-3 text-gray-400 cursor-pointer">{RightIcon}</div>}
      </div>
    </div>
  );
}