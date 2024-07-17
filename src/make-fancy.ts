type MoveStyleProps = "top" | "left";
type MoveState = Record<MoveStyleProps, `${string}px`>;

type ResizeStyleProps = "width" | "height";
type ResizeState = Record<ResizeStyleProps, `${string}px`>;

type AnyStyleProps = MoveStyleProps | ResizeStyleProps;
type AnyState = MoveState | ResizeState;


/**
 * @param {HTMLElement} element
 * @param {AnyState} state
 */
function assignStyleState(element: HTMLElement, state: AnyState) {
    for (const [k, v] of Object.entries(state)) {
        element.style[k as AnyStyleProps] = v;
    }
}


export type MovableOpts = {
    handle?: HTMLElement,
    onStop?: (state: MoveState) => void,
    onMove?: (state: MoveState) => void,
    state?: MoveState,
}

export function makeMovable(element: HTMLElement, {
    handle, onStop: _onStop, onMove, state
}: MovableOpts = {}) {
    const _onMove = (state: MoveState) => {
        onMove?.(state);
        assignStyleState(element, state);
    };
    if (state) {
        _onMove(state);
        _onStop?.(state);
    }

    const _handle = handle || element;
    _handle.style.userSelect  = "none";
    _handle.style.touchAction = "none";
    element.style.position    = "absolute";

    _handle.addEventListener("pointerdown", (event: PointerEvent) => {
        event.preventDefault(); // To prevent bugs when all text on the page is selected (Ctrl + A)
        const offsetY = event.clientY - parseInt(getComputedStyle(element).top);
        const offsetX = event.clientX - parseInt(getComputedStyle(element).left);

        let state: MoveState;
        function onMove(event: PointerEvent) {
            !_handle.hasPointerCapture(event.pointerId) && _handle.setPointerCapture(event.pointerId);
            state = {
                top:  `${event.clientY - offsetY}px`,
                left: `${event.clientX - offsetX}px`,
            };
            _onMove(state);
        }
        function onEnd() {
            removeEventListener("pointermove", onMove);
            state && _onStop?.(state);
        }
        addEventListener("pointermove", onMove, {passive: true});
        addEventListener("pointerup", onEnd, {once: true});
    });
}


export type ResizableOpts = {
    minW?: number,
    minH?: number,
    size?: number,
    onStop?: (state: ResizeState) => void,
    onMove?: (state: ResizeState) => void,
    state?: ResizeState,
}

export function makeResizable(element: HTMLElement, {
    minW = 32, minH = 32, size = 16, onStop: _onStop, onMove, state
}: ResizableOpts = {}) {
    const _onMove = (state: ResizeState) => {
        onMove?.(state);
        assignStyleState(element, state);
    };
    if (state) {
        _onMove(state);
        _onStop?.(state);
    }

    const lrCorner = document.createElement("div");
    lrCorner.style.cssText =
        `width: ${size}px; height: ${size}px; border-radius: ${(size / 2)}px;` +
        `bottom: ${-(size / 2)}px; right: ${-(size / 2)}px; ` +
        `position: absolute; background-color: transparent; cursor: se-resize; touch-action: none;`;
    element.append(lrCorner);

    lrCorner.addEventListener("pointerdown",event => {
        event.preventDefault();
        lrCorner.setPointerCapture(event.pointerId);
        const offsetX = event.clientX - element.offsetLeft - parseInt(getComputedStyle(element).width);
        const offsetY = event.clientY - element.offsetTop  - parseInt(getComputedStyle(element).height);

        let state: ResizeState;
        function onMove(event: PointerEvent) {
            let x = event.clientX - element.offsetLeft - offsetX;
            let y = event.clientY - element.offsetTop  - offsetY;
            if (x < minW) { x = minW; }
            if (y < minH) { y = minH; }
            state = {
                width:  `${x}px`,
                height: `${y}px`,
            };
            _onMove(state);
        }
        function onEnd() {
            lrCorner.removeEventListener("pointermove", onMove);
            state && _onStop?.(state);
        }
        lrCorner.addEventListener("pointermove", onMove, {passive: true});
        lrCorner.addEventListener("lostpointercapture", onEnd, {once: true});
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
