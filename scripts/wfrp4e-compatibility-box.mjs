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
function d(e, t) {
	return e.twoHanded ? "both" : e.offhand ? t === "l" ? "r" : "l" : t;
}
function f(e, t) {
	return Number(t.twoHanded) - Number(e.twoHanded) || e.name.localeCompare(t.name) || e.id.localeCompare(t.id);
}
function ee(e, n) {
	let r = e.filter((e) => e.type === "weapon" && e.equipped).sort(f);
	return t.flatMap((e) => {
		let t = e === "MAIN_LEFT" ? "l" : "r", i = r.find((e) => {
			let r = d(e, n);
			return r === "both" || r === t;
		});
		return i ? [{
			slotId: e,
			uuid: i.uuid
		}] : [];
	});
}
function te(e, t) {
	return [...u(e), ...ee(e, t)];
}
//#endregion
//#region src/module/functions/patches/paper-doll/derive-paper-doll-slot-state.ts
function ne(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function re(n, r, i, a) {
	let o = ne(n), s = new Map(r.map((e) => [e.slotId, e.uuid]));
	for (let n of [...e, ...t]) {
		if (!a.has(n)) continue;
		let e = o[n]?.["0"] ?? null, t = s.get(n) ?? null;
		t ? (o[n] ??= {}, o[n][0] = t) : e && i.has(e) && (o[n] ??= {}, o[n][0] = null);
	}
	return o;
}
function ie(e, t, n) {
	let r = new Map(t.map((e) => [e.uuid, e])), i = ne(e);
	for (let e of Object.values(i)) for (let [t, i] of Object.entries(e)) !i || n.has(i) || r.get(i)?.equipped === !1 && (e[t] = null);
	return i;
}
function ae(e, t, n, r, i) {
	return ie(re(e, t, n, r), i, n);
}
function oe(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-paper-doll-slot-state.ts
function se(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ce(e) {
	return /^(0|[1-9]\d*)$/.test(e);
}
function le(e) {
	return e == null || typeof e == "string" && e.length > 0;
}
function p(e) {
	return se(e) && Object.entries(e).every(([e, t]) => e.length > 0 && se(t) && Object.entries(t).every(([e, t]) => ce(e) && le(t)));
}
//#endregion
//#region src/module/constants.ts
var m = "wfrp4e-compatibility-box", h = "Drowsy's WFRP4e Compatibility Box";
//#endregion
//#region src/module/foundry/integrations/is-module-active.ts
function g(e) {
	if (typeof game > "u" || !game) throw Error("Optional module integrations require an initialized Foundry game.");
	return game.modules.get(e)?.active === !0;
}
//#endregion
//#region src/module/foundry/settings/optional-features.ts
var _ = {
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
function v(e) {
	return _[e].targetModuleIds.every((e) => g(e));
}
//#endregion
//#region src/module/foundry/settings/is-optional-feature-enabled.ts
function y(e) {
	let t = _[e];
	return v(e) && game?.settings.get("wfrp4e-compatibility-box", t.settingKey) !== !1;
}
//#endregion
//#region src/module/functions/patches/paper-doll/equipment-update.ts
function ue(e) {
	return e.slotId === "MAIN_LEFT" ? "l" : e.slotId === "MAIN_RIGHT" ? "r" : null;
}
function de(e, t, n, r) {
	if (t === null) return {};
	let i = {};
	if (t || (i["system.equipped.value"] = !0), e?.type !== "weapon") return i;
	if (!r) throw Error(`Weapon ${e.uuid} requires the actor's main hand.`);
	let a = ue(n), o = e.twoHanded ? !1 : a ? a !== r : void 0;
	return o !== void 0 && e.offhand !== o && (i["system.offhand.value"] = o), i;
}
function fe(e) {
	return e === !0 ? { "system.equipped.value": !1 } : {};
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-item-allowed-in-slot.ts
function pe(e, t) {
	switch (t) {
		case "HEAD": return e.armourPoints.head > 0;
		case "BODY": return e.armourPoints.body > 0;
		case "GLOVES": return e.armourPoints.lArm > 0 || e.armourPoints.rArm > 0;
		case "BOOTS": return e.armourPoints.lLeg > 0 || e.armourPoints.rLeg > 0;
		default: return !1;
	}
}
function me(e, t, n) {
	return n === "MAIN_LEFT" || n === "MAIN_RIGHT" ? t?.type === "weapon" : n === "HEAD" || n === "BODY" || n === "GLOVES" || n === "BOOTS" ? t?.type === "armour" && pe(t, n) : e !== "weapon" && e !== "armour";
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-runtime-types.ts
var he = new Set([
	"character",
	"npc",
	"creature"
]);
function b(e) {
	return typeof e == "object" && !!e;
}
function x(e) {
	return b(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function S(e) {
	return x(e) && he.has(e.type);
}
function ge(e) {
	return b(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-equipment.ts
var _e = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function ve(e) {
	if (!b(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function ye(e, t) {
	let n = ve(e)[t];
	if (n === void 0) return null;
	if (!b(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function be(e, t) {
	let n = ye(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function C(e) {
	return ye(e, "equipped");
}
function xe(e) {
	return C(e) !== null;
}
function Se(e) {
	let t = ve(e).AP;
	if (!b(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(_e.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function Ce(e) {
	if (!b(e.system) || !b(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function we(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: be(e, "equipped"),
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
		offhand: be(e, "offhand"),
		twoHanded: be(e, "twohanded"),
		type: "weapon"
	};
}
function Te(e, t) {
	return me(e.type, we(e), t);
}
async function Ee(e, t, n) {
	let r = we(t), i = de(r, r?.equipped ?? C(t), n, r?.type === "weapon" ? Ce(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function De(e) {
	let t = fe(we(e)?.equipped ?? C(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/foundry/notifications/notify-user.ts
function Oe(e, t) {
	t === void 0 ? console.error(e) : console.error(e, t);
}
function w(e, t) {
	Oe(e, t), ui?.notifications?.error(e);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/report-paper-doll-error.ts
function ke(e) {
	return e instanceof Error ? e.message : String(e);
}
function T(e, t) {
	w(`${h}: ${e}. ${ke(t)}`, t);
}
function E(e, t) {
	e.catch((e) => T(t, e));
}
//#endregion
//#region src/module/foundry/patches/paper-doll/synchronize-paper-doll.ts
var D = "fvtt-paper-doll-ui", O = "slots", k = /* @__PURE__ */ new Map(), Ae = /* @__PURE__ */ new Set();
function je(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Me(e) {
	let t = e.getFlag(D, O);
	if (t === void 0) return {};
	if (!p(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return je(t);
}
function Ne() {
	let n = game?.settings.get(D, "globalConfig"), r = new Set([...e, ...t]);
	if (b(n) && Object.keys(n).length === 0) return r;
	if (!b(n) || !b(n.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let i = Object.values(n.SLOTS);
	if (!i.every(b)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let a = new Set(i.flatMap((e) => Object.keys(e)));
	return a.size ? a : r;
}
function Pe(e) {
	return k.has(e.uuid);
}
function Fe(e) {
	if (!x(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function Ie(e) {
	if (!e || e.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function Le(e) {
	let t = Me(e), n = Array.from(e.items), r = n.map(we).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: C(e),
		uuid: e.uuid
	})), o = ae(t, te(r, Ce(e)), i, Ne(), a);
	return oe(t, o) ? "unchanged" : (await e.setFlag(D, O, o), "synchronized");
}
async function A(e) {
	Fe(e), Ie(game);
	let t = e;
	if (!S(t) || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !y("paperDoll")) return "unavailable";
	let n = k.get(t.uuid);
	if (n) return await n, A(t);
	let r = Le(t).finally(() => {
		k.get(t.uuid) === r && k.delete(t.uuid);
	});
	return k.set(t.uuid, r), r;
}
function Re(e) {
	S(e) && (Ae.has(e.uuid) || (Ae.add(e.uuid), queueMicrotask(() => {
		Ae.delete(e.uuid), E(A(e), `could not synchronize equipped items for ${e.uuid}`);
	})));
}
async function ze() {
	return Ie(game), Promise.all(Array.from(game.actors).filter(S).map(A));
}
//#endregion
//#region src/module/foundry/settings/get-optional-feature-statuses.ts
function Be() {
	return Object.entries(_).map(([e, t]) => ({
		available: v(e),
		enabled: y(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
//#endregion
//#region src/module/functions/integrations/paper-doll-argon/bridge.ts
var Ve = ["TRINKET", "WRIST_RIGHT"];
function He(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function Ue(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Ve) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(He)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function We(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function Ge({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function Ke(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/constants.ts
var qe = "enhancedcombathud", Je = m, Ye = "enhancedcombathud-wfrp4e", Xe = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", Ze = "modules/enhancedcombathud/icons", Qe = [
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
], $e = [{
	key: "ws",
	icon: `${Ze}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${Ze}/bolt-spell-cast.webp`
}], et = [
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
async function tt() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/module/functions/patches/paper-doll/find-slot-changes.ts
function nt(e, t, n) {
	return e[t]?.[n] ?? null;
}
function rt(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = nt(e, i, a), o = nt(t, i, a);
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
var it = Symbol.for("paper-doll-wfrp4e.equipped-state");
function at() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function ot(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function st(e) {
	if (!b(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function ct() {
	return Promise.resolve();
}
function lt() {
	let e = at(), t = e?.equip, n = globalThis.fromUuid;
	if (ot(e, t, n), !n) throw Error("Foundry UUID resolution is unavailable.");
	if (e[it] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!ge(a) || x(this.actor) && !S(this.actor)) return r.call(this, e, t, i);
		let o = st(i);
		if (!t) return ct();
		if (!S(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!Te(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await Ee(this.actor, a, o);
		} catch (e) {
			T(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await A(this.actor);
			} catch (e) {
				T(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[it] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/enforce-paper-doll-slot-types.ts
var ut = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function dt() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function ft(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function pt() {
	let e = dt(), t = e?.filterItems;
	if (ft(e, t), e[ut] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => ge(e) && Te(e, t));
	}, e[ut] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-slot-tooltips.ts
var mt = ".paper-doll .paper-doll-slot", ht = `data-${m}-drag-tooltip`, gt = `data-${m}-tooltip`, _t = `data-${m}-original-tooltip`, vt = {
	HEAD: {
		key: `${m}.SlotTooltip.Head`,
		fallback: "Head armour"
	},
	CAPE: {
		key: `${m}.SlotTooltip.Cape`,
		fallback: "Aesthetic Item"
	},
	BODY: {
		key: `${m}.SlotTooltip.Body`,
		fallback: "Body armour"
	},
	GLOVES: {
		key: `${m}.SlotTooltip.Gloves`,
		fallback: "Arm armour"
	},
	BOOTS: {
		key: `${m}.SlotTooltip.Boots`,
		fallback: "Leg armour"
	},
	TRINKET: {
		key: `${m}.SlotTooltip.Trinket`,
		fallback: "Ready Item"
	},
	PENDANT: {
		key: `${m}.SlotTooltip.Pendant`,
		fallback: "Amulet"
	},
	RING: {
		key: `${m}.SlotTooltip.Ring`,
		fallback: "Worn Item"
	},
	WRIST_LEFT: {
		key: `${m}.SlotTooltip.WristLeft`,
		fallback: "Light Source"
	},
	WRIST_RIGHT: {
		key: `${m}.SlotTooltip.WristRight`,
		fallback: "Quick Use Item"
	},
	MAIN_LEFT: {
		key: `${m}.SlotTooltip.MainLeft`,
		fallback: "Main hand"
	},
	MAIN_RIGHT: {
		key: `${m}.SlotTooltip.MainRight`,
		fallback: "Off hand"
	}
}, yt = !1;
function bt(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(mt);
	return t?.closest(".paper-doll") ? t : null;
}
function xt() {
	document.querySelectorAll(`[${gt}]`).forEach((e) => {
		let t = e.getAttribute(_t);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(gt), e.removeAttribute(_t);
	});
}
function St() {
	document.querySelectorAll(mt).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(ht, t), e.removeAttribute("data-tooltip"));
	});
}
function Ct() {
	document.querySelectorAll(`[${ht}]`).forEach((e) => {
		let t = e.getAttribute(ht);
		t && (e.dataset.tooltip = t), e.removeAttribute(ht);
	});
}
function wt(e) {
	if (yt || e.hasAttribute(gt)) return;
	let t = vt[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(_t, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(gt, "");
}
function Tt(e) {
	let t = bt(e.target);
	t && wt(t);
}
function Et() {
	yt = !0, xt(), St();
}
function Dt() {
	yt = !1, Ct();
}
function Ot() {
	document.addEventListener("pointerover", Tt, !0), document.addEventListener("dragstart", Et, !0), document.addEventListener("dragend", Dt, !0);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-paper-doll-hooks.ts
var j = /* @__PURE__ */ new Map();
function M() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && y("paperDoll");
}
function kt(e) {
	if (!b(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!b(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[D];
	return b(n) ? "slots" in n ? p(n.slots) ? {
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
function At(e) {
	let t = kt(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function jt(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function Mt(e, t) {
	let n = j.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), j.set(e.uuid, n);
}
function Nt(e) {
	if (!b(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function Pt(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (T(n, AggregateError(r, n)), await A(e));
}
function Ft(e, t, n) {
	if (!M() || !S(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!b(i) || typeof i.item != "string") continue;
		let t = Nt(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = jt(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!Te(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(Ee(e, n, t));
	}
	r.length && E(Pt(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function It(e, t) {
	if (!M() || !S(e) || Pe(e)) return;
	let n = At(t);
	if (!n) return;
	let r = e.getFlag(D, O);
	if (r !== void 0) {
		if (!p(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of rt(r, n)) {
			if (!t.from) continue;
			let n = jt(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && Mt(e, n.uuid);
		}
	}
}
function Lt(e, t) {
	if (!M() || !S(e) || !At(t)) return;
	let n = j.get(e.uuid);
	j.delete(e.uuid), n?.size && E(Pt(e, Array.from(n, (t) => {
		let n = jt(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(De), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function Rt(e) {
	!M() || !ge(e) || e.type !== "armour" && e.type !== "weapon" && !xe(e) || S(e.parent) && Re(e.parent);
}
function zt() {
	Ot(), Hooks.on("paper-doll-swap", Ft), Hooks.on("preUpdateActor", It), Hooks.on("updateActor", Lt), Hooks.on("updateItem", Rt), Hooks.once("ready", () => {
		if (M()) {
			try {
				pt(), lt();
			} catch (e) {
				throw T("could not initialize the required Paper Doll integration", e), e;
			}
			E(ze(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/fvtt-paper-doll-ui/register-integration.ts
var Bt = "fvtt-paper-doll-ui";
function Vt() {
	g("fvtt-paper-doll-ui") && y("paperDoll") && zt();
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/bridge-runtime.ts
var Ht = "activeWeaponSet", N = "slots", Ut = "weaponSets";
function Wt(e) {
	let t = e.getFlag(Bt, N);
	if (t === void 0) return {};
	if (!p(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function Gt(e) {
	let t = e.getFlag(qe, Ht);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function Kt(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function qt(e) {
	let t = e.getFlag(qe, Ut);
	if (t === void 0) return {};
	if (!b(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !b(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: Kt(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: Kt(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function Jt(e, t) {
	let n = qt(e), r = Ge({
		activeSetId: Gt(e),
		mainHand: Ce(e),
		mainSlots: We(t),
		weaponSets: n
	}), i = !Ke(n, r);
	return i && await e.setFlag(qe, Ut, r), await tt(), i ? "synchronized" : "unchanged";
}
function Yt(e) {
	if (!x(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return Ue(Wt(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function Xt(e) {
	if (!b(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!b(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[Bt];
	if (!b(n) || !(N in n)) return null;
	let r = n[N];
	if (!p(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function Zt(e) {
	if (!x(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return !S(e) || !y("paperDoll") || !y("argonCombatHud") || !y("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", N) === void 0 ? (await tt(), "unchanged") : Jt(e, Wt(e));
}
//#endregion
//#region src/module/functions/integrations/splatter/configuration.ts
var P = {
	creatureType: "details.species.value",
	creatureTypeCustom: "",
	currentHp: "status.wounds.value",
	maxHp: "status.wounds.max",
	useWounds: !1,
	useBloodsheet: !0
}, Qt = "#a51414d8", $t = "#7e1717dc", en = "#b31f18d8", tn = "#b01832d8", nn = "#861a24d8", rn = "#541e1ed8", F = "#6a0e0ed8", I = "#6f3518e0", L = "#621010e0", an = "#771616dc", R = "#440707d8", z = "#14101490", B = "#0b080de8", on = [
	["Jabberslythe", "#78d61be8"],
	["Chameleon Skink", F],
	["Kroxigor", F],
	["Saurus", F],
	["Suarus", F],
	["Skink", F],
	["Slann", F],
	["Reptile", F],
	["Ogre Gorger", rn],
	["Gorger", rn],
	["Orca", Qt],
	["Bloodletter", B],
	["Chaos Fury", B],
	["Blue Horror", B],
	["Pink Horror", B],
	["Nurgling", B],
	["Greater Daemon", B],
	["Daemon Prince", B],
	["Lesser Demon", B],
	["Daemon", B],
	["Demon", B],
	["Rat Ogre", an],
	["Wolf Rat", an],
	["Skaven", an],
	["Bray Shaman", L],
	["Beastman", L],
	["Beastmen", L],
	["Bestigor", L],
	["Minotaur", L],
	["Pestigor", L],
	["Razorgor", L],
	["Ungor", L],
	["Gor", L],
	["Greenskin", I],
	["Forest Goblin", I],
	["Night Goblin", I],
	["Hobgoblin", I],
	["Goblin", I],
	["Black Orc", I],
	["Orc", I],
	["Snotling", I],
	["Squig", I],
	["Skeleton", z],
	["Ghost", z],
	["Tomb Banshee", z],
	["Banshee", z],
	["Undead", R],
	["Vampire", R],
	["Ghoul", R],
	["Wight", R],
	["Liche", R],
	["Maurngul", R],
	["Mourngul", R],
	["Human", Qt],
	["Dwarf", $t],
	["Halfling", en],
	["High Elf", tn],
	["helf", tn],
	["Wood Elf", nn],
	["welf", nn],
	["Ogre", rn]
];
function sn() {
	let e = {};
	for (let [t, n] of on) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function cn(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function ln(e = {}) {
	let t = sn();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? Qt;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function un(e, t = {}) {
	let n = cn(e);
	for (let [e, r] of Object.entries(ln(t))) n[e] ??= r;
	return n;
}
function dn(e, t = {}) {
	let n = cn(e);
	return Object.keys(ln(t)).every((e) => Object.hasOwn(n, e));
}
//#endregion
//#region src/module/foundry/integrations/splatter/constants.ts
var V = "splatter", fn = "BloodSheetData", pn = "splatterIgnoreSetupPrompt", mn = [fn, ...Object.keys(P)];
function hn() {
	return game?.wfrp4e?.config.species ?? {};
}
function gn() {
	let e = game?.settings.settings;
	if (e) {
		for (let t of mn) if (!e.has(`splatter.${t}`)) throw Error(`Splatter setting ${t} is unavailable.`);
	}
}
function _n() {
	return gn(), Object.entries(P).every(([e, t]) => game?.settings.get("splatter", e) === t) && dn(game?.settings.get("splatter", "BloodSheetData"), hn());
}
async function vn() {
	if (!game) throw Error("Foundry game is unavailable while configuring Splatter.");
	if (!game.ready) throw Error("Foundry must finish loading before Splatter can be configured.");
	if (!g("splatter")) throw Error("Splatter must be active before it can be configured.");
	if (!game.user?.isGM) throw Error("Only a gamemaster can change Splatter's world settings.");
	gn();
	let e = un(game.settings.get(V, fn), hn());
	await game.settings.set(V, fn, e);
	for (let [e, t] of Object.entries(P)) await game.settings.set(V, e, t);
	return {
		automaticBloodColors: !0,
		bloodColorCount: Object.keys(e).length,
		speciesPath: P.creatureType
	};
}
//#endregion
//#region src/module/functions/integrations/bossbar/health.ts
var H = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
};
function yn(e) {
	return Object.entries(H).every(([t, n]) => e[t] === n);
}
function bn(e, t) {
	return !Number.isFinite(e) || !Number.isFinite(t) || t <= 0 ? 0 : Math.min(100, Math.max(0, 100 * e / t));
}
function xn(e) {
	let t = Number.isFinite(e.maxCriticals) ? Math.max(0, Math.floor(e.maxCriticals)) : 0;
	return {
		max: t,
		remaining: Math.max(0, t - Math.max(0, e.criticals))
	};
}
function Sn(e) {
	return (typeof e == "number" || typeof e == "string" && e.trim() !== "") && Number.isFinite(Number(e));
}
//#endregion
//#region src/module/foundry/settings/compatibility-prompts.ts
var Cn = Promise.resolve(), wn = /* @__PURE__ */ new Map();
function Tn(e, t) {
	Hooks.once("setup", () => {
		game?.settings.register(m, e, {
			name: `${t}.IgnorePrompt.Name`,
			hint: `${t}.IgnorePrompt.Hint`,
			config: game.user?.isGM === !0,
			default: !1,
			scope: "world",
			type: Boolean
		});
	});
}
async function En(e) {
	if (!game?.ready || game.system.id !== "wfrp4e" || !game.user?.isGM || game.users?.activeGM && game.users.activeGM.id !== game.user.id || !e.isEnabled() || game.settings.get("wfrp4e-compatibility-box", e.ignoreSetting) === !0 || e.matches()) return;
	let t = (e) => game?.i18n.localize(`wfrp4e-compatibility-box.Settings.CompatibilityPrompts.${e}`) ?? e, n = await foundry.applications.api.DialogV2.wait({
		window: { title: e.title() },
		position: { width: 600 },
		content: `${e.content()}<p>${t("Dismissal")}</p>`,
		buttons: [
			{
				action: "configure",
				label: t("Configure"),
				default: !0
			},
			{
				action: "keep",
				label: t("Ignore")
			},
			{
				action: "later",
				label: t("Later")
			}
		],
		rejectClose: !1
	});
	n === "configure" ? await e.configure() : n === "keep" && await game.settings.set(m, e.ignoreSetting, !0);
}
function Dn(e) {
	let t = wn.get(e.ignoreSetting);
	if (t) return t;
	let n = Cn.then(() => En(e)).finally(() => {
		wn.delete(e.ignoreSetting);
	});
	return wn.set(e.ignoreSetting, n), Cn = n.catch(() => {}), n;
}
//#endregion
//#region src/module/foundry/integrations/bossbar/constants.ts
var U = "bossbar", W = {
	automatic: "bossBarAutomatic",
	stacked: "bossBarStacked",
	woundsStyle: "bossBarWoundsStyle",
	ignorePrompt: "bossBarIgnoreSetupPrompt"
};
//#endregion
//#region src/module/foundry/integrations/bossbar/configuration.ts
function G(e) {
	return game?.i18n.localize(`wfrp4e-compatibility-box.BossBar.${e}`) ?? e;
}
function K(e) {
	console.error(`${m} | Boss Bar integration failed.`, e), ui?.notifications?.error(G("Error"));
}
function On() {
	return {
		currentHpPath: game?.settings.get(U, "currentHpPath"),
		maxHpPath: game?.settings.get(U, "maxHpPath"),
		woundsSystem: game?.settings.get(U, "woundsSystem")
	};
}
function kn() {
	return game?.settings.get("wfrp4e", "uiaCrits") === !0;
}
function An() {
	if (!kn()) return;
	let e = game?.settings.get(U, "barStyles"), t = e.find((e) => e.id === "segmented");
	if (!(!t || e[0] === t)) return [t, ...e.filter((e) => e !== t)];
}
async function jn() {
	if (!game?.ready || !game.user?.isGM || !y("bossBar")) throw Error("An active Boss Bar integration and a ready GM session are required.");
	for (let e of Object.keys(H)) if (!game.settings.settings?.has(`bossbar.${e}`)) throw Error(`Boss Bar setting ${e} is unavailable.`);
	for (let [e, t] of Object.entries(H)) await game.settings.set(U, e, t);
	await game.settings.set(m, W.stacked, !0);
	let e = An();
	return e && await game.settings.set(U, "barStyles", e), ui?.notifications?.info(G("Configured")), { ...H };
}
function Mn() {
	return Dn({
		ignoreSetting: W.ignorePrompt,
		isEnabled: () => y("bossBar"),
		matches: () => yn(On()) && game?.settings.get("wfrp4e-compatibility-box", W.stacked) === !0 && !An(),
		title: () => G("SetupTitle"),
		content: () => `<p>${G("SetupDescription")}</p><p>${G(kn() ? "SetupUpInArms" : "SetupCore")}</p><p>${G("SetupCustomization")}</p>`,
		configure: jn
	});
}
//#endregion
//#region src/module/wfrp/folders/queue.ts
var Nn = /* @__PURE__ */ new WeakMap();
async function Pn(e, t) {
	let n = (Nn.get(e) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		let e = globalThis.navigator?.locks;
		e ? await e.request("foundry:folder-tidy", t) : await t();
	});
	Nn.set(e, n);
	try {
		await n;
	} finally {
		Nn.get(e) === n && Nn.delete(e);
	}
}
//#endregion
//#region src/module/wfrp/folders/merge.ts
async function Fn(e, t, n, r) {
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
function In(e, t) {
	return e.startsWith("wfrp4e-") && [...t].some((e) => /cubicle\s*7/i.test(e.name));
}
function Ln(e, t, n) {
	let r = e["warhammer-lib"], i = e.core, a = [
		r?.source,
		e.source,
		t?.startsWith("Compendium.") ? t.split(".")[1] : void 0,
		i?.sourceId?.startsWith("Compendium.") ? i.sourceId.split(".")[1] : void 0
	];
	for (let [t, n] of Object.entries(e)) n && typeof n == "object" && "initialization-folder" in n && a.push(t);
	return a.find((e) => typeof e == "string" && n.has(e));
}
function Rn(e, t) {
	if (t < 1) throw Error("WFRP folders need at least one available level.");
	return e.length <= t ? [...e] : [...e.slice(0, t - 1), e.slice(t - 1).join("/")];
}
function zn(e, t, n, r) {
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
	}, ee = /* @__PURE__ */ new Set();
	for (let t of d) {
		let i = e.map((e) => ({
			folder: e,
			path: a(e.id)
		})).filter(({ path: e }) => e.some((e) => e.id === t.id)).map(({ folder: e, path: n }) => ({
			folder: e,
			path: n.slice(n.findIndex((e) => e.id === t.id))
		})).sort((e, t) => t.path.length - e.path.length);
		for (let { folder: e, path: t } of i) {
			ee.add(e.id);
			let i = Rn(t.map((e) => e.name), r - 1).at(-1), a = t.length === 1 || r === 2 ? n : t[Math.min(t.length - 2, r - 3)].id;
			(e.parent !== a || e.name !== i) && f.folders.push({
				id: e.id,
				parent: a,
				name: i
			});
		}
	}
	for (let e of t) {
		if (!e.official || o(e.parent) || e.parent && ee.has(e.parent)) continue;
		let t = a(e.parent).map((e) => e.name);
		f.entries.push({
			id: e.id,
			path: Rn(t.length ? t : [e.fallback], r - 1)
		});
	}
	return f;
}
var Bn = ["keepWfrpImportedContentTidy", "keepWfrpCompendiumsTidy"];
function Vn(e) {
	if (!game?.user) throw Error("Foundry user is unavailable during WFRP setting registration.");
	for (let t of Bn) game.settings.register(m, t, {
		name: `${m}.Settings.WfrpFolders.${t}.Name`,
		hint: `${m}.Settings.WfrpFolders.${t}.Hint`,
		config: game.user.isGM === !0,
		default: !0,
		scope: "world",
		type: Boolean,
		onChange: e
	});
}
//#endregion
//#region src/module/wfrp/folders/migration.ts
var Hn = "whence-they-hang";
async function Un(e) {
	if (!e.ready || !e.user?.isGM) return;
	let t = e.settings.storage.get("world");
	if (!t) throw Error("World settings storage is unavailable during WFRP migration.");
	for (let n of Bn) {
		if (t.getSetting(`wfrp4e-compatibility-box.${n}`)) continue;
		let r = t.getSetting(`${Hn}.${n}`)?.value;
		typeof r == "boolean" && await e.settings.set(m, n, r);
	}
}
//#endregion
//#region src/module/wfrp/folders/tidy.ts
var Wn = "__wfrp_tidy_root__", Gn = "Warhammer Fantasy Roleplay";
async function Kn(e, t) {
	await Pn(e, () => qn(e, t));
}
async function qn(e, t) {
	if (!e.ready || !e.user?.isGM || e.system.id !== "wfrp4e") return;
	await Un(e);
	let n = new Set([...e.modules.entries()].filter(([e, t]) => In(e, t.authors ?? [])).map(([e]) => e));
	n.add("wfrp4e");
	let r = (e) => Ln(e.flags ?? {}, e._stats?.compendiumSource, n), i = new Map([...e.modules.entries()].map(([e, t]) => [e, t.title ?? e])), a = async (n, a) => {
		let o = [...e.folders].filter((e) => e.type === n), s = new Set([...o, ...a].map((e) => e.folder?.id)), c = o.filter((e) => !e.folder && (e.name === Gn || e.name === "WFRP")).sort((e, t) => Number(s.has(t.id)) - Number(s.has(e.id)) || e.id.localeCompare(t.id)), l = c[0];
		await Fn(c, o, a, (e) => !!r(e)), l && l.name !== Gn && await l.update({ name: Gn });
		let u = zn(o.map((e) => ({
			id: e.id,
			name: e.name,
			parent: e.folder?.id ?? null,
			official: !!r(e)
		})), a.map((e) => ({
			id: e.id,
			parent: e.folder?.id ?? null,
			official: !!r(e),
			fallback: i.get(r(e)) ?? "WFRP Content"
		})), l?.id ?? Wn, t);
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
		l ??= await d(Gn, null);
		for (let e of u.folders) await o.find((t) => t.id === e.id).update({
			name: e.name,
			folder: e.parent === Wn ? l.id : e.parent
		});
		for (let e of u.entries) {
			let t = l;
			for (let n of e.path) t = o.filter((e) => e.name === n && e.folder?.id === t.id).sort((e, t) => e.id.localeCompare(t.id))[0] ?? await d(n, t.id);
			await a.find((t) => t.id === e.id).update({ folder: t.id });
		}
		await Fn([l], o, a, (e) => !!r(e));
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
async function Jn() {
	game && await Kn(game, CONST.FOLDER_MAX_DEPTH);
}
//#endregion
//#region src/module/functions/folders/empty.ts
function Yn(e, t) {
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
function Xn() {
	if (!game?.ready || !game.user?.isGM) throw Error("Only a GM in a loaded world can purge folders.");
	return game;
}
async function Zn(e) {
	let t = Xn();
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
		candidates: n.flatMap((e) => Yn(e.folders().map((e) => ({
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
async function Qn(e) {
	let t = Xn(), n = {
		deleted: 0,
		skipped: 0
	};
	return await Pn(t, async () => {
		for (let t of e.candidates) {
			Xn();
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
var $n = "Purge Empty Folders";
function er(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
async function tr() {
	if (!game?.ready || !game.user?.isGM) {
		ui?.notifications?.warn("Only a GM in a loaded world can purge empty folders.");
		return;
	}
	try {
		let e = await foundry.applications.api.DialogV2.wait({
			window: { title: $n },
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
		let t = await Zn(e), n = t.skippedPacks ? ` Skipped ${t.skippedPacks} locked packs.` : "";
		if (!t.candidates.length) {
			ui?.notifications?.info(`No empty folders found.${n}`);
			return;
		}
		let r = t.candidates.map(({ group: e, name: t }) => `<li>${er(e.label)}: ${er(t)}</li>`).join("");
		if (await foundry.applications.api.DialogV2.wait({
			window: { title: $n },
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
		let i = await Qn(t);
		ui?.notifications?.info(`Removed ${i.deleted} empty folders. Skipped ${i.skipped} folders that changed.${n}`);
	} catch (e) {
		w(`${$n} stopped. Some folders may already have been removed. See the console for details.`, e);
	}
}
//#endregion
//#region src/module/foundry/api/create-module-api.ts
function nr() {
	return {
		configureBossBar: jn,
		configureSplatter: vn,
		purgeEmptyFolders: tr,
		getOptionalFeatures: Be,
		syncAllPaperDollActors: ze,
		syncPaperDollArgonActor: Zt,
		syncPaperDollActor: A,
		tidyWfrpContent: Jn
	};
}
//#endregion
//#region src/module/foundry/api/register-module-api.ts
function rr() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(m);
	if (!e) throw Error(`Foundry module registry entry was not found for ${m}.`);
	let t = e;
	t.api = nr();
}
//#endregion
//#region src/module/functions/integrations/bossbar/selection.ts
function ir(e) {
	let t = e.filter((e) => e.enemy), n = (e, t) => e.traits.some((e) => e.trim().toLowerCase() === t), r = t.filter((e) => n(e, "boss"));
	if (r.length) return r;
	let i = t.filter((e) => e.maxWounds >= 30 && n(e, "grim") && (n(e, "leader") || n(e, "champion"))).sort((e, t) => t.maxWounds - e.maxWounds || t.weaponSkill - e.weaponSkill || t.strength - e.strength), a = i[0];
	if (!a) return [];
	let o = i.filter((e) => e.maxWounds === a.maxWounds && e.weaponSkill === a.weaponSkill && e.strength === a.strength);
	return o.length <= 2 ? o : [];
}
//#endregion
//#region src/module/foundry/integrations/bossbar/runtime.ts
function ar() {
	return ui && Reflect.get(ui, "bossBar");
}
function or(e) {
	return Array.from(e.combatants).flatMap(({ actor: e, token: t }) => e ? [{
		uuid: e.uuid,
		enemy: t?.disposition === -1 && !e.hasPlayerOwner,
		traits: Array.from(e.items).filter((e) => e.type === "trait").map((e) => e.name),
		maxWounds: e.system.status?.wounds?.max ?? 0,
		weaponSkill: e.system.characteristics?.ws?.value ?? 0,
		strength: e.system.characteristics?.s?.value ?? 0
	}] : []);
}
function sr(e) {
	return {
		wounds: e.system.status?.wounds?.value ?? 0,
		maxWounds: e.system.status?.wounds?.max ?? 0,
		maxCriticals: e.system.status?.criticalWounds?.max ?? 0,
		criticals: Array.from(e.items).filter((e) => e.type === "critical" && Sn(e.system?.wounds?.value)).length
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/combat.ts
var cr = /* @__PURE__ */ new WeakSet();
async function lr(e) {
	if (!game?.user?.isGM || !y("bossBar") || !game.settings.get("wfrp4e-compatibility-box", W.automatic) || !e.scene || cr.has(e)) return;
	let t = ir(or(e)), n = e.scene.getFlag("bossbar", "actors") ?? [], r = new Set(n.map((e) => e.uuid)), i = game.settings.get(U, "barStyles"), a = t.filter((e) => r.has(e.uuid) ? !1 : (r.add(e.uuid), !0)).map((e) => ({
		uuid: e.uuid,
		style: i[0]?.id ?? "default",
		hideName: !1
	}));
	if (a.length) {
		cr.add(e);
		try {
			await e.scene.setFlag(U, "actors", [...n, ...a]);
		} finally {
			cr.delete(e);
		}
	}
}
//#endregion
//#region src/module/foundry/integrations/bossbar/critical-segments.ts
var ur = "wfrp-bossbar-segments", dr = "http://www.w3.org/2000/svg", fr = [
	"background",
	"bar",
	"foreground"
], pr = [
	"bg",
	"bar",
	"fg"
];
function mr(e, t) {
	let n = fr.map((t) => e.querySelector(`:scope > .bar-${t}`)), r = n.map((e) => e?.querySelector(":scope > img")), i = r.every((e, t) => e?.getAttribute("src")?.split(/[?#]/)[0]?.endsWith(`/bossbar/resources/matching-images/segmented/${pr[t]}.png`)), a = t !== void 0 && i ? String(t) : void 0;
	if (e.dataset.wfrpBossbarSegments === a) return;
	e.querySelectorAll(`.${ur}`).forEach((e) => e.remove()), e.classList.toggle("wfrp-bossbar-segmented", a !== void 0);
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
		o.className = ur, o.setAttribute("aria-hidden", "true"), o.style.gridTemplateColumns = a === "0" ? "none" : `repeat(${a}, minmax(0, 1fr))`;
		for (let t = 0; t < Number(a); t++) o.append(hr(e.ownerDocument, n.src));
		i.append(o);
	}
}
function hr(e, t) {
	let n = e.createElementNS(dr, "svg");
	n.setAttribute("viewBox", "829 0 787 361"), n.setAttribute("preserveAspectRatio", "xMidYMid meet");
	let r = e.createElementNS(dr, "image");
	return r.setAttribute("href", t), r.setAttribute("width", "7967"), r.setAttribute("height", "361"), n.append(r), n;
}
//#endregion
//#region src/module/foundry/integrations/bossbar/wounds-bar.ts
function gr(e, t) {
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
function _r(e, t) {
	return e.find((e) => e.id === t) ?? e[0];
}
//#endregion
//#region src/module/foundry/integrations/bossbar/display.ts
function vr(e = ar()) {
	if (!e?.element || e.id !== "boss-bar") return;
	let t = e.element;
	t.classList.add("wfrp4e-compatibility-box-bossbar");
	let n = kn() && game?.settings.get("wfrp4e-compatibility-box", W.stacked) === !0 && yn(On()), r = game?.settings.get(U, "barStyles"), i = game?.settings.get(m, W.woundsStyle), a = _r(r, i);
	for (let r of t.querySelectorAll(".bar-list-item")) {
		let t = e.bars.find((e) => e.actor.uuid === r.dataset.uuid)?.actor;
		if (!t) continue;
		let i = r.querySelector(".boss-bar-container:not(.wfrp-bossbar-wounds)");
		if (!i) continue;
		if (!n || !a) {
			mr(i), r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), i.dataset.wfrpBossbarPrimary && (i.style.removeProperty("--bar-percent"), i.removeAttribute("role"), i.removeAttribute("aria-label"), i.removeAttribute("aria-valuenow"), i.removeAttribute("aria-valuemax"), i.removeAttribute("aria-valuemin"), delete i.dataset.wfrpBossbarPrimary);
			continue;
		}
		let o = sr(t), s = xn(o);
		mr(i, s.max), i.dataset.wfrpBossbarPrimary = "true", i.style.setProperty("--bar-percent", `${bn(s.remaining, s.max)}%`), yr(i, G("CriticalCapacity"), s.remaining, s.max);
		let c = r.querySelector(".wfrp-bossbar-wounds");
		c?.dataset.style !== a.id && (r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), c = gr(r.ownerDocument, a), c.dataset.wfrpBossbarExtra = "", c.dataset.style = a.id, i.before(c)), c && (c.style.setProperty("--bar-percent", `${bn(o.wounds, o.maxWounds)}%`), c.classList.toggle("wfrp-bossbar-threat", o.wounds <= 0), yr(c, G("Wounds"), Math.max(0, o.wounds), o.maxWounds));
	}
}
function yr(e, t, n, r) {
	e.setAttribute("role", "progressbar"), e.setAttribute("aria-label", t), e.setAttribute("aria-valuemin", "0"), e.setAttribute("aria-valuemax", String(Math.max(0, r))), e.setAttribute("aria-valuenow", String(Math.min(n, Math.max(0, r))));
}
var br = !1;
function xr() {
	br || (br = !0, queueMicrotask(() => {
		br = !1;
		let e = ar();
		if (e?.element?.isConnected) try {
			e.updateBars(), vr(e);
		} catch (e) {
			K(e);
		}
	}));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/settings.ts
function Sr() {
	if (game) {
		for (let e of ["automatic", "stacked"]) game.settings.register(m, W[e], {
			name: `${m}.BossBar.Settings.${e}.Name`,
			hint: `${m}.BossBar.Settings.${e}.Hint`,
			config: !0,
			default: !0,
			scope: "world",
			type: Boolean
		});
		game.settings.register(m, W.woundsStyle, {
			name: `${m}.BossBar.Settings.woundsStyle.Name`,
			hint: `${m}.BossBar.Settings.woundsStyle.Hint`,
			config: !0,
			default: "default-grass",
			scope: "world",
			type: String,
			choices: () => Object.fromEntries((game?.settings.get(U, "barStyles")).map((e) => [e.id, e.name]))
		}), Tn(W.ignorePrompt, `${m}.BossBar`);
	}
}
function Cr(e) {
	if (!game?.user?.isGM) return;
	let t = e.querySelector(`[name="${U}.currentHpPath"]`)?.closest(".form-group");
	if (!t || e.querySelector("[data-wfrp-bossbar-setup]")) return;
	let n = e.ownerDocument.createElement("div");
	n.className = "form-group", n.dataset.wfrpBossbarSetup = "";
	let r = e.ownerDocument.createElement("button");
	r.type = "button", r.textContent = G("Configure"), r.addEventListener("click", async () => {
		r.disabled = !0;
		try {
			let t = await jn();
			for (let [n, r] of Object.entries(t)) {
				let t = e.querySelector(`[name="bossbar.${n}"]`);
				t && (typeof r == "boolean" ? t.checked = r : t.value = r);
			}
			let n = e.querySelector(`[name="${m}.${W.stacked}"]`);
			n && (n.checked = !0);
		} catch (e) {
			K(e);
		} finally {
			r.disabled = !1;
		}
	}), n.append(r), t.insertAdjacentElement("beforebegin", n);
}
//#endregion
//#region src/module/foundry/integrations/bossbar/register-integration.ts
function wr() {
	if (g("bossbar") && !(!y("bossBar") || game?.system.id !== "wfrp4e")) {
		Sr(), Hooks.once("ready", () => void Mn().catch(K)), Hooks.on("combatStart", (e) => void lr(e).catch(K)), Hooks.on("renderBossBar", (e) => vr(e)), Hooks.on("renderSettingsConfig", (e, t) => {
			t instanceof HTMLElement && Cr(t);
		});
		for (let e of [
			"updateActor",
			"createItem",
			"updateItem",
			"deleteItem",
			"createActiveEffect",
			"updateActiveEffect",
			"deleteActiveEffect"
		]) Hooks.on(e, xr);
		Hooks.on("updateSetting", (e) => {
			let t = e.key;
			[
				"bossbar.currentHpPath",
				"bossbar.maxHpPath",
				"bossbar.woundsSystem"
			].includes(t) && ar()?.render(!0).catch(K), (t.startsWith("bossbar.") || t.startsWith("wfrp4e-compatibility-box.bossBar") || t === "wfrp4e.uiaCrits") && (xr(), t === "wfrp4e.uiaCrits" && Mn().catch(K));
		});
	}
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/argon-logic.ts
var Tr = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function Er(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function Dr(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function Or(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function kr(e) {
	return e.trim().toLowerCase();
}
function Ar(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function jr(e) {
	return e.type === "trait" ? (Or(e), e.rollable && !e.disabled && Tr.has(e.traitBaseName.toLowerCase())) : !1;
}
function Mr(e) {
	return e.type === "weapon" || jr(e);
}
function Nr(e) {
	return e.type === "weapon";
}
function Pr(e) {
	return Er(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function Fr(e) {
	return Er(e), e.advances > 0;
}
function Ir(e, t) {
	return e.forEach(Er), t === "basic" ? e.filter((e) => !Pr(e)).map((e) => e.id) : t === "advanced" ? e.filter(Pr).map((e) => e.id) : t === "trained" ? e.filter(Fr).map((e) => e.id) : e.map((e) => e.id);
}
function Lr(e, t) {
	return e.forEach(Dr), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function Rr(e) {
	return e.filter((e) => e.type === "weapon" || jr(e)).map((e) => e.id);
}
function zr(e) {
	return e.filter((e) => e.type === "trait" ? (Or(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function Br(e, t) {
	return e.forEach(Er), t.flatMap((t) => {
		let n = kr(t.name), r = e.find((e) => kr(e.name) === n);
		return !r || t.trained && !Fr(r) ? [] : [r.id];
	});
}
function Vr(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function Hr(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function Ur(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => Hr(e.name, t))).map((e) => e.id) : [];
}
function Wr(e) {
	let t = [];
	return (e.type === "weapon" || jr(e)) && t.push({
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
function Gr(e, t) {
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
var Kr = "argonCombatItemPatterns", qr = "*Draught*, *Potion*";
function Jr(e, t) {
	let n = _[t];
	v(t) && e.register(m, n.settingKey, {
		config: !0,
		default: !0,
		hint: `${m}.Settings.Features.${t}.Hint`,
		name: `${m}.Settings.Features.${t}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function Yr(e) {
	v("argonCombatHud") && e.register(m, Kr, {
		config: !0,
		default: qr,
		hint: `${m}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${m}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: tt,
		scope: "world",
		type: String
	});
}
function Xr() {
	if (!game) throw Error(`${m} | Foundry game is unavailable during settings registration.`);
	Jr(game.settings, "argonCombatHud"), Jr(game.settings, "bossBar"), Jr(game.settings, "paperDoll"), Jr(game.settings, "paperDollArgonBridge"), Yr(game.settings);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/actor-flags.ts
var Zr = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function Qr(e, t) {
	return e.flags?.[Ye]?.[t];
}
function $r(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? Qr(e, t);
}
async function ei(e) {
	let t = {};
	for (let n of Zr) {
		if (e.getFlag("wfrp4e-compatibility-box", n) !== void 0) continue;
		let r = Qr(e, n);
		r !== void 0 && (t[`flags.${m}.${n}`] = r);
	}
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/argon-helpers.ts
function ti(e, t) {
	if (typeof e != "object" || !e) throw Error(`${m} | ${t} must be an object.`);
	return e;
}
function q(e, t) {
	if (typeof e != "string" || !e.trim()) throw Error(`${m} | ${t} must be a non-empty string.`);
	return e;
}
function ni(e, t) {
	if (typeof e != "boolean") throw Error(`${m} | ${t} must be a boolean.`);
	return e;
}
function ri(e, t) {
	if (!Number.isNumeric(e)) throw Error(`${m} | ${t} must be numeric.`);
	return Number(e);
}
function ii(e) {
	return e == null || e === "" ? null : ri(e, "item quantity");
}
function ai(e, t, n, r) {
	let i = $r(e, t);
	if (i === void 0) return r;
	if (!n.includes(i)) throw Error(`${m} | Argon actor flag ${Je}.${t} has invalid value ${String(i)}.`);
	return i;
}
function oi(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = ni(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function si(e, t = !1) {
	let n = ti(e, "Argon item"), r = q(n.type, "Argon item type"), i = q(n.name, `${r} item name`), a = {
		id: q(n.id, `${r} ${i} id`),
		name: i,
		quantity: ii(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = q(n.advanced?.value, `${i} advanced classification`), a.grouped = q(n.grouped?.value, `${i} grouped classification`), a.advances = ri(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = q(n.lore?.value, `${i} lore`), a.memorized = ni(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = ni(n.system?.disabled, `${i} disabled state`), a.rollable = ni(n.rollable?.value, `${i} rollable state`), a.traitBaseName = Ar(i)), t && oi(a, n, r), a;
}
function J(e) {
	return [...e].map((e) => si(e));
}
function Y(e, t) {
	let n = new Map([...e].map((e) => [e.id, e]));
	return t.map((e) => {
		let t = n.get(e);
		if (!t) throw Error(`${m} | Selected Argon item ${e} is no longer available.`);
		return t;
	});
}
function ci(e) {
	return Wr(si(e, !0));
}
function li(e) {
	let t = ai(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return Y(n, Ir(J(n), t));
}
function di(e) {
	let t = ai(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return Y(n, Lr(J(n), t));
}
function fi(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return Y(t, Rr(J(t)));
}
function pi(e) {
	let t = [...e.itemTypes.trait];
	return Y(t, zr(J(t)));
}
function mi(e) {
	let t = $e.map((e) => ({
		...e,
		type: "characteristic"
	})), n = et.map((e) => ({
		name: hi(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = Y(r, Br(J(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function hi({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = bi(`NAME.${e}`, t);
	return n ? `${i} (${bi(n, r)})` : i;
}
function gi(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = Vr(String(t)), r = [...e.items];
	return Y(r, Ur(J(r), n));
}
function _i(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function vi(e) {
	return Mr(si(e));
}
function yi(e) {
	return Nr(si(e));
}
function bi(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/buttons.ts
function xi(e) {
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
				details: ci(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = _i(this.item);
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
			let e = di(this.actor), t = fi(this.actor), s = pi(this.actor), c = mi(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = gi(this.actor), u = [
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
				icon: `${Ze}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${Ze}/drink-me.webp`,
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
function Si() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!y("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/movement.ts
function Ci(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function wi(e, t, n) {
	Ci(e, "move score"), Ci(t, "maximum distance"), Ci(n, "used distance");
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
function Ti(e) {
	return Ci(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/panels.ts
function Ei(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function Di(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function Oi(e) {
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
			await ei(this.actor), await super._onConfigure(e);
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
			let e = Qe.map((e) => {
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
			}), n = li(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return Ei(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return Ei(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return Di(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += Ei(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = wi(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${Ti(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${Ti(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: Ti(t.bubbleDistance),
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
function ki(e) {
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
			if (!vi(n) || n.actor !== this.actor) throw Error(`${m} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let r = e.currentTarget.dataset.set, i = e.currentTarget.dataset.slot;
			if (!r || !i) throw Error(`${m} | Argon weapon-set drop target has no set or slot identifier.`);
			let a = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			a[r] ??= {}, a[r][i] = n.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", a), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!$r(this.actor, "switchEquip")) return;
			let n = Gr(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(yi).map((e) => ({
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
function Ai() {
	g("enhancedcombathud") && y("argonCombatHud") && (Si(), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = xi(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = Oi(e), a = ki(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	}));
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/panels.ts
function ji(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = xi(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return Yt(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/report-bridge-error.ts
function Mi(e) {
	return e instanceof Error ? e.message : String(e);
}
function Ni(e, t) {
	w(`${h}: ${e}. ${Mi(t)}`, t);
}
function Pi(e, t) {
	e.catch((e) => Ni(t, e));
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/register-integration.ts
function Fi() {
	return y("paperDoll") && y("argonCombatHud") && y("paperDollArgonBridge");
}
function Ii(e, t) {
	!Fi() || !S(e) || Xt(t) && Pi(Zt(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function Li() {
	g("fvtt-paper-doll-ui") && g("enhancedcombathud") && Fi() && (Hooks.on("argonInit", (e) => {
		if (!e || typeof e != "object" || !("defineMainPanels" in e) || typeof e.defineMainPanels != "function") throw Error("Argon main panel registration API is unavailable.");
		let { PaperDollQuickItemsPanel: t } = ji(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", Ii));
}
//#endregion
//#region src/module/foundry/integrations/splatter/configuration-menu.ts
var Ri = `${m}.Splatter.Configuration`;
function zi(e) {
	return game?.i18n.localize(`${Ri}.${e}`) ?? e;
}
var Bi = class extends foundry.applications.api.ApplicationV2 {
	async render(e) {
		try {
			await vn(), ui?.notifications?.info(zi("Success"));
		} catch (e) {
			w(zi("Error"), e);
		}
		return this;
	}
}, Vi = `${m}.Splatter.Configuration`;
function X(e) {
	return game?.i18n.localize(`${Vi}.${e}`) ?? e;
}
function Hi(e) {
	w(X("Error"), e);
}
function Ui() {
	return Dn({
		ignoreSetting: pn,
		isEnabled: () => g(V),
		matches: _n,
		title: () => X("SetupTitle"),
		content: () => `<p>${X("SetupDescription")}</p><p>${X("Hint")}</p>`,
		configure: async () => {
			await vn(), ui?.notifications?.info(X("Success"));
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/splatter/register-integration.ts
var Wi = `${m}.Splatter.Configuration`;
function Gi() {
	if (g("splatter")) {
		if (!game) throw Error(`${m} | Foundry game is unavailable during Splatter registration.`);
		Tn(pn, Wi), Hooks.once("ready", () => void Ui().catch(Hi)), game.settings.registerMenu(m, "configureSplatter", {
			hint: `${Wi}.Hint`,
			icon: "fa-solid fa-droplet",
			label: `${Wi}.Button`,
			name: `${Wi}.Name`,
			restricted: !0,
			type: Bi
		});
	}
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/repair-mad-prefab-exclusions.ts
var Ki = /* @__PURE__ */ new WeakSet();
function qi(e) {
	if (Ki.has(e)) return !1;
	let t = e.Initialise, n = /* @__PURE__ */ new Set();
	return e.Initialise = function(e, ...r) {
		let i = e?.moduleName, a = i ? game?.modules.get(i) : void 0, o = e?.ignoredCompendiumPacks;
		if (!i?.startsWith("mad-") || !a?.active || !a.packs) return t.call(this, e, ...r);
		let s = `${i}-prefabs`;
		return !Array.isArray(o) || !o.includes(s) || Array.from(a.packs).some((e) => e.name === s) ? t.call(this, e, ...r) : (n.has(i) || (n.add(i), console.warn(`${m} | ${i}: skipped unavailable Scene Packer exclusion ${s}.`)), t.call(this, {
			...e,
			ignoredCompendiumPacks: o.filter((e) => e !== s)
		}, ...r));
	}, Ki.add(e), !0;
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/register-integration.ts
function Ji() {
	g("scene-packer") && game?.system.id === "wfrp4e" && typeof ScenePacker < "u" && qi(ScenePacker);
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/repair-forge-owner-detection.ts
var Yi = /* @__PURE__ */ new WeakSet();
function Xi(e, t) {
	if (Yi.has(e)) return !1;
	let n = e._detectForgeAccountId;
	return e._detectForgeAccountId = async function() {
		let e = t();
		return this.isRunningOnForge() && typeof e == "string" && /^[a-zA-Z0-9_-]+$/.test(e) && e !== "bazaar" ? (this.forgeAccountId = e, !0) : n.call(this);
	}, Yi.add(e), !0;
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/register-integration.ts
async function Zi() {
	if (!g("fa-nexus") || game?.system.id !== "wfrp4e" || typeof ForgeAPI > "u") return;
	let e = Array.from(document.querySelectorAll("script[type=\"module\"][src]")).find((e) => {
		let t = new URL(e.src).pathname;
		return /\/modules\/fa-nexus\/(?:[^/]+\/)?scripts\/core\/forge-integration\.js$/.test(t);
	});
	if (!e) {
		console.warn(`${m} | FA Nexus Forge integration script was not found; patch skipped.`);
		return;
	}
	try {
		let t = (await import(
			/* @vite-ignore */
			e.src
)).forgeIntegration;
		if (typeof t?._detectForgeAccountId != "function" || typeof t.isRunningOnForge != "function") throw Error("FA Nexus Forge integration API is unavailable.");
		Xi(t, () => ForgeAPI.lastStatus?.ownerUserId);
	} catch (e) {
		console.error(`${m} | Could not install FA Nexus Forge compatibility.`, e);
	}
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-data-model-migrations.ts
var Qi = /* @__PURE__ */ new WeakSet();
function $i(e) {
	let t = e.migrateData;
	return typeof t != "function" || Qi.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, Qi.add(e), !0);
}
function ea() {
	return [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number($i(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-roll-modes.ts
function ta() {
	let e = game?.wfrp4e?.config, t = CONFIG.ChatMessage.modes;
	return !e || !t ? !1 : (e.rollModes = foundry.utils.deepClone(t), !0);
}
//#endregion
//#region src/module/functions/patches/wfrp4e/chat-card-references.ts
function Z(e) {
	return typeof e == "object" && e ? e : {};
}
function Q(e) {
	return typeof e == "string" ? e : "";
}
function na(e) {
	let t = Z(e);
	return {
		kind: "speaker",
		actor: Q(t.actor),
		scene: Q(t.scene),
		token: Q(t.token)
	};
}
function ra(e) {
	return na(Z(Z(e).context).speaker);
}
function ia(e) {
	let t = e.system ?? {};
	switch (e.type) {
		case "test": return [ra(t.testData)];
		case "opposed": {
			let e = Z(t.opposedTestData);
			return [ra(e.attackerTestData), ra(e.defenderTestData)];
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
			return e.targetSpeakerData && n.push(na(e.targetSpeakerData)), e.defenderMessageId && n.push({
				kind: "message",
				id: Q(e.defenderMessageId),
				required: !0
			}), n;
		}
		default: return [];
	}
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/chat-card-text.ts
function aa(e) {
	let t = new DOMParser().parseFromString(e, "text/html").body;
	for (let e of t.querySelectorAll("script, style, template, button, input, select, textarea, .chat-button, a[data-action], [role='button'], .dice-tooltip, .applied-breakdown, .secret:not(.revealed), [hidden], [aria-hidden='true']")) e.remove();
	for (let e of t.querySelectorAll("img")) e.replaceWith(t.ownerDocument.createTextNode(e.alt ? ` ${e.alt} ` : ""));
	for (let e of t.querySelectorAll("br, p, div, li, tr, h1, h2, h3, h4, h5, h6")) e.append(t.ownerDocument.createTextNode("\n"));
	for (let e of t.querySelectorAll("td, th")) e.append(t.ownerDocument.createTextNode(" "));
	return (t.textContent ?? "").split("\n").map((e) => e.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}
function oa(e) {
	let t = document.createElement("p");
	return t.textContent = e, t.style.whiteSpace = "pre-line", t;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/render-orphaned-chat-cards.ts
var sa = /* @__PURE__ */ new WeakSet();
function ca(e) {
	if (!game) return !1;
	switch (e.kind) {
		case "speaker": return e.scene && e.token ? !!game.scenes.get(e.scene)?.tokens.get(e.token)?.actor : !!(e.actor && game.actors.get(e.actor));
		case "uuid": return !!(e.uuid && fromUuidSync(e.uuid)?.documentName === "Actor");
		case "message": {
			let t = game.messages.get(e.id);
			return t ? t._source.type === "test" ? ia(t._source).every(ca) : !1 : !e.required;
		}
	}
}
async function la(e, t) {
	let n = e.toObject(), r = e.visible && e.isContentVisible, i = r ? aa(n.content) : "", a = new foundry.documents.ChatMessage({
		...n,
		type: "base",
		system: {},
		flags: {},
		content: oa(i).outerHTML
	}), o = await a.renderHTML(t), s = o.querySelector(".message-content");
	if (s) {
		let e = r && a.isContentVisible ? i : aa(s.innerHTML);
		s.replaceChildren(oa(e));
	}
	return o.addEventListener("contextmenu", (e) => e.stopPropagation(), { capture: !0 }), o;
}
function ua() {
	let e = CONFIG.ChatMessage.documentClass?.prototype;
	if (!e || sa.has(e)) return !1;
	let t = e.renderHTML;
	return e.renderHTML = function(e) {
		return ia(this._source).some((e) => !ca(e)) ? la(this, e) : t.call(this, e);
	}, sa.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/active-effect-schema.ts
function da(e) {
	let t = e.schema;
	if (t.fields.changes) return !1;
	let n = e.defineSchema;
	return e.defineSchema = function() {
		let e = n.call(this);
		return e.changes ||= foundry.data.ActiveEffectTypeDataModel.defineSchema().changes, e;
	}, t.extendFields({ changes: foundry.data.ActiveEffectTypeDataModel.defineSchema().changes }), !0;
}
function fa() {
	return Object.values(CONFIG.ActiveEffect?.dataModels ?? {}).reduce((e, t) => e + Number(da(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/guard-actorless-token-ruler.ts
var pa = /* @__PURE__ */ new WeakSet(), ma = /* @__PURE__ */ new WeakSet();
function ha() {
	let e = CONFIG.Token?.rulerClass?.prototype, t = foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	if (!e || !t || e === t || !Object.prototype.isPrototypeOf.call(t, e) || typeof e._getSegmentStyle != "function" || typeof t._getSegmentStyle != "function" || pa.has(e)) return !1;
	let n = e._getSegmentStyle, r = t._getSegmentStyle;
	return e._getSegmentStyle = function(...e) {
		if (this.token.actor) return n.apply(this, e);
		if (!ma.has(this.token)) {
			ma.add(this.token);
			let { uuid: e, actorId: t, actorLink: n } = this.token.document;
			console.warn("WFRP4e Compatibility Box | Token has no actor; using the core ruler style.", {
				tokenUuid: e,
				actorId: t,
				actorLink: n,
				worldActorExists: !!(t && game?.actors.get(t))
			});
		}
		return r.apply(this, e);
	}, pa.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/apply-compatibility-patches.ts
function ga() {
	game?.system.id === "wfrp4e" && (ta(), ea(), fa(), ua(), ha());
}
//#endregion
//#region src/module/wfrp/folders/hooks.ts
var _a, va = !1, ya = !1;
function $() {
	if (!(!game?.ready || !game.user?.isActiveGM)) {
		if (va) {
			ya = !0;
			return;
		}
		clearTimeout(_a), _a = setTimeout(() => {
			ba();
		}, 1e3);
	}
}
async function ba() {
	if (!(!game?.ready || !game.user?.isActiveGM || va)) {
		va = !0, ya = !1;
		try {
			await Jn();
		} catch (e) {
			console.error(`${h}: WFRP folder cleanup failed.`, e), ui?.notifications?.error(`${h}: WFRP cleanup failed and may be incomplete. See the console for details.`, {
				console: !1,
				permanent: !0
			});
		} finally {
			va = !1, ya && $();
		}
	}
}
function xa() {
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
function Sa() {
	Hooks.once("setup", () => Vn($)), xa(), Hooks.once("init", () => {
		ga(), Xr(), Ji(), Zi(), rr(), wr(), Ai(), Vt(), Li(), Gi();
	});
}
//#endregion
//#region src/module/init/index.ts
Sa();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map