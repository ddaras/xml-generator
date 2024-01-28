"use client";

import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { UploadIcon } from "@radix-ui/react-icons";

export const UploadButton = React.forwardRef<HTMLInputElement | null, any>(
  function UploadButton({}, ref) {
    const { pending } = useFormStatus();

    return (
      <Button
        size="lg"
        disabled={pending}
        className="shadow-lg"
        onClick={(e) => {
          e.preventDefault();

          //   @ts-ignore
          ref?.current?.click();
        }}
      >
        <UploadIcon className="mr-2 h-5 w-5" />{" "}
        {pending ? "იტვირთება..." : "ატვირთე .xlsx ფაილი"}
      </Button>
    );
  }
);

UploadButton.displayName = "UploadButton";
