import { uuid } from 'uuidv4';

import { ICreateProgramRequest, ICreateProgramResponse } from '../../../types';
import { createProgram as createProgramInDb } from '../data-access/maria/programs';
import { createCronForProgram } from './createCronForProgram';

export async function createProgram(
  newProgram: ICreateProgramRequest,
): Promise<ICreateProgramResponse> {
  const id = uuid();
  const program = {
    ...newProgram,
    id,
  };

  await createProgramInDb(program);
  if (program.active) createCronForProgram(program);

  return { id };
}
