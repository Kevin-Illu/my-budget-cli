import { z } from "zod";
import { StringModule } from "../utils/string";

export default abstract class Env {
  static envSchema = z.object({
    NODE_ENV: z.enum(["dev", "prod"]),
    LOG_FILE_PATH: z.string(),
    SETTINGS_FILE_PATH: z.string(),
    DATABASE_PATH: z.string(),
    STORE_TYPE: z.enum(["sqlite", "json", "memory"]),
  });

  static env: z.infer<typeof this.envSchema>;

  static init() {
    const result = this.envSchema.safeParse(process.env);

    if (!result.success) {
      const err = z.treeifyError(result.error, (e) => e.message).properties;
      throw Error(StringModule.prettifyJSON(err));
    }

    this.env = result.data;
  }
}
