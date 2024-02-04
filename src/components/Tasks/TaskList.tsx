import { Task, TaskStatus } from "@/types/tasks";
import TaskItem from "./TaskItem";
import { Card } from "../ui/card";

interface TaskListProps {
  tasks: Task[];
  onChangeStatusTask: (taskId: number, type: TaskStatus) => void;
  onRemoveTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onChangeStatusTask,
  onRemoveTask,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onChangeStatusTask={onChangeStatusTask}
          onRemoveTask={onRemoveTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
