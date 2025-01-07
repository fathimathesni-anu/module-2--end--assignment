
const productsContainer = document.getElementById('products');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const highlightedProduct = document.getElementById('highlighted-product');
const highlightedImg = document.getElementById('highlighted-img');
const highlightedTitle = document.getElementById('highlighted-title');
const highlightedDescription = document.getElementById('highlighted-description');
const highlightedPrice = document.getElementById('highlighted-price');

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function displayProducts(products) {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className =  'col-sm-6 col-md-4 col-lg-2 mb-4';
    productCard.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: contain;">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">$${product.price}</p>
          <button class="btn btn-danger btn-block " onclick="viewProduct('${product.id}) ">Add To Cart</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(productCard);
  });
}

async function searchProducts() {
  const query = searchInput.value.toLowerCase();
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(query)
    );

    if (filteredProducts.length > 0) {
      const product = filteredProducts[0];
      displayHighlightedProduct(product);
    } else {
      highlightedProduct.style.display = 'none';
      alert('No products found');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function displayHighlightedProduct(product) {
  highlightedImg.src = product.image;
  highlightedTitle.textContent = product.title;
  highlightedPrice.innerHTML = product.price;
  highlightedDescription.textContent = product.description;
  highlightedProduct.style.display = 'block';
}

function viewProduct(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => displayHighlightedProduct(product))
    .catch(error => console.error('Error fetching product:', error));
}

searchButton.addEventListener('click', searchProducts);

// Fetch and display products on page load
fetchProducts();