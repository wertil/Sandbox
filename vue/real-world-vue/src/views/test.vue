<template>
    <div>

        <h1>Transistion Group Test</h1>

        <input v-model="newContact" placeholder="Name" type="text"/>

        <button @click="addContact">Add Contact</button>
        <button @click="sortContacts">Sort</button>

        <transition-group tag="ul" name="slide-up" >
            <li v-for="(contact, index) in contacts" :key="index">
                {{ contact }}
            </li>
        </transition-group>

    </div>
</template>

<script>
export default {
    data() {
        return {
            newContact: "",
            contacts: [
                "Beau Thabeast",
                "Cindy Rella",
                "Alice Wunderlind"
            ]
        }
    },
    methods: {
        addContact () {
            this.contacts.push(this.newContact)
        },
        sortContacts() {
            this.contacts.sort()
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
    width: 30%;
    height: 1.8em;
    padding: 0.5em;
    margin: 0.2em;
    font: 0.8em 'Avenir', Helvetica, sans-serif;
}
.modal {
    width: 250px;
    height: 200px;
    padding: 10px;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 2%;
    background-color: #e0e0e0;
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
</style>