import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";

const Notifications = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className=" size-10 flex  justify-center items-center bg-slate-300 rounded-full">
          <Bell fill="white" className=" text-white" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-4">
        <h4 className="font-semibold mb-2">Notifications</h4>
        <div className="space-y-2">
          <div className="p-2 border rounded-md">New user signed up! 🎉</div>
          <div className="p-2 border rounded-md">Your post got 5 likes! ❤️</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
