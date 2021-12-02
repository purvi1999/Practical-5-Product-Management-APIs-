const express = require("express");
const router = express.Router();
router.use(express.json());
const company_data = require("../models/company.js");
router.get("/", (req, res) => res.send("It is Display Company information"));
//Insert Operation - Seller add
router.post("/Add_Company", (req, res) => {
    const { newCompany } = req.body;
    const addNewCompany = company_data.create(newCompany);
    return res.json({ data: "Company Added..." });
});

//Delete Operation - Product del
router.delete("/Del_Company/:id", async (req, res) => {
    const deleteCompany = await company_data.findOneAndDelete({ company_id: req.params.id });
    if (deleteCompany == null) {
        return res.json({ data: "Company Id not Found..." });
    }
    else {
        return res.json({ data: "Company Record Deleted..." });
    }
});

//Update Operation - product id Update
router.put("/Edit_Company/:id", async (req, res) => {
    const c_id = req.params.id;
    const product_id = req.body.product_ids;
    const updateCompany = await company_data.findOneAndUpdate(
        { company_id: c_id },
        { product_ids: product_id },
        { new: true }
    );
    if (updateCompany == null) {
        return res.json({ data: "Company Id not Found..." });
    }
    else {
        return res.json({ data: "Company Products Updated..." });
    }

});


//Display Company information form product name
router.get("/product_name/:p_name", async (req, res) => {
    const product_name = req.params.p_name;
    const product_data = require("../models/product.js");
    var display_data = [];
    const product = await product_data.findOne({ title: product_name });
    try {

        const c_id = product.company_id;
        if (c_id.length > 0) {

            display_data = await company_data.find({ company_id: c_id });
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

//Fetch All Product of Company
router.get("/fetch_product/:c_id", async (req, res) => {
    const c_id = req.params.c_id;
    const product_data = require("../models/product.js");
    var display_data = [];
    const product = await product_data.find({ company_id: c_id });
    if (product.length > 0) {
        res.json({ data: "Product Detail Based On Company Id", data1: product });
    }
    else {
        res.json({ data: "No Product Found" });

    }


});
module.exports = router;