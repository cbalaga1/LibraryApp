// This file will contain a utility function to generate JWT tokens.
// Member 2 creates the empty function.
// Member 4 (Authentication Developer) will complete this.

const jwt = require('jsonwebtoken'); 

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = generateToken;