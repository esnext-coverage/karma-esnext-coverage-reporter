/**
 * esnext-coverage reporter module.
 * @module esnext-coverage-reporter
 */

/* eslint-disable no-console */

/**
 * EsnextCoverageReporter.
 * @constructor
 * @param {Object} config - esnext-coverage config obtained from karma conf file.
 */
module.exports = function EsnextCoverageReporter(config) {

  const fs = require('fs');
  const path = require('path');
  const Promise = require('promise');
  const mkdirp = Promise.denodeify(require('mkdirp'));
  const {red, stripColor} = require('chalk');
  const requireFormatter = require('./require-formatter');
  const determineThresholds = require('./determine-thresholds');

  const writeFile = Promise.denodeify(fs.writeFile);

  /**
   * Asynchronous tasks (i.e. writing to filesystem).
   * @type {[Promise]}
   */
  const asyncTasks = [];

  /**
   * Reporter configuration.
   * @type {Object}
   * @property {String} dir - relative path of output directory
   * @property {Array} formatters - list of esnext-coverage formatters to use
   * @property {Object} thresholds - code coverage thresholds
   */
  const reporterConfig = config.esnextCoverageReporter || {};

  /**
   * Code coverage thresholds.
   * @type {Object}
   * @property {Object} global - Average across multiple files.
   * @property {Object} local - Local per-file coverage thresholds.
   */
  const thresholds = determineThresholds(reporterConfig.thresholds);

  /**
   * Coverage result formatters.
   * @type {[Object]}
   */
  const reporters = (reporterConfig.reporters || [])
    .map(formatterConfig => {
      formatterConfig.formatter = requireFormatter(formatterConfig.formatter);
      return formatterConfig;
    });

  /**
   * Browser complete event handler.
   * @param {Object} browser - Information about the browser.
   * @param {Object} result - Runner results.
   * @param {Object} result.coverage - esnext-coverage coverage object.
   * @returns {undefined} Nothing is returned.
   */
  this.onBrowserComplete = function (browser, {coverage}) {
    // In case of errors encountered prior to esnext-coverage execution
    // the coverage object will be `undefined` and there's nothing
    // we can do about it except aborting:
    if (!coverage) {
      console.error(red('\nesnext-coverage was unable to generate code coverage\n'));
      return;
    }

    reporters.forEach(formatterConfig => {
      const formattedText = formatterConfig.formatter(coverage, {
        environment: browser,
        thresholds
      });

      if (formatterConfig.console) {
        // Dump formatted text to console,
        // and surround with single line margins:
        console.log(`\n${formattedText}\n`);
      }

      if (formatterConfig.outFile) {
        const fullpath = config.browsers.length > 1 ?
          path.join(reporterConfig.dir, browser.name, formatterConfig.outFile) :
          path.join(reporterConfig.dir, formatterConfig.outFile);

        asyncTasks.push(mkdirp(path.dirname(fullpath)).then(() => {
          return writeFile(fullpath, stripColor(formattedText));
        }));
      }
    });
  };

  /**
   * Karma exit event handler.
   * @param {Function} done - Karma completion callback.
   * @returns {undefined} Nothing is returned.
   */
  this.onExit = function (done) {
    // Karma runner will complete before we finish writing
    // report files to the filesystem, so let's wait for
    // all those asynchronous tasks to finish before
    // declaring that we're done:
    Promise
      .all(asyncTasks)
      .finally(() => done());
  };
};

/**
 * Karma-specific dependency injection.
 * @type {[String]}
 */
module.exports.$inject = ['config'];
