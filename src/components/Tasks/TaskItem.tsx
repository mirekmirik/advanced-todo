import { Task, TaskStatus } from "@/types/tasks";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { StarIcon, XCircle } from "lucide-react";
import { AlertDialogComponent } from "../AlertDialog/AlertDialogComponent";
import DropdownTaskAction from "../TaskActions/DropdownTaskAction";
import { statusesTask } from "@/mock/statuses";
import { Badge } from "../ui/badge";
import { formatDate } from "@/helpers/format-date";

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
  const [initialTask, setInitialTask] = useState(false);

  useEffect(() => {
    setInitialTask(true);
  }, []);

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
          "min-w-32 border-r-4 flex items-center border-red-400 h-full",
          style
        )}
      >
        {statusesTask.find((status) => status.value === task.status)?.label}
      </div>
    );
  }, [task.status]);

  return (
    <Card
      className={cn(
        "px-4 py-2 flex justify-between duration-500",
        initialTask ? "show-animate-block" : "hidden-animate-block"
      )}
    >
      <div className="flex items-center gap-5 py-2 px-6">
        <div className="hover:text-red-500 cursor-pointer">
          <AlertDialogComponent onSubmit={() => onRemoveTask(task.id)}>
            <XCircle size={20} />
          </AlertDialogComponent>
        </div>
        {statusName}
        <Checkbox
          id="terms"
          checked={task.status === "completed"}
          disabled={task.status === "cancelled"}
          onClick={() => onChangeStatusTask(task.id, "completed")}
        />
        <div
          className={cn(
            "flex flex-row items-center gap-2 justify-start text-left",
            task.status === "completed" ? "line-through font-extrabold" : ""
          )}
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="terms">{title}</Label>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2 h-full">
            {tags.map((tag, i) => (
              <Badge key={i}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
      {/* <div>{formatDate(createdAt)}</div> */}
      <div className="flex items-center gap-5">
        <StarIcon
          className={cn(
            "hover:text-yellow-500 transition transition-300 cursor-pointer",
            task.isImportant ? "text-yellow-500" : ""
          )}
        />
        <DropdownTaskAction
          onChangeStatusTask={onChangeStatusTask}
          task={task}
        />
      </div>
    </Card>
  );
};

export default TaskItem;
