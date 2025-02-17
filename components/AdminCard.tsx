"use client";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const AdminCard = () => {
  const { data, isPending } = useSession();

  if (isPending) return <Loader2 size={16} className="animate-spin" />;
  if (data)
    return (
      <div className="bg-white flex items-center gap-2 border-slate-200 border rounded-lg px-2 py-1">
        <Image
          alt="user pfp"
          src={data.user.image!}
          width={33}
          height={33}
          className="rounded-lg size-10"
        />
        <div className=" h-full">
          <span className=" text-[15px]">{data.user.name}</span>
          <p className="font-light text-sm">{data.user.email}</p>
        </div>
      </div>
    );
};

export default AdminCard;
