const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Handling GET requests to /products'
  });
});

router.post('/', (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  }

  res.status(201).json({
    message: 'Handling POST requests to /products',
    createdProduct: product
  });
});

router.get('/:productId', (req, res) => {
  const id = req.params.productId;

    res.status(200).json({
      message: 'You found a product!',
      id: id
    });
  });


router.patch('/:productId', (req, res) => {
  const id = req.params.productId;

    res.status(200).json({
      message: 'Updated product!',
      id: id
    });
  });

  router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    
      res.status(200).json({
        message: 'Deleted product!',
        id: id
      });
    });
    
    

  
  


module.exports = router;