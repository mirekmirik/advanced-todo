import { statusesTabs } from "@/mock/statuses";
import { Task, TaskStatus } from "@/types/tasks";

export const tasksTabStatus = (status: TaskStatus) => {
  const foundStatus = statusesTabs.find((s) => s.value === status);
  const label = foundStatus?.label || "Усі";
  return label;
};

export const tasksStatusLabel = (status: TaskStatus) => {
  const name =
    status === "completed"
      ? "Виконано"
      : status === "cancelled"
      ? "Відміненно"
      : status === "in_progress"
      ? "У процессі"
      : "Новий";

  return name;
};
