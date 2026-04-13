import { appendFile } from "node:fs/promises";
import TryCatch from "./result";

/**
 * File Adapter
 * this class provide functions to interact with the file system
 */
export default abstract class File {
  static async file(path: string, options?: any) {
    return await TryCatch.run(() => Bun.file(path, options));
  }

  static async append(path: string, value: string) {
    return await TryCatch.run(async () => await appendFile(path, value));
  }

  static async write(path: string, value: string) {
    return await TryCatch.run(async () => await Bun.write(path, value));
  }
}
