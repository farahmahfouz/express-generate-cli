# Express Generate CLI

🚀 A powerful CLI tool to generate MVC (Model-View-Controller) structure for Node.js applications with Express.js.

## Installation

### Global Installation (Recommended)
```bash
npm install -g express-gen-api
```

### Local Installation
```bash
npm install express-gen-api
npx generate <resource-name> || npx g <resource-name>
```

## Usage

### Basic Usage
```bash
generate user
generate product
generate order
```

### Help
```bash
generate --help
generate -h
```

### Version
```bash
generate --version
generate -v
```

## What it generates

When you run `generate user`, it creates:

```
project/
├── controllers/
│   └── userController.js
├── routes/
│   └── userRoute.js
├── models/
│   └── userModel.js
└── app.js (if doesn't exist)
```

### Generated API Endpoints

The tool automatically creates RESTful API endpoints:

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get single user
- `POST /api/v1/users` - Create new user
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## Example Output

```bash
$ npx generate user

✅ Created: controllers/userController.js
✅ Created: routes/userRoute.js  
✅ Created: models/userModel.js
✅ Created: app.js
✅ Route auto-imported in app.js

📊 Generation Summary:
   Files created: 4

🎉 MVC structure generated successfully!
📁 Resource: User
🌐 API Endpoint: /api/v1/users

Next steps:
1. Install dependencies: npm install express
2. Start server: node app.js
3. Test endpoint: GET http://localhost:3000/api/v1/users
```

## Generated File Structure

### Controller Example
```javascript
// User Controller
const UserModel = require('../models/userModel');

/**
 * Get all users
 * @route GET /api/v1/users
 */
exports.getAllUsers = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Get all users',
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
```

### Route Example
```javascript
// User Routes
const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
```

## Requirements

- Node.js >= 12.0.0
- npm or yarn

## Development

### Clone the repository
```bash
git clone https://github.com/farahmahfouz/express-generate-cli.git
cd express-generate-cli
```

### Link for local development
```bash
npm link
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Farah Mahfouz**
- GitHub: [@farahmahfouz](https://github.com/farahmahfouz)
- Email: farahmahfouz11@gmail.com

## Support

If you find this tool helpful, please consider giving it a ⭐ on GitHub!

For issues and feature requests, please use the [GitHub Issues](https://github.com/farahmahfouz/express-generate-cli/issues) page.