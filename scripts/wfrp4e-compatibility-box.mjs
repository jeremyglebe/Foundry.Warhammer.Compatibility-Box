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
var f = "wfrp4e-compatibility-box", fe = "Drowsy's WFRP4e Compatibility Box";
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
function Ce(e) {
	if (!_(e.system) || !_(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function S(e) {
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
function we(e, t) {
	return _e(e.type, S(e), t);
}
async function Te(e, t, n) {
	let r = S(t), i = me(r, r?.equipped ?? x(t), n, r?.type === "weapon" ? Ce(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function Ee(e) {
	let t = he(S(e)?.equipped ?? x(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/patches/paper-doll/report-paper-doll-error.ts
function De(e) {
	return e instanceof Error ? e.message : String(e);
}
function C(e, t) {
	let n = `${fe}: ${e}. ${De(t)}`;
	console.error(n, t), globalThis.ui?.notifications?.error(n);
}
function w(e, t) {
	e.catch((e) => C(t, e));
}
//#endregion
//#region src/module/patches/paper-doll/synchronize-paper-doll.ts
var T = "fvtt-paper-doll-ui", E = "slots", D = /* @__PURE__ */ new Map(), O = /* @__PURE__ */ new Set();
function Oe(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function ke(e) {
	let t = e.getFlag(T, E);
	if (t === void 0) return {};
	if (!d(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Oe(t);
}
function Ae() {
	let n = game?.settings.get(T, "globalConfig"), r = new Set([...e, ...t]);
	if (_(n) && Object.keys(n).length === 0) return r;
	if (!_(n) || !_(n.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let i = Object.values(n.SLOTS);
	if (!i.every(_)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let a = new Set(i.flatMap((e) => Object.keys(e)));
	return a.size ? a : r;
}
function je(e) {
	return D.has(e.uuid);
}
function Me(e) {
	if (!v(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function Ne() {
	if (!game || game.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function Pe(e) {
	let t = ke(e), n = Array.from(e.items), r = n.map(S).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: x(e),
		uuid: e.uuid
	})), o = se(t, re(r, Ce(e)), i, Ae(), a);
	return ce(t, o) ? "unchanged" : (await e.setFlag(T, E, o), "synchronized");
}
async function k(e) {
	Me(e), Ne();
	let t = e;
	if (game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !g("paperDoll")) return "unavailable";
	let n = D.get(t.uuid);
	if (n) return await n, k(t);
	let r = Pe(t).finally(() => {
		D.get(t.uuid) === r && D.delete(t.uuid);
	});
	return D.set(t.uuid, r), r;
}
function Fe(e) {
	O.has(e.uuid) || (O.add(e.uuid), queueMicrotask(() => {
		O.delete(e.uuid), w(k(e), `could not synchronize equipped items for ${e.uuid}`);
	}));
}
async function Ie() {
	return Ne(), Promise.all(Array.from(game.actors, (e) => k(e)));
}
//#endregion
//#region src/module/settings/get-optional-feature-statuses.ts
function Le() {
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
var Re = ["TRINKET", "WRIST_RIGHT"];
function ze(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function Be(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Re) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(ze)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function Ve(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function He({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function Ue(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/constants.ts
var We = "enhancedcombathud", Ge = f, Ke = "enhancedcombathud-wfrp4e", qe = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", A = "modules/enhancedcombathud/icons", Je = [
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
], Ye = [{
	key: "ws",
	icon: `${A}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${A}/bolt-spell-cast.webp`
}], Xe = [
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
async function Ze() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/functions/patches/paper-doll/find-slot-changes.ts
function Qe(e, t, n) {
	return e[t]?.[n] ?? null;
}
function $e(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = Qe(e, i, a), o = Qe(t, i, a);
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
var et = Symbol.for("paper-doll-wfrp4e.equipped-state");
function tt() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function nt(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function rt(e) {
	if (!_(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function it() {
	return Promise.resolve();
}
function at() {
	let e = tt(), t = e?.equip, n = globalThis.fromUuid;
	if (nt(e, t, n), e[et] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!y(a)) return r.call(this, e, t, i);
		let o = rt(i);
		if (!t) return it();
		if (!v(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!we(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await Te(this.actor, a, o);
		} catch (e) {
			C(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await k(this.actor);
			} catch (e) {
				C(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[et] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/enforce-paper-doll-slot-types.ts
var ot = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function st() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function ct(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function lt() {
	let e = st(), t = e?.filterItems;
	if (ct(e, t), e[ot] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => y(e) && we(e, t));
	}, e[ot] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/register-slot-tooltips.ts
var ut = ".paper-doll .paper-doll-slot", j = `data-${f}-drag-tooltip`, M = `data-${f}-tooltip`, N = `data-${f}-original-tooltip`, dt = {
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
}, ft = !1;
function pt(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(ut);
	return t?.closest(".paper-doll") ? t : null;
}
function mt() {
	document.querySelectorAll(`[${M}]`).forEach((e) => {
		let t = e.getAttribute(N);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(M), e.removeAttribute(N);
	});
}
function ht() {
	document.querySelectorAll(ut).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(j, t), e.removeAttribute("data-tooltip"));
	});
}
function gt() {
	document.querySelectorAll(`[${j}]`).forEach((e) => {
		let t = e.getAttribute(j);
		t && (e.dataset.tooltip = t), e.removeAttribute(j);
	});
}
function _t(e) {
	if (ft || e.hasAttribute(M)) return;
	let t = dt[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(N, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(M, "");
}
function vt(e) {
	let t = pt(e.target);
	t && _t(t);
}
function yt() {
	ft = !0, mt(), ht();
}
function bt() {
	ft = !1, gt();
}
function xt() {
	document.addEventListener("pointerover", vt, !0), document.addEventListener("dragstart", yt, !0), document.addEventListener("dragend", bt, !0);
}
//#endregion
//#region src/module/patches/paper-doll/register-paper-doll-hooks.ts
var P = /* @__PURE__ */ new Map();
function F() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && g("paperDoll");
}
function St(e) {
	if (!_(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!_(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[T];
	return _(n) ? "slots" in n ? d(n.slots) ? {
		kind: "valid",
		state: n[E]
	} : {
		kind: "malformed",
		reason: "the Paper Doll slots update has an invalid shape"
	} : { kind: "absent" } : {
		kind: "malformed",
		reason: "the Paper Doll flag update is not an object"
	};
}
function Ct(e) {
	let t = St(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function wt(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function Tt(e, t) {
	let n = P.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), P.set(e.uuid, n);
}
function Et(e) {
	if (!_(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function Dt(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (C(n, AggregateError(r, n)), await k(e));
}
function Ot(e, t, n) {
	if (!F() || !v(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!_(i) || typeof i.item != "string") continue;
		let t = Et(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = wt(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!we(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(Te(e, n, t));
	}
	r.length && w(Dt(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function kt(e, t) {
	if (!F() || !v(e) || je(e)) return;
	let n = Ct(t);
	if (!n) return;
	let r = e.getFlag(T, E);
	if (r !== void 0) {
		if (!d(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of $e(r, n)) {
			if (!t.from) continue;
			let n = wt(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && Tt(e, n.uuid);
		}
	}
}
function At(e, t) {
	if (!F() || !v(e) || !Ct(t)) return;
	let n = P.get(e.uuid);
	P.delete(e.uuid), n?.size && w(Dt(e, Array.from(n, (t) => {
		let n = wt(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(Ee), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function jt(e) {
	!F() || !y(e) || e.type !== "armour" && e.type !== "weapon" && !xe(e) || v(e.parent) && Fe(e.parent);
}
function Mt() {
	xt(), Hooks.on("paper-doll-swap", Ot), Hooks.on("preUpdateActor", kt), Hooks.on("updateActor", At), Hooks.on("updateItem", jt), Hooks.once("ready", () => {
		if (F()) {
			try {
				lt(), at();
			} catch (e) {
				throw C("could not initialize the required Paper Doll integration", e), e;
			}
			w(Ie(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/integrations/fvtt-paper-doll-ui/register-integration.ts
var Nt = "fvtt-paper-doll-ui";
function Pt() {
	p("fvtt-paper-doll-ui") && g("paperDoll") && Mt();
}
//#endregion
//#region src/module/integrations/paper-doll-argon/bridge-runtime.ts
var Ft = "activeWeaponSet", I = "slots", It = "weaponSets";
function Lt(e) {
	let t = e.getFlag(Nt, I);
	if (t === void 0) return {};
	if (!d(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function Rt(e) {
	let t = e.getFlag(We, Ft);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function zt(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function Bt(e) {
	let t = e.getFlag(We, It);
	if (t === void 0) return {};
	if (!_(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !_(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: zt(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: zt(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function Vt(e, t) {
	let n = Bt(e), r = He({
		activeSetId: Rt(e),
		mainHand: Ce(e),
		mainSlots: Ve(t),
		weaponSets: n
	}), i = !Ue(n, r);
	return i && await e.setFlag(We, It, r), await Ze(), i ? "synchronized" : "unchanged";
}
function Ht(e) {
	if (!v(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return Be(Lt(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function Ut(e) {
	if (!_(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!_(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[Nt];
	if (!_(n) || !(I in n)) return null;
	let r = n[I];
	if (!d(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function Wt(e) {
	if (!v(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return !g("paperDoll") || !g("argonCombatHud") || !g("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", I) === void 0 ? (await Ze(), "unchanged") : Vt(e, Lt(e));
}
//#endregion
//#region src/functions/integrations/splatter/configuration.ts
var Gt = "details.species.value", L = "#a51414d8", Kt = "#7e1717dc", qt = "#b31f18d8", Jt = "#b01832d8", Yt = "#861a24d8", R = "#541e1ed8", z = "#6a0e0ed8", B = "#6f3518e0", V = "#621010e0", H = "#771616dc", U = "#440707d8", W = "#14101490", G = "#0b080de8", Xt = [
	["Jabberslythe", "#78d61be8"],
	["Chameleon Skink", z],
	["Kroxigor", z],
	["Saurus", z],
	["Suarus", z],
	["Skink", z],
	["Slann", z],
	["Reptile", z],
	["Ogre Gorger", R],
	["Gorger", R],
	["Orca", L],
	["Bloodletter", G],
	["Chaos Fury", G],
	["Blue Horror", G],
	["Pink Horror", G],
	["Nurgling", G],
	["Greater Daemon", G],
	["Daemon Prince", G],
	["Lesser Demon", G],
	["Daemon", G],
	["Demon", G],
	["Rat Ogre", H],
	["Wolf Rat", H],
	["Skaven", H],
	["Bray Shaman", V],
	["Beastman", V],
	["Beastmen", V],
	["Bestigor", V],
	["Minotaur", V],
	["Pestigor", V],
	["Razorgor", V],
	["Ungor", V],
	["Gor", V],
	["Greenskin", B],
	["Forest Goblin", B],
	["Night Goblin", B],
	["Hobgoblin", B],
	["Goblin", B],
	["Black Orc", B],
	["Orc", B],
	["Snotling", B],
	["Squig", B],
	["Skeleton", W],
	["Ghost", W],
	["Tomb Banshee", W],
	["Banshee", W],
	["Undead", U],
	["Vampire", U],
	["Ghoul", U],
	["Wight", U],
	["Liche", U],
	["Maurngul", U],
	["Mourngul", U],
	["Human", L],
	["Dwarf", Kt],
	["Halfling", qt],
	["High Elf", Jt],
	["helf", Jt],
	["Wood Elf", Yt],
	["welf", Yt],
	["Ogre", R]
];
function Zt() {
	let e = {};
	for (let [t, n] of Xt) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function Qt(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function $t(e = {}) {
	let t = Zt();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? L;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function en(e, t = {}) {
	let n = Qt(e);
	for (let [e, r] of Object.entries($t(t))) n[e] ??= r;
	return n;
}
//#endregion
//#region src/module/integrations/splatter/constants.ts
var K = "splatter", tn = "useBloodsheet", nn = "BloodSheetData", rn = "creatureType", an = [
	nn,
	rn,
	tn
];
function on() {
	return game?.wfrp4e?.config.species ?? {};
}
function sn() {
	let e = game?.settings.settings;
	if (e) {
		for (let t of an) if (!e.has(`splatter.${t}`)) throw Error(`Splatter setting ${t} is unavailable.`);
	}
}
async function cn() {
	if (!game) throw Error("Foundry game is unavailable while configuring Splatter.");
	if (!game.ready) throw Error("Foundry must finish loading before Splatter can be configured.");
	if (!p("splatter")) throw Error("Splatter must be active before it can be configured.");
	if (!game.user?.isGM) throw Error("Only a gamemaster can change Splatter's world settings.");
	sn();
	let e = en(game.settings.get(K, nn), on());
	return await game.settings.set(K, nn, e), await game.settings.set(K, rn, Gt), await game.settings.set(K, tn, !0), {
		automaticBloodColors: !0,
		bloodColorCount: Object.keys(e).length,
		speciesPath: Gt
	};
}
//#endregion
//#region src/module/api/create-module-api.ts
function ln() {
	return {
		configureSplatter: cn,
		getOptionalFeatures: Le,
		syncAllPaperDollActors: Ie,
		syncPaperDollArgonActor: Wt,
		syncPaperDollActor: k
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function un() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(f);
	if (!e) throw Error(`Foundry module registry entry was not found for ${f}.`);
	let t = e;
	t.api = ln();
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/argon-logic.ts
var dn = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function q(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function fn(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function pn(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function mn(e) {
	return e.trim().toLowerCase();
}
function hn(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function gn(e) {
	return e.type === "trait" ? (pn(e), e.rollable && !e.disabled && dn.has(e.traitBaseName.toLowerCase())) : !1;
}
function _n(e) {
	return e.type === "weapon" || gn(e);
}
function vn(e) {
	return e.type === "weapon";
}
function yn(e) {
	return q(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function bn(e) {
	return q(e), e.advances > 0;
}
function xn(e, t) {
	return e.forEach(q), t === "basic" ? e.filter((e) => !yn(e)).map((e) => e.id) : t === "advanced" ? e.filter(yn).map((e) => e.id) : t === "trained" ? e.filter(bn).map((e) => e.id) : e.map((e) => e.id);
}
function Sn(e, t) {
	return e.forEach(fn), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function Cn(e) {
	return e.filter((e) => e.type === "weapon" || gn(e)).map((e) => e.id);
}
function wn(e) {
	return e.filter((e) => e.type === "trait" ? (pn(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function Tn(e, t) {
	return e.forEach(q), t.flatMap((t) => {
		let n = mn(t.name), r = e.find((e) => mn(e.name) === n);
		return !r || t.trained && !bn(r) ? [] : [r.id];
	});
}
function En(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function Dn(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function On(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => Dn(e.name, t))).map((e) => e.id) : [];
}
function kn(e) {
	let t = [];
	return (e.type === "weapon" || gn(e)) && t.push({
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
function An(e, t) {
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
var jn = "argonCombatItemPatterns", Mn = "*Draught*, *Potion*";
function Nn(e, t) {
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
function Pn(e) {
	h("argonCombatHud") && e.register(f, jn, {
		config: !0,
		default: Mn,
		hint: `${f}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${f}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: Ze,
		scope: "world",
		type: String
	});
}
function Fn() {
	if (!game) throw Error(`${f} | Foundry game is unavailable during settings registration.`);
	Nn(game.settings, "argonCombatHud"), Nn(game.settings, "paperDoll"), Nn(game.settings, "paperDollArgonBridge"), Pn(game.settings);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/actor-flags.ts
var In = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function Ln(e, t) {
	return e.flags?.[Ke]?.[t];
}
function Rn(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? Ln(e, t);
}
async function zn(e) {
	let t = {};
	for (let n of In) {
		if (e.getFlag("wfrp4e-compatibility-box", n) !== void 0) continue;
		let r = Ln(e, n);
		r !== void 0 && (t[`flags.${f}.${n}`] = r);
	}
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/argon-helpers.ts
function Bn(e, t) {
	if (typeof e != "object" || !e) throw Error(`${f} | ${t} must be an object.`);
	return e;
}
function J(e, t) {
	if (typeof e != "string" || !e.trim()) throw Error(`${f} | ${t} must be a non-empty string.`);
	return e;
}
function Y(e, t) {
	if (typeof e != "boolean") throw Error(`${f} | ${t} must be a boolean.`);
	return e;
}
function Vn(e, t) {
	if (!Number.isNumeric(e)) throw Error(`${f} | ${t} must be numeric.`);
	return Number(e);
}
function Hn(e) {
	return e == null || e === "" ? null : Vn(e, "item quantity");
}
function Un(e, t, n, r) {
	let i = Rn(e, t);
	if (i === void 0) return r;
	if (!n.includes(i)) throw Error(`${f} | Argon actor flag ${Ge}.${t} has invalid value ${String(i)}.`);
	return i;
}
function Wn(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = Y(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function X(e, t = !1) {
	let n = Bn(e, "Argon item"), r = J(n.type, "Argon item type"), i = J(n.name, `${r} item name`), a = {
		id: J(n.id, `${r} ${i} id`),
		name: i,
		quantity: Hn(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = J(n.advanced?.value, `${i} advanced classification`), a.grouped = J(n.grouped?.value, `${i} grouped classification`), a.advances = Vn(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = J(n.lore?.value, `${i} lore`), a.memorized = Y(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = Y(n.system?.disabled, `${i} disabled state`), a.rollable = Y(n.rollable?.value, `${i} rollable state`), a.traitBaseName = hn(i)), t && Wn(a, n, r), a;
}
function Z(e) {
	return [...e].map((e) => X(e));
}
function Q(e, t) {
	let n = new Map([...e].map((e) => [e.id, e]));
	return t.map((e) => {
		let t = n.get(e);
		if (!t) throw Error(`${f} | Selected Argon item ${e} is no longer available.`);
		return t;
	});
}
function Gn(e) {
	return kn(X(e, !0));
}
function Kn(e) {
	let t = Un(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return Q(n, xn(Z(n), t));
}
function qn(e) {
	let t = Un(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return Q(n, Sn(Z(n), t));
}
function Jn(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return Q(t, Cn(Z(t)));
}
function Yn(e) {
	let t = [...e.itemTypes.trait];
	return Q(t, wn(Z(t)));
}
function Xn(e) {
	let t = Ye.map((e) => ({
		...e,
		type: "characteristic"
	})), n = Xe.map((e) => ({
		name: Zn(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = Q(r, Tn(Z(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function Zn({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = nr(`NAME.${e}`, t);
	return n ? `${i} (${nr(n, r)})` : i;
}
function Qn(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = En(String(t)), r = [...e.items];
	return Q(r, On(Z(r), n));
}
function $n(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function er(e) {
	return _n(X(e));
}
function tr(e) {
	return vn(X(e));
}
function nr(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/integrations/enhancedcombathud/buttons.ts
function rr(e) {
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
				details: Gn(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = $n(this.item);
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
			let e = qn(this.actor), t = Jn(this.actor), s = Yn(this.actor), c = Xn(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = Qn(this.actor), u = [
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
				icon: `${A}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${A}/drink-me.webp`,
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
//#region src/module/integrations/enhancedcombathud/legacy-module-check.ts
function ir() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!g("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/movement.ts
function $(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function ar(e, t, n) {
	$(e, "move score"), $(t, "maximum distance"), $(n, "used distance");
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
function or(e) {
	return $(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/panels.ts
function sr(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function cr(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function lr(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return qe;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await zn(this.actor), await super._onConfigure(e);
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
			let e = Je.map((e) => {
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
			}), n = Kn(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return sr(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return sr(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return cr(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += sr(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = ar(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${or(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${or(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: or(t.bubbleDistance),
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
function ur(e) {
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
			if (!er(n) || n.actor !== this.actor) throw Error(`${f} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let r = e.currentTarget.dataset.set, i = e.currentTarget.dataset.slot;
			if (!r || !i) throw Error(`${f} | Argon weapon-set drop target has no set or slot identifier.`);
			let a = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			a[r] ??= {}, a[r][i] = n.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", a), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!Rn(this.actor, "switchEquip")) return;
			let n = An(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(tr).map((e) => ({
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
function dr() {
	p("enhancedcombathud") && g("argonCombatHud") && (ir(), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = rr(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = lr(e), a = ur(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	}));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/panels.ts
function fr(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = rr(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return Ht(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/integrations/paper-doll-argon/report-bridge-error.ts
function pr(e) {
	return e instanceof Error ? e.message : String(e);
}
function mr(e, t) {
	let n = `${fe}: ${e}. ${pr(t)}`;
	console.error(n, t), globalThis.ui?.notifications?.error(n);
}
function hr(e, t) {
	e.catch((e) => mr(t, e));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/register-integration.ts
function gr() {
	return g("paperDoll") && g("argonCombatHud") && g("paperDollArgonBridge");
}
function _r(e, t) {
	!gr() || !v(e) || Ut(t) && hr(Wt(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function vr() {
	p("fvtt-paper-doll-ui") && p("enhancedcombathud") && gr() && (Hooks.on("argonInit", (e) => {
		let { PaperDollQuickItemsPanel: t } = fr(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", _r));
}
//#endregion
//#region src/module/integrations/splatter/configuration-menu.ts
var yr = `${f}.Splatter.Configuration`;
function br(e) {
	return game?.i18n.localize(`${yr}.${e}`) ?? e;
}
var xr = class extends foundry.applications.api.ApplicationV2 {
	async render(e) {
		try {
			await cn(), ui?.notifications?.info(br("Success"));
		} catch (e) {
			console.error(`${yr} | Could not configure Splatter.`, e), ui?.notifications?.error(br("Error"));
		}
		return this;
	}
}, Sr = `${f}.Splatter.Configuration`;
function Cr() {
	if (p("splatter")) {
		if (!game) throw Error(`${f} | Foundry game is unavailable during Splatter registration.`);
		game.settings.registerMenu(f, "configureSplatter", {
			hint: `${Sr}.Hint`,
			icon: "fa-solid fa-droplet",
			label: `${Sr}.Button`,
			name: `${Sr}.Name`,
			restricted: !0,
			type: xr
		});
	}
}
//#endregion
//#region src/module/patches/wfrp4e/repair-data-model-migrations.ts
var wr = /* @__PURE__ */ new WeakSet();
function Tr(e) {
	let t = e.migrateData;
	return typeof t != "function" || wr.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, wr.add(e), !0);
}
function Er() {
	return [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(Tr(t)), 0);
}
//#endregion
//#region src/module/patches/wfrp4e/repair-roll-modes.ts
function Dr() {
	let e = game?.wfrp4e?.config, t = CONFIG.ChatMessage.modes;
	return !e || !t ? !1 : (e.rollModes = foundry.utils.deepClone(t), !0);
}
//#endregion
//#region src/module/patches/wfrp4e/apply-compatibility-patches.ts
function Or() {
	game?.system.id === "wfrp4e" && (Dr(), Er());
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function kr() {
	Hooks.once("init", () => {
		Or(), Fn(), un(), dr(), Pt(), vr(), Cr();
	});
}
//#endregion
//#region src/main.ts
kr();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map