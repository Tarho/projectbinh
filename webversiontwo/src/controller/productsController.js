// controllers/productsController.js
const db = require('../db');

// Get all products
exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM product', (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json(results);
    });
  };
  
// Get one product by name
exports.getProductByType = (req, res) => {
    const { type } = req.params; // Get the type from the request parameters
    console.log(type);
    db.query('SELECT * FROM product WHERE type = ?', [type], (err, results) => {
      if (err) {
        console.error('Error fetching product:', err);
        return res.status(500).json({ message: 'Error fetching product', error: err });
      }
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: 'Product type not found' });
      }
    });
  };

exports.getProductByName = (req,res) =>{
    const { name, type } = req.params; // Get the name from the requet parameters
    db.query('SELECT * FROM product WHERE type = ? AND name LIKE ?', [type,name], (err,results) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ message: 'Error fetching product', error: err });
          }
          if (results.length > 0) {
            console.log(results);
            res.status(200).json(results[0]);
          } else {
            res.status(404).json({ message: 'Product not found' });
          }
        });
      };
  
  // Create a new product
  exports.createProduct = (req, res) => {
    const { name, price, description, image_path } = req.body;
    db.query(
      'INSERT INTO products (name, price, description, image_path) VALUES (?, ?, ?, ?)',
      [name, price, description, image_path], // Pass image_path as a parameter to the query
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId, ...req.body });
    });
  };