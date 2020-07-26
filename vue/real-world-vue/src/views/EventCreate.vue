<template>
  <div>
    <h1>Create Event, {{ user.user.name }}</h1>
    <p>This event was created by {{ user.user.id }}</p>
    <p>{{ getEventById(2) }}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>

    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>

      <h3>Name & describe your event</h3>

      <!-- 
        If we look at the documentation for v-model, we’ll find that v-model="event.title" is really just syntactic sugar for:
        :value="event.title"
        @input="(value) => { event.title = value }"
        https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
         -->
      <BaseInput
        label="Title"
        placeholder="Title"
        type="text"
        class="field"
        :class="{ error: $v.event.title.$error }"
        v-model.trim="event.title"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>

      <div class="field">
        <BaseInput
          label="Description"
          type="text"
          placeholder="Description"
          class="field"
          :class="{ error: $v.event.description.$error }"
          v-model.trim="event.description"
          @blur="$v.event.description.$touch()"
        />
        <template v-if="$v.event.description.$error">
          <p v-if="!$v.event.description.required" class="errorMessage">
            Description is required.
          </p>
        </template>
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <BaseInput
          label="Location"
          v-model.trim="event.location"
          type="text"
          placeholder="Location"
          class="field"
          :class="{ error: $v.event.location.$error }"
          @blur="$v.event.location.$touch()"
        />
        <template v-if="$v.event.location.$error">
          <p v-if="!$v.event.location.required" class="errorMessage">
            Location is required.
          </p>
        </template>
      </div>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          placeholder="Select a date"
          v-model="event.date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />

        <template v-if="$v.event.date.$error">
          <p v-if="!$v.event.date.required" class="errorMessage">
            Date is required.
          </p>
        </template>
      </div>

      <div class="field">
        <BaseSelect
          label="Select a time"
          :options="times"
          v-model.trim="event.time"
          class="field"
          :class="{ error: $v.event.time.$error }"
          @blur="$v.event.time.$touch()"
        />
        <template v-if="$v.event.time.$error">
          <p v-if="!$v.event.time.required" class="errorMessage">
            Time is required.
          </p>
        </template>
      </div>

      <BaseButton type="sumbit" class="-fill-gradient" :disabled="$v.$anyError">
        Submit
      </BaseButton>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'EventCreate',
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times,
      categories: this.$store.state.categories
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  computed: {
    ...mapGetters('event', ['getEventById']),
    ...mapState(['user'])
  },
  methods: {
    createEvent() {
      this.$v.$touch() // "touching" all fields to turn them "dirty"
      if (!this.$v.$invalid) {
        // submit form only when all fields are valid
        NProgress.start() // <-- Start the progress bar
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
            this.event = this.createFreshEvent()
          })
          .catch(() => {
            NProgress.done() // <-- if errors out stop the progress bar
          })
      }
    },
    createFreshEvent() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
