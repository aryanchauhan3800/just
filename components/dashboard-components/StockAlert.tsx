import React from "react";
import Customtable from "../Customtable";
import { Card } from "../ui/card";
import { ChevronRight } from "lucide-react";

const StockAlert = () => {
    const stockData = [
        { item: 'JimJam Biscuits', current: 12, alert: 20, added: '12-Apr-2025', avatarInitial: 'J', avatarColor: '#ff3030' },
        { item: 'Dabur Chawanprash', current: 4, alert: 20, added: '12-Apr-2025', avatarInitial: 'D', avatarColor: '#5bff3b' },
        { item: 'Amritanjan', current: 1, alert: 10, added: '12-Apr-2025', avatarInitial: 'A', avatarColor: '#ff3bd9' },
        { item: 'Amla Hair Oil', current: 2, alert: 10, added: '12-Apr-2025', avatarInitial: 'A', avatarColor: '#3b3dff' },
    ];

    return (
        <Card className="w-2/3 flex flex-col gap-6 p-4 border-none shadow-none">
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="dashboard_card_heading">Stock Alert</h1>
                    <p className="dashboard_card_subheading">Check which items are low in stock</p>
                </div>
                <span className="view_all_btn">View all <ChevronRight className='h-4 w-4' /></span>
            </div>
            <Customtable
                tableType="stockAlert"
                mainColumn="Item Name"
                columns={['Current Stock', 'Low Stock Alert', 'Last Added']}
                data={stockData}
            />
        </Card>
    );
};

export default StockAlert;
