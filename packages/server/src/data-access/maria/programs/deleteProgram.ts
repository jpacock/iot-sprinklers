import { getDB } from '../MariaDBClientManager';

export async function deleteProgram(id: string): Promise<void> {
  try {
    const db = getDB();

    await db('programs').where({ id })
      .del();
  } catch (err) {
    throw new Error(`Unable to delete program ${id}.`);
  }
}
