import { IProgramDoc, IProgram } from '../../../../../types';
import { getDB } from '../MariaDBClientManager';

export async function updateProgram(updatedProgram: IProgram): Promise<void> {
  try {
    const db = getDB();

    const programDoc = {
      id: updatedProgram.id,
      display_name: updatedProgram.displayName,
      start_minutes: updatedProgram.startMinutes,
      start_hours: updatedProgram.startHours,
      start_days_of_week: updatedProgram.startDaysOfWeek,
      active: updatedProgram.active,
      run_times: JSON.stringify(updatedProgram.runTimes),
      run_time_unit: updatedProgram.runTimeUnit,
    } as IProgramDoc;

    await db('programs')
      .where({ id: programDoc.id })
      .update({ ...programDoc });
  } catch (err) {
    throw new Error(`Unable to update program ${updatedProgram}.`);
  }
}
