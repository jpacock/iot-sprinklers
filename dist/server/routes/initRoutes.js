"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const handlers_1 = require("../../handlers");
function initRoutes(server) {
    server.get('/health', handlers_1.handleHealthCheck);
    return server;
}
exports.initRoutes = initRoutes;
//# sourceMappingURL=initRoutes.js.map