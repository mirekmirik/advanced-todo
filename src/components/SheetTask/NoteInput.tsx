import {
  forwardRef,
  useEffect,
} from "react";
import { Textarea } from "../ui/textarea";
import React from "react";

interface NoteInputProps {
  value: string;
  onChange: (newNote: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  ref?: React.RefObject<HTMLTextAreaElement>;
  autoFocus: boolean;
}

const NoteInput = forwardRef<HTMLTextAreaElement, NoteInputProps>(
  (props, ref) => {
    useEffect(() => {
      if (!props.autoFocus) {
        return;
      }
      (ref as React.RefObject<HTMLTextAreaElement>).current?.focus();
    }, [ref]);

    return (
      <Textarea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        className="h-24 max-h-32"
        ref={ref}
      />
    );
  }
);

export default NoteInput;
