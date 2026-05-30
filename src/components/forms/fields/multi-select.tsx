import { useId } from "react";
import * as Label from "@radix-ui/react-label";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cva } from "class-variance-authority";

import { type FormField, getError } from "@/types/form-field";

import { errorVariants } from "./classes";

const itemVariants = cva(
  "flex h-10 w-full cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-gray-400/15 data-[state=on]:border-gray-950 data-[state=on]:bg-gray-950 data-[state=on]:text-white",
  {
    variants: {
      error: {
        false: "border-gray-200 bg-white text-gray-950 hover:border-gray-300",
        true: "border-red-300 bg-white text-gray-950 hover:border-red-400",
      },
    },
  },
);

export interface MultiSelectProps {
  label: string;
  options: { value: string; label: string }[];
  optional?: boolean;
  field: FormField<string[]>;
}

export function MultiSelect({
  label,
  options,
  optional,
  field,
}: MultiSelectProps) {
  const id = useId();
  const error = getError(field);
  return (
    <div className="flex flex-col gap-2">
      <Label.Root
        htmlFor={id}
        className="block text-xs font-bold tracking-wider text-gray-500 uppercase"
      >
        {label}
        {optional && (
          <span className="text-xs font-normal tracking-normal text-gray-400 normal-case">
            {" "}
            — optional
          </span>
        )}
      </Label.Root>
      <ToggleGroup.Root
        id={id}
        type="multiple"
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value)}
        className="grid w-full grid-cols-2 gap-2"
      >
        {options.map((option) => (
          <ToggleGroup.Item
            key={option.value}
            value={option.value}
            className={itemVariants({ error: Boolean(error) })}
          >
            {option.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
      {error && <span className={errorVariants()}>{error}</span>}
    </div>
  );
}
