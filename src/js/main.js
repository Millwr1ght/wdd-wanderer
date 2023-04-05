import Game from "./wanderer/Game.mjs";
import { loadHeaderFooter, loadNavbar, qs } from "./utils.mjs";
import { draw } from "./Canvas.mjs";

loadHeaderFooter();
loadNavbar("#home");

//load game
//qs("body").onload = draw("#canvas");
const game = new Game();

window.onload = () => {
    game.run("#canvas");
};
