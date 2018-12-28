// khai báo biến môi trường
require("dotenv").config();

// require module 
const express = require("express"); // khai báo express
const port = 3001; // khai báo port
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const prodRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");

const authMiddleware = require("./middlewares/auth.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");
const cartMiddleware = require("./middlewares/cart.middleware");
const app = express();
// view engine khai báo công cụ view, pug khai báo đuôi file để view
app.set("view engine", "pug");
// tham số đầu tiên là mặc định, tham số thứ 2 là đường dẫn folder
app.set("views", "./view");
// app.get nhận 2 tham số đầu vào:
// 1 là đường dẫn (path)
// 2 là 1 callback function -> callback nhận 2 tham số : 1 là request từ client, 2 là response từ server trả về
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static("public")); // khai báo sử dụng file static
app.use(sessionMiddleware);
app.use(cartMiddleware);
// render nhận vào 2 tham số, tham số thứ 1 là path, tham số thứ 2 là object
app.get("/", (req, res) =>
  res.render("index", {
    name: "sss"
  })
);
//thứ tự khai báo middleware tron Express rất quan trọng
app.use("/users", authMiddleware.requireCookie, userRoute);
app.use("/auth", authRoute);
app.use("/products", authMiddleware.requireCookie, prodRoute);
app.use("/cart", cartRoute);

app.listen(port, () => console.log(`Hello World ! ${port}`));