import { ref } from "vue";

export default function testFunction() {
  // data properties
  // ref turns the primitive into an reactive object
  const test = ref(2);

  /*    return all item that you want to use in the template */
  return { test };
}
