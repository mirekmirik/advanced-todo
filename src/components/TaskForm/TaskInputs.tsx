import { Task } from "@/types/tasks";
import { Button } from "../ui/button";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import TaskInputTags from "./TaskInputTags";
import TaskInput from "./TaskInput";
import { cn } from "@/lib/utils";

interface TaskInputsProps {
  onAddTask: (task: Task) => void;
}

const TaskInputs: React.FC<TaskInputsProps> = ({ onAddTask }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isShowInputTags, setShowInputTags] = useState(false);

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
      dueDate: dueDate,
      id: Math.random(),
      priority: null,
      status: "new",
      isImportant: false,
      isPlanned: !!dueDate,
      tags: tag ? [...tags, ...tag.split(",")] : tags,
      title,
      updatedAt: null,
    };
    onAddTask(newTask);
    toast({
      title: "Ви додали нове завдання!",
      variant: "success",
    });
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
      <div className="w-full">
        <Button onClick={() => onSubmitTask()} className="w-1/2">
          Додати
        </Button>
      </div>
    </div>
  );
};

export default TaskInputs;
