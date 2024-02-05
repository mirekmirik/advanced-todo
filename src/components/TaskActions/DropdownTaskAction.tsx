import React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

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
import { Task, TaskStatus } from "@/types/tasks";


interface DropdownTaskActionProps {
  task: Task;
  onChangeStatusTask: (taskId: number, type: TaskStatus) => void;
}

const DropdownTaskAction: React.FC<DropdownTaskActionProps> = ({
  onChangeStatusTask,
  task,
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
            onChangeStatusTask(task.id, value as TaskStatus)
          }
        >
          {statusesTask.map((status) => (
            <DropdownMenuRadioItem key={status.value} value={status.value}>
              {status.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownTaskAction;
