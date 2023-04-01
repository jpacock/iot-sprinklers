import { deleteProgram as deleteProgramInDb } from '../data-access/maria/programs';
import {deleteCronForProgram } from './deleteCronForProgram';

export async function deleteProgram(id: string): Promise<void> {
  deleteCronForProgram(id);
  await deleteProgramInDb(id);
}
