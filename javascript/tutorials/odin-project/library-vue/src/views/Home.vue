<template>
    <div class="mt-3">
        <div class="text-center" v-if="user">
            Welcome <span class="font-weight-bold text-info">{{ user }}</span>
        </div>
        <div class="container text-center">
            <div class="row justify-content-center">
                <div class="col-10 col-md-10 col-lg-8 col-xl-7">
                    <h4 class="display-4 text-primary mb-2">Video Chat</h4>
                    <p class="lead">
                        This app uses Firebase for real time communication and WebRTC to create video chats
                        between multiple users, allowing you to create rooms for your meetings and invite
                        attendees.
                    </p>
                    <div v-if="!user">
                        <router-link class="btn btn-outline-primary mr-2" to="/login">Log In</router-link>
                        <router-link class="btn btn-outline-primary mr-2" to="/register">Register</router-link>
                    </div>
                    <div v-else>
                        <router-link class="btn btn-outline-primary mr-2" to="/rooms">Rooms</router-link>
                        <button class="btn btn-outline-primary mr-2" @click="$emit('logout')" v-if="user">Logout</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    props: ["user"]
};
</script>
