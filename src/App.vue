<template>
  <div class="logo">
    <div v-if= "this.currentUser !== null">
      <router-link to="/feed"><img id="logo" alt="Vue logo" src="./assets/logo.png" /></router-link>
    </div >
    <div v-else>
      <router-link  to="/login"><img id="logo" alt="Vue logo" src="./assets/logo.png" /></router-link> 
    </div>
  </div>
<router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.logo{
  display:flex;
  justify-content: center;
}
#logo {
  height:12em;
  margin-bottom: 2em;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  text-decoration: none;
  color: #999;
}
</style>
