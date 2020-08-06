<template>
    <div>

        <h1>Transistion Group Test</h1>

        <button @click="openDrawer">{{ !showDrawer ? 'Show Drawer' : 'Hide Drawer' }}</button>

        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
            :css="false"
        >
            <!-- :css="false" -> tells vue not use css transition classes-->
            <div v-if="showDrawer" class="drawer">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </transition>


        <div class="contacts-box">
            <input v-model="newContact" placeholder="Name" type="text"/>

            <button @click="addContact">Add Contact</button>
            <button @click="sortContacts">Sort</button>

            <transition-group tag="ul" name="slide-up">
                <li v-for="(contact, index) in contacts" :key="index">
                    {{ contact }}
                </li>
            </transition-group>
        </div>

        <SimpleAnimation />

        <Stagger />

    </div>
</template>

<script>
import Velocity from 'velocity-animate'
import SimpleAnimation from "@/components/animations/SimpleAnimation";
import Stagger from "@/components/animations/Stagger";

export default {
    components: {Stagger, SimpleAnimation},
    data() {
        return {
            showDrawer: false,
            newContact: "",
            contacts: [
                "Beau Thabeast",
                "Cindy Rella",
                "Alice Wunderlind"
            ]
        }
    },
    methods: {
        addContact() {
            this.contacts.push(this.newContact)
        },
        sortContacts() {
            this.contacts.sort()
        },
        openDrawer() {
            this.showDrawer = !this.showDrawer;
        },

        beforeEnter(el) {
            el.style.opacity = 0
            el.style.width = '0em'
            el.style.height = '0em'
        },
        enter(el, done) {
            Velocity(
                el,
                {opacity: 1, width: '100%', height: '20em'},
                {duration: 1000, easing: [60, 10], complete: done}
            )
        },
        leave(el) {
            Velocity(
                el,
                {opacity: 0, width: '0em', height: '0em'},
                {duration: 500, easing: 'easeInCubic', complete: done}
            )
        }

    }
}
</script>

<style scoped>
button {
    height: 2.2em;
    margin: 0.5em;
    border-radius: 0.3em;
    background: linear-gradient(to right, #16c0b0, #84cf6a);
    color: white;
}

input {
    display: inline-block;
    box-sizing: border-box;
    width: 200px;
    height: 1.8em;
    padding: 1em;
    margin: 0.2em;
    font: 0.8em 'Avenir', Helvetica, sans-serif;
}

.contacts-box {
    overflow: hidden;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

p {
    font-size: 0.8em;
}

::placeholder {
    color: #2c3e50;
}

ul {
    list-style-type: none;
}

.drawer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 12em;
    height: 20em;
    border-radius: 1%;
    background-color: #e0e0e0;
    box-shadow: 0.08em 0.03em 0.4em #ababab;
    padding-top: 0.7em;
}

.drawer div {
    height: 3.5em;
    width: 95%;
    margin-top: 0.6em;
    background-color: #f0f0f0;
    border: 0.02em solid #ababab;
    border-radius: 1%;
}

</style>