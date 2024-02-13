import { Task, TaskStatus } from "@/types/tasks";
import TaskItem from "./TaskItem";
import { useState } from "react";
import { SheetTask } from "../SheetTask/SheetTask";
import { TasksActionType } from "@/hooks/useTasks";

interface TaskListProps extends TasksActionType {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onChangeStatusTask,
  onRemoveTask,
  onAddDueCalendar,
  onAddTask,
  onToggleImportantTask,
  onUpLevelTask,
  onAddNote,
  onChangeTagsTask,
  onChangeTitleTask,
}) => {
  const [pickedTask, setPickedTask] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);

  const onChangeTask = (task: Task) => {
    if (pickedTask?.id === task.id) {
      return setPickedTask(null);
    }
    setPickedTask(task);
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          onChangeTask={onChangeTask}
          pickedTask={pickedTask}
          key={task.id}
          task={task}
          onChangeStatusTask={onChangeStatusTask}
          onRemoveTask={onRemoveTask}
          onToggleImportantTask={onToggleImportantTask}
        />
      ))}
      {pickedTask && (
        <SheetTask
          task={pickedTask}
          setPickedTask={setPickedTask}
          open={open}
          setOpen={setOpen}
          onChangeStatusTask={onChangeStatusTask}
          onRemoveTask={onRemoveTask}
          onAddDueCalendar={onAddDueCalendar}
          onAddTask={onAddTask}
          onToggleImportantTask={onToggleImportantTask}
          onUpLevelTask={onUpLevelTask}
          onAddNote={onAddNote}
          onChangeTagsTask={onChangeTagsTask}
          onChangeTitleTask={onChangeTitleTask}
        />
      )}
    </div>
  );
};

export default TaskList;
