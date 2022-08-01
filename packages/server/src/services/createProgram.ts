import { ICreateProgramRequest, ICreateProgramResponse } from '@iot-sprinklers/types';
import { uuid } from 'uuidv4';
import createError from 'http-errors';

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

  try {
    await createProgramInDb(program);
    if (program.active) createCronForProgram(program);
  } catch (err) {
    throw createError('Failed to create program.');
  }

  return { id };
}
