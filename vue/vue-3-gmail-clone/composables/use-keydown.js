import { onBeforeUnmount } from "vue";

let useKeyDown = keyCombo => {
  let onKeydown = event => {
    let listener = keyCombo.find(kc => kc.key === event.key);
    if (listener) {
      listener.fn();
    }
  };
  window.addEventListener("keydown", onKeydown);
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown);
  });
};

export default useKeyDown;
