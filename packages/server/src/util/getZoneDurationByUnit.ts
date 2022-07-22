import { RunTimeUnitType } from '../../../types/RunTimeUnitType';

const SECONDS_PER_MINUTE = 60;
const ZONE_1_MINUTES_PER_INCH = 97.4;
const ZONE_2_MINUTES_PER_INCH = 30;
const ZONE_3_MINUTES_PER_INCH = 64.3;
const ZONE_4_MINUTES_PER_INCH = 64.3;

export function getZoneDurationByUnit(zoneId: string, measurement: number, unit: string) {
  switch (unit) {
    case RunTimeUnitType.Inches:
      if (zoneId === '1') {
        return Math.floor(ZONE_1_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
      } if (zoneId === '2') {
        return Math.floor(ZONE_2_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
      } if (zoneId === '3') {
        return Math.floor(ZONE_3_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
      }

      return Math.floor(ZONE_4_MINUTES_PER_INCH * SECONDS_PER_MINUTE * measurement);
    case RunTimeUnitType.Minutes:
      return measurement * SECONDS_PER_MINUTE;
    case RunTimeUnitType.Seconds:
      return measurement;
    default:
      return 0;
  }
}
