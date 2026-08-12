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
//#region src/module/constants.ts
var f = "wfrp4e-compatibility-box", fe = "WFRP4e Compatibility Box";
//#endregion
//#region src/module/integrations/is-module-active.ts
function p(e) {
	return game?.modules.get(e)?.active === !0;
}
//#endregion
//#region src/module/settings/optional-features.ts
var m = {
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
function h(e) {
	return m[e].targetModuleIds.every((e) => p(e));
}
//#endregion
//#region src/module/settings/is-optional-feature-enabled.ts
function g(e) {
	let t = m[e];
	return h(e) && game?.settings.get("wfrp4e-compatibility-box", t.settingKey) !== !1;
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
function _(e) {
	return typeof e == "object" && !!e;
}
function v(e) {
	return _(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function y(e) {
	return _(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
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
	if (!_(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function be(e, t) {
	let n = ye(e)[t];
	if (n === void 0) return null;
	if (!_(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function b(e, t) {
	let n = be(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function x(e) {
	return be(e, "equipped");
}
function xe(e) {
	return x(e) !== null;
}
function Se(e) {
	let t = ye(e).AP;
	if (!_(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(ve.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function S(e) {
	if (!_(e.system) || !_(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function C(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: b(e, "equipped"),
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
		offhand: b(e, "offhand"),
		twoHanded: b(e, "twohanded"),
		type: "weapon"
	};
}
function w(e, t) {
	return _e(e.type, C(e), t);
}
async function Ce(e, t, n) {
	let r = C(t), i = me(r, r?.equipped ?? x(t), n, r?.type === "weapon" ? S(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function we(e) {
	let t = he(C(e)?.equipped ?? x(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/patches/paper-doll/report-paper-doll-error.ts
function Te(e) {
	return e instanceof Error ? e.message : String(e);
}
function T(e, t) {
	let n = `${fe}: ${e}. ${Te(t)}`;
	console.error(n, t), globalThis.ui?.notifications?.error(n);
}
function E(e, t) {
	e.catch((e) => T(t, e));
}
//#endregion
//#region src/module/patches/paper-doll/synchronize-paper-doll.ts
var D = "fvtt-paper-doll-ui", O = "slots", k = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Set();
function Ee(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function De(e) {
	let t = e.getFlag(D, O);
	if (t === void 0) return {};
	if (!d(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Ee(t);
}
function Oe() {
	let n = game?.settings.get(D, "globalConfig"), r = new Set([...e, ...t]);
	if (_(n) && Object.keys(n).length === 0) return r;
	if (!_(n) || !_(n.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let i = Object.values(n.SLOTS);
	if (!i.every(_)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let a = new Set(i.flatMap((e) => Object.keys(e)));
	return a.size ? a : r;
}
function ke(e) {
	return k.has(e.uuid);
}
function Ae(e) {
	if (!v(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function je() {
	if (!game || game.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function Me(e) {
	let t = De(e), n = Array.from(e.items), r = n.map(C).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: x(e),
		uuid: e.uuid
	})), o = se(t, re(r, S(e)), i, Oe(), a);
	return ce(t, o) ? "unchanged" : (await e.setFlag(D, O, o), "synchronized");
}
async function j(e) {
	Ae(e), je();
	let t = e;
	if (game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !g("paperDoll")) return "unavailable";
	let n = k.get(t.uuid);
	if (n) return await n, j(t);
	let r = Me(t).finally(() => {
		k.get(t.uuid) === r && k.delete(t.uuid);
	});
	return k.set(t.uuid, r), r;
}
function Ne(e) {
	A.has(e.uuid) || (A.add(e.uuid), queueMicrotask(() => {
		A.delete(e.uuid), E(j(e), `could not synchronize equipped items for ${e.uuid}`);
	}));
}
async function Pe() {
	return je(), Promise.all(Array.from(game.actors, (e) => j(e)));
}
//#endregion
//#region src/module/settings/get-optional-feature-statuses.ts
function Fe() {
	return Object.entries(m).map(([e, t]) => ({
		available: h(e),
		enabled: g(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
//#endregion
//#region src/functions/integrations/paper-doll-argon/bridge.ts
var Ie = ["TRINKET", "WRIST_RIGHT"];
function Le(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function Re(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Ie) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(Le)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function ze(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function Be({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function Ve(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/constants.ts
var M = "enhancedcombathud", He = "enhancedcombathud-wfrp4e", Ue = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", N = "modules/enhancedcombathud/icons", We = [
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
], Ge = [{
	key: "ws",
	icon: `${N}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${N}/bolt-spell-cast.webp`
}], Ke = [
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
//#region src/module/integrations/enhancedcombathud/refresh.ts
async function P() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/functions/patches/paper-doll/find-slot-changes.ts
function qe(e, t, n) {
	return e[t]?.[n] ?? null;
}
function Je(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = qe(e, i, a), o = qe(t, i, a);
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
var Ye = Symbol.for("paper-doll-wfrp4e.equipped-state");
function Xe() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function Ze(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function Qe(e) {
	if (!_(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function $e() {
	return Promise.resolve();
}
function et() {
	let e = Xe(), t = e?.equip, n = globalThis.fromUuid;
	if (Ze(e, t, n), e[Ye] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!y(a)) return r.call(this, e, t, i);
		let o = Qe(i);
		if (!t) return $e();
		if (!v(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!w(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await Ce(this.actor, a, o);
		} catch (e) {
			T(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await j(this.actor);
			} catch (e) {
				T(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[Ye] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/enforce-paper-doll-slot-types.ts
var tt = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function nt() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function rt(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function it() {
	let e = nt(), t = e?.filterItems;
	if (rt(e, t), e[tt] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => y(e) && w(e, t));
	}, e[tt] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/register-slot-tooltips.ts
var at = ".paper-doll .paper-doll-slot", F = `data-${f}-drag-tooltip`, I = `data-${f}-tooltip`, L = `data-${f}-original-tooltip`, ot = {
	HEAD: {
		key: `${f}.SlotTooltip.Head`,
		fallback: "Head armour"
	},
	CAPE: {
		key: `${f}.SlotTooltip.Cape`,
		fallback: "Aesthetic Item"
	},
	BODY: {
		key: `${f}.SlotTooltip.Body`,
		fallback: "Body armour"
	},
	GLOVES: {
		key: `${f}.SlotTooltip.Gloves`,
		fallback: "Arm armour"
	},
	BOOTS: {
		key: `${f}.SlotTooltip.Boots`,
		fallback: "Leg armour"
	},
	TRINKET: {
		key: `${f}.SlotTooltip.Trinket`,
		fallback: "Ready Item"
	},
	PENDANT: {
		key: `${f}.SlotTooltip.Pendant`,
		fallback: "Amulet"
	},
	RING: {
		key: `${f}.SlotTooltip.Ring`,
		fallback: "Worn Item"
	},
	WRIST_LEFT: {
		key: `${f}.SlotTooltip.WristLeft`,
		fallback: "Light Source"
	},
	WRIST_RIGHT: {
		key: `${f}.SlotTooltip.WristRight`,
		fallback: "Quick Use Item"
	},
	MAIN_LEFT: {
		key: `${f}.SlotTooltip.MainLeft`,
		fallback: "Main hand"
	},
	MAIN_RIGHT: {
		key: `${f}.SlotTooltip.MainRight`,
		fallback: "Off hand"
	}
}, R = !1;
function st(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(at);
	return t?.closest(".paper-doll") ? t : null;
}
function ct() {
	document.querySelectorAll(`[${I}]`).forEach((e) => {
		let t = e.getAttribute(L);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(I), e.removeAttribute(L);
	});
}
function lt() {
	document.querySelectorAll(at).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(F, t), e.removeAttribute("data-tooltip"));
	});
}
function ut() {
	document.querySelectorAll(`[${F}]`).forEach((e) => {
		let t = e.getAttribute(F);
		t && (e.dataset.tooltip = t), e.removeAttribute(F);
	});
}
function dt(e) {
	if (R || e.hasAttribute(I)) return;
	let t = ot[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(L, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(I, "");
}
function ft(e) {
	let t = st(e.target);
	t && dt(t);
}
function pt() {
	R = !0, ct(), lt();
}
function mt() {
	R = !1, ut();
}
function ht() {
	document.addEventListener("pointerover", ft, !0), document.addEventListener("dragstart", pt, !0), document.addEventListener("dragend", mt, !0);
}
//#endregion
//#region src/module/patches/paper-doll/register-paper-doll-hooks.ts
var z = /* @__PURE__ */ new Map();
function B() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && g("paperDoll");
}
function gt(e) {
	if (!_(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!_(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[D];
	return _(n) ? "slots" in n ? d(n.slots) ? {
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
function _t(e) {
	let t = gt(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function V(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function vt(e, t) {
	let n = z.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), z.set(e.uuid, n);
}
function yt(e) {
	if (!_(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function bt(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (T(n, AggregateError(r, n)), await j(e));
}
function xt(e, t, n) {
	if (!B() || !v(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!_(i) || typeof i.item != "string") continue;
		let t = yt(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = V(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!w(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(Ce(e, n, t));
	}
	r.length && E(bt(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function St(e, t) {
	if (!B() || !v(e) || ke(e)) return;
	let n = _t(t);
	if (!n) return;
	let r = e.getFlag(D, O);
	if (r !== void 0) {
		if (!d(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of Je(r, n)) {
			if (!t.from) continue;
			let n = V(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && vt(e, n.uuid);
		}
	}
}
function Ct(e, t) {
	if (!B() || !v(e) || !_t(t)) return;
	let n = z.get(e.uuid);
	z.delete(e.uuid), n?.size && E(bt(e, Array.from(n, (t) => {
		let n = V(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(we), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function wt(e) {
	!B() || !y(e) || e.type !== "armour" && e.type !== "weapon" && !xe(e) || v(e.parent) && Ne(e.parent);
}
function Tt() {
	ht(), Hooks.on("paper-doll-swap", xt), Hooks.on("preUpdateActor", St), Hooks.on("updateActor", Ct), Hooks.on("updateItem", wt), Hooks.once("ready", () => {
		if (B()) {
			try {
				it(), et();
			} catch (e) {
				throw T("could not initialize the required Paper Doll integration", e), e;
			}
			E(Pe(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/integrations/fvtt-paper-doll-ui/register-integration.ts
var Et = "fvtt-paper-doll-ui";
function Dt() {
	p("fvtt-paper-doll-ui") && g("paperDoll") && Tt();
}
//#endregion
//#region src/module/integrations/paper-doll-argon/bridge-runtime.ts
var Ot = "activeWeaponSet", H = "slots", kt = "weaponSets";
function At(e) {
	let t = e.getFlag(Et, H);
	if (t === void 0) return {};
	if (!d(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function jt(e) {
	let t = e.getFlag(M, Ot);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function Mt(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function Nt(e) {
	let t = e.getFlag(M, kt);
	if (t === void 0) return {};
	if (!_(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !_(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: Mt(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: Mt(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function Pt(e, t) {
	let n = Nt(e), r = Be({
		activeSetId: jt(e),
		mainHand: S(e),
		mainSlots: ze(t),
		weaponSets: n
	}), i = !Ve(n, r);
	return i && await e.setFlag(M, kt, r), await P(), i ? "synchronized" : "unchanged";
}
function Ft(e) {
	if (!v(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return Re(At(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function It(e) {
	if (!_(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!_(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[Et];
	if (!_(n) || !(H in n)) return null;
	let r = n[H];
	if (!d(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function Lt(e) {
	if (!v(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return !g("paperDoll") || !g("argonCombatHud") || !g("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", H) === void 0 ? (await P(), "unchanged") : Pt(e, At(e));
}
async function Rt(e, t) {
	return Pt(e, t);
}
//#endregion
//#region src/module/api/create-module-api.ts
function zt() {
	return {
		getOptionalFeatures: Fe,
		syncAllPaperDollActors: Pe,
		syncPaperDollArgonActor: Lt,
		syncPaperDollActor: j
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function Bt() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(f);
	if (!e) throw Error(`Foundry module registry entry was not found for ${f}.`);
	let t = e;
	t.api = zt();
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/argon-logic.ts
var Vt = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function U(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function Ht(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function Ut(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function Wt(e) {
	return e.trim().toLowerCase();
}
function Gt(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function W(e) {
	return e.type === "trait" ? (Ut(e), e.rollable && !e.disabled && Vt.has(e.traitBaseName.toLowerCase())) : !1;
}
function Kt(e) {
	return e.type === "weapon" || W(e);
}
function qt(e) {
	return e.type === "weapon";
}
function Jt(e) {
	return U(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function Yt(e) {
	return U(e), e.advances > 0;
}
function Xt(e, t) {
	return e.forEach(U), t === "basic" ? e.filter((e) => !Jt(e)).map((e) => e.id) : t === "advanced" ? e.filter(Jt).map((e) => e.id) : t === "trained" ? e.filter(Yt).map((e) => e.id) : e.map((e) => e.id);
}
function Zt(e, t) {
	return e.forEach(Ht), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function Qt(e) {
	return e.filter((e) => e.type === "weapon" || W(e)).map((e) => e.id);
}
function $t(e) {
	return e.filter((e) => e.type === "trait" ? (Ut(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function en(e, t) {
	return e.forEach(U), t.flatMap((t) => {
		let n = Wt(t.name), r = e.find((e) => Wt(e.name) === n);
		return !r || t.trained && !Yt(r) ? [] : [r.id];
	});
}
function tn(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function nn(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function rn(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => nn(e.name, t))).map((e) => e.id) : [];
}
function an(e) {
	let t = [];
	return (e.type === "weapon" || W(e)) && t.push({
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
function on(e, t) {
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
var sn = "argonCombatItemPatterns", cn = "*Draught*, *Potion*";
function G(e, t) {
	let n = m[t];
	h(t) && e.register(f, n.settingKey, {
		config: !0,
		default: !0,
		hint: `${f}.Settings.Features.${t}.Hint`,
		name: `${f}.Settings.Features.${t}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function ln(e) {
	h("argonCombatHud") && e.register(f, sn, {
		config: !0,
		default: cn,
		hint: `${f}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${f}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: P,
		scope: "world",
		type: String
	});
}
function un() {
	if (!game) throw Error(`${f} | Foundry game is unavailable during settings registration.`);
	G(game.settings, "argonCombatHud"), G(game.settings, "paperDoll"), G(game.settings, "paperDollArgonBridge"), ln(game.settings);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/argon-helpers.ts
function dn(e, t) {
	if (typeof e != "object" || !e) throw Error(`${f} | ${t} must be an object.`);
	return e;
}
function K(e, t) {
	if (typeof e != "string" || !e.trim()) throw Error(`${f} | ${t} must be a non-empty string.`);
	return e;
}
function q(e, t) {
	if (typeof e != "boolean") throw Error(`${f} | ${t} must be a boolean.`);
	return e;
}
function fn(e, t) {
	if (!Number.isNumeric(e)) throw Error(`${f} | ${t} must be numeric.`);
	return Number(e);
}
function pn(e) {
	return e == null || e === "" ? null : fn(e, "item quantity");
}
function mn(e, t, n, r) {
	let i = e.getFlag(He, t);
	if (i === void 0) return r;
	if (!n.includes(i)) throw Error(`${f} | Argon actor flag ${He}.${t} has invalid value ${String(i)}.`);
	return i;
}
function J(e) {
	let t = dn(e, "Argon item"), n = K(t.type, "Argon item type"), r = K(t.name, `${n} item name`), i = K(t.id, `${n} ${r} id`), a = t.quantity?.value ?? t.system?.quantity?.value, o = {
		castingNumber: t.cn?.value,
		damage: t.DamageString,
		duration: t.Duration,
		id: i,
		name: r,
		quantity: pn(a),
		range: n === "weapon" || n === "trait" ? q(t.isRanged, `${n} ${r} ranged state`) ? t.Range : void 0 : t.Range,
		reach: t.Reach,
		target: t.Target,
		total: t.total?.value,
		type: n
	};
	return n === "skill" && (o.advanced = K(t.advanced?.value, `${r} advanced classification`), o.grouped = K(t.grouped?.value, `${r} grouped classification`), o.advances = fn(t.advances?.value ?? t.system?.advances?.value, `${r} advances`)), n === "spell" && (o.lore = K(t.lore?.value, `${r} lore`), o.memorized = q(t.memorized?.value, `${r} memorized state`)), n === "trait" && (o.disabled = q(t.system?.disabled, `${r} disabled state`), o.rollable = q(t.rollable?.value, `${r} rollable state`), o.traitBaseName = Gt(r)), o;
}
function Y(e) {
	return [...e].map(J);
}
function X(e, t) {
	let n = new Map([...e].map((e) => [e.id, e]));
	return t.map((e) => {
		let t = n.get(e);
		if (!t) throw Error(`${f} | Selected Argon item ${e} is no longer available.`);
		return t;
	});
}
function hn(e) {
	return an(J(e));
}
function gn(e) {
	let t = mn(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return X(n, Xt(Y(n), t));
}
function _n(e) {
	let t = mn(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return X(n, Zt(Y(n), t));
}
function vn(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return X(t, Qt(Y(t)));
}
function yn(e) {
	let t = [...e.itemTypes.trait];
	return X(t, $t(Y(t)));
}
function bn(e) {
	let t = Ge.map((e) => ({
		...e,
		type: "characteristic"
	})), n = Ke.map((e) => ({
		name: xn(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = X(r, en(Y(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function xn({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = En(`NAME.${e}`, t);
	return n ? `${i} (${En(n, r)})` : i;
}
function Sn(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = tn(String(t)), r = [...e.items];
	return X(r, rn(Y(r), n));
}
function Cn(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function wn(e) {
	return Kt(J(e));
}
function Tn(e) {
	return qt(J(e));
}
function En(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/integrations/enhancedcombathud/buttons.ts
function Dn(e) {
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
				details: hn(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = Cn(this.item);
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
			let e = _n(this.actor), t = vn(this.actor), s = yn(this.actor), c = bn(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = Sn(this.actor), u = [
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
				icon: `${N}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${N}/drink-me.webp`,
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
//#region src/functions/integrations/enhancedcombathud/movement.ts
function Z(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function On(e, t, n) {
	Z(e, "move score"), Z(t, "maximum distance"), Z(n, "used distance");
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
function Q(e) {
	return Z(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/panels.ts
function $(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function kn(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function An(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return Ue;
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
			let e = We.map((e) => {
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
			}), n = gn(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return $(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return $(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return kn(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += $(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = On(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${Q(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${Q(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: Q(t.bubbleDistance),
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
function jn(e) {
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
			if (!wn(n) || n.actor !== this.actor) throw Error(`${f} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let r = e.currentTarget.dataset.set, i = e.currentTarget.dataset.slot;
			if (!r || !i) throw Error(`${f} | Argon weapon-set drop target has no set or slot identifier.`);
			let a = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			a[r] ??= {}, a[r][i] = n.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", a), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!this.actor.getFlag("enhancedcombathud-wfrp4e", "switchEquip")) return;
			let n = on(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(Tn).map((e) => ({
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
function Mn() {
	p("enhancedcombathud") && g("argonCombatHud") && Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = Dn(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = An(e), a = jn(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	});
}
//#endregion
//#region src/module/integrations/paper-doll-argon/panels.ts
function Nn(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = Dn(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return Ft(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/integrations/paper-doll-argon/report-bridge-error.ts
function Pn(e) {
	return e instanceof Error ? e.message : String(e);
}
function Fn(e, t) {
	let n = `${fe}: ${e}. ${Pn(t)}`;
	console.error(n, t), globalThis.ui?.notifications?.error(n);
}
function In(e, t) {
	e.catch((e) => Fn(t, e));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/register-integration.ts
function Ln() {
	return g("paperDoll") && g("argonCombatHud") && g("paperDollArgonBridge");
}
function Rn(e, t) {
	if (!Ln() || !v(e)) return;
	let n = It(t);
	n && In(Rt(e, n), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function zn() {
	p("fvtt-paper-doll-ui") && p("enhancedcombathud") && Ln() && (Hooks.on("argonInit", (e) => {
		let { PaperDollQuickItemsPanel: t } = Nn(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", Rn));
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function Bn() {
	Hooks.once("init", () => {
		un(), Bt(), Mn(), Dt(), zn();
	});
}
//#endregion
//#region src/main.ts
Bn();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map