// Utility functions for the MVC generator

/**
 * Validate resource name
 * @param {string} name - Resource name to validate
 * @returns {boolean} - True if valid, false otherwise
 */

// Validate resource name
function validateName(name) {
  const { log } = require('./logger');
  if (!name) {
    log('❌ Please provide a resource name', 'red');
    showHelp();
    return false;
  }

  if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(name)) {
    log(
      '❌ Resource name must start with a letter and contain only letters and numbers',
      'red'
    );
    return false;
  }

  return true;
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


function pluralize(str) {
  return str.endsWith('s') ? str : str + 's';
}

/**
 * Show help message
 */
function showHelp() {
  const { log } = require('./logger');

  log('🚀 Node.js MVC Generator', 'blue');
  log('');
  log('Usage: generate <resource-name>', 'green');
  log('');
  log('Examples:', 'yellow');
  log('  generate user       # Creates user controller, route, and model');
  log('  generate product    # Creates product controller, route, and model');
  log('');
  log('Options:', 'yellow');
  log('  --help, -h         Show this help message');
  log('  --version, -v      Show version');
}

module.exports = {
  validateName,
  capitalize,
  pluralize,
  showHelp,
};
