/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
export const isList = (A) => {
  return Object.prototype.hasOwnProperty.call(A, 'length');
};

export const getFirstDim = (a) => {
  return isList(a) ? a.length : 0;
};

Object.assign(Array.prototype, {
  sum() {
    return this.reduce((acc, cur) => acc + cur, 0.0);
  },
  first() {
    return this.length > 0 ? this[0] : undefined;
  },
  last() {
    return this.length > 0 ? this[this.length - 1] : undefined;
  },
  average() {
    return this.sum() / this.length;
  },
  range() {
    const self = this.sort();
    return {
      min: self[0],
      max: self[this.length - 1],
    };
  },
  shape() {
    const outShp = [];
    let self = this;
    let dimI = isList(self) ? self.length : 0;
    outShp.push(dimI);
    let n = 1;
    while (n < 10 && dimI > 0) {
      n += 1;
      self = self.first();
      dimI = isList(self) ? self.length : 0;
      if (dimI > 0) outShp.push(dimI);
    }
    return outShp;
  },
  unique() {
    return this.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
  },
});

Object.assign(Array, {
  Arange(start, stop, step = 1) {
    return Array.from({ length: Math.floor((stop - start) / step) }, (_v, i) => start + i * step);
  },
});

Object.assign(Array.prototype, {});
