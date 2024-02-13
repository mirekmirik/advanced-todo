import { Dispatch, SetStateAction } from "react";
import TaskInput from "../TaskForm/TaskInput";
import TaskInputTags from "../TaskForm/TaskInputTags";
import { Button } from "../ui/button";

interface TaskUpdateFormProps {
  onTitleChange: (title: any) => void;
  setShowInputTags?: Dispatch<SetStateAction<boolean>>;
  valueTitle: string | number;
  isShowInputTags: boolean;
  onTagsChange: (tags: any) => void;
  tags: string[];
  onTagChange: (tag: any) => void;
  valueTag: string;
  showInputTag: boolean;
  onSubmit: () => void;
}

const TaskUpdateForm: React.FC<TaskUpdateFormProps> = ({
  isShowInputTags,
  onTagChange,
  onTagsChange,
  onTitleChange,
  tags,
  valueTag,
  valueTitle,
  setShowInputTags,
  showInputTag,
  onSubmit,
}) => {
  const onSubmitValues = () => {
    onSubmit();
  };

  return (
    <div className="flex flex-col gap-3">
      <TaskInput
        isShowInputTags={isShowInputTags}
        onTitleChange={(title) => onTitleChange(title)}
        value={valueTitle}
        setShowInputTags={setShowInputTags}
      />
      {showInputTag && (
        <TaskInputTags
          value={valueTag}
          tags={tags}
          onTagChange={(tag) => onTagChange(tag)}
          onTagsChange={(tags) => onTagsChange(tags)}
        />
      )}
      <Button onClick={onSubmitValues}>Підтвердити</Button>
    </div>
  );
};

export default TaskUpdateForm;
