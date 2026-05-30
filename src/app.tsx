import { useCallback, useState } from "react";

import {
  Formity,
  type s,
  type Flow,
  type OnReturn,
  type ReturnOutput,
} from "@formity/react";

import type { Status, FormStatus } from "./types/status";

import { YourselfForm } from "./components/forms/yourself-form";
import { SoftwareDeveloperForm } from "./components/forms/software-developer-form";
import { ExpertiseForm } from "./components/forms/expertise-form";
import { InterestedForm } from "./components/forms/interested-form";
import { Done } from "./components/done";

type Schema = {
  render: React.ReactNode;
  struct: [
    s.Form<{ name: string; surname: string; age: number }>,
    s.Form<{ softwareDeveloper: string }>,
    s.Condition<{
      then: [
        s.Form<{ expertise: string }>,
        s.Return<{
          name: string;
          surname: string;
          age: number;
          softwareDeveloper: true;
          expertise: string;
        }>,
      ];
      else: [
        s.Form<{ interested: string }>,
        s.Return<{
          name: string;
          surname: string;
          age: number;
          softwareDeveloper: false;
          interested: string;
        }>,
      ];
    }>,
  ];
  inputs: Record<never, never>;
  params: {
    status: FormStatus;
  };
};

const flow: Flow<Schema> = [
  {
    form: {
      fields: () => ({
        name: ["", []],
        surname: ["", []],
        age: [20, []],
      }),
      render: ({ fields, params, onNext }) => (
        <YourselfForm
          key="yourself"
          defaultValues={fields}
          onNext={onNext}
          status={params.status}
        />
      ),
    },
  },
  {
    form: {
      fields: () => ({
        softwareDeveloper: ["", []],
      }),
      render: ({ fields, params, onBack, onNext }) => (
        <SoftwareDeveloperForm
          key="softwareDeveloper"
          defaultValues={fields}
          onBack={onBack}
          onNext={onNext}
          status={params.status}
        />
      ),
    },
  },
  {
    condition: {
      if: ({ softwareDeveloper }) => softwareDeveloper === "yes",
      then: [
        {
          form: {
            fields: () => ({
              expertise: ["", []],
            }),
            render: ({ fields, params, onBack, onNext }) => (
              <ExpertiseForm
                key="expertise"
                defaultValues={fields}
                onBack={onBack}
                onNext={onNext}
                status={params.status}
              />
            ),
          },
        },
        {
          return: ({ name, surname, age, expertise }) => ({
            name,
            surname,
            age,
            softwareDeveloper: true,
            expertise,
          }),
        },
      ],
      else: [
        {
          form: {
            fields: () => ({
              interested: ["", []],
            }),
            render: ({ fields, params, onBack, onNext }) => (
              <InterestedForm
                key="interested"
                defaultValues={fields}
                onBack={onBack}
                onNext={onNext}
                status={params.status}
              />
            ),
          },
        },
        {
          return: ({ name, surname, age, interested }) => ({
            name,
            surname,
            age,
            softwareDeveloper: false,
            interested,
          }),
        },
      ],
    },
  },
];

export default function App() {
  const [status, setStatus] = useState<Status<ReturnOutput<Schema>>>({
    type: "form",
    submitting: false,
  });

  const onReturn = useCallback<OnReturn<Schema>>(async (output) => {
    setStatus({ type: "form", submitting: true });

    // Show output in the console
    console.log(output);

    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus({ type: "done", output });
  }, []);

  if (status.type === "done") {
    return (
      <Done
        output={status.output}
        onStartOver={() => setStatus({ type: "form", submitting: false })}
      />
    );
  }

  return (
    <Formity<Schema> flow={flow} params={{ status }} onReturn={onReturn} />
  );
}
