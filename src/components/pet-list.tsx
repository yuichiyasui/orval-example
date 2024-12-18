"use client";

import { useListPets } from "@/__generated__/pets/pets";

export const PetList = () => {
  const { data, isLoading, isError } = useListPets({
    limit: 10,
  });

  console.log(data);

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
        {(() => {
          if (isLoading) {
            return (
              <tr>
                <td colSpan={3} className="p-2 text-center">
                  読み込み中...
                </td>
              </tr>
            );
          }

          if (isError) {
            return (
              <tr>
                <td colSpan={3} className="p-2 text-center text-red-700">
                  エラーが発生しました
                </td>
              </tr>
            );
          }

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
        })()}
      </tbody>
    </table>
  );
};
