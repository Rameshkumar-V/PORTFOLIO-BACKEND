const jwt = require('jsonwebtoken');

const users = [
  {
    username: 'user1',
    password: 'password1'
  }
];

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
  
    if (token) {
      jwt.verify(token.split(' ')[1], 'your_secret_key', (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
          
        } else {
            
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(401).json({ message: 'Token is required' });
    }
  };
  

// Generate JWT token for user
const generateToken = (username) => {
  return jwt.sign({ username: username }, 'your_secret_key');
};

module.exports = {
  authenticateUser,
  generateToken,
  users
};
