import express from 'express';
import { Wallet } from '../src/domain/wallet.mjs';
import { Types } from 'mongoose';
import authMiddleware from '../middlewares/auth.mjs';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const wallet = new Wallet();

  // Set default values for pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;
  
  // Get sorting parameters
  const sortField = req.query.sortField || 'position';
  const sortDirection = req.query.sortDirection || 'asc';
  
  const wallets = await wallet.paginate({}, page, limit, sortField, sortDirection);
  const totalCount = await wallet.getTotalCount();
  
  res.render('wallet', { 
    wallets,
    hasMore: page * limit < totalCount,
    totalCount,
    sortField,
    sortDirection
  });
});

// New endpoint to fetch more wallets for infinite scrolling
router.get('/api/more', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    
    // Get sorting parameters
    const sortField = req.query.sortField || 'position';
    const sortDirection = req.query.sortDirection || 'asc';
    
    const wallet = new Wallet();
    const wallets = await wallet.paginate({}, page, limit, sortField, sortDirection);
    
    // Get total count for pagination info
    const totalCount = await wallet.getTotalCount();
    
    res.json({
      wallets,
      hasMore: page * limit < totalCount,
      totalCount
    });
  } catch (error) {
    console.error('Error fetching more wallets:', error);
    res.status(500).json({ error: 'Failed to fetch more wallets' });
  }
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

// New endpoint to update wallet positions
router.post('/reorder', authMiddleware, async (req, res) => {
  try {
    const { walletPositions } = req.body;
    
    if (!walletPositions || !Array.isArray(walletPositions)) {
      return res.status(400).json({ error: 'Invalid wallet positions data' });
    }
    
    const wallet = new Wallet();
    await wallet.updatePositions(walletPositions);
    
    return res.status(200).json({ message: 'Wallet positions updated successfully' });
  } catch (error) {
    console.error('Error updating wallet positions:', error);
    return res.status(500).json({ error: 'Failed to update wallet positions' });
  }
});

export default router;
