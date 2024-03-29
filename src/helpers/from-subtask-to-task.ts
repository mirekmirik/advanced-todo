import { Subtask, Task } from "@/types/tasks";

export const turnIntoTask = (subtask: Subtask): Task => {
  const { taskId, ...otherFields } = subtask as Subtask;

  const newTask: Task = { ...otherFields, note: '', id: Math.random(), subtasks: [] };
  return newTask;
};
