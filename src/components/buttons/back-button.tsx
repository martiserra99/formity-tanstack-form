import type { ComponentPropsWithoutRef } from "react";

import { Button } from "../button";
import { useMultiStep } from "@/multi-step";

interface BackButtonProps<T extends Record<string, unknown>>
  extends ComponentPropsWithoutRef<"button"> {
  values: T;
}

export function BackButton<T extends Record<string, unknown>>({
  values,
  ...props
}: BackButtonProps<T>) {
  const { onBack } = useMultiStep<T>();
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => onBack(values)}
      {...props}
    />
  );
}
