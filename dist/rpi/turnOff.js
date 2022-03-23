"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.turnOff = void 0;
const rpio_1 = __importDefault(require("rpio"));
const getZonePin_1 = require("../util/getZonePin");
function turnOff(zone) {
    const zonePin = (0, getZonePin_1.getZonePin)(zone);
    const mainPin = (0, getZonePin_1.getZonePin)('main');
    rpio_1.default.write(mainPin, rpio_1.default.HIGH);
    console.log(`turned off pin ${mainPin}`);
    rpio_1.default.write(zonePin, rpio_1.default.HIGH);
    console.log(`turned off pin ${zonePin}`);
}
exports.turnOff = turnOff;
;
//# sourceMappingURL=turnOff.js.map