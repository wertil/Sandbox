<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <!-- value="value" -> binds to our prop -->
    <!-- @input="updateValue" -> listens for input event and triggers method -->
    <!-- v-bind="$attrs" -> specifies this element will inherit attributes -->
    <input :value="value" v-bind="$attrs" v-on="listeners" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: [String, Number],
    label: String
  },
  computed: {
      // to resolve conflict with input listeners
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  // https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
