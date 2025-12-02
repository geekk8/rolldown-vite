import { debounce } from "lodash-es";

const debounceFunc = (func: () => void, timeout: number = 10) => {
  return debounce(func, timeout);
};

const lodashMapping = {
  debounce: debounceFunc,
};

export default lodashMapping;
