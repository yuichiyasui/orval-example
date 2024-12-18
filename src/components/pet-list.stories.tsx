import { PetList } from "./pet-list";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: PetList,
} satisfies Meta<typeof PetList>;

export default meta;

type Story = StoryObj<typeof PetList>;

export const Default = {} satisfies Story;
