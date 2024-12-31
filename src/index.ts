type MetaDataError = {};
type KError<T> = T & MetaDataError;
type Result<T, E> = [undefined | T, undefined | KError<E>];

console.log("hola?");
