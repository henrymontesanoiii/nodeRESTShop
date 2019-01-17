const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Fetching Order'
  });
});

router.post('/', (req, res) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }

  res.status(201).json({
    message: 'Creating order',
    order: order
  });
});

router.get('/:orderId', (req, res) => {
  const id = req.params.orderId;

    res.status(200).json({
      message: 'You found an order!',
      id: id
    });
  });


  router.delete('/:orderId', (req, res) => {
    const id = req.params.orderId;
    
      res.status(200).json({
        message: 'Deleted order!',
        id: id
      });
    });
    
    

  
  


module.exports = router;