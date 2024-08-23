"use client";
import React from "react";
import { Button } from "../components/ui/moving-border";

interface MovingBorderButtonProps {
  onClick: () => void;
}

export function MovingBorderButton({ onClick }: MovingBorderButtonProps) {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        onClick={onClick}
        className="bg-white font-semibold dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Submit
      </Button>
    </div>
  );
}
