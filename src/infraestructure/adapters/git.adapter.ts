import { simpleGit, CleanOptions, type SimpleGit } from "simple-git";


export class GitAdapter {
  git: SimpleGit;

  constructor() {
    simpleGit().clean(CleanOptions.FORCE);
    this.git = simpleGit();
  }

  async clone(repoPath: string, localPath: string) {
    await this.git.clone(repoPath, localPath);
  }
}