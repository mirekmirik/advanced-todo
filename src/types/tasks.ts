
export type TaskStatus = "new" | "in_progress" | "completed" | "cancelled";

export type TaskTabs = "planned" | "important" | "all";

export type TaskTabsAndStatus = TaskStatus | TaskTabs;

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface Subtask extends Omit<Task, "subtasks" | "note"> {
  taskId: number;
}

export interface Task {
  id: number; // Идентификатор задачи
  title: string; // Название задачи
  status: TaskStatus; // Статус задачи
  subtasks: Subtask[];
  priority: TaskPriority | null; // Приоритет задачи
  assignedTo: User | null; // Пользователь, которому назначена задача
  tags: string[]; // Метки задачи
  createdAt: Date; // Дата создания задачи
  dueDate: Date | undefined; // Дата выполнения задачи
  cancelledDate: Date | null;
  isImportant: boolean;
  completedAt: Date | null; // Дата обновления задачи
  note: string;
}
