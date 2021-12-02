const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    //key and datatype
    product_id: String,
    title: String,
    price: String,
    category: Array,
    company_id: String,
    seller_id: Array
});

const ProductModels = mongoose.model("DBProduct", productSchema, "DBProduct");
module.exports = ProductModels;