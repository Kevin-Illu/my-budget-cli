import Env from "./config/env";
import DB from "./db";
import Logger from "./logger";

Env.init();
Logger.init();
DB.init();

if (Env.env.NODE_ENV === "dev") {
  Logger.internal("-----[DEV MODE ACTIVATED]-----");
}
