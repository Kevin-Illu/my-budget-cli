import { CommandRegistry } from "./command.registry";

export class CommandBus<K extends string> {
  constructor(private registry: CommandRegistry<K>) { }

  async execute<T = any>(key: K, payload?: any): Promise<T> {
    const command = this.registry.get(key);
    if (!command) {
      throw new Error(`Command not found: ${key}`);
    }

    return await command.execute(payload) as T;
  }
}