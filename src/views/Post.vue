
<template>
    <main>
    <section >
      <article>
        <div class="post" :key="id" >
            <div class="post__date">
                <span>
                    Publié par <span class="post__user">{{ post.User.username }}</span>
                    le {{ post.createdAt.slice(0,10) + ' à ' + post.createdAt.slice(11,16)}}
                </span>                                                                                     
            </div>
            <p class="post__content"> {{ post.content }} </p>
            <div class="post__img" >
                <img :src="post.imageUrl" v-if="post.imageUrl !== ''"  alt="image postée" />
            </div>
            <div class="label__post">
                <button class="post__btn" @click="commentPage(post.id)">Commenter</button>
                <label v-show="isAdmin || post.UserId == token.userId" class="label__post" @click="deletepost(post.id)">Supprimer<i class="fa fa-fw fa-trash"></i></label>
            </div>                             
        </div>                        
    </article>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
    name: "OnePost",
    data() {
        return {
            isAdmin: "",
            post:null,
            token:localStorage.getItem("token"),
            commentContent:"",
        }
    },
    created: function() {  
      let postId = localStorage.getItem('postId');
      console.log(postId)  
        axios.get("http://localhost:3000/api/post/" + postId, {content: this.commentContent,},{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
          if (res){
            this.post = res.data;
            console.log(this.post);
            console.log(this.post.UserId);
          } else {
            console.log("aucun post")
          }
        })
        .catch((error)=> { console.log(error) 
        });  
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
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