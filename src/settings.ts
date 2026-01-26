import z from "zod";
import File from "./file.io";
import TryCatch from "./result";
import { appconfig, type TSettings } from "./config/app";
import Logger from "./logger";
import { StringModule } from "./utils/string";

const { DEFAULT_SETTINGS, FILE_PATHS, SettingsSchema } = appconfig;

export class Settings {
  public settingsfilepath = FILE_PATHS.settingsfilepath;
  public settings: TSettings;

  async init() {
    const settings = await File.file(this.settingsfilepath);

    if (settings.isError()) {
      Logger.error("Error open the settings file", settings.error);
    }

    const settingsFile = settings.value;
    const exist = await settingsFile.exists();

    if (!exist) {
      const result = await File.write(
        this.settingsfilepath,
        StringModule.prettifyJSON(DEFAULT_SETTINGS),
      );

      if (result.isError()) {
        Logger.error(`Cannot create the settings file`, result.error);
        this.settings = DEFAULT_SETTINGS;
        return;
      }

      Logger.info("The settings file was created successfully");

      this.settings = DEFAULT_SETTINGS;
      return;
    }

    const readResult = await TryCatch.run(() => settingsFile.json());

    if (readResult.isError()) {
      Logger.error("Failed to read settings file", readResult.error, {
        context: readResult.error.stack,
      });
      this.settings = DEFAULT_SETTINGS;
      return;
    }

    const result = SettingsSchema.safeParse(readResult.value);

    if (!result.success) {
      this.settings = DEFAULT_SETTINGS;
      const err = z.treeifyError(result.error, (e) => e.message).properties;

      Logger.error("Invalid settings file", StringModule.prettifyJSON(err));
      throw err;
    }

    Logger.info("The settings was successfully loaded");
    this.settings = result.data;
  }

  async save(settings: TSettings) {
    const newSettings = {
      ...this.settings,
      ...settings,
    };

    const result = await File.write(
      this.settingsfilepath,
      StringModule.prettifyJSON(newSettings),
    );

    if (result.isError()) {
      Logger.error("Failed to save settings file", result.error);
      return;
    }

    Logger.info("Settings file was successfully saved");
    this.settings = newSettings;
  }
}
