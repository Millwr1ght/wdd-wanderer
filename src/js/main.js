import { draw } from "./Canvas.mjs";
import { qs } from "./utils";

qs("body").onload = draw("#tutorial");
