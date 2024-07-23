document.querySelector(".popup-root")!.insertAdjacentHTML("afterbegin", `
      <div class="popup" id="popup-1">
        <div class="popup-header">Popup Title</div>
        <div class="popup-content">
          <h2>Try it</h2>
          <div>Some content.</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Vel fringilla est ullamcorper eget. Egestas sed tempus urna et pharetra.
            Aliquam etiam erat velit scelerisque in dictum non.
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
