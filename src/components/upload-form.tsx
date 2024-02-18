"use client";

import React from "react";
import { UploadButton } from "./upload-button";
import { useFormState } from "react-dom";
import { useToast } from "./ui/use-toast";
import {
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "./ui/table";
import { PREVIEW_TABLE_COLUMNS } from "@/constants";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const initialState = {
  message: "",
};

export function UploadForm({
  uploadFile,
  onSuccess,
}: {
  uploadFile: (
    prevState: any,
    formData: FormData
  ) => Promise<{ message: string }>;
  onSuccess: () => void;
}) {
  const { toast } = useToast();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [state, formAction] = useFormState(uploadFile, initialState);

  React.useEffect(() => {
    if (state.message === "error") {
      toast({
        title: "დაფიქსირდა შეცდომა. 😿",
        variant: "destructive",
        // description: "Something went wrong",
      });
    }
    if (state.message === "success") {
      onSuccess();

      toast({
        title: "ფაილი წარმატებით აიტვირთა! 🥳",
        variant: "default",
        // description: "Successfully uploaded",
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-8 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          დაიწყე!
        </h1>

        <span
          className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl"
          data-br=":ruc:"
          data-brr="1"
        >
          ექსელში ცხრილი უნდა იყოს მე-2 შიტზე და შეესაბამებოდეს შემდეგ
          სტრუქტურას:
        </span>

        <Table>
          <TableHeader>
            <TableRow>
              {PREVIEW_TABLE_COLUMNS.map((col) => (
                <TableHead
                  key={col.idx}
                  className={twMerge(
                    clsx(
                      "",
                      { "text-right": col?.align === "right" },
                      { "text-center": col?.align === "center" }
                    )
                  )}
                >
                  {(col.idx + 10).toString(36).toUpperCase()} - {col.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        </Table>

        <input
          ref={inputRef}
          name="file"
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={(e) => {
            e.currentTarget.form?.requestSubmit();
          }}
          style={{ display: "none" }}
        />

        <UploadButton ref={inputRef} />
      </section>
    </form>
  );
}
