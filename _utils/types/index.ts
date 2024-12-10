// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const definePlugin = (config: any) => {
    return config;
}

export default definePlugin;

export type * from '@vencord/types/utils/types'