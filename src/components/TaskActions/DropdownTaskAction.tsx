import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusesTask } from "@/mock/statuses";
import { Subtask, Task, TaskStatus } from "@/types/tasks";
import { TasksActionType } from "@/hooks/useTasks";

interface DropdownTaskActionProps extends TasksActionType {
  task: Task | Subtask;
  // onChangeStatusTask: (
  //   taskId: number,
  //   type: TaskStatus,
  //   parentTaskId?: number
  // ) => void;
  parentTaskId?: number;
  // onUpLevelTask?: (taskId: number, parentTaskId: number) => void;
}

const DropdownTaskAction: React.FC<DropdownTaskActionProps> = ({
  onChangeStatusTask,
  task,
  parentTaskId,
  onUpLevelTask,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Змінити статус на:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={task.status}
          onValueChange={(value) =>
            onChangeStatusTask?.(task.id, value as TaskStatus, parentTaskId)
          }
        >
          {statusesTask.map((status) => (
            <DropdownMenuRadioItem key={status.value} value={status.value}>
              {status.label}
            </DropdownMenuRadioItem>
          ))}
          {parentTaskId ? (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuLabel>Змінити статус на:</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem
                  value="up"
                  onClick={() => onUpLevelTask?.(task.id, parentTaskId)}
                >
                  Підвищити рівень завдання
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </>
          ) : null}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownTaskAction;
