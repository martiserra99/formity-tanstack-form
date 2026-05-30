import { useId } from "react";
import * as Label from "@radix-ui/react-label";

import { type FormField, getError } from "@/types/form-field";

import { cn } from "@/lib/cn";

import { inputVariants, errorVariants } from "./classes";

export interface TextareaProps {
  label: string;
  placeholder: string;
  optional?: boolean;
  field: FormField<string>;
}

export function Textarea({
  label,
  placeholder,
  optional,
  field,
}: TextareaProps) {
  const id = useId();
  const error = getError(field);
  return (
    <div className="flex flex-col gap-2">
      <Label.Root
        htmlFor={id}
        className="block text-xs font-bold tracking-wider text-gray-500 uppercase"
      >
        <>{label}</>
        {optional && (
          <span className="text-xs font-normal tracking-normal text-gray-400 normal-case">
            {" "}
            — optional
          </span>
        )}
      </Label.Root>
      <textarea
        id={id}
        placeholder={placeholder}
        className={cn(
          inputVariants({ error: Boolean(error) }),
          "min-h-20 resize-y",
        )}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {error && <span className={errorVariants()}>{error}</span>}
    </div>
  );
}
