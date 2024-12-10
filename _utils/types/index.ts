
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const definePlugin = (config: any) => {
    return config;
}

const OptionType = {
    BOOLEAN: 1
}

export default definePlugin;

export { OptionType}