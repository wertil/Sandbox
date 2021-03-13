<template>
  <table class="mail-table">
    <tbody>
    <tr v-for="email in unArchivedEmails" :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
        @click="readEmail(email)"
    >
      <td><input type="checkbox"/></td>
      <td> {{ email.from }}</td>
      <td><strong>{{ email.subject }}</strong></td>
      <td class="date">{{ format(new Date(email.sentAt), 'do MMM yyyy') }}</td>
      <td>
        <button @click="archiveEmail(email)">Archive</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {format} from "date-fns";
import { ref } from "vue";
import axios from "axios";

export default {
  name: "MailTable",
  async setup() {

    let response = await axios.get("http://localhost:3000/emails");
    const emails = ref(response.data)
    return {  format, emails }
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 1 : -1
      })
    },

    unArchivedEmails() {
      return this.sortedEmails.filter(e => !e.archived)
    }
  },
  methods: {
    readEmail(email) {
      email.read = true
      this.updateEmail(email)
    },

    archiveEmail(email) {
      email.archived = true
      this.updateEmail(email)
    },

    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    }
  }
}
</script>

<style scoped>

</style>
