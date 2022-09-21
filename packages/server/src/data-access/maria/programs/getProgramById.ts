import { IProgram, IProgramDoc } from '../../../../../shared';

import { getDB } from '../MariaDBClientManager';

export async function getProgramById(id: string): Promise<IProgram> {
  const db = getDB();
  const program = {} as IProgram;

  try {
    const results = await db('programs').where({ id }) as IProgramDoc[];
    const [result] = results;

    program.active = result.active;
    // program.cronExpression = result.cron_expression;
    program.id = result.id;
    program.runTimes = JSON.parse(result.run_times);
  } catch (err) {
    throw new Error(`Unable to get program ${id}.`);
  }

  return program;
}
