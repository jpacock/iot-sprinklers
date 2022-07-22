import { IProgramDoc, IProgram } from '../../../../../types';
import { getDB } from '../MariaDBClientManager';

export async function createProgram(program: IProgram): Promise<void> {
  try {
    const db = getDB();

    const programDoc = {
      id: program.id,
      display_name: program.displayName,
      start_minutes: program.startMinutes,
      start_hours: program.startHours,
      start_days_of_week: program.startDaysOfWeek,
      active: false,
      run_times: JSON.stringify(program.runTimes),
      run_time_unit: program.runTimeUnit,
    } as IProgramDoc;

    await db('programs').insert(programDoc);
  } catch (err) {
    throw new Error('Unable to create program');
  }
}
