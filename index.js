import { makeFocusable, getPopupEnh } from "./popup-enh-extra.js";
import "./popup-enh-core.js";
document.querySelector(".popup-root").insertAdjacentHTML("afterbegin", `
      <div class="popup" id="popup-1">
        <div class="popup-header">Popup Title</div>
        <div class="popup-content">
          <h2>Try it move / resize it</h2>
          <div>This popup is movable and resizable.</div>
          <hr>
          <div>You can move it by the drag handle — the title bar and resize it by the right bottom corner.</div>
          <hr>
          <div>The other two popups are only movable. 
               The popup with the handle is interactable, you can click on the number to increase it.
          </div>
        </div>
      </div>
      <div class="popup number-popup" id="popup-2">
        <div class="popup-content">
          <div class="number">0</div>
        </div>
      </div>
      <div class="popup number-popup" id="popup-3">
        <div class="popup-header">Drag Handle</div>
        <div class="popup-content">
          <div class="number">0</div>
        </div>
      </div>
`.trim());
const { makeMovableEx, makeResizableEx } = getPopupEnh("popup-enhance-demo");
const popup1 = document.querySelector("#popup-1");
const popup1h = popup1.querySelector(".popup-header");
const { reset: resetPos1 } = makeMovableEx(popup1, "popup-1", { handle: popup1h });
const { reset: resetSiz1 } = makeResizableEx(popup1, "popup-1", { minW: 128, minH: 128 });
const popup2 = document.querySelector("#popup-2");
const popup3 = document.querySelector("#popup-3");
const popup3h = popup3.querySelector(".popup-header");
const { reset: resetPos2 } = makeMovableEx(popup2, "popup-2", { position: "relative" });
const { reset: resetPos3 } = makeMovableEx(popup3, "popup-3", { handle: popup3h, position: "relative" });
makeFocusable(popup1, popup1h);
makeFocusable(popup2);
makeFocusable(popup3, popup3h);
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", () => {
  resetPos1();
  resetSiz1();
  resetPos2();
  resetPos3();
});
const reloadBtn = document.querySelector("#reload-btn");
reloadBtn.addEventListener("click", () => {
  location.reload();
});
document.querySelectorAll(".number").forEach((elem) => {
  elem.addEventListener("click", (_) => {
    elem.innerText = String(Number(elem.innerText) + 1);
  });
});
//# sourceMappingURL=index.js.map
