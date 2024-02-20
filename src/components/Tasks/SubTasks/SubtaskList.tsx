import { Subtask, TaskStatus } from "@/types/tasks";
import SubtaskItem from "./SubtaskItem";
import { TasksActionType } from "@/hooks/useTasks";
import { useContextOutlet } from "@/routes/Root";

interface SubtaskListProps extends TasksActionType {
  subtasks: Subtask[];
  parentTaskId?: number;
}

const SubtaskList: React.FC<SubtaskListProps> = ({
  subtasks,
  parentTaskId,
}) => {
  return (
    <div className="flex flex-col gap-2 h-full">
      {!subtasks.length ? (
        <p className="font-bold text-center">Ще нема підзадач</p>
      ) : (
        subtasks.map((subtask) => (
          <SubtaskItem subtask={subtask} parentTaskId={parentTaskId} />
        ))
      )}
    </div>
  );
};

export default SubtaskList;
