// Menu Mobile
const buttonMenuMobile = document.querySelector(".header .inner-menu-mobile");
if(buttonMenuMobile) {
  const menu = document.querySelector(".header .inner-menu");

  // Click vào button mở menu
  buttonMenuMobile.addEventListener("click", () => {
    menu.classList.add("active");
  });

  // Click vào overlay đóng menu
  const overlay = menu.querySelector(".inner-overlay");
  if(overlay) {
    overlay.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  }

  // Click vào icon down mở sub menu
  const listButtonSubMenu = menu.querySelectorAll("ul > li > i");
  listButtonSubMenu.forEach(button => {
    button.addEventListener("click", () => {
      button.parentNode.classList.toggle("active");
    })
  });
}
// End Menu Mobile

// Box Address Section 1
const boxAddressSection1 = document.querySelector(".section-1 .inner-form .inner-box.inner-address");
if(boxAddressSection1) {
  // Ẩn/hiện box suggest
  const input = boxAddressSection1.querySelector(".inner-input");

  input.addEventListener("focus", () => {
    boxAddressSection1.classList.add("active");
  })

  input.addEventListener("blur", () => {
    boxAddressSection1.classList.remove("active");
  })

  // Sự kiện click vào từng item
  const listItem = boxAddressSection1.querySelectorAll(".inner-suggest-list .inner-item");
  listItem.forEach(item => {
    item.addEventListener("mousedown", () => {
      const title = item.querySelector(".inner-item-title").innerHTML.trim();
      if(title) {
        input.value = title;
      }
    })
  })
}
// End Box Address Section 1

// Box User Section 1
const boxUserSection1 = document.querySelector(".section-1 .inner-form .inner-box.inner-user");
if(boxUserSection1) {
  // Hiện box quantity
  const input = boxUserSection1.querySelector(".inner-input");

  input.addEventListener("focus", () => {
    boxUserSection1.classList.add("active");
  })

  // Ẩn box quantity
  document.addEventListener("click", (event) => {
    // Kiểm tra nếu click không nằm trong khối `.inner-box.inner-user`
    if (!boxUserSection1.contains(event.target)) {
      boxUserSection1.classList.remove("active");
    }
  });

  // Thêm số lượng vào ô input
  const updateQuantityInput = () => {
    const listBoxNumber = boxUserSection1.querySelectorAll(".inner-count .inner-number");
    const listNumber = [];
    listBoxNumber.forEach(boxNumber => {
      const number = parseInt(boxNumber.innerHTML.trim());
      listNumber.push(number);
    })
    const value = `NL: ${listNumber[0]}, TE: ${listNumber[1]}, EB: ${listNumber[2]}`;
    input.value = value;
  }

  // Bắt sự kiện click nút up
  const listButtonUp = boxUserSection1.querySelectorAll(".inner-count .inner-up");
  listButtonUp.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.parentNode;
      const boxNumber = parent.querySelector(".inner-number");
      const number = parseInt(boxNumber.innerHTML.trim());
      const numberUpdate = number + 1;
      boxNumber.innerHTML = numberUpdate;
      updateQuantityInput();
    })
  })

  // Bắt sự kiện click nút down
  const listButtonDown = boxUserSection1.querySelectorAll(".inner-count .inner-down");
  listButtonDown.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.parentNode;
      const boxNumber = parent.querySelector(".inner-number");
      const number = parseInt(boxNumber.innerHTML.trim());
      if(number > 0) {
        const numberUpdate = number - 1;
        boxNumber.innerHTML = numberUpdate;
        updateQuantityInput();
      }
    })
  })
}
// End Box User Section 1

// Clock Expire
const clockExpire = document.querySelector("[clock-expire]");
if(clockExpire) {
  const expireDateTimeString = clockExpire.getAttribute("clock-expire");

  // Chuyển đổi chuỗi thời gian thành đối tượng Date
  const expireDateTime = new Date(expireDateTimeString);

  // Hàm cập nhật đồng hồ
  const updateClock = () => {
    const now = new Date();
    const remainingTime = expireDateTime - now; // quy về đơn vị mili giây
    
    if (remainingTime > 0) {
      const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      // Tính số ngày, 24 * 60 * 60 * 1000 Tích của các số này = số mili giây trong 1 ngày

      const hours = Math.floor((remainingTime / (60 * 60 * 1000)) % 24);
      // Tính số giờ, 60 * 60 * 1000 Chia remainingTime cho giá trị này để nhận được tổng số giờ.
      // % 24 Lấy phần dư khi chia tổng số giờ cho 24 để chỉ lấy số giờ còn lại trong ngày.

      const minutes = Math.floor((remainingTime / (60 * 1000)) % 60);
      // Tính số phút, 60 * 1000 Chia remainingTime cho giá trị này để nhận được tổng số phút.
      // % 60 Lấy phần dư khi chia tổng số phút cho 60 để chỉ lấy số phút còn lại trong giờ.

      const seconds = Math.floor((remainingTime / 1000) % 60);
      // Tính số giây, 1000 Chia remainingTime cho giá trị này để nhận được tổng số giây.
      // % 60 Lấy phần dư khi chia tổng số giây cho 60 để chỉ lấy số giây còn lại trong phút.

      // Cập nhật giá trị vào thẻ span
      const listBoxNumber = clockExpire.querySelectorAll('.inner-number');
      listBoxNumber[0].innerHTML = `${days}`.padStart(2, '0');
      listBoxNumber[1].innerHTML = `${hours}`.padStart(2, '0');
      listBoxNumber[2].innerHTML = `${minutes}`.padStart(2, '0');
      listBoxNumber[3].innerHTML = `${seconds}`.padStart(2, '0');
    } else {
      // Khi hết thời gian, dừng đồng hồ
      clearInterval(intervalClock);
    }
  }

  // Gọi hàm cập nhật đồng hồ mỗi giây
  const intervalClock = setInterval(updateClock, 1000);
}
// End Clock Expire

// Box Filter
const buttonFilterMobile = document.querySelector(".section-9 .inner-filter-mobile");
if(buttonFilterMobile) {
  const boxLeft = document.querySelector(".section-9 .inner-left");
  buttonFilterMobile.addEventListener("click", () => {
    boxLeft.classList.add("active");
  })

  const overlay = document.querySelector(".section-9 .inner-left .inner-overlay");
  overlay.addEventListener("click", () => {
    boxLeft.classList.remove("active");
  })
}
// End Box Filter

// Box Tour Info
const boxTourInfo = document.querySelector(".box-tour-info");
if(boxTourInfo) {
  const buttonReadMore = boxTourInfo.querySelector(".inner-read-more button");
  buttonReadMore.addEventListener("click", () => {
    boxTourInfo.classList.add("active");
  })

  new Viewer(boxTourInfo);
}
// End Box Tour Info

// Khởi tạo AOS
AOS.init();
// Hết Khởi tạo AOS

// Swiper Section 2
const swiperSection2 = document.querySelector(".swiper-section-2");
if(swiperSection2) {
  new Swiper('.swiper-section-2', {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
    },
    loop: true,
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
}
// End Swiper Section 2

// Swiper Section 3
const swiperSection3 = document.querySelector(".swiper-section-3");
if(swiperSection3) {
  new Swiper('.swiper-section-3', {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
}
// End Swiper Section 3

// Swiper Box Images
const boxImages = document.querySelector(".box-images");
if(boxImages) {
  const swiperBoxImagesThumb = new Swiper(".swiper-box-images-thumb", {
    spaceBetween: 5,
    slidesPerView: 4,
    breakpoints: {
      576: {
        spaceBetween: 10,
      },
    },
  });

  const swiperBoxImagesMain = new Swiper(".swiper-box-images-main", {
    spaceBetween: 0,
    thumbs: {
      swiper: swiperBoxImagesThumb,
    },
  });
}
// End Swiper Box Images

// Zoom Box Images Main
const boxImagesMain = document.querySelector(".box-images .inner-images-main");
if(boxImagesMain) {
  new Viewer(boxImagesMain);
}
// End Zoom Box Images Main

// Box Tour Schedule
const boxTourSchedule = document.querySelector(".box-tour-schedule");
if(boxTourSchedule) {
  new Viewer(boxTourSchedule);
}
// End Box Tour Schedule

// Email Form
const emailForm = document.querySelector("#email-form");
if(emailForm) {
  const validation = new JustValidate('#email-form');

  validation
    .addField('#email-input', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email của bạn!',
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .onSuccess((event) => {
      const email = event.target.email.value;
      const dataFinal = {
        email : email
      };
      fetch(`/contact/create`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(dataFinal),
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error"){
            alert(data.message);
          }
          if(data.code == "success"){
            window.location.reload();
          }
        })
    })
  ;
}
// End Email Form

// Coupon Form
const couponForm = document.querySelector("#coupon-form");
if(couponForm) {
  const validation = new JustValidate('#coupon-form');

  validation
    .onSuccess((event) => {
      const coupon = event.target.coupon.value;
      console.log(coupon);
    })
  ;
}
// End Email Form

// Order Form
const orderForm = document.querySelector("#order-form");
if(orderForm) {
  const validation = new JustValidate('#order-form');

  validation
    .addField('#full-name-input', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ tên!'
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
      },
    ])
    .addField('#phone-input', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập số điện thoại!'
      },
      {
        rule: 'customRegexp',
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        errorMessage: 'Số điện thoại không đúng định dạng!'
      },
    ])
    .addField('#email-input', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email của bạn!',
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;
      const email= event.target.email.value;
      const note = event.target.note.value;
      const method = event.target.method.value;

      let cart = JSON.parse(localStorage.getItem("cart"));
      cart = cart.filter(item => {
        return (item.checked == true) && (item.quantityAdult + item.quantityChildren + item.quantityBaby > 0)
      });

      cart = cart.map(item => {
        return {
          tourId : item.tourId,
          locationFrom : item.locationFrom,
          quantityAdult : item.quantityAdult,
          quantityChildren : item.quantityChildren,
          quantityBaby : item.quantityBaby
        }
      })
      if(cart.length > 0){
        const dataFinal = {
          fullName: fullName,
          phone: phone,
          email: email,
          note: note,
          paymentMethod : method,
          items: cart
        };
      // console.log(dataFinal)
      fetch(`/order/create`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(dataFinal),
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error"){
            alert(data.message)
          }
          if(data.code == "success"){
            // Cập nhật giỏ hàng
            let cart = JSON.parse(localStorage.getItem("cart"));
            cart = cart.filter(item => item.checked == false);
            localStorage.setItem("cart", JSON.stringify(cart));

            switch (method) {
                case "money":
                case "bank":
                  // Chuyển hướng sang trang đặt hành thành công
                  window.location.href = `/order/success?orderId=${data.orderId}&phone=${phone}`;
                  break;
                case "zalopay":
                  // Chuyển hướng sang trang thanh toán bằng ZaloPay
                  window.location.href = `/order/payment-zalopay?orderId=${data.orderId}`;
                  break;
                case "vnpay":
                  // Chuyển hướng sang trang thanh toán bằng VNPay
                  window.location.href = `/order/payment-vnpay?orderId=${data.orderId}`;
                  break;
            }
          }
        })
      }else{
        alert("Vui lòng đặt ít nhất 1 tour !");
      }
    })
  ;

  // List Input Method
  const listInputMethod = orderForm.querySelectorAll("input[name='method']");
  const elementInfoBank = orderForm.querySelector(".inner-info-bank");

  listInputMethod.forEach(inputMethod => {
    inputMethod.addEventListener("change", () => {
      if (inputMethod.value == "bank") {
        elementInfoBank.classList.add("active");
      } else {
        elementInfoBank.classList.remove("active");
      }
    })
  })
  // End List Input Method
}
// End Order Form
// Alert
const alertTime = document.querySelector("[alert-time]");
if(alertTime) {
  let time = alertTime.getAttribute("alert-time");
  time = time ? parseInt(time) : 4000;
  setTimeout(() => {
    alertTime.remove(); // Xóa phần tử khỏi giao diện
  }, time);
}
// End Alert

// Box Filter
const boxFilter = document.querySelector(".box-filter");
if(boxFilter) {
  const url = new URL(`${window.location.origin}/search`);

  const buttonApply = boxFilter.querySelector(".inner-button");

  const filterList = [
    "locationFrom",
    "locationTo",
    "departureDate",
    "stockAdult",
    "stockChildren",
    "stockBaby",
    "price"
  ];

  buttonApply.addEventListener("click", () => {
    filterList.forEach(name => {
      const value = boxFilter.querySelector(`[name="${name}"]`).value;
      if(value) {
        url.searchParams.set(name, value);
      } else {
        url.searchParams.delete(name);
      }
    })

    window.location.href = url.href;
  })
}
// End Box Filter

// Form Search
const formSearch = document.querySelector("[form-search]");
if(formSearch){
  const url = new URL(`${window.location.origin}/search`);
  formSearch.addEventListener("submit", () => {
    event.preventDefault();

    // Điểm đến
    const locationTo = formSearch.locationTo.value;
    if(locationTo) {
      url.searchParams.set("locationTo", locationTo);
    } else {
      url.searchParams.delete("locationTo");
    }

    //số lượng
    const stockAdult = parseInt(formSearch.querySelector("[stock-adult]").innerHTML);
    if(stockAdult > 0){
      url.searchParams.set("stockAdult", stockAdult);
    }else{
      url.searchParams.delete("stockAdult");
    }

    const stockChildren = parseInt(formSearch.querySelector("[stock-children]").innerHTML);
    if(stockChildren > 0){
      url.searchParams.set("stockChildren", stockChildren);
    }else{
      url.searchParams.delete("stockChildren");
    }


    const stockBaby = parseInt(formSearch.querySelector("[stock-baby]").innerHTML);
    if(stockBaby > 0){
      url.searchParams.set("stockBaby", stockBaby);
    }else{
      url.searchParams.delete("stockBaby");
    }

    //Ngày khởi hành
    const departureDate = formSearch.departureDate.value;
    if(departureDate){
      url.searchParams.set("departureDate", departureDate);
    }else{
      url.searchParams.delete("departureDate");
    }
    window.location.href = url.href;
  })
}
// Form CheckOrder
const formCheckOrder = document.querySelector("#check-order-form");

if (formCheckOrder) {
  const validation = new JustValidate('#check-order-form');

  validation
    .addField('#order-code-input', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập mã đơn hàng!"
      }
    ])
    .onSuccess((event) => {
      event.preventDefault();

      const orderCode = formCheckOrder.orderCode.value;
      const url = new URL(`${window.location.origin}/order/success`);

      url.searchParams.set("orderCode", orderCode);

      window.location.href = url.href;
    });
}

// End Form CheckOrder



// End Form Search 
// Box Tour Detail
const boxTourDetail = document.querySelector(".box-tour-detail");
if(boxTourDetail){
  // Bước 1 : Lấy ra 3 ô input
  const inputStockAdult = document.querySelector("[input-stock-adult]");
  const inputStockChildren = document.querySelector("[input-stock-children]");
  const inputStockBaby = document.querySelector("[input-stock-baby]");


  // Bước 2: Viết hàm cập nhất box detail 
  const drawBoxDetail = () => {
    const quantityAdult = parseInt(inputStockAdult.value);
    const quantityChildren = parseInt(inputStockChildren.value);
    const quantityBaby = parseInt(inputStockBaby.value);

    const stockAdult = document.querySelector("[stock-adult]");
    const stockChildren = document.querySelector("[stock-children]");
    const stockBaby = document.querySelector("[stock-baby]");

    stockAdult.innerHTML = quantityAdult;
    stockChildren.innerHTML = quantityChildren;
    stockBaby.innerHTML = quantityBaby;

    const priceAdult = parseInt(inputStockAdult.getAttribute("price"));
    const priceChildren = parseInt(inputStockChildren.getAttribute("price"));
    const priceBaby = parseInt(inputStockBaby.getAttribute("price"));

    const totalPrice = quantityAdult * priceAdult + quantityChildren * priceChildren + quantityBaby * priceBaby;
    const totalHTML = document.querySelector("[total-price]");
    totalHTML.innerHTML=totalPrice.toLocaleString("vi-VN")
  }
  // Bước 3 : Bắt sự kiện Change cho 3 ô input 
  inputStockAdult.addEventListener("change",drawBoxDetail)
  inputStockChildren.addEventListener("change",drawBoxDetail)
  inputStockBaby.addEventListener("change",drawBoxDetail)
  

  // Bước 4 : Bắt sự kiện click thêm vào giỏ hàng 
  const buttonAddToCart = boxTourDetail. querySelector(".inner-button-add-cart");
  buttonAddToCart.addEventListener("click" , () => {
    const tourId = buttonAddToCart.getAttribute("tour-id");
    const quantityAdult = parseInt(inputStockAdult.value);
    const quantityChildren = parseInt(inputStockChildren.value);
    const quantityBaby = parseInt(inputStockBaby.value);
    const locationFrom = boxTourDetail.querySelector("[location-from]").value;
    if(quantityAdult > 0 || quantityChildren > 0 || quantityBaby > 0){
      const cartItem = {
        tourId:tourId,
        quantityAdult:quantityAdult,
        quantityChildren:quantityChildren,
        quantityBaby:quantityBaby,
        locationFrom:locationFrom,
        checked: true
      };
      // console.log(cartItem)
      const cart = JSON.parse(localStorage.getItem("cart"));
      const indexItemExitst = cart.findIndex(item => item.tourId == tourId);
      if(indexItemExitst != -1){
        cart[indexItemExitst]=cartItem
      }else{
        cart.push(cartItem)
      }
      localStorage.setItem("cart",JSON.stringify(cart));
      window.location.href="/cart"
    }
  })
}
// End Box Tour Detail 

// Initial Cart 
const cart = localStorage.getItem("cart");
if(!cart){
  localStorage.setItem("cart",JSON.stringify([]))
}
// End Initial Cart 
// Mini Cart 
const miniCart = document.querySelector("[mini-cart]");
if(miniCart){
  const cart = JSON.parse(localStorage.getItem("cart"));
  miniCart.innerHTML=cart.length
}
// End Mini Cart 

// Page Cart 
const drawCart = () => {
  const cart = localStorage.getItem("cart");
  fetch(`cart/detail`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: cart
  })
    .then(res => res.json())
    .then(data => {
      if(data.code == "success"){
        const htmlCart = data.cart.map(item => `
          <div class="inner-tour-item">
            <div class="inner-actions">
              <button class="inner-delete" button-delete tour-id="${item.tourId}">
                <i class="fa-solid fa-xmark"></i>
              </button>
              <input 
                class="inner-check" 
                type="checkbox" ${item.checked ? 'checked' : ''}
                input-check
                tour-id="${item.tourId}"
              >
            </div>
            <div class="inner-product">
              <div class="inner-image">
                <a href="/tour/detail/${item.slug}">
                  <img alt="" src="${item.avatar}">
                </a>
              </div>
              <div class="inner-content">
                <div class="inner-title">
                  <a href="/tour/detail/${item.slug}">
                    ${item.name}
                  </a>
                </div>
                <div class="inner-meta">
                  <div class="inner-meta-item">Ngày Khởi Hành: <b>${item.departureDateFormat}</b>
                  </div>
                  <div class="inner-meta-item">Khởi Hành Tại: <b>${item.locationFromName}</b>
                  </div>
                </div>
              </div>
            </div>
            <div class="inner-quantity">
              <label class="inner-label">Số Lượng Hành Khách</label>
              <div class="inner-list">
                <div class="inner-item">
                  <div class="inner-item-label">Người lớn:</div>
                  <div class="inner-item-input">
                    <input 
                      value="${item.quantityAdult}" 
                      min="0" 
                      type="number"
                      input-quantity="quantityAdult"
                      tour-id="${item.tourId}"
                    >
                  </div>
                  <div class="inner-item-price">
                    <span>${item.quantityAdult}</span>
                    <span>x</span>
                    <span class="inner-highlight">
                      ${item.priceNewAdult.toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>
                <div class="inner-item">
                  <div class="inner-item-label">Trẻ em:</div>
                  <div class="inner-item-input">
                    <input 
                      value="${item.quantityChildren}" 
                      min="0" 
                      type="number"
                      input-quantity="quantityChildren"
                      tour-id="${item.tourId}"
                    >
                  </div>
                  <div class="inner-item-price">
                    <span>${item.quantityChildren}</span>
                    <span>x</span>
                    <span class="inner-highlight">
                      ${item.priceNewChildren.toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>
                <div class="inner-item">
                  <div class="inner-item-label">Em bé:</div>
                  <div class="inner-item-input">
                    <input 
                      value="${item.quantityBaby}" 
                      min="0" 
                      type="number"
                      input-quantity="quantityBaby"
                      tour-id="${item.tourId}"
                    >
                  </div>
                  <div class="inner-item-price">
                    <span>${item.quantityBaby}</span>
                    <span>x</span>
                    <span class="inner-highlight">
                      ${item.priceNewBaby.toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `);
          const cartList = document.querySelector("[cart-list]");
          cartList.innerHTML = htmlCart.join("");

          //Cập nhật lại giỏ hàng
          localStorage.setItem("cart",JSON.stringify(data.cart));
          miniCart.innerHTML=data.cart.length;
          // Hết cập nhật lại giỏ hàng

          // Tính tổng tiền
          const subTotalPrice = data.cart.reduce((sum,item) => {
            if(item.checked) {
              return sum + ((item.priceNewAdult * item.quantityAdult) + (item.priceNewChildren * item.quantityChildren) + (item.priceNewBaby * item.quantityBaby));
            }else{
              return sum;
            }
          },0);
          const discount = 0;
          const totalPrice = subTotalPrice - discount;
          const cartSubTotal = document.querySelector("[cart-sub-total]");
          cartSubTotal.innerHTML = subTotalPrice.toLocaleString("vi-VN");

          const cartTotal = document.querySelector("[cart-total]");
          cartTotal.innerHTML = totalPrice.toLocaleString("vi-VN");


          // Hết tính tổng tiền 

          // Sự kiện cập nhật số lượng
          const listInputQuanlity = document.querySelectorAll("[input-quantity]");
          listInputQuanlity.forEach(input =>  {
            input.addEventListener("change",() => {
              const tourTd = input.getAttribute("tour-id");
              const name = input.getAttribute("input-quantity");
              const quantity = parseInt(input.value);

              const cart = JSON.parse(localStorage.getItem("cart"));
              const itemUpdate = cart.find(item => item.tourId == tourTd);
              itemUpdate[name] = quantity;
              localStorage.setItem("cart",JSON.stringify(cart));
              drawCart();
            })
          })
          // Hết sự kiện cập nhật số lượng 
          // Sự kiện xóa item
          const listButtonDelete = document.querySelectorAll("[button-delete]");
          listButtonDelete.forEach(button => {
            button.addEventListener("click", () => {
              const tourId = button.getAttribute("tour-id");
              const cart = JSON.parse(localStorage.getItem("cart"));
              const indexItem = cart.findIndex(tour => tour.tourId == tourId);
              cart.splice(indexItem, 1);
              localStorage.setItem("cart", JSON.stringify(cart));
              drawCart();
            })
          })
          // Hết Sự kiện xóa item

          // Sự kiện check item
          const listInputCheck = document.querySelectorAll("[input-check]");
          listInputCheck.forEach(input => {
            input.addEventListener("change", () => {
              const checked = input.checked;
              const tourId = input.getAttribute("tour-id");

              const cart = JSON.parse(localStorage.getItem("cart"));
              const itemUpdate = cart.find(item => item.tourId == tourId);
              itemUpdate.checked = checked;
              localStorage.setItem("cart", JSON.stringify(cart));
              drawCart();
            })
          })
          // Hết Sự kiện check item



      }
    })
}
const pageCart = document.querySelector("[page-cart]");
if(pageCart){
  drawCart();
}
// End Page Cart 
const buttonNextPages = document.querySelectorAll("[nextpagination]");

const leftButton = document.querySelector('[leftButton]')
const rightButton = document.querySelector("[rightButton]")

console.log(leftButton)
console.log(rightButton)

console.log(buttonNextPages.length)

if (buttonNextPages.length > 0) {
  const url = new URL(window.location.href); // tạo 1 url tại địa chỉ hiện tại

  let pageCurrentActive = 1;

  buttonNextPages.forEach(button => {



    if (button.classList.contains("active")) {
      pageCurrentActive = parseInt(button.textContent.trim(), 10);
    }



    button.addEventListener("click", () => {
      const pageNumber = parseInt(button.textContent.trim(), 10);
      console.log("Chạy vào trang", pageNumber);

      if (pageNumber) {
        url.searchParams.set("page", pageNumber);
      } else {
        url.searchParams.delete("page");
      }


      window.location.href = url.href;
    });
    // Xử lý nút left (←)
    if (leftButton) {
      leftButton.addEventListener("click", () => {
        if (pageCurrentActive > 1) {
          url.searchParams.set("page", pageCurrentActive - 1);
          window.location.href = url.href;
        }
      });
    }
    // Xử lý nút right (←)
    if (rightButton) {
      rightButton.addEventListener("click", () => {
        if (pageCurrentActive < buttonNextPages.length) {
          url.searchParams.set("page", pageCurrentActive + 1);
          window.location.href = url.href;
        }
      });
    }
  });



}