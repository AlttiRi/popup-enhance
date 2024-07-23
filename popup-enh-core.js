function assignStyleState(element, state) {
  for (const [k, v] of Object.entries(state)) {
    element.style[k] = v;
  }
}
function resetStyleState(element, state) {
  Object.keys(state).forEach((k) => element.style[k] = "");
}
function makeMovable(element, {
  handle,
  onMove,
  onStop,
  state,
  reset,
  position = "absolute"
} = {}) {
  state && assignStyleState(element, state);
  const _handle = handle || element;
  _handle.style.userSelect = "none";
  _handle.style.touchAction = "none";
  element.style.position = position;
  _handle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    _handle.setPointerCapture(event.pointerId);
    const offsetY = event.clientY - parseInt(getComputedStyle(element).top);
    const offsetX = event.clientX - parseInt(getComputedStyle(element).left);
    function _onMove(event2) {
      !_handle.hasPointerCapture(event2.pointerId) && _handle.setPointerCapture(event2.pointerId);
      state = {
        top: `${event2.clientY - offsetY}px`,
        left: `${event2.clientX - offsetX}px`
      };
      assignStyleState(element, state);
      onMove?.(state);
    }
    function _onStop() {
      removeEventListener("pointermove", _onMove);
      state && onStop?.(state);
    }
    addEventListener("pointermove", _onMove, { passive: true });
    addEventListener("lostpointercapture", _onStop, { once: true });
  });
  return { reset: () => {
    state && resetStyleState(element, state);
    reset?.();
  } };
}
function makeResizable(element, {
  minW = 64,
  minH = 64,
  size = 16,
  onMove,
  onStop,
  state,
  reset
} = {}) {
  state && assignStyleState(element, state);
  const lrCorner = document.createElement("div");
  lrCorner.style.cssText = `width: ${size}px; height: ${size}px; border-radius: ${size / 2}px; bottom: ${-(size / 2)}px; right: ${-(size / 2)}px; position: absolute; background-color: transparent; cursor: se-resize; touch-action: none;`;
  element.append(lrCorner);
  lrCorner.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    lrCorner.setPointerCapture(event.pointerId);
    const offsetX = event.clientX - element.offsetLeft - parseInt(getComputedStyle(element).width);
    const offsetY = event.clientY - element.offsetTop - parseInt(getComputedStyle(element).height);
    function _onMove(event2) {
      let x = event2.clientX - element.offsetLeft - offsetX;
      let y = event2.clientY - element.offsetTop - offsetY;
      if (x < minW) {
        x = minW;
      }
      if (y < minH) {
        y = minH;
      }
      state = {
        width: `${x}px`,
        height: `${y}px`
      };
      assignStyleState(element, state);
      onMove?.(state);
    }
    function _onStop() {
      lrCorner.removeEventListener("pointermove", _onMove);
      state && onStop?.(state);
    }
    lrCorner.addEventListener("pointermove", _onMove, { passive: true });
    lrCorner.addEventListener("lostpointercapture", _onStop, { once: true });
  });
  return { reset: () => {
    state && resetStyleState(element, state);
    reset?.();
  } };
}
export {
  makeMovable,
  makeResizable
};
//# sourceMappingURL=popup-enh-core.js.map
