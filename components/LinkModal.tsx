"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type LinkModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (url: string) => void;
};

export default function LinkModal({ open, onClose, onSubmit }: LinkModalProps) {
    const [url, setUrl] = useState("");

    const handleSubmit = () => {
        if (url.trim()) {
            onSubmit(url.trim());
            setUrl("");
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Insert Link</DialogTitle>
                </DialogHeader>
                <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <DialogFooter>
                    <Button onClick={handleSubmit}>Insert</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}