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

let _removeChild: <T extends Node>(child: T) => T;
let _appendChild: <T extends Node>(child: T) => T;


const optimize = orig => function (...args) {
    if (typeof args[0].className === 'string' && (args[0].className.indexOf('activity') !== -1 ||
        args[0].className.indexOf('subText') !== -1 ||
        args[0].className.indexOf('botText') !== -1 ||
        args[0].className.indexOf('clanTag') !== -1))
        // @ts-ignore
        return setTimeout(() => orig.apply(this, args), 100);

    // @ts-ignore
    return orig.apply(this, args);
};

export default definePlugin({
    name: "Open Optimizer",
    description: "Ports OpenAsar's optimizer code.",
    authors: [{ name: "S€th", id: 1273447359417942128n }],
    start: () => {
        _removeChild = Element.prototype.removeChild;
        _appendChild = Element.prototype.appendChild;

        Element.prototype.removeChild = optimize(Element.prototype.removeChild);
        Element.prototype.appendChild = optimize(Element.prototype.appendChild);
    },
    stop: () => {
        Element.prototype.removeChild = _removeChild;
        Element.prototype.appendChild = _appendChild;
    }
});
