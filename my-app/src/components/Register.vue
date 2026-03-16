<template>
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

    <hr />

    <button type="submit">Sign up</button>
    <button type="button" @click="$router.push('/')" class="back-button">Back</button>
  </form>
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
};
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  margin: 0 auto;
}
.register input,
button {
  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
}
hr {
  margin: 10px 0;
}
.back-button {
  margin-top: 10px;
  background-color: #6c757d;
  color: white;
}
input.error {
  border-color: red !important;
  background-color: #fff0f0;
}
.error-message {
  color: red;
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: 10px;
  display: block;
}
.back-button {
  margin-top: 10px;
  background-color: #6c757d;
  color: white;
}
</style>