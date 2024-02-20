import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Task } from "@/types/tasks";
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { Calendar, Notebook, Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import { formatDate } from "@/helpers/format-date";
import { DatePicker } from "./DatePicker";
import Subtasks from "../Tasks/SubTasks/Subtasks";
import TaskForm from "../TaskForm/TaskForm";
import TaskItem from "../Tasks/TaskItem";
import { AlertDialogComponent } from "../AlertDialog/AlertDialogComponent";
import NoteInput from "./NoteInput";
import { Button } from "../ui/button";
import TaskUpdateForm from "../TaskUpdateForm/TaskUpdateForm";
import { TasksActionType } from "@/hooks/useTasks";
import { useContextOutlet } from "@/routes/Root";
import { ScrollArea } from "../ui/scroll-area";

interface SheetTaskProps extends TasksActionType {
  task: Task;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPickedTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

export function SheetTask({
  task,
  open,
  setOpen,
  setPickedTask,
}: SheetTaskProps) {
  const onClose = () => {
    setOpen(false);
    setPickedTask(null);
  };

  const {
    tasks: { onAddDueCalendar, onAddTask, onAddNote, onRemoveTask },
  } = useContextOutlet();

  const [date, setDate] = useState<Date | undefined>(task.dueDate);
  const [noteInput, setNoteInput] = useState(task.note);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [firstRender, setFirstRender] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [focused, setFocused] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const isNoteSaved = !focused && noteInput.trim().length;

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
    const savedNoteInput = noteInput.trim();
    onAddNote?.(task.id, savedNoteInput);
  };

  useEffect(() => {
    // in addDueCalendar i have toast function, so i don't want show toast when i open sheet first time
    setFirstRender(true);
    const onAddNewDueCalendar = () => {
      onAddDueCalendar?.(task?.id, date);
    };
    if (firstRender) {
      onAddNewDueCalendar();
    }
    return () => {
      setFirstRender(false);
    };
  }, [date]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex flex-col gap-2 max-sm:p-1 max-sm:w-full sm:max-w-[64rem]">
        <SheetHeader>
          <SheetTitle>Подробиці задачі №{task?.id}</SheetTitle>
          <SheetDescription>
            Можна щось додати, можна щось видалити
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow flex flex-col gap-3 overflow-y-hidden">
          <Card className="flex flex-col  gap-5 px-2 py-4 flex-1 overflow-y-hidden">
            <div className="flex flex-row items-center gap-3 flex-wrap">
              <TaskItem task={task} />
              <Button onClick={() => setShowUpdateForm((prev) => !prev)}>
                Редагувати
              </Button>
            </div>
            {showUpdateForm && (
              <TaskUpdateForm
                task={task}
                onSubmit={() => setShowUpdateForm(false)}
              />
            )}
            <p>Підзадачі</p>
            <div className="flex-grow overflow-y-hidden">
              <ScrollArea className="rounded-md h-full">
                <Subtasks subtasks={task.subtasks} parentTaskId={task.id} />
              </ScrollArea>
            </div>
            <TaskForm onAddTask={onAddTask} taskId={task.id} />
          </Card>
          <Card className="p-2 flex flex-col gap-2">
            <DatePicker date={date} onChange={(date) => setDate(date)}>
              <div className="flex gap-2">
                <Calendar />
                <h1 className="font-bold">
                  {date
                    ? `Дедлайн до: ${formatDate(date)}`
                    : "Обрати дату дедлайну"}
                </h1>
              </div>
            </DatePicker>
            <Separator />
            <div
              className="flex gap-2"
              onClick={() => setOpenNote((prev) => !prev)}
            >
              <Notebook />
              <h1 className="font-bold">Додати замітку</h1>
            </div>
            {noteInput.trim().length ? (
              <NoteInput
                onBlur={onBlur}
                onFocus={onFocus}
                value={noteInput}
                onChange={(val) => setNoteInput(val)}
                autoFocus={false}
                ref={textAreaRef}
              />
            ) : (
              openNote && (
                <NoteInput
                  onBlur={onBlur}
                  onFocus={onFocus}
                  value={noteInput}
                  autoFocus={true}
                  onChange={(val) => setNoteInput(val)}
                  ref={textAreaRef}
                />
              )
            )}
            {isNoteSaved ? <p>Успішно збережено</p> : ""}
          </Card>
        </div>
        <div className="flex flex-col gap-1">
          <Separator />
          <div className="flex justify-between">
            <h1 className="text-center w-full">
              Створено {formatDate(task.createdAt)}
            </h1>
            <div className="hover:text-red-500 cursor-pointer">
              <AlertDialogComponent
                onSubmit={() => {
                  onRemoveTask?.(task.id);
                  setOpen(false);
                }}
              >
                <Trash size={20} />
              </AlertDialogComponent>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
