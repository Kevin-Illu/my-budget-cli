import {
  EntityValidatorSchema,
  ValidatorError,
} from "./entity-validators.definitions";

export default class EntityValidator {
  constructor() {}

  // TODO: support nested objects.
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
      }
    }
  }

  static required(value): ValidatorError {
    if (value !== undefined && value !== null) {
      return {
        message: "",
        error: false,
      };
    }

    return {
      message: "The value is required",
      error: true,
    };
  }
}
