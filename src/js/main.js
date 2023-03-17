import { draw } from "./Canvas.mjs";
import { qs } from "./utils";
import Game from "./Game.mjs";

qs("body").onload = draw("#canvas");

let game = new Game();
game.init()