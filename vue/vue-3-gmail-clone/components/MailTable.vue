<template>

  <table class="mail-table">
    <tbody>
    <tr v-for="email in unArchivedEmails" :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
    >
      <td>
        <input type="checkbox"
               @click="emailSelection.toggle(email)"
               :selected="emailSelection.emails.has(email)"
        />
      </td>
      <td @click="openEmail(email)"> {{ email.from }}</td>
      <td @click="openEmail(email)"><strong>{{ email.subject }}</strong></td>
      <td @click="openEmail(email)" class="date">{{ format(new Date(email.sentAt), 'do MMM yyyy') }}</td>
      <td>
        <button @click="archiveEmail(email)">Archive</button>
      </td>
    </tr>
    </tbody>
  </table>
  <ModalView v-if="openedEmail" @closeModal="openedEmail=null">
    <MailView :email="openedEmail" @changeEmail="changeEmail"/>
  </ModalView>
</template>

<script>
import {format} from "date-fns";
import {ref, reactive} from "vue";
import axios from "axios";
import MailView from "./MailView";
import ModalView from "./ModalView";

export default {
  name: "MailTable",
  components: {ModalView, MailView},
  async setup() {

    let response = await axios.get("http://localhost:3000/emails");
    let selected = reactive(new Set());
    let emailSelection = {
      emails: selected,
      toggle(email) {
        if(selected.has(email)) {
          selected.delete(email)
        } else {
          selected.add((email))
        }
      }
    }
    const emails = ref(response.data);
    const openedEmail = ref(null);
    return {emailSelection, format, emails, openedEmail}
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
    openEmail(email) {
      email.read = true
      this.updateEmail(email)
      this.openedEmail = email
    },

    archiveEmail(email) {
      email.archived = true
      this.updateEmail(email)
    },

    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    },

    changeEmail({toggleRead, toggleArchive, save, closeModal, changeIndex}) {
      const email = this.openedEmail;
      if(toggleRead) { email.read = !email.read }
      if(toggleArchive) { email.archived = !email.archived }
      if(save) { this.updateEmail(email) }
      if(closeModal) { this.openedEmail = null }
      if(changeIndex) {
        let emails = this.unArchivedEmails
        let currentIndex = emails.indexOf(email)
        let newIndex = currentIndex + changeIndex
        if(newIndex === emails.length || newIndex < 0) {
          this.openedEmail = null
          return
        }
        this.openEmail(emails[newIndex])

      }
    }

  }
}
</script>

<style scoped>

</style>
