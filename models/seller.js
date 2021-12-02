const mongoose = require("mongoose");
const SellerSchema = mongoose.Schema({
    seller_id: String,
    name: String,
    Product_ids: Array
});
const SellerModels = mongoose.model("DBSeller", SellerSchema, "DBSeller");
module.exports = SellerModels;