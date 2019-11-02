const express = require("express");
const bodyparser = require("body-parser");
var urlencodedParser = bodyparser.urlencoded({
  extended: false
});
const path = require('path');
const port = process.env.PORT || 8080;
var peopleController = require("./controller/peoplecontroller");
var productController = require("./controller/productcontroller");
var customerController = require("./controller/customercontroller");
//var userController = require("./controller/usercontroller");
var orderController = require("./controller/ordercontroller");
var Users = require('./routes/Users');

var cors = require("cors");

const {
  mongoose
} = require("./db.js");
var app = express();
app.use(bodyparser.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:4200"
//   })
// );

app.use("/people", peopleController);
app.use("/api/product", productController);
app.use("/api/customer", customerController);
//app.use("/api/user", userController);
app.use("/api/order", orderController);
app.use('/api/users', Users);


//if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', '/dist/Inventory');
  app.use(express.static(appPath));

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
//}

app.listen(port, () => console.log("Server Started at " + port));