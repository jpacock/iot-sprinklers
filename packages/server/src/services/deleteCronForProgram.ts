import { scheduledJobs } from 'node-schedule';

export function deleteCronForProgram(id: string): void {
  const cronJob = scheduledJobs[id];
  if (cronJob) cronJob.cancel();
}
