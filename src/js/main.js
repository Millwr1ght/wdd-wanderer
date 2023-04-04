import { draw } from "./Canvas.mjs";
import Game from "./wanderer/Game.mjs";
import { loadHeaderFooter, loadNavbar, qs } from "./utils";

loadHeaderFooter();
loadNavbar("#home");

//load game
qs("body").onload = draw("#canvas");
const game = new Game();

window.onload = () => {
    const gameWindow = qs("#canvas").getContext("2d");
    game.run(gameWindow);
};
