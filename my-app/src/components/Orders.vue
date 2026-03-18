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
import { toast } from 'vue3-toastify';

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
            if (orders.length === 0) {
              toast.info('No orders found');
            }
          })
          .catch(() => {
            toast.error('Failed to load orders');
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
.nav-button {
  margin-left: auto;
  background: none;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  font-weight: 500;
}
.nav-button:hover {
  opacity: 0.8;
}
.orders-list {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.order-card {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
  transition: transform 0.2s;
}
.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}
.order-id {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  background: #f8f9fa;
  padding: 5px 15px;
  border-radius: 20px;
}
.nav-button {
  margin-left: auto;
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
}
.order-price {
  font-size: 24px;
  font-weight: bold;
  color: #28a745;
  background: #e8f5e9;
  padding: 5px 20px;
  border-radius: 25px;
}
.order-products {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.order-product {
  padding: 8px 15px;
  background-color: #f0f7ff;
  border-radius: 20px;
  font-size: 14px;
  color: #2c3e50;
  border: 1px solid #d4e4f5;
}
.empty-orders {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-top: 30px;
}
.empty-orders p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}
.continue-shopping {
  display: inline-block;
  padding: 12px 30px;
  background-color: #98d4d1;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  transition: background-color 0.3s;
}
.continue-shopping:hover {
  background-color: #7ac0bd;
}
h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 28px;
  text-align: left;
}
</style>