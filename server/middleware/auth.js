import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const auth = async (req, res, next) => {
  console.log(req.path);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const googleToken = token.length > 1000;
    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.user = {
        id: payload.sub,
        name: payload.name,
        photoURL: payload.picture,
      };
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { id, name, photoURL, role } = decodedToken;

      req.user = { id, name, photoURL, role };

      // Implementasi kontrol akses di handler functions
      if (req.user.role === 'member') {
        if (req.path === '/updateProfile' && req.method === 'PATCH') {
          next();
        } else {
          return res.status(403).json({ success: false, message: 'Access Denied' });
        }
      } else if (req.user.role === 'admin') {
        if (
          (req.path === '/updateProfile' && req.method === 'PATCH') ||
          (req.path === '/event' && (req.method === 'GET' || req.method === 'POST')) ||
          (req.path === '/document' && (req.method === 'GET' || req.method === 'POST'))
        ) {
          next();
        } else {
          return res.status(403).json({ success: false, message: 'Access Denied' });
        }
      } else {
        // Superadmin memiliki akses tanpa batasan
        next();
      }
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Something is wrong with your authorization!',
    });
  }
};

export default auth;
