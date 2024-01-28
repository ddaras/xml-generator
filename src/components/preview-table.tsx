"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DownloadForm } from "./download-form";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export function PreviewTable({
  data,
  columns,
}: {
  data: {
    items: any[][];
    count: number;
  };
  columns: { idx: number; title: string; align?: string }[];
}) {
  return (
    <div className="w-8/12 my-4">
      <h1 className="text-center text-2xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        ატვირთული ფაილის გადახედვა
      </h1>
      <p className="my-4 text-center text-sm opacity-60">
        ჩანაწერების რაოდენობა სულ:{" "}
        <span className="font-bold">{data.count}</span>
      </p>

      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <div className="w-full h-full opacity-50 bg-slate-200 dark:bg-slate-900">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
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
                    {col.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item, idx) => (
                <TableRow key={idx}>
                  {columns.map((col) => (
                    <TableCell
                      key={idx + col.idx}
                      className={twMerge(
                        clsx(
                          "",
                          { "text-right": col?.align === "right" },
                          { "text-center": col?.align === "center" }
                        )
                      )}
                    >
                      {item[col.idx]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-slate-950"></div>

        {data.count > 0 && (
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-2xl">
            <DownloadForm data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
