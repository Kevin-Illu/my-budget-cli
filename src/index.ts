import { Logger } from "./logger";
import { Settings } from "./settings";

class App {
  logger: Logger;
  settings: Settings;

  start() {
    this.init();
  }

  async init() {
    this.logger = new Logger();
    await this.logger.init();

    this.settings = new Settings(this.logger);
    await this.settings.init();
  }
}

new App().start();
