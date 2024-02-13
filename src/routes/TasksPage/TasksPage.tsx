import Filters from "@/components/Filters/Filters";
import TaskForm from "@/components/TaskForm/TaskForm";
import Tasks from "@/components/Tasks/Tasks";
import { tasksTabStatus } from "@/helpers/tasks-status";
import { TaskTabsAndStatus } from "@/types/tasks";
import { useParams } from "react-router-dom";
import { useContextOutlet } from "../Root";

const TasksPage = () => {
  const statusTask = useParams().statusTask as TaskTabsAndStatus;
  const {
    tasks: {
      onAddTask,
      onChangeStatusTask,
      onRemoveTask,
      onAddDueCalendar,
      onToggleImportantTask,
      onUpLevelTask,
      tasks,
      onAddNote,
      onChangeTagsTask,
      onChangeTitleTask,
    },
  } = useContextOutlet();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-5 py-2 px-2 border-b border">
        <h1 className="font-bold text-4xl p-4">{tasksTabStatus(statusTask)}</h1>
        <Filters />
      </div>
      <div className="flex-grow overflow-y-auto px-4">
        <Tasks
          tasks={tasks}
          onChangeStatusTask={onChangeStatusTask}
          onRemoveTask={onRemoveTask}
          status={statusTask}
          onAddDueCalendar={onAddDueCalendar}
          onAddTask={onAddTask}
          onToggleImportantTask={onToggleImportantTask}
          onUpLevelTask={onUpLevelTask}
          onAddNote={onAddNote}
          onChangeTagsTask={onChangeTagsTask}
          onChangeTitleTask={onChangeTitleTask}
        />
      </div>
      <TaskForm onAddTask={onAddTask} />
    </div>
  );
};

export default TasksPage;
