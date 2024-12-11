export type * from "@vencord/types/api/Settings";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const definePluginSettings = (settings: Record<string, any>) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const store: Record<string, any> = {};

	for (const key of Object.keys(settings)) {
		store[key] = settings[key];
	}

	return { store };
};

export { definePluginSettings };
