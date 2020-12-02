<template>
    <div id="app">
        <Navigation :user="userName" @logout="logout"/>
        <router-view :user="userName" @logout="logout"/>
    </div>
</template>

<script>
import Navigation from "./Navigation";
//import db from "./db";
import Firebase from "firebase"

export default {
    name: "App",
    components: {Navigation},
    data() {
        return {
            user: null
        }
    },
    computed: {
      userName: function () {
              return this.user ? this.user.displayName : null
      }
    },
    methods: {
        logout() {
            Firebase.auth().signOut()
                .then(() => {
                    this.user = null
                    this.$router.push('login')
                })
        }
    },
    mounted() {
        Firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.user = user;
            }
        })
    }
}
</script>

<style lang="scss">
$primary: #ea6e1b;
@import "node_modules/bootstrap/scss/bootstrap";
</style>