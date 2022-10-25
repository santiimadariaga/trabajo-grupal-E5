const products = document.getElementById("product");
const categoriesContent = document.querySelector(".container_categories");
const categories = document.querySelectorAll(".card_category");
// - precio total del carrito
const buyAdd = document.querySelector(".btn_add");
const cartBtn = document.getElementById("icon-cart");
const cartList = document.getElementById("cartList");
const overlay = document.getElementById("overlay");
// - el contenedor del carrito en sí
// const cartMenu = document.getElementById("");
// - overlay

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
              <button class="btn_add"
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
  // } else if (selectedCategory === "popular") {
  //   products.innerHTML = "";
  //   renderPopularProducts();
  // console.log(selectedCategory === "popular");
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

const init = () => {
  renderPopularProducts();
  categoriesContent.addEventListener("click", renderFilteredProducts);
  cartBtn.addEventListener("click", toggleCart);
  overlay.addEventListener("click", closeOnOverlayClick);
};

init();
