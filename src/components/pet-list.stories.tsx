import { getListPetsMockHandler } from "@/__generated__/pets/pets.msw";
import { PetList } from "./pet-list";
import { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

const meta = {
  component: PetList,
} satisfies Meta<typeof PetList>;

export default meta;

type Story = StoryObj<typeof PetList>;

const listPetsMockHandler = getListPetsMockHandler();

export const Default = {
  parameters: {
    msw: {
      handlers: [listPetsMockHandler],
    },
  },
} satisfies Story;

export const Empty = {
  parameters: {
    msw: {
      handlers: [getListPetsMockHandler(() => [])],
    },
  },
} satisfies Story;

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get(listPetsMockHandler.info.path, async () => {
          return new HttpResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }),
      ],
    },
  },
} satisfies Story;
