<template>
  <div class="home">
    <h1>Home page</h1>
    <button @click="logout" class="logout-button">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT_REQUEST')
          .then(() => {
            this.$router.push('/login');
          })
          .catch(() => {
            alert('Exit error');
          });
    }
  }
}
</script>

<style scoped>
.logout-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>