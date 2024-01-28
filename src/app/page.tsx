import React from "react";
import { parseFile, uploadFile } from "./actions";
import { GeneratorScreen } from "@/components/generator-screen";

export default async function Home() {
  const data = await parseFile();

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <GeneratorScreen data={data} uploadFile={uploadFile} />
    </main>
  );
}
