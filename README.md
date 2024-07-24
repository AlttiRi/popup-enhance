# PopupEnhance


It's a pretty simple JavaScript (TS) library _(mostly, for personal use)_ to enhance a popup to make it **movable** and **resizable**.


It's only 33 lines to make it movable: [`makemovable` ↓](#makemovable) and 38 lines to make it resizable: [`makeResizable` ↓](#makeResizable)

Also, there is en extra code to store the move / resize state in `localStorage` ([`popup-enh-extra.ts`](https://github.com/AlttiRi/popup-enhance/blob/6ae6928e935d64e2e447b6bb98e21188628b1002/src/popup-enh-extra.ts)).

The required CSS is located here: [`popup.css`](https://github.com/AlttiRi/popup-enhance/blob/6ae6928e935d64e2e447b6bb98e21188628b1002/src-demo/css/popup.css).

~~It's available on [npm](https://www.npmjs.com/package/@alttiri/popup-enhance):~~ (in 24 hours)

```bash
npm i @alttiri/popup-enhance
```

On GitHub Packages:
```bash
npm install @alttiri/popup-enhance@1.0.2-20240724 --registry=https://npm.pkg.github.com
```

---

### Demo

https://alttiri.github.io/popup-enhance/ (see: [`main.ts`](https://github.com/AlttiRi/popup-enhance/blob/6ae6928e935d64e2e447b6bb98e21188628b1002/src-demo/main.ts)).

---

### How to use

```js
import {getPopupEnh, makeFocusable} from "@alttiri/popup-enhance";

const {makeMovableEx} = getPopupEnh("fancy-demo-app");

const popupElem  = document.querySelector(".popup");
const handleElem = popupElem.querySelector(".popup-header");

const {reset} = makeMovableEx(popupElem, "popup-1", {handle: handleElem});
makeFocusable(popupElem, handleElem);
```

- `"fancy-demo-app"` — `localStorage`' prefix for keys
- `"popup-1"` — `localStorage`' key 

The recommended HTML:
```html
<body>
    <div id="app"> ... </div>
    <div class="popup-root">
        <div class="popup" id="popup-1">
            <div class="popup-header">Popup Title</div>
            <div class="popup-content"> ... </div>
        </div>
        <div class="popup" id="popup-2"> ... </div>
    </div>
</body>
```

The recommended CSS:
```js
// JS imports:
import "@alttiri/popup-enhance/css/popup.css";
import "@alttiri/popup-enhance/css/popup-content.css";
// Or CSS import:
// @import "@alttiri/popup-enhance/css/popup.css";
// @import "@alttiri/popup-enhance/css/popup-content.css";
```


---

### `makeMovable`

https://github.com/AlttiRi/popup-enhance/blob/6ae6928e935d64e2e447b6bb98e21188628b1002/src/popup-enh-core.ts#L29-L62

### `makeResizable`

https://github.com/AlttiRi/popup-enhance/blob/6ae6928e935d64e2e447b6bb98e21188628b1002/src/popup-enh-core.ts#L75-L113


---

### See also

- https://github.com/AlttiRi/drag-select-demo
