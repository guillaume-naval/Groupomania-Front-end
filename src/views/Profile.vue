
<template>
    <main>
    <!-- Profil -->
    <section v-if="user.createdAt">
      <h1>Bonjour {{user.username}} !</h1>
    <form>
      <div class="profile__img">
        <img v-if="user.imageUrl" :src="user.imageUrl"   alt="image postée" />
      </div>
      <div class="profile__date">
        <h2>Informations</h2>
        <p>Membre depuis le {{ user.createdAt.slice(0,10) }}</p>
      </div>
      <div class="profile__bio">
        <h2>Bio</h2>
        <p >{{ user.bio }}</p>
      </div>
    </form>
      <!-- Changer son mot de passe -->
      <div id="changePassword">
        <form method="POST" @submit.prevent="submitNewPassword">
          <div title="Votre mot de passe doit contenir: au moins 6 caractères, au moins une lettre en minuscule,
           au moins une lettre en majuscule, au moins un nombre.">
            <h2 for="newPassword">Changer le mot de passe</h2>
            <input type="password" class="form-control" id="newPassword" name="newPassword"
              placeholder="Nouveau mot de passe"
              v-model="password"
            />
          </div>
          <button type="submit" class="btn btn-secondary">
            Remplacer
          </button>
        </form>
      </div>
      <!-- Supprimer son compte -->
      <div class="delete__section">
          <p class="italic">Depuis cette page vous pouvez supprimer votre compte. La suppression de votre compte entrainera également la suppression de tous les commentaires et les images que vous avez postés.</p>
          <button class="delete__account" @click="deleteMyAccount(id)">SUPPRIMER VOTRE COMPTE</button>
      </div>
    </section>
    
  </main>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
    name: "Profile",
    data() {
        return {
            isAdmin: "",
            nameCurrentUser: "",
            creation: "",
            id: "",
            bio:"",
            user:[],
        }
    },
    created: function() { 
      var vm = this;
        let id = localStorage.getItem('userId');
         axios.get("http://localhost:3000/api/user/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            vm.user = res.data;
            console.log(this.user) 
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        updateProfile () {
          let id = localStorage.getItem('userId');
          axios.put('http://localhost:3000/api/user/' + id,
                  {
                      username: this.username,
                      email: this.email,
                      bio: this.bio,
                      password:this.password,
                      imageUrl: this.imageUrl
                  },
                  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
              .then(res => {
                  console.log(res);
                  alert('Modification du profil réussie!')
              })
              .catch((error) => { 
                    console.log(error)
                })
            
        },
        deleteMyAccount(id) {
            let confirmUserDeletion = confirm("voulez-vous vraiment supprimer votre compte ?");
            if (confirmUserDeletion == true) {
                axios.delete("http://localhost:3000/api/user/" + id, {headers: { "Authorization": "Bearer " + localStorage.getItem("token") },})
                .then((res)=> {
                    console.log(res);
                    router.replace("http://localhost:8080/login")
                })
                .catch((error) => { 
                    console.log(error)
                })
            } else {
                return 
            }
        },
    }
}

</script>

<style scoped>

.delete__account{
  font-size:0.8em;
  margin-top: 1em;
  color:#ffffff;
  border:none;
  background-color:#fd2b01ab;
  border-radius:2em;
  padding:0.8em;
  margin-bottom:2em;
}
.profile__img{
  margin:0 auto;
  width:10em;
  height:10em;
  border-radius: 50%;
  overflow: hidden;
}
.profile__img img{
  height:100%;
}
h1{
  font-size: 1.6em;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  align-self: center;
  text-align: center;
  margin-bottom: 1em;
}
.profile__date{
  margin-top:1em;
  margin-bottom:1em;
}
.profile__bio{

  margin-bottom:1em;
}
h2{
  margin-bottom:0.5em;
  font-size: 1.2em;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
main{
  margin:auto;
  padding:0em 2em 0em 2em;
}
.italic{
  margin-top:3em;
  font-style: italic;
  font-size:0.8em;
}
a,button{
  cursor: pointer;
}
#signout {
  width: 2em;
}
</style>