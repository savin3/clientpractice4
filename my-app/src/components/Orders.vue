<template>
  <div class="orders">
    <nav class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/cart">Cart</router-link>
      <button @click="logout" class="nav-button">Log out</button>
    </nav>

    <h2>My Orders</h2>

    <div v-if="orders.length === 0" class="empty-orders">
      <p>You haven't placed any orders yet</p>
      <router-link to="/" class="continue-shopping">Go to catalog</router-link>
    </div>
    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <span class="order-id">Order #{{ order.id }}</span>
          <span class="order-price">{{ order.order_price }} ₽</span>
        </div>
        <div class="order-products">
          <div v-for="(productId, index) in order.products" :key="index" class="order-product">
            <span>Product ID: {{ productId }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrdersRequest } from '@/utils/api.js';

export default {
  data() {
    return {
      orders: []
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    if (!this.isAuthenticated) {
      this.$router.push('/login');
      return;
    }
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      getOrdersRequest()
          .then(orders => {
            this.orders = orders;
          });
    },
    logout() {
      this.$store.dispatch('LOGOUT_REQUEST')
          .then(() => {
            this.$router.push('/login');
          });
    }
  }
};
</script>

<style scoped>
.orders {
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
.orders-list {
  margin-top: 30px;
}
.order-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.order-id {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
.order-price {
  font-size: 20px;
  font-weight: bold;
  color: #28a745;
}
.order-products {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.order-product {
  padding: 5px 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  font-size: 14px;
}
.empty-orders {
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
</style>