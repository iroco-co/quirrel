import {parse} from "@datasert/cronjs-parser";

export function isValidCronExpression(cron: string) {
  try {
    parse(cron)
    return true;
  } catch (error) {
    return false;
  }
}
