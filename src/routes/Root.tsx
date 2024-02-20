import Sidebar from "@/components/Sidebar/Sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/toaster";
import {
  TasksActionType,
  useTasks,
} from "@/hooks/useTasks";
import { Task } from "@/types/tasks";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

type ContextType = {
  tasks: {
    tasks: Task[];
  } & TasksActionType;
};

export default function Root() {
  const tasks = useTasks();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row gap-10 h-full">
        <div className="flex flex-row flex-1 w-full">
          <div className="max-sm:hidden">
            <Sidebar tasks={tasks.tasks} />
          </div>
          <div className="flex-col gap-3 border flex-grow w-full">
            <div className="sm:hidden">
              <Sheet open={open} onOpenChange={() => setOpen((prev) => !prev)}>
                <SheetTrigger className="absolute top-1 left-2">
                  <Menu />
                </SheetTrigger>
                <SheetContent className="w-full p-0" side={"left"}>
                  <Sidebar
                    tasks={tasks.tasks}
                    onOpenChange={() => setOpen((prev) => !prev)}
                  />
                </SheetContent>
              </Sheet>
            </div>
            <Outlet context={{ tasks }} />
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
}

export function useContextOutlet() {
  return useOutletContext<ContextType>();
}
