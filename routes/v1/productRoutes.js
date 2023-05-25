const mongoose = require("mongoose");
const { clearKey } = require("../../services/cache");
const productSchema = mongoose.model("Product");


function groupByBrand() {
  const data = await productSchema.aggregate([
    {
      $group: {
        _id: '$brandName',
      }
    }
  ]);
}

function groupByPrice() {
  const data = await productSchema.aggregate([
    {
      $group: {
        _id: '$price',
      }
    }
  ]);
}

function groupByColor() {
  const data = await productSchema.aggregate([
    {
      $group: {
        _id: '$color',
      }
    }
  ]);
}

function groupBySize()) {
  const data = await productSchema.aggregate([
    {
      $group: {
        _id: '$size',
      }
    }
  ]);
}


module.exports = app => {
  app.get("/api/v1/products", async (req, res) => {
    let products;
    if (req.query.name) {
      const productName = req.query.productName
      products = await productSchema.findOne({ name: productName }).cache({
        time: 7200 // Timer to expire the cache every 2 hours
      });
      res.send(products);
    } 

    if (req.query.brandName) {
      const brandName = req.query.brandName
      products = await groupByBrand(brandName).cache({
        time: 7200 // Timer to expire the cache every 2 hours
      });
      res.send(products);
    } 

    if (req.query.color) {
      const color = req.query.color
      products = await groupByColor(color).cache({
        time: 7200 // Timer to expire the cache every 2 hours
      });
      res.send(products);
    } 

    if (req.query.price) {
      const price = req.query.price
      products = await groupByPrice(price).cache({
        time: 7200 // Timer to expire the cache every 2 hours
      });
      res.send(products);
    } 

    if (req.query.size) {
      const size = req.query.size
      products = await groupBySize(size).cache({
        time: 7200 // Timer to expire the cache every 2 hours
      });
      res.send(products);
    } 
    
    else {
      products = await productSchema.findAll({});
      res.send(products);
    }
  });


  app.get("/api/v1/products", async (req, res) => {
    let products;
    if (req.query.name) {
      const { productName, brandName, price, color, size } = req.query;

      products = await productSchema.findOne({ name: productName }).cache({
        time: 7200 // Timer to expire the cache every 2 hours
      });
      res.send(products);
    } else {
      products = await productSchema.findAll({});
      res.send(products);
    }
  });

  app.post("/api/v1/products", async (req, res) => {
    const { productName } = req.body;

    const productSchema = new productSchema({
      name: productName,
    });

    try {
      await productSchema.save();
      clearKey(productSchema.collection.collectionName);
      res.send(productSchema);
    } catch (err) {
      res.send(400, err);
    }
  });
};
