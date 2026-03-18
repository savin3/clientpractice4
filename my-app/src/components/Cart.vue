<template>
  <div class="cart">
    <nav class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/orders">My orders</router-link>
      <button @click="logout" class="nav-button">Log out</button>
    </nav>

    <h2>Cart</h2>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/" class="continue-shopping">Continue shopping</router-link>
    </div>
    <div v-else>
      <div class="cart-items">
        <div v-for="item in groupedCart" :key="item.product_id" class="cart-item">
          <div class="item-image-wrapper">
            <img
                v-if="item.image"
                :src="`http://lifestealer86.ru/${item.image.replace(/\\\//g, '/')}`"
                :alt="item.name"
                class="item-image"
                @error="onImageError"
            />
            <div v-else class="item-image-placeholder">
              <div class="product-initial">{{ getInitial(item.name) }}</div>
            </div>
          </div>

          <div class="cart-item-info">
            <h3>{{ item.name }}</h3>
            <p class="item-description">{{ item.description }}</p>
            <p class="cart-item-price">{{ item.price }} ₽</p>
            <div class="cart-item-actions">
              <button @click="decreaseQuantity(item)" class="quantity-button">&minus;</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="quantity-button">&plus;</button>
              <button @click="removeItem(item)" class="remove-button">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="cart-total">
          <span>Total: </span>
          <span>{{ cartTotal }} ₽</span>
        </div>
        <button @click="checkout" :disabled="processing" class="checkout-button">
          {{ processing ? 'Processing...' : 'Checkout' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      cartItems: [],
      processing: false
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    groupedCart() {
      const grouped = {};
      this.cartItems.forEach(item => {
        if (!grouped[item.product_id]) {
          grouped[item.product_id] = {
            product_id: item.product_id,
            cart_item_id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            quantity: 0,
            total: 0
          };
        }
        grouped[item.product_id].quantity++;
        grouped[item.product_id].total = grouped[item.product_id].quantity * item.price;
      });
      return Object.values(grouped);
    },
    cartTotal() {
      return this.groupedCart.reduce((sum, item) => sum + item.total, 0);
    }
  },
  created() {
    if (!this.isAuthenticated) {
      this.$router.push('/login');
      return;
    }
    this.loadCart();
  },
  methods: {
    getInitial(name) {
      return name ? name.charAt(0).toUpperCase() : 'P';
    },
    onImageError(event) {
      event.target.style.display = 'none';
    },
    async loadCart() {
      const API = "http://lifestealer86.ru/api-shop";
      const token = localStorage.getItem("myAppToken");

      const response = await fetch(`${API}/cart`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();

      if (response.ok) {
        this.cartItems = result.data || [];
      }
    },
    async increaseQuantity(item) {
      const API = "http://lifestealer86.ru/api-shop";
      const token = localStorage.getItem("myAppToken");

      const response = await fetch(`${API}/cart/${item.product_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        await this.loadCart();
        toast.success('Quantity increased');
      } else {
        toast.error('Failed to increase quantity');
      }
    },
    async decreaseQuantity(item) {
      if (item.quantity <= 1) {
        await this.removeItem(item);
        return;
      }

      const API = "http://lifestealer86.ru/api-shop";
      const token = localStorage.getItem("myAppToken");

      const response = await fetch(`${API}/cart/${item.cart_item_id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        await this.loadCart();
        toast.success('Quantity decreased');
      } else {
        toast.error('Failed to decrease quantity');
      }
    },
    async removeItem(item) {
      const API = "http://lifestealer86.ru/api-shop";
      const token = localStorage.getItem("myAppToken");

      const response = await fetch(`${API}/cart/${item.cart_item_id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        await this.loadCart();
        toast.success('Item removed from cart');
      } else {
        toast.error('Failed to decrease quantity');
      }
    },
    async checkout() {
      if (this.processing) return;

      this.processing = true;
      const API = "http://lifestealer86.ru/api-shop";
      const token = localStorage.getItem("myAppToken");

      const response = await fetch(`${API}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Order placed successfully!');
        this.$router.push("/orders");
      } else {
        toast.error('Checkout failed');
      }
      this.processing = false;
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
.cart {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.nav {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
}
.nav a {
  text-decoration: none;
  color: #007bff;
}
.nav-button {
  margin-left: auto;
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
}
.cart-items {
  margin-top: 30px;
}
.cart-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 15px;
  align-items: center;
}
.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
.cart-item-info {
  flex: 1;
  text-align: left;
}
.cart-item-price {
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
  margin: 5px 0;
  text-align: left;
}
.item-description {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
  text-align: left;
}
.cart-item-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.quantity-button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: #f8f9fa;
  border-radius: 5px;
  cursor: pointer;
}
.quantity {
  font-size: 16px;
  min-width: 30px;
  text-align: center;
}
.remove-button {
  margin-left: auto;
  padding: 10px 15px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.cart-summary {
  margin-top: 30px;
  padding: 20px;
  border-top: 2px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart-total {
  font-size: 22px;
  font-weight: bold;
}
.checkout-button {
  padding: 15px 40px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}
.checkout-button:hover {
  background-color: #218838;
}
.checkout-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.checkout-button:hover:not(:disabled) {
  background-color: #218838;
}
.empty-cart {
  text-align: center;
  padding: 50px;
}
.continue-shopping {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}
.continue-shopping:hover {
  background-color: #0056b3;
}
.loading, .error {
  text-align: center;
  padding: 50px;
  font-size: 16px;
}
.error {
  color: #dc3545;
}
.item-image-wrapper {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}
.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}
.item-image-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: #FB8159;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-initial {
  font-size: 40px;
  font-weight: bold;
  color: #FEFEFE;
}
</style>