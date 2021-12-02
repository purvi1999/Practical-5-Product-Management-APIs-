const express = require("express");
const router = express.Router();
router.use(express.json());
const seller_data = require("../models/seller.js");
router.get("/", (req, res) => res.send("It is Display Seller information"));

//Insert Operation - Seller add
router.post("/Add_Seller", (req, res) => {
    const { newSeller } = req.body;
    const addNewSeller = seller_data.create(newSeller);
    return res.json({ data: "Seller Added..." });
});

//Delete Operation - Seller Deleted
router.delete("/del_Seller/:id", async (req, res) => {
    const deleteSeller = await seller_data.findOneAndDelete({ seller_id: req.params.id });
    if (deleteSeller == null) {
        return res.json({ data: "Seller Id not Found..." });
    }
    else {
        return res.json({ data: "Seller Deleted..." });
    }
});

//Update Operation - product_ids update
router.put("/Edit_Seller/:id", async (req, res) => {
    const s_id = req.params.id;
    const product_id = req.body.product_ids;
    const updateSeller = await seller_data.findOneAndUpdate(
        { seller_id: s_id },
        { Product_ids: product_id },
        { new: true }
    );
    if (updateSeller == null) {
        return res.json({ data: "Seller Id not Found..." });
    }
    else {
        return res.json({ data: "Seller Products info uppdated...", data2: updateSeller });
    }
});

//Display Seller information form product name
router.get("/product_name/:p_name", async (req, res) => {
    const product_name = req.params.p_name;
    const product_data = require("../models/product.js");
    var display_data = [];
    const product = await product_data.findOne({ title: product_name });
    try {
        const seller_id = product.seller_id;
        if (seller_id.length > 0) {

            display_data = await seller_data.findOne({ seller_id: seller_id });
        }
        else {
            display_data = "No Product name found!!";
        }
        res.json({ data: "Company Detail Based On Product Name", data1: display_data });
    }
    catch (e) {
        res.json({ data: "Company Detail Based On Product Name", data1: "No Product name found!!" });
    }


});

//Fetch All Product of Seller
router.get("/fetch_product/:s_id", async (req, res) => {
    const s_id = req.params.s_id;
    const product_data = require("../models/product.js");
    const product = await product_data.find({ seller_id: s_id });
    if (product.length > 0) {
        res.json({ data: "Product Detail Based On Seller Id", data1: product });
    }
    else {
        res.json({ data: "No Seller Id Found" });

    }
});
module.exports = router;