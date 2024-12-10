// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default (config: any) => {
    return config;
}

export enum OptionType {
    STRING = 0,
    NUMBER = 1,
    BIGINT = 2,
    BOOLEAN = 3,
    SELECT = 4,
    SLIDER = 5,
    COMPONENT = 6
}

export type * from '@vencord/types/utils/types';