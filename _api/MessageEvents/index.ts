export type * from "@vencord/types/api/MessageEvents";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const addPreSendListener = (listenr: any) => {};
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const removePreSendListener = (listener: any) => {};

export { addPreSendListener, removePreSendListener };
