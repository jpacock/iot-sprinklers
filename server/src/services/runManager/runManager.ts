// Generate a unique run ID (you can implement your own logic)
function generateRunId() {
  return Math.random().toString(36).substr(2, 9);
}

class RunManager {
  private static instance: RunManager;

  private activeRuns: Record<string, { zoneId: string, startTime: Date, stopTime: Date | null }>;

  constructor() {
    this.activeRuns = {}; // Use an object to store active runs with run IDs as keys
  }

  startRun(zoneId): string {
    const runId = generateRunId(); // You need to implement a function to generate unique run IDs
    this.activeRuns[runId] = {
      zoneId,
      startTime: new Date(),
      stopTime: null,
    };
    return runId;
  }

  stopRun(runId) {
    if (this.activeRuns[runId]) {
      this.activeRuns[runId].stopTime = new Date();
      const { zoneId, startTime, stopTime } = this.activeRuns[runId];
      // Perform necessary operations with zoneId, startTime, and stopTime (e.g., update database)
      delete this.activeRuns[runId]; // Remove the run from activeRuns
      return { zoneId, startTime, stopTime };
    }
    return null; // Run with the provided runId was not found
  }
}

// Singleton instance of RunManager
const runManager = new RunManager();

module.exports = runManager;
