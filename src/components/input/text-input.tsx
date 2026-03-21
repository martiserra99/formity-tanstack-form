import { useId } from "react";
import { tv } from "tailwind-variants";

interface TextInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  error: string | undefined;
}

export function TextInput({
  label,
  value,
  placeholder,
  onChange,
  error,
}: TextInputProps) {
  return (
    <Input
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      error={error}
    />
  );
}

const input = tv({
  base: "mt-2 w-full rounded-xl border bg-neutral-900 px-4 py-3 text-base text-white transition-colors duration-300 placeholder:text-neutral-500 focus-visible:outline-none",
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
  placeholder: string;
  onChange: (value: string) => void;
  error: string | undefined;
}

function Input({ label, value, placeholder, onChange, error }: InputProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-base font-medium text-white">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={input({ error: !!error })}
      />
      {error && (
        <p className="mt-2 text-sm font-normal text-red-400">{error}</p>
      )}
    </div>
  );
}
