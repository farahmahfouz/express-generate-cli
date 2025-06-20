#!/usr/bin/env node

const path = require('path');
const { log } = require('../lib/logger');
const { validateName, capitalize, pluralize, showHelp } = require('../lib/helper');
const { createFile, updateAppWithRoute, getFilePaths } = require('../lib/fileManager');
const { 
  generateController, 
  generateRoute, 
  generateModel, 
  generateBaseApp 
} = require('../templates/index');

// Get command line arguments
const name = process.argv[2];

// Handle help and version
if (!name || name === '--help' || name === '-h') {
  showHelp();
  process.exit(0);
}

if (name === '--version' || name === '-v') {
  log('v1.0.0', 'green');
  process.exit(0);
}

// Validate name
if (!validateName(name)) {
  process.exit(1);
}

// Generate variations of the name
const capitalized = capitalize(name);
const pluralized = pluralize(name);

// Get file paths
const filePaths = getFilePaths(name);

// Generate templates
const templates = {
  controller: generateController(name, capitalized, pluralized),
  route: generateRoute(name, capitalized),
  model: generateModel(name, capitalized)
};

// Create files and track results
let filesCreated = 0;
let filesExisted = 0;

// Create MVC files
Object.entries(filePaths).forEach(([type, relativePath]) => {
  const filePath = path.join(process.cwd(), relativePath);
  
  if (createFile(filePath, templates[type])) {
    log(`✅ Created: ${relativePath}`, 'green');
    filesCreated++;
  } else {
    log(`⚠️  Already exists: ${relativePath}`, 'yellow');
    filesExisted++;
  }
});

// Create or update app.js
const appPath = path.join(process.cwd(), 'app.js');
const fs = require('fs');

if (!fs.existsSync(appPath)) {
  if (createFile(appPath, generateBaseApp())) {
    log('✅ Created: app.js', 'green');
    filesCreated++;
  }
}

// Auto-import route in app.js
updateAppWithRoute(name, pluralized);

// Show summary
log('', 'reset');
log('📊 Generation Summary:', 'blue');
log(`   Files created: ${filesCreated}`, 'green');
if (filesExisted > 0) {
  log(`   Files skipped: ${filesExisted}`, 'yellow');
}
log('', 'reset');
log('🎉 MVC structure generated successfully!', 'green');
log(`📁 Resource: ${capitalized}`, 'blue');
log(`🌐 API Endpoint: /api/v1/${pluralized}`, 'blue');
log('', 'reset');
log('Next steps:', 'yellow');
log('1. Install dependencies: npm install express');
log('2. Start server: node app.js');
log(`3. Test endpoint: GET http://localhost:3000/api/v1/${pluralized}`);