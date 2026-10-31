//#region src/module/constants.ts
var e = "wfrp4e-compatibility-box", t = "Drowsy's WFRP4e Compatibility Box", n = {
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
}, r = [
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
], i = [
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
], a = [
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
], o = [
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
], s = [
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
], c = {
	sources: n,
	holidays: r,
	history: [
		...i,
		...a,
		...o
	].sort((e, t) => e.year - t.year),
	researchNotes: s
}, l = {
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
}, u = "wfrp4e-compatibility-box-imperial", d = l.months, f = l.weekdays, p = 86400, ee = (e, t) => (e % t + t) % t;
function m(e) {
	if (!Number.isFinite(e) || Math.abs(e) > 2 ** 53 - 1) throw Error("Calendar timestamp is outside the supported range.");
	e = Math.floor(e);
	let t = Math.floor(e / p), n = Math.floor(t / 400), r = ee(t, 400), i = 0, a = n * 394;
	for (; r >= d[i].numberOfDays;) {
		let e = d[i++];
		r -= e.numberOfDays, e.intercalary || (a += e.numberOfDays);
	}
	let o = ee(e, p);
	return {
		year: n,
		month: i,
		day: r,
		hour: Math.floor(o / 3600),
		minute: Math.floor(o / 60) % 60,
		second: o % 60,
		weekday: ee(a + r, 8)
	};
}
function h(e) {
	let t = d[e.month];
	if (!Object.values(e).every(Number.isSafeInteger) || !t || e.day < 0 || e.day >= t.numberOfDays || e.hour < 0 || e.hour >= 24 || e.minute < 0 || e.minute >= 60 || e.second < 0 || e.second >= 60) throw Error("Choose a valid Imperial calendar date and time.");
	let n = (e.year * 400 + d.slice(0, e.month).reduce((e, t) => e + t.numberOfDays, 0) + e.day) * p + e.hour * 3600 + e.minute * 60 + e.second;
	if (!Number.isSafeInteger(n)) throw Error("Calendar date is outside the supported range.");
	return n;
}
function te(e, t = !1) {
	let n = m(e), r = d[n.month], i = (e) => String(e).padStart(2, "0");
	return t ? `${n.year} ${r.name} ${i(n.day + 1)} ${i(n.hour)}:${i(n.minute)}:${i(n.second)}` : `${r.intercalary ? "" : `${f[n.weekday].name}, `}${r.name} ${i(n.day + 1)}, ${n.year}`;
}
function ne() {
	return {
		id: u,
		name: "WFRP Imperial Calendar",
		description: "Compatibility Box: 400 days, eight weekdays, six festivals outside the week; year zero matches Simple Calendar.",
		years: {
			yearZero: 0,
			firstWeekday: 0
		},
		months: { values: d.map((e) => ({
			name: e.name,
			abbreviation: e.abbreviation,
			ordinal: Math.max(1, e.numericRepresentation),
			days: e.numberOfDays,
			intercalary: e.intercalary,
			startingWeekday: null
		})) },
		days: {
			values: f.map((e, t) => ({
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
var g = "foundryvtt-simple-calendar-reborn", re = "simple-timekeeping", _ = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]);
function ie(e) {
	let t = 2166136261, n = 5381;
	for (let r of e) t = Math.imul(t ^ r.charCodeAt(0), 16777619), n = Math.imul(n, 33) ^ r.charCodeAt(0);
	return (t >>> 0).toString(16).padStart(8, "0") + (n >>> 0).toString(16).padStart(8, "0");
}
function ae(e) {
	return `<p><strong>Sources:</strong> ${e.map((e) => {
		let t = c.sources[e];
		if (!t) throw Error(`Unknown calendar source: ${e}`);
		return t.uuid ? `@UUID[${t.uuid}]{${t.title}}` : t.url ? `<a href="${_(t.url)}">${_(t.title)}</a>` : _(t.title);
	}).join("; ")}</p>`;
}
function oe(e) {
	let t = d[e.month], n = `${t.intercalary ? "" : `${e.day} `}${t.name}`;
	return e.month === e.endMonth && e.day === e.endDay ? n : `${n} – ${e.endDay} ${d[e.endMonth].name}`;
}
function se(e) {
	let t = e.date ? `${e.date.day} ${d[e.date.month].name} ` : "";
	return `${e.approximate ? "c. " : ""}${t}${e.year}${e.endYear === e.year ? "" : `–${e.endYear}`} IC (${e.precision})`;
}
function ce(e, t, n, r, i) {
	return {
		_id: ie(`${e}:${t}`),
		name: n,
		folder: null,
		ownership: { default: i },
		flags: { [e]: { calendarContent: {
			id: t,
			version: 1
		} } },
		pages: [{
			_id: ie(`${e}:${t}:details`),
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
function le(e, t, n, r, i, a) {
	if (i) {
		let a = (e) => {
			let { year: t, month: n, day: r, hour: i, minute: a, second: o } = m(e);
			return {
				year: t,
				month: n,
				day: r,
				hour: i,
				minute: a,
				seconds: o
			};
		};
		e.flags[g] = { noteData: {
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
		} }, e.flags.core = { sheetClass: `${g}.NoteSheet` };
	}
	a && (e.pages[0].flags[re] = {
		eventTime: t,
		eventEnd: n,
		repeat: r ? "year" : ""
	});
}
function ue(e, t, n, r) {
	let i = [];
	if (t.holidays !== !1) for (let t of c.holidays) {
		let a = h({
			year: r,
			month: t.month,
			day: t.day - 1,
			hour: 0,
			minute: 0,
			second: 0
		}), o = h({
			year: r,
			month: t.endMonth,
			day: t.endDay - 1,
			hour: 23,
			minute: 59,
			second: 59
		}), s = ce(e, t.id, t.name, `<p><strong>${_(oe(t))}</strong> · ${_(t.region)} · Annual observance</p><p>${_(t.summary)}</p>${ae(t.sources)}`, 2);
		le(s, a, o, !0, n.calendarId, n.timekeeping), i.push(s);
	}
	if (t.history !== !1) {
		let t = ce(e, "ubersreik-history", "Ubersreik — Historical Almanac", `<p>GM reference. Published years and ranges are retained. Exact-date entries identify their date basis: published scenario dates use an assumed campaign year, and the deposition uses the explicitly approved provisional date of 5 Nachexen 2512 IC.</p><table><thead><tr><th>Date and precision</th><th>Event</th></tr></thead><tbody>${c.history.map((e) => `<tr><td>${_(se(e))}</td><td><strong>${_(e.title)}</strong><p>${_(e.summary)}</p>${e.date ? `<p><strong>Date basis:</strong> ${_(e.date.basis)}</p>` : ""}${ae(e.sources)}</td></tr>`).join("")}</tbody></table><h2>Dating notes and movable festivals</h2>${c.researchNotes.map((e) => `<h3>${_(e.title)}</h3><p>${_(e.text)}</p>${ae(e.sources)}`).join("")}`, 0);
		i.push(t);
		for (let t of c.history) {
			if (!t.date) continue;
			let r = h({
				year: t.year,
				month: t.date.month,
				day: t.date.day - 1,
				hour: 0,
				minute: 0,
				second: 0
			}), a = ce(e, `history-${t.id}`, t.title, `<p><strong>${_(se(t))}</strong></p><p>${_(t.summary)}</p><p><strong>Date basis:</strong> ${_(t.date.basis)}</p>${ae(t.sources)}`, 0);
			le(a, r, r + 86400 - 1, !1, n.calendarId, n.timekeeping), i.push(a);
		}
	}
	return i;
}
//#endregion
//#region src/module/foundry/integrations/is-module-active.ts
function v(e) {
	if (typeof game > "u" || !game) throw Error("Optional module integrations require an initialized Foundry game.");
	return game.modules.get(e)?.active === !0;
}
//#endregion
//#region src/module/foundry/settings/optional-features.ts
var de = {
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
function fe(e) {
	return de[e].targetModuleIds.every((e) => v(e));
}
//#endregion
//#region src/module/foundry/settings/is-optional-feature-enabled.ts
function y(e) {
	let t = de[e];
	return fe(e) && game?.settings.get("wfrp4e-compatibility-box", t.settingKey) !== !1;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/presentation.ts
function b(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
function pe(e) {
	let t = b, n = e.changes.map(({ label: e, current: n, value: r }) => `<li><strong>${t(e)}</strong><br>Current: <code>${t(JSON.stringify(n))}</code><br>Preset: <code>${t(JSON.stringify(r))}</code></li>`).join(""), r = [
		...e.skipped,
		...e.failed,
		...e.conflicts
	].map(({ id: e, reason: n }) => `<li>${t(e)}: ${t(n)}</li>`).join("");
	return `<p>${e.changes.length} changes; ${e.unchanged.length} already set; ${e.excluded.length} left to the GM's current settings.</p><div class="scrollable" style="max-height:45vh"><details><summary>Review setting changes</summary><ul>${n}</ul></details>${r ? `<p>Resolve these issues before applying:</p><ul>${r}</ul>` : ""}${e.missingTables.length ? `<p>Import these missing rule tables first: ${t(e.missingTables.join(", "))}</p>` : ""}</div>${e.requiresReload ? "<p>A reload is required for these changes.</p>" : ""}`;
}
async function me(e, t) {
	let n = `${e}: ${t.updated.length} updated, ${t.unchanged.length} already set, ${t.excluded.length} left unchanged by conflict choices.`;
	t.blocked && (n += " Nothing was applied because preflight found unresolved issues.");
	let r = [
		...t.skipped,
		...t.failed,
		...t.conflicts
	];
	r.length && (n += ` ${r.map(({ id: e, reason: t }) => `${e}: ${t}`).join("; ")}.`), t.missingTables.length && (n += ` Missing rule tables: ${t.missingTables.join(", ")}.`), t.failed.length && t.updated.length && (n += " Earlier successful changes remain applied; review before retrying."), t.blocked || t.failed.length ? ui?.notifications?.error(b(n), { permanent: !0 }) : ui?.notifications?.info(b(n)), t.requiresReload && !t.automaticReload && await foundry.applications.settings.SettingsConfig.reloadConfirm({ world: !0 });
}
//#endregion
//#region src/module/foundry/notifications/notify-user.ts
function he(e, t) {
	t === void 0 ? console.error(e) : console.error(e, t);
}
function ge(e, t) {
	he(e, t), ui?.notifications?.error(e);
}
//#endregion
//#region src/module/functions/settings-presets/values.ts
function _e(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function x(e, t) {
	if (Array.isArray(e) && Array.isArray(t)) return e.length === t.length && e.every((e, n) => x(e, t[n]));
	if (_e(e) && _e(t)) {
		let n = Object.keys(e);
		return n.length === Object.keys(t).length && n.every((n) => Object.hasOwn(t, n) && x(e[n], t[n]));
	}
	return e === t;
}
function S(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "boolean" || typeof e == "string" || typeof e == "number" && Number.isFinite(e)) return e;
	if (typeof e != "object" || !e) throw Error("Value cannot be represented completely in JSON");
	if (t.has(e)) throw Error("Value contains a circular reference");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return Array.from(e, (e) => S(e, n));
	let r = Object.getPrototypeOf(e);
	if (r !== Object.prototype && r !== null) throw Error("Value is not a plain JSON object");
	if (Object.getOwnPropertySymbols(e).length) throw Error("Value contains properties JSON cannot preserve");
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, S(t, n)]));
}
//#endregion
//#region src/module/foundry/integrations/simple-timekeeping/calendar.ts
function ve(e, t, n) {
	let r = (e) => e === void 0 ? t.worldTime : typeof e == "number" ? e : t.calendar.componentsToTime(e), i = e.prototype.getFullDateText, a = e.prototype.timestamp, o = e.pickDateTime;
	e.prototype.getFullDateText = function(e) {
		return n() ? te(r(e)) : i.call(this, e);
	}, e.prototype.timestamp = function(e) {
		return n() ? te(r(e), !0) : a.call(this, e);
	}, e.pickDateTime = async function(e, i = "timestamp") {
		if (!n()) return o.call(this, e, i);
		let a = m(r(e)), s = (e, t, n, r, i) => `<label>${t}<input type="number" name="${e}" value="${n}" required step="1" ${r === void 0 ? "" : `min="${r}"`} ${i === void 0 ? "" : `max="${i}"`}></label>`, c = d.map((e, t) => `<option value="${t}" ${t === a.month ? "selected" : ""}>${b(e.name)}</option>`).join(""), l = await foundry.applications.api.DialogV2.input({
			window: { title: "Pick Date and Time — WFRP Imperial Calendar" },
			content: `${s("year", "Year (IC)", a.year)}<label>Month<select name="month">${c}</select></label>${s("day", "Day", a.day + 1, 1, 33)}${s("hour", "Hour", a.hour, 0, 23)}${s("minute", "Minute", a.minute, 0, 59)}${s("second", "Second", a.second, 0, 59)}`,
			ok: { label: "Confirm" },
			rejectClose: !1
		});
		if (!l) return null;
		try {
			if (Object.values(l).some((e) => e === "" || e === null)) throw Error("Complete every date and time field.");
			let e = h({
				year: Number(l.year),
				month: Number(l.month),
				day: Number(l.day) - 1,
				hour: Number(l.hour),
				minute: Number(l.minute),
				second: Number(l.second)
			});
			return i === "timestamp" ? e : t.calendar.timeToComponents(e);
		} catch (e) {
			return ui?.notifications?.error(e instanceof Error ? e.message : String(e)), null;
		}
	};
	let s = t.calendar, c = s.timeToComponents;
	s.timeToComponents = function(e = 0) {
		let t = c.call(this, e);
		return n() ? {
			...t,
			dayOfWeek: m(e).weekday
		} : t;
	};
}
//#endregion
//#region src/module/functions/calendars/configuration.ts
function C(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Calendar configuration is unavailable or invalid.");
	return structuredClone(e);
}
function ye(e) {
	let t = C(e), n = {};
	try {
		n = C(JSON.parse(String(t.customCalendar)));
	} catch {}
	let r = {
		...n,
		...ne()
	};
	return {
		...t,
		calendar: "custom",
		customCalendar: x(n, r) ? t.customCalendar : JSON.stringify(r)
	};
}
function be(e, t, n, r) {
	if (!Array.isArray(e)) throw Error("Simple Calendar configuration is unavailable.");
	if (!e.some((e) => e?.id === t)) throw Error("Choose an active Simple Calendar before applying the Imperial preset.");
	return e.map((e) => {
		let i = C(e);
		if (i.id !== t) return i;
		let a = Array.isArray(i.months) ? i.months : [], o = (e, t) => e.find((e) => e && typeof e == "object" && !Array.isArray(e) && e.name === t) ?? {}, s = d.map((e, t) => {
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
		}), c = Array.isArray(i.weekdays) ? i.weekdays : [], l = f.map((e, t) => {
			let n = o(c, e.name);
			return {
				...n,
				...e,
				id: n.id ?? `wfrp-weekday-${t}`,
				numericRepresentation: t + 1
			};
		}), u = {
			...C(i.year),
			yearZero: 0,
			firstWeekday: 0
		}, p = {
			...C(i.leapYear),
			rule: "none",
			customMod: 0,
			startingYear: 0
		}, ee = {
			...C(i.time),
			hoursInDay: 24,
			minutesInHour: 60,
			secondsInMinute: 60,
			...r ? { gameTimeRatio: 0 } : {}
		}, h = {
			...C(i.general),
			gameWorldTimeIntegration: r ? "third-party" : "mixed"
		}, te = {
			...i,
			name: "WFRP Imperial Calendar",
			months: s,
			weekdays: l,
			year: u,
			leapYear: p,
			time: ee,
			general: h
		};
		if (!x(te, i)) {
			let e = m(n);
			te.currentDate = {
				year: e.year,
				month: e.month,
				day: e.day,
				seconds: (n % 86400 + 86400) % 86400
			};
		}
		return te;
	});
}
//#endregion
//#region src/module/foundry/integrations/simple-timekeeping/preset.ts
var xe = "simple-timekeeping", Se = {
	title: "Simple Timekeeping & Calendar — WFRP Imperial Calendar",
	enabled: () => game?.system.id === "wfrp4e" && y("simpleTimekeeping"),
	additionalSettings: () => [{
		namespace: xe,
		key: "configuration",
		value: ye(game?.settings.get(xe, "configuration"))
	}]
};
//#endregion
//#region src/module/foundry/integrations/simple-timekeeping/register-integration.ts
function Ce() {
	if (game?.system.id !== "wfrp4e" || !y("simpleTimekeeping")) return !1;
	let e = game.settings.get(xe, "configuration");
	if (e.calendar !== "custom") return !1;
	try {
		let t = JSON.parse(e.customCalendar ?? ""), n = ne();
		return t.id === n.id && [
			"years",
			"months",
			"days"
		].every((e) => x(t[e], n[e]));
	} catch {
		return !1;
	}
}
function we() {
	if (!v("simple-timekeeping") || !y("simpleTimekeeping") || game?.system.id !== "wfrp4e") return;
	Hooks.once("setup", () => {
		let e = game?.settings.settings?.get(`${xe}.configuration`);
		e && (e.requiresReload = !0);
	});
	let e = /* @__PURE__ */ new WeakSet();
	Hooks.on("initSimpleTimekeeping", (t) => {
		let n = t;
		if (!n?.prototype || typeof n.prototype.getFullDateText != "function" || typeof n.prototype.timestamp != "function" || typeof n.pickDateTime != "function" || !game?.time?.calendar || e.has(n)) return;
		e.add(n);
		let r = Ce();
		ve(n, game.time, () => r && Ce());
	});
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/content.ts
function Te(e) {
	if (!game?.ready || !game.user?.isGM || game.system.id !== "wfrp4e") throw Error("A ready WFRP GM session is required to import calendar content.");
	let t = y("simpleCalendar"), n = y("simpleTimekeeping");
	if (!t && !n) throw Error("Enable a supported calendar compatibility feature first.");
	if (e.holidays === !1 && e.history === !1) return { timekeeping: !1 };
	let r;
	if (t) {
		r = String(game.settings.get(g, "active-calendar"));
		let e = game.settings.get(g, "calendar-configuration")?.find((e) => e.id === r);
		if (!e || e.year?.yearZero !== 0 || e.year.firstWeekday !== 0 || e.leapYear?.rule !== "none" || e.time?.hoursInDay !== 24 || e.time.minutesInHour !== 60 || e.time.secondsInMinute !== 60 || e.months?.length !== d.length || e.weekdays?.length !== f.length || !d.every((t, n) => e.months[n]?.name === t.name && e.months[n]?.numberOfDays === t.numberOfDays && e.months[n]?.intercalary === t.intercalary && e.months[n]?.intercalaryInclude === !1 && e.months[n]?.startingWeekday === null) || !f.every((t, n) => e.weekdays[n]?.name === t.name)) throw Error("Apply the Simple Calendar WFRP Imperial preset before importing dated content.");
	}
	if (n && (!Ce() || game.time.calendar.componentsToTime({
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
function Ee(t) {
	return t.flags[e]?.calendarContent?.id;
}
function De(e) {
	return [...game.journal].find((t) => Ee(t) === Ee(e));
}
function Oe(e) {
	return [...game.journal].find((t) => t.id === e._id || t.name.toLocaleLowerCase() === e.name.toLocaleLowerCase());
}
function ke(t = {}) {
	let n = Te(t), r = ue(e, t, n, m(game.time.worldTime).year);
	return {
		targets: n,
		drafts: r,
		entries: r.map((e) => ({
			name: e.name,
			status: De(e) ? "Keep existing content; connect missing calendar support" : Oe(e) ? "Skip: matching name or document ID already exists" : "Create"
		}))
	};
}
var Ae = !1;
async function je(e = {}, t) {
	if (Ae) throw Error("A calendar content import is already running.");
	let n = ke(e);
	if (t && (t.calendarId !== n.targets.calendarId || t.timekeeping !== n.targets.timekeeping)) throw Error("Calendar availability changed after review. Review the content again.");
	Ae = !0;
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
			let a = Te(e);
			if (a.calendarId !== n.targets.calendarId || a.timekeeping !== n.targets.timekeeping) throw Error("Calendar availability changed during import. Review the remaining content again.");
			let o = De(t);
			if (o) {
				let e = {}, a = o.pages.contents.find((e) => e.id === t.pages[0]._id), s = o.flags[g]?.noteData, c = a?.flags[re];
				if (s && s.calendarId !== n.targets.calendarId && n.targets.calendarId) {
					r.skipped.push(`${t.name}: already connected to another Simple Calendar`);
					continue;
				}
				try {
					if (s && n.targets.timekeeping && c?.eventTime === void 0) {
						if (![0, 3].includes(s.repeats)) throw Error("unsupported repetition");
						let e = (e, t = !1) => h({
							year: e.year,
							month: e.month,
							day: e.day,
							hour: s.allDay ? t ? 23 : 0 : e.hour,
							minute: s.allDay ? t ? 59 : 0 : e.minute,
							second: s.allDay ? t ? 59 : 0 : e.seconds
						});
						le(t, e(s.startDate), e(s.endDate, !0), s.repeats === 3, void 0, !0);
					} else if (!s && t.flags["foundryvtt-simple-calendar-reborn"] && c?.eventTime !== void 0) {
						if (!["", "year"].includes(String(c.repeat ?? ""))) throw Error("unsupported repetition");
						let e = Number(c.eventTime);
						le(t, e, Number(c.eventEnd ?? e), c.repeat === "year", n.targets.calendarId, !1);
					}
				} catch {
					r.skipped.push(`${t.name}: existing date or repetition cannot be connected safely`);
					continue;
				}
				let l = t.flags[g], u = t.pages[0].flags[re];
				l && !s && (e[`flags.${g}.noteData`] = l.noteData, e["flags.core.sheetClass"] = `${g}.NoteSheet`, e.folder = await i()), Object.keys(e).length && await o.update(e);
				let d = !!u && !!a && a.flags["simple-timekeeping"]?.eventTime === void 0;
				d && await o.updateEmbeddedDocuments("JournalEntryPage", [{
					_id: a.id,
					[`flags.${re}`]: u
				}]), Object.keys(e).length || d ? r.connected.push(t.name) : r.skipped.push(`${t.name}: existing content preserved`);
				continue;
			}
			if (Oe(t)) {
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
		Ae = !1;
	}
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/register-content.ts
async function Me() {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
	let e = b, t = await foundry.applications.api.DialogV2.wait({
		window: { title: "WFRP Calendar Content" },
		position: { width: 720 },
		content: `<p>Import sourced WFRP observances and Ubersreik history. Holidays are visible to players; the historical almanac and dated historical/scenario events are GM-only. Existing notes, dates and text are preserved. No macros or chat reminders are enabled.</p><table><thead><tr><th>Observance</th><th>Date</th><th>Region</th></tr></thead><tbody>${c.holidays.map((t) => `<tr><td>${e(t.name)}</td><td>${e(oe(t))}</td><td>${e(t.region)}</td></tr>`).join("")}</tbody></table><p><strong>Ubersreik history:</strong> ${c.history.length} sourced entries with year, range and uncertainty labels. Year-only history stays in the reference journal. Eight dated events are included without annual repetition: the provisional deposition date (5 Nachexen 2512 IC) and seven labelled scenario defaults from The Blessings that Drew Blood.</p><p><strong>Middenheim Carnival:</strong> included with holidays on 1–8 Brauzeit, using the older published default. Later books leave its seasonal timing flexible; you can adjust the imported event.</p>`,
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
	let n = {
		holidays: t === "both" || t === "holidays",
		history: t === "both" || t === "history"
	}, r = ke(n);
	if (await foundry.applications.api.DialogV2.wait({
		window: { title: "Import WFRP Calendar Content" },
		position: { width: 650 },
		content: `<p>${r.targets.calendarId ? "Simple Calendar notes" : r.targets.timekeeping ? "" : "GM reference journal"}${r.targets.calendarId && r.targets.timekeeping ? " and " : ""}${r.targets.timekeeping ? "ST&C events" : ""}. Existing documents keep their text and dates. Newly enabled calendar support may be attached to managed notes. Reload afterward to refresh both calendar displays.</p><ul>${r.entries.map((t) => `<li><strong>${e(t.name)}</strong>: ${e(t.status)}</li>`).join("")}</ul>`,
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
	let i = await je(n, r.targets);
	ui?.notifications?.info(`Calendar content: ${i.created.length} created, ${i.connected.length} connected, ${i.skipped.length} preserved or skipped. Reload to refresh the calendars.`);
}
function Ne() {
	game?.system.id !== "wfrp4e" || !(y("simpleCalendar") || y("simpleTimekeeping")) || Hooks.once("setup", () => game?.settings.registerMenu(e, "calendarContent", {
		name: "WFRP calendar content",
		label: "Import WFRP Calendar Content",
		hint: "Review Imperial and Ubersreik holidays, including Middenheim Carnival, and import the historical almanac.",
		icon: "fa-solid fa-calendar-days",
		restricted: !0,
		type: class extends foundry.applications.api.ApplicationV2 {
			async render() {
				try {
					await Me();
				} catch (e) {
					ge(e instanceof Error ? e.message : String(e), e);
				}
				return this;
			}
		}
	}));
}
//#endregion
//#region src/module/functions/integrations/health-estimate/estimations.ts
var Pe = {
	wounds: "Compatibility Box: WFRP Wounds",
	unconscious: "Compatibility Box: WFRP Unconscious",
	dead: "Compatibility Box: WFRP Dead"
};
function Fe(e, t) {
	if (!Array.isArray(e) || !e.length) throw Error("Health Estimate must have a default estimation table before applying its preset.");
	let n = S(e);
	for (let e of n) if (!e || typeof e != "object" || Array.isArray(e) || typeof e.name != "string" || !Array.isArray(e.estimates) || !Array.isArray(e.actorTypes) || !Array.isArray(e.statusEffects)) throw Error("Health Estimate's estimation tables do not match the supported version 36 schema.");
	let r = new Set(Object.values(Pe)), [i, ...a] = n.filter((e) => !r.has(e.name));
	if (!i || i.actorTypes.length || i.statusEffects.length) throw Error("Health Estimate's first table must remain its unfiltered default table.");
	let o = [
		"character",
		"npc",
		"creature"
	], s = {
		name: Pe.wounds,
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
		c(Pe.unconscious, "unconscious", "Unconscious"),
		c(Pe.dead, "dead", "Gone to Morr..."),
		...a
	];
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/values.ts
function w(e, t) {
	return t instanceof foundry.abstract.DataModel ? t = t.toObject() : e.type instanceof foundry.data.fields.DataField && (t = e.type.toObject(t)), S(t);
}
function Ie(e, t) {
	let n = e.type, r = S(t);
	if (n instanceof foundry.data.fields.DataField) r = S(n.clean(r)), n.validate(r, {
		fallback: !1,
		strict: !0
	});
	else if (typeof n == "function" && n.prototype instanceof foundry.abstract.DataModel) r = S(n.fromSource(r, { strict: !0 }).toObject());
	else if (n === String && typeof r != "string" || n === Number && typeof r != "number" || n === Boolean && typeof r != "boolean" || n === Array && !Array.isArray(r) || n === Object && (typeof r != "object" || !r || Array.isArray(r))) throw Error("Preset value does not match this world's setting type.");
	if (!x(t, r)) throw Error("Preset value does not match this world's setting schema.");
}
//#endregion
//#region src/module/foundry/integrations/health-estimate/preset.ts
var T = "healthEstimate", Le = "core.estimations", Re = {
	title: "Health Estimate",
	watchSettings: ["wfrp4e.uiaCrits"],
	enabled: () => {
		let e = game?.modules.get(T)?.version;
		return y("healthEstimate") && game?.system.id === "wfrp4e" && !!e && !foundry.utils.isNewerVersion("36.1.0", e);
	},
	additionalSettings: () => {
		let e = game?.settings.settings?.get(`${T}.${Le}`);
		if (!e) throw Error("Health Estimate's estimation setting is unavailable. Version 36.1.0 or newer is required.");
		let t = w(e, game?.settings.get(T, Le)), n = game?.settings.get("wfrp4e", "uiaCrits") === !0;
		return [...n ? [{
			namespace: T,
			key: "core.NPCsJustDie",
			value: !1
		}] : [], {
			namespace: T,
			key: Le,
			value: Fe(t, n)
		}];
	}
}, ze = /* @__PURE__ */ new WeakSet();
function Be() {
	if (!Re.enabled?.()) return;
	let e = game && Reflect.get(game, "healthEstimate");
	if (!e || typeof e.isDead != "function" || ze.has(e)) return;
	let t = e.isDead;
	e.isDead = function(e, n) {
		return e.actor && [
			"character",
			"npc",
			"creature"
		].includes(e.actor.type) ? e.actor.statuses.has("dead") : t.call(this, e, n);
	}, ze.add(e);
}
//#endregion
//#region src/module/foundry/integrations/foundryvtt-simple-calendar-reborn/preset.ts
var Ve = "foundryvtt-simple-calendar-reborn";
function He() {
	let e = game?.settings.get(Ve, "calendar-configuration");
	return !Array.isArray(e) || e.length ? e : (globalThis.SimpleCalendar?.api)?.getAllCalendars() ?? e;
}
var Ue = {
	title: "Simple Calendar Reborn — WFRP Imperial Calendar",
	enabled: () => game?.system.id === "wfrp4e" && y("simpleCalendar"),
	additionalSettings: () => [{
		namespace: Ve,
		key: "calendar-configuration",
		value: be(He(), game?.settings.get(Ve, "active-calendar"), game.time.worldTime, y("simpleTimekeeping"))
	}]
}, E = "bossbar", D = {
	automatic: "bossBarAutomatic",
	stacked: "bossBarStacked",
	woundsStyle: "bossBarWoundsStyle",
	ignorePrompt: "bossBarIgnoreSetupPrompt"
};
//#endregion
//#region src/module/foundry/integrations/bossbar/preset.ts
function We() {
	return game?.settings.get("wfrp4e", "uiaCrits") === !0;
}
var Ge = {
	title: "Boss Bar",
	watchSettings: ["wfrp4e.uiaCrits"],
	ignoreSetting: D.ignorePrompt,
	enabled: () => y("bossBar"),
	additionalSettings: () => {
		let t = [{
			namespace: e,
			key: D.stacked,
			value: !0
		}];
		if (!We()) return t;
		let n = game?.settings.get(E, "barStyles"), r = n.find((e) => e.id === "segmented");
		return r && n[0] !== r && t.push({
			namespace: E,
			key: "barStyles",
			value: [r, ...n.filter((e) => e !== r)]
		}), t;
	}
}, Ke = "#a51414d8", qe = "#7e1717dc", Je = "#b31f18d8", Ye = "#b01832d8", Xe = "#861a24d8", Ze = "#541e1ed8", O = "#6a0e0ed8", k = "#6f3518e0", A = "#621010e0", Qe = "#771616dc", j = "#440707d8", $e = "#14101490", M = "#0b080de8", et = [
	["Jabberslythe", "#78d61be8"],
	["Chameleon Skink", O],
	["Kroxigor", O],
	["Saurus", O],
	["Suarus", O],
	["Skink", O],
	["Slann", O],
	["Reptile", O],
	["Ogre Gorger", Ze],
	["Gorger", Ze],
	["Orca", Ke],
	["Bloodletter", M],
	["Chaos Fury", M],
	["Blue Horror", M],
	["Pink Horror", M],
	["Nurgling", M],
	["Greater Daemon", M],
	["Daemon Prince", M],
	["Lesser Demon", M],
	["Daemon", M],
	["Demon", M],
	["Rat Ogre", Qe],
	["Wolf Rat", Qe],
	["Skaven", Qe],
	["Bray Shaman", A],
	["Beastman", A],
	["Beastmen", A],
	["Bestigor", A],
	["Minotaur", A],
	["Pestigor", A],
	["Razorgor", A],
	["Ungor", A],
	["Gor", A],
	["Greenskin", k],
	["Forest Goblin", k],
	["Night Goblin", k],
	["Hobgoblin", k],
	["Goblin", k],
	["Black Orc", k],
	["Orc", k],
	["Snotling", k],
	["Squig", k],
	["Skeleton", $e],
	["Ghost", $e],
	["Tomb Banshee", $e],
	["Banshee", $e],
	["Undead", j],
	["Vampire", j],
	["Ghoul", j],
	["Wight", j],
	["Liche", j],
	["Maurngul", j],
	["Mourngul", j],
	["Human", Ke],
	["Dwarf", qe],
	["Halfling", Je],
	["High Elf", Ye],
	["helf", Ye],
	["Wood Elf", Xe],
	["welf", Xe],
	["Ogre", Ze]
];
function tt() {
	let e = {};
	for (let [t, n] of et) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function nt(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function rt(e = {}) {
	let t = tt();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? Ke;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function it(e, t = {}) {
	let n = nt(e);
	for (let [e, r] of Object.entries(rt(t))) n[e] ??= r;
	return n;
}
//#endregion
//#region src/module/foundry/integrations/splatter/constants.ts
var N = "splatter", at = "BloodSheetData", ot = {
	title: "Splatter",
	ignoreSetting: "splatterIgnoreSetupPrompt",
	menuKey: "configureSplatter",
	additionalSettings: () => [{
		namespace: N,
		key: at,
		value: it(game?.settings.get(N, at), game?.wfrp4e?.config.species ?? {})
	}]
}, st = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
}, ct = {}, lt = { "core.deathStateName": "Gone to Morr..." }, ut = {}, dt = {
	creatureType: "details.species.value",
	creatureTypeCustom: "",
	currentHp: "status.wounds.value",
	maxHp: "status.wounds.max",
	useWounds: !1,
	useBloodsheet: !0
}, ft = {
	bossbar: { description: "Use WFRP Wounds paths and the compatible stacked-bar configuration." },
	splatter: { description: "Use WFRP Wounds and species for blood effects while preserving custom colors." },
	healthEstimate: { description: "Use WFRP Wounds labels: Unconscious at zero under core rules, Mortal Peril! under Up in Arms, Bloodied at 50%, and Gone to Morr... for the Dead condition. Preserve custom and vehicle tables. Recommend disabling NPCs Just Die only under Up in Arms; leave it alone under core." },
	"simple-timekeeping": { description: "Install the standard 400-day Imperial calendar. Keeps world time, events, macros, weather and display preferences. Reload after applying. Pause running clocks during setup and apply the Simple Calendar preset too if using both." },
	"foundryvtt-simple-calendar-reborn": { description: "Replace the active calendar with the standard 400-day Imperial calendar at the current Foundry world timestamp. Existing dates may display differently; timestamps and notes are not migrated. Keeps other calendars and note categories. With ST&C enabled, its clock controls advance time and Simple Calendar follows Foundry time in third-party mode with automatic clock speed zero; use ST&C to change dates and advance time. Pause running clocks during setup." }
};
//#endregion
//#region src/module/functions/settings-presets/sources.ts
function pt(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => {
		let n = e.slice(e.lastIndexOf("/") + 1);
		if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.json$/.test(n)) throw Error(`Invalid settings preset namespace filename: ${e}`);
		if (!t || typeof t != "object" || Array.isArray(t)) throw Error(`Settings preset ${e} must be an object of setting values.`);
		let r = Object.fromEntries(Object.entries(t).map(([t, n]) => {
			if (!t.trim()) throw Error(`Settings preset ${e} contains an empty setting key.`);
			return [t, S(n)];
		}));
		return [n.slice(0, -5), r];
	}));
}
//#endregion
//#region src/module/functions/settings-presets/metadata.ts
function mt(e, t) {
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
var ht = pt(/* #__PURE__ */ Object.assign({
	"/src/settings/bossbar.json": st,
	"/src/settings/foundryvtt-simple-calendar-reborn.json": ct,
	"/src/settings/healthEstimate.json": lt,
	"/src/settings/simple-timekeeping.json": ut,
	"/src/settings/splatter.json": dt
})), gt = mt(Object.values([ft])[0] ?? {}, Object.keys(ht)), _t = {
	"foundryvtt-simple-calendar-reborn": Ue,
	"simple-timekeeping": Se,
	bossbar: Ge,
	healthEstimate: Re,
	splatter: ot
};
function vt(e) {
	if (!Object.hasOwn(ht, e)) throw Error(`No settings preset exists for ${e}.`);
	return {
		namespace: e,
		values: ht[e],
		..._t[e],
		...gt[e]
	};
}
function yt() {
	return Object.keys(ht).sort().map(vt);
}
//#endregion
//#region src/module/functions/settings-presets/wfrp.ts
function bt(e, t) {
	return t === "wfrp4e" ? [...e].sort((e, t) => Number(P(e)) - Number(P(t))) : [...e];
}
function P({ namespace: e, key: t }) {
	return e === "wfrp4e" && t === "useGroupAdvantage";
}
function xt({ namespace: e, key: t }) {
	return e === "wfrp4e" && ["homebrew", "customCursor"].includes(t) || e === "wfrp4e-rnhd" && ["showClock", "syncClock"].includes(t);
}
function St({ namespace: e, key: t, value: n }) {
	return e !== "wfrp4e" || t !== "tableSettings" || !n || typeof n != "object" ? [] : [...new Set(Object.values(n).flatMap((e) => String(e).split(",").filter(Boolean)))];
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/coordination.ts
function Ct() {
	let e = [...game?.modules.values() ?? []].filter((e) => e.active).map((e) => e.api?.settingsPresetCoordinator).filter((e) => e?.version === 1);
	if (e.length > 1) throw Error("Multiple settings coordinators are active; disable the duplicate before applying presets.");
	return e[0];
}
function wt(e, t) {
	return Ct()?.plan(e, t) ?? {
		entries: t,
		excluded: [],
		conflicts: []
	};
}
async function Tt(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
	return await Ct()?.resolve(e, t) ?? !0;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/engine.ts
function F(e) {
	return e === "core" || e === game?.system.id || game?.modules.get(e)?.active === !0;
}
function Et(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to inspect settings presets.");
	let n = wt(e, t), r = {
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
		if (!F(e.namespace) || !n || n.scope !== "world") {
			r.skipped.push({
				id: t,
				reason: "World setting is unavailable or its namespace is not active"
			});
			continue;
		}
		try {
			Ie(n, e.value), game.system.id === "wfrp4e" && r.missingTables.push(...St(e).filter((e) => !(game?.collections?.get("RollTable"))?.get(e)));
			let i = w(n, game.settings.get(e.namespace, e.key));
			if (x(i, e.value)) {
				r.unchanged.push(t);
				continue;
			}
			r.changes.push({
				...e,
				current: i,
				label: n.name ? game.i18n.localize(n.name) : t
			}), r.requiresReload ||= !!n.requiresReload || game.system.id === "wfrp4e" && (xt(e) || P(e)), r.automaticReload ||= game.system.id === "wfrp4e" && P(e);
		} catch (e) {
			r.failed.push({
				id: t,
				reason: e instanceof Error ? e.message : String(e)
			});
		}
	}
	return r.missingTables = [...new Set(r.missingTables)], r;
}
var Dt = !1;
async function Ot(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (Dt) throw Error("A settings preset is already being applied.");
	Dt = !0;
	try {
		let n = Et(e, t), r = {
			...n,
			updated: [],
			blocked: !!(n.failed.length || n.skipped.length || n.conflicts.length || n.missingTables.length),
			requiresReload: !1,
			automaticReload: !1
		};
		if (r.blocked) return r;
		for (let i of bt(n.changes, game.system.id)) {
			let n = `${i.namespace}.${i.key}`;
			try {
				if (!game.user?.isGM || !F(i.namespace)) throw Error("Preset permissions or availability changed.");
				let a = wt(e, t), o = a.entries.find((e) => e.namespace === i.namespace && e.key === i.key);
				if (a.conflicts.length || !o || !x(o.value, i.value)) throw Error("Preset choices changed; review the remaining settings again.");
				let s = game.settings.settings?.get(n);
				if (!s || s.scope !== "world") throw Error("World setting is unavailable.");
				if (Ie(s, i.value), await game.settings.set(i.namespace, i.key, structuredClone(i.value)), r.requiresReload ||= !!s.requiresReload || game.system.id === "wfrp4e" && (xt(i) || P(i)), r.automaticReload ||= game.system.id === "wfrp4e" && P(i), !x(w(s, game.settings.get(i.namespace, i.key)), i.value)) throw Error("Foundry did not retain the complete preset value.");
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
		Dt = !1;
	}
}
//#endregion
//#region src/module/foundry/settings/presets/engine.ts
function I(e) {
	return F(e.namespace) && (e.enabled?.() ?? !0);
}
function L(e) {
	if (!I(e)) throw Error("Preset is not active.");
	return [...Object.entries(e.values).map(([t, n]) => ({
		namespace: e.namespace,
		key: t,
		value: n
	})), ...e.additionalSettings?.() ?? []];
}
async function kt(t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (!I(t)) throw Error("Preset is not active.");
	let n = await Ot(e, L(t));
	if (n.blocked || n.failed.length) throw Error(`${n.updated.length} settings updated. ${[
		...n.skipped,
		...n.failed,
		...n.conflicts
	].map((e) => `${e.id}: ${e.reason}`).join("; ")}${n.missingTables.length ? ` Missing rule tables: ${n.missingTables.join(", ")}` : ""}`);
	return n;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/review.ts
var At = Promise.resolve(), jt = /* @__PURE__ */ new Map();
function Mt(e) {
	let t = `${e.owner}:${e.ignoreKey ?? e.title}`;
	if (e.startup && jt.has(t)) return jt.get(t);
	let n = At.then(() => Nt(e)).finally(() => {
		e.startup && jt.delete(t);
	});
	return e.startup && jt.set(t, n), At = n.catch(() => {}), n;
}
async function Nt(e) {
	if (!game?.ready || !game.user?.isGM || e.startup && game.users?.activeGM && game.users.activeGM.id !== game.user.id || e.startup && e.ignoreKey && game.settings.get(e.owner, e.ignoreKey) === !0 || !await Tt(e.owner, e.entries())) return null;
	let t = Et(e.owner, e.entries());
	if (e.startup && !t.changes.length && !t.skipped.length && !t.failed.length && !t.conflicts.length && !t.missingTables.length) return null;
	let n = !!(t.skipped.length || t.failed.length || t.conflicts.length || t.missingTables.length), r = await foundry.applications.api.DialogV2.wait({
		window: { title: e.title },
		position: { width: 650 },
		content: `${e.description ? `<p>${b(e.description)}</p>` : ""}${pe(t)}`,
		buttons: [
			...!n && t.changes.length ? [{
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
	if (r === "keep" && e.ignoreKey && await game.settings.set(e.owner, e.ignoreKey, !0), r !== "configure" || n) return null;
	if (!x(Et(e.owner, e.entries()), t)) throw Error("Settings or preset choices changed during review; reopen the action before applying.");
	let i = await Ot(e.owner, e.entries());
	return await me(e.title, i), i;
}
//#endregion
//#region src/module/foundry/settings/presets/interface.ts
function Pt(e) {
	return e.title ?? game?.modules.get(e.namespace)?.title ?? e.namespace;
}
function Ft(e) {
	return e.ignoreSetting ?? `ignoreSettingsPreset-${e.namespace}`;
}
function It(e) {
	ge(b(`Settings preset could not be completed: ${e instanceof Error ? e.message : String(e)}`), e);
}
async function Lt(t) {
	if (!I(t)) throw Error("Preset is not active.");
	await Mt({
		owner: e,
		title: Pt(t),
		entries: () => L(t),
		...t.description ? { description: t.description } : {}
	});
}
async function Rt(t, n = !1) {
	!I(t) || game?.system.id !== "wfrp4e" || t.promptOnStartup === !1 && !n || await Mt({
		owner: e,
		title: Pt(t),
		entries: () => L(t),
		startup: !0,
		ignoreKey: Ft(t),
		...t.description ? { description: t.description } : {}
	});
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/export.ts
function zt(e, t, n = !1) {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	if (!F(e)) throw Error("The selected system or module is not active.");
	if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(e)) throw Error("Invalid settings namespace.");
	if (!t.length) throw Error("Select at least one setting to export.");
	let r = Object.fromEntries([...new Set(t)].map((t) => {
		let r = game?.settings.settings?.get(`${e}.${t}`);
		if (!r || r.scope !== "world" || !r.config && !n) throw Error(`${e}.${t} is not an available selected world setting.`);
		try {
			return [t, w(r, game?.settings.get(e, t))];
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
function Bt(e, t) {
	return [...game?.settings.settings?.values() ?? []].filter((n) => n.namespace === e && n.scope === "world" && (n.config || t)).sort((e, t) => e.key.localeCompare(t.key));
}
function Vt(e, t) {
	let n = foundry.utils.escapeHTML, r = game?.i18n.localize(e.name || e.key) ?? e.key, i, a = !1;
	try {
		let t = w(e, game?.settings.get(e.namespace, e.key)), n = JSON.stringify(t);
		i = n.length > 160 ? `${n.slice(0, 160)}…` : n;
	} catch (e) {
		a = !0, i = `Cannot export: ${e instanceof Error ? e.message : String(e)}`;
	}
	return `<div class="form-group"><label>
    <input type="checkbox" name="setting-${t}" ${a ? "disabled" : ""}>
    ${n(r)}${e.config ? "" : " (hidden)"}
    </label><p class="hint"><code>${n(`${e.namespace}.${e.key}`)}</code><br>${n(i)}</p></div>`;
}
async function Ht(e = "src/settings/") {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	let t = [...new Set([...game.settings.settings?.values() ?? []].filter((e) => e.scope === "world" && F(e.namespace)).map((e) => e.namespace))].sort();
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
	let a = r.includeHidden === !0, o = Bt(i, a);
	if (!o.length) return ui?.notifications?.info("This namespace has no settings matching that selection."), null;
	let s = await foundry.applications.api.DialogV2.input({
		window: { title: `Export ${i} Settings` },
		content: `<p>Select the preferences to include in <strong>${n(i)}.json</strong>.</p>
      <div class="scrollable" style="max-height: 50vh">${o.map(Vt).join("")}</div>
      <p class="hint">Save the downloaded file in <code>${n(e)}</code>, then rebuild the module to add its import button.</p>`,
		ok: { label: "Download JSON" },
		rejectClose: !1
	});
	if (!s) return null;
	let c = o.filter((e, t) => s[`setting-${t}`] === !0).map(({ key: e }) => e);
	if (!c.length) return ui?.notifications?.info("No settings selected; nothing was exported."), null;
	let l = zt(i, c, a);
	return foundry.utils.saveDataToFile(`${JSON.stringify(l.values, null, 2)}\n`, "application/json", l.filename), ui?.notifications?.info(`Exported ${c.length} settings to ${n(l.filename)}.`), l;
}
//#endregion
//#region src/module/foundry/settings/presets/api.ts
function Ut(e) {
	let t = e === void 0 ? yt().filter(I) : [vt(e)];
	if (t.some((e) => !I(e))) throw Error("Preset is not active.");
	return t.flatMap(L);
}
var Wt = {
	version: 1,
	getPresets: () => yt().filter(I).map((e) => ({
		namespace: e.namespace,
		title: Pt(e),
		entries: L(e)
	})),
	inspect: (t) => Et(e, Ut(t)),
	apply: async (t) => Ot(e, Ut(t)),
	resolve: async (t) => Tt(e, Ut(t)),
	capture: zt
};
//#endregion
//#region src/module/functions/settings-presets/conflicts.ts
function Gt(e) {
	return Array.isArray(e) ? e.map(Gt) : e && typeof e == "object" ? Object.fromEntries(Object.keys(e).sort().map((t) => [t, Gt(e[t])])) : e;
}
function Kt(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n.entries) {
		let r = `${e.namespace}.${e.key}`, i = t.get(r) ?? {
			id: r,
			namespace: e.namespace,
			key: e.key,
			candidates: [],
			signature: ""
		}, a = i.candidates.find((e) => e.source === n.source);
		if (a && !x(a.value, e.value)) throw Error(`Preset ${n.source} proposes two values for ${r}.`);
		a || i.candidates.push({
			source: n.source,
			title: n.title,
			value: e.value
		}), t.set(r, i);
	}
	return [...t.values()].filter((e) => e.candidates.some((t) => !x(t.value, e.candidates[0].value))).map((e) => (e.candidates.sort((e, t) => e.source.localeCompare(t.source)), e.signature = JSON.stringify(e.candidates.map(({ source: e, value: t }) => [e, Gt(t)])), e)).sort((e, t) => e.id.localeCompare(t.id));
}
function qt(e, t, n) {
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
function Jt(e, t) {
	let n = [];
	for (let [e, t] of game?.modules.entries() ?? []) {
		if (!t.active) continue;
		let r = t.api?.settingsPresets;
		if (r?.version === 1) for (let i of r.getPresets()) n.push({
			source: `${e}:${i.namespace}`,
			title: `${t.title ?? e} — ${i.title}`,
			entries: i.entries.map((e) => ({
				...e,
				value: S(e.value)
			}))
		});
	}
	for (let r of t) n.some((t) => t.source.startsWith(`${e}:`) && t.entries.some((e) => e.namespace === r.namespace && e.key === r.key)) || n.push({
		source: `${e}:${r.namespace}`,
		title: game?.modules.get(e)?.title ?? e,
		entries: [r]
	});
	let r = new Set(t.map((e) => `${e.namespace}.${e.key}`));
	return Kt(n).filter((e) => r.has(e.id));
}
//#endregion
//#region src/module/foundry/settings/conflicts/coordinator.ts
var Yt = "settingsPresetConflictChoices";
function Xt() {
	return game?.settings.get("wfrp4e-compatibility-box", "settingsPresetConflictChoices") ?? {};
}
var Zt = Promise.resolve(), Qt = {
	version: 1,
	inspect: Jt,
	decide: en,
	async reset() {
		if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
		await game.settings.set(e, Yt, {});
	},
	plan(e, t) {
		return qt(t, Jt(e, t), Xt());
	},
	resolve(e, t) {
		let n = Zt.then(() => $t(e, t));
		return Zt = n.catch(() => {}), n;
	}
};
async function $t(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to resolve preset conflicts.");
	let n = Jt(e, t), r = new Set(Qt.plan(e, t).conflicts.map((e) => e.id)), i = {};
	for (let e of n.filter((e) => r.has(e.id))) {
		let t = b, n = await foundry.applications.api.DialogV2.input({
			window: { title: "Resolve Settings Preset Conflict" },
			content: `<p>Multiple packages recommend different values for <strong>${t(e.id)}</strong>. Choose which recommendation all cooperating presets should follow.</p><p>Current: <code>${t(JSON.stringify(game.settings.get(e.namespace, e.key)))}</code></p><div class="form-group"><label>Preferred settings source</label><select name="source"><option value="">Leave this setting under my control</option>${e.candidates.map((e, n) => `<option value="${n}">${t(e.title)}</option>`).join("")}</select></div><div class="scrollable" style="max-height:40vh"><ul>${e.candidates.map((e) => `<li><strong>${t(e.title)}</strong>: <code>${t(JSON.stringify(e.value))}</code></li>`).join("")}</ul></div><p>This saves your preference without applying settings. You will review changes next. Updated competing values will ask again.</p>`,
			ok: { label: "Use This Choice" },
			rejectClose: !1
		});
		if (!n) return !1;
		let r = String(n.source ?? ""), a = e.candidates.find((e, t) => String(t) === r);
		if (r !== "" && !a) throw Error("Choose a listed settings source.");
		i[e.id] = {
			signature: e.signature,
			source: a?.source ?? null
		};
	}
	return await en(e, t, i), !0;
}
async function en(t, n, r) {
	if (!game?.ready || !game.user?.isGM) throw Error("GM permission changed.");
	if (!Object.keys(r).length) return;
	let i = Jt(t, n);
	for (let [e, t] of Object.entries(r)) {
		let n = i.find((t) => t.id === e);
		if (!n || n.signature !== t.signature) throw Error("Competing presets changed during review; reopen the action.");
		if (t.source !== null && !n.candidates.some((e) => e.source === t.source)) throw Error("Choose a listed settings source.");
	}
	await game.settings.set(e, Yt, {
		...Xt(),
		...r
	});
}
//#endregion
//#region src/types/patches/paper-doll/Equipment.ts
var tn = [
	"HEAD",
	"BODY",
	"GLOVES",
	"BOOTS"
], nn = ["MAIN_LEFT", "MAIN_RIGHT"], rn = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
], an = {
	BODY: ["body"],
	BOOTS: ["lLeg", "rLeg"],
	GLOVES: ["lArm", "rArm"],
	HEAD: ["head"]
};
function on(e, t) {
	return t.coverage - e.coverage || t.points - e.points || e.item.name.localeCompare(t.item.name) || e.item.id.localeCompare(t.item.id);
}
function sn(e, t) {
	return Math.max(...an[t].map((t) => e.armourPoints[t]));
}
function cn(e, t) {
	return an[t].filter((t) => e.armourPoints[t] > 0).length;
}
function ln(e, t, n) {
	return sn(n.item, e) - sn(t.item, e) || cn(n.item, e) - cn(t.item, e) || on(t, n);
}
function un(e) {
	return e.type === "armour" && e.equipped;
}
function dn(e) {
	let t = e.armourPoints, n = rn.filter((e) => t[e] > 0);
	return {
		coverage: n.length,
		item: e,
		points: n.reduce((e, n) => e + t[n], 0)
	};
}
function fn(e) {
	let t = e.filter(un).map(dn);
	return tn.flatMap((e) => {
		let n = t.filter((t) => sn(t.item, e) > 0).sort((t, n) => ln(e, t, n))[0];
		return n ? [{
			slotId: e,
			uuid: n.item.uuid
		}] : [];
	});
}
function pn(e, t) {
	return e.twoHanded ? "both" : e.offhand ? t === "l" ? "r" : "l" : t;
}
function mn(e, t) {
	return Number(t.twoHanded) - Number(e.twoHanded) || e.name.localeCompare(t.name) || e.id.localeCompare(t.id);
}
function hn(e, t) {
	let n = e.filter((e) => e.type === "weapon" && e.equipped).sort(mn);
	return nn.flatMap((e) => {
		let r = e === "MAIN_LEFT" ? "l" : "r", i = n.find((e) => {
			let n = pn(e, t);
			return n === "both" || n === r;
		});
		return i ? [{
			slotId: e,
			uuid: i.uuid
		}] : [];
	});
}
function gn(e, t) {
	return [...fn(e), ...hn(e, t)];
}
//#endregion
//#region src/module/functions/patches/paper-doll/derive-paper-doll-slot-state.ts
function _n(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function vn(e, t, n, r) {
	let i = _n(e), a = new Map(t.map((e) => [e.slotId, e.uuid]));
	for (let e of [...tn, ...nn]) {
		if (!r.has(e)) continue;
		let t = i[e]?.["0"] ?? null, o = a.get(e) ?? null;
		o ? (i[e] ??= {}, i[e][0] = o) : t && n.has(t) && (i[e] ??= {}, i[e][0] = null);
	}
	return i;
}
function yn(e, t, n) {
	let r = new Map(t.map((e) => [e.uuid, e])), i = _n(e);
	for (let e of Object.values(i)) for (let [t, i] of Object.entries(e)) !i || n.has(i) || r.get(i)?.equipped === !1 && (e[t] = null);
	return i;
}
function bn(e, t, n, r, i) {
	return yn(vn(e, t, n, r), i, n);
}
function xn(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-paper-doll-slot-state.ts
function Sn(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Cn(e) {
	return /^(0|[1-9]\d*)$/.test(e);
}
function wn(e) {
	return e == null || typeof e == "string" && e.length > 0;
}
function R(e) {
	return Sn(e) && Object.entries(e).every(([e, t]) => e.length > 0 && Sn(t) && Object.entries(t).every(([e, t]) => Cn(e) && wn(t)));
}
//#endregion
//#region src/module/functions/patches/paper-doll/equipment-update.ts
function Tn(e) {
	return e.slotId === "MAIN_LEFT" ? "l" : e.slotId === "MAIN_RIGHT" ? "r" : null;
}
function En(e, t, n, r) {
	if (t === null) return {};
	let i = {};
	if (t || (i["system.equipped.value"] = !0), e?.type !== "weapon") return i;
	if (!r) throw Error(`Weapon ${e.uuid} requires the actor's main hand.`);
	let a = Tn(n), o = e.twoHanded ? !1 : a ? a !== r : void 0;
	return o !== void 0 && e.offhand !== o && (i["system.offhand.value"] = o), i;
}
function Dn(e) {
	return e === !0 ? { "system.equipped.value": !1 } : {};
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-item-allowed-in-slot.ts
function On(e, t) {
	switch (t) {
		case "HEAD": return e.armourPoints.head > 0;
		case "BODY": return e.armourPoints.body > 0;
		case "GLOVES": return e.armourPoints.lArm > 0 || e.armourPoints.rArm > 0;
		case "BOOTS": return e.armourPoints.lLeg > 0 || e.armourPoints.rLeg > 0;
		default: return !1;
	}
}
function kn(e, t, n) {
	return n === "MAIN_LEFT" || n === "MAIN_RIGHT" ? t?.type === "weapon" : n === "HEAD" || n === "BODY" || n === "GLOVES" || n === "BOOTS" ? t?.type === "armour" && On(t, n) : e !== "weapon" && e !== "armour";
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-runtime-types.ts
var An = new Set([
	"character",
	"npc",
	"creature"
]);
function z(e) {
	return typeof e == "object" && !!e;
}
function B(e) {
	return z(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function V(e) {
	return B(e) && An.has(e.type);
}
function jn(e) {
	return z(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-equipment.ts
var Mn = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function Nn(e) {
	if (!z(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function Pn(e, t) {
	let n = Nn(e)[t];
	if (n === void 0) return null;
	if (!z(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function Fn(e, t) {
	let n = Pn(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function In(e) {
	return Pn(e, "equipped");
}
function Ln(e) {
	return In(e) !== null;
}
function Rn(e) {
	let t = Nn(e).AP;
	if (!z(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(Mn.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function zn(e) {
	if (!z(e.system) || !z(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function Bn(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: Fn(e, "equipped"),
		id: e.id,
		name: e.name,
		uuid: e.uuid
	};
	return e.type === "armour" ? {
		...t,
		armourPoints: Rn(e),
		type: "armour"
	} : {
		...t,
		offhand: Fn(e, "offhand"),
		twoHanded: Fn(e, "twohanded"),
		type: "weapon"
	};
}
function Vn(e, t) {
	return kn(e.type, Bn(e), t);
}
async function Hn(e, t, n) {
	let r = Bn(t), i = En(r, r?.equipped ?? In(t), n, r?.type === "weapon" ? zn(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function Un(e) {
	let t = Dn(Bn(e)?.equipped ?? In(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/report-paper-doll-error.ts
function Wn(e) {
	return e instanceof Error ? e.message : String(e);
}
function H(e, n) {
	ge(`${t}: ${e}. ${Wn(n)}`, n);
}
function Gn(e, t) {
	e.catch((e) => H(t, e));
}
//#endregion
//#region src/module/foundry/patches/paper-doll/synchronize-paper-doll.ts
var U = "fvtt-paper-doll-ui", Kn = "slots", W = /* @__PURE__ */ new Map(), qn = /* @__PURE__ */ new Set();
function Jn(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Yn(e) {
	let t = e.getFlag(U, Kn);
	if (t === void 0) return {};
	if (!R(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Jn(t);
}
function Xn() {
	let e = game?.settings.get(U, "globalConfig"), t = new Set([...tn, ...nn]);
	if (z(e) && Object.keys(e).length === 0) return t;
	if (!z(e) || !z(e.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let n = Object.values(e.SLOTS);
	if (!n.every(z)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let r = new Set(n.flatMap((e) => Object.keys(e)));
	return r.size ? r : t;
}
function Zn(e) {
	return W.has(e.uuid);
}
function Qn(e) {
	if (!B(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function $n(e) {
	if (!e || e.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function er(e) {
	let t = Yn(e), n = Array.from(e.items), r = n.map(Bn).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: In(e),
		uuid: e.uuid
	})), o = bn(t, gn(r, zn(e)), i, Xn(), a);
	return xn(t, o) ? "unchanged" : (await e.setFlag(U, Kn, o), "synchronized");
}
async function G(e) {
	Qn(e), $n(game);
	let t = e;
	if (!V(t) || !t.isOwner || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !y("paperDoll")) return "unavailable";
	let n = W.get(t.uuid);
	if (n) return await n, G(t);
	let r = er(t).finally(() => {
		W.get(t.uuid) === r && W.delete(t.uuid);
	});
	return W.set(t.uuid, r), r;
}
function tr(e) {
	!V(e) || !e.isOwner || qn.has(e.uuid) || (qn.add(e.uuid), queueMicrotask(() => {
		qn.delete(e.uuid), Gn(G(e), `could not synchronize equipped items for ${e.uuid}`);
	}));
}
async function nr() {
	return $n(game), Promise.all(Array.from(game.actors).filter(V).map(G));
}
//#endregion
//#region src/module/foundry/settings/get-optional-feature-statuses.ts
function rr() {
	return Object.entries(de).map(([e, t]) => ({
		available: fe(e),
		enabled: y(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
//#endregion
//#region src/module/functions/integrations/paper-doll-argon/bridge.ts
var ir = ["TRINKET", "WRIST_RIGHT"];
function ar(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function or(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of ir) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(ar)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function sr(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function cr({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function lr(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/constants.ts
var ur = "enhancedcombathud", dr = e, fr = "enhancedcombathud-wfrp4e", pr = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", mr = "modules/enhancedcombathud/icons", hr = [
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
], gr = [{
	key: "ws",
	icon: `${mr}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${mr}/bolt-spell-cast.webp`
}], _r = [
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
async function vr() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/module/functions/patches/paper-doll/find-slot-changes.ts
function yr(e, t, n) {
	return e[t]?.[n] ?? null;
}
function br(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = yr(e, i, a), o = yr(t, i, a);
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
var xr = Symbol.for("paper-doll-wfrp4e.equipped-state");
function Sr() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function Cr(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function wr(e) {
	if (!z(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function Tr() {
	return Promise.resolve();
}
function Er() {
	let e = Sr(), t = e?.equip, n = globalThis.fromUuid;
	if (Cr(e, t, n), !n) throw Error("Foundry UUID resolution is unavailable.");
	if (e[xr] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!jn(a) || B(this.actor) && !V(this.actor)) return r.call(this, e, t, i);
		let o = wr(i);
		if (!t) return Tr();
		if (!V(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!Vn(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await Hn(this.actor, a, o);
		} catch (e) {
			H(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await G(this.actor);
			} catch (e) {
				H(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[xr] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/enforce-paper-doll-slot-types.ts
var Dr = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function Or() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function kr(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function Ar() {
	let e = Or(), t = e?.filterItems;
	if (kr(e, t), e[Dr] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => jn(e) && Vn(e, t));
	}, e[Dr] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-slot-tooltips.ts
var jr = ".paper-doll .paper-doll-slot", Mr = `data-${e}-drag-tooltip`, Nr = `data-${e}-tooltip`, Pr = `data-${e}-original-tooltip`, Fr = {
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
}, Ir = !1;
function Lr(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(jr);
	return t?.closest(".paper-doll") ? t : null;
}
function Rr() {
	document.querySelectorAll(`[${Nr}]`).forEach((e) => {
		let t = e.getAttribute(Pr);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(Nr), e.removeAttribute(Pr);
	});
}
function zr() {
	document.querySelectorAll(jr).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(Mr, t), e.removeAttribute("data-tooltip"));
	});
}
function Br() {
	document.querySelectorAll(`[${Mr}]`).forEach((e) => {
		let t = e.getAttribute(Mr);
		t && (e.dataset.tooltip = t), e.removeAttribute(Mr);
	});
}
function Vr(e) {
	if (Ir || e.hasAttribute(Nr)) return;
	let t = Fr[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(Pr, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(Nr, "");
}
function Hr(e) {
	let t = Lr(e.target);
	t && Vr(t);
}
function Ur() {
	Ir = !0, Rr(), zr();
}
function Wr() {
	Ir = !1, Br();
}
function Gr() {
	document.addEventListener("pointerover", Hr, !0), document.addEventListener("dragstart", Ur, !0), document.addEventListener("dragend", Wr, !0);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-paper-doll-hooks.ts
var Kr = /* @__PURE__ */ new Map();
function qr() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && y("paperDoll");
}
function Jr(e) {
	if (!z(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!z(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[U];
	return z(n) ? "slots" in n ? R(n.slots) ? {
		kind: "valid",
		state: n[Kn]
	} : {
		kind: "malformed",
		reason: "the Paper Doll slots update has an invalid shape"
	} : { kind: "absent" } : {
		kind: "malformed",
		reason: "the Paper Doll flag update is not an object"
	};
}
function Yr(e) {
	let t = Jr(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function Xr(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function Zr(e, t) {
	let n = Kr.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), Kr.set(e.uuid, n);
}
function Qr(e) {
	if (!z(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function $r(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (H(n, AggregateError(r, n)), await G(e));
}
function ei(e, t, n) {
	if (!qr() || !V(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!z(i) || typeof i.item != "string") continue;
		let t = Qr(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = Xr(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!Vn(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(Hn(e, n, t));
	}
	r.length && Gn($r(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function ti(e, t) {
	if (!qr() || !V(e) || Zn(e)) return;
	let n = Yr(t);
	if (!n) return;
	let r = e.getFlag(U, Kn);
	if (r !== void 0) {
		if (!R(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of br(r, n)) {
			if (!t.from) continue;
			let n = Xr(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && Zr(e, n.uuid);
		}
	}
}
function ni(e, t) {
	if (!qr() || !V(e) || !Yr(t)) return;
	let n = Kr.get(e.uuid);
	Kr.delete(e.uuid), n?.size && Gn($r(e, Array.from(n, (t) => {
		let n = Xr(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(Un), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function ri(e) {
	!qr() || !jn(e) || e.type !== "armour" && e.type !== "weapon" && !Ln(e) || V(e.parent) && tr(e.parent);
}
function ii() {
	Gr(), Hooks.on("paper-doll-swap", ei), Hooks.on("preUpdateActor", ti), Hooks.on("updateActor", ni), Hooks.on("updateItem", ri), Hooks.once("ready", () => {
		if (qr()) {
			try {
				Ar(), Er();
			} catch (e) {
				throw H("could not initialize the required Paper Doll integration", e), e;
			}
			Gn(nr(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/fvtt-paper-doll-ui/register-integration.ts
var ai = "fvtt-paper-doll-ui";
function oi() {
	v("fvtt-paper-doll-ui") && y("paperDoll") && ii();
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/bridge-runtime.ts
var si = "activeWeaponSet", ci = "slots", li = "weaponSets";
function di(e) {
	let t = e.getFlag(ai, ci);
	if (t === void 0) return {};
	if (!R(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function fi(e) {
	let t = e.getFlag(ur, si);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function pi(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function mi(e) {
	let t = e.getFlag(ur, li);
	if (t === void 0) return {};
	if (!z(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !z(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: pi(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: pi(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function hi(e, t) {
	let n = mi(e), r = cr({
		activeSetId: fi(e),
		mainHand: zn(e),
		mainSlots: sr(t),
		weaponSets: n
	}), i = !lr(n, r);
	return i && await e.setFlag(ur, li, r), await vr(), i ? "synchronized" : "unchanged";
}
function gi(e) {
	if (!B(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return or(di(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function _i(e) {
	if (!z(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!z(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[ai];
	if (!z(n) || !(ci in n)) return null;
	let r = n[ci];
	if (!R(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function vi(e) {
	if (!B(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return V(e) ? e.isOwner ? !y("paperDoll") || !y("argonCombatHud") || !y("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", ci) === void 0 ? (await vr(), "unchanged") : hi(e, di(e)) : (await vr(), "unavailable") : "unavailable";
}
//#endregion
//#region src/module/foundry/integrations/splatter/configure-splatter.ts
async function yi() {
	let e = vt(N);
	return await kt(e), {
		automaticBloodColors: game?.settings.get(N, "useBloodsheet") === !0,
		bloodColorCount: Object.keys(game?.settings.get(N, at)).length,
		speciesPath: e.values.creatureType
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/configuration.ts
function bi(e) {
	return game?.i18n.localize(`wfrp4e-compatibility-box.BossBar.${e}`) ?? e;
}
function xi(t) {
	console.error(`${e} | Boss Bar integration failed.`, t), ui?.notifications?.error(bi("Error"));
}
function Si() {
	return {
		currentHpPath: game?.settings.get(E, "currentHpPath"),
		maxHpPath: game?.settings.get(E, "maxHpPath"),
		woundsSystem: game?.settings.get(E, "woundsSystem")
	};
}
async function Ci() {
	return await kt(vt(E)), ui?.notifications?.info(bi("Configured")), Si();
}
//#endregion
//#region src/module/wfrp/folders/queue.ts
var wi = /* @__PURE__ */ new WeakMap();
async function Ti(e, t) {
	let n = (wi.get(e) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		let e = globalThis.navigator?.locks;
		e ? await e.request("foundry:folder-tidy", t) : await t();
	});
	wi.set(e, n);
	try {
		await n;
	} finally {
		wi.get(e) === n && wi.delete(e);
	}
}
//#endregion
//#region src/module/wfrp/folders/merge.ts
async function Ei(e, t, n, r) {
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
function Di(e, t) {
	return e.startsWith("wfrp4e-") && [...t].some((e) => /cubicle\s*7/i.test(e.name));
}
function Oi(e, t, n) {
	let r = e["warhammer-lib"], i = e.core, a = [
		r?.source,
		e.source,
		t?.startsWith("Compendium.") ? t.split(".")[1] : void 0,
		i?.sourceId?.startsWith("Compendium.") ? i.sourceId.split(".")[1] : void 0
	];
	for (let [t, n] of Object.entries(e)) n && typeof n == "object" && "initialization-folder" in n && a.push(t);
	return a.find((e) => typeof e == "string" && n.has(e));
}
function ki(e, t) {
	if (t < 1) throw Error("WFRP folders need at least one available level.");
	return e.length <= t ? [...e] : [...e.slice(0, t - 1), e.slice(t - 1).join("/")];
}
function Ai(e, t, n, r) {
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
			let i = ki(t.map((e) => e.name), r - 1).at(-1), a = t.length === 1 || r === 2 ? n : t[Math.min(t.length - 2, r - 3)].id;
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
			path: ki(t.length ? t : e.fallbackPath ?? [e.fallback], r - 1)
		});
	}
	return f;
}
var ji = ["keepWfrpImportedContentTidy", "keepWfrpCompendiumsTidy"];
function Mi(t) {
	if (!game?.user) throw Error("Foundry user is unavailable during WFRP setting registration.");
	for (let n of ji) game.settings.register(e, n, {
		name: `${e}.Settings.WfrpFolders.${n}.Name`,
		hint: `${e}.Settings.WfrpFolders.${n}.Hint`,
		config: game.user.isGM === !0,
		default: !0,
		scope: "world",
		type: Boolean,
		onChange: t
	});
}
//#endregion
//#region src/module/wfrp/folders/migration.ts
var Ni = "whence-they-hang";
async function Pi(t) {
	if (!t.ready || !t.user?.isGM) return;
	let n = t.settings.storage.get("world");
	if (!n) throw Error("World settings storage is unavailable during WFRP migration.");
	for (let r of ji) {
		if (n.getSetting(`wfrp4e-compatibility-box.${r}`)) continue;
		let i = n.getSetting(`${Ni}.${r}`)?.value;
		typeof i == "boolean" && await t.settings.set(e, r, i);
	}
}
//#endregion
//#region src/module/functions/wfrp/folder-defaults.ts
function K(e) {
	return e.replace(/^(?:WFRP(?:4e|5e)?|Warhammer Fantasy Roleplay)\s*[-–—:]\s*/i, "");
}
function Fi(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let [r, i] of e) {
		let e = (i, a) => {
			let o = K(i.name), s = [...a, o];
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
var Ii = "__wfrp_tidy_root__", Li = "Warhammer Fantasy Roleplay";
async function Ri(e, t) {
	await Ti(e, () => zi(e, t));
}
async function zi(e, t) {
	if (!e.ready || !e.user?.isGM || e.system.id !== "wfrp4e") return;
	await Pi(e);
	let n = new Set([...e.modules.entries()].filter(([e, t]) => Di(e, t.authors ?? [])).map(([e]) => e));
	n.add("wfrp4e");
	let r = (e) => Oi(e.flags ?? {}, e._stats?.compendiumSource, n), i = new Map([...e.modules.entries()].map(([e, t]) => [e, t.title ?? e])), a = Fi([["wfrp4e", e.system.packFolders ?? []], ...[...e.modules.entries()].filter(([e]) => n.has(e)).map(([e, t]) => [e, t.packFolders ?? []])]), o = async (n, o) => {
		let s = [...e.folders].filter((e) => e.type === n), c = new Set([...s, ...o].map((e) => e.folder?.id)), l = s.filter((e) => !e.folder && (e.name === Li || e.name === "WFRP")).sort((e, t) => Number(c.has(t.id)) - Number(c.has(e.id)) || e.id.localeCompare(t.id)), u = l[0];
		await Ei(l, s, o, (e) => !!r(e)), u && u.name !== Li && await u.update({ name: Li });
		let d = Ai(s.map((e) => ({
			id: e.id,
			name: e.name,
			parent: e.folder?.id ?? null,
			official: !!r(e)
		})), o.map((e) => ({
			id: e.id,
			parent: e.folder?.id ?? null,
			official: !!r(e),
			fallback: K(i.get(r(e)) ?? "Content"),
			fallbackPath: n === "Compendium" ? a.packPaths.get(e.id) : void 0
		})), u?.id ?? Ii, t);
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
		u ??= await f(Li, null);
		for (let e of d.folders) await s.find((t) => t.id === e.id).update({
			name: e.name,
			folder: e.parent === Ii ? u.id : e.parent
		});
		for (let e of d.entries) {
			let n = u, r = o.find((t) => t.id === e.id), i = /* @__PURE__ */ new Map(), c = [];
			for (let e = r.folder; e; e = e.folder) c.unshift(e);
			for (let [e, n] of c.entries()) {
				let r = ki(c.slice(0, e + 1).map((e) => e.name), t - 1).at(-1);
				n.color != null && i.set(K(r), n.color.toString());
			}
			for (let t of e.path) {
				let e = s.filter((e) => K(e.name) === K(t) && e.folder?.id === n.id).sort((e, t) => e.id.localeCompare(t.id)), r = K(t);
				n = e[0] ?? await f(r, n.id, a.colors.get(r) ?? i.get(r));
			}
			await r.update({ folder: n.id });
		}
		let p = async (e) => {
			for (let t of s.filter((t) => t.folder?.id === e.id)) {
				let e = K(t.name), n = a.colors.get(e), r = {};
				e !== t.name && (r.name = e), n && n.toLowerCase() !== t.color?.toString().toLowerCase() && (r.color = n), Object.keys(r).length && await t.update(r), await p(t);
			}
		};
		await p(u), await Ei([u], s, o, (e) => !!r(e));
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
async function Bi() {
	game && await Ri(game, CONST.FOLDER_MAX_DEPTH);
}
//#endregion
//#region src/module/functions/folders/empty.ts
function Vi(e, t) {
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
function Hi() {
	if (!game?.ready || !game.user?.isGM) throw Error("Only a GM in a loaded world can purge folders.");
	return game;
}
async function Ui(e) {
	let t = Hi();
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
		candidates: n.flatMap((e) => Vi(e.folders().map((e) => ({
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
async function Wi(e) {
	let t = Hi(), n = {
		deleted: 0,
		skipped: 0
	};
	return await Ti(t, async () => {
		for (let t of e.candidates) {
			Hi();
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
var Gi = "Purge Empty Folders";
function Ki(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
async function qi() {
	if (!game?.ready || !game.user?.isGM) {
		ui?.notifications?.warn("Only a GM in a loaded world can purge empty folders.");
		return;
	}
	try {
		let e = await foundry.applications.api.DialogV2.wait({
			window: { title: Gi },
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
		let t = await Ui(e), n = t.skippedPacks ? ` Skipped ${t.skippedPacks} locked packs.` : "";
		if (!t.candidates.length) {
			ui?.notifications?.info(`No empty folders found.${n}`);
			return;
		}
		let r = t.candidates.map(({ group: e, name: t }) => `<li>${Ki(e.label)}: ${Ki(t)}</li>`).join("");
		if (await foundry.applications.api.DialogV2.wait({
			window: { title: Gi },
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
		let i = await Wi(t);
		ui?.notifications?.info(`Removed ${i.deleted} empty folders. Skipped ${i.skipped} folders that changed.${n}`);
	} catch (e) {
		ge(`${Gi} stopped. Some folders may already have been removed. See the console for details.`, e);
	}
}
//#endregion
//#region src/module/foundry/api/create-module-api.ts
function Ji() {
	return {
		importCalendarContent: je,
		reviewCalendarContent: Me,
		settingsPresets: Wt,
		settingsPresetCoordinator: Qt,
		configureBossBar: Ci,
		configureSplatter: yi,
		purgeEmptyFolders: qi,
		getOptionalFeatures: rr,
		syncAllPaperDollActors: nr,
		syncPaperDollArgonActor: vi,
		syncPaperDollActor: G,
		tidyWfrpContent: Bi
	};
}
//#endregion
//#region src/module/foundry/api/register-module-api.ts
function Yi() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	let n = t;
	n.api = Ji();
}
//#endregion
//#region src/module/functions/integrations/bossbar/selection.ts
function Xi(e) {
	let t = e.filter((e) => e.enemy), n = (e, t) => e.traits.some((e) => e.trim().toLowerCase() === t), r = t.filter((e) => n(e, "boss"));
	if (r.length) return r;
	let i = t.filter((e) => e.maxWounds >= 30 && n(e, "grim") && (n(e, "leader") || n(e, "champion"))).sort((e, t) => t.maxWounds - e.maxWounds || t.weaponSkill - e.weaponSkill || t.strength - e.strength), a = i[0];
	if (!a) return [];
	let o = i.filter((e) => e.maxWounds === a.maxWounds && e.weaponSkill === a.weaponSkill && e.strength === a.strength);
	return o.length <= 2 ? o : [];
}
//#endregion
//#region src/module/functions/integrations/bossbar/health.ts
var Zi = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
};
function Qi(e) {
	return Object.entries(Zi).every(([t, n]) => e[t] === n);
}
function $i(e, t) {
	return !Number.isFinite(e) || !Number.isFinite(t) || t <= 0 ? 0 : Math.min(100, Math.max(0, 100 * e / t));
}
function ea(e) {
	let t = Number.isFinite(e.maxCriticals) ? Math.max(0, Math.floor(e.maxCriticals)) : 0;
	return {
		max: t,
		remaining: Math.max(0, t - Math.max(0, e.criticals))
	};
}
function ta(e) {
	return (typeof e == "number" || typeof e == "string" && e.trim() !== "") && Number.isFinite(Number(e));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/runtime.ts
function na() {
	return ui && Reflect.get(ui, "bossBar");
}
function ra(e) {
	return Array.from(e.combatants).flatMap(({ actor: e, token: t }) => e ? [{
		uuid: e.uuid,
		enemy: t?.disposition === -1 && !e.hasPlayerOwner,
		traits: Array.from(e.items).filter((e) => e.type === "trait").map((e) => e.name),
		maxWounds: e.system.status?.wounds?.max ?? 0,
		weaponSkill: e.system.characteristics?.ws?.value ?? 0,
		strength: e.system.characteristics?.s?.value ?? 0
	}] : []);
}
function ia(e) {
	return {
		wounds: e.system.status?.wounds?.value ?? 0,
		maxWounds: e.system.status?.wounds?.max ?? 0,
		maxCriticals: e.system.status?.criticalWounds?.max ?? 0,
		criticals: Array.from(e.items).filter((e) => e.type === "critical" && ta(e.system?.wounds?.value)).length
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/combat.ts
var aa = /* @__PURE__ */ new WeakSet();
async function oa(e) {
	if (!game?.user?.isGM || !y("bossBar") || !game.settings.get("wfrp4e-compatibility-box", D.automatic) || !e.scene || aa.has(e)) return;
	let t = Xi(ra(e)), n = e.scene.getFlag("bossbar", "actors") ?? [], r = new Set(n.map((e) => e.uuid)), i = game.settings.get(E, "barStyles"), a = t.filter((e) => r.has(e.uuid) ? !1 : (r.add(e.uuid), !0)).map((e) => ({
		uuid: e.uuid,
		style: i[0]?.id ?? "default",
		hideName: !1
	}));
	if (a.length) {
		aa.add(e);
		try {
			await e.scene.setFlag(E, "actors", [...n, ...a]);
		} finally {
			aa.delete(e);
		}
	}
}
//#endregion
//#region src/module/foundry/integrations/bossbar/critical-segments.ts
var sa = "wfrp-bossbar-segments", ca = "http://www.w3.org/2000/svg", la = [
	"background",
	"bar",
	"foreground"
], ua = [
	"bg",
	"bar",
	"fg"
];
function da(e, t) {
	let n = la.map((t) => e.querySelector(`:scope > .bar-${t}`)), r = n.map((e) => e?.querySelector(":scope > img")), i = r.every((e, t) => e?.getAttribute("src")?.split(/[?#]/)[0]?.endsWith(`/bossbar/resources/matching-images/segmented/${ua[t]}.png`)), a = t !== void 0 && i ? String(t) : void 0;
	if (e.dataset.wfrpBossbarSegments === a) return;
	e.querySelectorAll(`.${sa}`).forEach((e) => e.remove()), e.classList.toggle("wfrp-bossbar-segmented", a !== void 0);
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
		o.className = sa, o.setAttribute("aria-hidden", "true"), o.style.gridTemplateColumns = a === "0" ? "none" : `repeat(${a}, minmax(0, 1fr))`;
		for (let t = 0; t < Number(a); t++) o.append(fa(e.ownerDocument, n.src));
		i.append(o);
	}
}
function fa(e, t) {
	let n = e.createElementNS(ca, "svg");
	n.setAttribute("viewBox", "829 0 787 361"), n.setAttribute("preserveAspectRatio", "xMidYMid meet");
	let r = e.createElementNS(ca, "image");
	return r.setAttribute("href", t), r.setAttribute("width", "7967"), r.setAttribute("height", "361"), n.append(r), n;
}
//#endregion
//#region src/module/foundry/integrations/bossbar/wounds-bar.ts
function pa(e, t) {
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
function ma(e, t) {
	return e.find((e) => e.id === t) ?? e[0];
}
//#endregion
//#region src/module/foundry/integrations/bossbar/display.ts
function ha(t = na()) {
	if (!t?.element || t.id !== "boss-bar") return;
	let n = t.element;
	n.classList.add("wfrp4e-compatibility-box-bossbar");
	let r = We() && game?.settings.get("wfrp4e-compatibility-box", D.stacked) === !0 && Qi(Si()), i = game?.settings.get(E, "barStyles"), a = game?.settings.get(e, D.woundsStyle), o = ma(i, a);
	for (let e of n.querySelectorAll(".bar-list-item")) {
		let n = t.bars.find((t) => t.actor.uuid === e.dataset.uuid)?.actor;
		if (!n) continue;
		let i = e.querySelector(".boss-bar-container:not(.wfrp-bossbar-wounds)");
		if (!i) continue;
		if (!r || !o) {
			da(i), e.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), i.dataset.wfrpBossbarPrimary && (i.style.removeProperty("--bar-percent"), i.removeAttribute("role"), i.removeAttribute("aria-label"), i.removeAttribute("aria-valuenow"), i.removeAttribute("aria-valuemax"), i.removeAttribute("aria-valuemin"), delete i.dataset.wfrpBossbarPrimary);
			continue;
		}
		let a = ia(n), s = ea(a);
		da(i, s.max), i.dataset.wfrpBossbarPrimary = "true", i.style.setProperty("--bar-percent", `${$i(s.remaining, s.max)}%`), ga(i, bi("CriticalCapacity"), s.remaining, s.max);
		let c = e.querySelector(".wfrp-bossbar-wounds");
		c?.dataset.style !== o.id && (e.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), c = pa(e.ownerDocument, o), c.dataset.wfrpBossbarExtra = "", c.dataset.style = o.id, i.before(c)), c && (c.style.setProperty("--bar-percent", `${$i(a.wounds, a.maxWounds)}%`), c.classList.toggle("wfrp-bossbar-threat", a.wounds <= 0), ga(c, bi("Wounds"), Math.max(0, a.wounds), a.maxWounds));
	}
}
function ga(e, t, n, r) {
	e.setAttribute("role", "progressbar"), e.setAttribute("aria-label", t), e.setAttribute("aria-valuemin", "0"), e.setAttribute("aria-valuemax", String(Math.max(0, r))), e.setAttribute("aria-valuenow", String(Math.min(n, Math.max(0, r))));
}
var _a = !1;
function va() {
	_a || (_a = !0, queueMicrotask(() => {
		_a = !1;
		let e = na();
		if (e?.element?.isConnected) try {
			e.updateBars(), ha(e);
		} catch (e) {
			xi(e);
		}
	}));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/settings.ts
function ya() {
	if (game) {
		for (let t of ["automatic", "stacked"]) game.settings.register(e, D[t], {
			name: `${e}.BossBar.Settings.${t}.Name`,
			hint: `${e}.BossBar.Settings.${t}.Hint`,
			config: !0,
			default: !0,
			scope: "world",
			type: Boolean
		});
		game.settings.register(e, D.woundsStyle, {
			name: `${e}.BossBar.Settings.woundsStyle.Name`,
			hint: `${e}.BossBar.Settings.woundsStyle.Hint`,
			config: !0,
			default: "default-grass",
			scope: "world",
			type: String,
			choices: () => Object.fromEntries((game?.settings.get(E, "barStyles")).map((e) => [e.id, e.name]))
		});
	}
}
function ba(t) {
	if (!game?.user?.isGM) return;
	let n = t.querySelector(`[name="${E}.currentHpPath"]`)?.closest(".form-group");
	if (!n || t.querySelector("[data-wfrp-bossbar-setup]")) return;
	let r = t.ownerDocument.createElement("div");
	r.className = "form-group", r.dataset.wfrpBossbarSetup = "";
	let i = t.ownerDocument.createElement("button");
	i.type = "button", i.textContent = bi("Configure"), i.addEventListener("click", async () => {
		i.disabled = !0;
		try {
			let n = await Ci();
			for (let [e, r] of Object.entries(n)) {
				let n = t.querySelector(`[name="bossbar.${e}"]`);
				n && (typeof r == "boolean" ? n.checked = r : n.value = r);
			}
			let r = t.querySelector(`[name="${e}.${D.stacked}"]`);
			r && (r.checked = !0);
		} catch (e) {
			xi(e);
		} finally {
			i.disabled = !1;
		}
	}), r.append(i), n.insertAdjacentElement("beforebegin", r);
}
//#endregion
//#region src/module/foundry/integrations/bossbar/register-integration.ts
function xa() {
	if (v("bossbar") && !(!y("bossBar") || game?.system.id !== "wfrp4e")) {
		ya(), Hooks.on("combatStart", (e) => void oa(e).catch(xi)), Hooks.on("renderBossBar", (e) => ha(e)), Hooks.on("renderSettingsConfig", (e, t) => {
			t instanceof HTMLElement && ba(t);
		});
		for (let e of [
			"updateActor",
			"createItem",
			"updateItem",
			"deleteItem",
			"createActiveEffect",
			"updateActiveEffect",
			"deleteActiveEffect"
		]) Hooks.on(e, va);
		Hooks.on("updateSetting", (e) => {
			let t = e.key;
			[
				"bossbar.currentHpPath",
				"bossbar.maxHpPath",
				"bossbar.woundsSystem"
			].includes(t) && na()?.render(!0).catch(xi), (t.startsWith("bossbar.") || t.startsWith("wfrp4e-compatibility-box.bossBar") || t === "wfrp4e.uiaCrits") && va();
		});
	}
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/argon-logic.ts
var Sa = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function Ca(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function wa(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function Ta(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function Ea(e) {
	return e.trim().toLowerCase();
}
function Da(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function Oa(e) {
	return e.type === "trait" ? (Ta(e), e.rollable && !e.disabled && Sa.has(e.traitBaseName.toLowerCase())) : !1;
}
function ka(e) {
	return e.type === "weapon" || Oa(e);
}
function Aa(e) {
	return e.type === "weapon";
}
function ja(e) {
	return Ca(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function Ma(e) {
	return Ca(e), e.advances > 0;
}
function Na(e, t) {
	return e.forEach(Ca), t === "basic" ? e.filter((e) => !ja(e)).map((e) => e.id) : t === "advanced" ? e.filter(ja).map((e) => e.id) : t === "trained" ? e.filter(Ma).map((e) => e.id) : e.map((e) => e.id);
}
function Pa(e, t) {
	return e.forEach(wa), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function Fa(e) {
	return e.filter((e) => e.type === "weapon" || Oa(e)).map((e) => e.id);
}
function Ia(e) {
	return e.filter((e) => e.type === "trait" ? (Ta(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function La(e, t) {
	return e.forEach(Ca), t.flatMap((t) => {
		let n = Ea(t.name), r = e.find((e) => Ea(e.name) === n);
		return !r || t.trained && !Ma(r) ? [] : [r.id];
	});
}
function Ra(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function za(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function Ba(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => za(e.name, t))).map((e) => e.id) : [];
}
function Va(e) {
	let t = [];
	return (e.type === "weapon" || Oa(e)) && t.push({
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
function Ha(e, t) {
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
var Ua = "argonCombatItemPatterns", Wa = "*Draught*, *Potion*";
function q(t, n) {
	let r = de[n];
	fe(n) && t.register(e, r.settingKey, {
		config: !0,
		default: !0,
		hint: `${e}.Settings.Features.${n}.Hint`,
		name: `${e}.Settings.Features.${n}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function Ga(t) {
	fe("argonCombatHud") && t.register(e, Ua, {
		config: !0,
		default: Wa,
		hint: `${e}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${e}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: vr,
		scope: "world",
		type: String
	});
}
function Ka() {
	if (!game) throw Error(`${e} | Foundry game is unavailable during settings registration.`);
	q(game.settings, "argonCombatHud"), q(game.settings, "bossBar"), q(game.settings, "healthEstimate"), q(game.settings, "paperDoll"), q(game.settings, "paperDollArgonBridge"), q(game.settings, "simpleCalendar"), q(game.settings, "simpleTimekeeping"), Ga(game.settings);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/actor-flags.ts
var qa = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function Ja(e, t) {
	return e.flags?.[fr]?.[t];
}
function Ya(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? Ja(e, t);
}
async function Xa(t) {
	let n = {};
	for (let r of qa) {
		if (t.getFlag("wfrp4e-compatibility-box", r) !== void 0) continue;
		let i = Ja(t, r);
		i !== void 0 && (n[`flags.${e}.${r}`] = i);
	}
	Object.keys(n).length && await t.update(n);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/argon-helpers.ts
function Za(t, n) {
	if (typeof t != "object" || !t) throw Error(`${e} | ${n} must be an object.`);
	return t;
}
function J(t, n) {
	if (typeof t != "string" || !t.trim()) throw Error(`${e} | ${n} must be a non-empty string.`);
	return t;
}
function Qa(t, n) {
	if (typeof t != "boolean") throw Error(`${e} | ${n} must be a boolean.`);
	return t;
}
function $a(t, n) {
	if (!Number.isNumeric(t)) throw Error(`${e} | ${n} must be numeric.`);
	return Number(t);
}
function eo(e) {
	return e == null || e === "" ? null : $a(e, "item quantity");
}
function to(t, n, r, i) {
	let a = Ya(t, n);
	if (a === void 0) return i;
	if (!r.includes(a)) throw Error(`${e} | Argon actor flag ${dr}.${n} has invalid value ${String(a)}.`);
	return a;
}
function no(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = Qa(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function ro(e, t = !1) {
	let n = Za(e, "Argon item"), r = J(n.type, "Argon item type"), i = J(n.name, `${r} item name`), a = {
		id: J(n.id, `${r} ${i} id`),
		name: i,
		quantity: eo(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = J(n.advanced?.value, `${i} advanced classification`), a.grouped = J(n.grouped?.value, `${i} grouped classification`), a.advances = $a(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = J(n.lore?.value, `${i} lore`), a.memorized = Qa(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = Qa(n.system?.disabled, `${i} disabled state`), a.rollable = Qa(n.rollable?.value, `${i} rollable state`), a.traitBaseName = Da(i)), t && no(a, n, r), a;
}
function Y(e) {
	return [...e].map((e) => ro(e));
}
function X(t, n) {
	let r = new Map([...t].map((e) => [e.id, e]));
	return n.map((t) => {
		let n = r.get(t);
		if (!n) throw Error(`${e} | Selected Argon item ${t} is no longer available.`);
		return n;
	});
}
function io(e) {
	return Va(ro(e, !0));
}
function ao(e) {
	let t = to(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return X(n, Na(Y(n), t));
}
function oo(e) {
	let t = to(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return X(n, Pa(Y(n), t));
}
function so(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return X(t, Fa(Y(t)));
}
function co(e) {
	let t = [...e.itemTypes.trait];
	return X(t, Ia(Y(t)));
}
function lo(e) {
	let t = gr.map((e) => ({
		...e,
		type: "characteristic"
	})), n = _r.map((e) => ({
		name: uo(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = X(r, La(Y(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function uo({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = go(`NAME.${e}`, t);
	return n ? `${i} (${go(n, r)})` : i;
}
function fo(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = Ra(String(t)), r = [...e.items];
	return X(r, Ba(Y(r), n));
}
function po(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function mo(e) {
	return ka(ro(e));
}
function ho(e) {
	return Aa(ro(e));
}
function go(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/buttons.ts
function _o(e) {
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
				details: io(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = po(this.item);
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
			let e = oo(this.actor), t = so(this.actor), s = co(this.actor), c = lo(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = fo(this.actor), u = [
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
				icon: `${mr}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${mr}/drink-me.webp`,
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
function vo() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!y("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/movement.ts
function yo(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function bo(e, t, n) {
	yo(e, "move score"), yo(t, "maximum distance"), yo(n, "used distance");
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
function xo(e) {
	return yo(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/panels.ts
function So(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function Co(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function wo(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return pr;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await Xa(this.actor), await super._onConfigure(e);
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
			let e = hr.map((e) => {
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
			}), n = ao(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return So(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return So(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return Co(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += So(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = bo(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${xo(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${xo(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: xo(t.bubbleDistance),
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
function To(t) {
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
			if (!mo(r) || r.actor !== this.actor) throw Error(`${e} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let i = t.currentTarget.dataset.set, a = t.currentTarget.dataset.slot;
			if (!i || !a) throw Error(`${e} | Argon weapon-set drop target has no set or slot identifier.`);
			let o = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			o[i] ??= {}, o[i][a] = r.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", o), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!Ya(this.actor, "switchEquip")) return;
			let n = Ha(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(ho).map((e) => ({
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
function Eo() {
	v("enhancedcombathud") && y("argonCombatHud") && (vo(), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = _o(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = wo(e), a = To(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	}));
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/panels.ts
function Do(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = _o(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return gi(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/report-bridge-error.ts
function Oo(e) {
	return e instanceof Error ? e.message : String(e);
}
function ko(e, n) {
	ge(`${t}: ${e}. ${Oo(n)}`, n);
}
function Ao(e, t) {
	e.catch((e) => ko(t, e));
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/register-integration.ts
function jo() {
	return y("paperDoll") && y("argonCombatHud") && y("paperDollArgonBridge");
}
function Mo(e, t) {
	!jo() || !V(e) || _i(t) && Ao(vi(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function No() {
	v("fvtt-paper-doll-ui") && v("enhancedcombathud") && jo() && (Hooks.on("argonInit", (e) => {
		if (!e || typeof e != "object" && typeof e != "function" || !("defineMainPanels" in e) || typeof e.defineMainPanels != "function") throw Error("Argon main panel registration API is unavailable.");
		let { PaperDollQuickItemsPanel: t } = Do(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", Mo));
}
//#endregion
//#region src/module/foundry/settings/conflicts/register.ts
function Po() {
	Hooks.once("setup", () => {
		game?.settings.register(e, Yt, {
			name: "Settings preset conflict choices",
			hint: "Preferred sources for conflicting settings presets.",
			scope: "world",
			config: !1,
			default: {},
			type: Object
		}), game?.settings.registerMenu(e, "resetPresetConflictChoices", {
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
					}) === "reset" && await Qt.reset(), this;
				}
			}
		});
	});
}
//#endregion
//#region src/module/foundry/settings/presets/register.ts
function Fo() {
	Po();
	let t = yt().filter(I);
	Hooks.once("setup", () => {
		game?.settings.registerMenu(e, "exportSettingsPreset", {
			name: "Settings presets",
			label: "Export Settings Preset",
			hint: "Choose exact world settings to download as namespace JSON.",
			icon: "fa-solid fa-file-export",
			restricted: !0,
			type: class extends foundry.applications.api.ApplicationV2 {
				async render() {
					try {
						await Ht();
					} catch (e) {
						It(e);
					}
					return this;
				}
			}
		});
		for (let n of t) {
			let t = Pt(n);
			game?.settings.register(e, Ft(n), {
				name: `Ignore ${t} setup prompts`,
				hint: `Do not prompt when ${t} settings differ from the included preset. Uncheck to resume startup checks for all GMs in this world.`,
				config: game.user?.isGM === !0,
				default: !1,
				scope: "world",
				type: Boolean
			}), game?.settings.registerMenu(e, n.menuKey ?? `configureSettingsPreset-${n.namespace}`, {
				name: `${t} settings preset`,
				label: `Apply ${t} Preset`,
				hint: `Apply only the settings included in Compatibility Box's ${t} preset.`,
				icon: "fa-solid fa-gears",
				restricted: !0,
				type: class extends foundry.applications.api.ApplicationV2 {
					async render() {
						try {
							await Lt(n);
						} catch (e) {
							It(e);
						}
						return this;
					}
				}
			});
		}
	}), Hooks.on("updateSetting", (e) => {
		let n = e.key;
		for (let e of t.filter((e) => e.watchSettings?.includes(n))) Rt(e, !0).catch(It);
	}), Hooks.once("ready", async () => {
		for (let e of t) try {
			await Rt(e);
		} catch (e) {
			It(e);
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/repair-mad-prefab-exclusions.ts
var Io = /* @__PURE__ */ new WeakSet();
function Lo(t) {
	if (Io.has(t)) return !1;
	let n = t.Initialise, r = /* @__PURE__ */ new Set();
	return t.Initialise = function(t, ...i) {
		let a = t?.moduleName, o = a ? game?.modules.get(a) : void 0, s = t?.ignoredCompendiumPacks;
		if (!a?.startsWith("mad-") || !o?.active || !o.packs) return n.call(this, t, ...i);
		let c = `${a}-prefabs`;
		return !Array.isArray(s) || !s.includes(c) || Array.from(o.packs).some((e) => e.name === c) ? n.call(this, t, ...i) : (r.has(a) || (r.add(a), console.warn(`${e} | ${a}: skipped unavailable Scene Packer exclusion ${c}.`)), n.call(this, {
			...t,
			ignoredCompendiumPacks: s.filter((e) => e !== c)
		}, ...i));
	}, Io.add(t), !0;
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/register-integration.ts
function Ro() {
	v("scene-packer") && game?.system.id === "wfrp4e" && typeof ScenePacker < "u" && Lo(ScenePacker);
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/repair-forge-owner-detection.ts
var zo = /* @__PURE__ */ new WeakSet();
function Bo(e, t) {
	if (zo.has(e)) return !1;
	let n = e._detectForgeAccountId;
	return e._detectForgeAccountId = async function() {
		let e = t();
		return this.isRunningOnForge() && typeof e == "string" && /^[a-zA-Z0-9_-]+$/.test(e) && e !== "bazaar" ? (this.forgeAccountId = e, !0) : n.call(this);
	}, zo.add(e), !0;
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/register-integration.ts
async function Vo() {
	if (!v("fa-nexus") || game?.system.id !== "wfrp4e" || typeof ForgeAPI > "u") return;
	let t = Array.from(document.querySelectorAll("script[type=\"module\"][src]")).find((e) => {
		let t = new URL(e.src).pathname;
		return /\/modules\/fa-nexus\/(?:[^/]+\/)?scripts\/core\/forge-integration\.js$/.test(t);
	});
	if (!t) {
		console.warn(`${e} | FA Nexus Forge integration script was not found; patch skipped.`);
		return;
	}
	try {
		let e = (await import(
			/* @vite-ignore */
			t.src
)).forgeIntegration;
		if (typeof e?._detectForgeAccountId != "function" || typeof e.isRunningOnForge != "function") throw Error("FA Nexus Forge integration API is unavailable.");
		Bo(e, () => ForgeAPI.lastStatus?.ownerUserId);
	} catch (t) {
		console.error(`${e} | Could not install FA Nexus Forge compatibility.`, t);
	}
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-data-model-migrations.ts
var Ho = /* @__PURE__ */ new WeakSet();
function Uo(e) {
	let t = e.migrateData;
	return typeof t != "function" || Ho.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, Ho.add(e), !0);
}
function Wo() {
	return [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(Uo(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-roll-modes.ts
function Go() {
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
function Ko(e) {
	let t = Z(e);
	return {
		kind: "speaker",
		actor: Q(t.actor),
		scene: Q(t.scene),
		token: Q(t.token)
	};
}
function qo(e) {
	return Ko(Z(Z(e).context).speaker);
}
function Jo(e) {
	let t = e.system ?? {};
	switch (e.type) {
		case "test": return [qo(t.testData)];
		case "opposed": {
			let e = Z(t.opposedTestData);
			return [qo(e.attackerTestData), qo(e.defenderTestData)];
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
			return e.targetSpeakerData && n.push(Ko(e.targetSpeakerData)), e.defenderMessageId && n.push({
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
function Yo(e) {
	let t = new DOMParser().parseFromString(e, "text/html").body;
	for (let e of t.querySelectorAll("script, style, template, button, input, select, textarea, .chat-button, a[data-action], [role='button'], .dice-tooltip, .applied-breakdown, .secret:not(.revealed), [hidden], [aria-hidden='true']")) e.remove();
	for (let e of t.querySelectorAll("img")) e.replaceWith(t.ownerDocument.createTextNode(e.alt ? ` ${e.alt} ` : ""));
	for (let e of t.querySelectorAll("br, p, div, li, tr, h1, h2, h3, h4, h5, h6")) e.append(t.ownerDocument.createTextNode("\n"));
	for (let e of t.querySelectorAll("td, th")) e.append(t.ownerDocument.createTextNode(" "));
	return (t.textContent ?? "").split("\n").map((e) => e.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}
function Xo(e) {
	let t = document.createElement("p");
	return t.textContent = e, t.style.whiteSpace = "pre-line", t;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/render-orphaned-chat-cards.ts
var Zo = /* @__PURE__ */ new WeakSet();
function Qo(e) {
	if (!game) return !1;
	switch (e.kind) {
		case "speaker": return e.scene && e.token ? !!game.scenes.get(e.scene)?.tokens.get(e.token)?.actor : !!(e.actor && game.actors.get(e.actor));
		case "uuid": return !!(e.uuid && fromUuidSync(e.uuid)?.documentName === "Actor");
		case "message": {
			let t = game.messages.get(e.id);
			return t ? t._source.type === "test" ? Jo(t._source).every(Qo) : !1 : !e.required;
		}
	}
}
async function $o(e, t) {
	let n = e.toObject(), r = e.visible && e.isContentVisible, i = r ? Yo(n.content) : "", a = new foundry.documents.ChatMessage({
		...n,
		type: "base",
		system: {},
		flags: {},
		content: Xo(i).outerHTML
	}), o = await a.renderHTML(t), s = o.querySelector(".message-content");
	if (s) {
		let e = r && a.isContentVisible ? i : Yo(s.innerHTML);
		s.replaceChildren(Xo(e));
	}
	return o.addEventListener("contextmenu", (e) => e.stopPropagation(), { capture: !0 }), o;
}
function es() {
	let e = CONFIG.ChatMessage.documentClass?.prototype;
	if (!e || Zo.has(e)) return !1;
	let t = e.renderHTML;
	return e.renderHTML = function(e) {
		return Jo(this._source).some((e) => !Qo(e)) ? $o(this, e) : t.call(this, e);
	}, Zo.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/active-effect-schema.ts
function ts(e) {
	let t = e.schema;
	if (t.fields.changes) return !1;
	let n = e.defineSchema;
	return e.defineSchema = function() {
		let e = n.call(this);
		return e.changes ||= foundry.data.ActiveEffectTypeDataModel.defineSchema().changes, e;
	}, t.extendFields({ changes: foundry.data.ActiveEffectTypeDataModel.defineSchema().changes }), !0;
}
function ns() {
	return Object.values(CONFIG.ActiveEffect?.dataModels ?? {}).reduce((e, t) => e + Number(ts(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/guard-actorless-token-ruler.ts
var rs = /* @__PURE__ */ new WeakSet(), is = /* @__PURE__ */ new WeakSet();
function as() {
	let e = CONFIG.Token?.rulerClass?.prototype, t = foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	if (!e || !t || e === t || !Object.prototype.isPrototypeOf.call(t, e) || typeof e._getSegmentStyle != "function" || typeof t._getSegmentStyle != "function" || rs.has(e)) return !1;
	let n = e._getSegmentStyle, r = t._getSegmentStyle;
	return e._getSegmentStyle = function(...e) {
		if (this.token.actor) return n.apply(this, e);
		if (!is.has(this.token)) {
			is.add(this.token);
			let { uuid: e, actorId: t, actorLink: n } = this.token.document;
			console.warn("WFRP4e Compatibility Box | Token has no actor; using the core ruler style.", {
				tokenUuid: e,
				actorId: t,
				actorLink: n,
				worldActorExists: !!(t && game?.actors.get(t))
			});
		}
		return r.apply(this, e);
	}, rs.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/dual-wielder-cleanup.ts
var os = /* @__PURE__ */ new WeakSet();
function ss() {
	if (!game || !["10.0.3", "10.1.2"].includes(game.system.version)) return !1;
	let e = CONFIG.Actor.documentClass;
	if (typeof e != "function") return !1;
	let t = e.prototype;
	if (!z(t) || typeof t.getScripts != "function") return !1;
	let n = t;
	if (os.has(n)) return !1;
	let r = n.getScripts;
	return n.getScripts = function(e, ...t) {
		let n = r.call(this, e, ...t);
		return e === "startTurn" ? n.filter((e) => !(e.context?.effect?.statuses.has("dualwielder") && /^this\.effect\.delete\(\);?$/.test(e.script.trim()))) : n;
	}, os.add(n), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/apply-compatibility-patches.ts
function cs() {
	game?.system.id === "wfrp4e" && (Go(), Wo(), ns(), es(), as(), ss());
}
//#endregion
//#region src/module/wfrp/folders/hooks.ts
var ls, us = !1, ds = !1;
function $() {
	if (!(!game?.ready || !game.user?.isActiveGM)) {
		if (us) {
			ds = !0;
			return;
		}
		clearTimeout(ls), ls = setTimeout(() => {
			fs();
		}, 1e3);
	}
}
async function fs() {
	if (!(!game?.ready || !game.user?.isActiveGM || us)) {
		us = !0, ds = !1;
		try {
			await Bi();
		} catch (e) {
			console.error(`${t}: WFRP folder cleanup failed.`, e), ui?.notifications?.error(`${t}: WFRP cleanup failed and may be incomplete. See the console for details.`, {
				console: !1,
				permanent: !0
			});
		} finally {
			us = !1, ds && $();
		}
	}
}
function ps() {
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
function ms() {
	Hooks.once("setup", () => Mi($)), ps(), Hooks.once("canvasInit", Be), Hooks.once("ready", Be), Hooks.once("init", () => {
		cs(), Ka(), we(), Ne(), Ro(), Vo(), Yi(), xa(), Eo(), oi(), No(), Fo();
	});
}
//#endregion
//#region src/module/init/index.ts
ms();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map