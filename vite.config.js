import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: "src/",

    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                admin: resolve(__dirname, "src/admin/index.html"),
                news: resolve(__dirname, "src/news/index.html"),
                error: resolve(__dirname, "src/404/index.html"),
            },
        },
    },
});
