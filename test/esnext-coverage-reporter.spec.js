import test from 'tape';
import {stub} from 'sinon';
import Reporter from '../src/esnext-coverage-reporter';

test('should write an error to stderr if esnext-coverage failed to generate coverage data', t => {
  const stderrWriteStub = stub(process.stderr, 'write');

  t.plan(1);
  const reporter = new Reporter({config: {}});
  reporter.onBrowserComplete({}, {});
  process.stderr.write.restore();

  t.ok(stderrWriteStub.calledWithMatch('esnext-coverage was unable to generate code coverage'));
});
