// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const findAll = (func: any) => {
    return func({});
}

export { findAll };