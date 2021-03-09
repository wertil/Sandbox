import { ref, computed } from "vue";

export default function useEventSpace() {
  // data properties
  // ref turns the primitive into an reactive object
  const capacity = ref(2);
  const attending = ref(["tim", "joe", "bob"]);

  // computed property
  const spacesLeft = computed(() => {
    return capacity.value - attending.value.length;
  });

  // method
  function increaseCapacity() {
    capacity.value++;
  }

  /*    return all item that you want to use in the template */
  return { capacity, increaseCapacity, attending, spacesLeft };
}
