<template>
  <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>User name</label>
    <input type="text" required v-model="username" />
    <label>Password</label>
    <input type="password" required v-model="password" />
    <hr />
    <button type="submit">Login</button>
  </form>

  <p class="register-link">
    Don't have an account? <router-link to="/register">Sign up</router-link>
  </p>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  margin: 0 auto;
}
.login input,
button {
  border: 1px solid black;
  border-radius: 5px;
}
.login label {
  margin-top: 10px;
  text-align: left;
  margin-bottom: 5px;
}
hr {
  margin: 10px 0;
}
.register-link {
  text-align: center;
  margin-top: 15px;
}
</style>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const userData = {
        email: this.username,
        password: this.password,
      };

      this.$store
          .dispatch('AUTH_REQUEST', userData)
          .then(() => this.$router.push("/"))
          .catch(error => {
            console.log("Ошибка:", error);
            alert('Неверный email или пароль');
          });
    },
  },
};
</script>