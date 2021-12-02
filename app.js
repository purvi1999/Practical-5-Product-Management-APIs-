const dotenv=require("dotenv").config();
const express=require("express");

//connection with mongoDb
const mongoose=require("mongoose");
mongoose.connect(process.env.Con).then(()=>console.log("Connected to mongoDb Server...."));

const app=express();
const port=4000;

const Product_router=require("./router/r_product.js");
app.use("/product",Product_router);

const Seller_router=require("./router/r_seller.js");
app.use("/Seller",Seller_router);

const Company_router=require("./router/r_company.js");
app.use("/Company",Company_router);

app.get("/",(req,res)=>res.send("Hello FullStack!"));
app.listen(port,()=>console.log("Server Runing on Port 4000"));