import { Task, TaskStatus, TaskTabsAndStatus } from "@/types/tasks";
import TaskList from "./TaskList";
import { useSearchParams } from "react-router-dom";
import { TasksActionType } from "@/hooks/useTasks";

interface TasksProps extends TasksActionType {
  status?: TaskTabsAndStatus;
  tasks: Task[];
}

const Tasks: React.FC<TasksProps> = ({ tasks, status }) => {
  const [searchParams] = useSearchParams();

  const filterTasks = () => {
    const statusOfTask = searchParams.get("status") as TaskStatus;

    let filteredTasks = [];
    switch (status) {
      case "important":
        filteredTasks = tasks.filter((task) => task.isImportant === true);
        break;
      case "planned":
        filteredTasks = tasks.filter((task) => task.dueDate);
        break;
      default:
        filteredTasks = tasks;
    }
    if (statusOfTask) {
      return filteredTasks.filter((task) => task.status === statusOfTask);
    }
    return filteredTasks;
  };

  return <TaskList tasks={filterTasks()} />;
};

export default Tasks;
