import { ReactQueryProvider } from "@/libs/react-query";
import { render } from "@testing-library/react";
import { ReactElement } from "react";
import userEvent from "@testing-library/user-event";

export const renderWithProviders = (ui: ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(<ReactQueryProvider>{ui}</ReactQueryProvider>),
  };
};
