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
function me(e) {
	return p[e].targetModuleIds.every((e) => f(e));
}
//#endregion
//#region src/module/settings/is-optional-feature-enabled.ts
function m(e) {
	let t = p[e];
	return me(e) && game?.settings.get("wfrp4e-compatibility-box", t.settingKey) !== !1;
}
//#endregion
//#region src/functions/patches/paper-doll/equipment-update.ts
function he(e) {
	return e.slotId === "MAIN_LEFT" ? "l" : e.slotId === "MAIN_RIGHT" ? "r" : null;
}
function ge(e, t, n, r) {
	if (t === null) return {};
	let i = {};
	if (t || (i["system.equipped.value"] = !0), e?.type !== "weapon") return i;
	if (!r) throw Error(`Weapon ${e.uuid} requires the actor's main hand.`);
	let a = he(n), o = e.twoHanded ? !1 : a ? a !== r : void 0;
	return o !== void 0 && e.offhand !== o && (i["system.offhand.value"] = o), i;
}
function _e(e) {
	return e === !0 ? { "system.equipped.value": !1 } : {};
}
//#endregion
//#region src/functions/patches/paper-doll/is-item-allowed-in-slot.ts
function ve(e, t) {
	switch (t) {
		case "HEAD": return e.armourPoints.head > 0;
		case "BODY": return e.armourPoints.body > 0;
		case "GLOVES": return e.armourPoints.lArm > 0 || e.armourPoints.rArm > 0;
		case "BOOTS": return e.armourPoints.lLeg > 0 || e.armourPoints.rLeg > 0;
		default: return !1;
	}
}
function ye(e, t, n) {
	return n === "MAIN_LEFT" || n === "MAIN_RIGHT" ? t?.type === "weapon" : n === "HEAD" || n === "BODY" || n === "GLOVES" || n === "BOOTS" ? t?.type === "armour" && ve(t, n) : e !== "weapon" && e !== "armour";
}
//#endregion
//#region src/module/patches/paper-doll/wfrp-runtime-types.ts
var be = new Set([
	"character",
	"npc",
	"creature"
]);
function h(e) {
	return typeof e == "object" && !!e;
}
function g(e) {
	return h(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function _(e) {
	return g(e) && be.has(e.type);
}
function xe(e) {
	return h(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
//#endregion
//#region src/module/patches/paper-doll/wfrp-equipment.ts
var Se = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function Ce(e) {
	if (!h(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function we(e, t) {
	let n = Ce(e)[t];
	if (n === void 0) return null;
	if (!h(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function Te(e, t) {
	let n = we(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function v(e) {
	return we(e, "equipped");
}
function Ee(e) {
	return v(e) !== null;
}
function De(e) {
	let t = Ce(e).AP;
	if (!h(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(Se.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function Oe(e) {
	if (!h(e.system) || !h(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function y(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: Te(e, "equipped"),
		id: e.id,
		name: e.name,
		uuid: e.uuid
	};
	return e.type === "armour" ? {
		...t,
		armourPoints: De(e),
		type: "armour"
	} : {
		...t,
		offhand: Te(e, "offhand"),
		twoHanded: Te(e, "twohanded"),
		type: "weapon"
	};
}
function ke(e, t) {
	return ye(e.type, y(e), t);
}
async function Ae(e, t, n) {
	let r = y(t), i = ge(r, r?.equipped ?? v(t), n, r?.type === "weapon" ? Oe(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function je(e) {
	let t = _e(y(e)?.equipped ?? v(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/notifications/notify-user.ts
function Me(e, t) {
	t === void 0 ? console.error(e) : console.error(e, t);
}
function Ne(e, t) {
	Me(e, t), ui?.notifications?.error(e);
}
//#endregion
//#region src/module/patches/paper-doll/report-paper-doll-error.ts
function Pe(e) {
	return e instanceof Error ? e.message : String(e);
}
function b(e, t) {
	Ne(`${pe}: ${e}. ${Pe(t)}`, t);
}
function x(e, t) {
	e.catch((e) => b(t, e));
}
//#endregion
//#region src/module/patches/paper-doll/synchronize-paper-doll.ts
var S = "fvtt-paper-doll-ui", C = "slots", w = /* @__PURE__ */ new Map(), Fe = /* @__PURE__ */ new Set();
function Ie(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Le(e) {
	let t = e.getFlag(S, C);
	if (t === void 0) return {};
	if (!u(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Ie(t);
}
function Re() {
	let n = game?.settings.get(S, "globalConfig"), r = new Set([...e, ...t]);
	if (h(n) && Object.keys(n).length === 0) return r;
	if (!h(n) || !h(n.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let i = Object.values(n.SLOTS);
	if (!i.every(h)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let a = new Set(i.flatMap((e) => Object.keys(e)));
	return a.size ? a : r;
}
function ze(e) {
	return w.has(e.uuid);
}
function Be(e) {
	if (!g(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function Ve() {
	if (!game || game.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function He(e) {
	let t = Le(e), n = Array.from(e.items), r = n.map(y).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: v(e),
		uuid: e.uuid
	})), o = ce(t, ie(r, Oe(e)), i, Re(), a);
	return le(t, o) ? "unchanged" : (await e.setFlag(S, C, o), "synchronized");
}
async function T(e) {
	Be(e), Ve();
	let t = e;
	if (!_(t) || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !m("paperDoll")) return "unavailable";
	let n = w.get(t.uuid);
	if (n) return await n, T(t);
	let r = He(t).finally(() => {
		w.get(t.uuid) === r && w.delete(t.uuid);
	});
	return w.set(t.uuid, r), r;
}
function Ue(e) {
	_(e) && (Fe.has(e.uuid) || (Fe.add(e.uuid), queueMicrotask(() => {
		Fe.delete(e.uuid), x(T(e), `could not synchronize equipped items for ${e.uuid}`);
	})));
}
async function We() {
	return Ve(), Promise.all(Array.from(game.actors).filter(_).map(T));
}
//#endregion
//#region src/module/settings/get-optional-feature-statuses.ts
function Ge() {
	return Object.entries(p).map(([e, t]) => ({
		available: me(e),
		enabled: m(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
//#endregion
//#region src/functions/integrations/paper-doll-argon/bridge.ts
var Ke = ["TRINKET", "WRIST_RIGHT"];
function qe(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function Je(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Ke) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(qe)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function Ye(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function Xe({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function Ze(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/constants.ts
var Qe = "enhancedcombathud", $e = d, et = "enhancedcombathud-wfrp4e", tt = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", E = "modules/enhancedcombathud/icons", nt = [
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
], rt = [{
	key: "ws",
	icon: `${E}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${E}/bolt-spell-cast.webp`
}], it = [
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
async function at() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/functions/patches/paper-doll/find-slot-changes.ts
function ot(e, t, n) {
	return e[t]?.[n] ?? null;
}
function st(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = ot(e, i, a), o = ot(t, i, a);
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
var ct = Symbol.for("paper-doll-wfrp4e.equipped-state");
function lt() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function ut(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function dt(e) {
	if (!h(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function ft() {
	return Promise.resolve();
}
function pt() {
	let e = lt(), t = e?.equip, n = globalThis.fromUuid;
	if (ut(e, t, n), e[ct] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!xe(a) || g(this.actor) && !_(this.actor)) return r.call(this, e, t, i);
		let o = dt(i);
		if (!t) return ft();
		if (!_(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!ke(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await Ae(this.actor, a, o);
		} catch (e) {
			b(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await T(this.actor);
			} catch (e) {
				b(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[ct] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/enforce-paper-doll-slot-types.ts
var mt = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function ht() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function gt(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function _t() {
	let e = ht(), t = e?.filterItems;
	if (gt(e, t), e[mt] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => xe(e) && ke(e, t));
	}, e[mt] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/register-slot-tooltips.ts
var vt = ".paper-doll .paper-doll-slot", yt = `data-${d}-drag-tooltip`, D = `data-${d}-tooltip`, bt = `data-${d}-original-tooltip`, xt = {
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
}, St = !1;
function Ct(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(vt);
	return t?.closest(".paper-doll") ? t : null;
}
function wt() {
	document.querySelectorAll(`[${D}]`).forEach((e) => {
		let t = e.getAttribute(bt);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(D), e.removeAttribute(bt);
	});
}
function Tt() {
	document.querySelectorAll(vt).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(yt, t), e.removeAttribute("data-tooltip"));
	});
}
function Et() {
	document.querySelectorAll(`[${yt}]`).forEach((e) => {
		let t = e.getAttribute(yt);
		t && (e.dataset.tooltip = t), e.removeAttribute(yt);
	});
}
function Dt(e) {
	if (St || e.hasAttribute(D)) return;
	let t = xt[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(bt, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(D, "");
}
function Ot(e) {
	let t = Ct(e.target);
	t && Dt(t);
}
function kt() {
	St = !0, wt(), Tt();
}
function At() {
	St = !1, Et();
}
function jt() {
	document.addEventListener("pointerover", Ot, !0), document.addEventListener("dragstart", kt, !0), document.addEventListener("dragend", At, !0);
}
//#endregion
//#region src/module/patches/paper-doll/register-paper-doll-hooks.ts
var O = /* @__PURE__ */ new Map();
function k() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && m("paperDoll");
}
function Mt(e) {
	if (!h(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!h(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[S];
	return h(n) ? "slots" in n ? u(n.slots) ? {
		kind: "valid",
		state: n[C]
	} : {
		kind: "malformed",
		reason: "the Paper Doll slots update has an invalid shape"
	} : { kind: "absent" } : {
		kind: "malformed",
		reason: "the Paper Doll flag update is not an object"
	};
}
function Nt(e) {
	let t = Mt(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function Pt(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function Ft(e, t) {
	let n = O.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), O.set(e.uuid, n);
}
function It(e) {
	if (!h(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function Lt(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (b(n, AggregateError(r, n)), await T(e));
}
function Rt(e, t, n) {
	if (!k() || !_(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!h(i) || typeof i.item != "string") continue;
		let t = It(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = Pt(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!ke(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(Ae(e, n, t));
	}
	r.length && x(Lt(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function zt(e, t) {
	if (!k() || !_(e) || ze(e)) return;
	let n = Nt(t);
	if (!n) return;
	let r = e.getFlag(S, C);
	if (r !== void 0) {
		if (!u(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of st(r, n)) {
			if (!t.from) continue;
			let n = Pt(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && Ft(e, n.uuid);
		}
	}
}
function Bt(e, t) {
	if (!k() || !_(e) || !Nt(t)) return;
	let n = O.get(e.uuid);
	O.delete(e.uuid), n?.size && x(Lt(e, Array.from(n, (t) => {
		let n = Pt(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(je), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function Vt(e) {
	!k() || !xe(e) || e.type !== "armour" && e.type !== "weapon" && !Ee(e) || _(e.parent) && Ue(e.parent);
}
function Ht() {
	jt(), Hooks.on("paper-doll-swap", Rt), Hooks.on("preUpdateActor", zt), Hooks.on("updateActor", Bt), Hooks.on("updateItem", Vt), Hooks.once("ready", () => {
		if (k()) {
			try {
				_t(), pt();
			} catch (e) {
				throw b("could not initialize the required Paper Doll integration", e), e;
			}
			x(We(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/integrations/fvtt-paper-doll-ui/register-integration.ts
var Ut = "fvtt-paper-doll-ui";
function Wt() {
	f("fvtt-paper-doll-ui") && m("paperDoll") && Ht();
}
//#endregion
//#region src/module/integrations/paper-doll-argon/bridge-runtime.ts
var Gt = "activeWeaponSet", A = "slots", Kt = "weaponSets";
function qt(e) {
	let t = e.getFlag(Ut, A);
	if (t === void 0) return {};
	if (!u(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function Jt(e) {
	let t = e.getFlag(Qe, Gt);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function Yt(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function Xt(e) {
	let t = e.getFlag(Qe, Kt);
	if (t === void 0) return {};
	if (!h(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !h(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: Yt(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: Yt(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function Zt(e, t) {
	let n = Xt(e), r = Xe({
		activeSetId: Jt(e),
		mainHand: Oe(e),
		mainSlots: Ye(t),
		weaponSets: n
	}), i = !Ze(n, r);
	return i && await e.setFlag(Qe, Kt, r), await at(), i ? "synchronized" : "unchanged";
}
function Qt(e) {
	if (!g(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return Je(qt(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function $t(e) {
	if (!h(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!h(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[Ut];
	if (!h(n) || !(A in n)) return null;
	let r = n[A];
	if (!u(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function en(e) {
	if (!g(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return !_(e) || !m("paperDoll") || !m("argonCombatHud") || !m("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", A) === void 0 ? (await at(), "unchanged") : Zt(e, qt(e));
}
//#endregion
//#region src/functions/integrations/splatter/configuration.ts
var tn = "details.species.value", nn = "#a51414d8", rn = "#7e1717dc", an = "#b31f18d8", on = "#b01832d8", sn = "#861a24d8", cn = "#541e1ed8", j = "#6a0e0ed8", M = "#6f3518e0", N = "#621010e0", ln = "#771616dc", P = "#440707d8", F = "#14101490", I = "#0b080de8", un = [
	["Jabberslythe", "#78d61be8"],
	["Chameleon Skink", j],
	["Kroxigor", j],
	["Saurus", j],
	["Suarus", j],
	["Skink", j],
	["Slann", j],
	["Reptile", j],
	["Ogre Gorger", cn],
	["Gorger", cn],
	["Orca", nn],
	["Bloodletter", I],
	["Chaos Fury", I],
	["Blue Horror", I],
	["Pink Horror", I],
	["Nurgling", I],
	["Greater Daemon", I],
	["Daemon Prince", I],
	["Lesser Demon", I],
	["Daemon", I],
	["Demon", I],
	["Rat Ogre", ln],
	["Wolf Rat", ln],
	["Skaven", ln],
	["Bray Shaman", N],
	["Beastman", N],
	["Beastmen", N],
	["Bestigor", N],
	["Minotaur", N],
	["Pestigor", N],
	["Razorgor", N],
	["Ungor", N],
	["Gor", N],
	["Greenskin", M],
	["Forest Goblin", M],
	["Night Goblin", M],
	["Hobgoblin", M],
	["Goblin", M],
	["Black Orc", M],
	["Orc", M],
	["Snotling", M],
	["Squig", M],
	["Skeleton", F],
	["Ghost", F],
	["Tomb Banshee", F],
	["Banshee", F],
	["Undead", P],
	["Vampire", P],
	["Ghoul", P],
	["Wight", P],
	["Liche", P],
	["Maurngul", P],
	["Mourngul", P],
	["Human", nn],
	["Dwarf", rn],
	["Halfling", an],
	["High Elf", on],
	["helf", on],
	["Wood Elf", sn],
	["welf", sn],
	["Ogre", cn]
];
function dn() {
	let e = {};
	for (let [t, n] of un) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function fn(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function pn(e = {}) {
	let t = dn();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? nn;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function mn(e, t = {}) {
	let n = fn(e);
	for (let [e, r] of Object.entries(pn(t))) n[e] ??= r;
	return n;
}
//#endregion
//#region src/module/integrations/splatter/constants.ts
var L = "splatter", hn = "useBloodsheet", gn = "BloodSheetData", _n = "creatureType", vn = [
	gn,
	_n,
	hn
];
function yn() {
	return game?.wfrp4e?.config.species ?? {};
}
function bn() {
	let e = game?.settings.settings;
	if (e) {
		for (let t of vn) if (!e.has(`splatter.${t}`)) throw Error(`Splatter setting ${t} is unavailable.`);
	}
}
async function xn() {
	if (!game) throw Error("Foundry game is unavailable while configuring Splatter.");
	if (!game.ready) throw Error("Foundry must finish loading before Splatter can be configured.");
	if (!f("splatter")) throw Error("Splatter must be active before it can be configured.");
	if (!game.user?.isGM) throw Error("Only a gamemaster can change Splatter's world settings.");
	bn();
	let e = mn(game.settings.get(L, gn), yn());
	return await game.settings.set(L, gn, e), await game.settings.set(L, _n, tn), await game.settings.set(L, hn, !0), {
		automaticBloodColors: !0,
		bloodColorCount: Object.keys(e).length,
		speciesPath: tn
	};
}
//#endregion
//#region src/functions/integrations/bossbar/health.ts
var R = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
};
function Sn(e) {
	return Object.entries(R).every(([t, n]) => e[t] === n);
}
function Cn(e, t) {
	return !Number.isFinite(e) || !Number.isFinite(t) || t <= 0 ? 0 : Math.min(100, Math.max(0, 100 * e / t));
}
function wn(e) {
	let t = Number.isFinite(e.maxCriticals) ? Math.max(0, Math.floor(e.maxCriticals)) : 0;
	return {
		max: t,
		remaining: Math.max(0, t - Math.max(0, e.criticals))
	};
}
function Tn(e) {
	return (typeof e == "number" || typeof e == "string" && e.trim() !== "") && Number.isFinite(Number(e));
}
//#endregion
//#region src/module/integrations/bossbar/constants.ts
var z = "bossbar", B = {
	automatic: "bossBarAutomatic",
	stacked: "bossBarStacked",
	woundsStyle: "bossBarWoundsStyle",
	prompt: "bossBarSetupPrompt"
};
//#endregion
//#region src/module/integrations/bossbar/configuration.ts
function V(e) {
	return game?.i18n.localize(`wfrp4e-compatibility-box.BossBar.${e}`) ?? e;
}
function H(e) {
	console.error(`${d} | Boss Bar integration failed.`, e), ui?.notifications?.error(V("Error"));
}
function En() {
	return {
		currentHpPath: game?.settings.get(z, "currentHpPath"),
		maxHpPath: game?.settings.get(z, "maxHpPath"),
		woundsSystem: game?.settings.get(z, "woundsSystem")
	};
}
function U() {
	return game?.settings.get("wfrp4e", "uiaCrits") === !0;
}
function Dn() {
	if (!U()) return;
	let e = game?.settings.get(z, "barStyles"), t = e.find((e) => e.id === "segmented");
	if (!(!t || e[0] === t)) return [t, ...e.filter((e) => e !== t)];
}
async function On() {
	if (!game?.ready || !game.user?.isGM || !m("bossBar")) throw Error("An active Boss Bar integration and a ready GM session are required.");
	for (let e of Object.keys(R)) if (!game.settings.settings?.has(`bossbar.${e}`)) throw Error(`Boss Bar setting ${e} is unavailable.`);
	for (let [e, t] of Object.entries(R)) await game.settings.set(z, e, t);
	await game.settings.set(d, B.stacked, !0);
	let e = Dn();
	return e && await game.settings.set(z, "barStyles", e), await game.settings.set(d, B.prompt, U() ? "uia" : "core"), ui?.notifications?.info(V("Configured")), { ...R };
}
var kn = !1;
async function An() {
	if (!game?.user?.isGM || !m("bossBar") || kn || game.users?.activeGM && game.users.activeGM.id !== game.user.id) return;
	let e = U() ? "uia" : "core";
	if (!(Sn(En()) && !Dn() || game.settings.get("wfrp4e-compatibility-box", B.prompt) === e)) {
		kn = !0;
		try {
			let t = await foundry.applications.api.DialogV2.wait({
				window: { title: V("SetupTitle") },
				position: { width: 600 },
				content: `<p>${V("SetupDescription")}</p><p>${V(U() ? "SetupUpInArms" : "SetupCore")}</p><p>${V("SetupCustomization")}</p>`,
				buttons: [
					{
						action: "configure",
						label: V("AcceptSetup"),
						default: !0
					},
					{
						action: "keep",
						label: V("Keep")
					},
					{
						action: "later",
						label: V("Later")
					}
				],
				rejectClose: !1
			});
			t === "configure" ? await On() : t === "keep" && await game.settings.set(d, B.prompt, e);
		} finally {
			kn = !1;
		}
	}
}
//#endregion
//#region src/module/api/create-module-api.ts
function jn() {
	return {
		configureBossBar: On,
		configureSplatter: xn,
		getOptionalFeatures: Ge,
		syncAllPaperDollActors: We,
		syncPaperDollArgonActor: en,
		syncPaperDollActor: T
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function Mn() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(d);
	if (!e) throw Error(`Foundry module registry entry was not found for ${d}.`);
	let t = e;
	t.api = jn();
}
//#endregion
//#region src/functions/integrations/bossbar/selection.ts
function Nn(e) {
	let t = e.filter((e) => e.enemy), n = (e, t) => e.traits.some((e) => e.trim().toLowerCase() === t), r = t.filter((e) => n(e, "boss"));
	if (r.length) return r;
	let i = t.filter((e) => e.maxWounds >= 30 && n(e, "grim") && (n(e, "leader") || n(e, "champion"))).sort((e, t) => t.maxWounds - e.maxWounds || t.weaponSkill - e.weaponSkill || t.strength - e.strength), a = i[0];
	if (!a) return [];
	let o = i.filter((e) => e.maxWounds === a.maxWounds && e.weaponSkill === a.weaponSkill && e.strength === a.strength);
	return o.length <= 2 ? o : [];
}
//#endregion
//#region src/module/integrations/bossbar/runtime.ts
function Pn() {
	return ui && Reflect.get(ui, "bossBar");
}
function Fn(e) {
	return Array.from(e.combatants).flatMap(({ actor: e, token: t }) => e ? [{
		uuid: e.uuid,
		enemy: t?.disposition === -1 && !e.hasPlayerOwner,
		traits: Array.from(e.items).filter((e) => e.type === "trait").map((e) => e.name),
		maxWounds: e.system.status?.wounds?.max ?? 0,
		weaponSkill: e.system.characteristics?.ws?.value ?? 0,
		strength: e.system.characteristics?.s?.value ?? 0
	}] : []);
}
function In(e) {
	return {
		wounds: e.system.status?.wounds?.value ?? 0,
		maxWounds: e.system.status?.wounds?.max ?? 0,
		maxCriticals: e.system.status?.criticalWounds?.max ?? 0,
		criticals: Array.from(e.items).filter((e) => e.type === "critical" && Tn(e.system?.wounds?.value)).length
	};
}
//#endregion
//#region src/module/integrations/bossbar/combat.ts
var Ln = /* @__PURE__ */ new WeakSet();
async function Rn(e) {
	if (!game?.user?.isGM || !m("bossBar") || !game.settings.get("wfrp4e-compatibility-box", B.automatic) || !e.scene || Ln.has(e)) return;
	let t = Nn(Fn(e)), n = e.scene.getFlag("bossbar", "actors") ?? [], r = new Set(n.map((e) => e.uuid)), i = game.settings.get(z, "barStyles"), a = t.filter((e) => r.has(e.uuid) ? !1 : (r.add(e.uuid), !0)).map((e) => ({
		uuid: e.uuid,
		style: i[0]?.id ?? "default",
		hideName: !1
	}));
	if (a.length) {
		Ln.add(e);
		try {
			await e.scene.setFlag(z, "actors", [...n, ...a]);
		} finally {
			Ln.delete(e);
		}
	}
}
//#endregion
//#region src/module/integrations/bossbar/critical-segments.ts
var zn = "wfrp-bossbar-segments", Bn = "http://www.w3.org/2000/svg", Vn = [
	"background",
	"bar",
	"foreground"
], Hn = [
	"bg",
	"bar",
	"fg"
];
function Un(e, t) {
	let n = Vn.map((t) => e.querySelector(`:scope > .bar-${t}`)), r = n.map((e) => e?.querySelector(":scope > img")), i = r.every((e, t) => e?.getAttribute("src")?.split(/[?#]/)[0]?.endsWith(`/bossbar/resources/matching-images/segmented/${Hn[t]}.png`)), a = t !== void 0 && i ? String(t) : void 0;
	if (e.dataset.wfrpBossbarSegments === a) return;
	e.querySelectorAll(`.${zn}`).forEach((e) => e.remove()), e.classList.toggle("wfrp-bossbar-segmented", a !== void 0);
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
		o.className = zn, o.setAttribute("aria-hidden", "true"), o.style.gridTemplateColumns = a === "0" ? "none" : `repeat(${a}, minmax(0, 1fr))`;
		for (let t = 0; t < Number(a); t++) o.append(Wn(e.ownerDocument, n.src));
		i.append(o);
	}
}
function Wn(e, t) {
	let n = e.createElementNS(Bn, "svg");
	n.setAttribute("viewBox", "829 0 787 361"), n.setAttribute("preserveAspectRatio", "xMidYMid meet");
	let r = e.createElementNS(Bn, "image");
	return r.setAttribute("href", t), r.setAttribute("width", "7967"), r.setAttribute("height", "361"), n.append(r), n;
}
//#endregion
//#region src/module/integrations/bossbar/wounds-bar.ts
function Gn(e, t) {
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
function Kn(e, t) {
	return e.find((e) => e.id === t) ?? e[0];
}
//#endregion
//#region src/module/integrations/bossbar/display.ts
function qn(e = Pn()) {
	if (!e?.element || e.id !== "boss-bar") return;
	let t = e.element;
	t.classList.add("wfrp4e-compatibility-box-bossbar");
	let n = U() && game?.settings.get("wfrp4e-compatibility-box", B.stacked) === !0 && Sn(En()), r = game?.settings.get(z, "barStyles"), i = game?.settings.get(d, B.woundsStyle), a = Kn(r, i);
	for (let r of t.querySelectorAll(".bar-list-item")) {
		let t = e.bars.find((e) => e.actor.uuid === r.dataset.uuid)?.actor;
		if (!t) continue;
		let i = r.querySelector(".boss-bar-container:not(.wfrp-bossbar-wounds)");
		if (!i) continue;
		if (!n || !a) {
			Un(i), r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), i.dataset.wfrpBossbarPrimary && (i.style.removeProperty("--bar-percent"), i.removeAttribute("role"), i.removeAttribute("aria-label"), i.removeAttribute("aria-valuenow"), i.removeAttribute("aria-valuemax"), i.removeAttribute("aria-valuemin"), delete i.dataset.wfrpBossbarPrimary);
			continue;
		}
		let o = In(t), s = wn(o);
		Un(i, s.max), i.dataset.wfrpBossbarPrimary = "true", i.style.setProperty("--bar-percent", `${Cn(s.remaining, s.max)}%`), Jn(i, V("CriticalCapacity"), s.remaining, s.max);
		let c = r.querySelector(".wfrp-bossbar-wounds");
		c?.dataset.style !== a.id && (r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), c = Gn(r.ownerDocument, a), c.dataset.wfrpBossbarExtra = "", c.dataset.style = a.id, i.before(c)), c && (c.style.setProperty("--bar-percent", `${Cn(o.wounds, o.maxWounds)}%`), c.classList.toggle("wfrp-bossbar-threat", o.wounds <= 0), Jn(c, V("Wounds"), Math.max(0, o.wounds), o.maxWounds));
	}
}
function Jn(e, t, n, r) {
	e.setAttribute("role", "progressbar"), e.setAttribute("aria-label", t), e.setAttribute("aria-valuemin", "0"), e.setAttribute("aria-valuemax", String(Math.max(0, r))), e.setAttribute("aria-valuenow", String(Math.min(n, Math.max(0, r))));
}
var Yn = !1;
function Xn() {
	Yn || (Yn = !0, queueMicrotask(() => {
		Yn = !1;
		let e = Pn();
		if (e?.element?.isConnected) try {
			e.updateBars(), qn(e);
		} catch (e) {
			H(e);
		}
	}));
}
//#endregion
//#region src/module/integrations/bossbar/settings.ts
function Zn() {
	if (game) {
		for (let e of ["automatic", "stacked"]) game.settings.register(d, B[e], {
			name: `${d}.BossBar.Settings.${e}.Name`,
			hint: `${d}.BossBar.Settings.${e}.Hint`,
			config: !0,
			default: !0,
			scope: "world",
			type: Boolean
		});
		game.settings.register(d, B.woundsStyle, {
			name: `${d}.BossBar.Settings.woundsStyle.Name`,
			hint: `${d}.BossBar.Settings.woundsStyle.Hint`,
			config: !0,
			default: "default-grass",
			scope: "world",
			type: String,
			choices: () => Object.fromEntries((game?.settings.get(z, "barStyles")).map((e) => [e.id, e.name]))
		}), game.settings.register(d, B.prompt, {
			name: "Boss Bar setup choice",
			hint: "",
			config: !1,
			default: "",
			scope: "world",
			type: String
		});
	}
}
function Qn(e) {
	if (!game?.user?.isGM) return;
	let t = e.querySelector(`[name="${z}.currentHpPath"]`)?.closest(".form-group");
	if (!t || e.querySelector("[data-wfrp-bossbar-setup]")) return;
	let n = e.ownerDocument.createElement("div");
	n.className = "form-group", n.dataset.wfrpBossbarSetup = "";
	let r = e.ownerDocument.createElement("button");
	r.type = "button", r.textContent = V("Configure"), r.addEventListener("click", async () => {
		r.disabled = !0;
		try {
			let t = await On();
			for (let [n, r] of Object.entries(t)) {
				let t = e.querySelector(`[name="bossbar.${n}"]`);
				t && (typeof r == "boolean" ? t.checked = r : t.value = r);
			}
			let n = e.querySelector(`[name="${d}.${B.stacked}"]`);
			n && (n.checked = !0);
		} catch (e) {
			H(e);
		} finally {
			r.disabled = !1;
		}
	}), n.append(r), t.insertAdjacentElement("beforebegin", n);
}
//#endregion
//#region src/module/integrations/bossbar/register-integration.ts
function $n() {
	if (f("bossbar") && !(!m("bossBar") || game?.system.id !== "wfrp4e")) {
		Zn(), Hooks.once("ready", () => void An().catch(H)), Hooks.on("combatStart", (e) => void Rn(e).catch(H)), Hooks.on("renderBossBar", (e) => qn(e)), Hooks.on("renderSettingsConfig", (e, t) => {
			t instanceof HTMLElement && Qn(t);
		});
		for (let e of [
			"updateActor",
			"createItem",
			"updateItem",
			"deleteItem",
			"createActiveEffect",
			"updateActiveEffect",
			"deleteActiveEffect"
		]) Hooks.on(e, Xn);
		Hooks.on("updateSetting", (e) => {
			let t = e.key;
			[
				"bossbar.currentHpPath",
				"bossbar.maxHpPath",
				"bossbar.woundsSystem"
			].includes(t) && Pn()?.render(!0).catch(H), (t.startsWith("bossbar.") || t.startsWith("wfrp4e-compatibility-box.bossBar") || t === "wfrp4e.uiaCrits") && (Xn(), t === "wfrp4e.uiaCrits" && An().catch(H));
		});
	}
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/argon-logic.ts
var er = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function W(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function tr(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function nr(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function rr(e) {
	return e.trim().toLowerCase();
}
function ir(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function ar(e) {
	return e.type === "trait" ? (nr(e), e.rollable && !e.disabled && er.has(e.traitBaseName.toLowerCase())) : !1;
}
function or(e) {
	return e.type === "weapon" || ar(e);
}
function sr(e) {
	return e.type === "weapon";
}
function cr(e) {
	return W(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function lr(e) {
	return W(e), e.advances > 0;
}
function ur(e, t) {
	return e.forEach(W), t === "basic" ? e.filter((e) => !cr(e)).map((e) => e.id) : t === "advanced" ? e.filter(cr).map((e) => e.id) : t === "trained" ? e.filter(lr).map((e) => e.id) : e.map((e) => e.id);
}
function dr(e, t) {
	return e.forEach(tr), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function fr(e) {
	return e.filter((e) => e.type === "weapon" || ar(e)).map((e) => e.id);
}
function pr(e) {
	return e.filter((e) => e.type === "trait" ? (nr(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function mr(e, t) {
	return e.forEach(W), t.flatMap((t) => {
		let n = rr(t.name), r = e.find((e) => rr(e.name) === n);
		return !r || t.trained && !lr(r) ? [] : [r.id];
	});
}
function hr(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function gr(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function _r(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => gr(e.name, t))).map((e) => e.id) : [];
}
function vr(e) {
	let t = [];
	return (e.type === "weapon" || ar(e)) && t.push({
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
function yr(e, t) {
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
var br = "argonCombatItemPatterns", xr = "*Draught*, *Potion*";
function G(e, t) {
	let n = p[t];
	me(t) && e.register(d, n.settingKey, {
		config: !0,
		default: !0,
		hint: `${d}.Settings.Features.${t}.Hint`,
		name: `${d}.Settings.Features.${t}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function Sr(e) {
	me("argonCombatHud") && e.register(d, br, {
		config: !0,
		default: xr,
		hint: `${d}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${d}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: at,
		scope: "world",
		type: String
	});
}
function Cr() {
	if (!game) throw Error(`${d} | Foundry game is unavailable during settings registration.`);
	G(game.settings, "argonCombatHud"), G(game.settings, "bossBar"), G(game.settings, "paperDoll"), G(game.settings, "paperDollArgonBridge"), Sr(game.settings);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/actor-flags.ts
var wr = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function Tr(e, t) {
	return e.flags?.[et]?.[t];
}
function Er(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? Tr(e, t);
}
async function Dr(e) {
	let t = {};
	for (let n of wr) {
		if (e.getFlag("wfrp4e-compatibility-box", n) !== void 0) continue;
		let r = Tr(e, n);
		r !== void 0 && (t[`flags.${d}.${n}`] = r);
	}
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/argon-helpers.ts
function Or(e, t) {
	if (typeof e != "object" || !e) throw Error(`${d} | ${t} must be an object.`);
	return e;
}
function K(e, t) {
	if (typeof e != "string" || !e.trim()) throw Error(`${d} | ${t} must be a non-empty string.`);
	return e;
}
function q(e, t) {
	if (typeof e != "boolean") throw Error(`${d} | ${t} must be a boolean.`);
	return e;
}
function kr(e, t) {
	if (!Number.isNumeric(e)) throw Error(`${d} | ${t} must be numeric.`);
	return Number(e);
}
function Ar(e) {
	return e == null || e === "" ? null : kr(e, "item quantity");
}
function jr(e, t, n, r) {
	let i = Er(e, t);
	if (i === void 0) return r;
	if (!n.includes(i)) throw Error(`${d} | Argon actor flag ${$e}.${t} has invalid value ${String(i)}.`);
	return i;
}
function Mr(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = q(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function J(e, t = !1) {
	let n = Or(e, "Argon item"), r = K(n.type, "Argon item type"), i = K(n.name, `${r} item name`), a = {
		id: K(n.id, `${r} ${i} id`),
		name: i,
		quantity: Ar(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = K(n.advanced?.value, `${i} advanced classification`), a.grouped = K(n.grouped?.value, `${i} grouped classification`), a.advances = kr(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = K(n.lore?.value, `${i} lore`), a.memorized = q(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = q(n.system?.disabled, `${i} disabled state`), a.rollable = q(n.rollable?.value, `${i} rollable state`), a.traitBaseName = ir(i)), t && Mr(a, n, r), a;
}
function Y(e) {
	return [...e].map((e) => J(e));
}
function X(e, t) {
	let n = new Map([...e].map((e) => [e.id, e]));
	return t.map((e) => {
		let t = n.get(e);
		if (!t) throw Error(`${d} | Selected Argon item ${e} is no longer available.`);
		return t;
	});
}
function Nr(e) {
	return vr(J(e, !0));
}
function Pr(e) {
	let t = jr(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return X(n, ur(Y(n), t));
}
function Fr(e) {
	let t = jr(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return X(n, dr(Y(n), t));
}
function Ir(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return X(t, fr(Y(t)));
}
function Lr(e) {
	let t = [...e.itemTypes.trait];
	return X(t, pr(Y(t)));
}
function Rr(e) {
	let t = rt.map((e) => ({
		...e,
		type: "characteristic"
	})), n = it.map((e) => ({
		name: zr(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = X(r, mr(Y(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function zr({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = Wr(`NAME.${e}`, t);
	return n ? `${i} (${Wr(n, r)})` : i;
}
function Br(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = hr(String(t)), r = [...e.items];
	return X(r, _r(Y(r), n));
}
function Vr(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function Hr(e) {
	return or(J(e));
}
function Ur(e) {
	return sr(J(e));
}
function Wr(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/integrations/enhancedcombathud/buttons.ts
function Gr(e) {
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
				details: Nr(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = Vr(this.item);
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
			let e = Fr(this.actor), t = Ir(this.actor), s = Lr(this.actor), c = Rr(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), ee = Br(this.actor), l = [
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
				icon: `${E}/dodging.webp`
			})), ee.length && l.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: ee,
				icon: `${E}/drink-me.webp`,
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
function Kr() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!m("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/movement.ts
function Z(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function qr(e, t, n) {
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
function Jr(e) {
	return Z(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/panels.ts
function Yr(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function Xr(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function Zr(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return tt;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await Dr(this.actor), await super._onConfigure(e);
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
			let e = nt.map((e) => {
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
			}), n = Pr(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return Yr(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return Yr(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return Xr(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += Yr(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = qr(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${Jr(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${Jr(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: Jr(t.bubbleDistance),
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
function Qr(e) {
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
			if (!Hr(n) || n.actor !== this.actor) throw Error(`${d} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let r = e.currentTarget.dataset.set, i = e.currentTarget.dataset.slot;
			if (!r || !i) throw Error(`${d} | Argon weapon-set drop target has no set or slot identifier.`);
			let a = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			a[r] ??= {}, a[r][i] = n.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", a), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!Er(this.actor, "switchEquip")) return;
			let n = yr(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(Ur).map((e) => ({
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
function $r() {
	f("enhancedcombathud") && m("argonCombatHud") && (Kr(), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = Gr(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = Zr(e), a = Qr(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	}));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/panels.ts
function ei(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = Gr(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return Qt(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/integrations/paper-doll-argon/report-bridge-error.ts
function ti(e) {
	return e instanceof Error ? e.message : String(e);
}
function ni(e, t) {
	Ne(`${pe}: ${e}. ${ti(t)}`, t);
}
function ri(e, t) {
	e.catch((e) => ni(t, e));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/register-integration.ts
function ii() {
	return m("paperDoll") && m("argonCombatHud") && m("paperDollArgonBridge");
}
function ai(e, t) {
	!ii() || !_(e) || $t(t) && ri(en(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function oi() {
	f("fvtt-paper-doll-ui") && f("enhancedcombathud") && ii() && (Hooks.on("argonInit", (e) => {
		let { PaperDollQuickItemsPanel: t } = ei(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", ai));
}
//#endregion
//#region src/module/integrations/splatter/configuration-menu.ts
var si = `${d}.Splatter.Configuration`;
function ci(e) {
	return game?.i18n.localize(`${si}.${e}`) ?? e;
}
var li = class extends foundry.applications.api.ApplicationV2 {
	async render(e) {
		try {
			await xn(), ui?.notifications?.info(ci("Success"));
		} catch (e) {
			Ne(ci("Error"), e);
		}
		return this;
	}
}, di = `${d}.Splatter.Configuration`;
function fi() {
	if (f("splatter")) {
		if (!game) throw Error(`${d} | Foundry game is unavailable during Splatter registration.`);
		game.settings.registerMenu(d, "configureSplatter", {
			hint: `${di}.Hint`,
			icon: "fa-solid fa-droplet",
			label: `${di}.Button`,
			name: `${di}.Name`,
			restricted: !0,
			type: li
		});
	}
}
//#endregion
//#region src/module/patches/wfrp4e/repair-data-model-migrations.ts
var pi = /* @__PURE__ */ new WeakSet();
function mi(e) {
	let t = e.migrateData;
	return typeof t != "function" || pi.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, pi.add(e), !0);
}
function hi() {
	return [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(mi(t)), 0);
}
//#endregion
//#region src/module/patches/wfrp4e/repair-roll-modes.ts
function gi() {
	let e = game?.wfrp4e?.config, t = CONFIG.ChatMessage.modes;
	return !e || !t ? !1 : (e.rollModes = foundry.utils.deepClone(t), !0);
}
//#endregion
//#region src/functions/patches/wfrp4e/chat-card-references.ts
function Q(e) {
	return typeof e == "object" && e ? e : {};
}
function $(e) {
	return typeof e == "string" ? e : "";
}
function _i(e) {
	let t = Q(e);
	return {
		kind: "speaker",
		actor: $(t.actor),
		scene: $(t.scene),
		token: $(t.token)
	};
}
function vi(e) {
	return _i(Q(Q(e).context).speaker);
}
function yi(e) {
	let t = e.system ?? {};
	switch (e.type) {
		case "test": return [vi(t.testData)];
		case "opposed": {
			let e = Q(t.opposedTestData);
			return [vi(e.attackerTestData), vi(e.defenderTestData)];
		}
		case "magic": {
			let e = Q(t.sourceData), n = [{
				kind: "uuid",
				uuid: $(e.actor)
			}];
			return e.test && n.push({
				kind: "message",
				id: $(e.test),
				required: !1
			}), n;
		}
		case "handler": {
			let e = Q(t.opposedData), n = [{
				kind: "message",
				id: $(e.attackerMessageId),
				required: !0
			}];
			return e.targetSpeakerData && n.push(_i(e.targetSpeakerData)), e.defenderMessageId && n.push({
				kind: "message",
				id: $(e.defenderMessageId),
				required: !0
			}), n;
		}
		default: return [];
	}
}
//#endregion
//#region src/module/patches/wfrp4e/chat-card-text.ts
function bi(e) {
	let t = new DOMParser().parseFromString(e, "text/html").body;
	for (let e of t.querySelectorAll("script, style, template, button, input, select, textarea, .chat-button, a[data-action], [role='button'], .dice-tooltip, .applied-breakdown, .secret:not(.revealed), [hidden], [aria-hidden='true']")) e.remove();
	for (let e of t.querySelectorAll("img")) e.replaceWith(t.ownerDocument.createTextNode(e.alt ? ` ${e.alt} ` : ""));
	for (let e of t.querySelectorAll("br, p, div, li, tr, h1, h2, h3, h4, h5, h6")) e.append(t.ownerDocument.createTextNode("\n"));
	for (let e of t.querySelectorAll("td, th")) e.append(t.ownerDocument.createTextNode(" "));
	return (t.textContent ?? "").split("\n").map((e) => e.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}
function xi(e) {
	let t = document.createElement("p");
	return t.textContent = e, t.style.whiteSpace = "pre-line", t;
}
//#endregion
//#region src/module/patches/wfrp4e/render-orphaned-chat-cards.ts
var Si = /* @__PURE__ */ new WeakSet();
function Ci(e) {
	if (!game) return !1;
	switch (e.kind) {
		case "speaker": return e.scene && e.token ? !!game.scenes.get(e.scene)?.tokens.get(e.token)?.actor : !!(e.actor && game.actors.get(e.actor));
		case "uuid": return !!(e.uuid && fromUuidSync(e.uuid)?.documentName === "Actor");
		case "message": {
			let t = game.messages.get(e.id);
			return t ? t._source.type === "test" ? yi(t._source).every(Ci) : !1 : !e.required;
		}
	}
}
async function wi(e, t) {
	let n = e.toObject(), r = e.visible && e.isContentVisible, i = r ? bi(n.content) : "", a = new foundry.documents.ChatMessage({
		...n,
		type: "base",
		system: {},
		flags: {},
		content: xi(i).outerHTML
	}), o = await a.renderHTML(t), s = o.querySelector(".message-content");
	if (s) {
		let e = r && a.isContentVisible ? i : bi(s.innerHTML);
		s.replaceChildren(xi(e));
	}
	return o.addEventListener("contextmenu", (e) => e.stopPropagation(), { capture: !0 }), o;
}
function Ti() {
	let e = CONFIG.ChatMessage.documentClass?.prototype;
	if (!e || Si.has(e)) return !1;
	let t = e.renderHTML;
	return e.renderHTML = function(e) {
		return yi(this._source).some((e) => !Ci(e)) ? wi(this, e) : t.call(this, e);
	}, Si.add(e), !0;
}
//#endregion
//#region src/module/patches/wfrp4e/guard-actorless-token-ruler.ts
var Ei = /* @__PURE__ */ new WeakSet(), Di = /* @__PURE__ */ new WeakSet();
function Oi() {
	let e = CONFIG.Token?.rulerClass?.prototype, t = foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	if (!e || !t || e === t || !Object.prototype.isPrototypeOf.call(t, e) || typeof e._getSegmentStyle != "function" || typeof t._getSegmentStyle != "function" || Ei.has(e)) return !1;
	let n = e._getSegmentStyle, r = t._getSegmentStyle;
	return e._getSegmentStyle = function(...e) {
		if (this.token.actor) return n.apply(this, e);
		if (!Di.has(this.token)) {
			Di.add(this.token);
			let { uuid: e, actorId: t, actorLink: n } = this.token.document;
			console.warn("WFRP4e Compatibility Box | Token has no actor; using the core ruler style.", {
				tokenUuid: e,
				actorId: t,
				actorLink: n,
				worldActorExists: !!(t && game?.actors.get(t))
			});
		}
		return r.apply(this, e);
	}, Ei.add(e), !0;
}
//#endregion
//#region src/module/patches/wfrp4e/apply-compatibility-patches.ts
function ki() {
	game?.system.id === "wfrp4e" && (gi(), hi(), Ti(), Oi());
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function Ai() {
	Hooks.once("init", () => {
		ki(), Cr(), Mn(), $n(), $r(), Wt(), oi(), fi();
	});
}
//#endregion
//#region src/main.ts
Ai();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map