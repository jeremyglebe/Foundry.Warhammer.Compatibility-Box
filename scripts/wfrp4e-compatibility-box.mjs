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
function be(e) {
	return g(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
//#endregion
//#region src/module/patches/paper-doll/wfrp-equipment.ts
var xe = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function Se(e) {
	if (!g(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function Ce(e, t) {
	let n = Se(e)[t];
	if (n === void 0) return null;
	if (!g(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function we(e, t) {
	let n = Ce(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function y(e) {
	return Ce(e, "equipped");
}
function Te(e) {
	return y(e) !== null;
}
function Ee(e) {
	let t = Se(e).AP;
	if (!g(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(xe.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function De(e) {
	if (!g(e.system) || !g(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function b(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: we(e, "equipped"),
		id: e.id,
		name: e.name,
		uuid: e.uuid
	};
	return e.type === "armour" ? {
		...t,
		armourPoints: Ee(e),
		type: "armour"
	} : {
		...t,
		offhand: we(e, "offhand"),
		twoHanded: we(e, "twohanded"),
		type: "weapon"
	};
}
function Oe(e, t) {
	return ve(e.type, b(e), t);
}
async function ke(e, t, n) {
	let r = b(t), i = he(r, r?.equipped ?? y(t), n, r?.type === "weapon" ? De(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function Ae(e) {
	let t = ge(b(e)?.equipped ?? y(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/notifications/notify-user.ts
function je(e, t) {
	t === void 0 ? console.error(e) : console.error(e, t);
}
function Me(e, t) {
	je(e, t), ui?.notifications?.error(e);
}
//#endregion
//#region src/module/patches/paper-doll/report-paper-doll-error.ts
function Ne(e) {
	return e instanceof Error ? e.message : String(e);
}
function x(e, t) {
	Me(`${pe}: ${e}. ${Ne(t)}`, t);
}
function S(e, t) {
	e.catch((e) => x(t, e));
}
//#endregion
//#region src/module/patches/paper-doll/synchronize-paper-doll.ts
var C = "fvtt-paper-doll-ui", w = "slots", T = /* @__PURE__ */ new Map(), Pe = /* @__PURE__ */ new Set();
function Fe(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Ie(e) {
	let t = e.getFlag(C, w);
	if (t === void 0) return {};
	if (!u(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Fe(t);
}
function Le() {
	let n = game?.settings.get(C, "globalConfig"), r = new Set([...e, ...t]);
	if (g(n) && Object.keys(n).length === 0) return r;
	if (!g(n) || !g(n.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let i = Object.values(n.SLOTS);
	if (!i.every(g)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let a = new Set(i.flatMap((e) => Object.keys(e)));
	return a.size ? a : r;
}
function Re(e) {
	return T.has(e.uuid);
}
function ze(e) {
	if (!_(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function Be() {
	if (!game || game.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function Ve(e) {
	let t = Ie(e), n = Array.from(e.items), r = n.map(b).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: y(e),
		uuid: e.uuid
	})), o = ce(t, ie(r, De(e)), i, Le(), a);
	return le(t, o) ? "unchanged" : (await e.setFlag(C, w, o), "synchronized");
}
async function E(e) {
	ze(e), Be();
	let t = e;
	if (!v(t) || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !h("paperDoll")) return "unavailable";
	let n = T.get(t.uuid);
	if (n) return await n, E(t);
	let r = Ve(t).finally(() => {
		T.get(t.uuid) === r && T.delete(t.uuid);
	});
	return T.set(t.uuid, r), r;
}
function He(e) {
	v(e) && (Pe.has(e.uuid) || (Pe.add(e.uuid), queueMicrotask(() => {
		Pe.delete(e.uuid), S(E(e), `could not synchronize equipped items for ${e.uuid}`);
	})));
}
async function Ue() {
	return Be(), Promise.all(Array.from(game.actors).filter(v).map(E));
}
//#endregion
//#region src/module/settings/get-optional-feature-statuses.ts
function We() {
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
var Ge = ["TRINKET", "WRIST_RIGHT"];
function Ke(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function qe(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Ge) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(Ke)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function Je(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function Ye({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function Xe(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/constants.ts
var Ze = "enhancedcombathud", Qe = d, $e = "enhancedcombathud-wfrp4e", et = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", D = "modules/enhancedcombathud/icons", tt = [
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
], nt = [{
	key: "ws",
	icon: `${D}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${D}/bolt-spell-cast.webp`
}], rt = [
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
async function it() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/functions/patches/paper-doll/find-slot-changes.ts
function at(e, t, n) {
	return e[t]?.[n] ?? null;
}
function ot(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = at(e, i, a), o = at(t, i, a);
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
var st = Symbol.for("paper-doll-wfrp4e.equipped-state");
function ct() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function lt(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function ut(e) {
	if (!g(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function dt() {
	return Promise.resolve();
}
function ft() {
	let e = ct(), t = e?.equip, n = globalThis.fromUuid;
	if (lt(e, t, n), e[st] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!be(a) || _(this.actor) && !v(this.actor)) return r.call(this, e, t, i);
		let o = ut(i);
		if (!t) return dt();
		if (!v(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!Oe(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await ke(this.actor, a, o);
		} catch (e) {
			x(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await E(this.actor);
			} catch (e) {
				x(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[st] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/enforce-paper-doll-slot-types.ts
var pt = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function mt() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function ht(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function gt() {
	let e = mt(), t = e?.filterItems;
	if (ht(e, t), e[pt] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => be(e) && Oe(e, t));
	}, e[pt] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/register-slot-tooltips.ts
var _t = ".paper-doll .paper-doll-slot", O = `data-${d}-drag-tooltip`, k = `data-${d}-tooltip`, vt = `data-${d}-original-tooltip`, yt = {
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
}, bt = !1;
function xt(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(_t);
	return t?.closest(".paper-doll") ? t : null;
}
function St() {
	document.querySelectorAll(`[${k}]`).forEach((e) => {
		let t = e.getAttribute(vt);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(k), e.removeAttribute(vt);
	});
}
function Ct() {
	document.querySelectorAll(_t).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(O, t), e.removeAttribute("data-tooltip"));
	});
}
function wt() {
	document.querySelectorAll(`[${O}]`).forEach((e) => {
		let t = e.getAttribute(O);
		t && (e.dataset.tooltip = t), e.removeAttribute(O);
	});
}
function Tt(e) {
	if (bt || e.hasAttribute(k)) return;
	let t = yt[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(vt, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(k, "");
}
function Et(e) {
	let t = xt(e.target);
	t && Tt(t);
}
function Dt() {
	bt = !0, St(), Ct();
}
function Ot() {
	bt = !1, wt();
}
function kt() {
	document.addEventListener("pointerover", Et, !0), document.addEventListener("dragstart", Dt, !0), document.addEventListener("dragend", Ot, !0);
}
//#endregion
//#region src/module/patches/paper-doll/register-paper-doll-hooks.ts
var A = /* @__PURE__ */ new Map();
function j() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && h("paperDoll");
}
function At(e) {
	if (!g(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!g(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[C];
	return g(n) ? "slots" in n ? u(n.slots) ? {
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
function jt(e) {
	let t = At(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function Mt(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function Nt(e, t) {
	let n = A.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), A.set(e.uuid, n);
}
function Pt(e) {
	if (!g(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function Ft(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (x(n, AggregateError(r, n)), await E(e));
}
function It(e, t, n) {
	if (!j() || !v(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!g(i) || typeof i.item != "string") continue;
		let t = Pt(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = Mt(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!Oe(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(ke(e, n, t));
	}
	r.length && S(Ft(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function Lt(e, t) {
	if (!j() || !v(e) || Re(e)) return;
	let n = jt(t);
	if (!n) return;
	let r = e.getFlag(C, w);
	if (r !== void 0) {
		if (!u(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of ot(r, n)) {
			if (!t.from) continue;
			let n = Mt(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && Nt(e, n.uuid);
		}
	}
}
function Rt(e, t) {
	if (!j() || !v(e) || !jt(t)) return;
	let n = A.get(e.uuid);
	A.delete(e.uuid), n?.size && S(Ft(e, Array.from(n, (t) => {
		let n = Mt(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(Ae), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function zt(e) {
	!j() || !be(e) || e.type !== "armour" && e.type !== "weapon" && !Te(e) || v(e.parent) && He(e.parent);
}
function Bt() {
	kt(), Hooks.on("paper-doll-swap", It), Hooks.on("preUpdateActor", Lt), Hooks.on("updateActor", Rt), Hooks.on("updateItem", zt), Hooks.once("ready", () => {
		if (j()) {
			try {
				gt(), ft();
			} catch (e) {
				throw x("could not initialize the required Paper Doll integration", e), e;
			}
			S(Ue(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/integrations/fvtt-paper-doll-ui/register-integration.ts
var Vt = "fvtt-paper-doll-ui";
function Ht() {
	f("fvtt-paper-doll-ui") && h("paperDoll") && Bt();
}
//#endregion
//#region src/module/integrations/paper-doll-argon/bridge-runtime.ts
var Ut = "activeWeaponSet", M = "slots", Wt = "weaponSets";
function Gt(e) {
	let t = e.getFlag(Vt, M);
	if (t === void 0) return {};
	if (!u(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function Kt(e) {
	let t = e.getFlag(Ze, Ut);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function qt(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function Jt(e) {
	let t = e.getFlag(Ze, Wt);
	if (t === void 0) return {};
	if (!g(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !g(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: qt(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: qt(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function Yt(e, t) {
	let n = Jt(e), r = Ye({
		activeSetId: Kt(e),
		mainHand: De(e),
		mainSlots: Je(t),
		weaponSets: n
	}), i = !Xe(n, r);
	return i && await e.setFlag(Ze, Wt, r), await it(), i ? "synchronized" : "unchanged";
}
function Xt(e) {
	if (!_(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return qe(Gt(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function Zt(e) {
	if (!g(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!g(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[Vt];
	if (!g(n) || !(M in n)) return null;
	let r = n[M];
	if (!u(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function Qt(e) {
	if (!_(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return !v(e) || !h("paperDoll") || !h("argonCombatHud") || !h("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", M) === void 0 ? (await it(), "unchanged") : Yt(e, Gt(e));
}
//#endregion
//#region src/functions/integrations/splatter/configuration.ts
var $t = "details.species.value", en = "#a51414d8", tn = "#7e1717dc", nn = "#b31f18d8", rn = "#b01832d8", an = "#861a24d8", on = "#541e1ed8", N = "#6a0e0ed8", P = "#6f3518e0", F = "#621010e0", sn = "#771616dc", I = "#440707d8", L = "#14101490", R = "#0b080de8", cn = [
	["Jabberslythe", "#78d61be8"],
	["Chameleon Skink", N],
	["Kroxigor", N],
	["Saurus", N],
	["Suarus", N],
	["Skink", N],
	["Slann", N],
	["Reptile", N],
	["Ogre Gorger", on],
	["Gorger", on],
	["Orca", en],
	["Bloodletter", R],
	["Chaos Fury", R],
	["Blue Horror", R],
	["Pink Horror", R],
	["Nurgling", R],
	["Greater Daemon", R],
	["Daemon Prince", R],
	["Lesser Demon", R],
	["Daemon", R],
	["Demon", R],
	["Rat Ogre", sn],
	["Wolf Rat", sn],
	["Skaven", sn],
	["Bray Shaman", F],
	["Beastman", F],
	["Beastmen", F],
	["Bestigor", F],
	["Minotaur", F],
	["Pestigor", F],
	["Razorgor", F],
	["Ungor", F],
	["Gor", F],
	["Greenskin", P],
	["Forest Goblin", P],
	["Night Goblin", P],
	["Hobgoblin", P],
	["Goblin", P],
	["Black Orc", P],
	["Orc", P],
	["Snotling", P],
	["Squig", P],
	["Skeleton", L],
	["Ghost", L],
	["Tomb Banshee", L],
	["Banshee", L],
	["Undead", I],
	["Vampire", I],
	["Ghoul", I],
	["Wight", I],
	["Liche", I],
	["Maurngul", I],
	["Mourngul", I],
	["Human", en],
	["Dwarf", tn],
	["Halfling", nn],
	["High Elf", rn],
	["helf", rn],
	["Wood Elf", an],
	["welf", an],
	["Ogre", on]
];
function ln() {
	let e = {};
	for (let [t, n] of cn) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function un(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function dn(e = {}) {
	let t = ln();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? en;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function fn(e, t = {}) {
	let n = un(e);
	for (let [e, r] of Object.entries(dn(t))) n[e] ??= r;
	return n;
}
//#endregion
//#region src/module/integrations/splatter/constants.ts
var z = "splatter", pn = "useBloodsheet", mn = "BloodSheetData", hn = "creatureType", gn = [
	mn,
	hn,
	pn
];
function _n() {
	return game?.wfrp4e?.config.species ?? {};
}
function vn() {
	let e = game?.settings.settings;
	if (e) {
		for (let t of gn) if (!e.has(`splatter.${t}`)) throw Error(`Splatter setting ${t} is unavailable.`);
	}
}
async function yn() {
	if (!game) throw Error("Foundry game is unavailable while configuring Splatter.");
	if (!game.ready) throw Error("Foundry must finish loading before Splatter can be configured.");
	if (!f("splatter")) throw Error("Splatter must be active before it can be configured.");
	if (!game.user?.isGM) throw Error("Only a gamemaster can change Splatter's world settings.");
	vn();
	let e = fn(game.settings.get(z, mn), _n());
	return await game.settings.set(z, mn, e), await game.settings.set(z, hn, $t), await game.settings.set(z, pn, !0), {
		automaticBloodColors: !0,
		bloodColorCount: Object.keys(e).length,
		speciesPath: $t
	};
}
//#endregion
//#region src/functions/integrations/bossbar/health.ts
var B = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
};
function bn(e) {
	return Object.entries(B).every(([t, n]) => e[t] === n);
}
function xn(e, t) {
	return !Number.isFinite(e) || !Number.isFinite(t) || t <= 0 ? 0 : Math.min(100, Math.max(0, 100 * e / t));
}
function Sn(e) {
	let t = Number.isFinite(e.maxCriticals) ? Math.max(0, Math.floor(e.maxCriticals)) : 0;
	return {
		max: t,
		remaining: Math.max(0, t - Math.max(0, e.criticals))
	};
}
function Cn(e) {
	return (typeof e == "number" || typeof e == "string" && e.trim() !== "") && Number.isFinite(Number(e));
}
//#endregion
//#region src/module/integrations/bossbar/constants.ts
var V = "bossbar", H = {
	automatic: "bossBarAutomatic",
	stacked: "bossBarStacked",
	woundsStyle: "bossBarWoundsStyle",
	prompt: "bossBarSetupPrompt"
};
//#endregion
//#region src/module/integrations/bossbar/configuration.ts
function U(e) {
	return game?.i18n.localize(`wfrp4e-compatibility-box.BossBar.${e}`) ?? e;
}
function W(e) {
	console.error(`${d} | Boss Bar integration failed.`, e), ui?.notifications?.error(U("Error"));
}
function wn() {
	return {
		currentHpPath: game?.settings.get(V, "currentHpPath"),
		maxHpPath: game?.settings.get(V, "maxHpPath"),
		woundsSystem: game?.settings.get(V, "woundsSystem")
	};
}
function G() {
	return game?.settings.get("wfrp4e", "uiaCrits") === !0;
}
function Tn() {
	if (!G()) return;
	let e = game?.settings.get(V, "barStyles"), t = e.find((e) => e.id === "segmented");
	if (!(!t || e[0] === t)) return [t, ...e.filter((e) => e !== t)];
}
async function En() {
	if (!game?.ready || !game.user?.isGM || !h("bossBar")) throw Error("An active Boss Bar integration and a ready GM session are required.");
	for (let e of Object.keys(B)) if (!game.settings.settings?.has(`bossbar.${e}`)) throw Error(`Boss Bar setting ${e} is unavailable.`);
	for (let [e, t] of Object.entries(B)) await game.settings.set(V, e, t);
	await game.settings.set(d, H.stacked, !0);
	let e = Tn();
	return e && await game.settings.set(V, "barStyles", e), await game.settings.set(d, H.prompt, G() ? "uia" : "core"), ui?.notifications?.info(U("Configured")), { ...B };
}
var Dn = !1;
async function On() {
	if (!game?.user?.isGM || !h("bossBar") || Dn || game.users?.activeGM && game.users.activeGM.id !== game.user.id) return;
	let e = G() ? "uia" : "core";
	if (!(bn(wn()) && !Tn() || game.settings.get("wfrp4e-compatibility-box", H.prompt) === e)) {
		Dn = !0;
		try {
			let t = await foundry.applications.api.DialogV2.wait({
				window: { title: U("SetupTitle") },
				position: { width: 600 },
				content: `<p>${U("SetupDescription")}</p><p>${U(G() ? "SetupUpInArms" : "SetupCore")}</p><p>${U("SetupCustomization")}</p>`,
				buttons: [
					{
						action: "configure",
						label: U("AcceptSetup"),
						default: !0
					},
					{
						action: "keep",
						label: U("Keep")
					},
					{
						action: "later",
						label: U("Later")
					}
				],
				rejectClose: !1
			});
			t === "configure" ? await En() : t === "keep" && await game.settings.set(d, H.prompt, e);
		} finally {
			Dn = !1;
		}
	}
}
//#endregion
//#region src/module/api/create-module-api.ts
function kn() {
	return {
		configureBossBar: En,
		configureSplatter: yn,
		getOptionalFeatures: We,
		syncAllPaperDollActors: Ue,
		syncPaperDollArgonActor: Qt,
		syncPaperDollActor: E
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function An() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(d);
	if (!e) throw Error(`Foundry module registry entry was not found for ${d}.`);
	let t = e;
	t.api = kn();
}
//#endregion
//#region src/functions/integrations/bossbar/selection.ts
function jn(e) {
	let t = e.filter((e) => e.enemy), n = (e, t) => e.traits.some((e) => e.trim().toLowerCase() === t), r = t.filter((e) => n(e, "boss"));
	if (r.length) return r;
	let i = t.filter((e) => e.maxWounds >= 30 && n(e, "grim") && (n(e, "leader") || n(e, "champion"))).sort((e, t) => t.maxWounds - e.maxWounds || t.weaponSkill - e.weaponSkill || t.strength - e.strength), a = i[0];
	if (!a) return [];
	let o = i.filter((e) => e.maxWounds === a.maxWounds && e.weaponSkill === a.weaponSkill && e.strength === a.strength);
	return o.length <= 2 ? o : [];
}
//#endregion
//#region src/module/integrations/bossbar/runtime.ts
function Mn() {
	return ui && Reflect.get(ui, "bossBar");
}
function Nn(e) {
	return Array.from(e.combatants).flatMap(({ actor: e, token: t }) => e ? [{
		uuid: e.uuid,
		enemy: t?.disposition === -1 && !e.hasPlayerOwner,
		traits: Array.from(e.items).filter((e) => e.type === "trait").map((e) => e.name),
		maxWounds: e.system.status?.wounds?.max ?? 0,
		weaponSkill: e.system.characteristics?.ws?.value ?? 0,
		strength: e.system.characteristics?.s?.value ?? 0
	}] : []);
}
function Pn(e) {
	return {
		wounds: e.system.status?.wounds?.value ?? 0,
		maxWounds: e.system.status?.wounds?.max ?? 0,
		maxCriticals: e.system.status?.criticalWounds?.max ?? 0,
		criticals: Array.from(e.items).filter((e) => e.type === "critical" && Cn(e.system?.wounds?.value)).length
	};
}
//#endregion
//#region src/module/integrations/bossbar/combat.ts
var Fn = /* @__PURE__ */ new WeakSet();
async function In(e) {
	if (!game?.user?.isGM || !h("bossBar") || !game.settings.get("wfrp4e-compatibility-box", H.automatic) || !e.scene || Fn.has(e)) return;
	let t = jn(Nn(e)), n = e.scene.getFlag("bossbar", "actors") ?? [], r = new Set(n.map((e) => e.uuid)), i = game.settings.get(V, "barStyles"), a = t.filter((e) => r.has(e.uuid) ? !1 : (r.add(e.uuid), !0)).map((e) => ({
		uuid: e.uuid,
		style: i[0]?.id ?? "default",
		hideName: !1
	}));
	if (a.length) {
		Fn.add(e);
		try {
			await e.scene.setFlag(V, "actors", [...n, ...a]);
		} finally {
			Fn.delete(e);
		}
	}
}
//#endregion
//#region src/module/integrations/bossbar/critical-segments.ts
var Ln = "wfrp-bossbar-segments", Rn = "http://www.w3.org/2000/svg", zn = [
	"background",
	"bar",
	"foreground"
], Bn = [
	"bg",
	"bar",
	"fg"
];
function Vn(e, t) {
	let n = zn.map((t) => e.querySelector(`:scope > .bar-${t}`)), r = n.map((e) => e?.querySelector(":scope > img")), i = r.every((e, t) => e?.getAttribute("src")?.split(/[?#]/)[0]?.endsWith(`/bossbar/resources/matching-images/segmented/${Bn[t]}.png`)), a = t !== void 0 && i ? String(t) : void 0;
	if (e.dataset.wfrpBossbarSegments === a) return;
	e.querySelectorAll(`.${Ln}`).forEach((e) => e.remove()), e.classList.toggle("wfrp-bossbar-segmented", a !== void 0);
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
		o.className = Ln, o.setAttribute("aria-hidden", "true"), o.style.gridTemplateColumns = a === "0" ? "none" : `repeat(${a}, minmax(0, 1fr))`;
		for (let t = 0; t < Number(a); t++) o.append(Hn(e.ownerDocument, n.src));
		i.append(o);
	}
}
function Hn(e, t) {
	let n = e.createElementNS(Rn, "svg");
	n.setAttribute("viewBox", "829 0 787 361"), n.setAttribute("preserveAspectRatio", "xMidYMid meet");
	let r = e.createElementNS(Rn, "image");
	return r.setAttribute("href", t), r.setAttribute("width", "7967"), r.setAttribute("height", "361"), n.append(r), n;
}
//#endregion
//#region src/module/integrations/bossbar/wounds-bar.ts
function Un(e, t) {
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
function Wn(e, t) {
	return e.find((e) => e.id === t) ?? e[0];
}
//#endregion
//#region src/module/integrations/bossbar/display.ts
function Gn(e = Mn()) {
	if (!e?.element || e.id !== "boss-bar") return;
	let t = e.element;
	t.classList.add("wfrp4e-compatibility-box-bossbar");
	let n = G() && game?.settings.get("wfrp4e-compatibility-box", H.stacked) === !0 && bn(wn()), r = game?.settings.get(V, "barStyles"), i = game?.settings.get(d, H.woundsStyle), a = Wn(r, i);
	for (let r of t.querySelectorAll(".bar-list-item")) {
		let t = e.bars.find((e) => e.actor.uuid === r.dataset.uuid)?.actor;
		if (!t) continue;
		let i = r.querySelector(".boss-bar-container:not(.wfrp-bossbar-wounds)");
		if (!i) continue;
		if (!n || !a) {
			Vn(i), r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), i.dataset.wfrpBossbarPrimary && (i.style.removeProperty("--bar-percent"), i.removeAttribute("role"), i.removeAttribute("aria-label"), i.removeAttribute("aria-valuenow"), i.removeAttribute("aria-valuemax"), i.removeAttribute("aria-valuemin"), delete i.dataset.wfrpBossbarPrimary);
			continue;
		}
		let o = Pn(t), s = Sn(o);
		Vn(i, s.max), i.dataset.wfrpBossbarPrimary = "true", i.style.setProperty("--bar-percent", `${xn(s.remaining, s.max)}%`), Kn(i, U("CriticalCapacity"), s.remaining, s.max);
		let c = r.querySelector(".wfrp-bossbar-wounds");
		c?.dataset.style !== a.id && (r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), c = Un(r.ownerDocument, a), c.dataset.wfrpBossbarExtra = "", c.dataset.style = a.id, i.before(c)), c && (c.style.setProperty("--bar-percent", `${xn(o.wounds, o.maxWounds)}%`), c.classList.toggle("wfrp-bossbar-threat", o.wounds <= 0), Kn(c, U("Wounds"), Math.max(0, o.wounds), o.maxWounds));
	}
}
function Kn(e, t, n, r) {
	e.setAttribute("role", "progressbar"), e.setAttribute("aria-label", t), e.setAttribute("aria-valuemin", "0"), e.setAttribute("aria-valuemax", String(Math.max(0, r))), e.setAttribute("aria-valuenow", String(Math.min(n, Math.max(0, r))));
}
var qn = !1;
function Jn() {
	qn || (qn = !0, queueMicrotask(() => {
		qn = !1;
		let e = Mn();
		if (e?.element?.isConnected) try {
			e.updateBars(), Gn(e);
		} catch (e) {
			W(e);
		}
	}));
}
//#endregion
//#region src/module/integrations/bossbar/settings.ts
function Yn() {
	if (game) {
		for (let e of ["automatic", "stacked"]) game.settings.register(d, H[e], {
			name: `${d}.BossBar.Settings.${e}.Name`,
			hint: `${d}.BossBar.Settings.${e}.Hint`,
			config: !0,
			default: !0,
			scope: "world",
			type: Boolean
		});
		game.settings.register(d, H.woundsStyle, {
			name: `${d}.BossBar.Settings.woundsStyle.Name`,
			hint: `${d}.BossBar.Settings.woundsStyle.Hint`,
			config: !0,
			default: "default-grass",
			scope: "world",
			type: String,
			choices: () => Object.fromEntries((game?.settings.get(V, "barStyles")).map((e) => [e.id, e.name]))
		}), game.settings.register(d, H.prompt, {
			name: "Boss Bar setup choice",
			hint: "",
			config: !1,
			default: "",
			scope: "world",
			type: String
		});
	}
}
function Xn(e) {
	if (!game?.user?.isGM) return;
	let t = e.querySelector(`[name="${V}.currentHpPath"]`)?.closest(".form-group");
	if (!t || e.querySelector("[data-wfrp-bossbar-setup]")) return;
	let n = e.ownerDocument.createElement("div");
	n.className = "form-group", n.dataset.wfrpBossbarSetup = "";
	let r = e.ownerDocument.createElement("button");
	r.type = "button", r.textContent = U("Configure"), r.addEventListener("click", async () => {
		r.disabled = !0;
		try {
			let t = await En();
			for (let [n, r] of Object.entries(t)) {
				let t = e.querySelector(`[name="bossbar.${n}"]`);
				t && (typeof r == "boolean" ? t.checked = r : t.value = r);
			}
			let n = e.querySelector(`[name="${d}.${H.stacked}"]`);
			n && (n.checked = !0);
		} catch (e) {
			W(e);
		} finally {
			r.disabled = !1;
		}
	}), n.append(r), t.insertAdjacentElement("beforebegin", n);
}
//#endregion
//#region src/module/integrations/bossbar/register-integration.ts
function Zn() {
	if (f("bossbar") && !(!h("bossBar") || game?.system.id !== "wfrp4e")) {
		Yn(), Hooks.once("ready", () => void On().catch(W)), Hooks.on("combatStart", (e) => void In(e).catch(W)), Hooks.on("renderBossBar", (e) => Gn(e)), Hooks.on("renderSettingsConfig", (e, t) => {
			t instanceof HTMLElement && Xn(t);
		});
		for (let e of [
			"updateActor",
			"createItem",
			"updateItem",
			"deleteItem",
			"createActiveEffect",
			"updateActiveEffect",
			"deleteActiveEffect"
		]) Hooks.on(e, Jn);
		Hooks.on("updateSetting", (e) => {
			let t = e.key;
			[
				"bossbar.currentHpPath",
				"bossbar.maxHpPath",
				"bossbar.woundsSystem"
			].includes(t) && Mn()?.render(!0).catch(W), (t.startsWith("bossbar.") || t.startsWith("wfrp4e-compatibility-box.bossBar") || t === "wfrp4e.uiaCrits") && (Jn(), t === "wfrp4e.uiaCrits" && On().catch(W));
		});
	}
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/argon-logic.ts
var Qn = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function K(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function $n(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function er(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function tr(e) {
	return e.trim().toLowerCase();
}
function nr(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function rr(e) {
	return e.type === "trait" ? (er(e), e.rollable && !e.disabled && Qn.has(e.traitBaseName.toLowerCase())) : !1;
}
function ir(e) {
	return e.type === "weapon" || rr(e);
}
function ar(e) {
	return e.type === "weapon";
}
function or(e) {
	return K(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function sr(e) {
	return K(e), e.advances > 0;
}
function cr(e, t) {
	return e.forEach(K), t === "basic" ? e.filter((e) => !or(e)).map((e) => e.id) : t === "advanced" ? e.filter(or).map((e) => e.id) : t === "trained" ? e.filter(sr).map((e) => e.id) : e.map((e) => e.id);
}
function lr(e, t) {
	return e.forEach($n), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function ur(e) {
	return e.filter((e) => e.type === "weapon" || rr(e)).map((e) => e.id);
}
function dr(e) {
	return e.filter((e) => e.type === "trait" ? (er(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function fr(e, t) {
	return e.forEach(K), t.flatMap((t) => {
		let n = tr(t.name), r = e.find((e) => tr(e.name) === n);
		return !r || t.trained && !sr(r) ? [] : [r.id];
	});
}
function pr(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function mr(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function hr(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => mr(e.name, t))).map((e) => e.id) : [];
}
function gr(e) {
	let t = [];
	return (e.type === "weapon" || rr(e)) && t.push({
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
function _r(e, t) {
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
var vr = "argonCombatItemPatterns", yr = "*Draught*, *Potion*";
function q(e, t) {
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
function br(e) {
	m("argonCombatHud") && e.register(d, vr, {
		config: !0,
		default: yr,
		hint: `${d}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${d}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: it,
		scope: "world",
		type: String
	});
}
function xr() {
	if (!game) throw Error(`${d} | Foundry game is unavailable during settings registration.`);
	q(game.settings, "argonCombatHud"), q(game.settings, "bossBar"), q(game.settings, "paperDoll"), q(game.settings, "paperDollArgonBridge"), br(game.settings);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/actor-flags.ts
var Sr = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function Cr(e, t) {
	return e.flags?.[$e]?.[t];
}
function wr(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? Cr(e, t);
}
async function Tr(e) {
	let t = {};
	for (let n of Sr) {
		if (e.getFlag("wfrp4e-compatibility-box", n) !== void 0) continue;
		let r = Cr(e, n);
		r !== void 0 && (t[`flags.${d}.${n}`] = r);
	}
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/argon-helpers.ts
function Er(e, t) {
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
function Dr(e, t) {
	if (!Number.isNumeric(e)) throw Error(`${d} | ${t} must be numeric.`);
	return Number(e);
}
function Or(e) {
	return e == null || e === "" ? null : Dr(e, "item quantity");
}
function kr(e, t, n, r) {
	let i = wr(e, t);
	if (i === void 0) return r;
	if (!n.includes(i)) throw Error(`${d} | Argon actor flag ${Qe}.${t} has invalid value ${String(i)}.`);
	return i;
}
function Ar(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = Y(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function X(e, t = !1) {
	let n = Er(e, "Argon item"), r = J(n.type, "Argon item type"), i = J(n.name, `${r} item name`), a = {
		id: J(n.id, `${r} ${i} id`),
		name: i,
		quantity: Or(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = J(n.advanced?.value, `${i} advanced classification`), a.grouped = J(n.grouped?.value, `${i} grouped classification`), a.advances = Dr(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = J(n.lore?.value, `${i} lore`), a.memorized = Y(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = Y(n.system?.disabled, `${i} disabled state`), a.rollable = Y(n.rollable?.value, `${i} rollable state`), a.traitBaseName = nr(i)), t && Ar(a, n, r), a;
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
function jr(e) {
	return gr(X(e, !0));
}
function Mr(e) {
	let t = kr(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return Q(n, cr(Z(n), t));
}
function Nr(e) {
	let t = kr(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return Q(n, lr(Z(n), t));
}
function Pr(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return Q(t, ur(Z(t)));
}
function Fr(e) {
	let t = [...e.itemTypes.trait];
	return Q(t, dr(Z(t)));
}
function Ir(e) {
	let t = nt.map((e) => ({
		...e,
		type: "characteristic"
	})), n = rt.map((e) => ({
		name: Lr(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = Q(r, fr(Z(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function Lr({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = Hr(`NAME.${e}`, t);
	return n ? `${i} (${Hr(n, r)})` : i;
}
function Rr(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = pr(String(t)), r = [...e.items];
	return Q(r, hr(Z(r), n));
}
function zr(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function Br(e) {
	return ir(X(e));
}
function Vr(e) {
	return ar(X(e));
}
function Hr(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/integrations/enhancedcombathud/buttons.ts
function Ur(e) {
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
				details: jr(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = zr(this.item);
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
			let e = Nr(this.actor), t = Pr(this.actor), s = Fr(this.actor), c = Ir(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), ee = Rr(this.actor), l = [
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
				icon: `${D}/dodging.webp`
			})), ee.length && l.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: ee,
				icon: `${D}/drink-me.webp`,
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
function Wr() {
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
function Gr(e, t, n) {
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
function Kr(e) {
	return $(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/panels.ts
function qr(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function Jr(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function Yr(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return et;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await Tr(this.actor), await super._onConfigure(e);
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
			let e = tt.map((e) => {
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
			}), n = Mr(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return qr(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return qr(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return Jr(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += qr(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = Gr(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${Kr(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${Kr(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: Kr(t.bubbleDistance),
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
function Xr(e) {
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
			if (!Br(n) || n.actor !== this.actor) throw Error(`${d} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let r = e.currentTarget.dataset.set, i = e.currentTarget.dataset.slot;
			if (!r || !i) throw Error(`${d} | Argon weapon-set drop target has no set or slot identifier.`);
			let a = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			a[r] ??= {}, a[r][i] = n.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", a), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!wr(this.actor, "switchEquip")) return;
			let n = _r(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(Vr).map((e) => ({
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
function Zr() {
	f("enhancedcombathud") && h("argonCombatHud") && (Wr(), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = Ur(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = Yr(e), a = Xr(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	}));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/panels.ts
function Qr(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = Ur(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return Xt(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/integrations/paper-doll-argon/report-bridge-error.ts
function $r(e) {
	return e instanceof Error ? e.message : String(e);
}
function ei(e, t) {
	Me(`${pe}: ${e}. ${$r(t)}`, t);
}
function ti(e, t) {
	e.catch((e) => ei(t, e));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/register-integration.ts
function ni() {
	return h("paperDoll") && h("argonCombatHud") && h("paperDollArgonBridge");
}
function ri(e, t) {
	!ni() || !v(e) || Zt(t) && ti(Qt(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function ii() {
	f("fvtt-paper-doll-ui") && f("enhancedcombathud") && ni() && (Hooks.on("argonInit", (e) => {
		let { PaperDollQuickItemsPanel: t } = Qr(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", ri));
}
//#endregion
//#region src/module/integrations/splatter/configuration-menu.ts
var ai = `${d}.Splatter.Configuration`;
function oi(e) {
	return game?.i18n.localize(`${ai}.${e}`) ?? e;
}
var si = class extends foundry.applications.api.ApplicationV2 {
	async render(e) {
		try {
			await yn(), ui?.notifications?.info(oi("Success"));
		} catch (e) {
			Me(oi("Error"), e);
		}
		return this;
	}
}, ci = `${d}.Splatter.Configuration`;
function li() {
	if (f("splatter")) {
		if (!game) throw Error(`${d} | Foundry game is unavailable during Splatter registration.`);
		game.settings.registerMenu(d, "configureSplatter", {
			hint: `${ci}.Hint`,
			icon: "fa-solid fa-droplet",
			label: `${ci}.Button`,
			name: `${ci}.Name`,
			restricted: !0,
			type: si
		});
	}
}
//#endregion
//#region src/module/patches/wfrp4e/repair-data-model-migrations.ts
var di = /* @__PURE__ */ new WeakSet();
function fi(e) {
	let t = e.migrateData;
	return typeof t != "function" || di.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, di.add(e), !0);
}
function pi() {
	return [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(fi(t)), 0);
}
//#endregion
//#region src/module/patches/wfrp4e/repair-roll-modes.ts
function mi() {
	let e = game?.wfrp4e?.config, t = CONFIG.ChatMessage.modes;
	return !e || !t ? !1 : (e.rollModes = foundry.utils.deepClone(t), !0);
}
//#endregion
//#region src/module/patches/wfrp4e/apply-compatibility-patches.ts
function hi() {
	game?.system.id === "wfrp4e" && (mi(), pi());
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function gi() {
	Hooks.once("init", () => {
		hi(), xr(), An(), Zn(), Zr(), Ht(), ii(), li();
	});
}
//#endregion
//#region src/main.ts
gi();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map