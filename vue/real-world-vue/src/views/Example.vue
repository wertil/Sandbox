<template>
  <form @submit.prevent="submit">
    <input
      type="email"
      placeholder="What's your email"
      :class="{ error: $v.email.$error }"
      v-model.trim="email"
      @blur="$v.email.$touch()"
    />
    <!-- triggering the $dirty state on blur -->
    <div v-if="$v.$error">
      <p v-if="!$v.email.email" class="errorMessage">
        Please enter a valid Email Address
      </p>
      <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
    </div>

    <button :disabled="$v.$invalid" type="submit">Submit!</button>
    <p v-if="$v.$anyError" class="errorMessage">
      Please fill out the required fields
    </p>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit() {
      this.$v.$touch() // all fields marked as dirty
      if (!this.$v.$invalid) {
        console.log('Form Submission:', this.email)
      }
    }
  }
}
</script>
