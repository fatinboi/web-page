// script.js
document.addEventListener('DOMContentLoaded', function() {
  showProducts('men'); // Show Men products by default
});

async function fetchProducts(category) {
  try {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await response.json();
    return data[category];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function calculateDiscountPercentage(price, compareAtPrice) {
  if (compareAtPrice && price < compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return discount.toFixed(2);
  }
  return 0;
}

function showProducts(category) {
  // Update tab styles
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  document.getElementById(`${category}Tab`).classList.add('active');

  const productsContainer = document.getElementById('productsContainer');
  productsContainer.innerHTML = ''; // Clear previous products

  const products = fetchProducts(category);

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const productImage = document.createElement('img');
    productImage.className = 'product-image';
    productImage.src = product.image;

    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = product.badge;

    const productDetails = document.createElement('div');
    productDetails.className = 'product-details';

    const productTitle = document.createElement('h3');
    productTitle.className = 'product-title';
    productTitle.textContent = product.title;

    const vendorName = document.createElement('p');
    vendorName.className = 'vendor-name';
    vendorName.textContent = `Vendor: ${product.vendor}`;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `Price: $${product.price}`;

    const compareAtPrice = document.createElement('p');
    compareAtPrice.className = 'compare-at-price';
    compareAtPrice.textContent = `Compare at Price: $${product.compareAtPrice || 0}`;

    const discountPercentage = document.createElement('p');
    discountPercentage.className = 'discount';
    discountPercentage.textContent = `Discount: ${calculateDiscountPercentage(product.price, product.compareAtPrice)}% off`;

    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'add-to-cart';
    addToCartButton.textContent = 'Add to Cart';

    productCard.appendChild(productImage);
    productCard.appendChild(badge);
    productCard.appendChild(productDetails);
    productDetails.appendChild(productTitle);
    productDetails.appendChild(vendorName);
    productDetails.appendChild(price);
    productDetails.appendChild(compareAtPrice);
    productDetails.appendChild(discountPercentage);
    productDetails.appendChild(addToCartButton);

    productsContainer.appendChild(productCard);
  });
}
