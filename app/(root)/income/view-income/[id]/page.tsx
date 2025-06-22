import ViewIncome from "@/components/income/ViewIncome";
import { FC } from "react";

interface pageProps {
	params: Promise<{ id: string }>;
}

const page: FC<pageProps> = async ({ params }) => {
	const { id } = await params;
	return <ViewIncome />;
};

export default page;
