export function getZonePin(zone: string): number | undefined {
  return new Map([
    ['1', 31],
    ['2', 33],
    ['3', 35],
    ['4', 37],
    ['main', 29],
  ]).get(zone);
}
