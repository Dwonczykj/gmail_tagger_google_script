import { isList } from "../../utils";

const assert = require('assert');



export const shapeArray = (a) => {
  const outShp = [];
  let self = a;
  let dimI = isList(self) ? self.length : 0;
  outShp.push(dimI);
  let n = 1;
  while (n < 10 && dimI > 0) {
    n += 1;
    // eslint-disable-next-line prefer-destructuring
    self = self[0];
    dimI = isList(self) ? self.length : 0;
    if (dimI > 0) outShp.push(dimI);
  }
  return outShp;
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
    let dimI = getFirstDim(self);
    outShp.push(dimI);
    let n = 1;
    while (n < 10 && dimI > 0) {
      n += 1;
      self = this.first();
      dimI = getFirstDim(self);
      outShp.push(dimI);
    }
    return outShp;
  },
  unique() {
    return this.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
  },
});

const matrix = (v) => {
  if (!isList(v)) return [[v]];
  if (v.length > 0 && !isList(v[0])) return Array.from(v, (val, _i) => [val]);
  return v;
};

const flatten = (A) => {
  if (!Array.isArray(A)) return A;
  return A.reduce((a, b) => {
    return a.concat(b);
  }, []);
};

function transposeMatrix(A) {
  const n = A.length;
  if (n <= 0) {
    return A;
  }
  const A0 = A[0];
  if (!isList(A0)) {
    return [A];
  }
  const m = A[0].length;
  const ATransp = Array.from({ length: m }, (_v, _i) => Array.from({ length: n }, (_v1, _i1) => 0));
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      ATransp[j][i] = A[i][j];
    }
  }
  return ATransp;
}

const shapeMatrix = (A) => {
  if (!isList(A)) return [0, 0];
  if (!isList(A[0])) return [A.length, 0];
  return [A.length, A[0].length];
};

const checkShapeParameter = (A, shape, paramName = '') => {
  assert.deepEqual(shapeMatrix(A), shape, `${paramName} has incorrect shape`);
};

function multMatrix(AMat, BMat) {
  /**
   * @AMat is a (n,p) matrix and @BMat is a (p,m) matrix
   * vector dot product in case that n = 1 and m = 1
   * @returns a (n,m)
   */

  let A = matrix(AMat);
  let B = matrix(BMat);
  assert.ok(isList(A), 'A must be enumerable');
  assert.ok(isList(B), 'B must be enumerable');

  const n = A.length;
  const p = B.length;
  if (!isList(A[0])) {
    A = [[A]];
  }
  if (!isList(B[0])) {
    B = Array.from({ length: p }, (v, _i) => [v]);
  }

  const ADims = shapeMatrix(A);
  const BDims = shapeMatrix(B);
  const m = BDims[1];

  assert.equal(
    ADims[1],
    BDims[0],
    `#Rows in B[${BDims.join('x')}] (originally [${shapeMatrix(BMat).join('x')}]) should equal #Cols in A[${ADims.join(
      'x'
    )}] (originally [${shapeMatrix(AMat).join('x')}])`
  );

  for (let i = 0; i < n; i += 1) {
    assert.equal(A[i].length, p, `A is a jagged array, matrix required`);
  }
  for (let i = 0; i < p; i += 1) {
    assert.equal(B[i].length, m, `B is a jagged array, matrix required`);
  }
  // Loop for calculate dot product
  const products = Array.from({ length: n }, (_v1, _i1) => Array.from({ length: m }, (_v2, _i2) => 0));
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      products[i][j] = Array.from({ length: p }, (v1, k) => A[i][k] * B[k][j]).reduce((accumVariable, curValue) => {
        return accumVariable + curValue;
      }, 0);
    }
  }

  return products;
}

// Function to find
// cross product of two vector array.
function crossProduct(A, B) {
  /*
      A and B must be 3D as cross products only make sense in 3D and 7D space.
      It is commonly used in physics, engineering, vector calculus, and linear algebra. It is defined by the formula
  
      {\displaystyle \mathbf {a} \times \mathbf {b} =\|\mathbf {a} \|\|\mathbf {b} \|\sin(\theta )\,\mathbf {n} }
      where {\displaystyle \mathbf {n} } is the unit vector perpendicular to both {\displaystyle \mathbf {a} } and {\displaystyle \mathbf {b} } . It can be computed other ways as well:
  
      {\displaystyle {\begin{aligned}\mathbf {a} \times \mathbf {b} &={\begin{vmatrix}\mathbf {i} &\mathbf {j} &\mathbf {k} \\a_{x}&a_{y}&a_{z}\\b_{x}&b_{y}&b_{z}\\\end{vmatrix}}={\begin{vmatrix}a_{y}&a_{z}\\b_{y}&b_{z}\end{vmatrix}}\mathbf {i} -{\begin{vmatrix}a_{x}&a_{z}\\b_{x}&b_{z}\end{vmatrix}}\mathbf {j} +{\begin{vmatrix}a_{x}&a_{y}\\a_{x}&a_{y}\end{vmatrix}}\mathbf {k} \\&=(a_{y}b_{z}-a_{z}b_{y})\mathbf {i} +(a_{z}b_{x}-a_{x}b_{z})\mathbf {j} +(a_{x}b_{y}-a_{y}b_{x})\mathbf {k} \end{aligned}}}
      */
  const crossP = [];
  if (!isList(A) || A.length !== 3) {
    throw new Error('A must be 3D vector, i.e. shape(3,)');
  }
  if (!isList(B) || B.length !== 3) {
    throw new Error('B must be 3D vector, i.e. shape(3,)');
  }
  crossP[0] = A[1] * B[2] - A[2] * B[1];
  crossP[1] = A[2] * B[0] - A[0] * B[2];
  crossP[2] = A[0] * B[1] - A[1] * B[0];
  return crossP;
}

function addMatrix(a, b) {
  const A = matrix(a);
  const B = matrix(b);
  assert.deepEqual(shapeMatrix(A), shapeMatrix(B), 'A and B must have same shape');
  return Array.from({ length: A.length }, (_, i) =>
    Array.from({ length: A[0].length }, (__, si) => A[i][si] + B[i][si])
  );
}

function matrixMultScal<TA extends ArrayLike<number | ArrayLike<number>> | (number | number[])[]>(
  v: TA, s: number) {
  return Array.from(v, (val, _i) => (isList(val) ? Array.from(val, (sval, _si) => sval * s) : val * s));
}

function matrixAddScal<TA extends (number | number[])[]>(
  v: TA, s: number): (number | number[])[] {
  let x = Array.from(v, (val, _i) => (isList(val) ? Array.from(val, (sval, _si) => sval + s) : val + s));
  return x;
}

function subtractMatrix(a, b) {
  const A = matrix(a);
  const negB = matrix(b);
  const B = matrixMultScal(negB, -1);
  return addMatrix(A, B);
}

function diagonaliseVector(a) {
  if (!isList(a)) throw new Error('a must be enumerable');
  const N = a.length;
  if (N === 0) throw new Error('a can not be empty');
  if (isList(a[0])) throw new Error('a must be 1D');
  return Array.from(a, (v, i) => Array.from({ length: N }, (_rv, j) => (j === i ? v : 0)));
}

function randnBm() {
  // https://stackoverflow.com/a/49434653
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randnBm(); // resample between 0 and 1
  return num;
}

function vectAvg(a) {
  const sum = a.reduce((accumVariable, curValue) => {
    return accumVariable + curValue;
  }, 0);
  return sum / a.length;
}

const svmPredict = (W, X, b) => {
  /*
      w shape(k, 1)
      X shape(k, n)
      b shape(1, 1)
      
      => shape(n,)
      */

  const ys = flatten(transposeMatrix(matrixAddScal(multMatrix(transposeMatrix(W), X), b)));

  return ys;
};

const svmConstrainPredictionForObsvd = (ys, labels) => {
  /*
      @ys shape(n, )
      @labels shape(n, )
      @returns => shape(n,)
      */

  const ys1 = Array.from({ length: ys.length }, (v, i) => ys[i] * labels[i]);
  return ys1;
};

const svmHingeLoss = (ys: (number | number[])[]) => {
  const hingeLoss = matrixMultScal(matrixAddScal(ys, -1), -1);
  return Array.from(hingeLoss, (v, _i) => Array.isArray(v) ? Math.max(...v, 0) : Math.max(v, 0));
};

const adjustHyperParameters = (wStart, bStart, djDwi, djDbi, alpha) => {
  const k = wStart.shape()[0];
  checkShapeParameter(wStart, [k, 1], 'wStart');
  checkShapeParameter(djDwi, [k, 1], 'djDwi');
  checkShapeParameter(djDbi, [0, 0], 'djDbi');

  const wOut = subtractMatrix(
    wStart, // (k x 1)
    matrixMultScal(djDwi, alpha) // (k x 1)
  ); // (k x 1)

  const bOut = bStart - djDbi * alpha;

  return { wOut, bOut };
};

const svmGradientDescent = (lambdaReg, alpha, wStart, bStart, X, observed, prediction) => {
  /*
      lambdaReg: float
      alpha: float
      wStart shape(k, 1)
      bStart: float
      X shape(k, n)
      observed shape(n, )
      prediction shape(n, )
      => shape(n,)
      */
  let w = wStart;
  let b = bStart;

  const wHist = [];
  const bHist = [];

  const N = observed.length;
  const djDw = Array.from({ length: N });
  const djDb = Array.from({ length: N });

  for (let i = 0; i < N; i += 1) {
    if (prediction[i] >= 1) {
      djDw[i] = matrixMultScal(w, 2 * lambdaReg);
      // djDw[i] = transposeMatrix(multMatrix(matrixMultScal(w, 2 * lambdaReg), [Array.from({ length: N }, (_v, _i) => 1)]));
      djDb[i] = 0;
    } else {
      djDw[i] = subtractMatrix(matrixMultScal(w, 2 * lambdaReg), matrixMultScal(transposeMatrix(X)[i], observed[i]));
      // djDw[i] = transposeMatrix(subtractMatrix(multMatrix(matrixMultScal(w, 2 * lambdaReg),[Array.from({length:N}, (_v,_i,_k) => 1)]), transposeMatrix(multMatrix(diagonaliseVector(observed),transposeMatrix(X)))));
      djDb[i] = -1 * observed[i];
    }
    const { wOut, bOut } = adjustHyperParameters(w, b, djDw[i], djDb[i], alpha);
    w = wOut;
    b = bOut;
    wHist.push(wOut);
    bHist.push(bOut);
  }
  return { djDw, djDb, wOut: w, bOut: b, wHist, bHist };
};

export const trainSvm = (dataRaw, nIter = 500) => {
  let { X1, X2 } = dataRaw;
  X1 = Object.values(X1);
  X2 = Object.values(X2);
  const yObserved = Object.values(dataRaw.class);
  const N = X1.length;
  const k = 2; // ||{X1, X2}||
  const X = transposeMatrix(Array.from({ length: N }, (v, i) => [X1[i], X2[i]]));
  const XDims = shapeMatrix(X);
  assert.deepEqual(XDims, [k, N]);

  // Initialise Hyperparameters randomly as will be trained
  let w = [[0.49671415], [-0.1382643]]; // Array.from({ length: 2 }, (_v, _i) => [randnBm()]);
  let b = 0.6476885381006925; // randnBm();

  const lambdaReg = 0.00001;
  const alpha = 0.01;

  const lossHistory = [];
  let hingeLoss;
  // train
  const ws = [];
  const bs = [];
  for (let i = 0; i < nIter; i += 1) {
    const Xiter = X;
    const yiter = yObserved;

    let yPred = svmPredict(w, Xiter, b);
    yPred = svmConstrainPredictionForObsvd(yPred, yiter);

    hingeLoss = svmHingeLoss(yPred);
    const { wOut, bOut, wHist, bHist } = svmGradientDescent(lambdaReg, alpha, w, b, Xiter, yiter, yPred);

    w = wOut;
    b = bOut;

    ws.push(...wHist);
    bs.push(bHist);
  }
  const hingeLossMean = vectAvg(hingeLoss);

  const wSqrdSum = Array.from(w, (v, _key) => v[0] ** 2).reduce((accumVariable, curValue) => {
    return accumVariable + curValue;
  }, 0);
  const regTerm = wSqrdSum + lambdaReg;

  lossHistory.push(hingeLossMean + regTerm);

  return { w, b, ws, bs };
};
