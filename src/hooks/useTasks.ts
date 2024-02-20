import { useToast } from "@/components/ui/use-toast";
import { turnIntoTask } from "@/helpers/from-subtask-to-task";
import { Subtask, Task, TaskStatus } from "@/types/tasks";
import { useState } from "react";

export type TasksActionType = {
  onChangeStatusTask?: (
    taskId: number,
    type: TaskStatus,
    parentTaskId?: number
  ) => void;
  onRemoveTask?: (taskId: number, parentTaskId?: number) => void;
  onAddDueCalendar?: (taskId: number, date: Date | undefined) => void;
  onAddTask?: (task: Task, parentTaskId?: number) => void;
  onToggleImportantTask?: (taskId: number) => void;
  onUpLevelTask?: (taskId: number, parentTaskId: number) => void;
  onAddNote?: (taskId: number, noteValue: string) => void;
  onChangeTitleTask?: (
    taskId: number,
    value: string,
    parentTaskId?: number
  ) => void;
  onChangeTagsTask?: (
    taskId: number,
    value: string[],
    parentTaskId?: number
  ) => void;
};
const onAddToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const onGetTaskLocalStorageItems = () => {
  const localStorageItems = localStorage.getItem("tasks");
  if (!localStorageItems) return [];
  return JSON.parse(localStorageItems) as Task[];
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(onGetTaskLocalStorageItems());
  const { toast } = useToast();

  const onChangeStatusTask = (
    taskId: number,
    type: TaskStatus,
    parentTaskId?: number
  ) => {
    // if subtask
    if (parentTaskId) {
      const copyTasks = [...tasks];
      const foundParent = copyTasks.find((task) => task.id === parentTaskId);
      const findIndexOfSubtask =
        foundParent?.subtasks.findIndex((subtask) => subtask.id === taskId) ||
        0;
      if (findIndexOfSubtask >= 0) {
        const pickedTask = foundParent?.subtasks[findIndexOfSubtask];
        if (pickedTask) {
          if (pickedTask.status === "completed") {
            pickedTask.status = "new";
          } else {
            pickedTask.status = type;
            pickedTask.completedAt = new Date();
          }
          onAddToLocalStorage(copyTasks);
          setTasks(copyTasks);
        }
      }
      return;
    }
    // if task
    const foundTaskIdx = tasks.findIndex((task) => task.id === taskId);
    if (foundTaskIdx >= 0) {
      const copyTasks = [...tasks];
      const pickedTask = copyTasks[foundTaskIdx];
      if (pickedTask.status === "completed") {
        pickedTask.status = "new";
      } else {
        pickedTask.status = type;
        if (type === "completed") {
          pickedTask.completedAt = new Date();
        }
      }
      onAddToLocalStorage(copyTasks);

      setTasks(copyTasks);
    }
  };

  const onAddTask = (task: Task | Subtask, parentTaskId?: number) => {
    // if subtasks
    const copyTasks = [...tasks];
    if (parentTaskId) {
      const findTaskIdx = tasks.findIndex((task) => task.id === parentTaskId);
      if (findTaskIdx >= 0) {
        copyTasks[findTaskIdx].subtasks.push({ ...task, taskId: parentTaskId });
        setTasks(copyTasks);
        return onAddToLocalStorage(copyTasks);
      }
    }
    // if task
    const newItems = [...copyTasks, task as Task];
    setTasks(newItems);
    onAddToLocalStorage(newItems);
    toast({
      title: "Ви додали нове завдання!",
      variant: "success",
    });
  };

  const onRemoveTask = (taskId: number, parentTaskId?: number) => {
    const copyTasks = [...tasks];

    if (parentTaskId) {
      const foundParentTask = copyTasks.find(
        (task) => task.id === parentTaskId
      );
      if (foundParentTask) {
        const foundSubtaskIdx = foundParentTask.subtasks.findIndex(
          (subtask) => subtask.id === taskId
        );
        if (foundSubtaskIdx >= 0) {
          foundParentTask.subtasks.splice(foundSubtaskIdx, 1);
          setTasks(copyTasks);
          onAddToLocalStorage(copyTasks);
          toast({
            variant: "default",
            title: "Ви видалили завдання!",
          });
        }
      }
    } else {
      const foundTaskIdx = tasks.findIndex((task) => task.id === taskId);
      if (foundTaskIdx >= 0) {
        copyTasks.splice(foundTaskIdx, 1);
        setTasks(copyTasks);
        onAddToLocalStorage(copyTasks);
      }
      toast({
        variant: "default",
        title: "Ви видалили завдання!",
      });
    }
  };

  const onAddDueCalendar = (taskId: number, date: Date | undefined) => {
    const copyTasks = [...tasks];
    const foundTask = copyTasks.find((task) => task.id === taskId);
    if (foundTask) {
      foundTask.dueDate = date;
      setTasks(copyTasks);
      onAddToLocalStorage(copyTasks);

      toast({
        variant: "default",
        title: `Новий дедлайн для задачі №${foundTask?.id}`,
      });
    }
  };

  const onToggleImportantTask = (taskId: number) => {
    const copyTasks = [...tasks];
    const foundTask = copyTasks.find((task) => task.id === taskId);
    if (foundTask) {
      foundTask.isImportant = !foundTask.isImportant;
    }
    setTasks(copyTasks);
    onAddToLocalStorage(copyTasks);
  };

  const onUpLevelTask = (taskId: number, parentTaskId: number) => {
    const copyTasks = [...tasks];
    const foundTask = copyTasks.find((task) => task.id === parentTaskId);
    if (foundTask) {
      const foundSubtask = foundTask.subtasks.find(
        (subtask) => subtask.id === taskId
      );
      if (foundSubtask) {
        const turnedIntoTask = turnIntoTask(foundSubtask);
        const updatedTasks = foundTask.subtasks.filter(
          (subtask) => subtask.id !== taskId
        );
        foundTask.subtasks = updatedTasks;
        copyTasks.push(turnedIntoTask);
        setTasks(copyTasks);
        onAddToLocalStorage(copyTasks);
      }
    }
  };

  const onAddNote = (taskId: number, noteValue: string) => {
    const updatedTasks = [...tasks];
    if (taskId) {
      const foundTask = updatedTasks.find((task) => task.id === taskId);
      if (foundTask) {
        foundTask.note = noteValue;
        toast({
          variant: "success",
          title: "Опис успішно збережен",
        });
        setTasks(updatedTasks);
        onAddToLocalStorage(updatedTasks);
      }
    }
  };

  const onFindTask = (taskId: number) => {
    const updatedTasks = [...tasks];
    const foundTask = updatedTasks.filter((task) => task.id === taskId);
    if (!foundTask)
      return toast({
        variant: "destructive",
        title: "Такої таски не знайдено",
      });
    return foundTask;
  };

  const onChangeTitleTask = (
    taskId: number,
    value: string,
    parentTaskId?: number
  ) => {
    const updatedTasks = [...tasks];
    if (parentTaskId) {
      const foundParentTask = updatedTasks.find(
        (task) => task.id === parentTaskId
      );
      if (foundParentTask) {
        const foundSubtask = foundParentTask.subtasks.find(
          (task) => task.id === taskId
        );
        if (foundSubtask) {
          foundSubtask.title = value;
        }
      }
    } else {
      const foundTask = updatedTasks.find((task) => task.id === taskId);
      if (foundTask) {
        foundTask.title = value;
      }
    }
    setTasks(updatedTasks);
    onAddToLocalStorage(tasks);
  };

  const onChangeTagsTask = (
    taskId: number,
    value: string[],
    parentTaskId?: number
  ) => {
    const updatedTasks = [...tasks];
    if (parentTaskId) {
      const foundParentTask = updatedTasks.find(
        (task) => task.id === parentTaskId
      );
      if (foundParentTask) {
        const foundSubtask = foundParentTask.subtasks.find(
          (task) => task.id === taskId
        );
        if (foundSubtask) {
          foundSubtask.tags = value;
        }
      }
    } else {
      const foundTask = updatedTasks.find((task) => task.id === taskId);
      if (foundTask) {
        foundTask.tags = value;
      }
    }
    setTasks(updatedTasks);
    onAddToLocalStorage(updatedTasks);
  };

  return {
    tasks,
    onChangeStatusTask,
    onAddTask,
    onRemoveTask,
    onAddDueCalendar,
    onToggleImportantTask,
    onUpLevelTask,
    onAddNote,
    onChangeTitleTask,
    onChangeTagsTask,
    onFindTask,
  };
};
