<template>
<nav>
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Inscription</router-link>
  </nav>
  <main class="container">
    <section>
      <form @submit.prevent="sendDataForm(event)">
        <h1>INSCRIPTION</h1>
        <div>
          <label for="inputUserName">Nom d'utilisateur:</label>
          <input
            v-on:keydown="invalid = false"
            v-model="inputUserName"
            type="text"
            class="form-control"
            id="inputUserName"
            aria-describedby="userNameHelp"
            placeholder="Entrez votre nom"
          />
        </div>
        <div>
          <label for="inputEmail">Email:</label>
          <input
            v-on:keydown="invalid = false"
            v-model="inputEmail"
            type="email"
            class="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            placeholder="votre email"
          />
        </div>
        <div>
          <label for="inputPassword">Choisissez un Mot de passe:</label>
          <input
            v-on:keydown="invalid = false"
            v-model="inputPassword"
            type="password"
            class="form-control"
            id="inputPassword"
            aria-describedby="passwordHelp"
            placeholder="mot de passe"
          />
        </div>
        <button type="submit">S'INSCRIRE</button>
      </form>
    </section>
    <div>
      <router-link to="/login">
        <button>Retour à l'écran de connection</button>
      </router-link>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  name: "Inscription",
  data() {
    return {
      inputUserName: "",
      inputEmail: "",
      inputPassword: "",
      invalid: false,
    };
  },
  methods: {
    sendDataForm() {
      axios
        .post("http://localhost:3000/api/user/signup", {
          username: this.inputUserName,
          email: this.inputEmail,
          password: this.inputPassword,
        })
        .then(() => {
          alert("Inscription réussie, redirection vers le module de connexion");
          router.push({ path: "/login" });
        })
        .catch((error) => {
          alert(error.status);
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>