const db = require('../db');

exports.LogInAccount = async (req, res) => {
  const { email, password } = req.body;

  // Check the user's username and password in the database
  db.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], async (err, rows) => {
    if (err) {
      console.error('Error checking user credentials:', err);
      return res.status(500).json({ message: 'Error checking credentials.' });
    }
    
    // Check if any user was returned
    if (rows.length === 0) {
      // Avoid revealing that the username or password is incorrect
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Authentication successful, proceed with token creation or session management
    return res.status(200).json({ message: 'Login successful' });
  });
};
