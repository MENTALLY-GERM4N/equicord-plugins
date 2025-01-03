/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import {
	addPreSendListener,
	removePreSendListener,
	type SendListener,
} from "@api/MessageEvents";
import { definePluginSettings } from "@api/Settings";
import definePlugin from "@utils/types";
import { OptionType } from "@utils/types";

const settings = definePluginSettings({
	autoCapitalization: {
		type: OptionType.BOOLEAN,
		description: "Auto Capitalization to the first letter",
	},
	autoPunctuation: {
		type: OptionType.BOOLEAN,
		description: "Auto Punctuation at the end of a sentence",
	},
	autoWordReplacement: {
		type: OptionType.BOOLEAN,
		description: "Auto Capitalizes the first letter",
	},
});

export default definePlugin({
	name: "GrammarNazi",
	description: "Automatic punctuation, capitalization, and word replacement.",
	authors: [{ name: "S€th", id: 1273447359417942128n }],
	dependencies: ["MessageEventsAPI"],
	settings,
	async start() {
		let dictionary = await fetch(
			"https://cdn.jsdelivr.net/gh/wont-stream/dictionary@main/index.min.json",
		);
		dictionary = await dictionary.json();

		addPreSendListener(this.getPresend(dictionary));
	},
	stop() {
		removePreSendListener(this.getPresend({}));
	},

	getPresend(dictionary: { [key: string]: string }) {
		const presendObject: SendListener = (_, msg) => {
			msg.content = msg.content.trim();
			if (!msg.content.includes("```") && /\w/.test(msg.content.charAt(0))) {
				if (settings.store.autoWordReplacement) {
					const re = new RegExp(
						`(^|(?<=[^A-Z0-9]+))(${Object.keys(dictionary)
							.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
							.join("|")})((?=[^A-Z0-9]+)|$)`,
						"gi",
					);
					if (re !== null) {
						msg.content = msg.content.replace(re, (match) => {
							return dictionary[match.toLowerCase()] || match;
						});
					}
				}

				if (settings.store.autoPunctuation) {
					if (/[A-Z0-9]/i.test(msg.content.charAt(msg.content.length - 1))) {
						if (
							!msg.content.startsWith("http", msg.content.lastIndexOf(" ") + 1)
						)
							msg.content += ".";
					}
				}

				// Ensure sentences are capitalized after punctuation
				if (settings.store.autoCapitalization) {
					msg.content = msg.content.replace(/([.!?])\s*(\w)/g, (match) =>
						match.toUpperCase(),
					);

					// Ensure the first character of the entire message is capitalized
					if (!msg.content.startsWith("http")) {
						msg.content =
							msg.content.charAt(0).toUpperCase() + msg.content.slice(1);
					}
				}
			}
		};
		return presendObject;
	},
});
