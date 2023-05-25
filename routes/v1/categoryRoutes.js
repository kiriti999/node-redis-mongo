const mongoose = require("mongoose");
const { clearKey } = require("../../services/cache");
const categorySchema = mongoose.model("Category");

module.exports = app => {
  app.get("/api/v1/category", async (req, res) => {
    let category;
    if (req.query.name) {
      const categoryName = req.query.name
      category = await categorySchema.findOne({ name: categoryName }).cache({
        time: 7200 // Timer to expire the cache every 2 hours
      });
    } else {
      category = await categorySchema.findAll({})
    }

    res.send(category);
  });

  app.post("/api/v1/category", async (req, res) => {
    const { categoryName } = req.body;

    const Category = new categorySchema({
      name: categoryName,
    });

    try {
      await Category.save();
      clearKey(Category.collection.collectionName);
      res.send(Category);
    } catch (err) {
      res.send(400, err);
    }
  });
};
