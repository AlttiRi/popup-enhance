document.querySelector(".popup-root")!.insertAdjacentHTML("afterbegin", `
      <div class="popup" id="popup-1">
        <div class="popup-header">Popup Title</div>
        <div class="popup-content scrollable">
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
