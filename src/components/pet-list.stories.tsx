import {
  getListPetsMockHandler,
  getListPetsMockHandler500,
  getListPetsResponseMock,
} from "@/__generated__/pets/pets.msw";
import { PetList } from "./pet-list";
import { Meta, StoryObj } from "@storybook/react";
import { delay } from "msw";

const meta = {
  component: PetList,
} satisfies Meta<typeof PetList>;

export default meta;

type Story = StoryObj<typeof PetList>;

const handlers = {
  success: [getListPetsMockHandler()],
  loading: [
    getListPetsMockHandler(async () => {
      await delay(2000);
      return getListPetsResponseMock();
    }),
  ],
  empty: [getListPetsMockHandler(() => [])],
  error: [
    getListPetsMockHandler500(async () => {
      await delay(2000);
      return { code: 500, message: "Internal Server Error" };
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
