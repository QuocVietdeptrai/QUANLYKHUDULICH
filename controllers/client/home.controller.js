const Tour = require("../../models/tour.model");
const moment = require("moment");
const categoryHelper = require("../../helpers/category.helper");

module.exports.home = async (req, res) => {
  // Section 2
  const tourListSection2 = await Tour
    .find({
      deleted: false,
      status: "active"
    })
    .sort({
      position: "desc"
    })
    .limit(6)

  for(const item of tourListSection2) {
    item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
  }
  // End Section 2
  
  //Section 4
  const categoryIdSection4 = "68825e063f7beb2afb97cdf5";//id danh muc tour trong nuoc
  const listCategoryId = await categoryHelper.getAllSubcategoryIds(categoryIdSection4)
  const tourListSection4 = await Tour
    .find({
      category: {$in : listCategoryId},
      deleted: false,
      status: "active"
    })
    .sort({
      position: "desc"
    })
    .limit(8)

  for(const item of tourListSection4) {
    item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
  }
  //End Section 4
  //Section 6
  const categoryIdSection6 = "688262963f7beb2afb97ce5f";//id danh muc tour nước ngoài
  const listCategoryIdNuocNgoai = await categoryHelper.getAllSubcategoryIds(categoryIdSection6)
  const tourListSection6 = await Tour
    .find({
      category: {$in : listCategoryIdNuocNgoai},
      deleted: false,
      status: "active"
    })
    .sort({
      position: "desc"
    })
    .limit(8)

  for(const item of categoryIdSection6) {
    item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
  }
  //End Section 6
  res.render("client/pages/home", {
    pageTitle: "Trang chủ",
    tourListSection2: tourListSection2,
    tourListSection4:tourListSection4,
    tourListSection6:tourListSection6
  })
}
