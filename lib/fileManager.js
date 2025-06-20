// File management utilities
const fs = require('fs');
const path = require('path');
const { log } = require('./logger');

/**
 * Create directory if it doesn't exist
 * @param {string} dirPath - Directory path
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Create file with content
 * @param {string} filePath - File path
 * @param {string} content - File content
 * @returns {boolean} - True if created, false if already exists
 */
function createFile(filePath, content) {
  const dir = path.dirname(filePath);
  ensureDirectoryExists(dir);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

/**
 * Update app.js to include new route
 * @param {string} name - Resource name
 * @param {string} pluralized - Pluralized resource name
 */
function updateAppWithRoute(name, pluralized) {
  const appPath = path.join(process.cwd(), 'app.js');

  if (!fs.existsSync(appPath)) {
    return false;
  }

  const routeImport = `const ${name}Route = require('./routes/${name}Route');`;
  const routeUse = `app.use('/api/v1/${pluralized}', ${name}Route);`;

  let appContent = fs.readFileSync(appPath, 'utf-8');

  if (!appContent.includes(routeImport)) {
    const lines = appContent.split('\n');
    const routeCommentIndex = lines.findIndex((line) =>
      line.includes('// Add your routes below 👇')
    );

    if (routeCommentIndex !== -1) {
      // Add import at the top (after other requires)
      const lastRequireIndex = lines.findLastIndex(
        (line) => line.trim().startsWith('const') && line.includes('require')
      );
      if (lastRequireIndex !== -1) {
        lines.splice(lastRequireIndex + 1, 0, routeImport);
      }

      // Add route usage after the comment
      lines.splice(routeCommentIndex + 2, 0, routeUse);

      fs.writeFileSync(appPath, lines.join('\n'), 'utf-8');
      log(`✅ Route auto-imported in app.js`, 'green');
      return true;
    }
  } else {
    log(`⚠️  Route already exists in app.js`, 'yellow');
    return false;
  }
}

/**
 * Get file paths for resource
 * @param {string} name - Resource name
 * @returns {object} - Object with file paths
 */
function getFilePaths(name) {
  return {
    controller: `controllers/${name}Controller.js`,
    route: `routes/${name}Route.js`,
    model: `models/${name}Model.js`,
  };
}

module.exports = {
  ensureDirectoryExists,
  createFile,
  updateAppWithRoute,
  getFilePaths,
};
