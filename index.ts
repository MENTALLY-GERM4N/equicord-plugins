import { $, write, Glob } from "bun";

const glob = new Glob("*/index.ts");

const files = glob.scanSync(".");

let readme = "# M€NT4LLY G€RM4N Vencord Plugins\n\n";

for (const file of files) {
    const { default: { name, description }} = await import(`./${file}`);

    readme += `## ${name}\n\n`
    readme += `${description}\n`;
    readme += `<a href="https://github.com/MENTALLY-GERM4N/vencord-plugins/raw/refs/heads/main/${file.replaceAll("\\", "/")}">Download ${name}</a>\n\n`;
}

await write("README.md", readme);

await $`git add .`.quiet();
await $`git commit -m "Update"`.quiet();
await $`git push`.quiet();