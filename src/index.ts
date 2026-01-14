import { Logger } from "./logger";
import { Settings } from "./settings";

class App {
  constructor(
    private logger: Logger,
    private settings: Settings,
  ) {}

  async start() {
    await this.init();
  }

  async init() {
    await this.logger.init();
    await this.settings.init();

    await this.settings.save({ ...this.settings.settings, store: "memory" });
  }
}

const logger = new Logger();
const settings = new Settings(logger);

new App(logger, settings).start();
