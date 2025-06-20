// Template generator for MVC components

/**
 * Generate controller template
 * @param {string} name - Resource name
 * @param {string} capitalized - Capitalized resource name
 * @param {string} pluralized - Pluralized resource name
 * @returns {string} - Controller template
 */
function generateController(name, capitalized, pluralized) {
  return `// ${capitalized} Controller
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
`;
}

/**
 * Generate route template
 * @param {string} name - Resource name
 * @param {string} capitalized - Capitalized resource name
 * @returns {string} - Route template
 */
function generateRoute(name, capitalized) {
  return `// ${capitalized} Routes
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
`;
}

/**
 * Generate model template
 * @param {string} name - Resource name
 * @param {string} capitalized - Capitalized resource name
 * @returns {string} - Model template
 */
function generateModel(name, capitalized) {
  return `// ${capitalized} Model

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
`;
}

/**
 * Generate base app.js template
 * @returns {string} - App template
 */
function generateBaseApp() {
  return `const express = require('express');
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
}

module.exports = {
  generateController,
  generateRoute,
  generateModel,
  generateBaseApp
};