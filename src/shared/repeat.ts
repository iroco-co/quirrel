import * as cronMatcher from '@datasert/cronjs-matcher';

export function isValidTimezone(timezone: string) {
  try {
    const futureMatches = cronMatcher.getFutureMatches("* * * * *", {
      timezone,
    });
    return futureMatches.length > 0;
  } catch (error) {
    return false;
  }
}

export function embedTimezone(cronExpression: string, tz: string) {
  if (!isValidTimezone(tz)) {
    throw new Error("Invalid timezone " + tz);
  }

  return cronExpression + ";" + tz;
}

export function parseTimezonedCron(
  cronExpression: string
): [cron: string, tz: string] {
  const [cron, tz = "Etc/UTC"] = cronExpression.split(";");
  return [cron, tz];
}

export function cron(lastDate: Date, cronExpression: string): Date {
  const [cron, timezone] = parseTimezonedCron(cronExpression);
  const futureMatches = cronMatcher.getFutureMatches(cron, {
    startAt: lastDate.toISOString(),
    timezone,
  });

  return new Date(futureMatches[0]);
}

export function every(lastDate: Date, scheduleMeta: string): Date {
  return new Date(+lastDate + +scheduleMeta);
}
