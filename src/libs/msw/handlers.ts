import { getPetsMock } from "@/__generated__/pets/pets.msw";

export const handlers = [...getPetsMock()];
