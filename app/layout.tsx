import type { Metadata } from "next";
import { Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/query/provider";

const lato = Lato({
	weight: ['300', '400', '700', '900'],
	variable: "--font-lato",
	subsets: ["latin"],
});

// const geistMono = Geist_Mono({
// 	variable: "--font-geist-mono",
// 	subsets: ["latin"],
// });

export const metadata: Metadata = {
	title: "Karosauda",
	description: "Karosauda: GST Billing Software",
	icons: {
		icon: "/favicon.png",
	  },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${lato.variable} antialiased`}
				// style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
			>
			<ReactQueryProvider>
				{children}
				</ReactQueryProvider>
				<Toaster richColors duration={3000} />
			</body>
		</html>
	);
}
