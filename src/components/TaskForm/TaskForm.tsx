import { Task } from "@/types/tasks";
import TaskInputs from "./TaskInputs";
import { TasksActionType, useTasks } from "@/hooks/useTasks";
import { useOutletContext } from "react-router-dom";
import { useContextOutlet } from "@/routes/Root";

interface TaskFormProps extends TasksActionType {
  taskId?: number;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskId }) => {
  const {
    tasks: { onAddTask },
  } = useContextOutlet();

  return (
    <div className="flex flex-col gap-2 border p-3">
      <TaskInputs onAddTask={onAddTask} taskId={taskId} />
    </div>
  );
};

export default TaskForm;
