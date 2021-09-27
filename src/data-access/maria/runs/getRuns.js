import moment from 'moment';

import { getDB } from '../MariaDBClientManager';

export async function getRuns() {
  const db = getDB();

  try {
    const results = await db('runs')
      .orderBy('start_date_time', 'desc');
    const runs = results.map(result => {
      const startDateTime = moment(result.start_date_time);
      const scheduledEndDateTime = moment(result.scheduled_end_date_time);
      const actualEndDateTime = moment(result.actual_end_date_time);
      const duration = actualEndDateTime.diff(startDateTime, 'seconds');
      return {
        id: result.id,
        initiatedBy: result.initiated_by,
        zone: result.zone,
        startDateTime: startDateTime.toISOString(),
        scheduledEndDateTime: scheduledEndDateTime.toISOString(),
        actualEndDateTime: actualEndDateTime.toISOString(),
        duration,
      };
    });

    const runsByDay = runs.reduce((groups, run) => {
      const date = run.startDateTime.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(run);
      return groups;
    }, {});

    return Object.keys(runsByDay).map((date) => {
      return {
        date,
        runs: runsByDay[date],
      };
    });
  } catch (err) {
    console.log('error retrieving programs', err);
  }
}
