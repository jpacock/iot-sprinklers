import { getDB } from '../MariaDBClientManager';

export async function getPrograms() {
  const db = getDB();

  try {
    const results = await db('programs');
    const programs = results.map(result => ({
      id: result.id,
      name: result.program_name,
      startTime: result.start_time,
      zone1Duration: result.zone_1_duration,
      zone2Duration: result.zone_2_duration,
      zone3Duration: result.zone_3_duration,
      zone4Duration: result.zone_4_duration,
      days: result.days,
      active: result.active,
      running: result.running,
    }));
    return programs;
  } catch (err) {
    console.log('error retrieving programs');
  }
}
