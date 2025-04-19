import { Infrastructure } from "@budgetTypes/infrastructure";

export class CommandRegistry<K extends string> {
  private commands: Record<string, Infrastructure.Command> = {};

  register(key: K, command: Infrastructure.Command): void {
    this.commands[key] = command;
  }

  get(key: K): Infrastructure.Command | undefined {
    return this.commands[key];
  }
}
