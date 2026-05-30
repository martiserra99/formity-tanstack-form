export interface FormField<T> {
  state: {
    value: T;
    meta: {
      isTouched: boolean;
      errors: unknown[];
    };
  };
  handleChange: (value: T) => void;
  handleBlur: () => void;
}

export function getError(field: {
  state: { meta: { isTouched: boolean; errors: unknown[] } };
}): string | undefined {
  if (!field.state.meta.isTouched || field.state.meta.errors.length === 0) {
    return undefined;
  }
  const error = field.state.meta.errors[0]!;
  if (typeof error === "object" && "message" in error) {
    return error.message as string;
  }
  return undefined;
}
