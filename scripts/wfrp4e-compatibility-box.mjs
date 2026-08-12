//#region src/types/patches/paper-doll/Equipment.ts
var e = [
	"HEAD",
	"BODY",
	"GLOVES",
	"BOOTS"
], t = ["MAIN_LEFT", "MAIN_RIGHT"], n = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
], r = {
	BODY: ["body"],
	BOOTS: ["lLeg", "rLeg"],
	GLOVES: ["lArm", "rArm"],
	HEAD: ["head"]
};
function i(e, t) {
	return t.coverage - e.coverage || t.points - e.points || e.item.name.localeCompare(t.item.name) || e.item.id.localeCompare(t.item.id);
}
function a(e, t) {
	return Math.max(...r[t].map((t) => e.armourPoints[t]));
}
function o(e, t) {
	return r[t].filter((t) => e.armourPoints[t] > 0).length;
}
function s(e, t, n) {
	return a(n.item, e) - a(t.item, e) || o(n.item, e) - o(t.item, e) || i(t, n);
}
function c(e) {
	return e.type === "armour" && e.equipped;
}
function l(e) {
	let t = e.armourPoints, r = n.filter((e) => t[e] > 0);
	return {
		coverage: r.length,
		item: e,
		points: r.reduce((e, n) => e + t[n], 0)
	};
}
function u(t) {
	let n = t.filter(c).map(l);
	return e.flatMap((e) => {
		let t = n.filter((t) => a(t.item, e) > 0).sort((t, n) => s(e, t, n))[0];
		return t ? [{
			slotId: e,
			uuid: t.item.uuid
		}] : [];
	});
}
function ee(e, t) {
	return e.twoHanded ? "both" : e.offhand ? t === "l" ? "r" : "l" : t;
}
function te(e, t) {
	return Number(t.twoHanded) - Number(e.twoHanded) || e.name.localeCompare(t.name) || e.id.localeCompare(t.id);
}
function ne(e, n) {
	let r = e.filter((e) => e.type === "weapon" && e.equipped).sort(te);
	return t.flatMap((e) => {
		let t = e === "MAIN_LEFT" ? "l" : "r", i = r.find((e) => {
			let r = ee(e, n);
			return r === "both" || r === t;
		});
		return i ? [{
			slotId: e,
			uuid: i.uuid
		}] : [];
	});
}
function re(e, t) {
	return [...u(e), ...ne(e, t)];
}
//#endregion
//#region src/functions/patches/paper-doll/derive-paper-doll-slot-state.ts
function ie(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function ae(n, r, i, a) {
	let o = ie(n), s = new Map(r.map((e) => [e.slotId, e.uuid]));
	for (let n of [...e, ...t]) {
		if (!a.has(n)) continue;
		let e = o[n]?.["0"] ?? null, t = s.get(n) ?? null;
		t ? (o[n] ??= {}, o[n][0] = t) : e && i.has(e) && (o[n] ??= {}, o[n][0] = null);
	}
	return o;
}
function oe(e, t, n) {
	let r = new Map(t.map((e) => [e.uuid, e])), i = ie(e);
	for (let e of Object.values(i)) for (let [t, i] of Object.entries(e)) !i || n.has(i) || r.get(i)?.equipped === !1 && (e[t] = null);
	return i;
}
function se(e, t, n, r, i) {
	return oe(ae(e, t, n, r), i, n);
}
function ce(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/functions/patches/paper-doll/is-paper-doll-slot-state.ts
function le(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ue(e) {
	return /^(0|[1-9]\d*)$/.test(e);
}
function de(e) {
	return e == null || typeof e == "string" && e.length > 0;
}
function d(e) {
	return le(e) && Object.entries(e).every(([e, t]) => e.length > 0 && le(t) && Object.entries(t).every(([e, t]) => ue(e) && de(t)));
}
//#endregion
//#region src/module/integrations/is-module-active.ts
function f(e) {
	return game?.modules.get(e)?.active === !0;
}
//#endregion
//#region src/module/constants.ts
var p = "wfrp4e-compatibility-box", fe = "WFRP4e Compatibility Box", m = {
	argonCombatHud: {
		settingKey: "argonCombatHudEnabled",
		targetModuleId: "enhancedcombathud"
	},
	paperDoll: {
		settingKey: "paperDollEnabled",
		targetModuleId: "fvtt-paper-doll-ui"
	}
};
//#endregion
//#region src/module/settings/is-optional-feature-enabled.ts
function h(e) {
	let t = m[e];
	return f(t.targetModuleId) && game?.settings.get("wfrp4e-compatibility-box", t.settingKey) !== !1;
}
//#endregion
//#region src/functions/patches/paper-doll/equipment-update.ts
function pe(e) {
	return e.slotId === "MAIN_LEFT" ? "l" : e.slotId === "MAIN_RIGHT" ? "r" : null;
}
function me(e, t, n, r) {
	if (t === null) return {};
	let i = {};
	if (t || (i["system.equipped.value"] = !0), e?.type !== "weapon") return i;
	if (!r) throw Error(`Weapon ${e.uuid} requires the actor's main hand.`);
	let a = pe(n), o = e.twoHanded ? !1 : a ? a !== r : void 0;
	return o !== void 0 && e.offhand !== o && (i["system.offhand.value"] = o), i;
}
function he(e) {
	return e === !0 ? { "system.equipped.value": !1 } : {};
}
//#endregion
//#region src/functions/patches/paper-doll/is-item-allowed-in-slot.ts
function ge(e, t) {
	switch (t) {
		case "HEAD": return e.armourPoints.head > 0;
		case "BODY": return e.armourPoints.body > 0;
		case "GLOVES": return e.armourPoints.lArm > 0 || e.armourPoints.rArm > 0;
		case "BOOTS": return e.armourPoints.lLeg > 0 || e.armourPoints.rLeg > 0;
		default: return !1;
	}
}
function _e(e, t, n) {
	return n === "MAIN_LEFT" || n === "MAIN_RIGHT" ? t?.type === "weapon" : n === "HEAD" || n === "BODY" || n === "GLOVES" || n === "BOOTS" ? t?.type === "armour" && ge(t, n) : e !== "weapon" && e !== "armour";
}
//#endregion
//#region src/module/patches/paper-doll/wfrp-runtime-types.ts
function g(e) {
	return typeof e == "object" && !!e;
}
function _(e) {
	return g(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function v(e) {
	return g(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
//#endregion
//#region src/module/patches/paper-doll/wfrp-equipment.ts
var ve = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function ye(e) {
	if (!g(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function be(e, t) {
	let n = ye(e)[t];
	if (n === void 0) return null;
	if (!g(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function y(e, t) {
	let n = be(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function b(e) {
	return be(e, "equipped");
}
function xe(e) {
	return b(e) !== null;
}
function Se(e) {
	let t = ye(e).AP;
	if (!g(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(ve.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function x(e) {
	if (!g(e.system) || !g(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function S(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: y(e, "equipped"),
		id: e.id,
		name: e.name,
		uuid: e.uuid
	};
	return e.type === "armour" ? {
		...t,
		armourPoints: Se(e),
		type: "armour"
	} : {
		...t,
		offhand: y(e, "offhand"),
		twoHanded: y(e, "twohanded"),
		type: "weapon"
	};
}
function C(e, t) {
	return _e(e.type, S(e), t);
}
async function w(e, t, n) {
	let r = S(t), i = me(r, r?.equipped ?? b(t), n, r?.type === "weapon" ? x(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function Ce(e) {
	let t = he(S(e)?.equipped ?? b(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/patches/paper-doll/report-paper-doll-error.ts
function we(e) {
	return e instanceof Error ? e.message : String(e);
}
function T(e, t) {
	let n = `${fe}: ${e}. ${we(t)}`;
	console.error(n, t), globalThis.ui?.notifications?.error(n);
}
function E(e, t) {
	e.catch((e) => T(t, e));
}
//#endregion
//#region src/module/patches/paper-doll/synchronize-paper-doll.ts
var D = "fvtt-paper-doll-ui", O = "slots", k = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Set();
function Te(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Ee(e) {
	let t = e.getFlag(D, O);
	if (t === void 0) return {};
	if (!d(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Te(t);
}
function De() {
	let n = game?.settings.get(D, "globalConfig"), r = new Set([...e, ...t]);
	if (g(n) && Object.keys(n).length === 0) return r;
	if (!g(n) || !g(n.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let i = Object.values(n.SLOTS);
	if (!i.every(g)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let a = new Set(i.flatMap((e) => Object.keys(e)));
	return a.size ? a : r;
}
function Oe(e) {
	return k.has(e.uuid);
}
function ke(e) {
	if (!_(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function Ae() {
	if (!game || game.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function je(e) {
	let t = Ee(e), n = Array.from(e.items), r = n.map(S).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: b(e),
		uuid: e.uuid
	})), o = se(t, re(r, x(e)), i, De(), a);
	return ce(t, o) ? "unchanged" : (await e.setFlag(D, O, o), "synchronized");
}
async function j(e) {
	ke(e), Ae();
	let t = e;
	if (game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !h("paperDoll")) return "unavailable";
	let n = k.get(t.uuid);
	if (n) return await n, j(t);
	let r = je(t).finally(() => {
		k.get(t.uuid) === r && k.delete(t.uuid);
	});
	return k.set(t.uuid, r), r;
}
function Me(e) {
	A.has(e.uuid) || (A.add(e.uuid), queueMicrotask(() => {
		A.delete(e.uuid), E(j(e), `could not synchronize equipped items for ${e.uuid}`);
	}));
}
async function M() {
	return Ae(), Promise.all(Array.from(game.actors, (e) => j(e)));
}
//#endregion
//#region src/module/settings/get-optional-feature-statuses.ts
function Ne() {
	return Object.entries(m).map(([e, t]) => ({
		available: f(t.targetModuleId),
		enabled: h(e),
		id: e,
		targetModuleId: t.targetModuleId
	}));
}
//#endregion
//#region src/module/api/create-module-api.ts
function Pe() {
	return {
		getOptionalFeatures: Ne,
		syncAllPaperDollActors: M,
		syncPaperDollActor: j
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function Fe() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(p);
	if (!e) throw Error(`Foundry module registry entry was not found for ${p}.`);
	e.api = Pe();
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/argon-logic.ts
var Ie = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function N(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function Le(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function Re(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function P(e) {
	return e.trim().toLowerCase();
}
function ze(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function F(e) {
	return e.type === "trait" ? (Re(e), e.rollable && !e.disabled && Ie.has(e.traitBaseName.toLowerCase())) : !1;
}
function Be(e) {
	return e.type === "weapon" || F(e);
}
function Ve(e) {
	return e.type === "weapon";
}
function He(e) {
	return N(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function Ue(e) {
	return N(e), e.advances > 0;
}
function We(e, t) {
	return e.forEach(N), t === "basic" ? e.filter((e) => !He(e)).map((e) => e.id) : t === "advanced" ? e.filter(He).map((e) => e.id) : t === "trained" ? e.filter(Ue).map((e) => e.id) : e.map((e) => e.id);
}
function Ge(e, t) {
	return e.forEach(Le), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function Ke(e) {
	return e.filter((e) => e.type === "weapon" || F(e)).map((e) => e.id);
}
function qe(e) {
	return e.filter((e) => e.type === "trait" ? (Re(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function Je(e, t) {
	return e.forEach(N), t.flatMap((t) => {
		let n = P(t.name), r = e.find((e) => P(e.name) === n);
		return !r || t.trained && !Ue(r) ? [] : [r.id];
	});
}
function Ye(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function Xe(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function Ze(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => Xe(e.name, t))).map((e) => e.id) : [];
}
function Qe(e) {
	let t = [];
	return (e.type === "weapon" || F(e)) && t.push({
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
function $e(e, t) {
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
//#region src/module/settings/register-module-settings.ts
var et = "argonCombatItemPatterns", tt = "*Draught*, *Potion*";
function nt(e, t) {
	let n = m[t];
	f(n.targetModuleId) && e.register(p, n.settingKey, {
		config: !0,
		default: !0,
		hint: `${p}.Settings.Features.${t}.Hint`,
		name: `${p}.Settings.Features.${t}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function rt(e) {
	f(m.argonCombatHud.targetModuleId) && e.register(p, et, {
		config: !0,
		default: tt,
		hint: `${p}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${p}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: () => ui?.ARGON?.refresh?.(),
		scope: "world",
		type: String
	});
}
function it() {
	if (!game) throw Error(`${p} | Foundry game is unavailable during settings registration.`);
	nt(game.settings, "argonCombatHud"), nt(game.settings, "paperDoll"), rt(game.settings);
}
var at = "enhancedcombathud-wfrp4e", ot = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", I = "modules/enhancedcombathud/icons", st = [
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
], ct = [{
	key: "ws",
	icon: `${I}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${I}/bolt-spell-cast.webp`
}], lt = [
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
//#region src/module/integrations/enhancedcombathud/argon-helpers.ts
function ut(e, t) {
	if (typeof e != "object" || !e) throw Error(`${p} | ${t} must be an object.`);
	return e;
}
function L(e, t) {
	if (typeof e != "string" || !e.trim()) throw Error(`${p} | ${t} must be a non-empty string.`);
	return e;
}
function R(e, t) {
	if (typeof e != "boolean") throw Error(`${p} | ${t} must be a boolean.`);
	return e;
}
function z(e, t) {
	if (!Number.isNumeric(e)) throw Error(`${p} | ${t} must be numeric.`);
	return Number(e);
}
function dt(e) {
	return e == null || e === "" ? null : z(e, "item quantity");
}
function B(e, t, n, r) {
	let i = e.getFlag(at, t);
	if (i === void 0) return r;
	if (!n.includes(i)) throw Error(`${p} | Argon actor flag ${at}.${t} has invalid value ${String(i)}.`);
	return i;
}
function V(e) {
	let t = ut(e, "Argon item"), n = L(t.type, "Argon item type"), r = L(t.name, `${n} item name`), i = L(t.id, `${n} ${r} id`), a = t.quantity?.value ?? t.system?.quantity?.value, o = {
		castingNumber: t.cn?.value,
		damage: t.DamageString,
		duration: t.Duration,
		id: i,
		name: r,
		quantity: dt(a),
		range: n === "weapon" || n === "trait" ? R(t.isRanged, `${n} ${r} ranged state`) ? t.Range : void 0 : t.Range,
		reach: t.Reach,
		target: t.Target,
		total: t.total?.value,
		type: n
	};
	return n === "skill" && (o.advanced = L(t.advanced?.value, `${r} advanced classification`), o.grouped = L(t.grouped?.value, `${r} grouped classification`), o.advances = z(t.advances?.value ?? t.system?.advances?.value, `${r} advances`)), n === "spell" && (o.lore = L(t.lore?.value, `${r} lore`), o.memorized = R(t.memorized?.value, `${r} memorized state`)), n === "trait" && (o.disabled = R(t.system?.disabled, `${r} disabled state`), o.rollable = R(t.rollable?.value, `${r} rollable state`), o.traitBaseName = ze(r)), o;
}
function H(e) {
	return [...e].map(V);
}
function U(e, t) {
	let n = new Map([...e].map((e) => [e.id, e]));
	return t.map((e) => {
		let t = n.get(e);
		if (!t) throw Error(`${p} | Selected Argon item ${e} is no longer available.`);
		return t;
	});
}
function ft(e) {
	return Qe(V(e));
}
function pt(e) {
	let t = B(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return U(n, We(H(n), t));
}
function mt(e) {
	let t = B(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return U(n, Ge(H(n), t));
}
function ht(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return U(t, Ke(H(t)));
}
function gt(e) {
	let t = [...e.itemTypes.trait];
	return U(t, qe(H(t)));
}
function _t(e) {
	let t = ct.map((e) => ({
		...e,
		type: "characteristic"
	})), n = lt.map((e) => ({
		name: vt(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = U(r, Je(H(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function vt({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = Ct(`NAME.${e}`, t);
	return n ? `${i} (${Ct(n, r)})` : i;
}
function yt(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = Ye(String(t)), r = [...e.items];
	return U(r, Ze(H(r), n));
}
function bt(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function xt(e) {
	return Be(V(e));
}
function St(e) {
	return Ve(V(e));
}
function Ct(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/integrations/enhancedcombathud/buttons.ts
function wt(e) {
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
				details: ft(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = bt(this.item);
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
			let e = mt(this.actor), t = ht(this.actor), s = gt(this.actor), c = _t(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = yt(this.actor), u = [
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
			], ee = [
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
			for (let [e, t, n] of ee) n.length && u.push(new o({
				id: e,
				label: t,
				items: n
			}));
			return c.length && u.push(new o({
				id: "combat-skills",
				label: "wfrp4e-compatibility-box.Argon.Group.Skills",
				buttons: c,
				icon: `${I}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${I}/drink-me.webp`,
				buttonClass: r
			})), u;
		}
	}
	return { WFRPActionPanel: s };
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/movement.ts
function W(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function Tt(e, t, n) {
	W(e, "move score"), W(t, "maximum distance"), W(n, "used distance");
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
function G(e) {
	return W(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/panels.ts
function K(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function Et(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function Dt(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return ot;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
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
			let e = st.map((e) => {
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
			}), n = pt(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return K(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return K(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return Et(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += K(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = Tt(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${G(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${G(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: G(t.bubbleDistance),
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
//#region src/module/integrations/enhancedcombathud/weapon-sets.ts
function Ot(e) {
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
			if (!xt(n) || n.actor !== this.actor) throw Error(`${p} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let r = e.currentTarget.dataset.set, i = e.currentTarget.dataset.slot;
			if (!r || !i) throw Error(`${p} | Argon weapon-set drop target has no set or slot identifier.`);
			let a = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			a[r] ??= {}, a[r][i] = n.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", a), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!this.actor.getFlag("enhancedcombathud-wfrp4e", "switchEquip")) return;
			let n = $e(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(St).map((e) => ({
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
//#region src/module/integrations/enhancedcombathud/register-integration.ts
function kt() {
	f("enhancedcombathud") && h("argonCombatHud") && Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = wt(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = Dt(e), a = Ot(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	});
}
//#endregion
//#region src/functions/patches/paper-doll/find-slot-changes.ts
function At(e, t, n) {
	return e[t]?.[n] ?? null;
}
function jt(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = At(e, i, a), o = At(t, i, a);
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
//#region src/module/patches/paper-doll/enforce-paper-doll-equipped-state.ts
var Mt = Symbol.for("paper-doll-wfrp4e.equipped-state");
function Nt() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function Pt(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function Ft(e) {
	if (!g(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function It() {
	return Promise.resolve();
}
function Lt() {
	let e = Nt(), t = e?.equip, n = globalThis.fromUuid;
	if (Pt(e, t, n), e[Mt] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!v(a)) return r.call(this, e, t, i);
		let o = Ft(i);
		if (!t) return It();
		if (!_(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!C(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await w(this.actor, a, o);
		} catch (e) {
			T(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await j(this.actor);
			} catch (e) {
				T(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[Mt] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/enforce-paper-doll-slot-types.ts
var Rt = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function zt() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function Bt(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function Vt() {
	let e = zt(), t = e?.filterItems;
	if (Bt(e, t), e[Rt] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => v(e) && C(e, t));
	}, e[Rt] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/register-slot-tooltips.ts
var Ht = ".paper-doll .paper-doll-slot", q = `data-${p}-drag-tooltip`, J = `data-${p}-tooltip`, Y = `data-${p}-original-tooltip`, Ut = {
	HEAD: {
		key: `${p}.SlotTooltip.Head`,
		fallback: "Head armour"
	},
	CAPE: {
		key: `${p}.SlotTooltip.Cape`,
		fallback: "Aesthetic Item"
	},
	BODY: {
		key: `${p}.SlotTooltip.Body`,
		fallback: "Body armour"
	},
	GLOVES: {
		key: `${p}.SlotTooltip.Gloves`,
		fallback: "Arm armour"
	},
	BOOTS: {
		key: `${p}.SlotTooltip.Boots`,
		fallback: "Leg armour"
	},
	TRINKET: {
		key: `${p}.SlotTooltip.Trinket`,
		fallback: "Ready Item"
	},
	PENDANT: {
		key: `${p}.SlotTooltip.Pendant`,
		fallback: "Amulet"
	},
	RING: {
		key: `${p}.SlotTooltip.Ring`,
		fallback: "Worn Item"
	},
	WRIST_LEFT: {
		key: `${p}.SlotTooltip.WristLeft`,
		fallback: "Light Source"
	},
	WRIST_RIGHT: {
		key: `${p}.SlotTooltip.WristRight`,
		fallback: "Quick Use Item"
	},
	MAIN_LEFT: {
		key: `${p}.SlotTooltip.MainLeft`,
		fallback: "Main hand"
	},
	MAIN_RIGHT: {
		key: `${p}.SlotTooltip.MainRight`,
		fallback: "Off hand"
	}
}, X = !1;
function Wt(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(Ht);
	return t?.closest(".paper-doll") ? t : null;
}
function Gt() {
	document.querySelectorAll(`[${J}]`).forEach((e) => {
		let t = e.getAttribute(Y);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(J), e.removeAttribute(Y);
	});
}
function Kt() {
	document.querySelectorAll(Ht).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(q, t), e.removeAttribute("data-tooltip"));
	});
}
function qt() {
	document.querySelectorAll(`[${q}]`).forEach((e) => {
		let t = e.getAttribute(q);
		t && (e.dataset.tooltip = t), e.removeAttribute(q);
	});
}
function Jt(e) {
	if (X || e.hasAttribute(J)) return;
	let t = Ut[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(Y, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(J, "");
}
function Yt(e) {
	let t = Wt(e.target);
	t && Jt(t);
}
function Xt() {
	X = !0, Gt(), Kt();
}
function Zt() {
	X = !1, qt();
}
function Qt() {
	document.addEventListener("pointerover", Yt, !0), document.addEventListener("dragstart", Xt, !0), document.addEventListener("dragend", Zt, !0);
}
//#endregion
//#region src/module/patches/paper-doll/register-paper-doll-hooks.ts
var Z = /* @__PURE__ */ new Map();
function Q() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && h("paperDoll");
}
function $t(e) {
	if (!g(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!g(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[D];
	return g(n) ? "slots" in n ? d(n.slots) ? {
		kind: "valid",
		state: n[O]
	} : {
		kind: "malformed",
		reason: "the Paper Doll slots update has an invalid shape"
	} : { kind: "absent" } : {
		kind: "malformed",
		reason: "the Paper Doll flag update is not an object"
	};
}
function en(e) {
	let t = $t(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function $(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function tn(e, t) {
	let n = Z.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), Z.set(e.uuid, n);
}
function nn(e) {
	if (!g(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function rn(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (T(n, AggregateError(r, n)), await j(e));
}
function an(e, t, n) {
	if (!Q() || !_(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!g(i) || typeof i.item != "string") continue;
		let t = nn(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = $(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!C(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(w(e, n, t));
	}
	r.length && E(rn(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function on(e, t) {
	if (!Q() || !_(e) || Oe(e)) return;
	let n = en(t);
	if (!n) return;
	let r = e.getFlag(D, O);
	if (r !== void 0) {
		if (!d(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of jt(r, n)) {
			if (!t.from) continue;
			let n = $(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && tn(e, n.uuid);
		}
	}
}
function sn(e, t) {
	if (!Q() || !_(e) || !en(t)) return;
	let n = Z.get(e.uuid);
	Z.delete(e.uuid), n?.size && E(rn(e, Array.from(n, (t) => {
		let n = $(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(Ce), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function cn(e) {
	!Q() || !v(e) || e.type !== "armour" && e.type !== "weapon" && !xe(e) || _(e.parent) && Me(e.parent);
}
function ln() {
	Qt(), Hooks.on("paper-doll-swap", an), Hooks.on("preUpdateActor", on), Hooks.on("updateActor", sn), Hooks.on("updateItem", cn), Hooks.once("ready", () => {
		if (Q()) {
			try {
				Vt(), Lt();
			} catch (e) {
				throw T("could not initialize the required Paper Doll integration", e), e;
			}
			E(M(), "could not synchronize all equipped items at startup");
		}
	});
}
function un() {
	f("fvtt-paper-doll-ui") && h("paperDoll") && ln();
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function dn() {
	Hooks.once("init", () => {
		it(), Fe(), kt(), un();
	});
}
//#endregion
//#region src/main.ts
dn();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map