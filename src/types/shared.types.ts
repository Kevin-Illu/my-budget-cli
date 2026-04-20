/**
 * Convert snake_case string to camelCase
 */
type SnakeToCamel<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<SnakeToCamel<Tail>>}`
  : S;

/**
 * Convert a DB Object to Js object
 */
type DbToJsDeep<T> = {
  [K in keyof T as SnakeToCamel<K & string>]: T[K] extends object
    ? DbToJsDeep<T[K]>
    : T[K];
};
