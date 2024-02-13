import { Subtask, TaskStatus } from "@/types/tasks";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubtaskList from "./SubtaskList";
import { TasksActionType } from "@/hooks/useTasks";

interface SubtasksProps extends TasksActionType {
  subtasks: Subtask[];
  parentTaskId?: number;

  // onChangeStatusTask?: (
  //   taskId: number,
  //   type: TaskStatus,
  //   parentTaskId?: number
  // ) => void;
  // onRemoveTask?: (taskId: number, parentTaskId?: number) => void;
  // onUpLevelTask?: (taskId: number, parentTaskId: number) => void;
}

const Subtasks: React.FC<SubtasksProps> = ({
  subtasks,
  onChangeStatusTask,
  parentTaskId,
  onRemoveTask,
  onUpLevelTask,
  onChangeTitleTask,
  onChangeTagsTask
}) => {
  return (
    <ScrollArea className="rounded-md h-full">
      <SubtaskList
        subtasks={subtasks}
        onChangeStatusTask={onChangeStatusTask}
        parentTaskId={parentTaskId}
        onRemoveTask={onRemoveTask}
        onUpLevelTask={onUpLevelTask}
        onChangeTagsTask={onChangeTagsTask}
        onChangeTitleTask={onChangeTitleTask}
      />
    </ScrollArea>
  );
};

export default Subtasks;
