import { Subtask, TaskStatus } from "@/types/tasks";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubtaskList from "./SubtaskList";
import { TasksActionType } from "@/hooks/useTasks";

interface SubtasksProps extends TasksActionType {
  subtasks: Subtask[];
  parentTaskId?: number;
}

const Subtasks: React.FC<SubtasksProps> = ({ subtasks, parentTaskId }) => {
  return <SubtaskList subtasks={subtasks} parentTaskId={parentTaskId} />;
};

export default Subtasks;
