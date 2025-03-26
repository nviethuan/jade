import express from 'express';
const router = express.Router();
import { Wallet } from '../src/domain/wallet.mjs';
import { Types } from 'mongoose';

router.get('/', async (req, res) => {
  const wallet = new Wallet();

  const wallets = await wallet.paginate({}, req.query.page, req.query.limit);
  res.render('wallet', { wallets });
});

router.get('/:id', async (req, res) => {
  const wallet = new Wallet();
  const walletData = await wallet.find({ _id: new Types.ObjectId(req.params.id) });
  res.json(walletData);
});

router.post('/', async (req, res) => {
  const wallet = new Wallet();
  await wallet.create(req.body);
  res.redirect('/wallets');
});

router.put('/:id', async (req, res) => {
  const wallet = new Wallet();
  await wallet.update(req.params.id, req.body);
  res.redirect('/wallets');
});

router.patch('/:id', async (req, res) => {
  const wallet = new Wallet();
  await wallet.update(req.params.id, req.body);
  res.status(200).json({ message: 'Wallet updated successfully' });
});

router.delete('/:id', async (req, res) => {
  const wallet = new Wallet();
  await wallet.delete(req.params.id);
  res.status(200).json({ message: 'Wallet deleted successfully' });
});

export default router;
