const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const Product = require("./models/product");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
  console.log("Connection open!!")
}

app.set("views", path.join(__dirname, "views" ));
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));

app.get("/products",async (req,res) => {
  const products = await Product.find({})
    res.render('products/index', {products})
})

app.get("/products/new", (req,res) => {
  res.render("products/new")
})

app.post("/products", async (req,res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);

})

app.get('/products/:id' , async (req,res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show.ejs' , { product })
})

app.get("/products/:id/edit", async (req,res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", {product})
})

app.put("/products/:id", async(req,res) => {
  
})

app.listen(3000, () => {
    console.log("App is running on port 3000!")
})