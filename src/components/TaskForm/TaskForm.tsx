import { Task } from "@/types/tasks";
import TaskInputs from "./TaskInputs";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  return (
    <div className="flex flex-col gap-2 border p-3">
      <TaskInputs onAddTask={onAddTask} />
    </div>
  );
};

export default TaskForm;
