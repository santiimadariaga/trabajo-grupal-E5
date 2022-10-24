const products = document.getElementById("product");
// - precio total del carrito
const categoriesContent = document.querySelector(".container_categories");
const categories = document.querySelectorAll(".card_category");
const buyAdd = document.querySelector(".btn_add");
const cartBtn = document.getElementById("icon-cart");
// - el contenedor del carrito en sí
// const cartMenu = document.getElementById("");
// - overlay

let cart = JSON.parse(localStorage.getItem(`cart`)) || [];

const saveToLocalStorage = (cartList) => {
  localStorage.setItem(`cart`, JSON.stringify(cartList));
};

/*

- Al tocar la categoria: 
    - Cambiar el active
    - Renderizar ESA categforia FILTRADA

id: 1,
    category: "pizzas",
    img: "./assets/images/Photo Menu (1).png",
    name: "Mr.Pit",
    descr: "Solo para expertos",
    price: 350,
    popular
*/

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

  const productsList = productsData.filter((products) => {
    return products.category === selectedCategory;
  });
  products.innerHTML = productsList.map(renderProduct).join("");
};

const renderPopularProducts = () => {
  const productsList = productsData.filter((products) => {
    return products.popular === true;
  });
  products.innerHTML = productsList.map(renderProduct).join("");
};

// const renderProducts = (e) => {
//   // const selectedCategory = e.target.dataset.category;

//   if (e.target.dataset.category === productsData.popular) {
//     renderPopularProducts();
//     return;
//   }
//   renderFilteredProducts();
// };

// const changeActiveState = (e) => {
//   const categories = [...categoriesContent];
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
//   console.log(e.target.classList.contains("card_category"));
//   if (!e.target.classList.contains("card_category")) return;
//   changeActiveState(e);
//   if (!e.target.dataset.category) {
//     productsContent.innerHTML = "";
//     renderProducts();
//   }
// };

const init = () => {
  renderPopularProducts();
  categoriesContent.addEventListener("click", renderFilteredProducts);
};

init();
