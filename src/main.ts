import {makeMovable, makeResizable, storeStateInLS} from "./make-fancy.ts";

const popup1 = document.querySelector<HTMLElement>("#popup-1")!;
const popup1Header = popup1.querySelector<HTMLElement>(".popup-header")!;
const {reset: resetPos1} = makeMovable(
    popup1,
    {
        handle: popup1Header,
        ...storeStateInLS({
            id: "fancy-demo--popup-1--move-state"
        })
    }
);
const {reset: resetSiz1} = makeResizable(
    popup1,
    storeStateInLS({
        id: "fancy-demo--popup-1--resize-state"
    })
);

const popup2 = document.querySelector<HTMLElement>("#popup-2")!;
const popup3 = document.querySelector<HTMLElement>("#popup-3")!;

const {reset: resetPos2} = makeMovable(
    popup2,
    storeStateInLS({
        id: "fancy-demo--popup-2--move-state"
    }),
);
const {reset: resetPos3} = makeMovable(
    popup3,
    storeStateInLS({
        id: "fancy-demo--popup-3--move-state"
    }),
);

const resetBtn = document.querySelector("#reset-btn")!;
resetBtn.addEventListener("click", () => {
    resetPos1();
    resetSiz1();
    resetPos2();
    resetPos3();
});
