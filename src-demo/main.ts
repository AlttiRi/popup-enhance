import "./init-html.ts";
import {getPopupEnh, makeFocusable} from "../index.ts";

const {makeMovableEx, makeResizableEx} = getPopupEnh("popup-enhance-demo");

const popup1  = document.querySelector<HTMLElement>("#popup-1")!;
const popup1h =   popup1.querySelector<HTMLElement>(".popup-header")!;
const {reset: resetPos1} =   makeMovableEx(popup1, "popup-1", { handle: popup1h });
const {reset: resetSiz1} = makeResizableEx(popup1, "popup-1", { minW: 128, minH: 128 });

const popup2  = document.querySelector<HTMLElement>("#popup-2")!;
const popup3  = document.querySelector<HTMLElement>("#popup-3")!;
const popup3h =   popup3.querySelector<HTMLElement>(".popup-header")!;

const {reset: resetPos2} = makeMovableEx(popup2, "popup-2", { position: "relative" });
const {reset: resetPos3} = makeMovableEx(popup3, "popup-3", { handle: popup3h, position: "relative" });

makeFocusable(popup1, popup1h);
makeFocusable(popup2);
makeFocusable(popup3, popup3h);


const resetBtn = document.querySelector("#reset-btn")!;
resetBtn.addEventListener("click", () => {
    resetPos1();
    resetSiz1();
    resetPos2();
    resetPos3();
});

const reloadBtn = document.querySelector("#reload-btn")!;
reloadBtn.addEventListener("click", () => {
    location.reload();
});


document.querySelectorAll<HTMLElement>(".number").forEach(elem => {
    elem.addEventListener("click", _ => {
        elem.innerText = String(Number(elem.innerText) + 1);
    });
});
