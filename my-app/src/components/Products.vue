<template>
  <div class="products">
    <nav class="nav">
      <router-link to="/">Home</router-link>
      <template v-if="isAuthenticated">
        <router-link to="/cart">Cart</router-link>
        <router-link to="/orders">My orders</router-link>
        <button @click="logout" class="nav-button">Log out</button>
      </template>
      <template v-else>
        <router-link to="/login">Log in</router-link>
        <router-link to="/register">Registration</router-link>
      </template>
    </nav>

    <h2>Product catalog</h2>

    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img
            v-if="product.image"
            :src="`http://lifestealer86.ru/${product.image.replace(/\\\//g, '/')}`"
            :alt="product.name"
            class="product-image"
            @error="onImageError"
        />
        <h3>{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price }} ₽</p>
        <button v-if="isAuthenticated" @click="addToCart(product.id)" class="add-to-cart-button">
          Add for cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { productsRequest, addToCartRequest } from '@/utils/api.js';
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      products: [],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      productsRequest()
          .then(products => {
            this.products = products;
          });
    },
    onImageError(event) {
      event.target.style.display = 'none';
    },
    addToCart(productId) {
      addToCartRequest(productId)
          .then(() => {
            toast.success('Product added to cart');
          })
          .catch(() => {
            toast.error('Failed to add product');
          });
    },
    logout() {
      this.$store.dispatch('LOGOUT_REQUEST')
          .then(() => {
            this.$router.push('/login');
          });
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 50px;
}
.products {
  padding: 80px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.nav-button {
  margin-left: auto;
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 50px;
  align-items: stretch;
}
.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px dashed #000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}
.product-description {
  font-size: 14px;
  color: #666;
  margin: 10px 0;
  flex-grow: 1;
}
.product-price {
  font-weight: bold;
  color: #28a745;
  font-size: 18px;
  margin: 10px 0;
}
.add-to-cart-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;
}
.add-to-cart-button:hover {
  background-color: #0056b3;
}
.loading {
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
}
</style>