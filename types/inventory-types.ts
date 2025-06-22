import {
	GridColDef,
	GridFilterModel,
	GridRenderCellParams,
	GridSortModel,
	GridValidRowModel,
} from "@mui/x-data-grid";
import { IconType } from "react-icons/lib";

export type AppColumn<T extends GridValidRowModel> = Omit<
	GridColDef,
	"field" | "renderCell"
> & {
	field: keyof T & string;
	renderCell?: (params: GridRenderCellParams<T>) => React.ReactNode;
};

export type GenericDataGridProps<T extends GridValidRowModel> = {
	rows: T[];
	columns: AppColumn<T>[];
	getRowId: (row: T) => string | number;
	loading?: boolean;
	rowHeight?: number;
	headerHeight?: number;
	paginate?: boolean;
	customRowCount?: number;
	hideFooter?: boolean;

	// Filter / sort
	filterModel?: GridFilterModel;
	onFilterModelChange?: (model: GridFilterModel) => void;
	sortModel?: GridSortModel;
	onSortModelChange?: (model: GridSortModel) => void;

	// Pagination
	page: number;
	pageSize: number;
	onPageChange: (newPage: number) => void;
	onPageSizeChange: (newSize: number) => void;
	rowCount: number;
};

export interface InventoryTableResponseOtherValues {
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number;
	nextPage: number;
}

export type InventoryBatchTableType = {
	id: string;
	batchId: string;
	itemOrService: string;
	hsnOrSac: string;
	stock: string;
	status: "in stock" | "low stock" | "out of stock" | "full in stock";
	expiryDate: string;
	expiryStatus: "fresh" | "expired" | "soon to expire";
	storageWarehouse: string;
	manufacturingDate: string;
	addedOn: string;
	vendor: string;
	topSeller: boolean;
	action: () => void;
};

export interface InventoryBatchTableResponseType
	extends InventoryTableResponseOtherValues {
	docs: InventoryBatchTableType[];
}

export type InventoryItemTableType = {
	id: string;
	itemOrService: string;
	hsnOrSac: string;
	totalStock: string;
	unit: string;
	topSeller: boolean;
	type: "item" | "service";
	status: "in stock" | "low stock" | "out of stock";
	costPrice: string;
	sellingPrice: string;
	gstSlab: string;
	action: () => void;
};

export interface InventoryItemTableResponseType
	extends InventoryTableResponseOtherValues {
	docs: InventoryItemTableType[];
}

export type InfoCardType = {
	title: string;
	TitleIcon: IconType;
	titleColor: string;
	value: string;
	FooterIcon?: IconType;
	footerIconText?: string;
	footerText?: string;
	isRounded?: boolean;
};

type InventoryAttributeApiSingleDataType = {
	value: number;
	change: number;
	changeInPercentage: number;
};

export type InventoryCardApiDataType = {
	totalItem: InventoryAttributeApiSingleDataType;
	inventoryValue: InventoryAttributeApiSingleDataType;
	lowStockAlert: InventoryAttributeApiSingleDataType;
	potentialMargin: InventoryAttributeApiSingleDataType;
};

export type InventoryTableSingleItemType = {
	_id: string;
	companyId: string;
	warehouses: string[];
	categoryId: string;
	unitId: string;
	userId: string;
	type: "PRODUCT";
	images: string[];
	name: string;
	description: string;
	vendorId: string;
	hsn: string;
	purchase: {
		price: number;
		finalPrice: number;
		raw: {
			price: number;
			isPartOfPrice: boolean;
		};
	};
	selling: {
		price: number;
		finalPrice: number;
		packaging: {
			price: number;
			isIncludedInPrice: boolean;
		};
	};
	tax: {
		_id: string;
		name: string;
		taxRate: number;
		companyId: string;
		userId: string;
		isGlobal: boolean;
		isDeleted: boolean;
		createdAt: string;
		updatedAt: string;
		__v: number;
	};
	discountType: "PERCENTAGE";
	discountValue: number;
	openingStock: {
		date: string;
		stock: number;
	};
	status: string;
	stock: number;
	sold: number;
	qualityAssurance: {
		perishableItem: boolean;
		isProductWarranty: boolean;
		isTopSelling: boolean;
	};
	itemId: string;
	idSequence: number;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
	id: string;
	lowStockThreshold: number;
	deleted: boolean;
};

export type InventoryItemsFilterType = {
	search: string;
};

export type InventoryTableSingleBatchType = {
	_id: string;
	companyId: string;
	warehouse: {
		_id: string;
		name?: string;
	};
	userId: string;
	items: Array<{
		_id: string;
		name: string;
		type: "PRODUCT" | string;
		images: string[];
		quantity: number;
		sold: number;
		hsn: string;
		stock: string;
		purchase: {
			price: number;
			finalPrice: number;
			raw: {
				price: number;
				isPartOfPrice: boolean;
			};
		};
		selling: {
			price: number;
			finalPrice: number;
			packaging: {
				price: number;
				isIncludedInPrice: boolean;
			};
		};
		tax: string;
		discountType: "PERCENTAGE" | "AMOUNT" | string;
		discountValue: number;
		qualityAssurance: {
			perishableItem: boolean;
			isProductWarranty: boolean;
			isTopSelling: boolean;
			manufactureDate: string;
		};
	}>;
	status: "IN_STOCK" | "OUT_OF_STOCK" | string;
	expiryStatus: "FRESH" | "EXPIRED" | string;
	isExpired: boolean;
	expiryDate: string | null;
	batchId: string;
	idSequence: number;
	isDeleted: boolean;
	lowStockThreshold: number;
	deleted: boolean;
	__v: number;
	createdAt: string;
	updatedAt: string;
	id: string;
};

export type InventoryApiFilterPayloadType = {
	type?: string[];
	status?: string[];
	isTopSelling?: boolean;
	isPerishableItem?: boolean;
	search?: string;
};

export type InventoryUnit = {
	id: string;
	unit: string;
	name: string;
	initial: boolean;
};

export type Warehouse = {
	id: number;
	name: string;
	address: string;
	isSelected: boolean;
	batchName: string;
	quantity: string;
	lowStockAlert: string;
};

export type CreateItemFormType = {
	type: "PRODUCT" | "SERVICE";
	name: string;
	description?: string;
	purchase: {
		price: number;
		finalPrice: number;
		raw?: {
			price: number;
			isPartOfPrice: boolean;
		};
	};
	selling: {
		price: number;
		finalPrice: number;
		packaging?: {
			price: number;
			isIncludedInPrice: boolean;
		};
	};
	tax: string; // MONGO ID
	vendorId: string; // MONGO ID
	categoryId: string; // MONGO ID
	unitId: string; // MONGO ID
	stock: number;
	hsn?: string;
	discountType?: "PERCENTAGE" | "RUPEES";
	discountValue?: number;
	openingStock: {
		date: string; // "2025-06-11T20:47:59.328Z"
		stock: number;
	};
	manufactureDate?: string; // "2025-06-11T20:47:59.328Z"
	perishableItem: boolean;
	perishableExpiryDate?: string; // "2025-06-11T20:47:59.328Z"
	isProductWarranty: boolean;
	warrantyExpiryDate?: string; // "2025-06-11T20:47:59.328Z"
	isTopSelling: boolean;
	warehouses: {
		warehouseId: string; // MONGO ID
		quantity: number;
		lowStockThreshold: number;
		batchId: string;
		idSequence?: number;
		expiryDate?: string; // "2025-06-11T20:47:59.328Z"
		isExpired?: boolean;
	}[];
};

export type EditItemFormType = {
	type?: "PRODUCT" | "SERVICE";
	name?: string;
	description?: string;
	purchase?: {
		price?: number;
		finalPrice?: number;
		raw?: {
			price?: number;
			isPartOfPrice?: boolean;
		};
	};
	selling?: {
		price?: number;
		finalPrice?: number;
		packaging?: {
			price?: number;
			isIncludedInPrice?: boolean;
		};
	};
	tax?: string; // MONGO ID
	vendorId?: string; // MONGO ID
	categoryId?: string; // MONGO ID
	unitId?: string; // MONGO ID
	stock?: number;
	hsn?: string;
	discountType?: "PERCENTAGE" | "AMOUNT";
	discountValue?: number;
	openingStock?: {
		date?: string; // "2025-06-11T20:47:59.328Z"
		stock?: number;
	};
	manufactureDate?: string; // "2025-06-11T20:47:59.328Z"
	perishableItem?: boolean;
	perishableExpiryDate?: string; // "2025-06-11T20:47:59.328Z"
	isProductWarranty?: boolean;
	warrantyExpiryDate?: string; // "2025-06-11T20:47:59.328Z"
	isTopSelling?: boolean;
	warehouses?: {
		warehouseId?: string; // MONGO ID
		quantity?: number;
		lowStockThreshold?: number;
		batchId?: string;
		idSequence?: number;
		expiryDate?: string; // "2025-06-11T20:47:59.328Z"
		isExpired?: boolean;
	}[];
};

export type InventoryActionResponse = {
	error: boolean;
	message: string;
	result: any;
};
