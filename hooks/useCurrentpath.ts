import { usePathname } from "next/navigation";
import React from "react";

const useCurrentpath = () => {
  return usePathname();
};

export default useCurrentpath;
