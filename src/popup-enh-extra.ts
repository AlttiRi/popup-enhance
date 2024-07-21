import {AnyState, makeMovable, makeResizable, MovableOpts, ResizableOpts} from "./popup-enh-core.ts";


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
