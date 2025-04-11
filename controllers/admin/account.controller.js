const AccountAdmin = require("../../models/account-admin.model");
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');
module.exports.login = (req, res) => {
    res.render("admin/pages/login",{
      pageTitle:"Đăng nhập"
    });
  }


  module.exports.loginPost = async (req, res) => {
    const { email , password , rememberPassword} = req.body;
  
    const existAccount = await AccountAdmin.findOne({
      email: email
    });
  
    if(!existAccount){
      res.json({
        code:"error",
        message :"Email không tồn tại trong hệ thống !"
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, existAccount.password);
    if(!isPasswordValid){
      res.json({
        code:"error",
        message:"Mật khẩu không đúng !"
      });
      return ;
    }
    if(existAccount.status !="active"){
      res.json({
        code:"error",
        message:"Tài khoản chưa được kích hoạt !"
      });
      return ;
    }

    // Tạo JWT 
    const token = jwt.sign(
      {
        id:existAccount.id,
        email:existAccount.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: rememberPassword ? '30d':'1d' //Token có thời hạn là 30 ngày hoặc 1 ngày
      }
    )

    // Lưu Token vào trong Cookie 
    res.cookie("token", token , {
      maxAge: rememberPassword ? (30 * 24 * 60 * 60 * 1000):(24 * 60 * 60 * 1000) , //Token có hiệu lực trong vòng 30 ngày hoặc 1 ngày
      httpOnly : true,
      sameSite : "strict"
    })
  
    res.json({
      code:"success",
      message:"Đăng nhập tài khoản thành công"
    });
  }


module.exports.register = (req, res) => {
    res.render("admin/pages/register",{
      pageTitle:"Đăng ký"
    });
  }
module.exports.registerPost = async (req, res) => {
  const { fullName , email , password} = req.body;

  const existAccount = await AccountAdmin.findOne({
    email: email
  });

  if(existAccount){
    res.json({
      code:"error",
      message :"Email đã tồn tại trong hệ thống !"
    });
    return;
  }

  // Mã hóa mật khẩu với Bcryptjs
  const salt = await bcrypt.genSalt(10); //Tạo ra chuỗi ngẫu nhiên có 10 ký tự
  const hashedPassword = await bcrypt.hash(password, salt);

  const newAccount = new AccountAdmin({
    fullName: fullName,
    email: email ,
    password : hashedPassword ,
    status : "initial"
  });

  await newAccount.save();

  res.json({
    code:"success",
    message:"Đăng ký tài khoản thành công"
  });
}

module.exports.registerInitial = (req, res) => {
    res.render("admin/pages/register-initial",{
      pageTitle:"Tài khoản đã được khởi tạo"
    });
}
module.exports.forgot_password = (req, res) => {
    res.render("admin/pages/forgot-password",{
      pageTitle:"Quên mật khẩu"
    });
}
module.exports.otp_password = (req, res) => {
  res.render("admin/pages/otp-password",{
    pageTitle:"Nhập mã OTP "
  });
}
module.exports.reset_password = (req, res) => {
  res.render("admin/pages/reset-password",{
    pageTitle:"Đổi mật khẩu"
  });
}
module.exports.logoutPost = async (req, res) => {
  res.clearCookie("token")
  res.json({
    code:"success",
    message:"Đăng xuất tài khoản thành công"
  });
}