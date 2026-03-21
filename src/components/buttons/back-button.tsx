import type { ComponentPropsWithoutRef } from "react";

import { Button } from "../button";
import { useMultiStep } from "@/multi-step";

interface BackButtonProps extends ComponentPropsWithoutRef<"button"> {
  values: Record<string, unknown>;
}

export function BackButton({ values, ...props }: BackButtonProps) {
  const { onBack } = useMultiStep();
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => onBack(values)}
      {...props}
    />
  );
}
