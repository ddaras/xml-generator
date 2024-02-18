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
import { IItem } from "@/app/actions";

export function PreviewTable({
  data,
  columns,
  isLoading,
}: {
  data: {
    items: IItem[];
    count: number;
  };
  columns: { idx: number; key: string; title: string; align?: string }[];
  isLoading?: boolean;
}) {
  if (isLoading) return <>Loading...</>;

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
                  {Object.keys(item).map((col) => {
                    // @ts-ignore
                    let value = item[col];

                    const isNumber =
                      col === "total_qty" && typeof value === "number";
                    const isFloat =
                      ["total_brutto", "total_netto", "sum_price"].includes(
                        col
                      ) && typeof value === "number";

                    if (isFloat) value = value.toFixed(2);
                    if (isNumber) value = value.toFixed(0);

                    return (
                      <TableCell
                        key={col}
                        className={twMerge(
                          clsx(
                            "",
                            {
                              "text-right": isFloat,
                            },
                            { "text-center": isNumber }
                          )
                        )}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
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
