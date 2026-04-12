import DB from "./db";
import Logger from "./logger";
import "./config/app.ts";

Logger.init();
DB.init();
