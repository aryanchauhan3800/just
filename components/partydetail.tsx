'use client';

import React, { useState } from 'react';
import { Party } from '@/types/party-types';
import {
  Avatar,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Drawer,
  Typography,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Search } from 'lucide-react';
import FilterTabs from './ui/FilterTabs';

interface Props {
  data: Party[];
}

const statusStyles = {
  Active: { color: '#15803D', bg: '#DCFCE7' },
  Inactive: { color: '#B91C1C', bg: '#FEE2E2' },
};

const Customtable: React.FC<Props> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handlePartyClick = (party: Party) => {
    setSelectedParty(party);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedParty(null);
  };

  const filteredData = data.filter((party) => {
    const matchesSearch =
      party.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.partyId.toString().includes(searchTerm) ||
      party.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Customers' && party.type === 'Customer') ||
      (activeTab === 'Vendors' && party.type === 'Vendor') ||
      (activeTab === 'Both' && party.type === 'Both') ||
      (activeTab === 'POS Customers' && party.type === 'POS Customer');

    return matchesSearch && matchesTab;
  });

  return (
    <Box className="overflow-auto">
      {/* Search */}
      <div className="mb-4 w-[240px]">
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={14} style={{ color: '#6B7280' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '999px',
              backgroundColor: '#fff',
            },
          }}
        />
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-[#242424]">
        <thead className="text-[13px] text-[#6B6B6B] font-normal uppercase bg-white">
          <tr>
            <th className="py-2 px-3 font-normal"># Party ID</th>
            <th className="py-2 px-3 font-normal">Client / Company Name</th>
            <th className="py-2 px-3 font-normal">Type</th>
            <th className="py-2 px-3 font-normal">To Pay (₹)</th>
            <th className="py-2 px-3 font-normal">To Receive (₹)</th>
            <th className="py-2 px-3 font-normal">Last Activity</th>
            <th className="py-2 px-3 font-normal">Status</th>
            <th className="py-2 px-3 font-normal"></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((party, index) => {
            const statusStyle = statusStyles[party.status as keyof typeof statusStyles];

            return (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-blue-600 font-medium whitespace-nowrap">
                  {party.partyId}
                </td>

                <td className="py-2 px-4 flex items-center gap-2">
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: 14,
                      bgcolor: stringToColor(party.companyName),
                    }}
                  >
                    {getInitials(party.companyName)}
                  </Avatar>
                  <button
                    onClick={() => handlePartyClick(party)}
                    className="font-medium text-blue-600 flex items-center gap-1"
                    style={{ all: 'unset', cursor: 'pointer' }}
                  >
                    {party.companyName}
                    {party.highValue && (
                      <img src="/crown.png" alt="High Value" className="w-4 h-4" />
                    )}
                  </button>
                </td>

                <td className="py-2 px-4">{party.type}</td>
                <td className="py-2 px-4">{party.toPay}</td>
                <td className="py-2 px-4">{party.toReceive}</td>
                <td className="py-2 px-4 whitespace-nowrap">{party.lastActivity}</td>
                <td className="py-2 px-4">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color,
                    }}
                  >
                    {party.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Drawer */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <Box className="w-[320px] p-4" role="presentation">
          {selectedParty && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedParty.companyName}
              </Typography>
              <Divider />
              <Box className="mt-4 space-y-2 text-sm">
                <div>
                  <strong>Party ID:</strong> {selectedParty.partyId}
                </div>
                <div>
                  <strong>Type:</strong> {selectedParty.type}
                </div>
                <div>
                  <strong>Status:</strong> {selectedParty.status}
                </div>
                <div>
                  <strong>To Pay:</strong> ₹{selectedParty.toPay}
                </div>
                <div>
                  <strong>To Receive:</strong> ₹{selectedParty.toReceive}
                </div>
                <div>
                  <strong>Last Activity:</strong> {selectedParty.lastActivity}
                </div>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

// Utility: Get initials from company name
function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

// Utility: Generate consistent color from string
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}

export default Customtable;
