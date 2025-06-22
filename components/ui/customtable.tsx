'use client';

import React from 'react';
import { Party } from '@/types/party-types';
import { Avatar, Box, Chip, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Props {
  data: Party[];
}

const statusStyles = {
  Active: { color: '#15803D', bg: '#DCFCE7' },    // green
  Inactive: { color: '#B91C1C', bg: '#FEE2E2' },  // red
};

const Customtable: React.FC<Props> = ({ data }) => {
  return (
    <Box className="overflow-auto rounded-md border border-gray-200">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-500 uppercase border-b bg-gray-50">
          <tr>
            <th className="py-3 px-4"># Party ID</th>
            <th className="py-3 px-4">Client / Company Name</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">To Pay (₹)</th>
            <th className="py-3 px-4">To Receive (₹)</th>
            <th className="py-3 px-4">Last Activity</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((party, index) => {
            const statusStyle = statusStyles[party.status as keyof typeof statusStyles];
            return (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 font-medium text-blue-600 whitespace-nowrap">{party.partyID}</td>

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
                  <div className="font-medium">
                    {party.companyName} {party.highValue && <span title="High Value">👑</span>}
                  </div>
                </td>

                <td className="py-2 px-4">{party.type}</td>
                <td className="py-2 px-4">{party.toPay}</td>
                <td className="py-2 px-4">{party.toReceive}</td>
                <td className="py-2 px-4 whitespace-nowrap">{party.lastActivity}</td>

                <td className="py-2 px-4">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-full"
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
    </Box>
  );
};

// Utility: Get initials from company name
function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
}

// Utility: Generate color from string
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
