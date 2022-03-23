"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZonePin = void 0;
function getZonePin(zone) {
    return new Map([
        ['1', 31],
        ['2', 33],
        ['3', 35],
        ['4', 37],
        ['main', 29],
    ]).get(zone);
}
exports.getZonePin = getZonePin;
//# sourceMappingURL=getZonePin.js.map