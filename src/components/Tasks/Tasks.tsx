import { Task, TaskStatus } from "@/types/tasks";
import TaskList from "./TaskList";
import { ScrollArea } from "../ui/scroll-area";

interface TasksProps {
  tasks: Task[];
  onChangeStatusTask: (taskId: number, type: TaskStatus) => void;
  status?: TaskStatus;
  onRemoveTask: (taskId: number) => void;
}

const Tasks: React.FC<TasksProps> = ({
  status,
  tasks,
  onChangeStatusTask,
  onRemoveTask,
}) => {
  const filterTasks = () => {
    switch (status) {
      case "completed":
        return tasks.filter((task) => task.status === "completed");
      case "cancelled":
        return tasks.filter((task) => task.status === "cancelled");
      case "in_progress":
        return tasks.filter((task) => task.status === "in_progress");
      case "new":
        return tasks.filter((task) => task.status === "new");
      default:
        return tasks;
    }
  };

  return (
    <ScrollArea className="rounded-md h-full">
      <TaskList
        tasks={filterTasks()}
        onChangeStatusTask={onChangeStatusTask}
        onRemoveTask={onRemoveTask}
      />
    </ScrollArea>
  );
};

export default Tasks;
