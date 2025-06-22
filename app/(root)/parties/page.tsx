'use client';

import CustomerInfoStrip from '@/components/Customer-InfoStrip'
import { Button, buttonVariants } from '@/components/ui/button';
import { Party, StripItem, StripItem1 } from '@/types/party-types';
import { Banknote, IndianRupee, Star, Upload } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReferralBanner from '@/components/ui/referal-banner';
import CustomerWithControls from '@/components/CustomerTableWithControl';
import { useGetParty } from '@/hooks/useParty';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useGetPartyById } from '@/hooks/useParty';

type AmountRangeOption =
  | 'ALL'
  | 'LESS_THAN_9999'
  | 'BETWEEN_10000_AND_49999'
  | 'ABOVE_50000';

type PartyFiltersState = {
  status: {
    active: boolean;
    inactive: boolean;
  };
  highValueOnly: boolean;
  toReceiveAmount: AmountRangeOption;
  toPayAmount: AmountRangeOption;
};

const defaultFilters: PartyFiltersState = {
  status: {
    active: true,
    inactive: true,
  },
  highValueOnly: false,
  toReceiveAmount: 'ALL',
  toPayAmount: 'ALL',
};

const Page = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
const [InfoStripItems,setInfoStripItems] =useState<StripItem[]>([])
const { data: selectedParty, isLoading: isPartyLoading, error: partyError } = useGetPartyById(id);

if (isPartyLoading) return <div className="text-center py-10">Loading...</div>;



  const router = useRouter();
  const [filters, setFilters] = useState<PartyFiltersState>(defaultFilters);
  const {data,isLoading} = useGetParty(filters)
  const [expandedSectionsParty, setExpandedSectionsParty] = useState({
    toReceiveAmount: false,
    toPayAmount: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  console.log({data})
  const items: StripItem1[] = [
    {
      title: 'Total Receivable Outstanding',
      icon: Banknote,
      color: 'border-l-red-500',
      value: '24,00,00,000',
      profit: '0%',
      profitTitle: 'lower than last year',
    },
    {
      title: 'Purchase this month',
      icon: IndianRupee,
      color: 'border-l-yellow-500',
      value: '80,000',
      profit: '0%',
      profitTitle: 'lower than last month',
    },
    {
      title: 'Sales this month',
      icon: IndianRupee,
      color: 'border-l-yellow-500',
      value: '34',
      profit: '0%',
      profitTitle: 'lower than last month',
    },
    {
      title: 'High Value Parties',
      icon: Star,
      color: 'border-l-purple-500',
      value: '12,00,00,000',
      profit: '-0%',
      profitTitle: 'growth from last month',
    },
  ];

  const party1: Party[] = [
    {
      partyId: 'PT-0001',
      companyName: 'Ashok Srivastav',
      type: 'Vendor',
      toPay: '80,000',
      toReceive: '40,000',
      lastActivity: '12-Jan-2025',
      status: ' Active',
      highValue: true,
    },
    {
      partyId: 'PT-0002',
      companyName: 'Nidhi Enterprises',
      type: 'Customer',
      toPay: '10,000',
      toReceive: '15,000',
      lastActivity: '10-Feb-2025',
      status: 'Inactive',
      highValue: false,
    },
    {
      partyId: 'PT-0003',
      companyName: 'Prabir Joshi',
      type: 'Customer',
      toPay: '10,000',
      toReceive: '15,000',
      lastActivity: '10-Feb-2025',
      status: 'Inactive',
      highValue: true,
    },
  ];

  const handleNewInvoice = () => router.push('/parties/new-party');

  const toggleSection = (section: keyof typeof expandedSectionsParty) => {
    setExpandedSectionsParty(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const applyFilters = () => setIsFilterOpen(false);
  const cancelFilters = () => {
    setIsFilterOpen(false);
    setFilters(defaultFilters);
  };

  const filterPartyData = (query: string, item: Party) => {
    const matchesSearch =
      item.companyName.toLowerCase().includes(query.toLowerCase()) ||
      item.partyId.toLowerCase().includes(query.toLowerCase());

    const status = item.status.toLowerCase();
    const statusMatches =
      (filters.status.active && status === 'active') ||
      (filters.status.inactive && status === 'inactive');

    const highValueMatches = !filters.highValueOnly || item.highValue;

    const toReceive = parseInt(item.toReceive.replace(/,/g, ''));
    const receiveMatches = {
      LESS_THAN_9999: toReceive < 9999,
      BETWEEN_10000_AND_49999: toReceive >= 10000 && toReceive <= 49999,
      ABOVE_50000: toReceive > 50000,
      ALL: true,
    }[filters.toReceiveAmount];

    const toPay = parseInt(item.toPay.replace(/,/g, ''));
    const payMatches = {
      LESS_THAN_9999: toPay < 9999,
      BETWEEN_10000_AND_49999: toPay >= 10000 && toPay <= 49999,
      ABOVE_50000: toPay > 50000,
      ALL: true,
    }[filters.toPayAmount];

    return (
      matchesSearch &&
      statusMatches &&
      highValueMatches &&
      receiveMatches &&
      payMatches
    );
  };

  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 md:px-8 py-6 space-y-6 bg-white">
      <ReferralBanner />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-[#474747] mb-2 sm:mb-0">Party</h1>
        <div className="flex gap-3">
          <Link href={'/parties/bulk-import'} className={cn(buttonVariants({variant:'outline'}),"h-9 text-sm px-4 rounded")}>
            <Upload className="size-4 mr-2" />
            Bulk Addition
          </Link>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded h-[35px]"
            onClick={handleNewInvoice}
          >
            <span className="text-xl  mr-1">+</span> New Party
          </Button>
        </div>
      </div>

      {/* Info Strip */}
      <div className="w-full overflow-x-auto -mt-4">
        <CustomerInfoStrip items={items} />
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-auto">
       
       
       <CustomerWithControls data={data?.docs || []} />

      </div>
    </div>
  );
};

export default Page;
