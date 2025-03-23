import { Infraestructure } from "@budgetTypes/infraestructure";

export class CommandRegistry<K extends string> {
    private commands: Record<string, Infraestructure.Command> = {};

    register(key: K, command: Infraestructure.Command): void {
        this.commands[key] = command;
    }

    get(key: K): Infraestructure.Command | undefined {
        return this.commands[key];
    }
}