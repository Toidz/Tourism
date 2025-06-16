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
        email:email
      }

      fetch(`/contact`,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(dataFinal)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.code=="error"){
          alert(data.message)
        }
        else{
          window.location.reload()
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
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;
      const note = event.target.note.value;
      const method = event.target.method.value;
      let cart = JSON.parse(localStorage.getItem("cart"))
      cart = cart.filter(item=>{
        return( (item.checkItem==true)
          && (item.stockAdult+ item.stockChildren + item.stockBaby >0))
      })
      cart = cart.map(item=>{
        return {
            id:item.id,
            location:item.location,
            stockAdult:item.stockAdult,
            stockChildren:item.stockChildren,
            stockBaby:item.stockBaby
          }
      })

      if(cart.length >0){
        const dataFinal ={
          fullName:fullName,
          phone:phone,
          note:note,
          method:method,
          cart:cart
        }
        fetch(`/order/create`,{
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify(dataFinal)
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.code=="error"){
            alert(data.message)
          }
          else{
            let cart = JSON.parse(localStorage.getItem("cart"))
            const index = cart.findIndex(item => item.id == data.orderId)
            cart.splice(index,1)
            localStorage.setItem("cart",JSON.stringify(cart))
            switch (method) {
              case "money": case "bank":
                window.location.href = `/order/success?orderId=${data.orderId}&phone=${phone}`
                break;
            
              case "zalopay":
                window.location.href = `/order/payment-zalopay?orderId=${data.orderId}`
                break;

              case "vnpay": 
                window.location.href = `/order/payment-vnpay?orderId=${data.orderId}`
                break;
            }
           
          }
        })
      }
      else{
        alert("Vui lòng chọn ít nhất 1 tour!")
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

//filter tour
const filterTour = document.querySelector("[filter-tour]")
if(filterTour){
  const list = [
    "locationStart",
    "locationEnd",
    "timeStart",
    "numberAdult",
    "numberChildren",
    "numberBaby",
    "price"
  ]
  const url = new URL(`${window.location.origin}/search`)
  const button = filterTour.querySelector("button")
  if(button){
    button.addEventListener("click",()=>{
      list.forEach(item => {
        const filter = filterTour.querySelector(`[${item}]`)
        if(filter.value && filter.value!=0){
          url.searchParams.set(`${item}`,filter.value)
        }
        else{
          url.searchParams.delete(`${item}`)
        }
      });
      window.location.href = url.href
    })
  }
}
//End filter tour

//filter search
const searchTour = document.querySelector("[search]")
if(searchTour){
  const list = [
    "locationEnd",
    "timeStart",
  ]
  const url = new URL(`${window.location.origin}/search`)
  const button = searchTour.querySelector("button")
  if(button){
    button.addEventListener("click",()=>{
      list.forEach(item => {
        const filter = searchTour.querySelector(`[${item}]`)
        if(filter.value && filter.value!=0){
          url.searchParams.set(`${item}`,filter.value)
        }
        else{
          url.searchParams.delete(`${item}`)
        }
      });
      window.location.href = url.href
    })
  }

  const list1 = [
    "numberAdult",
    "numberChildren",
    "numberBaby",
  ]
  const button1 = searchTour.querySelector("button")
  if(button1){
    button.addEventListener("click",()=>{
      list1.forEach(item => {
        const filter = searchTour.querySelector(`[${item}]`)
        if(filter.textContent){
          url.searchParams.set(`${item}`,filter.textContent)
        }
        else{
          url.searchParams.delete(`${item}`)
        }
      });
      window.location.href = url.href
    })
  }
}
//End search tour

//detail-product
const detailProduct = document.querySelector("[detail-product]")
if(detailProduct){
  const selectCity = detailProduct.querySelector("[city]")

  const buttonCart = detailProduct.querySelector("[button-cart]")

  const numberAdult = detailProduct.querySelector("[numberAdult]")
  const numberChildren = detailProduct.querySelector("[numberChildren]")
  const numberBaby = detailProduct.querySelector("[numberBaby]")

  const adultStock = detailProduct.querySelector("[adultStock]")
  const childrenStock = detailProduct.querySelector("[childrenStock]")
  const babyStock = detailProduct.querySelector("[babyStock]")
  const totalPrice = detailProduct.querySelector("[total-price]")

  const total = ()=>{
    const total = numberAdult.value * parseInt( numberAdult.getAttribute("numberAdult"))
    + numberChildren.value * parseInt(numberChildren.getAttribute("numberChildren"))
    + numberBaby.value * parseInt(numberBaby.getAttribute("numberBaby"))
    
    totalPrice.innerHTML = parseInt(total).toLocaleString("vi-VN")
  } 
  numberAdult.addEventListener("change",()=>{
    total()
    adultStock.innerHTML = parseInt(numberAdult.value)
  })
  numberChildren.addEventListener("change",()=>{
    total()
    childrenStock.innerHTML = parseInt(numberChildren.value)
  })
  numberBaby.addEventListener("change",()=>{
    total()
    babyStock.innerHTML = parseInt(numberBaby.value)
  })
  if(buttonCart){
    buttonCart.addEventListener("click",()=>{
      const dataFinal ={
        id: buttonCart.getAttribute("button-cart"),
        location: selectCity.value,
        stockAdult:numberAdult.value,
        stockChildren:numberChildren.value,
        stockBaby:numberBaby.value,
        checkItem:true
      }
      const cart = JSON.parse(localStorage.getItem("cart"))
      const existIndex = cart.findIndex(item => item.id == dataFinal.id )
      if(existIndex!=-1){
        cart[existIndex] = dataFinal
      }
      else{
        cart.push(dataFinal)
      }
      localStorage.setItem("cart",JSON.stringify(cart))
      window.location.href = "/cart"
    })
  }
}
//End detail-product

//cart
const cart = localStorage.getItem("cart")
if(!cart){
  localStorage.setItem("cart",JSON.stringify([]))
}
//end cart

//mini cart
const miniCart = document.querySelector("[mini-cart]")
if(miniCart){
  const cart = JSON.parse(localStorage.getItem("cart"))
  if(cart) miniCart.innerHTML = cart.length
}
//End mini cart

// cart detail
const drawCart = ()=>{
  const cart = localStorage.getItem("cart")
  if(cart){
    fetch(`/cart/detail`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:cart
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.code=="error"){
        alert(data.message)
      }
      else{
        const htmlCart = data.cart.map(item=>
        `
          <div class="inner-tour-item">
            <div class="inner-actions">
              <button class="inner-delete" button-delete=${item.id}>
                <i class="fa-solid fa-xmark"></i>
              </button>
              <input class="inner-check" 
                type="checkbox" ${item.checkItem ? "checked" : "" } 
                checkItem
                idTour = ${item.id}
              >
            </div>
            <div class="inner-product">
              <div class="inner-image">
                <a href="/tour/detail/${item.slug}">
                  <img alt=${item.name} src=${item.avatar}>
                </a>
              </div>
              <div class="inner-content">
                <div class="inner-title">
                  <a href="/tour/detail/${item.slug}">${item.name}</a>
                </div>
                <div class="inner-meta">
                  <div class="inner-meta-item">Mã Tour: <b>123456789</b>
                  </div>
                  <div class="inner-meta-item">Ngày Khởi Hành: <b>${item.departureDateFormat}</b>
                  </div>
                  <div class="inner-meta-item">Khởi Hành Tại: <b>${item.locationName}</b>
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
                      value=${item.stockAdult} 
                      min="1" 
                      type="number"
                      stockInput ="stockAdult"
                      tour-id =${item.id}
                    >
                  </div>
                  <div class="inner-item-price">
                    <span stockAdult>${item.stockAdult} </span>
                    <span>x</span>
                    <span class="inner-highlight">
                      ${item.priceNewAdult.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>
                <div class="inner-item">
                  <div class="inner-item-label">Trẻ em:</div>
                  <div class="inner-item-input">
                    <input 
                      value=${item.stockChildren} 
                      min="0" 
                      type="number"
                      stockInput = "stockChildren"
                      tour-id =${item.id}
                    >
                  </div>
                  <div class="inner-item-price">
                    <span stockChildren>${item.stockChildren} </span>
                    <span>x</span>
                    <span class="inner-highlight">
                      ${item.priceNewChildren.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>
                <div class="inner-item">
                  <div class="inner-item-label">Em bé:</div>
                  <div class="inner-item-input">
                    <input 
                      value=${item.stockBaby} 
                      min="0" 
                      type="number"
                      stockInput="stockBaby"
                      tour-id =${item.id}
                    >
                  </div>
                  <div class="inner-item-price">
                    <span stockBaby>${item.stockBaby} </span>
                    <span>x</span>
                    <span class="inner-highlight">
                      ${item.priceNewBaby.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
        )
        //in cart
        const cartList = document.querySelector("[cart-list]")
        cartList.innerHTML = htmlCart.join("")

        //luu cart
        localStorage.setItem("cart",JSON.stringify(data.cart))

        //cap nhat mini cart
        miniCart.innerHTML = data.cart.length
        
        //cap nhat total price
        const total = data.cart.reduce((sum,item) =>{
          if(item.checkItem==true){
            return sum + (item.stockAdult * item.priceNewAdult 
            + item.stockChildren* item.priceNewChildren 
            + item.stockBaby * item.priceNewBaby)
          }else{
            return sum
          }
        },0)
    
        const totalPrice = document.querySelector("[total-price]")
        totalPrice.innerHTML = total.toLocaleString("vi-VN")

        const coupon = 0
        const couponPrice = document.querySelector("[coupon-price]")
        couponPrice.innerHTML = coupon

        const pay = total- coupon
        const payPrice = document.querySelector("[pay-price]")
        payPrice.innerHTML = pay.toLocaleString("vi-VN")
        
        //cap nhat so luong
        const inputList =  document.querySelectorAll("[stockInput]")
        inputList.forEach(input => {
          input.addEventListener("change",()=>{
            const id = input.getAttribute("tour-id")
            const name = input.getAttribute("stockInput")
            const cart = JSON.parse(localStorage.getItem("cart"))
            const itemCart =cart.find(tour => tour.id == id)
            console.log(itemCart)
            itemCart[name] = parseInt(input.value)
            localStorage.setItem("cart",JSON.stringify(cart))
            drawCart()
          })
        });
        
        //xoa san pham trong gio
        const buttonDelete = document.querySelectorAll("[button-delete]")
        buttonDelete.forEach(button => {
          button.addEventListener("click",()=>{
            const id = button.getAttribute("button-delete")
            const cart = JSON.parse(localStorage.getItem("cart"))
            const cartItem = cart.findIndex(item => item.id == id)
            cart.splice(cartItem,1)
            localStorage.setItem("cart",JSON.stringify(cart))
            drawCart()
          })
        });

        //check gio hang
        const checkItem = document.querySelectorAll("[checkItem]")
        checkItem.forEach(check => {
          check.addEventListener("click",()=>{
            const id = check.getAttribute("idTour")
            const cart = JSON.parse(localStorage.getItem("cart"))
            const cartItem = cart.find(item => item.id == id)
            cartItem.checkItem = check.checked
            localStorage.setItem("cart",JSON.stringify(cart))
            drawCart()
          })
        });
      }
    })
  }
} 
const cartList = document.querySelector("[cart-list]")
if(cartList){
  drawCart()
}
// End  cart detail

