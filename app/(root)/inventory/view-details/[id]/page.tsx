import ViewItemDetails from "@/components/inventory/ViewItemDetails";
import { FC } from "react";

interface pageProps {
	params: Promise<{ id: string }>;
}

const page: FC<pageProps> = async ({ params }) => {
	const { id } = await params;
	return <ViewItemDetails />;
};

export default page;
