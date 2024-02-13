import { Task } from "@/types/tasks";
import TaskInputs from "./TaskInputs";
import { TasksActionType, useTasks } from "@/hooks/useTasks";

interface TaskFormProps extends TasksActionType {
  onAddTask: (task: Task, parentTaskId?: number) => void;
  taskId?: number;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, taskId }) => {
  const { tasks, onAddDueCalendar, onFindTask } = useTasks();

  return (
    <div className="flex flex-col gap-2 border p-3">
      <TaskInputs onAddTask={onAddTask} taskId={taskId} />
    </div>
  );
};

export default TaskForm;
