let products = [
  {
    id: 1,
    name: "Headphones",
    price: 2999,
    category: "electronics",
    rating: 4.5,
    img: "https://vlebazaar.in/image/cache/catalog/omseller-img/OB07R2BNDMH/810x8VKZbyL._SL1500_-1200x1200h.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 4999,
    category: "electronics",
    rating: 4.2,
    img: "https://vlebazaar.in/image/cache/catalog/GOBOULT-Newly-Launched-Drift-Max-Smartwatch-201HD-ScreenBT-Calling-52-35/GOBOULT-Newly-Launched-Drift-Max-Smartwatch-201HD-ScreenBT-Calling-52-350Nits-Br-1200x1200.jpg",
  },
  {
    id: 3,
    name: "T-Shirt",
    price: 999,
    category: "fashion",
    rating: 4.0,
    img: "https://assets.digitalcontent.marksandspencer.app/image/upload/w_1024,q_auto,f_auto/SD_01_T41_7719_Y0_X_EC_0",
  },
  {
    id: 4,
    name: "Shoes",
    price: 1999,
    category: "fashion",
    rating: 4.8,
    img: "https://media-ea.landmarkshops.in/cdn-cgi/image/h=831,w=615,q=85,fit=cover/max-new/1000015337780-Beige-BEIGE-1000015337780_01-2100.jpg",
  },

  {
    id: 5,
    name: "LED TV",
    price: 1999,
    category: "electronics",
    rating: 3.8,
    img: "https://www.99acres.com/microsite/wp-content/blogs.dir/6161/files/2023/07/Backlit-TV-Wall-LED-Panel.jpg",
  },

  {
    id: 6,
    name: "i phone 16 pro",
    price: 59999,
    category: "electronics",
    rating: 4.2,
    img: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large_2x.jpg",
  },
  {
    id: 7,
    name: "jeans",
    price: 2999,
    category: "fashion",
    rating: 4.8,
    img: "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/31798526/2024/12/7/c6d3f2bc-c849-4d1a-a841-751924b5cbac1733549511845-DENIMLOOK-Men-Relaxed-Fit-Stretchable-Jeans-5261733549511487-1.jpg",
  },
  {
    id: 8,
    name: "crocs",
    price: 599,
    category: "fashion",
    rating: 5.0,
    img: "https://storage.googleapis.com/bitr-cdn/wp-content/uploads/2023/10/crocs-echo-clog-feature.jpeg",
  },
  {
    id: 9,
    name: "laptop HP",
    price: 1999,
    category: "electronics",
    rating: 3.8,
    img: "https://cdn.mos.cms.futurecdn.net/pyL3b8cis5dcmUvgbe9ygV.jpg",
  },
  {
    id: 10,
    name: "saries",
    price: 9999,
    category: "fashion",
    rating: 4.0,
    img: "https://i.pinimg.com/736x/5c/49/33/5c4933e8cfd98ef78ccb65feabe546de.jpg",
  },
  {
    id: 11,
    name: "tablet",
    price: 3999,
    category: "electronics",
    rating: 6.8,
    img: "https://th.bing.com/th/id/R.0a4319b8a417cee74c6ba43da895d6b6?rik=4FO6SWydOlC0Yg&riu=http%3a%2f%2fcdn.arstechnica.net%2fwp-content%2fuploads%2f2012%2f08%2fXperia-Tablet-S.jpg&ehk=lQOgHfYSpEqWfkD%2fO9ZtijLXYeckg5DA7OKWj53sG%2b8%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 12,
    name: "kada for mens",
    price: 699,
    category: "fashion",
    rating: 5.8,
    img: "https://styles.redditmedia.com/t5_7sq480/styles/communityIcon_d8306cz5l7da1.png",
  },
];
let cartCount = 0,
  total = 0;
let filtered = [...products];

// DISPLAY
function display(data) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  data.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `

      <img src="${p.img}" onclick="openModal('${p.img}','${p.name}',${p.price})">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>⭐ ${p.rating}</p>
      <button onclick="addToCart(${p.price})">Add</button>
    `;

    container.appendChild(card);
  });
}

// CART
function addToCart(price) {
  cartCount++;
  total += price;

  document.getElementById("cartCount").innerText = cartCount;
  document.getElementById("totalPrice").innerText = total;

  showToast("Added to cart");
}

// SEARCH
document.getElementById("search").oninput = (e) => {
  let val = e.target.value.toLowerCase();
  filtered = products.filter((p) => p.name.toLowerCase().includes(val));
  display(filtered);
};

// FILTER
document.getElementById("category").onchange = (e) => {
  let cat = e.target.value;
  filtered =
    cat === "all" ? products : products.filter((p) => p.category === cat);
  display(filtered);
};

// SORT
document.getElementById("sort").onchange = (e) => {
  let type = e.target.value;
  if (type === "low") filtered.sort((a, b) => a.price - b.price);
  if (type === "high") filtered.sort((a, b) => b.price - a.price);
  if (type === "rating") filtered.sort((a, b) => b.rating - a.rating);
  display(filtered);
};

// MODAL
function openModal(img, name, price) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalImg").src = img;
  document.getElementById("modalTitle").innerText = name;
  document.getElementById("modalPrice").innerText = "₹" + price;
}

document.getElementById("close").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

// TOAST
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 2000);
}

// INIT
display(products);
