import { IUpdateProgramRequest } from 'shared';

import { updateProgram as updateProgramInDb } from '../data-access/maria/programs';
import { createCronForProgram } from './createCronForProgram';
import { deleteCronForProgram } from './deleteCronForProgram';

export async function updateProgram(
  id: string,
  updatedProgram: IUpdateProgramRequest,
): Promise<void> {
  if (id !== updatedProgram.id) throw new Error('Updated program id must be same as in url parameter.');

  try {
    deleteCronForProgram(id);
    if (updatedProgram.active) createCronForProgram(updatedProgram);
    await updateProgramInDb(updatedProgram);
  } catch (error) {
    throw new Error((error as any).message);
  }
}
