'use client';

import React, { useState } from 'react';
import { Party } from '@/types/party-types';
import {
  Avatar,
  Box,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Search } from 'lucide-react';
import FilterTabs from './ui/FilterTabs';
import { PartyDetailsDrawer } from '@/components/oldfile';
import FilterButtonWithMenu from './FilterButtonWithMenu';
import SortPopup from './ui/sortButton';

interface Props {
  data: Party[];
}
const statusStyles = {
  Active: { color: '#15803D', bg: '#DCFCE7' },   // Green
  Inactive: { color: '#B91C1C', bg: '#FEE2E2' }, // Red
};



const Customtable: React.FC<Props> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);

  const handleRowClick = (params: any) => {
    setSelectedParty(params.row);
    setDrawerOpen(true);
  };

const filteredData = data.filter((party) => {
  const companyName = party.companyName || '';
  const partyID = party.partyId || '';
  const type = party.type || '';

  const matchesSearch =
    companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partyID.toString().includes(searchTerm) ||
    type.toLowerCase().includes(searchTerm.toLowerCase());

    const tabTypeMap: Record<string, string> = {
  Customers: 'CUSTOMER',
  Vendors: 'VENDOR',
  Both: 'BOTH',
  'POS Customers': 'POS CUSTOMER',
};
const matchesTab =
  activeTab === 'All' || tabTypeMap[activeTab] === type.toUpperCase();

  return matchesSearch && matchesTab;
});

  const columns: GridColDef[] = [
    {
      field: 'partyId',
      headerName: '# Party ID',
      width: 120,
      renderCell: (params) => (
        <span className="text-blue-600 font-medium">{params.value}</span>
      ),
    },
    {
  field: 'name',
  headerName: 'Client / Company Name',
  flex: 1,
  minWidth: 240,
  renderCell: (params: GridRenderCellParams) => {
    const name = params.row.name || '';
    const isHighValue = params.row.highValue === true; // ✅ strict check

    return (
      <div className="flex items-center gap-2">
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: 14,
            bgcolor: stringToColor(name),
          }}
        >
          {getInitials(name)}
        </Avatar>
        <div className="text-blue-600 font-medium flex items-center gap-1">
          {name}
          {isHighValue && (
            <img src="/crown.png" alt="High Value" className="w-4 h-4" />
          )}
        </div>
      </div>
    );
  },
},




    { field: 'type', headerName: 'Type', width: 130 },


    {
  field: 'toPay',
  headerName: 'To Pay (₹)',
  width: 130,
  renderCell: (params: GridRenderCellParams) => {
    const balance = params.row.balance;
    const value = balance?.mode === 'DEBIT' ? balance?.total ?? 0 : 0;

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  },
},
{
  field: 'toReceive',
  headerName: 'To Receive (₹)',
  width: 150,
  renderCell: (params: GridRenderCellParams) => {
    const balance = params.row.balance;
    const value = balance?.mode === 'CREDIT' ? balance?.total ?? 0 : 0;

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  },
},
   

{
  field: 'isActive', // or 'status' if your data uses that key
  headerName: 'Status',
  width: 130,
  renderCell: (params: GridRenderCellParams) => {
    const isActive = Boolean(params.value);
    const status = isActive ? 'Active' : 'Inactive';
    const style = statusStyles[status];

    return (
      <span
        className="text-xs font-medium px-2 py-1 rounded inline-flex items-center gap-1"
        style={{
          backgroundColor: style.bg,
          color: style.color,
        }}
      >
        {isActive && (
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: style.color }}
          />
        )}
        {status}
      </span>
    );
  },
}



,

    {
      field: 'actions',
      headerName: '',
      width: 50,
      sortable: false,
      renderCell: () => (
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box className="overflow-auto ">
      {/* Top Bar: Search left, Filter + Sort right */}
      <div className="flex items-center justify-between mb-4 ">
        {/* Search */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by Party name..."
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
               width: '462px',
            },
            width: 260,
          }}
        />

        {/* Filter + Sort */}
        <div className="flex items-center gap-2">
          <FilterButtonWithMenu
            onApplyFilter={function (filters: {
              showActive: boolean;
              showInactive: boolean;
              highValueOnly: boolean;
              toReceive: string;
              toPay: string;
            }): void {
              throw new Error('Function not implemented.');
            }}
          />
          <SortPopup />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 w-[482px]">
       
        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
      </div>

      {/* Data Grid */}
<DataGrid
  rows={filteredData}
  columns={columns}
  getRowId={(row) => row._id || row.partyId} // ✅ specify unique identifier
  autoHeight
  disableRowSelectionOnClick
  onRowClick={handleRowClick}
  localeText={{
    noRowsLabel: 'No parties found.',
  }}
  sx={{
    border: 'none',
    fontSize: 14,
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f9fafb',
      fontWeight: 'bold',
    },
  }}
/>


      {/* Drawer */}
      {selectedParty && (
        <PartyDetailsDrawer
          open={drawerOpen}
          onOpenChangeAction={setDrawerOpen}
          party={selectedParty}
        />
      )}
    </Box>
  );
};

// Utility functions
function getInitials(name?: string) {
  if (!name) return '??'; // fallback initials
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}


function stringToColor(str: string | undefined) {
  if (!str) return '#ccc'; // fallback to gray or any default color

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
