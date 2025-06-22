import React from "react";
import Customtable from "../Customtable";
import { Card } from "../ui/card";
import { ChevronRight } from "lucide-react";

const TopCustomers = () => {
    const customerData = [
        { name: 'Ashok Srivastav', amount: '₹ 80,000', avatarInitial: 'A', avatarColor: '#ff4b4b' },
        { name: 'Akansha Mishra', amount: '₹ 56,000', avatarInitial: 'A', avatarColor: '#4b9eff' },
        { name: 'Balwant Singh Joshi', amount: '₹ 44,000', avatarInitial: 'B', avatarColor: '#ffb52e' },
        { name: 'Prabir Joshi', amount: '₹ 40,000', avatarInitial: 'P', avatarColor: '#ff8b4b' },
    ];

    return (
        <Card className="w-2/5 flex flex-col gap-6 p-4 border-none shadow-none">
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="dashboard_card_heading">Your top Customers</h1>
                    <p className="dashboard_card_subheading">Maximum business with them</p>
                </div>
                <span className="view_all_btn">View all <ChevronRight className='h-4 w-4' /></span>
            </div>
            <Customtable
                tableType="dashboard"
                mainColumn="Client / Company"
                columns={['Trade Amount']}
                data={customerData}
            />
        </Card>
    );
};

export default TopCustomers;
