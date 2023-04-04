import { draw } from "./Canvas.mjs";
import Game from "./Game.mjs";
import { loadHeaderFooter, loadNavbar, qs } from "./utils";

loadHeaderFooter();
loadNavbar("#home");

//load game
qs("body").onload = draw("#canvas");

let game = new Game();
game.init();
