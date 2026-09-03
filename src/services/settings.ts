import z from "zod";
import { appconfig, TSettings } from "../config/app";
import File from "../core/file.io";
import Logger from "@budget/core/logger";
import Env from "@budget/config/env";
import { StringModule } from "@budget/shared/string";
import { Failure, Success, TryCatch } from "@budget/core/result";

const { DEFAULT_SETTINGS, SettingsSchema } = appconfig;

export class Settings {
  public settingsfilepath = Env.env!.SETTINGS_FILE_PATH;
  public settings!: TSettings;

  async init() {
    const openFileResult = await File.file(this.settingsfilepath);

    let settingsFile: Bun.BunFile;
    let exist = false;

    openFileResult.match({
      ok: async (value) => {
        settingsFile = value;
        exist = await value.exists();
      },
      err: async (err) => {
        Logger.error("Error open the settings file", err);
      },
    });

    if (!exist) {
      const fileOperationResult = await File.write(
        this.settingsfilepath,
        StringModule.prettifyJSON(DEFAULT_SETTINGS),
      );

      if (fileOperationResult.isErr()) {
        const err = fileOperationResult as Failure<Error>;
        Logger.error(`Cannot create the settings file`, err);
        return;
      }

      Logger.info("The settings file was created successfully");

      this.settings = DEFAULT_SETTINGS;
      return;
    }

    const readResult = await TryCatch.run(() => settingsFile.json());

    if (readResult.isErr()) {
      const err = readResult as Failure<Error>;
      Logger.error("Failed to read settings file", err.error, {
        context: err.error.stack,
      });
      this.settings = DEFAULT_SETTINGS;
      return;
    }

    let result;
    if (readResult.isOk()) {
      result = SettingsSchema.safeParse(readResult.value);
    }

    if (!result.success) {
      this.settings = DEFAULT_SETTINGS;
      const err = z.treeifyError(result.error, (e) => e.message).errors;

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
