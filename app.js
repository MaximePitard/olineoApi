const express = require('express');

const cors = require('cors');
const app = express();
app.use(cors());
  
shopRouter = require("./routes/shopRouter.js");
sellerRouter = require("./routes/sellerRouter.js");
orderRouter = require("./routes/orderRouter.js");
app.use('/shops',shopRouter);
app.use('/sellers',sellerRouter);
app.use('/orders',orderRouter);

module.exports = app;