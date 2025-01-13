import { $, write, Glob } from "bun";

$`bunx @biomejs/biome format --write`;

await $`git add .`.quiet();
try {
await $`git commit -m "Formatting."`.quiet();
} catch {}
const glob = new Glob("*/index.ts*");

const files = glob.scanSync(".");
console.log(files)
let readme =
	'# M€NT4LLY G€RM4N *Equicord* Plugins <a href="https://docs.vencord.dev/installing/custom-plugins"><kbd>Installation</kbd></a>\nFor support please visit the [Equicord Discord Server](https://discord.gg/6remVCPg) and ping `<@1273447359417942128>` in the #support channel\n\n';

for (const file of files) {
	if (!file.startsWith("_")) {
		const {
			default: { name, description },
		} = await import(`./${file}`);

		readme += `## ${name} <a href="https://github.com/MENTALLY-GERM4N/vencord-plugins/raw/refs/heads/main/${file.replaceAll("\\", "/")}"><kbd>Download</kbd></a>\n`;
		readme += `${description}\n\n`;
	}
}

await write("README.md", readme);

await $`git add .`.quiet();
await $`git commit -m "Update"`.quiet();
await $`git push`.quiet();
