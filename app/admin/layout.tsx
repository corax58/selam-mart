import Navbar from "@/components/admin/Navbar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className=" w-full flex flex-col ">
        <Navbar />
        <SidebarTrigger className="absolute" />

        {children}
      </div>
    </SidebarProvider>
  );
};

export default layout;
