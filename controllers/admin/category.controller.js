const Category = require("../../models/category.model");
const AccountAdmin = require("../../models/account-admin.model")
const categoryHelper = require("../../helpers/category.helper")
const moment = require('moment'); 
const slugify = require('slugify');

module.exports.list = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Lọc theo trạng thái
  if (req.query.status) {
    find.status = req.query.status;
  }

  // Lọc theo người tạo
  if (req.query.createdBy) {
    find.createdBy = req.query.createdBy;
  }

  // Lọc theo ngày tạo
  const dateFilter = {};
  if (req.query.startDate) {
    const startDate = moment(req.query.startDate).startOf("date").toDate();
    dateFilter.$gte = startDate;
  }
  if (req.query.endDate) {
    const endDate = moment(req.query.endDate).endOf("date").toDate();
    dateFilter.$lte = endDate;
  }
  if (Object.keys(dateFilter).length > 0) {
    find.createdAt = dateFilter;
  }

  // Tìm kiếm
  if (req.query.keyword) {
    const keyword = slugify(req.query.keyword, { lower: true });
    const keywordRegex = new RegExp(keyword);
    find.slug = keywordRegex;
  }

  // Phân trang
  const limitItems = 3;
  let page = 1;
  if (req.query.page) {
    const currentPage = parseInt(req.query.page);
    if (currentPage > 0) {
      page = currentPage;
    }
  }

  const totalRecord = await Category.countDocuments(find);
  const totalPage = Math.ceil(totalRecord / limitItems);

  // Xử lý trường hợp không có bản ghi
  if (totalRecord === 0) {
    page = 1; // Đặt page về 1
  } else if (page > totalPage) {
    page = totalPage;
  }

  const skip = (page - 1) * limitItems;
  const pagination = {
    skip: skip,
    totalRecord: totalRecord,
    totalPage: totalPage,
  };

  // Lấy danh sách danh mục
  const categoryList = await Category
    .find(find)
    .sort({ position: "desc" })
    .limit(limitItems)
    .skip(skip);

  // Thêm thông tin người tạo và cập nhật
  for (const item of categoryList) {
    if (item.createdBy) {
      const infoAccountCreatedBy = await AccountAdmin.findOne({ _id: item.createdBy });
      item.createdByFullName = infoAccountCreatedBy ? infoAccountCreatedBy.fullName : "N/A";
    }

    if (item.updatedBy) {
      const infoAccountUpdatedBy = await AccountAdmin.findOne({ _id: item.updatedBy }); // Sửa createdBy thành updatedBy
      item.updatedByFullName = infoAccountUpdatedBy ? infoAccountUpdatedBy.fullName : "N/A";
    }

    item.createdAtFomat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
    item.updatedAtFomat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
  }

  // Lấy danh sách tài khoản quản trị
  const accountAdminList = await AccountAdmin.find({}).select("id fullName");

  // Thêm thông báo khi không có bản ghi
  const message = totalRecord === 0 ? "Không có bản ghi nào" : null;

  res.render("admin/pages/category-list", {
    pageTitle: "Quản lý danh mục",
    categoryList: categoryList,
    accountAdminList: accountAdminList,
    pagination: pagination,
    message: message
  });
}
module.exports.create = async (req, res) => {
  const categoryList = await Category.find({
    deleted:false
  })
  const categoryTree = categoryHelper.buildCategoryTree(categoryList);
  
  // console.log(categoryTree)
  res.render("admin/pages/category-create",{
    pageTitle:"Tạo danh mục",
    categoryList:categoryTree
  });
}
module.exports.createPost = async (req, res) => {
  if(req.body.position){
    req.body.position = parseInt(req.body.position);
  }else{
    const totalRecord = await Category.countDocuments({})
    req.body.position = totalRecord + 1;
  }
  
  req.body.createdBy = req.account.id;
  req.body.updatedBy = req.account.id;
  req.body.avatar = req.file ? req.file.path : "";

  const newRecord = new Category(req.body);
  await newRecord.save();

  req.flash("success","Tạo danh mục thành công !");
  // console.log(req.body);
  res.json({
    code:"success"
  })
}
module.exports.edit = async (req, res) => {
  try {
    const categoryList = await Category.find({
      deleted:false
    })
    const categoryTree = categoryHelper.buildCategoryTree(categoryList);
    const id = req.params.id;
    const categoryDetail = await Category.findOne({
      _id:id,
      deleted:false
    })
    // console.log(categoryDetail)
    // console.log(categoryTree)
    res.render("admin/pages/category-edit",{
      pageTitle:"Chỉnh sửa danh mục",
      categoryList:categoryTree,
      categoryDetail:categoryDetail
    });
  } catch (error) {
    res.redirect(`/${pathAdmin}/category/list`)
  }
}

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
  if(req.body.position){
    req.body.position = parseInt(req.body.position);
  }else{
    const totalRecord = await Category.countDocuments({})
    req.body.position = totalRecord + 1;
  }
  req.body.updatedBy = req.account.id;
  if(req.file){
    req.body.avatar=req.file.path;
  }else{
    delete req.body.avatar;
  }

  await Category.updateOne({
    _id:id ,  
    deleted:false
  },req.body)

  req.flash("success","Chỉnh sửa danh mục thành công !");
  // console.log(req.body);
  res.json({
    code:"success"
  })
  } catch (error) {
    res.json({
      code:"error",
      message:"Id không hợp lệ !"
    })
  }
}
module.exports.deletePatch = async (req,res) => {
  try {
    const id = req.params.id;
    
    await Category.updateOne({
      _id:id
    },{
      deleted:true,
      deletedBy:req.account.id,
      deletedAt: Date.now()
    })

    req.flash("success","Xóa danh mục thành công !");
    res.json({
      code:"success"
    })
  } catch (error) {
    res.json({
      code:"error",
      message:"Id không hợp lệ !"
    })
  }
}
module.exports.changeMultiPatch = async (req,res) => {
  try {
    const {option , ids} = req.body;
    switch (option) {
      case "active":
      case "inactive":
        await Category.updateMany({
          _id: { $in: ids }
        },{
          status:option
        })
        req.flash("success","Đổi trạng thái thành công !")
        break;
      case "delete":
        await Category.updateMany({
          _id: { $in: ids }
        },{
          deleted:true,
          deletedBy:req.account.id,
          deletedAt: Date.now()
        })
        req.flash("success","Xóa danh mục thành công !")
        break;
      default:
        break;
    }


    
    res.json({
      code:"success"
    })
  } catch (error) {
    res.json({
      code:"error",
      message:"Id không tồn tại trong hệ thống !"
    })
  }
}
module.exports.trash = async (req, res) => {
  const find = {
    deleted: true,
  };

  // Lọc theo trạng thái
  if (req.query.status) {
    find.status = req.query.status;
  }

  // Lọc theo người tạo
  if (req.query.createdBy) {
    find.createdBy = req.query.createdBy;
  }

  // Lọc theo ngày tạo
  const dateFilter = {};
  if (req.query.startDate) {
    const startDate = moment(req.query.startDate).startOf("date").toDate();
    dateFilter.$gte = startDate;
  }
  if (req.query.endDate) {
    const endDate = moment(req.query.endDate).endOf("date").toDate();
    dateFilter.$lte = endDate;
  }
  if (Object.keys(dateFilter).length > 0) {
    find.createdAt = dateFilter;
  }

  // Tìm kiếm
  if (req.query.keyword) {
    const keyword = slugify(req.query.keyword, { lower: true });
    const keywordRegex = new RegExp(keyword);
    find.slug = keywordRegex;
  }

  // Phân trang
  const limitItems = 3;
  let page = 1;
  if (req.query.page) {
    const currentPage = parseInt(req.query.page);
    if (currentPage > 0) {
      page = currentPage;
    }
  }

  const totalRecord = await Category.countDocuments(find);
  const totalPage = Math.ceil(totalRecord / limitItems);

  // Xử lý trường hợp không có bản ghi
  if (totalRecord === 0) {
    page = 1; // Đặt page về 1
  } else if (page > totalPage) {
    page = totalPage;
  }

  const skip = (page - 1) * limitItems;
  const pagination = {
    skip: skip,
    totalRecord: totalRecord,
    totalPage: totalPage,
  };

  // Lấy danh sách danh mục
  const categoryList = await Category
    .find(find)
    .sort({ position: "desc" })
    .limit(limitItems)
    .skip(skip);

  // Thêm thông tin người tạo và cập nhật
  for (const item of categoryList) {
    if (item.createdBy) {
      const infoAccountCreatedBy = await AccountAdmin.findOne({ _id: item.createdBy });
      item.createdByFullName = infoAccountCreatedBy ? infoAccountCreatedBy.fullName : "N/A";
    }

    if (item.updatedBy) {
      const infoAccountUpdatedBy = await AccountAdmin.findOne({ _id: item.updatedBy }); // Sửa createdBy thành updatedBy
      item.updatedByFullName = infoAccountUpdatedBy ? infoAccountUpdatedBy.fullName : "N/A";
    }

    item.createdAtFomat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
    item.updatedAtFomat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
  }

  // Lấy danh sách tài khoản quản trị
  const accountAdminList = await AccountAdmin.find({}).select("id fullName");

  // Thêm thông báo khi không có bản ghi
  const message = totalRecord === 0 ? "Không có bản ghi nào" : null;

  res.render("admin/pages/category-trash", {
    pageTitle: "Quản lý danh mục",
    categoryList: categoryList,
    accountAdminList: accountAdminList,
    pagination: pagination,
    message: message
  });
}

module.exports.undoPatch = async (req, res) => {
  try {
    const id = req.params.id;
    
    await Category.updateOne({
      _id: id
    }, {
      deleted: false
    })

    req.flash("success", "Khôi phục danh mục thành công!");

    res.json({
      code: "success"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Id không hợp lệ!"
    })
  }
}

module.exports.deleteDestroyPatch = async (req, res) => {
    try {
    const id = req.params.id;
    
    await Category.deleteOne({
      _id: id
    })

    req.flash("success", "Đã xóa vĩnh viễn danh mục thành công!");

    res.json({
      code: "success"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Id không hợp lệ!"
    })
  }
}

module.exports.trashChangeMultiPatch = async (req, res) => {
    try {
    const { option, ids } = req.body;

    switch (option) {
      case "undo":
        await Category.updateMany({
          _id: { $in: ids }
        }, {
          deleted: false
        });
        req.flash("success", "Khôi phục thành công!");
        break;
      case "delete-destroy":
        await Category.deleteMany({
          _id: { $in: ids }
        });
        req.flash("success", "Xóa viễn viễn thành công!");
        break;
    }

    res.json({
      code: "success"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Id không tồn tại trong hệ thông!"
    })
  }
}