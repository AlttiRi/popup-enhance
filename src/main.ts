import {makeMovable, storeStateInLS} from "./make-fancy.ts";

makeMovable(
    document.querySelector("#popup-1")!,
    storeStateInLS({
        id: "movable-demo-popup-1",
        restore: true,
    }),
);

const popup2 = document.querySelector<HTMLElement>("#popup-2")!;
const popup3 = document.querySelector<HTMLElement>("#popup-3")!;

makeMovable(
    popup2,
    storeStateInLS({
        id: "movable-demo-popup-2",
        restore: true,
    }),
);
makeMovable(
    popup3,
    storeStateInLS({
        id: "movable-demo-popup-3",
        restore: true,
    }),
);

console.log(class A {
    static a = 123;
});
