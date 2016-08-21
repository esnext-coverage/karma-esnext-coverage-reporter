/**
 * Formatter function acquisition.
 * @module require-formatter
 */

/**
 * Requires an npm-installed formatter lib.
 * @param {String} formatterName - "json", "text", etc.
 * @returns {Function} Formatter function.
 */
module.exports = function requireFormatter(formatterName) {
  // Assuming that the formatter has been previously installed:
  const formatter = require(`esnext-coverage-format-${formatterName}`);
  // Interop require with Babel 6 default exports:
  if (formatter.__esModule && formatter.default) { // eslint-disable-line no-underscore-dangle
    return formatter.default;
  }
  return formatter;
};
