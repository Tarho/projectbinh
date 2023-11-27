const express = require("express");
const cors = require("cors");
const cartRoutes = require("./src/routes/cart");
const productRoutes = require("./src/routes/product");

const app = express();

const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", cartRoutes);
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
