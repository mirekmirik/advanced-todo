import { Subtask, TaskStatus } from "@/types/tasks";
import SubtaskItem from "./SubtaskItem";
import { TasksActionType } from "@/hooks/useTasks";

interface SubtaskListProps extends TasksActionType {
  subtasks: Subtask[];
  // onChangeStatusTask: (
  //   taskId: number,
  //   type: TaskStatus,
  //   parentTaskId?: number
  // ) => void;
  parentTaskId?: number;
  // onRemoveTask: (taskId: number, parentTaskId?: number) => void;
  // onUpLevelTask: (taskId: number, parentTaskId: number) => void;
}

const SubtaskList: React.FC<SubtaskListProps> = ({
  subtasks,
  onChangeStatusTask,
  parentTaskId,
  onRemoveTask,
  onUpLevelTask,
  onChangeTagsTask,
  onChangeTitleTask
}) => {
  return (
    <div className="flex flex-col gap-2 h-full">
      {!subtasks.length ? (
        <p className="font-bold text-center">Ще нема підзадач</p>
      ) : (
        subtasks.map((subtask) => (
          <SubtaskItem
            subtask={subtask}
            onChangeStatusTask={onChangeStatusTask}
            parentTaskId={parentTaskId}
            onRemoveTask={onRemoveTask}
            onUpLevelTask={onUpLevelTask}
            onChangeTagsTask={onChangeTagsTask}
            onChangeTitleTask={onChangeTitleTask}
          />
        ))
      )}
    </div>
  );
};

export default SubtaskList;
