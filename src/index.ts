import Logger from "./logger";
import { Settings } from "./settings";

class App {
  constructor(private settings: Settings) {}

  async start() {
    await this.init();
  }

  async init() {
    await this.settings.init();

    await this.settings.save({ ...this.settings.settings, store: "memory" });
  }
}

const settings = new Settings();

new App(settings).start();
