// this file contains the definitions of the types used in the entity validators
// the entity validators are used to validate the values of the entities

// the primitive value is the base type of all the values that can be validated.
type PrimitiveValue = string | number | boolean | Date | ObjectValue | null | undefined;

// the object value is an special object and the implementation of the
// validator for this kind of object is not implemented yet. Maybe in the future :)
type ObjectValue = { [key: string]: unknown };

// The Validator Function definition is a function that receives a value and returns a value
// It is used to validate the values of the entities
export type ValidatorError = {
    messsage: string;
    error: boolean;
}

export type EntityValidatorFunction = (value: unknown) => ValidatorError;

export type EntityValidatorSchemaValue =
    PrimitiveValue |
    [
        PrimitiveValue | PrimitiveValue[],
        undefined | null | EntityValidatorFunction | EntityValidatorFunction[]
    ]

// Angular's like schema for the entity validator
// the schema is used to validate the values of the entities
// TODO: support nested objects in the schema ;)
export type EntityValidatorSchema = {
    [key: string]: EntityValidatorSchemaValue
}