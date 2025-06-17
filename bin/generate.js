#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Colors for better output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Help message
function showHelp() {
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

// Validate resource name
function validateName(name) {
  if (!name) {
    log('❌ Please provide a resource name', 'red');
    showHelp();
    return false;
  }
  
  if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(name)) {
    log('❌ Resource name must start with a letter and contain only letters and numbers', 'red');
    return false;
  }
  
  return true;
}

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

const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
const pluralized = name.endsWith('s') ? name : name + 's';

const folders = {
  controllers: `controllers/${name}Controller.js`,
  routes: `routes/${name}Route.js`,
  models: `models/${name}Model.js`,
};

const templates = {
  controllers: `// ${capitalized} Controller
const ${capitalized}Model = require('../models/${name}Model');

/**
 * Get all ${pluralized}
 * @route GET /api/v1/${pluralized}
 */
exports.getAll${capitalized}s = async (req, res) => {
  try {
    // TODO: Implement get all ${pluralized} logic
    res.status(200).json({
      success: true,
      message: 'Get all ${pluralized}',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * Get single ${name}
 * @route GET /api/v1/${pluralized}/:id
 */
exports.get${capitalized} = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Implement get single ${name} logic
    res.status(200).json({
      success: true,
      message: \`Get ${name} with id: \${id}\`,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * Create new ${name}
 * @route POST /api/v1/${pluralized}
 */
exports.create${capitalized} = async (req, res) => {
  try {
    const data = req.body;
    // TODO: Implement create ${name} logic
    res.status(201).json({
      success: true,
      message: '${capitalized} created successfully',
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * Update ${name}
 * @route PATCH /api/v1/${pluralized}/:id
 */
exports.update${capitalized} = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // TODO: Implement update ${name} logic
    res.status(200).json({
      success: true,
      message: \`${capitalized} updated successfully\`,
      data: { id, ...data }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * Delete ${name}
 * @route DELETE /api/v1/${pluralized}/:id
 */
exports.delete${capitalized} = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Implement delete ${name} logic
    res.status(200).json({
      success: true,
      message: \`${capitalized} deleted successfully\`,
      data: { id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
`,

  routes: `// ${capitalized} Routes
const express = require('express');
const router = express.Router();

// Import controllers
const {
  getAll${capitalized}s,
  get${capitalized},
  create${capitalized},
  update${capitalized},
  delete${capitalized},
} = require('../controllers/${name}Controller');

// Routes
router.get('/', getAll${capitalized}s);
router.get('/:id', get${capitalized});
router.post('/', create${capitalized});
router.patch('/:id', update${capitalized});
router.delete('/:id', delete${capitalized});

module.exports = router;
`,

  models: `// ${capitalized} Model

/**
 * ${capitalized} Model Structure
 * Define your ${name} schema/structure here
 */
const ${capitalized}Model = {
  // Example fields - modify according to your needs
  id: {
    type: 'string',
    required: true,
  },
  name: {
    type: 'string',
    required: true,
  },
  createdAt: {
    type: 'date',
    default: Date.now,
  },
  updatedAt: {
    type: 'date',
    default: Date.now,
  }
};

// TODO: Implement your database logic here
// This could be MongoDB with Mongoose, MySQL with Sequelize, etc.

module.exports = ${capitalized}Model;
`,
};

// Create files and folders
let filesCreated = 0;
let filesExisted = 0;

Object.entries(folders).forEach(([key, relativePath]) => {
  const filePath = path.join(process.cwd(), relativePath);
  const dir = path.dirname(filePath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Create file if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, templates[key], 'utf-8');
    log(`✅ Created: ${relativePath}`, 'green');
    filesCreated++;
  } else {
    log(`⚠️  Already exists: ${relativePath}`, 'yellow');
    filesExisted++;
  }
});

// Create or update app.js
const appPath = path.join(process.cwd(), 'app.js');

if (!fs.existsSync(appPath)) {
  const baseAppContent = `const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Routes will be added here automatically
// Add your routes below 👇


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
  console.log(\`📍 Health check: http://localhost:\${PORT}/\`);
});

module.exports = app;
`;
  
  fs.writeFileSync(appPath, baseAppContent, 'utf-8');
  log('✅ Created: app.js', 'green');
  filesCreated++;
}

// Auto-import route in app.js
const routeImport = `const ${name}Route = require('./routes/${name}Route');`;
const routeUse = `app.use('/api/v1/${pluralized}', ${name}Route);`;

if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf-8');
  
  if (!appContent.includes(routeImport)) {
    // Find the right place to insert the import and route
    const lines = appContent.split('\n');
    const routeCommentIndex = lines.findIndex(line => 
      line.includes('// Add your routes below 👇')
    );
    
    if (routeCommentIndex !== -1) {
      // Add import at the top (after other requires)
      const lastRequireIndex = lines.findLastIndex(line => 
        line.trim().startsWith('const') && line.includes('require')
      );
      if (lastRequireIndex !== -1) {
        lines.splice(lastRequireIndex + 1, 0, routeImport);
      }
      
      // Add route usage after the comment
      lines.splice(routeCommentIndex + 2, 0, routeUse);
      
      fs.writeFileSync(appPath, lines.join('\n'), 'utf-8');
      log(`✅ Route auto-imported in app.js`, 'green');
    }
  } else {
    log(`⚠️  Route already exists in app.js`, 'yellow');
  }
}

// Summary
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