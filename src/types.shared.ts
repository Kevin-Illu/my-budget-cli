export namespace App {
  // describe the app settings (options the user can change)
  export type Settings = any;
}

export namespace LifeCycle {
  export interface Init {
    // this method recive the app settings to initialize services or
    // global configurations
    init(settings: App.Settings): Promise<void>;
  }
}
