import { getDB } from '../MariaDBClientManager';

export async function getRuns() {
  const db = getDB();

  try {
    const results = await db('runs');
    const runs = results.map(result => ({
      id: result.id,
      intiaedBy: result.initiated_by,
      zone: result.zone,
      startDateTime: result.start_date_time,
      scheduledEndDateTime: result.scheduled_end_date_time,
      actualEndDateTime: result.actual_end_date_time,
    }));
    return runs;
  } catch (err) {
    console.log('error retrieving programs');
  }
}
