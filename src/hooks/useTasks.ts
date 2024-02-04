import { todos } from "@/mock/todos";
import { Task, TaskStatus } from "@/types/tasks";
import { useState } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(todos);

  const onChangeStatusTask = (taskId: number, type: TaskStatus) => {
    const foundTaskIdx = tasks.findIndex((task) => task.id === taskId);
    if (foundTaskIdx >= 0) {
      const copyTasks = [...tasks];
      const pickedTask = copyTasks[foundTaskIdx];
      if (pickedTask.status === "completed") {
        pickedTask.status = "new";
      } else {
        pickedTask.status = type;
      }
      setTasks(copyTasks);
    }
  };

  const onAddTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
    console.log("tasks", tasks);
  };

  const onRemoveTask = (taskId: number) => {
    const foundTaskIdx = tasks.findIndex((task) => task.id === taskId);
    if (foundTaskIdx >= 0) {
      const copyTasks = [...tasks];
      copyTasks.splice(foundTaskIdx, 1);
      setTasks(copyTasks);
    }
  };

  return { tasks, onChangeStatusTask, onAddTask, onRemoveTask };
};
