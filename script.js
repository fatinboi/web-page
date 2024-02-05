document.addEventListener('DOMContentLoaded', function() {
  showProducts('men'); // Show Men products by default
});

async function fetchProducts(category) {
  try {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await response.json();
    
    if (data && data[category] && Array.isArray(data[category])) {
      return data[category];
    } else {
      console.error('Invalid or missing data for category:', category);
      return [];
    }
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

async function showProducts(category) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  const selectedTab = document.querySelector(`.tab[data-category="${category}"]`);
  selectedTab.classList.add('active');

  const productsContainer = document.getElementById('productsContainer');
  productsContainer.innerHTML = ''; // Clear previous products

  const products = await fetchProducts(category);

  if (Array.isArray(products)) {
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';

      const productImage = document.createElement('img');
      productImage.className = 'product-image';
      productImage.src = product.image;

      const badge = document.createElement('div');
      badge.className = 'badge';
      badge.textContent = product.badge;

      const productTitle = document.createElement('h3');
      productTitle.textContent = product.title;

      const vendorName = document.createElement('p');
      vendorName.textContent = `Vendor: ${product.vendor}`;

      const price = document.createElement('p');
      price.textContent = `Price: $${product.price}`;

      const compareAtPrice = document.createElement('p');
      compareAtPrice.textContent = `Compare at Price: $${product.compareAtPrice || 0}`;
      compareAtPrice.style.textDecoration = 'line-through';
      compareAtPrice.style.color = '#888';

      const discountPercentage = document.createElement('p');
      discountPercentage.textContent = `Discount: ${calculateDiscountPercentage(product.price, product.compareAtPrice)}% off`;
      discountPercentage.style.color = 'red-orange';

      const addToCartButton = document.createElement('button');
      addToCartButton.className = 'button';
      addToCartButton.textContent = 'Add to Cart';

      productCard.appendChild(productImage);
      productCard.appendChild(badge);
      productCard.appendChild(productTitle);
      productCard.appendChild(vendorName);
      productCard.appendChild(price);
      productCard.appendChild(compareAtPrice);
      productCard.appendChild(discountPercentage);
      productCard.appendChild(addToCartButton);

      productsContainer.appendChild(productCard);
    });
  } else {
    console.error('Invalid data structure for products:', products);
  }
}
