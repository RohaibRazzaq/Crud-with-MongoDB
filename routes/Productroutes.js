const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Import the Product model

// =======================
// ROUTE: GET /api/products
// Description: Get all products
// =======================

// router.get("/get1/:name/:price/:quantity", async (req, res) => {  // to check route only
//   const newProduct = new Product({
//     name: req.params.name,
//     price: req.params.price,
//     quantity: req.params.quantity,
//   });
//   res.json(newProduct);
// });

router.post("/addProduct/:name/:price/:quantity", async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.params.name,
      price: req.params.price,
      quantity: req.params.quantity,
    });
    await newProduct.save();
    res.status(201).send({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).send;
  }
});

router.post("/add", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res
      .status(201)
      .send({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to add product", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

// =======================
// ROUTE: GET /api/products/:id
// Description: Get a single product by ID
// =======================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
});

// =======================
// ROUTE: POST /api/products
// Description: Add a new product
// =======================
router.post("/", async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    if (!name || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, price, and quantity",
      });
    }

    const newProduct = new Product({
      name,
      price,
      quantity,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
});

// =======================
// ROUTE: PUT /api/products/:id
// Description: Update a product by ID
// =======================
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
});

// =======================
// ROUTE: DELETE /api/products/:id
// Description: Delete a product by ID
// =======================
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
});

module.exports = router;
