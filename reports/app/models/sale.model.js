const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    autoIncrement:true,    
    primaryKey: true, 
  },
  company: {
    type: Number,
    required: true
  },
  saleDate: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number,
    required: true
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
  }]
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;