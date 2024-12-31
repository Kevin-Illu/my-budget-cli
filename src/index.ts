type MetaDataError = {};
type KError<T> = T & MetaDataError;
type Result<T, E> = [T, KError<E> | undefined];

console.log("hola?");
