"use client";

import { Suspense, use } from "react";

let mockingPromise: Promise<boolean> | undefined;

if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_IS_MOCK === "true"
) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { worker } = require("./browser");
  mockingPromise = worker.start();
}

/** クライアントサイドでMSWを利用できるようにするためのラッパー */
export const MSWProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
};

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (mockingPromise) {
    use(mockingPromise!);
  }
  return children;
}
