<template>
   <main>
     <nav>
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Inscription</router-link>
  </nav>
        <section>  
            <form @submit.prevent="login">
                <h1>CONNEXION</h1>
                <div class="form-group mt-3">
                    <label for="inputEmail">Email:</label>
                    <input v-on:keydown="isInvalid = false" v-model="inputEmail" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="votre email">
                </div>
                <div class="form-group mt-3">
                    <label for="inputPassword">Mot de passe:</label>
                    <input v-on:keydown="isInvalid = false" v-model="inputPassword" type="password" class="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="votre mot de passe">                        
                </div>
                <button type="submit">SE CONNECTER</button>
            </form>
        </section>
        <div v-show="isInvalid" key="invalid">
            Veuillez vérifier vos informations de connexion.
        </div>  
        <router-link to="/register">Pas de compte ? S'incrire</router-link>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  data() {
    return {
      inputEmail: "",
      inputPassword: "",
      isInvalid: false,
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/user/login", {
          email: this.inputEmail,
          password: this.inputPassword,
        })
        .then(function (res) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("username", res.data.userame);
          localStorage.setItem("role", res.data.isAdmin);
          window.alert(
            "connexion réussie, redirection vers la page principale"
          );
          router.push({ path: "/profil" });
        })
        .catch((error) => {
          this.isInvalid = true;
          console.log(error);
        });
    },
  },
};
</script>
