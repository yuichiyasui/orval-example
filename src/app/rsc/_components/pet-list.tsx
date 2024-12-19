import { listPets } from "@/__generated__/pets/pets";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PetListFallback } from "./pet-list-fallback";

export const PetList = async () => {
  return (
    <table className="border-collapse border border-gray-300 text-sm">
      <caption className="font-bold text-left text-lg mb-2">動物リスト</caption>
      <thead className="border-b border-gray-300 bg-gray-50 text-left">
        <tr>
          <th className="p-2 w-10">ID</th>
          <th className="p-2 w-40">名前</th>
          <th className="p-2 w-40">ジャンル</th>
        </tr>
      </thead>
      <tbody>
        <ErrorBoundary FallbackComponent={PetListFallback}>
          <Suspense
            fallback={
              <tr>
                <td colSpan={3} className="p-2 text-center">
                  読み込み中...
                </td>
              </tr>
            }
          >
            <ListContent />
          </Suspense>
        </ErrorBoundary>
      </tbody>
    </table>
  );
};

const ListContent = async () => {
  const data = await listPets({ limit: 10 }, { next: { revalidate: 60 } });

  if (typeof data === "undefined" || data.data.length === 0) {
    return (
      <tr>
        <td colSpan={3} className="p-2 text-center">
          見つかりませんでした
        </td>
      </tr>
    );
  }

  return data.data.map((d) => (
    <tr key={d.id} className="border-b border-gray-300 last:border-b-0">
      <td className="p-2">{d.id}</td>
      <td className="p-2">{d.name}</td>
      <td className="p-2">{d.tag}</td>
    </tr>
  ));
};
