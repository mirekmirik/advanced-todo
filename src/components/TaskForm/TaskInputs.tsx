import { Task } from "@/types/tasks";
import { Button } from "../ui/button";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import TaskInputTags from "./TaskInputTags";
import TaskInput from "./TaskInput";
import { cn } from "@/lib/utils";
import { TasksActionType } from "@/hooks/useTasks";

interface TaskInputsProps extends TasksActionType {
  taskId?: number;
}

const TaskInputs: React.FC<TaskInputsProps> = ({ onAddTask, taskId }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isShowInputTags, setShowInputTags] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const onSubmitTask = () => {
    if (!title.trim()) {
      return toast({
        variant: "destructive",
        title: "Поле не може бути пустим!",
      });
    }
    const newTask: Task = {
      assignedTo: null,
      cancelledDate: null,
      createdAt: new Date(),
      description: null,
      dueDate: undefined,
      id: Math.random(),
      priority: null,
      status: "new",
      isImportant: false,
      tags: tag ? [...tags, ...tag.split(",")] : tags,
      title,
      updatedAt: null,
      subtasks: [],
      note: "",
    };

    onAddTask?.(newTask, taskId);
    setShowInputTags(false);
    setTitle("");
    setTag("");
    setTags([]);
  };


  return (
    <div className="gap-2 flex flex-col">
      <TaskInput
        value={title}
        onTitleChange={(title) => setTitle(title)}
        setShowInputTags={setShowInputTags}
        isShowInputTags={isShowInputTags}
        onChangeDate={(date) => setDueDate(date)}
      />
      <div
        className={cn(
          "duration-300",
          isShowInputTags ? "show-animate-block" : "hidden-animate-block"
        )}
      >
        <TaskInputTags
          onTagsChange={(tags) => setTags(tags)}
          onTagChange={(tag) => setTag(tag)}
          value={tag}
          tags={tags}
        />
      </div>
      <div className="w-full text-center">
        <Button onClick={() => onSubmitTask()} className="w-1/2">
          Додати
        </Button>
      </div>
    </div>
  );
};

export default TaskInputs;
