import React from "react";
import { uploadFile } from "./actions";
import { GeneratorScreen } from "@/components/generator-screen";

export default async function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <GeneratorScreen uploadFile={uploadFile} />
    </main>
  );
}
