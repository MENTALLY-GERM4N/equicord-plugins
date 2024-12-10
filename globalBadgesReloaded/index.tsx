import {
	addBadge,
	BadgePosition,
	type BadgeUserArgs,
	type ProfileBadge,
	removeBadge,
} from "@api/Badges";
import definePlugin from "@utils/types";
import { React, Tooltip } from "@webpack/common";

type CustomBadge =
	| string
	| {
			name: string;
			badge: string;
			custom?: boolean;
	  };

interface BadgeCache {
	badges: {
		[mod: string]: CustomBadge[];
	};
	expires: number;
}

const API_URL = "https://badge.ipv4-army.workers.dev";

// @ts-ignore
const modLoader = globalThis?.Vencord?.Util?.EquicordDevs ? "Equicord" : "Vencord";

const cache = new Map<string, BadgeCache>();
const EXPIRES = 1000 * 60 * 15;

async function fetchBadges(
	id: string,
): Promise<BadgeCache["badges"] | undefined> {
	const cachedValue = cache.get(id);
	if (!cache.has(id) || (cachedValue && cachedValue.expires < Date.now())) {
		const resp = await fetch(`${API_URL}/users/${id}`);
		const body = (await resp.json()) as BadgeCache["badges"];
		cache.set(id, { badges: body, expires: Date.now() + EXPIRES });
		return body;
	}
	if (cachedValue) {
		return cachedValue.badges;
	}
}

function BadgeComponent({ name, img }: { name: string; img: string }) {
	return (
		<Tooltip text={name}>
			{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
{(tooltipProps: any) => (
				// biome-ignore lint/a11y/useAltText: <explanation>
				<img
					{...tooltipProps}
					src={img}
					style={{
						width: "20px",
						height: "20px",
						transform: name.includes("Replugged") ? "scale(0.9)" : null,
					}}
				/>
			)}
		</Tooltip>
	);
}

function GlobalBadges(badgeUser: BadgeUserArgs) {
	const [badges, setBadges] = React.useState<BadgeCache["badges"]>({});
	React.useEffect(() => {
		fetchBadges(badgeUser.user.id).then((badges) => {
			if (badges) setBadges(badges);
		});
	}, []);

	if (!badges || !Object.keys(badges).length) return null;
	const globalBadges: JSX.Element[] = [];

	for (const mod in Object.keys(badges)) {
		if (mod === modLoader) return;
		for (let badge of badges[mod]) {
			if (typeof badge === "string") {
				const fullNames: { [key: string]: string } = {
					hunter: "Bug Hunter",
					early: "Early User",
				};
				badge = {
					name: fullNames[badge as string] ? fullNames[badge as string] : badge,
					badge: `${API_URL}/badges/${mod}/${(badge as string).replace(mod, "").trim().split(" ")[0]}`,
				};
			} else if (typeof badge === "object") badge.custom = true;
			const cleanName = badge.name.replace(mod, "").trim();
			if (!badge.custom)
				badge.name = `${mod} ${cleanName.charAt(0).toUpperCase() + cleanName.slice(1)}`;
			globalBadges.push(<BadgeComponent name={badge.name} img={badge.badge} />);
		}
	}

	return (
		<div
			className="vc-global-badges"
			style={{
				display: "flex",
				alignItems: "center",
			}}
		>
			{globalBadges}
		</div>
	);
}

const Badge: ProfileBadge = {
	component: GlobalBadges,
	position: BadgePosition.START,
};

export default definePlugin({
	name: "Global Badges Reloaded",
	description: "Fork of Global Badges that runs on Cloudflare Workers.",
	authors: [{ name: "S€th", id: 1273447359417942128n }],

	start: () => addBadge(Badge),
	stop: () => removeBadge(Badge),
});
