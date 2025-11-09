import { Infrastructure } from "@budgetTypes/infrastructure";

export class CommandRegistry<K extends string = string> {
  private commands: Record<string, Infrastructure.Command<any>> = {};

  register<T>(key: K, command: Infrastructure.Command<T>): void {
    this.commands[key] = command;
  }

  get<T>(key: K): Infrastructure.Command<T> | undefined {
    return this.commands[key] as Infrastructure.Command<T> | undefined;
  }
}
