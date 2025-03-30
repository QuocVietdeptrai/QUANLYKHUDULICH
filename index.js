const express = require('express')
const path = require('path')
require('dotenv').config()
const dataBase = require("./config/database");
const clientRoutes = require("./routes/client/index.route");


const app = express()
const port = 3000

// Kết nối database 
dataBase.connect();

// Thiết lập thư mục views 
app.set('views', path.join(__dirname,"views"));
app.set('view engine', 'pug')

// Nhúng file tĩnh muốn public lên 
app.use(express.static(path.join(__dirname,"public")));


//Thiết lập đường dẫn
app.use("/",clientRoutes);
app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`)
})