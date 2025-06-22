import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TemplateTabs = () => {
    return (
        <div className='mt-4'>
            <Tabs defaultValue="items" className="w-full">
                <TabsList className="gap-5 border-b pb-1 px-8 shadow-xl w-full bg-white">
                    <TabsTrigger className="recievable_tab !py-5" value="items">A4 Template</TabsTrigger>
                    <TabsTrigger className="recievable_tab !py-5" value="history">A5 Template</TabsTrigger>
                    <TabsTrigger className="recievable_tab !py-5" value="attachment">Thermal Print</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default TemplateTabs