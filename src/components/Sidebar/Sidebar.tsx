import {
  BarChart3,
  ClipboardList,
  NotebookPen,
  Star,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Nav } from "./Nav";
import { ModeToggle } from "../Theme/mode-toggle";
import { Task } from "@/types/tasks";

interface SidebarProps {
  tasks: Task[];
  onOpenChange?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tasks, onOpenChange }) => {

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
