type MoveStyleProps = "top" | "left";
type MoveState = Record<MoveStyleProps, `${string}px`>;

type ResizeStyleProps = "width" | "height";
type ResizeState = Record<ResizeStyleProps, `${string}px`>;

type AnyStyleProps = MoveStyleProps | ResizeStyleProps;
type AnyState = MoveState | ResizeState;

function assignStyleState(element: HTMLElement, state: AnyState) {
    for (const [k, v] of Object.entries(state)) {
        element.style[k as AnyStyleProps] = v;
    }
}

export type MovableOpts = {
    handle?: HTMLElement,
    onMove?: (state: MoveState) => void,
    onStop?: (state: MoveState) => void,
    state?: MoveState,
}

export function makeMovable(element: HTMLElement, {
    handle, onMove, onStop, state
}: MovableOpts = {}) {
    state && assignStyleState(element, state); // Restore position

    const _handle = handle || element;
    _handle.style.userSelect  = "none";
    _handle.style.touchAction = "none";
    element.style.position    = "absolute";

    _handle.addEventListener("pointerdown", (event: PointerEvent) => {
        event.preventDefault(); // To prevent bugs when all text on the page is selected (Ctrl + A)
        _handle.setPointerCapture(event.pointerId); // To prevent a bug on double click
        const offsetY = event.clientY - parseInt(getComputedStyle(element).top);
        const offsetX = event.clientX - parseInt(getComputedStyle(element).left);

        let state: MoveState;
        function _onMove(event: PointerEvent) {
            !_handle.hasPointerCapture(event.pointerId) && _handle.setPointerCapture(event.pointerId);
            state = {
                top:  `${event.clientY - offsetY}px`,
                left: `${event.clientX - offsetX}px`,
            };
            assignStyleState(element, state);
            onMove?.(state);
        }
        function _onStop() {
            removeEventListener("pointermove", _onMove);
            state && onStop?.(state);
        }
        addEventListener("pointermove",        _onMove, {passive: true});
        addEventListener("lostpointercapture", _onStop, {once:    true});
    });
}


export type ResizableOpts = {
    minW?: number,
    minH?: number,
    size?: number,
    onMove?: (state: ResizeState) => void,
    onStop?: (state: ResizeState) => void,
    state?: ResizeState,
}

export function makeResizable(element: HTMLElement, {
    minW = 32, minH = 32, size = 16, onMove, onStop, state
}: ResizableOpts = {}) {
    state && assignStyleState(element, state); // Restore size

    const lrCorner = document.createElement("div");
    lrCorner.style.cssText =
        `width: ${size}px; height: ${size}px; border-radius: ${(size / 2)}px; ` +
        `bottom: ${-(size / 2)}px; right: ${-(size / 2)}px; ` +
        `position: absolute; background-color: transparent; cursor: se-resize; touch-action: none;`;
    element.append(lrCorner);

    lrCorner.addEventListener("pointerdown", event => {
        event.preventDefault();
        lrCorner.setPointerCapture(event.pointerId);
        const offsetX = event.clientX - element.offsetLeft - parseInt(getComputedStyle(element).width);
        const offsetY = event.clientY - element.offsetTop  - parseInt(getComputedStyle(element).height);

        let state: ResizeState | undefined;
        function _onMove(event: PointerEvent) {
            let x = event.clientX - element.offsetLeft - offsetX;
            let y = event.clientY - element.offsetTop  - offsetY;
            if (x < minW) { x = minW; }
            if (y < minH) { y = minH; }
            state = {
                width:  `${x}px`,
                height: `${y}px`,
            };
            assignStyleState(element, state);
            onMove?.(state);
        }
        function _onStop() {
            lrCorner.removeEventListener("pointermove", _onMove);
            state && onStop?.(state);
        }
        lrCorner.addEventListener("pointermove",        _onMove, {passive: true});
        lrCorner.addEventListener("lostpointercapture", _onStop, {once:    true});
    });
}


type StoreStateOpt<T extends AnyState> = {
    id: string,
    onMove?: (state: T) => void,
    onStop?: (state: T) => void,
    reset?: boolean,
    restore?: boolean,
};

type StoreStateReturn<T extends AnyState> = {
    onMove?: (state: T) => void,
    onStop?: (state: T) => void,
    state?: T,
};

export function storeStateInLS<T extends AnyState>(
    {id: lsName, onMove, onStop, reset, restore}: StoreStateOpt<T>
): StoreStateReturn<T> {
    function _reset() {
        lsName && localStorage.removeItem(lsName);
    }
    if (reset) {
        _reset();
    }
    if (!restore || !lsName) {
        return {onMove, onStop};
    }
    const stateJson = localStorage.getItem(lsName);
    let state;
    if (stateJson) {
        state = JSON.parse(stateJson);
    }

    function saveStateLS(state: T) {
        localStorage.setItem(lsName, JSON.stringify(state));
    }

    let _onStop;
    if (onStop) {
        _onStop = function(state: T) {
            onStop(state);
            saveStateLS(state);
        };
    } else {
        _onStop = saveStateLS;
    }

    return {onMove, onStop: _onStop, state};
}
