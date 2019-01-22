const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Order = new Schema({  
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  }
});



module.exports = mongoose.model('Order', Order);

