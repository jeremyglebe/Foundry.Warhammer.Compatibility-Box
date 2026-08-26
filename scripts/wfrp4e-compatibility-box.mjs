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
function ve(e) {
	return _(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
//#endregion
//#region src/module/patches/paper-doll/wfrp-equipment.ts
var ye = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function be(e) {
	if (!_(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function xe(e, t) {
	let n = be(e)[t];
	if (n === void 0) return null;
	if (!_(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function Se(e, t) {
	let n = xe(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function y(e) {
	return xe(e, "equipped");
}
function Ce(e) {
	return y(e) !== null;
}
function we(e) {
	let t = be(e).AP;
	if (!_(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(ye.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function Te(e) {
	if (!_(e.system) || !_(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function b(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: Se(e, "equipped"),
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
		offhand: Se(e, "offhand"),
		twoHanded: Se(e, "twohanded"),
		type: "weapon"
	};
}
function Ee(e, t) {
	return _e(e.type, b(e), t);
}
async function De(e, t, n) {
	let r = b(t), i = me(r, r?.equipped ?? y(t), n, r?.type === "weapon" ? Te(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function Oe(e) {
	let t = he(b(e)?.equipped ?? y(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/patches/paper-doll/report-paper-doll-error.ts
function ke(e) {
	return e instanceof Error ? e.message : String(e);
}
function x(e, t) {
	let n = `${fe}: ${e}. ${ke(t)}`;
	console.error(n, t), globalThis.ui?.notifications?.error(n);
}
function S(e, t) {
	e.catch((e) => x(t, e));
}
//#endregion
//#region src/module/patches/paper-doll/synchronize-paper-doll.ts
var C = "fvtt-paper-doll-ui", w = "slots", T = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Set();
function Ae(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function je(e) {
	let t = e.getFlag(C, w);
	if (t === void 0) return {};
	if (!d(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Ae(t);
}
function Me() {
	let n = game?.settings.get(C, "globalConfig"), r = new Set([...e, ...t]);
	if (_(n) && Object.keys(n).length === 0) return r;
	if (!_(n) || !_(n.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let i = Object.values(n.SLOTS);
	if (!i.every(_)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let a = new Set(i.flatMap((e) => Object.keys(e)));
	return a.size ? a : r;
}
function Ne(e) {
	return T.has(e.uuid);
}
function Pe(e) {
	if (!v(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function Fe() {
	if (!game || game.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function Ie(e) {
	let t = je(e), n = Array.from(e.items), r = n.map(b).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: y(e),
		uuid: e.uuid
	})), o = se(t, re(r, Te(e)), i, Me(), a);
	return ce(t, o) ? "unchanged" : (await e.setFlag(C, w, o), "synchronized");
}
async function D(e) {
	Pe(e), Fe();
	let t = e;
	if (game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !g("paperDoll")) return "unavailable";
	let n = T.get(t.uuid);
	if (n) return await n, D(t);
	let r = Ie(t).finally(() => {
		T.get(t.uuid) === r && T.delete(t.uuid);
	});
	return T.set(t.uuid, r), r;
}
function Le(e) {
	E.has(e.uuid) || (E.add(e.uuid), queueMicrotask(() => {
		E.delete(e.uuid), S(D(e), `could not synchronize equipped items for ${e.uuid}`);
	}));
}
async function Re() {
	return Fe(), Promise.all(Array.from(game.actors, (e) => D(e)));
}
//#endregion
//#region src/module/settings/get-optional-feature-statuses.ts
function ze() {
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
var Be = ["TRINKET", "WRIST_RIGHT"];
function Ve(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function He(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Be) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(Ve)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function Ue(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function We({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function Ge(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/constants.ts
var Ke = "enhancedcombathud", qe = f, Je = "enhancedcombathud-wfrp4e", Ye = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", O = "modules/enhancedcombathud/icons", Xe = [
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
], Ze = [{
	key: "ws",
	icon: `${O}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${O}/bolt-spell-cast.webp`
}], Qe = [
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
async function k() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/functions/patches/paper-doll/find-slot-changes.ts
function $e(e, t, n) {
	return e[t]?.[n] ?? null;
}
function et(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = $e(e, i, a), o = $e(t, i, a);
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
var tt = Symbol.for("paper-doll-wfrp4e.equipped-state");
function nt() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function rt(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function it(e) {
	if (!_(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function at() {
	return Promise.resolve();
}
function ot() {
	let e = nt(), t = e?.equip, n = globalThis.fromUuid;
	if (rt(e, t, n), e[tt] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!ve(a)) return r.call(this, e, t, i);
		let o = it(i);
		if (!t) return at();
		if (!v(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!Ee(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await De(this.actor, a, o);
		} catch (e) {
			x(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await D(this.actor);
			} catch (e) {
				x(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[tt] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/enforce-paper-doll-slot-types.ts
var st = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function ct() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function lt(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function ut() {
	let e = ct(), t = e?.filterItems;
	if (lt(e, t), e[st] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => ve(e) && Ee(e, t));
	}, e[st] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/register-slot-tooltips.ts
var dt = ".paper-doll .paper-doll-slot", A = `data-${f}-drag-tooltip`, j = `data-${f}-tooltip`, M = `data-${f}-original-tooltip`, ft = {
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
}, N = !1;
function pt(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(dt);
	return t?.closest(".paper-doll") ? t : null;
}
function mt() {
	document.querySelectorAll(`[${j}]`).forEach((e) => {
		let t = e.getAttribute(M);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(j), e.removeAttribute(M);
	});
}
function ht() {
	document.querySelectorAll(dt).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(A, t), e.removeAttribute("data-tooltip"));
	});
}
function gt() {
	document.querySelectorAll(`[${A}]`).forEach((e) => {
		let t = e.getAttribute(A);
		t && (e.dataset.tooltip = t), e.removeAttribute(A);
	});
}
function _t(e) {
	if (N || e.hasAttribute(j)) return;
	let t = ft[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(M, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(j, "");
}
function vt(e) {
	let t = pt(e.target);
	t && _t(t);
}
function yt() {
	N = !0, mt(), ht();
}
function bt() {
	N = !1, gt();
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
	let n = t[C];
	return _(n) ? "slots" in n ? d(n.slots) ? {
		kind: "valid",
		state: n[w]
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
function I(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function wt(e, t) {
	let n = P.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), P.set(e.uuid, n);
}
function Tt(e) {
	if (!_(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function Et(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (x(n, AggregateError(r, n)), await D(e));
}
function Dt(e, t, n) {
	if (!F() || !v(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!_(i) || typeof i.item != "string") continue;
		let t = Tt(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = I(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!Ee(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(De(e, n, t));
	}
	r.length && S(Et(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function Ot(e, t) {
	if (!F() || !v(e) || Ne(e)) return;
	let n = Ct(t);
	if (!n) return;
	let r = e.getFlag(C, w);
	if (r !== void 0) {
		if (!d(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of et(r, n)) {
			if (!t.from) continue;
			let n = I(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && wt(e, n.uuid);
		}
	}
}
function kt(e, t) {
	if (!F() || !v(e) || !Ct(t)) return;
	let n = P.get(e.uuid);
	P.delete(e.uuid), n?.size && S(Et(e, Array.from(n, (t) => {
		let n = I(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(Oe), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function At(e) {
	!F() || !ve(e) || e.type !== "armour" && e.type !== "weapon" && !Ce(e) || v(e.parent) && Le(e.parent);
}
function jt() {
	xt(), Hooks.on("paper-doll-swap", Dt), Hooks.on("preUpdateActor", Ot), Hooks.on("updateActor", kt), Hooks.on("updateItem", At), Hooks.once("ready", () => {
		if (F()) {
			try {
				ut(), ot();
			} catch (e) {
				throw x("could not initialize the required Paper Doll integration", e), e;
			}
			S(Re(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/integrations/fvtt-paper-doll-ui/register-integration.ts
var Mt = "fvtt-paper-doll-ui";
function Nt() {
	p("fvtt-paper-doll-ui") && g("paperDoll") && jt();
}
//#endregion
//#region src/module/integrations/paper-doll-argon/bridge-runtime.ts
var Pt = "activeWeaponSet", L = "slots", Ft = "weaponSets";
function It(e) {
	let t = e.getFlag(Mt, L);
	if (t === void 0) return {};
	if (!d(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function Lt(e) {
	let t = e.getFlag(Ke, Pt);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function Rt(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function zt(e) {
	let t = e.getFlag(Ke, Ft);
	if (t === void 0) return {};
	if (!_(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !_(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: Rt(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: Rt(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function Bt(e, t) {
	let n = zt(e), r = We({
		activeSetId: Lt(e),
		mainHand: Te(e),
		mainSlots: Ue(t),
		weaponSets: n
	}), i = !Ge(n, r);
	return i && await e.setFlag(Ke, Ft, r), await k(), i ? "synchronized" : "unchanged";
}
function Vt(e) {
	if (!v(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return He(It(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function Ht(e) {
	if (!_(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!_(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[Mt];
	if (!_(n) || !(L in n)) return null;
	let r = n[L];
	if (!d(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function Ut(e) {
	if (!v(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return !g("paperDoll") || !g("argonCombatHud") || !g("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", L) === void 0 ? (await k(), "unchanged") : Bt(e, It(e));
}
//#endregion
//#region src/functions/integrations/splatter/configuration.ts
var Wt = "details.species.value", R = "#a51414d8", Gt = "#7e1717dc", Kt = "#b31f18d8", qt = "#b01832d8", Jt = "#861a24d8", Yt = "#541e1ed8", z = "#6a0e0ed8", B = "#6f3518e0", V = "#621010e0", Xt = "#771616dc", H = "#440707d8", U = "#14101490", W = "#0b080de8", Zt = [
	["Jabberslythe", "#78d61be8"],
	["Chameleon Skink", z],
	["Kroxigor", z],
	["Saurus", z],
	["Suarus", z],
	["Skink", z],
	["Slann", z],
	["Reptile", z],
	["Ogre Gorger", Yt],
	["Gorger", Yt],
	["Orca", R],
	["Bloodletter", W],
	["Chaos Fury", W],
	["Blue Horror", W],
	["Pink Horror", W],
	["Nurgling", W],
	["Greater Daemon", W],
	["Daemon Prince", W],
	["Lesser Demon", W],
	["Daemon", W],
	["Demon", W],
	["Rat Ogre", Xt],
	["Wolf Rat", Xt],
	["Skaven", Xt],
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
	["Skeleton", U],
	["Ghost", U],
	["Tomb Banshee", U],
	["Banshee", U],
	["Undead", H],
	["Vampire", H],
	["Ghoul", H],
	["Wight", H],
	["Liche", H],
	["Maurngul", H],
	["Mourngul", H],
	["Human", R],
	["Dwarf", Gt],
	["Halfling", Kt],
	["High Elf", qt],
	["helf", qt],
	["Wood Elf", Jt],
	["welf", Jt],
	["Ogre", Yt]
];
function Qt() {
	let e = {};
	for (let [t, n] of Zt) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function $t(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function en(e = {}) {
	let t = Qt();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? R;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function tn(e, t = {}) {
	let n = $t(e);
	for (let [e, r] of Object.entries(en(t))) n[e] ??= r;
	return n;
}
//#endregion
//#region src/module/integrations/splatter/constants.ts
var G = "splatter", nn = "useBloodsheet", rn = "BloodSheetData", an = "creatureType", on = [
	rn,
	an,
	nn
];
function sn() {
	return game?.wfrp4e?.config.species ?? {};
}
function cn() {
	let e = game?.settings.settings;
	if (e) {
		for (let t of on) if (!e.has(`splatter.${t}`)) throw Error(`Splatter setting ${t} is unavailable.`);
	}
}
async function ln() {
	if (!game) throw Error("Foundry game is unavailable while configuring Splatter.");
	if (!game.ready) throw Error("Foundry must finish loading before Splatter can be configured.");
	if (!p("splatter")) throw Error("Splatter must be active before it can be configured.");
	if (!game.user?.isGM) throw Error("Only a gamemaster can change Splatter's world settings.");
	cn();
	let e = tn(game.settings.get(G, rn), sn());
	return await game.settings.set(G, rn, e), await game.settings.set(G, an, Wt), await game.settings.set(G, nn, !0), {
		automaticBloodColors: !0,
		bloodColorCount: Object.keys(e).length,
		speciesPath: Wt
	};
}
//#endregion
//#region src/module/api/create-module-api.ts
function un() {
	return {
		configureSplatter: ln,
		getOptionalFeatures: ze,
		syncAllPaperDollActors: Re,
		syncPaperDollArgonActor: Ut,
		syncPaperDollActor: D
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function dn() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(f);
	if (!e) throw Error(`Foundry module registry entry was not found for ${f}.`);
	let t = e;
	t.api = un();
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/argon-logic.ts
var fn = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function K(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function pn(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function mn(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function hn(e) {
	return e.trim().toLowerCase();
}
function gn(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function _n(e) {
	return e.type === "trait" ? (mn(e), e.rollable && !e.disabled && fn.has(e.traitBaseName.toLowerCase())) : !1;
}
function vn(e) {
	return e.type === "weapon" || _n(e);
}
function yn(e) {
	return e.type === "weapon";
}
function bn(e) {
	return K(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function xn(e) {
	return K(e), e.advances > 0;
}
function Sn(e, t) {
	return e.forEach(K), t === "basic" ? e.filter((e) => !bn(e)).map((e) => e.id) : t === "advanced" ? e.filter(bn).map((e) => e.id) : t === "trained" ? e.filter(xn).map((e) => e.id) : e.map((e) => e.id);
}
function Cn(e, t) {
	return e.forEach(pn), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function wn(e) {
	return e.filter((e) => e.type === "weapon" || _n(e)).map((e) => e.id);
}
function Tn(e) {
	return e.filter((e) => e.type === "trait" ? (mn(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function En(e, t) {
	return e.forEach(K), t.flatMap((t) => {
		let n = hn(t.name), r = e.find((e) => hn(e.name) === n);
		return !r || t.trained && !xn(r) ? [] : [r.id];
	});
}
function Dn(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function On(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function kn(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => On(e.name, t))).map((e) => e.id) : [];
}
function An(e) {
	let t = [];
	return (e.type === "weapon" || _n(e)) && t.push({
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
function jn(e, t) {
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
var Mn = "argonCombatItemPatterns", Nn = "*Draught*, *Potion*";
function Pn(e, t) {
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
function Fn(e) {
	h("argonCombatHud") && e.register(f, Mn, {
		config: !0,
		default: Nn,
		hint: `${f}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${f}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: k,
		scope: "world",
		type: String
	});
}
function In() {
	if (!game) throw Error(`${f} | Foundry game is unavailable during settings registration.`);
	Pn(game.settings, "argonCombatHud"), Pn(game.settings, "paperDoll"), Pn(game.settings, "paperDollArgonBridge"), Fn(game.settings);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/actor-flags.ts
var Ln = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function Rn(e, t) {
	return e.flags?.[Je]?.[t];
}
function zn(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? Rn(e, t);
}
async function Bn(e) {
	let t = {};
	for (let n of Ln) {
		if (e.getFlag("wfrp4e-compatibility-box", n) !== void 0) continue;
		let r = Rn(e, n);
		r !== void 0 && (t[`flags.${f}.${n}`] = r);
	}
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/argon-helpers.ts
function Vn(e, t) {
	if (typeof e != "object" || !e) throw Error(`${f} | ${t} must be an object.`);
	return e;
}
function q(e, t) {
	if (typeof e != "string" || !e.trim()) throw Error(`${f} | ${t} must be a non-empty string.`);
	return e;
}
function J(e, t) {
	if (typeof e != "boolean") throw Error(`${f} | ${t} must be a boolean.`);
	return e;
}
function Hn(e, t) {
	if (!Number.isNumeric(e)) throw Error(`${f} | ${t} must be numeric.`);
	return Number(e);
}
function Un(e) {
	return e == null || e === "" ? null : Hn(e, "item quantity");
}
function Wn(e, t, n, r) {
	let i = zn(e, t);
	if (i === void 0) return r;
	if (!n.includes(i)) throw Error(`${f} | Argon actor flag ${qe}.${t} has invalid value ${String(i)}.`);
	return i;
}
function Gn(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = J(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function Y(e, t = !1) {
	let n = Vn(e, "Argon item"), r = q(n.type, "Argon item type"), i = q(n.name, `${r} item name`), a = {
		id: q(n.id, `${r} ${i} id`),
		name: i,
		quantity: Un(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = q(n.advanced?.value, `${i} advanced classification`), a.grouped = q(n.grouped?.value, `${i} grouped classification`), a.advances = Hn(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = q(n.lore?.value, `${i} lore`), a.memorized = J(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = J(n.system?.disabled, `${i} disabled state`), a.rollable = J(n.rollable?.value, `${i} rollable state`), a.traitBaseName = gn(i)), t && Gn(a, n, r), a;
}
function X(e) {
	return [...e].map((e) => Y(e));
}
function Z(e, t) {
	let n = new Map([...e].map((e) => [e.id, e]));
	return t.map((e) => {
		let t = n.get(e);
		if (!t) throw Error(`${f} | Selected Argon item ${e} is no longer available.`);
		return t;
	});
}
function Kn(e) {
	return An(Y(e, !0));
}
function qn(e) {
	let t = Wn(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return Z(n, Sn(X(n), t));
}
function Jn(e) {
	let t = Wn(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return Z(n, Cn(X(n), t));
}
function Yn(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return Z(t, wn(X(t)));
}
function Xn(e) {
	let t = [...e.itemTypes.trait];
	return Z(t, Tn(X(t)));
}
function Zn(e) {
	let t = Ze.map((e) => ({
		...e,
		type: "characteristic"
	})), n = Qe.map((e) => ({
		name: Qn(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = Z(r, En(X(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function Qn({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = rr(`NAME.${e}`, t);
	return n ? `${i} (${rr(n, r)})` : i;
}
function $n(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = Dn(String(t)), r = [...e.items];
	return Z(r, kn(X(r), n));
}
function er(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function tr(e) {
	return vn(Y(e));
}
function nr(e) {
	return yn(Y(e));
}
function rr(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/integrations/enhancedcombathud/buttons.ts
function ir(e) {
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
				details: Kn(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = er(this.item);
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
			let e = Jn(this.actor), t = Yn(this.actor), s = Xn(this.actor), c = Zn(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = $n(this.actor), u = [
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
				icon: `${O}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${O}/drink-me.webp`,
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
function ar() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!g("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/movement.ts
function Q(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function or(e, t, n) {
	Q(e, "move score"), Q(t, "maximum distance"), Q(n, "used distance");
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
function sr(e) {
	return Q(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/panels.ts
function cr(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function lr(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function ur(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return Ye;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await Bn(this.actor), await super._onConfigure(e);
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
			let e = Xe.map((e) => {
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
			}), n = qn(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return cr(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return cr(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return lr(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += cr(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = or(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${sr(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${sr(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: sr(t.bubbleDistance),
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
function dr(e) {
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
			if (!tr(n) || n.actor !== this.actor) throw Error(`${f} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let r = e.currentTarget.dataset.set, i = e.currentTarget.dataset.slot;
			if (!r || !i) throw Error(`${f} | Argon weapon-set drop target has no set or slot identifier.`);
			let a = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			a[r] ??= {}, a[r][i] = n.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", a), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!zn(this.actor, "switchEquip")) return;
			let n = jn(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(nr).map((e) => ({
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
function fr() {
	p("enhancedcombathud") && g("argonCombatHud") && (ar(), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = ir(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = ur(e), a = dr(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	}));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/panels.ts
function pr(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = ir(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return Vt(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/integrations/paper-doll-argon/report-bridge-error.ts
function mr(e) {
	return e instanceof Error ? e.message : String(e);
}
function hr(e, t) {
	let n = `${fe}: ${e}. ${mr(t)}`;
	console.error(n, t), globalThis.ui?.notifications?.error(n);
}
function gr(e, t) {
	e.catch((e) => hr(t, e));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/register-integration.ts
function _r() {
	return g("paperDoll") && g("argonCombatHud") && g("paperDollArgonBridge");
}
function vr(e, t) {
	!_r() || !v(e) || Ht(t) && gr(Ut(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function yr() {
	p("fvtt-paper-doll-ui") && p("enhancedcombathud") && _r() && (Hooks.on("argonInit", (e) => {
		let { PaperDollQuickItemsPanel: t } = pr(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", vr));
}
//#endregion
//#region src/module/integrations/splatter/settings-button.ts
var br = "data-wfrp4e-compatibility-box-splatter", xr = "[name=\"splatter.creatureType\"]", Sr = "[name=\"splatter.useBloodsheet\"]", Cr = "wfrp4e-compatibility-box.Splatter.Configuration";
function $(e) {
	return game?.i18n.localize(`${Cr}.${e}`) ?? e;
}
function wr(e) {
	let t = e.querySelector(xr), n = e.querySelector(Sr), r, i;
	try {
		r = game?.settings.get(G, an), i = game?.settings.get(G, nn);
	} catch {
		return;
	}
	t && typeof r == "string" && (t.value = r), n && typeof i == "boolean" && (n.checked = i);
}
async function Tr(e, t) {
	e.disabled = !0;
	try {
		await ln(), ui?.notifications?.info($("Success"));
	} catch (e) {
		console.error(`${Cr} | Could not configure Splatter.`, e), ui?.notifications?.error($("Error"));
	} finally {
		wr(t), e.disabled = !1;
	}
}
function Er(e) {
	let t = e.ownerDocument, n = t.createElement("div");
	n.className = "form-group", n.setAttribute(br, "");
	let r = t.createElement("label");
	r.textContent = $("Name");
	let i = t.createElement("div");
	i.className = "form-fields";
	let a = t.createElement("button");
	a.type = "button", a.textContent = $("Button"), a.addEventListener("click", () => void Tr(a, e)), i.append(a);
	let o = t.createElement("p");
	return o.className = "hint", o.textContent = $("Hint"), n.append(r, i, o), n;
}
function Dr(e) {
	if (!game?.user?.isGM || e.querySelector(`[${br}]`)) return;
	let t = e.querySelector(xr)?.closest(".form-group");
	t && t.insertAdjacentElement("beforebegin", Er(e));
}
//#endregion
//#region src/module/integrations/splatter/register-integration.ts
function Or(e) {
	return !e || typeof e != "object" ? !1 : typeof Reflect.get(e, "querySelector") == "function";
}
function kr() {
	p("splatter") && Hooks.on("renderSettingsConfig", (e, t) => {
		Or(t) && Dr(t);
	});
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function Ar() {
	Hooks.once("init", () => {
		In(), dn(), fr(), Nt(), yr(), kr();
	});
}
//#endregion
//#region src/main.ts
Ar();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map