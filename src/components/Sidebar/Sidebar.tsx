import {
  AtSign,
  BarChart3,
  ClipboardList,
  LogIn,
  NotebookPen,
  Send,
  Star,
  Sun,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Nav } from "./Nav";
import { ModeToggle } from "../Theme/mode-toggle";
import { Task } from "@/types/tasks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface SidebarProps {
  tasks: Task[];
  onOpenChange?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tasks, onOpenChange }) => {
  const content = (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="flex flex-col border max-sm:w-full w-52">
      <div className="border">
        <ModeToggle />
      </div>
      <Nav
        onOpenChange={onOpenChange}
        links={[
          {
            title: "Важливо",
            label: String(tasks.filter((task) => task.isImportant).length),
            icon: Star,
            variant: "ghost",
            to: "/tasks/important",
          },
          {
            title: "Запланованно",
            label: String(tasks.filter((task) => task.dueDate).length),
            icon: NotebookPen,
            variant: "ghost",
            to: "/tasks/planned",
          },
          {
            title: "Задачі",
            label: tasks.length.toString(),
            icon: ClipboardList,
            variant: "ghost",
            to: "/tasks/all",
          },
        ]}
      />
      <Separator />
      <Nav
        onOpenChange={onOpenChange}
        // isCollapsed={isCollapsed}
        links={[
          {
            title: "Графік",
            label: "972",
            icon: BarChart3,
            variant: "ghost",
            to: "/dashboard",
          },
        ]}
      />
    </div>
  );
};

export default Sidebar;
