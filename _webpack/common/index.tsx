export type * from "@vencord/types/webpack/common";

const React = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	useState: (any: any) => {},
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const Tooltip = (any: any) => {
	return <span>Tooltip</span>;
};

export { React, Tooltip };
