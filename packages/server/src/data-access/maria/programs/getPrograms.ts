import { IProgram, IProgramDoc } from '../../../../../shared';

import { getDB } from '../MariaDBClientManager';

export async function getPrograms(): Promise<IProgram[]> {
  const db = getDB();
  let programs = [] as IProgram[];

  try {
    const results = await db('programs') as IProgramDoc[];

    programs = results.map((result) => ({
      active: Boolean(Number(result.active)),
      displayName: result.display_name,
      startMinutes: result.start_minutes,
      startHours: result.start_hours,
      startDaysOfWeek: result.start_days_of_week,
      id: result.id,
      runTimes: JSON.parse(result.run_times),
      runTimeUnit: result.run_time_unit,
    }));
  } catch (err) {
    throw new Error('Unable to get programs');
  }

  return programs;
}
