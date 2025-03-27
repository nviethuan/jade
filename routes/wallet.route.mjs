import express from 'express';
import { Wallet } from '../src/domain/wallet.mjs';
import { Types } from 'mongoose';
import authMiddleware from '../middlewares/auth.mjs';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const wallet = new Wallet();

  const wallets = await wallet.paginate({}, req.query.page, req.query.limit);
  res.render('wallet', { wallets });
});

router.get('/:id', authMiddleware, async (req, res) => {
  const wallet = new Wallet();
  const walletData = await wallet.find({ _id: new Types.ObjectId(req.params.id) });
  res.json(walletData);
});

router.post('/', authMiddleware, async (req, res) => {
  const wallet = new Wallet();
  await wallet.create(req.body);
  return res.status(200).json({ message: 'Wallet created successfully' });
});

router.put('/:id', authMiddleware, async (req, res) => {
  const wallet = new Wallet();
  await wallet.update(req.params.id, req.body);
  return res.status(200).json({ message: 'Wallet updated successfully' });
});

router.patch('/:id', authMiddleware, async (req, res) => {
  const wallet = new Wallet();
  await wallet.update(req.params.id, req.body);
  return res.status(200).json({ message: 'Wallet updated successfully' });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const wallet = new Wallet();
  await wallet.delete(req.params.id);
  return res.status(200).json({ message: 'Wallet deleted successfully' });
});

export default router;
