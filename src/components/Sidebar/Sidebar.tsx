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

interface SidebarProps {
  tasks: Task[];
}

const Sidebar: React.FC<SidebarProps> = ({ tasks }) => {
  return (
    <div className="flex flex-col border w-52">
      <div className="border">
        <ModeToggle />
      </div>
      <Nav
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
        // isCollapsed={isCollapsed}
        links={[
          {
            title: "Графік",
            label: "972",
            icon: BarChart3,
            variant: "ghost",
            to: "/dashboard",
          },
          {
            title: "Вхід",
            label: "342",
            icon: LogIn,
            variant: "ghost",
            to: "/login",
          },
          {
            title: "Повідомлення",
            label: "128",
            icon: AtSign,
            variant: "ghost",
            to: "/messages",
          },
          //   {
          //     title: "Shopping",
          //     label: "8",
          //     icon: ShoppingCart,
          //     variant: "ghost",
          //   },
          //   {
          //     title: "Promotions",
          //     label: "21",
          //     icon: Archive,
          //     variant: "ghost",
          //   },
        ]}
      />
    </div>
  );
};

export default Sidebar;
