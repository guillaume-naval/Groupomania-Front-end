
<template>
    <main>
      <div>
        <h1>Votre Profil</h1>
      </div>
    <section >
      <div>
          <p>Bonjour {{ nameCurrentUser }} !</p>
          <a @click="localClear"><img id="signout" src="../assets/door-open-solid.svg" alt="sign-out" /></a>
      </div>
      <div class="card-body text-center">
        <div class="dropdown text-center">
          <p>Membre depuis le {{ creation.slice(0,10) }}</p>
        </div>
      </div>
      <div>
          <p class="italic">Depuis cette page vous pouvez supprimer votre compte. La suppression de votre compte entrainera également la suppression de tous les commentaires et les images que vous avez postés.</p>
          <button @click="deleteMyAccount(id)">SUPPRIMER VOTRE COMPTE</button>
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
            verif:"",
        }
    },
    created: function() {        
        let id = localStorage.getItem('userId');
        axios.get("http://localhost:3000/api/user/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            this.creation           = res.data.createdAt;
            this.isAdmin            = res.data.isAdmin;
            this.nameCurrentUser    = res.data.username;
            this.id                 = res.data.id;
          
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        verified(){
          let verif = false;
          if (this.id == localStorage.getItem('userId')){
            verif =true;       
          } else {
            verif =false;
            
          }
          return verif
        },
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        deleteMyAccount(id) {
            let confirmUserDeletion = confirm("voulez-vous vraiment supprimer votre compte ?");
            if (confirmUserDeletion == true) {
                axios.delete("http://localhost:3000/api/user/" + id, {headers: { "Authorization": "Bearer " + localStorage.getItem("token") },})
                .then((res)=> {
                    console.log(res);
                    router.replace("http://localhost:8080/api/")
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

<style>
.italic{
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