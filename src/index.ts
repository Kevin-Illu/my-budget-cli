import { Logger } from "./logger";
import { Settings } from "./settings";

class App {
  logger: Logger;
  settings: Settings;

  constructor() {
    this.logger = new Logger();
    this.settings = new Settings(this.logger);
  }

  start() {
    this.init();
  }

  async init() {
    await this.logger.init();
    await this.settings.init();
  }
}

new App().start();
