"use client";

import {
  DataGrid,
  GridColDef,
  GridValidRowModel,
} from "@mui/x-data-grid";

import SkeletonTable from "./SkeletonTable";
import { GenericDataGridProps } from "@/types/inventory-types";

export function GenericDataGrid<T extends GridValidRowModel>({
  rows,
  columns,
  getRowId,
  loading = false,
  rowHeight = 60,
  headerHeight = 50,
  customRowCount,
  hideFooter = false,
  filterModel,
  onFilterModelChange,
  sortModel,
  onSortModelChange,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  rowCount,
}: GenericDataGridProps<T>) {
  const formattedCols: GridColDef[] = columns.map((col) => ({
    ...col,
    field: col.field,
    flex: col.flex ?? 1,
    renderCell: col.renderCell,
  }));

  if (loading) {
    return (
      <SkeletonTable
        columns={columns}
        rowHeight={rowHeight}
        headerHeight={headerHeight}
        customRowCount={customRowCount || 5}
      />
    );
  }

  return (
    <div>
      <DataGrid
        className="w-full h-full"
        style={{ border: 0 }}
        rows={rows}
        columns={formattedCols}
        getRowId={getRowId}
        disableColumnMenu
        disableRowSelectionOnClick
        loading={loading}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        rowHeight={rowHeight}
        columnHeaderHeight={headerHeight}
        pageSizeOptions={[5, 10, 25, 50]}
        hideFooter={hideFooter}
        disableColumnFilter
        disableColumnSorting
        disableColumnResize
        disableAutosize
        filterModel={filterModel}
        onFilterModelChange={onFilterModelChange}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={({ page, pageSize }) => {
          onPageSizeChange(pageSize);
          onPageChange(page);
        }}
        rowCount={rowCount}
      />
    </div>
  );
}
