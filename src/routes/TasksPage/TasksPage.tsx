import Filters from "@/components/Filters/Filters";
import TaskForm from "@/components/TaskForm/TaskForm";
import Tasks from "@/components/Tasks/Tasks";
import { tasksTabStatus } from "@/helpers/tasks-status";
import { useTasks } from "@/hooks/useTasks";
import { TaskStatus } from "@/types/tasks";
import { useParams } from "react-router-dom";


const TasksPage = () => {
  const statusTask = useParams().statusTask as TaskStatus;
  const { onChangeStatusTask, tasks, onAddTask, onRemoveTask } = useTasks();

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between">
        <h1 className="font-bold text-5xl mb-5 text-left">
          {tasksTabStatus(statusTask)} задачі
        </h1>
        <Filters />
      </div>
      <div className="flex-1">
        <Tasks
          tasks={tasks}
          onChangeStatusTask={onChangeStatusTask}
          onRemoveTask={onRemoveTask}
          status={statusTask}
        />
      </div>
      <TaskForm onAddTask={onAddTask} />
    </div>
  );
};

export default TasksPage;
