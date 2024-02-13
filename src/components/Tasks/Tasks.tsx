import { Task, TaskStatus, TaskTabsAndStatus } from "@/types/tasks";
import TaskList from "./TaskList";
import { ScrollArea } from "../ui/scroll-area";
import { useSearchParams } from "react-router-dom";
import { TasksActionType } from "@/hooks/useTasks";

interface TasksProps extends TasksActionType {
  tasks: Task[];
  status?: TaskTabsAndStatus;
}

const Tasks: React.FC<TasksProps> = ({
  status,
  tasks,
  onChangeStatusTask,
  onRemoveTask,
  onAddDueCalendar,
  onAddTask,
  onToggleImportantTask,
  onUpLevelTask,
  onAddNote,
  onChangeTagsTask,onChangeTitleTask
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

  return (
    <ScrollArea className="rounded-md h-full">
      <TaskList
        tasks={filterTasks()}
        onChangeStatusTask={onChangeStatusTask}
        onRemoveTask={onRemoveTask}
        onAddDueCalendar={onAddDueCalendar}
        onAddTask={onAddTask}
        onToggleImportantTask={onToggleImportantTask}
        onUpLevelTask={onUpLevelTask}
        onAddNote={onAddNote}
        onChangeTagsTask={onChangeTagsTask}
        onChangeTitleTask={onChangeTitleTask}
      />
    </ScrollArea>
  );
};

export default Tasks;
