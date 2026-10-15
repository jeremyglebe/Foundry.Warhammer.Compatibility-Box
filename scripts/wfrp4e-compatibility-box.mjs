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
function d(e, t) {
	return Number(t.twoHanded) - Number(e.twoHanded) || e.name.localeCompare(t.name) || e.id.localeCompare(t.id);
}
function te(e, n) {
	let r = e.filter((e) => e.type === "weapon" && e.equipped).sort(d);
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
function ne(e, t) {
	return [...u(e), ...te(e, t)];
}
//#endregion
//#region src/functions/patches/paper-doll/derive-paper-doll-slot-state.ts
function re(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function ie(n, r, i, a) {
	let o = re(n), s = new Map(r.map((e) => [e.slotId, e.uuid]));
	for (let n of [...e, ...t]) {
		if (!a.has(n)) continue;
		let e = o[n]?.["0"] ?? null, t = s.get(n) ?? null;
		t ? (o[n] ??= {}, o[n][0] = t) : e && i.has(e) && (o[n] ??= {}, o[n][0] = null);
	}
	return o;
}
function ae(e, t, n) {
	let r = new Map(t.map((e) => [e.uuid, e])), i = re(e);
	for (let e of Object.values(i)) for (let [t, i] of Object.entries(e)) !i || n.has(i) || r.get(i)?.equipped === !1 && (e[t] = null);
	return i;
}
function oe(e, t, n, r, i) {
	return ae(ie(e, t, n, r), i, n);
}
function se(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/functions/patches/paper-doll/is-paper-doll-slot-state.ts
function ce(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function le(e) {
	return /^(0|[1-9]\d*)$/.test(e);
}
function ue(e) {
	return e == null || typeof e == "string" && e.length > 0;
}
function f(e) {
	return ce(e) && Object.entries(e).every(([e, t]) => e.length > 0 && ce(t) && Object.entries(t).every(([e, t]) => le(e) && ue(t)));
}
//#endregion
//#region src/module/constants.ts
var p = "wfrp4e-compatibility-box", m = "Drowsy's WFRP4e Compatibility Box";
//#endregion
//#region src/module/integrations/is-module-active.ts
function h(e) {
	return game?.modules.get(e)?.active === !0;
}
//#endregion
//#region src/module/settings/optional-features.ts
var g = {
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
function _(e) {
	return g[e].targetModuleIds.every((e) => h(e));
}
//#endregion
//#region src/module/settings/is-optional-feature-enabled.ts
function v(e) {
	let t = g[e];
	return _(e) && game?.settings.get("wfrp4e-compatibility-box", t.settingKey) !== !1;
}
//#endregion
//#region src/functions/patches/paper-doll/equipment-update.ts
function de(e) {
	return e.slotId === "MAIN_LEFT" ? "l" : e.slotId === "MAIN_RIGHT" ? "r" : null;
}
function fe(e, t, n, r) {
	if (t === null) return {};
	let i = {};
	if (t || (i["system.equipped.value"] = !0), e?.type !== "weapon") return i;
	if (!r) throw Error(`Weapon ${e.uuid} requires the actor's main hand.`);
	let a = de(n), o = e.twoHanded ? !1 : a ? a !== r : void 0;
	return o !== void 0 && e.offhand !== o && (i["system.offhand.value"] = o), i;
}
function pe(e) {
	return e === !0 ? { "system.equipped.value": !1 } : {};
}
//#endregion
//#region src/functions/patches/paper-doll/is-item-allowed-in-slot.ts
function me(e, t) {
	switch (t) {
		case "HEAD": return e.armourPoints.head > 0;
		case "BODY": return e.armourPoints.body > 0;
		case "GLOVES": return e.armourPoints.lArm > 0 || e.armourPoints.rArm > 0;
		case "BOOTS": return e.armourPoints.lLeg > 0 || e.armourPoints.rLeg > 0;
		default: return !1;
	}
}
function he(e, t, n) {
	return n === "MAIN_LEFT" || n === "MAIN_RIGHT" ? t?.type === "weapon" : n === "HEAD" || n === "BODY" || n === "GLOVES" || n === "BOOTS" ? t?.type === "armour" && me(t, n) : e !== "weapon" && e !== "armour";
}
//#endregion
//#region src/module/patches/paper-doll/wfrp-runtime-types.ts
var ge = new Set([
	"character",
	"npc",
	"creature"
]);
function y(e) {
	return typeof e == "object" && !!e;
}
function b(e) {
	return y(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function x(e) {
	return b(e) && ge.has(e.type);
}
function _e(e) {
	return y(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
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
	if (!y(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function be(e, t) {
	let n = ye(e)[t];
	if (n === void 0) return null;
	if (!y(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function xe(e, t) {
	let n = be(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function Se(e) {
	return be(e, "equipped");
}
function Ce(e) {
	return Se(e) !== null;
}
function we(e) {
	let t = ye(e).AP;
	if (!y(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(ve.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function Te(e) {
	if (!y(e.system) || !y(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function Ee(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: xe(e, "equipped"),
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
		offhand: xe(e, "offhand"),
		twoHanded: xe(e, "twohanded"),
		type: "weapon"
	};
}
function De(e, t) {
	return he(e.type, Ee(e), t);
}
async function Oe(e, t, n) {
	let r = Ee(t), i = fe(r, r?.equipped ?? Se(t), n, r?.type === "weapon" ? Te(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function ke(e) {
	let t = pe(Ee(e)?.equipped ?? Se(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/notifications/notify-user.ts
function Ae(e, t) {
	t === void 0 ? console.error(e) : console.error(e, t);
}
function je(e, t) {
	Ae(e, t), ui?.notifications?.error(e);
}
//#endregion
//#region src/module/patches/paper-doll/report-paper-doll-error.ts
function Me(e) {
	return e instanceof Error ? e.message : String(e);
}
function S(e, t) {
	je(`${m}: ${e}. ${Me(t)}`, t);
}
function C(e, t) {
	e.catch((e) => S(t, e));
}
//#endregion
//#region src/module/patches/paper-doll/synchronize-paper-doll.ts
var w = "fvtt-paper-doll-ui", T = "slots", E = /* @__PURE__ */ new Map(), Ne = /* @__PURE__ */ new Set();
function Pe(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Fe(e) {
	let t = e.getFlag(w, T);
	if (t === void 0) return {};
	if (!f(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Pe(t);
}
function Ie() {
	let n = game?.settings.get(w, "globalConfig"), r = new Set([...e, ...t]);
	if (y(n) && Object.keys(n).length === 0) return r;
	if (!y(n) || !y(n.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let i = Object.values(n.SLOTS);
	if (!i.every(y)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let a = new Set(i.flatMap((e) => Object.keys(e)));
	return a.size ? a : r;
}
function Le(e) {
	return E.has(e.uuid);
}
function Re(e) {
	if (!b(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function ze() {
	if (!game || game.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function Be(e) {
	let t = Fe(e), n = Array.from(e.items), r = n.map(Ee).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: Se(e),
		uuid: e.uuid
	})), o = oe(t, ne(r, Te(e)), i, Ie(), a);
	return se(t, o) ? "unchanged" : (await e.setFlag(w, T, o), "synchronized");
}
async function D(e) {
	Re(e), ze();
	let t = e;
	if (!x(t) || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !v("paperDoll")) return "unavailable";
	let n = E.get(t.uuid);
	if (n) return await n, D(t);
	let r = Be(t).finally(() => {
		E.get(t.uuid) === r && E.delete(t.uuid);
	});
	return E.set(t.uuid, r), r;
}
function Ve(e) {
	x(e) && (Ne.has(e.uuid) || (Ne.add(e.uuid), queueMicrotask(() => {
		Ne.delete(e.uuid), C(D(e), `could not synchronize equipped items for ${e.uuid}`);
	})));
}
async function He() {
	return ze(), Promise.all(Array.from(game.actors).filter(x).map(D));
}
//#endregion
//#region src/module/settings/get-optional-feature-statuses.ts
function Ue() {
	return Object.entries(g).map(([e, t]) => ({
		available: _(e),
		enabled: v(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
//#endregion
//#region src/functions/integrations/paper-doll-argon/bridge.ts
var We = ["TRINKET", "WRIST_RIGHT"];
function Ge(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function Ke(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of We) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(Ge)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function qe(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function Je({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function Ye(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/constants.ts
var Xe = "enhancedcombathud", Ze = p, Qe = "enhancedcombathud-wfrp4e", $e = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", et = "modules/enhancedcombathud/icons", tt = [
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
	icon: `${et}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${et}/bolt-spell-cast.webp`
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
	if (!y(e) || typeof e.slotId != "string") return null;
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
		if (!_e(a) || b(this.actor) && !x(this.actor)) return r.call(this, e, t, i);
		let o = ut(i);
		if (!t) return dt();
		if (!x(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!De(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await Oe(this.actor, a, o);
		} catch (e) {
			S(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await D(this.actor);
			} catch (e) {
				S(`could not restore ${a.name}'s Paper Doll slot`, e);
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
		return n.call(this, e, t, r).filter((e) => _e(e) && De(e, t));
	}, e[pt] = !0;
}
//#endregion
//#region src/module/patches/paper-doll/register-slot-tooltips.ts
var _t = ".paper-doll .paper-doll-slot", O = `data-${p}-drag-tooltip`, k = `data-${p}-tooltip`, vt = `data-${p}-original-tooltip`, yt = {
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
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && v("paperDoll");
}
function At(e) {
	if (!y(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!y(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[w];
	return y(n) ? "slots" in n ? f(n.slots) ? {
		kind: "valid",
		state: n[T]
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
	if (!y(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function Ft(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (S(n, AggregateError(r, n)), await D(e));
}
function It(e, t, n) {
	if (!j() || !x(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!y(i) || typeof i.item != "string") continue;
		let t = Pt(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = Mt(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!De(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(Oe(e, n, t));
	}
	r.length && C(Ft(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function Lt(e, t) {
	if (!j() || !x(e) || Le(e)) return;
	let n = jt(t);
	if (!n) return;
	let r = e.getFlag(w, T);
	if (r !== void 0) {
		if (!f(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of ot(r, n)) {
			if (!t.from) continue;
			let n = Mt(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && Nt(e, n.uuid);
		}
	}
}
function Rt(e, t) {
	if (!j() || !x(e) || !jt(t)) return;
	let n = A.get(e.uuid);
	A.delete(e.uuid), n?.size && C(Ft(e, Array.from(n, (t) => {
		let n = Mt(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(ke), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function zt(e) {
	!j() || !_e(e) || e.type !== "armour" && e.type !== "weapon" && !Ce(e) || x(e.parent) && Ve(e.parent);
}
function Bt() {
	kt(), Hooks.on("paper-doll-swap", It), Hooks.on("preUpdateActor", Lt), Hooks.on("updateActor", Rt), Hooks.on("updateItem", zt), Hooks.once("ready", () => {
		if (j()) {
			try {
				gt(), ft();
			} catch (e) {
				throw S("could not initialize the required Paper Doll integration", e), e;
			}
			C(He(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/integrations/fvtt-paper-doll-ui/register-integration.ts
var Vt = "fvtt-paper-doll-ui";
function Ht() {
	h("fvtt-paper-doll-ui") && v("paperDoll") && Bt();
}
//#endregion
//#region src/module/integrations/paper-doll-argon/bridge-runtime.ts
var Ut = "activeWeaponSet", M = "slots", Wt = "weaponSets";
function Gt(e) {
	let t = e.getFlag(Vt, M);
	if (t === void 0) return {};
	if (!f(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function Kt(e) {
	let t = e.getFlag(Xe, Ut);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function qt(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function Jt(e) {
	let t = e.getFlag(Xe, Wt);
	if (t === void 0) return {};
	if (!y(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !y(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: qt(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: qt(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function Yt(e, t) {
	let n = Jt(e), r = Je({
		activeSetId: Kt(e),
		mainHand: Te(e),
		mainSlots: qe(t),
		weaponSets: n
	}), i = !Ye(n, r);
	return i && await e.setFlag(Xe, Wt, r), await it(), i ? "synchronized" : "unchanged";
}
function Xt(e) {
	if (!b(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return Ke(Gt(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function Zt(e) {
	if (!y(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!y(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[Vt];
	if (!y(n) || !(M in n)) return null;
	let r = n[M];
	if (!f(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function Qt(e) {
	if (!b(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return !x(e) || !v("paperDoll") || !v("argonCombatHud") || !v("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", M) === void 0 ? (await it(), "unchanged") : Yt(e, Gt(e));
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
	if (!h("splatter")) throw Error("Splatter must be active before it can be configured.");
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
	console.error(`${p} | Boss Bar integration failed.`, e), ui?.notifications?.error(U("Error"));
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
	if (!game?.ready || !game.user?.isGM || !v("bossBar")) throw Error("An active Boss Bar integration and a ready GM session are required.");
	for (let e of Object.keys(B)) if (!game.settings.settings?.has(`bossbar.${e}`)) throw Error(`Boss Bar setting ${e} is unavailable.`);
	for (let [e, t] of Object.entries(B)) await game.settings.set(V, e, t);
	await game.settings.set(p, H.stacked, !0);
	let e = Tn();
	return e && await game.settings.set(V, "barStyles", e), await game.settings.set(p, H.prompt, G() ? "uia" : "core"), ui?.notifications?.info(U("Configured")), { ...B };
}
var Dn = !1;
async function On() {
	if (!game?.user?.isGM || !v("bossBar") || Dn || game.users?.activeGM && game.users.activeGM.id !== game.user.id) return;
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
			t === "configure" ? await En() : t === "keep" && await game.settings.set(p, H.prompt, e);
		} finally {
			Dn = !1;
		}
	}
}
//#endregion
//#region src/functions/wfrp/folders.ts
function kn(e, t) {
	return e.startsWith("wfrp4e-") && [...t].some((e) => /cubicle\s*7/i.test(e.name));
}
function An(e, t, n) {
	let r = e["warhammer-lib"], i = e.core, a = [
		r?.source,
		e.source,
		t?.startsWith("Compendium.") ? t.split(".")[1] : void 0,
		i?.sourceId?.startsWith("Compendium.") ? i.sourceId.split(".")[1] : void 0
	];
	for (let [t, n] of Object.entries(e)) n && typeof n == "object" && "initialization-folder" in n && a.push(t);
	return a.find((e) => typeof e == "string" && n.has(e));
}
function jn(e, t) {
	if (t < 1) throw Error("WFRP folders need at least one available level.");
	return e.length <= t ? [...e] : [...e.slice(0, t - 1), e.slice(t - 1).join("/")];
}
function Mn(e, t, n, r) {
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
	let l = e.filter((e) => !o(e.id) && c(e)), u = new Set(l.map((e) => e.id)), ee = l.filter((e) => !a(e.parent).some((e) => u.has(e.id))), d = {
		folders: [],
		entries: []
	}, te = /* @__PURE__ */ new Set();
	for (let t of ee) {
		let i = e.map((e) => ({
			folder: e,
			path: a(e.id)
		})).filter(({ path: e }) => e.some((e) => e.id === t.id)).map(({ folder: e, path: n }) => ({
			folder: e,
			path: n.slice(n.findIndex((e) => e.id === t.id))
		})).sort((e, t) => t.path.length - e.path.length);
		for (let { folder: e, path: t } of i) {
			te.add(e.id);
			let i = jn(t.map((e) => e.name), r - 1).at(-1), a = t.length === 1 || r === 2 ? n : t[Math.min(t.length - 2, r - 3)].id;
			(e.parent !== a || e.name !== i) && d.folders.push({
				id: e.id,
				parent: a,
				name: i
			});
		}
	}
	for (let e of t) {
		if (!e.official || o(e.parent) || e.parent && te.has(e.parent)) continue;
		let t = a(e.parent).map((e) => e.name);
		d.entries.push({
			id: e.id,
			path: jn(t.length ? t : [e.fallback], r - 1)
		});
	}
	return d;
}
var Nn = ["keepWfrpImportedContentTidy", "keepWfrpCompendiumsTidy"];
function Pn(e) {
	if (!game?.user) throw Error("Foundry user is unavailable during WFRP setting registration.");
	for (let t of Nn) game.settings.register(p, t, {
		name: `${p}.Settings.WfrpFolders.${t}.Name`,
		hint: `${p}.Settings.WfrpFolders.${t}.Hint`,
		config: game.user.isGM === !0,
		default: !0,
		scope: "world",
		type: Boolean,
		onChange: e
	});
}
//#endregion
//#region src/module/wfrp/folders/migration.ts
var Fn = "whence-they-hang";
async function In(e) {
	if (!e.ready || !e.user?.isGM) return;
	let t = e.settings.storage.get("world");
	if (!t) throw Error("World settings storage is unavailable during WFRP migration.");
	for (let n of Nn) {
		if (t.getSetting(`wfrp4e-compatibility-box.${n}`)) continue;
		let r = t.getSetting(`${Fn}.${n}`)?.value;
		typeof r == "boolean" && await e.settings.set(p, n, r);
	}
}
//#endregion
//#region src/module/wfrp/folders/tidy.ts
var Ln = "__wfrp_tidy_root__";
async function Rn(e, t) {
	if (!e.ready || !e.user?.isGM || e.system.id !== "wfrp4e") return;
	await In(e);
	let n = new Set([...e.modules.entries()].filter(([e, t]) => kn(e, t.authors ?? [])).map(([e]) => e));
	n.add("wfrp4e");
	let r = (e) => An(e.flags ?? {}, e._stats?.compendiumSource, n), i = new Map([...e.modules.entries()].map(([e, t]) => [e, t.title ?? e])), a = async (n, a) => {
		let o = [...e.folders].filter((e) => e.type === n), s = o.filter((e) => !e.folder && e.name === "WFRP");
		if (s.length > 1) throw Error(`Multiple top-level WFRP folders in ${n}.`);
		let c = s[0], l = Mn(o.map((e) => ({
			id: e.id,
			name: e.name,
			parent: e.folder?.id ?? null,
			official: !!r(e)
		})), a.map((e) => ({
			id: e.id,
			parent: e.folder?.id ?? null,
			official: !!r(e),
			fallback: i.get(r(e)) ?? "WFRP Content"
		})), c?.id ?? Ln, t);
		if (!l.folders.length && !l.entries.length) return;
		let u = async (e, t) => {
			let r = await CONFIG.Folder.documentClass.create({
				name: e,
				type: n,
				folder: t,
				sorting: "a"
			});
			if (!r) throw Error(`Could not create ${n} folder ${e}.`);
			return o.push(r), r;
		};
		c ??= await u("WFRP", null);
		for (let e of l.folders) await o.find((t) => t.id === e.id).update({
			name: e.name,
			folder: e.parent === Ln ? c.id : e.parent
		});
		for (let e of l.entries) {
			let t = c;
			for (let n of e.path) {
				let e = o.filter((e) => e.name === n && e.folder?.id === t.id);
				if (e.length > 1) throw Error(`Ambiguous WFRP destination folder ${n}.`);
				t = e[0] ?? await u(n, t.id);
			}
			await a.find((t) => t.id === e.id).update({ folder: t.id });
		}
	};
	if (e.settings.get("wfrp4e-compatibility-box", "keepWfrpImportedContentTidy")) for (let [t, n] of e.collections.entries()) t === "Folder" || !n.documentClass.schema.has("folder") || await a(t, [...n]);
	e.settings.get("wfrp4e-compatibility-box", "keepWfrpCompendiumsTidy") && await a("Compendium", [...e.packs.entries()].map(([t, n]) => ({
		id: t,
		folder: n.folder,
		flags: { source: n.metadata?.packageName },
		update: async (t) => {
			let r = [...e.folders].find((e) => e.id === t.folder);
			await n.setFolder(r);
		}
	})));
}
async function zn() {
	game && await Rn(game, CONST.FOLDER_MAX_DEPTH);
}
//#endregion
//#region src/module/api/create-module-api.ts
function Bn() {
	return {
		configureBossBar: En,
		configureSplatter: yn,
		getOptionalFeatures: Ue,
		syncAllPaperDollActors: He,
		syncPaperDollArgonActor: Qt,
		syncPaperDollActor: D,
		tidyWfrpContent: zn
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function Vn() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(p);
	if (!e) throw Error(`Foundry module registry entry was not found for ${p}.`);
	let t = e;
	t.api = Bn();
}
//#endregion
//#region src/functions/integrations/bossbar/selection.ts
function Hn(e) {
	let t = e.filter((e) => e.enemy), n = (e, t) => e.traits.some((e) => e.trim().toLowerCase() === t), r = t.filter((e) => n(e, "boss"));
	if (r.length) return r;
	let i = t.filter((e) => e.maxWounds >= 30 && n(e, "grim") && (n(e, "leader") || n(e, "champion"))).sort((e, t) => t.maxWounds - e.maxWounds || t.weaponSkill - e.weaponSkill || t.strength - e.strength), a = i[0];
	if (!a) return [];
	let o = i.filter((e) => e.maxWounds === a.maxWounds && e.weaponSkill === a.weaponSkill && e.strength === a.strength);
	return o.length <= 2 ? o : [];
}
//#endregion
//#region src/module/integrations/bossbar/runtime.ts
function Un() {
	return ui && Reflect.get(ui, "bossBar");
}
function Wn(e) {
	return Array.from(e.combatants).flatMap(({ actor: e, token: t }) => e ? [{
		uuid: e.uuid,
		enemy: t?.disposition === -1 && !e.hasPlayerOwner,
		traits: Array.from(e.items).filter((e) => e.type === "trait").map((e) => e.name),
		maxWounds: e.system.status?.wounds?.max ?? 0,
		weaponSkill: e.system.characteristics?.ws?.value ?? 0,
		strength: e.system.characteristics?.s?.value ?? 0
	}] : []);
}
function Gn(e) {
	return {
		wounds: e.system.status?.wounds?.value ?? 0,
		maxWounds: e.system.status?.wounds?.max ?? 0,
		maxCriticals: e.system.status?.criticalWounds?.max ?? 0,
		criticals: Array.from(e.items).filter((e) => e.type === "critical" && Cn(e.system?.wounds?.value)).length
	};
}
//#endregion
//#region src/module/integrations/bossbar/combat.ts
var Kn = /* @__PURE__ */ new WeakSet();
async function qn(e) {
	if (!game?.user?.isGM || !v("bossBar") || !game.settings.get("wfrp4e-compatibility-box", H.automatic) || !e.scene || Kn.has(e)) return;
	let t = Hn(Wn(e)), n = e.scene.getFlag("bossbar", "actors") ?? [], r = new Set(n.map((e) => e.uuid)), i = game.settings.get(V, "barStyles"), a = t.filter((e) => r.has(e.uuid) ? !1 : (r.add(e.uuid), !0)).map((e) => ({
		uuid: e.uuid,
		style: i[0]?.id ?? "default",
		hideName: !1
	}));
	if (a.length) {
		Kn.add(e);
		try {
			await e.scene.setFlag(V, "actors", [...n, ...a]);
		} finally {
			Kn.delete(e);
		}
	}
}
//#endregion
//#region src/module/integrations/bossbar/critical-segments.ts
var Jn = "wfrp-bossbar-segments", Yn = "http://www.w3.org/2000/svg", Xn = [
	"background",
	"bar",
	"foreground"
], Zn = [
	"bg",
	"bar",
	"fg"
];
function Qn(e, t) {
	let n = Xn.map((t) => e.querySelector(`:scope > .bar-${t}`)), r = n.map((e) => e?.querySelector(":scope > img")), i = r.every((e, t) => e?.getAttribute("src")?.split(/[?#]/)[0]?.endsWith(`/bossbar/resources/matching-images/segmented/${Zn[t]}.png`)), a = t !== void 0 && i ? String(t) : void 0;
	if (e.dataset.wfrpBossbarSegments === a) return;
	e.querySelectorAll(`.${Jn}`).forEach((e) => e.remove()), e.classList.toggle("wfrp-bossbar-segmented", a !== void 0);
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
		o.className = Jn, o.setAttribute("aria-hidden", "true"), o.style.gridTemplateColumns = a === "0" ? "none" : `repeat(${a}, minmax(0, 1fr))`;
		for (let t = 0; t < Number(a); t++) o.append($n(e.ownerDocument, n.src));
		i.append(o);
	}
}
function $n(e, t) {
	let n = e.createElementNS(Yn, "svg");
	n.setAttribute("viewBox", "829 0 787 361"), n.setAttribute("preserveAspectRatio", "xMidYMid meet");
	let r = e.createElementNS(Yn, "image");
	return r.setAttribute("href", t), r.setAttribute("width", "7967"), r.setAttribute("height", "361"), n.append(r), n;
}
//#endregion
//#region src/module/integrations/bossbar/wounds-bar.ts
function er(e, t) {
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
function tr(e, t) {
	return e.find((e) => e.id === t) ?? e[0];
}
//#endregion
//#region src/module/integrations/bossbar/display.ts
function nr(e = Un()) {
	if (!e?.element || e.id !== "boss-bar") return;
	let t = e.element;
	t.classList.add("wfrp4e-compatibility-box-bossbar");
	let n = G() && game?.settings.get("wfrp4e-compatibility-box", H.stacked) === !0 && bn(wn()), r = game?.settings.get(V, "barStyles"), i = game?.settings.get(p, H.woundsStyle), a = tr(r, i);
	for (let r of t.querySelectorAll(".bar-list-item")) {
		let t = e.bars.find((e) => e.actor.uuid === r.dataset.uuid)?.actor;
		if (!t) continue;
		let i = r.querySelector(".boss-bar-container:not(.wfrp-bossbar-wounds)");
		if (!i) continue;
		if (!n || !a) {
			Qn(i), r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), i.dataset.wfrpBossbarPrimary && (i.style.removeProperty("--bar-percent"), i.removeAttribute("role"), i.removeAttribute("aria-label"), i.removeAttribute("aria-valuenow"), i.removeAttribute("aria-valuemax"), i.removeAttribute("aria-valuemin"), delete i.dataset.wfrpBossbarPrimary);
			continue;
		}
		let o = Gn(t), s = Sn(o);
		Qn(i, s.max), i.dataset.wfrpBossbarPrimary = "true", i.style.setProperty("--bar-percent", `${xn(s.remaining, s.max)}%`), rr(i, U("CriticalCapacity"), s.remaining, s.max);
		let c = r.querySelector(".wfrp-bossbar-wounds");
		c?.dataset.style !== a.id && (r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), c = er(r.ownerDocument, a), c.dataset.wfrpBossbarExtra = "", c.dataset.style = a.id, i.before(c)), c && (c.style.setProperty("--bar-percent", `${xn(o.wounds, o.maxWounds)}%`), c.classList.toggle("wfrp-bossbar-threat", o.wounds <= 0), rr(c, U("Wounds"), Math.max(0, o.wounds), o.maxWounds));
	}
}
function rr(e, t, n, r) {
	e.setAttribute("role", "progressbar"), e.setAttribute("aria-label", t), e.setAttribute("aria-valuemin", "0"), e.setAttribute("aria-valuemax", String(Math.max(0, r))), e.setAttribute("aria-valuenow", String(Math.min(n, Math.max(0, r))));
}
var ir = !1;
function ar() {
	ir || (ir = !0, queueMicrotask(() => {
		ir = !1;
		let e = Un();
		if (e?.element?.isConnected) try {
			e.updateBars(), nr(e);
		} catch (e) {
			W(e);
		}
	}));
}
//#endregion
//#region src/module/integrations/bossbar/settings.ts
function or() {
	if (game) {
		for (let e of ["automatic", "stacked"]) game.settings.register(p, H[e], {
			name: `${p}.BossBar.Settings.${e}.Name`,
			hint: `${p}.BossBar.Settings.${e}.Hint`,
			config: !0,
			default: !0,
			scope: "world",
			type: Boolean
		});
		game.settings.register(p, H.woundsStyle, {
			name: `${p}.BossBar.Settings.woundsStyle.Name`,
			hint: `${p}.BossBar.Settings.woundsStyle.Hint`,
			config: !0,
			default: "default-grass",
			scope: "world",
			type: String,
			choices: () => Object.fromEntries((game?.settings.get(V, "barStyles")).map((e) => [e.id, e.name]))
		}), game.settings.register(p, H.prompt, {
			name: "Boss Bar setup choice",
			hint: "",
			config: !1,
			default: "",
			scope: "world",
			type: String
		});
	}
}
function sr(e) {
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
			let n = e.querySelector(`[name="${p}.${H.stacked}"]`);
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
function cr() {
	if (h("bossbar") && !(!v("bossBar") || game?.system.id !== "wfrp4e")) {
		or(), Hooks.once("ready", () => void On().catch(W)), Hooks.on("combatStart", (e) => void qn(e).catch(W)), Hooks.on("renderBossBar", (e) => nr(e)), Hooks.on("renderSettingsConfig", (e, t) => {
			t instanceof HTMLElement && sr(t);
		});
		for (let e of [
			"updateActor",
			"createItem",
			"updateItem",
			"deleteItem",
			"createActiveEffect",
			"updateActiveEffect",
			"deleteActiveEffect"
		]) Hooks.on(e, ar);
		Hooks.on("updateSetting", (e) => {
			let t = e.key;
			[
				"bossbar.currentHpPath",
				"bossbar.maxHpPath",
				"bossbar.woundsSystem"
			].includes(t) && Un()?.render(!0).catch(W), (t.startsWith("bossbar.") || t.startsWith("wfrp4e-compatibility-box.bossBar") || t === "wfrp4e.uiaCrits") && (ar(), t === "wfrp4e.uiaCrits" && On().catch(W));
		});
	}
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/argon-logic.ts
var lr = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function K(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function ur(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function dr(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function fr(e) {
	return e.trim().toLowerCase();
}
function pr(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function mr(e) {
	return e.type === "trait" ? (dr(e), e.rollable && !e.disabled && lr.has(e.traitBaseName.toLowerCase())) : !1;
}
function hr(e) {
	return e.type === "weapon" || mr(e);
}
function gr(e) {
	return e.type === "weapon";
}
function _r(e) {
	return K(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function vr(e) {
	return K(e), e.advances > 0;
}
function yr(e, t) {
	return e.forEach(K), t === "basic" ? e.filter((e) => !_r(e)).map((e) => e.id) : t === "advanced" ? e.filter(_r).map((e) => e.id) : t === "trained" ? e.filter(vr).map((e) => e.id) : e.map((e) => e.id);
}
function br(e, t) {
	return e.forEach(ur), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function xr(e) {
	return e.filter((e) => e.type === "weapon" || mr(e)).map((e) => e.id);
}
function Sr(e) {
	return e.filter((e) => e.type === "trait" ? (dr(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function Cr(e, t) {
	return e.forEach(K), t.flatMap((t) => {
		let n = fr(t.name), r = e.find((e) => fr(e.name) === n);
		return !r || t.trained && !vr(r) ? [] : [r.id];
	});
}
function wr(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function Tr(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function Er(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => Tr(e.name, t))).map((e) => e.id) : [];
}
function Dr(e) {
	let t = [];
	return (e.type === "weapon" || mr(e)) && t.push({
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
function Or(e, t) {
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
var kr = "argonCombatItemPatterns", Ar = "*Draught*, *Potion*";
function q(e, t) {
	let n = g[t];
	_(t) && e.register(p, n.settingKey, {
		config: !0,
		default: !0,
		hint: `${p}.Settings.Features.${t}.Hint`,
		name: `${p}.Settings.Features.${t}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function jr(e) {
	_("argonCombatHud") && e.register(p, kr, {
		config: !0,
		default: Ar,
		hint: `${p}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${p}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: it,
		scope: "world",
		type: String
	});
}
function Mr() {
	if (!game) throw Error(`${p} | Foundry game is unavailable during settings registration.`);
	q(game.settings, "argonCombatHud"), q(game.settings, "bossBar"), q(game.settings, "paperDoll"), q(game.settings, "paperDollArgonBridge"), jr(game.settings);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/actor-flags.ts
var Nr = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function Pr(e, t) {
	return e.flags?.[Qe]?.[t];
}
function Fr(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? Pr(e, t);
}
async function Ir(e) {
	let t = {};
	for (let n of Nr) {
		if (e.getFlag("wfrp4e-compatibility-box", n) !== void 0) continue;
		let r = Pr(e, n);
		r !== void 0 && (t[`flags.${p}.${n}`] = r);
	}
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/argon-helpers.ts
function Lr(e, t) {
	if (typeof e != "object" || !e) throw Error(`${p} | ${t} must be an object.`);
	return e;
}
function J(e, t) {
	if (typeof e != "string" || !e.trim()) throw Error(`${p} | ${t} must be a non-empty string.`);
	return e;
}
function Rr(e, t) {
	if (typeof e != "boolean") throw Error(`${p} | ${t} must be a boolean.`);
	return e;
}
function zr(e, t) {
	if (!Number.isNumeric(e)) throw Error(`${p} | ${t} must be numeric.`);
	return Number(e);
}
function Br(e) {
	return e == null || e === "" ? null : zr(e, "item quantity");
}
function Vr(e, t, n, r) {
	let i = Fr(e, t);
	if (i === void 0) return r;
	if (!n.includes(i)) throw Error(`${p} | Argon actor flag ${Ze}.${t} has invalid value ${String(i)}.`);
	return i;
}
function Hr(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = Rr(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function Ur(e, t = !1) {
	let n = Lr(e, "Argon item"), r = J(n.type, "Argon item type"), i = J(n.name, `${r} item name`), a = {
		id: J(n.id, `${r} ${i} id`),
		name: i,
		quantity: Br(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = J(n.advanced?.value, `${i} advanced classification`), a.grouped = J(n.grouped?.value, `${i} grouped classification`), a.advances = zr(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = J(n.lore?.value, `${i} lore`), a.memorized = Rr(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = Rr(n.system?.disabled, `${i} disabled state`), a.rollable = Rr(n.rollable?.value, `${i} rollable state`), a.traitBaseName = pr(i)), t && Hr(a, n, r), a;
}
function Y(e) {
	return [...e].map((e) => Ur(e));
}
function X(e, t) {
	let n = new Map([...e].map((e) => [e.id, e]));
	return t.map((e) => {
		let t = n.get(e);
		if (!t) throw Error(`${p} | Selected Argon item ${e} is no longer available.`);
		return t;
	});
}
function Wr(e) {
	return Dr(Ur(e, !0));
}
function Gr(e) {
	let t = Vr(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return X(n, yr(Y(n), t));
}
function Kr(e) {
	let t = Vr(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return X(n, br(Y(n), t));
}
function qr(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return X(t, xr(Y(t)));
}
function Jr(e) {
	let t = [...e.itemTypes.trait];
	return X(t, Sr(Y(t)));
}
function Yr(e) {
	let t = nt.map((e) => ({
		...e,
		type: "characteristic"
	})), n = rt.map((e) => ({
		name: Xr(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = X(r, Cr(Y(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function Xr({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = ti(`NAME.${e}`, t);
	return n ? `${i} (${ti(n, r)})` : i;
}
function Zr(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = wr(String(t)), r = [...e.items];
	return X(r, Er(Y(r), n));
}
function Qr(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function $r(e) {
	return hr(Ur(e));
}
function ei(e) {
	return gr(Ur(e));
}
function ti(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/integrations/enhancedcombathud/buttons.ts
function ni(e) {
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
				details: Wr(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = Qr(this.item);
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
			let e = Kr(this.actor), t = qr(this.actor), s = Jr(this.actor), c = Yr(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = Zr(this.actor), u = [
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
				icon: `${et}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${et}/drink-me.webp`,
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
function ri() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!v("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/functions/integrations/enhancedcombathud/movement.ts
function ii(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function ai(e, t, n) {
	ii(e, "move score"), ii(t, "maximum distance"), ii(n, "used distance");
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
function oi(e) {
	return ii(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/integrations/enhancedcombathud/panels.ts
function si(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function ci(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function li(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return $e;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await Ir(this.actor), await super._onConfigure(e);
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
			}), n = Gr(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return si(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return si(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return ci(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += si(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = ai(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${oi(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${oi(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: oi(t.bubbleDistance),
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
function di(e) {
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
			if (!$r(n) || n.actor !== this.actor) throw Error(`${p} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let r = e.currentTarget.dataset.set, i = e.currentTarget.dataset.slot;
			if (!r || !i) throw Error(`${p} | Argon weapon-set drop target has no set or slot identifier.`);
			let a = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			a[r] ??= {}, a[r][i] = n.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", a), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!Fr(this.actor, "switchEquip")) return;
			let n = Or(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(ei).map((e) => ({
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
function fi() {
	h("enhancedcombathud") && v("argonCombatHud") && (ri(), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = ni(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = li(e), a = di(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	}));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/panels.ts
function pi(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = ni(e);
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
function mi(e) {
	return e instanceof Error ? e.message : String(e);
}
function hi(e, t) {
	je(`${m}: ${e}. ${mi(t)}`, t);
}
function gi(e, t) {
	e.catch((e) => hi(t, e));
}
//#endregion
//#region src/module/integrations/paper-doll-argon/register-integration.ts
function _i() {
	return v("paperDoll") && v("argonCombatHud") && v("paperDollArgonBridge");
}
function vi(e, t) {
	!_i() || !x(e) || Zt(t) && gi(Qt(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function yi() {
	h("fvtt-paper-doll-ui") && h("enhancedcombathud") && _i() && (Hooks.on("argonInit", (e) => {
		let { PaperDollQuickItemsPanel: t } = pi(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", vi));
}
//#endregion
//#region src/module/integrations/splatter/configuration-menu.ts
var bi = `${p}.Splatter.Configuration`;
function xi(e) {
	return game?.i18n.localize(`${bi}.${e}`) ?? e;
}
var Si = class extends foundry.applications.api.ApplicationV2 {
	async render(e) {
		try {
			await yn(), ui?.notifications?.info(xi("Success"));
		} catch (e) {
			je(xi("Error"), e);
		}
		return this;
	}
}, Ci = `${p}.Splatter.Configuration`;
function wi() {
	if (h("splatter")) {
		if (!game) throw Error(`${p} | Foundry game is unavailable during Splatter registration.`);
		game.settings.registerMenu(p, "configureSplatter", {
			hint: `${Ci}.Hint`,
			icon: "fa-solid fa-droplet",
			label: `${Ci}.Button`,
			name: `${Ci}.Name`,
			restricted: !0,
			type: Si
		});
	}
}
//#endregion
//#region src/module/integrations/scene-packer/repair-mad-prefab-exclusions.ts
var Ti = /* @__PURE__ */ new WeakSet();
function Ei(e) {
	if (Ti.has(e)) return !1;
	let t = e.Initialise, n = /* @__PURE__ */ new Set();
	return e.Initialise = function(e, ...r) {
		let i = e?.moduleName, a = i ? game?.modules.get(i) : void 0, o = e?.ignoredCompendiumPacks;
		if (!i?.startsWith("mad-") || !a?.active || !a.packs) return t.call(this, e, ...r);
		let s = `${i}-prefabs`;
		return !Array.isArray(o) || !o.includes(s) || Array.from(a.packs).some((e) => e.name === s) ? t.call(this, e, ...r) : (n.has(i) || (n.add(i), console.warn(`${p} | ${i}: skipped unavailable Scene Packer exclusion ${s}.`)), t.call(this, {
			...e,
			ignoredCompendiumPacks: o.filter((e) => e !== s)
		}, ...r));
	}, Ti.add(e), !0;
}
//#endregion
//#region src/module/integrations/scene-packer/register-integration.ts
function Di() {
	h("scene-packer") && game?.system.id === "wfrp4e" && typeof ScenePacker < "u" && Ei(ScenePacker);
}
//#endregion
//#region src/module/integrations/fa-nexus/repair-forge-owner-detection.ts
var Oi = /* @__PURE__ */ new WeakSet();
function ki(e, t) {
	if (Oi.has(e)) return !1;
	let n = e._detectForgeAccountId;
	return e._detectForgeAccountId = async function() {
		let e = t();
		return this.isRunningOnForge() && typeof e == "string" && /^[a-zA-Z0-9_-]+$/.test(e) && e !== "bazaar" ? (this.forgeAccountId = e, !0) : n.call(this);
	}, Oi.add(e), !0;
}
//#endregion
//#region src/module/integrations/fa-nexus/register-integration.ts
async function Ai() {
	if (!h("fa-nexus") || game?.system.id !== "wfrp4e" || typeof ForgeAPI > "u") return;
	let e = Array.from(document.querySelectorAll("script[type=\"module\"][src]")).find((e) => {
		let t = new URL(e.src).pathname;
		return /\/modules\/fa-nexus\/(?:[^/]+\/)?scripts\/core\/forge-integration\.js$/.test(t);
	});
	if (!e) {
		console.warn(`${p} | FA Nexus Forge integration script was not found; patch skipped.`);
		return;
	}
	try {
		let t = (await import(
			/* @vite-ignore */
			e.src
)).forgeIntegration;
		if (typeof t?._detectForgeAccountId != "function" || typeof t.isRunningOnForge != "function") throw Error("FA Nexus Forge integration API is unavailable.");
		ki(t, () => ForgeAPI.lastStatus?.ownerUserId);
	} catch (e) {
		console.error(`${p} | Could not install FA Nexus Forge compatibility.`, e);
	}
}
//#endregion
//#region src/module/patches/wfrp4e/repair-data-model-migrations.ts
var ji = /* @__PURE__ */ new WeakSet();
function Mi(e) {
	let t = e.migrateData;
	return typeof t != "function" || ji.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, ji.add(e), !0);
}
function Ni() {
	return [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(Mi(t)), 0);
}
//#endregion
//#region src/module/patches/wfrp4e/repair-roll-modes.ts
function Pi() {
	let e = game?.wfrp4e?.config, t = CONFIG.ChatMessage.modes;
	return !e || !t ? !1 : (e.rollModes = foundry.utils.deepClone(t), !0);
}
//#endregion
//#region src/functions/patches/wfrp4e/chat-card-references.ts
function Z(e) {
	return typeof e == "object" && e ? e : {};
}
function Q(e) {
	return typeof e == "string" ? e : "";
}
function Fi(e) {
	let t = Z(e);
	return {
		kind: "speaker",
		actor: Q(t.actor),
		scene: Q(t.scene),
		token: Q(t.token)
	};
}
function Ii(e) {
	return Fi(Z(Z(e).context).speaker);
}
function Li(e) {
	let t = e.system ?? {};
	switch (e.type) {
		case "test": return [Ii(t.testData)];
		case "opposed": {
			let e = Z(t.opposedTestData);
			return [Ii(e.attackerTestData), Ii(e.defenderTestData)];
		}
		case "magic": {
			let e = Z(t.sourceData), n = [{
				kind: "uuid",
				uuid: Q(e.actor)
			}];
			return e.test && n.push({
				kind: "message",
				id: Q(e.test),
				required: !1
			}), n;
		}
		case "handler": {
			let e = Z(t.opposedData), n = [{
				kind: "message",
				id: Q(e.attackerMessageId),
				required: !0
			}];
			return e.targetSpeakerData && n.push(Fi(e.targetSpeakerData)), e.defenderMessageId && n.push({
				kind: "message",
				id: Q(e.defenderMessageId),
				required: !0
			}), n;
		}
		default: return [];
	}
}
//#endregion
//#region src/module/patches/wfrp4e/chat-card-text.ts
function Ri(e) {
	let t = new DOMParser().parseFromString(e, "text/html").body;
	for (let e of t.querySelectorAll("script, style, template, button, input, select, textarea, .chat-button, a[data-action], [role='button'], .dice-tooltip, .applied-breakdown, .secret:not(.revealed), [hidden], [aria-hidden='true']")) e.remove();
	for (let e of t.querySelectorAll("img")) e.replaceWith(t.ownerDocument.createTextNode(e.alt ? ` ${e.alt} ` : ""));
	for (let e of t.querySelectorAll("br, p, div, li, tr, h1, h2, h3, h4, h5, h6")) e.append(t.ownerDocument.createTextNode("\n"));
	for (let e of t.querySelectorAll("td, th")) e.append(t.ownerDocument.createTextNode(" "));
	return (t.textContent ?? "").split("\n").map((e) => e.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}
function zi(e) {
	let t = document.createElement("p");
	return t.textContent = e, t.style.whiteSpace = "pre-line", t;
}
//#endregion
//#region src/module/patches/wfrp4e/render-orphaned-chat-cards.ts
var Bi = /* @__PURE__ */ new WeakSet();
function Vi(e) {
	if (!game) return !1;
	switch (e.kind) {
		case "speaker": return e.scene && e.token ? !!game.scenes.get(e.scene)?.tokens.get(e.token)?.actor : !!(e.actor && game.actors.get(e.actor));
		case "uuid": return !!(e.uuid && fromUuidSync(e.uuid)?.documentName === "Actor");
		case "message": {
			let t = game.messages.get(e.id);
			return t ? t._source.type === "test" ? Li(t._source).every(Vi) : !1 : !e.required;
		}
	}
}
async function Hi(e, t) {
	let n = e.toObject(), r = e.visible && e.isContentVisible, i = r ? Ri(n.content) : "", a = new foundry.documents.ChatMessage({
		...n,
		type: "base",
		system: {},
		flags: {},
		content: zi(i).outerHTML
	}), o = await a.renderHTML(t), s = o.querySelector(".message-content");
	if (s) {
		let e = r && a.isContentVisible ? i : Ri(s.innerHTML);
		s.replaceChildren(zi(e));
	}
	return o.addEventListener("contextmenu", (e) => e.stopPropagation(), { capture: !0 }), o;
}
function Ui() {
	let e = CONFIG.ChatMessage.documentClass?.prototype;
	if (!e || Bi.has(e)) return !1;
	let t = e.renderHTML;
	return e.renderHTML = function(e) {
		return Li(this._source).some((e) => !Vi(e)) ? Hi(this, e) : t.call(this, e);
	}, Bi.add(e), !0;
}
//#endregion
//#region src/module/patches/wfrp4e/active-effect-schema.ts
function Wi(e) {
	let t = e.schema;
	if (t.fields.changes) return !1;
	let n = e.defineSchema;
	return e.defineSchema = function() {
		let e = n.call(this);
		return e.changes ||= foundry.data.ActiveEffectTypeDataModel.defineSchema().changes, e;
	}, t.extendFields({ changes: foundry.data.ActiveEffectTypeDataModel.defineSchema().changes }), !0;
}
function Gi() {
	return Object.values(CONFIG.ActiveEffect?.dataModels ?? {}).reduce((e, t) => e + Number(Wi(t)), 0);
}
//#endregion
//#region src/module/patches/wfrp4e/guard-actorless-token-ruler.ts
var Ki = /* @__PURE__ */ new WeakSet(), qi = /* @__PURE__ */ new WeakSet();
function Ji() {
	let e = CONFIG.Token?.rulerClass?.prototype, t = foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	if (!e || !t || e === t || !Object.prototype.isPrototypeOf.call(t, e) || typeof e._getSegmentStyle != "function" || typeof t._getSegmentStyle != "function" || Ki.has(e)) return !1;
	let n = e._getSegmentStyle, r = t._getSegmentStyle;
	return e._getSegmentStyle = function(...e) {
		if (this.token.actor) return n.apply(this, e);
		if (!qi.has(this.token)) {
			qi.add(this.token);
			let { uuid: e, actorId: t, actorLink: n } = this.token.document;
			console.warn("WFRP4e Compatibility Box | Token has no actor; using the core ruler style.", {
				tokenUuid: e,
				actorId: t,
				actorLink: n,
				worldActorExists: !!(t && game?.actors.get(t))
			});
		}
		return r.apply(this, e);
	}, Ki.add(e), !0;
}
//#endregion
//#region src/module/patches/wfrp4e/apply-compatibility-patches.ts
function Yi() {
	game?.system.id === "wfrp4e" && (Pi(), Ni(), Gi(), Ui(), Ji());
}
//#endregion
//#region src/module/wfrp/folders/hooks.ts
var Xi, Zi = !1, Qi = !1;
function $() {
	if (!(!game?.ready || !game.user?.isActiveGM)) {
		if (Zi) {
			Qi = !0;
			return;
		}
		clearTimeout(Xi), Xi = setTimeout(() => {
			$i();
		}, 1e3);
	}
}
async function $i() {
	if (!(!game?.ready || !game.user?.isActiveGM || Zi)) {
		Zi = !0, Qi = !1;
		try {
			await zn();
		} catch (e) {
			console.error(`${m}: WFRP folder cleanup failed.`, e), ui?.notifications?.error(`${m}: WFRP cleanup failed and may be incomplete. See the console for details.`, {
				console: !1,
				permanent: !0
			});
		} finally {
			Zi = !1, Qi && $();
		}
	}
}
function ea() {
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
function ta() {
	Hooks.once("setup", () => Pn($)), ea(), Hooks.once("init", () => {
		Yi(), Mr(), Di(), Ai(), Vn(), cr(), fi(), Ht(), yi(), wi();
	});
}
//#endregion
//#region src/main.ts
ta();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map