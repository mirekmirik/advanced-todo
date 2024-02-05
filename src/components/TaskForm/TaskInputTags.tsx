import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Badge } from "../ui/badge";

interface TaskInputTagsProps {
  onTagsChange: (tags: any) => void;
  tags: string[];
  onTagChange: (tag: any) => void;
  value: string;
}

const TaskInputTags: React.FC<TaskInputTagsProps> = ({
  onTagsChange,
  tags,
  onTagChange,
  value,
}) => {
  const onSubmit = () => {
    const splittedValue = value.split(",");
    onTagsChange([...tags, ...splittedValue]);
    onTagChange("");
  };

  const form = useForm();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        {tags.map((tag, i) => (
          <Badge key={i}>{tag}</Badge>
        ))}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Додати тег..."
                    {...field}
                    name="tag"
                    value={value}
                    onChange={(e) => onTagChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default TaskInputTags;
