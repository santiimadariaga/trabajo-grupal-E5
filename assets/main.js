const productsContent = document.querySelector(".container_populares");
const product = document.getElementById("product");
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
    </div> `;
};

const renderFilteredProducts = (category) => {
  const productsList = productsData.filter((product) => {
    product.category === category;
  });
  productsContent.innerHTML = productsList.map(renderProduct).join("");
};

const renderPopularProducts = (popular) => {
  const productsList = productsData.filter(
    (product) => product.popular === true
  );
  productsContent.innerHTML = productsList.map(renderProduct).join("");
};

const renderProducts = (popular = undefined, category = undefined) => {
  if (!category) {
    renderPopularProducts(popular);
    return;
  }
  renderFilteredProducts(category);
};

const changeActiveState = (e) => {
  const categories = [...categoriesContent];
  const selectedCategory = e.target.dataset.category;

  categories.forEach((categoryCard) => {
    if (categoryCard.dataset.category != selectedCategory) {
      categoryCard.classList.remove("active");
      return;
    }
    categoryCard.classList.add("active");
  });
};

const applyFilter = (e) => {
  //   console.log(e.target.classList.contains("card_category"));
  if (!e.target.classList.contains("card_category")) return;
  changeActiveState(e);
  if (!e.target.dataset.category) {
    productsContent.innerHTML = "";
    renderProducts();
  }
};

const init = () => {
  renderProducts();
  categoriesContent.addEventListener("click", applyFilter);
};

init();
