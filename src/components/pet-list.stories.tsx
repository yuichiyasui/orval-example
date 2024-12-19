import {
  getListPetsMockHandler,
  getListPetsResponseMock,
} from "@/__generated__/pets/pets.msw";
import { PetList } from "./pet-list";
import { Meta, StoryObj } from "@storybook/react";
import { delay, http, HttpResponse } from "msw";

const meta = {
  component: PetList,
} satisfies Meta<typeof PetList>;

export default meta;

type Story = StoryObj<typeof PetList>;

const handlers = {
  success: [getListPetsMockHandler()],
  loading: [
    http.get(getListPetsMockHandler().info.path, async () => {
      await delay(3000);
      return new HttpResponse(JSON.stringify(getListPetsResponseMock()), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }),
  ],
  empty: [getListPetsMockHandler(() => [])],
  error: [
    http.get(getListPetsMockHandler().info.path, async () => {
      await delay(2000);

      return new HttpResponse(
        JSON.stringify({ message: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }),
  ],
};

export const Default = {
  parameters: {
    msw: {
      handlers: handlers.success,
    },
  },
} satisfies Story;

export const Loading = {
  parameters: {
    msw: {
      handlers: handlers.loading,
    },
  },
} satisfies Story;

export const Empty = {
  parameters: {
    msw: {
      handlers: handlers.empty,
    },
  },
} satisfies Story;

export const Error = {
  parameters: {
    msw: {
      handlers: handlers.error,
    },
  },
} satisfies Story;
