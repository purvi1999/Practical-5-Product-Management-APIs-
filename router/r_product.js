const express = require("express");
const router = express.Router();
router.use(express.json());
const product_data = require("../models/product.js");
router.get("/", (req, res) => res.send("It is Display Product information"));

//Insert Operation - Product add
router.post("/Add_product", (req, res) => {
    const { newProduct } = req.body;
    const addNewProduct = product_data.create(newProduct);
    return res.json({ data: "Product Added..." });
});

//Delete Operation - Product del
router.delete("/Del_product/:id", async (req, res) => {
    const deleteProduct = await product_data.findOneAndDelete({ product_id: req.params.id });
    if (deleteProduct == null) {
        return res.json({ data: "Seller Id not Found..." });
    }
    else {
        return res.json({ data: "Seller Deleted..." });
    }
});

//Update Operation - company id Update
router.put("/Edit_product/:id", async (req, res) => {
    const p_id = req.params.id;
    const company_id = req.body.company_id;
    const updateUser = await product_data.findOneAndUpdate(
        { product_id: p_id },
        { company_id: company_id },
        { new: true }
    );
    return res.json({ data: "Product Company Edited..." });
});

module.exports = router;