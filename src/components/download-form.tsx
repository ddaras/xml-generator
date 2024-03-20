"use client";

import React from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";
import { IItem, buildXML } from "@/app/actions";
import { useMutation } from "react-query";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const SPLIT_BY = 99;

export function DownloadForm({
  data,
}: {
  data: {
    items: IItem[];
    count: number;
    total_brutto: number;
    total_price: number;
  };
}) {
  const [mode, setMode] = React.useState(0);

  const handleDownload = (url: string) => {
    var pom = document.createElement("a");
    pom.setAttribute("download", `doc-${Date.now()}.xml`);

    pom.dataset.downloadurl = ["text/plain", pom.download, pom.href].join(":");
    pom.draggable = true;
    pom.classList.add("dragout");
    pom.setAttribute("href", url);
    pom.click();
  };

  const { mutate, isLoading } = useMutation(["buildXML"], buildXML, {
    onSuccess: (data) => {
      toast({
        title: "ფაილი წარმატებით ჩამოიტვირთა! 🥳",
        variant: "default",
      });

      handleDownload(data ? data.url : "");
      // window.open("/doc.xml");
    },
    onError: () => {
      toast({
        title: "დაფიქსირდა შეცდომა. 😿",
        variant: "destructive",
      });
    },
  });

  const { toast } = useToast();

  React.useEffect(() => {}, [toast]);

  return (
    <div className="flex flex-col items-start gap-2 bg-white dark:bg-neutral-900 rounded-t-xl p-4">
      <div>აირჩიე რეჟიმი:</div>

      <div className="overflow-y-auto max-h-[300px]">
        <div>
          <RadioGroup
            defaultValue={String(mode)}
            onValueChange={(val) => {
              setMode(parseInt(val));
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="r1" />
              <Label htmlFor="r1">იმპორტი</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="r2" />
              <Label htmlFor="r2">ექსპორტი</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="r3" />
              <Label htmlFor="r3">საწყობი</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="r4" />
              <Label htmlFor="r4">რეექსპორტი</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col items-center gap-4 mt-6">
          {[...Array(Math.ceil(data.items.length / SPLIT_BY))].map(
            (chunk, i) => {
              const copyItems = [...data.items];

              const start = i * SPLIT_BY;
              const end = i === 0 ? SPLIT_BY : i * SPLIT_BY + SPLIT_BY;

              const chunkItems = copyItems.slice(start, end);

              return (
                <Button
                  key={i}
                  size="lg"
                  onClick={() => {
                    mutate({ items: chunkItems, type: mode });
                  }}
                  disabled={isLoading}
                  className="shadow-lg"
                >
                  {/* <DownloadIcon className="mr-2 h-5 w-5" /> */}

                  <div className="flex flex-col">
                    <div>{`XML${i + 1} (${chunkItems.length} აითემი)`}</div>
                    <div>
                      ღირ:{" "}
                      {`${chunkItems
                        .reduce((acc, item) => item.sum_price + acc, 0)
                        .toLocaleString()}`}
                      {/* </div>
                    <div> */}{" "}
                      ბრუტ:{" "}
                      {`${chunkItems
                        .reduce((acc, item) => item.total_brutto + acc, 0)
                        .toLocaleString()}`}
                    </div>
                  </div>
                </Button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
