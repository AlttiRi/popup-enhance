import { makeMovable, makeResizable } from "./popup-enh-core.js";
function storeStateInLS({ id: lsName, onMove, onStop }) {
  const stateJson = localStorage.getItem(lsName);
  let state;
  if (stateJson) {
    state = JSON.parse(stateJson);
  }
  const save = (state2) => localStorage.setItem(lsName, JSON.stringify(state2));
  const reset = () => localStorage.removeItem(lsName);
  let _onStop;
  if (onStop) {
    _onStop = function(state2) {
      onStop(state2);
      save(state2);
    };
  } else {
    _onStop = save;
  }
  return { onMove, onStop: _onStop, state, reset };
}
function getPopupEnh(appName) {
  return {
    /**
     * Use `position: "relative"` option if you want to open multiple popups at once,
     * and you do not want they overlap each other.
     */
    makeMovableEx(element, id, opt = {}) {
      return makeMovable(element, {
        ...opt,
        ...storeStateInLS({
          id: `${appName}--${id}--move-state`,
          ...opt
        })
      });
    },
    makeResizableEx(element, id, opt = {}) {
      return makeResizable(element, {
        ...opt,
        ...storeStateInLS({
          id: `${appName}--${id}--resize-state`,
          ...opt
        })
      });
    }
  };
}
function makeFocusable(element, handle) {
  element.setAttribute("tabindex", "-1");
  element.addEventListener("focusin", focusin);
  element.addEventListener("focusout", focusout);
  let blurTimerId = 0;
  function focusin() {
    element.classList.add("focus");
    clearTimeout(blurTimerId);
  }
  function focusout() {
    blurTimerId = window.setTimeout(() => {
      element.classList.remove("focus");
    }, 250);
  }
  (handle || element).addEventListener("pointerdown", (event) => {
    element.focus();
  }, { passive: true });
}
export {
  getPopupEnh,
  makeFocusable
};
//# sourceMappingURL=popup-enh-extra.js.map
