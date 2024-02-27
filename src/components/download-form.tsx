"use client";

import React from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";
import { IItem, buildXML } from "@/app/actions";
import { useMutation } from "react-query";

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
    <Button
      size="lg"
      onClick={() => {
        mutate(data);
      }}
      disabled={isLoading}
      className="shadow-lg"
    >
      <DownloadIcon className="mr-2 h-5 w-5" />
      {isLoading ? "იტვირთება..." : "ჩამოტვირთე .xml ფაილი"}
    </Button>
  );
}
