//#region src/module/functions/settings-presets/values.ts
function e(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function t(n, r) {
	if (Array.isArray(n) && Array.isArray(r)) return n.length === r.length && n.every((e, n) => t(e, r[n]));
	if (e(n) && e(r)) {
		let e = Object.keys(n);
		return e.length === Object.keys(r).length && e.every((e) => Object.hasOwn(r, e) && t(n[e], r[e]));
	}
	return n === r;
}
function n(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "boolean" || typeof e == "string" || typeof e == "number" && Number.isFinite(e)) return e;
	if (typeof e != "object" || !e) throw Error("Value cannot be represented completely in JSON");
	if (t.has(e)) throw Error("Value contains a circular reference");
	let r = new Set(t).add(e);
	if (Array.isArray(e)) return Array.from(e, (e) => n(e, r));
	let i = Object.getPrototypeOf(e);
	if (i !== Object.prototype && i !== null) throw Error("Value is not a plain JSON object");
	if (Object.getOwnPropertySymbols(e).length) throw Error("Value contains properties JSON cannot preserve");
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, n(t, r)]));
}
//#endregion
//#region src/module/functions/integrations/health-estimate/estimations.ts
var r = {
	wounds: "Compatibility Box: WFRP Wounds",
	unconscious: "Compatibility Box: WFRP Unconscious",
	dead: "Compatibility Box: WFRP Dead"
};
function i(e, t) {
	if (!Array.isArray(e) || !e.length) throw Error("Health Estimate must have a default estimation table before applying its preset.");
	let i = n(e);
	for (let e of i) if (!e || typeof e != "object" || Array.isArray(e) || typeof e.name != "string" || !Array.isArray(e.estimates) || !Array.isArray(e.actorTypes) || !Array.isArray(e.statusEffects)) throw Error("Health Estimate's estimation tables do not match the supported version 36 schema.");
	let a = new Set(Object.values(r)), [o, ...s] = i.filter((e) => !a.has(e.name));
	if (!o || o.actorTypes.length || o.statusEffects.length) throw Error("Health Estimate's first table must remain its unfiltered default table.");
	let c = [
		"character",
		"npc",
		"creature"
	], l = {
		name: r.wounds,
		ignoreColor: !1,
		actorTypes: c,
		statusEffects: [],
		estimates: [
			{
				value: 0,
				label: t ? "Mortal Peril!" : "Unconscious"
			},
			{
				value: 25,
				label: t ? "Desperate!" : "Clinging On..."
			},
			{
				value: 50,
				label: "Bloodied"
			},
			{
				value: 75,
				label: "Wounded"
			},
			{
				value: 99,
				label: "Grazed"
			},
			{
				value: 100,
				label: "Unharmed"
			}
		]
	}, u = (e, t, n) => ({
		name: e,
		ignoreColor: !0,
		actorTypes: c,
		statusEffects: [t],
		estimates: [{
			value: 100,
			label: n
		}]
	});
	return [
		o,
		l,
		u(r.unconscious, "unconscious", "Unconscious"),
		u(r.dead, "dead", "Gone to Morr..."),
		...s
	];
}
//#endregion
//#region src/module/constants.ts
var a = "wfrp4e-compatibility-box", o = "Drowsy's WFRP4e Compatibility Box";
//#endregion
//#region src/module/foundry/integrations/is-module-active.ts
function s(e) {
	if (typeof game > "u" || !game) throw Error("Optional module integrations require an initialized Foundry game.");
	return game.modules.get(e)?.active === !0;
}
//#endregion
//#region src/module/foundry/settings/optional-features.ts
var c = {
	healthEstimate: {
		settingKey: "healthEstimateEnabled",
		targetModuleIds: ["healthEstimate"]
	},
	bossBar: {
		settingKey: "bossBarEnabled",
		targetModuleIds: ["bossbar"]
	},
	argonCombatHud: {
		settingKey: "argonCombatHudEnabled",
		targetModuleIds: ["enhancedcombathud"]
	},
	paperDoll: {
		settingKey: "paperDollEnabled",
		targetModuleIds: ["fvtt-paper-doll-ui"]
	},
	paperDollArgonBridge: {
		settingKey: "paperDollArgonBridgeEnabled",
		targetModuleIds: ["fvtt-paper-doll-ui", "enhancedcombathud"]
	}
};
function l(e) {
	return c[e].targetModuleIds.every((e) => s(e));
}
//#endregion
//#region src/module/foundry/settings/is-optional-feature-enabled.ts
function u(e) {
	let t = c[e];
	return l(e) && game?.settings.get("wfrp4e-compatibility-box", t.settingKey) !== !1;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/values.ts
function d(e, t) {
	return t instanceof foundry.abstract.DataModel ? t = t.toObject() : e.type instanceof foundry.data.fields.DataField && (t = e.type.toObject(t)), n(t);
}
function f(e, r) {
	let i = e.type, a = n(r);
	if (i instanceof foundry.data.fields.DataField) a = n(i.clean(a)), i.validate(a, {
		fallback: !1,
		strict: !0
	});
	else if (typeof i == "function" && i.prototype instanceof foundry.abstract.DataModel) a = n(i.fromSource(a, { strict: !0 }).toObject());
	else if (i === String && typeof a != "string" || i === Number && typeof a != "number" || i === Boolean && typeof a != "boolean" || i === Array && !Array.isArray(a) || i === Object && (typeof a != "object" || !a || Array.isArray(a))) throw Error("Preset value does not match this world's setting type.");
	if (!t(r, a)) throw Error("Preset value does not match this world's setting schema.");
}
//#endregion
//#region src/module/foundry/integrations/health-estimate/preset.ts
var p = "healthEstimate", ee = "core.estimations", te = {
	title: "Health Estimate",
	watchSettings: ["wfrp4e.uiaCrits"],
	enabled: () => {
		let e = game?.modules.get(p)?.version;
		return u("healthEstimate") && game?.system.id === "wfrp4e" && !!e && !foundry.utils.isNewerVersion("36.1.0", e);
	},
	additionalSettings: () => {
		let e = game?.settings.settings?.get(`${p}.${ee}`);
		if (!e) throw Error("Health Estimate's estimation setting is unavailable. Version 36.1.0 or newer is required.");
		let t = d(e, game?.settings.get(p, ee)), n = game?.settings.get("wfrp4e", "uiaCrits") === !0;
		return [...n ? [{
			namespace: p,
			key: "core.NPCsJustDie",
			value: !1
		}] : [], {
			namespace: p,
			key: ee,
			value: i(t, n)
		}];
	}
}, ne = /* @__PURE__ */ new WeakSet();
function re() {
	if (!te.enabled?.()) return;
	let e = game && Reflect.get(game, "healthEstimate");
	if (!e || typeof e.isDead != "function" || ne.has(e)) return;
	let t = e.isDead;
	e.isDead = function(e, n) {
		return e.actor && [
			"character",
			"npc",
			"creature"
		].includes(e.actor.type) ? e.actor.statuses.has("dead") : t.call(this, e, n);
	}, ne.add(e);
}
//#endregion
//#region src/module/foundry/integrations/bossbar/constants.ts
var m = "bossbar", h = {
	automatic: "bossBarAutomatic",
	stacked: "bossBarStacked",
	woundsStyle: "bossBarWoundsStyle",
	ignorePrompt: "bossBarIgnoreSetupPrompt"
};
//#endregion
//#region src/module/foundry/integrations/bossbar/preset.ts
function ie() {
	return game?.settings.get("wfrp4e", "uiaCrits") === !0;
}
var ae = {
	title: "Boss Bar",
	watchSettings: ["wfrp4e.uiaCrits"],
	ignoreSetting: h.ignorePrompt,
	enabled: () => u("bossBar"),
	additionalSettings: () => {
		let e = [{
			namespace: a,
			key: h.stacked,
			value: !0
		}];
		if (!ie()) return e;
		let t = game?.settings.get(m, "barStyles"), n = t.find((e) => e.id === "segmented");
		return n && t[0] !== n && e.push({
			namespace: m,
			key: "barStyles",
			value: [n, ...t.filter((e) => e !== n)]
		}), e;
	}
}, oe = "#a51414d8", se = "#7e1717dc", ce = "#b31f18d8", le = "#b01832d8", ue = "#861a24d8", de = "#541e1ed8", g = "#6a0e0ed8", _ = "#6f3518e0", v = "#621010e0", fe = "#771616dc", y = "#440707d8", b = "#14101490", x = "#0b080de8", pe = [
	["Jabberslythe", "#78d61be8"],
	["Chameleon Skink", g],
	["Kroxigor", g],
	["Saurus", g],
	["Suarus", g],
	["Skink", g],
	["Slann", g],
	["Reptile", g],
	["Ogre Gorger", de],
	["Gorger", de],
	["Orca", oe],
	["Bloodletter", x],
	["Chaos Fury", x],
	["Blue Horror", x],
	["Pink Horror", x],
	["Nurgling", x],
	["Greater Daemon", x],
	["Daemon Prince", x],
	["Lesser Demon", x],
	["Daemon", x],
	["Demon", x],
	["Rat Ogre", fe],
	["Wolf Rat", fe],
	["Skaven", fe],
	["Bray Shaman", v],
	["Beastman", v],
	["Beastmen", v],
	["Bestigor", v],
	["Minotaur", v],
	["Pestigor", v],
	["Razorgor", v],
	["Ungor", v],
	["Gor", v],
	["Greenskin", _],
	["Forest Goblin", _],
	["Night Goblin", _],
	["Hobgoblin", _],
	["Goblin", _],
	["Black Orc", _],
	["Orc", _],
	["Snotling", _],
	["Squig", _],
	["Skeleton", b],
	["Ghost", b],
	["Tomb Banshee", b],
	["Banshee", b],
	["Undead", y],
	["Vampire", y],
	["Ghoul", y],
	["Wight", y],
	["Liche", y],
	["Maurngul", y],
	["Mourngul", y],
	["Human", oe],
	["Dwarf", se],
	["Halfling", ce],
	["High Elf", le],
	["helf", le],
	["Wood Elf", ue],
	["welf", ue],
	["Ogre", de]
];
function me() {
	let e = {};
	for (let [t, n] of pe) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function he(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function ge(e = {}) {
	let t = me();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? oe;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function _e(e, t = {}) {
	let n = he(e);
	for (let [e, r] of Object.entries(ge(t))) n[e] ??= r;
	return n;
}
//#endregion
//#region src/module/foundry/integrations/splatter/constants.ts
var S = "splatter", ve = "BloodSheetData", ye = {
	title: "Splatter",
	ignoreSetting: "splatterIgnoreSetupPrompt",
	menuKey: "configureSplatter",
	additionalSettings: () => [{
		namespace: S,
		key: ve,
		value: _e(game?.settings.get(S, ve), game?.wfrp4e?.config.species ?? {})
	}]
}, be = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
}, xe = { "core.deathStateName": "Gone to Morr..." }, Se = {
	creatureType: "details.species.value",
	creatureTypeCustom: "",
	currentHp: "status.wounds.value",
	maxHp: "status.wounds.max",
	useWounds: !1,
	useBloodsheet: !0
}, Ce = {
	bossbar: { description: "Use WFRP Wounds paths and the compatible stacked-bar configuration." },
	splatter: { description: "Use WFRP Wounds and species for blood effects while preserving custom colors." },
	healthEstimate: { description: "Use WFRP Wounds labels: Unconscious at zero under core rules, Mortal Peril! under Up in Arms, Bloodied at 50%, and Gone to Morr... for the Dead condition. Preserve custom and vehicle tables. Recommend disabling NPCs Just Die only under Up in Arms; leave it alone under core." }
};
//#endregion
//#region src/module/functions/settings-presets/sources.ts
function we(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => {
		let r = e.slice(e.lastIndexOf("/") + 1);
		if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.json$/.test(r)) throw Error(`Invalid settings preset namespace filename: ${e}`);
		if (!t || typeof t != "object" || Array.isArray(t)) throw Error(`Settings preset ${e} must be an object of setting values.`);
		let i = Object.fromEntries(Object.entries(t).map(([t, r]) => {
			if (!t.trim()) throw Error(`Settings preset ${e} contains an empty setting key.`);
			return [t, n(r)];
		}));
		return [r.slice(0, -5), i];
	}));
}
//#endregion
//#region src/module/functions/settings-presets/metadata.ts
function Te(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Settings preset metadata must be an object.");
	return Object.fromEntries(Object.entries(e).map(([e, n]) => {
		if (!t.includes(e)) throw Error(`Metadata has no settings source: ${e}`);
		if (!n || typeof n != "object" || Array.isArray(n)) throw Error(`Invalid metadata for ${e}`);
		let r = n;
		for (let [t, n] of Object.entries(r)) if (t === "promptOnStartup" ? typeof n != "boolean" : !["title", "description"].includes(t) || typeof n != "string") throw Error(`Invalid preset metadata: ${e}.${t}`);
		return [e, r];
	}));
}
//#endregion
//#region src/module/foundry/settings/presets/sources.ts
var Ee = we(/* #__PURE__ */ Object.assign({
	"/src/settings/bossbar.json": be,
	"/src/settings/healthEstimate.json": xe,
	"/src/settings/splatter.json": Se
})), De = Te(Object.values([Ce])[0] ?? {}, Object.keys(Ee)), Oe = {
	bossbar: ae,
	healthEstimate: te,
	splatter: ye
};
function ke(e) {
	if (!Object.hasOwn(Ee, e)) throw Error(`No settings preset exists for ${e}.`);
	return {
		namespace: e,
		values: Ee[e],
		...Oe[e],
		...De[e]
	};
}
function Ae() {
	return Object.keys(Ee).sort().map(ke);
}
//#endregion
//#region src/module/functions/settings-presets/wfrp.ts
function je(e, t) {
	return t === "wfrp4e" ? [...e].sort((e, t) => Number(C(e)) - Number(C(t))) : [...e];
}
function C({ namespace: e, key: t }) {
	return e === "wfrp4e" && t === "useGroupAdvantage";
}
function Me({ namespace: e, key: t }) {
	return e === "wfrp4e" && ["homebrew", "customCursor"].includes(t) || e === "wfrp4e-rnhd" && ["showClock", "syncClock"].includes(t);
}
function Ne({ namespace: e, key: t, value: n }) {
	return e !== "wfrp4e" || t !== "tableSettings" || !n || typeof n != "object" ? [] : [...new Set(Object.values(n).flatMap((e) => String(e).split(",").filter(Boolean)))];
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/coordination.ts
function Pe() {
	let e = [...game?.modules.values() ?? []].filter((e) => e.active).map((e) => e.api?.settingsPresetCoordinator).filter((e) => e?.version === 1);
	if (e.length > 1) throw Error("Multiple settings coordinators are active; disable the duplicate before applying presets.");
	return e[0];
}
function Fe(e, t) {
	return Pe()?.plan(e, t) ?? {
		entries: t,
		excluded: [],
		conflicts: []
	};
}
async function Ie(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
	return await Pe()?.resolve(e, t) ?? !0;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/engine.ts
function w(e) {
	return e === "core" || e === game?.system.id || game?.modules.get(e)?.active === !0;
}
function Le(e, n) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to inspect settings presets.");
	let r = Fe(e, n), i = {
		changes: [],
		unchanged: [],
		skipped: [],
		failed: [],
		conflicts: r.conflicts,
		excluded: r.excluded,
		missingTables: [],
		requiresReload: !1,
		automaticReload: !1
	};
	for (let e of r.entries) {
		let n = `${e.namespace}.${e.key}`, r = game.settings.settings?.get(n);
		if (!w(e.namespace) || !r || r.scope !== "world") {
			i.skipped.push({
				id: n,
				reason: "World setting is unavailable or its namespace is not active"
			});
			continue;
		}
		try {
			f(r, e.value), game.system.id === "wfrp4e" && i.missingTables.push(...Ne(e).filter((e) => !(game?.collections?.get("RollTable"))?.get(e)));
			let a = d(r, game.settings.get(e.namespace, e.key));
			if (t(a, e.value)) {
				i.unchanged.push(n);
				continue;
			}
			i.changes.push({
				...e,
				current: a,
				label: r.name ? game.i18n.localize(r.name) : n
			}), i.requiresReload ||= !!r.requiresReload || game.system.id === "wfrp4e" && (Me(e) || C(e)), i.automaticReload ||= game.system.id === "wfrp4e" && C(e);
		} catch (e) {
			i.failed.push({
				id: n,
				reason: e instanceof Error ? e.message : String(e)
			});
		}
	}
	return i.missingTables = [...new Set(i.missingTables)], i;
}
var Re = !1;
async function ze(e, n) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (Re) throw Error("A settings preset is already being applied.");
	Re = !0;
	try {
		let r = Le(e, n), i = {
			...r,
			updated: [],
			blocked: !!(r.failed.length || r.skipped.length || r.conflicts.length || r.missingTables.length),
			requiresReload: !1,
			automaticReload: !1
		};
		if (i.blocked) return i;
		for (let a of je(r.changes, game.system.id)) {
			let r = `${a.namespace}.${a.key}`;
			try {
				if (!game.user?.isGM || !w(a.namespace)) throw Error("Preset permissions or availability changed.");
				let o = Fe(e, n), s = o.entries.find((e) => e.namespace === a.namespace && e.key === a.key);
				if (o.conflicts.length || !s || !t(s.value, a.value)) throw Error("Preset choices changed; review the remaining settings again.");
				let c = game.settings.settings?.get(r);
				if (!c || c.scope !== "world") throw Error("World setting is unavailable.");
				if (f(c, a.value), await game.settings.set(a.namespace, a.key, structuredClone(a.value)), i.requiresReload ||= !!c.requiresReload || game.system.id === "wfrp4e" && (Me(a) || C(a)), i.automaticReload ||= game.system.id === "wfrp4e" && C(a), !t(d(c, game.settings.get(a.namespace, a.key)), a.value)) throw Error("Foundry did not retain the complete preset value.");
				i.updated.push(r);
			} catch (e) {
				i.failed.push({
					id: r,
					reason: e instanceof Error ? e.message : String(e)
				});
				break;
			}
		}
		return i;
	} finally {
		Re = !1;
	}
}
//#endregion
//#region src/module/foundry/settings/presets/engine.ts
function T(e) {
	return w(e.namespace) && (e.enabled?.() ?? !0);
}
function E(e) {
	if (!T(e)) throw Error("Preset is not active.");
	return [...Object.entries(e.values).map(([t, n]) => ({
		namespace: e.namespace,
		key: t,
		value: n
	})), ...e.additionalSettings?.() ?? []];
}
async function Be(e) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (!T(e)) throw Error("Preset is not active.");
	let t = await ze(a, E(e));
	if (t.blocked || t.failed.length) throw Error(`${t.updated.length} settings updated. ${[
		...t.skipped,
		...t.failed,
		...t.conflicts
	].map((e) => `${e.id}: ${e.reason}`).join("; ")}${t.missingTables.length ? ` Missing rule tables: ${t.missingTables.join(", ")}` : ""}`);
	return t;
}
//#endregion
//#region src/module/foundry/notifications/notify-user.ts
function Ve(e, t) {
	t === void 0 ? console.error(e) : console.error(e, t);
}
function D(e, t) {
	Ve(e, t), ui?.notifications?.error(e);
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/presentation.ts
function O(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
function He(e) {
	let t = O, n = e.changes.map(({ label: e, current: n, value: r }) => `<li><strong>${t(e)}</strong><br>Current: <code>${t(JSON.stringify(n))}</code><br>Preset: <code>${t(JSON.stringify(r))}</code></li>`).join(""), r = [
		...e.skipped,
		...e.failed,
		...e.conflicts
	].map(({ id: e, reason: n }) => `<li>${t(e)}: ${t(n)}</li>`).join("");
	return `<p>${e.changes.length} changes; ${e.unchanged.length} already set; ${e.excluded.length} left to the GM's current settings.</p><div class="scrollable" style="max-height:45vh"><details><summary>Review setting changes</summary><ul>${n}</ul></details>${r ? `<p>Resolve these issues before applying:</p><ul>${r}</ul>` : ""}${e.missingTables.length ? `<p>Import these missing rule tables first: ${t(e.missingTables.join(", "))}</p>` : ""}</div>${e.requiresReload ? "<p>A reload is required for these changes.</p>" : ""}`;
}
async function Ue(e, t) {
	let n = `${e}: ${t.updated.length} updated, ${t.unchanged.length} already set, ${t.excluded.length} left unchanged by conflict choices.`;
	t.blocked && (n += " Nothing was applied because preflight found unresolved issues.");
	let r = [
		...t.skipped,
		...t.failed,
		...t.conflicts
	];
	r.length && (n += ` ${r.map(({ id: e, reason: t }) => `${e}: ${t}`).join("; ")}.`), t.missingTables.length && (n += ` Missing rule tables: ${t.missingTables.join(", ")}.`), t.failed.length && t.updated.length && (n += " Earlier successful changes remain applied; review before retrying."), t.blocked || t.failed.length ? ui?.notifications?.error(O(n), { permanent: !0 }) : ui?.notifications?.info(O(n)), t.requiresReload && !t.automaticReload && await foundry.applications.settings.SettingsConfig.reloadConfirm({ world: !0 });
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/review.ts
var We = Promise.resolve(), k = /* @__PURE__ */ new Map();
function Ge(e) {
	let t = `${e.owner}:${e.ignoreKey ?? e.title}`;
	if (e.startup && k.has(t)) return k.get(t);
	let n = We.then(() => Ke(e)).finally(() => {
		e.startup && k.delete(t);
	});
	return e.startup && k.set(t, n), We = n.catch(() => {}), n;
}
async function Ke(e) {
	if (!game?.ready || !game.user?.isGM || e.startup && game.users?.activeGM && game.users.activeGM.id !== game.user.id || e.startup && e.ignoreKey && game.settings.get(e.owner, e.ignoreKey) === !0 || !await Ie(e.owner, e.entries())) return null;
	let n = Le(e.owner, e.entries());
	if (e.startup && !n.changes.length && !n.skipped.length && !n.failed.length && !n.conflicts.length && !n.missingTables.length) return null;
	let r = !!(n.skipped.length || n.failed.length || n.conflicts.length || n.missingTables.length), i = await foundry.applications.api.DialogV2.wait({
		window: { title: e.title },
		position: { width: 650 },
		content: `${e.description ? `<p>${O(e.description)}</p>` : ""}${He(n)}`,
		buttons: [
			...!r && n.changes.length ? [{
				action: "configure",
				label: "Apply Preset",
				default: !0
			}] : [],
			...e.startup && e.ignoreKey ? [{
				action: "keep",
				label: "Keep My Settings and Ignore"
			}] : [],
			{
				action: "later",
				label: e.startup ? "Ask Next Time" : "Close"
			}
		],
		rejectClose: !1
	});
	if (!game.user?.isGM) throw Error("GM permission changed.");
	if (i === "keep" && e.ignoreKey && await game.settings.set(e.owner, e.ignoreKey, !0), i !== "configure" || r) return null;
	if (!t(Le(e.owner, e.entries()), n)) throw Error("Settings or preset choices changed during review; reopen the action before applying.");
	let a = await ze(e.owner, e.entries());
	return await Ue(e.title, a), a;
}
//#endregion
//#region src/module/foundry/settings/presets/interface.ts
function A(e) {
	return e.title ?? game?.modules.get(e.namespace)?.title ?? e.namespace;
}
function qe(e) {
	return e.ignoreSetting ?? `ignoreSettingsPreset-${e.namespace}`;
}
function j(e) {
	D(O(`Settings preset could not be completed: ${e instanceof Error ? e.message : String(e)}`), e);
}
async function Je(e) {
	if (!T(e)) throw Error("Preset is not active.");
	await Ge({
		owner: a,
		title: A(e),
		entries: () => E(e),
		...e.description ? { description: e.description } : {}
	});
}
async function Ye(e, t = !1) {
	!T(e) || game?.system.id !== "wfrp4e" || e.promptOnStartup === !1 && !t || await Ge({
		owner: a,
		title: A(e),
		entries: () => E(e),
		startup: !0,
		ignoreKey: qe(e),
		...e.description ? { description: e.description } : {}
	});
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/export.ts
function Xe(e, t, n = !1) {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	if (!w(e)) throw Error("The selected system or module is not active.");
	if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(e)) throw Error("Invalid settings namespace.");
	if (!t.length) throw Error("Select at least one setting to export.");
	let r = Object.fromEntries([...new Set(t)].map((t) => {
		let r = game?.settings.settings?.get(`${e}.${t}`);
		if (!r || r.scope !== "world" || !r.config && !n) throw Error(`${e}.${t} is not an available selected world setting.`);
		try {
			return [t, d(r, game?.settings.get(e, t))];
		} catch (n) {
			throw Error(`${e}.${t}: ${n instanceof Error ? n.message : String(n)}`, { cause: n });
		}
	}));
	return {
		namespace: e,
		filename: `${e}.json`,
		values: r
	};
}
function Ze(e, t) {
	return [...game?.settings.settings?.values() ?? []].filter((n) => n.namespace === e && n.scope === "world" && (n.config || t)).sort((e, t) => e.key.localeCompare(t.key));
}
function Qe(e, t) {
	let n = foundry.utils.escapeHTML, r = game?.i18n.localize(e.name || e.key) ?? e.key, i, a = !1;
	try {
		let t = d(e, game?.settings.get(e.namespace, e.key)), n = JSON.stringify(t);
		i = n.length > 160 ? `${n.slice(0, 160)}…` : n;
	} catch (e) {
		a = !0, i = `Cannot export: ${e instanceof Error ? e.message : String(e)}`;
	}
	return `<div class="form-group"><label>
    <input type="checkbox" name="setting-${t}" ${a ? "disabled" : ""}>
    ${n(r)}${e.config ? "" : " (hidden)"}
    </label><p class="hint"><code>${n(`${e.namespace}.${e.key}`)}</code><br>${n(i)}</p></div>`;
}
async function $e(e = "src/settings/") {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	let t = [...new Set([...game.settings.settings?.values() ?? []].filter((e) => e.scope === "world" && w(e.namespace)).map((e) => e.namespace))].sort();
	if (!t.length) return ui?.notifications?.info("There are no registered world settings to export."), null;
	let n = foundry.utils.escapeHTML, r = await foundry.applications.api.DialogV2.input({
		window: { title: "Export Settings Preset" },
		content: `<p>Select the system or module whose world preferences you want to save.</p>
      <div class="form-group"><label>System or module</label><select name="namespace">
      ${t.map((e) => `<option value="${n(e)}">${n(e)}</option>`).join("")}</select></div>
      <div class="form-group"><label><input type="checkbox" name="includeHidden"> Include hidden world settings</label>
      <p class="hint">Hidden settings may contain migration data or world state. Select only the preferences you want to reuse.</p></div>`,
		ok: { label: "Choose Settings" },
		rejectClose: !1
	});
	if (!r) return null;
	let i = String(r.namespace);
	if (!t.includes(i)) throw Error("Select an available settings namespace.");
	let a = r.includeHidden === !0, o = Ze(i, a);
	if (!o.length) return ui?.notifications?.info("This namespace has no settings matching that selection."), null;
	let s = await foundry.applications.api.DialogV2.input({
		window: { title: `Export ${i} Settings` },
		content: `<p>Select the preferences to include in <strong>${n(i)}.json</strong>.</p>
      <div class="scrollable" style="max-height: 50vh">${o.map(Qe).join("")}</div>
      <p class="hint">Save the downloaded file in <code>${n(e)}</code>, then rebuild the module to add its import button.</p>`,
		ok: { label: "Download JSON" },
		rejectClose: !1
	});
	if (!s) return null;
	let c = o.filter((e, t) => s[`setting-${t}`] === !0).map(({ key: e }) => e);
	if (!c.length) return ui?.notifications?.info("No settings selected; nothing was exported."), null;
	let l = Xe(i, c, a);
	return foundry.utils.saveDataToFile(`${JSON.stringify(l.values, null, 2)}\n`, "application/json", l.filename), ui?.notifications?.info(`Exported ${c.length} settings to ${n(l.filename)}.`), l;
}
//#endregion
//#region src/module/foundry/settings/presets/api.ts
function et(e) {
	let t = e === void 0 ? Ae().filter(T) : [ke(e)];
	if (t.some((e) => !T(e))) throw Error("Preset is not active.");
	return t.flatMap(E);
}
var tt = {
	version: 1,
	getPresets: () => Ae().filter(T).map((e) => ({
		namespace: e.namespace,
		title: A(e),
		entries: E(e)
	})),
	inspect: (e) => Le(a, et(e)),
	apply: async (e) => ze(a, et(e)),
	resolve: async (e) => Ie(a, et(e)),
	capture: Xe
};
//#endregion
//#region src/module/functions/settings-presets/conflicts.ts
function nt(e) {
	return Array.isArray(e) ? e.map(nt) : e && typeof e == "object" ? Object.fromEntries(Object.keys(e).sort().map((t) => [t, nt(e[t])])) : e;
}
function rt(e) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) for (let e of r.entries) {
		let i = `${e.namespace}.${e.key}`, a = n.get(i) ?? {
			id: i,
			namespace: e.namespace,
			key: e.key,
			candidates: [],
			signature: ""
		}, o = a.candidates.find((e) => e.source === r.source);
		if (o && !t(o.value, e.value)) throw Error(`Preset ${r.source} proposes two values for ${i}.`);
		o || a.candidates.push({
			source: r.source,
			title: r.title,
			value: e.value
		}), n.set(i, a);
	}
	return [...n.values()].filter((e) => e.candidates.some((n) => !t(n.value, e.candidates[0].value))).map((e) => (e.candidates.sort((e, t) => e.source.localeCompare(t.source)), e.signature = JSON.stringify(e.candidates.map(({ source: e, value: t }) => [e, nt(t)])), e)).sort((e, t) => e.id.localeCompare(t.id));
}
function it(e, t, n) {
	let r = {
		entries: [],
		excluded: [],
		conflicts: []
	};
	for (let i of e) {
		let e = `${i.namespace}.${i.key}`, a = t.find((t) => t.id === e);
		if (!a) {
			r.entries.push(i);
			continue;
		}
		let o = Object.hasOwn(n, e) ? n[e] : void 0;
		if (!o || o.signature !== a.signature || o.source !== null && !a.candidates.some((e) => e.source === o.source)) {
			r.conflicts.push({
				id: e,
				reason: "Conflicting presets need a GM choice in Compatibility Box"
			});
			continue;
		}
		if (o.source === null) {
			r.excluded.push(e);
			continue;
		}
		r.entries.push({
			...i,
			value: a.candidates.find((e) => e.source === o.source).value
		});
	}
	return r;
}
//#endregion
//#region src/module/foundry/settings/conflicts/sources.ts
function M(e, t) {
	let r = [];
	for (let [e, t] of game?.modules ?? []) {
		if (!t.active) continue;
		let i = t.api?.settingsPresets;
		if (i?.version === 1) for (let a of i.getPresets()) r.push({
			source: `${e}:${a.namespace}`,
			title: `${t.title ?? e} — ${a.title}`,
			entries: a.entries.map((e) => ({
				...e,
				value: n(e.value)
			}))
		});
	}
	for (let n of t) r.some((t) => t.source.startsWith(`${e}:`) && t.entries.some((e) => e.namespace === n.namespace && e.key === n.key)) || r.push({
		source: `${e}:${n.namespace}`,
		title: game?.modules.get(e)?.title ?? e,
		entries: [n]
	});
	let i = new Set(t.map((e) => `${e.namespace}.${e.key}`));
	return rt(r).filter((e) => i.has(e.id));
}
//#endregion
//#region src/module/foundry/settings/conflicts/coordinator.ts
var at = "settingsPresetConflictChoices";
function ot() {
	return game?.settings.get("wfrp4e-compatibility-box", "settingsPresetConflictChoices") ?? {};
}
var st = Promise.resolve(), ct = {
	version: 1,
	inspect: M,
	decide: ut,
	async reset() {
		if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
		await game.settings.set(a, at, {});
	},
	plan(e, t) {
		return it(t, M(e, t), ot());
	},
	resolve(e, t) {
		let n = st.then(() => lt(e, t));
		return st = n.catch(() => {}), n;
	}
};
async function lt(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to resolve preset conflicts.");
	let n = M(e, t), r = new Set(ct.plan(e, t).conflicts.map((e) => e.id)), i = {};
	for (let e of n.filter((e) => r.has(e.id))) {
		let t = O, n = await foundry.applications.api.DialogV2.input({
			window: { title: "Resolve Settings Preset Conflict" },
			content: `<p>Multiple packages recommend different values for <strong>${t(e.id)}</strong>. Choose which recommendation all cooperating presets should follow.</p><p>Current: <code>${t(JSON.stringify(game.settings.get(e.namespace, e.key)))}</code></p><div class="form-group"><label>Preferred settings source</label><select name="source"><option value="">Leave this setting under my control</option>${e.candidates.map((e, n) => `<option value="${n}">${t(e.title)}</option>`).join("")}</select></div><div class="scrollable" style="max-height:40vh"><ul>${e.candidates.map((e) => `<li><strong>${t(e.title)}</strong>: <code>${t(JSON.stringify(e.value))}</code></li>`).join("")}</ul></div><p>This saves your preference without applying settings. You will review changes next. Updated competing values will ask again.</p>`,
			ok: { label: "Use This Choice" },
			rejectClose: !1
		});
		if (!n) return !1;
		let r = String(n.source ?? ""), a = e.candidates.find((e, t) => String(t) === r);
		if (r !== "" && !a) throw Error("Choose a listed settings source.");
		i[e.id] = {
			signature: e.signature,
			source: a?.source ?? null
		};
	}
	return await ut(e, t, i), !0;
}
async function ut(e, t, n) {
	if (!game?.ready || !game.user?.isGM) throw Error("GM permission changed.");
	if (!Object.keys(n).length) return;
	let r = M(e, t);
	for (let [e, t] of Object.entries(n)) {
		let n = r.find((t) => t.id === e);
		if (!n || n.signature !== t.signature) throw Error("Competing presets changed during review; reopen the action.");
		if (t.source !== null && !n.candidates.some((e) => e.source === t.source)) throw Error("Choose a listed settings source.");
	}
	await game.settings.set(a, at, {
		...ot(),
		...n
	});
}
//#endregion
//#region src/types/patches/paper-doll/Equipment.ts
var dt = [
	"HEAD",
	"BODY",
	"GLOVES",
	"BOOTS"
], ft = ["MAIN_LEFT", "MAIN_RIGHT"], pt = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
], mt = {
	BODY: ["body"],
	BOOTS: ["lLeg", "rLeg"],
	GLOVES: ["lArm", "rArm"],
	HEAD: ["head"]
};
function ht(e, t) {
	return t.coverage - e.coverage || t.points - e.points || e.item.name.localeCompare(t.item.name) || e.item.id.localeCompare(t.item.id);
}
function gt(e, t) {
	return Math.max(...mt[t].map((t) => e.armourPoints[t]));
}
function _t(e, t) {
	return mt[t].filter((t) => e.armourPoints[t] > 0).length;
}
function vt(e, t, n) {
	return gt(n.item, e) - gt(t.item, e) || _t(n.item, e) - _t(t.item, e) || ht(t, n);
}
function yt(e) {
	return e.type === "armour" && e.equipped;
}
function bt(e) {
	let t = e.armourPoints, n = pt.filter((e) => t[e] > 0);
	return {
		coverage: n.length,
		item: e,
		points: n.reduce((e, n) => e + t[n], 0)
	};
}
function xt(e) {
	let t = e.filter(yt).map(bt);
	return dt.flatMap((e) => {
		let n = t.filter((t) => gt(t.item, e) > 0).sort((t, n) => vt(e, t, n))[0];
		return n ? [{
			slotId: e,
			uuid: n.item.uuid
		}] : [];
	});
}
function St(e, t) {
	return e.twoHanded ? "both" : e.offhand ? t === "l" ? "r" : "l" : t;
}
function Ct(e, t) {
	return Number(t.twoHanded) - Number(e.twoHanded) || e.name.localeCompare(t.name) || e.id.localeCompare(t.id);
}
function wt(e, t) {
	let n = e.filter((e) => e.type === "weapon" && e.equipped).sort(Ct);
	return ft.flatMap((e) => {
		let r = e === "MAIN_LEFT" ? "l" : "r", i = n.find((e) => {
			let n = St(e, t);
			return n === "both" || n === r;
		});
		return i ? [{
			slotId: e,
			uuid: i.uuid
		}] : [];
	});
}
function Tt(e, t) {
	return [...xt(e), ...wt(e, t)];
}
//#endregion
//#region src/module/functions/patches/paper-doll/derive-paper-doll-slot-state.ts
function Et(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Dt(e, t, n, r) {
	let i = Et(e), a = new Map(t.map((e) => [e.slotId, e.uuid]));
	for (let e of [...dt, ...ft]) {
		if (!r.has(e)) continue;
		let t = i[e]?.["0"] ?? null, o = a.get(e) ?? null;
		o ? (i[e] ??= {}, i[e][0] = o) : t && n.has(t) && (i[e] ??= {}, i[e][0] = null);
	}
	return i;
}
function Ot(e, t, n) {
	let r = new Map(t.map((e) => [e.uuid, e])), i = Et(e);
	for (let e of Object.values(i)) for (let [t, i] of Object.entries(e)) !i || n.has(i) || r.get(i)?.equipped === !1 && (e[t] = null);
	return i;
}
function kt(e, t, n, r, i) {
	return Ot(Dt(e, t, n, r), i, n);
}
function At(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-paper-doll-slot-state.ts
function jt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Mt(e) {
	return /^(0|[1-9]\d*)$/.test(e);
}
function Nt(e) {
	return e == null || typeof e == "string" && e.length > 0;
}
function N(e) {
	return jt(e) && Object.entries(e).every(([e, t]) => e.length > 0 && jt(t) && Object.entries(t).every(([e, t]) => Mt(e) && Nt(t)));
}
//#endregion
//#region src/module/functions/patches/paper-doll/equipment-update.ts
function Pt(e) {
	return e.slotId === "MAIN_LEFT" ? "l" : e.slotId === "MAIN_RIGHT" ? "r" : null;
}
function Ft(e, t, n, r) {
	if (t === null) return {};
	let i = {};
	if (t || (i["system.equipped.value"] = !0), e?.type !== "weapon") return i;
	if (!r) throw Error(`Weapon ${e.uuid} requires the actor's main hand.`);
	let a = Pt(n), o = e.twoHanded ? !1 : a ? a !== r : void 0;
	return o !== void 0 && e.offhand !== o && (i["system.offhand.value"] = o), i;
}
function It(e) {
	return e === !0 ? { "system.equipped.value": !1 } : {};
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-item-allowed-in-slot.ts
function Lt(e, t) {
	switch (t) {
		case "HEAD": return e.armourPoints.head > 0;
		case "BODY": return e.armourPoints.body > 0;
		case "GLOVES": return e.armourPoints.lArm > 0 || e.armourPoints.rArm > 0;
		case "BOOTS": return e.armourPoints.lLeg > 0 || e.armourPoints.rLeg > 0;
		default: return !1;
	}
}
function Rt(e, t, n) {
	return n === "MAIN_LEFT" || n === "MAIN_RIGHT" ? t?.type === "weapon" : n === "HEAD" || n === "BODY" || n === "GLOVES" || n === "BOOTS" ? t?.type === "armour" && Lt(t, n) : e !== "weapon" && e !== "armour";
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-runtime-types.ts
var zt = new Set([
	"character",
	"npc",
	"creature"
]);
function P(e) {
	return typeof e == "object" && !!e;
}
function F(e) {
	return P(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function I(e) {
	return F(e) && zt.has(e.type);
}
function Bt(e) {
	return P(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-equipment.ts
var Vt = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function Ht(e) {
	if (!P(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function Ut(e, t) {
	let n = Ht(e)[t];
	if (n === void 0) return null;
	if (!P(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function Wt(e, t) {
	let n = Ut(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function L(e) {
	return Ut(e, "equipped");
}
function Gt(e) {
	return L(e) !== null;
}
function Kt(e) {
	let t = Ht(e).AP;
	if (!P(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(Vt.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function qt(e) {
	if (!P(e.system) || !P(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function R(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: Wt(e, "equipped"),
		id: e.id,
		name: e.name,
		uuid: e.uuid
	};
	return e.type === "armour" ? {
		...t,
		armourPoints: Kt(e),
		type: "armour"
	} : {
		...t,
		offhand: Wt(e, "offhand"),
		twoHanded: Wt(e, "twohanded"),
		type: "weapon"
	};
}
function Jt(e, t) {
	return Rt(e.type, R(e), t);
}
async function Yt(e, t, n) {
	let r = R(t), i = Ft(r, r?.equipped ?? L(t), n, r?.type === "weapon" ? qt(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function Xt(e) {
	let t = It(R(e)?.equipped ?? L(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/report-paper-doll-error.ts
function Zt(e) {
	return e instanceof Error ? e.message : String(e);
}
function z(e, t) {
	D(`${o}: ${e}. ${Zt(t)}`, t);
}
function Qt(e, t) {
	e.catch((e) => z(t, e));
}
//#endregion
//#region src/module/foundry/patches/paper-doll/synchronize-paper-doll.ts
var B = "fvtt-paper-doll-ui", $t = "slots", V = /* @__PURE__ */ new Map(), en = /* @__PURE__ */ new Set();
function tn(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function nn(e) {
	let t = e.getFlag(B, $t);
	if (t === void 0) return {};
	if (!N(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return tn(t);
}
function rn() {
	let e = game?.settings.get(B, "globalConfig"), t = new Set([...dt, ...ft]);
	if (P(e) && Object.keys(e).length === 0) return t;
	if (!P(e) || !P(e.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let n = Object.values(e.SLOTS);
	if (!n.every(P)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let r = new Set(n.flatMap((e) => Object.keys(e)));
	return r.size ? r : t;
}
function an(e) {
	return V.has(e.uuid);
}
function on(e) {
	if (!F(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function sn(e) {
	if (!e || e.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function cn(e) {
	let t = nn(e), n = Array.from(e.items), r = n.map(R).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: L(e),
		uuid: e.uuid
	})), o = kt(t, Tt(r, qt(e)), i, rn(), a);
	return At(t, o) ? "unchanged" : (await e.setFlag(B, $t, o), "synchronized");
}
async function H(e) {
	on(e), sn(game);
	let t = e;
	if (!I(t) || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !u("paperDoll")) return "unavailable";
	let n = V.get(t.uuid);
	if (n) return await n, H(t);
	let r = cn(t).finally(() => {
		V.get(t.uuid) === r && V.delete(t.uuid);
	});
	return V.set(t.uuid, r), r;
}
function ln(e) {
	I(e) && (en.has(e.uuid) || (en.add(e.uuid), queueMicrotask(() => {
		en.delete(e.uuid), Qt(H(e), `could not synchronize equipped items for ${e.uuid}`);
	})));
}
async function un() {
	return sn(game), Promise.all(Array.from(game.actors).filter(I).map(H));
}
//#endregion
//#region src/module/foundry/settings/get-optional-feature-statuses.ts
function dn() {
	return Object.entries(c).map(([e, t]) => ({
		available: l(e),
		enabled: u(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
//#endregion
//#region src/module/functions/integrations/paper-doll-argon/bridge.ts
var fn = ["TRINKET", "WRIST_RIGHT"];
function pn(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function mn(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of fn) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(pn)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function hn(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function gn({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
	let i = t === "l" ? n.left : n.right, a = t === "l" ? n.right : n.left, o = a === i ? null : a;
	return {
		...r,
		[e]: {
			...r[e],
			primary: i,
			secondary: o
		}
	};
}
function _n(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/constants.ts
var vn = "enhancedcombathud", yn = a, bn = "enhancedcombathud-wfrp4e", xn = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", Sn = "modules/enhancedcombathud/icons", Cn = [
	"ws",
	"bs",
	"s",
	"t",
	"i",
	"ag",
	"dex",
	"int",
	"wp",
	"fel"
], wn = [{
	key: "ws",
	icon: `${Sn}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${Sn}/bolt-spell-cast.webp`
}], Tn = [
	{
		fallback: "Dodge",
		nameKey: "Dodge"
	},
	{
		fallback: "Cool",
		nameKey: "Cool"
	},
	{
		fallback: "Endurance",
		nameKey: "Endurance"
	},
	{
		fallback: "Athletics",
		nameKey: "Athletics"
	},
	{
		fallback: "Language",
		nameKey: "Language",
		specFallback: "Battle",
		specKey: "SPEC.Battle",
		trained: !0
	},
	{
		fallback: "Heal",
		nameKey: "Heal",
		trained: !0
	}
];
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/refresh.ts
async function En() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/module/functions/patches/paper-doll/find-slot-changes.ts
function Dn(e, t, n) {
	return e[t]?.[n] ?? null;
}
function On(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = Dn(e, i, a), o = Dn(t, i, a);
			n !== o && r.push({
				from: n,
				slotId: i,
				slotIndex: Number(a),
				to: o
			});
		}
	}
	return r;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/enforce-paper-doll-equipped-state.ts
var kn = Symbol.for("paper-doll-wfrp4e.equipped-state");
function An() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function jn(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function Mn(e) {
	if (!P(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function Nn() {
	return Promise.resolve();
}
function Pn() {
	let e = An(), t = e?.equip, n = globalThis.fromUuid;
	if (jn(e, t, n), !n) throw Error("Foundry UUID resolution is unavailable.");
	if (e[kn] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!Bt(a) || F(this.actor) && !I(this.actor)) return r.call(this, e, t, i);
		let o = Mn(i);
		if (!t) return Nn();
		if (!I(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!Jt(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await Yt(this.actor, a, o);
		} catch (e) {
			z(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await H(this.actor);
			} catch (e) {
				z(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[kn] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/enforce-paper-doll-slot-types.ts
var Fn = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function In() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function Ln(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function Rn() {
	let e = In(), t = e?.filterItems;
	if (Ln(e, t), e[Fn] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => Bt(e) && Jt(e, t));
	}, e[Fn] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-slot-tooltips.ts
var zn = ".paper-doll .paper-doll-slot", U = `data-${a}-drag-tooltip`, Bn = `data-${a}-tooltip`, Vn = `data-${a}-original-tooltip`, Hn = {
	HEAD: {
		key: `${a}.SlotTooltip.Head`,
		fallback: "Head armour"
	},
	CAPE: {
		key: `${a}.SlotTooltip.Cape`,
		fallback: "Aesthetic Item"
	},
	BODY: {
		key: `${a}.SlotTooltip.Body`,
		fallback: "Body armour"
	},
	GLOVES: {
		key: `${a}.SlotTooltip.Gloves`,
		fallback: "Arm armour"
	},
	BOOTS: {
		key: `${a}.SlotTooltip.Boots`,
		fallback: "Leg armour"
	},
	TRINKET: {
		key: `${a}.SlotTooltip.Trinket`,
		fallback: "Ready Item"
	},
	PENDANT: {
		key: `${a}.SlotTooltip.Pendant`,
		fallback: "Amulet"
	},
	RING: {
		key: `${a}.SlotTooltip.Ring`,
		fallback: "Worn Item"
	},
	WRIST_LEFT: {
		key: `${a}.SlotTooltip.WristLeft`,
		fallback: "Light Source"
	},
	WRIST_RIGHT: {
		key: `${a}.SlotTooltip.WristRight`,
		fallback: "Quick Use Item"
	},
	MAIN_LEFT: {
		key: `${a}.SlotTooltip.MainLeft`,
		fallback: "Main hand"
	},
	MAIN_RIGHT: {
		key: `${a}.SlotTooltip.MainRight`,
		fallback: "Off hand"
	}
}, Un = !1;
function Wn(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(zn);
	return t?.closest(".paper-doll") ? t : null;
}
function Gn() {
	document.querySelectorAll(`[${Bn}]`).forEach((e) => {
		let t = e.getAttribute(Vn);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(Bn), e.removeAttribute(Vn);
	});
}
function Kn() {
	document.querySelectorAll(zn).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(U, t), e.removeAttribute("data-tooltip"));
	});
}
function qn() {
	document.querySelectorAll(`[${U}]`).forEach((e) => {
		let t = e.getAttribute(U);
		t && (e.dataset.tooltip = t), e.removeAttribute(U);
	});
}
function Jn(e) {
	if (Un || e.hasAttribute(Bn)) return;
	let t = Hn[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(Vn, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(Bn, "");
}
function Yn(e) {
	let t = Wn(e.target);
	t && Jn(t);
}
function Xn() {
	Un = !0, Gn(), Kn();
}
function Zn() {
	Un = !1, qn();
}
function Qn() {
	document.addEventListener("pointerover", Yn, !0), document.addEventListener("dragstart", Xn, !0), document.addEventListener("dragend", Zn, !0);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-paper-doll-hooks.ts
var $n = /* @__PURE__ */ new Map();
function W() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && u("paperDoll");
}
function er(e) {
	if (!P(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!P(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[B];
	return P(n) ? "slots" in n ? N(n.slots) ? {
		kind: "valid",
		state: n[$t]
	} : {
		kind: "malformed",
		reason: "the Paper Doll slots update has an invalid shape"
	} : { kind: "absent" } : {
		kind: "malformed",
		reason: "the Paper Doll flag update is not an object"
	};
}
function tr(e) {
	let t = er(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function nr(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function rr(e, t) {
	let n = $n.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), $n.set(e.uuid, n);
}
function ir(e) {
	if (!P(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function ar(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (z(n, AggregateError(r, n)), await H(e));
}
function or(e, t, n) {
	if (!W() || !I(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!P(i) || typeof i.item != "string") continue;
		let t = ir(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = nr(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!Jt(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(Yt(e, n, t));
	}
	r.length && Qt(ar(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function sr(e, t) {
	if (!W() || !I(e) || an(e)) return;
	let n = tr(t);
	if (!n) return;
	let r = e.getFlag(B, $t);
	if (r !== void 0) {
		if (!N(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of On(r, n)) {
			if (!t.from) continue;
			let n = nr(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && rr(e, n.uuid);
		}
	}
}
function cr(e, t) {
	if (!W() || !I(e) || !tr(t)) return;
	let n = $n.get(e.uuid);
	$n.delete(e.uuid), n?.size && Qt(ar(e, Array.from(n, (t) => {
		let n = nr(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(Xt), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function lr(e) {
	!W() || !Bt(e) || e.type !== "armour" && e.type !== "weapon" && !Gt(e) || I(e.parent) && ln(e.parent);
}
function ur() {
	Qn(), Hooks.on("paper-doll-swap", or), Hooks.on("preUpdateActor", sr), Hooks.on("updateActor", cr), Hooks.on("updateItem", lr), Hooks.once("ready", () => {
		if (W()) {
			try {
				Rn(), Pn();
			} catch (e) {
				throw z("could not initialize the required Paper Doll integration", e), e;
			}
			Qt(un(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/fvtt-paper-doll-ui/register-integration.ts
var dr = "fvtt-paper-doll-ui";
function fr() {
	s("fvtt-paper-doll-ui") && u("paperDoll") && ur();
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/bridge-runtime.ts
var pr = "activeWeaponSet", mr = "slots", hr = "weaponSets";
function gr(e) {
	let t = e.getFlag(dr, mr);
	if (t === void 0) return {};
	if (!N(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function _r(e) {
	let t = e.getFlag(vn, pr);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function vr(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function yr(e) {
	let t = e.getFlag(vn, hr);
	if (t === void 0) return {};
	if (!P(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !P(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: vr(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: vr(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function br(e, t) {
	let n = yr(e), r = gn({
		activeSetId: _r(e),
		mainHand: qt(e),
		mainSlots: hn(t),
		weaponSets: n
	}), i = !_n(n, r);
	return i && await e.setFlag(vn, hr, r), await En(), i ? "synchronized" : "unchanged";
}
function xr(e) {
	if (!F(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return mn(gr(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function Sr(e) {
	if (!P(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!P(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[dr];
	if (!P(n) || !(mr in n)) return null;
	let r = n[mr];
	if (!N(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function Cr(e) {
	if (!F(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return !I(e) || !u("paperDoll") || !u("argonCombatHud") || !u("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", mr) === void 0 ? (await En(), "unchanged") : br(e, gr(e));
}
//#endregion
//#region src/module/foundry/integrations/splatter/configure-splatter.ts
async function wr() {
	let e = ke(S);
	return await Be(e), {
		automaticBloodColors: game?.settings.get(S, "useBloodsheet") === !0,
		bloodColorCount: Object.keys(game?.settings.get(S, ve)).length,
		speciesPath: e.values.creatureType
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/configuration.ts
function G(e) {
	return game?.i18n.localize(`wfrp4e-compatibility-box.BossBar.${e}`) ?? e;
}
function Tr(e) {
	console.error(`${a} | Boss Bar integration failed.`, e), ui?.notifications?.error(G("Error"));
}
function Er() {
	return {
		currentHpPath: game?.settings.get(m, "currentHpPath"),
		maxHpPath: game?.settings.get(m, "maxHpPath"),
		woundsSystem: game?.settings.get(m, "woundsSystem")
	};
}
async function Dr() {
	return await Be(ke(m)), ui?.notifications?.info(G("Configured")), Er();
}
//#endregion
//#region src/module/wfrp/folders/queue.ts
var Or = /* @__PURE__ */ new WeakMap();
async function kr(e, t) {
	let n = (Or.get(e) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		let e = globalThis.navigator?.locks;
		e ? await e.request("foundry:folder-tidy", t) : await t();
	});
	Or.set(e, n);
	try {
		await n;
	} finally {
		Or.get(e) === n && Or.delete(e);
	}
}
//#endregion
//#region src/module/wfrp/folders/merge.ts
async function Ar(e, t, n, r) {
	let i = (e) => t.filter((t) => t.folder?.id === e.id), a = (e) => n.filter((t) => t.folder?.id === e.id), o = async (e, t) => {
		if (await e.update({ folder: t?.id ?? null }), (e.folder?.id ?? null) !== (t?.id ?? null)) throw Error(`Could not move WFRP folder content ${e.id}.`);
	}, s = async (e, n) => {
		for (let t of a(e)) await o(t, n);
		for (let t of i(e)) await o(t, n);
		if (!await e.delete({
			deleteSubfolders: !1,
			deleteContents: !1
		})) throw Error(`Could not delete empty duplicate WFRP folder ${e.name}.`);
		t.splice(t.indexOf(e), 1);
	}, c = (e) => r(e) || a(e).some(r) || i(e).some(c), l = async (e) => {
		let t = /* @__PURE__ */ new Map();
		for (let n of i(e).sort((e, t) => e.id.localeCompare(t.id))) {
			let e = t.get(n.name);
			e ? await s(n, e) : t.set(n.name, n);
		}
		for (let t of a(e)) r(t) || await o(t, null);
		for (let t of i(e)) c(t) ? await l(t) : await o(t, null);
	}, u = e[0];
	if (u) {
		for (let t of e.slice(1)) await s(t, u);
		await l(u);
	}
}
//#endregion
//#region src/module/functions/wfrp/folders.ts
function jr(e, t) {
	return e.startsWith("wfrp4e-") && [...t].some((e) => /cubicle\s*7/i.test(e.name));
}
function Mr(e, t, n) {
	let r = e["warhammer-lib"], i = e.core, a = [
		r?.source,
		e.source,
		t?.startsWith("Compendium.") ? t.split(".")[1] : void 0,
		i?.sourceId?.startsWith("Compendium.") ? i.sourceId.split(".")[1] : void 0
	];
	for (let [t, n] of Object.entries(e)) n && typeof n == "object" && "initialization-folder" in n && a.push(t);
	return a.find((e) => typeof e == "string" && n.has(e));
}
function Nr(e, t) {
	if (t < 1) throw Error("WFRP folders need at least one available level.");
	return e.length <= t ? [...e] : [...e.slice(0, t - 1), e.slice(t - 1).join("/")];
}
function Pr(e, t, n, r) {
	let i = new Map(e.map((e) => [e.id, e])), a = (e) => {
		let t = [];
		for (; e;) {
			if (t.some((t) => t.id === e)) throw Error("Cycle in the WFRP folder hierarchy.");
			let n = i.get(e);
			if (!n) break;
			t.unshift(n), e = n.parent;
		}
		return t;
	}, o = (e) => a(e).some((e) => e.id === n), s = (t) => e.filter((e) => e.parent === t), c = (e) => {
		let r = t.filter((t) => t.parent === e.id), i = s(e.id);
		return (e.official || r.some((e) => e.official) || i.length > 0) && r.every((e) => e.official) && i.every((e) => e.id !== n && c(e));
	};
	for (let t of e) a(t.id);
	let l = e.filter((e) => !o(e.id) && c(e)), u = new Set(l.map((e) => e.id)), d = l.filter((e) => !a(e.parent).some((e) => u.has(e.id))), f = {
		folders: [],
		entries: []
	}, p = /* @__PURE__ */ new Set();
	for (let t of d) {
		let i = e.map((e) => ({
			folder: e,
			path: a(e.id)
		})).filter(({ path: e }) => e.some((e) => e.id === t.id)).map(({ folder: e, path: n }) => ({
			folder: e,
			path: n.slice(n.findIndex((e) => e.id === t.id))
		})).sort((e, t) => t.path.length - e.path.length);
		for (let { folder: e, path: t } of i) {
			p.add(e.id);
			let i = Nr(t.map((e) => e.name), r - 1).at(-1), a = t.length === 1 || r === 2 ? n : t[Math.min(t.length - 2, r - 3)].id;
			(e.parent !== a || e.name !== i) && f.folders.push({
				id: e.id,
				parent: a,
				name: i
			});
		}
	}
	for (let e of t) {
		if (!e.official || o(e.parent) || e.parent && p.has(e.parent)) continue;
		let t = a(e.parent).map((e) => e.name);
		f.entries.push({
			id: e.id,
			path: Nr(t.length ? t : [e.fallback], r - 1)
		});
	}
	return f;
}
var Fr = ["keepWfrpImportedContentTidy", "keepWfrpCompendiumsTidy"];
function Ir(e) {
	if (!game?.user) throw Error("Foundry user is unavailable during WFRP setting registration.");
	for (let t of Fr) game.settings.register(a, t, {
		name: `${a}.Settings.WfrpFolders.${t}.Name`,
		hint: `${a}.Settings.WfrpFolders.${t}.Hint`,
		config: game.user.isGM === !0,
		default: !0,
		scope: "world",
		type: Boolean,
		onChange: e
	});
}
//#endregion
//#region src/module/wfrp/folders/migration.ts
var Lr = "whence-they-hang";
async function Rr(e) {
	if (!e.ready || !e.user?.isGM) return;
	let t = e.settings.storage.get("world");
	if (!t) throw Error("World settings storage is unavailable during WFRP migration.");
	for (let n of Fr) {
		if (t.getSetting(`wfrp4e-compatibility-box.${n}`)) continue;
		let r = t.getSetting(`${Lr}.${n}`)?.value;
		typeof r == "boolean" && await e.settings.set(a, n, r);
	}
}
//#endregion
//#region src/module/wfrp/folders/tidy.ts
var zr = "__wfrp_tidy_root__", Br = "Warhammer Fantasy Roleplay";
async function Vr(e, t) {
	await kr(e, () => Hr(e, t));
}
async function Hr(e, t) {
	if (!e.ready || !e.user?.isGM || e.system.id !== "wfrp4e") return;
	await Rr(e);
	let n = new Set([...e.modules.entries()].filter(([e, t]) => jr(e, t.authors ?? [])).map(([e]) => e));
	n.add("wfrp4e");
	let r = (e) => Mr(e.flags ?? {}, e._stats?.compendiumSource, n), i = new Map([...e.modules.entries()].map(([e, t]) => [e, t.title ?? e])), a = async (n, a) => {
		let o = [...e.folders].filter((e) => e.type === n), s = new Set([...o, ...a].map((e) => e.folder?.id)), c = o.filter((e) => !e.folder && (e.name === Br || e.name === "WFRP")).sort((e, t) => Number(s.has(t.id)) - Number(s.has(e.id)) || e.id.localeCompare(t.id)), l = c[0];
		await Ar(c, o, a, (e) => !!r(e)), l && l.name !== Br && await l.update({ name: Br });
		let u = Pr(o.map((e) => ({
			id: e.id,
			name: e.name,
			parent: e.folder?.id ?? null,
			official: !!r(e)
		})), a.map((e) => ({
			id: e.id,
			parent: e.folder?.id ?? null,
			official: !!r(e),
			fallback: i.get(r(e)) ?? "WFRP Content"
		})), l?.id ?? zr, t);
		if (!u.folders.length && !u.entries.length) return;
		let d = async (e, t) => {
			let r = await CONFIG.Folder.documentClass.create({
				name: e,
				type: n,
				folder: t,
				sorting: "a"
			});
			if (!r) throw Error(`Could not create ${n} folder ${e}.`);
			return o.push(r), r;
		};
		l ??= await d(Br, null);
		for (let e of u.folders) await o.find((t) => t.id === e.id).update({
			name: e.name,
			folder: e.parent === zr ? l.id : e.parent
		});
		for (let e of u.entries) {
			let t = l;
			for (let n of e.path) t = o.filter((e) => e.name === n && e.folder?.id === t.id).sort((e, t) => e.id.localeCompare(t.id))[0] ?? await d(n, t.id);
			await a.find((t) => t.id === e.id).update({ folder: t.id });
		}
		await Ar([l], o, a, (e) => !!r(e));
	};
	if (e.settings.get("wfrp4e-compatibility-box", "keepWfrpImportedContentTidy")) for (let [t, n] of e.collections.entries()) t === "Folder" || !n.documentClass.schema.has("folder") || await a(t, [...n]);
	e.settings.get("wfrp4e-compatibility-box", "keepWfrpCompendiumsTidy") && await a("Compendium", [...e.packs.entries()].map(([t, n]) => ({
		id: t,
		get folder() {
			return n.folder;
		},
		flags: { source: n.metadata?.packageName },
		update: async (t) => {
			let r = t.folder === null ? null : [...e.folders].find((e) => e.id === t.folder);
			await n.setFolder(r);
		}
	})));
}
async function Ur() {
	game && await Vr(game, CONST.FOLDER_MAX_DEPTH);
}
//#endregion
//#region src/module/functions/folders/empty.ts
function Wr(e, t) {
	let n = new Set(e.map((e) => e.id)), r = [];
	for (; n.size;) {
		let i = new Set(e.filter((e) => n.has(e.id)).map((e) => e.parent)), a = e.filter((e) => n.has(e.id) && !t.has(e.id) && !i.has(e.id));
		if (!a.length) break;
		for (let e of a) r.push(e), n.delete(e.id);
	}
	return r;
}
//#endregion
//#region src/module/foundry/folders/empty.ts
function Gr() {
	if (!game?.ready || !game.user?.isGM) throw Error("Only a GM in a loaded world can purge folders.");
	return game;
}
async function Kr(e) {
	let t = Gr();
	if (![
		"world",
		"compendiums",
		"both"
	].includes(e)) throw Error("Invalid folder scope.");
	let n = [], r = () => [...t.packs.entries()].map(([, e]) => e), i = 0;
	if (e !== "compendiums") for (let [e, r] of t.collections.entries()) e === "Folder" || !r.documentClass.schema.has("folder") || n.push({
		label: `World: ${e}`,
		folders: () => [...t.folders].filter((t) => t.type === e),
		occupied: () => new Set([...r].flatMap((e) => e.folder ? [e.folder.id] : [])),
		editable: () => !0
	});
	if (e !== "world") {
		n.push({
			label: "Compendium sidebar",
			folders: () => [...t.folders].filter((e) => e.type === "Compendium"),
			occupied: () => new Set(r().flatMap((e) => e.folder ? [e.folder.id] : [])),
			editable: () => !0
		});
		for (let e of r()) {
			if (e.locked) {
				i++;
				continue;
			}
			await e.getIndex({ fields: ["folder"] }), n.push({
				label: `Compendium: ${e.title}`,
				folders: () => [...e.folders],
				occupied: () => new Set([...e.index].flatMap((e) => e.folder ? [e.folder] : [])),
				editable: () => !e.locked && r().includes(e)
			});
		}
	}
	return {
		skippedPacks: i,
		candidates: n.flatMap((e) => Wr(e.folders().map((e) => ({
			id: e.id,
			name: e.name,
			parent: e.folder?.id ?? null
		})), e.occupied()).map((t) => ({
			group: e,
			id: t.id,
			name: t.name
		})))
	};
}
async function qr(e) {
	let t = Gr(), n = {
		deleted: 0,
		skipped: 0
	};
	return await kr(t, async () => {
		for (let t of e.candidates) {
			Gr();
			let { group: e, id: r } = t, i = e.folders(), a = i.find((e) => e.id === r);
			if (!a || !e.editable() || e.occupied().has(r) || i.some((e) => e.folder?.id === r)) {
				n.skipped++;
				continue;
			}
			if (!await a.delete({
				deleteSubfolders: !1,
				deleteContents: !1
			}) || e.folders().some((e) => e.id === r)) throw Error(`Could not remove empty folder "${a.name}". ${n.deleted} folders removed before stopping.`);
			n.deleted++;
		}
	}), n;
}
//#endregion
//#region src/module/foundry/folders/purge-dialog.ts
var Jr = "Purge Empty Folders";
function Yr(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
async function Xr() {
	if (!game?.ready || !game.user?.isGM) {
		ui?.notifications?.warn("Only a GM in a loaded world can purge empty folders.");
		return;
	}
	try {
		let e = await foundry.applications.api.DialogV2.wait({
			window: { title: Jr },
			content: "<p>Search for empty folders in world directories, compendiums, or both. Compendium cleanup includes the sidebar and folders inside unlocked packs. Locked packs are skipped.</p><p>All empty folders in the selected scope qualify, including non-WFRP folders. You will review the list before deletion.</p>",
			buttons: [
				{
					action: "world",
					label: "World folders"
				},
				{
					action: "compendiums",
					label: "Compendium folders"
				},
				{
					action: "both",
					label: "Both"
				},
				{
					action: "cancel",
					label: "Cancel",
					default: !0
				}
			],
			rejectClose: !1
		});
		if (e !== "world" && e !== "compendiums" && e !== "both") return;
		let t = await Kr(e), n = t.skippedPacks ? ` Skipped ${t.skippedPacks} locked packs.` : "";
		if (!t.candidates.length) {
			ui?.notifications?.info(`No empty folders found.${n}`);
			return;
		}
		let r = t.candidates.map(({ group: e, name: t }) => `<li>${Yr(e.label)}: ${Yr(t)}</li>`).join("");
		if (await foundry.applications.api.DialogV2.wait({
			window: { title: Jr },
			position: { width: 600 },
			content: `<p>Remove ${t.candidates.length} empty folders, including parents left empty after their children are removed?${n}</p><p>Folders are rechecked before deletion. Documents and compendium packs are never deleted.</p><details><summary>Review folders</summary><ul>${r}</ul></details>`,
			buttons: [{
				action: "purge",
				label: "Purge Empty Folders"
			}, {
				action: "cancel",
				label: "Cancel",
				default: !0
			}],
			rejectClose: !1
		}) !== "purge") return;
		let i = await qr(t);
		ui?.notifications?.info(`Removed ${i.deleted} empty folders. Skipped ${i.skipped} folders that changed.${n}`);
	} catch (e) {
		D(`${Jr} stopped. Some folders may already have been removed. See the console for details.`, e);
	}
}
//#endregion
//#region src/module/foundry/api/create-module-api.ts
function Zr() {
	return {
		settingsPresets: tt,
		settingsPresetCoordinator: ct,
		configureBossBar: Dr,
		configureSplatter: wr,
		purgeEmptyFolders: Xr,
		getOptionalFeatures: dn,
		syncAllPaperDollActors: un,
		syncPaperDollArgonActor: Cr,
		syncPaperDollActor: H,
		tidyWfrpContent: Ur
	};
}
//#endregion
//#region src/module/foundry/api/register-module-api.ts
function Qr() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(a);
	if (!e) throw Error(`Foundry module registry entry was not found for ${a}.`);
	let t = e;
	t.api = Zr();
}
//#endregion
//#region src/module/functions/integrations/bossbar/selection.ts
function $r(e) {
	let t = e.filter((e) => e.enemy), n = (e, t) => e.traits.some((e) => e.trim().toLowerCase() === t), r = t.filter((e) => n(e, "boss"));
	if (r.length) return r;
	let i = t.filter((e) => e.maxWounds >= 30 && n(e, "grim") && (n(e, "leader") || n(e, "champion"))).sort((e, t) => t.maxWounds - e.maxWounds || t.weaponSkill - e.weaponSkill || t.strength - e.strength), a = i[0];
	if (!a) return [];
	let o = i.filter((e) => e.maxWounds === a.maxWounds && e.weaponSkill === a.weaponSkill && e.strength === a.strength);
	return o.length <= 2 ? o : [];
}
//#endregion
//#region src/module/functions/integrations/bossbar/health.ts
var ei = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
};
function ti(e) {
	return Object.entries(ei).every(([t, n]) => e[t] === n);
}
function ni(e, t) {
	return !Number.isFinite(e) || !Number.isFinite(t) || t <= 0 ? 0 : Math.min(100, Math.max(0, 100 * e / t));
}
function ri(e) {
	let t = Number.isFinite(e.maxCriticals) ? Math.max(0, Math.floor(e.maxCriticals)) : 0;
	return {
		max: t,
		remaining: Math.max(0, t - Math.max(0, e.criticals))
	};
}
function ii(e) {
	return (typeof e == "number" || typeof e == "string" && e.trim() !== "") && Number.isFinite(Number(e));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/runtime.ts
function ai() {
	return ui && Reflect.get(ui, "bossBar");
}
function oi(e) {
	return Array.from(e.combatants).flatMap(({ actor: e, token: t }) => e ? [{
		uuid: e.uuid,
		enemy: t?.disposition === -1 && !e.hasPlayerOwner,
		traits: Array.from(e.items).filter((e) => e.type === "trait").map((e) => e.name),
		maxWounds: e.system.status?.wounds?.max ?? 0,
		weaponSkill: e.system.characteristics?.ws?.value ?? 0,
		strength: e.system.characteristics?.s?.value ?? 0
	}] : []);
}
function si(e) {
	return {
		wounds: e.system.status?.wounds?.value ?? 0,
		maxWounds: e.system.status?.wounds?.max ?? 0,
		maxCriticals: e.system.status?.criticalWounds?.max ?? 0,
		criticals: Array.from(e.items).filter((e) => e.type === "critical" && ii(e.system?.wounds?.value)).length
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/combat.ts
var ci = /* @__PURE__ */ new WeakSet();
async function li(e) {
	if (!game?.user?.isGM || !u("bossBar") || !game.settings.get("wfrp4e-compatibility-box", h.automatic) || !e.scene || ci.has(e)) return;
	let t = $r(oi(e)), n = e.scene.getFlag("bossbar", "actors") ?? [], r = new Set(n.map((e) => e.uuid)), i = game.settings.get(m, "barStyles"), a = t.filter((e) => r.has(e.uuid) ? !1 : (r.add(e.uuid), !0)).map((e) => ({
		uuid: e.uuid,
		style: i[0]?.id ?? "default",
		hideName: !1
	}));
	if (a.length) {
		ci.add(e);
		try {
			await e.scene.setFlag(m, "actors", [...n, ...a]);
		} finally {
			ci.delete(e);
		}
	}
}
//#endregion
//#region src/module/foundry/integrations/bossbar/critical-segments.ts
var di = "wfrp-bossbar-segments", fi = "http://www.w3.org/2000/svg", pi = [
	"background",
	"bar",
	"foreground"
], mi = [
	"bg",
	"bar",
	"fg"
];
function hi(e, t) {
	let n = pi.map((t) => e.querySelector(`:scope > .bar-${t}`)), r = n.map((e) => e?.querySelector(":scope > img")), i = r.every((e, t) => e?.getAttribute("src")?.split(/[?#]/)[0]?.endsWith(`/bossbar/resources/matching-images/segmented/${mi[t]}.png`)), a = t !== void 0 && i ? String(t) : void 0;
	if (e.dataset.wfrpBossbarSegments === a) return;
	e.querySelectorAll(`.${di}`).forEach((e) => e.remove()), e.classList.toggle("wfrp-bossbar-segmented", a !== void 0);
	let o = e.closest(".bar-list-item");
	if (o?.classList.toggle("wfrp-bossbar-segmented-row", a !== void 0), a === void 0) {
		o?.style.removeProperty("--wfrp-bossbar-segment-count"), delete e.dataset.wfrpBossbarSegments;
		return;
	}
	o?.style.setProperty("--wfrp-bossbar-segment-count", a), e.dataset.wfrpBossbarSegments = a;
	for (let [t, i] of n.entries()) {
		let n = r[t];
		if (!i || !n) continue;
		let o = e.ownerDocument.createElement("div");
		o.className = di, o.setAttribute("aria-hidden", "true"), o.style.gridTemplateColumns = a === "0" ? "none" : `repeat(${a}, minmax(0, 1fr))`;
		for (let t = 0; t < Number(a); t++) o.append(gi(e.ownerDocument, n.src));
		i.append(o);
	}
}
function gi(e, t) {
	let n = e.createElementNS(fi, "svg");
	n.setAttribute("viewBox", "829 0 787 361"), n.setAttribute("preserveAspectRatio", "xMidYMid meet");
	let r = e.createElementNS(fi, "image");
	return r.setAttribute("href", t), r.setAttribute("width", "7967"), r.setAttribute("height", "361"), n.append(r), n;
}
//#endregion
//#region src/module/foundry/integrations/bossbar/wounds-bar.ts
function _i(e, t) {
	let n = e.createElement("div");
	n.className = `boss-bar-container ${t.type === 1 ? "matching-images" : "classic"} wfrp-bossbar-wounds`, n.style.setProperty("--bar-height", `${Math.max(4, t.barHeight * .3)}px`), n.style.setProperty("--bar-temp-color", t.tempBarColor), n.style.setProperty("--bar-temp-alpha", String(t.tempBarAlpha));
	for (let [r, i] of [
		["background", t.background],
		["bar", t.bar],
		["foreground", t.foreground]
	]) {
		let a = e.createElement("div");
		if (a.className = `bar-component bar-${r}`, t.type === 1) {
			if (i) {
				let t = e.createElement("img");
				t.src = i, t.alt = "", a.append(t);
			}
		} else {
			let t = r === "bar" ? e.createElement("div") : a;
			t !== a && (t.className = "inner", a.append(t)), t.style.backgroundImage = i ? `url(${JSON.stringify(i)})` : "none";
		}
		n.append(a);
	}
	return n;
}
function vi(e, t) {
	return e.find((e) => e.id === t) ?? e[0];
}
//#endregion
//#region src/module/foundry/integrations/bossbar/display.ts
function yi(e = ai()) {
	if (!e?.element || e.id !== "boss-bar") return;
	let t = e.element;
	t.classList.add("wfrp4e-compatibility-box-bossbar");
	let n = ie() && game?.settings.get("wfrp4e-compatibility-box", h.stacked) === !0 && ti(Er()), r = game?.settings.get(m, "barStyles"), i = game?.settings.get(a, h.woundsStyle), o = vi(r, i);
	for (let r of t.querySelectorAll(".bar-list-item")) {
		let t = e.bars.find((e) => e.actor.uuid === r.dataset.uuid)?.actor;
		if (!t) continue;
		let i = r.querySelector(".boss-bar-container:not(.wfrp-bossbar-wounds)");
		if (!i) continue;
		if (!n || !o) {
			hi(i), r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), i.dataset.wfrpBossbarPrimary && (i.style.removeProperty("--bar-percent"), i.removeAttribute("role"), i.removeAttribute("aria-label"), i.removeAttribute("aria-valuenow"), i.removeAttribute("aria-valuemax"), i.removeAttribute("aria-valuemin"), delete i.dataset.wfrpBossbarPrimary);
			continue;
		}
		let a = si(t), s = ri(a);
		hi(i, s.max), i.dataset.wfrpBossbarPrimary = "true", i.style.setProperty("--bar-percent", `${ni(s.remaining, s.max)}%`), bi(i, G("CriticalCapacity"), s.remaining, s.max);
		let c = r.querySelector(".wfrp-bossbar-wounds");
		c?.dataset.style !== o.id && (r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), c = _i(r.ownerDocument, o), c.dataset.wfrpBossbarExtra = "", c.dataset.style = o.id, i.before(c)), c && (c.style.setProperty("--bar-percent", `${ni(a.wounds, a.maxWounds)}%`), c.classList.toggle("wfrp-bossbar-threat", a.wounds <= 0), bi(c, G("Wounds"), Math.max(0, a.wounds), a.maxWounds));
	}
}
function bi(e, t, n, r) {
	e.setAttribute("role", "progressbar"), e.setAttribute("aria-label", t), e.setAttribute("aria-valuemin", "0"), e.setAttribute("aria-valuemax", String(Math.max(0, r))), e.setAttribute("aria-valuenow", String(Math.min(n, Math.max(0, r))));
}
var xi = !1;
function Si() {
	xi || (xi = !0, queueMicrotask(() => {
		xi = !1;
		let e = ai();
		if (e?.element?.isConnected) try {
			e.updateBars(), yi(e);
		} catch (e) {
			Tr(e);
		}
	}));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/settings.ts
function Ci() {
	if (game) {
		for (let e of ["automatic", "stacked"]) game.settings.register(a, h[e], {
			name: `${a}.BossBar.Settings.${e}.Name`,
			hint: `${a}.BossBar.Settings.${e}.Hint`,
			config: !0,
			default: !0,
			scope: "world",
			type: Boolean
		});
		game.settings.register(a, h.woundsStyle, {
			name: `${a}.BossBar.Settings.woundsStyle.Name`,
			hint: `${a}.BossBar.Settings.woundsStyle.Hint`,
			config: !0,
			default: "default-grass",
			scope: "world",
			type: String,
			choices: () => Object.fromEntries((game?.settings.get(m, "barStyles")).map((e) => [e.id, e.name]))
		});
	}
}
function wi(e) {
	if (!game?.user?.isGM) return;
	let t = e.querySelector(`[name="${m}.currentHpPath"]`)?.closest(".form-group");
	if (!t || e.querySelector("[data-wfrp-bossbar-setup]")) return;
	let n = e.ownerDocument.createElement("div");
	n.className = "form-group", n.dataset.wfrpBossbarSetup = "";
	let r = e.ownerDocument.createElement("button");
	r.type = "button", r.textContent = G("Configure"), r.addEventListener("click", async () => {
		r.disabled = !0;
		try {
			let t = await Dr();
			for (let [n, r] of Object.entries(t)) {
				let t = e.querySelector(`[name="bossbar.${n}"]`);
				t && (typeof r == "boolean" ? t.checked = r : t.value = r);
			}
			let n = e.querySelector(`[name="${a}.${h.stacked}"]`);
			n && (n.checked = !0);
		} catch (e) {
			Tr(e);
		} finally {
			r.disabled = !1;
		}
	}), n.append(r), t.insertAdjacentElement("beforebegin", n);
}
//#endregion
//#region src/module/foundry/integrations/bossbar/register-integration.ts
function Ti() {
	if (s("bossbar") && !(!u("bossBar") || game?.system.id !== "wfrp4e")) {
		Ci(), Hooks.on("combatStart", (e) => void li(e).catch(Tr)), Hooks.on("renderBossBar", (e) => yi(e)), Hooks.on("renderSettingsConfig", (e, t) => {
			t instanceof HTMLElement && wi(t);
		});
		for (let e of [
			"updateActor",
			"createItem",
			"updateItem",
			"deleteItem",
			"createActiveEffect",
			"updateActiveEffect",
			"deleteActiveEffect"
		]) Hooks.on(e, Si);
		Hooks.on("updateSetting", (e) => {
			let t = e.key;
			[
				"bossbar.currentHpPath",
				"bossbar.maxHpPath",
				"bossbar.woundsSystem"
			].includes(t) && ai()?.render(!0).catch(Tr), (t.startsWith("bossbar.") || t.startsWith("wfrp4e-compatibility-box.bossBar") || t === "wfrp4e.uiaCrits") && Si();
		});
	}
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/argon-logic.ts
var Ei = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function Di(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function Oi(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function ki(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function Ai(e) {
	return e.trim().toLowerCase();
}
function ji(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function Mi(e) {
	return e.type === "trait" ? (ki(e), e.rollable && !e.disabled && Ei.has(e.traitBaseName.toLowerCase())) : !1;
}
function Ni(e) {
	return e.type === "weapon" || Mi(e);
}
function Pi(e) {
	return e.type === "weapon";
}
function Fi(e) {
	return Di(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function Ii(e) {
	return Di(e), e.advances > 0;
}
function Li(e, t) {
	return e.forEach(Di), t === "basic" ? e.filter((e) => !Fi(e)).map((e) => e.id) : t === "advanced" ? e.filter(Fi).map((e) => e.id) : t === "trained" ? e.filter(Ii).map((e) => e.id) : e.map((e) => e.id);
}
function Ri(e, t) {
	return e.forEach(Oi), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function zi(e) {
	return e.filter((e) => e.type === "weapon" || Mi(e)).map((e) => e.id);
}
function Bi(e) {
	return e.filter((e) => e.type === "trait" ? (ki(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function Vi(e, t) {
	return e.forEach(Di), t.flatMap((t) => {
		let n = Ai(t.name), r = e.find((e) => Ai(e.name) === n);
		return !r || t.trained && !Ii(r) ? [] : [r.id];
	});
}
function Hi(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function Ui(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function Wi(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => Ui(e.name, t))).map((e) => e.id) : [];
}
function Gi(e) {
	let t = [];
	return (e.type === "weapon" || Mi(e)) && t.push({
		label: "wfrp4e-compatibility-box.Argon.Tooltip.Damage",
		value: e.damage
	}, {
		label: "wfrp4e-compatibility-box.Argon.Tooltip.Range",
		value: e.range ?? e.reach
	}), e.type === "skill" && t.push({
		label: "wfrp4e-compatibility-box.Argon.Tooltip.Total",
		value: e.total
	}), e.type === "spell" && t.push({
		label: "wfrp4e-compatibility-box.Argon.Tooltip.CastingNumber",
		value: e.castingNumber
	}, {
		label: "wfrp4e-compatibility-box.Argon.Tooltip.Range",
		value: e.range
	}, {
		label: "wfrp4e-compatibility-box.Argon.Tooltip.Target",
		value: e.target
	}, {
		label: "wfrp4e-compatibility-box.Argon.Tooltip.Duration",
		value: e.duration
	}), e.type === "prayer" && t.push({
		label: "wfrp4e-compatibility-box.Argon.Tooltip.Range",
		value: e.range
	}, {
		label: "wfrp4e-compatibility-box.Argon.Tooltip.Target",
		value: e.target
	}, {
		label: "wfrp4e-compatibility-box.Argon.Tooltip.Duration",
		value: e.duration
	}), t.filter((e) => e.value !== void 0 && e.value !== "");
}
function Ki(e, t) {
	let n = e.find((e) => e.id === t);
	if (!n) throw Error(`Argon weapon set ${t} does not exist.`);
	let r = new Map(n.items.map((e) => [e.id, e])), i = new Map(e.filter((e) => e.id !== t).flatMap((e) => e.items).filter((e) => !r.has(e.id)).map((e) => [e.id, e]));
	return [...Array.from(r.values(), (e) => e.equipped ? [] : [{
		_id: e.id,
		"system.equipped.value": !0
	}]).flat(), ...Array.from(i.values(), (e) => e.equipped ? [{
		_id: e.id,
		"system.equipped.value": !1
	}] : []).flat()];
}
//#endregion
//#region src/module/foundry/settings/register-module-settings.ts
var qi = "argonCombatItemPatterns", Ji = "*Draught*, *Potion*";
function K(e, t) {
	let n = c[t];
	l(t) && e.register(a, n.settingKey, {
		config: !0,
		default: !0,
		hint: `${a}.Settings.Features.${t}.Hint`,
		name: `${a}.Settings.Features.${t}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function Yi(e) {
	l("argonCombatHud") && e.register(a, qi, {
		config: !0,
		default: Ji,
		hint: `${a}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${a}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: En,
		scope: "world",
		type: String
	});
}
function Xi() {
	if (!game) throw Error(`${a} | Foundry game is unavailable during settings registration.`);
	K(game.settings, "argonCombatHud"), K(game.settings, "bossBar"), K(game.settings, "healthEstimate"), K(game.settings, "paperDoll"), K(game.settings, "paperDollArgonBridge"), Yi(game.settings);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/actor-flags.ts
var Zi = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function Qi(e, t) {
	return e.flags?.[bn]?.[t];
}
function $i(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? Qi(e, t);
}
async function ea(e) {
	let t = {};
	for (let n of Zi) {
		if (e.getFlag("wfrp4e-compatibility-box", n) !== void 0) continue;
		let r = Qi(e, n);
		r !== void 0 && (t[`flags.${a}.${n}`] = r);
	}
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/argon-helpers.ts
function ta(e, t) {
	if (typeof e != "object" || !e) throw Error(`${a} | ${t} must be an object.`);
	return e;
}
function q(e, t) {
	if (typeof e != "string" || !e.trim()) throw Error(`${a} | ${t} must be a non-empty string.`);
	return e;
}
function na(e, t) {
	if (typeof e != "boolean") throw Error(`${a} | ${t} must be a boolean.`);
	return e;
}
function ra(e, t) {
	if (!Number.isNumeric(e)) throw Error(`${a} | ${t} must be numeric.`);
	return Number(e);
}
function ia(e) {
	return e == null || e === "" ? null : ra(e, "item quantity");
}
function aa(e, t, n, r) {
	let i = $i(e, t);
	if (i === void 0) return r;
	if (!n.includes(i)) throw Error(`${a} | Argon actor flag ${yn}.${t} has invalid value ${String(i)}.`);
	return i;
}
function oa(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = na(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function sa(e, t = !1) {
	let n = ta(e, "Argon item"), r = q(n.type, "Argon item type"), i = q(n.name, `${r} item name`), a = {
		id: q(n.id, `${r} ${i} id`),
		name: i,
		quantity: ia(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = q(n.advanced?.value, `${i} advanced classification`), a.grouped = q(n.grouped?.value, `${i} grouped classification`), a.advances = ra(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = q(n.lore?.value, `${i} lore`), a.memorized = na(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = na(n.system?.disabled, `${i} disabled state`), a.rollable = na(n.rollable?.value, `${i} rollable state`), a.traitBaseName = ji(i)), t && oa(a, n, r), a;
}
function J(e) {
	return [...e].map((e) => sa(e));
}
function Y(e, t) {
	let n = new Map([...e].map((e) => [e.id, e]));
	return t.map((e) => {
		let t = n.get(e);
		if (!t) throw Error(`${a} | Selected Argon item ${e} is no longer available.`);
		return t;
	});
}
function ca(e) {
	return Gi(sa(e, !0));
}
function la(e) {
	let t = aa(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return Y(n, Li(J(n), t));
}
function ua(e) {
	let t = aa(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return Y(n, Ri(J(n), t));
}
function da(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return Y(t, zi(J(t)));
}
function fa(e) {
	let t = [...e.itemTypes.trait];
	return Y(t, Bi(J(t)));
}
function pa(e) {
	let t = wn.map((e) => ({
		...e,
		type: "characteristic"
	})), n = Tn.map((e) => ({
		name: ma(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = Y(r, Vi(J(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function ma({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = ya(`NAME.${e}`, t);
	return n ? `${i} (${ya(n, r)})` : i;
}
function ha(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = Hi(String(t)), r = [...e.items];
	return Y(r, Wi(J(r), n));
}
function ga(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function _a(e) {
	return Ni(sa(e));
}
function va(e) {
	return Pi(sa(e));
}
function ya(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/buttons.ts
function ba(e) {
	let t = e.ARGON;
	class n extends t.MAIN.BUTTONS.ItemButton {
		get hasTooltip() {
			return !!this.item;
		}
		get quantity() {
			return this.item?.type === "weapon" ? this.item.weaponGroup.value === "throwing" ? this.item.quantity.value : this.item.ammo?.quantity.value ?? null : null;
		}
		async _onLeftClick(e) {
			ui.ARGON.interceptNextDialog(e.currentTarget);
			let t = this.item.type === "spell" ? await this.actor.sheet.castOrChannelPrompt(this.item) : await this.actor.setupItem(this.item.id);
			t && await t.roll();
		}
		async _onRightClick() {
			this.item.sheet.render(!0);
		}
		async getTooltipData() {
			let e = await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.item.description?.value ?? "", { relativeTo: this.item });
			return {
				title: this.item.name,
				description: e,
				details: ca(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = ga(this.item);
			return Number.isNumeric(e) ? e : null;
		}
		async _onLeftClick(e) {
			if (ui.ARGON.interceptNextDialog(e.currentTarget), this.item.system?.usable && typeof this.item.system.use == "function") {
				await this.item.system.use({ event: e });
				return;
			}
			if (typeof this.item.postItem == "function") {
				await this.item.postItem();
				return;
			}
			this.item.sheet.render(!0);
		}
	}
	class i extends t.MAIN.BUTTONS.ItemButton {
		constructor({ key: e, icon: t }) {
			super({ item: {
				img: t,
				name: e
			} }), this.key = e, this._icon = t;
		}
		get label() {
			return game.i18n.localize(game.wfrp4e.config.characteristics[this.key]);
		}
		get icon() {
			return this._icon;
		}
		async _onLeftClick(e) {
			ui.ARGON.interceptNextDialog(e.currentTarget);
			let t = await this.actor.setupCharacteristic(this.key);
			t && await t.roll();
		}
	}
	class a extends t.MAIN.BUTTONS.ActionButton {
		get item() {
			return game.wfrp4e.config.systemItems.unarmed;
		}
		get label() {
			return this.item.name;
		}
		get icon() {
			return this.item.img;
		}
		async _onLeftClick(e) {
			ui.ARGON.interceptNextDialog(e.currentTarget), await (await this.actor.setupWeapon(this.item)).roll();
		}
	}
	class o extends t.MAIN.BUTTONS.ButtonPanelButton {
		constructor({ id: e, label: t, items: r = [], buttons: i = null, icon: a = null, buttonClass: o = n }) {
			super(), this.id = e, this._label = t, this.items = r, this._buttons = i, this._icon = a, this.buttonClass = o;
		}
		get label() {
			return this._label;
		}
		get icon() {
			return this._icon ?? this.items[0]?.img ?? "";
		}
		async _getPanel() {
			let e = this._buttons ?? this.items.map((e) => new this.buttonClass({ item: e }));
			return new t.MAIN.BUTTON_PANELS.ButtonPanel({
				id: this.id,
				buttons: e
			});
		}
	}
	class s extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.Argon.Panel.Actions";
		}
		async _getButtons() {
			let e = ua(this.actor), t = da(this.actor), s = fa(this.actor), c = pa(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = ha(this.actor), u = [
				new n({
					item: null,
					isWeaponSet: !0,
					isPrimary: !0,
					inActionPanel: !0
				}),
				new n({
					item: null,
					isWeaponSet: !0,
					isPrimary: !1,
					inActionPanel: !0
				}),
				new a()
			], d = [
				[
					"weapons",
					"wfrp4e-compatibility-box.Argon.Group.Weapons",
					t
				],
				[
					"spells",
					"wfrp4e-compatibility-box.Argon.Group.Spells",
					e
				],
				[
					"prayers",
					"wfrp4e-compatibility-box.Argon.Group.Prayers",
					this.actor.itemTypes.prayer
				],
				[
					"traits",
					"wfrp4e-compatibility-box.Argon.Group.Traits",
					s
				]
			];
			for (let [e, t, n] of d) n.length && u.push(new o({
				id: e,
				label: t,
				items: n
			}));
			return c.length && u.push(new o({
				id: "combat-skills",
				label: "wfrp4e-compatibility-box.Argon.Group.Skills",
				buttons: c,
				icon: `${Sn}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${Sn}/drink-me.webp`,
				buttonClass: r
			})), u;
		}
	}
	return {
		WFRPActionPanel: s,
		WFRPCombatItemButton: r
	};
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/legacy-module-check.ts
function xa() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!u("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/movement.ts
function Sa(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function Ca(e, t, n) {
	Sa(e, "move score"), Sa(t, "maximum distance"), Sa(n, "used distance");
	let r = Math.max(Math.round(e), 1), i = t > 0 ? t / r : 0, a = t ? Math.floor(n / t) : 0, o = t ? n % t : 0, s = i ? Math.min(Math.ceil(o / i), r) : 0, c = (a + 1) * t;
	return {
		availableBubbles: Math.max(r - s, 0),
		blockLimit: c,
		bubbleDistance: i,
		movementBlock: a,
		remainingDistance: Math.max(c - n, 0),
		usedBubbles: s
	};
}
function wa(e) {
	return Sa(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/panels.ts
function Ta(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function Ea(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function Da(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return xn;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await ea(this.actor), await super._onConfigure(e);
		}
		get description() {
			return this.actor.type === "character" ? this.actor.details.career.value : this.actor.details.species.value;
		}
		get isDead() {
			return !!this.actor.hasCondition("dead");
		}
		async getStatBlocks() {
			let e = this.actor.status.wounds, t = this.actor.status.advantage.value, n = e.max ? e.value / e.max : 0, r = n > .5 ? "#00ff64" : n > .25 ? "#ffc800" : "#ff3232";
			return [[
				{ text: `${game.i18n.localize("wfrp4e-compatibility-box.Argon.Portrait.Wounds")}: ` },
				{
					text: e.value,
					color: r
				},
				{ text: ` / ${e.max}` }
			], [{ text: `${game.i18n.localize("wfrp4e-compatibility-box.Argon.Portrait.Advantage")}: ` }, { text: t }]];
		}
	}
	class r extends t.DRAWER.DrawerPanel {
		get title() {
			return "wfrp4e-compatibility-box.Argon.Drawer.Title";
		}
		get categories() {
			let e = Cn.map((e) => {
				let n = this.actor.characteristics[e], r = async () => {
					await (await this.actor.setupCharacteristic(e)).roll();
				};
				return new t.DRAWER.DrawerButton([
					{
						label: game.i18n.localize(game.wfrp4e.config.characteristics[e]),
						onClick: r
					},
					{
						label: n.value,
						onClick: r
					},
					{
						label: n.bonus,
						onClick: r
					}
				]);
			}), n = la(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
				let n = async () => {
					await (await this.actor.setupSkill(e)).roll();
				};
				return new t.DRAWER.DrawerButton([
					{
						label: e.name,
						onClick: n
					},
					{
						label: e.total.value,
						onClick: n
					},
					{
						label: game.i18n.localize(game.wfrp4e.config.characteristicsAbbrev[e.characteristic.value]),
						onClick: n
					}
				]);
			});
			return [{
				gridCols: "3fr 1fr 1fr",
				captions: [
					{
						label: "wfrp4e-compatibility-box.Argon.Drawer.Characteristics",
						align: "left"
					},
					{
						label: "wfrp4e-compatibility-box.Argon.Drawer.Value",
						align: "center"
					},
					{
						label: "wfrp4e-compatibility-box.Argon.Drawer.Bonus",
						align: "center"
					}
				],
				buttons: e
			}, {
				gridCols: "minmax(0, 3fr) minmax(3.5rem, 1fr) minmax(3.5rem, 1fr)",
				captions: [
					{
						label: "wfrp4e-compatibility-box.Argon.Drawer.Skills",
						align: "left"
					},
					{
						label: "wfrp4e-compatibility-box.Argon.Drawer.Value",
						align: "center"
					},
					{
						label: "wfrp4e-compatibility-box.Argon.Drawer.CharacteristicShort",
						align: "center"
					}
				],
				buttons: n
			}];
		}
	}
	class i extends t.MovementHud {
		get moveScore() {
			return Ta(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return Ta(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return Ea(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += Ta(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = Ca(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${wa(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${wa(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: wa(t.bubbleDistance),
				units: this.movementUnits
			}), i.innerHTML = a;
		}
	}
	return {
		WFRPDrawerPanel: r,
		WFRPMovementHud: i,
		WFRPPortraitPanel: n
	};
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/weapon-sets.ts
function Oa(e) {
	let t = e.ARGON;
	class n extends t.WeaponSets {
		async getDefaultSets() {
			let e = this.actor.itemTypes.weapon.filter((e) => e.isEquipped);
			return {
				1: {
					primary: e[0]?.uuid ?? null,
					secondary: e[1]?.uuid ?? null
				},
				2: {
					primary: null,
					secondary: null
				},
				3: {
					primary: null,
					secondary: null
				}
			};
		}
		async _onDrop(e) {
			e.preventDefault(), e.stopPropagation();
			let t = JSON.parse(e.dataTransfer.getData("text/plain"));
			if (t.type !== "Item") return;
			let n = await fromUuid(t.uuid);
			if (!_a(n) || n.actor !== this.actor) throw Error(`${a} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let r = e.currentTarget.dataset.set, i = e.currentTarget.dataset.slot;
			if (!r || !i) throw Error(`${a} | Argon weapon-set drop target has no set or slot identifier.`);
			let o = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			o[r] ??= {}, o[r][i] = n.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", o), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!$i(this.actor, "switchEquip")) return;
			let n = Ki(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(va).map((e) => ({
					equipped: !!e.isEquipped,
					id: e.id
				}))
			})), String(t));
			n.length && await this.actor.updateEmbeddedDocuments("Item", n);
		}
	}
	return n;
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/register-integration.ts
function ka() {
	s("enhancedcombathud") && u("argonCombatHud") && (xa(), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = ba(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = Da(e), a = Oa(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	}));
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/panels.ts
function Aa(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = ba(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return xr(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/report-bridge-error.ts
function ja(e) {
	return e instanceof Error ? e.message : String(e);
}
function Ma(e, t) {
	D(`${o}: ${e}. ${ja(t)}`, t);
}
function Na(e, t) {
	e.catch((e) => Ma(t, e));
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/register-integration.ts
function Pa() {
	return u("paperDoll") && u("argonCombatHud") && u("paperDollArgonBridge");
}
function Fa(e, t) {
	!Pa() || !I(e) || Sr(t) && Na(Cr(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function Ia() {
	s("fvtt-paper-doll-ui") && s("enhancedcombathud") && Pa() && (Hooks.on("argonInit", (e) => {
		if (!e || typeof e != "object" || !("defineMainPanels" in e) || typeof e.defineMainPanels != "function") throw Error("Argon main panel registration API is unavailable.");
		let { PaperDollQuickItemsPanel: t } = Aa(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", Fa));
}
//#endregion
//#region src/module/foundry/settings/conflicts/register.ts
function La() {
	Hooks.once("setup", () => {
		game?.settings.register(a, at, {
			name: "Settings preset conflict choices",
			hint: "Preferred sources for conflicting settings presets.",
			scope: "world",
			config: !1,
			default: {},
			type: Object
		}), game?.settings.registerMenu(a, "resetPresetConflictChoices", {
			name: "Settings preset conflicts",
			label: "Reset Conflict Choices",
			hint: "Forget preferred sources and review conflicts again the next time presets are checked or applied.",
			icon: "fa-solid fa-code-compare",
			restricted: !0,
			type: class extends foundry.applications.api.ApplicationV2 {
				async render() {
					if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
					return await foundry.applications.api.DialogV2.wait({
						window: { title: "Reset Preset Conflict Choices?" },
						content: "<p>Forget saved conflict choices? Current world settings will remain unchanged.</p>",
						buttons: [{
							action: "reset",
							label: "Reset Choices"
						}, {
							action: "cancel",
							label: "Cancel",
							default: !0
						}],
						rejectClose: !1
					}) === "reset" && await ct.reset(), this;
				}
			}
		});
	});
}
//#endregion
//#region src/module/foundry/settings/presets/register.ts
function Ra() {
	La();
	let e = Ae().filter(T);
	Hooks.once("setup", () => {
		game?.settings.registerMenu(a, "exportSettingsPreset", {
			name: "Settings presets",
			label: "Export Settings Preset",
			hint: "Choose exact world settings to download as namespace JSON.",
			icon: "fa-solid fa-file-export",
			restricted: !0,
			type: class extends foundry.applications.api.ApplicationV2 {
				async render() {
					try {
						await $e();
					} catch (e) {
						j(e);
					}
					return this;
				}
			}
		});
		for (let t of e) {
			let e = A(t);
			game?.settings.register(a, qe(t), {
				name: `Ignore ${e} setup prompts`,
				hint: `Do not prompt when ${e} settings differ from the included preset. Uncheck to resume startup checks for all GMs in this world.`,
				config: game.user?.isGM === !0,
				default: !1,
				scope: "world",
				type: Boolean
			}), game?.settings.registerMenu(a, t.menuKey ?? `configureSettingsPreset-${t.namespace}`, {
				name: `${e} settings preset`,
				label: `Apply ${e} Preset`,
				hint: `Apply only the settings included in Compatibility Box's ${e} preset.`,
				icon: "fa-solid fa-gears",
				restricted: !0,
				type: class extends foundry.applications.api.ApplicationV2 {
					async render() {
						try {
							await Je(t);
						} catch (e) {
							j(e);
						}
						return this;
					}
				}
			});
		}
	}), Hooks.on("updateSetting", (t) => {
		let n = t.key;
		for (let t of e.filter((e) => e.watchSettings?.includes(n))) Ye(t, !0).catch(j);
	}), Hooks.once("ready", async () => {
		for (let t of e) try {
			await Ye(t);
		} catch (e) {
			j(e);
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/repair-mad-prefab-exclusions.ts
var za = /* @__PURE__ */ new WeakSet();
function Ba(e) {
	if (za.has(e)) return !1;
	let t = e.Initialise, n = /* @__PURE__ */ new Set();
	return e.Initialise = function(e, ...r) {
		let i = e?.moduleName, o = i ? game?.modules.get(i) : void 0, s = e?.ignoredCompendiumPacks;
		if (!i?.startsWith("mad-") || !o?.active || !o.packs) return t.call(this, e, ...r);
		let c = `${i}-prefabs`;
		return !Array.isArray(s) || !s.includes(c) || Array.from(o.packs).some((e) => e.name === c) ? t.call(this, e, ...r) : (n.has(i) || (n.add(i), console.warn(`${a} | ${i}: skipped unavailable Scene Packer exclusion ${c}.`)), t.call(this, {
			...e,
			ignoredCompendiumPacks: s.filter((e) => e !== c)
		}, ...r));
	}, za.add(e), !0;
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/register-integration.ts
function Va() {
	s("scene-packer") && game?.system.id === "wfrp4e" && typeof ScenePacker < "u" && Ba(ScenePacker);
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/repair-forge-owner-detection.ts
var Ha = /* @__PURE__ */ new WeakSet();
function Ua(e, t) {
	if (Ha.has(e)) return !1;
	let n = e._detectForgeAccountId;
	return e._detectForgeAccountId = async function() {
		let e = t();
		return this.isRunningOnForge() && typeof e == "string" && /^[a-zA-Z0-9_-]+$/.test(e) && e !== "bazaar" ? (this.forgeAccountId = e, !0) : n.call(this);
	}, Ha.add(e), !0;
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/register-integration.ts
async function Wa() {
	if (!s("fa-nexus") || game?.system.id !== "wfrp4e" || typeof ForgeAPI > "u") return;
	let e = Array.from(document.querySelectorAll("script[type=\"module\"][src]")).find((e) => {
		let t = new URL(e.src).pathname;
		return /\/modules\/fa-nexus\/(?:[^/]+\/)?scripts\/core\/forge-integration\.js$/.test(t);
	});
	if (!e) {
		console.warn(`${a} | FA Nexus Forge integration script was not found; patch skipped.`);
		return;
	}
	try {
		let t = (await import(
			/* @vite-ignore */
			e.src
)).forgeIntegration;
		if (typeof t?._detectForgeAccountId != "function" || typeof t.isRunningOnForge != "function") throw Error("FA Nexus Forge integration API is unavailable.");
		Ua(t, () => ForgeAPI.lastStatus?.ownerUserId);
	} catch (e) {
		console.error(`${a} | Could not install FA Nexus Forge compatibility.`, e);
	}
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-data-model-migrations.ts
var Ga = /* @__PURE__ */ new WeakSet();
function Ka(e) {
	let t = e.migrateData;
	return typeof t != "function" || Ga.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, Ga.add(e), !0);
}
function qa() {
	return [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(Ka(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-roll-modes.ts
function Ja() {
	let e = game?.wfrp4e?.config, t = CONFIG.ChatMessage.modes;
	return !e || !t ? !1 : (e.rollModes = foundry.utils.deepClone(t), !0);
}
//#endregion
//#region src/module/functions/patches/wfrp4e/chat-card-references.ts
function X(e) {
	return typeof e == "object" && e ? e : {};
}
function Z(e) {
	return typeof e == "string" ? e : "";
}
function Ya(e) {
	let t = X(e);
	return {
		kind: "speaker",
		actor: Z(t.actor),
		scene: Z(t.scene),
		token: Z(t.token)
	};
}
function Xa(e) {
	return Ya(X(X(e).context).speaker);
}
function Za(e) {
	let t = e.system ?? {};
	switch (e.type) {
		case "test": return [Xa(t.testData)];
		case "opposed": {
			let e = X(t.opposedTestData);
			return [Xa(e.attackerTestData), Xa(e.defenderTestData)];
		}
		case "magic": {
			let e = X(t.sourceData), n = [{
				kind: "uuid",
				uuid: Z(e.actor)
			}];
			return e.test && n.push({
				kind: "message",
				id: Z(e.test),
				required: !1
			}), n;
		}
		case "handler": {
			let e = X(t.opposedData), n = [{
				kind: "message",
				id: Z(e.attackerMessageId),
				required: !0
			}];
			return e.targetSpeakerData && n.push(Ya(e.targetSpeakerData)), e.defenderMessageId && n.push({
				kind: "message",
				id: Z(e.defenderMessageId),
				required: !0
			}), n;
		}
		default: return [];
	}
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/chat-card-text.ts
function Qa(e) {
	let t = new DOMParser().parseFromString(e, "text/html").body;
	for (let e of t.querySelectorAll("script, style, template, button, input, select, textarea, .chat-button, a[data-action], [role='button'], .dice-tooltip, .applied-breakdown, .secret:not(.revealed), [hidden], [aria-hidden='true']")) e.remove();
	for (let e of t.querySelectorAll("img")) e.replaceWith(t.ownerDocument.createTextNode(e.alt ? ` ${e.alt} ` : ""));
	for (let e of t.querySelectorAll("br, p, div, li, tr, h1, h2, h3, h4, h5, h6")) e.append(t.ownerDocument.createTextNode("\n"));
	for (let e of t.querySelectorAll("td, th")) e.append(t.ownerDocument.createTextNode(" "));
	return (t.textContent ?? "").split("\n").map((e) => e.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}
function $a(e) {
	let t = document.createElement("p");
	return t.textContent = e, t.style.whiteSpace = "pre-line", t;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/render-orphaned-chat-cards.ts
var eo = /* @__PURE__ */ new WeakSet();
function to(e) {
	if (!game) return !1;
	switch (e.kind) {
		case "speaker": return e.scene && e.token ? !!game.scenes.get(e.scene)?.tokens.get(e.token)?.actor : !!(e.actor && game.actors.get(e.actor));
		case "uuid": return !!(e.uuid && fromUuidSync(e.uuid)?.documentName === "Actor");
		case "message": {
			let t = game.messages.get(e.id);
			return t ? t._source.type === "test" ? Za(t._source).every(to) : !1 : !e.required;
		}
	}
}
async function no(e, t) {
	let n = e.toObject(), r = e.visible && e.isContentVisible, i = r ? Qa(n.content) : "", a = new foundry.documents.ChatMessage({
		...n,
		type: "base",
		system: {},
		flags: {},
		content: $a(i).outerHTML
	}), o = await a.renderHTML(t), s = o.querySelector(".message-content");
	if (s) {
		let e = r && a.isContentVisible ? i : Qa(s.innerHTML);
		s.replaceChildren($a(e));
	}
	return o.addEventListener("contextmenu", (e) => e.stopPropagation(), { capture: !0 }), o;
}
function ro() {
	let e = CONFIG.ChatMessage.documentClass?.prototype;
	if (!e || eo.has(e)) return !1;
	let t = e.renderHTML;
	return e.renderHTML = function(e) {
		return Za(this._source).some((e) => !to(e)) ? no(this, e) : t.call(this, e);
	}, eo.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/active-effect-schema.ts
function io(e) {
	let t = e.schema;
	if (t.fields.changes) return !1;
	let n = e.defineSchema;
	return e.defineSchema = function() {
		let e = n.call(this);
		return e.changes ||= foundry.data.ActiveEffectTypeDataModel.defineSchema().changes, e;
	}, t.extendFields({ changes: foundry.data.ActiveEffectTypeDataModel.defineSchema().changes }), !0;
}
function ao() {
	return Object.values(CONFIG.ActiveEffect?.dataModels ?? {}).reduce((e, t) => e + Number(io(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/guard-actorless-token-ruler.ts
var oo = /* @__PURE__ */ new WeakSet(), so = /* @__PURE__ */ new WeakSet();
function co() {
	let e = CONFIG.Token?.rulerClass?.prototype, t = foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	if (!e || !t || e === t || !Object.prototype.isPrototypeOf.call(t, e) || typeof e._getSegmentStyle != "function" || typeof t._getSegmentStyle != "function" || oo.has(e)) return !1;
	let n = e._getSegmentStyle, r = t._getSegmentStyle;
	return e._getSegmentStyle = function(...e) {
		if (this.token.actor) return n.apply(this, e);
		if (!so.has(this.token)) {
			so.add(this.token);
			let { uuid: e, actorId: t, actorLink: n } = this.token.document;
			console.warn("WFRP4e Compatibility Box | Token has no actor; using the core ruler style.", {
				tokenUuid: e,
				actorId: t,
				actorLink: n,
				worldActorExists: !!(t && game?.actors.get(t))
			});
		}
		return r.apply(this, e);
	}, oo.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/apply-compatibility-patches.ts
function lo() {
	game?.system.id === "wfrp4e" && (Ja(), qa(), ao(), ro(), co());
}
//#endregion
//#region src/module/wfrp/folders/hooks.ts
var uo, Q = !1, fo = !1;
function $() {
	if (!(!game?.ready || !game.user?.isActiveGM)) {
		if (Q) {
			fo = !0;
			return;
		}
		clearTimeout(uo), uo = setTimeout(() => {
			po();
		}, 1e3);
	}
}
async function po() {
	if (!(!game?.ready || !game.user?.isActiveGM || Q)) {
		Q = !0, fo = !1;
		try {
			await Ur();
		} catch (e) {
			console.error(`${o}: WFRP folder cleanup failed.`, e), ui?.notifications?.error(`${o}: WFRP cleanup failed and may be incomplete. See the console for details.`, {
				console: !1,
				permanent: !0
			});
		} finally {
			Q = !1, fo && $();
		}
	}
}
function mo() {
	for (let e of [
		"Folder",
		"Actor",
		"Item",
		"JournalEntry",
		"Scene",
		"RollTable",
		"Macro",
		"Cards",
		"Playlist"
	]) for (let t of [
		"create",
		"update",
		"delete"
	]) Hooks.on(`${t}${e}`, (e) => {
		let t = e;
		!t.pack && !t.parent && $();
	});
	Hooks.on("updateSetting", (e) => {
		let t = e;
		(t.key === "core.compendiumConfiguration" || t.key?.startsWith("wfrp4e-compatibility-box.keepWfrp")) && $();
	}), Hooks.on("updateUser", $), Hooks.on("userConnected", $), Hooks.once("ready", $);
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function ho() {
	Hooks.once("setup", () => Ir($)), mo(), Hooks.once("canvasInit", re), Hooks.once("ready", re), Hooks.once("init", () => {
		lo(), Xi(), Va(), Wa(), Qr(), Ti(), ka(), fr(), Ia(), Ra();
	});
}
//#endregion
//#region src/module/init/index.ts
ho();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map