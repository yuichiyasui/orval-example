"use client";

import { ComponentPropsWithoutRef } from "react";
import { ErrorBoundary } from "react-error-boundary";

type FallbackProps = ComponentPropsWithoutRef<
  Exclude<
    ComponentPropsWithoutRef<typeof ErrorBoundary>["FallbackComponent"],
    undefined
  >
>;

export const PetListFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <tr>
    <td colSpan={3} className="p-2 text-center">
      <p className="text-red-700">エラーが発生しました</p>
      <div className="mt-2">
        <button type="button" onClick={resetErrorBoundary}>
          再読み込み
        </button>
      </div>
    </td>
  </tr>
);
