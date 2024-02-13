import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Calendar } from "../ui/calendar";

interface DatePickerProps {
  children: React.ReactNode;
  date?: Date;
  onChange: (date: Date | undefined) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  children,
  date,
  onChange,
}) => {
  //   const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2 bg-black"
      >
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => onChange(date)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
