// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { copyFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export default defineConfig({
  nitro: {
    preset: "vercel",
  },
  vite: {
    ssr: {
      external: ["swisseph"],
    },
    plugins: [
      {
        name: "copy-swisseph-wasm",
        closeBundle() {
          const wasmDir = join(process.cwd(), "node_modules", "swisseph-wasm", "wasm");
          const funcDir = join(process.cwd(), ".vercel", "output", "functions", "__server.func");
          if (!existsSync(funcDir)) return;
          const outDir = join(funcDir, "wasm");
          if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
          for (const file of readdirSync(wasmDir)) {
            copyFileSync(join(wasmDir, file), join(outDir, file));
          }
        },
      },
    ],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
