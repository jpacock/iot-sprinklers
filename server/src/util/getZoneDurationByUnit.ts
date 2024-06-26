import { RunTimeUnitType } from 'shared';

const SECONDS_PER_MINUTE = 60;
const ZONE_1_MINUTES_PER_INCH = 0;
const ZONE_2_MINUTES_PER_INCH = 60;
const ZONE_3_MINUTES_PER_INCH = 50;
const ZONE_4_MINUTES_PER_INCH = 60;
const ZONE_5_MINUTES_PER_INCH = 60;

export function getZoneDurationByUnit(zoneId: string, measurement: number, unit: string) {
  switch (unit) {
    case RunTimeUnitType.Inches:
      if (zoneId === '1') {
        return Math.floor(ZONE_1_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
      } if (zoneId === '2') {
        return Math.floor(ZONE_2_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
      } if (zoneId === '3') {
        return Math.floor(ZONE_3_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
      } if (zoneId === '4') {
        return Math.floor(ZONE_4_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
      }

      return Math.floor(ZONE_5_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
    case 'minutes':
      return measurement * SECONDS_PER_MINUTE;
    case 'seconds':
      return measurement;
    default:
      return 0;
  }
}
