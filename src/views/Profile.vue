
<template>
    <main>
      
    <section >
      <h1>Bonjour {{nameCurrentUser}} !</h1>
      <div class="profile__img">
        <img :src="post.imageUrl" v-if="post.imageUrl !== ''"  alt="image postée" />
      </div>
      <div class="profile__date">
        <h2>Informations</h2>
        <p>Membre depuis le {{ creation.slice(0,10) }}</p>
      </div>
      <div class="profile__bio">
        <h2>Bio</h2>
        <p>{{ bio }}</p>
      </div>
      <div>
          <h2>Suprimer le compte</h2>
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
            bio:"",
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
            this.bio                = res.data.bio;
          
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
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
h1{
  font-size: 2em;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.profile__date{
  margin-bottom:1em;
}
.profile__bio{
  margin-bottom:1em;
}
h2{
  font-size: 1.2em;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
main{
  margin:auto;
  padding:0em 2em 0em 2em;
}
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