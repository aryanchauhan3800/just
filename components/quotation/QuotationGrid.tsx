"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { GenericDataGrid } from "@/components/GenericDataGrid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEye } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { AppColumn, FormattedDoc } from "@/types/quotationTypes";
import { useAllQuotationData } from "@/hooks/useQuotation";
// import { useAllQuotations } from "@/hooks/useQuotation";

const QuotationTable = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  // pagination Related states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);



  // Quotation Table Data
  const { mutate: quotationMutate, data: quotationData, isPending: quotationPending } = useAllQuotationData();



  // RUN MUTATE FUNCTION WITH PAGINATION
  // useEffect(() => {
  //   const queryObj = {
  //     pageNumber: page + 1,
  //     pageSize,
  //     search: search || undefined,
  //   };

  //   quotationMutate(queryObj);
  // }, [page, pageSize, search, quotationMutate]);




  // Table column data
  const quotationColumns: AppColumn<FormattedDoc>[] = [
    {
      field: "quotationNumber",
      headerName: "Quotation #",
      hideSortIcons: true,
      minWidth: 140,
      width: 140,
      maxWidth: 140,
      cellClassName: "text-brand text-sm font-medium",
      headerClassName: "text-[#6B6B6B] text-sm",
      renderCell({ row }) {
        return (
          <div className="h-full w-full flex items-center justify-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex-1 bg-transparent hover:bg-transparent shadow-none text-inherit justify-start p-0"
                >
                  {row.quotationNumber}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[280px] ml-20">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center gap-x-2 border-b pb-2 flex-1 text-brand">
                    <Plus className="size-4" />
                    Convert to Invoice
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-x-2 flex-1">
                    <IoEye className="size-4" />
                    View Details
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/quotations/edit/${row.id}`)}
                >
                  <div className="flex items-center gap-x-2 flex-1">
                    <TbEdit className="size-4" />
                    Edit Quotation
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
    {
      field: "clientCompany",
      headerName: "Client Company",
      hideSortIcons: true,
      minWidth: 200,
      flex: 1,
      headerClassName: "text-[#6B6B6B] text-sm",
      renderCell({ row }) {
        return (
          <div className="h-full w-full flex items-center justify-start">
            <div className="flex gap-x-2 items-center">
              <span className="size-8 text-xs rounded-md bg-brand text-white flex justify-center items-center">
                {row.clientCompany?.charAt(0)?.toUpperCase() || 'C'}
              </span>
              <span className="text-sm text-[#242424]">
                {row.clientCompany}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      field: "quoteAmount",
      headerName: "Quote Amount (₹)",
      hideSortIcons: true,
      minWidth: 140,
      width: 140,
      maxWidth: 140,
      headerClassName: "text-[#6B6B6B] text-sm",
      cellClassName: "text-[#242424] text-sm font-medium",
      renderCell({ row }) {
        return (
          <div className="h-full w-full flex items-center justify-start">
            ₹{row.quoteAmount?.toLocaleString('en-IN') || '0'}
          </div>
        );
      },
    },
    {
      field: "createdOn",
      headerName: "Created On",
      hideSortIcons: true,
      minWidth: 120,
      width: 120,
      maxWidth: 120,
      headerClassName: "text-[#6B6B6B] text-sm",
      cellClassName: "text-[#242424] text-sm",
    },
    {
      field: "validTo",
      headerName: "Valid To",
      hideSortIcons: true,
      minWidth: 120,
      width: 120,
      maxWidth: 120,
      headerClassName: "text-[#6B6B6B] text-sm",
      cellClassName: "text-[#242424] text-sm",
    },
    {
      field: "status",
      headerName: "Status",
      hideSortIcons: true,
      minWidth: 130,
      width: 130,
      maxWidth: 130,
      headerClassName: "text-[#6B6B6B] text-sm",
      renderCell({ row }) {
        const getStatusStyle = (status: string) => {
          switch (status.toLowerCase()) {
            case 'draft':
              return "text-gray-600 bg-gray-100";
            case 'sent':
              return "text-blue-600 bg-blue-100";
            case 'accepted':
              return "text-success bg-success/10";
            case 'rejected':
              return "text-danger bg-danger/10";
            case 'expired':
              return "text-warning bg-warning/10";
            default:
              return "text-gray-600 bg-gray-100";
          }
        };

        return (
          <div className="h-full w-full flex items-center justify-start">
            <div
              className={cn(
                "flex h-[22px] gap-x-2 items-center px-2 py-1 capitalize rounded text-xs",
                getStatusStyle(row.status)
              )}
            >
              <span className="text-xs font-medium">{row.status}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      minWidth: 60,
      width: 60,
      maxWidth: 60,
      hideSortIcons: true,
      headerClassName: "text-[#6B6B6B] text-sm",
      renderCell({ row }) {
        return (
          <div className="h-full w-full flex items-center justify-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  className="rounded-full size-10 bg-transparent text-[#B3B3B3] hover:text-[#B3B3B3] border-gray-200"
                >
                  <BsThreeDotsVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[280px] -ml-60">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center gap-x-2 border-b pb-2 flex-1 text-brand">
                    <Plus className="size-4" />
                    Convert to Invoice
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-x-2 flex-1">
                    <IoEye className="size-4" />
                    View Details
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/quotations/edit/${row.id}`)}
                >
                  <div className="flex items-center gap-x-2 flex-1">
                    <TbEdit className="size-4" />
                    Edit Quotation
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];



  return (
    <div className="flex-1 h-fit flex flex-col bg-white m-5 rounded p-5">
      {/* search bar */}
      <div className="flex justify-between w-full mb-5">
        {/* search input */}
        <div className="flex items-center rounded-full ring-1 ring-gray-300 min-w-[360px] max-w-[360px] px-3 py-2 h-12">
          <FiSearch className="size-4 text-[#B3B3B3]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quotations..."
            className="border-0 hover:border-0 ring-0 focus-visible:ring-0 shadow-none placeholder:text-[#B3B3B3] placeholder:text-lg placeholder:italic"
          />
        </div>

        {/* action buttons */}
        <div className="flex items-center gap-x-3">
          <Button
            onClick={() => router.push('/quotations/create')}
            className="bg-brand hover:bg-brand/90 text-white"
          >
            <Plus className="size-4 mr-2" />
            New Quotation
          </Button>
        </div>
      </div>

      {/* data grid */}
      <div className="overflow-x-auto">
        {quotationData?.docs?.length > 0 ? (
          <GenericDataGrid<FormattedDoc>
            columns={quotationColumns}
            rows={quotationData?.docs ?? []}
            getRowId={(row) => row.id}
            loading={quotationPending}
            rowHeight={52}
            headerHeight={56}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            rowCount={quotationData?.totalDocs || 0}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 text-lg mb-2">No quotations found</div>
            <div className="text-gray-500 text-sm mb-4">Create your first quotation to get started</div>
            <Button
              onClick={() => router.push('/quotations/create')}
              className="bg-brand hover:bg-brand/90 text-white"
            >
              <Plus className="size-4 mr-2" />
              Create Quotation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationTable;