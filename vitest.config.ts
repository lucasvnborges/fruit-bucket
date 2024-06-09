import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        include: ["src/**"],
      },
      exclude: [...configDefaults.exclude],
      reporters: ["verbose"],
    },
  })
);
