import { getDB } from '../MariaDBClientManager';

export async function deleteProgram(id) {
  try {
    const db = getDB();
    await db('programs')
      .where({ id: id })
      .del();
  } catch (err) {
    console.log(`Error deleting program ${id}`);
  }
}
