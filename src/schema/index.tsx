import type { Schema, Form, Return, Cond } from "@formity/react";

import { MultiStep } from "../multi-step";

import {
  FormYourself,
  FormSoftwareDeveloper,
  FormExpertise,
  FormInterested,
} from "./forms";

export type Values = [
  Form<{ name: string; surname: string; age: number }>,
  Form<{ softwareDeveloper: string }>,
  Cond<{
    then: [
      Form<{ expertise: string }>,
      Return<{
        name: string;
        surname: string;
        age: number;
        softwareDeveloper: true;
        expertise: string;
      }>,
    ];
    else: [
      Form<{ interested: string }>,
      Return<{
        name: string;
        surname: string;
        age: number;
        softwareDeveloper: false;
        interested: string;
      }>,
    ];
  }>,
];

export const schema: Schema<Values> = [
  {
    form: {
      values: () => ({
        name: ["", []],
        surname: ["", []],
        age: [20, []],
      }),
      render: ({ values, onNext, onBack }) => (
        <MultiStep onNext={onNext} onBack={onBack}>
          <FormYourself values={values} />
        </MultiStep>
      ),
    },
  },
  {
    form: {
      values: () => ({
        softwareDeveloper: ["yes", []],
      }),
      render: ({ values, onNext, onBack }) => (
        <MultiStep onNext={onNext} onBack={onBack}>
          <FormSoftwareDeveloper values={values} />
        </MultiStep>
      ),
    },
  },
  {
    cond: {
      if: ({ softwareDeveloper }) => softwareDeveloper === "yes",
      then: [
        {
          form: {
            values: () => ({
              expertise: ["frontend", []],
            }),
            render: ({ values, onNext, onBack }) => (
              <MultiStep onNext={onNext} onBack={onBack}>
                <FormExpertise values={values} />
              </MultiStep>
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
            values: () => ({
              interested: ["yes", []],
            }),
            render: ({ values, onNext, onBack }) => (
              <MultiStep onNext={onNext} onBack={onBack}>
                <FormInterested values={values} />
              </MultiStep>
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
