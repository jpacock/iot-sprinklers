import { getDB } from '../MariaDBClientManager';

export async function createRun(run) {
  try {
    const db = getDB();
    await db('runs').insert([
      {
        id: run.id,
        initiated_by: run.initiatedBy,
        zone: run.zone,
        start_date_time: run.startDateTime,
        scheduled_end_date_time: run.scheduledEndDateTime,
      },
    ]);
  } catch (err) {
    console.log(`Error creating program ${run.id}`);
    console.log(err);
  }
}
