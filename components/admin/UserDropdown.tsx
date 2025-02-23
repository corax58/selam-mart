"use client";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserDropdown = () => {
  const { data, isPending } = useSession();

  if (isPending)
    return (
      <div className="size-10 flex justify-center items-center">
        <Loader2 size={16} className="animate-spin" />
      </div>
    );
  if (data)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="24">
            <AvatarImage src={data.user.image!} />
            <AvatarFallback>Acc</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="flex flex-col h-full">
              <span className=" text-[15px]">{data.user.name}</span>
              <p className="font-light text-sm">{data.user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default UserDropdown;
