import { Task, TaskStatus, TaskTabs, TaskTabsAndStatus } from "@/types/tasks";
import TaskList from "./TaskList";
import { ScrollArea } from "../ui/scroll-area";
import { useSearchParams } from "react-router-dom";

interface TasksProps {
  tasks: Task[];
  onChangeStatusTask: (taskId: number, type: TaskStatus) => void;
  status?: TaskTabsAndStatus;
  onRemoveTask: (taskId: number) => void;
}

const Tasks: React.FC<TasksProps> = ({
  status,
  tasks,
  onChangeStatusTask,
  onRemoveTask,
}) => {
  const [searchParams] = useSearchParams();

  const filterTasks = () => {
    const statusOfTask = searchParams.get("status") as TaskStatus;
    let filteredTasks = [];
    switch (status) {
      case "important":
        filteredTasks = tasks.filter((task) => task.isImportant === true);
        break;
      case "planned":
        filteredTasks = tasks.filter((task) => task.isPlanned === true);
        break;
      default:
        filteredTasks = tasks;
    }
    if (statusOfTask) {
      return filteredTasks.filter((task) => task.status === statusOfTask);
    }
    return filteredTasks;
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
