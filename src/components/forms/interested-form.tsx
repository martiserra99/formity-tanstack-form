import type { OnBack, OnNext } from "@formity/react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import type { FormStatus } from "@/types/status";
import { Select } from "./fields/select";
import { Button } from "../button";

const schema = z.object({
  interested: z.string().nonempty("Required"),
});

type Values = { interested: string };

interface Props {
  defaultValues: Values;
  onBack: OnBack<Values>;
  onNext: OnNext<Values>;
  status: FormStatus;
}

export function InterestedForm({
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
          Are you interested in learning how to code?
        </h2>
        <div className="mb-6 flex flex-col gap-4">
          <form.Field name="interested">
            {(field) => (
              <Select
                field={field}
                label="Interested"
                placeholder="Select an option"
                options={[
                  { value: "yes", label: "Yes, I am interested." },
                  { value: "no", label: "No, it is not for me." },
                  { value: "maybe", label: "Maybe, I am not sure." },
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
            {status.submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
