"use client";

import { useListPets } from "@/__generated__/pets/pets";

export const PetList = () => {
  const { data, isLoading, isError } = useListPets({
    limit: 10,
  });

  if (isError) {
    return <p className="text-red-700">読み込みに失敗しました</p>;
  }

  if (isLoading) {
    return <p className="text-slate-700">読み込み中...</p>;
  }

  if (typeof data === "undefined" || data.data.length === 0) {
    return <p>見つかりませんでした</p>;
  }

  return (
    <table className="table-auto">
      <caption className="font-bold">動物リスト</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>名前</th>
          <th>ジャンル</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((d) => (
          <tr key={d.id}>
            <td>{d.id}</td>
            <td>{d.name}</td>
            <td>{d.tag}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
