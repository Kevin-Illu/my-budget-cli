// this file contains the definitions of the types used in the entity validators
// the entity validators are used to validate the values of the entities

// the primitive value is the base type of all the values that can be validated.
type PrimitiveValue = string | number | boolean | Date | ObjectValue | null | undefined;

// the object value is an special object and the implementation of the
// validator for this kind of object is not implemented yet. Maybe in the future :)
type ObjectValue = { [key: string]: unknown };


// The Validator Function definition is a function that receives a value and returns a value
// It is used to validate the values of the entities
// but i'm not sure if this can trhow an error and if this should return an especific value type

// TODO: check if this should return an specific value type
// TODO: check if this can throw an error
type EntityValidatorFunction<P, R> = (value: P) => R;

type EntitySchemaValidatorValue =
    PrimitiveValue |
    [
        PrimitiveValue | PrimitiveValue[],
        undefined | null | EntityValidatorFunction<unknown, unknown> | EntityValidatorFunction<unknown, unknown>[]
    ]

// The entity schema validator structure
export type EntitySchemaValidator = {
    [key: string]: EntitySchemaValidatorValue
}