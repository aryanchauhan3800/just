import { FC } from "react";
import { Metadata } from "next";
import CreateItemParent from "@/components/inventory/create-item/CreateItemParent";

export const metadata: Metadata = {
	title: "Karosauda - Inventory - Add Item",
	description: "Add an Item or Service to your inventory",
};
const page: FC = () => {
	return <CreateItemParent />;
};

export default page;
