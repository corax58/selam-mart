import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Descriptiontooltip = ({ desc }: { desc: string }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className=" truncate w-60">{desc}</div>
      </PopoverTrigger>
      <PopoverContent>{desc}</PopoverContent>
    </Popover>
  );
};

export default Descriptiontooltip;
