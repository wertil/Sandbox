<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <!-- value="value" -> binds to our prop -->
    <!-- @input="updateValue" -> listens for input event and triggers method -->
    <!-- v-bind="$attrs" -> specifies this element will inherit attributes -->
    <input :value="value" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: [String, Number],
    label: String
  },
  // https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
