import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import {
  FormStep,
  FormStepContent,
  FormStepHeading,
  FormStepInputs,
  FormStepRow,
} from "../components/form-step";

import { Select } from "../components/input/select";
import { TextInput } from "../components/input/text-input";
import { NumberInput } from "../components/input/number-input";
import { NextButton } from "../components/buttons/next-button";
import { BackButton } from "../components/buttons/back-button";

import { useMultiStep } from "../multi-step";

interface FormYourselfProps {
  values: {
    name: string;
    surname: string;
    age: number;
  };
}

export function FormYourself({ values }: FormYourselfProps) {
  const { onNext } = useMultiStep();
  const form = useForm({
    defaultValues: values,
    validators: {
      onSubmit: z.object({
        name: z
          .string()
          .min(1, { message: "Required" })
          .max(20, { message: "Must be at most 20 characters" }),
        surname: z
          .string()
          .min(1, { message: "Required" })
          .max(20, { message: "Must be at most 20 characters" }),
        age: z
          .number()
          .min(18, { message: "Minimum of 18 years old" })
          .max(99, { message: "Maximum of 99 years old" }),
      }),
    },
    onSubmit: async ({ value }) => onNext(value),
  });
  return (
    <FormStep
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FormStepContent>
        <FormStepHeading>Tell us about yourself</FormStepHeading>
        <FormStepInputs>
          <FormStepRow>
            <form.Field name="name">
              {(field) => (
                <TextInput
                  label="Name"
                  value={field.state.value}
                  placeholder="Your name"
                  onChange={field.handleChange}
                  error={field.state.meta.errors[0]?.message}
                />
              )}
            </form.Field>
            <form.Field name="surname">
              {(field) => (
                <TextInput
                  label="Surname"
                  value={field.state.value}
                  placeholder="Your surname"
                  onChange={field.handleChange}
                  error={field.state.meta.errors[0]?.message}
                />
              )}
            </form.Field>
          </FormStepRow>
          <form.Field name="age">
            {(field) => (
              <NumberInput
                label="Age"
                value={field.state.value}
                placeholder="Your age"
                onChange={field.handleChange}
                error={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
        </FormStepInputs>
        <NextButton>Next</NextButton>
      </FormStepContent>
    </FormStep>
  );
}

interface FormSoftwareDeveloperProps {
  values: {
    softwareDeveloper: string;
  };
}

export function FormSoftwareDeveloper({ values }: FormSoftwareDeveloperProps) {
  const { onNext } = useMultiStep();
  const form = useForm({
    defaultValues: values,
    validators: {
      onSubmit: z.object({
        softwareDeveloper: z.string(),
      }),
    },
    onSubmit: async ({ value }) => onNext(value),
  });
  return (
    <FormStep
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FormStepContent>
        <FormStepHeading>Are you a software developer?</FormStepHeading>
        <FormStepInputs>
          <form.Field name="softwareDeveloper">
            {(field) => (
              <Select
                label="Software developer"
                value={field.state.value}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                onChange={field.handleChange}
                error={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
        </FormStepInputs>
        <FormStepRow>
          <BackButton values={form.state.values}>Back</BackButton>
          <NextButton>Next</NextButton>
        </FormStepRow>
      </FormStepContent>
    </FormStep>
  );
}

interface FormExpertiseProps {
  values: {
    expertise: string;
  };
}

export function FormExpertise({ values }: FormExpertiseProps) {
  const { onNext } = useMultiStep();
  const form = useForm({
    defaultValues: values,
    validators: {
      onSubmit: z.object({
        expertise: z.string(),
      }),
    },
    onSubmit: async ({ value }) => onNext(value),
  });
  return (
    <FormStep
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FormStepContent>
        <FormStepHeading>What is your area of expertise?</FormStepHeading>
        <FormStepInputs>
          <form.Field name="expertise">
            {(field) => (
              <Select
                label="Expertise"
                value={field.state.value}
                options={[
                  { value: "frontend", label: "Frontend development" },
                  { value: "backend", label: "Backend development" },
                  { value: "mobile", label: "Mobile development" },
                ]}
                onChange={field.handleChange}
                error={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
        </FormStepInputs>
        <FormStepRow>
          <BackButton values={form.state.values}>Back</BackButton>
          <NextButton>Submit</NextButton>
        </FormStepRow>
      </FormStepContent>
    </FormStep>
  );
}

interface FormInterestedProps {
  values: {
    interested: string;
  };
}

export function FormInterested({ values }: FormInterestedProps) {
  const { onNext } = useMultiStep();
  const form = useForm({
    defaultValues: values,
    validators: {
      onSubmit: z.object({
        interested: z.string(),
      }),
    },
    onSubmit: async ({ value }) => onNext(value),
  });
  return (
    <FormStep
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FormStepContent>
        <FormStepHeading>
          Are you interested in learning how to code?
        </FormStepHeading>
        <FormStepInputs>
          <form.Field name="interested">
            {(field) => (
              <Select
                label="Interested"
                value={field.state.value}
                options={[
                  { value: "yes", label: "Yes, I am interested." },
                  { value: "no", label: "No, it is not for me." },
                  { value: "maybe", label: "Maybe, I am not sure." },
                ]}
                onChange={field.handleChange}
                error={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>
        </FormStepInputs>
        <FormStepRow>
          <BackButton values={form.state.values}>Back</BackButton>
          <NextButton>Submit</NextButton>
        </FormStepRow>
      </FormStepContent>
    </FormStep>
  );
}
