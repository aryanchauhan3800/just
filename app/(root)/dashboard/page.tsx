"use client";

import BusinessHealthScore from "@/components/dashboard-components/BusinessHealthScore";
import ExpenseCategoryCard from "@/components/dashboard-components/ExpenseCategoryCard";
import RecievableCard from "@/components/dashboard-components/RecievableCard";
import { SalesExpenseCard } from "@/components/dashboard-components/SalesExpenseCard";
import StockAlert from "@/components/dashboard-components/StockAlert";
import TopCustomers from "@/components/dashboard-components/TopCustomers";
import React from "react";
import DashboardInfoStrip from "@/components/dashboard-components/DashboardInfoStrip";

const getFinancialYearDates = () => {
  const today = new Date();
  const year = today.getFullYear();
  const isBeforeApril = today.getMonth() < 3; // Jan, Feb, Mar

  const startYear = isBeforeApril ? year - 1 : year;
  const endYear = isBeforeApril ? year : year + 1;

  const startDate = new Date(startYear, 3, 1); // April 1
  const endDate = new Date(endYear, 2, 31);   // March 31

  return { startDate, endDate };
};

const Dashboard = () => {
  const { startDate: defaultStart, endDate: defaultEnd } = getFinancialYearDates();
  const [startDate, setStartDate] = React.useState(defaultStart);
  const [endDate, setEndDate] = React.useState(defaultEnd);
  return (
    <div className="p-6 space-y-6">
      <DashboardInfoStrip startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />

      <div className="flex flex-row gap-6">
        <SalesExpenseCard />
        <ExpenseCategoryCard />
      </div>
      

      <RecievableCard />


      <div className="flex flex-row gap-6">
        <TopCustomers />
        <StockAlert />
      </div>

      <BusinessHealthScore />
    </div>
  );
};

export default Dashboard;
