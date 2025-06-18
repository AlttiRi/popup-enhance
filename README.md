# [PopupEnhance](https://github.com/AlttiRi/popup-enhance)


It's a pretty simple JavaScript (TS) library _(mostly, for personal use)_ to enhance a popup to make it **movable** and **resizable**.


It's only 34 lines to make it movable: [`makeMovable` ↓](#makeMovable) and 38 lines to make it resizable: [`makeResizable` ↓](#makeResizable)

Also, there is en extra code to store the move / resize state in `localStorage` ([`popup-enh-extra.ts`](https://github.com/AlttiRi/popup-enhance/blob/606e39414083c47ebf6a1d2d5457ccf3f5e08c65/src/popup-enh-extra.ts)).

The required CSS is located here: [`popup.css`](https://github.com/AlttiRi/popup-enhance/blob/606e39414083c47ebf6a1d2d5457ccf3f5e08c65/css/popup.css).

It's available on [npm](https://www.npmjs.com/package/@alttiri/popup-enhance):

```bash
npm i @alttiri/popup-enhance
```

---

### Demo

https://alttiri.github.io/popup-enhance/ (see: [`main.ts`](https://github.com/AlttiRi/popup-enhance/blob/606e39414083c47ebf6a1d2d5457ccf3f5e08c65/src-demo/main.ts)).

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

https://github.com/AlttiRi/popup-enhance/blob/606e39414083c47ebf6a1d2d5457ccf3f5e08c65/src/popup-enh-core.ts#L29-L63

### `makeResizable`

https://github.com/AlttiRi/popup-enhance/blob/606e39414083c47ebf6a1d2d5457ccf3f5e08c65/src/popup-enh-core.ts#L76-L114


---

### See also

- https://github.com/AlttiRi/drag-select-demo


## *.d.ts

```ts
export type MoveStyleProps = "top" | "left";
export type MoveState = Record<MoveStyleProps, `${string}px`>;
export type ResizeStyleProps = "width" | "height";
export type ResizeState = Record<ResizeStyleProps, `${string}px`>;
export type AnyStyleProps = MoveStyleProps | ResizeStyleProps;
export type AnyState = MoveState | ResizeState;
export type MovableOpts = {
    handle?: HTMLElement;
    onMove?: (state: MoveState) => void;
    onStop?: (state: MoveState) => void;
    state?: MoveState;
    reset?: Function;
    position?: "absolute" | "relative";
};
export declare function makeMovable(element: HTMLElement, { handle: hdl, onMove, onStop, state, reset, position }?: MovableOpts): {
    reset: () => void;
};
export type ResizableOpts = {
    minW?: number;
    minH?: number;
    size?: number;
    onMove?: (state: ResizeState) => void;
    onStop?: (state: ResizeState) => void;
    state?: ResizeState;
    reset?: Function;
};
export declare function makeResizable(element: HTMLElement, { minW, minH, size, onMove, onStop, state, reset }?: ResizableOpts): {
    reset: () => void;
};

type StoreStateOpt<T extends AnyState, S extends string> = {
    id: S extends "" ? never : S;
    onMove?: (state: T) => void;
    onStop?: (state: T) => void;
};
type StoreStateReturn<T extends AnyState> = {
    onMove?: (state: T) => void;
    onStop?: (state: T) => void;
    state?: T;
    reset: () => void;
};
export declare function storeStateInLS<T extends AnyState, S extends string>({ id: lsName, onMove, onStop }: StoreStateOpt<T, S>): StoreStateReturn<T>;
export declare function getPopupEnh<S extends string>(appName: S extends "" ? never : S): {
    /**
     * Use `position: "relative"` option if you want to open multiple popups at once,
     * and you do not want they overlap each other. However, don't use it with resizable popups.
     */
    makeMovableEx<S_1 extends string>(element: HTMLElement, id: S_1 extends "" ? never : S_1, opt?: MovableOpts): {
        reset: () => void;
    };
    makeResizableEx<S_1 extends string>(element: HTMLElement, id: S_1 extends "" ? never : S_1, opt?: ResizableOpts): {
        reset: () => void;
    };
};
/**
 * Makes the element focusable, adds `"focus"` class.
 * Specify the drag `handle` (if exists) to run `"focus"` listener callback on `"pointerdown"` on it.
 */
export declare function makeFocusable(element: HTMLElement, handle?: HTMLElement): void;
```
