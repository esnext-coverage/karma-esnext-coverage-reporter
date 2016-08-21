/**
 * esnext-coverage reporter plugin for Karma.
 * @module karma-plugin
 */

const EsnextCoverageReporter = require('./esnext-coverage-reporter');

/**
 * Main entry point exposing the reporter plugin.
 * @type {Object}
 * @property {String} reporter:esnext-coverage - Karma-specific declaration.
 */
module.exports = {
  'reporter:esnext-coverage': ['type', EsnextCoverageReporter]
};
