<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #e0f2f1;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 10px;
  background-color: #b0d2d2;
  border-radius: 5px;
}

nav a {
  text-decoration: none;
  font-weight: bold;
  color: #007bff;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
