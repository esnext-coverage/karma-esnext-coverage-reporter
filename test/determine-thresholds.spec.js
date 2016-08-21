import test from 'tape';
import determineThresholds from '../src/determine-thresholds';

test('should not throw when no arguments are provided', t => {
  t.plan(1);
  t.doesNotThrow(
    () => determineThresholds(),
    'does not throw when no arguments are provided'
  );
});

test('should not throw when an empty object is provided', t => {
  t.plan(1);
  t.doesNotThrow(
    () => determineThresholds({}),
    'does not throw when an empty object is provided'
  );
});

test('should use defaults when user has not specified their own thresholds', t => {
  t.plan(1);
  const thresholds = determineThresholds({});
  t.deepEqual(thresholds, {
    global: {
      statement: 0,
      branch: 0,
      function: 0,
      line: 0
    },
    local: {
      statement: 0,
      branch: 0,
      function: 0,
      line: 0
    }
  });
});

test('should extend with user-specified thresholds when specified', t => {
  t.plan(1);
  const thresholds = determineThresholds({
    global: {statement: 42},
    local: {line: 12}
  });
  t.deepEqual(thresholds, {
    global: {
      statement: 42,
      branch: 0,
      function: 0,
      line: 0
    },
    local: {
      statement: 0,
      branch: 0,
      function: 0,
      line: 12
    }
  });
});
