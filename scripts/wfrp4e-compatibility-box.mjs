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
function l(e) {
	return c[e].targetModuleIds.every((e) => s(e));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/constants.ts
var u = "bossbar", d = {
	automatic: "bossBarAutomatic",
	stacked: "bossBarStacked",
	woundsStyle: "bossBarWoundsStyle",
	ignorePrompt: "bossBarIgnoreSetupPrompt"
}, f = {
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
}, p = /* @__PURE__ */ new Map();
function ee(e) {
	for (let [t, n] of p) n.group === e && p.delete(t);
}
function m(e, t, n) {
	p.set(t, {
		group: e,
		action: n
	});
}
function te(e) {
	return [...p].filter(([, t]) => t.group === e).map(([e, t]) => [e, t.action]);
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
		...Object.values(c).map((e) => String(e.settingKey)),
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
	let t = f[e];
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
		for (let t of Object.keys(f)) {
			let n = f[t];
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
], h = {
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
}, ge = "wfrp4e-compatibility-box-imperial", g = he.months, _e = he.weekdays, ve = 86400, ye = (e, t) => (e % t + t) % t;
function _(e) {
	if (!Number.isFinite(e) || Math.abs(e) > 2 ** 53 - 1) throw Error("Calendar timestamp is outside the supported range.");
	e = Math.floor(e);
	let t = Math.floor(e / ve), n = Math.floor(t / 400), r = n + 1, i = ye(t, 400), a = 0, o = n * 394;
	for (; i >= g[a].numberOfDays;) {
		let e = g[a++];
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
function v(e) {
	let t = g[e.month];
	if (!Object.values(e).every(Number.isSafeInteger) || !t || e.day < 0 || e.day >= t.numberOfDays || e.hour < 0 || e.hour >= 24 || e.minute < 0 || e.minute >= 60 || e.second < 0 || e.second >= 60) throw Error("Choose a valid Imperial calendar date and time.");
	let n = ((e.year - 1) * 400 + g.slice(0, e.month).reduce((e, t) => e + t.numberOfDays, 0) + e.day) * ve + e.hour * 3600 + e.minute * 60 + e.second;
	if (!Number.isSafeInteger(n)) throw Error("Calendar date is outside the supported range.");
	return n;
}
function be(e, t = !1) {
	let n = _(e), r = g[n.month], i = (e) => String(e).padStart(2, "0");
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
		months: { values: g.map((e) => ({
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
var y = "foundryvtt-simple-calendar-reborn", b = "simple-timekeeping", x = (e) => e.replace(/[&<>"']/g, (e) => ({
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
		let t = h.sources[e];
		if (!t) throw Error(`Unknown calendar source: ${e}`);
		return t.uuid ? `@UUID[${t.uuid}]{${t.title}}` : t.url ? `<a href="${x(t.url)}">${x(t.title)}</a>` : x(t.title);
	}).join("; ")}</p>`;
}
function we(e) {
	let t = g[e.month], n = `${t.intercalary ? "" : `${e.day} `}${t.name}`;
	return e.month === e.endMonth && e.day === e.endDay ? n : `${n} – ${e.endDay} ${g[e.endMonth].name}`;
}
function Te(e) {
	let t = e.date ? `${e.date.day} ${g[e.date.month].name} ` : "";
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
			let { year: t, month: n, day: r, hour: i, minute: a, second: o } = _(e);
			return {
				year: t,
				month: n,
				day: r,
				hour: i,
				minute: a,
				seconds: o
			};
		};
		e.flags[y] = { noteData: {
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
		} }, e.flags.core = { sheetClass: `${y}.NoteSheet` };
	}
	a && (e.pages[0].flags[b] = {
		allDay: t % 86400 == 0 && (n + 1) % 86400 == 0,
		notify: "none",
		eventTime: t,
		eventEnd: n,
		repeat: r ? "year" : ""
	});
}
function Oe(e, t, n, r) {
	let i = [];
	if (t.holidays !== !1) for (let t of h.holidays) {
		let a = v({
			year: r,
			month: t.month,
			day: t.day - 1,
			hour: 0,
			minute: 0,
			second: 0
		}), o = v({
			year: r,
			month: t.endMonth,
			day: t.endDay - 1,
			hour: 23,
			minute: 59,
			second: 59
		}), s = Ee(e, t.id, t.name, `<p><strong>${x(we(t))}</strong> · ${x(t.region)} · Annual observance</p><p>${x(t.summary)}</p>${Ce(t.sources)}`, 2);
		De(s, a, o, !0, n.calendarId, n.timekeeping), i.push(s);
	}
	if (t.history !== !1) {
		let t = Ee(e, "ubersreik-history", "Ubersreik — Historical Almanac", `<p>GM reference. Published years and ranges are retained. Exact-date entries identify their date basis: published scenario dates use an assumed campaign year, and the deposition uses the explicitly approved provisional date of 5 Nachexen 2512 IC.</p><table><thead><tr><th>Date and precision</th><th>Event</th></tr></thead><tbody>${h.history.map((e) => `<tr><td>${x(Te(e))}</td><td><strong>${x(e.title)}</strong><p>${x(e.summary)}</p>${e.date ? `<p><strong>Date basis:</strong> ${x(e.date.basis)}</p>` : ""}${Ce(e.sources)}</td></tr>`).join("")}</tbody></table><h2>Dating notes and movable festivals</h2>${h.researchNotes.map((e) => `<h3>${x(e.title)}</h3><p>${x(e.text)}</p>${Ce(e.sources)}`).join("")}`, 0);
		i.push(t);
		for (let t of h.history) {
			if (!t.date) continue;
			let r = v({
				year: t.year,
				month: t.date.month,
				day: t.date.day - 1,
				hour: 0,
				minute: 0,
				second: 0
			}), a = Ee(e, `history-${t.id}`, t.title, `<p><strong>${x(Te(t))}</strong></p><p>${x(t.summary)}</p><p><strong>Date basis:</strong> ${x(t.date.basis)}</p>${Ce(t.sources)}`, 0);
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
var je = (e, t, n) => v({
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
function S(e) {
	let t = c[e];
	return l(e) && game?.settings.get("wfrp4e-compatibility-box", t.settingKey) !== !1;
}
//#endregion
//#region src/module/functions/settings-presets/values.ts
function Ne(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function C(e, t) {
	if (Array.isArray(e) && Array.isArray(t)) return e.length === t.length && e.every((e, n) => C(e, t[n]));
	if (Ne(e) && Ne(t)) {
		let n = Object.keys(e);
		return n.length === Object.keys(t).length && n.every((n) => Object.hasOwn(t, n) && C(e[n], t[n]));
	}
	return e === t;
}
function w(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "boolean" || typeof e == "string" || typeof e == "number" && Number.isFinite(e)) return e;
	if (typeof e != "object" || !e) throw Error("Value cannot be represented completely in JSON");
	if (t.has(e)) throw Error("Value contains a circular reference");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return Array.from(e, (e) => w(e, n));
	let r = Object.getPrototypeOf(e);
	if (r !== Object.prototype && r !== null) throw Error("Value is not a plain JSON object");
	if (Object.getOwnPropertySymbols(e).length) throw Error("Value contains properties JSON cannot preserve");
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, w(t, n)]));
}
//#endregion
//#region src/module/foundry/integrations/simple-timekeeping/calendar.ts
function Pe(e, t) {
	let n = Object.getPrototypeOf(e.calendar), r = n.timeToComponents;
	n.timeToComponents = function(e = 0) {
		let n = r.call(this, e);
		return t() ? {
			...n,
			dayOfWeek: _(e).weekday
		} : n;
	}, e.initializeCalendar();
}
//#endregion
//#region src/module/functions/calendars/configuration.ts
function T(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Calendar configuration is unavailable or invalid.");
	return structuredClone(e);
}
function Fe(e, t) {
	let n = T(e), r = T(t), i = xe(), a = r[i.id], o = a ? T(a) : {}, s = {
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
		let i = T(e);
		if (i.id !== t) return i;
		let a = Array.isArray(i.months) ? i.months : [], o = (e, t) => e.find((e) => e && typeof e == "object" && !Array.isArray(e) && e.name === t) ?? {}, s = g.map((e, t) => {
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
			...T(i.year),
			yearZero: 1,
			firstWeekday: 0
		}, d = {
			...T(i.leapYear),
			rule: "none",
			customMod: 0,
			startingYear: 0
		}, f = {
			...T(i.time),
			hoursInDay: 24,
			minutesInHour: 60,
			secondsInMinute: 60,
			...r ? { gameTimeRatio: 0 } : {}
		}, p = {
			...T(i.general),
			gameWorldTimeIntegration: r ? "third-party" : "mixed"
		}, ee = {
			...i,
			name: "WFRP Imperial Calendar",
			months: s,
			weekdays: l,
			year: u,
			leapYear: d,
			time: f,
			general: p
		};
		if (!C(ee, i)) {
			let e = _(n);
			ee.currentDate = {
				year: e.year,
				month: e.month,
				day: e.day,
				seconds: (n % 86400 + 86400) % 86400
			};
		}
		return ee;
	});
}
//#endregion
//#region src/module/foundry/integrations/simple-timekeeping/preset.ts
var E = "simple-timekeeping", Le = {
	title: "Simple Timekeeping & Calendar — WFRP Imperial Calendar",
	enabled: () => game?.system.id === "wfrp4e" && S("simpleTimekeeping"),
	additionalSettings: () => {
		let e = Fe(game?.settings.get(E, "configuration"), game?.settings.get(E, "customCalendars"));
		return [{
			namespace: E,
			key: "customCalendars",
			value: e.customCalendars
		}, {
			namespace: E,
			key: "configuration",
			value: e.configuration
		}];
	}
};
//#endregion
//#region src/module/foundry/integrations/simple-timekeeping/register-integration.ts
function Re() {
	if (game?.system.id !== "wfrp4e" || !S("simpleTimekeeping")) return !1;
	let e = game.settings.get(E, "configuration"), t = game.settings.get(E, "customCalendars"), n = xe(), r = t?.[e.calendar ?? ""];
	return !r || e.calendar !== n.id ? !1 : C(r.years, n.years) && C(r.days, n.days) && r.months.values.length === n.months.values.length && n.months.values.every((e, t) => Object.entries(e).every(([e, n]) => C(r.months.values[t]?.[e], n)));
}
function ze() {
	!s("simple-timekeeping") || !S("simpleTimekeeping") || game?.system.id !== "wfrp4e" || Hooks.once("initSimpleTimekeeping", () => {
		Pe(game.time, Re);
	});
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/recurrence.ts
var Be = /* @__PURE__ */ new WeakSet(), Ve = /* @__PURE__ */ new WeakSet(), He, Ue = !1, We = () => [...game.journal];
function Ge() {
	if (!game?.ready || !S("simpleCalendar") || !Re()) return !1;
	let e = game.settings.get(y, "active-calendar");
	return game.settings.get(y, "calendar-configuration")?.find((t) => t.id === e)?.year.yearZero === 1;
}
function Ke(t, n) {
	if (!Ge()) return;
	let r = We().find((e) => e.id === t), i = r?.flags[y]?.noteData, a = r?.flags[e]?.calendarSync;
	if (!a || !i || n && n !== i.calendarId || i.calendarId !== game.settings.get("foundryvtt-simple-calendar-reborn", "active-calendar")) return;
	let o = We().find((e) => e.id === a.journal)?.pages?.contents.find((e) => e.id === a.page), s = ui?.simpleTimekeeping;
	if (!(!o || !Number.isFinite(o.flags["simple-timekeeping"]?.eventTime) || !s?.getEventOccurrences)) return {
		allDay: !!o.flags[b]?.allDay,
		occurrences: (e, t) => s.getEventOccurrences(o, e, t)
	};
}
function qe() {
	let e = He.visibleCalendar, t = e.getMonthAndDayIndex("selected"), n = t.month === void 0 ? e.getMonthAndDayIndex() : t;
	return je(t.month === void 0 ? e.year.numericRepresentation : e.year.selectedYear, n.month ?? 0, n.day ?? 0);
}
function Je() {
	if (Ue || !Ge()) return;
	let e = game.settings.menus?.get(`${y}.calendar-main-app`)?.type;
	if (!e) return;
	He ??= new e();
	let t = He.visibleCalendar;
	for (let e of We()) {
		let n = e.flags[y]?.noteData;
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
	let t = Ke(e.object.id), n = e.journalData.flags[y]?.noteData.repeats;
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
	}), r.value = String(e.journalData.flags[y].noteData.repeats));
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
], $e = (e) => v({
	...e,
	second: e.seconds
}), et = (e) => {
	let { year: t, month: n, day: r, hour: i, minute: a, second: o } = _(e);
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
	let t = g.findIndex((t) => t.name.toLocaleLowerCase() === e.monthName.trim().toLocaleLowerCase());
	if (t < 0) throw Error(`No Imperial month matches “${e.monthName}”. Choose elapsed time or adjust the source calendar.`);
	return v({
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
			let e = T(r(b, "configuration")), t = T(r(b, "customCalendars")), i = t[String(e.calendar)];
			i && (t[ge] = i);
			let a = Fe(e, t);
			n.settings.push({
				namespace: b,
				key: "customCalendars",
				value: a.customCalendars
			}, {
				namespace: b,
				key: "configuration",
				value: a.configuration
			});
		}
		if (e.activeId) {
			let t = Ie(r(y, "calendar-configuration"), e.activeId, n.time, e.sources.some((e) => e.id === "st")), i = nt({ eventTime: n.time }, e.activeId).startDate;
			for (let n of t) n && typeof n == "object" && !Array.isArray(n) && n.id === e.activeId && (n.currentDate = {
				year: i.year,
				month: i.month,
				day: i.day,
				seconds: i.hour * 3600 + i.minute * 60 + i.seconds
			});
			n.settings.push({
				namespace: y,
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
				key: r.note ? `flags.${y}.noteData` : `flags.${b}`,
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
	if (S("simpleCalendar")) {
		let i = globalThis.SimpleCalendar?.api;
		if (!i) throw Error("Simple Calendar is not ready. Reload before migrating.");
		let a = n(y, "calendar-configuration"), o = a.length ? a : JSON.parse(JSON.stringify(i.getAllCalendars()));
		t.settings[0].value = o;
		let s = String(n(y, "active-calendar")), c = o.find((e) => e.id === s);
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
			let r = n.flags[y]?.noteData;
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
	if (S("simpleTimekeeping")) {
		n(b, "configuration"), n(b, "customCalendars");
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
			let r = n.flags[b];
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
function D() {
	return game?.settings.settings?.has("wfrp4e-compatibility-box.calendarMigrationRecovery") ? game.settings.get(e, dt) : null;
}
function ft() {
	let t = D();
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
	let e = D()?.status;
	return e === "applying" || e === "failed";
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/content.ts
function mt(e) {
	if (!game?.ready || !game.user?.isGM || game.system.id !== "wfrp4e") throw Error("A ready WFRP GM session is required to import calendar content.");
	let t = S("simpleCalendar"), n = S("simpleTimekeeping");
	if (!t && !n) throw Error("Enable a supported calendar compatibility feature first.");
	if (e.holidays === !1 && e.history === !1) return { timekeeping: !1 };
	let r;
	if (t) {
		r = String(game.settings.get(y, "active-calendar"));
		let e = game.settings.get(y, "calendar-configuration")?.find((e) => e.id === r);
		if (!e || e.year?.yearZero !== 1 || e.year.firstWeekday !== 0 || e.leapYear?.rule !== "none" || e.time?.hoursInDay !== 24 || e.time.minutesInHour !== 60 || e.time.secondsInMinute !== 60 || e.months?.length !== g.length || e.weekdays?.length !== _e.length || !g.every((t, n) => e.months[n]?.name === t.name && e.months[n]?.numberOfDays === t.numberOfDays && e.months[n]?.intercalary === t.intercalary && e.months[n]?.intercalaryInclude === !1 && e.months[n]?.startingWeekday === null) || !_e.every((t, n) => e.weekdays[n]?.name === t.name)) throw Error("Apply the Simple Calendar WFRP Imperial preset before importing dated content.");
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
	let n = mt(t), r = Oe(e, t, n, _(game.time.worldTime).year);
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
				let e = {}, a = o.pages.contents.find((e) => e.id === t.pages[0]._id), s = o.flags[y]?.noteData, c = a?.flags[b];
				if (s && s.calendarId !== n.targets.calendarId && n.targets.calendarId) {
					r.skipped.push(`${t.name}: already connected to another Simple Calendar`);
					continue;
				}
				try {
					if (s && n.targets.timekeeping && c?.eventTime === void 0) {
						if (![0, 3].includes(s.repeats)) throw Error("unsupported repetition");
						let e = (e, t = !1) => v({
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
				let l = t.flags[y], u = t.pages[0].flags[b];
				l && !s && (e[`flags.${y}.noteData`] = l.noteData, e["flags.core.sheetClass"] = `${y}.NoteSheet`, e.folder = await i()), Object.keys(e).length && await o.update(e);
				let d = !!u && !!a && a.flags["simple-timekeeping"]?.eventTime === void 0;
				d && await o.updateEmbeddedDocuments("JournalEntryPage", [{
					_id: a.id,
					[`flags.${b}`]: u
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
var O = () => ({ calendarSync: !0 }), k = (t) => t.flags[e]?.calendarSync, A = (e) => e.flags[y]?.noteData, j = (e) => e.flags[b], xt = () => [...game.journal], St = (e) => xt().find((t) => t.id === e.journal)?.pages?.contents.find((t) => t.id === e.page), Ct = (e) => xt().find((t) => {
	let n = k(t);
	return n?.journal === e.parent?.id && n?.page === e.id;
});
function wt() {
	if (!(!game?.ready || pt() || !game.user?.isActiveGM || !S("simpleCalendar") || !Re())) try {
		return mt({}).calendarId;
	} catch {
		return;
	}
}
async function Tt(e, t) {
	let n = e, r = Object.fromEntries(Object.entries(t).filter(([e, t]) => !C(e.split(".").reduce((e, t) => e?.[t], n), t)));
	if (t.ownership) for (let n of Object.keys(e.ownership)) Object.hasOwn(t.ownership, n) || (r[`ownership.-=${n}`] = null);
	Object.keys(r).length && await e.update(r, O());
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
	let r = j(t), i = Ct(t);
	if (!Number.isFinite(r?.eventTime)) {
		i && k(i)?.mirror ? await i.delete(O()) : i && await i.update({
			[`flags.${y}.-=noteData`]: null,
			[`flags.${e}.-=calendarSync`]: null
		}, O());
		return;
	}
	let a = nt(r, n);
	if (i) {
		if (A(i)?.calendarId !== n) return;
		let e = {
			name: t.name,
			ownership: rt(t.parent.ownership, t.ownership),
			[`flags.${y}.noteData`]: {
				...A(i),
				...a
			}
		};
		if (k(i)?.mirror) {
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
	if (A(o)?.calendarId === n && !k(o) && o.pages?.contents.filter((e) => Number.isFinite(j(e)?.eventTime)).length === 1) {
		await Tt(o, {
			[`flags.${e}.calendarSync`]: Et(o, t, !1),
			[`flags.${y}.noteData`]: {
				...A(o),
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
			[y]: { noteData: {
				order: 0,
				categories: [],
				remindUsers: [],
				macro: "none",
				fromPredefined: !1,
				...a
			} },
			core: { sheetClass: `${y}.NoteSheet` }
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
		...O(),
		keepId: !0
	});
}
async function kt(t, n) {
	let r = A(t);
	if (!r || r.calendarId !== n) return;
	let i = tt(r), a = k(t), o = a ? St(a) : t.pages?.contents.find((e) => e.type === "text" && !Number.isFinite(j(e)?.eventTime));
	if (a && !o) return;
	if (o || ([o] = await t.createEmbeddedDocuments("JournalEntryPage", [{
		name: t.name,
		type: "text",
		text: {
			content: "",
			format: 1
		}
	}], O())), !o) throw Error("Could not create calendar event page");
	let s = {
		name: t.name,
		ownership: t.ownership,
		[`flags.${b}`]: {
			notify: "none",
			...j(o),
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
function M(t) {
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
	M(async (e) => {
		let t = xt();
		for (let n of t) if (!k(n)?.mirror) {
			for (let t of n.pages?.contents ?? []) if (Number.isFinite(j(t)?.eventTime)) try {
				await Ot(t, e);
			} catch (e) {
				M(async () => {
					throw e;
				});
			}
			if (A(n) && !k(n) && !n.pages?.contents.some((e) => Number.isFinite(j(e)?.eventTime))) try {
				await kt(n, e);
			} catch (e) {
				M(async () => {
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
		Ae(n), !t[e === "create" ? 1 : 2]?.calendarSync && M(async (t) => {
			let r = n.pages?.contents.filter((e) => Number.isFinite(j(e)?.eventTime)) ?? [];
			if (e === "create" && r.length) for (let e of r) await Ot(e, t);
			else if (A(n)) await kt(n, t);
			else for (let e of n.pages?.contents ?? []) await Ot(e, t);
		});
	}), t(`${e}JournalEntryPage`, (...t) => {
		let n = t[0];
		t[e === "create" ? 1 : 2]?.calendarSync || M(async (e) => {
			k(n.parent)?.mirror ? await kt(n.parent, e) : await Ot(n, e);
		});
	});
	t("deleteJournalEntryPage", (t, n) => {
		if (n?.calendarSync) return;
		let r = t;
		M(async () => {
			let t = Ct(r);
			t && k(t)?.mirror ? await t.delete(O()) : t && await t.update({
				[`flags.${y}.-=noteData`]: null,
				[`flags.${e}.-=calendarSync`]: null
			}, O());
		});
	}), t("deleteJournalEntry", (e, t) => {
		if (Ae(e), t?.calendarSync) return;
		let n = e;
		M(async () => {
			let e = k(n);
			e?.mirror && await St(e)?.delete(O());
			for (let e of xt()) {
				let t = k(e);
				t?.mirror && t.journal === n.id && await e.delete(O());
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
			t && await t.update({ [`flags.-=${b}`]: null }, { calendarSync: !0 }), await i.update({ [`flags.${e}.-=calendarSync`]: null }, { calendarSync: !0 });
		}
	}
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/migration/apply.ts
var It = !1;
async function N(t, n = D()?.journal) {
	if (!n) throw Error("The recovery journal is missing.");
	await game.settings.set(e, dt, {
		status: t.status,
		created: t.created,
		journal: n
	});
}
async function Lt(e, t) {
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
async function Rt(t) {
	if (lt(), It || pt()) throw Error("A calendar migration needs recovery before another can begin.");
	if (t.errors.length) throw Error("Resolve the migration preview errors first.");
	let n = ut();
	if (!C(n, t.snapshot) || !C(st(n, t.choices), t)) throw Error("Calendar data or time changed during review. Preview again before applying.");
	It = !0;
	let r = D(), i = {
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
		a = n.id, await N(i, a), await Pt();
		let r = ut();
		if (r.journalIds = r.journalIds.filter((e) => e !== a), !C(r, t.snapshot)) throw Error("Calendar data changed while pausing synchronization. Preview again.");
		if (D()?.journal !== a) throw Error("Another GM started a calendar migration. Reopen the migration menu.");
		o = !0, await Lt(t, !1), await N({
			...i,
			status: "complete"
		});
	} catch (t) {
		throw o ? (a && await N({
			...i,
			status: "failed"
		}, a), Error(`Migration stopped: ${t instanceof Error ? t.message : t}. Event synchronization is paused. Use Restore Previous Calendar in the migration menu, then reload.`, { cause: t })) : (a && D()?.journal === a && await game.settings.set(e, dt, r), t);
	} finally {
		It = !1;
	}
}
async function zt() {
	lt();
	let e = ft();
	if (!e || e.status === "restored") throw Error("No migration is available to restore.");
	if (It) throw Error("A migration is already running.");
	It = !0;
	try {
		await N({
			...e,
			status: "applying"
		}), await Pt(), await Lt(e.plan, !0), await Ft(e.plan), await N({
			...e,
			status: "restored"
		});
	} catch (t) {
		throw await N({
			...e,
			status: "failed"
		}), t;
	} finally {
		It = !1;
	}
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/migration/menu.ts
async function Bt() {
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
			await zt(), ui?.notifications?.info("Previous calendar restored. Reload to refresh both calendars.");
			return;
		}
		if (t !== "next") return;
	}
	let t = ut(), r = t.sources.map((e) => {
		let t = e.months.length === g.length && e.months.every((e, t) => e.name === g[t]?.name && e.days === g[t]?.numberOfDays);
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
	}) === "apply" && (await Rt(a), ui?.notifications?.info("Calendar migration complete. Reload to refresh both calendars and reconcile events."));
}
function Vt() {
	game?.settings.register(e, dt, {
		name: "Calendar migration recovery",
		hint: "Status and GM journal reference for the most recent calendar migration.",
		scope: "world",
		config: !1,
		type: Object,
		default: null
	}), Hooks.once("setup", () => m("calendars", "calendarMigration", {
		name: "Existing world calendars",
		label: "Migrate Existing WFRP Calendars",
		hint: "Preview calendar differences and choose how world time and events move to the shared Imperial calendar.",
		icon: "fa-solid fa-calendar-check",
		restricted: !0,
		type: class extends foundry.applications.api.ApplicationV2 {
			async render() {
				try {
					await Bt();
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
async function Ht() {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
	let e = n, t = await foundry.applications.api.DialogV2.wait({
		window: { title: "WFRP Calendar Content" },
		position: { width: 720 },
		content: `<p>Import sourced WFRP observances and Ubersreik history. Holidays are visible to players; the historical almanac and dated historical/scenario events are GM-only. Existing notes, dates and text are preserved. No macros or chat reminders are enabled.</p><table><thead><tr><th>Observance</th><th>Date</th><th>Region</th></tr></thead><tbody>${h.holidays.map((t) => `<tr><td>${e(t.name)}</td><td>${e(we(t))}</td><td>${e(t.region)}</td></tr>`).join("")}</tbody></table><p><strong>Ubersreik history:</strong> ${h.history.length} sourced entries with year, range and uncertainty labels. Year-only history stays in the reference journal. Eight dated events are included without annual repetition: the provisional deposition date (5 Nachexen 2512 IC) and seven labelled scenario defaults from The Blessings that Drew Blood.</p><p><strong>Middenheim Carnival:</strong> included with holidays on 1–8 Brauzeit, using the older published default. Later books leave its seasonal timing flexible; you can adjust the imported event.</p>`,
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
function Ut() {
	game?.system.id !== "wfrp4e" || !(S("simpleCalendar") || S("simpleTimekeeping")) || Hooks.once("setup", () => m("calendars", "calendarContent", {
		name: "WFRP calendar content",
		label: "Import WFRP Calendar Content",
		hint: "Review Imperial and Ubersreik holidays, including Middenheim Carnival, and import the historical almanac.",
		icon: "fa-solid fa-calendar-days",
		restricted: !0,
		type: class extends foundry.applications.api.ApplicationV2 {
			async render() {
				try {
					await Ht();
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
var Wt = {
	wounds: "Compatibility Box: WFRP Wounds",
	unconscious: "Compatibility Box: WFRP Unconscious",
	dead: "Compatibility Box: WFRP Dead"
};
function Gt(e, t) {
	if (!Array.isArray(e) || !e.length) throw Error("Health Estimate must have a default estimation table before applying its preset.");
	let n = w(e);
	for (let e of n) if (!e || typeof e != "object" || Array.isArray(e) || typeof e.name != "string" || !Array.isArray(e.estimates) || !Array.isArray(e.actorTypes) || !Array.isArray(e.statusEffects)) throw Error("Health Estimate's estimation tables do not match the supported version 36 schema.");
	let r = new Set(Object.values(Wt)), [i, ...a] = n.filter((e) => !r.has(e.name));
	if (!i || i.actorTypes.length || i.statusEffects.length) throw Error("Health Estimate's first table must remain its unfiltered default table.");
	let o = [
		"character",
		"npc",
		"creature"
	], s = {
		name: Wt.wounds,
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
		c(Wt.unconscious, "unconscious", "Unconscious"),
		c(Wt.dead, "dead", "Gone to Morr..."),
		...a
	];
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/values.ts
function Kt(e, t) {
	return t instanceof foundry.abstract.DataModel ? t = t.toObject() : e.type instanceof foundry.data.fields.DataField && (t = e.type.toObject(t)), w(t);
}
function qt(e, t) {
	let n = e.type, r = w(t);
	if (n instanceof foundry.data.fields.DataField) r = w(n.clean(r)), n.validate(r, {
		fallback: !1,
		strict: !0
	});
	else if (typeof n == "function" && n.prototype instanceof foundry.abstract.DataModel) r = w(n.fromSource(r, { strict: !0 }).toObject());
	else if (n === String && typeof r != "string" || n === Number && typeof r != "number" || n === Boolean && typeof r != "boolean" || n === Array && !Array.isArray(r) || n === Object && (typeof r != "object" || !r || Array.isArray(r))) throw Error("Preset value does not match this world's setting type.");
	if (!C(t, r)) throw Error("Preset value does not match this world's setting schema.");
}
//#endregion
//#region src/module/foundry/integrations/health-estimate/preset.ts
var Jt = "healthEstimate", Yt = "core.estimations", Xt = {
	title: "Health Estimate",
	watchSettings: ["wfrp4e.uiaCrits"],
	enabled: () => {
		let e = game?.modules.get(Jt)?.version;
		return S("healthEstimate") && game?.system.id === "wfrp4e" && !!e && !foundry.utils.isNewerVersion("36.1.0", e);
	},
	additionalSettings: () => {
		let e = game?.settings.settings?.get(`${Jt}.${Yt}`);
		if (!e) throw Error("Health Estimate's estimation setting is unavailable. Version 36.1.0 or newer is required.");
		let t = Kt(e, game?.settings.get(Jt, Yt)), n = game?.settings.get("wfrp4e", "uiaCrits") === !0;
		return [...n ? [{
			namespace: Jt,
			key: "core.NPCsJustDie",
			value: !1
		}] : [], {
			namespace: Jt,
			key: Yt,
			value: Gt(t, n)
		}];
	}
}, Zt = /* @__PURE__ */ new WeakSet();
function Qt() {
	if (!Xt.enabled?.()) return;
	let e = game && Reflect.get(game, "healthEstimate");
	if (!e || typeof e.isDead != "function" || Zt.has(e)) return;
	let t = e.isDead;
	e.isDead = function(e, n) {
		return e.actor && [
			"character",
			"npc",
			"creature"
		].includes(e.actor.type) ? e.actor.statuses.has("dead") : t.call(this, e, n);
	}, Zt.add(e);
}
//#endregion
//#region src/module/foundry/integrations/foundryvtt-simple-calendar-reborn/preset.ts
var $t = "foundryvtt-simple-calendar-reborn";
function en() {
	let e = game?.settings.get($t, "calendar-configuration");
	if (!Array.isArray(e) || e.length) return e;
	let t = globalThis.SimpleCalendar?.api;
	return JSON.parse(JSON.stringify(t?.getAllCalendars() ?? e));
}
var tn = {
	title: "Simple Calendar Reborn — WFRP Imperial Calendar",
	enabled: () => game?.system.id === "wfrp4e" && S("simpleCalendar"),
	additionalSettings: () => [{
		namespace: $t,
		key: "calendar-configuration",
		value: Ie(en(), game?.settings.get($t, "active-calendar"), game.time.worldTime, S("simpleTimekeeping"))
	}]
};
//#endregion
//#region src/module/foundry/integrations/bossbar/preset.ts
function nn() {
	return game?.settings.get("wfrp4e", "uiaCrits") === !0;
}
var rn = {
	title: "Boss Bar",
	watchSettings: ["wfrp4e.uiaCrits"],
	ignoreSetting: d.ignorePrompt,
	enabled: () => S("bossBar"),
	additionalSettings: () => {
		let t = [{
			namespace: e,
			key: d.stacked,
			value: !0
		}];
		if (!nn()) return t;
		let n = game?.settings.get(u, "barStyles"), r = n.find((e) => e.id === "segmented");
		return r && n[0] !== r && t.push({
			namespace: u,
			key: "barStyles",
			value: [r, ...n.filter((e) => e !== r)]
		}), t;
	}
}, an = "#a51414d8", on = "#7e1717dc", sn = "#b31f18d8", cn = "#b01832d8", ln = "#861a24d8", un = "#541e1ed8", P = "#6a0e0ed8", F = "#6f3518e0", I = "#621010e0", dn = "#771616dc", L = "#440707d8", fn = "#14101490", R = "#0b080de8", pn = [
	["Jabberslythe", "#78d61be8"],
	["Chameleon Skink", P],
	["Kroxigor", P],
	["Saurus", P],
	["Suarus", P],
	["Skink", P],
	["Slann", P],
	["Reptile", P],
	["Ogre Gorger", un],
	["Gorger", un],
	["Orca", an],
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
	["Rat Ogre", dn],
	["Wolf Rat", dn],
	["Skaven", dn],
	["Bray Shaman", I],
	["Beastman", I],
	["Beastmen", I],
	["Bestigor", I],
	["Minotaur", I],
	["Pestigor", I],
	["Razorgor", I],
	["Ungor", I],
	["Gor", I],
	["Greenskin", F],
	["Forest Goblin", F],
	["Night Goblin", F],
	["Hobgoblin", F],
	["Goblin", F],
	["Black Orc", F],
	["Orc", F],
	["Snotling", F],
	["Squig", F],
	["Skeleton", fn],
	["Ghost", fn],
	["Tomb Banshee", fn],
	["Banshee", fn],
	["Undead", L],
	["Vampire", L],
	["Ghoul", L],
	["Wight", L],
	["Liche", L],
	["Maurngul", L],
	["Mourngul", L],
	["Human", an],
	["Dwarf", on],
	["Halfling", sn],
	["High Elf", cn],
	["helf", cn],
	["Wood Elf", ln],
	["welf", ln],
	["Ogre", un]
];
function mn() {
	let e = {};
	for (let [t, n] of pn) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function hn(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function gn(e = {}) {
	let t = mn();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? an;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function _n(e, t = {}) {
	let n = hn(e);
	for (let [e, r] of Object.entries(gn(t))) n[e] ??= r;
	return n;
}
//#endregion
//#region src/module/foundry/integrations/splatter/constants.ts
var vn = "splatter", yn = "BloodSheetData", bn = {
	title: "Splatter",
	ignoreSetting: "splatterIgnoreSetupPrompt",
	menuKey: "configureSplatter",
	additionalSettings: () => [{
		namespace: vn,
		key: yn,
		value: _n(game?.settings.get(vn, yn), game?.wfrp4e?.config.species ?? {})
	}]
}, xn = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
}, Sn = {}, Cn = {
	"core.deathState": !0,
	"core.deathStateName": "Gone to Morr..."
}, wn = {}, Tn = {
	creatureType: "details.species.value",
	creatureTypeCustom: "",
	currentHp: "status.wounds.value",
	maxHp: "status.wounds.max",
	useWounds: !1,
	useBloodsheet: !0
}, En = {
	bossbar: { description: "Use WFRP Wounds paths and the compatible stacked-bar configuration." },
	splatter: { description: "Use WFRP Wounds and species for blood effects while preserving custom colors." },
	healthEstimate: { description: "Use WFRP Wounds labels: Unconscious at zero under core rules, Mortal Peril! under Up in Arms, Bloodied at 50%, and Gone to Morr... for the Dead condition. Preserve custom and vehicle tables. Recommend disabling NPCs Just Die only under Up in Arms; leave it alone under core." },
	"simple-timekeeping": { description: "Install the standard 400-day Imperial calendar. Keeps world time, events, macros, weather and display preferences. Reload after applying. Pause running clocks during setup and apply the Simple Calendar preset too if using both." },
	"foundryvtt-simple-calendar-reborn": { description: "Replace the active calendar with the standard 400-day Imperial calendar at the current Foundry world timestamp. Existing dates may display differently; timestamps and notes are not migrated. Keeps other calendars and note categories. With ST&C enabled, its clock controls advance time and Simple Calendar follows Foundry time in third-party mode with automatic clock speed zero; use ST&C to change dates and advance time. Pause running clocks during setup." }
};
//#endregion
//#region src/module/functions/settings-presets/sources.ts
function Dn(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => {
		let n = e.slice(e.lastIndexOf("/") + 1);
		if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.json$/.test(n)) throw Error(`Invalid settings preset namespace filename: ${e}`);
		if (!t || typeof t != "object" || Array.isArray(t)) throw Error(`Settings preset ${e} must be an object of setting values.`);
		let r = Object.fromEntries(Object.entries(t).map(([t, n]) => {
			if (!t.trim()) throw Error(`Settings preset ${e} contains an empty setting key.`);
			return [t, w(n)];
		}));
		return [n.slice(0, -5), r];
	}));
}
//#endregion
//#region src/module/functions/settings-presets/metadata.ts
function On(e, t) {
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
var kn = Dn(/* #__PURE__ */ Object.assign({
	"/src/settings/bossbar.json": xn,
	"/src/settings/foundryvtt-simple-calendar-reborn.json": Sn,
	"/src/settings/healthEstimate.json": Cn,
	"/src/settings/simple-timekeeping.json": wn,
	"/src/settings/splatter.json": Tn
})), An = On(Object.values([En])[0] ?? {}, Object.keys(kn)), jn = {
	"foundryvtt-simple-calendar-reborn": tn,
	"simple-timekeeping": Le,
	bossbar: rn,
	healthEstimate: Xt,
	splatter: bn
};
function Mn(e) {
	if (!Object.hasOwn(kn, e)) throw Error(`No settings preset exists for ${e}.`);
	return {
		namespace: e,
		values: kn[e],
		...jn[e],
		...An[e]
	};
}
function Nn() {
	return Object.keys(kn).sort().map(Mn);
}
//#endregion
//#region src/module/functions/settings-presets/wfrp.ts
function Pn(e, t) {
	return t === "wfrp4e" ? [...e].sort((e, t) => Number(z(e)) - Number(z(t))) : [...e];
}
function z({ namespace: e, key: t }) {
	return e === "wfrp4e" && t === "useGroupAdvantage";
}
function Fn({ namespace: e, key: t }) {
	return e === "wfrp4e" && ["homebrew", "customCursor"].includes(t) || e === "wfrp4e-rnhd" && ["showClock", "syncClock"].includes(t);
}
function In({ namespace: e, key: t, value: n }) {
	return e !== "wfrp4e" || t !== "tableSettings" || !n || typeof n != "object" ? [] : [...new Set(Object.values(n).flatMap((e) => String(e).split(",").filter(Boolean)))];
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/coordination.ts
function Ln() {
	let e = [...game?.modules.values() ?? []].filter((e) => e.active).map((e) => e.api?.settingsPresetCoordinator).filter((e) => e?.version === 1);
	if (e.length > 1) throw Error("Multiple settings coordinators are active; disable the duplicate before applying presets.");
	return e[0];
}
function Rn(e, t) {
	return Ln()?.plan(e, t) ?? {
		entries: t,
		excluded: [],
		conflicts: []
	};
}
async function zn(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
	return await Ln()?.resolve(e, t) ?? !0;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/engine.ts
function Bn(e) {
	return e === "core" || e === game?.system.id || game?.modules.get(e)?.active === !0;
}
function Vn(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to inspect settings presets.");
	let n = Rn(e, t), r = {
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
		if (!Bn(e.namespace) || !n || n.scope !== "world") {
			r.skipped.push({
				id: t,
				reason: "World setting is unavailable or its namespace is not active"
			});
			continue;
		}
		try {
			qt(n, e.value), game.system.id === "wfrp4e" && r.missingTables.push(...In(e).filter((e) => !(game?.collections?.get("RollTable"))?.get(e)));
			let i = Kt(n, game.settings.get(e.namespace, e.key));
			if (C(i, e.value)) {
				r.unchanged.push(t);
				continue;
			}
			r.changes.push({
				...e,
				current: i,
				label: n.name ? game.i18n.localize(n.name) : t
			}), r.requiresReload ||= !!n.requiresReload || game.system.id === "wfrp4e" && (Fn(e) || z(e)), r.automaticReload ||= game.system.id === "wfrp4e" && z(e);
		} catch (e) {
			r.failed.push({
				id: t,
				reason: e instanceof Error ? e.message : String(e)
			});
		}
	}
	return r.missingTables = [...new Set(r.missingTables)], r;
}
var Hn = !1;
async function Un(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (Hn) throw Error("A settings preset is already being applied.");
	Hn = !0;
	try {
		let n = Vn(e, t), r = {
			...n,
			updated: [],
			blocked: !!(n.failed.length || n.skipped.length || n.conflicts.length || n.missingTables.length),
			requiresReload: !1,
			automaticReload: !1
		};
		if (r.blocked) return r;
		for (let i of Pn(n.changes, game.system.id)) {
			let n = `${i.namespace}.${i.key}`;
			try {
				if (!game.user?.isGM || !Bn(i.namespace)) throw Error("Preset permissions or availability changed.");
				let a = Rn(e, t), o = a.entries.find((e) => e.namespace === i.namespace && e.key === i.key);
				if (a.conflicts.length || !o || !C(o.value, i.value)) throw Error("Preset choices changed; review the remaining settings again.");
				let s = game.settings.settings?.get(n);
				if (!s || s.scope !== "world") throw Error("World setting is unavailable.");
				if (qt(s, i.value), await game.settings.set(i.namespace, i.key, structuredClone(i.value)), r.requiresReload ||= !!s.requiresReload || game.system.id === "wfrp4e" && (Fn(i) || z(i)), r.automaticReload ||= game.system.id === "wfrp4e" && z(i), !C(Kt(s, game.settings.get(i.namespace, i.key)), i.value)) throw Error("Foundry did not retain the complete preset value.");
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
		Hn = !1;
	}
}
//#endregion
//#region src/module/foundry/settings/presets/engine.ts
function B(e) {
	return Bn(e.namespace) && (e.enabled?.() ?? !0);
}
function V(e) {
	if (!B(e)) throw Error("Preset is not active.");
	return [...Object.entries(e.values).map(([t, n]) => ({
		namespace: e.namespace,
		key: t,
		value: n
	})), ...e.additionalSettings?.() ?? []];
}
function Wn(t) {
	if (!B(t)) return {
		changes: [],
		unavailable: [`${t.namespace}: system, module, or integration is not active`]
	};
	let n = Vn(e, V(t));
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
async function Gn(t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (!B(t)) throw Error("Preset is not active.");
	let n = await Un(e, V(t));
	if (n.blocked || n.failed.length) throw Error(`${n.updated.length} settings updated. ${[
		...n.skipped,
		...n.failed,
		...n.conflicts
	].map((e) => `${e.id}: ${e.reason}`).join("; ")}${n.missingTables.length ? ` Missing rule tables: ${n.missingTables.join(", ")}` : ""}`);
	return n;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/review.ts
var Kn = Promise.resolve(), qn = /* @__PURE__ */ new Map();
function Jn(e) {
	let t = `${e.owner}:${e.ignoreKey ?? e.title}`;
	if (e.startup && qn.has(t)) return qn.get(t);
	let n = Kn.then(() => Yn(e)).finally(() => {
		e.startup && qn.delete(t);
	});
	return e.startup && qn.set(t, n), Kn = n.catch(() => {}), n;
}
async function Yn(e) {
	if (!game?.ready || !game.user?.isGM || e.startup && game.users?.activeGM && game.users.activeGM.id !== game.user.id || e.startup && e.ignoreKey && game.settings.get(e.owner, e.ignoreKey) === !0 || !await zn(e.owner, e.entries())) return null;
	let t = Vn(e.owner, e.entries());
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
	if (!C(Vn(e.owner, e.entries()), t)) throw Error("Settings or preset choices changed during review; reopen the action before applying.");
	let s = await Un(e.owner, e.entries());
	return await i(e.title, s), s;
}
//#endregion
//#region src/module/foundry/settings/presets/interface.ts
var Xn = (e) => [y, b].includes(e.namespace), Zn = !1;
function Qn(e) {
	return e.title ?? game?.modules.get(e.namespace)?.title ?? e.namespace;
}
function $n(e) {
	return e.ignoreSetting ?? `ignoreSettingsPreset-${e.namespace}`;
}
function er(e) {
	o(n(`Settings preset could not be completed: ${e instanceof Error ? e.message : String(e)}`), e);
}
async function tr(t) {
	if (!B(t)) throw Error("Preset is not active.");
	if (Xn(t)) return Bt();
	await Jn({
		owner: e,
		title: Qn(t),
		entries: () => V(t),
		...t.description ? { description: t.description } : {}
	});
}
async function nr(t, n = !1) {
	if (!(!B(t) || game?.system.id !== "wfrp4e" || t.promptOnStartup === !1 && !n)) {
		if (Xn(t)) {
			if (Zn || !game?.user?.isGM || game.users?.activeGM && game.users.activeGM.id !== game.user.id || game.settings.get("wfrp4e-compatibility-box", $n(t)) === !0 || !Wn(t).changes.length) return;
			Zn = !0;
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
			if (n === "review" && await Bt(), n === "ignore") for (let n of [y, b]) {
				let r = $n({
					...t,
					namespace: n
				});
				game.settings.settings?.has(`wfrp4e-compatibility-box.${r}`) && await game.settings.set(e, r, !0);
			}
			return;
		}
		await Jn({
			owner: e,
			title: Qn(t),
			entries: () => V(t),
			startup: !0,
			ignoreKey: $n(t),
			...t.description ? { description: t.description } : {}
		});
	}
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/export.ts
function rr(e, t, n = !1) {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	if (!Bn(e)) throw Error("The selected system or module is not active.");
	if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(e)) throw Error("Invalid settings namespace.");
	if (!t.length) throw Error("Select at least one setting to export.");
	let r = Object.fromEntries([...new Set(t)].map((t) => {
		let r = game?.settings.settings?.get(`${e}.${t}`);
		if (!r || r.scope !== "world" || !r.config && !n) throw Error(`${e}.${t} is not an available selected world setting.`);
		try {
			return [t, Kt(r, game?.settings.get(e, t))];
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
function ir(e, t) {
	return [...game?.settings.settings?.values() ?? []].filter((n) => n.namespace === e && n.scope === "world" && (n.config || t)).sort((e, t) => e.key.localeCompare(t.key));
}
function ar(e, t) {
	let n = foundry.utils.escapeHTML, r = game?.i18n.localize(e.name || e.key) ?? e.key, i, a = !1;
	try {
		let t = Kt(e, game?.settings.get(e.namespace, e.key)), n = JSON.stringify(t);
		i = n.length > 160 ? `${n.slice(0, 160)}…` : n;
	} catch (e) {
		a = !0, i = `Cannot export: ${e instanceof Error ? e.message : String(e)}`;
	}
	return `<div class="form-group"><label>
    <input type="checkbox" name="setting-${t}" ${a ? "disabled" : ""}>
    ${n(r)}${e.config ? "" : " (hidden)"}
    </label><p class="hint"><code>${n(`${e.namespace}.${e.key}`)}</code><br>${n(i)}</p></div>`;
}
async function or(e = "src/settings/") {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	let t = [...new Set([...game.settings.settings?.values() ?? []].filter((e) => e.scope === "world" && Bn(e.namespace)).map((e) => e.namespace))].sort();
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
	let a = r.includeHidden === !0, o = ir(i, a);
	if (!o.length) return ui?.notifications?.info("This namespace has no settings matching that selection."), null;
	let s = await foundry.applications.api.DialogV2.input({
		window: { title: `Export ${i} Settings` },
		content: `<p>Select the preferences to include in <strong>${n(i)}.json</strong>.</p>
      <div class="scrollable" style="max-height: 50vh">${o.map(ar).join("")}</div>
      <p class="hint">Save the downloaded file in <code>${n(e)}</code>, then rebuild the module to add its import button.</p>`,
		ok: { label: "Download JSON" },
		rejectClose: !1
	});
	if (!s) return null;
	let c = o.filter((e, t) => s[`setting-${t}`] === !0).map(({ key: e }) => e);
	if (!c.length) return ui?.notifications?.info("No settings selected; nothing was exported."), null;
	let l = rr(i, c, a);
	return foundry.utils.saveDataToFile(`${JSON.stringify(l.values, null, 2)}\n`, "application/json", l.filename), ui?.notifications?.info(`Exported ${c.length} settings to ${n(l.filename)}.`), l;
}
//#endregion
//#region src/module/foundry/settings/presets/api.ts
function sr(e) {
	let t = e === void 0 ? Nn().filter(B) : [Mn(e)];
	if (t.some((e) => !B(e))) throw Error("Preset is not active.");
	return t.flatMap(V);
}
var cr = {
	version: 1,
	getPresets: () => Nn().filter(B).map((e) => ({
		namespace: e.namespace,
		title: Qn(e),
		entries: V(e)
	})),
	inspect: (t) => Vn(e, sr(t)),
	apply: async (t) => Un(e, sr(t)),
	resolve: async (t) => zn(e, sr(t)),
	capture: rr
};
//#endregion
//#region src/module/functions/settings-presets/conflicts.ts
function lr(e) {
	return Array.isArray(e) ? e.map(lr) : e && typeof e == "object" ? Object.fromEntries(Object.keys(e).sort().map((t) => [t, lr(e[t])])) : e;
}
function ur(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n.entries) {
		let r = `${e.namespace}.${e.key}`, i = t.get(r) ?? {
			id: r,
			namespace: e.namespace,
			key: e.key,
			candidates: [],
			signature: ""
		}, a = i.candidates.find((e) => e.source === n.source);
		if (a && !C(a.value, e.value)) throw Error(`Preset ${n.source} proposes two values for ${r}.`);
		a || i.candidates.push({
			source: n.source,
			title: n.title,
			value: e.value
		}), t.set(r, i);
	}
	return [...t.values()].filter((e) => e.candidates.some((t) => !C(t.value, e.candidates[0].value))).map((e) => (e.candidates.sort((e, t) => e.source.localeCompare(t.source)), e.signature = JSON.stringify(e.candidates.map(({ source: e, value: t }) => [e, lr(t)])), e)).sort((e, t) => e.id.localeCompare(t.id));
}
function dr(e, t, n) {
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
function fr(e, t) {
	let n = [];
	for (let [e, t] of game?.modules.entries() ?? []) {
		if (!t.active) continue;
		let r = t.api?.settingsPresets;
		if (r?.version === 1) for (let i of r.getPresets()) n.push({
			source: `${e}:${i.namespace}`,
			title: `${t.title ?? e} — ${i.title}`,
			entries: i.entries.map((e) => ({
				...e,
				value: w(e.value)
			}))
		});
	}
	for (let r of t) n.some((t) => t.source.startsWith(`${e}:`) && t.entries.some((e) => e.namespace === r.namespace && e.key === r.key)) || n.push({
		source: `${e}:${r.namespace}`,
		title: game?.modules.get(e)?.title ?? e,
		entries: [r]
	});
	let r = new Set(t.map((e) => `${e.namespace}.${e.key}`));
	return ur(n).filter((e) => r.has(e.id));
}
//#endregion
//#region src/module/foundry/settings/conflicts/coordinator.ts
var pr = "settingsPresetConflictChoices";
function mr() {
	return game?.settings.get("wfrp4e-compatibility-box", "settingsPresetConflictChoices") ?? {};
}
var hr = Promise.resolve(), gr = {
	version: 1,
	inspect: fr,
	decide: vr,
	async reset() {
		if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
		await game.settings.set(e, pr, {});
	},
	plan(e, t) {
		return dr(t, fr(e, t), mr());
	},
	resolve(e, t) {
		let n = hr.then(() => _r(e, t));
		return hr = n.catch(() => {}), n;
	}
};
async function _r(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to resolve preset conflicts.");
	let r = fr(e, t), i = new Set(gr.plan(e, t).conflicts.map((e) => e.id)), a = {};
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
	return await vr(e, t, a), !0;
}
async function vr(t, n, r) {
	if (!game?.ready || !game.user?.isGM) throw Error("GM permission changed.");
	if (!Object.keys(r).length) return;
	let i = fr(t, n);
	for (let [e, t] of Object.entries(r)) {
		let n = i.find((t) => t.id === e);
		if (!n || n.signature !== t.signature) throw Error("Competing presets changed during review; reopen the action.");
		if (t.source !== null && !n.candidates.some((e) => e.source === t.source)) throw Error("Choose a listed settings source.");
	}
	await game.settings.set(e, pr, {
		...mr(),
		...r
	});
}
//#endregion
//#region src/types/patches/paper-doll/Equipment.ts
var yr = [
	"HEAD",
	"BODY",
	"GLOVES",
	"BOOTS"
], br = ["MAIN_LEFT", "MAIN_RIGHT"], xr = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
], Sr = {
	BODY: ["body"],
	BOOTS: ["lLeg", "rLeg"],
	GLOVES: ["lArm", "rArm"],
	HEAD: ["head"]
};
function Cr(e, t) {
	return t.coverage - e.coverage || t.points - e.points || e.item.name.localeCompare(t.item.name) || e.item.id.localeCompare(t.item.id);
}
function wr(e, t) {
	return Math.max(...Sr[t].map((t) => e.armourPoints[t]));
}
function Tr(e, t) {
	return Sr[t].filter((t) => e.armourPoints[t] > 0).length;
}
function Er(e, t, n) {
	return wr(n.item, e) - wr(t.item, e) || Tr(n.item, e) - Tr(t.item, e) || Cr(t, n);
}
function Dr(e) {
	return e.type === "armour" && e.equipped;
}
function Or(e) {
	let t = e.armourPoints, n = xr.filter((e) => t[e] > 0);
	return {
		coverage: n.length,
		item: e,
		points: n.reduce((e, n) => e + t[n], 0)
	};
}
function kr(e) {
	let t = e.filter(Dr).map(Or);
	return yr.flatMap((e) => {
		let n = t.filter((t) => wr(t.item, e) > 0).sort((t, n) => Er(e, t, n))[0];
		return n ? [{
			slotId: e,
			uuid: n.item.uuid
		}] : [];
	});
}
function Ar(e, t) {
	return e.twoHanded ? "both" : e.offhand ? t === "l" ? "r" : "l" : t;
}
function jr(e, t) {
	return Number(t.twoHanded) - Number(e.twoHanded) || e.name.localeCompare(t.name) || e.id.localeCompare(t.id);
}
function Mr(e, t) {
	let n = e.filter((e) => e.type === "weapon" && e.equipped).sort(jr);
	return br.flatMap((e) => {
		let r = e === "MAIN_LEFT" ? "l" : "r", i = n.find((e) => {
			let n = Ar(e, t);
			return n === "both" || n === r;
		});
		return i ? [{
			slotId: e,
			uuid: i.uuid
		}] : [];
	});
}
function Nr(e, t) {
	return [...kr(e), ...Mr(e, t)];
}
//#endregion
//#region src/module/functions/patches/paper-doll/derive-paper-doll-slot-state.ts
function Pr(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Fr(e, t, n, r) {
	let i = Pr(e), a = new Map(t.map((e) => [e.slotId, e.uuid]));
	for (let e of [...yr, ...br]) {
		if (!r.has(e)) continue;
		let t = i[e]?.["0"] ?? null, o = a.get(e) ?? null;
		o ? (i[e] ??= {}, i[e][0] = o) : t && n.has(t) && (i[e] ??= {}, i[e][0] = null);
	}
	return i;
}
function Ir(e, t, n) {
	let r = new Map(t.map((e) => [e.uuid, e])), i = Pr(e);
	for (let e of Object.values(i)) for (let [t, i] of Object.entries(e)) !i || n.has(i) || r.get(i)?.equipped === !1 && (e[t] = null);
	return i;
}
function Lr(e, t, n, r, i) {
	return Ir(Fr(e, t, n, r), i, n);
}
function Rr(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-paper-doll-slot-state.ts
function zr(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Br(e) {
	return /^(0|[1-9]\d*)$/.test(e);
}
function Vr(e) {
	return e == null || typeof e == "string" && e.length > 0;
}
function Hr(e) {
	return zr(e) && Object.entries(e).every(([e, t]) => e.length > 0 && zr(t) && Object.entries(t).every(([e, t]) => Br(e) && Vr(t)));
}
//#endregion
//#region src/module/functions/patches/paper-doll/equipment-update.ts
function Ur(e) {
	return e.slotId === "MAIN_LEFT" ? "l" : e.slotId === "MAIN_RIGHT" ? "r" : null;
}
function Wr(e, t, n, r) {
	if (t === null) return {};
	let i = {};
	if (t || (i["system.equipped.value"] = !0), e?.type !== "weapon") return i;
	if (!r) throw Error(`Weapon ${e.uuid} requires the actor's main hand.`);
	let a = Ur(n), o = e.twoHanded ? !1 : a ? a !== r : void 0;
	return o !== void 0 && e.offhand !== o && (i["system.offhand.value"] = o), i;
}
function Gr(e) {
	return e === !0 ? { "system.equipped.value": !1 } : {};
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-item-allowed-in-slot.ts
function Kr(e, t) {
	switch (t) {
		case "HEAD": return e.armourPoints.head > 0;
		case "BODY": return e.armourPoints.body > 0;
		case "GLOVES": return e.armourPoints.lArm > 0 || e.armourPoints.rArm > 0;
		case "BOOTS": return e.armourPoints.lLeg > 0 || e.armourPoints.rLeg > 0;
		default: return !1;
	}
}
function qr(e, t, n) {
	return n === "MAIN_LEFT" || n === "MAIN_RIGHT" ? t?.type === "weapon" : n === "HEAD" || n === "BODY" || n === "GLOVES" || n === "BOOTS" ? t?.type === "armour" && Kr(t, n) : e !== "weapon" && e !== "armour";
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-runtime-types.ts
var Jr = new Set([
	"character",
	"npc",
	"creature"
]);
function H(e) {
	return typeof e == "object" && !!e;
}
function Yr(e) {
	return H(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function U(e) {
	return Yr(e) && Jr.has(e.type);
}
function Xr(e) {
	return H(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-equipment.ts
var Zr = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function Qr(e) {
	if (!H(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function $r(e, t) {
	let n = Qr(e)[t];
	if (n === void 0) return null;
	if (!H(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function ei(e, t) {
	let n = $r(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function ti(e) {
	return $r(e, "equipped");
}
function ni(e) {
	return ti(e) !== null;
}
function ri(e) {
	let t = Qr(e).AP;
	if (!H(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(Zr.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function ii(e) {
	if (!H(e.system) || !H(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function ai(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: ei(e, "equipped"),
		id: e.id,
		name: e.name,
		uuid: e.uuid
	};
	return e.type === "armour" ? {
		...t,
		armourPoints: ri(e),
		type: "armour"
	} : {
		...t,
		offhand: ei(e, "offhand"),
		twoHanded: ei(e, "twohanded"),
		type: "weapon"
	};
}
function oi(e, t) {
	return qr(e.type, ai(e), t);
}
async function si(e, t, n) {
	let r = ai(t), i = Wr(r, r?.equipped ?? ti(t), n, r?.type === "weapon" ? ii(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function ci(e) {
	let t = Gr(ai(e)?.equipped ?? ti(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/report-paper-doll-error.ts
function li(e) {
	return e instanceof Error ? e.message : String(e);
}
function di(e, n) {
	o(`${t}: ${e}. ${li(n)}`, n);
}
function fi(e, t) {
	e.catch((e) => di(t, e));
}
//#endregion
//#region src/module/foundry/patches/paper-doll/synchronize-paper-doll.ts
var pi = "fvtt-paper-doll-ui", mi = "slots", hi = /* @__PURE__ */ new Map(), gi = /* @__PURE__ */ new Set();
function _i(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function vi(e) {
	let t = e.getFlag(pi, mi);
	if (t === void 0) return {};
	if (!Hr(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return _i(t);
}
function yi() {
	let e = game?.settings.get(pi, "globalConfig"), t = new Set([...yr, ...br]);
	if (H(e) && Object.keys(e).length === 0) return t;
	if (!H(e) || !H(e.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let n = Object.values(e.SLOTS);
	if (!n.every(H)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let r = new Set(n.flatMap((e) => Object.keys(e)));
	return r.size ? r : t;
}
function bi(e) {
	return hi.has(e.uuid);
}
function xi(e) {
	if (!Yr(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function Si(e) {
	if (!e || e.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function Ci(e) {
	let t = vi(e), n = Array.from(e.items), r = n.map(ai).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: ti(e),
		uuid: e.uuid
	})), o = Lr(t, Nr(r, ii(e)), i, yi(), a);
	return Rr(t, o) ? "unchanged" : (await e.setFlag(pi, mi, o), "synchronized");
}
async function W(e) {
	xi(e), Si(game);
	let t = e;
	if (!U(t) || !t.isOwner || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !S("paperDoll")) return "unavailable";
	let n = hi.get(t.uuid);
	if (n) return await n, W(t);
	let r = Ci(t).finally(() => {
		hi.get(t.uuid) === r && hi.delete(t.uuid);
	});
	return hi.set(t.uuid, r), r;
}
function wi(e) {
	!U(e) || !e.isOwner || gi.has(e.uuid) || (gi.add(e.uuid), queueMicrotask(() => {
		gi.delete(e.uuid), fi(W(e), `could not synchronize equipped items for ${e.uuid}`);
	}));
}
async function Ti() {
	return Si(game), Promise.all(Array.from(game.actors).filter(U).map(W));
}
//#endregion
//#region src/module/foundry/settings/get-optional-feature-statuses.ts
function Ei() {
	return Object.entries(c).map(([e, t]) => ({
		available: l(e),
		enabled: S(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
//#endregion
//#region src/module/functions/integrations/paper-doll-argon/bridge.ts
var Di = ["TRINKET", "WRIST_RIGHT"];
function Oi(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function ki(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Di) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(Oi)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function Ai(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function ji({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function Mi(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/constants.ts
var Ni = "enhancedcombathud", Pi = e, Fi = "enhancedcombathud-wfrp4e", Ii = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", Li = "modules/enhancedcombathud/icons", Ri = [
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
], zi = [{
	key: "ws",
	icon: `${Li}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${Li}/bolt-spell-cast.webp`
}], Bi = [
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
async function Vi() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/module/functions/patches/paper-doll/find-slot-changes.ts
function Hi(e, t, n) {
	return e[t]?.[n] ?? null;
}
function Ui(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = Hi(e, i, a), o = Hi(t, i, a);
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
var Wi = Symbol.for("paper-doll-wfrp4e.equipped-state");
function Gi() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function Ki(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function qi(e) {
	if (!H(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function Ji() {
	return Promise.resolve();
}
function Yi() {
	let e = Gi(), t = e?.equip, n = globalThis.fromUuid;
	if (Ki(e, t, n), !n) throw Error("Foundry UUID resolution is unavailable.");
	if (e[Wi] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!Xr(a) || Yr(this.actor) && !U(this.actor)) return r.call(this, e, t, i);
		let o = qi(i);
		if (!t) return Ji();
		if (!U(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!oi(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await si(this.actor, a, o);
		} catch (e) {
			di(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await W(this.actor);
			} catch (e) {
				di(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[Wi] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/enforce-paper-doll-slot-types.ts
var Xi = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function Zi() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function Qi(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function $i() {
	let e = Zi(), t = e?.filterItems;
	if (Qi(e, t), e[Xi] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => Xr(e) && oi(e, t));
	}, e[Xi] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-slot-tooltips.ts
var ea = ".paper-doll .paper-doll-slot", ta = `data-${e}-drag-tooltip`, na = `data-${e}-tooltip`, ra = `data-${e}-original-tooltip`, ia = {
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
}, aa = !1;
function oa(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(ea);
	return t?.closest(".paper-doll") ? t : null;
}
function sa() {
	document.querySelectorAll(`[${na}]`).forEach((e) => {
		let t = e.getAttribute(ra);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(na), e.removeAttribute(ra);
	});
}
function ca() {
	document.querySelectorAll(ea).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(ta, t), e.removeAttribute("data-tooltip"));
	});
}
function la() {
	document.querySelectorAll(`[${ta}]`).forEach((e) => {
		let t = e.getAttribute(ta);
		t && (e.dataset.tooltip = t), e.removeAttribute(ta);
	});
}
function ua(e) {
	if (aa || e.hasAttribute(na)) return;
	let t = ia[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(ra, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(na, "");
}
function da(e) {
	let t = oa(e.target);
	t && ua(t);
}
function fa() {
	aa = !0, sa(), ca();
}
function pa() {
	aa = !1, la();
}
function ma() {
	document.addEventListener("pointerover", da, !0), document.addEventListener("dragstart", fa, !0), document.addEventListener("dragend", pa, !0);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-paper-doll-hooks.ts
var ha = /* @__PURE__ */ new Map();
function ga() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && S("paperDoll");
}
function _a(e) {
	if (!H(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!H(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[pi];
	return H(n) ? "slots" in n ? Hr(n.slots) ? {
		kind: "valid",
		state: n[mi]
	} : {
		kind: "malformed",
		reason: "the Paper Doll slots update has an invalid shape"
	} : { kind: "absent" } : {
		kind: "malformed",
		reason: "the Paper Doll flag update is not an object"
	};
}
function va(e) {
	let t = _a(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function ya(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function ba(e, t) {
	let n = ha.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), ha.set(e.uuid, n);
}
function xa(e) {
	if (!H(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function Sa(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (di(n, AggregateError(r, n)), await W(e));
}
function Ca(e, t, n) {
	if (!ga() || !U(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!H(i) || typeof i.item != "string") continue;
		let t = xa(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = ya(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!oi(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(si(e, n, t));
	}
	r.length && fi(Sa(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function wa(e, t) {
	if (!ga() || !U(e) || bi(e)) return;
	let n = va(t);
	if (!n) return;
	let r = e.getFlag(pi, mi);
	if (r !== void 0) {
		if (!Hr(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of Ui(r, n)) {
			if (!t.from) continue;
			let n = ya(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && ba(e, n.uuid);
		}
	}
}
function Ta(e, t) {
	if (!ga() || !U(e) || !va(t)) return;
	let n = ha.get(e.uuid);
	ha.delete(e.uuid), n?.size && fi(Sa(e, Array.from(n, (t) => {
		let n = ya(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(ci), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function Ea(e) {
	!ga() || !Xr(e) || e.type !== "armour" && e.type !== "weapon" && !ni(e) || U(e.parent) && wi(e.parent);
}
function Da() {
	ma(), Hooks.on("paper-doll-swap", Ca), Hooks.on("preUpdateActor", wa), Hooks.on("updateActor", Ta), Hooks.on("updateItem", Ea), Hooks.once("ready", () => {
		if (ga()) {
			try {
				$i(), Yi();
			} catch (e) {
				throw di("could not initialize the required Paper Doll integration", e), e;
			}
			fi(Ti(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/fvtt-paper-doll-ui/register-integration.ts
var Oa = "fvtt-paper-doll-ui";
function ka() {
	s("fvtt-paper-doll-ui") && S("paperDoll") && Da();
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/bridge-runtime.ts
var Aa = "activeWeaponSet", ja = "slots", Ma = "weaponSets";
function Na(e) {
	let t = e.getFlag(Oa, ja);
	if (t === void 0) return {};
	if (!Hr(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function Pa(e) {
	let t = e.getFlag(Ni, Aa);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function Fa(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function Ia(e) {
	let t = e.getFlag(Ni, Ma);
	if (t === void 0) return {};
	if (!H(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !H(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: Fa(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: Fa(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function La(e, t) {
	let n = Ia(e), r = ji({
		activeSetId: Pa(e),
		mainHand: ii(e),
		mainSlots: Ai(t),
		weaponSets: n
	}), i = !Mi(n, r);
	return i && await e.setFlag(Ni, Ma, r), await Vi(), i ? "synchronized" : "unchanged";
}
function Ra(e) {
	if (!Yr(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return ki(Na(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function za(e) {
	if (!H(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!H(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[Oa];
	if (!H(n) || !(ja in n)) return null;
	let r = n[ja];
	if (!Hr(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function Ba(e) {
	if (!Yr(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return U(e) ? e.isOwner ? !S("paperDoll") || !S("argonCombatHud") || !S("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", ja) === void 0 ? (await Vi(), "unchanged") : La(e, Na(e)) : (await Vi(), "unavailable") : "unavailable";
}
//#endregion
//#region src/module/foundry/integrations/splatter/configure-splatter.ts
async function Va() {
	let e = Mn(vn);
	return await Gn(e), {
		automaticBloodColors: game?.settings.get(vn, "useBloodsheet") === !0,
		bloodColorCount: Object.keys(game?.settings.get(vn, yn)).length,
		speciesPath: e.values.creatureType
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/configuration.ts
function Ha(e) {
	return game?.i18n.localize(`wfrp4e-compatibility-box.BossBar.${e}`) ?? e;
}
function Ua(t) {
	console.error(`${e} | Boss Bar integration failed.`, t), ui?.notifications?.error(Ha("Error"));
}
function Wa() {
	return {
		currentHpPath: game?.settings.get(u, "currentHpPath"),
		maxHpPath: game?.settings.get(u, "maxHpPath"),
		woundsSystem: game?.settings.get(u, "woundsSystem")
	};
}
async function Ga() {
	return await Gn(Mn(u)), ui?.notifications?.info(Ha("Configured")), Wa();
}
//#endregion
//#region src/module/wfrp/folders/queue.ts
var Ka = /* @__PURE__ */ new WeakMap();
async function qa(e, t) {
	let n = (Ka.get(e) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		let e = globalThis.navigator?.locks;
		e ? await e.request("foundry:folder-tidy", t) : await t();
	});
	Ka.set(e, n);
	try {
		await n;
	} finally {
		Ka.get(e) === n && Ka.delete(e);
	}
}
//#endregion
//#region src/module/wfrp/folders/merge.ts
async function Ja(e, t, n, r) {
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
function Ya(e, t) {
	return e.startsWith("wfrp4e-") && [...t].some((e) => /cubicle\s*7/i.test(e.name));
}
function Xa(e, t, n) {
	let r = e["warhammer-lib"], i = e.core, a = [
		r?.source,
		e.source,
		t?.startsWith("Compendium.") ? t.split(".")[1] : void 0,
		i?.sourceId?.startsWith("Compendium.") ? i.sourceId.split(".")[1] : void 0
	];
	for (let [t, n] of Object.entries(e)) n && typeof n == "object" && "initialization-folder" in n && a.push(t);
	return a.find((e) => typeof e == "string" && n.has(e));
}
function Za(e, t) {
	if (t < 1) throw Error("WFRP folders need at least one available level.");
	return e.length <= t ? [...e] : [...e.slice(0, t - 1), e.slice(t - 1).join("/")];
}
function Qa(e, t, n, r) {
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
			let i = Za(t.map((e) => e.name), r - 1).at(-1), a = t.length === 1 || r === 2 ? n : t[Math.min(t.length - 2, r - 3)].id;
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
			path: Za(t.length ? t : e.fallbackPath ?? [e.fallback], r - 1)
		});
	}
	return f;
}
var $a = ["keepWfrpImportedContentTidy", "keepWfrpCompendiumsTidy"];
function eo(t) {
	if (!game?.user) throw Error("Foundry user is unavailable during WFRP setting registration.");
	for (let n of $a) game.settings.register(e, n, {
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
var to = "whence-they-hang";
async function no(t) {
	if (!t.ready || !t.user?.isGM) return;
	let n = t.settings.storage.get("world");
	if (!n) throw Error("World settings storage is unavailable during WFRP migration.");
	for (let r of $a) {
		if (n.getSetting(`wfrp4e-compatibility-box.${r}`)) continue;
		let i = n.getSetting(`${to}.${r}`)?.value;
		typeof i == "boolean" && await t.settings.set(e, r, i);
	}
}
//#endregion
//#region src/module/functions/wfrp/folder-defaults.ts
function G(e) {
	return e.replace(/^(?:WFRP(?:4e|5e)?|Warhammer Fantasy Roleplay)\s*[-–—:]\s*/i, "");
}
function ro(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let [r, i] of e) {
		let e = (i, a) => {
			let o = G(i.name), s = [...a, o];
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
var io = "__wfrp_tidy_root__", ao = "Warhammer Fantasy Roleplay";
async function oo(e, t) {
	await qa(e, () => so(e, t));
}
async function so(e, t) {
	if (!e.ready || !e.user?.isGM || e.system.id !== "wfrp4e") return;
	await no(e);
	let n = new Set([...e.modules.entries()].filter(([e, t]) => Ya(e, t.authors ?? [])).map(([e]) => e));
	n.add("wfrp4e");
	let r = (e) => Xa(e.flags ?? {}, e._stats?.compendiumSource, n), i = new Map([...e.modules.entries()].map(([e, t]) => [e, t.title ?? e])), a = ro([["wfrp4e", e.system.packFolders ?? []], ...[...e.modules.entries()].filter(([e]) => n.has(e)).map(([e, t]) => [e, t.packFolders ?? []])]), o = async (n, o) => {
		let s = [...e.folders].filter((e) => e.type === n), c = new Set([...s, ...o].map((e) => e.folder?.id)), l = s.filter((e) => !e.folder && (e.name === ao || e.name === "WFRP")).sort((e, t) => Number(c.has(t.id)) - Number(c.has(e.id)) || e.id.localeCompare(t.id)), u = l[0];
		await Ja(l, s, o, (e) => !!r(e)), u && u.name !== ao && await u.update({ name: ao });
		let d = Qa(s.map((e) => ({
			id: e.id,
			name: e.name,
			parent: e.folder?.id ?? null,
			official: !!r(e)
		})), o.map((e) => ({
			id: e.id,
			parent: e.folder?.id ?? null,
			official: !!r(e),
			fallback: G(i.get(r(e)) ?? "Content"),
			fallbackPath: n === "Compendium" ? a.packPaths.get(e.id) : void 0
		})), u?.id ?? io, t);
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
		u ??= await f(ao, null);
		for (let e of d.folders) await s.find((t) => t.id === e.id).update({
			name: e.name,
			folder: e.parent === io ? u.id : e.parent
		});
		for (let e of d.entries) {
			let n = u, r = o.find((t) => t.id === e.id), i = /* @__PURE__ */ new Map(), c = [];
			for (let e = r.folder; e; e = e.folder) c.unshift(e);
			for (let [e, n] of c.entries()) {
				let r = Za(c.slice(0, e + 1).map((e) => e.name), t - 1).at(-1);
				n.color != null && i.set(G(r), n.color.toString());
			}
			for (let t of e.path) {
				let e = s.filter((e) => G(e.name) === G(t) && e.folder?.id === n.id).sort((e, t) => e.id.localeCompare(t.id)), r = G(t);
				n = e[0] ?? await f(r, n.id, a.colors.get(r) ?? i.get(r));
			}
			await r.update({ folder: n.id });
		}
		let p = async (e) => {
			for (let t of s.filter((t) => t.folder?.id === e.id)) {
				let e = G(t.name), n = a.colors.get(e), r = {};
				e !== t.name && (r.name = e), n && n.toLowerCase() !== t.color?.toString().toLowerCase() && (r.color = n), Object.keys(r).length && await t.update(r), await p(t);
			}
		};
		await p(u), await Ja([u], s, o, (e) => !!r(e));
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
async function co() {
	game && await oo(game, CONST.FOLDER_MAX_DEPTH);
}
//#endregion
//#region src/module/functions/folders/empty.ts
function lo(e, t) {
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
function uo() {
	if (!game?.ready || !game.user?.isGM) throw Error("Only a GM in a loaded world can purge folders.");
	return game;
}
async function fo(e) {
	let t = uo();
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
		candidates: n.flatMap((e) => lo(e.folders().map((e) => ({
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
async function po(e) {
	let t = uo(), n = {
		deleted: 0,
		skipped: 0
	};
	return await qa(t, async () => {
		for (let t of e.candidates) {
			uo();
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
var mo = "Purge Empty Folders";
function ho(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
async function go() {
	if (!game?.ready || !game.user?.isGM) {
		ui?.notifications?.warn("Only a GM in a loaded world can purge empty folders.");
		return;
	}
	try {
		let e = await foundry.applications.api.DialogV2.wait({
			window: { title: mo },
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
		let t = await fo(e), n = t.skippedPacks ? ` Skipped ${t.skippedPacks} locked packs.` : "";
		if (!t.candidates.length) {
			ui?.notifications?.info(`No empty folders found.${n}`);
			return;
		}
		let r = t.candidates.map(({ group: e, name: t }) => `<li>${ho(e.label)}: ${ho(t)}</li>`).join("");
		if (await foundry.applications.api.DialogV2.wait({
			window: { title: mo },
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
		let i = await po(t);
		ui?.notifications?.info(`Removed ${i.deleted} empty folders. Skipped ${i.skipped} folders that changed.${n}`);
	} catch (e) {
		o(`${mo} stopped. Some folders may already have been removed. See the console for details.`, e);
	}
}
//#endregion
//#region src/module/foundry/diagnostics/startup-report.ts
var _o = {
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
}, vo = /* @__PURE__ */ new Map(), yo = [];
function bo() {
	vo.clear(), yo.length = 0;
}
function K(e, t, n) {
	vo.set(e, {
		status: t,
		detail: n
	});
}
function q(t, n, r, i) {
	try {
		n() ? K(t, "applied", r) : vo.get(t)?.status !== "applied" && K(t, i.status, i.detail);
	} catch (n) {
		K(t, "failed", n instanceof Error ? n.message : String(n)), console.error(`${e} | ${_o[t][0]} could not initialize.`, n);
	}
}
function xo(t, n) {
	yo.push(n.catch((n) => {
		K(t, "failed", n instanceof Error ? n.message : String(n)), console.error(`${e} | ${_o[t][0]} startup task failed.`, n);
	}));
}
function So() {
	return {
		foundryVersion: game?.version ?? "unknown",
		systemId: game?.system.id ?? "unknown",
		systemVersion: game?.system.version ?? "unknown",
		fixes: Object.entries(_o).map(([e, [t, n]]) => ({
			id: e,
			label: t,
			packageId: n,
			version: (n === game?.system.id ? game.system.version : game?.modules.get(n)?.version) ?? "not installed",
			...vo.get(e) ?? {
				status: "pending",
				detail: "Installation has not reported a result yet."
			}
		}))
	};
}
async function Co() {
	await Promise.allSettled(yo);
	for (let e of Object.keys(_o)) vo.has(e) || K(e, "unavailable", "The startup registration did not report a result.");
	let t = So();
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
var wo = {
	applied: "Applied",
	"not-needed": "Not needed",
	inactive: "Inactive",
	unsupported: "Unsupported version",
	unavailable: "Unavailable API",
	failed: "Failed",
	pending: "Pending"
};
async function To() {
	if (!game?.ready || !game.user?.isGM) {
		ui?.notifications?.warn("Only a GM in a loaded world can open the startup fix report.");
		return;
	}
	let e = So(), t = foundry.utils.escapeHTML, n = e.fixes.map((e) => `<tr><td>${t(e.label)}<br><small>${t(e.packageId)} ${t(e.version)}</small></td><td>${wo[e.status]}</td><td>${t(e.detail)}</td></tr>`).join("");
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
function Eo() {
	bo(), Hooks.once("setup", () => {
		m("world", "startupFixReport", {
			name: "Startup compatibility fixes",
			label: "Startup Fix Report",
			hint: "Review applied fixes, upstream corrections, unsupported versions, and missing APIs on this client.",
			icon: "fa-solid fa-clipboard-check",
			restricted: !0,
			type: class extends foundry.applications.api.ApplicationV2 {
				async render() {
					return await To(), this;
				}
			}
		});
	}), Hooks.once("ready", Co);
}
//#endregion
//#region src/module/foundry/api/create-module-api.ts
function Do() {
	return {
		getStartupReport: So,
		reviewCalendarMigration: Bt,
		showStartupReport: To,
		importCalendarContent: bt,
		reviewCalendarContent: Ht,
		settingsPresets: cr,
		settingsPresetCoordinator: gr,
		configureBossBar: Ga,
		configureSplatter: Va,
		purgeEmptyFolders: go,
		getOptionalFeatures: Ei,
		syncAllPaperDollActors: Ti,
		syncPaperDollArgonActor: Ba,
		syncPaperDollActor: W,
		tidyWfrpContent: co
	};
}
//#endregion
//#region src/module/foundry/api/register-module-api.ts
function Oo() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	let n = t;
	n.api = Do();
}
//#endregion
//#region src/module/functions/integrations/bossbar/selection.ts
function ko(e) {
	let t = e.filter((e) => e.enemy), n = (e, t) => e.traits.some((e) => e.trim().toLowerCase() === t), r = t.filter((e) => n(e, "boss"));
	if (r.length) return r;
	let i = t.filter((e) => e.maxWounds >= 30 && n(e, "grim") && (n(e, "leader") || n(e, "champion"))).sort((e, t) => t.maxWounds - e.maxWounds || t.weaponSkill - e.weaponSkill || t.strength - e.strength), a = i[0];
	if (!a) return [];
	let o = i.filter((e) => e.maxWounds === a.maxWounds && e.weaponSkill === a.weaponSkill && e.strength === a.strength);
	return o.length <= 2 ? o : [];
}
//#endregion
//#region src/module/functions/integrations/bossbar/health.ts
var Ao = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
};
function jo(e) {
	return Object.entries(Ao).every(([t, n]) => e[t] === n);
}
function Mo(e, t) {
	return !Number.isFinite(e) || !Number.isFinite(t) || t <= 0 ? 0 : Math.min(100, Math.max(0, 100 * e / t));
}
function No(e) {
	let t = Number.isFinite(e.maxCriticals) ? Math.max(0, Math.floor(e.maxCriticals)) : 0;
	return {
		max: t,
		remaining: Math.max(0, t - Math.max(0, e.criticals))
	};
}
function Po(e) {
	return (typeof e == "number" || typeof e == "string" && e.trim() !== "") && Number.isFinite(Number(e));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/runtime.ts
function Fo() {
	return ui && Reflect.get(ui, "bossBar");
}
function Io(e) {
	return Array.from(e.combatants).flatMap(({ actor: e, token: t }) => e ? [{
		uuid: e.uuid,
		enemy: t?.disposition === -1 && !e.hasPlayerOwner,
		traits: Array.from(e.items).filter((e) => e.type === "trait").map((e) => e.name),
		maxWounds: e.system.status?.wounds?.max ?? 0,
		weaponSkill: e.system.characteristics?.ws?.value ?? 0,
		strength: e.system.characteristics?.s?.value ?? 0
	}] : []);
}
function Lo(e) {
	return {
		wounds: e.system.status?.wounds?.value ?? 0,
		maxWounds: e.system.status?.wounds?.max ?? 0,
		maxCriticals: e.system.status?.criticalWounds?.max ?? 0,
		criticals: Array.from(e.items).filter((e) => e.type === "critical" && Po(e.system?.wounds?.value)).length
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/combat.ts
var Ro = /* @__PURE__ */ new WeakSet();
async function zo(e) {
	if (!game?.user?.isGM || !S("bossBar") || !game.settings.get("wfrp4e-compatibility-box", d.automatic) || !e.scene || Ro.has(e)) return;
	let t = ko(Io(e)), n = e.scene.getFlag("bossbar", "actors") ?? [], r = new Set(n.map((e) => e.uuid)), i = game.settings.get(u, "barStyles"), a = t.filter((e) => r.has(e.uuid) ? !1 : (r.add(e.uuid), !0)).map((e) => ({
		uuid: e.uuid,
		style: i[0]?.id ?? "default",
		hideName: !1
	}));
	if (a.length) {
		Ro.add(e);
		try {
			await e.scene.setFlag(u, "actors", [...n, ...a]);
		} finally {
			Ro.delete(e);
		}
	}
}
//#endregion
//#region src/module/foundry/integrations/bossbar/critical-segments.ts
var Bo = "wfrp-bossbar-segments", Vo = "http://www.w3.org/2000/svg", Ho = [
	"background",
	"bar",
	"foreground"
], Uo = [
	"bg",
	"bar",
	"fg"
];
function Wo(e, t) {
	let n = Ho.map((t) => e.querySelector(`:scope > .bar-${t}`)), r = n.map((e) => e?.querySelector(":scope > img")), i = r.every((e, t) => e?.getAttribute("src")?.split(/[?#]/)[0]?.endsWith(`/bossbar/resources/matching-images/segmented/${Uo[t]}.png`)), a = t !== void 0 && i ? String(t) : void 0;
	if (e.dataset.wfrpBossbarSegments === a) return;
	e.querySelectorAll(`.${Bo}`).forEach((e) => e.remove()), e.classList.toggle("wfrp-bossbar-segmented", a !== void 0);
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
		o.className = Bo, o.setAttribute("aria-hidden", "true"), o.style.gridTemplateColumns = a === "0" ? "none" : `repeat(${a}, minmax(0, 1fr))`;
		for (let t = 0; t < Number(a); t++) o.append(Go(e.ownerDocument, n.src));
		i.append(o);
	}
}
function Go(e, t) {
	let n = e.createElementNS(Vo, "svg");
	n.setAttribute("viewBox", "829 0 787 361"), n.setAttribute("preserveAspectRatio", "xMidYMid meet");
	let r = e.createElementNS(Vo, "image");
	return r.setAttribute("href", t), r.setAttribute("width", "7967"), r.setAttribute("height", "361"), n.append(r), n;
}
//#endregion
//#region src/module/foundry/integrations/bossbar/wounds-bar.ts
function Ko(e, t) {
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
function qo(e, t) {
	return e.find((e) => e.id === t) ?? e[0];
}
//#endregion
//#region src/module/foundry/integrations/bossbar/display.ts
function Jo(t = Fo()) {
	if (!t?.element || t.id !== "boss-bar") return;
	let n = t.element;
	n.classList.add("wfrp4e-compatibility-box-bossbar");
	let r = nn() && game?.settings.get("wfrp4e-compatibility-box", d.stacked) === !0 && jo(Wa()), i = game?.settings.get(u, "barStyles"), a = game?.settings.get(e, d.woundsStyle), o = qo(i, a);
	for (let e of n.querySelectorAll(".bar-list-item")) {
		let n = t.bars.find((t) => t.actor.uuid === e.dataset.uuid)?.actor;
		if (!n) continue;
		let i = e.querySelector(".boss-bar-container:not(.wfrp-bossbar-wounds)");
		if (!i) continue;
		if (!r || !o) {
			Wo(i), e.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), i.dataset.wfrpBossbarPrimary && (i.style.removeProperty("--bar-percent"), i.removeAttribute("role"), i.removeAttribute("aria-label"), i.removeAttribute("aria-valuenow"), i.removeAttribute("aria-valuemax"), i.removeAttribute("aria-valuemin"), delete i.dataset.wfrpBossbarPrimary);
			continue;
		}
		let a = Lo(n), s = No(a);
		Wo(i, s.max), i.dataset.wfrpBossbarPrimary = "true", i.style.setProperty("--bar-percent", `${Mo(s.remaining, s.max)}%`), Yo(i, Ha("CriticalCapacity"), s.remaining, s.max);
		let c = e.querySelector(".wfrp-bossbar-wounds");
		c?.dataset.style !== o.id && (e.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), c = Ko(e.ownerDocument, o), c.dataset.wfrpBossbarExtra = "", c.dataset.style = o.id, i.before(c)), c && (c.style.setProperty("--bar-percent", `${Mo(a.wounds, a.maxWounds)}%`), c.classList.toggle("wfrp-bossbar-threat", a.wounds <= 0), Yo(c, Ha("Wounds"), Math.max(0, a.wounds), a.maxWounds));
	}
}
function Yo(e, t, n, r) {
	e.setAttribute("role", "progressbar"), e.setAttribute("aria-label", t), e.setAttribute("aria-valuemin", "0"), e.setAttribute("aria-valuemax", String(Math.max(0, r))), e.setAttribute("aria-valuenow", String(Math.min(n, Math.max(0, r))));
}
var Xo = !1;
function Zo() {
	Xo || (Xo = !0, queueMicrotask(() => {
		Xo = !1;
		let e = Fo();
		if (e?.element?.isConnected) try {
			e.updateBars(), Jo(e);
		} catch (e) {
			Ua(e);
		}
	}));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/settings.ts
function Qo() {
	if (game) {
		for (let t of ["automatic", "stacked"]) game.settings.register(e, d[t], {
			name: `${e}.BossBar.Settings.${t}.Name`,
			hint: `${e}.BossBar.Settings.${t}.Hint`,
			config: !1,
			default: !0,
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
}
function $o(t) {
	if (!game?.user?.isGM) return;
	let n = t.querySelector(`[name="${u}.currentHpPath"]`)?.closest(".form-group");
	if (!n || t.querySelector("[data-wfrp-bossbar-setup]")) return;
	let r = t.ownerDocument.createElement("div");
	r.className = "form-group", r.dataset.wfrpBossbarSetup = "";
	let i = t.ownerDocument.createElement("button");
	i.type = "button", i.textContent = Ha("Configure"), i.addEventListener("click", async () => {
		i.disabled = !0;
		try {
			let n = await Ga();
			for (let [e, r] of Object.entries(n)) {
				let n = t.querySelector(`[name="bossbar.${e}"]`);
				n && (typeof r == "boolean" ? n.checked = r : n.value = r);
			}
			let r = t.querySelector(`[name="${e}.${d.stacked}"]`);
			r && (r.checked = !0);
		} catch (e) {
			Ua(e);
		} finally {
			i.disabled = !1;
		}
	}), r.append(i), n.insertAdjacentElement("beforebegin", r);
}
//#endregion
//#region src/module/foundry/integrations/bossbar/register-integration.ts
function es() {
	if (s("bossbar") && !(!S("bossBar") || game?.system.id !== "wfrp4e")) {
		Qo(), Hooks.on("combatStart", (e) => void zo(e).catch(Ua)), Hooks.on("renderBossBar", (e) => Jo(e)), Hooks.on("renderSettingsConfig", (e, t) => {
			t instanceof HTMLElement && $o(t);
		});
		for (let e of [
			"updateActor",
			"createItem",
			"updateItem",
			"deleteItem",
			"createActiveEffect",
			"updateActiveEffect",
			"deleteActiveEffect"
		]) Hooks.on(e, Zo);
		Hooks.on("updateSetting", (e) => {
			let t = e.key;
			[
				"bossbar.currentHpPath",
				"bossbar.maxHpPath",
				"bossbar.woundsSystem"
			].includes(t) && Fo()?.render(!0).catch(Ua), (t.startsWith("bossbar.") || t.startsWith("wfrp4e-compatibility-box.bossBar") || t === "wfrp4e.uiaCrits") && Zo();
		});
	}
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/argon-logic.ts
var ts = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function ns(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function rs(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function is(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function as(e) {
	return e.trim().toLowerCase();
}
function os(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function ss(e) {
	return e.type === "trait" ? (is(e), e.rollable && !e.disabled && ts.has(e.traitBaseName.toLowerCase())) : !1;
}
function cs(e) {
	return e.type === "weapon" || ss(e);
}
function ls(e) {
	return e.type === "weapon";
}
function us(e) {
	return ns(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function ds(e) {
	return ns(e), e.advances > 0;
}
function fs(e, t) {
	return e.forEach(ns), t === "basic" ? e.filter((e) => !us(e)).map((e) => e.id) : t === "advanced" ? e.filter(us).map((e) => e.id) : t === "trained" ? e.filter(ds).map((e) => e.id) : e.map((e) => e.id);
}
function ps(e, t) {
	return e.forEach(rs), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function ms(e) {
	return e.filter((e) => e.type === "weapon" || ss(e)).map((e) => e.id);
}
function hs(e) {
	return e.filter((e) => e.type === "trait" ? (is(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function gs(e, t) {
	return e.forEach(ns), t.flatMap((t) => {
		let n = as(t.name), r = e.find((e) => as(e.name) === n);
		return !r || t.trained && !ds(r) ? [] : [r.id];
	});
}
function _s(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function vs(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function ys(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => vs(e.name, t))).map((e) => e.id) : [];
}
function bs(e) {
	let t = [];
	return (e.type === "weapon" || ss(e)) && t.push({
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
function xs(e, t) {
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
var Ss = "argonCombatItemPatterns", Cs = "*Draught*, *Potion*";
function J(t, n) {
	let r = c[n];
	l(n) && t.register(e, r.settingKey, {
		config: !1,
		default: !0,
		hint: `${e}.Settings.Features.${n}.Hint`,
		name: `${e}.Settings.Features.${n}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function ws(t) {
	l("argonCombatHud") && t.register(e, Ss, {
		config: !1,
		default: Cs,
		hint: `${e}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${e}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: Vi,
		scope: "world",
		type: String
	});
}
function Ts() {
	if (!game) throw Error(`${e} | Foundry game is unavailable during settings registration.`);
	J(game.settings, "argonCombatHud"), J(game.settings, "bossBar"), J(game.settings, "healthEstimate"), J(game.settings, "paperDoll"), J(game.settings, "paperDollArgonBridge"), J(game.settings, "simpleCalendar"), J(game.settings, "simpleTimekeeping"), ws(game.settings);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/actor-flags.ts
var Es = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function Ds(e, t) {
	return e.flags?.[Fi]?.[t];
}
function Os(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? Ds(e, t);
}
async function ks(t) {
	let n = {};
	for (let r of Es) {
		if (t.getFlag("wfrp4e-compatibility-box", r) !== void 0) continue;
		let i = Ds(t, r);
		i !== void 0 && (n[`flags.${e}.${r}`] = i);
	}
	Object.keys(n).length && await t.update(n);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/argon-helpers.ts
function As(t, n) {
	if (typeof t != "object" || !t) throw Error(`${e} | ${n} must be an object.`);
	return t;
}
function Y(t, n) {
	if (typeof t != "string" || !t.trim()) throw Error(`${e} | ${n} must be a non-empty string.`);
	return t;
}
function js(t, n) {
	if (typeof t != "boolean") throw Error(`${e} | ${n} must be a boolean.`);
	return t;
}
function Ms(t, n) {
	if (!Number.isNumeric(t)) throw Error(`${e} | ${n} must be numeric.`);
	return Number(t);
}
function Ns(e) {
	return e == null || e === "" ? null : Ms(e, "item quantity");
}
function Ps(t, n, r, i) {
	let a = Os(t, n);
	if (a === void 0) return i;
	if (!r.includes(a)) throw Error(`${e} | Argon actor flag ${Pi}.${n} has invalid value ${String(a)}.`);
	return a;
}
function Fs(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = js(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function Is(e, t = !1) {
	let n = As(e, "Argon item"), r = Y(n.type, "Argon item type"), i = Y(n.name, `${r} item name`), a = {
		id: Y(n.id, `${r} ${i} id`),
		name: i,
		quantity: Ns(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = Y(n.advanced?.value, `${i} advanced classification`), a.grouped = Y(n.grouped?.value, `${i} grouped classification`), a.advances = Ms(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = Y(n.lore?.value, `${i} lore`), a.memorized = js(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = js(n.system?.disabled, `${i} disabled state`), a.rollable = js(n.rollable?.value, `${i} rollable state`), a.traitBaseName = os(i)), t && Fs(a, n, r), a;
}
function X(e) {
	return [...e].map((e) => Is(e));
}
function Z(t, n) {
	let r = new Map([...t].map((e) => [e.id, e]));
	return n.map((t) => {
		let n = r.get(t);
		if (!n) throw Error(`${e} | Selected Argon item ${t} is no longer available.`);
		return n;
	});
}
function Ls(e) {
	return bs(Is(e, !0));
}
function Rs(e) {
	let t = Ps(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return Z(n, fs(X(n), t));
}
function zs(e) {
	let t = Ps(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return Z(n, ps(X(n), t));
}
function Bs(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return Z(t, ms(X(t)));
}
function Vs(e) {
	let t = [...e.itemTypes.trait];
	return Z(t, hs(X(t)));
}
function Hs(e) {
	let t = zi.map((e) => ({
		...e,
		type: "characteristic"
	})), n = Bi.map((e) => ({
		name: Us(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = Z(r, gs(X(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function Us({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = Js(`NAME.${e}`, t);
	return n ? `${i} (${Js(n, r)})` : i;
}
function Ws(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = _s(String(t)), r = [...e.items];
	return Z(r, ys(X(r), n));
}
function Gs(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function Ks(e) {
	return cs(Is(e));
}
function qs(e) {
	return ls(Is(e));
}
function Js(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/buttons.ts
function Ys(e) {
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
				details: Ls(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = Gs(this.item);
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
			let e = zs(this.actor), t = Bs(this.actor), s = Vs(this.actor), c = Hs(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = Ws(this.actor), u = [
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
				icon: `${Li}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${Li}/drink-me.webp`,
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
function Xs() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!S("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/movement.ts
function Zs(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function Qs(e, t, n) {
	Zs(e, "move score"), Zs(t, "maximum distance"), Zs(n, "used distance");
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
function $s(e) {
	return Zs(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/panels.ts
function ec(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function tc(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function nc(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return Ii;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await ks(this.actor), await super._onConfigure(e);
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
			let e = Ri.map((e) => {
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
			}), n = Rs(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return ec(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return ec(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return tc(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += ec(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = Qs(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${$s(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${$s(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: $s(t.bubbleDistance),
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
function rc(t) {
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
			if (!Ks(r) || r.actor !== this.actor) throw Error(`${e} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let i = t.currentTarget.dataset.set, a = t.currentTarget.dataset.slot;
			if (!i || !a) throw Error(`${e} | Argon weapon-set drop target has no set or slot identifier.`);
			let o = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			o[i] ??= {}, o[i][a] = r.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", o), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!Os(this.actor, "switchEquip")) return;
			let n = xs(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(qs).map((e) => ({
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
function ic() {
	if (!s("enhancedcombathud")) {
		K("argonLegacy", "inactive", "Argon Combat HUD is not active.");
		return;
	}
	if (!S("argonCombatHud")) {
		K("argonLegacy", "inactive", "Argon compatibility is disabled.");
		return;
	}
	q("argonLegacy", () => (Xs(), !0), "Legacy enhancedcombathud-wfrp4e package check bypass installed.", {
		status: "unavailable",
		detail: "Argon's legacy module-check API is unavailable."
	}), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = Ys(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = nc(e), a = rc(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	});
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/panels.ts
function ac(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = Ys(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return Ra(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/report-bridge-error.ts
function oc(e) {
	return e instanceof Error ? e.message : String(e);
}
function sc(e, n) {
	o(`${t}: ${e}. ${oc(n)}`, n);
}
function cc(e, t) {
	e.catch((e) => sc(t, e));
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/register-integration.ts
function lc() {
	return S("paperDoll") && S("argonCombatHud") && S("paperDollArgonBridge");
}
function uc(e, t) {
	!lc() || !U(e) || za(t) && cc(Ba(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function dc() {
	s("fvtt-paper-doll-ui") && s("enhancedcombathud") && lc() && (Hooks.on("argonInit", (e) => {
		if (!e || typeof e != "object" && typeof e != "function" || !("defineMainPanels" in e) || typeof e.defineMainPanels != "function") throw Error("Argon main panel registration API is unavailable.");
		let { PaperDollQuickItemsPanel: t } = ac(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", uc));
}
//#endregion
//#region src/module/foundry/settings/conflicts/register.ts
function fc() {
	Hooks.once("setup", () => {
		game?.settings.register(e, pr, {
			name: "Settings preset conflict choices",
			hint: "Preferred sources for conflicting settings presets.",
			scope: "world",
			config: !1,
			default: {},
			type: Object
		}), m("presets", "resetPresetConflictChoices", {
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
					}) === "reset" && await gr.reset(), this;
				}
			}
		});
	});
}
//#endregion
//#region src/module/foundry/settings/presets/register.ts
function pc() {
	ee("presets"), fc();
	let t = Nn().filter(B);
	Hooks.once("setup", () => {
		m("presets", "exportSettingsPreset", {
			name: "Settings presets",
			label: "Export Settings Preset",
			hint: "Choose exact world settings to download as namespace JSON.",
			icon: "fa-solid fa-file-export",
			restricted: !0,
			type: class extends foundry.applications.api.ApplicationV2 {
				async render() {
					try {
						await or();
					} catch (e) {
						er(e);
					}
					return this;
				}
			}
		});
		for (let n of t) {
			let t = Qn(n);
			game?.settings.register(e, $n(n), {
				name: `Ignore ${t} setup prompts`,
				hint: `Do not prompt when ${t} settings differ from the included preset. Uncheck to resume startup checks for all GMs in this world.`,
				config: !1,
				default: !1,
				scope: "world",
				type: Boolean
			}), !["foundryvtt-simple-calendar-reborn", "simple-timekeeping"].includes(n.namespace) && m("presets", n.menuKey ?? `configureSettingsPreset-${n.namespace}`, {
				name: `${t} settings preset`,
				settingKey: $n(n),
				label: `Apply ${t} Preset`,
				hint: `Apply only the settings included in Compatibility Box's ${t} preset.`,
				icon: "fa-solid fa-gears",
				restricted: !0,
				type: class extends foundry.applications.api.ApplicationV2 {
					async render() {
						try {
							await tr(n);
						} catch (e) {
							er(e);
						}
						return this;
					}
				}
			});
		}
	}), Hooks.on("updateSetting", (e) => {
		let n = e.key;
		for (let e of t.filter((e) => e.watchSettings?.includes(n))) nr(e, !0).catch(er);
	}), Hooks.once("ready", async () => {
		for (let e of t) try {
			await nr(e);
		} catch (e) {
			er(e);
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/repair-mad-prefab-exclusions.ts
var mc = /* @__PURE__ */ new WeakSet();
function hc(t) {
	if (mc.has(t)) return !1;
	let n = t.Initialise, r = /* @__PURE__ */ new Set();
	return t.Initialise = function(t, ...i) {
		let a = t?.moduleName, o = a ? game?.modules.get(a) : void 0, s = t?.ignoredCompendiumPacks;
		if (!a?.startsWith("mad-") || !o?.active || !o.packs) return n.call(this, t, ...i);
		let c = `${a}-prefabs`;
		return !Array.isArray(s) || !s.includes(c) || Array.from(o.packs).some((e) => e.name === c) ? n.call(this, t, ...i) : (r.has(a) || (r.add(a), console.warn(`${e} | ${a}: skipped unavailable Scene Packer exclusion ${c}.`)), n.call(this, {
			...t,
			ignoredCompendiumPacks: s.filter((e) => e !== c)
		}, ...i));
	}, mc.add(t), !0;
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/register-integration.ts
function gc() {
	if (!s("scene-packer")) {
		K("scenePacker", "inactive", "Scene Packer is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e") {
		K("scenePacker", "inactive", "Requires a WFRP4e world.");
		return;
	}
	if (typeof ScenePacker > "u" || typeof ScenePacker.Initialise != "function") {
		K("scenePacker", "unavailable", "Scene Packer is active but its initialization API is unavailable at init.");
		return;
	}
	q("scenePacker", () => hc(ScenePacker), "Guard installed for unavailable MAD prefab exclusions.", {
		status: "not-needed",
		detail: "The exclusion guard was already installed."
	});
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/repair-forge-owner-detection.ts
var _c = /* @__PURE__ */ new WeakSet();
function vc(e, t) {
	if (_c.has(e)) return !1;
	let n = e._detectForgeAccountId;
	return e._detectForgeAccountId = async function() {
		let e = t();
		return this.isRunningOnForge() && typeof e == "string" && /^[a-zA-Z0-9_-]+$/.test(e) && e !== "bazaar" ? (this.forgeAccountId = e, !0) : n.call(this);
	}, _c.add(e), !0;
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/register-integration.ts
async function yc() {
	if (!s("fa-nexus")) {
		K("forgeOwner", "inactive", "FA Nexus is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e" || typeof ForgeAPI > "u") {
		K("forgeOwner", "inactive", "Requires WFRP4e with Forge's API present.");
		return;
	}
	let t = Array.from(document.querySelectorAll("script[type=\"module\"][src]")).find((e) => {
		let t = new URL(e.src).pathname;
		return /\/modules\/fa-nexus\/(?:[^/]+\/)?scripts\/core\/forge-integration\.js$/.test(t);
	});
	if (!t) {
		K("forgeOwner", "unavailable", "The loaded FA Nexus Forge integration script could not be located."), console.warn(`${e} | FA Nexus Forge integration script was not found; patch skipped.`);
		return;
	}
	try {
		let e = (await import(
			/* @vite-ignore */
			t.src
)).forgeIntegration;
		if (typeof e?._detectForgeAccountId != "function" || typeof e.isRunningOnForge != "function") throw Error("FA Nexus Forge integration API is unavailable.");
		vc(e, () => ForgeAPI.lastStatus?.ownerUserId), K("forgeOwner", "applied", "Forge owner-metadata fallback installed on the loaded Nexus service.");
	} catch (t) {
		K("forgeOwner", "failed", t instanceof Error ? t.message : String(t)), console.error(`${e} | Could not install FA Nexus Forge compatibility.`, t);
	}
}
//#endregion
//#region src/module/foundry/integrations/simple-quest/apply-template.ts
var bc = "https://source.unsplash.com/random", xc = "<div style=\"background:#9ca7a5;border-top:2px solid #252525;border-bottom:2px solid #252525;padding:0 0.5em\">\n<p><span style=\"color:#252525;text-transform:uppercase\"><strong>Lorem Ipsum</strong></span></p>\n<p><span style=\"color:#252525\">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni asperiores dicta vitae veritatis. Aut atque nobis voluptatem at alias, quam similique corrupti mollitia nihil laboriosam, consequuntur quibusdam ut, quos nesciunt.</span></p>\n</div>";
function Sc(e) {
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
async function Cc(e, t, n) {
	await t.close({ force: !0 });
	try {
		let r = t.document.text?.content ?? "", i = new URL(e, document.baseURI).pathname.endsWith("/modules/simple-quest/templates/JournalTemplates/boxed-text.html") ? xc : await fetch(e).then((e) => {
			if (!e.ok) throw Error(`Simple Quest template request failed: ${e.status}`);
			return e.text();
		}), a = i.match(/https:\/\/source\.unsplash\.com\/random/g) ?? [], o = [];
		for (let e of a) o.push(await Sc(n));
		let s = 0;
		i = i.replaceAll(bc, () => o[s++] || bc), await t.document.update({ "text.content": r + "\n" + i });
	} finally {
		t.render(!0);
	}
}
//#endregion
//#region src/module/foundry/integrations/simple-quest/template-dialog.ts
var wc = {
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
async function Tc(e, t) {
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
			icon: wc[r] ?? "fad fa-file-invoice",
			callback: () => Cc(n, e, t)
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
var Ec = ["simpleQuestBox", "simpleQuestContent"];
function Dc() {
	if (!s("simple-quest")) {
		for (let e of Ec) K(e, "inactive", "Simple Quest is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e") {
		for (let e of Ec) K(e, "inactive", "Requires a WFRP4e world.");
		return;
	}
	if (game.modules.get("simple-quest")?.version !== "5.3.0" || !["14.368", "14.369"].includes(game.version)) {
		for (let e of Ec) K(e, "unsupported", "Requires verified SQ 5.3.0 on Foundry 14.368 or 14.369.");
		console.warn(`${e} | Simple Quest page-template fixes skipped for unverified versions.`);
		return;
	}
	Hooks.on("getHeaderControlsJournalEntryPageHandlebarsSheet", (e, t) => {
		let n = e;
		if (!n?.document || !Array.isArray(t)) return;
		let r = t.find((e) => e.class === "simple-quest-page-template");
		!r || typeof r.onClick != "function" || (r.onClick = () => Tc(n, foundry));
	});
	for (let e of Ec) K(e, "applied", "Replacement Page Template action registered for the verified versions.");
}
//#endregion
//#region src/module/foundry/integrations/image-context/register-integration.ts
var Oc = /* @__PURE__ */ new WeakSet(), kc = ["#token-hud .status-effects .effect-control[data-status-id]", "#token-hud .condition-effects .effect-control[data-status-id]"].join(", ");
function Ac() {
	if (!s("image-context")) {
		K("imageContext", "inactive", "Image Context is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e") {
		K("imageContext", "inactive", "Requires a WFRP4e world.");
		return;
	}
	if (typeof ImageContext > "u" || typeof ImageContext.onContextMenu != "function") {
		K("imageContext", "unavailable", "Image Context is active but its context-menu API is unavailable at init.");
		return;
	}
	if (Oc.has(ImageContext)) {
		K("imageContext", "applied", "The token HUD condition exclusion is already installed.");
		return;
	}
	let e = ImageContext.onContextMenu;
	ImageContext.onContextMenu = function(t) {
		if (!(t.target instanceof Element && t.target.closest(kc))) return e.call(this, t);
	}, Oc.add(ImageContext), K("imageContext", "applied", "Image menus are excluded only from WFRP token HUD condition controls.");
}
//#endregion
//#region src/module/functions/patches/wfrp4e/migration-return-support.ts
function jc(e) {
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
var Mc = /* @__PURE__ */ new WeakSet();
function Nc(e) {
	let t = e.migrateData;
	return typeof t != "function" || Mc.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, Mc.add(e), !0);
}
function Pc() {
	return game?.system.id !== "wfrp4e" || jc(game.system.version) !== "affected" ? 0 : [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(Nc(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-roll-modes.ts
function Fc() {
	let e = game?.wfrp4e?.config, t = CONFIG.ChatMessage.modes;
	return !e || !t ? !1 : (e.rollModes = foundry.utils.deepClone(t), !0);
}
//#endregion
//#region src/module/functions/patches/wfrp4e/chat-card-references.ts
function Ic(e) {
	return typeof e == "object" && e ? e : {};
}
function Q(e) {
	return typeof e == "string" ? e : "";
}
function Lc(e) {
	let t = Ic(e);
	return {
		kind: "speaker",
		actor: Q(t.actor),
		scene: Q(t.scene),
		token: Q(t.token)
	};
}
function Rc(e) {
	return Lc(Ic(Ic(e).context).speaker);
}
function zc(e) {
	let t = e.system ?? {};
	switch (e.type) {
		case "test": return [Rc(t.testData)];
		case "opposed": {
			let e = Ic(t.opposedTestData);
			return [Rc(e.attackerTestData), Rc(e.defenderTestData)];
		}
		case "magic": {
			let e = Ic(t.sourceData), n = [{
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
			let e = Ic(t.opposedData), n = [{
				kind: "message",
				id: Q(e.attackerMessageId),
				required: !0
			}];
			return e.targetSpeakerData && n.push(Lc(e.targetSpeakerData)), e.defenderMessageId && n.push({
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
function Bc(e) {
	let t = new DOMParser().parseFromString(e, "text/html").body;
	for (let e of t.querySelectorAll("script, style, template, button, input, select, textarea, .chat-button, a[data-action], [role='button'], .dice-tooltip, .applied-breakdown, .secret:not(.revealed), [hidden], [aria-hidden='true']")) e.remove();
	for (let e of t.querySelectorAll("img")) e.replaceWith(t.ownerDocument.createTextNode(e.alt ? ` ${e.alt} ` : ""));
	for (let e of t.querySelectorAll("br, p, div, li, tr, h1, h2, h3, h4, h5, h6")) e.append(t.ownerDocument.createTextNode("\n"));
	for (let e of t.querySelectorAll("td, th")) e.append(t.ownerDocument.createTextNode(" "));
	return (t.textContent ?? "").split("\n").map((e) => e.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}
function Vc(e) {
	let t = document.createElement("p");
	return t.textContent = e, t.style.whiteSpace = "pre-line", t;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/render-orphaned-chat-cards.ts
var Hc = /* @__PURE__ */ new WeakSet();
function Uc(e) {
	if (!game) return !1;
	switch (e.kind) {
		case "speaker": return e.scene && e.token ? !!game.scenes.get(e.scene)?.tokens.get(e.token)?.actor : !!(e.actor && game.actors.get(e.actor));
		case "uuid": return !!(e.uuid && fromUuidSync(e.uuid)?.documentName === "Actor");
		case "message": {
			let t = game.messages.get(e.id);
			return t ? t._source.type === "test" ? zc(t._source).every(Uc) : !1 : !e.required;
		}
	}
}
async function Wc(e, t) {
	let n = e.toObject(), r = e.visible && e.isContentVisible, i = r ? Bc(n.content) : "", a = new foundry.documents.ChatMessage({
		...n,
		type: "base",
		system: {},
		flags: {},
		content: Vc(i).outerHTML
	}), o = await a.renderHTML(t), s = o.querySelector(".message-content");
	if (s) {
		let e = r && a.isContentVisible ? i : Bc(s.innerHTML);
		s.replaceChildren(Vc(e));
	}
	return o.addEventListener("contextmenu", (e) => e.stopPropagation(), { capture: !0 }), o;
}
function Gc() {
	let e = CONFIG.ChatMessage.documentClass?.prototype;
	if (!e || typeof e.renderHTML != "function" || Hc.has(e)) return !1;
	let t = e.renderHTML;
	return e.renderHTML = function(e) {
		return zc(this._source).some((e) => !Uc(e)) ? Wc(this, e) : t.call(this, e);
	}, Hc.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/active-effect-schema.ts
function Kc(e) {
	let t = e.schema;
	if (t.fields.changes) return !1;
	let n = e.defineSchema;
	return e.defineSchema = function() {
		let e = n.call(this);
		return e.changes ||= foundry.data.ActiveEffectTypeDataModel.defineSchema().changes, e;
	}, t.extendFields({ changes: foundry.data.ActiveEffectTypeDataModel.defineSchema().changes }), !0;
}
function qc() {
	return Object.values(CONFIG.ActiveEffect?.dataModels ?? {}).reduce((e, t) => e + Number(Kc(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/guard-actorless-token-ruler.ts
var Jc = /* @__PURE__ */ new WeakSet(), Yc = /* @__PURE__ */ new WeakSet();
function Xc() {
	let e = CONFIG.Token?.rulerClass?.prototype, t = foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	if (!e || !t || e === t || !Object.prototype.isPrototypeOf.call(t, e) || typeof e._getSegmentStyle != "function" || typeof t._getSegmentStyle != "function" || Jc.has(e)) return !1;
	let n = e._getSegmentStyle, r = t._getSegmentStyle;
	return e._getSegmentStyle = function(...e) {
		if (this.token.actor) return n.apply(this, e);
		if (!Yc.has(this.token)) {
			Yc.add(this.token);
			let { uuid: e, actorId: t, actorLink: n } = this.token.document;
			console.warn("WFRP4e Compatibility Box | Token has no actor; using the core ruler style.", {
				tokenUuid: e,
				actorId: t,
				actorLink: n,
				worldActorExists: !!(t && game?.actors.get(t))
			});
		}
		return r.apply(this, e);
	}, Jc.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/dual-wielder-cleanup.ts
var Zc = /* @__PURE__ */ new WeakSet(), Qc = ["10.0.3", "10.1.2"];
function $c() {
	if (!game || !Qc.includes(game.system.version)) return !1;
	let e = CONFIG.Actor.documentClass;
	if (typeof e != "function") return !1;
	let t = e.prototype;
	if (!H(t) || typeof t.getScripts != "function") return !1;
	let n = t;
	if (Zc.has(n)) return !1;
	let r = n.getScripts;
	return n.getScripts = function(e, ...t) {
		let n = r.call(this, e, ...t);
		return e === "startTurn" ? n.filter((e) => !(e.context?.effect?.statuses.has("dualwielder") && /^this\.effect\.delete\(\);?$/.test(e.script.trim()))) : n;
	}, Zc.add(n), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/apply-compatibility-patches.ts
function el() {
	if (game?.system.id !== "wfrp4e") {
		for (let e of [
			"rollModes",
			"migrationReturns",
			"effectSchema",
			"orphanedChat",
			"actorlessRuler",
			"dualWielder"
		]) K(e, "inactive", "Requires a WFRP4e world.");
		return;
	}
	q("rollModes", Fc, "WFRP received an independent copy of core roll modes.", {
		status: "unavailable",
		detail: "WFRP configuration or core Chat Message roll modes are unavailable."
	});
	let e = jc(game.system.version);
	e === "fixed" ? K("migrationReturns", "not-needed", "WFRP 10.0.0+ returns migrated data natively; no wrapper installed.") : e === "unknown" ? K("migrationReturns", "unsupported", "Migration fallback is verified only for WFRP 9.6.1–9.6.4; inspect this version.") : q("migrationReturns", Pc, "Fallback installed for WFRP 9.6.1–9.6.4 Actor/Item migration returns.", {
		status: "unavailable",
		detail: "No callable Actor/Item migration methods were available."
	}), Object.keys(CONFIG.ActiveEffect?.dataModels ?? {}).length ? q("effectSchema", qc, "Missing changes fields supplied using Foundry's schema factory.", {
		status: "not-needed",
		detail: "All registered effect models already define changes."
	}) : K("effectSchema", "unavailable", "Active Effect data-model registry is unavailable or empty."), q("orphanedChat", Gc, "Text fallback installed for chat cards with missing actor/token references.", {
		status: "unavailable",
		detail: "The chat document renderer is unavailable."
	});
	let t = CONFIG.Token?.rulerClass?.prototype === foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	q("actorlessRuler", Xc, "Core-style fallback installed for tokens without actors.", {
		status: t && CONFIG.Token?.rulerClass ? "not-needed" : "unavailable",
		detail: t && CONFIG.Token?.rulerClass ? "The world uses Foundry's core ruler." : "The expected WFRP/core ruler methods are unavailable."
	}), Qc.includes(game.system.version) ? q("dualWielder", $c, "Duplicate status deletion filtered; the unique GM retains turn-start cleanup.", {
		status: "unavailable",
		detail: "Actor script collection is unavailable."
	}) : K("dualWielder", "unsupported", "Cleanup is verified for WFRP 10.0.3 and 10.1.2; inspect this version before enabling.");
}
//#endregion
//#region src/module/wfrp/folders/hooks.ts
var tl, nl = !1, rl = !1;
function $() {
	if (!(!game?.ready || !game.user?.isActiveGM)) {
		if (nl) {
			rl = !0;
			return;
		}
		clearTimeout(tl), tl = setTimeout(() => {
			il();
		}, 1e3);
	}
}
async function il() {
	if (!(!game?.ready || !game.user?.isActiveGM || nl)) {
		nl = !0, rl = !1;
		try {
			await co();
		} catch (e) {
			console.error(`${t}: WFRP folder cleanup failed.`, e), ui?.notifications?.error(`${t}: WFRP cleanup failed and may be incomplete. See the console for details.`, {
				console: !1,
				permanent: !0
			});
		} finally {
			nl = !1, rl && $();
		}
	}
}
function al() {
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
function ol() {
	ce(), Eo(), Hooks.once("setup", () => eo($)), al(), Hooks.once("canvasInit", Qt), Hooks.once("ready", Qt), Hooks.once("init", () => {
		el(), Ts(), Vt(), ze(), Ut(), Ze(), Nt(), gc(), xo("forgeOwner", yc()), Dc(), Ac(), Oo(), es(), ic(), ka(), dc(), pc();
	});
}
//#endregion
//#region src/module/init/index.ts
ol();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map