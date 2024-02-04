import { Task } from "@/types/tasks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef } from "react";
import { useToast } from "../ui/use-toast";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskInput: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const { toast } = useToast();
  const titleRef = useRef<HTMLInputElement>(null);

  const onSubmitTask = () => {
    if (!titleRef.current?.value.trim()) {
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
      dueDate: null,
      id: Math.random(),
      priority: null,
      status: "new",
      tags: [],
      title: (titleRef.current?.value as string) || "",
      updatedAt: null,
    };

    onAddTask(newTask);
    toast({
      title: "Ви додали нове завдання!",
      variant: "success",
    });
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <Input type="text" placeholder="Додати задачу..." ref={titleRef} />
      <Button type="submit" onClick={() => onSubmitTask()}>
        Додати
      </Button>
    </div>
  );
};

export default TaskInput;
