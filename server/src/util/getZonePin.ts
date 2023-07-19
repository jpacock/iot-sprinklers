export function getZonePin(zone: string): number | undefined {
  return new Map([
    ['1', 29],
    ['2', 31],
    ['3', 33],
    ['4', 35],
    ['5', 37],

  ]).get(zone);
}
