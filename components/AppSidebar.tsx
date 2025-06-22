'use client'

import {
  BadgeIndianRupee,
  CreditCard,
  Crown,
  FileChartColumn,
  FileMinus,
  FileOutput,
  HandCoins,
  Replace,
  ScrollText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Plus } from "lucide-react"
import { MdDashboard } from "react-icons/md";
import { PiNote } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiBoxes } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { RiFileList3Line } from "react-icons/ri";

type subsection = {
  title: string,
  icon: IconType,
  url: string
}

type item = {
  section: string,
  subsection: subsection[]
}

const items: item[] = [
  {
    section: "Home",
    subsection: [
      {
        title: "Dashboard",
        icon: MdDashboard,
        url: "/dashboard",
      }
    ]
  },
  {
    section: "Party",
    subsection: [
      {
        title: "Party",
        icon: HiOutlineUsers,
        url: "/parties",
      },

    ]
  },
  {
    section: "Documents",
    subsection: [
      {
        title: "Invoice",
        icon: ScrollText,
        url: "/invoice",
      },
      {
        title: "Quotes",
        icon: PiNote,
        url: "/quotes",
      },
      {
        title: "Challans",
        icon: RiFileList3Line,
        url: "/challans",
      }
    ]
  },
  {
    section: "Stocks",
    subsection: [
      {
        title: "Inventory",
        icon: CiBoxes,
        url: "/inventory"
      }
    ]
  },
  {
    section: "Purchase",
    subsection: [
      {
        title: "Purchase",
        icon: IoCartOutline,
        url: "/purchase"
      },
      {
        title: "Purchase Return",
        icon: Replace,
        url: "/purchase-return"
      }
    ]
  },
  {
    section: "Sales",
    subsection: [
      {
        title: "Sales Order",
        icon: CreditCard,
        url: "/sales"
      },
      {
        title: "Sales Return",
        icon: CreditCard,
        url: "/sales-return"
      }
    ]
  },
  {
    section: "Adjustments",
    subsection: [
      {
        title: "Credit Note",
        icon: FileMinus,
        url: "/credit"
      },
      {
        title: "Debit Note",
        icon: FileOutput,
        url: "/debit"
      }
    ]
  },
  {
    section: "Transactions",
    subsection: [
      {
        title: "Payment Recieved",
        icon: HandCoins,
        url: "/payment"
      },
      {
        title: "Expenses",
        icon: BadgeIndianRupee,
        url: "/expenses"
      },
      {
        title: "Income",
        icon: HandCoins,
        url: "/income"
      },
    ]
  },
  {
    section: "Accounting",
    subsection: [
      {
        title: "Reports & Ledger",
        icon: FileChartColumn,
        url: "/reports"
      }
    ]
  }
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleSelect = (action: string) => {
    console.log("Selected:", action)
  }

  return (
    <Sidebar
      collapsible="icon"
      className="transition-all duration-300 z-50"
    >
      <SidebarContent className={`bg-[#011B43]`}>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-[#025AE0] text-lg py-9 border-b border-gray-500 rounded-none flex items-center justify-center gap-2">
            {!isCollapsed && (
              <>
                <Image src="/logo.svg" alt="logo" width={28} height={28} />
                <span className="text-xl">Karosauda</span>
              </>
            )}
            {isCollapsed && (
              <Image src="/logo.svg" alt="logo" width={30} height={30} />
            )}
          </SidebarGroupLabel>

          {!isCollapsed && (
            <>
              <div className="flex flex-row justify-between px-4 py-2 bg-[#FAAD14]">
                <div className="flex flex-row items-center space-x-2">
                  <span><Crown className="w-4 h-4 rounded-full text-white" /></span>
                  <span>Buy Premium</span>
                </div>
                <span className="bg-[#F5222D] text-sm text-white px-2 py-1 rounded-full">14 days</span>
              </div>

              <div className="flex flex-row mx-auto mt-6">
                <Button
                  onClick={() => handleSelect("invoice")}
                  className="rounded-none rounded-l-full bg-blue-200 text-black hover:bg-blue-300 "
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Invoice
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="rounded-none rounded-r-full bg-blue-200 text-black hover:bg-blue-200">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSelect("quote")}>
                      New Quote
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSelect("debit")}>
                      New Debit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}

          {isCollapsed && (
            <div className="flex flex-col items-center mt-10 w-full px-2">
              <Button
                onClick={() => handleSelect("invoice")}
                className="w-10 h-10 p-0 rounded-full bg-blue-200 text-black hover:bg-blue-300 mb-2"
                title="New Invoice"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}

          <SidebarGroupContent className="text-white mt-4 overflow-y-auto no-scrollbar">
            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.section} className={`${isCollapsed ? "mb-4 w-full px-1.5 py-1" : ""}`}>
                  {!isCollapsed && (
                    <SidebarHeader className="text-gray-500">{item.section}</SidebarHeader>
                  )}
                  {item.subsection.map((sub) => {
                    const Icon = sub.icon
                    return (
                      <SidebarMenuButton key={sub.title} asChild className={`${isCollapsed ? 'mb-2 w-full' : ''}`}>
                        <Link
                          href={sub.url}
                          className={`flex ${!isCollapsed ? 'gap-2 p-6' : ''} rounded-none ${pathname.startsWith(sub.url)
                            ? `bg-white/10 text-white font-medium ${isCollapsed ? "border-1 border-blue-500" : "border-l-3 border-blue-500"}`
                            : ""}`}
                          title={isCollapsed ? sub.title : undefined}
                        >
                          <Icon className={`${pathname.startsWith(sub.url) ? "text-white" : "text-gray-500"} ${isCollapsed ? "w-10 h-10" : ""}`} />
                          {!isCollapsed && (
                            <span className="text-base">{sub.title}</span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    )
                  })}
                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}