import { Task, TaskStatus } from "@/types/tasks";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Star, StarIcon, XCircle } from "lucide-react";
import { AlertDialogComponent } from "../AlertDialog/AlertDialogComponent";
import DropdownAction from "../TaskActions/DropdownTaskAction";
import DropdownTaskAction from "../TaskActions/DropdownTaskAction";
import { tasksStatusLabel } from "@/helpers/tasks-status";
import { Status, statusesTask } from "@/mock/statuses";

interface TaskItemProps {
  task: Task;
  onChangeStatusTask: (taskId: number, type: TaskStatus) => void;
  onRemoveTask: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onChangeStatusTask,
  onRemoveTask,
}) => {
  const {
    title,
    assignedTo,
    cancelledDate,
    createdAt,
    description,
    dueDate,
    id,
    priority,
    status,
    tags,
    updatedAt,
  } = task;

  const statusName = useMemo(() => {
    const style =
      status === "completed"
        ? "text-green-500"
        : status === "cancelled"
        ? "text-red-500"
        : status === "in_progress"
        ? "text-green-300"
        : "";

    return (
      <div
        className={cn(
          "w-32 border-r-4 flex items-center border-red-400 h-full",
          style
        )}
      >
        {statusesTask.find((status) => status.value === task.status)?.label}
        {/* {tasksStatusLabel(status)} */}
        {/* {name} */}
      </div>
    );
  }, [task.status]);

  return (
    <Card className="px-4 py-2 flex justify-between">
      <div className="flex items-center gap-5 py-2 px-6">
        <div
          className="text-red-300 hover:text-red-500 cursor-pointer"
          // onClick={() => onRemoveTask(task.id)}
        >
          <AlertDialogComponent onSubmit={() => onRemoveTask(task.id)}>
            <XCircle />
          </AlertDialogComponent>
        </div>
        {statusName}
        <Checkbox
          id="terms"
          checked={task.status === "completed"}
          // defaultChecked={task.status === "completed"}
          disabled={task.status === "cancelled"}
          onClick={() => onChangeStatusTask(task.id, "completed")}
        />
        <div
          className={cn(
            "flex flex-col gap-2 justify-start text-left",
            task.status === "completed" ? "line-through font-extrabold" : ""
          )}
        >
          <Label htmlFor="terms">{title}</Label>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <StarIcon className="hover:text-yellow-500" />
        <DropdownTaskAction
          onChangeStatusTask={onChangeStatusTask}
          task={task}
        />
      </div>
    </Card>
  );
};

export default TaskItem;
