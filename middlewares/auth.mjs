import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export default (req, res, next) => {
  const accessTokenKey = Buffer.from('access_token').toString('hex');
  const refreshTokenKey = Buffer.from('refresh_token').toString('hex');

  const accessToken = req.cookies[accessTokenKey];
  const refreshToken = req.cookies[refreshTokenKey];

  if (!accessToken && !refreshToken) {
    res.clearCookie(accessTokenKey);
    res.clearCookie(refreshTokenKey);

    return res.redirect('/login');
  }

  if (!accessToken && refreshToken) {
    const decoded = jwt.verify(refreshToken, Buffer.from(process.env.JWT__PRIVATE_KEY, 'base64url'));

    if (!decoded) {
      res.clearCookie(refreshTokenKey);
      res.clearCookie(accessTokenKey);
      return res.redirect('/login');
    }

    const accessToken = jwt.sign(
      { username: decoded.username },
      Buffer.from(process.env.JWT__PRIVATE_KEY, 'base64url'),
      {
        expiresIn: '1d',
        algorithm: 'RS256',
      }
    );
    const newRefreshToken = jwt.sign(
      { token: crypto.randomBytes(32).toString('hex') },
      Buffer.from(process.env.JWT__PRIVATE_KEY, 'base64url'),
      { expiresIn: '30d', algorithm: 'RS256' }
    );

    res.cookie(accessTokenKey, accessToken, {
      maxAge: 24 * 60 * 60 * 1000, // 1 ngày
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.cookie(refreshTokenKey, newRefreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    req.user = decoded;
    return next();
  }

  const reDecied = jwt.verify(accessToken, Buffer.from(process.env.JWT__PRIVATE_KEY, 'base64url'));

  if (!reDecied) {
    const re_rf = jwt.verify(refreshToken, Buffer.from(process.env.JWT__PRIVATE_KEY, 'base64url'));

    if (!re_rf) {
      res.clearCookie(refreshTokenKey);
      res.clearCookie(accessTokenKey);
      return res.redirect('/login');
    }

    const accessToken = jwt.sign(
      { username: decoded.username },
      Buffer.from(process.env.JWT__PRIVATE_KEY, 'base64url'),
      {
        expiresIn: '1d',
        algorithm: 'RS256',
      }
    );
    const refreshToken = jwt.sign(
      { token: crypto.randomBytes(32).toString('hex') },
      Buffer.from(process.env.JWT__PRIVATE_KEY, 'base64url'),
      { expiresIn: '30d', algorithm: 'RS256' }
    );

    res.cookie(Buffer.from('access_token').toString('hex'), accessToken, {
      maxAge: 24 * 60 * 60 * 1000, // 1 ngày
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.cookie(Buffer.from('refresh_token').toString('hex'), refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    req.user = decoded;
    return next();
  }

  req.user = reDecied;
  return next();
};
