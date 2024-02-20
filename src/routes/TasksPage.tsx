import Filters from "@/components/Filters/Filters";
import TaskForm from "@/components/TaskForm/TaskForm";
import Tasks from "@/components/Tasks/Tasks";
import { tasksTabStatus } from "@/helpers/tasks-status";
import { TaskTabsAndStatus } from "@/types/tasks";
import { useParams } from "react-router-dom";
import { useContextOutlet } from "./Root";
import { ScrollArea } from "@/components/ui/scroll-area";

const TasksPage = () => {
  const statusTask = useParams().statusTask as TaskTabsAndStatus;
  const {
    tasks: { tasks },
  } = useContextOutlet();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-5 py-2 px-2 border-b border">
        <h1 className="font-bold max-sm:text-xl text-4xl p-4">
          {tasksTabStatus(statusTask)}
        </h1>
        <Filters />
      </div>
      <div className="flex-grow overflow-y-auto max-sm:px-3 px-4">
        {!tasks.length ? (
          <p>Ще немає завдань, створіть завдання</p>
        ) : (
          <ScrollArea className="rounded-md h-full flex-1">
            <Tasks tasks={tasks} status={statusTask} />
          </ScrollArea>
        )}
      </div>
      <TaskForm />
    </div>
  );
};

export default TasksPage;
