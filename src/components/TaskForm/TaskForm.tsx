import { useTasks } from "@/hooks/useTasks";
import TaskInput from "./TaskInput";
import { Task } from "@/types/tasks";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  //   const { onAddTask } = useTasks();

  return <TaskInput onAddTask={onAddTask} />;
};

export default TaskForm;
