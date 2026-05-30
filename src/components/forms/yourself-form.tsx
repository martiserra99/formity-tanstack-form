import type { OnNext } from "@formity/react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import type { FormStatus } from "@/types/status";
import { Input } from "./fields/input";
import { Number } from "./fields/number";
import { Button } from "../button";

const schema = z.object({
  name: z.string().nonempty("Required"),
  surname: z.string().nonempty("Required"),
  age: z.number().min(18, "Min. 18").max(99, "Max. 99"),
});

type Values = { name: string; surname: string; age: number };

interface Props {
  defaultValues: Values;
  onNext: OnNext<Values>;
  status: FormStatus;
}

export function YourselfForm({ defaultValues, onNext, status }: Props) {
  const form = useForm({
    defaultValues,
    validators: { onChange: schema },
    onSubmit: async ({ value }) => onNext(value),
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex h-screen w-full items-center justify-center px-4 py-8"
      autoComplete="off"
    >
      <div className="w-full max-w-md">
        <h2 className="mb-6 text-center text-4xl font-bold text-gray-950">
          Tell us about yourself
        </h2>
        <div className="mb-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3.5">
            <form.Field name="name">
              {(field) => (
                <Input field={field} label="Name" placeholder="Your name" />
              )}
            </form.Field>
            <form.Field name="surname">
              {(field) => (
                <Input
                  field={field}
                  label="Surname"
                  placeholder="Your surname"
                />
              )}
            </form.Field>
          </div>
          <form.Field name="age">
            {(field) => (
              <Number field={field} label="Age" placeholder="Your age" />
            )}
          </form.Field>
        </div>
        <div className="flex gap-4">
          <Button type="submit" variant="primary" disabled={status.submitting}>
            {status.submitting ? "Submitting..." : "Next"}
          </Button>
        </div>
      </div>
    </form>
  );
}
