export type * from "@vencord/types/webpack/common";

const React = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	useState: (any: any) => {},
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const Tooltip = (any: any) => {
	return <span>Tooltip</span>;
};

const RelationshipStore = {}

const UserStore = {}

const ChannelStore = {}

const GuildStore = {}

const GuildMemberStore = {}

const Text = {}

export { React, Tooltip, RelationshipStore, UserStore, ChannelStore, GuildStore, GuildMemberStore, Text };
