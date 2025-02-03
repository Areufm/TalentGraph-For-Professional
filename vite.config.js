import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { visualizer } from "rollup-plugin-visualizer";
import viteImagemin from "vite-plugin-imagemin";
import viteCompression from "vite-plugin-compression";
var pathSrc = resolve(__dirname, "src");
export default defineConfig({
    resolve: {
        alias: {
            "@": pathSrc,
        },
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    plugins: [
        vue(),
        viteMockServe({
            mockPath: "./mock", // 存放mock数据的文件夹
            enable: true, // 是否启用本地 mock
            logger: true, // 启用日志输出，便于调试
        }),
        AutoImport({
            imports: ["vue"],
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    prefix: "Icon",
                }),
            ],
            dts: resolve(pathSrc, "auto-imports.d.ts"),
        }),
        Components({
            resolvers: [
                IconsResolver({
                    enabledCollections: ["ep"],
                }),
                ElementPlusResolver(),
            ],
            dts: resolve(pathSrc, "components.d.ts"),
        }),
        Icons({
            autoInstall: true,
        }),
        visualizer({
            gzipSize: true,
            brotliSize: true,
            emitFile: false,
            filename: "test.html", //分析图生成的文件名
            open: true, //如果存在本地服务端口，将在打包后自动展示
        }),
        viteImagemin({
            gifsicle: { optimizationLevel: 7 },
            optipng: { optimizationLevel: 7 },
            mozjpeg: { quality: 70 },
            pngquant: { quality: [0.8, 0.9] },
            svgo: {
                plugins: [{ removeViewBox: false }],
            },
        }),
        viteCompression({
            algorithm: "brotliCompress",
            threshold: 10240, // 10KB 以上文件才压缩
        }),
    ],
    build: {
        // minify: "terser", // 使用 terser 进行压缩
        terserOptions: {
            compress: {
                // 移除所有 console 语句
                drop_console: true,
                drop_debugger: true,
            },
            format: {
                comments: false, // 移除所有注释
            },
        },
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("element-plus"))
                            return "element-plus";
                        if (id.includes("echarts"))
                            return "echarts";
                        if (id.includes("lodash"))
                            return "lodash";
                        if (id.includes("dayjs"))
                            return "dayjs";
                        if (id.includes("vue"))
                            return "vue-core";
                        return "vendor";
                    }
                },
                experimentalMinChunkSize: 20000,
            },
        },
        chunkSizeWarningLimit: 1000, // 调整警告阈值
        assetsInlineLimit: 4096, // 4KB 以下文件转 base64
        cssTarget: "chrome80", // 防止 CSS 被转换
    },
});
