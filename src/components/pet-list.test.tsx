import { getListPetsMockHandler } from "@/__generated__/pets/pets.msw";
import { renderWithProviders } from "@/utils/testing";
import { setupServer } from "msw/node";
import { PetList } from "./pet-list";
import { screen, waitFor, within } from "@testing-library/react";
import { http, HttpResponse } from "msw";

const listPetsInterceptor = vi.fn();

const handlers = [getListPetsMockHandler()];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => {
  server.close();
});

test("動物リストが表示される", async () => {
  server.use(
    getListPetsMockHandler(({ request }) => {
      const url = new URL(request.url);
      listPetsInterceptor(url.searchParams.toString());
      return [{ id: 1, name: "ポチ", tag: "犬" }];
    }),
  );

  renderWithProviders(<PetList />);

  await waitFor(() => {
    expect(listPetsInterceptor).toHaveBeenCalled();
  });
  expect(listPetsInterceptor).toHaveBeenLastCalledWith("limit=10");

  const table = screen.getByRole("table", { name: "動物リスト" });
  expect(table).toBeInTheDocument();
  const rowgroup = within(table).getAllByRole("rowgroup");
  expect(rowgroup).toHaveLength(2);
  const thead = rowgroup[0];
  expect(thead).toBeInTheDocument();
  const tbody = rowgroup[1];
  expect(tbody).toBeInTheDocument();

  const ths = within(thead).getAllByRole("columnheader");
  expect(ths).toHaveLength(3);
  expect(ths[0]).toHaveTextContent("ID");
  expect(ths[1]).toHaveTextContent("名前");
  expect(ths[2]).toHaveTextContent("ジャンル");

  const rows = within(tbody).getAllByRole("row");
  expect(rows).toHaveLength(1);
  const cells = within(rows[0]).getAllByRole("cell");
  expect(cells).toHaveLength(3);
  expect(cells[0]).toHaveTextContent("1");
  expect(cells[1]).toHaveTextContent("ポチ");
  expect(cells[2]).toHaveTextContent("犬");
});

test("動物リストが見つからない場合にメッセージが表示される", async () => {
  server.use(
    getListPetsMockHandler(({ request }) => {
      const url = new URL(request.url);
      listPetsInterceptor(url.searchParams.toString());
      return [];
    }),
  );

  renderWithProviders(<PetList />);

  await waitFor(() => {
    expect(listPetsInterceptor).toHaveBeenCalled();
  });
  expect(listPetsInterceptor).toHaveBeenLastCalledWith("limit=10");

  const notFound = screen.getByText("見つかりませんでした");
  expect(notFound).toBeInTheDocument();
});

test("エラー時にエラーメッセージが表示される", async () => {
  const hander = getListPetsMockHandler();
  server.use(
    http.get(hander.info.path, async ({ request }) => {
      const url = new URL(request.url);
      listPetsInterceptor(url.searchParams.toString());
      return new HttpResponse(
        JSON.stringify({ message: "Error loading pets." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }),
  );

  renderWithProviders(<PetList />);

  await waitFor(() => {
    expect(listPetsInterceptor).toHaveBeenCalled();
  });
  expect(listPetsInterceptor).toHaveBeenLastCalledWith("limit=10");

  const error = screen.getByText("読み込みに失敗しました");
  expect(error).toBeInTheDocument();
});
