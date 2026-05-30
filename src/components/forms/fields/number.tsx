import { useId } from "react";
import * as Label from "@radix-ui/react-label";

import { type FormField, getError } from "@/types/form-field";

import { inputVariants, errorVariants } from "./classes";

export interface NumberProps {
  label: string;
  placeholder: string;
  optional?: boolean;
  field: FormField<number>;
}

export function Number({ label, placeholder, optional, field }: NumberProps) {
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
      <input
        id={id}
        type="number"
        placeholder={placeholder}
        className={inputVariants({ error: Boolean(error) })}
        value={String(field.state.value)}
        onChange={(e) => field.handleChange(+e.target.value)}
        onBlur={field.handleBlur}
      />
      {error && <span className={errorVariants()}>{error}</span>}
    </div>
  );
}
