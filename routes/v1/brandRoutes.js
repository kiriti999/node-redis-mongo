const mongoose = require("mongoose");
const { clearKey } = require("../../services/cache");
const brandSchema = mongoose.model("Brand");

module.exports = app => {

  app.get("/", async (req, res) => {
    res.send('hello');
  });
  
  app.get("/api/v1/brands", async (req, res) => {
    let brands;
    if (req.query.name) {
      brands = await brandSchema.findOne({ name: req.query.name }).cache({
        time: 7200 // Timer to expire the cache every 2 hours
      });
    } else {
      brands = await brandSchema.findAll({})
    }

    res.send(brands);
  });

  app.post("/api/v1/brands", async (req, res) => {
    const { brandName } = req.body;

    const Brand = new Brand({
      name: brandName,
    });

    try {
      await Brand.save();
      clearKey(Brand.collection.collectionName);
      res.send(Brand);
    } catch (err) {
      res.send(400, err);
    }
  });
};
