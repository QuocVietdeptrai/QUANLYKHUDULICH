const express = require('express')
const path = require('path')
require('dotenv').config()
const dataBase = require("./config/database");
const clientRoutes = require("./routes/client/index.route");
const adminRoutes = require("./routes/admin/index.route");
const variableConfig = require("./config/variable");

const app = express()
const port = 3000

// Kết nối database 
dataBase.connect();

// Thiết lập thư mục views 
app.set('views', path.join(__dirname,"views"));
app.set('view engine', 'pug')

// Nhúng file tĩnh muốn public lên 
app.use(express.static(path.join(__dirname,"public")));

// Tạo biến toàn cục trong file PUG 
app.locals.pathAdmin = variableConfig.pathAdmin;
//Thiết lập đường dẫn
app.use("/",clientRoutes);
app.use(`/${variableConfig.pathAdmin}`, adminRoutes);

app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`)
})