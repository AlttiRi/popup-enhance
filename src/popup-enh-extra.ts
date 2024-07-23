import {AnyState, makeMovable, makeResizable, MovableOpts, ResizableOpts} from "./popup-enh-core";


type StoreStateOpt<T extends AnyState, S extends string> = {
    id: S extends "" ? never : S,
    onMove?: (state: T) => void,
    onStop?: (state: T) => void,
};

type StoreStateReturn<T extends AnyState> = {
    onMove?: (state: T) => void,
    onStop?: (state: T) => void,
    state?: T,
    reset: () => void,
};

export function storeStateInLS<T extends AnyState, S extends string>(
    {id: lsName, onMove, onStop}: StoreStateOpt<T, S>
): StoreStateReturn<T> {
    const stateJson = localStorage.getItem(lsName);
    let state;
    if (stateJson) {
        state = JSON.parse(stateJson);
    }

    const save = (state: T) => localStorage.setItem(lsName, JSON.stringify(state));
    const reset = () => localStorage.removeItem(lsName);

    let _onStop;
    if (onStop) {
        _onStop = function(state: T) {
            onStop(state);
            save(state);
        };
    } else {
        _onStop = save;
    }

    return {onMove, onStop: _onStop, state, reset};
}

export function getPopupEnh<S extends string>(appName: S extends "" ? never : S) {
    return {
        /**
         * Use `position: "relative"` option if you want to open multiple popups at once,
         * and you do not want they overlap each other.
         */
        makeMovableEx<S extends string>(element: HTMLElement, id: S extends "" ? never : S, opt: MovableOpts = {}) {
            return makeMovable(element, {
                ...opt,
                ...storeStateInLS({
                    id: `${appName as string}--${id as string}--move-state`,
                    ...opt,
                })
            });
        },
        makeResizableEx<S extends string>(element: HTMLElement, id: S extends "" ? never : S, opt: ResizableOpts = {}) {
            return makeResizable(element, {
                ...opt,
                ...storeStateInLS({
                    id: `${appName as string}--${id as string}--resize-state`,
                    ...opt,
                })
            });
        },
    }
}

/**
 * Makes the element focusable, adds `"focus"` class.
 * Specify the drag `handle` (if exists) to run `"focus"` listener callback on `"pointerdown"` on it.
 */
export function makeFocusable(element: HTMLElement, handle?: HTMLElement) {
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
    (handle || element).addEventListener("pointerdown", event => {
        element.focus();
    }, {passive: true});
}
