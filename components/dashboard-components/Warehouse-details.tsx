'use client';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Tabs, Tab } from '@mui/material';
import { Download, Plus } from 'lucide-react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import ActionCell from "../Action-warehouse"
const inventoryData = [
  {
    id: 1,
    batchId: 'BT-00011',
    item: 'Dabur Chawanprash',
    iconColor: 'red',
    hsn: '887228',
    stock: 18,
    status: 'Full In Stock',
    statusColor: 'green',
    expiryDate: '24-3-2026',
    expiryStatus: 'Fresh',
    warehouse: 'Pratapgarh',
    mfgDate: '24-3-2026',
    addedOn: '24-3-2026',
    vendor: 'Ashok Srivastav',
    vendorInitials: 'AS',
    vendorColor: 'red',
  },
  {
    id: 2,
    batchId: 'BT-00018',
    item: 'Dabur Chawanprash',
    iconColor: 'red',
    hsn: '887228',
    stock: 12,
    status: 'Low Stock',
    statusColor: 'yellow',
    expiryDate: '24-3-2026',
    expiryStatus: 'Fresh',
    warehouse: 'Pratapgarh',
    mfgDate: '24-3-2026',
    addedOn: '24-3-2026',
    vendor: 'Ashok Srivastav',
    vendorInitials: 'AS',
    vendorColor: 'red',
  },
  {
    id: 3,
    batchId: '--',
    item: 'Just Office Cleaning',
    iconColor: 'blue',
    hsn: '887552',
    stock: '--',
    status: '',
    expiryDate: '--',
    expiryStatus: '--',
    warehouse: 'Pratapgarh',
    mfgDate: '--',
    addedOn: '10-10-2026',
    vendor: '--',
    vendorInitials: '',
    vendorColor: 'gray',
  },
  {
    id: 4,
    batchId: '--',
    item: 'Paper Stamping',
    iconColor: 'orange',
    hsn: '665889',
    stock: '--',
    status: '',
    expiryDate: '--',
    expiryStatus: '--',
    warehouse: 'Pratapgarh',
    mfgDate: '--',
    addedOn: '24-3-2026',
    vendor: '--',
    vendorInitials: '',
    vendorColor: 'gray',
  },
  {
    id: 5,
    batchId: 'BT-00008',
    item: 'Britannia Marie',
    iconColor: 'yellow',
    hsn: '785426',
    stock: 20,
    status: 'Low Stock',
    statusColor: 'yellow',
    expiryDate: '--',
    expiryStatus: '--',
    warehouse: 'Pratapgarh',
    mfgDate: '24-12-2026',
    addedOn: '24-12-2026',
    vendor: 'Tapas Singh',
    vendorInitials: 'TS',
    vendorColor: 'blue',
  },
  {
    id: 6,
    batchId: 'BT-00014',
    item: 'Britannia Marie',
    iconColor: 'yellow',
    hsn: '542225',
    stock: 20,
    status: 'Out of Stock',
    statusColor: 'red',
    expiryDate: '24-3-2026',
    expiryStatus: 'Expired',
    warehouse: 'Pratapgarh',
    mfgDate: '24-3-2026',
    addedOn: '24-3-2026',
    vendor: 'Agniva Mitra',
    vendorInitials: 'AM',
    vendorColor: 'amber',
  },
  {
    id: 7,
    batchId: 'BT-00012',
    item: 'Amul Malai Paneer',
    iconColor: 'green',
    hsn: '542225',
    stock: 20,
    status: 'Low Stock',
    statusColor: 'yellow',
    expiryDate: '24-3-2026',
    expiryStatus: 'Soon to Expire',
    warehouse: 'Pratapgarh',
    mfgDate: '24-3-2026',
    addedOn: '24-3-2026',
    vendor: 'Agniva Mitra',
    vendorInitials: 'AM',
    vendorColor: 'amber',
  },
];

const getStatusChip = (status, color) => {
  if (!status) return '--';
  const bg =
    color === 'green'
      ? 'bg-green-100 text-green-600'
      : color === 'yellow'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-red-100 text-red-600';
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${bg}`}>
      {status}
    </span>
  );
};

const columns = [
  { field: 'batchId', headerName: 'Batch ID', width: 120 },
  {
    field: 'item',
    headerName: 'Item / Service',
    width: 200,
    renderCell: (params) => {
      const row = params.row;
      return (
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold`}
            style={{ backgroundColor: row.iconColor }}
          >
            {row.item[0]}
          </div>
          <span className="text-blue-600 font-medium">{row.item}</span>
        </div>
      );
    },
  },
  { field: 'hsn', headerName: 'HSN / SAC', width: 110 },
  { field: 'stock', headerName: 'Stock', width: 80 },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: (params) => getStatusChip(params.value, params.row.statusColor),
  },
  { field: 'expiryDate', headerName: 'Expiry Date', width: 120 },
  { field: 'expiryStatus', headerName: 'Expiry Status', width: 150 },
  { field: 'warehouse', headerName: 'Storage Warehouse', width: 160 },
  { field: 'mfgDate', headerName: 'Manufacturing Date', width: 160 },
  { field: 'addedOn', headerName: 'Added On', width: 120 },
  {
    field: 'vendor',
    headerName: 'Vendor',
    width: 160,
    renderCell: (params) => {
      const row = params.row;
      return row.vendor === '--' ? (
        '--'
      ) : (
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold`}
            style={{ backgroundColor: row.vendorColor }}
          >
            {row.vendorInitials}
          </div>
          <span>{row.vendor}</span>
        </div>
      );
    },
  },

{
  field: 'actions',
  headerName: '',
  width: 60,
  sortable: false,
  renderCell: (params) => <ActionCell row={params.row} />
}

];

export default function WarehouseInventory() {
  const [tab, setTab] = React.useState(0);

  return (
    <div className="bg-white border rounded-lg shadow-sm mt-4 min-w-[750px] overflow-hidden">
      <Tabs value={tab} onChange={(e, v) => setTab(v)} className=" border-b"   sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
        <Tab label="Inventory" />
        <Tab label="Employees" />
      </Tabs>

      <div className="p-4 flex justify-between items-center">
        <h2 className="text-sm text-gray-800 font-medium">Items in this warehouse</h2>
        <div className="flex gap-2">
          <button className="border px-3 py-1 rounded text-sm flex items-center gap-2 text-gray-600">
            <Download size={16} /> Download PDF
          </button>
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-2">
            <Plus size={16} /> New Batch
          </button>
        </div>
      </div>

      <div style={{ height: 500, width: '100%' }} className="overflow-x-auto px-4 pb-4">
<DataGrid
  rows={inventoryData}
  columns={columns}
  initialState={{
    pagination: {
      paginationModel: { pageSize: 10, page: 0 },
    },
  }}
  pageSizeOptions={[5, 10]}
  disableRowSelectionOnClick
  sx={{
    border: 'none',
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f9fafb',
      fontWeight: 'bold',
      fontSize: '13px',
    },
    '& .MuiDataGrid-cell': {
      fontSize: '13px',
    },
  }}
/>

      </div>
    </div>
  );
}
