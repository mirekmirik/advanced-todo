import { AlertDialogComponent } from "@/components/AlertDialog/AlertDialogComponent";
import DropdownTaskAction from "@/components/TaskActions/DropdownTaskAction";
import TaskUpdateForm from "@/components/TaskUpdateForm/TaskUpdateForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { TasksActionType } from "@/hooks/useTasks";
import { cn } from "@/lib/utils";
import { statusesTask } from "@/mock/statuses";
import { useContextOutlet } from "@/routes/Root";
import { Subtask } from "@/types/tasks";
import { useMediaQuery } from "@react-hook/media-query";
import { Ban, CheckCheck, StickyNote, Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface SubtaskItemProps extends TasksActionType {
  subtask: Subtask;
  parentTaskId?: number;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({ subtask, parentTaskId }) => {
  const {
    tasks: { onChangeStatusTask, onUpLevelTask, onRemoveTask },
  } = useContextOutlet();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [initialTask, setInitialTask] = useState(false);
  const isMobile = useMediaQuery("(max-width: 560px)");

  const onUpdateSubmit = () => {
    setShowUpdateForm(false);
  };

  useEffect(() => {
    setInitialTask(true);
  }, []);

  const statusName = useMemo(() => {
    const style =
      subtask.status === "completed"
        ? "text-green-500"
        : status === "cancelled"
        ? "text-red-500"
        : status === "in_progress"
        ? "text-green-300"
        : "";
    const updatedStatus =
      subtask.status === "completed" ? (
        <CheckCheck />
      ) : subtask.status === "cancelled" ? (
        <Ban />
      ) : (
        <StickyNote />
      );

    return (
      <div
        className={cn(
          "min-w-32 flex items-center  border-red-400 h-full",
          style,
          isMobile && "min-w-8"
        )}
      >
        {updatedStatus}
      </div>
    );
  }, [subtask.status, isMobile]);

  return (
    <div className="flex items-center gap-3">
      <Card
        className={cn(
          "py-2 flex duration-500 hover:dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white flex-1 px-4",
          initialTask ? "show-animate-block" : "hidden-animate-block"
        )}
      >
        {/* <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-5 py-2 flex-1">
            {statusName}
            <Checkbox
              id="terms"
              checked={subtask.status === "completed"}
              disabled={subtask.status === "cancelled"}
              onClick={() =>
                onChangeStatusTask?.(subtask.id, "completed", parentTaskId)
              }
            />

            <div
              className={cn(
                "flex flex-row items-center gap-2 justify-start text-left flex-1",
                subtask.status === "completed"
                  ? "line-through font-extrabold"
                  : ""
              )}
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="terms">{subtask.title}</Label>
              </div>
              <div className="flex flex-wrap gap-2 h-full">
                {subtask.tags.map((tag, i) => (
                  <Badge key={i}>{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="flex">
              <div
                className="hover:text-red-500 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <AlertDialogComponent
                  onSubmit={() => onRemoveTask?.(subtask.id, parentTaskId)}
                >
                  <Trash size={20} />
                </AlertDialogComponent>
              </div>
              <DropdownTaskAction
                onChangeStatusTask={onChangeStatusTask}
                task={subtask}
                parentTaskId={parentTaskId}
                onUpLevelTask={onUpLevelTask}
              />
            </div>
          </div>

          {showUpdateForm && (
            <TaskUpdateForm
              task={subtask}
              parentTaskId={parentTaskId}
              onSubmit={onUpdateSubmit}
            />
          )}
        </div> */}

        <div className={cn("flex flex-1", isMobile ? "flex-col" : null)}>
          <div className="flex items-center max-sm:gap-2 gap-5 py-2 flex-1">
            {statusName}
            <Checkbox
              id="terms"
              checked={subtask.status === "completed"}
              disabled={subtask.status === "cancelled"}
              onClick={() => onChangeStatusTask?.(subtask.id, "completed", parentTaskId)}
            />
            <div
              className={cn(
                "flex flex-row items-center gap-2 text-left flex-1 justify-between",
                subtask.status === "completed"
                  ? "line-through font-extrabold"
                  : ""
              )}
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="terms" className="max-sm:text-xs text-balance">
                  {subtask.title}
                </Label>
              </div>
              <div className="flex flex-wrap gap-2 h-full ">
                {subtask.tags.map((tag, i) => (
                  <Badge key={i} className="max-sm:text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {/* <div>{formatDate(createdAt)}</div> */}

          <div
            className="flex items-center max-sm:gap-2 gap-5 justify-end"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="hover:text-red-500 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <AlertDialogComponent onSubmit={() => onRemoveTask?.(subtask.id, parentTaskId)}>
                <Trash size={20} />
              </AlertDialogComponent>
            </div>
            {/* <StarIcon
              onClick={() => onToggleImportantTask?.(task.id)}
              className={cn(
                "hover:text-yellow-500 transition transition-300 cursor-pointer",
                task.isImportant ? "text-yellow-500" : ""
              )}
            /> */}
            <DropdownTaskAction
              onChangeStatusTask={onChangeStatusTask}
              task={subtask}
              parentTaskId={parentTaskId}
              onUpLevelTask={onUpLevelTask}
            />
          </div>
        </div>
      </Card>
      <Button onClick={() => setShowUpdateForm((prev) => !prev)}>
        Редагувати
      </Button>
    </div>
  );
};

export default SubtaskItem;
