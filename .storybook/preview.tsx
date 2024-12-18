import React from "react";
import type { Preview } from "@storybook/react";
import { ReactQueryProvider } from "../src/libs/react-query";
import { initialize, mswLoader } from "msw-storybook-addon";

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ReactQueryProvider>
        <Story />
      </ReactQueryProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
