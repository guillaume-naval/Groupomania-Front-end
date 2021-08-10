<template>
  <img id="logo" alt="Vue logo" src="./assets/logo.png" />
  
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#logo {
  width: 20em;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
  color: #999;
}
</style>
