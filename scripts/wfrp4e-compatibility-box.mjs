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
function ee(e) {
	let t = e.armourPoints, r = n.filter((e) => t[e] > 0);
	return {
		coverage: r.length,
		item: e,
		points: r.reduce((e, n) => e + t[n], 0)
	};
}
function l(t) {
	let n = t.filter(c).map(ee);
	return e.flatMap((e) => {
		let t = n.filter((t) => a(t.item, e) > 0).sort((t, n) => s(e, t, n))[0];
		return t ? [{
			slotId: e,
			uuid: t.item.uuid
		}] : [];
	});
}
function te(e, t) {
	return e.twoHanded ? "both" : e.offhand ? t === "l" ? "r" : "l" : t;
}
function ne(e, t) {
	return Number(t.twoHanded) - Number(e.twoHanded) || e.name.localeCompare(t.name) || e.id.localeCompare(t.id);
}
function re(e, n) {
	let r = e.filter((e) => e.type === "weapon" && e.equipped).sort(ne);
	return t.flatMap((e) => {
		let t = e === "MAIN_LEFT" ? "l" : "r", i = r.find((e) => {
			let r = te(e, n);
			return r === "both" || r === t;
		});
		return i ? [{
			slotId: e,
			uuid: i.uuid
		}] : [];
	});
}
function ie(e, t) {
	return [...l(e), ...re(e, t)];
}
//#endregion
//#region src/functions/patches/paper-doll/derive-paper-doll-slot-state.ts
function ae(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function oe(n, r, i, a) {
	let o = ae(n), s = new Map(r.map((e) => [e.slotId, e.uuid]));
	for (let n of [...e, ...t]) {
		if (!a.has(n)) continue;
		let e = o[n]?.["0"] ?? null, t = s.get(n) ?? null;
		t ? (o[n] ??= {}, o[n][0] = t) : e && i.has(e) && (o[n] ??= {}, o[n][0] = null);
	}
	return o;
}
function se(e, t, n) {
	let r = new Map(t.map((e) => [e.uuid, e])), i = ae(e);
	for (let e of Object.values(i)) for (let [t, i] of Object.entries(e)) !i || n.has(i) || r.get(i)?.equipped === !1 && (e[t] = null);
	return i;
}
function ce(e, t, n, r, i) {
	return se(oe(e, t, n, r), i, n);
}
function le(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/functions/patches/paper-doll/is-paper-doll-slot-state.ts
function ue(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function de(e) {
	return /^(0|[1-9]\d*)$/.test(e);
}
function fe(e) {
	return e == null || typeof e == "string" && e.length > 0;
}
function u(e) {
	return ue(e) && Object.entries(e).every(([e, t]) => e.length > 0 && ue(t) && Object.entries(t).every(([e, t]) => de(e) && fe(t)));
}
//#endregion
//#region src/module/constants.ts
var d = "wfrp4e-compatibility-box", pe = "Drowsy's WFRP4e Compatibility Box";
//#endregion
//#region src/module/integrations/is-module-active.ts
function f(e) {
	return game?.modules.get(e)?.active === !0;
}
//#endregion
//#region src/module/settings/optional-features.ts
var p = {
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
function m(e) {
	return p[e].targetModuleIds.every((e) => f(e));
}
//#endregion
//#region src/module/settings/is-optional-feature-enabled.ts
function h(e) {
	let t = p[e];
	return m(e) && game?.settings.get("wfrp4e-compatibility-box", t.settingKey) !== !1;
}
//#endregion
//#region src/functions/patches/paper-doll/equipment-update.ts
function me(e) {
	return e.slotId === "MAIN_LEFT" ? "l" : e.slotId === "MAIN_RIGHT" ? "r" : null;
}
function he(e, t, n, r) {
	if (t === null) return {};
	let i = {};
	if (t || (i["system.equipped.value"] = !0), e?.type !== "weapon") return i;
	if (!r) throw Error(`Weapon ${e.uuid} requires the actor's main hand.`);
	let a = me(n), o = e.twoHanded ? !1 : a ? a !== r : void 0;
	return o !== void 0 && e.offhand !== o && (i["system.offhand.value"] = o), i;
}
function ge(e) {
	return e === !0 ? { "system.equipped.value": !1 } : {};
}
//#endregion
//#region src/functions/patches/paper-doll/is-item-allowed-in-slot.ts
function _e(e, t) {
	switch (t) {
		case "HEAD": return e.armourPoints.head > 0;
		case "BODY": return e.armourPoints.body > 0;
		case "GLOVES": return e.armourPoints.lArm > 0 || e.armourPoints.rArm > 0;
		case "BOOTS": return e.armourPoints.lLeg > 0 || e.armourPoints.rLeg > 0;
		default: return !1;
	}
}
function ve(e, t, n) {
	return n === "MAIN_LEFT" || n === "MAIN_RIGHT" ? t?.type === "weapon" : n === "HEAD" || n === "BODY" || n === "GLOVES" || n === "BOOTS" ? t?.type === "armour" && _e(t, n) : e !== "weapon" && e !== "armour";
}
//#endregion
//#region src/module/patches/paper-doll/wfrp-runtime-types.ts
var ye = new Set([
	"character",
	"npc",
	"creature"
]);
function g(e) {
	return typeof e == "object" && !!e;
}
function _(e) {
	return g(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function v(e) {
	return _(e) && ye.has(e.type);
}
function y(e) {
	return g(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
//#endregion
//#region src/module/patches/paper-doll/wfrp-equipment.ts
var be = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function xe(e) {
	if (!g(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function Se(e, t) {
	let n = xe(e)[t];
	if (n === void 0) return null;
	if (!g(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function b(e, t) {
	let n = Se(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function x(e) {
	return Se(e, "equipped");
}
function Ce(e) {
	return x(e) !== null;
}
function we(e) {
	let t = xe(e).AP;
	if (!g(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(be.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function Te(e) {
	if (!g(e.system) || !g(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
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
		armourPoints: we(e),
		type: "armour"
	} : {
		...t,
		offhand: b(e, "offhand"),
		twoHanded: b(e, "twohanded"),
		type: "weapon"
	};
}
function Ee(e, t) {
	return ve(e.type, S(e), t);
}
async function De(e, t, n) {
	let r = S(t), i = he(r, r?.equipped ?? x(t), n, r?.type === "weapon" ? Te(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function Oe(e) {
	let t = ge(S(e)?.equipped ?? x(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/notifications/notify-user.ts
function ke(e, t) {
	t === void 0 ? console.error(e) : console.error(e, t);
}
function C(e, t) {
	ke(e, t), ui?.notifications?.error(e);
}
//#endregion
//#region src/module/patches/paper-doll/report-paper-doll-error.ts
function Ae(e) {
	return e instanceof Error ? e.message : String(e);
}
function w(e, t) {
	C(`${pe}: ${e}. ${Ae(t)}`, t);
}
function T(e, t) {
	e.catch((e) => w(t, e));
}
//#endregion
//#region src/module/patches/paper-doll/synchronize-paper-doll.ts
var E = "fvtt-paper-doll-ui", D = "slots", O = /* @__PURE__ */ new Map(), je = /* @__PURE__ */ new Set();
function Me(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Ne(e) {
	let t = e.getFlag(E, D);
	if (t === void 0) return {};
	if (!u(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Me(t);
}
function Pe() {
	let n = game?.settings.get(E, "globalConfig"), r = new Set([...e, ...t]);
	if (g(n) && Object.keys(n).length === 0) return r;
	if (!g(n) || !g(n.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let i = Object.values(n.SLOTS);
	if (!i.every(g)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let a = new Set(i.flatMap((e) => Object.keys(e)));
	return a.size ? a : r;
}
function Fe(e) {
	return O.has(e.uuid);
}
function Ie(e) {
	if (!_(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function Le() {
	if (!game || game.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function Re(e) {
	let t = Ne(e), n = Array.from(e.items), r = n.map(S).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: x(e),
		uuid: e.uuid
	})), o = ce(t, ie(r, Te(e)), i, Pe(), a);
	return le(t, o) ? "unchanged" : (await e.setFlag(E, D, o), "synchronized");
}
async function k(e) {
	Ie(e), Le();
	let t = e;
	if (!v(t) || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !h("paperDoll")) return "unavailable";
	let n = O.get(t.uuid);
	if (n) return await n, k(t);
	let r = Re(t).finally(() => {
		O.get(t.uuid) === r && O.delete(t.uuid);
	});
	return O.set(t.uuid, r), r;
}
function ze(e) {
	v(e) && (je.has(e.uuid) || (je.add(e.uuid), queueMicrotask(() => {
		je.delete(e.uuid), T(k(e), `could not synchronize equipped items for ${e.uuid}`);
	})));
}
async function Be() {
	return Le(), Promise.all(Array.from(game.actors).filter(v).map(k));
}
//#endregion
//#region src/module/settings/get-optional-feature-statuses.ts
function Ve() {
	return Object.entries(p).map(([e, t]) => ({
		available: m(e),
		enabled: h(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
//#endregion
//#region src/functions/integrations/paper-doll-argon/bridge.ts
var He = ["TRINKET", "WRIST_RIGHT"];
function Ue(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function We(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of He) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(Ue)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function Ge(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function Ke({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function qe(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/constants.ts
var A = "enhancedcombathud", Je = d, Ye = "enhancedcombathud-wfrp4e", Xe = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", j = "modules/enhancedcombathud/icons", Ze = [
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
], Qe = [{
	key: "ws",
	icon: `${j}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${j}/bolt-spell-cast.webp`
}], $e = [
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
async function et() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/functions/patches/paper-doll/find-slot-changes.ts
function tt(e, t, n) {
	return e[t]?.[n] ?? null;
}
function nt(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = tt(e, i, a), o = tt(t, i, a);
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
var rt = Symbol.for("paper-doll-wfrp4e.equipped-state");
function it() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function at(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function ot(e) {
	if (!g(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function st() {
	return Promise.resolve();
}
function ct() {
	let e = it(), t = e?.equip, n = globalThis.fromUuid;
	if (at(e, t, n), e[rt] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!y(a) || _(this.actor) && !v(this.actor)) return r.call(this, e, t, i);
		let o = ot(i);
		if (!t) return st();
		if (!v(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!Ee(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await De(this.actor, a, o);
		} catch (e) {
			w(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await k(this.actor);
			} catch (e) {
				w(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[rt] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/enforce-paper-doll-slot-types.ts
var lt = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function ut() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function dt(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function ft() {
	let e = ut(), t = e?.filterItems;
	if (dt(e, t), e[lt] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => y(e) && Ee(e, t));
	}, e[lt] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/register-slot-tooltips.ts
var pt = ".paper-doll .paper-doll-slot", M = `data-${d}-drag-tooltip`, N = `data-${d}-tooltip`, mt = `data-${d}-original-tooltip`, ht = {
	HEAD: {
		key: `${d}.SlotTooltip.Head`,
		fallback: "Head armour"
	},
	CAPE: {
		key: `${d}.SlotTooltip.Cape`,
		fallback: "Aesthetic Item"
	},
	BODY: {
		key: `${d}.SlotTooltip.Body`,
		fallback: "Body armour"
	},
	GLOVES: {
		key: `${d}.SlotTooltip.Gloves`,
		fallback: "Arm armour"
	},
	BOOTS: {
		key: `${d}.SlotTooltip.Boots`,
		fallback: "Leg armour"
	},
	TRINKET: {
		key: `${d}.SlotTooltip.Trinket`,
		fallback: "Ready Item"
	},
	PENDANT: {
		key: `${d}.SlotTooltip.Pendant`,
		fallback: "Amulet"
	},
	RING: {
		key: `${d}.SlotTooltip.Ring`,
		fallback: "Worn Item"
	},
	WRIST_LEFT: {
		key: `${d}.SlotTooltip.WristLeft`,
		fallback: "Light Source"
	},
	WRIST_RIGHT: {
		key: `${d}.SlotTooltip.WristRight`,
		fallback: "Quick Use Item"
	},
	MAIN_LEFT: {
		key: `${d}.SlotTooltip.MainLeft`,
		fallback: "Main hand"
	},
	MAIN_RIGHT: {
		key: `${d}.SlotTooltip.MainRight`,
		fallback: "Off hand"
	}
}, gt = !1;
function _t(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(pt);
	return t?.closest(".paper-doll") ? t : null;
}
function vt() {
	document.querySelectorAll(`[${N}]`).forEach((e) => {
		let t = e.getAttribute(mt);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(N), e.removeAttribute(mt);
	});
}
function yt() {
	document.querySelectorAll(pt).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(M, t), e.removeAttribute("data-tooltip"));
	});
}
function bt() {
	document.querySelectorAll(`[${M}]`).forEach((e) => {
		let t = e.getAttribute(M);
		t && (e.dataset.tooltip = t), e.removeAttribute(M);
	});
}
function xt(e) {
	if (gt || e.hasAttribute(N)) return;
	let t = ht[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(mt, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(N, "");
}
function St(e) {
	let t = _t(e.target);
	t && xt(t);
}
function Ct() {
	gt = !0, vt(), yt();
}
function wt() {
	gt = !1, bt();
}
function Tt() {
	document.addEventListener("pointerover", St, !0), document.addEventListener("dragstart", Ct, !0), document.addEventListener("dragend", wt, !0);
}
//#endregion
//#region src/module/patches/paper-doll/register-paper-doll-hooks.ts
var P = /* @__PURE__ */ new Map();
function F() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && h("paperDoll");
}
function Et(e) {
	if (!g(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!g(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[E];
	return g(n) ? "slots" in n ? u(n.slots) ? {
		kind: "valid",
		state: n[D]
	} : {
		kind: "malformed",
		reason: "the Paper Doll slots update has an invalid shape"
	} : { kind: "absent" } : {
		kind: "malformed",
		reason: "the Paper Doll flag update is not an object"
	};
}
function Dt(e) {
	let t = Et(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function Ot(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function kt(e, t) {
	let n = P.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), P.set(e.uuid, n);
}
function At(e) {
	if (!g(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function jt(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (w(n, AggregateError(r, n)), await k(e));
}
function Mt(e, t, n) {
	if (!F() || !v(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!g(i) || typeof i.item != "string") continue;
		let t = At(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = Ot(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!Ee(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(De(e, n, t));
	}
	r.length && T(jt(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function Nt(e, t) {
	if (!F() || !v(e) || Fe(e)) return;
	let n = Dt(t);
	if (!n) return;
	let r = e.getFlag(E, D);
	if (r !== void 0) {
		if (!u(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of nt(r, n)) {
			if (!t.from) continue;
			let n = Ot(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && kt(e, n.uuid);
		}
	}
}
function Pt(e, t) {
	if (!F() || !v(e) || !Dt(t)) return;
	let n = P.get(e.uuid);
	P.delete(e.uuid), n?.size && T(jt(e, Array.from(n, (t) => {
		let n = Ot(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(Oe), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function Ft(e) {
	!F() || !y(e) || e.type !== "armour" && e.type !== "weapon" && !Ce(e) || v(e.parent) && ze(e.parent);
}
function It() {
	Tt(), Hooks.on("paper-doll-swap", Mt), Hooks.on("preUpdateActor", Nt), Hooks.on("updateActor", Pt), Hooks.on("updateItem", Ft), Hooks.once("ready", () => {
		if (F()) {
			try {
				ft(), ct();
			} catch (e) {
				throw w("could not initialize the required Paper Doll integration", e), e;
			}
			T(Be(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/integrations/fvtt-paper-doll-ui/register-integration.ts
var Lt = "fvtt-paper-doll-ui";
function Rt() {
	f("fvtt-paper-doll-ui") && h("paperDoll") && It();
}
//#endregion
//#region src/module/integrations/paper-doll-argon/bridge-runtime.ts
var zt = "activeWeaponSet", I = "slots", Bt = "weaponSets";
function Vt(e) {
	let t = e.getFlag(Lt, I);
	if (t === void 0) return {};
	if (!u(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function Ht(e) {
	let t = e.getFlag(A, zt);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function Ut(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function Wt(e) {
	let t = e.getFlag(A, Bt);
	if (t === void 0) return {};
	if (!g(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !g(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: Ut(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: Ut(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function Gt(e, t) {
	let n = Wt(e), r = Ke({
		activeSetId: Ht(e),
		mainHand: Te(e),
		mainSlots: Ge(t),
		weaponSets: n
	}), i = !qe(n, r);
	return i && await e.setFlag(A, Bt, r), await et(), i ? "synchronized" : "unchanged";
}
function Kt(e) {
	if (!_(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return We(Vt(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function qt(e) {
	if (!g(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!g(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[Lt];
	if (!g(n) || !(I in n)) return null;
	let r = n[I];
	if (!u(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function Jt(e) {
	if (!_(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return !v(e) || !h("paperDoll") || !h("argonCombatHud") || !h("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", I) === void 0 ? (await et(), "unchanged") : Gt(e, Vt(e));
}
//#endregion
//#region src/functions/integrations/splatter/configuration.ts
var Yt = "details.species.value", L = "#a51414d8", Xt = "#7e1717dc", Zt = "#b31f18d8", Qt = "#b01832d8", $t = "#861a24d8", R = "#541e1ed8", z = "#6a0e0ed8", B = "#6f3518e0", V = "#621010e0", H = "#771616dc", U = "#440707d8", W = "#14101490", G = "#0b080de8", en = [
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
	["Dwarf", Xt],
	["Halfling", Zt],
	["High Elf", Qt],
	["helf", Qt],
	["Wood Elf", $t],
	["welf", $t],
	["Ogre", R]
];
function tn() {
	let e = {};
	for (let [t, n] of en) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function nn(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function rn(e = {}) {
	let t = tn();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? L;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function an(e, t = {}) {
	let n = nn(e);
	for (let [e, r] of Object.entries(rn(t))) n[e] ??= r;
	return n;
}
//#endregion
//#region src/module/integrations/splatter/constants.ts
var K = "splatter", on = "useBloodsheet", sn = "BloodSheetData", cn = "creatureType", ln = [
	sn,
	cn,
	on
];
function un() {
	return game?.wfrp4e?.config.species ?? {};
}
function dn() {
	let e = game?.settings.settings;
	if (e) {
		for (let t of ln) if (!e.has(`splatter.${t}`)) throw Error(`Splatter setting ${t} is unavailable.`);
	}
}
async function fn() {
	if (!game) throw Error("Foundry game is unavailable while configuring Splatter.");
	if (!game.ready) throw Error("Foundry must finish loading before Splatter can be configured.");
	if (!f("splatter")) throw Error("Splatter must be active before it can be configured.");
	if (!game.user?.isGM) throw Error("Only a gamemaster can change Splatter's world settings.");
	dn();
	let e = an(game.settings.get(K, sn), un());
	return await game.settings.set(K, sn, e), await game.settings.set(K, cn, Yt), await game.settings.set(K, on, !0), {
		automaticBloodColors: !0,
		bloodColorCount: Object.keys(e).length,
		speciesPath: Yt
	};
}
//#endregion
//#region src/module/api/create-module-api.ts
function pn() {
	return {
		configureSplatter: fn,
		getOptionalFeatures: Ve,
		syncAllPaperDollActors: Be,
		syncPaperDollArgonActor: Jt,
		syncPaperDollActor: k
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function mn() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(d);
	if (!e) throw Error(`Foundry module registry entry was not found for ${d}.`);
	let t = e;
	t.api = pn();
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/argon-logic.ts
var hn = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function q(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function gn(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function _n(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function vn(e) {
	return e.trim().toLowerCase();
}
function yn(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function bn(e) {
	return e.type === "trait" ? (_n(e), e.rollable && !e.disabled && hn.has(e.traitBaseName.toLowerCase())) : !1;
}
function xn(e) {
	return e.type === "weapon" || bn(e);
}
function Sn(e) {
	return e.type === "weapon";
}
function Cn(e) {
	return q(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function wn(e) {
	return q(e), e.advances > 0;
}
function Tn(e, t) {
	return e.forEach(q), t === "basic" ? e.filter((e) => !Cn(e)).map((e) => e.id) : t === "advanced" ? e.filter(Cn).map((e) => e.id) : t === "trained" ? e.filter(wn).map((e) => e.id) : e.map((e) => e.id);
}
function En(e, t) {
	return e.forEach(gn), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function Dn(e) {
	return e.filter((e) => e.type === "weapon" || bn(e)).map((e) => e.id);
}
function On(e) {
	return e.filter((e) => e.type === "trait" ? (_n(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function kn(e, t) {
	return e.forEach(q), t.flatMap((t) => {
		let n = vn(t.name), r = e.find((e) => vn(e.name) === n);
		return !r || t.trained && !wn(r) ? [] : [r.id];
	});
}
function An(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function jn(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function Mn(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => jn(e.name, t))).map((e) => e.id) : [];
}
function Nn(e) {
	let t = [];
	return (e.type === "weapon" || bn(e)) && t.push({
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
function Pn(e, t) {
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
var Fn = "argonCombatItemPatterns", In = "*Draught*, *Potion*";
function Ln(e, t) {
	let n = p[t];
	m(t) && e.register(d, n.settingKey, {
		config: !0,
		default: !0,
		hint: `${d}.Settings.Features.${t}.Hint`,
		name: `${d}.Settings.Features.${t}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function Rn(e) {
	m("argonCombatHud") && e.register(d, Fn, {
		config: !0,
		default: In,
		hint: `${d}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${d}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: et,
		scope: "world",
		type: String
	});
}
function zn() {
	if (!game) throw Error(`${d} | Foundry game is unavailable during settings registration.`);
	Ln(game.settings, "argonCombatHud"), Ln(game.settings, "paperDoll"), Ln(game.settings, "paperDollArgonBridge"), Rn(game.settings);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/actor-flags.ts
var Bn = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function Vn(e, t) {
	return e.flags?.[Ye]?.[t];
}
function Hn(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? Vn(e, t);
}
async function Un(e) {
	let t = {};
	for (let n of Bn) {
		if (e.getFlag("wfrp4e-compatibility-box", n) !== void 0) continue;
		let r = Vn(e, n);
		r !== void 0 && (t[`flags.${d}.${n}`] = r);
	}
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/argon-helpers.ts
function Wn(e, t) {
	if (typeof e != "object" || !e) throw Error(`${d} | ${t} must be an object.`);
	return e;
}
function J(e, t) {
	if (typeof e != "string" || !e.trim()) throw Error(`${d} | ${t} must be a non-empty string.`);
	return e;
}
function Y(e, t) {
	if (typeof e != "boolean") throw Error(`${d} | ${t} must be a boolean.`);
	return e;
}
function Gn(e, t) {
	if (!Number.isNumeric(e)) throw Error(`${d} | ${t} must be numeric.`);
	return Number(e);
}
function Kn(e) {
	return e == null || e === "" ? null : Gn(e, "item quantity");
}
function qn(e, t, n, r) {
	let i = Hn(e, t);
	if (i === void 0) return r;
	if (!n.includes(i)) throw Error(`${d} | Argon actor flag ${Je}.${t} has invalid value ${String(i)}.`);
	return i;
}
function Jn(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = Y(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function X(e, t = !1) {
	let n = Wn(e, "Argon item"), r = J(n.type, "Argon item type"), i = J(n.name, `${r} item name`), a = {
		id: J(n.id, `${r} ${i} id`),
		name: i,
		quantity: Kn(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = J(n.advanced?.value, `${i} advanced classification`), a.grouped = J(n.grouped?.value, `${i} grouped classification`), a.advances = Gn(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = J(n.lore?.value, `${i} lore`), a.memorized = Y(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = Y(n.system?.disabled, `${i} disabled state`), a.rollable = Y(n.rollable?.value, `${i} rollable state`), a.traitBaseName = yn(i)), t && Jn(a, n, r), a;
}
function Z(e) {
	return [...e].map((e) => X(e));
}
function Q(e, t) {
	let n = new Map([...e].map((e) => [e.id, e]));
	return t.map((e) => {
		let t = n.get(e);
		if (!t) throw Error(`${d} | Selected Argon item ${e} is no longer available.`);
		return t;
	});
}
function Yn(e) {
	return Nn(X(e, !0));
}
function Xn(e) {
	let t = qn(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return Q(n, Tn(Z(n), t));
}
function Zn(e) {
	let t = qn(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return Q(n, En(Z(n), t));
}
function Qn(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return Q(t, Dn(Z(t)));
}
function $n(e) {
	let t = [...e.itemTypes.trait];
	return Q(t, On(Z(t)));
}
function er(e) {
	let t = Qe.map((e) => ({
		...e,
		type: "characteristic"
	})), n = $e.map((e) => ({
		name: tr(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = Q(r, kn(Z(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function tr({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = or(`NAME.${e}`, t);
	return n ? `${i} (${or(n, r)})` : i;
}
function nr(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = An(String(t)), r = [...e.items];
	return Q(r, Mn(Z(r), n));
}
function rr(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function ir(e) {
	return xn(X(e));
}
function ar(e) {
	return Sn(X(e));
}
function or(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/integrations/enhancedcombathud/buttons.ts
function sr(e) {
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
				details: Yn(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = rr(this.item);
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
			let e = Zn(this.actor), t = Qn(this.actor), s = $n(this.actor), c = er(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), ee = nr(this.actor), l = [
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
			], te = [
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
			for (let [e, t, n] of te) n.length && l.push(new o({
				id: e,
				label: t,
				items: n
			}));
			return c.length && l.push(new o({
				id: "combat-skills",
				label: "wfrp4e-compatibility-box.Argon.Group.Skills",
				buttons: c,
				icon: `${j}/dodging.webp`
			})), ee.length && l.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: ee,
				icon: `${j}/drink-me.webp`,
				buttonClass: r
			})), l;
		}
	}
	return {
		WFRPActionPanel: s,
		WFRPCombatItemButton: r
	};
}
//#endregion
//#region src/module/integrations/enhancedcombathud/legacy-module-check.ts
function cr() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!h("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/movement.ts
function $(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function lr(e, t, n) {
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
function ur(e) {
	return $(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/panels.ts
function dr(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function fr(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function pr(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return Xe;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await Un(this.actor), await super._onConfigure(e);
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
			let e = Ze.map((e) => {
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
			}), n = Xn(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return dr(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return dr(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return fr(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += dr(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = lr(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${ur(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${ur(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: ur(t.bubbleDistance),
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
function mr(e) {
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
			if (!ir(n) || n.actor !== this.actor) throw Error(`${d} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let r = e.currentTarget.dataset.set, i = e.currentTarget.dataset.slot;
			if (!r || !i) throw Error(`${d} | Argon weapon-set drop target has no set or slot identifier.`);
			let a = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			a[r] ??= {}, a[r][i] = n.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", a), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!Hn(this.actor, "switchEquip")) return;
			let n = Pn(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(ar).map((e) => ({
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
function hr() {
	f("enhancedcombathud") && h("argonCombatHud") && (cr(), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = sr(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = pr(e), a = mr(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	}));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/panels.ts
function gr(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = sr(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return Kt(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/integrations/paper-doll-argon/report-bridge-error.ts
function _r(e) {
	return e instanceof Error ? e.message : String(e);
}
function vr(e, t) {
	C(`${pe}: ${e}. ${_r(t)}`, t);
}
function yr(e, t) {
	e.catch((e) => vr(t, e));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/register-integration.ts
function br() {
	return h("paperDoll") && h("argonCombatHud") && h("paperDollArgonBridge");
}
function xr(e, t) {
	!br() || !v(e) || qt(t) && yr(Jt(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function Sr() {
	f("fvtt-paper-doll-ui") && f("enhancedcombathud") && br() && (Hooks.on("argonInit", (e) => {
		let { PaperDollQuickItemsPanel: t } = gr(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", xr));
}
//#endregion
//#region src/module/integrations/splatter/configuration-menu.ts
var Cr = `${d}.Splatter.Configuration`;
function wr(e) {
	return game?.i18n.localize(`${Cr}.${e}`) ?? e;
}
var Tr = class extends foundry.applications.api.ApplicationV2 {
	async render(e) {
		try {
			await fn(), ui?.notifications?.info(wr("Success"));
		} catch (e) {
			C(wr("Error"), e);
		}
		return this;
	}
}, Er = `${d}.Splatter.Configuration`;
function Dr() {
	if (f("splatter")) {
		if (!game) throw Error(`${d} | Foundry game is unavailable during Splatter registration.`);
		game.settings.registerMenu(d, "configureSplatter", {
			hint: `${Er}.Hint`,
			icon: "fa-solid fa-droplet",
			label: `${Er}.Button`,
			name: `${Er}.Name`,
			restricted: !0,
			type: Tr
		});
	}
}
//#endregion
//#region src/module/patches/wfrp4e/repair-data-model-migrations.ts
var Or = /* @__PURE__ */ new WeakSet();
function kr(e) {
	let t = e.migrateData;
	return typeof t != "function" || Or.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, Or.add(e), !0);
}
function Ar() {
	return [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(kr(t)), 0);
}
//#endregion
//#region src/module/patches/wfrp4e/repair-roll-modes.ts
function jr() {
	let e = game?.wfrp4e?.config, t = CONFIG.ChatMessage.modes;
	return !e || !t ? !1 : (e.rollModes = foundry.utils.deepClone(t), !0);
}
//#endregion
//#region src/module/patches/wfrp4e/apply-compatibility-patches.ts
function Mr() {
	game?.system.id === "wfrp4e" && (jr(), Ar());
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function Nr() {
	Hooks.once("init", () => {
		Mr(), zn(), mn(), hr(), Rt(), Sr(), Dr();
	});
}
//#endregion
//#region src/main.ts
Nr();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map