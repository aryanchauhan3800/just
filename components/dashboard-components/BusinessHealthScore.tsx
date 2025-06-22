import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, IndianRupee } from "lucide-react";
import { RiSettingsLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { useState } from "react";
import Image from "next/image";

const businessScores = [
    { icon: <IndianRupee className="w-4 h-4" />, label: "Sales Score", value: 94.7 },
    { icon: <HiOutlineUsers className="w-4 h-4" />, label: "Customer Repeat Score", value: 94.7 },
    { icon: <ChevronsLeft className="rotate-45 w-4 h-4" />, label: "Profit Score", value: 94.7 },
    { icon: <ChevronsLeft className="rotate-45 w-4 h-4" />, label: "Growth Score", value: 94.7 },
];

const competitorsData = [
    { name: "Competitor 1", score: 20 },
    { name: "Competitor 2", score: 40 },
    { name: "User's Business", score: 60 },
    { name: "Competitor 3", score: 80 },
    { name: "Competitor 4", score: 100 },
];

export default function BusinessHealthScore() {
    const [activeTab, setActiveTab] = useState('reviews');

    const tabs = ['reviews', 'presence', 'sales'];

    const handleCarouselClick = (direction: 'left' | 'right') => {
        const currentIndex = tabs.indexOf(activeTab);
        let nextIndex;

        if (direction === 'right') {
            nextIndex = (currentIndex + 1) % tabs.length;
        } else {
            nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        }

        setActiveTab(tabs[nextIndex]);
    };
    return (
        <Card className="flex flex-row py-4 border-none shadow-none">
            <CardContent className="w-1/3">
                <h2 className="dashboard_card_heading flex items-center gap-2">
                    <Image src="/sparkle.svg" alt="sparkles" height={20} width={20} />
                    Business Health Score
                </h2>
                <p className="dashboard_card_subheading">
                    Your company&apos;s performance on various aspects of Business
                </p>
                <div className="space-y-5 mt-4 px-4">
                    {businessScores.map((score) => (
                        <div key={score.label} className="flex flex-col justify-between">
                            <span className="text-base text-[#8F8F8F] mb-1 flex items-center gap-1">{score.icon}{score.label}</span>
                            <div className="flex flex-row items-center gap-1">
                                <span className="text-2xl font-normal">{score.value}</span>
                                <span className="text-lg text-[#8F8F8F]">/ 100</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardContent className="w-2/3 border-l-2">
                <div className="flex flex-row justify-between">
                    <div>
                        <h2 className="dashboard_card_heading flex items-center gap-2">
                            <Image src="/sparkle.svg" alt="sparkles" height={20} width={20} />
                            Competitive Ranking
                        </h2>
                        <p className="dashboard_card_subheading">
                            See how your business is performing compared to your regional competitors
                        </p>
                    </div>
                    <Button variant="outline" className="bg-white text-black border rounded-xs flex items-center">
                        <RiSettingsLine /> Set Company Details
                    </Button>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
                    <TabsList className="gap-2 bg-gray-50 mb-4">
                        <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
                        <TabsTrigger value="presence">Online Presence</TabsTrigger>
                        <TabsTrigger value="sales">Sales Estimation</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleCarouselClick('left')}
                            className="rounded-full bg-white border-gray-200 hover:bg-gray-50"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex-1">
                            <TabsContent value="reviews">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart
                                        data={competitorsData}
                                        barCategoryGap="0%"
                                    >
                                        <XAxis dataKey="name" />
                                        <Tooltip />
                                        <Bar dataKey="score">
                                            {competitorsData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.name === "User's Business" ? "#b8ccf4" : "#e8ecfc"}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </TabsContent>
                            <TabsContent value="presence">
                                <div className="text-center text-muted-foreground h-[250px] flex items-center justify-center">
                                    Online Presence data coming soon...
                                </div>
                            </TabsContent>
                            <TabsContent value="sales">
                                <div className="text-center text-muted-foreground h-[250px] flex items-center justify-center">
                                    Sales Estimation data coming soon...
                                </div>
                            </TabsContent>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleCarouselClick('right')}
                            className="rounded-full bg-white border-gray-200 hover:bg-gray-50"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}