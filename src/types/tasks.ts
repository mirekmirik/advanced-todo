// export enum TaskStatus {
//   New = "new",
//   InProgress = "in_progress",
//   Completed = "completed",
//   Cancelled = "cancelled",
// }

export type TaskStatus = "new" | "in_progress" | "completed" | "cancelled";

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

interface Subtask extends Omit<Task, "subtasks"> {
  taskId: number;
}

export interface Task {
  id: number; // Идентификатор задачи
  title: string; // Название задачи
  description: string | null; // Описание задачи
  status: TaskStatus; // Статус задачи
  priority: TaskPriority | null; // Приоритет задачи
  assignedTo: User | null; // Пользователь, которому назначена задача
  tags: string[]; // Метки задачи
  createdAt: Date; // Дата создания задачи
  dueDate: Date | null; // Дата выполнения задачи
  cancelledDate: Date | null;
  updatedAt: Date | null; // Дата обновления задачи
}
