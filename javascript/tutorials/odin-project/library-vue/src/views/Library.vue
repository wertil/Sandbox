<template>
  <div class="container mt-3">
    <h1>Library</h1>
  </div>
</template>
<script>
import db from "../db";

export default {
    name: "Library",
    data() {
        return {
            user: null
        }
    },
    mounted() {
        db.collection('books')
            .doc('6wt56VPTV0qOuH2mheM3')
            .get()
            .then(snapshot => {
                this.user = snapshot.data().name
            })
    }
}
</script>