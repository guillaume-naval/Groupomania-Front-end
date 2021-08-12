
<template>
<main class="container">
  <!-- bloc utilisateur -->
  <section class="user-container">
          <div>
              <div id="profileButton">
                  <router-link to='/profil'><button type="button">COMPTE</button></router-link> 
              </div>
          </div>
          <div>
              <div> 
                  <a @click="localClear"><img src="../assets/door-open-solid.svg" alt="sign-out" style="width:35px"/> </a>
              </div>
          </div>                 
  </section>
  <!-- bloc ajouter un post --> 
  <section>
    <div>          
      <h2>Exprimez-vous !</h2>
      <form @submit.prevent="sendPost()" >
        <div>
          <textarea v-on:keydown="invalid = false" v-model="inputContent" type="text" placeholder="Entrer votre message" />
        </div>
        <div>
          <div v-if="preview">
                <img  :src="preview" />
          </div>
          <input class="uploading-image" ref="uploadImg" @change="uploadImage(),previewImage" type="file" name="image" accept=".jpg, .jpeg, .gif, .png">
        </div>
        <button type="submit">Poster</button>
      </form>              
    </div> 
  </section>
  <!-- bloc avec tous le(s) post(s) -->    
  <section id="main-feed">
    <article>
      <div>
    <h1 v-if= 'this.posts !== null' >Dernières Publications</h1>   
    <h1 v-else> Aucune publication pour l'instant, soyez le premier à en créer une ! </h1>
    </div>
        <div v-for="post in posts" :key="post.id">
            <div>
                <span>
                    Posté par {{ post.User.username }}
                    le {{ post.createdAt.slice(0,10) + ' à ' + post.createdAt.slice(11,16)}}
                </span>
                <div>
                    post # {{ post.id }}               
                </div>                                                                                       
            </div>
            <p> {{ post.content }} </p>
            <div class="post__img" @click="commentPage(post.id)">
                <img :src="post.imageUrl" v-if="post.imageUrl !== '' " alt="image postée" />
            </div>
            <div>
                <button @click="commentPage(post.id)" >Commenter</button>
                <div v-show="isAdmin || post.UserId == id">
                    <button @click="deletepost(post.id)" > <img  src="../assets/trash-solid.svg" alt="trash" style="width:25px"> </button>
                </div>
            </div>                             
        </div>                        
    </article>
  </section>
</main>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
    name: "Feed",
    data() {
        return {
            isAdmin: false,
            posts: [],
            id: "",                 
            username: "",               
            creation: "",
            inputContent: "",
            file:"",
            newImage: "",
            token:localStorage.getItem("token"),
            previewImg:null,
        }
    },
    created: function() {
      let id = localStorage.getItem('userId')        
        axios.get("http://localhost:3000/api/post/", { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
          if (res){
            this.posts = res.data;
            console.log(res);
            console.log("hello");
          } else {
            console.log("aucun post")
          }
        })
        .catch((error)=> { console.log(error) 
        })
        axios.get("http://localhost:3000/api/user/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            console.log(res)
            this.id                 = res.data.id;
            this.username           = res.data.username;
            this.creation           = res.data.createdAt;
            this.isAdmin            = res.data.isAdmin;
        })
        .catch((error)=> { console.log(error) 
        });        
    },
    methods: {
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    uploadImage(){
      this.file = this.$refs.uploadImg.files[0];
      this.newImage = URL.createObjectURL(this.file)
    },
    sendPost() {
      const formData = new FormData()
      formData.append("image", this.file)
      formData.append("content", this.inputContent.toString())
      axios.post("http://localhost:3000/api/post/create", formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
                .then(()=> {
                    this.inputContent = ""
                    this.file = null
                    alert('publication réussie!')
                    router.push({path : 'Feed'})
                })
        .catch((error) => {
          alert(error.status);
          console.log(error);
        });
    },
    
    commentPage() {
        router.push({ path : "/Comment" });
    },
    deletepost(postId) {
            let confirmpostDeletion = confirm("voulez-vous vraiment supprimer cette image ? Tous les commentaires associés seront également supprimés.");
            if (confirmpostDeletion == true) {
                axios.delete("http://localhost:3000/api/post/" + postId, {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        postId: postId,
                    }
                    })
                .then((res)=> console.log(res))
                .catch((error) => { 
                    location.reload();
                    console.log(error)})
            } else {
                return
            }
    },
    localClear() {
        localStorage.clear();
        router.push({ path : "/" });
    }
  }
}
</script>

<style>
.uploading-image{
     display:flex;
   }
.container{
  display:flex;
  flex-direction: column;
  align-items: center;
  margin:0;
}
#main-feed{
  display:flex;
  flex-direction: column;
  align-items: center;
}
section{
  margin-bottom: 2em;
}
.user-container{
  display: flex;
  justify-content: flex-end;
}
.post__img img{
  width: 15em;
}
</style>