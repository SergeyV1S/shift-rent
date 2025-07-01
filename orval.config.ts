import { defineConfig } from "orval";

export default defineConfig({
  shift_rent: {
    input: {
      target: "src/shared/api/shift-backend-.json",
      filters: {
        mode: "include",
        tags: [/cars/, /users/, /otps/]
      }
    },
    output: {
      mode: "tags-split",
      client: "axios",
      target: "src/shared/api/generated.ts",
      prettier: true,
      namingConvention: "kebab-case",
      override: {
        header: false,
        transformer(verb) {
          if (verb.tags) {
            verb.tags = verb.tags.map((tag) =>
              tag.includes("users") ? tag.slice(5).trim() : tag.slice(3).trim()
            );
          }
          return verb;
        },
        mutator: {
          path: "src/shared/api/instance.ts",
          name: "customInstance"
        }
      }
    }
  }
});
