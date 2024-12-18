import { defineConfig } from "orval";

const config = defineConfig({
  petstore: {
    input: {
      target: "./openapi/petstore.yaml",
    },
    output: {
      mode: "single",
      target: "./src/__generated__/petstore.ts",
      schemas: "./src/__generated__",
      biome: true,
      client: "react-query",
      httpClient: "fetch",
      clean: true,
      override: {
        mutator: {
          path: "./src/custom-fetch.ts",
          name: "customFetch",
        },
      },
    },
  },
});

export default config;
