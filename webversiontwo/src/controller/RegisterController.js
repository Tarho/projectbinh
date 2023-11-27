// controllers/signupController.js

const db = require('../db');

exports.RegisterAccount = (req, res) => {
    const { firstname, lastname, email, password} = req.body;

    // Validate input parameters here if needed

    // Check if username already exists
    db.query('SELECT * FROM accounts WHERE email = ?', [email], (err, rows) => {
      if (err) {
        // More detailed error handling could be implemented here
        console.error('Error checking username availability:', err);
        res.status(500).json({ message: 'Error registering the user.' });
        return;
      }

      // Check if username is already taken
      if (rows.length > 0) {
        const userExists = rows.some(u => u.email === email);
        if (userExists) {
          res.status(409).json({ message: 'This email is already in use.' });
          return;
        }
      }


        // Save the new user with the password
        db.query('INSERT INTO accounts (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [firstname, lastname,email,password], (err, result) => {
          if (err) {
            // Handle specific errors like duplicate entry here
            console.error('Error registering the user:', err);
            res.status(500).json({ message: 'Error registering the user.' });
            return;
          }
          res.status(201).json({ message: 'User successfully registered.', userId: result.insertId });
        });
      });
    };

