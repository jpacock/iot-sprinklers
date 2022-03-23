"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureZones = void 0;
const rpio_1 = __importDefault(require("rpio"));
const getZonePin_1 = require("../util/getZonePin");
function configureZones() {
    ['1', '2', '3', '4', 'main'].forEach(zone => {
        rpio_1.default.open((0, getZonePin_1.getZonePin)(zone), rpio_1.default.OUTPUT, rpio_1.default.HIGH);
    });
}
exports.configureZones = configureZones;
//# sourceMappingURL=configureZones.js.map