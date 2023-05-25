const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./services/cache");
require("./models/Brand");
require("./models/Category");
require("./models/Product");

const app = express();
app.use(bodyParser.json());

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require("./routes/v1/brandRoutes")(app);
require("./routes/v1/categoryRoutes")(app);
require("./routes/v1/productRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});

app.get('/', () => {
  return 'hello world';
})