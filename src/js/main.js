import Game from "./wanderer/Game.mjs";
import { loadHeaderFooter, loadNavbar } from "./utils.mjs";
import { drawLogo } from "./Canvas.mjs";
//import Alert from "./AlertHandler.mjs";
import { Octokit } from "octokit";


loadHeaderFooter(drawLogo);
loadNavbar("#home");

//load game
//qs("body").onload = draw("#canvas");
const game = new Game();

window.onload = () => {
    game.run("#canvas");
};

//let data = await getJSONData("/json/alerts.json");
//console.log(data[0]);
//const alert = new Alert();
//alert.renderAlertByID(0);


//last updated
const octokit = new Octokit({});
await octokit.request("GET /octocat", {});