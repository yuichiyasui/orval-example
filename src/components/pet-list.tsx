"use client";

import { useListPets } from "@/__generated__/pets/pets";

export const PetList = () => {
  const { data, isLoading, isError } = useListPets({
    limit: 10,
  });

  if (isError) {
    return <p>Error loading pets.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (typeof data === "undefined" || data.data.length === 0) {
    return <p>No data.</p>;
  }

  return (
    <ul>
      {data.data.map((pet) => (
        <li key={pet.id}>{pet.name}</li>
      ))}
    </ul>
  );
};
