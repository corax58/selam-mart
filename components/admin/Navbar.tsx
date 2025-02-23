"use client";
import React from "react";
import UserDropdown from "./UserDropdown";
import Notifications from "./Notifications";
import { usePathname } from "next/navigation";

function formatAdminPath(url: string): string {
  const match = url.match(/\/admin\/([^/]+)/);
  if (!match) return "";

  return match[1]
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
}

const AdminNavbar = () => {
  const pathname = usePathname();
  const pageTitle = formatAdminPath(pathname);

  return (
    <div className=" flex justify-between w-full container px-10 py-3 bg-slate-50 items-center">
      <div className=" font-bold text-xl">{pageTitle}</div>
      <div className=" flex gap-5">
        <Notifications />
        <UserDropdown />
      </div>
    </div>
  );
};

export default AdminNavbar;
