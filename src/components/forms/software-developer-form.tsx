import type { OnBack, OnNext } from "@formity/react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import type { FormStatus } from "@/types/status";
import { Select } from "./fields/select";
import { Button } from "../button";

const schema = z.object({
  softwareDeveloper: z.string().nonempty("Required"),
});

type Values = { softwareDeveloper: string };

interface Props {
  defaultValues: Values;
  onBack: OnBack<Values>;
  onNext: OnNext<Values>;
  status: FormStatus;
}

export function SoftwareDeveloperForm({
  defaultValues,
  onBack,
  onNext,
  status,
}: Props) {
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
          Are you a software developer?
        </h2>
        <div className="mb-6 flex flex-col gap-4">
          <form.Field name="softwareDeveloper">
            {(field) => (
              <Select
                field={field}
                label="Software Developer"
                placeholder="Select an option"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            )}
          </form.Field>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            disabled={status.submitting}
            onClick={() => onBack(form.state.values)}
          >
            Back
          </Button>
          <Button type="submit" variant="primary" disabled={status.submitting}>
            {status.submitting ? "Submitting..." : "Next"}
          </Button>
        </div>
      </div>
    </form>
  );
}
