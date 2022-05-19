import { shapeArray, trainSvm } from '../../../js_src/ai/svm/svm_binary_classifier';

const fs = require('fs');

const loadTestSVMData = () => {
  const fileText = fs.readFileSync(
    '/Users/joeyd/Documents/JoeyDCareer/GitHub/google_scripting/gmail_ai_labeller/test/data/data.json'
  );
  //   const fileText = fs.readFileSync('../../data/data.json');
  const dataRaw = JSON.parse(fileText);
  return dataRaw;
};

describe('svm converges', () => {
  it('SVM should converge to ...', () => {
    const dataRaw = loadTestSVMData();
    const { w, b } = trainSvm(dataRaw, 500);
    const wExp = [[0.5728172], [0.69764823]];
    const bExp = -2.7220481656275637;

    expect(shapeArray(w)).toMatchObject([2, 1]);
    expect(w[0][0]).toBeCloseTo(wExp[0][0]);
    expect(w[1][0]).toBeCloseTo(wExp[1][0]);
    expect(b).toBeCloseTo(bExp);
  });
});
