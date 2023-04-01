"use strict";
exports.__esModule = true;
exports.getZoneDurationByUnit = void 0;
var SECONDS_PER_MINUTE = 60;
var ZONE_1_MINUTES_PER_INCH = 100;
var ZONE_2_MINUTES_PER_INCH = 30;
var ZONE_3_MINUTES_PER_INCH = 100;
var ZONE_4_MINUTES_PER_INCH = 100;
function getZoneDurationByUnit(zoneId, measurement, unit) {
    switch (unit) {
        case 'inches':
            if (zoneId === '1') {
                return Math.floor(ZONE_1_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
            }
            else if (zoneId === '2') {
                return Math.floor(ZONE_2_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
            }
            else if (zoneId === '3') {
                return Math.floor(ZONE_3_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
            }
            return Math.floor(ZONE_4_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
        case 'minutes':
            return measurement * SECONDS_PER_MINUTE;
        case 'seconds':
            return measurement;
        default:
            return 0;
    }
}
exports.getZoneDurationByUnit = getZoneDurationByUnit;
