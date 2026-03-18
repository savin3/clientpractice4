<template>
  <div class="register-page">
    <div class="register-container">
      <form class="register" @submit.prevent="register">
        <h1>Sign up</h1>

        <label>Full name</label>
        <input type="text"
               required
               v-model="fio"
               :class="{ 'error': errors.fio}"
               placeholder="Savin Ilya Romanovich"
        />
        <span v-if="errors.fio" class="error-message"> {{ errors.fio }} </span>

        <label>Email</label>
        <input type="email"
               required
               v-model="email"
               :class="{ 'error': errors.email }"
               placeholder="savinilysha@gmail.com"
        />
        <span v-if="errors.email" class="error-message"> {{ errors.email }} </span>

        <label>Password</label>
        <input
            type="password"
            required
            v-model="password"
            :class="{ 'error': errors.password }"
            placeholder="Minimum of 6 characters"
        />
        <span v-if="errors.password" class="error-message"> {{ errors.password }} </span>

        <label>Password confirmation</label>
        <input type="password"
               required
               v-model="confirmPassword"
               :class="{ 'error': errors.confirmPassword }"
               placeholder="Repeat your password"
        />
        <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>

        <button type="submit">Sign up</button>
        <button type="button" @click="$router.push('/')" class="back-button">Back</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fio: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {
        fio: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    validateForm() {
        this.errors = {
          fio: "",
          email: "",
          password: "",
          confirmPassword: ""
        };

        let isValid = true;

        if (!this.fio.trim()) {
          this.errors.fio = "Enter your full name";
          isValid = false;
        }

        if (!this.email.trim()) {
          this.errors.email = "Enter your email";
          isValid = false;
        } else if (!this.email.includes('@')) {
          this.errors.email = "Incorrect email";
          isValid = false;
        }

        if (!this.password) {
          this.errors.password = "Enter password";
          isValid = false;
        } else if (this.password.length < 6) {
          this.errors.password = "Minimum of 6 characters";
          isValid = false;
        }

        if (!this.confirmPassword) {
          this.errors.confirmPassword = "Confirm the password";
          isValid = false;
        } else if (this.password !== this.confirmPassword) {
          this.errors.confirmPassword = "Passwords don't match";
          isValid = false;
        }

        return isValid;
      },
    register() {
      if (this.validateForm()) {
        const userData = {
          fio: this.fio,
          email: this.email,
          password: this.password,
        };

        this.$store
            .dispatch('REGISTER_REQUEST', userData)
            .then(() => {
              this.$router.push('/login');
            })
            .catch((error) => {
              if (error && error.error && error.error.code === 422) {
                const serverErrors = error.error.errors || {};

                this.errors = {
                  fio: serverErrors.fio ? serverErrors.fio[0] : "",
                  email: serverErrors.email ? serverErrors.email[0] : "",
                  password: serverErrors.password ? serverErrors.password[0] : "",
                  confirmPassword: serverErrors.password ? "Check the password" : "",
                };
              } else {
                alert('Registration error. Try again later.');
              }
            });
      }
    }
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
}

.register {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 30px;
}

.register h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.register label {
  text-align: left;
  margin-bottom: 5px;
  display: block;
}

.register input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  margin-bottom: 15px;
  box-sizing: border-box;
}

.register input:focus {
  outline: none;
  border-color: #007bff;
}

.register button {
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

.register button:hover {
  background-color: #0056b3;
}

.register .back-button {
  background-color: #f08080;
  margin-top: 10px;
  box-sizing: border-box;
}

.register .back-button:hover {
  background-color: #dc143c;
}

hr {
  margin: 20px 0;
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