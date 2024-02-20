import { Task } from "@/types/tasks";
import Tasks from "../Tasks/Tasks";
import { ScrollArea } from "../ui/scroll-area";

interface RecentTasksProps {
  tasks: Task[];
}

export function RecentSales({ tasks }: RecentTasksProps) {
  return (
    <div className="space-y-8 flex flex-col overflow-y-hidden h-80">
      <ScrollArea className="h-full">
        <Tasks tasks={tasks} />
      </ScrollArea>
    </div>
  );
}
