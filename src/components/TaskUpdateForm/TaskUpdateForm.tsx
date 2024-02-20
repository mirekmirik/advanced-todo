import { useState } from "react";
import TaskInput from "../TaskForm/TaskInput";
import TaskInputTags from "../TaskForm/TaskInputTags";
import { Button } from "../ui/button";
import { Subtask, Task } from "@/types/tasks";
import { useContextOutlet } from "@/routes/Root";
import { toast } from "../ui/use-toast";



interface TaskUpdateFormProps {
  parentTaskId?: number;
  task: Task | Subtask;
  onSubmit?: () => void;
}

const TaskUpdateForm: React.FC<TaskUpdateFormProps> = ({
  task,
  parentTaskId,
  onSubmit,
}) => {
  const [title, setTitle] = useState(task.title);
  const [tags, setTags] = useState(task.tags);
  const [tag, setTag] = useState("");
  const {
    tasks: { onChangeTagsTask, onChangeTitleTask },
  } = useContextOutlet();

  const [showInputTag, setShowInputTag] = useState(false);

  const onUpdateSubmit = () => {
    if (!title.trim())
      return toast({
        variant: "destructive",
        title: "Будь-ласка, заповніть назву",
      });
    onChangeTagsTask?.(task.id, [...tags, tag], parentTaskId);
    onChangeTitleTask?.(task.id, title, parentTaskId);
    toast({
      variant: "success",
      title: "Успішно змінено!",
    });
    onSubmit?.();
  };

  return (
    <div className="flex flex-col gap-3">
      <TaskInput
        isShowInputTags={showInputTag}
        onTitleChange={(title) => setTitle(title)}
        value={title}
        setShowInputTags={setShowInputTag}
      />
      {showInputTag && (
        <TaskInputTags
          value={tag}
          tags={tags}
          onTagChange={(tag) => setTag(tag)}
          onTagsChange={(tags) => setTags(tags)}
        />
      )}
      <Button onClick={onUpdateSubmit}>Підтвердити</Button>
    </div>
  );
};

export default TaskUpdateForm;
