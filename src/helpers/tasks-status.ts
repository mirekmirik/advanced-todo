import { NAV_TABS } from "@/mock/statuses";
import {  TaskTabsAndStatus } from "@/types/tasks";

export const tasksTabStatus = (status: TaskTabsAndStatus) => {
  const foundStatus = NAV_TABS.find((s) => s.value === status);
  const label = foundStatus?.label || "Усі";
  return label;
};

export const tasksStatusLabel = (status: TaskTabsAndStatus) => {
  const name =
    status === "completed"
      ? "Виконано"
      : status === "cancelled"
      ? "Відміненно"
      : "Новий";

  return name;
};
