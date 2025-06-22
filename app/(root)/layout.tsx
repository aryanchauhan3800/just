import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex-1 flex h-[100vh] overflow-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <Navbar />
          <main className="bg-[#FAFCFE] overflow-y-auto overflow-x-hidden flex-1 h-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}