"use client";

import {
	GridColDef,
	GridRenderCellParams,
	GridValidRowModel,
	DataGrid,
	GridFilterModel,
	GridSortModel,
} from "@mui/x-data-grid";

export type AppColumn<T extends GridValidRowModel> = Omit<
	GridColDef,
	"field" | "renderCell"
> & {
	field: keyof T & string;
	renderCell?: (params: GridRenderCellParams<T>) => React.ReactNode;
};

type GenericDataGridProps<T extends GridValidRowModel> = {
	rows: T[];
	columns: AppColumn<T>[];
	getRowIdAction: (row: T) => string | number;
	loading?: boolean;
	rowHeight?: number;
	headerHeight?: number;
	paginate?: true | undefined;
	customRowCount?: number;
	hideFooter?: boolean;

	filterModel?: GridFilterModel;
	onFilterModelChange?: (model: GridFilterModel) => void;
	sortModel?: GridSortModel;
	onSortModelChange?: (model: GridSortModel) => void;
};

export function GenericDataGrid<T extends GridValidRowModel>({
	rows,
	columns,
	getRowIdAction,
	loading = false,
	rowHeight = 60,
	headerHeight = 50,
	paginate = true,
	customRowCount,
	hideFooter = false,
	filterModel,
	onFilterModelChange,
	onSortModelChange,
	sortModel,

	// pagination data
	// paginationLimit = 10,
	// totalPages = 25,


}: Omit<GenericDataGridProps<T>, "getRowId"> & { getRowIdAction: (row: T) => string | number }) {
	const formattedCols: GridColDef[] = columns.map((col) => ({
		...col,
		field: col.field,
		flex: col.flex ?? 1,
		renderCell: col.renderCell,
	}));

	return (
		<div>
			<DataGrid
				style={{ border: 0 }}
				rows={rows}
				columns={formattedCols}
				getRowId={getRowIdAction}
				disableColumnMenu
				loading={loading}
				disableRowSelectionOnClick
				pagination={paginate}
				rowHeight={rowHeight}
				columnHeaderHeight={headerHeight}
				pageSizeOptions={[5, 10, 25, 50]}
				hideFooter={hideFooter}
				disableColumnFilter
				disableColumnSorting
				disableColumnResize
				disableAutosize
				sortModel={sortModel}
				filterModel={filterModel}
				onFilterModelChange={onFilterModelChange}
				onSortModelChange={onSortModelChange}
				// initialState={{
				// 	pagination: {
				// 		paginationModel: {
				// 			pageSize: paginationLimit || 5,
				// 			page: totalPages,

				// 		},
				// 	},
				// }}
				className="w-full h-full"
			/>
		</div>
	);
}
