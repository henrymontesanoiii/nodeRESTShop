const express = require('express');
const router = express.Router();
const Product = require('../models/product.js')
const mongoose = require('mongoose');


router.get('/', (req, res) => {
  Product.find()
  .select('name price _id')
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            url: {
              request: {
                type: 'GET',
                description: "Get Specific Product Information",
                url: '/products/'+doc._id
              }
            }
          }
        })
      }
      if (docs.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(200).json({
          message: 'No entries found'
        })
      }


    })

    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post('/', (req, res) => {

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      const createdProduct = {
        id: result._id,
      name: result.name,
      price: result.price,
      url: {
        request: {
          type: 'GET',
          url: '/products/'+result._id
        }
      }

      
    }
      res.status(201).json({
        message: 'Created Product',
        product: createdProduct
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



router.get('/:productId', (req, res) => {
  const id = req.params.productId;
  Product.findById(id)
  .select('name price _id')
    .then(doc => {
      if (doc) {
        res.status(200).json({
          name: doc.name,
          price: doc.price,
          _id: doc._id,
          url: {
            request: {
              type: 'GET',
              description: 'Get All Products',
              url: '/products/'
            }
          }
        });
        
        
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' })
      }
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});



router.patch('/:productId', (req, res) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({_id: id},
    {
      $set: 
        updateOps
      
    }
  )
    .then(result => {
      
      res.status(200).json({
        message: 'Product Updated',
        request: {
          type: 'GET',
          description: 'Get Updated Product Information',
          url: '/products/'+id
        }
      })
    })
    .catch(
      err => {
        console.log(err);
        res.status(500).json({ error: err });
      }
    )

});

router.delete('/:productId', (req, res) => {
  const id = req.params.productId;
  Product.remove({
    _id: id
  })
    .then(result => {
      res.status(200).json({
        message: 'Product Deleted',
        request: {
          type: 'POST',
          description: 'Create new Product',
          url: '/products/',
          body: {name: 'String', price: 'Number'}
        }
      })
    })
    .catch(
      err => {
        console.log(err);
        res.status(500).json({ error: err });
      }
    )

});







module.exports = router;