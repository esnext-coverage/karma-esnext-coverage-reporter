# karma-esnext-coverage-reporter

[![NPM version](http://img.shields.io/npm/v/karma-esnext-coverage-reporter.svg)](https://www.npmjs.org/package/karma-esnext-coverage-reporter)

Unit test coverage reporter in [Karma](https://github.com/karma-runner/karma) using [esnext-coverage](https://github.com/esnext-coverage/babel-plugin-transform-esnext-coverage) for ES6+.

## Installation

```bash
npm install karma-esnext-coverage-reporter --save-dev
```

In addition to karma-esnext-coverage-reporter you will need [babel-plugin-transform-esnext-coverage](https://github.com/esnext-coverage/babel-plugin-transform-esnext-coverage), a test framework like [karma-mocha](https://github.com/karma-runner/karma-mocha), and some esnext-coverage result formatters, like [esnext-coverage-format-text](https://github.com/esnext-coverage/esnext-coverage-format-text).

## Usage

In your [karma configuration file](https://karma-runner.github.io/1.0/config/configuration-file.html) declare the esnext-coverage reporter.

```js
reporters: ['esnext-coverage']
```

Then specify the esnext-coverage reporter options. These options resemble the options of the [karma-coverage](https://github.com/karma-runner/karma-coverage) plugin.

```js
esnextCoverageReporter: {
  // Optional base directory of generated files:
  dir: 'reports/coverage',
  // List of formatters, where "formatter" indicates the
  // name of the formatter you want to use, for example "text"
  // will attempt to require "esnext-coverage-format-text"
  // which must be installed prior to running Karma:
  reporters: [
    {
      formatter: 'text', // indicates which formatter to use
      outFile: 'coverage.txt', // will write output to a file
      console: true // will write output to console
    }
  ],
  // Your code coverage thresholds:
  thresholds: {
    // Overall code coverage thresholds:
    global: {
      statement: 95,
      branch: 95,
      function: 95,
      line: 95
    },
    // Local (per-file) coverage thresholds:
    local: {
      statement: 50,
      branch: 50,
      function: 50,
      line: 50
    }
  }
}
```

### Usage with [karma-browserify](https://github.com/nikku/karma-browserify)

Follow the installation steps provided on [karma-browserify usage](https://github.com/nikku/karma-browserify#usage) page, then add a [babelify](https://github.com/babel/babelify) transform with the following configuration. Change presets and plugins to match your needs, but try to keep the transform-esnext-coverage plugin the first in the list of babel transforms.

```js
browserify: {
  transform: [
    ['babelify', {
      presets: ['es2015'],
      plugins: [
        ['transform-esnext-coverage', {only: '**/*.js'}]
      ]
    }]
  ]
},
```

### Usage with [.babelrc](https://babeljs.io/docs/usage/babelrc/)

Configure your `.babelrc` file with [env options](https://babeljs.io/docs/usage/babelrc/#env-option)

```json
{
  "env": {
    "test": {
      "plugins": [
        ["transform-esnext-coverage", {"only": "src/**/*.js"}]
      ]
    }
  }
}
```

Then set a `BABEL_ENV` option prior to running your tests.

```bash
BABEL_ENV=test YOUR_TEST_COMMAND_HERE
```

## License

[MIT License](http://opensource.org/licenses/MIT)
