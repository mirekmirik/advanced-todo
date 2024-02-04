export type Status = {
  value: string;
  label: string;
};

export const statusesTabs: Status[] = [
  {
    value: "all",
    label: "Усі",
  },
  {
    value: "new",
    label: "Нові",
  },
  {
    value: "completed",
    label: "Виконанні",
  },
  {
    value: "in_progress",
    label: "В процессі",
  },
  {
    value: "cancelled",
    label: "Відміненні",
  },
];

export const statusesTask: Status[] = [
  {
    value: "new",
    label: "Новий",
  },
  {
    value: "completed",
    label: "Виконанний",
  },
  {
    value: "in_progress",
    label: "У процессі",
  },
  {
    value: "cancelled",
    label: "Скасованний",
  },
];
