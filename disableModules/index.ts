/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import definePlugin from "@utils/types";

export default definePlugin({
    name: "Disable Modules",
    description: "Opinionated Discord module disabler.",
    authors: [{ name: "S€th", id: 1273447359417942128n }],
    patches: [
        {
            find: '.ensureModule("discord_cloudsync")',
            replacement: {
                match: /\.ensureModule\("discord_cloudsync"\)\.then\(\(.+?\)}\)}/,
                replace: '.ensureModule("discord_cloudsync")}',
            },
        },
        {
            find: '.ensureModule("discord_spellcheck")',
            replacement: {
                match: /\.ensureModule\("discord_spellcheck"\)\.then\(\(.+?\)}\)}/,
                replace: '.ensureModule("discord_spellcheck")}',
            },
        },
        {
            find: '.ensureModule("discord_overlay2")',
            replacement: {
                match: /\.ensureModule\("discord_overlay2"\)\.then\(\(.+?\)}\)}/,
                replace: '.ensureModule("discord_overlay2")}',
            },
        },
        {
            find: '.ensureModule("discord_rpc")',
            replacement: {
                match: /\.ensureModule\("discord_rpc"\)\.then\(\(.+?\)}\)}/,
                replace: '.ensureModule("discord_rpc")}',
            },
        },
        {
            find: '.ensureModule("discord_zstd")',
            replacement: {
                match: /\.ensureModule\("discord_zstd"\)\.then\(\(.+?\)}\)}/,
                replace: '.ensureModule("discord_zstd")}',
            },
        },

    ],
});
