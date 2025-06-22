
"use client"
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { DeliverChallans, ItemwiseReport, LedgerStatement, Quotations1, Transactions } from "@/types/party-types";
import { GridFilterModel, GridValidRowModel } from "@mui/x-data-grid";
import { AppColumn, GenericDataGrid } from "./dataGridTable";
import { ArrowDownUp, CalendarDays, ChevronDown, CrownIcon, DropletIcon } from "lucide-react";
import { IoMdShare } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { Input } from "../ui/input";
import { TbDownload } from "react-icons/tb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { InputBase } from "@mui/material";
import { BiSort } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { MdCurrencyRupee } from "react-icons/md";

type AccountSummaryView = "Transaction" |"Quotations"| "DeliveryChallan"| "LedgerStatement" | "ItemwiseReport";


const options :{title:string; value:AccountSummaryView} [] =[

    { title: "Transaction", value: "Transaction" },
	{ title: "Quotations", value: "Quotations" },
	{ title: "Delivery Challan", value:"DeliveryChallan"  },
{ title: "Ledger Statement", value: "LedgerStatement" },
	{ title: "Item wise Report", value:"ItemwiseReport"  },

    
]


interface AccountSummaryViewProps{}

const AccountSummarySwitch: FC<AccountSummaryViewProps> = ({})=>{
    const [selectedView,setSelectedView] = useState<AccountSummaryView>("Transaction");
    return(



		
        <div className="space-y-6">


			
			{/* options */}
			<div
				style={{
					boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
				}}
				className="flex px-6"
			>
				{options.map((option, i) => (
					<Button
						key={i}
className={cn(
  "h-full  text-sm sm:text-base shadow-none border-0 border-b-2 rounded-none px-3 sm:px-5 py-1 font-normal whitespace-nowrap  ",
  option.value === selectedView
    ? "border-b-brand text-brand hover:text-brand"
    : "border-transparent text-[#474747] hover:text-[#474747]"
)}

						variant={"ghost"}
						onClick={() => setSelectedView(option.value)}
					>
						{option.title}
					</Button>
				))}
			</div>

			{/* Rendering */}
			<div className="">
				{selectedView === "Transaction" && <Transaction/>}
				{selectedView === "Quotations" && <Quotations/>}
				{selectedView === "DeliveryChallan" && <DeliveryChallans1/>}
				{selectedView === "LedgerStatement" && <LedgerStatementComponent/>}
				{selectedView === "ItemwiseReport" && <ItemwiseReport1/>}

			</div>
			rege
		</div>
    )


    
};

export default AccountSummarySwitch;

 function Transaction() {
  const [search, setSearch] = useState<string>("");
  const [tableRows, setTableRows] = useState<Transactions[]>([
    {
      Docno: "INV-000100",
      DocType: "Sales Invoice",
      Createdon: "12-Jan-2025",
      Amount: "+80,000",
      status: "Overdue",
    },
    {
      Docno: "INV-000101",
      DocType: "Sales Invoice",
      Createdon: "12-Jan-2025",
      Amount: "+80,000",
      status: "Overdue",
    },
    {
      Docno: "INV-000102",
      DocType: "Sales Invoice",
      Createdon: "12-Jan-2025",
      Amount: "+80,000",
      status: "Overdue",
    },
    {
      Docno: "INV-000103",
      DocType: "Sales Invoice",
      Createdon: "12-Jan-2025",
      Amount: "+80,000",
      status: "Overdue",
    },
    {
      Docno: "INV-000104",
      DocType: "Sales Invoice",
      Createdon: "12-Jan-2025",
      Amount: "+80,000",
      status: "Overdue",
    },
  ]);

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
 const [searchQuery, setSearchQuery] = useState<string>("");
  const columns: AppColumn<Transactions>[] = [
    {
      field: "Docno",
      headerName: "# Docno",
      hideSortIcons: true,
      minWidth: 240,
      flex: 1.5,
      headerClassName: "text-[#6B6B6B] text-sm",
      renderCell({ row }) {
        return (
          <div className="h-full w-full flex items-center justify-start">
            <div className="flex gap-x-2 items-center">
              <span className="text-sm text-brand">{row.Docno}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "DocType",
      headerName: "Doc Type",
      hideSortIcons: true,
      flex: 1,
      headerClassName: "text-[#6B6B6B] text-sm",
      cellClassName: "text-[#242424] text-sm",
    },
    {
      field: "Createdon",
      headerName: "Created on",
      hideSortIcons: true,
      flex: 1,
      headerClassName: "text-[#6B6B6B] text-sm",
      cellClassName: "text-[#242424] text-sm",
    },
    {
      field: "Amount",
      headerName: "Amount",
      hideSortIcons: true,
      flex: 1,
      headerClassName: "text-[#6B6B6B] text-sm",
      cellClassName: "text-[#242424] text-sm",
    },
    {
      field: "status",
      headerName: "Status",
      hideSortIcons: true,
      flex: 1,
      headerClassName: "text-[#6B6B6B] text-sm",
      renderCell: (params: any) => {
        const status = params.value;
        const statusStyles: Record<string, string> = {
          Overdue: "bg-red-100 text-red-600",
          Due: "bg-yellow-100 text-yellow-600",
          "Partially Paid": "bg-yellow-100 text-yellow-600",
          Paid: "bg-green-100 text-green-600",
          Draft: "bg-blue-100 text-blue-600",
        };
        return (
          <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusStyles[status] || "bg-white text-gray-600"}`}>
            {status}
          </span>
        );
      },
    },
{
  field: "actions" as any,
  headerName: "",
  hideSortIcons: true,
  flex: 0.3,
  headerClassName: "text-[#6B6B6B] text-sm",
  renderCell: () => {
    return (
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <button className="text-xl text-gray-600 rounded-full border-1 p-1 hover:text-black bg-white">
            <BsThreeDotsVertical className="text-gray-400" />
          </button>
        </DropdownMenuTrigger>
     <DropdownMenuContent className="w-56 bg-white p-0 rounded-md shadow-lg border border-gray-200">
  {/* Title */}
  <div className="text-xs text-gray-500 px-4 py-2">Sort Docs</div>

  {/* Divider line */}
  <div className="border-t border-gray-200" />

  {/* Items */}
  <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <CalendarDays className="w-4 h-4" />
    Upcoming Due Dates
  </DropdownMenuItem>

  <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
    ₹ Amount - High to low
  </DropdownMenuItem>

  <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <ArrowDownUp className="w-4 h-4" />
    Date Created - Oldest to latest
  </DropdownMenuItem>
</DropdownMenuContent>

      </DropdownMenu>
    );
  },
},

  ];

  return (
    <div className="flex flex-col gap-y-6">
      {/* Top bar */}
      <div className="flex justify-between items-center">
 	  <InputBase
			 placeholder="Search by invoice number..."
			 value={searchQuery}
			 onChange={(e) => {
			   setSearchQuery(e.target.value);
			   width:320
			 }}
			 startAdornment={<FiSearch className='mx-1 h-3.5 w-3.5 text-gray-500' />}
			 sx={{ px: 1, py: 0.5, border: '1px solid #E5E7EB', borderRadius: 6, width: 320, fontStyle: 'italic' }}
		   />

        {/* Action buttons */}
        <div className="flex items-center gap-x-3 pr-3">
          <Button variant="outline" className="text-[#474747] text-base">
            <IoMdShare />
            Share
          </Button>
          <Button variant="outline" className="text-[#474747] text-base">
            <TbDownload />
            Download Report
          </Button>


	     
            
         <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="text-[#474747] text-base font-medium flex items-center gap-1">
      <BiSort className="w-4 h-5" />
      Sort
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent className="w-56 bg-white p-0 z-30 rounded-md shadow-lg border border-gray-200">
    {/* Title */}
    <div className="text-xs text-gray-500 px-4 py-2">Sort Docs</div>

    {/* Divider */}
    <div className="border-t border-gray-200" />

    {/* Items */}
    <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
      <CalendarDays className="w-4 h-4" />
      Upcoming Due Dates
    </DropdownMenuItem>

    <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
      ₹ Amount - High to low
    </DropdownMenuItem>

    <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
      <ArrowDownUp className="w-4 h-4" />
      Date Created - Oldest to latest
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
         
        </div>
      </div>



      {/* Data Grid */}
      <div className="overflow-x-auto">
        <GenericDataGrid<Transactions>
          columns={columns}
          getRowIdAction={(row) => row.Docno}
          rows={tableRows}
          customRowCount={6}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
        />
      </div>
    </div>
  );
}

function Quotations(){
	const [search,setSearch] = useState<string>("");
	const [tableRows ,setTableRows] = useState<Quotations1[]>([
		{
			QuationId:"QT-000100",
			Createdon:"12-Jan-2025",
			QouteAmount:"80,000",
			DueDate:"12-Apr-2025",
			Status:"Overdue"
		},

		{
			QuationId:"QT-000100",
			Createdon:"12-Jan-2025",
			QouteAmount:"80,000",
			DueDate:"12-Apr-2025",
			Status:"Overdue"
		},
		{
			QuationId:"QT-000100",
			Createdon:"12-Jan-2025",
			QouteAmount:"80,000",
			DueDate:"12-Apr-2025",
			Status:"Overdue"
		},
		{
			QuationId:"QT-000100",
			Createdon:"12-Jan-2025",
			QouteAmount:"80,000",
			DueDate:"12-Apr-2025",
			Status:"Overdue"
		},
		{
			QuationId:"QT-000100",
			Createdon:"12-Jan-2025",
			QouteAmount:"80,000",
			DueDate:"12-Apr-2025",
			Status:"Overdue"
		},
		{
			QuationId:"QT-000100",
			Createdon:"12-Jan-2025",
			QouteAmount:"80,000",
			DueDate:"12-Apr-2025",
			Status:"Overdue"
		}
	])
	const [filterModel,setFilterModel]=useState<GridFilterModel>({
		items:[]
	});

	const columns: AppColumn<Quotations1>[]=[

		{
			field: "QuationId",
			headerName: "Quation Id",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#2563EB] text-sm",
		},
		{
			field: "Createdon",
			headerName: "Created on",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",

		},
		{
			field: "QouteAmount",
			headerName: "Qoute Amount",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",

		},
		{
			field: "DueDate",
			headerName: "Due Date",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",

		},
		{
  field: "Status",
  headerName: "Status",
  hideSortIcons: true,
  flex: 1,
  headerClassName: "text-[#6B6B6B] text-sm",
  renderCell: (params: any) => {
    const status = params.value;

    const statusStyles: Record<string, string> = {
      Overdue: "bg-red-100 text-red-600",
      Due: "bg-yellow-100 text-yellow-600",
      "Partially Paid": "bg-yellow-100 text-yellow-600",
      Paid: "bg-green-100 text-green-600",
      Draft: "bg-blue-100 text-blue-600",
    };

    return (
      <span
        className={`text-sm px-3 py-1 rounded-full font-medium ${statusStyles[status] || "bg-gray-100 text-brand"}`}
      >
        {status}
      </span>
    );
  },
},
{
  field: "actions" as any,
  headerName: "",
  hideSortIcons: true,
  flex: 0.3,
  headerClassName: "text-[#6B6B6B] text-sm",
  renderCell: () => {
    return (
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <button className="text-xl text-gray-600 rounded-full border-1 p-1 hover:text-black bg-white">
            <BsThreeDotsVertical className="text-gray-400" />
          </button>
        </DropdownMenuTrigger>
     <DropdownMenuContent className="w-56 bg-white p-0 rounded-md shadow-lg border border-gray-200">
  {/* Title */}
  <div className="text-xs text-gray-500 px-4 py-2">Sort Docs</div>

  {/* Divider line */}
  <div className="border-t border-gray-200" />

  {/* Items */}
  <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <CalendarDays className="w-4 h-4" />
    Upcoming Due Dates
  </DropdownMenuItem>

  <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
    ₹ Amount - High to low
  </DropdownMenuItem>

  <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <ArrowDownUp className="w-4 h-4" />
    Date Created - Oldest to latest
  </DropdownMenuItem>
</DropdownMenuContent>

      </DropdownMenu>
    );
  },
},


		
	]






return (
		<div className="flex flex-col gap-y-6">
			<div className="flex justify-between items-center">
	
				<div className="flex items-center    px-3 py-2 ">
					<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-[#474747] text-base rounded ">
          <CalendarDays className="mr-2 h-4 w-4" />
          Last 365 Days <span> <ChevronDown /></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuItem>Today</DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
					
				</div>
				{/* btns */}
				<div className="flex items-center gap-x-3  ">
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<IoMdShare />
						Share
					</Button>
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<TbDownload />
						Download Report
					</Button>
				</div>
			</div>
			{/* data grid */}
			<div className="overflow-x-auto">
				<GenericDataGrid<Quotations1>
					columns={columns}
					getRowIdAction={(row) => row.QuationId}
					rows={tableRows}
					customRowCount={6}
					filterModel={filterModel}
					onFilterModelChange={setFilterModel}
				/>
			</div>
		</div>
	);
}

function DeliveryChallans1() {
  const [search, setSearch] = useState<string>("");
  const [tableRows, setTableRows] = useState<DeliverChallans[]>([
    {
      ChallanNumber: "CH-000100",
      ValueofGoods: "80,000",
      Createdon: "12-Jan-2025",
      ChallanType: "Transfer of Goods",
      status: "Delivered",
    },
    {
      ChallanNumber: "CH-000101",
      ValueofGoods: "60,000",
      Createdon: "13-Jan-2025",
      ChallanType: "Return",
      status: "Draft",
    },
    {
      ChallanNumber: "CH-000102",
      ValueofGoods: "75,000",
      Createdon: "14-Jan-2025",
      ChallanType: "Transfer of Goods",
      status: "Delivered",
    },
    {
      ChallanNumber: "CH-000103",
      ValueofGoods: "40,000",
      Createdon: "15-Jan-2025",
      ChallanType: "Transfer of Goods",
      status: "Draft",
    },
    {
      ChallanNumber: "CH-000104",
      ValueofGoods: "90,000",
      Createdon: "16-Jan-2025",
      ChallanType: "Transfer of Goods",
      status: "Delivered",
    },
  ]);

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const columns:AppColumn<DeliverChallans>[] = [
    {
      field: "ChallanNumber",
      headerName: "# Challan Number",
      hideSortIcons: true,
      flex: 1,
      headerClassName: "text-[#6B6B6B] text-sm",
	  cellClassName: "text-[#025AE0] text-sm",
     
    },
    {
      field: "ValueofGoods",
      headerName: "Value of Goods",
      hideSortIcons: true,
      flex: 1,
      headerClassName: "text-[#6B6B6B] text-sm",
      cellClassName: "text-[#242424] text-sm",
    },
    {
      field: "Createdon",
      headerName: "Created On",
      hideSortIcons: true,
      flex: 1,
      headerClassName: "text-[#6B6B6B] text-sm",
      cellClassName: "text-[#242424] text-sm",
    },
    {
      field: "ChallanType",
      headerName: "Challan Type",

      hideSortIcons: true,
      flex: 1,
      headerClassName: "text-[#6B6B6B] text-sm",
      cellClassName: "text-[#242424] text-sm",
    },
    {
      field: "status",
      headerName: "Status",
      hideSortIcons: true,
      flex: 1,
      headerClassName: "text-[#6B6B6B] text-sm",
      renderCell: (params: any) => {
        const status = params.value;

        const statusStyles: Record<string, string> = {
          Delivered: "bg-green-100 text-green-600",
          Draft: "bg-blue-100 text-blue-600",
        };

        return (
          <span
            className={`text-sm px-3 py-1 rounded-full font-medium ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}
          >
            {status}
          </span>
        );
      },
    },

{
  field: "actions" as any,
  headerName: "",
  hideSortIcons: true,
  flex: 0.3,
  headerClassName: "text-[#6B6B6B] text-sm",
  renderCell: () => {
    return (
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <button className="text-xl text-gray-600 rounded-full border-1 p-1 hover:text-black bg-white">
            <BsThreeDotsVertical className="text-gray-400" />
          </button>
        </DropdownMenuTrigger>
     <DropdownMenuContent className="w-56 bg-white p-0 rounded-md shadow-lg border border-gray-200">
  {/* Title */}
  <div className="text-xs text-gray-500 px-4 py-2">Sort Docs</div>

  {/* Divider line */}
  <div className="border-t border-gray-200" />

  {/* Items */}
  <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <CalendarDays className="w-4 h-4" />
    Upcoming Due Dates
  </DropdownMenuItem>

  <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
    ₹ Amount - High to low
  </DropdownMenuItem>

  <DropdownMenuItem className="flex gap-2 items-center text-sm text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <ArrowDownUp className="w-4 h-4" />
    Date Created - Oldest to latest
  </DropdownMenuItem>
</DropdownMenuContent>

      </DropdownMenu>
    );
  },
},






  ];

  	return (
		<div className="flex flex-col gap-y-6">
			<div className="flex justify-between items-center">
	
				<div className="flex items-center    px-3 py-2 ">
					<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-[#474747] text-base rounded ">
          <CalendarDays className="mr-2 h-4 w-4" />
          Last 365 Days <span> <ChevronDown /></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuItem>Today</DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
					
				</div>
				{/* btns */}
				<div className="flex items-center gap-x-3  ">
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<IoMdShare />
						Share
					</Button>
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<TbDownload />
						Download Report
					</Button>
				</div>
			</div>
			{/* data grid */}
			<div className="overflow-x-auto">
				<GenericDataGrid<DeliverChallans>
					columns={columns}
					getRowIdAction={(row) => row.ChallanNumber}
					rows={tableRows}
					customRowCount={6}
					filterModel={filterModel}
					onFilterModelChange={setFilterModel}
				/>
			</div>
		</div>
	);
}

function LedgerStatementComponent() {
  const [search, setSearch] = useState<string>("");
  const [tableRows, setTableRows] = useState<LedgerStatement[]>([
    {
      id: 1,
      date: "12-Jan-2025",
      Slno: "1",
      Voucher: "Opening Balance",
      DebitAmount: 434,
      CreditAmount: 434,
      TDSbyParty: "--",
      TDSbySelf: "--",
      Balance: " 678",
    },
    {
      id: 2,
      date: "12-Jan-2025",
      Slno: "2",
      Voucher: "Opening Balance",
      DebitAmount: 34,
      CreditAmount: 344,
      TDSbyParty: "--",
      TDSbySelf: "--",
      Balance: "67",
    },
    {
      id: 3,
      date: "12-Jan-2025",
      Slno: "3",
      Voucher: "Opening Balance",
      DebitAmount: 344,
      CreditAmount: 555,
      TDSbyParty: "--",
      TDSbySelf: "--",
      Balance: "2872 ",
    },
    {
      id: 4,
      date: "12-Jan-2025",
      Slno: "4",
      Voucher: "Opening Balance",
      DebitAmount: 1243,
      CreditAmount: 1234,
      TDSbyParty: "--",
      TDSbySelf: "--",
      Balance: "2323 ",
    },
    
   
  ]);

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
		items: [],
	});
	const columns:AppColumn<LedgerStatement>[]=[

		{
			field: "date",
			headerName: "Date",
		
			hideSortIcons: true,
			flex: 1,
			 minWidth: 100,
			headerClassName: "text-[#6B6B6B] text-sm ",
			cellClassName:  "text-[#242424] text-sm whitespace-nowrap overflow-hidden text-ellipsis",
		},
		{
			field: "Slno",
			headerName: "Slno",
		
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
		cellClassName: "text-[#242424] text-sm text-right",

		},
		{
			field: "Voucher",
			headerName: "Voucher",
			
		minWidth: 130,
			hideSortIcons: true,
			
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm whitespace-nowrap overflow-hidden text-ellipsis"

		},
	{
  field: "CreditAmount",
  headerName: "Credit Amount",
  hideSortIcons: true,
  flex: 1,
  headerClassName: "text-[#6B6B6B] text-sm",
  cellClassName: "text-[#242424] text-sm ", 
},
{
  field: "DebitAmount",
  headerName: "Debit Amount",
  hideSortIcons: true,
  flex: 1,
  headerClassName: "text-[#6B6B6B] text-sm",
  cellClassName: "text-[#242424] text-sm  pl-4", 
},

				{
			field: "TDSbyParty",
			headerName: "TDS by Party",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "TDSbySelf",
			headerName: "TDS by Self",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
			{
			field: "Balance",
			headerName: "Balance",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},

		
		
	]

		return (
		<div className="flex flex-col gap-y-6">
			<div className="flex justify-between items-center">
	
				<div className="flex items-center    px-3 py-2 ">
					<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-[#474747] text-base rounded ">
          <CalendarDays className="mr-2 h-4 w-4" />
          Last 365 Days <span> <ChevronDown /></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuItem>Today</DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
					
				</div>
				{/* btns */}
				<div className="flex items-center gap-x-3  ">
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<IoMdShare />
						Share
					</Button>
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<TbDownload />
						Download Report
					</Button>
				</div>
			</div>
			{/* data grid */}
			<div className="overflow-x-auto">
				<GenericDataGrid<LedgerStatement>
					columns={columns}
					getRowIdAction={(row) => row.id}
					rows={tableRows}
					customRowCount={6}
					filterModel={filterModel}
					onFilterModelChange={setFilterModel}
				/>
			</div>
		</div>
	);
	
}
function ItemwiseReport1() {
  const [search, setSearch] = useState<string>("");
  const [tableRows, setTableRows] = useState<ItemwiseReport[]>([
    {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
    {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
    {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },
	 {
      ItemName: "Dabur Toothpaste",
      ItemCode: "458865",
      SalesQty: "3.0 PCS",
      SalesAmount: "4000",
      PurchaseQty: "10.0 PCS",
      PurchaseAmount: "10000",
    },

  ]);
 const [filterModel, setFilterModel] = useState<GridFilterModel>({
		items: [],
	});

	const columns: AppColumn<ItemwiseReport>[] = [
  {
    field: "ItemName",
    headerName: "Item Name",
    hideSortIcons: true,
    minWidth: 90,
    flex: 1.5,
    headerClassName: "text-[#6B6B6B] text-sm",
    renderCell({ row }) {
      return (
        <div className="h-full w-full flex items-center justify-start">
          <div className="flex gap-x-2 items-center">
           
            

            <span className="text-sm text-brand">{row.ItemName}</span>
          </div>
        </div>
      );
    },
  },
  {
    field: "ItemCode",
    headerName: "Item Code",
    hideSortIcons: true,
    flex: 1,
    headerClassName: "text-[#6B6B6B] text-sm",
    cellClassName: "text-[#242424] text-sm",
  },
  {
    field: "SalesQty",
    headerName: "Sales Qty",
    hideSortIcons: true,
    flex: 1,
    headerClassName: "text-[#6B6B6B] text-sm",
    cellClassName: "text-[#242424] text-sm",
  },
  {
    field: "SalesAmount",
    headerName: "Sales Amount",
    hideSortIcons: true,
    flex: 1,
    headerClassName: "text-[#6B6B6B] text-sm",
    cellClassName: "text-[#242424] text-sm",
  },

{
	field: "PurchaseQty",
	headerName: "Purchase Qty",
	hideSortIcons: true,
	flex: 1,
	width: 150,
	headerClassName: "text-[#6B6B6B] text-sm",
	cellClassName: "text-[#242424] text-sm",
},

  {
    field: "PurchaseAmount",
    headerName: "Purchase Amount",
    hideSortIcons: true,
    flex: 1,
    headerClassName: "text-[#6B6B6B] text-sm",
    cellClassName: "text-[#242424] text-sm",
  },
];

	return (
		<div className="flex flex-col gap-y-6">
			<div className="flex justify-between items-center">
	
				<div className="flex items-center    px-3 py-2 ">
					<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-[#474747] text-base rounded ">
          <CalendarDays className="mr-2 h-4 w-4" />
          Last 365 Days <span> <ChevronDown /></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuItem>Today</DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
					
				</div>
				{/* btns */}
				<div className="flex items-center gap-x-3  ">
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<IoMdShare />
						Share
					</Button>
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<TbDownload />
						Download Report
					</Button>
				</div>
			</div>
			
			<div className="overflow-x-auto">
				<GenericDataGrid<ItemwiseReport>
					columns={columns}
					getRowIdAction={(row) => row.ItemCode}
					rows={tableRows}
					customRowCount={6}
					filterModel={filterModel}
					onFilterModelChange={setFilterModel}
				/>
			</div>
		</div>
	);

	


 
}
