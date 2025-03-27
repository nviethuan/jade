import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import authMiddleware from '../middlewares/auth.mjs';

const router = express.Router();

/* GET home page. */
router.get('/', authMiddleware, (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Vocs - Login' });
});

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;

  // Kiểm tra thông tin đăng nhập
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Vui lòng nhập đầy đủ thông tin đăng nhập',
    });
  }

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const accessToken = jwt.sign({ username }, Buffer.from(process.env.JWT__PRIVATE_KEY, 'base64url'), {
      expiresIn: '1d',
      algorithm: 'RS256',
    });

    const refreshToken = jwt.sign(
      { token: crypto.randomBytes(32).toString('hex') },
      Buffer.from(process.env.JWT__PRIVATE_KEY, 'base64url'),
      { expiresIn: '30d', algorithm: 'RS256' }
    );

    res.cookie(Buffer.from('access_token').toString('hex'), accessToken, {
      maxAge: 24 * 60 * 60 * 1000, // 1 ngày
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Đảm bảo cookie chỉ được gửi qua HTTPS
    });
    res.cookie(Buffer.from('refresh_token').toString('hex'), refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      user: {
        username: username,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
    });
  }
});

export default router;
