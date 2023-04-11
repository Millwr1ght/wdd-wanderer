import { drawLogo } from "./Canvas.mjs";
import ExternalServices from "./ExternalServices.mjs";
import NewsList from "./NewsList.mjs";
import { loadHeaderFooter, loadNavbar, qs } from "./utils.mjs";

loadHeaderFooter(drawLogo);
loadNavbar("#news");

const data = new ExternalServices("local");
const articleSection = qs(".articles");
const news = new NewsList("news", data, articleSection);
news.init();