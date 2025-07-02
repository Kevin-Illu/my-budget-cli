import { GitAdapter } from "../adapters/git.adapter";
import path from "node:path";
import TryCatch from "../trycatch";

export class PluginsService {
  gitPluginsRepoUrl: string =
    "https://github.com/Kevin-Illu/budget-cli-plugins-list.git";
  localPath = "/plugins-dist";

  constructor(private gitAdapter: GitAdapter) {}

  async cloneListOfPlugins() {
    await TryCatch.runAsync(() =>
      this.gitAdapter.clone(this.gitPluginsRepoUrl, this.localPath),
    );
  }
}
