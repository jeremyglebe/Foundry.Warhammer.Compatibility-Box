//#region src/module/constants.ts
var e = "wfrp4e-compatibility-box", t = "Drowsy's WFRP4e Compatibility Box";
//#endregion
//#region src/module/foundry/settings/preset-runtime/presentation.ts
function n(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
function r(e) {
	let t = n, r = e.changes.map(({ label: e, current: n, value: r }) => `<li><strong>${t(e)}</strong><br>Current: <code>${t(JSON.stringify(n))}</code><br>Preset: <code>${t(JSON.stringify(r))}</code></li>`).join(""), i = [
		...e.skipped,
		...e.failed,
		...e.conflicts
	].map(({ id: e, reason: n }) => `<li>${t(e)}: ${t(n)}</li>`).join("");
	return `<p>${e.changes.length} changes; ${e.unchanged.length} already set; ${e.excluded.length} left to the GM's current settings.</p><div class="scrollable" style="max-height:45vh"><details><summary>Review setting changes</summary><ul>${r}</ul></details>${i ? `<p>Resolve these issues before applying:</p><ul>${i}</ul>` : ""}${e.missingTables.length ? `<p>Import these missing rule tables first: ${t(e.missingTables.join(", "))}</p>` : ""}</div>${e.requiresReload ? "<p>A reload is required for these changes.</p>" : ""}`;
}
async function i(e, t) {
	let r = `${e}: ${t.updated.length} updated, ${t.unchanged.length} already set, ${t.excluded.length} left unchanged by conflict choices.`;
	t.blocked && (r += " Nothing was applied because preflight found unresolved issues.");
	let i = [
		...t.skipped,
		...t.failed,
		...t.conflicts
	];
	i.length && (r += ` ${i.map(({ id: e, reason: t }) => `${e}: ${t}`).join("; ")}.`), t.missingTables.length && (r += ` Missing rule tables: ${t.missingTables.join(", ")}.`), t.failed.length && t.updated.length && (r += " Earlier successful changes remain applied; review before retrying."), t.blocked || t.failed.length ? ui?.notifications?.error(n(r), { permanent: !0 }) : ui?.notifications?.info(n(r)), t.requiresReload && !t.automaticReload && await foundry.applications.settings.SettingsConfig.reloadConfirm({ world: !0 });
}
//#endregion
//#region src/module/foundry/notifications/notify-user.ts
function a(e, t) {
	t === void 0 ? console.error(e) : console.error(e, t);
}
function o(e, t) {
	a(e, t), ui?.notifications?.error(e);
}
//#endregion
//#region src/module/foundry/integrations/is-module-active.ts
function s(e) {
	if (typeof game > "u" || !game) throw Error("Optional module integrations require an initialized Foundry game.");
	return game.modules.get(e)?.active === !0;
}
//#endregion
//#region src/module/foundry/settings/optional-features.ts
var c = {
	simpleCalendar: {
		settingKey: "simpleCalendarEnabled",
		targetModuleIds: ["foundryvtt-simple-calendar-reborn"]
	},
	simpleTimekeeping: {
		settingKey: "simpleTimekeepingEnabled",
		targetModuleIds: ["simple-timekeeping"]
	},
	healthEstimate: {
		settingKey: "healthEstimateEnabled",
		targetModuleIds: ["healthEstimate"]
	},
	bossBar: {
		settingKey: null,
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
function l(e) {
	return c[e].targetModuleIds.every((e) => s(e));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/constants.ts
var u = "bossbar", d = {
	automatic: "bossBarAutoSelect",
	frameless: "bossBarRemoveFrame",
	stacked: "bossBarStackWounds",
	woundsStyle: "bossBarWoundsStyle",
	ignorePrompt: "bossBarIgnorePresetPrompt"
}, f = [
	"automatic",
	"frameless",
	"stacked"
], p = {
	integrations: {
		title: "Integrations",
		hint: "Choose optional compatibility features and configure their behavior.",
		icon: "fa-solid fa-puzzle-piece"
	},
	calendars: {
		title: "Calendars",
		hint: "Set up the Imperial calendar, migrate existing dates, and import WFRP events.",
		icon: "fa-solid fa-calendar-days"
	},
	presets: {
		title: "Presets",
		hint: "Review recommended module settings, manage setup prompts, and export presets.",
		icon: "fa-solid fa-sliders"
	},
	world: {
		title: "World Tools",
		hint: "Organize WFRP content and inspect compatibility fixes.",
		icon: "fa-solid fa-toolbox"
	}
}, m = /* @__PURE__ */ new Map();
function ee(e) {
	for (let [t, n] of m) n.group === e && m.delete(t);
}
function h(e, t, n) {
	m.set(t, {
		group: e,
		action: n
	});
}
function te(e) {
	return [...m].filter(([, t]) => t.group === e).map(([e, t]) => [e, t.action]);
}
//#endregion
//#region src/module/foundry/settings/groups/controls.ts
function ne(e) {
	for (let t of [
		"presets",
		"calendars",
		"world",
		"integrations"
	]) if (te(t).some(([, t]) => t.settingKey === e)) return t;
	if (["simpleCalendarEnabled", "simpleTimekeepingEnabled"].includes(e) || /^ignoreSettingsPreset-(foundryvtt-simple-calendar-reborn|simple-timekeeping)$/.test(e)) return "calendars";
	if (e.startsWith("ignoreSettingsPreset-")) return "presets";
	if (["keepWfrpImportedContentTidy", "keepWfrpCompendiumsTidy"].includes(e)) return "world";
	if ([
		...Object.values(c).map((e) => e.settingKey),
		...Object.values(d),
		"argonCombatItemPatterns"
	].includes(e)) return "integrations";
}
function re(t) {
	return [...game?.settings.settings ?? []].flatMap(([n, r]) => {
		if (!n.startsWith("wfrp4e-compatibility-box.")) return [];
		let i = n.slice(e.length + 1);
		if (ne(i) !== t) return [];
		let a = r;
		if (![Boolean, String].includes(a.type)) return [];
		let o = typeof a.choices == "function" ? a.choices() : a.choices;
		return [{
			key: i,
			name: game.i18n.localize(a.name),
			hint: game.i18n.localize(a.hint),
			type: a.type,
			value: game.settings.get(e, i),
			requiresReload: !!a.requiresReload,
			...o ? { choices: o } : {}
		}];
	});
}
function ie() {
	if (!game?.ready || !game.user?.isGM) throw Error("A GM in a loaded world is required to configure Compatibility Box.");
}
async function ae(t, n, r) {
	ie();
	let i = re(t), a = n.filter((e) => r[e.key] !== e.value);
	for (let e of a) {
		let t = i.find((t) => t.key === e.key);
		if (!t || t.value !== e.value) throw Error("These settings changed in another window. Reopen this window before saving.");
		let n = r[e.key];
		if (e.type === Boolean && typeof n != "boolean" || e.type === String && typeof n != "string" || t.choices && !Object.hasOwn(t.choices, String(n))) throw Error(`Choose a valid value for ${e.name}.`);
	}
	for (let t of a) ie(), await game.settings.set(e, t.key, r[t.key]);
	return a.some((e) => e.requiresReload);
}
//#endregion
//#region src/module/foundry/settings/groups/window.ts
function oe(e) {
	let t = `wfrp-group-${e.key}`, r = e.type === Boolean ? `<input id="${n(t)}" name="${n(e.key)}" type="checkbox" ${e.value ? "checked" : ""}>` : e.choices ? `<select id="${n(t)}" name="${n(e.key)}">${Object.entries(e.choices).map(([t, r]) => `<option value="${n(t)}" ${t === e.value ? "selected" : ""}>${n(r)}</option>`).join("")}</select>` : `<input id="${n(t)}" name="${n(e.key)}" type="text" value="${n(String(e.value))}">`;
	return `<div class="form-group"><label for="${n(t)}">${n(e.name)}</label><div class="form-fields">${r}</div><p class="hint">${n(e.hint)}${e.requiresReload && !/reload/i.test(e.hint) ? " Requires a reload." : ""}</p></div>`;
}
function se(e) {
	let t = p[e];
	return class extends foundry.applications.api.ApplicationV2 {
		static DEFAULT_OPTIONS = {
			id: `wfrp-settings-${e}`,
			window: {
				title: `Compatibility Box — ${t.title}`,
				icon: t.icon,
				resizable: !0
			},
			position: {
				width: 740,
				height: 650
			}
		};
		reloadRequired = !1;
		async _renderHTML() {
			ie();
			let r = re(e), i = te(e), a = new Set(i.map(([, e]) => e.settingKey)), s = document.createElement("form");
			s.style.cssText = "display:flex;flex-direction:column;gap:12px;height:100%;min-height:0", s.innerHTML = `<p>${n(t.hint)}</p><section class="scrollable" style="overflow:auto;flex:1;min-height:0">${r.filter((e) => !a.has(e.key)).map(oe).join("")}${i.map(([e, t]) => `<fieldset style="margin:12px 0"><legend>${n(t.name)}</legend><p class="hint">${n(t.hint)}</p><button type="button" data-group-action="${n(e)}"><i class="${n(t.icon)}" aria-hidden="true"></i> ${n(t.label)}</button>${r.filter((e) => e.key === t.settingKey).map(oe).join("")}</fieldset>`).join("")}${!r.length && !i.length ? "<p>No supported modules are currently available for this group.</p>" : ""}</section><p role="status" data-status>${this.reloadRequired ? "Saved. Reload connected clients to activate feature changes." : "Changes take effect when you save. Setup actions open their own review."}</p>${r.length ? "<button type=\"submit\">Save Settings</button>" : ""}`;
			let c = s.querySelector("[data-status]");
			if (this.reloadRequired) {
				let e = document.createElement("button");
				e.type = "button", e.textContent = "Reload Foundry", e.addEventListener("click", async () => {
					ie(), await foundry.applications.settings.SettingsConfig.reloadConfirm({ world: !0 });
				}), s.append(e);
			}
			let l = [...s.querySelectorAll("[data-group-action]")], u = !1, d = () => {
				u = !0, c.textContent = "Unsaved changes. Save before running a setup action, or close to discard.";
				for (let e of l) e.disabled = !0;
			};
			s.addEventListener("input", d), s.addEventListener("change", d), s.addEventListener("submit", async (t) => {
				t.preventDefault();
				let n = [...s.querySelectorAll("input,select")], i = Object.fromEntries(n.map((e) => [e.name, e instanceof HTMLInputElement && e.type === "checkbox" ? e.checked : e.value])), a = [...s.querySelectorAll("button")];
				for (let e of a) e.disabled = !0;
				try {
					this.reloadRequired = await ae(e, r, i) || this.reloadRequired, ui?.notifications?.info(this.reloadRequired ? "Settings saved. Reload connected clients to activate feature changes." : "Compatibility Box settings saved."), await this.render(!0);
				} catch (e) {
					o(e instanceof Error ? e.message : String(e), e), await this.render(!0);
				}
			});
			for (let e of l) e.addEventListener("click", async () => {
				e.disabled = !0;
				try {
					ie();
					let t = i.find(([t]) => t === e.dataset.groupAction)?.[1];
					t && await new t.type().render(!0);
				} catch (e) {
					o(e instanceof Error ? e.message : String(e), e);
				} finally {
					e.disabled = u;
				}
			});
			return s;
		}
		_replaceHTML(e, t) {
			t.replaceChildren(e);
		}
	};
}
function ce() {
	Hooks.once("setup", () => {
		for (let t of Object.keys(p)) {
			let n = p[t];
			game?.settings.registerMenu(e, `settings-${t}`, {
				name: n.title,
				label: `Configure ${n.title}`,
				hint: n.hint,
				icon: n.icon,
				restricted: !0,
				type: se(t)
			});
		}
	});
}
var le = {
	calendar: {
		title: "Warhammer Wiki — Imperial Calendar",
		url: "https://warhammerfantasy.fandom.com/wiki/Imperial_Calendar"
	},
	moons: {
		title: "Warhammer Wiki — Morrslieb",
		url: "https://warhammerfantasy.fandom.com/wiki/Morrslieb"
	},
	altdorf: {
		title: "Altdorf: Crown of the Empire — Festivals of Altdorf",
		uuid: "Compendium.wfrp4e-altdorf.journals.JournalEntry.rSRadYoaNXkEq8gs.JournalEntryPage.Jx2wjk3sLXroZ7XW"
	},
	middenheim: {
		title: "Middenheim: City of the White Wolf — Komission of Public Works",
		uuid: "Compendium.wfrp4e-middenheim.journals.JournalEntry.PuIrlGBOjxuWpK3P.JournalEntryPage.QpoN5fivtBT60AY1"
	},
	"ubersreik-festivals": {
		title: "Starter Set, A Guide to Ubersreik — Ubersreik: A Visitor's Guide",
		uuid: "Compendium.wfrp4e-starter-set.journals.JournalEntry.TSyoR9nSk7cehypG.JournalEntryPage.zeGI8affMTVI0ot3"
	},
	"ubersreik-history": {
		title: "Starter Set, A Guide to Ubersreik — Timeline of Ubersreik",
		uuid: "Compendium.wfrp4e-starter-set.journals.JournalEntry.TSyoR9nSk7cehypG.JournalEntryPage.ggwMQ8BscTFnFJli"
	},
	"ua3-occupation": {
		title: "Ubersreik Adventures III — A Tragic Tale of Upheaval: The Occupation (2512–2513 IC)",
		uuid: "Compendium.wfrp4e-ua3.journals.JournalEntry.rhVi4yeShlY5CqxI.JournalEntryPage.5fWdZeiNJ0VYNqin"
	},
	"ua2-blessings": {
		title: "Ubersreik Adventures II — The Blessings that Drew Blood: Killing Times",
		uuid: "Compendium.wfrp4e-ua2.journals.JournalEntry.A8R3vahlFHvd7zz1.JournalEntryPage.l5I1ak5rLfWsxQ8C"
	},
	goldgather: {
		title: "Warhammer Wiki — Goldgather’s End (citing Signs of Faith, p. 31)",
		url: "https://warhammerfantasy.fandom.com/wiki/Goldgather%27s_End"
	},
	schaffenfest: {
		title: "Enemy in Shadows — The Boatman Inn, Handout 6: The Schaffenfest",
		uuid: "Compendium.wfrp4e-eis.journals.JournalEntry.IjGUv51IPhj79Wxt.JournalEntryPage.E8nLFVw3Mmc024dc"
	},
	carnival: {
		title: "Power Behind the Throne — Chapter 5: Carnival Events",
		uuid: "Compendium.wfrp4e-pbtt.journals.JournalEntry.qnddoqf7stZdPo0E.JournalEntryPage.7jIcZdeBQ3C33ewh"
	},
	"carnival-default": { title: "Middenheim: City of Chaos (WFRP 1e) — Snotball & Other Pastimes: first week of Brauzeit" },
	"carnival-timing": {
		title: "Power Behind the Throne — The Carnival: deliberately flexible timing",
		uuid: "Compendium.wfrp4e-pbtt.journals.JournalEntry.qnddoqf7stZdPo0E.JournalEntryPage.AFepPfcG3XjWyshD"
	},
	"ubersreik-seizure": {
		title: "Starter Set, A Guide to Ubersreik — Welcome to Ubersreik: The Emperor Strikes Back",
		uuid: "Compendium.wfrp4e-starter-set.journals.JournalEntry.TSyoR9nSk7cehypG.JournalEntryPage.FZ6VFcaXq1EzHmXF"
	},
	"ubersreik-wiki": {
		title: "Warhammer Wiki — Ubersreik",
		url: "https://warhammerfantasy.fandom.com/wiki/Ubersreik"
	},
	"ranald-painting": {
		title: "Deft Steps, Light Fingers — The Cult of Ranald (p. 4)",
		uuid: "Compendium.wfrp4e-dslf.journals.JournalEntry.iGJbarHnUGTU2SKc.JournalEntryPage.A1r1CnpmdO9JKHEP"
	},
	"moot-delegation": {
		title: "Archives of the Empire I — Timeline of Halflings in the Old World",
		uuid: "Compendium.wfrp4e-archives1.journals.JournalEntry.g948GZpNWZCMRFup.JournalEntryPage.fA3pUspAyy2oRSNy"
	},
	"ubersreik-aftermath": {
		title: "Ubersreik Adventures III — The Aftermath (2513 and beyond)",
		uuid: "Compendium.wfrp4e-ua3.journals.JournalEntry.rhVi4yeShlY5CqxI.JournalEntryPage.OLHeFfPS3NTKAs3R"
	},
	"deposition-default": { title: "Package convention — 5 Nachexen 2512 IC, adopted from House of Joy by explicit GM request; exact published date unverified" },
	"ua2-lena-arrival": {
		title: "Ubersreik Adventures II — Bridge House Inn",
		uuid: "Compendium.wfrp4e-ua2.journals.JournalEntry.A8R3vahlFHvd7zz1.JournalEntryPage.F5mbAIF8BssmJ3GF"
	}
}, ue = [
	{
		id: "hexenstag",
		name: "Hexenstag",
		month: 0,
		day: 1,
		endDay: 1,
		region: "Empire",
		summary: "The year opens with Witching Day. Its ill-omened night is associated with both moons being full and households sheltering behind protective charms.",
		sources: ["calendar", "moons"],
		endMonth: 0
	},
	{
		id: "year-blessing",
		name: "Year Blessing",
		month: 1,
		day: 1,
		endDay: 1,
		region: "Empire",
		summary: "A holy day of Verena. In Altdorf, a procession from her temple-library concludes with food distributed to people in need.",
		sources: ["altdorf"],
		endMonth: 1
	},
	{
		id: "brynkulti",
		name: "Brynkulti",
		month: 2,
		day: 1,
		endDay: 1,
		region: "Ubersreik",
		summary: "Ubersreik celebrates Dwarf goldwork with a trade fair showcasing ornaments from Dawihafen and the Grey Mountains.",
		sources: ["ubersreik-festivals"],
		endMonth: 2
	},
	{
		id: "mitterfruhl",
		name: "Mitterfruhl",
		month: 3,
		day: 1,
		endDay: 1,
		region: "Empire",
		summary: "The spring equinox, outside the ordinary week. Local celebrations include fairs and rites welcoming growth.",
		sources: ["calendar", "altdorf"],
		endMonth: 3
	},
	{
		id: "schaffenfest",
		name: "Schaffenfest",
		month: 3,
		day: 1,
		endMonth: 4,
		endDay: 2,
		region: "Bögenhafen",
		summary: "The annual livestock fair opens on Mitterfruhl and lasts three days: the festival day and the first two days of Pflugzeit. Markets, sideshows and a tourney attract visitors from across the Reikland.",
		sources: ["schaffenfest"]
	},
	{
		id: "first-quaff",
		name: "First Quaff",
		month: 4,
		day: 33,
		endDay: 33,
		region: "Dwarf communities; also observed in Altdorf",
		summary: "Dwarf brewers open the first batch of the year. Elders judge the beer and the prospects it may foretell.",
		sources: ["altdorf"],
		endMonth: 4
	},
	{
		id: "magnustag",
		name: "Magnustag",
		month: 5,
		day: 10,
		endDay: 10,
		region: "Ubersreik",
		summary: "A carnival honouring Magnus the Pious. Ubersreik districts compete to build especially large effigies known as Maggies.",
		sources: ["ubersreik-festivals"],
		endMonth: 5
	},
	{
		id: "sigmartag",
		name: "Sigmartag",
		month: 5,
		day: 18,
		endDay: 18,
		region: "Empire",
		summary: "Sigmar’s principal holy day and traditional birthday. Processions, worship and civic celebrations mark the occasion.",
		sources: ["altdorf", "middenheim"],
		endMonth: 5
	},
	{
		id: "silburmesse",
		name: "Silburmesse",
		month: 6,
		day: 5,
		endDay: 5,
		region: "Ubersreik",
		summary: "Ubersreik’s silverwork fair brings customers and revenue to the town’s renowned silver trade.",
		sources: ["ubersreik-festivals"],
		endMonth: 6
	},
	{
		id: "sonnstill",
		name: "Sonnstill",
		month: 7,
		day: 1,
		endDay: 1,
		region: "Empire",
		summary: "The summer solstice, a festival day outside the ordinary week. Middenheim also marks its founding on this day, calling it Arturtag.",
		sources: ["calendar", "middenheim"],
		endMonth: 7
	},
	{
		id: "goldgathers-end",
		name: "Goldgather’s End",
		month: 8,
		day: 23,
		endMonth: 8,
		endDay: 23,
		region: "Empire",
		summary: "Celebrates the death of Emperor Boris Goldgather. Customs include gifts, wine drunk from a skull, and indignities visited upon misers; some observe a preceding fast.",
		sources: ["goldgather"]
	},
	{
		id: "saga",
		name: "Saga",
		month: 8,
		day: 33,
		endDay: 33,
		region: "Dwarf communities",
		summary: "Dwarf communities honour their ancestors through recitations of family history and great deeds.",
		sources: ["altdorf"],
		endMonth: 8
	},
	{
		id: "geheimnistag",
		name: "Geheimnistag",
		month: 9,
		day: 1,
		endDay: 1,
		region: "Empire",
		summary: "The Day of Mystery and its feared night fall outside the ordinary week. Both moons are associated with fullness, and many people avoid travelling after dark.",
		sources: ["calendar", "moons"],
		endMonth: 9
	},
	{
		id: "pie-week",
		name: "Pie Week",
		month: 11,
		day: 1,
		endDay: 8,
		region: "Empire",
		summary: "Eight days of Halfling baking traditions, pie markets and eating contests, enjoyed well beyond Halfling communities.",
		sources: ["altdorf"],
		endMonth: 11
	},
	{
		id: "mittherbst",
		name: "Mittherbst",
		month: 12,
		day: 1,
		endDay: 1,
		region: "Empire",
		summary: "The autumn equinox, outside the ordinary week. Communities mark the harvest and the approach of darker months.",
		sources: ["calendar", "altdorf"],
		endMonth: 12
	},
	{
		id: "middenheim-carnival",
		name: "Middenheim Carnival",
		month: 13,
		day: 1,
		endMonth: 13,
		endDay: 8,
		region: "Middenheim",
		summary: "Eight days of entertainments, contests, feasts, and festivities. This package uses 1–8 Brauzeit, the first-week-of-Brauzeit schedule in Middenheim: City of Chaos. Later books describe a rotating seasonal Carnival and deliberately leave its adventure date flexible; the packaged annual date is a default that can be moved.",
		sources: [
			"carnival-default",
			"carnival-timing",
			"middenheim",
			"carnival"
		]
	},
	{
		id: "second-breach",
		name: "Second Breach",
		month: 13,
		day: 33,
		endDay: 33,
		region: "Dwarf communities; also observed in Altdorf",
		summary: "A Dwarf drinking festival with renewed tasting of clan beer and remembrance of ancestors. Also called Second Breech in some references.",
		sources: ["altdorf"],
		endMonth: 13
	},
	{
		id: "mondstille",
		name: "Mondstille",
		month: 16,
		day: 1,
		endDay: 1,
		region: "Empire",
		summary: "The winter solstice, outside the ordinary week. Fires and rites honour endurance through winter and the eventual return of growth.",
		sources: ["calendar", "altdorf"],
		endMonth: 16
	},
	{
		id: "keg-end",
		name: "Keg End",
		month: 17,
		day: 33,
		endDay: 33,
		region: "Dwarf communities",
		summary: "The final Dwarf drinking festival of the year, when remaining old beer is consumed before it spoils.",
		sources: ["altdorf"],
		endMonth: 17
	}
], de = [
	{
		id: "foundation",
		title: "Founding of Übersreichdorf",
		year: -500,
		endYear: -500,
		approximate: !0,
		precision: "year",
		summary: "An Unberogen settlement develops in the Grey Mountain foothills; its name eventually becomes Ubersreik.",
		sources: ["ubersreik-history"]
	},
	{
		id: "sigmar-birth-tradition",
		title: "A disputed birthplace of Sigmar",
		year: -30,
		endYear: -30,
		approximate: !1,
		precision: "year",
		summary: "Vorbergland tradition places Sigmar’s birth in Ubersreik. Altdorf’s cult contests this claim; it is recorded here as a local tradition, not a settled fact.",
		sources: ["ubersreik-history"]
	},
	{
		id: "sigmar-temple",
		title: "Temple of Sigmar consecrated",
		year: 82,
		endYear: 82,
		approximate: !1,
		precision: "year",
		summary: "Johann Helstrum consecrates Ubersreik’s temple, the third temple dedicated to Sigmar.",
		sources: ["ubersreik-history"]
	},
	{
		id: "jungfreud-rise",
		title: "Rise of the Junge Frewida",
		year: 150,
		endYear: 150,
		approximate: !0,
		precision: "year",
		summary: "The branch of the Frewida clan later associated with House Jungfreud gains local prominence.",
		sources: ["ubersreik-history"]
	},
	{
		id: "odalrich",
		title: "Odalrich takes Ubersreik",
		year: 197,
		endYear: 197,
		approximate: !1,
		precision: "year",
		summary: "Odalrich von Jungefrewida claims the town and a ducal title; House Jungfreud traces its ancestry to him.",
		sources: ["ubersreik-history"]
	},
	{
		id: "azgaraz-emissaries",
		title: "Karak Azgaraz sends emissaries",
		year: 828,
		endYear: 828,
		approximate: !1,
		precision: "year",
		summary: "Dwarf records put the growing town at roughly ten thousand inhabitants; emissaries arrive to maintain relations.",
		sources: ["ubersreik-history"]
	},
	{
		id: "first-parravon",
		title: "First Parravon War",
		year: 881,
		endYear: 970,
		approximate: !1,
		precision: "year-range",
		summary: "Fighting over lands beyond the Grey Lady Pass ends with the Empire losing its foothold south of the mountains.",
		sources: ["ubersreik-history"]
	},
	{
		id: "black-plague",
		title: "The Black Plague",
		year: 1111,
		endYear: 1115,
		approximate: !1,
		precision: "year-range",
		summary: "The plague devastates Ubersreik. The ruling Jungfreuds withdraw to their mountain holdings.",
		sources: ["ubersreik-history"]
	},
	{
		id: "skaven-sack",
		title: "Skaven raze Ubersreik",
		year: 1121,
		endYear: 1121,
		approximate: !1,
		precision: "year",
		summary: "Skaven emerge from the Teufel and use the ruined town as a base for further raids.",
		sources: ["ubersreik-history"]
	},
	{
		id: "mandred",
		title: "Mandred liberates the ruins",
		year: 1124,
		endYear: 1124,
		approximate: !1,
		precision: "year",
		summary: "Mandred’s forces free Ubersreik. The town remains devastated.",
		sources: ["ubersreik-history"]
	},
	{
		id: "rebuilding",
		title: "Rebuilding with Karak Azgaraz",
		year: 1221,
		endYear: 1221,
		approximate: !1,
		precision: "year",
		summary: "Dwarf assistance restores the town and provides an extensive sewer system. House Bruner takes power.",
		sources: ["ubersreik-history"]
	},
	{
		id: "restless-dead",
		title: "Night of the Restless Dead",
		year: 1681,
		endYear: 1681,
		approximate: !1,
		precision: "year",
		summary: "The rising dead devastate the population. Duke Lambert orders burial grounds moved outside the town walls.",
		sources: ["ubersreik-history"]
	},
	{
		id: "gorkil",
		title: "Waaagh Gorkil!",
		year: 1707,
		endYear: 1707,
		approximate: !1,
		precision: "year",
		summary: "Greenskins destroy Ubersreik after Dwarf reinforcements fail to break through.",
		sources: ["ubersreik-history"]
	},
	{
		id: "black-rock-castle",
		title: "Black Rock Castle built",
		year: 1714,
		endYear: 1714,
		approximate: !1,
		precision: "year",
		summary: "House Bruner funds a new fortress above the ruins, using stone bought from Jungfreud holdings.",
		sources: ["ubersreik-history"]
	},
	{
		id: "red-pox",
		title: "Grey Lady Pass closed",
		year: 1813,
		endYear: 1813,
		approximate: !1,
		precision: "year",
		summary: "The pass is sealed against the spread of Red Pox from Bretonnia.",
		sources: ["ubersreik-history"]
	},
	{
		id: "poisoned-feast",
		title: "The Poisoned Feast",
		year: 1940,
		endYear: 1940,
		approximate: !1,
		precision: "year",
		summary: "Drachenfels destroys the ruling Bruner line at his feast. House Jungfreud retakes Ubersreik and its castle.",
		sources: ["ubersreik-history"]
	}
], fe = [
	{
		id: "recognition",
		title: "Jungfreud rule formally recognised",
		year: 2009,
		endYear: 2009,
		approximate: !1,
		precision: "year",
		summary: "The Reikland Diet recognises House Jungfreud’s claim, provoking opposition from House Walfen.",
		sources: ["ubersreik-history"]
	},
	{
		id: "walfen-siege",
		title: "Walfen besieges Ubersreik",
		year: 2012,
		endYear: 2012,
		approximate: !1,
		precision: "year",
		summary: "The Jungfreuds retain their lands by accepting Duke Wiprecht’s overlordship and surrendering hostages.",
		sources: ["ubersreik-history"]
	},
	{
		id: "vlad",
		title: "Vlad von Carstein sacks Ubersreik",
		year: 2049,
		endYear: 2049,
		approximate: !1,
		precision: "season",
		summary: "The city falls during the First Vampire Wars. The source specifies early autumn, but no month or day.",
		sources: ["ubersreik-history"]
	},
	{
		id: "second-parravon",
		title: "Second Parravon War",
		year: 2141,
		endYear: 2149,
		approximate: !1,
		precision: "year-range",
		summary: "Parravon attacks while Ubersreik troops serve elsewhere. The town is sacked twice, but Black Rock Castle holds.",
		sources: ["ubersreik-history"]
	},
	{
		id: "great-rift",
		title: "The Great Rift",
		year: 2203,
		endYear: 2203,
		approximate: !1,
		precision: "year",
		summary: "A rift at Castle Drachenfels unleashes a week of daemonic devastation that sharply reduces Ubersreik’s population.",
		sources: ["ubersreik-history"]
	},
	{
		id: "great-war",
		title: "Troops leave for the Great War",
		year: 2302,
		endYear: 2302,
		approximate: !1,
		precision: "year",
		summary: "Ubersreik contributes soldiers to Magnus Bildhofen’s campaign against Chaos in Kislev.",
		sources: ["ubersreik-history"]
	},
	{
		id: "zzadrag",
		title: "Waaagh Zzadrag!",
		year: 2303,
		endYear: 2303,
		approximate: !1,
		precision: "year",
		summary: "Before those soldiers return, Greenskins destroy Ubersreik and continue into Böhrn.",
		sources: ["ubersreik-history"]
	},
	{
		id: "zaladrin",
		title: "Zaladrin agrees to rebuild",
		year: 2304,
		endYear: 2304,
		approximate: !1,
		precision: "year",
		summary: "Karak Azgaraz agrees to help rebuild Ubersreik and its defences following negotiations with Emperor Magnus.",
		sources: ["ubersreik-history"]
	},
	{
		id: "third-parravon",
		title: "Third Parravon War",
		year: 2308,
		endYear: 2310,
		approximate: !1,
		precision: "year-range",
		summary: "War spreads through the Grey Lady Pass before King Zaladrin brokers peace.",
		sources: ["ubersreik-history"]
	},
	{
		id: "fourth-parravon",
		title: "Fourth Parravon War",
		year: 2401,
		endYear: 2405,
		approximate: !1,
		precision: "year-range",
		summary: "Ubersreik survives repeated sieges at enormous cost to its population.",
		sources: ["ubersreik-history"]
	},
	{
		id: "grom",
		title: "Waaagh Grom!",
		year: 2420,
		endYear: 2422,
		approximate: !1,
		precision: "year-range",
		summary: "Greenskin attacks and sieges further exhaust the town and surrounding Vorbergland.",
		sources: ["ubersreik-history"]
	},
	{
		id: "fifth-parravon",
		title: "Fifth Parravon War",
		year: 2474,
		endYear: 2474,
		approximate: !1,
		precision: "season",
		summary: "Duc Gaston attacks in spring; six months of fighting precede his withdrawal. Exact dates are not supplied.",
		sources: ["ubersreik-history"]
	},
	{
		id: "maisontaal",
		title: "Battle for la Maisontaal",
		year: 2491,
		endYear: 2491,
		approximate: !1,
		precision: "year",
		summary: "An invasion of the Grey Lady Pass worsens relations with Parravon when Ubersreik fails to assist.",
		sources: ["ubersreik-history"]
	},
	{
		id: "sigismund-inherits",
		title: "Sigismund inherits the duchy",
		year: 2495,
		endYear: 2495,
		approximate: !1,
		precision: "year",
		summary: "Sigismund von Jungfreud inherits Ubersreik and moves his court into Black Rock Castle.",
		sources: ["ubersreik-history"]
	},
	{
		id: "deposition",
		title: "Imperial seizure of Ubersreik",
		year: 2512,
		endYear: 2512,
		approximate: !1,
		precision: "day (provisional package default)",
		summary: "Karl-Franz’s midnight edict removes Jungfreud rule. Altdorf troops march towards Ubersreik at dawn the next day, and Sigismund retreats to Black Rock. This entry dates the deposition; it does not assign the same date to every stage of the occupation.",
		sources: [
			"ubersreik-history",
			"ua3-occupation",
			"ubersreik-seizure",
			"deposition-default"
		],
		date: {
			month: 1,
			day: 5,
			basis: "5 Nachexen is the package’s provisional date, adopted from House of Joy by explicit GM request. Published sources establish early 2512 IC; their exact day remains unverified."
		}
	},
	{
		id: "bruner-ranald-painting",
		title: "Gustav von Bruner commissions a painting of Ranald and Shallya",
		year: 2226,
		endYear: 2226,
		approximate: !1,
		precision: "year",
		summary: "Baron Gustav von Bruner of Ubersreik commissions the Tilean artist Grottio to depict Ranald and Shallya, hoping the offering will improve his gambling fortunes.",
		sources: ["ranald-painting", "ubersreik-wiki"]
	},
	{
		id: "moot-exploratory-committee",
		title: "The Moot sends an exploratory committee to Ubersreik",
		year: 2512,
		endYear: 2512,
		approximate: !1,
		precision: "year",
		summary: "News of Ubersreik’s self-government prompts a semi-official visit from the Moot, whose representatives are exploring possibilities for their own independence.",
		sources: ["moot-delegation"]
	},
	{
		id: "freiburg-charter",
		title: "Ubersreik receives a Freiburg charter",
		year: 2516,
		endYear: 2516,
		approximate: !1,
		precision: "year (published future chronology)",
		summary: "In the published future chronology, Sigismund grants Ubersreik a Freiburg charter, retaining lordship of the duchy while a guild council governs within the city. This is a possible campaign future, subject to player actions and GM changes.",
		sources: ["ubersreik-aftermath"]
	}
], pe = [
	{
		id: "blessings-patti-durst",
		title: "Patti Durst murdered",
		year: 2512,
		endYear: 2512,
		approximate: !1,
		precision: "day (scenario default; year assumed)",
		date: {
			month: 5,
			day: 16,
			basis: "Published month/day from The Blessings that Drew Blood; 2512 IC is the package’s assumed campaign year. The adventure explicitly permits moving the schedule when its starting date changes."
		},
		summary: "The Rhyan victim is killed at a coaching inn near Ubersreik.",
		sources: ["ua2-blessings"]
	},
	{
		id: "blessings-lena-arrives",
		title: "Lena Stein arrives in Ubersreik",
		year: 2512,
		endYear: 2512,
		approximate: !1,
		precision: "day (scenario default; year assumed)",
		date: {
			month: 5,
			day: 17,
			basis: "Published month/day from The Blessings that Drew Blood; 2512 IC is the package’s assumed campaign year. The adventure explicitly permits moving the schedule when its starting date changes."
		},
		summary: "The musician reaches Ubersreik with her luggage and takes lodgings at the Theatre Varieté.",
		sources: ["ua2-lena-arrival", "ua2-blessings"]
	},
	{
		id: "blessings-yan-traum",
		title: "Yan Traum murdered",
		year: 2512,
		endYear: 2512,
		approximate: !1,
		precision: "day (scenario default; year assumed)",
		date: {
			month: 6,
			day: 17,
			basis: "Published month/day from The Blessings that Drew Blood; 2512 IC is the package’s assumed campaign year. The adventure explicitly permits moving the schedule when its starting date changes."
		},
		summary: "The Ulrican zealot is killed while sleeping at the chapel of Ulric.",
		sources: ["ua2-blessings"]
	},
	{
		id: "blessings-werner-klep",
		title: "Werner Klep murdered",
		year: 2512,
		endYear: 2512,
		approximate: !1,
		precision: "day (scenario default; year assumed)",
		date: {
			month: 6,
			day: 29,
			basis: "Published month/day from The Blessings that Drew Blood; 2512 IC is the package’s assumed campaign year. The adventure explicitly permits moving the schedule when its starting date changes."
		},
		summary: "The devotee of Ranald is killed at the docks.",
		sources: ["ua2-blessings"]
	},
	{
		id: "blessings-klein-calvin",
		title: "Klein Calvin murdered",
		year: 2512,
		endYear: 2512,
		approximate: !1,
		precision: "day (scenario default; year assumed)",
		date: {
			month: 8,
			day: 27,
			basis: "Published month/day from The Blessings that Drew Blood; 2512 IC is the package’s assumed campaign year. The adventure explicitly permits moving the schedule when its starting date changes."
		},
		summary: "The Sigmarite victim is killed at a Sigmarite-sponsored orphanage.",
		sources: ["ua2-blessings"]
	},
	{
		id: "blessings-katherine-hartung",
		title: "Katherine Hartung murdered",
		year: 2512,
		endYear: 2512,
		approximate: !1,
		precision: "day (scenario default; year assumed)",
		date: {
			month: 8,
			day: 30,
			basis: "Published month/day from The Blessings that Drew Blood; 2512 IC is the package’s assumed campaign year. The adventure explicitly permits moving the schedule when its starting date changes."
		},
		summary: "The Shallyan priestess becomes the latest victim immediately before the investigation begins.",
		sources: ["ua2-blessings"]
	},
	{
		id: "blessings-investigation-start",
		title: "The Blessings that Drew Blood — assumed adventure start",
		year: 2512,
		endYear: 2512,
		approximate: !1,
		precision: "day (scenario default; year assumed)",
		date: {
			month: 8,
			day: 31,
			basis: "Published month/day from The Blessings that Drew Blood; 2512 IC is the package’s assumed campaign year. The adventure explicitly permits moving the schedule when its starting date changes."
		},
		summary: "The adventure assumes that the investigation starts on this date, with two days remaining for the killer to find her final victim.",
		sources: ["ua2-blessings"]
	}
], me = [
	{
		title: "Zwiebelfest",
		text: "The Starter Set places Ubersreik’s onion festival in the second week of winter. No exact day is assigned here.",
		sources: ["ubersreik-festivals"]
	},
	{
		title: "Adventure-relative dates",
		text: "The Blessings that Drew Blood assumes a start on 31 Vorgeheim. Its seven dated setup events are included as GM-only, non-repeating entries using 2512 IC as the package’s assumed year. They are labelled scenario defaults; move them if the adventure starts at another time.",
		sources: ["ua2-blessings"]
	},
	{
		title: "Deposition date audit",
		text: "The package uses 5 Nachexen 2512 IC for the deposition, adopting the House of Joy date at the GM’s explicit request. This is provisional, not a verified canonical day. The Starter Set establishes early 2512 IC; UA III describes the midnight decree and an army march the following dawn. Replace the provisional day if a precise published date is established.",
		sources: [
			"ubersreik-seizure",
			"ua3-occupation",
			"deposition-default"
		]
	},
	{
		title: "Middenheim Carnival — packaged default",
		text: "The older Middenheim: City of Chaos account places Carnival in the first week of Brauzeit, immediately after Mittherbst. This package therefore includes an annual 1–8 Brauzeit event with no date prompt. Power Behind the Throne deliberately leaves the date open to suit the adventure, and the fourth-edition city book describes a four-year seasonal rotation. The default is a sourced convention, not a claim that every edition uses the same schedule.",
		sources: [
			"carnival-default",
			"carnival-timing",
			"middenheim",
			"carnival"
		]
	},
	{
		title: "Ubersreik wiki and edition context",
		text: "The wiki’s 2226 IC painting commission is corroborated by Deft Steps, Light Fingers. Its accounts of freetown status mix editions and use relative phrases such as “two years ago”; those are not converted into new absolute dates. The 2516 Freiburg charter is recorded separately as the fourth-edition published future chronology.",
		sources: [
			"ubersreik-wiki",
			"ranald-painting",
			"ubersreik-aftermath"
		]
	}
], g = {
	sources: le,
	holidays: ue,
	history: [
		...de,
		...fe,
		...pe
	].sort((e, t) => e.year - t.year),
	researchNotes: me
}, he = {
	months: [
		{
			name: "Hexenstag",
			abbreviation: "Hex",
			numberOfDays: 1,
			intercalary: !0,
			numericRepresentation: -1
		},
		{
			name: "Nachexen",
			abbreviation: "Nac",
			numberOfDays: 32,
			intercalary: !1,
			numericRepresentation: 1
		},
		{
			name: "Jahrdrung",
			abbreviation: "Jah",
			numberOfDays: 33,
			intercalary: !1,
			numericRepresentation: 2
		},
		{
			name: "Mitterfruhl",
			abbreviation: "Mit",
			numberOfDays: 1,
			intercalary: !0,
			numericRepresentation: -2
		},
		{
			name: "Pflugzeit",
			abbreviation: "Pfl",
			numberOfDays: 33,
			intercalary: !1,
			numericRepresentation: 3
		},
		{
			name: "Sigmarzeit",
			abbreviation: "Sig",
			numberOfDays: 33,
			intercalary: !1,
			numericRepresentation: 4
		},
		{
			name: "Sommerzeit",
			abbreviation: "Som",
			numberOfDays: 33,
			intercalary: !1,
			numericRepresentation: 5
		},
		{
			name: "Sonnstill",
			abbreviation: "Son",
			numberOfDays: 1,
			intercalary: !0,
			numericRepresentation: -3
		},
		{
			name: "Vorgeheim",
			abbreviation: "Vor",
			numberOfDays: 33,
			intercalary: !1,
			numericRepresentation: 6
		},
		{
			name: "Geheimnistag",
			abbreviation: "Geh",
			numberOfDays: 1,
			intercalary: !0,
			numericRepresentation: -4
		},
		{
			name: "Nachgeheim",
			abbreviation: "Nac",
			numberOfDays: 32,
			intercalary: !1,
			numericRepresentation: 7
		},
		{
			name: "Erntezeit",
			abbreviation: "Ern",
			numberOfDays: 33,
			intercalary: !1,
			numericRepresentation: 8
		},
		{
			name: "Mittherbst",
			abbreviation: "Mit",
			numberOfDays: 1,
			intercalary: !0,
			numericRepresentation: -5
		},
		{
			name: "Brauzeit",
			abbreviation: "Bra",
			numberOfDays: 33,
			intercalary: !1,
			numericRepresentation: 9
		},
		{
			name: "Kaldezeit",
			abbreviation: "Kal",
			numberOfDays: 33,
			intercalary: !1,
			numericRepresentation: 10
		},
		{
			name: "Ulriczeit",
			abbreviation: "Ulr",
			numberOfDays: 33,
			intercalary: !1,
			numericRepresentation: 11
		},
		{
			name: "Mondstille",
			abbreviation: "Mon",
			numberOfDays: 1,
			intercalary: !0,
			numericRepresentation: -6
		},
		{
			name: "Vorhexen",
			abbreviation: "Vor",
			numberOfDays: 33,
			intercalary: !1,
			numericRepresentation: 12
		}
	],
	weekdays: [
		{
			name: "Wellentag",
			abbreviation: "We"
		},
		{
			name: "Aubentag",
			abbreviation: "Au"
		},
		{
			name: "Marktag",
			abbreviation: "Ma"
		},
		{
			name: "Backertag",
			abbreviation: "Ba"
		},
		{
			name: "Bezahltag",
			abbreviation: "Be"
		},
		{
			name: "Konistag",
			abbreviation: "Ko"
		},
		{
			name: "Angestag",
			abbreviation: "An"
		},
		{
			name: "Festag",
			abbreviation: "Fe"
		}
	]
}, ge = "wfrp4e-compatibility-box-imperial", _ = he.months, _e = he.weekdays, ve = 86400, ye = (e, t) => (e % t + t) % t;
function v(e) {
	if (!Number.isFinite(e) || Math.abs(e) > 2 ** 53 - 1) throw Error("Calendar timestamp is outside the supported range.");
	e = Math.floor(e);
	let t = Math.floor(e / ve), n = Math.floor(t / 400), r = n + 1, i = ye(t, 400), a = 0, o = n * 394;
	for (; i >= _[a].numberOfDays;) {
		let e = _[a++];
		i -= e.numberOfDays, e.intercalary || (o += e.numberOfDays);
	}
	let s = ye(e, ve);
	return {
		year: r,
		month: a,
		day: i,
		hour: Math.floor(s / 3600),
		minute: Math.floor(s / 60) % 60,
		second: s % 60,
		weekday: ye(o + i, 8)
	};
}
function y(e) {
	let t = _[e.month];
	if (!Object.values(e).every(Number.isSafeInteger) || !t || e.day < 0 || e.day >= t.numberOfDays || e.hour < 0 || e.hour >= 24 || e.minute < 0 || e.minute >= 60 || e.second < 0 || e.second >= 60) throw Error("Choose a valid Imperial calendar date and time.");
	let n = ((e.year - 1) * 400 + _.slice(0, e.month).reduce((e, t) => e + t.numberOfDays, 0) + e.day) * ve + e.hour * 3600 + e.minute * 60 + e.second;
	if (!Number.isSafeInteger(n)) throw Error("Calendar date is outside the supported range.");
	return n;
}
function be(e, t = !1) {
	let n = v(e), r = _[n.month], i = (e) => String(e).padStart(2, "0");
	return t ? `${n.year} ${r.name} ${i(n.day + 1)} ${i(n.hour)}:${i(n.minute)}:${i(n.second)}` : `${r.intercalary ? "" : `${_e[n.weekday].name}, `}${r.name} ${i(n.day + 1)}, ${n.year}`;
}
function xe() {
	return {
		id: ge,
		name: "WFRP Imperial Calendar",
		description: "Compatibility Box: 400 days, eight weekdays, six festivals outside the week; timestamp zero displays IC year 1.",
		years: {
			yearZero: 0,
			firstWeekday: 0
		},
		months: { values: _.map((e) => ({
			name: e.name,
			abbreviation: e.abbreviation,
			ordinal: Math.max(1, e.numericRepresentation),
			days: e.numberOfDays,
			intercalary: e.intercalary,
			startingWeekday: null
		})) },
		days: {
			values: _e.map((e, t) => ({
				...e,
				ordinal: t + 1
			})),
			daysPerYear: 400,
			hoursPerDay: 24,
			minutesPerHour: 60,
			secondsPerMinute: 60
		},
		seasons: { values: [
			{
				name: "Spring",
				dayStart: 17,
				dayEnd: 116
			},
			{
				name: "Summer",
				dayStart: 117,
				dayEnd: 216
			},
			{
				name: "Fall",
				dayStart: 217,
				dayEnd: 316
			},
			{
				name: "Winter",
				dayStart: 317,
				dayEnd: 16
			}
		] }
	};
}
//#endregion
//#region src/module/functions/calendars/content.ts
var b = "foundryvtt-simple-calendar-reborn", x = "simple-timekeeping", S = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]);
function Se(e) {
	let t = 2166136261, n = 5381;
	for (let r of e) t = Math.imul(t ^ r.charCodeAt(0), 16777619), n = Math.imul(n, 33) ^ r.charCodeAt(0);
	return (t >>> 0).toString(16).padStart(8, "0") + (n >>> 0).toString(16).padStart(8, "0");
}
function Ce(e) {
	return `<p><strong>Sources:</strong> ${e.map((e) => {
		let t = g.sources[e];
		if (!t) throw Error(`Unknown calendar source: ${e}`);
		return t.uuid ? `@UUID[${t.uuid}]{${t.title}}` : t.url ? `<a href="${S(t.url)}">${S(t.title)}</a>` : S(t.title);
	}).join("; ")}</p>`;
}
function we(e) {
	let t = _[e.month], n = `${t.intercalary ? "" : `${e.day} `}${t.name}`;
	return e.month === e.endMonth && e.day === e.endDay ? n : `${n} – ${e.endDay} ${_[e.endMonth].name}`;
}
function Te(e) {
	let t = e.date ? `${e.date.day} ${_[e.date.month].name} ` : "";
	return `${e.approximate ? "c. " : ""}${t}${e.year}${e.endYear === e.year ? "" : `–${e.endYear}`} IC (${e.precision})`;
}
function Ee(e, t, n, r, i) {
	return {
		_id: Se(`${e}:${t}`),
		name: n,
		folder: null,
		ownership: { default: i },
		flags: { [e]: { calendarContent: {
			id: t,
			version: 1
		} } },
		pages: [{
			_id: Se(`${e}:${t}:details`),
			name: n,
			type: "text",
			text: {
				format: 1,
				content: r
			},
			ownership: { default: -1 },
			flags: {}
		}]
	};
}
function De(e, t, n, r, i, a) {
	if (i) {
		let a = (e) => {
			let { year: t, month: n, day: r, hour: i, minute: a, second: o } = v(e);
			return {
				year: t,
				month: n,
				day: r,
				hour: i,
				minute: a,
				seconds: o
			};
		};
		e.flags[b] = { noteData: {
			calendarId: i,
			startDate: a(t),
			endDate: a(n),
			allDay: t % 86400 == 0 && (n + 1) % 86400 == 0,
			repeats: r ? 3 : 0,
			order: 0,
			categories: [],
			remindUsers: [],
			macro: "none",
			fromPredefined: !1
		} }, e.flags.core = { sheetClass: `${b}.NoteSheet` };
	}
	a && (e.pages[0].flags[x] = {
		allDay: t % 86400 == 0 && (n + 1) % 86400 == 0,
		notify: "none",
		eventTime: t,
		eventEnd: n,
		repeat: r ? "year" : ""
	});
}
function Oe(e, t, n, r) {
	let i = [];
	if (t.holidays !== !1) for (let t of g.holidays) {
		let a = y({
			year: r,
			month: t.month,
			day: t.day - 1,
			hour: 0,
			minute: 0,
			second: 0
		}), o = y({
			year: r,
			month: t.endMonth,
			day: t.endDay - 1,
			hour: 23,
			minute: 59,
			second: 59
		}), s = Ee(e, t.id, t.name, `<p><strong>${S(we(t))}</strong> · ${S(t.region)} · Annual observance</p><p>${S(t.summary)}</p>${Ce(t.sources)}`, 2);
		De(s, a, o, !0, n.calendarId, n.timekeeping), i.push(s);
	}
	if (t.history !== !1) {
		let t = Ee(e, "ubersreik-history", "Ubersreik — Historical Almanac", `<p>GM reference. Published years and ranges are retained. Exact-date entries identify their date basis: published scenario dates use an assumed campaign year, and the deposition uses the explicitly approved provisional date of 5 Nachexen 2512 IC.</p><table><thead><tr><th>Date and precision</th><th>Event</th></tr></thead><tbody>${g.history.map((e) => `<tr><td>${S(Te(e))}</td><td><strong>${S(e.title)}</strong><p>${S(e.summary)}</p>${e.date ? `<p><strong>Date basis:</strong> ${S(e.date.basis)}</p>` : ""}${Ce(e.sources)}</td></tr>`).join("")}</tbody></table><h2>Dating notes and movable festivals</h2>${g.researchNotes.map((e) => `<h3>${S(e.title)}</h3><p>${S(e.text)}</p>${Ce(e.sources)}`).join("")}`, 0);
		i.push(t);
		for (let t of g.history) {
			if (!t.date) continue;
			let r = y({
				year: t.year,
				month: t.date.month,
				day: t.date.day - 1,
				hour: 0,
				minute: 0,
				second: 0
			}), a = Ee(e, `history-${t.id}`, t.title, `<p><strong>${S(Te(t))}</strong></p><p>${S(t.summary)}</p><p><strong>Date basis:</strong> ${S(t.date.basis)}</p>${Ce(t.sources)}`, 0);
			De(a, r, r + 86400 - 1, !1, n.calendarId, n.timekeeping), i.push(a);
		}
	}
	return i;
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/event-refresh.ts
var ke = !1;
function Ae(e) {
	!e.flags["foundryvtt-simple-calendar-reborn"]?.noteData || ke || (ke = !0, queueMicrotask(() => {
		ke = !1;
		let e = ui?.windows;
		for (let t of Object.values(e ?? {})) t.id === "fsc-if" && t.render(!1);
	}));
}
//#endregion
//#region src/module/functions/calendars/recurrence.ts
var je = (e, t, n) => y({
	year: e,
	month: t,
	day: n,
	hour: 0,
	minute: 0,
	second: 0
});
function Me(e, t, n, r) {
	let i = e.isVisible, a = e.getDisplayDate;
	e.isVisible = function(e, n, r, a) {
		let o = t(this.entryId, e);
		if (!o) return i.call(this, e, n, r, a);
		if (!this.canUserView()) return !1;
		let s = je(n, r, a);
		return o.occurrences(s, s + 86400).length > 0;
	}, e.getDisplayDate = function(e) {
		let i = t(this.entryId);
		if (!i || !this.canUserView()) return a.call(this, e);
		let o = n(), s = i.occurrences(o, o + 86400)[0];
		if (!s) return a.call(this, e);
		let c = i.allDay ? s.end - 1 : s.end, l = r(s.start, i.allDay), u = r(c, i.allDay);
		return l === u ? l : `${l} – ${u}`;
	};
}
//#endregion
//#region src/module/foundry/settings/is-optional-feature-enabled.ts
function C(e) {
	if (!l(e)) return !1;
	if (e === "bossBar") return game?.system.id === "wfrp4e" && f.some((e) => game?.settings.get("wfrp4e-compatibility-box", d[e]) === !0);
	let t = c[e].settingKey;
	return t !== null && game?.settings.get("wfrp4e-compatibility-box", t) !== !1;
}
//#endregion
//#region src/module/functions/settings-presets/values.ts
function Ne(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function w(e, t) {
	if (Array.isArray(e) && Array.isArray(t)) return e.length === t.length && e.every((e, n) => w(e, t[n]));
	if (Ne(e) && Ne(t)) {
		let n = Object.keys(e);
		return n.length === Object.keys(t).length && n.every((n) => Object.hasOwn(t, n) && w(e[n], t[n]));
	}
	return e === t;
}
function T(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "boolean" || typeof e == "string" || typeof e == "number" && Number.isFinite(e)) return e;
	if (typeof e != "object" || !e) throw Error("Value cannot be represented completely in JSON");
	if (t.has(e)) throw Error("Value contains a circular reference");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return Array.from(e, (e) => T(e, n));
	let r = Object.getPrototypeOf(e);
	if (r !== Object.prototype && r !== null) throw Error("Value is not a plain JSON object");
	if (Object.getOwnPropertySymbols(e).length) throw Error("Value contains properties JSON cannot preserve");
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, T(t, n)]));
}
//#endregion
//#region src/module/foundry/integrations/simple-timekeeping/calendar.ts
function Pe(e, t) {
	let n = Object.getPrototypeOf(e.calendar), r = n.timeToComponents;
	n.timeToComponents = function(e = 0) {
		let n = r.call(this, e);
		return t() ? {
			...n,
			dayOfWeek: v(e).weekday
		} : n;
	}, e.initializeCalendar();
}
//#endregion
//#region src/module/functions/calendars/configuration.ts
function E(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Calendar configuration is unavailable or invalid.");
	return structuredClone(e);
}
function Fe(e, t) {
	let n = E(e), r = E(t), i = xe(), a = r[i.id], o = a ? E(a) : {}, s = {
		...o,
		...i
	}, c = o.months?.values;
	return Array.isArray(c) && (s.months.values = i.months.values.map((e) => ({
		...c.find((t) => t && typeof t == "object" && !Array.isArray(t) && t.name === e.name),
		...e
	}))), {
		configuration: {
			...n,
			calendar: i.id
		},
		customCalendars: {
			...r,
			[i.id]: s
		}
	};
}
function Ie(e, t, n, r) {
	if (!Array.isArray(e)) throw Error("Simple Calendar configuration is unavailable.");
	if (!e.some((e) => e?.id === t)) throw Error("Choose an active Simple Calendar before applying the Imperial preset.");
	return e.map((e) => {
		let i = E(e);
		if (i.id !== t) return i;
		let a = Array.isArray(i.months) ? i.months : [], o = (e, t) => e.find((e) => e && typeof e == "object" && !Array.isArray(e) && e.name === t) ?? {}, s = _.map((e, t) => {
			let n = o(a, e.name);
			return {
				...n,
				...e,
				id: n.id ?? `wfrp-month-${t}`,
				description: n.description ?? "",
				numericRepresentationOffset: 0,
				numberOfLeapYearDays: e.numberOfDays,
				intercalaryInclude: !1,
				startingWeekday: null
			};
		}), c = Array.isArray(i.weekdays) ? i.weekdays : [], l = _e.map((e, t) => {
			let n = o(c, e.name);
			return {
				...n,
				...e,
				id: n.id ?? `wfrp-weekday-${t}`,
				numericRepresentation: t + 1
			};
		}), u = {
			...E(i.year),
			yearZero: 1,
			firstWeekday: 0
		}, d = {
			...E(i.leapYear),
			rule: "none",
			customMod: 0,
			startingYear: 0
		}, f = {
			...E(i.time),
			hoursInDay: 24,
			minutesInHour: 60,
			secondsInMinute: 60,
			...r ? { gameTimeRatio: 0 } : {}
		}, p = {
			...E(i.general),
			gameWorldTimeIntegration: r ? "third-party" : "mixed"
		}, m = {
			...i,
			name: "WFRP Imperial Calendar",
			months: s,
			weekdays: l,
			year: u,
			leapYear: d,
			time: f,
			general: p
		};
		if (!w(m, i)) {
			let e = v(n);
			m.currentDate = {
				year: e.year,
				month: e.month,
				day: e.day,
				seconds: (n % 86400 + 86400) % 86400
			};
		}
		return m;
	});
}
//#endregion
//#region src/module/foundry/integrations/simple-timekeeping/preset.ts
var D = "simple-timekeeping", Le = {
	title: "Simple Timekeeping & Calendar — WFRP Imperial Calendar",
	enabled: () => game?.system.id === "wfrp4e" && C("simpleTimekeeping"),
	additionalSettings: () => {
		let e = Fe(game?.settings.get(D, "configuration"), game?.settings.get(D, "customCalendars"));
		return [{
			namespace: D,
			key: "customCalendars",
			value: e.customCalendars
		}, {
			namespace: D,
			key: "configuration",
			value: e.configuration
		}];
	}
};
//#endregion
//#region src/module/foundry/integrations/simple-timekeeping/register-integration.ts
function Re() {
	if (game?.system.id !== "wfrp4e" || !C("simpleTimekeeping")) return !1;
	let e = game.settings.get(D, "configuration"), t = game.settings.get(D, "customCalendars"), n = xe(), r = t?.[e.calendar ?? ""];
	return !r || e.calendar !== n.id ? !1 : w(r.years, n.years) && w(r.days, n.days) && r.months.values.length === n.months.values.length && n.months.values.every((e, t) => Object.entries(e).every(([e, n]) => w(r.months.values[t]?.[e], n)));
}
function ze() {
	!s("simple-timekeeping") || !C("simpleTimekeeping") || game?.system.id !== "wfrp4e" || Hooks.once("initSimpleTimekeeping", () => {
		Pe(game.time, Re);
	});
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/recurrence.ts
var Be = /* @__PURE__ */ new WeakSet(), Ve = /* @__PURE__ */ new WeakSet(), He, Ue = !1, We = () => [...game.journal];
function Ge() {
	if (!game?.ready || !C("simpleCalendar") || !Re()) return !1;
	let e = game.settings.get(b, "active-calendar");
	return game.settings.get(b, "calendar-configuration")?.find((t) => t.id === e)?.year.yearZero === 1;
}
function Ke(t, n) {
	if (!Ge()) return;
	let r = We().find((e) => e.id === t), i = r?.flags[b]?.noteData, a = r?.flags[e]?.calendarSync;
	if (!a || !i || n && n !== i.calendarId || i.calendarId !== game.settings.get("foundryvtt-simple-calendar-reborn", "active-calendar")) return;
	let o = We().find((e) => e.id === a.journal)?.pages?.contents.find((e) => e.id === a.page), s = ui?.simpleTimekeeping;
	if (!(!o || !Number.isFinite(o.flags["simple-timekeeping"]?.eventTime) || !s?.getEventOccurrences)) return {
		allDay: !!o.flags[x]?.allDay,
		occurrences: (e, t) => s.getEventOccurrences(o, e, t)
	};
}
function qe() {
	let e = He.visibleCalendar, t = e.getMonthAndDayIndex("selected"), n = t.month === void 0 ? e.getMonthAndDayIndex() : t;
	return je(t.month === void 0 ? e.year.numericRepresentation : e.year.selectedYear, n.month ?? 0, n.day ?? 0);
}
function Je() {
	if (Ue || !Ge()) return;
	let e = game.settings.menus?.get(`${b}.calendar-main-app`)?.type;
	if (!e) return;
	He ??= new e();
	let t = He.visibleCalendar;
	for (let e of We()) {
		let n = e.flags[b]?.noteData;
		if (!n || n.calendarId !== t.id) continue;
		let r = t.clone();
		r.year.selectedYear = n.startDate.year, r.getMonthAndDayIndex = () => ({
			month: n.startDate.month,
			day: n.startDate.day
		});
		let i = r.toTemplate().selectedDay.notes[0];
		if (!i) continue;
		let a = Object.getPrototypeOf(i);
		if (Be.has(a)) return;
		Be.add(a), Ue = !0;
		let o = globalThis.SimpleCalendar.api;
		Me(a, Ke, qe, (e, t) => o.formatTimestamp(e, t ? "MMMM DD, YYYY" : "MMMM DD, YYYY HH:mm:ss"));
		let s = e.sheet;
		s?.updateNoteRepeatDropdown && Xe(s), He.render(!1);
		return;
	}
}
function Ye(e) {
	let t = Ke(e.object.id), n = e.journalData.flags[b]?.noteData.repeats;
	if (!t && n !== 4) return;
	let r = e.appWindow?.querySelector(`#scNoteRepeats_${e.object.id}`);
	r && ((t ? [
		"Never",
		"Weekly",
		"Monthly",
		"Yearly",
		"Daily"
	] : [
		"",
		"",
		"",
		"",
		"Daily"
	]).forEach((e, t) => {
		e && !r.querySelector(`option[value="${t}"]`) && r.add(new Option(e, String(t)));
	}), r.value = String(e.journalData.flags[b].noteData.repeats));
}
function Xe(e) {
	let t = Object.getPrototypeOf(e);
	if (!Ve.has(t)) {
		Ve.add(t);
		let n = t.getData, r = t.updateNoteRepeatDropdown;
		t.getData = async function() {
			let e = await n.call(this);
			return (Ke(this.object.id) || this.journalData.flags["foundryvtt-simple-calendar-reborn"]?.noteData.repeats === 4) && (e.edit.repeatOptions[4] = "Daily", this.journalData.flags["foundryvtt-simple-calendar-reborn"]?.noteData.repeats === 4 && (e.display.repeatsDisplay = "Daily")), e;
		}, t.updateNoteRepeatDropdown = function() {
			r.call(this), Ye(this);
		}, e.render(!1);
	}
	Ye(e);
}
function Ze() {
	Hooks.on("simple-calendar-ready", Je), Hooks.on("ready", Je), Hooks.on("renderMainApp", Je), Hooks.on("createJournalEntry", () => queueMicrotask(Je)), Hooks.on("updateJournalEntry", () => queueMicrotask(Je)), Hooks.on("updateJournalEntryPage", (t) => {
		let n = t;
		for (let t of We()) {
			let r = t.flags[e]?.calendarSync;
			r?.journal === n.parent?.id && r?.page === n.id && Ae(t);
		}
	}), Hooks.on("renderNoteSheet", (e) => Xe(e));
}
//#endregion
//#region src/module/functions/calendars/event-sync.ts
var Qe = [
	"",
	"week",
	"month",
	"year",
	"day"
], $e = (e) => y({
	...e,
	second: e.seconds
}), et = (e) => {
	let { year: t, month: n, day: r, hour: i, minute: a, second: o } = v(e);
	return {
		year: t,
		month: n,
		day: r,
		hour: i,
		minute: a,
		seconds: o
	};
};
function tt(e) {
	let t = Qe[e.repeats];
	if (t === void 0) throw Error("Unsupported Simple Calendar recurrence");
	let n = $e(e.startDate), r = $e(e.endDate);
	if (e.allDay && (n = Math.floor(n / 86400) * 86400, r = Math.floor(r / 86400) * 86400 + 86399), !Number.isFinite(n) || !Number.isFinite(r) || r < n) throw Error("Invalid calendar event dates");
	return {
		eventTime: n,
		eventEnd: r,
		allDay: e.allDay,
		repeat: t
	};
}
function nt(e, t) {
	let n = Qe.indexOf(e.repeat ?? "");
	if (n < 0) throw Error(`Simple Calendar cannot represent ${e.repeat} recurrence`);
	let r = e.eventTime, i = e.eventEnd || r;
	if (e.allDay && (r = Math.floor(r / 86400) * 86400, i = Math.floor(Math.max(i, r) / 86400) * 86400 + 86399), !Number.isFinite(r) || !Number.isFinite(i) || i < r) throw Error("Invalid calendar event dates");
	return {
		calendarId: t,
		startDate: et(r),
		endDate: et(i),
		allDay: !!e.allDay,
		repeats: n
	};
}
function rt(e, t) {
	return Object.fromEntries([...new Set([
		"default",
		...Object.keys(e),
		...Object.keys(t)
	])].map((n) => {
		let r = t[n] ?? t.default ?? -1;
		return [n, r < 0 ? e[n] ?? e.default ?? 0 : r];
	}));
}
//#endregion
//#region src/module/functions/calendars/migration.ts
function it(e) {
	return `${e.day + 1} ${e.monthName} ${e.year}, ${String(e.hour).padStart(2, "0")}:${String(e.minute).padStart(2, "0")}:${String(e.seconds).padStart(2, "0")}`;
}
function at(e) {
	let t = _.findIndex((t) => t.name.toLocaleLowerCase() === e.monthName.trim().toLocaleLowerCase());
	if (t < 0) throw Error(`No Imperial month matches “${e.monthName}”. Choose elapsed time or adjust the source calendar.`);
	return y({
		year: e.year,
		month: t,
		day: e.day,
		hour: e.hour,
		minute: e.minute,
		second: e.seconds
	});
}
var ot = (e) => `${e.journal}/${e.page ?? ""}`;
function st(e, t) {
	let n = {
		snapshot: e,
		choices: t,
		time: e.time,
		settings: [],
		writes: [],
		changes: [],
		errors: []
	};
	if (![
		"elapsed",
		"scr",
		"st"
	].includes(t.clock) || !["dates", "elapsed"].includes(t.events) || !["scr", "st"].includes(t.authority)) throw Error("Invalid calendar migration choice.");
	let r = (t, n) => e.settings.find((e) => e.namespace === t && e.key === n)?.value;
	try {
		if (t.clock !== "elapsed") {
			let r = e.sources.find((e) => e.id === t.clock);
			if (!r) throw Error("The chosen calendar is unavailable.");
			n.time = at(r.current);
		}
		if (e.sources.some((e) => e.id === "st")) {
			let e = E(r(x, "configuration")), t = E(r(x, "customCalendars")), i = t[String(e.calendar)];
			i && (t[ge] = i);
			let a = Fe(e, t);
			n.settings.push({
				namespace: x,
				key: "customCalendars",
				value: a.customCalendars
			}, {
				namespace: x,
				key: "configuration",
				value: a.configuration
			});
		}
		if (e.activeId) {
			let t = Ie(r(b, "calendar-configuration"), e.activeId, n.time, e.sources.some((e) => e.id === "st")), i = nt({ eventTime: n.time }, e.activeId).startDate;
			for (let n of t) n && typeof n == "object" && !Array.isArray(n) && n.id === e.activeId && (n.currentDate = {
				year: i.year,
				month: i.month,
				day: i.day,
				seconds: i.hour * 3600 + i.minute * 60 + i.seconds
			});
			n.settings.push({
				namespace: b,
				key: "calendar-configuration",
				value: t
			});
		}
	} catch (e) {
		n.errors.push(String(e instanceof Error ? e.message : e));
	}
	let i = /* @__PURE__ */ new Map();
	for (let r of e.events) try {
		if (r.note && ![
			0,
			1,
			2,
			3,
			4
		].includes(r.note.repeats)) throw Error("Unsupported Simple Calendar recurrence.");
		let [e, n] = t.events === "elapsed" ? r.times : r.dates.map(at);
		if (!Number.isSafeInteger(e) || !Number.isSafeInteger(n) || n < e) throw Error("Invalid event date range.");
		i.set(ot(r), {
			start: e,
			end: n,
			source: r
		});
	} catch (e) {
		n.errors.push(`${r.name}: ${e instanceof Error ? e.message : e}`);
	}
	for (let r of e.events) {
		let e = i.get(ot(r)), a = r.linked ? i.get(r.linked) : void 0, o = a && (t.authority === "st" && a.source.event || t.authority === "scr" && a.source.note) ? a : e;
		if (!o) continue;
		let s = o.source.event ?? (o.source.note ? {
			repeat: [
				"",
				"week",
				"month",
				"year",
				"day"
			][o.source.note.repeats],
			allDay: o.source.note.allDay
		} : {});
		try {
			let e = {
				eventTime: o.start,
				eventEnd: o.end,
				repeat: s.repeat ?? "",
				allDay: !!s.allDay
			}, t = r.note ? {
				...r.note,
				...nt(e, r.note.calendarId)
			} : {
				...r.event,
				...e
			};
			n.writes.push({
				journal: r.journal,
				...r.page ? { page: r.page } : {},
				key: r.note ? `flags.${b}.noteData` : `flags.${x}`,
				before: r.note ?? r.event,
				after: t
			}), n.changes.push({
				name: r.name,
				before: `${it(r.dates[0])} → ${it(r.dates[1])}`,
				after: `${be(o.start, !0)} → ${be(o.end, !0)}`
			});
		} catch (e) {
			n.errors.push(`${r.name}: ${e instanceof Error ? e.message : e}`);
		}
	}
	return n;
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/migration/snapshot.ts
var ct = () => [...game.journal];
function lt() {
	if (!game?.ready || !game.user?.isGM || game.system.id !== "wfrp4e") throw Error("A ready WFRP GM session is required.");
}
function ut() {
	lt();
	let t = {
		time: game.time.worldTime,
		journalIds: ct().map((e) => e.id),
		settings: [],
		sources: [],
		events: []
	}, n = (e, n) => {
		let r = JSON.parse(JSON.stringify(game.settings.get(e, n)));
		return t.settings.push({
			namespace: e,
			key: n,
			value: r
		}), r;
	}, r = ct();
	if (C("simpleCalendar")) {
		let i = globalThis.SimpleCalendar?.api;
		if (!i) throw Error("Simple Calendar is not ready. Reload before migrating.");
		let a = n(b, "calendar-configuration"), o = a.length ? a : JSON.parse(JSON.stringify(i.getAllCalendars()));
		t.settings[0].value = o;
		let s = String(n(b, "active-calendar")), c = o.find((e) => e.id === s);
		if (!c) throw Error("Select a Simple Calendar before migrating.");
		t.activeId = s;
		let l = (e) => ({
			...e,
			monthName: c.months[e.month]?.name ?? "Unknown month"
		});
		t.sources.push({
			id: "scr",
			name: c.name,
			epoch: c.year.yearZero,
			months: c.months.map((e) => ({
				name: e.name,
				days: e.numberOfDays
			})),
			current: l(i.currentDateTime(s))
		});
		for (let n of r) {
			let r = n.flags[b]?.noteData;
			if (!r || r.calendarId !== s) continue;
			let a = n.flags[e]?.calendarSync, o = {
				...r.startDate,
				...r.allDay ? {
					hour: 0,
					minute: 0,
					seconds: 0
				} : {}
			}, c = {
				...r.endDate,
				...r.allDay ? {
					hour: 23,
					minute: 59,
					seconds: 59
				} : {}
			};
			t.events.push({
				journal: n.id,
				name: `${n.name} (SCR)`,
				note: structuredClone(r),
				dates: [l(o), l(c)],
				times: [i.dateToTimestamp(o, s), i.dateToTimestamp(c, s)],
				...a ? { linked: `${a.journal}/${a.page}` } : {}
			});
		}
	}
	if (C("simpleTimekeeping")) {
		n(x, "configuration"), n(x, "customCalendars");
		let e = game.time.calendar, i = (t) => {
			let n = e.timeToComponents(t);
			return {
				year: n.year + 1,
				month: n.month,
				monthName: e.months.values[n.month]?.name ?? "Unknown month",
				day: n.dayOfMonth,
				hour: n.hour,
				minute: n.minute,
				seconds: n.second
			};
		};
		t.sources.push({
			id: "st",
			name: "Simple Timekeeping & Calendar",
			epoch: e.years.yearZero,
			months: e.months.values.map((e) => ({
				name: e.name,
				days: e.days
			})),
			current: i(t.time)
		});
		for (let e of r) for (let n of e.pages?.contents ?? []) {
			let r = n.flags[x];
			if (r?.eventTime === void 0) continue;
			let a = t.events.find((t) => t.linked === `${e.id}/${n.id}`), o = !a && e.pages?.contents.filter((e) => e.flags["simple-timekeeping"]?.eventTime !== void 0).length === 1 ? t.events.find((t) => t.journal === e.id && !t.linked) : void 0, s = a ?? o;
			s && (s.linked = `${e.id}/${n.id}`);
			let c = r.eventEnd ?? r.eventTime;
			t.events.push({
				journal: e.id,
				page: n.id,
				name: `${n.name} (ST&C)`,
				event: structuredClone(r),
				dates: [i(r.eventTime), i(c)],
				times: [r.eventTime, c],
				...s ? { linked: `${s.journal}/` } : {}
			});
		}
	}
	if (!t.sources.length) throw Error("Enable a supported calendar compatibility feature first.");
	return t;
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/migration/state.ts
var dt = "calendarMigrationRecovery";
function O() {
	return game?.settings.settings?.has("wfrp4e-compatibility-box.calendarMigrationRecovery") ? game.settings.get(e, dt) : null;
}
function ft() {
	let t = O();
	if (!t) return null;
	let n = [...game.journal].find((e) => e.id === t.journal)?.flags[e]?.calendarMigrationPlan;
	if (!n) throw Error("The GM recovery journal is unavailable. Restore access to that journal before continuing.");
	return {
		status: t.status,
		created: t.created,
		plan: n
	};
}
function pt() {
	let e = O()?.status;
	return e === "applying" || e === "failed";
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/content.ts
function mt(e) {
	if (!game?.ready || !game.user?.isGM || game.system.id !== "wfrp4e") throw Error("A ready WFRP GM session is required to import calendar content.");
	let t = C("simpleCalendar"), n = C("simpleTimekeeping");
	if (!t && !n) throw Error("Enable a supported calendar compatibility feature first.");
	if (e.holidays === !1 && e.history === !1) return { timekeeping: !1 };
	let r;
	if (t) {
		r = String(game.settings.get(b, "active-calendar"));
		let e = game.settings.get(b, "calendar-configuration")?.find((e) => e.id === r);
		if (!e || e.year?.yearZero !== 1 || e.year.firstWeekday !== 0 || e.leapYear?.rule !== "none" || e.time?.hoursInDay !== 24 || e.time.minutesInHour !== 60 || e.time.secondsInMinute !== 60 || e.months?.length !== _.length || e.weekdays?.length !== _e.length || !_.every((t, n) => e.months[n]?.name === t.name && e.months[n]?.numberOfDays === t.numberOfDays && e.months[n]?.intercalary === t.intercalary && e.months[n]?.intercalaryInclude === !1 && e.months[n]?.startingWeekday === null) || !_e.every((t, n) => e.weekdays[n]?.name === t.name)) throw Error("Apply the Simple Calendar WFRP Imperial preset before importing dated content.");
	}
	if (n && (!Re() || game.time.calendar.componentsToTime({
		year: 1,
		day: 0,
		hour: 0,
		minute: 0,
		second: 0
	}) !== 400 * 86400)) throw Error("Apply the ST&C WFRP Imperial preset and reload before importing dated content.");
	return {
		...r ? { calendarId: r } : {},
		timekeeping: n
	};
}
function ht(t) {
	return t.flags[e]?.calendarContent?.id;
}
function gt(e) {
	return [...game.journal].find((t) => ht(t) === ht(e));
}
function _t(e) {
	return [...game.journal].find((t) => t.id === e._id || t.name.toLocaleLowerCase() === e.name.toLocaleLowerCase());
}
function vt(t = {}) {
	let n = mt(t), r = Oe(e, t, n, v(game.time.worldTime).year);
	return {
		targets: n,
		drafts: r,
		entries: r.map((e) => ({
			name: e.name,
			status: gt(e) ? "Keep existing content; connect missing calendar support" : _t(e) ? "Skip: matching name or document ID already exists" : "Create"
		}))
	};
}
var yt = !1;
async function bt(e = {}, t) {
	if (yt) throw Error("A calendar content import is already running.");
	let n = vt(e);
	if (t && (t.calendarId !== n.targets.calendarId || t.timekeeping !== n.targets.timekeeping)) throw Error("Calendar availability changed after review. Review the content again.");
	yt = !0;
	let r = {
		created: [],
		connected: [],
		skipped: []
	};
	try {
		let t, i = async () => {
			if (t) return t;
			let e = n.targets.calendarId ? [...game.folders].find((e) => e.type === "JournalEntry" && e.flags?.["foundryvtt-simple-calendar-reborn"]?.root) : void 0;
			if (n.targets.calendarId && !e) throw Error("Simple Calendar's notes folder is not ready. Reload and try again.");
			let r = [...game.folders].find((t) => t.type === "JournalEntry" && t.flags?.["wfrp4e-compatibility-box"]?.calendarContentFolder && (t.folder?.id ?? null) === (e?.id ?? null)) ?? await CONFIG.Folder.documentClass.create({
				name: "WFRP Calendar",
				type: "JournalEntry",
				folder: e?.id ?? null,
				flags: { "wfrp4e-compatibility-box": { calendarContentFolder: !0 } }
			});
			if (!r) throw Error("Could not create the WFRP Calendar folder.");
			return t = r.id, t;
		};
		for (let t of n.drafts) {
			let a = mt(e);
			if (a.calendarId !== n.targets.calendarId || a.timekeeping !== n.targets.timekeeping) throw Error("Calendar availability changed during import. Review the remaining content again.");
			let o = gt(t);
			if (o) {
				let e = {}, a = o.pages.contents.find((e) => e.id === t.pages[0]._id), s = o.flags[b]?.noteData, c = a?.flags[x];
				if (s && s.calendarId !== n.targets.calendarId && n.targets.calendarId) {
					r.skipped.push(`${t.name}: already connected to another Simple Calendar`);
					continue;
				}
				try {
					if (s && n.targets.timekeeping && c?.eventTime === void 0) {
						if (![0, 3].includes(s.repeats)) throw Error("unsupported repetition");
						let e = (e, t = !1) => y({
							year: e.year,
							month: e.month,
							day: e.day,
							hour: s.allDay ? t ? 23 : 0 : e.hour,
							minute: s.allDay ? t ? 59 : 0 : e.minute,
							second: s.allDay ? t ? 59 : 0 : e.seconds
						});
						De(t, e(s.startDate), e(s.endDate, !0), s.repeats === 3, void 0, !0);
					} else if (!s && t.flags["foundryvtt-simple-calendar-reborn"] && c?.eventTime !== void 0) {
						if (!["", "year"].includes(String(c.repeat ?? ""))) throw Error("unsupported repetition");
						let e = Number(c.eventTime);
						De(t, e, Number(c.eventEnd ?? e), c.repeat === "year", n.targets.calendarId, !1);
					}
				} catch {
					r.skipped.push(`${t.name}: existing date or repetition cannot be connected safely`);
					continue;
				}
				let l = t.flags[b], u = t.pages[0].flags[x];
				l && !s && (e[`flags.${b}.noteData`] = l.noteData, e["flags.core.sheetClass"] = `${b}.NoteSheet`, e.folder = await i()), Object.keys(e).length && await o.update(e);
				let d = !!u && !!a && a.flags["simple-timekeeping"]?.eventTime === void 0;
				d && await o.updateEmbeddedDocuments("JournalEntryPage", [{
					_id: a.id,
					[`flags.${x}`]: u
				}]), Object.keys(e).length || d ? r.connected.push(t.name) : r.skipped.push(`${t.name}: existing content preserved`);
				continue;
			}
			if (_t(t)) {
				r.skipped.push(`${t.name}: matching name or document ID exists`);
				continue;
			}
			if (t.folder = await i(), !await CONFIG.JournalEntry.documentClass.create(t, {
				keepId: !0,
				keepEmbeddedIds: !0
			})) throw Error(`Could not create ${t.name}. Earlier successful imports are retained; retry safely.`);
			r.created.push(t.name);
		}
		return r;
	} finally {
		yt = !1;
	}
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/event-sync.ts
var k = () => ({ calendarSync: !0 }), A = (t) => t.flags[e]?.calendarSync, j = (e) => e.flags[b]?.noteData, M = (e) => e.flags[x], xt = () => [...game.journal], St = (e) => xt().find((t) => t.id === e.journal)?.pages?.contents.find((t) => t.id === e.page), Ct = (e) => xt().find((t) => {
	let n = A(t);
	return n?.journal === e.parent?.id && n?.page === e.id;
});
function wt() {
	if (!(!game?.ready || pt() || !game.user?.isActiveGM || !C("simpleCalendar") || !Re())) try {
		return mt({}).calendarId;
	} catch {
		return;
	}
}
async function Tt(e, t) {
	let n = e, r = Object.fromEntries(Object.entries(t).filter(([e, t]) => !w(e.split(".").reduce((e, t) => e?.[t], n), t)));
	if (t.ownership) for (let n of Object.keys(e.ownership)) Object.hasOwn(t.ownership, n) || (r[`ownership.-=${n}`] = null);
	Object.keys(r).length && await e.update(r, k());
}
function Et(e, t, n) {
	return {
		journal: t.parent?.id ?? e.id,
		page: t.id,
		mirror: n
	};
}
function Dt() {
	let e = [...game.folders].find((e) => e.type === "JournalEntry" && e.flags?.["foundryvtt-simple-calendar-reborn"]?.root);
	if (!e) throw Error("Simple Calendar notes folder is not ready");
	return e.id;
}
async function Ot(t, n) {
	let r = M(t), i = Ct(t);
	if (!Number.isFinite(r?.eventTime)) {
		i && A(i)?.mirror ? await i.delete(k()) : i && await i.update({
			[`flags.${b}.-=noteData`]: null,
			[`flags.${e}.-=calendarSync`]: null
		}, k());
		return;
	}
	let a = nt(r, n);
	if (i) {
		if (j(i)?.calendarId !== n) return;
		let e = {
			name: t.name,
			ownership: rt(t.parent.ownership, t.ownership),
			[`flags.${b}.noteData`]: {
				...j(i),
				...a
			}
		};
		if (A(i)?.mirror) {
			let e = i.pages?.contents[0];
			e && t.text && await Tt(e, {
				name: t.name,
				text: t.text
			});
		}
		await Tt(i, e);
		return;
	}
	let o = t.parent;
	if (j(o)?.calendarId === n && !A(o) && o.pages?.contents.filter((e) => Number.isFinite(M(e)?.eventTime)).length === 1) {
		await Tt(o, {
			[`flags.${e}.calendarSync`]: Et(o, t, !1),
			[`flags.${b}.noteData`]: {
				...j(o),
				...a
			}
		});
		return;
	}
	await CONFIG.JournalEntry.documentClass.create({
		_id: Se(`${e}:event:${o.id}:${t.id}`),
		name: t.name,
		folder: Dt(),
		ownership: {
			default: 0,
			...rt(o.ownership, t.ownership)
		},
		flags: {
			[e]: { calendarSync: Et(o, t, !0) },
			[b]: { noteData: {
				order: 0,
				categories: [],
				remindUsers: [],
				macro: "none",
				fromPredefined: !1,
				...a
			} },
			core: { sheetClass: `${b}.NoteSheet` }
		},
		pages: [{
			name: t.name,
			type: "text",
			text: {
				content: "",
				format: 1,
				...t.text
			},
			ownership: { default: -1 },
			flags: {}
		}]
	}, {
		...k(),
		keepId: !0
	});
}
async function kt(t, n) {
	let r = j(t);
	if (!r || r.calendarId !== n) return;
	let i = tt(r), a = A(t), o = a ? St(a) : t.pages?.contents.find((e) => e.type === "text" && !Number.isFinite(M(e)?.eventTime));
	if (a && !o) return;
	if (o || ([o] = await t.createEmbeddedDocuments("JournalEntryPage", [{
		name: t.name,
		type: "text",
		text: {
			content: "",
			format: 1
		}
	}], k())), !o) throw Error("Could not create calendar event page");
	let s = {
		name: t.name,
		ownership: t.ownership,
		[`flags.${x}`]: {
			notify: "none",
			...M(o),
			...i
		}
	};
	if (a?.mirror) {
		let e = t.pages?.contents[0];
		e?.text && (s.text = e.text);
	}
	await Tt(o, s), a || await Tt(t, { [`flags.${e}.calendarSync`]: Et(t, o, !1) });
}
var At = Promise.resolve(), jt = /* @__PURE__ */ new Set();
function N(t) {
	At = At.then(async () => {
		let e = wt();
		e && await t(e);
	}).catch((t) => {
		console.error(`${e} | Calendar event synchronization`, t);
		let n = t instanceof Error ? t.message : String(t);
		jt.has(n) || (jt.add(n), ui?.notifications?.warn(`Calendar event synchronization: ${n}. The event could not be fully synchronized.`));
	});
}
function Mt() {
	N(async (e) => {
		let t = xt();
		for (let n of t) if (!A(n)?.mirror) {
			for (let t of n.pages?.contents ?? []) if (Number.isFinite(M(t)?.eventTime)) try {
				await Ot(t, e);
			} catch (e) {
				N(async () => {
					throw e;
				});
			}
			if (j(n) && !A(n) && !n.pages?.contents.some((e) => Number.isFinite(M(e)?.eventTime))) try {
				await kt(n, e);
			} catch (e) {
				N(async () => {
					throw e;
				});
			}
		}
	});
}
function Nt() {
	let t = (e, t) => Hooks.on(e, t);
	t("ready", Mt), t("simple-calendar-ready", Mt), t("updateUser", Mt), t("updateSetting", (e) => {
		let t = e.key ?? "";
		[
			"foundryvtt-simple-calendar-reborn",
			"simple-timekeeping",
			"wfrp4e-compatibility-box"
		].some((e) => t.startsWith(e + ".")) && Mt();
	});
	for (let e of ["create", "update"]) t(`${e}JournalEntry`, (...t) => {
		let n = t[0];
		Ae(n), !t[e === "create" ? 1 : 2]?.calendarSync && N(async (t) => {
			let r = n.pages?.contents.filter((e) => Number.isFinite(M(e)?.eventTime)) ?? [];
			if (e === "create" && r.length) for (let e of r) await Ot(e, t);
			else if (j(n)) await kt(n, t);
			else for (let e of n.pages?.contents ?? []) await Ot(e, t);
		});
	}), t(`${e}JournalEntryPage`, (...t) => {
		let n = t[0];
		t[e === "create" ? 1 : 2]?.calendarSync || N(async (e) => {
			A(n.parent)?.mirror ? await kt(n.parent, e) : await Ot(n, e);
		});
	});
	t("deleteJournalEntryPage", (t, n) => {
		if (n?.calendarSync) return;
		let r = t;
		N(async () => {
			let t = Ct(r);
			t && A(t)?.mirror ? await t.delete(k()) : t && await t.update({
				[`flags.${b}.-=noteData`]: null,
				[`flags.${e}.-=calendarSync`]: null
			}, k());
		});
	}), t("deleteJournalEntry", (e, t) => {
		if (Ae(e), t?.calendarSync) return;
		let n = e;
		N(async () => {
			let e = A(n);
			e?.mirror && await St(e)?.delete(k());
			for (let e of xt()) {
				let t = A(e);
				t?.mirror && t.journal === n.id && await e.delete(k());
			}
		});
	});
}
async function Pt() {
	let e;
	do
		e = At, await e;
	while (e !== At);
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/migration/restore.ts
async function Ft(t) {
	let n = new Set(t.snapshot.events.filter((e) => e.note).map((e) => e.journal)), r = new Set(t.snapshot.events.filter((e) => e.event).map((e) => `${e.journal}/${e.page}`));
	for (let i of ct()) {
		let a = i.flags[e]?.calendarSync;
		if (!a) continue;
		let o = `${a.journal}/${a.page}`;
		if (a.mirror && !t.snapshot.journalIds.includes(i.id) && r.has(o)) await i.delete({ calendarSync: !0 });
		else if (!a.mirror && n.has(i.id) && !r.has(o) && a.journal === i.id) {
			let t = i.pages?.contents.find((e) => e.id === a.page);
			t && await t.update({ [`flags.-=${x}`]: null }, { calendarSync: !0 }), await i.update({ [`flags.${e}.-=calendarSync`]: null }, { calendarSync: !0 });
		}
	}
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/migration/apply.ts
var P = !1;
async function F(t, n = O()?.journal) {
	if (!n) throw Error("The recovery journal is missing.");
	await game.settings.set(e, dt, {
		status: t.status,
		created: t.created,
		journal: n
	});
}
async function It(e, t) {
	for (let n of e.writes) {
		lt();
		let e = ct().find((e) => e.id === n.journal), r = n.page ? e?.pages?.contents.find((e) => e.id === n.page) : e;
		if (!r) throw Error(`Calendar document ${n.journal}/${n.page ?? ""} is missing.`);
		let i = t ? n.before : n.after, a = t ? n.after : n.before, o = { [n.key]: i };
		for (let e of Object.keys(a)) e in i || (o[`${n.key}.-=${e}`] = null);
		await r.update(o, { calendarSync: !0 });
	}
	for (let n of t ? e.snapshot.settings : e.settings) lt(), await game.settings.set(n.namespace, n.key, n.value);
	let n = t ? e.snapshot.time : e.time;
	n !== game.time.worldTime && await game.time.set(n, { calendarMigration: !0 });
}
async function Lt(t) {
	if (lt(), P || pt()) throw Error("A calendar migration needs recovery before another can begin.");
	if (t.errors.length) throw Error("Resolve the migration preview errors first.");
	let n = ut();
	if (!w(n, t.snapshot) || !w(st(n, t.choices), t)) throw Error("Calendar data or time changed during review. Preview again before applying.");
	P = !0;
	let r = O(), i = {
		status: "applying",
		created: (/* @__PURE__ */ new Date()).toISOString(),
		plan: t
	}, a, o = !1;
	try {
		let n = await CONFIG.JournalEntry.documentClass.create({
			name: `Calendar migration recovery — ${i.created}`,
			folder: null,
			ownership: { default: 0 },
			flags: { [e]: { calendarMigrationPlan: t } },
			pages: []
		}, { calendarSync: !0 });
		if (!n) throw Error("Could not create the GM recovery journal.");
		a = n.id, await F(i, a), await Pt();
		let r = ut();
		if (r.journalIds = r.journalIds.filter((e) => e !== a), !w(r, t.snapshot)) throw Error("Calendar data changed while pausing synchronization. Preview again.");
		if (O()?.journal !== a) throw Error("Another GM started a calendar migration. Reopen the migration menu.");
		o = !0, await It(t, !1), await F({
			...i,
			status: "complete"
		});
	} catch (t) {
		throw o ? (a && await F({
			...i,
			status: "failed"
		}, a), Error(`Migration stopped: ${t instanceof Error ? t.message : t}. Event synchronization is paused. Use Restore Previous Calendar in the migration menu, then reload.`, { cause: t })) : (a && O()?.journal === a && await game.settings.set(e, dt, r), t);
	} finally {
		P = !1;
	}
}
async function Rt() {
	lt();
	let e = ft();
	if (!e || e.status === "restored") throw Error("No migration is available to restore.");
	if (P) throw Error("A migration is already running.");
	P = !0;
	try {
		await F({
			...e,
			status: "applying"
		}), await Pt(), await It(e.plan, !0), await Ft(e.plan), await F({
			...e,
			status: "restored"
		});
	} catch (t) {
		throw await F({
			...e,
			status: "failed"
		}), t;
	} finally {
		P = !1;
	}
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/migration/menu.ts
async function zt() {
	if (!game?.user?.isGM) throw Error("GM permission is required to migrate calendars.");
	let e = ft();
	if (e && e.status !== "restored") {
		let t = await foundry.applications.api.DialogV2.wait({
			window: { title: "Previous Calendar Migration" },
			content: `<p>Last migration: ${n(e.created)} (${n(e.status)}).</p><p>Restore replaces the affected calendar settings, event dates and world time with the saved values. Later edits to those values will be overwritten. Other journal content is retained.</p>`,
			buttons: [
				{
					action: "restore",
					label: "Restore Previous Calendar"
				},
				{
					action: "download",
					label: "Download Recovery Snapshot"
				},
				...pt() ? [] : [{
					action: "next",
					label: "New Migration"
				}],
				{
					action: "close",
					label: "Close"
				}
			],
			rejectClose: !1
		});
		if (t === "download") {
			foundry.utils.saveDataToFile(JSON.stringify(e, null, 2), "application/json", "calendar-migration-recovery.json");
			return;
		}
		if (t === "restore") {
			await Rt(), ui?.notifications?.info("Previous calendar restored. Reload to refresh both calendars.");
			return;
		}
		if (t !== "next") return;
	}
	let t = ut(), r = t.sources.map((e) => {
		let t = e.months.length === _.length && e.months.every((e, t) => e.name === _[t]?.name && e.days === _[t]?.numberOfDays);
		return `<li><strong>${n(e.name)}</strong>: ${n(it(e.current))}; stored year zero ${n(String(e.epoch))}. ${t ? "Month names and lengths match." : "Month names, order or lengths differ."} ${e.id === "st" ? "ST&C displays internal year + 1." : "Target SCR year zero: 1."}</li>`;
	}).join(""), i = await foundry.applications.api.DialogV2.input({
		window: { title: "Migrate Existing WFRP Calendars" },
		position: { width: 760 },
		content: `<p>Move the active calendars to Compatibility Box’s Imperial calendar: 400 days, eight weekdays and six festival days outside the week. Timestamp zero displays IC year 1.</p><ul>${r}</ul>
    <div class="form-group"><label>Current world date</label><select name="clock"><option value="elapsed">Keep elapsed world time (dates may change)</option>${t.sources.map((e) => `<option value="${e.id}">Keep ${n(e.name)}’s displayed date</option>`).join("")}</select></div>
    <div class="form-group"><label>Existing events</label><select name="events"><option value="dates">Keep named dates (year, month name, day and time)</option><option value="elapsed">Keep elapsed timestamps (dates may change)</option></select></div>
    <div class="form-group"><label>Linked events use dates from</label><select name="authority"><option value="st">Simple Timekeeping &amp; Calendar</option><option value="scr">Simple Calendar Reborn</option></select></div>
    <p>Only explicitly linked events and dual-format journals share a source. Separate events remain separate, including duplicates. Unmatched month names and impossible dates appear as errors in the preview. Inactive SCR calendars are left alone.</p><p>Moon settings are retained; moon phase alignment is not migrated in this version. Moving world time can affect other time-based modules.</p>`,
		ok: { label: "Preview Migration" },
		rejectClose: !1
	});
	if (!i) return;
	let a = st(t, {
		clock: i.clock,
		events: i.events,
		authority: i.authority
	});
	await foundry.applications.api.DialogV2.wait({
		window: { title: "Review Calendar Migration" },
		position: { width: 850 },
		content: `<p><strong>New world date:</strong> ${n(be(a.time, !0))}. World time changes by ${n(String(a.time - t.time))} seconds.</p><p>${a.settings.length} calendar settings and ${a.writes.length} event records reviewed. Recurrence and event permissions remain intact; linked dates and recurrence follow the selected source.</p>${a.errors.length ? `<h3>Resolve before applying</h3><ul>${a.errors.map((e) => `<li>${n(e)}</li>`).join("")}</ul>` : ""}<div class="scrollable" style="max-height:45vh"><table><thead><tr><th>Event</th><th>Before</th><th>After</th></tr></thead><tbody>${a.changes.map((e) => `<tr><td>${n(e.name)}</td><td>${n(e.before)}</td><td>${n(e.after)}</td></tr>`).join("")}</tbody></table></div><p>A recovery snapshot is saved before changes. Reload afterward. If time or event data changes during review, the migration must be previewed again.</p>`,
		buttons: [...a.errors.length ? [] : [{
			action: "apply",
			label: "Apply Migration"
		}], {
			action: "close",
			label: "Close"
		}],
		rejectClose: !1
	}) === "apply" && (await Lt(a), ui?.notifications?.info("Calendar migration complete. Reload to refresh both calendars and reconcile events."));
}
function Bt() {
	game?.settings.register(e, dt, {
		name: "Calendar migration recovery",
		hint: "Status and GM journal reference for the most recent calendar migration.",
		scope: "world",
		config: !1,
		type: Object,
		default: null
	}), Hooks.once("setup", () => h("calendars", "calendarMigration", {
		name: "Existing world calendars",
		label: "Migrate Existing WFRP Calendars",
		hint: "Preview calendar differences and choose how world time and events move to the shared Imperial calendar.",
		icon: "fa-solid fa-calendar-check",
		restricted: !0,
		type: class extends foundry.applications.api.ApplicationV2 {
			async render() {
				try {
					await zt();
				} catch (e) {
					o(e instanceof Error ? e.message : String(e), e);
				}
				return this;
			}
		}
	}));
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/register-content.ts
async function Vt() {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
	let e = n, t = await foundry.applications.api.DialogV2.wait({
		window: { title: "WFRP Calendar Content" },
		position: { width: 720 },
		content: `<p>Import sourced WFRP observances and Ubersreik history. Holidays are visible to players; the historical almanac and dated historical/scenario events are GM-only. Existing notes, dates and text are preserved. No macros or chat reminders are enabled.</p><table><thead><tr><th>Observance</th><th>Date</th><th>Region</th></tr></thead><tbody>${g.holidays.map((t) => `<tr><td>${e(t.name)}</td><td>${e(we(t))}</td><td>${e(t.region)}</td></tr>`).join("")}</tbody></table><p><strong>Ubersreik history:</strong> ${g.history.length} sourced entries with year, range and uncertainty labels. Year-only history stays in the reference journal. Eight dated events are included without annual repetition: the provisional deposition date (5 Nachexen 2512 IC) and seven labelled scenario defaults from The Blessings that Drew Blood.</p><p><strong>Middenheim Carnival:</strong> included with holidays on 1–8 Brauzeit, using the older published default. Later books leave its seasonal timing flexible; you can adjust the imported event.</p>`,
		buttons: [
			{
				action: "both",
				label: "Holidays + History",
				default: !0
			},
			{
				action: "holidays",
				label: "Holidays Only"
			},
			{
				action: "history",
				label: "History Only"
			},
			{
				action: "close",
				label: "Close"
			}
		],
		rejectClose: !1
	});
	if (!t || t === "close") return;
	let r = {
		holidays: t === "both" || t === "holidays",
		history: t === "both" || t === "history"
	}, i = vt(r);
	if (await foundry.applications.api.DialogV2.wait({
		window: { title: "Import WFRP Calendar Content" },
		position: { width: 650 },
		content: `<p>${i.targets.calendarId ? "Simple Calendar notes" : i.targets.timekeeping ? "" : "GM reference journal"}${i.targets.calendarId && i.targets.timekeeping ? " and " : ""}${i.targets.timekeeping ? "ST&C events" : ""}. Existing documents keep their text and dates. Newly enabled calendar support may be attached to managed notes. Reload afterward to refresh both calendar displays.</p><ul>${i.entries.map((t) => `<li><strong>${e(t.name)}</strong>: ${e(t.status)}</li>`).join("")}</ul>`,
		buttons: [{
			action: "import",
			label: "Import Content",
			default: !0
		}, {
			action: "cancel",
			label: "Cancel"
		}],
		rejectClose: !1
	}) !== "import") return;
	let a = await bt(r, i.targets);
	ui?.notifications?.info(`Calendar content: ${a.created.length} created, ${a.connected.length} connected, ${a.skipped.length} preserved or skipped. Reload to refresh the calendars.`);
}
function Ht() {
	game?.system.id !== "wfrp4e" || !(C("simpleCalendar") || C("simpleTimekeeping")) || Hooks.once("setup", () => h("calendars", "calendarContent", {
		name: "WFRP calendar content",
		label: "Import WFRP Calendar Content",
		hint: "Review Imperial and Ubersreik holidays, including Middenheim Carnival, and import the historical almanac.",
		icon: "fa-solid fa-calendar-days",
		restricted: !0,
		type: class extends foundry.applications.api.ApplicationV2 {
			async render() {
				try {
					await Vt();
				} catch (e) {
					o(e instanceof Error ? e.message : String(e), e);
				}
				return this;
			}
		}
	}));
}
//#endregion
//#region src/module/functions/integrations/health-estimate/estimations.ts
var Ut = {
	wounds: "Compatibility Box: WFRP Wounds",
	unconscious: "Compatibility Box: WFRP Unconscious",
	dead: "Compatibility Box: WFRP Dead"
};
function Wt(e, t) {
	if (!Array.isArray(e) || !e.length) throw Error("Health Estimate must have a default estimation table before applying its preset.");
	let n = T(e);
	for (let e of n) if (!e || typeof e != "object" || Array.isArray(e) || typeof e.name != "string" || !Array.isArray(e.estimates) || !Array.isArray(e.actorTypes) || !Array.isArray(e.statusEffects)) throw Error("Health Estimate's estimation tables do not match the supported version 36 schema.");
	let r = new Set(Object.values(Ut)), [i, ...a] = n.filter((e) => !r.has(e.name));
	if (!i || i.actorTypes.length || i.statusEffects.length) throw Error("Health Estimate's first table must remain its unfiltered default table.");
	let o = [
		"character",
		"npc",
		"creature"
	], s = {
		name: Ut.wounds,
		ignoreColor: !1,
		actorTypes: o,
		statusEffects: [],
		estimates: [
			{
				value: 0,
				label: t ? "Mortal Peril!" : "Unconscious"
			},
			{
				value: 25,
				label: t ? "Desperate!" : "Clinging On..."
			},
			{
				value: 50,
				label: "Bloodied"
			},
			{
				value: 75,
				label: "Wounded"
			},
			{
				value: 99,
				label: "Grazed"
			},
			{
				value: 100,
				label: "Unharmed"
			}
		]
	}, c = (e, t, n) => ({
		name: e,
		ignoreColor: !0,
		actorTypes: o,
		statusEffects: [t],
		estimates: [{
			value: 100,
			label: n
		}]
	});
	return [
		i,
		s,
		c(Ut.unconscious, "unconscious", "Unconscious"),
		c(Ut.dead, "dead", "Gone to Morr..."),
		...a
	];
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/values.ts
function Gt(e, t) {
	return t instanceof foundry.abstract.DataModel ? t = t.toObject() : e.type instanceof foundry.data.fields.DataField && (t = e.type.toObject(t)), T(t);
}
function Kt(e, t) {
	let n = e.type, r = T(t);
	if (n instanceof foundry.data.fields.DataField) r = T(n.clean(r)), n.validate(r, {
		fallback: !1,
		strict: !0
	});
	else if (typeof n == "function" && n.prototype instanceof foundry.abstract.DataModel) r = T(n.fromSource(r, { strict: !0 }).toObject());
	else if (n === String && typeof r != "string" || n === Number && typeof r != "number" || n === Boolean && typeof r != "boolean" || n === Array && !Array.isArray(r) || n === Object && (typeof r != "object" || !r || Array.isArray(r))) throw Error("Preset value does not match this world's setting type.");
	if (!w(t, r)) throw Error("Preset value does not match this world's setting schema.");
}
//#endregion
//#region src/module/foundry/integrations/health-estimate/preset.ts
var qt = "healthEstimate", Jt = "core.estimations", Yt = {
	title: "Health Estimate",
	watchSettings: ["wfrp4e.uiaCrits"],
	enabled: () => {
		let e = game?.modules.get(qt)?.version;
		return C("healthEstimate") && game?.system.id === "wfrp4e" && !!e && !foundry.utils.isNewerVersion("36.1.0", e);
	},
	additionalSettings: () => {
		let e = game?.settings.settings?.get(`${qt}.${Jt}`);
		if (!e) throw Error("Health Estimate's estimation setting is unavailable. Version 36.1.0 or newer is required.");
		let t = Gt(e, game?.settings.get(qt, Jt)), n = game?.settings.get("wfrp4e", "uiaCrits") === !0;
		return [...n ? [{
			namespace: qt,
			key: "core.NPCsJustDie",
			value: !1
		}] : [], {
			namespace: qt,
			key: Jt,
			value: Wt(t, n)
		}];
	}
}, Xt = /* @__PURE__ */ new WeakSet();
function Zt() {
	if (!Yt.enabled?.()) return;
	let e = game && Reflect.get(game, "healthEstimate");
	if (!e || typeof e.isDead != "function" || Xt.has(e)) return;
	let t = e.isDead;
	e.isDead = function(e, n) {
		return e.actor && [
			"character",
			"npc",
			"creature"
		].includes(e.actor.type) ? e.actor.statuses.has("dead") : t.call(this, e, n);
	}, Xt.add(e);
}
//#endregion
//#region src/module/foundry/integrations/foundryvtt-simple-calendar-reborn/preset.ts
var Qt = "foundryvtt-simple-calendar-reborn";
function $t() {
	let e = game?.settings.get(Qt, "calendar-configuration");
	if (!Array.isArray(e) || e.length) return e;
	let t = globalThis.SimpleCalendar?.api;
	return JSON.parse(JSON.stringify(t?.getAllCalendars() ?? e));
}
var en = {
	title: "Simple Calendar Reborn — WFRP Imperial Calendar",
	enabled: () => game?.system.id === "wfrp4e" && C("simpleCalendar"),
	additionalSettings: () => [{
		namespace: Qt,
		key: "calendar-configuration",
		value: Ie($t(), game?.settings.get(Qt, "active-calendar"), game.time.worldTime, C("simpleTimekeeping"))
	}]
};
//#endregion
//#region src/module/foundry/integrations/bossbar/legacy-preferences.ts
function tn(t) {
	return game?.settings.storage?.get("world")?.getSetting(`${e}.${t}`)?.value;
}
function nn() {
	return tn("bossBarEnabled") === !1;
}
//#endregion
//#region src/module/foundry/integrations/bossbar/preset.ts
function rn() {
	return game?.settings.get("wfrp4e", "uiaCrits") === !0;
}
var an = {
	title: "Boss Bar",
	watchSettings: ["wfrp4e.uiaCrits"],
	ignoreSetting: d.ignorePrompt,
	defaultIgnorePrompt: () => nn() || tn("bossBarIgnoreSetupPrompt") === !0,
	enabled: () => game?.system.id === "wfrp4e",
	additionalSettings: () => {
		if (!rn() || game?.settings.get("wfrp4e-compatibility-box", d.stacked) !== !0) return [];
		let e = game?.settings.get(u, "barStyles"), t = e.find((e) => e.id === "segmented");
		return t && e[0] !== t ? [{
			namespace: u,
			key: "barStyles",
			value: [t, ...e.filter((e) => e !== t)]
		}] : [];
	}
}, on = "#a51414d8", sn = "#7e1717dc", cn = "#b31f18d8", ln = "#b01832d8", un = "#861a24d8", dn = "#541e1ed8", I = "#6a0e0ed8", L = "#6f3518e0", R = "#621010e0", fn = "#771616dc", z = "#440707d8", pn = "#14101490", B = "#0b080de8", mn = [
	["Jabberslythe", "#78d61be8"],
	["Chameleon Skink", I],
	["Kroxigor", I],
	["Saurus", I],
	["Suarus", I],
	["Skink", I],
	["Slann", I],
	["Reptile", I],
	["Ogre Gorger", dn],
	["Gorger", dn],
	["Orca", on],
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
	["Rat Ogre", fn],
	["Wolf Rat", fn],
	["Skaven", fn],
	["Bray Shaman", R],
	["Beastman", R],
	["Beastmen", R],
	["Bestigor", R],
	["Minotaur", R],
	["Pestigor", R],
	["Razorgor", R],
	["Ungor", R],
	["Gor", R],
	["Greenskin", L],
	["Forest Goblin", L],
	["Night Goblin", L],
	["Hobgoblin", L],
	["Goblin", L],
	["Black Orc", L],
	["Orc", L],
	["Snotling", L],
	["Squig", L],
	["Skeleton", pn],
	["Ghost", pn],
	["Tomb Banshee", pn],
	["Banshee", pn],
	["Undead", z],
	["Vampire", z],
	["Ghoul", z],
	["Wight", z],
	["Liche", z],
	["Maurngul", z],
	["Mourngul", z],
	["Human", on],
	["Dwarf", sn],
	["Halfling", cn],
	["High Elf", ln],
	["helf", ln],
	["Wood Elf", un],
	["welf", un],
	["Ogre", dn]
];
function hn() {
	let e = {};
	for (let [t, n] of mn) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function gn(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function _n(e = {}) {
	let t = hn();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? on;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function vn(e, t = {}) {
	let n = gn(e);
	for (let [e, r] of Object.entries(_n(t))) n[e] ??= r;
	return n;
}
//#endregion
//#region src/module/foundry/integrations/splatter/constants.ts
var yn = "splatter", bn = "BloodSheetData", xn = {
	title: "Splatter",
	ignoreSetting: "splatterIgnoreSetupPrompt",
	menuKey: "configureSplatter",
	additionalSettings: () => [{
		namespace: yn,
		key: bn,
		value: vn(game?.settings.get(yn, bn), game?.wfrp4e?.config.species ?? {})
	}]
}, Sn = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
}, Cn = {}, wn = {
	"core.deathState": !0,
	"core.deathStateName": "Gone to Morr..."
}, Tn = {}, En = {
	creatureType: "details.species.value",
	creatureTypeCustom: "",
	currentHp: "status.wounds.value",
	maxHp: "status.wounds.max",
	useWounds: !1,
	useBloodsheet: !0
}, Dn = {
	bossbar: { description: "Use WFRP Wounds paths and the compatible stacked-bar configuration." },
	splatter: { description: "Use WFRP Wounds and species for blood effects while preserving custom colors." },
	healthEstimate: { description: "Use WFRP Wounds labels: Unconscious at zero under core rules, Mortal Peril! under Up in Arms, Bloodied at 50%, and Gone to Morr... for the Dead condition. Preserve custom and vehicle tables. Recommend disabling NPCs Just Die only under Up in Arms; leave it alone under core." },
	"simple-timekeeping": { description: "Install the standard 400-day Imperial calendar. Keeps world time, events, macros, weather and display preferences. Reload after applying. Pause running clocks during setup and apply the Simple Calendar preset too if using both." },
	"foundryvtt-simple-calendar-reborn": { description: "Replace the active calendar with the standard 400-day Imperial calendar at the current Foundry world timestamp. Existing dates may display differently; timestamps and notes are not migrated. Keeps other calendars and note categories. With ST&C enabled, its clock controls advance time and Simple Calendar follows Foundry time in third-party mode with automatic clock speed zero; use ST&C to change dates and advance time. Pause running clocks during setup." }
};
//#endregion
//#region src/module/functions/settings-presets/sources.ts
function On(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => {
		let n = e.slice(e.lastIndexOf("/") + 1);
		if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.json$/.test(n)) throw Error(`Invalid settings preset namespace filename: ${e}`);
		if (!t || typeof t != "object" || Array.isArray(t)) throw Error(`Settings preset ${e} must be an object of setting values.`);
		let r = Object.fromEntries(Object.entries(t).map(([t, n]) => {
			if (!t.trim()) throw Error(`Settings preset ${e} contains an empty setting key.`);
			return [t, T(n)];
		}));
		return [n.slice(0, -5), r];
	}));
}
//#endregion
//#region src/module/functions/settings-presets/metadata.ts
function kn(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Settings preset metadata must be an object.");
	return Object.fromEntries(Object.entries(e).map(([e, n]) => {
		if (!t.includes(e)) throw Error(`Metadata has no settings source: ${e}`);
		if (!n || typeof n != "object" || Array.isArray(n)) throw Error(`Invalid metadata for ${e}`);
		let r = n;
		for (let [t, n] of Object.entries(r)) if (t === "promptOnStartup" ? typeof n != "boolean" : !["title", "description"].includes(t) || typeof n != "string") throw Error(`Invalid preset metadata: ${e}.${t}`);
		return [e, r];
	}));
}
//#endregion
//#region src/module/foundry/settings/presets/sources.ts
var An = On(/* #__PURE__ */ Object.assign({
	"/src/settings/bossbar.json": Sn,
	"/src/settings/foundryvtt-simple-calendar-reborn.json": Cn,
	"/src/settings/healthEstimate.json": wn,
	"/src/settings/simple-timekeeping.json": Tn,
	"/src/settings/splatter.json": En
})), jn = kn(Object.values([Dn])[0] ?? {}, Object.keys(An)), Mn = {
	"foundryvtt-simple-calendar-reborn": en,
	"simple-timekeeping": Le,
	bossbar: an,
	healthEstimate: Yt,
	splatter: xn
};
function Nn(e) {
	if (!Object.hasOwn(An, e)) throw Error(`No settings preset exists for ${e}.`);
	return {
		namespace: e,
		values: An[e],
		...Mn[e],
		...jn[e]
	};
}
function Pn() {
	return Object.keys(An).sort().map(Nn);
}
//#endregion
//#region src/module/functions/settings-presets/wfrp.ts
function Fn(e, t) {
	return t === "wfrp4e" ? [...e].sort((e, t) => Number(V(e)) - Number(V(t))) : [...e];
}
function V({ namespace: e, key: t }) {
	return e === "wfrp4e" && t === "useGroupAdvantage";
}
function In({ namespace: e, key: t }) {
	return e === "wfrp4e" && ["homebrew", "customCursor"].includes(t) || e === "wfrp4e-rnhd" && ["showClock", "syncClock"].includes(t);
}
function Ln({ namespace: e, key: t, value: n }) {
	return e !== "wfrp4e" || t !== "tableSettings" || !n || typeof n != "object" ? [] : [...new Set(Object.values(n).flatMap((e) => String(e).split(",").filter(Boolean)))];
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/coordination.ts
function Rn() {
	let e = [...game?.modules.values() ?? []].filter((e) => e.active).map((e) => e.api?.settingsPresetCoordinator).filter((e) => e?.version === 1);
	if (e.length > 1) throw Error("Multiple settings coordinators are active; disable the duplicate before applying presets.");
	return e[0];
}
function zn(e, t) {
	return Rn()?.plan(e, t) ?? {
		entries: t,
		excluded: [],
		conflicts: []
	};
}
async function Bn(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
	return await Rn()?.resolve(e, t) ?? !0;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/engine.ts
function Vn(e) {
	return e === "core" || e === game?.system.id || game?.modules.get(e)?.active === !0;
}
function Hn(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to inspect settings presets.");
	let n = zn(e, t), r = {
		changes: [],
		unchanged: [],
		skipped: [],
		failed: [],
		conflicts: n.conflicts,
		excluded: n.excluded,
		missingTables: [],
		requiresReload: !1,
		automaticReload: !1
	};
	for (let e of n.entries) {
		let t = `${e.namespace}.${e.key}`, n = game.settings.settings?.get(t);
		if (!Vn(e.namespace) || !n || n.scope !== "world") {
			r.skipped.push({
				id: t,
				reason: "World setting is unavailable or its namespace is not active"
			});
			continue;
		}
		try {
			Kt(n, e.value), game.system.id === "wfrp4e" && r.missingTables.push(...Ln(e).filter((e) => !(game?.collections?.get("RollTable"))?.get(e)));
			let i = Gt(n, game.settings.get(e.namespace, e.key));
			if (w(i, e.value)) {
				r.unchanged.push(t);
				continue;
			}
			r.changes.push({
				...e,
				current: i,
				label: n.name ? game.i18n.localize(n.name) : t
			}), r.requiresReload ||= !!n.requiresReload || game.system.id === "wfrp4e" && (In(e) || V(e)), r.automaticReload ||= game.system.id === "wfrp4e" && V(e);
		} catch (e) {
			r.failed.push({
				id: t,
				reason: e instanceof Error ? e.message : String(e)
			});
		}
	}
	return r.missingTables = [...new Set(r.missingTables)], r;
}
var Un = !1;
async function Wn(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (Un) throw Error("A settings preset is already being applied.");
	Un = !0;
	try {
		let n = Hn(e, t), r = {
			...n,
			updated: [],
			blocked: !!(n.failed.length || n.skipped.length || n.conflicts.length || n.missingTables.length),
			requiresReload: !1,
			automaticReload: !1
		};
		if (r.blocked) return r;
		for (let i of Fn(n.changes, game.system.id)) {
			let n = `${i.namespace}.${i.key}`;
			try {
				if (!game.user?.isGM || !Vn(i.namespace)) throw Error("Preset permissions or availability changed.");
				let a = zn(e, t), o = a.entries.find((e) => e.namespace === i.namespace && e.key === i.key);
				if (a.conflicts.length || !o || !w(o.value, i.value)) throw Error("Preset choices changed; review the remaining settings again.");
				let s = game.settings.settings?.get(n);
				if (!s || s.scope !== "world") throw Error("World setting is unavailable.");
				if (Kt(s, i.value), await game.settings.set(i.namespace, i.key, structuredClone(i.value)), r.requiresReload ||= !!s.requiresReload || game.system.id === "wfrp4e" && (In(i) || V(i)), r.automaticReload ||= game.system.id === "wfrp4e" && V(i), !w(Gt(s, game.settings.get(i.namespace, i.key)), i.value)) throw Error("Foundry did not retain the complete preset value.");
				r.updated.push(n);
			} catch (e) {
				r.failed.push({
					id: n,
					reason: e instanceof Error ? e.message : String(e)
				});
				break;
			}
		}
		return r;
	} finally {
		Un = !1;
	}
}
//#endregion
//#region src/module/foundry/settings/presets/engine.ts
function H(e) {
	return Vn(e.namespace) && (e.enabled?.() ?? !0);
}
function U(e) {
	if (!H(e)) throw Error("Preset is not active.");
	return [...Object.entries(e.values).map(([t, n]) => ({
		namespace: e.namespace,
		key: t,
		value: n
	})), ...e.additionalSettings?.() ?? []];
}
function Gn(t) {
	if (!H(t)) return {
		changes: [],
		unavailable: [`${t.namespace}: system, module, or integration is not active`]
	};
	let n = Hn(e, U(t));
	return {
		changes: n.changes.map((e) => ({
			...e,
			requiresReload: n.requiresReload
		})),
		unavailable: [
			...n.skipped,
			...n.failed,
			...n.conflicts
		].map((e) => `${e.id}: ${e.reason}`)
	};
}
async function Kn(t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (!H(t)) throw Error("Preset is not active.");
	let n = await Wn(e, U(t));
	if (n.blocked || n.failed.length) throw Error(`${n.updated.length} settings updated. ${[
		...n.skipped,
		...n.failed,
		...n.conflicts
	].map((e) => `${e.id}: ${e.reason}`).join("; ")}${n.missingTables.length ? ` Missing rule tables: ${n.missingTables.join(", ")}` : ""}`);
	return n;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/review.ts
var qn = Promise.resolve(), Jn = /* @__PURE__ */ new Map();
function Yn(e) {
	let t = `${e.owner}:${e.ignoreKey ?? e.title}`;
	if (e.startup && Jn.has(t)) return Jn.get(t);
	let n = qn.then(() => Xn(e)).finally(() => {
		e.startup && Jn.delete(t);
	});
	return e.startup && Jn.set(t, n), qn = n.catch(() => {}), n;
}
async function Xn(e) {
	if (!game?.ready || !game.user?.isGM || e.startup && game.users?.activeGM && game.users.activeGM.id !== game.user.id || e.startup && e.ignoreKey && game.settings.get(e.owner, e.ignoreKey) === !0 || !await Bn(e.owner, e.entries())) return null;
	let t = Hn(e.owner, e.entries());
	if (e.startup && !t.changes.length && !t.skipped.length && !t.failed.length && !t.conflicts.length && !t.missingTables.length) return null;
	let a = !!(t.skipped.length || t.failed.length || t.conflicts.length || t.missingTables.length), o = await foundry.applications.api.DialogV2.wait({
		window: { title: e.title },
		position: { width: 650 },
		content: `${e.description ? `<p>${n(e.description)}</p>` : ""}${r(t)}`,
		buttons: [
			...!a && t.changes.length ? [{
				action: "configure",
				label: "Apply Preset",
				default: !0
			}] : [],
			...e.startup && e.ignoreKey ? [{
				action: "keep",
				label: "Keep My Settings and Ignore"
			}] : [],
			{
				action: "later",
				label: e.startup ? "Ask Next Time" : "Close"
			}
		],
		rejectClose: !1
	});
	if (!game.user?.isGM) throw Error("GM permission changed.");
	if (o === "keep" && e.ignoreKey && await game.settings.set(e.owner, e.ignoreKey, !0), o !== "configure" || a) return null;
	if (!w(Hn(e.owner, e.entries()), t)) throw Error("Settings or preset choices changed during review; reopen the action before applying.");
	let s = await Wn(e.owner, e.entries());
	return await i(e.title, s), s;
}
//#endregion
//#region src/module/foundry/settings/presets/interface.ts
var Zn = (e) => [b, x].includes(e.namespace), Qn = !1;
function $n(e) {
	return e.title ?? game?.modules.get(e.namespace)?.title ?? e.namespace;
}
function er(e) {
	return e.ignoreSetting ?? `ignoreSettingsPreset-${e.namespace}`;
}
function tr(e) {
	o(n(`Settings preset could not be completed: ${e instanceof Error ? e.message : String(e)}`), e);
}
async function nr(t) {
	if (!H(t)) throw Error("Preset is not active.");
	if (Zn(t)) return zt();
	await Yn({
		owner: e,
		title: $n(t),
		entries: () => U(t),
		...t.description ? { description: t.description } : {}
	});
}
async function rr(t, n = !1) {
	if (!(!H(t) || game?.system.id !== "wfrp4e" || t.promptOnStartup === !1 && !n)) {
		if (Zn(t)) {
			if (Qn || !game?.user?.isGM || game.users?.activeGM && game.users.activeGM.id !== game.user.id || game.settings.get("wfrp4e-compatibility-box", er(t)) === !0 || !Gn(t).changes.length) return;
			Qn = !0;
			let n = await foundry.applications.api.DialogV2.wait({
				window: { title: "WFRP Calendar Setup" },
				content: "<p>Your calendars differ from the shared Imperial calendar. Review a migration to choose what happens to world time and existing events.</p>",
				buttons: [
					{
						action: "review",
						label: "Review Migration"
					},
					{
						action: "ignore",
						label: "Keep My Calendars"
					},
					{
						action: "close",
						label: "Later"
					}
				],
				rejectClose: !1
			});
			if (n === "review" && await zt(), n === "ignore") for (let n of [b, x]) {
				let r = er({
					...t,
					namespace: n
				});
				game.settings.settings?.has(`wfrp4e-compatibility-box.${r}`) && await game.settings.set(e, r, !0);
			}
			return;
		}
		await Yn({
			owner: e,
			title: $n(t),
			entries: () => U(t),
			startup: !0,
			ignoreKey: er(t),
			...t.description ? { description: t.description } : {}
		});
	}
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/export.ts
function ir(e, t, n = !1) {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	if (!Vn(e)) throw Error("The selected system or module is not active.");
	if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(e)) throw Error("Invalid settings namespace.");
	if (!t.length) throw Error("Select at least one setting to export.");
	let r = Object.fromEntries([...new Set(t)].map((t) => {
		let r = game?.settings.settings?.get(`${e}.${t}`);
		if (!r || r.scope !== "world" || !r.config && !n) throw Error(`${e}.${t} is not an available selected world setting.`);
		try {
			return [t, Gt(r, game?.settings.get(e, t))];
		} catch (n) {
			throw Error(`${e}.${t}: ${n instanceof Error ? n.message : String(n)}`, { cause: n });
		}
	}));
	return {
		namespace: e,
		filename: `${e}.json`,
		values: r
	};
}
function ar(e, t) {
	return [...game?.settings.settings?.values() ?? []].filter((n) => n.namespace === e && n.scope === "world" && (n.config || t)).sort((e, t) => e.key.localeCompare(t.key));
}
function or(e, t) {
	let n = foundry.utils.escapeHTML, r = game?.i18n.localize(e.name || e.key) ?? e.key, i, a = !1;
	try {
		let t = Gt(e, game?.settings.get(e.namespace, e.key)), n = JSON.stringify(t);
		i = n.length > 160 ? `${n.slice(0, 160)}…` : n;
	} catch (e) {
		a = !0, i = `Cannot export: ${e instanceof Error ? e.message : String(e)}`;
	}
	return `<div class="form-group"><label>
    <input type="checkbox" name="setting-${t}" ${a ? "disabled" : ""}>
    ${n(r)}${e.config ? "" : " (hidden)"}
    </label><p class="hint"><code>${n(`${e.namespace}.${e.key}`)}</code><br>${n(i)}</p></div>`;
}
async function sr(e = "src/settings/") {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	let t = [...new Set([...game.settings.settings?.values() ?? []].filter((e) => e.scope === "world" && Vn(e.namespace)).map((e) => e.namespace))].sort();
	if (!t.length) return ui?.notifications?.info("There are no registered world settings to export."), null;
	let n = foundry.utils.escapeHTML, r = await foundry.applications.api.DialogV2.input({
		window: { title: "Export Settings Preset" },
		content: `<p>Select the system or module whose world preferences you want to save.</p>
      <div class="form-group"><label>System or module</label><select name="namespace">
      ${t.map((e) => `<option value="${n(e)}">${n(e)}</option>`).join("")}</select></div>
      <div class="form-group"><label><input type="checkbox" name="includeHidden"> Include hidden world settings</label>
      <p class="hint">Hidden settings may contain migration data or world state. Select only the preferences you want to reuse.</p></div>`,
		ok: { label: "Choose Settings" },
		rejectClose: !1
	});
	if (!r) return null;
	let i = String(r.namespace);
	if (!t.includes(i)) throw Error("Select an available settings namespace.");
	let a = r.includeHidden === !0, o = ar(i, a);
	if (!o.length) return ui?.notifications?.info("This namespace has no settings matching that selection."), null;
	let s = await foundry.applications.api.DialogV2.input({
		window: { title: `Export ${i} Settings` },
		content: `<p>Select the preferences to include in <strong>${n(i)}.json</strong>.</p>
      <div class="scrollable" style="max-height: 50vh">${o.map(or).join("")}</div>
      <p class="hint">Save the downloaded file in <code>${n(e)}</code>, then rebuild the module to add its import button.</p>`,
		ok: { label: "Download JSON" },
		rejectClose: !1
	});
	if (!s) return null;
	let c = o.filter((e, t) => s[`setting-${t}`] === !0).map(({ key: e }) => e);
	if (!c.length) return ui?.notifications?.info("No settings selected; nothing was exported."), null;
	let l = ir(i, c, a);
	return foundry.utils.saveDataToFile(`${JSON.stringify(l.values, null, 2)}\n`, "application/json", l.filename), ui?.notifications?.info(`Exported ${c.length} settings to ${n(l.filename)}.`), l;
}
//#endregion
//#region src/module/foundry/settings/presets/api.ts
function cr(e) {
	let t = e === void 0 ? Pn().filter(H) : [Nn(e)];
	if (t.some((e) => !H(e))) throw Error("Preset is not active.");
	return t.flatMap(U);
}
var lr = {
	version: 1,
	getPresets: () => Pn().filter(H).map((e) => ({
		namespace: e.namespace,
		title: $n(e),
		entries: U(e)
	})),
	inspect: (t) => Hn(e, cr(t)),
	apply: async (t) => Wn(e, cr(t)),
	resolve: async (t) => Bn(e, cr(t)),
	capture: ir
};
//#endregion
//#region src/module/functions/settings-presets/conflicts.ts
function ur(e) {
	return Array.isArray(e) ? e.map(ur) : e && typeof e == "object" ? Object.fromEntries(Object.keys(e).sort().map((t) => [t, ur(e[t])])) : e;
}
function dr(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n.entries) {
		let r = `${e.namespace}.${e.key}`, i = t.get(r) ?? {
			id: r,
			namespace: e.namespace,
			key: e.key,
			candidates: [],
			signature: ""
		}, a = i.candidates.find((e) => e.source === n.source);
		if (a && !w(a.value, e.value)) throw Error(`Preset ${n.source} proposes two values for ${r}.`);
		a || i.candidates.push({
			source: n.source,
			title: n.title,
			value: e.value
		}), t.set(r, i);
	}
	return [...t.values()].filter((e) => e.candidates.some((t) => !w(t.value, e.candidates[0].value))).map((e) => (e.candidates.sort((e, t) => e.source.localeCompare(t.source)), e.signature = JSON.stringify(e.candidates.map(({ source: e, value: t }) => [e, ur(t)])), e)).sort((e, t) => e.id.localeCompare(t.id));
}
function fr(e, t, n) {
	let r = {
		entries: [],
		excluded: [],
		conflicts: []
	};
	for (let i of e) {
		let e = `${i.namespace}.${i.key}`, a = t.find((t) => t.id === e);
		if (!a) {
			r.entries.push(i);
			continue;
		}
		let o = Object.hasOwn(n, e) ? n[e] : void 0;
		if (!o || o.signature !== a.signature || o.source !== null && !a.candidates.some((e) => e.source === o.source)) {
			r.conflicts.push({
				id: e,
				reason: "Conflicting presets need a GM choice in Compatibility Box"
			});
			continue;
		}
		if (o.source === null) {
			r.excluded.push(e);
			continue;
		}
		r.entries.push({
			...i,
			value: a.candidates.find((e) => e.source === o.source).value
		});
	}
	return r;
}
//#endregion
//#region src/module/foundry/settings/conflicts/sources.ts
function pr(e, t) {
	let n = [];
	for (let [e, t] of game?.modules.entries() ?? []) {
		if (!t.active) continue;
		let r = t.api?.settingsPresets;
		if (r?.version === 1) for (let i of r.getPresets()) n.push({
			source: `${e}:${i.namespace}`,
			title: `${t.title ?? e} — ${i.title}`,
			entries: i.entries.map((e) => ({
				...e,
				value: T(e.value)
			}))
		});
	}
	for (let r of t) n.some((t) => t.source.startsWith(`${e}:`) && t.entries.some((e) => e.namespace === r.namespace && e.key === r.key)) || n.push({
		source: `${e}:${r.namespace}`,
		title: game?.modules.get(e)?.title ?? e,
		entries: [r]
	});
	let r = new Set(t.map((e) => `${e.namespace}.${e.key}`));
	return dr(n).filter((e) => r.has(e.id));
}
//#endregion
//#region src/module/foundry/settings/conflicts/coordinator.ts
var mr = "settingsPresetConflictChoices";
function hr() {
	return game?.settings.get("wfrp4e-compatibility-box", "settingsPresetConflictChoices") ?? {};
}
var gr = Promise.resolve(), _r = {
	version: 1,
	inspect: pr,
	decide: yr,
	async reset() {
		if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
		await game.settings.set(e, mr, {});
	},
	plan(e, t) {
		return fr(t, pr(e, t), hr());
	},
	resolve(e, t) {
		let n = gr.then(() => vr(e, t));
		return gr = n.catch(() => {}), n;
	}
};
async function vr(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to resolve preset conflicts.");
	let r = pr(e, t), i = new Set(_r.plan(e, t).conflicts.map((e) => e.id)), a = {};
	for (let e of r.filter((e) => i.has(e.id))) {
		let t = n, r = await foundry.applications.api.DialogV2.input({
			window: { title: "Resolve Settings Preset Conflict" },
			content: `<p>Multiple packages recommend different values for <strong>${t(e.id)}</strong>. Choose which recommendation all cooperating presets should follow.</p><p>Current: <code>${t(JSON.stringify(game.settings.get(e.namespace, e.key)))}</code></p><div class="form-group"><label>Preferred settings source</label><select name="source"><option value="">Leave this setting under my control</option>${e.candidates.map((e, n) => `<option value="${n}">${t(e.title)}</option>`).join("")}</select></div><div class="scrollable" style="max-height:40vh"><ul>${e.candidates.map((e) => `<li><strong>${t(e.title)}</strong>: <code>${t(JSON.stringify(e.value))}</code></li>`).join("")}</ul></div><p>This saves your preference without applying settings. You will review changes next. Updated competing values will ask again.</p>`,
			ok: { label: "Use This Choice" },
			rejectClose: !1
		});
		if (!r) return !1;
		let i = String(r.source ?? ""), o = e.candidates.find((e, t) => String(t) === i);
		if (i !== "" && !o) throw Error("Choose a listed settings source.");
		a[e.id] = {
			signature: e.signature,
			source: o?.source ?? null
		};
	}
	return await yr(e, t, a), !0;
}
async function yr(t, n, r) {
	if (!game?.ready || !game.user?.isGM) throw Error("GM permission changed.");
	if (!Object.keys(r).length) return;
	let i = pr(t, n);
	for (let [e, t] of Object.entries(r)) {
		let n = i.find((t) => t.id === e);
		if (!n || n.signature !== t.signature) throw Error("Competing presets changed during review; reopen the action.");
		if (t.source !== null && !n.candidates.some((e) => e.source === t.source)) throw Error("Choose a listed settings source.");
	}
	await game.settings.set(e, mr, {
		...hr(),
		...r
	});
}
//#endregion
//#region src/types/patches/paper-doll/Equipment.ts
var br = [
	"HEAD",
	"BODY",
	"GLOVES",
	"BOOTS"
], xr = ["MAIN_LEFT", "MAIN_RIGHT"], Sr = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
], Cr = {
	BODY: ["body"],
	BOOTS: ["lLeg", "rLeg"],
	GLOVES: ["lArm", "rArm"],
	HEAD: ["head"]
};
function wr(e, t) {
	return t.coverage - e.coverage || t.points - e.points || e.item.name.localeCompare(t.item.name) || e.item.id.localeCompare(t.item.id);
}
function Tr(e, t) {
	return Math.max(...Cr[t].map((t) => e.armourPoints[t]));
}
function Er(e, t) {
	return Cr[t].filter((t) => e.armourPoints[t] > 0).length;
}
function Dr(e, t, n) {
	return Tr(n.item, e) - Tr(t.item, e) || Er(n.item, e) - Er(t.item, e) || wr(t, n);
}
function Or(e) {
	return e.type === "armour" && e.equipped;
}
function kr(e) {
	let t = e.armourPoints, n = Sr.filter((e) => t[e] > 0);
	return {
		coverage: n.length,
		item: e,
		points: n.reduce((e, n) => e + t[n], 0)
	};
}
function Ar(e) {
	let t = e.filter(Or).map(kr);
	return br.flatMap((e) => {
		let n = t.filter((t) => Tr(t.item, e) > 0).sort((t, n) => Dr(e, t, n))[0];
		return n ? [{
			slotId: e,
			uuid: n.item.uuid
		}] : [];
	});
}
function jr(e, t) {
	return e.twoHanded ? "both" : e.offhand ? t === "l" ? "r" : "l" : t;
}
function Mr(e, t) {
	return Number(t.twoHanded) - Number(e.twoHanded) || e.name.localeCompare(t.name) || e.id.localeCompare(t.id);
}
function Nr(e, t) {
	let n = e.filter((e) => e.type === "weapon" && e.equipped).sort(Mr);
	return xr.flatMap((e) => {
		let r = e === "MAIN_LEFT" ? "l" : "r", i = n.find((e) => {
			let n = jr(e, t);
			return n === "both" || n === r;
		});
		return i ? [{
			slotId: e,
			uuid: i.uuid
		}] : [];
	});
}
function Pr(e, t) {
	return [...Ar(e), ...Nr(e, t)];
}
//#endregion
//#region src/module/functions/patches/paper-doll/derive-paper-doll-slot-state.ts
function Fr(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Ir(e, t, n, r) {
	let i = Fr(e), a = new Map(t.map((e) => [e.slotId, e.uuid]));
	for (let e of [...br, ...xr]) {
		if (!r.has(e)) continue;
		let t = i[e]?.["0"] ?? null, o = a.get(e) ?? null;
		o ? (i[e] ??= {}, i[e][0] = o) : t && n.has(t) && (i[e] ??= {}, i[e][0] = null);
	}
	return i;
}
function Lr(e, t, n) {
	let r = new Map(t.map((e) => [e.uuid, e])), i = Fr(e);
	for (let e of Object.values(i)) for (let [t, i] of Object.entries(e)) !i || n.has(i) || r.get(i)?.equipped === !1 && (e[t] = null);
	return i;
}
function Rr(e, t, n, r, i) {
	return Lr(Ir(e, t, n, r), i, n);
}
function zr(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-paper-doll-slot-state.ts
function Br(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Vr(e) {
	return /^(0|[1-9]\d*)$/.test(e);
}
function Hr(e) {
	return e == null || typeof e == "string" && e.length > 0;
}
function Ur(e) {
	return Br(e) && Object.entries(e).every(([e, t]) => e.length > 0 && Br(t) && Object.entries(t).every(([e, t]) => Vr(e) && Hr(t)));
}
//#endregion
//#region src/module/functions/patches/paper-doll/equipment-update.ts
function Wr(e) {
	return e.slotId === "MAIN_LEFT" ? "l" : e.slotId === "MAIN_RIGHT" ? "r" : null;
}
function Gr(e, t, n, r) {
	if (t === null) return {};
	let i = {};
	if (t || (i["system.equipped.value"] = !0), e?.type !== "weapon") return i;
	if (!r) throw Error(`Weapon ${e.uuid} requires the actor's main hand.`);
	let a = Wr(n), o = e.twoHanded ? !1 : a ? a !== r : void 0;
	return o !== void 0 && e.offhand !== o && (i["system.offhand.value"] = o), i;
}
function Kr(e) {
	return e === !0 ? { "system.equipped.value": !1 } : {};
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-item-allowed-in-slot.ts
function qr(e, t) {
	switch (t) {
		case "HEAD": return e.armourPoints.head > 0;
		case "BODY": return e.armourPoints.body > 0;
		case "GLOVES": return e.armourPoints.lArm > 0 || e.armourPoints.rArm > 0;
		case "BOOTS": return e.armourPoints.lLeg > 0 || e.armourPoints.rLeg > 0;
		default: return !1;
	}
}
function Jr(e, t, n) {
	return n === "MAIN_LEFT" || n === "MAIN_RIGHT" ? t?.type === "weapon" : n === "HEAD" || n === "BODY" || n === "GLOVES" || n === "BOOTS" ? t?.type === "armour" && qr(t, n) : e !== "weapon" && e !== "armour";
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-runtime-types.ts
var Yr = new Set([
	"character",
	"npc",
	"creature"
]);
function W(e) {
	return typeof e == "object" && !!e;
}
function Xr(e) {
	return W(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function G(e) {
	return Xr(e) && Yr.has(e.type);
}
function Zr(e) {
	return W(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-equipment.ts
var Qr = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function $r(e) {
	if (!W(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function ei(e, t) {
	let n = $r(e)[t];
	if (n === void 0) return null;
	if (!W(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function ti(e, t) {
	let n = ei(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function ni(e) {
	return ei(e, "equipped");
}
function ri(e) {
	return ni(e) !== null;
}
function ii(e) {
	let t = $r(e).AP;
	if (!W(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(Qr.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function ai(e) {
	if (!W(e.system) || !W(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function oi(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: ti(e, "equipped"),
		id: e.id,
		name: e.name,
		uuid: e.uuid
	};
	return e.type === "armour" ? {
		...t,
		armourPoints: ii(e),
		type: "armour"
	} : {
		...t,
		offhand: ti(e, "offhand"),
		twoHanded: ti(e, "twohanded"),
		type: "weapon"
	};
}
function si(e, t) {
	return Jr(e.type, oi(e), t);
}
async function ci(e, t, n) {
	let r = oi(t), i = Gr(r, r?.equipped ?? ni(t), n, r?.type === "weapon" ? ai(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function li(e) {
	let t = Kr(oi(e)?.equipped ?? ni(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/report-paper-doll-error.ts
function di(e) {
	return e instanceof Error ? e.message : String(e);
}
function fi(e, n) {
	o(`${t}: ${e}. ${di(n)}`, n);
}
function pi(e, t) {
	e.catch((e) => fi(t, e));
}
//#endregion
//#region src/module/foundry/patches/paper-doll/synchronize-paper-doll.ts
var mi = "fvtt-paper-doll-ui", hi = "slots", gi = /* @__PURE__ */ new Map(), _i = /* @__PURE__ */ new Set();
function vi(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function yi(e) {
	let t = e.getFlag(mi, hi);
	if (t === void 0) return {};
	if (!Ur(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return vi(t);
}
function bi() {
	let e = game?.settings.get(mi, "globalConfig"), t = new Set([...br, ...xr]);
	if (W(e) && Object.keys(e).length === 0) return t;
	if (!W(e) || !W(e.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let n = Object.values(e.SLOTS);
	if (!n.every(W)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let r = new Set(n.flatMap((e) => Object.keys(e)));
	return r.size ? r : t;
}
function xi(e) {
	return gi.has(e.uuid);
}
function Si(e) {
	if (!Xr(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function Ci(e) {
	if (!e || e.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function wi(e) {
	let t = yi(e), n = Array.from(e.items), r = n.map(oi).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: ni(e),
		uuid: e.uuid
	})), o = Rr(t, Pr(r, ai(e)), i, bi(), a);
	return zr(t, o) ? "unchanged" : (await e.setFlag(mi, hi, o), "synchronized");
}
async function K(e) {
	Si(e), Ci(game);
	let t = e;
	if (!G(t) || !t.isOwner || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !C("paperDoll")) return "unavailable";
	let n = gi.get(t.uuid);
	if (n) return await n, K(t);
	let r = wi(t).finally(() => {
		gi.get(t.uuid) === r && gi.delete(t.uuid);
	});
	return gi.set(t.uuid, r), r;
}
function Ti(e) {
	!G(e) || !e.isOwner || _i.has(e.uuid) || (_i.add(e.uuid), queueMicrotask(() => {
		_i.delete(e.uuid), pi(K(e), `could not synchronize equipped items for ${e.uuid}`);
	}));
}
async function Ei() {
	return Ci(game), Promise.all(Array.from(game.actors).filter(G).map(K));
}
//#endregion
//#region src/module/foundry/settings/get-optional-feature-statuses.ts
function Di() {
	return Object.entries(c).map(([e, t]) => ({
		available: l(e),
		enabled: C(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
//#endregion
//#region src/module/functions/integrations/paper-doll-argon/bridge.ts
var Oi = ["TRINKET", "WRIST_RIGHT"];
function ki(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function Ai(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Oi) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(ki)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function ji(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function Mi({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function Ni(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/constants.ts
var Pi = "enhancedcombathud", Fi = e, Ii = "enhancedcombathud-wfrp4e", Li = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", Ri = "modules/enhancedcombathud/icons", zi = [
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
], Bi = [{
	key: "ws",
	icon: `${Ri}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${Ri}/bolt-spell-cast.webp`
}], Vi = [
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
async function Hi() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/module/functions/patches/paper-doll/find-slot-changes.ts
function Ui(e, t, n) {
	return e[t]?.[n] ?? null;
}
function Wi(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = Ui(e, i, a), o = Ui(t, i, a);
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
var Gi = Symbol.for("paper-doll-wfrp4e.equipped-state");
function Ki() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function qi(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function Ji(e) {
	if (!W(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function Yi() {
	return Promise.resolve();
}
function Xi() {
	let e = Ki(), t = e?.equip, n = globalThis.fromUuid;
	if (qi(e, t, n), !n) throw Error("Foundry UUID resolution is unavailable.");
	if (e[Gi] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!Zr(a) || Xr(this.actor) && !G(this.actor)) return r.call(this, e, t, i);
		let o = Ji(i);
		if (!t) return Yi();
		if (!G(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!si(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await ci(this.actor, a, o);
		} catch (e) {
			fi(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await K(this.actor);
			} catch (e) {
				fi(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[Gi] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/enforce-paper-doll-slot-types.ts
var Zi = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function Qi() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function $i(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function ea() {
	let e = Qi(), t = e?.filterItems;
	if ($i(e, t), e[Zi] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => Zr(e) && si(e, t));
	}, e[Zi] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-slot-tooltips.ts
var ta = ".paper-doll .paper-doll-slot", na = `data-${e}-drag-tooltip`, ra = `data-${e}-tooltip`, ia = `data-${e}-original-tooltip`, aa = {
	HEAD: {
		key: `${e}.SlotTooltip.Head`,
		fallback: "Head armour"
	},
	CAPE: {
		key: `${e}.SlotTooltip.Cape`,
		fallback: "Aesthetic Item"
	},
	BODY: {
		key: `${e}.SlotTooltip.Body`,
		fallback: "Body armour"
	},
	GLOVES: {
		key: `${e}.SlotTooltip.Gloves`,
		fallback: "Arm armour"
	},
	BOOTS: {
		key: `${e}.SlotTooltip.Boots`,
		fallback: "Leg armour"
	},
	TRINKET: {
		key: `${e}.SlotTooltip.Trinket`,
		fallback: "Ready Item"
	},
	PENDANT: {
		key: `${e}.SlotTooltip.Pendant`,
		fallback: "Amulet"
	},
	RING: {
		key: `${e}.SlotTooltip.Ring`,
		fallback: "Worn Item"
	},
	WRIST_LEFT: {
		key: `${e}.SlotTooltip.WristLeft`,
		fallback: "Light Source"
	},
	WRIST_RIGHT: {
		key: `${e}.SlotTooltip.WristRight`,
		fallback: "Quick Use Item"
	},
	MAIN_LEFT: {
		key: `${e}.SlotTooltip.MainLeft`,
		fallback: "Main hand"
	},
	MAIN_RIGHT: {
		key: `${e}.SlotTooltip.MainRight`,
		fallback: "Off hand"
	}
}, oa = !1;
function sa(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(ta);
	return t?.closest(".paper-doll") ? t : null;
}
function ca() {
	document.querySelectorAll(`[${ra}]`).forEach((e) => {
		let t = e.getAttribute(ia);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(ra), e.removeAttribute(ia);
	});
}
function la() {
	document.querySelectorAll(ta).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(na, t), e.removeAttribute("data-tooltip"));
	});
}
function ua() {
	document.querySelectorAll(`[${na}]`).forEach((e) => {
		let t = e.getAttribute(na);
		t && (e.dataset.tooltip = t), e.removeAttribute(na);
	});
}
function da(e) {
	if (oa || e.hasAttribute(ra)) return;
	let t = aa[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(ia, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(ra, "");
}
function fa(e) {
	let t = sa(e.target);
	t && da(t);
}
function pa() {
	oa = !0, ca(), la();
}
function ma() {
	oa = !1, ua();
}
function ha() {
	document.addEventListener("pointerover", fa, !0), document.addEventListener("dragstart", pa, !0), document.addEventListener("dragend", ma, !0);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-paper-doll-hooks.ts
var ga = /* @__PURE__ */ new Map();
function _a() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && C("paperDoll");
}
function va(e) {
	if (!W(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!W(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[mi];
	return W(n) ? "slots" in n ? Ur(n.slots) ? {
		kind: "valid",
		state: n[hi]
	} : {
		kind: "malformed",
		reason: "the Paper Doll slots update has an invalid shape"
	} : { kind: "absent" } : {
		kind: "malformed",
		reason: "the Paper Doll flag update is not an object"
	};
}
function ya(e) {
	let t = va(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function ba(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function xa(e, t) {
	let n = ga.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), ga.set(e.uuid, n);
}
function Sa(e) {
	if (!W(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function Ca(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (fi(n, AggregateError(r, n)), await K(e));
}
function wa(e, t, n) {
	if (!_a() || !G(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!W(i) || typeof i.item != "string") continue;
		let t = Sa(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = ba(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!si(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(ci(e, n, t));
	}
	r.length && pi(Ca(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function Ta(e, t) {
	if (!_a() || !G(e) || xi(e)) return;
	let n = ya(t);
	if (!n) return;
	let r = e.getFlag(mi, hi);
	if (r !== void 0) {
		if (!Ur(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of Wi(r, n)) {
			if (!t.from) continue;
			let n = ba(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && xa(e, n.uuid);
		}
	}
}
function Ea(e, t) {
	if (!_a() || !G(e) || !ya(t)) return;
	let n = ga.get(e.uuid);
	ga.delete(e.uuid), n?.size && pi(Ca(e, Array.from(n, (t) => {
		let n = ba(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(li), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function Da(e) {
	!_a() || !Zr(e) || e.type !== "armour" && e.type !== "weapon" && !ri(e) || G(e.parent) && Ti(e.parent);
}
function Oa() {
	ha(), Hooks.on("paper-doll-swap", wa), Hooks.on("preUpdateActor", Ta), Hooks.on("updateActor", Ea), Hooks.on("updateItem", Da), Hooks.once("ready", () => {
		if (_a()) {
			try {
				ea(), Xi();
			} catch (e) {
				throw fi("could not initialize the required Paper Doll integration", e), e;
			}
			pi(Ei(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/fvtt-paper-doll-ui/register-integration.ts
var ka = "fvtt-paper-doll-ui";
function Aa() {
	s("fvtt-paper-doll-ui") && C("paperDoll") && Oa();
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/bridge-runtime.ts
var ja = "activeWeaponSet", Ma = "slots", Na = "weaponSets";
function Pa(e) {
	let t = e.getFlag(ka, Ma);
	if (t === void 0) return {};
	if (!Ur(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function Fa(e) {
	let t = e.getFlag(Pi, ja);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function Ia(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function La(e) {
	let t = e.getFlag(Pi, Na);
	if (t === void 0) return {};
	if (!W(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !W(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: Ia(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: Ia(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function Ra(e, t) {
	let n = La(e), r = Mi({
		activeSetId: Fa(e),
		mainHand: ai(e),
		mainSlots: ji(t),
		weaponSets: n
	}), i = !Ni(n, r);
	return i && await e.setFlag(Pi, Na, r), await Hi(), i ? "synchronized" : "unchanged";
}
function za(e) {
	if (!Xr(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return Ai(Pa(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function Ba(e) {
	if (!W(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!W(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[ka];
	if (!W(n) || !(Ma in n)) return null;
	let r = n[Ma];
	if (!Ur(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function Va(e) {
	if (!Xr(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return G(e) ? e.isOwner ? !C("paperDoll") || !C("argonCombatHud") || !C("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", Ma) === void 0 ? (await Hi(), "unchanged") : Ra(e, Pa(e)) : (await Hi(), "unavailable") : "unavailable";
}
//#endregion
//#region src/module/foundry/integrations/splatter/configure-splatter.ts
async function Ha() {
	let e = Nn(yn);
	return await Kn(e), {
		automaticBloodColors: game?.settings.get(yn, "useBloodsheet") === !0,
		bloodColorCount: Object.keys(game?.settings.get(yn, bn)).length,
		speciesPath: e.values.creatureType
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/configuration.ts
function Ua(e) {
	return game?.i18n.localize(`wfrp4e-compatibility-box.BossBar.${e}`) ?? e;
}
function Wa(t) {
	console.error(`${e} | Boss Bar integration failed.`, t), ui?.notifications?.error(Ua("Error"));
}
function Ga() {
	return {
		currentHpPath: game?.settings.get(u, "currentHpPath"),
		maxHpPath: game?.settings.get(u, "maxHpPath"),
		woundsSystem: game?.settings.get(u, "woundsSystem")
	};
}
async function Ka() {
	return await Kn(Nn(u)), ui?.notifications?.info(Ua("Configured")), Ga();
}
//#endregion
//#region src/module/wfrp/folders/queue.ts
var qa = /* @__PURE__ */ new WeakMap();
async function Ja(e, t) {
	let n = (qa.get(e) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		let e = globalThis.navigator?.locks;
		e ? await e.request("foundry:folder-tidy", t) : await t();
	});
	qa.set(e, n);
	try {
		await n;
	} finally {
		qa.get(e) === n && qa.delete(e);
	}
}
//#endregion
//#region src/module/wfrp/folders/merge.ts
async function Ya(e, t, n, r) {
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
function Xa(e, t) {
	return e.startsWith("wfrp4e-") && [...t].some((e) => /cubicle\s*7/i.test(e.name));
}
function Za(e, t, n) {
	let r = e["warhammer-lib"], i = e.core, a = [
		r?.source,
		e.source,
		t?.startsWith("Compendium.") ? t.split(".")[1] : void 0,
		i?.sourceId?.startsWith("Compendium.") ? i.sourceId.split(".")[1] : void 0
	];
	for (let [t, n] of Object.entries(e)) n && typeof n == "object" && "initialization-folder" in n && a.push(t);
	return a.find((e) => typeof e == "string" && n.has(e));
}
function Qa(e, t) {
	if (t < 1) throw Error("WFRP folders need at least one available level.");
	return e.length <= t ? [...e] : [...e.slice(0, t - 1), e.slice(t - 1).join("/")];
}
function $a(e, t, n, r) {
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
	}, p = /* @__PURE__ */ new Set();
	for (let t of d) {
		let i = e.map((e) => ({
			folder: e,
			path: a(e.id)
		})).filter(({ path: e }) => e.some((e) => e.id === t.id)).map(({ folder: e, path: n }) => ({
			folder: e,
			path: n.slice(n.findIndex((e) => e.id === t.id))
		})).sort((e, t) => t.path.length - e.path.length);
		for (let { folder: e, path: t } of i) {
			p.add(e.id);
			let i = Qa(t.map((e) => e.name), r - 1).at(-1), a = t.length === 1 || r === 2 ? n : t[Math.min(t.length - 2, r - 3)].id;
			(e.parent !== a || e.name !== i) && f.folders.push({
				id: e.id,
				parent: a,
				name: i
			});
		}
	}
	for (let e of t) {
		if (!e.official || o(e.parent) || e.parent && p.has(e.parent)) continue;
		let t = a(e.parent).map((e) => e.name);
		f.entries.push({
			id: e.id,
			path: Qa(t.length ? t : e.fallbackPath ?? [e.fallback], r - 1)
		});
	}
	return f;
}
var eo = ["keepWfrpImportedContentTidy", "keepWfrpCompendiumsTidy"];
function to(t) {
	if (!game?.user) throw Error("Foundry user is unavailable during WFRP setting registration.");
	for (let n of eo) game.settings.register(e, n, {
		name: `${e}.Settings.WfrpFolders.${n}.Name`,
		hint: `${e}.Settings.WfrpFolders.${n}.Hint`,
		config: !1,
		default: !0,
		scope: "world",
		type: Boolean,
		onChange: t
	});
}
//#endregion
//#region src/module/wfrp/folders/migration.ts
var no = "whence-they-hang";
async function ro(t) {
	if (!t.ready || !t.user?.isGM) return;
	let n = t.settings.storage.get("world");
	if (!n) throw Error("World settings storage is unavailable during WFRP migration.");
	for (let r of eo) {
		if (n.getSetting(`wfrp4e-compatibility-box.${r}`)) continue;
		let i = n.getSetting(`${no}.${r}`)?.value;
		typeof i == "boolean" && await t.settings.set(e, r, i);
	}
}
//#endregion
//#region src/module/functions/wfrp/folder-defaults.ts
function q(e) {
	return e.replace(/^(?:WFRP(?:4e|5e)?|Warhammer Fantasy Roleplay)\s*[-–—:]\s*/i, "");
}
function io(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let [r, i] of e) {
		let e = (i, a) => {
			let o = q(i.name), s = [...a, o];
			i.color != null && t.set(o, i.color.toString());
			for (let e of i.packs ?? []) n.set(`${r}.${e}`, s);
			for (let t of i.folders ?? []) e(t, s);
		};
		for (let t of i) e(t, []);
	}
	return {
		colors: t,
		packPaths: n
	};
}
//#endregion
//#region src/module/wfrp/folders/tidy.ts
var ao = "__wfrp_tidy_root__", oo = "Warhammer Fantasy Roleplay";
async function so(e, t) {
	await Ja(e, () => co(e, t));
}
async function co(e, t) {
	if (!e.ready || !e.user?.isGM || e.system.id !== "wfrp4e") return;
	await ro(e);
	let n = new Set([...e.modules.entries()].filter(([e, t]) => Xa(e, t.authors ?? [])).map(([e]) => e));
	n.add("wfrp4e");
	let r = (e) => Za(e.flags ?? {}, e._stats?.compendiumSource, n), i = new Map([...e.modules.entries()].map(([e, t]) => [e, t.title ?? e])), a = io([["wfrp4e", e.system.packFolders ?? []], ...[...e.modules.entries()].filter(([e]) => n.has(e)).map(([e, t]) => [e, t.packFolders ?? []])]), o = async (n, o) => {
		let s = [...e.folders].filter((e) => e.type === n), c = new Set([...s, ...o].map((e) => e.folder?.id)), l = s.filter((e) => !e.folder && (e.name === oo || e.name === "WFRP")).sort((e, t) => Number(c.has(t.id)) - Number(c.has(e.id)) || e.id.localeCompare(t.id)), u = l[0];
		await Ya(l, s, o, (e) => !!r(e)), u && u.name !== oo && await u.update({ name: oo });
		let d = $a(s.map((e) => ({
			id: e.id,
			name: e.name,
			parent: e.folder?.id ?? null,
			official: !!r(e)
		})), o.map((e) => ({
			id: e.id,
			parent: e.folder?.id ?? null,
			official: !!r(e),
			fallback: q(i.get(r(e)) ?? "Content"),
			fallbackPath: n === "Compendium" ? a.packPaths.get(e.id) : void 0
		})), u?.id ?? ao, t);
		if (!u && !d.folders.length && !d.entries.length) return;
		let f = async (e, t, r) => {
			let i = await CONFIG.Folder.documentClass.create({
				name: e,
				type: n,
				folder: t,
				sorting: "a",
				...r ? { color: r } : {}
			});
			if (!i) throw Error(`Could not create ${n} folder ${e}.`);
			return s.push(i), i;
		};
		u ??= await f(oo, null);
		for (let e of d.folders) await s.find((t) => t.id === e.id).update({
			name: e.name,
			folder: e.parent === ao ? u.id : e.parent
		});
		for (let e of d.entries) {
			let n = u, r = o.find((t) => t.id === e.id), i = /* @__PURE__ */ new Map(), c = [];
			for (let e = r.folder; e; e = e.folder) c.unshift(e);
			for (let [e, n] of c.entries()) {
				let r = Qa(c.slice(0, e + 1).map((e) => e.name), t - 1).at(-1);
				n.color != null && i.set(q(r), n.color.toString());
			}
			for (let t of e.path) {
				let e = s.filter((e) => q(e.name) === q(t) && e.folder?.id === n.id).sort((e, t) => e.id.localeCompare(t.id)), r = q(t);
				n = e[0] ?? await f(r, n.id, a.colors.get(r) ?? i.get(r));
			}
			await r.update({ folder: n.id });
		}
		let p = async (e) => {
			for (let t of s.filter((t) => t.folder?.id === e.id)) {
				let e = q(t.name), n = a.colors.get(e), r = {};
				e !== t.name && (r.name = e), n && n.toLowerCase() !== t.color?.toString().toLowerCase() && (r.color = n), Object.keys(r).length && await t.update(r), await p(t);
			}
		};
		await p(u), await Ya([u], s, o, (e) => !!r(e));
	};
	if (e.settings.get("wfrp4e-compatibility-box", "keepWfrpImportedContentTidy")) for (let [t, n] of e.collections.entries()) t === "Folder" || !n.documentClass.schema.has("folder") || await o(t, [...n]);
	e.settings.get("wfrp4e-compatibility-box", "keepWfrpCompendiumsTidy") && await o("Compendium", [...e.packs.entries()].map(([t, n]) => ({
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
async function lo() {
	game && await so(game, CONST.FOLDER_MAX_DEPTH);
}
//#endregion
//#region src/module/functions/folders/empty.ts
function uo(e, t) {
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
function fo() {
	if (!game?.ready || !game.user?.isGM) throw Error("Only a GM in a loaded world can purge folders.");
	return game;
}
async function po(e) {
	let t = fo();
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
		candidates: n.flatMap((e) => uo(e.folders().map((e) => ({
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
async function mo(e) {
	let t = fo(), n = {
		deleted: 0,
		skipped: 0
	};
	return await Ja(t, async () => {
		for (let t of e.candidates) {
			fo();
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
var ho = "Purge Empty Folders";
function go(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
async function _o() {
	if (!game?.ready || !game.user?.isGM) {
		ui?.notifications?.warn("Only a GM in a loaded world can purge empty folders.");
		return;
	}
	try {
		let e = await foundry.applications.api.DialogV2.wait({
			window: { title: ho },
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
		let t = await po(e), n = t.skippedPacks ? ` Skipped ${t.skippedPacks} locked packs.` : "";
		if (!t.candidates.length) {
			ui?.notifications?.info(`No empty folders found.${n}`);
			return;
		}
		let r = t.candidates.map(({ group: e, name: t }) => `<li>${go(e.label)}: ${go(t)}</li>`).join("");
		if (await foundry.applications.api.DialogV2.wait({
			window: { title: ho },
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
		let i = await mo(t);
		ui?.notifications?.info(`Removed ${i.deleted} empty folders. Skipped ${i.skipped} folders that changed.${n}`);
	} catch (e) {
		o(`${ho} stopped. Some folders may already have been removed. See the console for details.`, e);
	}
}
//#endregion
//#region src/module/foundry/diagnostics/startup-report.ts
var vo = {
	rollModes: ["Roll-mode configuration", "wfrp4e"],
	migrationReturns: ["Actor/Item migration returns", "wfrp4e"],
	effectSchema: ["Active Effect changes schema", "wfrp4e"],
	orphanedChat: ["Orphaned chat-card fallback", "wfrp4e"],
	actorlessRuler: ["Actorless-token ruler guard", "wfrp4e"],
	dualWielder: ["Dual Wielder turn-start cleanup", "wfrp4e"],
	scenePacker: ["MAD prefab exclusions", "scene-packer"],
	forgeOwner: ["Forge world-owner detection", "fa-nexus"],
	simpleQuestBox: ["Boxed Text editor preservation", "simple-quest"],
	simpleQuestContent: ["Empty-page template insertion", "simple-quest"],
	argonLegacy: ["Argon legacy module check", "enhancedcombathud"],
	imageContext: ["Token HUD condition image-menu exclusion", "image-context"]
}, yo = /* @__PURE__ */ new Map(), bo = [];
function xo() {
	yo.clear(), bo.length = 0;
}
function J(e, t, n) {
	yo.set(e, {
		status: t,
		detail: n
	});
}
function Y(t, n, r, i) {
	try {
		n() ? J(t, "applied", r) : yo.get(t)?.status !== "applied" && J(t, i.status, i.detail);
	} catch (n) {
		J(t, "failed", n instanceof Error ? n.message : String(n)), console.error(`${e} | ${vo[t][0]} could not initialize.`, n);
	}
}
function So(t, n) {
	bo.push(n.catch((n) => {
		J(t, "failed", n instanceof Error ? n.message : String(n)), console.error(`${e} | ${vo[t][0]} startup task failed.`, n);
	}));
}
function Co() {
	return {
		foundryVersion: game?.version ?? "unknown",
		systemId: game?.system.id ?? "unknown",
		systemVersion: game?.system.version ?? "unknown",
		fixes: Object.entries(vo).map(([e, [t, n]]) => ({
			id: e,
			label: t,
			packageId: n,
			version: (n === game?.system.id ? game.system.version : game?.modules.get(n)?.version) ?? "not installed",
			...yo.get(e) ?? {
				status: "pending",
				detail: "Installation has not reported a result yet."
			}
		}))
	};
}
async function wo() {
	await Promise.allSettled(bo);
	for (let e of Object.keys(vo)) yo.has(e) || J(e, "unavailable", "The startup registration did not report a result.");
	let t = Co();
	console.groupCollapsed(`${e} | Startup fixes | Foundry ${t.foundryVersion}, ${t.systemId} ${t.systemVersion}`), console.table(t.fixes.map(({ label: e, version: t, status: n, detail: r }) => ({
		fix: e,
		version: t,
		status: n,
		detail: r
	}))), console.groupEnd();
	let n = t.fixes.filter((e) => [
		"unsupported",
		"unavailable",
		"failed"
	].includes(e.status));
	n.length && game?.user?.isGM && ui?.notifications?.warn(`Compatibility Box: ${n.length} startup fix${n.length === 1 ? " needs" : "es need"} attention. Open Game Settings → Compatibility Box → Startup Fix Report for details.`);
}
//#endregion
//#region src/module/foundry/diagnostics/register-diagnostics.ts
var To = {
	applied: "Applied",
	"not-needed": "Not needed",
	inactive: "Inactive",
	unsupported: "Unsupported version",
	unavailable: "Unavailable API",
	failed: "Failed",
	pending: "Pending"
};
async function Eo() {
	if (!game?.ready || !game.user?.isGM) {
		ui?.notifications?.warn("Only a GM in a loaded world can open the startup fix report.");
		return;
	}
	let e = Co(), t = foundry.utils.escapeHTML, n = e.fixes.map((e) => `<tr><td>${t(e.label)}<br><small>${t(e.packageId)} ${t(e.version)}</small></td><td>${To[e.status]}</td><td>${t(e.detail)}</td></tr>`).join("");
	await foundry.applications.api.DialogV2.wait({
		window: { title: "Compatibility Box — Startup Fix Report" },
		position: { width: 850 },
		content: `<p>Foundry ${t(e.foundryVersion)} · ${t(e.systemId)} ${t(e.systemVersion)}</p><p>Applied means the patch or guard was installed on this client. It does not mean an affected document was found or repaired. This report covers automatic bug fixes, including Argon's legacy check; optional feature switches and preset choices are separate.</p><div class="scrollable" style="max-height:55vh"><table><thead><tr><th>Fix / package</th><th>Status</th><th>Reason</th></tr></thead><tbody>${n}</tbody></table></div>`,
		buttons: [{
			action: "close",
			label: "Close",
			default: !0
		}],
		rejectClose: !1
	});
}
function Do() {
	xo(), Hooks.once("setup", () => {
		h("world", "startupFixReport", {
			name: "Startup compatibility fixes",
			label: "Startup Fix Report",
			hint: "Review applied fixes, upstream corrections, unsupported versions, and missing APIs on this client.",
			icon: "fa-solid fa-clipboard-check",
			restricted: !0,
			type: class extends foundry.applications.api.ApplicationV2 {
				async render() {
					return await Eo(), this;
				}
			}
		});
	}), Hooks.once("ready", wo);
}
//#endregion
//#region src/module/foundry/api/create-module-api.ts
function Oo() {
	return {
		getStartupReport: Co,
		reviewCalendarMigration: zt,
		showStartupReport: Eo,
		importCalendarContent: bt,
		reviewCalendarContent: Vt,
		settingsPresets: lr,
		settingsPresetCoordinator: _r,
		configureBossBar: Ka,
		configureSplatter: Ha,
		purgeEmptyFolders: _o,
		getOptionalFeatures: Di,
		syncAllPaperDollActors: Ei,
		syncPaperDollArgonActor: Va,
		syncPaperDollActor: K,
		tidyWfrpContent: lo
	};
}
//#endregion
//#region src/module/foundry/api/register-module-api.ts
function ko() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	let n = t;
	n.api = Oo();
}
//#endregion
//#region src/module/functions/integrations/bossbar/selection.ts
function Ao(e) {
	let t = e.filter((e) => e.enemy), n = (e, t) => e.traits.some((e) => e.trim().toLowerCase() === t), r = t.filter((e) => n(e, "boss"));
	if (r.length) return r;
	let i = t.filter((e) => e.maxWounds >= 30 && n(e, "grim") && (n(e, "leader") || n(e, "champion"))).sort((e, t) => t.maxWounds - e.maxWounds || t.weaponSkill - e.weaponSkill || t.strength - e.strength), a = i[0];
	if (!a) return [];
	let o = i.filter((e) => e.maxWounds === a.maxWounds && e.weaponSkill === a.weaponSkill && e.strength === a.strength);
	return o.length <= 2 ? o : [];
}
//#endregion
//#region src/module/functions/integrations/bossbar/health.ts
var jo = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
};
function Mo(e) {
	return Object.entries(jo).every(([t, n]) => e[t] === n);
}
function No(e, t) {
	return !Number.isFinite(e) || !Number.isFinite(t) || t <= 0 ? 0 : Math.min(100, Math.max(0, 100 * e / t));
}
function Po(e) {
	let t = Number.isFinite(e.maxCriticals) ? Math.max(0, Math.floor(e.maxCriticals)) : 0;
	return {
		max: t,
		remaining: Math.max(0, t - Math.max(0, e.criticals))
	};
}
function Fo(e) {
	return (typeof e == "number" || typeof e == "string" && e.trim() !== "") && Number.isFinite(Number(e));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/runtime.ts
function Io() {
	return ui && Reflect.get(ui, "bossBar");
}
function Lo(e) {
	return Array.from(e.combatants).flatMap(({ actor: e, token: t }) => e ? [{
		uuid: e.uuid,
		enemy: t?.disposition === -1 && !e.hasPlayerOwner,
		traits: Array.from(e.items).filter((e) => e.type === "trait").map((e) => e.name),
		maxWounds: e.system.status?.wounds?.max ?? 0,
		weaponSkill: e.system.characteristics?.ws?.value ?? 0,
		strength: e.system.characteristics?.s?.value ?? 0
	}] : []);
}
function Ro(e) {
	return {
		wounds: e.system.status?.wounds?.value ?? 0,
		maxWounds: e.system.status?.wounds?.max ?? 0,
		maxCriticals: e.system.status?.criticalWounds?.max ?? 0,
		criticals: Array.from(e.items).filter((e) => e.type === "critical" && Fo(e.system?.wounds?.value)).length
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/combat.ts
var zo = /* @__PURE__ */ new WeakSet();
async function Bo(e) {
	if (!game?.user?.isGM || game.system.id !== "wfrp4e" || !s("bossbar") || !game.settings.get("wfrp4e-compatibility-box", d.automatic) || !e.scene || zo.has(e)) return;
	let t = Ao(Lo(e)), n = e.scene.getFlag("bossbar", "actors") ?? [], r = new Set(n.map((e) => e.uuid)), i = game.settings.get(u, "barStyles"), a = t.filter((e) => r.has(e.uuid) ? !1 : (r.add(e.uuid), !0)).map((e) => ({
		uuid: e.uuid,
		style: i[0]?.id ?? "default",
		hideName: !1
	}));
	if (a.length) {
		zo.add(e);
		try {
			await e.scene.setFlag(u, "actors", [...n, ...a]);
		} finally {
			zo.delete(e);
		}
	}
}
//#endregion
//#region src/module/foundry/integrations/bossbar/critical-segments.ts
var Vo = "wfrp-bossbar-segments", Ho = "http://www.w3.org/2000/svg", Uo = [
	"background",
	"bar",
	"foreground"
], Wo = [
	"bg",
	"bar",
	"fg"
];
function Go(e, t) {
	let n = Uo.map((t) => e.querySelector(`:scope > .bar-${t}`)), r = n.map((e) => e?.querySelector(":scope > img")), i = r.every((e, t) => e?.getAttribute("src")?.split(/[?#]/)[0]?.endsWith(`/bossbar/resources/matching-images/segmented/${Wo[t]}.png`)), a = t !== void 0 && i ? String(t) : void 0;
	if (e.dataset.wfrpBossbarSegments === a) return;
	e.querySelectorAll(`.${Vo}`).forEach((e) => e.remove()), e.classList.toggle("wfrp-bossbar-segmented", a !== void 0);
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
		o.className = Vo, o.setAttribute("aria-hidden", "true"), o.style.gridTemplateColumns = a === "0" ? "none" : `repeat(${a}, minmax(0, 1fr))`;
		for (let t = 0; t < Number(a); t++) o.append(Ko(e.ownerDocument, n.src));
		i.append(o);
	}
}
function Ko(e, t) {
	let n = e.createElementNS(Ho, "svg");
	n.setAttribute("viewBox", "829 0 787 361"), n.setAttribute("preserveAspectRatio", "xMidYMid meet");
	let r = e.createElementNS(Ho, "image");
	return r.setAttribute("href", t), r.setAttribute("width", "7967"), r.setAttribute("height", "361"), n.append(r), n;
}
//#endregion
//#region src/module/foundry/integrations/bossbar/wounds-bar.ts
function qo(e, t) {
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
function Jo(e, t) {
	return e.find((e) => e.id === t) ?? e[0];
}
//#endregion
//#region src/module/foundry/integrations/bossbar/display.ts
var Yo = "wfrp4e-compatibility-box-bossbar";
function Xo(t = Io()) {
	if (!t?.element || t.id !== "boss-bar") return;
	let n = t.element;
	n.classList.toggle("wfrp4e-compatibility-box-bossbar-frameless", game?.settings.get(e, d.frameless) === !0);
	let r = rn() && game?.settings.get("wfrp4e-compatibility-box", d.stacked) === !0 && Mo(Ga());
	if (!r && !n.classList.contains(Yo)) return;
	let i = game?.settings.get(u, "barStyles"), a = game?.settings.get(e, d.woundsStyle), o = Jo(i, a);
	n.classList.toggle(Yo, r && !!o);
	for (let e of n.querySelectorAll(".bar-list-item")) {
		let n = t.bars.find((t) => t.actor.uuid === e.dataset.uuid)?.actor;
		if (!n) continue;
		let i = e.querySelector(".boss-bar-container:not(.wfrp-bossbar-wounds)");
		if (!i) continue;
		if (!r || !o) {
			Go(i), e.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), i.dataset.wfrpBossbarPrimary && (i.style.removeProperty("--bar-percent"), i.removeAttribute("role"), i.removeAttribute("aria-label"), i.removeAttribute("aria-valuenow"), i.removeAttribute("aria-valuemax"), i.removeAttribute("aria-valuemin"), delete i.dataset.wfrpBossbarPrimary);
			continue;
		}
		let a = Ro(n), s = Po(a);
		Go(i, s.max), i.dataset.wfrpBossbarPrimary = "true", i.style.setProperty("--bar-percent", `${No(s.remaining, s.max)}%`), Zo(i, Ua("CriticalCapacity"), s.remaining, s.max);
		let c = e.querySelector(".wfrp-bossbar-wounds");
		c?.dataset.style !== o.id && (e.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), c = qo(e.ownerDocument, o), c.dataset.wfrpBossbarExtra = "", c.dataset.style = o.id, i.before(c)), c && (c.style.setProperty("--bar-percent", `${No(a.wounds, a.maxWounds)}%`), c.classList.toggle("wfrp-bossbar-threat", a.wounds <= 0), Zo(c, Ua("Wounds"), Math.max(0, a.wounds), a.maxWounds));
	}
}
function Zo(e, t, n, r) {
	e.setAttribute("role", "progressbar"), e.setAttribute("aria-label", t), e.setAttribute("aria-valuemin", "0"), e.setAttribute("aria-valuemax", String(Math.max(0, r))), e.setAttribute("aria-valuenow", String(Math.min(n, Math.max(0, r))));
}
var Qo = !1;
function $o() {
	Qo || (Qo = !0, queueMicrotask(() => {
		Qo = !1;
		let e = Io();
		if (e?.element?.isConnected) try {
			(game?.settings.get("wfrp4e-compatibility-box", d.stacked) === !0 || e.element.classList.contains(Yo)) && e.updateBars(), Xo(e);
		} catch (e) {
			Wa(e);
		}
	}));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/settings.ts
function es() {
	if (!game) return;
	let t = {
		automatic: tn("bossBarAutomatic") !== !1,
		frameless: !0,
		stacked: tn("bossBarStacked") !== !1
	}, n = nn();
	for (let r of f) game.settings.register(e, d[r], {
		name: `${e}.BossBar.Settings.${r}.Name`,
		hint: `${e}.BossBar.Settings.${r}.Hint`,
		config: !1,
		default: !n && t[r],
		scope: "world",
		type: Boolean
	});
	game.settings.register(e, d.woundsStyle, {
		name: `${e}.BossBar.Settings.woundsStyle.Name`,
		hint: `${e}.BossBar.Settings.woundsStyle.Hint`,
		config: !1,
		default: "default-grass",
		scope: "world",
		type: String,
		choices: () => Object.fromEntries((game?.settings.get(u, "barStyles")).map((e) => [e.id, e.name]))
	});
}
function ts(e) {
	if (!game?.user?.isGM || !C("bossBar")) return;
	let t = e.querySelector(`[name="${u}.currentHpPath"]`)?.closest(".form-group");
	if (!t || e.querySelector("[data-wfrp-bossbar-setup]")) return;
	let n = e.ownerDocument.createElement("div");
	n.className = "form-group", n.dataset.wfrpBossbarSetup = "";
	let r = e.ownerDocument.createElement("button");
	r.type = "button", r.textContent = Ua("Configure"), r.addEventListener("click", async () => {
		r.disabled = !0;
		try {
			let t = await Ka();
			for (let [n, r] of Object.entries(t)) {
				let t = e.querySelector(`[name="bossbar.${n}"]`);
				t && (typeof r == "boolean" ? t.checked = r : t.value = r);
			}
		} catch (e) {
			Wa(e);
		} finally {
			r.disabled = !1;
		}
	}), n.append(r), t.insertAdjacentElement("beforebegin", n);
}
//#endregion
//#region src/module/foundry/integrations/bossbar/register-integration.ts
function ns() {
	if (!(game?.system.id !== "wfrp4e" || !s("bossbar"))) {
		es(), Hooks.on("combatStart", (e) => void Bo(e).catch(Wa)), Hooks.on("renderBossBar", (e) => Xo(e)), Hooks.on("renderSettingsConfig", (e, t) => {
			t instanceof HTMLElement && ts(t);
		});
		for (let e of [
			"updateActor",
			"createItem",
			"updateItem",
			"deleteItem",
			"createActiveEffect",
			"updateActiveEffect",
			"deleteActiveEffect"
		]) Hooks.on(e, $o);
		Hooks.on("updateSetting", (e) => {
			let t = e.key;
			[
				"bossbar.currentHpPath",
				"bossbar.maxHpPath",
				"bossbar.woundsSystem"
			].includes(t) && game?.settings.get("wfrp4e-compatibility-box", d.stacked) === !0 && Io()?.render(!0).catch(Wa), (t.startsWith("bossbar.") || t.startsWith("wfrp4e-compatibility-box.bossBar") || t === "wfrp4e.uiaCrits") && $o();
		});
	}
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/argon-logic.ts
var rs = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function is(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function as(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function os(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function ss(e) {
	return e.trim().toLowerCase();
}
function cs(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function ls(e) {
	return e.type === "trait" ? (os(e), e.rollable && !e.disabled && rs.has(e.traitBaseName.toLowerCase())) : !1;
}
function us(e) {
	return e.type === "weapon" || ls(e);
}
function ds(e) {
	return e.type === "weapon";
}
function fs(e) {
	return is(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function ps(e) {
	return is(e), e.advances > 0;
}
function ms(e, t) {
	return e.forEach(is), t === "basic" ? e.filter((e) => !fs(e)).map((e) => e.id) : t === "advanced" ? e.filter(fs).map((e) => e.id) : t === "trained" ? e.filter(ps).map((e) => e.id) : e.map((e) => e.id);
}
function hs(e, t) {
	return e.forEach(as), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function gs(e) {
	return e.filter((e) => e.type === "weapon" || ls(e)).map((e) => e.id);
}
function _s(e) {
	return e.filter((e) => e.type === "trait" ? (os(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function vs(e, t) {
	return e.forEach(is), t.flatMap((t) => {
		let n = ss(t.name), r = e.find((e) => ss(e.name) === n);
		return !r || t.trained && !ps(r) ? [] : [r.id];
	});
}
function ys(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function bs(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function xs(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => bs(e.name, t))).map((e) => e.id) : [];
}
function Ss(e) {
	let t = [];
	return (e.type === "weapon" || ls(e)) && t.push({
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
function Cs(e, t) {
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
var ws = "argonCombatItemPatterns", Ts = "*Draught*, *Potion*";
function X(t, n) {
	let r = c[n];
	!r.settingKey || !l(n) || t.register(e, r.settingKey, {
		config: !1,
		default: !0,
		hint: `${e}.Settings.Features.${n}.Hint`,
		name: `${e}.Settings.Features.${n}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function Es(t) {
	l("argonCombatHud") && t.register(e, ws, {
		config: !1,
		default: Ts,
		hint: `${e}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${e}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: Hi,
		scope: "world",
		type: String
	});
}
function Ds() {
	if (!game) throw Error(`${e} | Foundry game is unavailable during settings registration.`);
	X(game.settings, "argonCombatHud"), X(game.settings, "healthEstimate"), X(game.settings, "paperDoll"), X(game.settings, "paperDollArgonBridge"), X(game.settings, "simpleCalendar"), X(game.settings, "simpleTimekeeping"), Es(game.settings);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/actor-flags.ts
var Os = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function ks(e, t) {
	return e.flags?.[Ii]?.[t];
}
function As(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? ks(e, t);
}
async function js(t) {
	let n = {};
	for (let r of Os) {
		if (t.getFlag("wfrp4e-compatibility-box", r) !== void 0) continue;
		let i = ks(t, r);
		i !== void 0 && (n[`flags.${e}.${r}`] = i);
	}
	Object.keys(n).length && await t.update(n);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/argon-helpers.ts
function Ms(t, n) {
	if (typeof t != "object" || !t) throw Error(`${e} | ${n} must be an object.`);
	return t;
}
function Z(t, n) {
	if (typeof t != "string" || !t.trim()) throw Error(`${e} | ${n} must be a non-empty string.`);
	return t;
}
function Ns(t, n) {
	if (typeof t != "boolean") throw Error(`${e} | ${n} must be a boolean.`);
	return t;
}
function Ps(t, n) {
	if (!Number.isNumeric(t)) throw Error(`${e} | ${n} must be numeric.`);
	return Number(t);
}
function Fs(e) {
	return e == null || e === "" ? null : Ps(e, "item quantity");
}
function Is(t, n, r, i) {
	let a = As(t, n);
	if (a === void 0) return i;
	if (!r.includes(a)) throw Error(`${e} | Argon actor flag ${Fi}.${n} has invalid value ${String(a)}.`);
	return a;
}
function Ls(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = Ns(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function Rs(e, t = !1) {
	let n = Ms(e, "Argon item"), r = Z(n.type, "Argon item type"), i = Z(n.name, `${r} item name`), a = {
		id: Z(n.id, `${r} ${i} id`),
		name: i,
		quantity: Fs(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = Z(n.advanced?.value, `${i} advanced classification`), a.grouped = Z(n.grouped?.value, `${i} grouped classification`), a.advances = Ps(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = Z(n.lore?.value, `${i} lore`), a.memorized = Ns(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = Ns(n.system?.disabled, `${i} disabled state`), a.rollable = Ns(n.rollable?.value, `${i} rollable state`), a.traitBaseName = cs(i)), t && Ls(a, n, r), a;
}
function zs(e) {
	return [...e].map((e) => Rs(e));
}
function Bs(t, n) {
	let r = new Map([...t].map((e) => [e.id, e]));
	return n.map((t) => {
		let n = r.get(t);
		if (!n) throw Error(`${e} | Selected Argon item ${t} is no longer available.`);
		return n;
	});
}
function Vs(e) {
	return Ss(Rs(e, !0));
}
function Hs(e) {
	let t = Is(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return Bs(n, ms(zs(n), t));
}
function Us(e) {
	let t = Is(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return Bs(n, hs(zs(n), t));
}
function Ws(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return Bs(t, gs(zs(t)));
}
function Gs(e) {
	let t = [...e.itemTypes.trait];
	return Bs(t, _s(zs(t)));
}
function Ks(e) {
	let t = Bi.map((e) => ({
		...e,
		type: "characteristic"
	})), n = Vi.map((e) => ({
		name: qs(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = Bs(r, vs(zs(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function qs({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = Qs(`NAME.${e}`, t);
	return n ? `${i} (${Qs(n, r)})` : i;
}
function Js(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = ys(String(t)), r = [...e.items];
	return Bs(r, xs(zs(r), n));
}
function Ys(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function Xs(e) {
	return us(Rs(e));
}
function Zs(e) {
	return ds(Rs(e));
}
function Qs(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/buttons.ts
function $s(e) {
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
				details: Vs(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = Ys(this.item);
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
			let e = Us(this.actor), t = Ws(this.actor), s = Gs(this.actor), c = Ks(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = Js(this.actor), u = [
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
				icon: `${Ri}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${Ri}/drink-me.webp`,
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
function ec() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!C("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/movement.ts
function tc(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function nc(e, t, n) {
	tc(e, "move score"), tc(t, "maximum distance"), tc(n, "used distance");
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
function rc(e) {
	return tc(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/panels.ts
function ic(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function ac(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function oc(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return Li;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await js(this.actor), await super._onConfigure(e);
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
			let e = zi.map((e) => {
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
			}), n = Hs(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return ic(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return ic(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return ac(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += ic(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = nc(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${rc(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${rc(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: rc(t.bubbleDistance),
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
function sc(t) {
	let n = t.ARGON;
	class r extends n.WeaponSets {
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
		async _onDrop(t) {
			t.preventDefault(), t.stopPropagation();
			let n = JSON.parse(t.dataTransfer.getData("text/plain"));
			if (n.type !== "Item") return;
			let r = await fromUuid(n.uuid);
			if (!Xs(r) || r.actor !== this.actor) throw Error(`${e} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let i = t.currentTarget.dataset.set, a = t.currentTarget.dataset.slot;
			if (!i || !a) throw Error(`${e} | Argon weapon-set drop target has no set or slot identifier.`);
			let o = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			o[i] ??= {}, o[i][a] = r.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", o), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!As(this.actor, "switchEquip")) return;
			let n = Cs(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(Zs).map((e) => ({
					equipped: !!e.isEquipped,
					id: e.id
				}))
			})), String(t));
			n.length && await this.actor.updateEmbeddedDocuments("Item", n);
		}
	}
	return r;
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/register-integration.ts
function cc() {
	if (!s("enhancedcombathud")) {
		J("argonLegacy", "inactive", "Argon Combat HUD is not active.");
		return;
	}
	if (!C("argonCombatHud")) {
		J("argonLegacy", "inactive", "Argon compatibility is disabled.");
		return;
	}
	Y("argonLegacy", () => (ec(), !0), "Legacy enhancedcombathud-wfrp4e package check bypass installed.", {
		status: "unavailable",
		detail: "Argon's legacy module-check API is unavailable."
	}), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = $s(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = oc(e), a = sc(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	});
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/panels.ts
function lc(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = $s(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return za(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/report-bridge-error.ts
function uc(e) {
	return e instanceof Error ? e.message : String(e);
}
function dc(e, n) {
	o(`${t}: ${e}. ${uc(n)}`, n);
}
function fc(e, t) {
	e.catch((e) => dc(t, e));
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/register-integration.ts
function pc() {
	return C("paperDoll") && C("argonCombatHud") && C("paperDollArgonBridge");
}
function mc(e, t) {
	!pc() || !G(e) || Ba(t) && fc(Va(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function hc() {
	s("fvtt-paper-doll-ui") && s("enhancedcombathud") && pc() && (Hooks.on("argonInit", (e) => {
		if (!e || typeof e != "object" && typeof e != "function" || !("defineMainPanels" in e) || typeof e.defineMainPanels != "function") throw Error("Argon main panel registration API is unavailable.");
		let { PaperDollQuickItemsPanel: t } = lc(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", mc));
}
//#endregion
//#region src/module/foundry/settings/conflicts/register.ts
function gc() {
	Hooks.once("setup", () => {
		game?.settings.register(e, mr, {
			name: "Settings preset conflict choices",
			hint: "Preferred sources for conflicting settings presets.",
			scope: "world",
			config: !1,
			default: {},
			type: Object
		}), h("presets", "resetPresetConflictChoices", {
			name: "Settings preset conflicts",
			label: "Reset Conflict Choices",
			hint: "Forget preferred sources and review conflicts again the next time presets are checked or applied.",
			icon: "fa-solid fa-code-compare",
			restricted: !0,
			type: class extends foundry.applications.api.ApplicationV2 {
				async render() {
					if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
					return await foundry.applications.api.DialogV2.wait({
						window: { title: "Reset Preset Conflict Choices?" },
						content: "<p>Forget saved conflict choices? Current world settings will remain unchanged.</p>",
						buttons: [{
							action: "reset",
							label: "Reset Choices"
						}, {
							action: "cancel",
							label: "Cancel",
							default: !0
						}],
						rejectClose: !1
					}) === "reset" && await _r.reset(), this;
				}
			}
		});
	});
}
//#endregion
//#region src/module/foundry/settings/presets/register.ts
function _c() {
	ee("presets"), gc();
	let t = Pn().filter(H);
	Hooks.once("setup", () => {
		h("presets", "exportSettingsPreset", {
			name: "Settings presets",
			label: "Export Settings Preset",
			hint: "Choose exact world settings to download as namespace JSON.",
			icon: "fa-solid fa-file-export",
			restricted: !0,
			type: class extends foundry.applications.api.ApplicationV2 {
				async render() {
					try {
						await sr();
					} catch (e) {
						tr(e);
					}
					return this;
				}
			}
		});
		for (let n of t) {
			let t = $n(n);
			game?.settings.register(e, er(n), {
				name: `Ignore ${t} setup prompts`,
				hint: `Do not prompt when ${t} settings differ from the included preset. Uncheck to resume startup checks for all GMs in this world.`,
				config: !1,
				default: n.defaultIgnorePrompt?.() ?? !1,
				scope: "world",
				type: Boolean
			}), !["foundryvtt-simple-calendar-reborn", "simple-timekeeping"].includes(n.namespace) && h("presets", n.menuKey ?? `configureSettingsPreset-${n.namespace}`, {
				name: `${t} settings preset`,
				settingKey: er(n),
				label: `Apply ${t} Preset`,
				hint: `Apply only the settings included in Compatibility Box's ${t} preset.`,
				icon: "fa-solid fa-gears",
				restricted: !0,
				type: class extends foundry.applications.api.ApplicationV2 {
					async render() {
						try {
							await nr(n);
						} catch (e) {
							tr(e);
						}
						return this;
					}
				}
			});
		}
	}), Hooks.on("updateSetting", (e) => {
		let n = e.key;
		for (let e of t.filter((e) => e.watchSettings?.includes(n))) rr(e, !0).catch(tr);
	}), Hooks.once("ready", async () => {
		for (let e of t) try {
			await rr(e);
		} catch (e) {
			tr(e);
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/repair-mad-prefab-exclusions.ts
var vc = /* @__PURE__ */ new WeakSet();
function yc(t) {
	if (vc.has(t)) return !1;
	let n = t.Initialise, r = /* @__PURE__ */ new Set();
	return t.Initialise = function(t, ...i) {
		let a = t?.moduleName, o = a ? game?.modules.get(a) : void 0, s = t?.ignoredCompendiumPacks;
		if (!a?.startsWith("mad-") || !o?.active || !o.packs) return n.call(this, t, ...i);
		let c = `${a}-prefabs`;
		return !Array.isArray(s) || !s.includes(c) || Array.from(o.packs).some((e) => e.name === c) ? n.call(this, t, ...i) : (r.has(a) || (r.add(a), console.warn(`${e} | ${a}: skipped unavailable Scene Packer exclusion ${c}.`)), n.call(this, {
			...t,
			ignoredCompendiumPacks: s.filter((e) => e !== c)
		}, ...i));
	}, vc.add(t), !0;
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/register-integration.ts
function bc() {
	if (!s("scene-packer")) {
		J("scenePacker", "inactive", "Scene Packer is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e") {
		J("scenePacker", "inactive", "Requires a WFRP4e world.");
		return;
	}
	if (typeof ScenePacker > "u" || typeof ScenePacker.Initialise != "function") {
		J("scenePacker", "unavailable", "Scene Packer is active but its initialization API is unavailable at init.");
		return;
	}
	Y("scenePacker", () => yc(ScenePacker), "Guard installed for unavailable MAD prefab exclusions.", {
		status: "not-needed",
		detail: "The exclusion guard was already installed."
	});
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/repair-forge-owner-detection.ts
var xc = /* @__PURE__ */ new WeakSet();
function Sc(e, t) {
	if (xc.has(e)) return !1;
	let n = e._detectForgeAccountId;
	return e._detectForgeAccountId = async function() {
		let e = t();
		return this.isRunningOnForge() && typeof e == "string" && /^[a-zA-Z0-9_-]+$/.test(e) && e !== "bazaar" ? (this.forgeAccountId = e, !0) : n.call(this);
	}, xc.add(e), !0;
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/register-integration.ts
async function Cc() {
	if (!s("fa-nexus")) {
		J("forgeOwner", "inactive", "FA Nexus is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e" || typeof ForgeAPI > "u") {
		J("forgeOwner", "inactive", "Requires WFRP4e with Forge's API present.");
		return;
	}
	let t = Array.from(document.querySelectorAll("script[type=\"module\"][src]")).find((e) => {
		let t = new URL(e.src).pathname;
		return /\/modules\/fa-nexus\/(?:[^/]+\/)?scripts\/core\/forge-integration\.js$/.test(t);
	});
	if (!t) {
		J("forgeOwner", "unavailable", "The loaded FA Nexus Forge integration script could not be located."), console.warn(`${e} | FA Nexus Forge integration script was not found; patch skipped.`);
		return;
	}
	try {
		let e = (await import(
			/* @vite-ignore */
			t.src
)).forgeIntegration;
		if (typeof e?._detectForgeAccountId != "function" || typeof e.isRunningOnForge != "function") throw Error("FA Nexus Forge integration API is unavailable.");
		Sc(e, () => ForgeAPI.lastStatus?.ownerUserId), J("forgeOwner", "applied", "Forge owner-metadata fallback installed on the loaded Nexus service.");
	} catch (t) {
		J("forgeOwner", "failed", t instanceof Error ? t.message : String(t)), console.error(`${e} | Could not install FA Nexus Forge compatibility.`, t);
	}
}
//#endregion
//#region src/module/foundry/integrations/simple-quest/journal-theme.ts
function wc() {
	let e = /* @__PURE__ */ new WeakMap(), t = (t) => {
		e.get(t)?.disconnect(), e.delete(t);
	};
	Hooks.on("renderJournalEntrySheet", (n, r) => {
		let i = n, a = r;
		t(i);
		let o = !1, s = () => {
			if ((i.pageId ? i.document.pages.get(i.pageId) : void 0)?.type.startsWith("simple-quest.")) o = !0, a.classList.contains("no-theme") || a.classList.add("no-theme"), a.classList.contains("classic-font") && a.classList.remove("classic-font");
			else if (o) {
				o = !1;
				let e = game?.settings.get("wfrp4e", "theme");
				a.classList.toggle("no-theme", e?.journal.enabled === !1), a.classList.toggle("classic-font", e?.journal.enabled === !0 && e.journal.font === "classic");
			}
		};
		s();
		let c = i.isMultiple ? a.querySelector(".toc") : null;
		if (!o && !c) return;
		let l = new MutationObserver(s), u = { attributeFilter: ["class"] };
		c && l.observe(c, {
			...u,
			subtree: !0
		}), l.observe(a, u), e.set(i, l);
	}), Hooks.on("closeJournalEntrySheet", (e) => t(e));
}
//#endregion
//#region src/module/foundry/integrations/simple-quest/apply-template.ts
var Tc = "https://source.unsplash.com/random", Ec = "<div style=\"background:#9ca7a5;border-top:2px solid #252525;border-bottom:2px solid #252525;padding:0 0.5em\">\n<p><span style=\"color:#252525;text-transform:uppercase\"><strong>Lorem Ipsum</strong></span></p>\n<p><span style=\"color:#252525\">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni asperiores dicta vitae veritatis. Aut atque nobis voluptatem at alias, quam similique corrupti mollitia nihil laboriosam, consequuntur quibusdam ut, quos nesciunt.</span></p>\n</div>";
function Dc(e) {
	return new Promise((t, n) => {
		let r = new e.applications.apps.FilePicker.implementation({
			type: "image",
			callback: t
		}), i = r.close;
		r.close = async function(...e) {
			return t(null), i.apply(this, e);
		}, Promise.resolve(r.browse()).catch(n);
	});
}
async function Oc(e, t, n) {
	await t.close({ force: !0 });
	try {
		let r = t.document.text?.content ?? "", i = new URL(e, document.baseURI).pathname.endsWith("/modules/simple-quest/templates/JournalTemplates/boxed-text.html") ? Ec : await fetch(e).then((e) => {
			if (!e.ok) throw Error(`Simple Quest template request failed: ${e.status}`);
			return e.text();
		}), a = i.match(/https:\/\/source\.unsplash\.com\/random/g) ?? [], o = [];
		for (let e of a) o.push(await Dc(n));
		let s = 0;
		i = i.replaceAll(Tc, () => o[s++] || Tc), await t.document.update({ "text.content": r + "\n" + i });
	} finally {
		t.render(!0);
	}
}
//#endregion
//#region src/module/foundry/integrations/simple-quest/template-dialog.ts
var kc = {
	banner: "fad fa-scroll-old",
	character: "fad fa-user",
	"dynamic-columns": "fad fa-columns",
	"image-text-left": "fad fa-image",
	"image-text-right": "fad fa-image",
	location: "fad fa-place-of-worship",
	"boxed-text": "fad fa-paragraph",
	"description-text": "fad fa-text",
	"character-grid-1x2": "fad fa-user",
	"character-grid-1x3": "fad fa-user",
	wiki: "fad fa-book",
	event: "fad fa-calendar"
};
async function Ac(e, t) {
	let n = t.applications.apps.FilePicker.implementation, r = (await n.browse("data", "modules/simple-quest/templates/JournalTemplates")).files, i = [];
	try {
		i = (await n.browse("user", "modules/simple-quest/storage", { extensions: [".html"] })).files;
	} catch (e) {
		console.error(e);
	}
	let a = r.concat(i).map((n) => {
		let r = n.split("/").pop().split(".").slice(0, -1).join(".");
		return {
			action: r,
			label: r.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" "),
			icon: kc[r] ?? "fad fa-file-invoice",
			callback: () => Oc(n, e, t)
		};
	});
	(await new t.applications.api.DialogV2({
		window: { title: game.i18n.localize("simple-quest.page-template.label") },
		content: game.i18n.localize("simple-quest.page-template.description"),
		position: { width: 600 },
		buttons: a
	}).render({ force: !0 })).classList.add("simple-quest-dialog", "page-template-dialog");
}
//#endregion
//#region src/module/foundry/integrations/simple-quest/register-integration.ts
var jc = ["simpleQuestBox", "simpleQuestContent"];
function Mc() {
	if (!s("simple-quest")) {
		for (let e of jc) J(e, "inactive", "Simple Quest is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e") {
		for (let e of jc) J(e, "inactive", "Requires a WFRP4e world.");
		return;
	}
	if (wc(), game.modules.get("simple-quest")?.version !== "5.3.0" || !["14.368", "14.369"].includes(game.version)) {
		for (let e of jc) J(e, "unsupported", "Requires verified SQ 5.3.0 on Foundry 14.368 or 14.369.");
		console.warn(`${e} | Simple Quest page-template fixes skipped for unverified versions.`);
		return;
	}
	Hooks.on("getHeaderControlsJournalEntryPageHandlebarsSheet", (e, t) => {
		let n = e;
		if (!n?.document || !Array.isArray(t)) return;
		let r = t.find((e) => e.class === "simple-quest-page-template");
		!r || typeof r.onClick != "function" || (r.onClick = () => Ac(n, foundry));
	});
	for (let e of jc) J(e, "applied", "Replacement Page Template action registered for the verified versions.");
}
//#endregion
//#region src/module/foundry/integrations/image-context/register-integration.ts
var Nc = /* @__PURE__ */ new WeakSet(), Pc = ["#token-hud .status-effects .effect-control[data-status-id]", "#token-hud .condition-effects .effect-control[data-status-id]"].join(", ");
function Fc() {
	if (!s("image-context")) {
		J("imageContext", "inactive", "Image Context is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e") {
		J("imageContext", "inactive", "Requires a WFRP4e world.");
		return;
	}
	if (typeof ImageContext > "u" || typeof ImageContext.onContextMenu != "function") {
		J("imageContext", "unavailable", "Image Context is active but its context-menu API is unavailable at init.");
		return;
	}
	if (Nc.has(ImageContext)) {
		J("imageContext", "applied", "The token HUD condition exclusion is already installed.");
		return;
	}
	let e = ImageContext.onContextMenu;
	ImageContext.onContextMenu = function(t) {
		if (!(t.target instanceof Element && t.target.closest(Pc))) return e.call(this, t);
	}, Nc.add(ImageContext), J("imageContext", "applied", "Image menus are excluded only from WFRP token HUD condition controls.");
}
//#endregion
//#region src/module/functions/patches/wfrp4e/migration-return-support.ts
function Ic(e) {
	if ([
		"9.6.1",
		"9.6.2",
		"9.6.3",
		"9.6.4"
	].includes(e)) return "affected";
	let t = /^(\d+)\.\d+\.\d+$/.exec(e);
	return t && Number(t[1]) >= 10 ? "fixed" : "unknown";
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-data-model-migrations.ts
var Lc = /* @__PURE__ */ new WeakSet();
function Rc(e) {
	let t = e.migrateData;
	return typeof t != "function" || Lc.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, Lc.add(e), !0);
}
function zc() {
	return game?.system.id !== "wfrp4e" || Ic(game.system.version) !== "affected" ? 0 : [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(Rc(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-roll-modes.ts
function Bc() {
	let e = game?.wfrp4e?.config, t = CONFIG.ChatMessage.modes;
	return !e || !t ? !1 : (e.rollModes = foundry.utils.deepClone(t), !0);
}
//#endregion
//#region src/module/functions/patches/wfrp4e/chat-card-references.ts
function Vc(e) {
	return typeof e == "object" && e ? e : {};
}
function Q(e) {
	return typeof e == "string" ? e : "";
}
function Hc(e) {
	let t = Vc(e);
	return {
		kind: "speaker",
		actor: Q(t.actor),
		scene: Q(t.scene),
		token: Q(t.token)
	};
}
function Uc(e) {
	return Hc(Vc(Vc(e).context).speaker);
}
function Wc(e) {
	let t = e.system ?? {};
	switch (e.type) {
		case "test": return [Uc(t.testData)];
		case "opposed": {
			let e = Vc(t.opposedTestData);
			return [Uc(e.attackerTestData), Uc(e.defenderTestData)];
		}
		case "magic": {
			let e = Vc(t.sourceData), n = [{
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
			let e = Vc(t.opposedData), n = [{
				kind: "message",
				id: Q(e.attackerMessageId),
				required: !0
			}];
			return e.targetSpeakerData && n.push(Hc(e.targetSpeakerData)), e.defenderMessageId && n.push({
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
function Gc(e) {
	let t = new DOMParser().parseFromString(e, "text/html").body;
	for (let e of t.querySelectorAll("script, style, template, button, input, select, textarea, .chat-button, a[data-action], [role='button'], .dice-tooltip, .applied-breakdown, .secret:not(.revealed), [hidden], [aria-hidden='true']")) e.remove();
	for (let e of t.querySelectorAll("img")) e.replaceWith(t.ownerDocument.createTextNode(e.alt ? ` ${e.alt} ` : ""));
	for (let e of t.querySelectorAll("br, p, div, li, tr, h1, h2, h3, h4, h5, h6")) e.append(t.ownerDocument.createTextNode("\n"));
	for (let e of t.querySelectorAll("td, th")) e.append(t.ownerDocument.createTextNode(" "));
	return (t.textContent ?? "").split("\n").map((e) => e.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}
function Kc(e) {
	let t = document.createElement("p");
	return t.textContent = e, t.style.whiteSpace = "pre-line", t;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/render-orphaned-chat-cards.ts
var qc = /* @__PURE__ */ new WeakSet();
function Jc(e) {
	if (!game) return !1;
	switch (e.kind) {
		case "speaker": return e.scene && e.token ? !!game.scenes.get(e.scene)?.tokens.get(e.token)?.actor : !!(e.actor && game.actors.get(e.actor));
		case "uuid": return !!(e.uuid && fromUuidSync(e.uuid)?.documentName === "Actor");
		case "message": {
			let t = game.messages.get(e.id);
			return t ? t._source.type === "test" ? Wc(t._source).every(Jc) : !1 : !e.required;
		}
	}
}
async function Yc(e, t) {
	let n = e.toObject(), r = e.visible && e.isContentVisible, i = r ? Gc(n.content) : "", a = new foundry.documents.ChatMessage({
		...n,
		type: "base",
		system: {},
		flags: {},
		content: Kc(i).outerHTML
	}), o = await a.renderHTML(t), s = o.querySelector(".message-content");
	if (s) {
		let e = r && a.isContentVisible ? i : Gc(s.innerHTML);
		s.replaceChildren(Kc(e));
	}
	return o.addEventListener("contextmenu", (e) => e.stopPropagation(), { capture: !0 }), o;
}
function Xc() {
	let e = CONFIG.ChatMessage.documentClass?.prototype;
	if (!e || typeof e.renderHTML != "function" || qc.has(e)) return !1;
	let t = e.renderHTML;
	return e.renderHTML = function(e) {
		return Wc(this._source).some((e) => !Jc(e)) ? Yc(this, e) : t.call(this, e);
	}, qc.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/active-effect-schema.ts
function Zc(e) {
	let t = e.schema;
	if (t.fields.changes) return !1;
	let n = e.defineSchema;
	return e.defineSchema = function() {
		let e = n.call(this);
		return e.changes ||= foundry.data.ActiveEffectTypeDataModel.defineSchema().changes, e;
	}, t.extendFields({ changes: foundry.data.ActiveEffectTypeDataModel.defineSchema().changes }), !0;
}
function Qc() {
	return Object.values(CONFIG.ActiveEffect?.dataModels ?? {}).reduce((e, t) => e + Number(Zc(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/guard-actorless-token-ruler.ts
var $c = /* @__PURE__ */ new WeakSet(), el = /* @__PURE__ */ new WeakSet();
function tl() {
	let e = CONFIG.Token?.rulerClass?.prototype, t = foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	if (!e || !t || e === t || !Object.prototype.isPrototypeOf.call(t, e) || typeof e._getSegmentStyle != "function" || typeof t._getSegmentStyle != "function" || $c.has(e)) return !1;
	let n = e._getSegmentStyle, r = t._getSegmentStyle;
	return e._getSegmentStyle = function(...e) {
		if (this.token.actor) return n.apply(this, e);
		if (!el.has(this.token)) {
			el.add(this.token);
			let { uuid: e, actorId: t, actorLink: n } = this.token.document;
			console.warn("WFRP4e Compatibility Box | Token has no actor; using the core ruler style.", {
				tokenUuid: e,
				actorId: t,
				actorLink: n,
				worldActorExists: !!(t && game?.actors.get(t))
			});
		}
		return r.apply(this, e);
	}, $c.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/dual-wielder-cleanup.ts
var nl = /* @__PURE__ */ new WeakSet(), rl = ["10.0.3", "10.1.2"];
function il() {
	if (!game || !rl.includes(game.system.version)) return !1;
	let e = CONFIG.Actor.documentClass;
	if (typeof e != "function") return !1;
	let t = e.prototype;
	if (!W(t) || typeof t.getScripts != "function") return !1;
	let n = t;
	if (nl.has(n)) return !1;
	let r = n.getScripts;
	return n.getScripts = function(e, ...t) {
		let n = r.call(this, e, ...t);
		return e === "startTurn" ? n.filter((e) => !(e.context?.effect?.statuses.has("dualwielder") && /^this\.effect\.delete\(\);?$/.test(e.script.trim()))) : n;
	}, nl.add(n), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/apply-compatibility-patches.ts
function al() {
	if (game?.system.id !== "wfrp4e") {
		for (let e of [
			"rollModes",
			"migrationReturns",
			"effectSchema",
			"orphanedChat",
			"actorlessRuler",
			"dualWielder"
		]) J(e, "inactive", "Requires a WFRP4e world.");
		return;
	}
	Y("rollModes", Bc, "WFRP received an independent copy of core roll modes.", {
		status: "unavailable",
		detail: "WFRP configuration or core Chat Message roll modes are unavailable."
	});
	let e = Ic(game.system.version);
	e === "fixed" ? J("migrationReturns", "not-needed", "WFRP 10.0.0+ returns migrated data natively; no wrapper installed.") : e === "unknown" ? J("migrationReturns", "unsupported", "Migration fallback is verified only for WFRP 9.6.1–9.6.4; inspect this version.") : Y("migrationReturns", zc, "Fallback installed for WFRP 9.6.1–9.6.4 Actor/Item migration returns.", {
		status: "unavailable",
		detail: "No callable Actor/Item migration methods were available."
	}), Object.keys(CONFIG.ActiveEffect?.dataModels ?? {}).length ? Y("effectSchema", Qc, "Missing changes fields supplied using Foundry's schema factory.", {
		status: "not-needed",
		detail: "All registered effect models already define changes."
	}) : J("effectSchema", "unavailable", "Active Effect data-model registry is unavailable or empty."), Y("orphanedChat", Xc, "Text fallback installed for chat cards with missing actor/token references.", {
		status: "unavailable",
		detail: "The chat document renderer is unavailable."
	});
	let t = CONFIG.Token?.rulerClass?.prototype === foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	Y("actorlessRuler", tl, "Core-style fallback installed for tokens without actors.", {
		status: t && CONFIG.Token?.rulerClass ? "not-needed" : "unavailable",
		detail: t && CONFIG.Token?.rulerClass ? "The world uses Foundry's core ruler." : "The expected WFRP/core ruler methods are unavailable."
	}), rl.includes(game.system.version) ? Y("dualWielder", il, "Duplicate status deletion filtered; the unique GM retains turn-start cleanup.", {
		status: "unavailable",
		detail: "Actor script collection is unavailable."
	}) : J("dualWielder", "unsupported", "Cleanup is verified for WFRP 10.0.3 and 10.1.2; inspect this version before enabling.");
}
//#endregion
//#region src/module/wfrp/folders/hooks.ts
var ol, sl = !1, cl = !1;
function $() {
	if (!(!game?.ready || !game.user?.isActiveGM)) {
		if (sl) {
			cl = !0;
			return;
		}
		clearTimeout(ol), ol = setTimeout(() => {
			ll();
		}, 1e3);
	}
}
async function ll() {
	if (!(!game?.ready || !game.user?.isActiveGM || sl)) {
		sl = !0, cl = !1;
		try {
			await lo();
		} catch (e) {
			console.error(`${t}: WFRP folder cleanup failed.`, e), ui?.notifications?.error(`${t}: WFRP cleanup failed and may be incomplete. See the console for details.`, {
				console: !1,
				permanent: !0
			});
		} finally {
			sl = !1, cl && $();
		}
	}
}
function ul() {
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
function dl() {
	ce(), Do(), Hooks.once("setup", () => to($)), ul(), Hooks.once("canvasInit", Zt), Hooks.once("ready", Zt), Hooks.once("init", () => {
		al(), Ds(), Bt(), ze(), Ht(), Ze(), Nt(), bc(), So("forgeOwner", Cc()), Mc(), Fc(), ko(), ns(), cc(), Aa(), hc(), _c();
	});
}
//#endregion
//#region src/module/init/index.ts
dl();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map