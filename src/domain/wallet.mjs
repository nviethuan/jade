import WalletModel from '../infrastructure/primary/models/wallet.mjs';

export class Wallet {
  #model = WalletModel;
  #wallet = {};
  #wallets = [];

  constructor({ base, quote, symBase, symQuote, bought, sold, fee, isActive, position } = {}) {
    this.base = base || 0;
    this.quote = quote || 0;
    this.symBase = symBase;
    this.symQuote = symQuote;
    this.bought = bought || 999_999_999_999;
    this.sold = sold || 0;
    this.fee = fee || 0.001;
    this.isActive = isActive || false;
    this.position = position || 0;
  }

  build(data = {}) {
    this.base = data.base || this.base;
    this.quote = data.quote || this.quote;
    this.symBase = data.symBase || this.symBase;
    this.symQuote = data.symQuote || this.symQuote;
    this.bought = data.bought || this.bought;
    this.sold = data.sold || this.sold;
    this.fee = data.fee || this.fee;
    this.isActive = data.isActive || this.isActive;
    this.position = data.position || this.position;
  }

  async create(data = {}) {
    // Get the highest position value and increment by 1
    const highestPositionWallet = await this.#model.findOne().sort({ position: -1 });
    const newPosition = highestPositionWallet ? highestPositionWallet.position + 1 : 0;
    
    this.#wallet = await this.#model.create({
      base: data.base || this.base,
      quote: data.quote || this.quote,
      symBase: `${data.symBase || this.symBase}`.toUpperCase(),
      symQuote: `${data.symQuote || this.symQuote}`.toUpperCase(),
      bought: data.bought || this.bought,
      sold: data.sold || this.sold,
      fee: data.fee || this.fee,
      isActive: data.isActive || this.isActive,
      position: newPosition,
    });

    return this.#wallet;
  }

  async update(id, data) {
    this.#wallet = await this.#model.findByIdAndUpdate(
      id || this.#wallet._id,
      {
        base: data.base,
        quote: data.quote,
        symBase: data.symBase,
        symQuote: data.symQuote,
        bought: data.bought,
        sold: data.sold,
        fee: data.fee,
        isActive: data.isActive,
        position: data.position,
      },
      { new: true }
    );
    return this.#wallet;
  }

  async find(id) {
    this.#wallet = await this.#model.findById(id);
    return this.#wallet;
  }

  async findAll() {
    this.#wallets = await this.#model.find().sort({ position: 1 });
    return this.#wallets;
  }

  async paginate(conditions, page, limit) {
    const skip = (page - 1) * limit;
    const wallets = await this.#model.find(conditions).sort({ position: 1 }).skip(skip).limit(limit);
    return wallets;
  }

  async getTotalCount(conditions = {}) {
    return await this.#model.countDocuments(conditions);
  }

  async delete(id) {
    await this.#model.findByIdAndDelete(this.#wallet._id || id);
  }

  async updatePositions(walletPositions) {
    // walletPositions is an array of objects with { id, position }
    const updatePromises = walletPositions.map(({ id, position }) => 
      this.#model.findByIdAndUpdate(id, { position }, { new: true })
    );
    
    await Promise.all(updatePromises);
    return true;
  }
}
