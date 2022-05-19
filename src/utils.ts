const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const START_TIME = Date.now();
const MAX_RETRIES = 5;

const expBackoff = (func) => {
  for (let n = 0; n <= MAX_RETRIES; n += 1) {
    try {
      return func();
    } catch (e) {
      if (n === MAX_RETRIES) {
        throw e;
      }
      Utilities.sleep(2 ** n * ONE_SECOND + Math.round(Math.random() * ONE_SECOND));
    }
  }
  return null;
};

const hasCpuTime = () => !(Date.now() - START_TIME > ONE_MINUTE * 4);

export { expBackoff, hasCpuTime };

export type PositiveNumber = number & { __type: "PositiveNumber" };

export function isPositive(n: number): n is PositiveNumber {
  return n >= 0;
}

function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new TypeError(`Expected 'string', got: '${typeof value}'`);
  }
}

function assertIterable(value: unknown): asserts value is Iterable<unknown> {
  if (Array.isArray(value)) {
    throw new TypeError(`Expected 'string', got: '${typeof value}'`);
  }
}

const checkIfList = (A): boolean => {
  if (Object.keys(Object.prototype.hasOwnProperty).indexOf('call') >= 0) {
    return Object.prototype.hasOwnProperty.call(A, 'length');
  }
  try {
    return A.length >= 0;
  } catch (error) {
    return false;
  }
};

export function isIterable(arg): arg is Iterable<unknown> {
  return Array.isArray(arg) || checkIfList(arg);
}

export const isList = (arg): arg is ArrayLike<any> => Array.isArray(arg);
