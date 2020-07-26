<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin' // import mixin
export default {
  mixins: [formFieldMixin], // register mixin
  props: {
    options: {
      type: Array,
      required: true
    }
  }
  // https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
}
</script>
