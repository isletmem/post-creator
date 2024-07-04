import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    title: "Post Creator",
    favicon: "./src/favicon.svg",
  },
  plugins: [pluginReact()],
});
