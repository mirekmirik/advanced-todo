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
import { useContextOutlet } from "@/routes/Root";

interface DropdownTaskActionProps extends TasksActionType {
  task: Task | Subtask;
  parentTaskId?: number;
}

const DropdownTaskAction: React.FC<DropdownTaskActionProps> = ({
  task,
  parentTaskId,
}) => {
  const {
    tasks: { onChangeStatusTask, onUpLevelTask },
  } = useContextOutlet();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="max-sm:w-[15px] max-sm:h-[30px]">
          ...
        </Button>
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
