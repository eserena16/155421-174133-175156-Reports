const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    autoIncrement:true,
    primaryKey: true,    
  },
  products: [{
    productId: {
      type: Number,      
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  }],
  supplierId: {
    type: Number,    
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  company: {
    type: Number,
    required: true
  },
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;