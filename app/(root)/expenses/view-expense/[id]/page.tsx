import ViewExpense from "@/components/expenses/ViewExpense";
import { FC } from "react";

interface pageProps {
	params: Promise<{ id: string }>;
}

const page: FC<pageProps> = async ({ params }) => {
	const { id } = await params;
	return <ViewExpense />;
};

export default page;
