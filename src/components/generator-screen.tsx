"use client";

import React from "react";
import { UploadForm } from "@/components/upload-form";
import { PreviewTable } from "@/components/preview-table";
import { PREVIEW_TABLE_COLUMNS } from "@/constants";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

export function GeneratorScreen({
  data,
  uploadFile,
}: {
  data: { items: any[][]; count: number };
  uploadFile: (
    prevState: any,
    formData: FormData
  ) => Promise<{
    message: string;
  }>;
}) {
  const [currentSection, setCurrentSection] = React.useState(0); // 0 - upload, 1 - download

  const commonClassnames =
    "absolute h-full w-full transition-transform ease-linear flex flex-col justify-center items-center";

  return (
    <section className="relative overflow-hidden h-full w-full">
      <div
        className={twMerge(
          clsx(commonClassnames, "-translate-y-full", {
            "translate-y-0": currentSection === 0,
          })
        )}
      >
        <UploadForm
          uploadFile={uploadFile}
          onSuccess={() => {
            setCurrentSection(1);
          }}
        />

        <Button
          variant="ghost"
          onClick={() => {
            setCurrentSection(1);
          }}
        >
          <ArrowDown className="mr-2 h-4 w-4" /> მაჩვენე ბოლოს ატვირთული ფაილი
        </Button>
      </div>

      <div
        className={twMerge(
          clsx(commonClassnames, "translate-y-full", {
            "translate-y-0": currentSection === 1,
          })
        )}
      >
        <Button
          variant="ghost"
          onClick={() => {
            setCurrentSection(0);
          }}
        >
          <ArrowUp className="mr-2 h-4 w-4" /> ატვირთე ახალი ფაილი
        </Button>

        <PreviewTable columns={PREVIEW_TABLE_COLUMNS} data={data} />
      </div>
    </section>
  );
}
