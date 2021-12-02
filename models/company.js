const mongoose = require("mongoose");
const CompanySchema = mongoose.Schema({
    //key and datatype
    company_id: String,
    name: String,
    product_ids: Array
});

const CompanyModels = mongoose.model("DBCompany", CompanySchema, "DBCompany");
module.exports = CompanyModels;