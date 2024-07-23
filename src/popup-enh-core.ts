export type MoveStyleProps = "top" | "left";
export type MoveState = Record<MoveStyleProps, `${string}px`>;

export type ResizeStyleProps = "width" | "height";
export type ResizeState = Record<ResizeStyleProps, `${string}px`>;

export type AnyStyleProps = MoveStyleProps | ResizeStyleProps;
export type AnyState = MoveState | ResizeState;

function assignStyleState(element: HTMLElement, state: AnyState) {
    for (const [k, v] of Object.entries(state)) {
        element.style[k as AnyStyleProps] = v;
    }
}
function resetStyleState(element: HTMLElement, state: AnyState) {
    Object.keys(state).forEach(k => element.style[k as AnyStyleProps] = "");
}


export type MovableOpts = {
    handle?: HTMLElement,
    onMove?: (state: MoveState) => void,
    onStop?: (state: MoveState) => void,
    state?: MoveState,
    reset?: Function,
    position?: "absolute" | "relative";
}

export function makeMovable(element: HTMLElement, {
    handle, onMove, onStop, state, reset, position = "absolute"
}: MovableOpts = {}) {
    state && assignStyleState(element, state); // Restore position

    const _handle = handle || element;
    _handle.style.userSelect  = "none";
    _handle.style.touchAction = "none";
    element.style.position    = position;

    _handle.addEventListener("pointerdown", (event: PointerEvent) => {
        event.preventDefault(); // To prevent bugs when all text on the page is selected (Ctrl + A)
        const offsetY = event.clientY - parseInt(getComputedStyle(element).top);
        const offsetX = event.clientX - parseInt(getComputedStyle(element).left);

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
        addEventListener("pointermove", _onMove, {passive: true});
        addEventListener("pointerup",   _onStop, {once:    true});
    });
    return { reset: () => { state && resetStyleState(element, state); reset?.(); } };
}


export type ResizableOpts = {
    minW?: number,
    minH?: number,
    size?: number,
    onMove?: (state: ResizeState) => void,
    onStop?: (state: ResizeState) => void,
    state?: ResizeState,
    reset?: Function,
}

export function makeResizable(element: HTMLElement, {
    minW = 64, minH = 64, size = 16, onMove, onStop, state, reset
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
    return { reset: () => { state && resetStyleState(element, state); reset?.(); } };
}
