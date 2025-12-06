import TreeMenuResolver from "menu-resolver";
import AppMenu from "./business/menu";
import { select } from "@inquirer/prompts";

class Application {
  constructor(private menu: TreeMenuResolver) {}

  async start() {
    while (true) {
      const options = this.menu.getDisplayableMenu();
      const selectableMenu = this.getSelectableMenu(options);
      const result = await this.showSelect(selectableMenu);
      const action = this.menu.choose(result);

      if (typeof action?.resolve === "function") {
        action.resolve();
      }
    }
  }

  async showSelect(options: any): Promise<string> {
    const result = await select({
      message: "",
      choices: options,
    });

    return result as string;
  }

  getSelectableMenu(options: { id: string; data?: any }[]) {
    return options.map((o) => ({ ...o?.data, value: o.id }));
  }
}

const menu = new AppMenu().menu;

new Application(menu).start();
