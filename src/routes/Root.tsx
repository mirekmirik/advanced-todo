import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { TasksActionType, useTasks } from "@/hooks/useTasks";
import { Task, TaskStatus } from "@/types/tasks";
import { Outlet, useOutletContext } from "react-router-dom";

type ContextType = {
  user: User | null;
  tasks: {
    tasks: Task[];
  } & TasksActionType;
};

export default function Root() {
  const {
    tasks,
    onAddTask,
    onChangeStatusTask,
    onRemoveTask,
    onAddDueCalendar,
    onToggleImportantTask,
    onUpLevelTask,
    onAddNote,
    onChangeTagsTask,
    onChangeTitleTask,
  } = useTasks();

  const context: ContextType = {
    tasks: {
      tasks,
      onAddTask,
      onChangeStatusTask,
      onRemoveTask,
      onAddDueCalendar,
      onToggleImportantTask,
      onUpLevelTask,
      onAddNote,
      onChangeTagsTask,
      onChangeTitleTask,
    },
    user: {
      id: 3,
      email: "bondik@gmail.com",
      name: "miroslav",
    },
  };

  return (
    <>
      <div className="flex flex-row gap-10 h-full">
        <div className="flex flex-row flex-1">
          <Sidebar tasks={tasks} />
          <div className="flex-col gap-3 border flex-grow">
            <Outlet context={context} />
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
}

export function useContextOutlet() {
  return useOutletContext<ContextType>();
}
