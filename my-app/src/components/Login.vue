<template>
  <div class="login-page">
    <div class="login-container">
      <form class="login" @submit.prevent="login">
        <h1>Sign in</h1>
        <label>User name</label>
        <input
            type="text"
            required
            v-model="username"
            :class="{ 'error': errors.username }"
        />
        <span v-if="errors.username" class="error-message">{{ errors.username }}</span>

        <label>Password</label>
        <input
            type="password"
            required
            v-model="password"
            :class="{ 'error': errors.password }"
        />
        <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        <button type="submit">Login</button>
      </form>

      <p class="register-link">
        Don't have an account? <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
}

.login {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 30px;
}

.login h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.login label {
  text-align: left;
  margin-bottom: 5px;
  display: block;
}

.login input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  margin-bottom: 15px;
  box-sizing: border-box;
}

.login input:focus {
  outline: none;
  border-color: #007bff;
}

.login button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  box-sizing: border-box;
}

.login button:hover {
  background-color: #0056b3;
}

.register-link {
  text-align: center;
  margin-top: 20px;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

input.error {
  border-color: red;
  background-color: #fff0f0;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
  display: block;
}
</style>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errors: {
        username: "",
        password: ""
      }
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
            if (error && error.error && error.error.code === 401) {
              this.errors = {
                username: "Invalid email or password",
                password: "Invalid email or password"
              };
            }
          });
    },
  },
};
</script>