import {makeMovableEx, makeResizableEx} from "./make-fancy.ts";

const popup1 = document.querySelector<HTMLElement>("#popup-1")!;
const popup1Header = popup1.querySelector<HTMLElement>(".popup-header")!;
const {reset: resetPos1} =   makeMovableEx(popup1, "fancy-demo--popup-1",{ handle: popup1Header });
const {reset: resetSiz1} = makeResizableEx(popup1, "fancy-demo--popup-1");

const popup2 = document.querySelector<HTMLElement>("#popup-2")!;
const popup3 = document.querySelector<HTMLElement>("#popup-3")!;

const {reset: resetPos2} = makeMovableEx(popup2, "fancy-demo--popup-2");
const {reset: resetPos3} = makeMovableEx(popup3, "fancy-demo--popup-3");

const resetBtn = document.querySelector("#reset-btn")!;
resetBtn.addEventListener("click", () => {
    resetPos1();
    resetSiz1();
    resetPos2();
    resetPos3();
});
