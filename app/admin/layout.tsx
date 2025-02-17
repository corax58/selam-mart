import { AppSidebar } from "@/components/app-sidebar";
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
      <div className="flex w-full">
        <SidebarTrigger className="absolute" />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default layout;
