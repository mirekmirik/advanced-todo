import { Input } from "../ui/input";
import { Dispatch, SetStateAction } from "react";
import { CalendarDays, Tags } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  onTitleChange: (title: any) => void;
  setShowInputTags: Dispatch<SetStateAction<boolean>>;
  value: string | number;
  isShowInputTags: boolean;
}

const TaskInput: React.FC<TaskFormProps> = ({
  onTitleChange,
  setShowInputTags,
  value,
  isShowInputTags,
}) => {
  return (
    <div className="flex w-full items-center space-x-2">
      <div className="relative w-full">
        <Input
          value={value}
          type="text"
          placeholder="Додати задачу..."
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <div className="absolute top-2 right-3">
          <div className="flex gap-2">
            <CalendarDays />
            <Tags
              onClick={() => setShowInputTags((prev) => !prev)}
              className={cn(
                "hover:text-purple-500 cursor-pointer transition-300 transition",
                isShowInputTags ? "text-purple-500" : ""
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
