import { hello } from "./hello";
import { used } from "./lib";
import { logger } from "./utils";

// lodash-es 함수들 import (tree-shaking 테스트)
import {
  debounce,
  throttle,
  map,
  filter,
  reduce,
  chunk,
  flatten,
  uniq,
  groupBy,
  sortBy,
  orderBy,
  cloneDeep,
  merge,
  pick,
  omit,
  get,
  set,
  has,
  isEmpty,
  isEqual,
  capitalize,
  camelCase,
  snakeCase,
  kebabCase,
  trim,
  truncate,
  startsWith,
  endsWith,
  includes,
  find,
  findIndex,
  every,
  some,
  zipObject,
  difference,
  intersection,
  union,
  concat,
  reverse,
  shuffle,
  sample,
  random,
  range,
  sumBy,
  meanBy,
  maxBy,
  minBy,
} from "lodash-es";

logger("main page loaded!");

hello();
used();

// 일부 함수만 실제로 사용 (tree-shaking 효과 확인)
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = {
  mapped: map(data, (x) => x * 2),
  filtered: filter(data, (x) => x > 5),
  chunked: chunk(data, 3),
  unique: uniq([...data, ...data]),
  grouped: groupBy(data, (x) => (x % 2 === 0 ? "even" : "odd")),
};

const debouncedLog = debounce(() => {
  console.log("Debounced:", result);
}, 300);

const throttledLog = throttle(() => {
  console.log("Throttled:", result);
}, 1000);

console.log("Result:", result);
debouncedLog();
throttledLog();
