import { getDB } from '../MariaDBClientManager';

export async function updateActualEndTime(id, endDateTime) {
  try {
    const db = getDB();
    await db('runs')
      .where({ id })
      .update({ actual_end_date_time: endDateTime });
  } catch (err) {
    console.log(`Error updating run ${id}`);
    console.log(err);
  }
}
