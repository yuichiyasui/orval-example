import { defineConfig } from "orval";

const config = defineConfig({
  petstore: {
    input: {
      target: "./openapi/petstore.yaml",
    },
    output: {
      mode: "tags-split",
      target: "./src/__generated__",
      biome: true,
      client: "react-query",
      httpClient: "fetch",
      clean: true,
      mock: {
        type: "msw",
        delay: 250,
        baseUrl: "http://localhost:8080",
      },
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
