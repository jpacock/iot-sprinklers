"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var vite_1 = require("vite");
var plugin_react_refresh_1 = __importDefault(require("@vitejs/plugin-react-refresh"));
var vite_plugin_svgr_1 = __importDefault(require("vite-plugin-svgr"));
// https://vitejs.dev/config/
exports["default"] = (0, vite_1.defineConfig)({
    // This changes the out put dir from dist to build
    // comment this out if that isn't relevant for your project
    build: {
        outDir: 'build'
    },
    plugins: [
        (0, plugin_react_refresh_1["default"])(),
        (0, vite_plugin_svgr_1["default"])({
            svgrOptions: {
                icon: true
            }
        }),
    ],
    server: {
        port: 8080
    }
});
