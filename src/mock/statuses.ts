export type Status = {
  value: string;
  label: string;
};

export const statusesTabs: Status[] = [
  {
    value: "",
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

export const NAV_TABS: Status[] = [
  {
    value: "planned",
    label: "Запланованно",
  },
  {
    value: "important",
    label: "Важливо",
  },
  {
    value: "tasks",
    label: "Задачі",
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
    value: "cancelled",
    label: "Скасованний",
  },
];
