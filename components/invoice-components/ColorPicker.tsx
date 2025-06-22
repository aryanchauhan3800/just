'use client'

import { useState } from "react";
import { Card } from "../ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from "../ui/button";
import { TabsContent } from "@radix-ui/react-tabs";
import { HexAlphaColorPicker } from "react-colorful";
import { HexagonalColorHue, HexagonalColorPicker } from "react-hexagon-color-picker";

const colors = [
    "rainbow",
    "#000000",
    "#b93800",
    "#ff9800",
    "#00d000",
    "#cc00ff",
    "#0066ff",
    "#30d5c8",
];

export default function ColorPicker() {
    const [customColor, setCustomColor] = useState("#4F46E5");
    const [selected, setSelected] = useState("#000000");
    const [open, setOpen] = useState(false);

    const [hue, setHue] = useState(0);
    const [currentColor, setCurrentColor] = useState("#444444");

    const handleColorChange = (color: string) => {
        setCurrentColor(color);
    };

    const handleColorClick = (color: string) => {
        if (color === "rainbow") {
            setOpen(true);
            setSelected("rainbow")
        } else {
            setSelected(color);
        }
    };

    return (
        <Card className="p-4 border-none shadow-none rounded-none">
            <label className="block mb-2 font-medium text-gray-700">Base Colour</label>

            <div className="flex gap-4">
                {colors.map((color, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleColorClick(color)}
                        className={`w-8 h-8 rounded-full border-2 transition relative
                            ${selected === color
                                ? "ring-2 ring-white ring-offset-2 ring-offset-blue-500 shadow-md"
                                : "border-transparent hover:ring-2 hover:ring-gray-300"}
                            `}
                        style={
                            color === "rainbow"
                                ? {
                                    background:
                                        "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",
                                }
                                : {
                                    backgroundColor: color,
                                }
                        }
                    />
                ))}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md p-0">
                    <DialogHeader className="border-b p-4">
                        <DialogTitle>Pick a Colour</DialogTitle>
                    </DialogHeader>
                    <Tabs
                        defaultValue="box"
                        className="py-2 px-4"
                    >
                        <TabsList className="grid grid-cols-2 gap-2 bg-gray-50 w-full">
                            <TabsTrigger value="box">Boxes</TabsTrigger>
                            <TabsTrigger value="picker">Picker</TabsTrigger>
                        </TabsList>

                        <TabsContent value="box">
                            <div className="px-6 pt-4 w-full">
                                <div className="w-64 mx-auto">
                                    <HexagonalColorPicker
                                        hue={hue}
                                        color={currentColor}
                                        onColorChange={handleColorChange}
                                    />
                                </div>
                                <div className="w-64 mx-auto mt-4">
                                    <div className="relative h-4 rounded-full overflow-hidden" style={{
                                        background: `linear-gradient(to right, 
                                                        transparent 0%, 
                                                        ${currentColor} 100%)`
                                    }}>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={Math.round(parseInt(currentColor.slice(7, 9) || "FF", 16) * 100 / 255)}
                                            onChange={(e) => {
                                                const intensity = Number(e.target.value);
                                                const alphaHex = Math.round((intensity / 100) * 255).toString(16).padStart(2, "0");
                                                if (currentColor.length === 7) {
                                                    setCurrentColor(currentColor + alphaHex);
                                                } else {
                                                    setCurrentColor(currentColor.slice(0, 7) + alphaHex);
                                                }
                                            }}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div
                                            className="absolute top-1/2 w-3 h-3 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1/2 pointer-events-none shadow-sm"
                                            style={{
                                                left: `calc(${Math.round(parseInt(currentColor.slice(7, 9) || "FF", 16) * 100 / 255)}% - 6px)`
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mt-10 w-80 mx-auto">
                                    <input
                                        type="text"
                                        value="Hex"
                                        className="border rounded px-2 py-1 w-24 text-sm"
                                        readOnly
                                    />
                                    <input
                                        type="text"
                                        value={currentColor}
                                        onChange={(e) => setCurrentColor(e.target.value)}
                                        className="border rounded px-2 py-1 w-24 text-sm"
                                    />
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={Math.round(parseInt(customColor.slice(7, 9) || "FF", 16) * 100 / 255)}
                                            onChange={(e) => {
                                                const intensity = Math.min(100, Math.max(0, Number(e.target.value)));
                                                const alphaHex = Math.round((intensity / 100) * 255).toString(16).padStart(2, "0");
                                                if (customColor.length === 7) {
                                                    setCustomColor(customColor + alphaHex);
                                                } else {
                                                    setCustomColor(customColor.slice(0, 7) + alphaHex);
                                                }
                                            }}
                                            className="border rounded px-2 py-1 w-24 text-sm pr-6"
                                        />
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                                            %
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="picker">
                            <div className="picker flex flex-col items-center gap-4 pt-4">
                                <HexAlphaColorPicker color={customColor} onChange={setCustomColor} className="min-w-xs" />
                                <div className="grid grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        value="Hex"
                                        className="border rounded px-2 py-1 w-24 text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={customColor}
                                        onChange={(e) => setCustomColor(e.target.value)}
                                        className="border rounded px-2 py-1 w-24 text-sm"
                                    />
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={Math.round(parseInt(customColor.slice(7, 9) || "FF", 16) * 100 / 255)}
                                            onChange={(e) => {
                                                const intensity = Math.min(100, Math.max(0, Number(e.target.value)));
                                                const alphaHex = Math.round((intensity / 100) * 255).toString(16).padStart(2, "0");
                                                if (customColor.length === 7) {
                                                    setCustomColor(customColor + alphaHex);
                                                } else {
                                                    setCustomColor(customColor.slice(0, 7) + alphaHex);
                                                }
                                            }}
                                            className="border rounded px-2 py-1 w-24 text-sm pr-6"
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                                            %
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                    <DialogFooter className="border-t py-1">
                        <DialogClose className="w-full">
                            <Button variant="ghost">Apply</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
