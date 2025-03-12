import { EntityValidatorSchema, ValidatorError } from "./entity-validators.definitions";

// TODO: add jsdocs to this class ;D
export default class EntityValidator {
    constructor() { }

    static validate(schema: EntityValidatorSchema): undefined | ValidatorError {
        for (const [_, value] of Object.entries(schema)) {
            if (Array.isArray(value)) {
                const [valueToValidate, validators] = value;
                if (Array.isArray(validators)) {
                    for (const validator of validators) {
                        const result = validator(valueToValidate);
                        if (result.error) {
                            return result;
                        }
                    }
                } else {
                    const result = validators(valueToValidate);
                    if (result.error) {
                        return result;
                    }
                }
            } else {
                continue;
            }
        }
    };

    static required(value): ValidatorError {
        if (value !== undefined && value !== null) {
            return {
                messsage: "",
                error: false
            }
        }

        return {
            messsage: "The value is required",
            error: true
        }
    }
}