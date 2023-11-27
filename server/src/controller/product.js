const db = require("../config/dbconnect");

exports.getAll = async (req, res) => {
  try {
    const result = await db.queryAsync("SELECT * FROM product");

    if (result.length === 0) {
      return res.status(404).json({ message: "No item found in product list" });
    }

    const items = result.map((row) => ({
      id: row.id,
      name: row.name,
      type: row.type,
      price: row.price,
    }));

    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error retrieving items from the product list: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};
