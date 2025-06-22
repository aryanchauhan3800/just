import EditItemForm from "@/components/inventory/EditItemForm";
import { FC } from "react";

interface pageProps {
	params: Promise<{ id: string }>;
}

const page: FC<pageProps> = async ({ params }) => {
	const { id } = await params;
	return <EditItemForm />;
};

export default page;
