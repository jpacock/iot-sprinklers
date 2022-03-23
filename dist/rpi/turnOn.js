"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.turnOn = void 0;
const rpio_1 = __importDefault(require("rpio"));
const getZonePin_1 = require("../util/getZonePin");
function turnOn(zone) {
    const zonePin = (0, getZonePin_1.getZonePin)(zone);
    const mainPin = (0, getZonePin_1.getZonePin)('main');
    console.log('zone Pin', zonePin);
    console.log('main Pin', mainPin);
    rpio_1.default.write(mainPin, rpio_1.default.LOW);
    console.log(`turned on pin ${mainPin}`);
    rpio_1.default.write(zonePin, rpio_1.default.LOW);
    console.log(`turned on pin ${zonePin}`);
}
exports.turnOn = turnOn;
;
//# sourceMappingURL=turnOn.js.map