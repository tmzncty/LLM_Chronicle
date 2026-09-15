// Exercises the actual teaching snippet, not a second copy of its algorithm.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const article = fs.readFileSync(path.join(__dirname, '../纪传/列传/FlashAttention.md'), 'utf8');
const examples = [...article.matchAll(/<!-- online-softmax-example -->\r?\n```javascript\r?\n([\s\S]*?)\r?\n```/g)];
assert.equal(examples.length, 1, 'Expected exactly one marked teaching snippet');
const source = examples[0][1];
function load(code = source) {
  const context = vm.createContext({ console: { log() {} } });
  new vm.Script(code).runInContext(context, { timeout: 1000 });
  assert.equal(typeof context.onlineAttention, 'function');
  return context.onlineAttention;
}
const online = load();

function close(actual, expected) {
  assert.ok(Number.isFinite(actual));
  assert.ok(Math.abs(actual - expected) <= 1e-12 * Math.max(1, Math.abs(expected)),
    `${actual} differs from ${expected}`);
}
// A separately computed, full-row stable softmax reference.
function reference(pairs) {
  const maximum = Math.max(...pairs.map(([score]) => score));
  const weights = pairs.map(([score]) => Math.exp(score - maximum));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  return pairs.reduce((sum, [, value], i) => sum + weights[i] / total * value, 0);
}
function* partitions(pairs) {
  for (let mask = 0; mask < 2 ** (pairs.length - 1); mask++) {
    const blocks = [[pairs[0]]];
    for (let i = 1; i < pairs.length; i++) {
      if (mask & (1 << (i - 1))) blocks.push([]);
      blocks.at(-1).push(pairs[i]);
    }
    yield blocks;
  }
}

test('paper exercise: 8/3 for every contiguous partition; unscaled answer is 12/5', () => {
  const pairs = [[Math.log(2), 1], [0, 2], [Math.log(3), 4]];
  for (const blocks of partitions(pairs)) close(online(blocks), 8 / 3);
  close((2 + 4) / (3 / 2 + 1), 12 / 5);
  assert.ok(Math.abs(12 / 5 - 8 / 3) > 0.1);
});

test('rising, falling and tied maxima; signed scalar values; single position', () => {
  const cases = [
    [[0, 7]],
    [[-4, 3], [-1, -2], [0, 1], [5, 4]],
    [[5, 4], [0, 1], [-1, -2], [-4, 3]],
    [[2, -1], [2, 4], [2, 0], [2, 5]],
    [[-9, 3], [4, -6], [1, 2], [8, 7], [-3, -2]],
  ];
  for (const pairs of cases) {
    for (const blocks of partitions(pairs)) close(online(blocks), reference(pairs));
  }
});

test('stable for large positive/negative logits and a common score shift', () => {
  const pairs = [[-3, -2], [2, 5], [0, 1], [4, -1]];
  for (const shift of [-1000, 0, 1000]) {
    const shifted = pairs.map(([score, value]) => [score + shift, value]);
    for (const blocks of partitions(shifted)) close(online(blocks), reference(pairs));
  }
  close(online([[[1000, 7]], [[-1000, -5]]]), 7);
  close(online([[[-1000, -5]], [[1000, 7]]]), 7);
});

test('the exercise detects missing denominator or numerator rescaling', () => {
  const blocks = [[[Math.log(2), 1], [0, 2]], [[Math.log(3), 4]]];
  for (const statement of ['l *= rescale;', 'a *= rescale;']) {
    assert.ok(source.includes(statement), 'Mutation target must exist');
    const wrong = load(source.replace(statement, ''));
    assert.throws(() => close(wrong(blocks), 8 / 3), assert.AssertionError);
  }
});
