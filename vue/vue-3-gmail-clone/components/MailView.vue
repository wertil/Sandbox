<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">{{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)'}}</button>
      <button @click="toggleRead">{{ email.read ? 'Mark Read (r)' : 'Mark Unread (r)'}}</button>
      <button @click="goNewer">Newer (k)</button>
      <button @click="goOlder">Older (j)</button>
    </div>
    <h2 class="mb-0">Subject <strong>{{ email.subject }}</strong></h2>
    <div><em>From {{ email.from }} on {{ format(new Date(email.sentAt), 'MM do yyy') }}</em></div>
    <div v-html="marked(email.body)" />
  </div>
</template>

<script>
import {format} from 'date-fns'
import marked from 'marked'
import axios from "axios";
import useKeyDown from "../composables/use-keydown";

export default {
  name: "MailView",
  props: {
    email: {
      type: Object,
      required: true
    },
  },
  setup(props, {emit}) {
    let email = props.email

    // let toggleRead = () => {
    //    email.read = !email.read
    //   axios.put(`http://localhost:3000/emails/${email.id}`, email)
    // }
    //
    // let toggleArchive = () => {
    //   email.archived = !email.archived
    //   axios.put(`http://localhost:3000/emails/${email.id}`, email)
    // }

    const toggleRead = () => {
      emit('changeEmail', {toggleRead: true, save: true})
    }

    const toggleArchive = () => {
      emit('changeEmail', {toggleArchive: true, save: true, closeModal: true})
    }

    const goNewer = () => {
      emit('changeEmail', {changeIndex: -1})
    }

    const goOlder = () => {
      emit('changeEmail', {changeIndex: 1})
    }

    const goNewerAndArchive = () => {
      emit('changeEmail', {changeIndex: -1, toggleArchive: true, save: true})
    }

    const goOlderAndArchive = () => {
      emit('changeEmail', {changeIndex: 1, toggleArchive: true, save: true})
    }


    useKeyDown([
      {key: 'r', fn: toggleRead},
      {key: 'e', fn: toggleArchive},
      {key: 'k', fn: goNewer},
      {key: 'j', fn: goOlder},
      {key: '[', fn: goNewerAndArchive},
      {key: ']', fn: goOlderAndArchive}
    ])

    return { format, marked, toggleRead, toggleArchive, goNewer, goOlder }
  }
}
</script>

<style scoped>

</style>
