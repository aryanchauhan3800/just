import { inventoryService } from "@/services/inventoryService";
import {
	CreateItemFormType,
	InventoryApiFilterPayloadType,
	InventoryBatchTableResponseType,
	InventoryCardApiDataType,
	InventoryItemTableResponseType,
	InventoryActionResponse,
	EditItemFormType,
} from "@/types/inventory-types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAttributes = () =>
	useMutation<InventoryCardApiDataType>({
		mutationKey: ["itemAttributes"],
		mutationFn: inventoryService.getAttributes,
	});

export const useAllInventoryItems = () =>
	useMutation<
		InventoryItemTableResponseType,
		Error,
		{ params: string; filter: InventoryApiFilterPayloadType }
	>({
		mutationKey: ["allInventoryItems"],
		mutationFn: ({ params, filter }) =>
			inventoryService.getAllItems({ params, filter }),
	});

export const useAllInventoryBatch = () =>
	useMutation<
		InventoryBatchTableResponseType,
		Error,
		{ params: string; filter: InventoryApiFilterPayloadType }
	>({
		mutationKey: ["allInventoryBatch"],
		mutationFn: ({ params, filter }) =>
			inventoryService.getAllBatch({ params, filter }),
	});

export const useSingleItemData = (id: string) =>
	useQuery({
		queryKey: [`item${id}`],
		queryFn: () => inventoryService.getSingleItem(id),
		refetchOnMount: false,
	});

export const useSingleBatchData = (id: string) =>
	useQuery({
		queryKey: [`batch${id}`],
		queryFn: () => inventoryService.getSingleBatch(id),
		refetchOnMount: false,
	});

export const useCreateItem = () =>
	useMutation<InventoryActionResponse, Error, CreateItemFormType>({
		mutationKey: ["create inventory item"],
		mutationFn: (data: CreateItemFormType) => {
			return inventoryService.createItem(data);
		},
	});
export const useEditItem = (id: string) =>
	useMutation<InventoryActionResponse, Error, EditItemFormType>({
		mutationKey: ["edit inventory item"],
		mutationFn: (data: EditItemFormType) => {
			return inventoryService.editItem({ id, data });
		},
	});
export const useDeleteItem = (id: string) =>
	useMutation<InventoryActionResponse, Error>({
		mutationKey: ["edit inventory item"],
		mutationFn: () => {
			return inventoryService.deleteItem(id);
		},
	});
