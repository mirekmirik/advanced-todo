import { Task } from "@/types/tasks";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Ban,
  CheckCheck,
  ListChecks,
  StarIcon,
  StickyNote,
  Trash,
} from "lucide-react";
import { AlertDialogComponent } from "../AlertDialog/AlertDialogComponent";
import DropdownTaskAction from "../TaskActions/DropdownTaskAction";
import { Badge } from "../ui/badge";
import { TasksActionType } from "@/hooks/useTasks";
import { useContextOutlet } from "@/routes/Root";
import { useMediaQuery } from "@react-hook/media-query";
import { formatDate } from "@/helpers/format-date";

interface TaskItemProps extends TasksActionType {
  task: Task;
  pickedTask?: Task | null;
  onChangeTask?: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  pickedTask,
  onChangeTask,
}) => {
  const {
    tasks: { onChangeStatusTask, onRemoveTask, onToggleImportantTask },
  } = useContextOutlet();

  const { title, id, status, tags } = task;
  const [initialTask, setInitialTask] = useState(false);
  const isMobile = useMediaQuery("(max-width: 560px)");

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (onChangeTask) {
      onChangeTask(task);
    }
  };

  useEffect(() => {
    setInitialTask(true);
  }, []);

  const statusName = useMemo(() => {
    const style =
      status === "completed"
        ? "text-green-500"
        : status === "cancelled"
        ? "text-red-500"
        : status === "in_progress"
        ? "text-green-300"
        : "";
    const updatedStatus =
      task.status === "completed" ? (
        <CheckCheck />
      ) : task.status === "cancelled" ? (
        <Ban />
      ) : (
        <StickyNote />
      );

    return (
      <div
        className={cn(
          "min-w-4 sm flex items-center  border-red-400 h-full",
          style,
          isMobile && "min-w-8"
        )}
      >
        {updatedStatus}
      </div>
    );
  }, [task.status, isMobile]);

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "w-full max-sm:px-1 sm:px-4 py-2 flex justify-between duration-500 hover:dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white cursor-pointer",
        initialTask ? "show-animate-block" : "hidden-animate-block",
        pickedTask && pickedTask.id === id
          ? "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
          : ""
      )}
    >
      <div className={cn("flex flex-1 flex-col lg:flex-row")}>
        <div className="flex items-center max-sm:gap-2 gap-5 py-2 flex-1">
          {statusName}
          <Checkbox
            id="terms"
            checked={task.status === "completed"}
            disabled={task.status === "cancelled"}
            onClick={(event) => {
              event.stopPropagation();
              onChangeStatusTask?.(task.id, "completed");
            }}
          />
          <div
            className={cn(
              "flex flex-row items-center gap-2 text-left flex-1 justify-between",
              task.status === "completed" ? "line-through font-extrabold" : ""
            )}
          >
            <div className="flex flex-col gap-1">
              <Label htmlFor="terms" className=" text-balance">
                {title}
              </Label>
              <div className="flex flex-row gap-3">
                {task.subtasks.length ? <ListChecks size={18} /> : null}
                {task.note ? <StickyNote size={18} /> : null}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 h-full mr-2">
              {tags.map((tag, i) => (
                <Badge key={i} className="max-sm:text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex items-center max-sm:gap-2 gap-5 justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-sm:text-[10px] text-sm text-muted-foreground">
            {formatDate(task.createdAt)}
          </div>
          <div className="flex flex-row items-center gap-2">
            <div
              className="hover:text-red-500 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <AlertDialogComponent onSubmit={() => onRemoveTask?.(task.id)}>
                <Trash size={20} />
              </AlertDialogComponent>
            </div>
            <StarIcon
              onClick={() => onToggleImportantTask?.(task.id)}
              className={cn(
                "hover:text-yellow-500 transition transition-300 cursor-pointer",
                task.isImportant ? "text-yellow-500" : ""
              )}
            />
            <DropdownTaskAction task={task} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
