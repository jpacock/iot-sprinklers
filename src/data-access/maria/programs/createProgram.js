import { getDB } from '../MariaDBClientManager';
import { uuid } from 'uuidv4';

export async function createProgram(program) {
  try {
    const db = getDB();
    await db('programs').insert([
      {
        id: uuid(),
        program_name: program.name,
        start_time: program.startTime,
        zone_1_duration: program.zone1Duration,
        zone_2_duration: program.zone2Duration,
        zone_3_duration: program.zone3Duration,
        zone_4_duration: program.zone4Duration,
        days: program.days,
        active: program.active,
        running: program.running,
      },
    ]);
  } catch (err) {
    console.log(`Error creating program ${program.id}`);
    console.log(err);
  }
}
