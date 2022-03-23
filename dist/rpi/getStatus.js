"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatus = void 0;
const rpio_1 = __importDefault(require("rpio"));
const util_1 = require("../util");
function getStatus() {
    const results = ['1', '2', '3', '4', 'main'].map(zone => ({
        zone: zone,
        state: rpio_1.default.read((0, util_1.getZonePin)(zone)),
    }));
    return results;
}
exports.getStatus = getStatus;
//# sourceMappingURL=getStatus.js.map