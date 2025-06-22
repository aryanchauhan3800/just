"use client";
import React from "react";
import { useState } from "react";

import { PartyDetailsDrawer } from "@/components/party-components/PartyDrawer";
import Navbar from "@/components/ui/navbarpartydetail";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default function PartyDetailPage({ params }: PageProps) {
	const [open, setOpen] = useState(true);

	return (
		<div>
			<Navbar />
			<PartyDetailsDrawer open={open} onOpenChange={setOpen} />
		</div>
	);
}
