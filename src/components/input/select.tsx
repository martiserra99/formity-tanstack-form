import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { tv } from "tailwind-variants";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Label,
} from "@headlessui/react";

interface SelectProps {
  label: string;
  value: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  error: string | undefined;
}

export function Select({ label, value, options, onChange, error }: SelectProps) {
  return (
    <Input
      label={label}
      value={value}
      options={options}
      onChange={onChange}
      error={error}
    />
  );
}

const input = tv({
  base: "flex w-full items-center justify-between rounded-xl border bg-neutral-900 px-4 py-3 text-base text-white transition-colors duration-300 placeholder:text-neutral-500 focus-visible:outline-none",
  variants: {
    error: {
      true: "border-red-400 focus-visible:border-red-400",
      false: "border-neutral-800 focus-visible:border-white",
    },
  },
});

interface InputProps {
  label: string;
  value: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  error: string | undefined;
}

function Input({ label, value, options, onChange, error }: InputProps) {
  const option = options.find((option) => option.value === value)!;
  return (
    <div>
      <Listbox value={value} onChange={onChange}>
        <Label className="block text-base font-medium text-white">
          {label}
        </Label>
        <div className="relative mt-2">
          <ListboxButton className={input({ error: Boolean(error) })}>
            <span>{option.label}</span>
            <ChevronDownIcon
              aria-hidden="true"
              className="size-5 text-neutral-500"
            />
          </ListboxButton>
          <ListboxOptions
            transition
            className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900 p-1 text-base focus:outline-none"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="group flex cursor-default items-center justify-between rounded-lg py-2 pr-9 pl-3 text-neutral-400 select-none data-focus:bg-neutral-800 data-focus:text-white data-focus:outline-none"
              >
                <span className="block truncate font-normal">
                  {option.label}
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      {error && (
        <p className="mt-2 text-sm font-normal text-red-400">{error}</p>
      )}
    </div>
  );
}
