
<template>
    <main>
    <section >
      <article>
        <div class="post" >
            <div class="post__date" @click="openPost(post.id)">
                <span>
                    Publié par <span class="post__user">{{ post.User.username }}</span>
                    le {{ post.createdAt.slice(0,10) + ' à ' + post.createdAt.slice(11,16)}}
                </span>
                <label v-show="isAdmin || post.UserId == id" class="label__post" @click="deletepost(post.id)"><i class="fa fa-fw fa-trash"></i>Supprimer</label>                                                                                     
            </div>
            <p class="post__content" @click="openPost(post.id)"> {{ post.content }} </p>
            <div class="post__img" @click="openPost(post.id)" >
                <img :src="post.imageUrl" v-if="post.imageUrl !== ''"  alt="image postée" />
            </div>
            
            <div class="post__subsection">
                <div class="post__comments" @click="isHidden= !isHidden">Commenter<i class="far fa-comment-alt"></i></div>
                <div class="post__React">React <i class="far fa-laugh-beam"></i><i class="far fa-thumbs-down"></i><i class="far fa-thumbs-up"></i></div>
            </div>
            <!-- comments section -->
            <!-- comments section -->
            <transition name="slide-fade">
            <div class="comment_wrap" v-if="isHidden">
                  <div  class="comment" v-for="Comment in post.Comments.slice().reverse()" :key="Comment.id">
                    <div class="comment__date">
                          <span class="comment__user">{{ Comment.User.username }}</span>
                          <span class="comment__hour">{{ Comment.createdAt.slice(0,10) + ' à ' + Comment.createdAt.slice(11,16)}}
                          <label v-show="isAdmin || Comment.UserId == id" class="delete__comment" @click="deleteComment(Comment.id,post.id)"><i class="fa fa-fw fa-trash"></i></label></span>
                                                                                                              
                    </div>
                    <p class="comment__content"> {{ Comment.content }} </p>
                  </div>
                  
                  <form @submit.prevent="commentPage(post.id)" class="form__comment">
                    <div>
                      <textarea class="box__comment" v-model="commentContent" type="text" placeholder="Exprimer vous..." />
                    </div>
                    <button type="submit" class="sendCom__btn">Envoyer</button>
                  </form>
                    
            </div>
            </transition>                         
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
            isAdmin: false,
            post: [],
            inputContent: "",
            commentContent:"",
            isHidden: false,
            id:localStorage.getItem('userId')
        }
    },
    created: function() {  
      let postId = localStorage.getItem('postId');
      console.log(postId)  
        axios.get("http://localhost:3000/api/post/" + postId,{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
          if (res){
            this.post = res.data;
            console.log(this.post);
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
        commentPage(postId) {
      const formData = new FormData()
      formData.append("content", this.commentContent.toString())
        axios.post("http://localhost:3000/api/post/"+ postId +"/comment", formData, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(()=> {
                    this.commentContent = ""
                    location.reload();
                })
        .catch((error)=> { console.log(error) 
        })
    },
    deletepost(postId) {
            let confirmpostDeletion = confirm("voulez-vous vraiment supprimer cette image ? Tous les commentaires associés seront également supprimés.");
            if (confirmpostDeletion == true) {
                axios.delete("http://localhost:3000/api/post/" + postId, 
                {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
                })
                .then((res)=> {
                  console.log(res)
                  location.reload()
                })
                .catch((error) => { 
                  location.reload();
                  console.log(error)})
            } else {
                return
            }
    },
    deleteComment(commentId,postId) {
            let confirmpostDeletion = confirm("Voulez-vous vraiment supprimer ce commentaire ?");
            if (confirmpostDeletion == true) {
                axios.delete("http://localhost:3000/api/post/" + postId + "/comment/"+ commentId, 
                {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
                })
                .then((res)=> {
                  console.log(res)
                  location.reload()
                })
                .catch((error) => { 
                  location.reload();
                  console.log(error)})
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