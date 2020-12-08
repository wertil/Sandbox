<template>
    <div id="app">
        <Navigation :user="userName" @logout="logout"/>
        <router-view :user="userName" :rooms="rooms" @logout="logout" @addRoom="addRoom" @deleteRoom="deleteRoom"/>
    </div>
</template>

<script>
import Navigation from "./Navigation";
import db from "./db";
import Firebase from "firebase"

export default {
    name: "App",
    components: {Navigation},
    data() {
        return {
            user: null,
            rooms: []
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
        },
        // add date to Cloud Firestore Database:
        addRoom(payload) {
            db.collection('users')
                .doc(this.user.uid)
                .collection('rooms')
                .add({
                    name: payload,
                    createdAt: Firebase.firestore.FieldValue.serverTimestamp()
                })
        },
        deleteRoom(payload) {
            console.log(payload);

            db.collection('users')
                .doc(this.user.id)
                .collection('rooms')
                .doc(payload)
                .delete()
                .then(function () {
                    console.log("Document successfully deleted!");
                })
                .catch(function (error) {
                    console.error("Error removing document: ", error);
                });
        }
    },
    mounted() {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
                db.collection('users')
                    .doc(this.user.uid)
                    .collection('rooms')
                    .onSnapshot(snapshot => {
                        const snapData = []
                        snapshot.forEach(doc => {
                            snapData.push({
                                id: doc.id,
                                name: doc.data().name
                            })
                        })
                        this.rooms = snapData.sort((a, b) => {
                            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                                return -1
                            } else {
                                return 1
                            }
                        })
                    })
            }
        })
    }
}
</script>

<style lang="scss">
$primary: #ea6e1b;
@import "node_modules/bootstrap/scss/bootstrap";
</style>