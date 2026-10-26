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
var m = "wfrp4e-compatibility-box", ue = "Drowsy's WFRP4e Compatibility Box";
//#endregion
//#region src/module/foundry/integrations/is-module-active.ts
function h(e) {
	if (typeof game > "u" || !game) throw Error("Optional module integrations require an initialized Foundry game.");
	return game.modules.get(e)?.active === !0;
}
//#endregion
//#region src/module/foundry/settings/optional-features.ts
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
//#region src/module/foundry/settings/is-optional-feature-enabled.ts
function v(e) {
	let t = g[e];
	return _(e) && game?.settings.get("wfrp4e-compatibility-box", t.settingKey) !== !1;
}
//#endregion
//#region src/module/functions/patches/paper-doll/equipment-update.ts
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
//#region src/module/functions/patches/paper-doll/is-item-allowed-in-slot.ts
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
//#region src/module/foundry/patches/paper-doll/wfrp-runtime-types.ts
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
//#region src/module/foundry/patches/paper-doll/wfrp-equipment.ts
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
function S(e) {
	return be(e, "equipped");
}
function Se(e) {
	return S(e) !== null;
}
function Ce(e) {
	let t = ye(e).AP;
	if (!y(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(ve.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function we(e) {
	if (!y(e.system) || !y(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function C(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: xe(e, "equipped"),
		id: e.id,
		name: e.name,
		uuid: e.uuid
	};
	return e.type === "armour" ? {
		...t,
		armourPoints: Ce(e),
		type: "armour"
	} : {
		...t,
		offhand: xe(e, "offhand"),
		twoHanded: xe(e, "twohanded"),
		type: "weapon"
	};
}
function Te(e, t) {
	return he(e.type, C(e), t);
}
async function Ee(e, t, n) {
	let r = C(t), i = fe(r, r?.equipped ?? S(t), n, r?.type === "weapon" ? we(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function De(e) {
	let t = pe(C(e)?.equipped ?? S(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/foundry/notifications/notify-user.ts
function Oe(e, t) {
	t === void 0 ? console.error(e) : console.error(e, t);
}
function ke(e, t) {
	Oe(e, t), ui?.notifications?.error(e);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/report-paper-doll-error.ts
function Ae(e) {
	return e instanceof Error ? e.message : String(e);
}
function w(e, t) {
	ke(`${ue}: ${e}. ${Ae(t)}`, t);
}
function T(e, t) {
	e.catch((e) => w(t, e));
}
//#endregion
//#region src/module/foundry/patches/paper-doll/synchronize-paper-doll.ts
var E = "fvtt-paper-doll-ui", je = "slots", D = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Set();
function Ne(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Pe(e) {
	let t = e.getFlag(E, je);
	if (t === void 0) return {};
	if (!p(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Ne(t);
}
function Fe() {
	let n = game?.settings.get(E, "globalConfig"), r = new Set([...e, ...t]);
	if (y(n) && Object.keys(n).length === 0) return r;
	if (!y(n) || !y(n.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let i = Object.values(n.SLOTS);
	if (!i.every(y)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let a = new Set(i.flatMap((e) => Object.keys(e)));
	return a.size ? a : r;
}
function Ie(e) {
	return D.has(e.uuid);
}
function Le(e) {
	if (!b(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function Re(e) {
	if (!e || e.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function ze(e) {
	let t = Pe(e), n = Array.from(e.items), r = n.map(C).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: S(e),
		uuid: e.uuid
	})), o = ae(t, te(r, we(e)), i, Fe(), a);
	return oe(t, o) ? "unchanged" : (await e.setFlag(E, je, o), "synchronized");
}
async function O(e) {
	Le(e), Re(game);
	let t = e;
	if (!x(t) || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !v("paperDoll")) return "unavailable";
	let n = D.get(t.uuid);
	if (n) return await n, O(t);
	let r = ze(t).finally(() => {
		D.get(t.uuid) === r && D.delete(t.uuid);
	});
	return D.set(t.uuid, r), r;
}
function Be(e) {
	x(e) && (Me.has(e.uuid) || (Me.add(e.uuid), queueMicrotask(() => {
		Me.delete(e.uuid), T(O(e), `could not synchronize equipped items for ${e.uuid}`);
	})));
}
async function Ve() {
	return Re(game), Promise.all(Array.from(game.actors).filter(x).map(O));
}
//#endregion
//#region src/module/foundry/settings/get-optional-feature-statuses.ts
function He() {
	return Object.entries(g).map(([e, t]) => ({
		available: _(e),
		enabled: v(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
//#endregion
//#region src/module/functions/integrations/paper-doll-argon/bridge.ts
var Ue = ["TRINKET", "WRIST_RIGHT"];
function We(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function Ge(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Ue) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(We)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function Ke(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function qe({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function Je(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/constants.ts
var Ye = "enhancedcombathud", Xe = m, Ze = "enhancedcombathud-wfrp4e", Qe = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", $e = "modules/enhancedcombathud/icons", et = [
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
], tt = [{
	key: "ws",
	icon: `${$e}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${$e}/bolt-spell-cast.webp`
}], nt = [
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
async function rt() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/module/functions/patches/paper-doll/find-slot-changes.ts
function it(e, t, n) {
	return e[t]?.[n] ?? null;
}
function at(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = it(e, i, a), o = it(t, i, a);
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
var ot = Symbol.for("paper-doll-wfrp4e.equipped-state");
function st() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function ct(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function lt(e) {
	if (!y(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function ut() {
	return Promise.resolve();
}
function dt() {
	let e = st(), t = e?.equip, n = globalThis.fromUuid;
	if (ct(e, t, n), !n) throw Error("Foundry UUID resolution is unavailable.");
	if (e[ot] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!_e(a) || b(this.actor) && !x(this.actor)) return r.call(this, e, t, i);
		let o = lt(i);
		if (!t) return ut();
		if (!x(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!Te(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await Ee(this.actor, a, o);
		} catch (e) {
			w(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await O(this.actor);
			} catch (e) {
				w(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[ot] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/enforce-paper-doll-slot-types.ts
var ft = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function pt() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function mt(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function ht() {
	let e = pt(), t = e?.filterItems;
	if (mt(e, t), e[ft] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => _e(e) && Te(e, t));
	}, e[ft] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-slot-tooltips.ts
var gt = ".paper-doll .paper-doll-slot", _t = `data-${m}-drag-tooltip`, k = `data-${m}-tooltip`, vt = `data-${m}-original-tooltip`, yt = {
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
}, bt = !1;
function xt(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(gt);
	return t?.closest(".paper-doll") ? t : null;
}
function St() {
	document.querySelectorAll(`[${k}]`).forEach((e) => {
		let t = e.getAttribute(vt);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(k), e.removeAttribute(vt);
	});
}
function Ct() {
	document.querySelectorAll(gt).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(_t, t), e.removeAttribute("data-tooltip"));
	});
}
function wt() {
	document.querySelectorAll(`[${_t}]`).forEach((e) => {
		let t = e.getAttribute(_t);
		t && (e.dataset.tooltip = t), e.removeAttribute(_t);
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
//#region src/module/foundry/patches/paper-doll/register-paper-doll-hooks.ts
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
	let n = t[E];
	return y(n) ? "slots" in n ? p(n.slots) ? {
		kind: "valid",
		state: n[je]
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
	r.length && (w(n, AggregateError(r, n)), await O(e));
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
		if (!Te(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(Ee(e, n, t));
	}
	r.length && T(Ft(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function Lt(e, t) {
	if (!j() || !x(e) || Ie(e)) return;
	let n = jt(t);
	if (!n) return;
	let r = e.getFlag(E, je);
	if (r !== void 0) {
		if (!p(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of at(r, n)) {
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
	A.delete(e.uuid), n?.size && T(Ft(e, Array.from(n, (t) => {
		let n = Mt(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(De), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function zt(e) {
	!j() || !_e(e) || e.type !== "armour" && e.type !== "weapon" && !Se(e) || x(e.parent) && Be(e.parent);
}
function Bt() {
	kt(), Hooks.on("paper-doll-swap", It), Hooks.on("preUpdateActor", Lt), Hooks.on("updateActor", Rt), Hooks.on("updateItem", zt), Hooks.once("ready", () => {
		if (j()) {
			try {
				ht(), dt();
			} catch (e) {
				throw w("could not initialize the required Paper Doll integration", e), e;
			}
			T(Ve(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/fvtt-paper-doll-ui/register-integration.ts
var Vt = "fvtt-paper-doll-ui";
function Ht() {
	h("fvtt-paper-doll-ui") && v("paperDoll") && Bt();
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/bridge-runtime.ts
var Ut = "activeWeaponSet", M = "slots", Wt = "weaponSets";
function Gt(e) {
	let t = e.getFlag(Vt, M);
	if (t === void 0) return {};
	if (!p(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function Kt(e) {
	let t = e.getFlag(Ye, Ut);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function qt(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function Jt(e) {
	let t = e.getFlag(Ye, Wt);
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
	let n = Jt(e), r = qe({
		activeSetId: Kt(e),
		mainHand: we(e),
		mainSlots: Ke(t),
		weaponSets: n
	}), i = !Je(n, r);
	return i && await e.setFlag(Ye, Wt, r), await rt(), i ? "synchronized" : "unchanged";
}
function Xt(e) {
	if (!b(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return Ge(Gt(e)).map((n) => {
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
	if (!p(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function Qt(e) {
	if (!b(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return !x(e) || !v("paperDoll") || !v("argonCombatHud") || !v("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", M) === void 0 ? (await rt(), "unchanged") : Yt(e, Gt(e));
}
//#endregion
//#region src/module/functions/integrations/splatter/configuration.ts
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
//#region src/module/foundry/integrations/splatter/constants.ts
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
//#region src/module/functions/integrations/bossbar/health.ts
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
//#region src/module/foundry/integrations/bossbar/constants.ts
var V = "bossbar", H = {
	automatic: "bossBarAutomatic",
	stacked: "bossBarStacked",
	woundsStyle: "bossBarWoundsStyle",
	prompt: "bossBarSetupPrompt"
};
//#endregion
//#region src/module/foundry/integrations/bossbar/configuration.ts
function U(e) {
	return game?.i18n.localize(`wfrp4e-compatibility-box.BossBar.${e}`) ?? e;
}
function W(e) {
	console.error(`${m} | Boss Bar integration failed.`, e), ui?.notifications?.error(U("Error"));
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
	await game.settings.set(m, H.stacked, !0);
	let e = Tn();
	return e && await game.settings.set(V, "barStyles", e), await game.settings.set(m, H.prompt, G() ? "uia" : "core"), ui?.notifications?.info(U("Configured")), { ...B };
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
			t === "configure" ? await En() : t === "keep" && await game.settings.set(m, H.prompt, e);
		} finally {
			Dn = !1;
		}
	}
}
//#endregion
//#region src/module/wfrp/folders/queue.ts
var K = /* @__PURE__ */ new WeakMap();
async function kn(e, t) {
	let n = (K.get(e) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		let e = globalThis.navigator?.locks;
		e ? await e.request("foundry:folder-tidy", t) : await t();
	});
	K.set(e, n);
	try {
		await n;
	} finally {
		K.get(e) === n && K.delete(e);
	}
}
//#endregion
//#region src/module/wfrp/folders/merge.ts
async function An(e, t, n, r) {
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
function jn(e, t) {
	return e.startsWith("wfrp4e-") && [...t].some((e) => /cubicle\s*7/i.test(e.name));
}
function Mn(e, t, n) {
	let r = e["warhammer-lib"], i = e.core, a = [
		r?.source,
		e.source,
		t?.startsWith("Compendium.") ? t.split(".")[1] : void 0,
		i?.sourceId?.startsWith("Compendium.") ? i.sourceId.split(".")[1] : void 0
	];
	for (let [t, n] of Object.entries(e)) n && typeof n == "object" && "initialization-folder" in n && a.push(t);
	return a.find((e) => typeof e == "string" && n.has(e));
}
function Nn(e, t) {
	if (t < 1) throw Error("WFRP folders need at least one available level.");
	return e.length <= t ? [...e] : [...e.slice(0, t - 1), e.slice(t - 1).join("/")];
}
function Pn(e, t, n, r) {
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
			let i = Nn(t.map((e) => e.name), r - 1).at(-1), a = t.length === 1 || r === 2 ? n : t[Math.min(t.length - 2, r - 3)].id;
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
			path: Nn(t.length ? t : [e.fallback], r - 1)
		});
	}
	return f;
}
var Fn = ["keepWfrpImportedContentTidy", "keepWfrpCompendiumsTidy"];
function In(e) {
	if (!game?.user) throw Error("Foundry user is unavailable during WFRP setting registration.");
	for (let t of Fn) game.settings.register(m, t, {
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
var Ln = "whence-they-hang";
async function Rn(e) {
	if (!e.ready || !e.user?.isGM) return;
	let t = e.settings.storage.get("world");
	if (!t) throw Error("World settings storage is unavailable during WFRP migration.");
	for (let n of Fn) {
		if (t.getSetting(`wfrp4e-compatibility-box.${n}`)) continue;
		let r = t.getSetting(`${Ln}.${n}`)?.value;
		typeof r == "boolean" && await e.settings.set(m, n, r);
	}
}
//#endregion
//#region src/module/wfrp/folders/tidy.ts
var zn = "__wfrp_tidy_root__";
async function Bn(e, t) {
	await kn(e, () => Vn(e, t));
}
async function Vn(e, t) {
	if (!e.ready || !e.user?.isGM || e.system.id !== "wfrp4e") return;
	await Rn(e);
	let n = new Set([...e.modules.entries()].filter(([e, t]) => jn(e, t.authors ?? [])).map(([e]) => e));
	n.add("wfrp4e");
	let r = (e) => Mn(e.flags ?? {}, e._stats?.compendiumSource, n), i = new Map([...e.modules.entries()].map(([e, t]) => [e, t.title ?? e])), a = async (n, a) => {
		let o = [...e.folders].filter((e) => e.type === n), s = new Set([...o, ...a].map((e) => e.folder?.id)), c = o.filter((e) => !e.folder && e.name === "WFRP").sort((e, t) => Number(s.has(t.id)) - Number(s.has(e.id)) || e.id.localeCompare(t.id)), l = c[0];
		await An(c, o, a, (e) => !!r(e));
		let u = Pn(o.map((e) => ({
			id: e.id,
			name: e.name,
			parent: e.folder?.id ?? null,
			official: !!r(e)
		})), a.map((e) => ({
			id: e.id,
			parent: e.folder?.id ?? null,
			official: !!r(e),
			fallback: i.get(r(e)) ?? "WFRP Content"
		})), l?.id ?? zn, t);
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
		l ??= await d("WFRP", null);
		for (let e of u.folders) await o.find((t) => t.id === e.id).update({
			name: e.name,
			folder: e.parent === zn ? l.id : e.parent
		});
		for (let e of u.entries) {
			let t = l;
			for (let n of e.path) t = o.filter((e) => e.name === n && e.folder?.id === t.id).sort((e, t) => e.id.localeCompare(t.id))[0] ?? await d(n, t.id);
			await a.find((t) => t.id === e.id).update({ folder: t.id });
		}
		await An([l], o, a, (e) => !!r(e));
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
async function Hn() {
	game && await Bn(game, CONST.FOLDER_MAX_DEPTH);
}
//#endregion
//#region src/module/foundry/api/create-module-api.ts
function Un() {
	return {
		configureBossBar: En,
		configureSplatter: yn,
		getOptionalFeatures: He,
		syncAllPaperDollActors: Ve,
		syncPaperDollArgonActor: Qt,
		syncPaperDollActor: O,
		tidyWfrpContent: Hn
	};
}
//#endregion
//#region src/module/foundry/api/register-module-api.ts
function Wn() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(m);
	if (!e) throw Error(`Foundry module registry entry was not found for ${m}.`);
	let t = e;
	t.api = Un();
}
//#endregion
//#region src/module/functions/integrations/bossbar/selection.ts
function Gn(e) {
	let t = e.filter((e) => e.enemy), n = (e, t) => e.traits.some((e) => e.trim().toLowerCase() === t), r = t.filter((e) => n(e, "boss"));
	if (r.length) return r;
	let i = t.filter((e) => e.maxWounds >= 30 && n(e, "grim") && (n(e, "leader") || n(e, "champion"))).sort((e, t) => t.maxWounds - e.maxWounds || t.weaponSkill - e.weaponSkill || t.strength - e.strength), a = i[0];
	if (!a) return [];
	let o = i.filter((e) => e.maxWounds === a.maxWounds && e.weaponSkill === a.weaponSkill && e.strength === a.strength);
	return o.length <= 2 ? o : [];
}
//#endregion
//#region src/module/foundry/integrations/bossbar/runtime.ts
function Kn() {
	return ui && Reflect.get(ui, "bossBar");
}
function qn(e) {
	return Array.from(e.combatants).flatMap(({ actor: e, token: t }) => e ? [{
		uuid: e.uuid,
		enemy: t?.disposition === -1 && !e.hasPlayerOwner,
		traits: Array.from(e.items).filter((e) => e.type === "trait").map((e) => e.name),
		maxWounds: e.system.status?.wounds?.max ?? 0,
		weaponSkill: e.system.characteristics?.ws?.value ?? 0,
		strength: e.system.characteristics?.s?.value ?? 0
	}] : []);
}
function Jn(e) {
	return {
		wounds: e.system.status?.wounds?.value ?? 0,
		maxWounds: e.system.status?.wounds?.max ?? 0,
		maxCriticals: e.system.status?.criticalWounds?.max ?? 0,
		criticals: Array.from(e.items).filter((e) => e.type === "critical" && Cn(e.system?.wounds?.value)).length
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/combat.ts
var Yn = /* @__PURE__ */ new WeakSet();
async function Xn(e) {
	if (!game?.user?.isGM || !v("bossBar") || !game.settings.get("wfrp4e-compatibility-box", H.automatic) || !e.scene || Yn.has(e)) return;
	let t = Gn(qn(e)), n = e.scene.getFlag("bossbar", "actors") ?? [], r = new Set(n.map((e) => e.uuid)), i = game.settings.get(V, "barStyles"), a = t.filter((e) => r.has(e.uuid) ? !1 : (r.add(e.uuid), !0)).map((e) => ({
		uuid: e.uuid,
		style: i[0]?.id ?? "default",
		hideName: !1
	}));
	if (a.length) {
		Yn.add(e);
		try {
			await e.scene.setFlag(V, "actors", [...n, ...a]);
		} finally {
			Yn.delete(e);
		}
	}
}
//#endregion
//#region src/module/foundry/integrations/bossbar/critical-segments.ts
var Zn = "wfrp-bossbar-segments", Qn = "http://www.w3.org/2000/svg", $n = [
	"background",
	"bar",
	"foreground"
], er = [
	"bg",
	"bar",
	"fg"
];
function tr(e, t) {
	let n = $n.map((t) => e.querySelector(`:scope > .bar-${t}`)), r = n.map((e) => e?.querySelector(":scope > img")), i = r.every((e, t) => e?.getAttribute("src")?.split(/[?#]/)[0]?.endsWith(`/bossbar/resources/matching-images/segmented/${er[t]}.png`)), a = t !== void 0 && i ? String(t) : void 0;
	if (e.dataset.wfrpBossbarSegments === a) return;
	e.querySelectorAll(`.${Zn}`).forEach((e) => e.remove()), e.classList.toggle("wfrp-bossbar-segmented", a !== void 0);
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
		o.className = Zn, o.setAttribute("aria-hidden", "true"), o.style.gridTemplateColumns = a === "0" ? "none" : `repeat(${a}, minmax(0, 1fr))`;
		for (let t = 0; t < Number(a); t++) o.append(nr(e.ownerDocument, n.src));
		i.append(o);
	}
}
function nr(e, t) {
	let n = e.createElementNS(Qn, "svg");
	n.setAttribute("viewBox", "829 0 787 361"), n.setAttribute("preserveAspectRatio", "xMidYMid meet");
	let r = e.createElementNS(Qn, "image");
	return r.setAttribute("href", t), r.setAttribute("width", "7967"), r.setAttribute("height", "361"), n.append(r), n;
}
//#endregion
//#region src/module/foundry/integrations/bossbar/wounds-bar.ts
function rr(e, t) {
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
function ir(e, t) {
	return e.find((e) => e.id === t) ?? e[0];
}
//#endregion
//#region src/module/foundry/integrations/bossbar/display.ts
function ar(e = Kn()) {
	if (!e?.element || e.id !== "boss-bar") return;
	let t = e.element;
	t.classList.add("wfrp4e-compatibility-box-bossbar");
	let n = G() && game?.settings.get("wfrp4e-compatibility-box", H.stacked) === !0 && bn(wn()), r = game?.settings.get(V, "barStyles"), i = game?.settings.get(m, H.woundsStyle), a = ir(r, i);
	for (let r of t.querySelectorAll(".bar-list-item")) {
		let t = e.bars.find((e) => e.actor.uuid === r.dataset.uuid)?.actor;
		if (!t) continue;
		let i = r.querySelector(".boss-bar-container:not(.wfrp-bossbar-wounds)");
		if (!i) continue;
		if (!n || !a) {
			tr(i), r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), i.dataset.wfrpBossbarPrimary && (i.style.removeProperty("--bar-percent"), i.removeAttribute("role"), i.removeAttribute("aria-label"), i.removeAttribute("aria-valuenow"), i.removeAttribute("aria-valuemax"), i.removeAttribute("aria-valuemin"), delete i.dataset.wfrpBossbarPrimary);
			continue;
		}
		let o = Jn(t), s = Sn(o);
		tr(i, s.max), i.dataset.wfrpBossbarPrimary = "true", i.style.setProperty("--bar-percent", `${xn(s.remaining, s.max)}%`), or(i, U("CriticalCapacity"), s.remaining, s.max);
		let c = r.querySelector(".wfrp-bossbar-wounds");
		c?.dataset.style !== a.id && (r.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), c = rr(r.ownerDocument, a), c.dataset.wfrpBossbarExtra = "", c.dataset.style = a.id, i.before(c)), c && (c.style.setProperty("--bar-percent", `${xn(o.wounds, o.maxWounds)}%`), c.classList.toggle("wfrp-bossbar-threat", o.wounds <= 0), or(c, U("Wounds"), Math.max(0, o.wounds), o.maxWounds));
	}
}
function or(e, t, n, r) {
	e.setAttribute("role", "progressbar"), e.setAttribute("aria-label", t), e.setAttribute("aria-valuemin", "0"), e.setAttribute("aria-valuemax", String(Math.max(0, r))), e.setAttribute("aria-valuenow", String(Math.min(n, Math.max(0, r))));
}
var sr = !1;
function cr() {
	sr || (sr = !0, queueMicrotask(() => {
		sr = !1;
		let e = Kn();
		if (e?.element?.isConnected) try {
			e.updateBars(), ar(e);
		} catch (e) {
			W(e);
		}
	}));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/settings.ts
function lr() {
	if (game) {
		for (let e of ["automatic", "stacked"]) game.settings.register(m, H[e], {
			name: `${m}.BossBar.Settings.${e}.Name`,
			hint: `${m}.BossBar.Settings.${e}.Hint`,
			config: !0,
			default: !0,
			scope: "world",
			type: Boolean
		});
		game.settings.register(m, H.woundsStyle, {
			name: `${m}.BossBar.Settings.woundsStyle.Name`,
			hint: `${m}.BossBar.Settings.woundsStyle.Hint`,
			config: !0,
			default: "default-grass",
			scope: "world",
			type: String,
			choices: () => Object.fromEntries((game?.settings.get(V, "barStyles")).map((e) => [e.id, e.name]))
		}), game.settings.register(m, H.prompt, {
			name: "Boss Bar setup choice",
			hint: "",
			config: !1,
			default: "",
			scope: "world",
			type: String
		});
	}
}
function ur(e) {
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
			let n = e.querySelector(`[name="${m}.${H.stacked}"]`);
			n && (n.checked = !0);
		} catch (e) {
			W(e);
		} finally {
			r.disabled = !1;
		}
	}), n.append(r), t.insertAdjacentElement("beforebegin", n);
}
//#endregion
//#region src/module/foundry/integrations/bossbar/register-integration.ts
function dr() {
	if (h("bossbar") && !(!v("bossBar") || game?.system.id !== "wfrp4e")) {
		lr(), Hooks.once("ready", () => void On().catch(W)), Hooks.on("combatStart", (e) => void Xn(e).catch(W)), Hooks.on("renderBossBar", (e) => ar(e)), Hooks.on("renderSettingsConfig", (e, t) => {
			t instanceof HTMLElement && ur(t);
		});
		for (let e of [
			"updateActor",
			"createItem",
			"updateItem",
			"deleteItem",
			"createActiveEffect",
			"updateActiveEffect",
			"deleteActiveEffect"
		]) Hooks.on(e, cr);
		Hooks.on("updateSetting", (e) => {
			let t = e.key;
			[
				"bossbar.currentHpPath",
				"bossbar.maxHpPath",
				"bossbar.woundsSystem"
			].includes(t) && Kn()?.render(!0).catch(W), (t.startsWith("bossbar.") || t.startsWith("wfrp4e-compatibility-box.bossBar") || t === "wfrp4e.uiaCrits") && (cr(), t === "wfrp4e.uiaCrits" && On().catch(W));
		});
	}
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/argon-logic.ts
var fr = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function pr(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function mr(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function hr(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function gr(e) {
	return e.trim().toLowerCase();
}
function _r(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function vr(e) {
	return e.type === "trait" ? (hr(e), e.rollable && !e.disabled && fr.has(e.traitBaseName.toLowerCase())) : !1;
}
function yr(e) {
	return e.type === "weapon" || vr(e);
}
function br(e) {
	return e.type === "weapon";
}
function xr(e) {
	return pr(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function Sr(e) {
	return pr(e), e.advances > 0;
}
function Cr(e, t) {
	return e.forEach(pr), t === "basic" ? e.filter((e) => !xr(e)).map((e) => e.id) : t === "advanced" ? e.filter(xr).map((e) => e.id) : t === "trained" ? e.filter(Sr).map((e) => e.id) : e.map((e) => e.id);
}
function wr(e, t) {
	return e.forEach(mr), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function Tr(e) {
	return e.filter((e) => e.type === "weapon" || vr(e)).map((e) => e.id);
}
function Er(e) {
	return e.filter((e) => e.type === "trait" ? (hr(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function Dr(e, t) {
	return e.forEach(pr), t.flatMap((t) => {
		let n = gr(t.name), r = e.find((e) => gr(e.name) === n);
		return !r || t.trained && !Sr(r) ? [] : [r.id];
	});
}
function Or(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function kr(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function Ar(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => kr(e.name, t))).map((e) => e.id) : [];
}
function jr(e) {
	let t = [];
	return (e.type === "weapon" || vr(e)) && t.push({
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
function Mr(e, t) {
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
var Nr = "argonCombatItemPatterns", Pr = "*Draught*, *Potion*";
function Fr(e, t) {
	let n = g[t];
	_(t) && e.register(m, n.settingKey, {
		config: !0,
		default: !0,
		hint: `${m}.Settings.Features.${t}.Hint`,
		name: `${m}.Settings.Features.${t}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function Ir(e) {
	_("argonCombatHud") && e.register(m, Nr, {
		config: !0,
		default: Pr,
		hint: `${m}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${m}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: rt,
		scope: "world",
		type: String
	});
}
function Lr() {
	if (!game) throw Error(`${m} | Foundry game is unavailable during settings registration.`);
	Fr(game.settings, "argonCombatHud"), Fr(game.settings, "bossBar"), Fr(game.settings, "paperDoll"), Fr(game.settings, "paperDollArgonBridge"), Ir(game.settings);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/actor-flags.ts
var Rr = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function zr(e, t) {
	return e.flags?.[Ze]?.[t];
}
function Br(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? zr(e, t);
}
async function Vr(e) {
	let t = {};
	for (let n of Rr) {
		if (e.getFlag("wfrp4e-compatibility-box", n) !== void 0) continue;
		let r = zr(e, n);
		r !== void 0 && (t[`flags.${m}.${n}`] = r);
	}
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/argon-helpers.ts
function Hr(e, t) {
	if (typeof e != "object" || !e) throw Error(`${m} | ${t} must be an object.`);
	return e;
}
function q(e, t) {
	if (typeof e != "string" || !e.trim()) throw Error(`${m} | ${t} must be a non-empty string.`);
	return e;
}
function Ur(e, t) {
	if (typeof e != "boolean") throw Error(`${m} | ${t} must be a boolean.`);
	return e;
}
function Wr(e, t) {
	if (!Number.isNumeric(e)) throw Error(`${m} | ${t} must be numeric.`);
	return Number(e);
}
function Gr(e) {
	return e == null || e === "" ? null : Wr(e, "item quantity");
}
function Kr(e, t, n, r) {
	let i = Br(e, t);
	if (i === void 0) return r;
	if (!n.includes(i)) throw Error(`${m} | Argon actor flag ${Xe}.${t} has invalid value ${String(i)}.`);
	return i;
}
function qr(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = Ur(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function J(e, t = !1) {
	let n = Hr(e, "Argon item"), r = q(n.type, "Argon item type"), i = q(n.name, `${r} item name`), a = {
		id: q(n.id, `${r} ${i} id`),
		name: i,
		quantity: Gr(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = q(n.advanced?.value, `${i} advanced classification`), a.grouped = q(n.grouped?.value, `${i} grouped classification`), a.advances = Wr(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = q(n.lore?.value, `${i} lore`), a.memorized = Ur(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = Ur(n.system?.disabled, `${i} disabled state`), a.rollable = Ur(n.rollable?.value, `${i} rollable state`), a.traitBaseName = _r(i)), t && qr(a, n, r), a;
}
function Y(e) {
	return [...e].map((e) => J(e));
}
function X(e, t) {
	let n = new Map([...e].map((e) => [e.id, e]));
	return t.map((e) => {
		let t = n.get(e);
		if (!t) throw Error(`${m} | Selected Argon item ${e} is no longer available.`);
		return t;
	});
}
function Jr(e) {
	return jr(J(e, !0));
}
function Yr(e) {
	let t = Kr(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return X(n, Cr(Y(n), t));
}
function Xr(e) {
	let t = Kr(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return X(n, wr(Y(n), t));
}
function Zr(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return X(t, Tr(Y(t)));
}
function Qr(e) {
	let t = [...e.itemTypes.trait];
	return X(t, Er(Y(t)));
}
function $r(e) {
	let t = tt.map((e) => ({
		...e,
		type: "characteristic"
	})), n = nt.map((e) => ({
		name: ei(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = X(r, Dr(Y(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function ei({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = ai(`NAME.${e}`, t);
	return n ? `${i} (${ai(n, r)})` : i;
}
function ti(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = Or(String(t)), r = [...e.items];
	return X(r, Ar(Y(r), n));
}
function ni(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function ri(e) {
	return yr(J(e));
}
function ii(e) {
	return br(J(e));
}
function ai(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/buttons.ts
function oi(e) {
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
				details: Jr(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = ni(this.item);
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
			let e = Xr(this.actor), t = Zr(this.actor), s = Qr(this.actor), c = $r(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = ti(this.actor), u = [
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
				icon: `${$e}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${$e}/drink-me.webp`,
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
function si() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!v("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/movement.ts
function ci(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function li(e, t, n) {
	ci(e, "move score"), ci(t, "maximum distance"), ci(n, "used distance");
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
function di(e) {
	return ci(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/panels.ts
function fi(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function pi(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function mi(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return Qe;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await Vr(this.actor), await super._onConfigure(e);
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
			let e = et.map((e) => {
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
			}), n = Yr(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return fi(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return fi(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return pi(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += fi(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = li(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${di(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${di(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: di(t.bubbleDistance),
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
function hi(e) {
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
			if (!ri(n) || n.actor !== this.actor) throw Error(`${m} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let r = e.currentTarget.dataset.set, i = e.currentTarget.dataset.slot;
			if (!r || !i) throw Error(`${m} | Argon weapon-set drop target has no set or slot identifier.`);
			let a = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			a[r] ??= {}, a[r][i] = n.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", a), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!Br(this.actor, "switchEquip")) return;
			let n = Mr(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(ii).map((e) => ({
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
function gi() {
	h("enhancedcombathud") && v("argonCombatHud") && (si(), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = oi(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = mi(e), a = hi(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	}));
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/panels.ts
function _i(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = oi(e);
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
//#region src/module/foundry/integrations/paper-doll-argon/report-bridge-error.ts
function vi(e) {
	return e instanceof Error ? e.message : String(e);
}
function yi(e, t) {
	ke(`${ue}: ${e}. ${vi(t)}`, t);
}
function bi(e, t) {
	e.catch((e) => yi(t, e));
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/register-integration.ts
function xi() {
	return v("paperDoll") && v("argonCombatHud") && v("paperDollArgonBridge");
}
function Si(e, t) {
	!xi() || !x(e) || Zt(t) && bi(Qt(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function Ci() {
	h("fvtt-paper-doll-ui") && h("enhancedcombathud") && xi() && (Hooks.on("argonInit", (e) => {
		if (!e || typeof e != "object" || !("defineMainPanels" in e) || typeof e.defineMainPanels != "function") throw Error("Argon main panel registration API is unavailable.");
		let { PaperDollQuickItemsPanel: t } = _i(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", Si));
}
//#endregion
//#region src/module/foundry/integrations/splatter/configuration-menu.ts
var wi = `${m}.Splatter.Configuration`;
function Ti(e) {
	return game?.i18n.localize(`${wi}.${e}`) ?? e;
}
var Ei = class extends foundry.applications.api.ApplicationV2 {
	async render(e) {
		try {
			await yn(), ui?.notifications?.info(Ti("Success"));
		} catch (e) {
			ke(Ti("Error"), e);
		}
		return this;
	}
}, Di = `${m}.Splatter.Configuration`;
function Oi() {
	if (h("splatter")) {
		if (!game) throw Error(`${m} | Foundry game is unavailable during Splatter registration.`);
		game.settings.registerMenu(m, "configureSplatter", {
			hint: `${Di}.Hint`,
			icon: "fa-solid fa-droplet",
			label: `${Di}.Button`,
			name: `${Di}.Name`,
			restricted: !0,
			type: Ei
		});
	}
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/repair-mad-prefab-exclusions.ts
var ki = /* @__PURE__ */ new WeakSet();
function Ai(e) {
	if (ki.has(e)) return !1;
	let t = e.Initialise, n = /* @__PURE__ */ new Set();
	return e.Initialise = function(e, ...r) {
		let i = e?.moduleName, a = i ? game?.modules.get(i) : void 0, o = e?.ignoredCompendiumPacks;
		if (!i?.startsWith("mad-") || !a?.active || !a.packs) return t.call(this, e, ...r);
		let s = `${i}-prefabs`;
		return !Array.isArray(o) || !o.includes(s) || Array.from(a.packs).some((e) => e.name === s) ? t.call(this, e, ...r) : (n.has(i) || (n.add(i), console.warn(`${m} | ${i}: skipped unavailable Scene Packer exclusion ${s}.`)), t.call(this, {
			...e,
			ignoredCompendiumPacks: o.filter((e) => e !== s)
		}, ...r));
	}, ki.add(e), !0;
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/register-integration.ts
function ji() {
	h("scene-packer") && game?.system.id === "wfrp4e" && typeof ScenePacker < "u" && Ai(ScenePacker);
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/repair-forge-owner-detection.ts
var Mi = /* @__PURE__ */ new WeakSet();
function Ni(e, t) {
	if (Mi.has(e)) return !1;
	let n = e._detectForgeAccountId;
	return e._detectForgeAccountId = async function() {
		let e = t();
		return this.isRunningOnForge() && typeof e == "string" && /^[a-zA-Z0-9_-]+$/.test(e) && e !== "bazaar" ? (this.forgeAccountId = e, !0) : n.call(this);
	}, Mi.add(e), !0;
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/register-integration.ts
async function Pi() {
	if (!h("fa-nexus") || game?.system.id !== "wfrp4e" || typeof ForgeAPI > "u") return;
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
		Ni(t, () => ForgeAPI.lastStatus?.ownerUserId);
	} catch (e) {
		console.error(`${m} | Could not install FA Nexus Forge compatibility.`, e);
	}
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-data-model-migrations.ts
var Fi = /* @__PURE__ */ new WeakSet();
function Ii(e) {
	let t = e.migrateData;
	return typeof t != "function" || Fi.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, Fi.add(e), !0);
}
function Li() {
	return [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(Ii(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-roll-modes.ts
function Ri() {
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
function zi(e) {
	let t = Z(e);
	return {
		kind: "speaker",
		actor: Q(t.actor),
		scene: Q(t.scene),
		token: Q(t.token)
	};
}
function Bi(e) {
	return zi(Z(Z(e).context).speaker);
}
function Vi(e) {
	let t = e.system ?? {};
	switch (e.type) {
		case "test": return [Bi(t.testData)];
		case "opposed": {
			let e = Z(t.opposedTestData);
			return [Bi(e.attackerTestData), Bi(e.defenderTestData)];
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
			return e.targetSpeakerData && n.push(zi(e.targetSpeakerData)), e.defenderMessageId && n.push({
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
function Hi(e) {
	let t = new DOMParser().parseFromString(e, "text/html").body;
	for (let e of t.querySelectorAll("script, style, template, button, input, select, textarea, .chat-button, a[data-action], [role='button'], .dice-tooltip, .applied-breakdown, .secret:not(.revealed), [hidden], [aria-hidden='true']")) e.remove();
	for (let e of t.querySelectorAll("img")) e.replaceWith(t.ownerDocument.createTextNode(e.alt ? ` ${e.alt} ` : ""));
	for (let e of t.querySelectorAll("br, p, div, li, tr, h1, h2, h3, h4, h5, h6")) e.append(t.ownerDocument.createTextNode("\n"));
	for (let e of t.querySelectorAll("td, th")) e.append(t.ownerDocument.createTextNode(" "));
	return (t.textContent ?? "").split("\n").map((e) => e.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}
function Ui(e) {
	let t = document.createElement("p");
	return t.textContent = e, t.style.whiteSpace = "pre-line", t;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/render-orphaned-chat-cards.ts
var Wi = /* @__PURE__ */ new WeakSet();
function Gi(e) {
	if (!game) return !1;
	switch (e.kind) {
		case "speaker": return e.scene && e.token ? !!game.scenes.get(e.scene)?.tokens.get(e.token)?.actor : !!(e.actor && game.actors.get(e.actor));
		case "uuid": return !!(e.uuid && fromUuidSync(e.uuid)?.documentName === "Actor");
		case "message": {
			let t = game.messages.get(e.id);
			return t ? t._source.type === "test" ? Vi(t._source).every(Gi) : !1 : !e.required;
		}
	}
}
async function Ki(e, t) {
	let n = e.toObject(), r = e.visible && e.isContentVisible, i = r ? Hi(n.content) : "", a = new foundry.documents.ChatMessage({
		...n,
		type: "base",
		system: {},
		flags: {},
		content: Ui(i).outerHTML
	}), o = await a.renderHTML(t), s = o.querySelector(".message-content");
	if (s) {
		let e = r && a.isContentVisible ? i : Hi(s.innerHTML);
		s.replaceChildren(Ui(e));
	}
	return o.addEventListener("contextmenu", (e) => e.stopPropagation(), { capture: !0 }), o;
}
function qi() {
	let e = CONFIG.ChatMessage.documentClass?.prototype;
	if (!e || Wi.has(e)) return !1;
	let t = e.renderHTML;
	return e.renderHTML = function(e) {
		return Vi(this._source).some((e) => !Gi(e)) ? Ki(this, e) : t.call(this, e);
	}, Wi.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/active-effect-schema.ts
function Ji(e) {
	let t = e.schema;
	if (t.fields.changes) return !1;
	let n = e.defineSchema;
	return e.defineSchema = function() {
		let e = n.call(this);
		return e.changes ||= foundry.data.ActiveEffectTypeDataModel.defineSchema().changes, e;
	}, t.extendFields({ changes: foundry.data.ActiveEffectTypeDataModel.defineSchema().changes }), !0;
}
function Yi() {
	return Object.values(CONFIG.ActiveEffect?.dataModels ?? {}).reduce((e, t) => e + Number(Ji(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/guard-actorless-token-ruler.ts
var Xi = /* @__PURE__ */ new WeakSet(), Zi = /* @__PURE__ */ new WeakSet();
function Qi() {
	let e = CONFIG.Token?.rulerClass?.prototype, t = foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	if (!e || !t || e === t || !Object.prototype.isPrototypeOf.call(t, e) || typeof e._getSegmentStyle != "function" || typeof t._getSegmentStyle != "function" || Xi.has(e)) return !1;
	let n = e._getSegmentStyle, r = t._getSegmentStyle;
	return e._getSegmentStyle = function(...e) {
		if (this.token.actor) return n.apply(this, e);
		if (!Zi.has(this.token)) {
			Zi.add(this.token);
			let { uuid: e, actorId: t, actorLink: n } = this.token.document;
			console.warn("WFRP4e Compatibility Box | Token has no actor; using the core ruler style.", {
				tokenUuid: e,
				actorId: t,
				actorLink: n,
				worldActorExists: !!(t && game?.actors.get(t))
			});
		}
		return r.apply(this, e);
	}, Xi.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/apply-compatibility-patches.ts
function $i() {
	game?.system.id === "wfrp4e" && (Ri(), Li(), Yi(), qi(), Qi());
}
//#endregion
//#region src/module/wfrp/folders/hooks.ts
var ea, ta = !1, na = !1;
function $() {
	if (!(!game?.ready || !game.user?.isActiveGM)) {
		if (ta) {
			na = !0;
			return;
		}
		clearTimeout(ea), ea = setTimeout(() => {
			ra();
		}, 1e3);
	}
}
async function ra() {
	if (!(!game?.ready || !game.user?.isActiveGM || ta)) {
		ta = !0, na = !1;
		try {
			await Hn();
		} catch (e) {
			console.error(`${ue}: WFRP folder cleanup failed.`, e), ui?.notifications?.error(`${ue}: WFRP cleanup failed and may be incomplete. See the console for details.`, {
				console: !1,
				permanent: !0
			});
		} finally {
			ta = !1, na && $();
		}
	}
}
function ia() {
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
function aa() {
	Hooks.once("setup", () => In($)), ia(), Hooks.once("init", () => {
		$i(), Lr(), ji(), Pi(), Wn(), dr(), gi(), Ht(), Ci(), Oi();
	});
}
//#endregion
//#region src/module/init/index.ts
aa();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map