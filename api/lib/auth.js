import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'wcs-secure-dev-secret';

/**
 * Verifies the JWT token from the authorization header.
 * @param {import('express').Request} req
 * @returns {object|null} The decoded token payload or null if invalid.
 */
export const verifyToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    return null;
  }
};

export const getSecret = () => JWT_SECRET;
