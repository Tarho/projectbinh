// controller/cart.js

const db = require("../config/dbconnect");

exports.getAll = async (req, res) => {
  try {
    const result = await db.queryAsync("SELECT * FROM cart");

    if (result.length === 0) {
      return res.status(404).json({ message: "No items found in the cart." });
    }

    const items = result.map((row) => ({
      id: row.id,
      name: row.name,
      type: row.type,
      price: row.price,
      quantity: row.quantity,
    }));

    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error retrieving items from the cart:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const itemId = req.params.id;

    const result = await db.queryAsync("SELECT * FROM cart WHERE id=?", [
      itemId,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Item not found in the cart." });
    }

    const item = {
      id: result[0].id,
      name: result[0].name,
      type: result[0].type,
      price: result[0].price,
      quantity: result[0].quantity,
    };

    return res.status(200).json({ item });
  } catch (error) {
    console.error("Error retrieving item from the cart", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { name, type, price, quantity } = req.body;
    if (!name || !type || !price || !quantity) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const result = await db.queryAsync(
      "INSERT INTO cart (name, type, price, quantity) VALUES (?, ?, ?, ?)",
      [name, type, price, quantity]
    );
    if (result.affectedRows === 1) {
      return res.status(201).json({ message: "Item added to the cart." });
    } else {
      return res.status(500).json({
        message: "Failed to add item to the cart.",
      });
    }
  } catch (error) {
    console.error("Error adding item to the cart", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { quantity } = req.body;
    const id = req.params.id;

    if (!quantity) {
      return res.status(204).json({ message: "Reset content of cart" });
    }

    const result = await db.queryAsync(
      "UPDATE cart SET quantity = ? WHERE id = ?",
      [quantity, id]
    );

    if (result.affectedRows === 1) {
      const item = {
        quantity: quantity,
      };

      return res
        .status(200)
        .json({ item, message: "Item quantity updated in the cart." });
    } else {
      return res.status(404).json({
        message: "Item not found in the cart.",
      });
    }
  } catch (error) {
    console.log("Error updating item in the cart", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
