import { debounce } from "lodash-es";

export function format(text) {
  return `[FORMAT] ${text}`;
}

export function logger(message) {
  console.log(`[LOG] ${message}`);
}

export const checkIsBoolean = (value): value is boolean => {
  return typeof value === "boolean";
};
