import {
	InventoryCardApiDataType,
	InventoryTableSingleItemType,
	InventoryTableSingleBatchType,
	InventoryItemTableResponseType,
	InventoryBatchTableResponseType,
	InventoryApiFilterPayloadType,
	CreateItemFormType,
	EditItemFormType,
	InventoryActionResponse,
} from "@/types/inventory-types";
import axios from "./axios";
import { format } from "date-fns";

export const inventoryService = {
	getAttributes: async (): Promise<InventoryCardApiDataType> => {
		const result = await axios.post("/api/v1/item/attributes");
		return result.data.result;
	},

	getAllItems: async ({
		params = "",
		filter = {},
	}: {
		params?: string;
		filter?: InventoryApiFilterPayloadType;
	}): Promise<InventoryItemTableResponseType> => {
		const result = await axios.post(`/api/v1/item/own${params}`, filter);

		console.log("item params", params);

		return {
			...result?.data?.result,
			docs: result?.data?.result?.docs?.map(
				(val: InventoryTableSingleItemType) => ({
					id: val._id,
					itemOrService: val.name,
					hsnOrSac: val.hsn,
					totalStock: val.stock,
					unit: val.unitId,
					topSeller: val.qualityAssurance.isTopSelling,
					type: val.type,
					status: val.status,
					costPrice: val.purchase.price,
					sellingPrice: val.selling.price,
					gstSlab: val.tax.taxRate,
				})
			),
		};
	},

	getAllBatch: async ({
		params,
		filter = {},
	}: {
		params?: string;
		filter?: InventoryApiFilterPayloadType;
	}): Promise<InventoryBatchTableResponseType> => {
		console.log("batch params", params);

		const result = await axios.post(`/api/v1/batch/own${params}`, filter);

		return {
			...result?.data?.result,
			docs: result?.data?.result?.docs?.map(
				(val: InventoryTableSingleBatchType) => ({
					batchId: val.batchId,
					id: val.id,
					itemOrService: val.items[0].name,
					hsnOrSac: val.items[0]?.hsn ?? "- -",
					stock: val.items[0].quantity,
					status: val.status.replaceAll("_", " ").toLowerCase(),
					expiryDate: val.expiryDate ?? "- -",
					expiryStatus: val.expiryStatus
						.replaceAll("_", " ")
						.toLowerCase(),
					storageWarehouse: val.warehouse?.name || "- -",
					manufacturingDate:
						val.items[0]?.qualityAssurance?.manufactureDate ||
						"- -", // no manufacturing date
					addedOn: format(val.createdAt, "dd-MM-yyyy") || "- -", // no addons
					vendor: undefined, // no vendor
					topSeller: val.items[0]?.qualityAssurance?.isTopSelling,
					// -- adding top seller showing error / table not rendering, need to find out
				})
			),
		};
	},

	// Single Item
	getSingleItem: async (id: string) => {
		const res = await axios.get(`/api/v1/item/${id}`);

		console.log(res?.data?.result?.itemDetails);

		return res?.data?.result?.itemDetails;
	},

	// Single Batch
	getSingleBatch: async (id: string) => {
		const res = await axios.get(`/api/v1/batch/${id}`);

		console.log(res?.data?.result?.batchDetails);

		return res?.data?.result?.batchDetails;
	},

	// create Item
	createItem: async (data: CreateItemFormType) => {
		const request = await axios.post(`/api/v1/item/create`, data);
		const response = request.data as InventoryActionResponse;
		console.log(response);
		return response;
	},

	// edit Item
	editItem: async ({ id, data }: { id: string; data: EditItemFormType }) => {
		const request = await axios.put(`/api/v1/item/${id}`, data);
		const response = request.data as InventoryActionResponse;
		console.log(response);
		return response;
	},

	// delete Item
	deleteItem: async (id: string) => {
		const request = await axios.delete(`/api/v1/item/${id}`);
		const response = request.data as InventoryActionResponse;
		console.log(response);
		return response;
	},

	// getAll: async (params: string) => {
	//   const result = await axios.post('/api/v1/item/own + params', data);
	//   console.log(result?.data?.result)
	//   return result?.data?.result;
	// },
};
