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
import { Subtask } from "@/types/tasks";
import { Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface SubtaskItemProps extends TasksActionType {
  subtask: Subtask;
  parentTaskId?: number;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({
  subtask,
  onChangeStatusTask,
  parentTaskId,
  onRemoveTask,
  onUpLevelTask,
  onChangeTagsTask,
  onChangeTitleTask,
}) => {
  const [title, setTitle] = useState(subtask.title);
  const [tags, setTags] = useState(subtask.tags);
  const [tag, setTag] = useState("");

  const [showInputTag, setShowInputTag] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [initialTask, setInitialTask] = useState(false);

  useEffect(() => {
    setInitialTask(true);
  }, []);

  const onUpdateSubmit = () => {
    if (!title.trim())
      return toast({
        variant: "destructive",
        title: "Будь-ласка, заповніть назву",
      });
    onChangeTagsTask?.(subtask.id, [...tags, tag], parentTaskId);
    onChangeTitleTask?.(subtask.id, title, parentTaskId);
    toast({
      variant: "success",
      title: "Успішно змінено!",
    });
    setShowUpdateForm(false);
  };

  const statusName = useMemo(() => {
    const style =
      subtask.status === "completed"
        ? "text-green-500"
        : subtask.status === "cancelled"
        ? "text-red-500"
        : subtask.status === "in_progress"
        ? "text-green-300"
        : "";

    return (
      <div
        className={cn(
          "min-w-32 border-r-4 flex items-center border-red-400 h-full",
          style
        )}
      >
        {statusesTask.find((status) => status.value === subtask.status)?.label}
      </div>
    );
  }, [subtask.status]);

  return (
    // <div className="flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <Card
        className={cn(
          "py-2 flex duration-500 hover:dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white flex-1 px-4",
          initialTask ? "show-animate-block" : "hidden-animate-block"
        )}
      >
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-5 py-2 flex-1">
            <div
              className="hover:text-red-500 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {/* onRemoveTask(task.id) */}
              <AlertDialogComponent
                onSubmit={() => onRemoveTask?.(subtask.id, parentTaskId)}
              >
                <Trash size={20} />
              </AlertDialogComponent>
            </div>
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
                <p className="text-sm text-muted-foreground">
                  {subtask.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 h-full">
                {subtask.tags.map((tag, i) => (
                  <Badge key={i}>{tag}</Badge>
                ))}
              </div>
            </div>
            <DropdownTaskAction
              onChangeStatusTask={onChangeStatusTask}
              task={subtask}
              parentTaskId={parentTaskId}
              onUpLevelTask={onUpLevelTask}
            />
          </div>
          {showUpdateForm && (
            <TaskUpdateForm
              onTagChange={setTag}
              onSubmit={onUpdateSubmit}
              valueTitle={title}
              onTagsChange={(tags) => setTags(tags)}
              onTitleChange={(title) => setTitle(title)}
              showInputTag={showInputTag}
              isShowInputTags={showInputTag}
              tags={tags}
              valueTag={tag}
              setShowInputTags={setShowInputTag}
            />
          )}
        </div>
      </Card>
      <Button onClick={() => setShowUpdateForm((prev) => !prev)}>
        Редагувати
      </Button>
    </div>
    // </div>
  );
};

export default SubtaskItem;

//  <Card className="py-2 px-1 flex flex-row items-center gap-3 flex-1"
// id="terms"
// checked={subtask.status === "completed"}
// disabled={subtask.status === "cancelled"}
// onClick={() =>
//   onChangeStatusTask(subtask.id, "completed", parentTaskId)
// }
// >
// <p className={cn(subtask.status === "completed" ? "line-through" : "")}>
// {subtask.title}
// </p>
// <div className="flex flex-wrap gap-2 h-full">
// {subtask.tags.map((tag, i) => (
//   <Badge key={i}>{tag}</Badge>
// ))}
// </div>
// <DropdownTaskAction onChangeStatusTask={onChangeStatusTask} parentTaskId={parentTaskId} task={subtask} /> */}
// <Card/>
