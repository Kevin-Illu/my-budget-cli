import {
  DEFAULT_SETTINGS,
  FILE_PATHS,
  SETTINGS,
  type TSettings,
} from "./const";
import { Logger } from "./logger";
import TryCatch from "./result";

export class Settings {
  public settingsfilepath = FILE_PATHS.settingsfilepath;
  public settings: TSettings;

  constructor(private readonly logger: Logger) {}

  async init() {
    const settings = Bun.file(this.settingsfilepath);
    const exist = await settings.exists();

    if (!exist) {
      const result = await TryCatch.run(() =>
        Bun.write(this.settingsfilepath, this.prettifyJSON(DEFAULT_SETTINGS)),
      );

      if (result.isError()) {
        this.logger.error(`Cannot create the settings file`, result.error);
        this.settings = DEFAULT_SETTINGS;
        return;
      }

      this.settings = DEFAULT_SETTINGS;
      return;
    }

    const readResult = await TryCatch.run(() => settings.json());

    if (readResult.isError()) {
      this.logger.error("Failed to read settings file", readResult.error, {
        context: readResult.error.stack,
      });
      this.settings = DEFAULT_SETTINGS;
      return;
    }

    const result = SETTINGS.safeParse(readResult.value);

    if (!result.success) {
      this.logger.error("Invalid settings file", result.error);
      this.settings = DEFAULT_SETTINGS;
      return;
    }

    this.logger.info("The settings was successfully loaded");
    this.settings = result.data;
  }

  async save(settings: TSettings) {
    const newSettings = {
      ...this.settings,
      ...settings,
    };

    const result = await TryCatch.run(() =>
      Bun.write(this.settingsfilepath, this.prettifyJSON(newSettings)),
    );

    if (result.isError()) {
      this.logger.error("Failed to save settings file", result.error);
      return;
    }

    this.logger.info("Settings file was successfully saved");
    this.settings = newSettings;
  }

  private prettifyJSON(value: { [key: string]: any }) {
    return JSON.stringify(value, null, 2) + "\n";
  }
}
