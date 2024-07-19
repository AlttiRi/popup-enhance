import {makeMovable, makeResizable, storeStateInLS} from "./make-fancy.ts";

const popup1 = document.querySelector<HTMLElement>("#popup-1")!;
const popup1Header = popup1.querySelector<HTMLElement>(".popup-header")!;
makeMovable(
    popup1,
    {
        handle: popup1Header,
        ...storeStateInLS({
            id: "fancy-demo--popup-1--move-state",
            restore: true,
        })
    }
);
makeResizable(
    popup1,
    storeStateInLS({
        id: "fancy-demo--popup-1--resize-state",
        restore: true,
    })
);

const popup2 = document.querySelector<HTMLElement>("#popup-2")!;
const popup3 = document.querySelector<HTMLElement>("#popup-3")!;

makeMovable(
    popup2,
    storeStateInLS({
        id: "fancy-demo--popup-2--move-state",
        restore: true,
    }),
);
makeMovable(
    popup3,
    storeStateInLS({
        id: "fancy-demo--popup-3--move-state",
        restore: true,
    }),
);
