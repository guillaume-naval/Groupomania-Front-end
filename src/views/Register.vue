<template>
  <main class="container">
    <section>
      <form @submit.prevent="sendDataForm(event)" >
        <h1>INSCRIPTION</h1>
        <div>
          <label for="inputUsername">Nom d'utilisateur:</label>
          <input
            v-on:keydown="invalid = false"
            v-model="inputUsername"
            type="text"
            aria-describedby="usernameHelp"
            placeholder="Entrez votre nom"
            
          />
        </div>
        <div>
          <label for="inputEmail">Email:</label>
          <input
            v-on:keydown="invalid = false"
            v-model="inputEmail"
            type="email"
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
            id="inputPassword"
            aria-describedby="passwordHelp"
            placeholder="mot de passe"
            autocomplete="new-password"
          />
        </div>
        <button type="submit">S'INSCRIRE</button>
        
      </form>
      <router-link to="/login">
          <button>Retour à l'écran de connection</button>
      </router-link>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  name: "Inscription",
  data() {
    return {
      inputUsername: "",
      inputEmail: "",
      inputPassword: "",
      invalid: false,
    };
  },
  methods: {
    sendDataForm() {
      axios
        .post("http://localhost:3000/api/user/signup", {
          username: this.inputUsername,
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

<style scoped>
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
}
.container{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
form{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form div{
  display:flex;
  flex-direction: column;
  width:100%;
}
input{
  border:none;
  padding:0.5em;
  margin-bottom:1em;
  width: 100%;
  border: 0.05em solid rgba(0, 0, 0, 0.267);
  color:#2c3e50;
}
button{
  border:none;
  background-color:#fd2d01;
  color:white;
  font-weight: 600;
  width: 100%;
  margin-bottom: 1em;
  padding: 1em 0em 1em 0em;
}
h1{
  margin-bottom: 1em;
}
</style>