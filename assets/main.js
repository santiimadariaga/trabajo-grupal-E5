const products = document.getElementById("product");
const categoriesContent = document.querySelector(".container_categories");
const categories = document.querySelectorAll(".card_category");
// - precio total del carrito
const totalPrice = document.getElementById("total");
const buyBtn = document.querySelector(".buy_btn");
const productAdd = document.getElementById("btn_add");
const cartBtn = document.getElementById("icon-cart");
const cartList = document.getElementById("cartList");
const contentProducts = document.querySelector(".content_cart_products");
const closeCart = document.querySelector(".check-out");
const viewMore = document.getElementById("viewMore");
const overlay = document.getElementById("overlay");

let cart = JSON.parse(localStorage.getItem(`cart`)) || [];

const saveToLocalStorage = (cartList) => {
  localStorage.setItem(`cart`, JSON.stringify(cartList));
};

const renderProduct = (product) => {
  const { id, img, name, descr, price } = product;

  return `
    <div class="card-populares hov" id="product">
        <div class="img_popular">
            <img src=${img} alt=${name}>
        </div>
        <div class="content_text_cards">
          <div class="text-populares">
              <p class="text_two">${name}</p>
              <p class="opacity">${descr}</p>
              <p class="price_card">$ ${price}</p>

          </div>
          <div class="btn">
              <button class="btn_add" id="btn_add"
              data-id="${id}"
              data-name="${name}"
              data-descr="${descr}"
              data-price="${price}"
              data-img="${img}">Agregar</button>
          </div>
        </div>
    </div> `;
};

const renderFilteredProducts = (e) => {
  const selectedCategory = e.target.dataset.category;

  categories.forEach((categoryCard) => {
    if (categoryCard.dataset.category != selectedCategory) {
      categoryCard.classList.remove("active");
      return;
    }
    categoryCard.classList.add("active");
  });

  if (selectedCategory) {
    const productsList = productsData.filter((products) => {
      return products.category === selectedCategory;
    });
    products.innerHTML = productsList.map(renderProduct).join("");
  } else {
    renderPopularProducts();
  }
};

const renderPopularProducts = () => {
  const productsList = productsData.filter((products) => {
    return products.popular === true;
  });
  products.innerHTML = productsList.map(renderProduct).join("");
};

// const renderProducts = (e) => {
//   if (!e.target.classList.contains("card_category")) {
//     return;
//   }
//   renderFilteredProducts();
// };

// const changeActiveState = (e) => {
//   const selectedCategory = e.target.dataset.category;

//   categories.forEach((categoryCard) => {
//     if (categoryCard.dataset.category != selectedCategory) {
//       categoryCard.classList.remove("active");
//       return;
//     }
//     categoryCard.classList.add("active");
//   });
// };

// const applyFilter = (e) => {
//   if (!e.target.classList.contains("card_category")) return;
//   changeActiveState(e);
//   if (!e.target.dataset.category) {
//     products.innerHTML = "";
//     renderFilteredProducts();
//   }
// };

/* ABRIR Y CERRAR CARRITO */

const toggleCart = () => {
  cartList.classList.remove("none");
  cartList.classList.toggle("open_cart");
  overlay.classList.add("overlay");
  if (!cartList.classList.contains("open_cart")) {
    cartList.classList.add("none");
    overlay.classList.remove("overlay");
  }
};

const closeOnOverlayClick = () => {
  cartList.classList.add("none");
  overlay.classList.remove("overlay");
};

const closeOnCloseButton = () => {
  cartList.classList.add("none");
  overlay.classList.remove("overlay");
};

/* AGREGADO DE PRODUCTOS Y MANEJO DEL CARRITO */

const renderCartProduct = (cartProduct) => {
  const { id, name, img, descr, price, quantity } = cartProduct;

  return `
  <div class="cart_products">
    <div class="product_img">
        <img src=${img} alt=${name} />
    </div>
    <div class="product_text">
      <p class="product_name">${name}</p>
      <p class="opacity">${descr}</p>
      <p class="product_price">$ ${price}</p>
    </div>
    <div class="product_button">
      <button class="minus">
        <p class="pos" data-id=${id}>-</p>
      </button>
        <p class="quantity">${quantity}</p>
      <button>
        <p class="pos_two" data-id=${id}>+</p>
      </button>
    </div>
  </div>
  `;
};

const renderCart = () => {
  // Si el carrito está vacío
  if (!cart.length) {
    contentProducts.innerHTML = `<p class="opacity">No hay nada para mostrar aquí.</p>`;
    return;
  }
  // Renderizamos lo que haya
  contentProducts.innerHTML = cart.map(renderCartProduct).join("");
};

const getCartTotal = () => {
  return cart.reduce(
    (acc, cur) => acc + Number(cur.price) * Number(cur.quantity),
    0
  );
};

const showTotal = () => {
  total.textContent = `$ ${Number(getCartTotal()).toFixed(2)}`;
};

const disabledBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
    return;
  }
  btn.classList.remove("disabled");
};

/* AÑADIDO DE PRODUCTOS */

const createProductData = (id, name, descr, price, img) => {
  return { id, name, descr, price, img };
};

const isExistingCartProduct = (product) => {
  return cart.find((item) => {
    item.id === product.id;
  });
};

const addUnitToProduct = (product) => {
  cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn_add")) return;

  console.log(e.target.classList.contains("btn_add"));

  const { id, name, descr, price, img } = e.target.dataset;

  const product = createProductData(id, name, descr, price, img);

  // El producto existe en el carrito
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
  } else {
    // El producto no existe
    createCartProduct(product);
  }
  saveToLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disabledBtn(buyBtn);
};

const init = () => {
  renderPopularProducts();
  categoriesContent.addEventListener("click", renderFilteredProducts);
  cartBtn.addEventListener("click", toggleCart);
  overlay.addEventListener("click", closeOnOverlayClick);
  closeCart.addEventListener("click", closeOnCloseButton);
  viewMore.addEventListener("click", closeOnCloseButton);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showTotal);
  products.addEventListener("click", addProduct);
  disabledBtn(buyBtn);
};

init();
