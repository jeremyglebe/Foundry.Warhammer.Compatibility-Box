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
function g(e, t = !1) {
	let n = m(e), r = d[n.month], i = (e) => String(e).padStart(2, "0");
	return t ? `${n.year} ${r.name} ${i(n.day + 1)} ${i(n.hour)}:${i(n.minute)}:${i(n.second)}` : `${r.intercalary ? "" : `${f[n.weekday].name}, `}${r.name} ${i(n.day + 1)}, ${n.year}`;
}
function te() {
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
var _ = "foundryvtt-simple-calendar-reborn", ne = "simple-timekeeping", v = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]);
function re(e) {
	let t = 2166136261, n = 5381;
	for (let r of e) t = Math.imul(t ^ r.charCodeAt(0), 16777619), n = Math.imul(n, 33) ^ r.charCodeAt(0);
	return (t >>> 0).toString(16).padStart(8, "0") + (n >>> 0).toString(16).padStart(8, "0");
}
function ie(e) {
	return `<p><strong>Sources:</strong> ${e.map((e) => {
		let t = c.sources[e];
		if (!t) throw Error(`Unknown calendar source: ${e}`);
		return t.uuid ? `@UUID[${t.uuid}]{${t.title}}` : t.url ? `<a href="${v(t.url)}">${v(t.title)}</a>` : v(t.title);
	}).join("; ")}</p>`;
}
function ae(e) {
	let t = d[e.month], n = `${t.intercalary ? "" : `${e.day} `}${t.name}`;
	return e.month === e.endMonth && e.day === e.endDay ? n : `${n} – ${e.endDay} ${d[e.endMonth].name}`;
}
function oe(e) {
	let t = e.date ? `${e.date.day} ${d[e.date.month].name} ` : "";
	return `${e.approximate ? "c. " : ""}${t}${e.year}${e.endYear === e.year ? "" : `–${e.endYear}`} IC (${e.precision})`;
}
function se(e, t, n, r, i) {
	return {
		_id: re(`${e}:${t}`),
		name: n,
		folder: null,
		ownership: { default: i },
		flags: { [e]: { calendarContent: {
			id: t,
			version: 1
		} } },
		pages: [{
			_id: re(`${e}:${t}:details`),
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
function ce(e, t, n, r, i, a) {
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
		e.flags[_] = { noteData: {
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
		} }, e.flags.core = { sheetClass: `${_}.NoteSheet` };
	}
	a && (e.pages[0].flags[ne] = {
		eventTime: t,
		eventEnd: n,
		repeat: r ? "year" : ""
	});
}
function le(e, t, n, r) {
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
		}), s = se(e, t.id, t.name, `<p><strong>${v(ae(t))}</strong> · ${v(t.region)} · Annual observance</p><p>${v(t.summary)}</p>${ie(t.sources)}`, 2);
		ce(s, a, o, !0, n.calendarId, n.timekeeping), i.push(s);
	}
	if (t.history !== !1) {
		let t = se(e, "ubersreik-history", "Ubersreik — Historical Almanac", `<p>GM reference. Published years and ranges are retained. Exact-date entries identify their date basis: published scenario dates use an assumed campaign year, and the deposition uses the explicitly approved provisional date of 5 Nachexen 2512 IC.</p><table><thead><tr><th>Date and precision</th><th>Event</th></tr></thead><tbody>${c.history.map((e) => `<tr><td>${v(oe(e))}</td><td><strong>${v(e.title)}</strong><p>${v(e.summary)}</p>${e.date ? `<p><strong>Date basis:</strong> ${v(e.date.basis)}</p>` : ""}${ie(e.sources)}</td></tr>`).join("")}</tbody></table><h2>Dating notes and movable festivals</h2>${c.researchNotes.map((e) => `<h3>${v(e.title)}</h3><p>${v(e.text)}</p>${ie(e.sources)}`).join("")}`, 0);
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
			}), a = se(e, `history-${t.id}`, t.title, `<p><strong>${v(oe(t))}</strong></p><p>${v(t.summary)}</p><p><strong>Date basis:</strong> ${v(t.date.basis)}</p>${ie(t.sources)}`, 0);
			ce(a, r, r + 86400 - 1, !1, n.calendarId, n.timekeeping), i.push(a);
		}
	}
	return i;
}
//#endregion
//#region src/module/foundry/integrations/is-module-active.ts
function y(e) {
	if (typeof game > "u" || !game) throw Error("Optional module integrations require an initialized Foundry game.");
	return game.modules.get(e)?.active === !0;
}
//#endregion
//#region src/module/foundry/settings/optional-features.ts
var ue = {
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
function de(e) {
	return ue[e].targetModuleIds.every((e) => y(e));
}
//#endregion
//#region src/module/foundry/settings/is-optional-feature-enabled.ts
function b(e) {
	let t = ue[e];
	return de(e) && game?.settings.get("wfrp4e-compatibility-box", t.settingKey) !== !1;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/presentation.ts
function x(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
function fe(e) {
	let t = x, n = e.changes.map(({ label: e, current: n, value: r }) => `<li><strong>${t(e)}</strong><br>Current: <code>${t(JSON.stringify(n))}</code><br>Preset: <code>${t(JSON.stringify(r))}</code></li>`).join(""), r = [
		...e.skipped,
		...e.failed,
		...e.conflicts
	].map(({ id: e, reason: n }) => `<li>${t(e)}: ${t(n)}</li>`).join("");
	return `<p>${e.changes.length} changes; ${e.unchanged.length} already set; ${e.excluded.length} left to the GM's current settings.</p><div class="scrollable" style="max-height:45vh"><details><summary>Review setting changes</summary><ul>${n}</ul></details>${r ? `<p>Resolve these issues before applying:</p><ul>${r}</ul>` : ""}${e.missingTables.length ? `<p>Import these missing rule tables first: ${t(e.missingTables.join(", "))}</p>` : ""}</div>${e.requiresReload ? "<p>A reload is required for these changes.</p>" : ""}`;
}
async function pe(e, t) {
	let n = `${e}: ${t.updated.length} updated, ${t.unchanged.length} already set, ${t.excluded.length} left unchanged by conflict choices.`;
	t.blocked && (n += " Nothing was applied because preflight found unresolved issues.");
	let r = [
		...t.skipped,
		...t.failed,
		...t.conflicts
	];
	r.length && (n += ` ${r.map(({ id: e, reason: t }) => `${e}: ${t}`).join("; ")}.`), t.missingTables.length && (n += ` Missing rule tables: ${t.missingTables.join(", ")}.`), t.failed.length && t.updated.length && (n += " Earlier successful changes remain applied; review before retrying."), t.blocked || t.failed.length ? ui?.notifications?.error(x(n), { permanent: !0 }) : ui?.notifications?.info(x(n)), t.requiresReload && !t.automaticReload && await foundry.applications.settings.SettingsConfig.reloadConfirm({ world: !0 });
}
//#endregion
//#region src/module/foundry/notifications/notify-user.ts
function me(e, t) {
	t === void 0 ? console.error(e) : console.error(e, t);
}
function S(e, t) {
	me(e, t), ui?.notifications?.error(e);
}
//#endregion
//#region src/module/functions/settings-presets/values.ts
function he(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function C(e, t) {
	if (Array.isArray(e) && Array.isArray(t)) return e.length === t.length && e.every((e, n) => C(e, t[n]));
	if (he(e) && he(t)) {
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
function ge(e, t, n) {
	let r = (e) => e === void 0 ? t.worldTime : typeof e == "number" ? e : t.calendar.componentsToTime(e), i = e.prototype.getFullDateText, a = e.prototype.timestamp, o = e.pickDateTime;
	e.prototype.getFullDateText = function(e) {
		return n() ? g(r(e)) : i.call(this, e);
	}, e.prototype.timestamp = function(e) {
		return n() ? g(r(e), !0) : a.call(this, e);
	}, e.pickDateTime = async function(e, i = "timestamp") {
		if (!n()) return o.call(this, e, i);
		let a = m(r(e)), s = (e, t, n, r, i) => `<label>${t}<input type="number" name="${e}" value="${n}" required step="1" ${r === void 0 ? "" : `min="${r}"`} ${i === void 0 ? "" : `max="${i}"`}></label>`, c = d.map((e, t) => `<option value="${t}" ${t === a.month ? "selected" : ""}>${x(e.name)}</option>`).join(""), l = await foundry.applications.api.DialogV2.input({
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
function T(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Calendar configuration is unavailable or invalid.");
	return structuredClone(e);
}
function _e(e) {
	let t = T(e), n = {};
	try {
		n = T(JSON.parse(String(t.customCalendar)));
	} catch {}
	let r = {
		...n,
		...te()
	};
	return {
		...t,
		calendar: "custom",
		customCalendar: C(n, r) ? t.customCalendar : JSON.stringify(r)
	};
}
function ve(e, t, n, r) {
	if (!Array.isArray(e)) throw Error("Simple Calendar configuration is unavailable.");
	if (!e.some((e) => e?.id === t)) throw Error("Choose an active Simple Calendar before applying the Imperial preset.");
	return e.map((e) => {
		let i = T(e);
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
			...T(i.year),
			yearZero: 0,
			firstWeekday: 0
		}, p = {
			...T(i.leapYear),
			rule: "none",
			customMod: 0,
			startingYear: 0
		}, ee = {
			...T(i.time),
			hoursInDay: 24,
			minutesInHour: 60,
			secondsInMinute: 60,
			...r ? { gameTimeRatio: 0 } : {}
		}, h = {
			...T(i.general),
			gameWorldTimeIntegration: r ? "third-party" : "mixed"
		}, g = {
			...i,
			name: "WFRP Imperial Calendar",
			months: s,
			weekdays: l,
			year: u,
			leapYear: p,
			time: ee,
			general: h
		};
		if (!C(g, i)) {
			let e = m(n);
			g.currentDate = {
				year: e.year,
				month: e.month,
				day: e.day,
				seconds: (n % 86400 + 86400) % 86400
			};
		}
		return g;
	});
}
//#endregion
//#region src/module/foundry/integrations/simple-timekeeping/preset.ts
var ye = "simple-timekeeping", be = {
	title: "Simple Timekeeping & Calendar — WFRP Imperial Calendar",
	enabled: () => game?.system.id === "wfrp4e" && b("simpleTimekeeping"),
	additionalSettings: () => [{
		namespace: ye,
		key: "configuration",
		value: _e(game?.settings.get(ye, "configuration"))
	}]
};
//#endregion
//#region src/module/foundry/integrations/simple-timekeeping/register-integration.ts
function xe() {
	if (game?.system.id !== "wfrp4e" || !b("simpleTimekeeping")) return !1;
	let e = game.settings.get(ye, "configuration");
	if (e.calendar !== "custom") return !1;
	try {
		let t = JSON.parse(e.customCalendar ?? ""), n = te();
		return t.id === n.id && [
			"years",
			"months",
			"days"
		].every((e) => C(t[e], n[e]));
	} catch {
		return !1;
	}
}
function Se() {
	if (!y("simple-timekeeping") || !b("simpleTimekeeping") || game?.system.id !== "wfrp4e") return;
	Hooks.once("setup", () => {
		let e = game?.settings.settings?.get(`${ye}.configuration`);
		e && (e.requiresReload = !0);
	});
	let e = /* @__PURE__ */ new WeakSet();
	Hooks.on("initSimpleTimekeeping", (t) => {
		let n = t;
		if (!n?.prototype || typeof n.prototype.getFullDateText != "function" || typeof n.prototype.timestamp != "function" || typeof n.pickDateTime != "function" || !game?.time?.calendar || e.has(n)) return;
		e.add(n);
		let r = xe();
		ge(n, game.time, () => r && xe());
	});
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/content.ts
function Ce(e) {
	if (!game?.ready || !game.user?.isGM || game.system.id !== "wfrp4e") throw Error("A ready WFRP GM session is required to import calendar content.");
	let t = b("simpleCalendar"), n = b("simpleTimekeeping");
	if (!t && !n) throw Error("Enable a supported calendar compatibility feature first.");
	if (e.holidays === !1 && e.history === !1) return { timekeeping: !1 };
	let r;
	if (t) {
		r = String(game.settings.get(_, "active-calendar"));
		let e = game.settings.get(_, "calendar-configuration")?.find((e) => e.id === r);
		if (!e || e.year?.yearZero !== 0 || e.year.firstWeekday !== 0 || e.leapYear?.rule !== "none" || e.time?.hoursInDay !== 24 || e.time.minutesInHour !== 60 || e.time.secondsInMinute !== 60 || e.months?.length !== d.length || e.weekdays?.length !== f.length || !d.every((t, n) => e.months[n]?.name === t.name && e.months[n]?.numberOfDays === t.numberOfDays && e.months[n]?.intercalary === t.intercalary && e.months[n]?.intercalaryInclude === !1 && e.months[n]?.startingWeekday === null) || !f.every((t, n) => e.weekdays[n]?.name === t.name)) throw Error("Apply the Simple Calendar WFRP Imperial preset before importing dated content.");
	}
	if (n && (!xe() || game.time.calendar.componentsToTime({
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
function we(t) {
	return t.flags[e]?.calendarContent?.id;
}
function Te(e) {
	return [...game.journal].find((t) => we(t) === we(e));
}
function Ee(e) {
	return [...game.journal].find((t) => t.id === e._id || t.name.toLocaleLowerCase() === e.name.toLocaleLowerCase());
}
function De(t = {}) {
	let n = Ce(t), r = le(e, t, n, m(game.time.worldTime).year);
	return {
		targets: n,
		drafts: r,
		entries: r.map((e) => ({
			name: e.name,
			status: Te(e) ? "Keep existing content; connect missing calendar support" : Ee(e) ? "Skip: matching name or document ID already exists" : "Create"
		}))
	};
}
var Oe = !1;
async function ke(e = {}, t) {
	if (Oe) throw Error("A calendar content import is already running.");
	let n = De(e);
	if (t && (t.calendarId !== n.targets.calendarId || t.timekeeping !== n.targets.timekeeping)) throw Error("Calendar availability changed after review. Review the content again.");
	Oe = !0;
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
			let a = Ce(e);
			if (a.calendarId !== n.targets.calendarId || a.timekeeping !== n.targets.timekeeping) throw Error("Calendar availability changed during import. Review the remaining content again.");
			let o = Te(t);
			if (o) {
				let e = {}, a = o.pages.contents.find((e) => e.id === t.pages[0]._id), s = o.flags[_]?.noteData, c = a?.flags[ne];
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
						ce(t, e(s.startDate), e(s.endDate, !0), s.repeats === 3, void 0, !0);
					} else if (!s && t.flags["foundryvtt-simple-calendar-reborn"] && c?.eventTime !== void 0) {
						if (!["", "year"].includes(String(c.repeat ?? ""))) throw Error("unsupported repetition");
						let e = Number(c.eventTime);
						ce(t, e, Number(c.eventEnd ?? e), c.repeat === "year", n.targets.calendarId, !1);
					}
				} catch {
					r.skipped.push(`${t.name}: existing date or repetition cannot be connected safely`);
					continue;
				}
				let l = t.flags[_], u = t.pages[0].flags[ne];
				l && !s && (e[`flags.${_}.noteData`] = l.noteData, e["flags.core.sheetClass"] = `${_}.NoteSheet`, e.folder = await i()), Object.keys(e).length && await o.update(e);
				let d = !!u && !!a && a.flags["simple-timekeeping"]?.eventTime === void 0;
				d && await o.updateEmbeddedDocuments("JournalEntryPage", [{
					_id: a.id,
					[`flags.${ne}`]: u
				}]), Object.keys(e).length || d ? r.connected.push(t.name) : r.skipped.push(`${t.name}: existing content preserved`);
				continue;
			}
			if (Ee(t)) {
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
		Oe = !1;
	}
}
//#endregion
//#region src/module/foundry/integrations/imperial-calendar/register-content.ts
async function Ae() {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
	let e = x, t = await foundry.applications.api.DialogV2.wait({
		window: { title: "WFRP Calendar Content" },
		position: { width: 720 },
		content: `<p>Import sourced WFRP observances and Ubersreik history. Holidays are visible to players; the historical almanac and dated historical/scenario events are GM-only. Existing notes, dates and text are preserved. No macros or chat reminders are enabled.</p><table><thead><tr><th>Observance</th><th>Date</th><th>Region</th></tr></thead><tbody>${c.holidays.map((t) => `<tr><td>${e(t.name)}</td><td>${e(ae(t))}</td><td>${e(t.region)}</td></tr>`).join("")}</tbody></table><p><strong>Ubersreik history:</strong> ${c.history.length} sourced entries with year, range and uncertainty labels. Year-only history stays in the reference journal. Eight dated events are included without annual repetition: the provisional deposition date (5 Nachexen 2512 IC) and seven labelled scenario defaults from The Blessings that Drew Blood.</p><p><strong>Middenheim Carnival:</strong> included with holidays on 1–8 Brauzeit, using the older published default. Later books leave its seasonal timing flexible; you can adjust the imported event.</p>`,
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
	}, r = De(n);
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
	let i = await ke(n, r.targets);
	ui?.notifications?.info(`Calendar content: ${i.created.length} created, ${i.connected.length} connected, ${i.skipped.length} preserved or skipped. Reload to refresh the calendars.`);
}
function je() {
	game?.system.id !== "wfrp4e" || !(b("simpleCalendar") || b("simpleTimekeeping")) || Hooks.once("setup", () => game?.settings.registerMenu(e, "calendarContent", {
		name: "WFRP calendar content",
		label: "Import WFRP Calendar Content",
		hint: "Review Imperial and Ubersreik holidays, including Middenheim Carnival, and import the historical almanac.",
		icon: "fa-solid fa-calendar-days",
		restricted: !0,
		type: class extends foundry.applications.api.ApplicationV2 {
			async render() {
				try {
					await Ae();
				} catch (e) {
					S(e instanceof Error ? e.message : String(e), e);
				}
				return this;
			}
		}
	}));
}
//#endregion
//#region src/module/functions/integrations/health-estimate/estimations.ts
var Me = {
	wounds: "Compatibility Box: WFRP Wounds",
	unconscious: "Compatibility Box: WFRP Unconscious",
	dead: "Compatibility Box: WFRP Dead"
};
function Ne(e, t) {
	if (!Array.isArray(e) || !e.length) throw Error("Health Estimate must have a default estimation table before applying its preset.");
	let n = w(e);
	for (let e of n) if (!e || typeof e != "object" || Array.isArray(e) || typeof e.name != "string" || !Array.isArray(e.estimates) || !Array.isArray(e.actorTypes) || !Array.isArray(e.statusEffects)) throw Error("Health Estimate's estimation tables do not match the supported version 36 schema.");
	let r = new Set(Object.values(Me)), [i, ...a] = n.filter((e) => !r.has(e.name));
	if (!i || i.actorTypes.length || i.statusEffects.length) throw Error("Health Estimate's first table must remain its unfiltered default table.");
	let o = [
		"character",
		"npc",
		"creature"
	], s = {
		name: Me.wounds,
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
		c(Me.unconscious, "unconscious", "Unconscious"),
		c(Me.dead, "dead", "Gone to Morr..."),
		...a
	];
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/values.ts
function Pe(e, t) {
	return t instanceof foundry.abstract.DataModel ? t = t.toObject() : e.type instanceof foundry.data.fields.DataField && (t = e.type.toObject(t)), w(t);
}
function Fe(e, t) {
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
var E = "healthEstimate", Ie = "core.estimations", Le = {
	title: "Health Estimate",
	watchSettings: ["wfrp4e.uiaCrits"],
	enabled: () => {
		let e = game?.modules.get(E)?.version;
		return b("healthEstimate") && game?.system.id === "wfrp4e" && !!e && !foundry.utils.isNewerVersion("36.1.0", e);
	},
	additionalSettings: () => {
		let e = game?.settings.settings?.get(`${E}.${Ie}`);
		if (!e) throw Error("Health Estimate's estimation setting is unavailable. Version 36.1.0 or newer is required.");
		let t = Pe(e, game?.settings.get(E, Ie)), n = game?.settings.get("wfrp4e", "uiaCrits") === !0;
		return [...n ? [{
			namespace: E,
			key: "core.NPCsJustDie",
			value: !1
		}] : [], {
			namespace: E,
			key: Ie,
			value: Ne(t, n)
		}];
	}
}, Re = /* @__PURE__ */ new WeakSet();
function ze() {
	if (!Le.enabled?.()) return;
	let e = game && Reflect.get(game, "healthEstimate");
	if (!e || typeof e.isDead != "function" || Re.has(e)) return;
	let t = e.isDead;
	e.isDead = function(e, n) {
		return e.actor && [
			"character",
			"npc",
			"creature"
		].includes(e.actor.type) ? e.actor.statuses.has("dead") : t.call(this, e, n);
	}, Re.add(e);
}
//#endregion
//#region src/module/foundry/integrations/foundryvtt-simple-calendar-reborn/preset.ts
var Be = "foundryvtt-simple-calendar-reborn";
function Ve() {
	let e = game?.settings.get(Be, "calendar-configuration");
	return !Array.isArray(e) || e.length ? e : (globalThis.SimpleCalendar?.api)?.getAllCalendars() ?? e;
}
var He = {
	title: "Simple Calendar Reborn — WFRP Imperial Calendar",
	enabled: () => game?.system.id === "wfrp4e" && b("simpleCalendar"),
	additionalSettings: () => [{
		namespace: Be,
		key: "calendar-configuration",
		value: ve(Ve(), game?.settings.get(Be, "active-calendar"), game.time.worldTime, b("simpleTimekeeping"))
	}]
}, D = "bossbar", O = {
	automatic: "bossBarAutomatic",
	stacked: "bossBarStacked",
	woundsStyle: "bossBarWoundsStyle",
	ignorePrompt: "bossBarIgnoreSetupPrompt"
};
//#endregion
//#region src/module/foundry/integrations/bossbar/preset.ts
function Ue() {
	return game?.settings.get("wfrp4e", "uiaCrits") === !0;
}
var We = {
	title: "Boss Bar",
	watchSettings: ["wfrp4e.uiaCrits"],
	ignoreSetting: O.ignorePrompt,
	enabled: () => b("bossBar"),
	additionalSettings: () => {
		let t = [{
			namespace: e,
			key: O.stacked,
			value: !0
		}];
		if (!Ue()) return t;
		let n = game?.settings.get(D, "barStyles"), r = n.find((e) => e.id === "segmented");
		return r && n[0] !== r && t.push({
			namespace: D,
			key: "barStyles",
			value: [r, ...n.filter((e) => e !== r)]
		}), t;
	}
}, Ge = "#a51414d8", Ke = "#7e1717dc", qe = "#b31f18d8", Je = "#b01832d8", Ye = "#861a24d8", Xe = "#541e1ed8", k = "#6a0e0ed8", A = "#6f3518e0", j = "#621010e0", Ze = "#771616dc", M = "#440707d8", Qe = "#14101490", N = "#0b080de8", $e = [
	["Jabberslythe", "#78d61be8"],
	["Chameleon Skink", k],
	["Kroxigor", k],
	["Saurus", k],
	["Suarus", k],
	["Skink", k],
	["Slann", k],
	["Reptile", k],
	["Ogre Gorger", Xe],
	["Gorger", Xe],
	["Orca", Ge],
	["Bloodletter", N],
	["Chaos Fury", N],
	["Blue Horror", N],
	["Pink Horror", N],
	["Nurgling", N],
	["Greater Daemon", N],
	["Daemon Prince", N],
	["Lesser Demon", N],
	["Daemon", N],
	["Demon", N],
	["Rat Ogre", Ze],
	["Wolf Rat", Ze],
	["Skaven", Ze],
	["Bray Shaman", j],
	["Beastman", j],
	["Beastmen", j],
	["Bestigor", j],
	["Minotaur", j],
	["Pestigor", j],
	["Razorgor", j],
	["Ungor", j],
	["Gor", j],
	["Greenskin", A],
	["Forest Goblin", A],
	["Night Goblin", A],
	["Hobgoblin", A],
	["Goblin", A],
	["Black Orc", A],
	["Orc", A],
	["Snotling", A],
	["Squig", A],
	["Skeleton", Qe],
	["Ghost", Qe],
	["Tomb Banshee", Qe],
	["Banshee", Qe],
	["Undead", M],
	["Vampire", M],
	["Ghoul", M],
	["Wight", M],
	["Liche", M],
	["Maurngul", M],
	["Mourngul", M],
	["Human", Ge],
	["Dwarf", Ke],
	["Halfling", qe],
	["High Elf", Je],
	["helf", Je],
	["Wood Elf", Ye],
	["welf", Ye],
	["Ogre", Xe]
];
function et() {
	let e = {};
	for (let [t, n] of $e) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function tt(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function nt(e = {}) {
	let t = et();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? Ge;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function rt(e, t = {}) {
	let n = tt(e);
	for (let [e, r] of Object.entries(nt(t))) n[e] ??= r;
	return n;
}
//#endregion
//#region src/module/foundry/integrations/splatter/constants.ts
var P = "splatter", it = "BloodSheetData", at = {
	title: "Splatter",
	ignoreSetting: "splatterIgnoreSetupPrompt",
	menuKey: "configureSplatter",
	additionalSettings: () => [{
		namespace: P,
		key: it,
		value: rt(game?.settings.get(P, it), game?.wfrp4e?.config.species ?? {})
	}]
}, ot = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
}, st = {}, ct = { "core.deathStateName": "Gone to Morr..." }, lt = {}, ut = {
	creatureType: "details.species.value",
	creatureTypeCustom: "",
	currentHp: "status.wounds.value",
	maxHp: "status.wounds.max",
	useWounds: !1,
	useBloodsheet: !0
}, dt = {
	bossbar: { description: "Use WFRP Wounds paths and the compatible stacked-bar configuration." },
	splatter: { description: "Use WFRP Wounds and species for blood effects while preserving custom colors." },
	healthEstimate: { description: "Use WFRP Wounds labels: Unconscious at zero under core rules, Mortal Peril! under Up in Arms, Bloodied at 50%, and Gone to Morr... for the Dead condition. Preserve custom and vehicle tables. Recommend disabling NPCs Just Die only under Up in Arms; leave it alone under core." },
	"simple-timekeeping": { description: "Install the standard 400-day Imperial calendar. Keeps world time, events, macros, weather and display preferences. Reload after applying. Pause running clocks during setup and apply the Simple Calendar preset too if using both." },
	"foundryvtt-simple-calendar-reborn": { description: "Replace the active calendar with the standard 400-day Imperial calendar at the current Foundry world timestamp. Existing dates may display differently; timestamps and notes are not migrated. Keeps other calendars and note categories. With ST&C enabled, its clock controls advance time and Simple Calendar follows Foundry time in third-party mode with automatic clock speed zero; use ST&C to change dates and advance time. Pause running clocks during setup." }
};
//#endregion
//#region src/module/functions/settings-presets/sources.ts
function ft(e) {
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
function pt(e, t) {
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
var mt = ft(/* #__PURE__ */ Object.assign({
	"/src/settings/bossbar.json": ot,
	"/src/settings/foundryvtt-simple-calendar-reborn.json": st,
	"/src/settings/healthEstimate.json": ct,
	"/src/settings/simple-timekeeping.json": lt,
	"/src/settings/splatter.json": ut
})), ht = pt(Object.values([dt])[0] ?? {}, Object.keys(mt)), gt = {
	"foundryvtt-simple-calendar-reborn": He,
	"simple-timekeeping": be,
	bossbar: We,
	healthEstimate: Le,
	splatter: at
};
function _t(e) {
	if (!Object.hasOwn(mt, e)) throw Error(`No settings preset exists for ${e}.`);
	return {
		namespace: e,
		values: mt[e],
		...gt[e],
		...ht[e]
	};
}
function vt() {
	return Object.keys(mt).sort().map(_t);
}
//#endregion
//#region src/module/functions/settings-presets/wfrp.ts
function yt(e, t) {
	return t === "wfrp4e" ? [...e].sort((e, t) => Number(F(e)) - Number(F(t))) : [...e];
}
function F({ namespace: e, key: t }) {
	return e === "wfrp4e" && t === "useGroupAdvantage";
}
function bt({ namespace: e, key: t }) {
	return e === "wfrp4e" && ["homebrew", "customCursor"].includes(t) || e === "wfrp4e-rnhd" && ["showClock", "syncClock"].includes(t);
}
function xt({ namespace: e, key: t, value: n }) {
	return e !== "wfrp4e" || t !== "tableSettings" || !n || typeof n != "object" ? [] : [...new Set(Object.values(n).flatMap((e) => String(e).split(",").filter(Boolean)))];
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/coordination.ts
function St() {
	let e = [...game?.modules.values() ?? []].filter((e) => e.active).map((e) => e.api?.settingsPresetCoordinator).filter((e) => e?.version === 1);
	if (e.length > 1) throw Error("Multiple settings coordinators are active; disable the duplicate before applying presets.");
	return e[0];
}
function Ct(e, t) {
	return St()?.plan(e, t) ?? {
		entries: t,
		excluded: [],
		conflicts: []
	};
}
async function wt(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
	return await St()?.resolve(e, t) ?? !0;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/engine.ts
function I(e) {
	return e === "core" || e === game?.system.id || game?.modules.get(e)?.active === !0;
}
function Tt(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to inspect settings presets.");
	let n = Ct(e, t), r = {
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
		if (!I(e.namespace) || !n || n.scope !== "world") {
			r.skipped.push({
				id: t,
				reason: "World setting is unavailable or its namespace is not active"
			});
			continue;
		}
		try {
			Fe(n, e.value), game.system.id === "wfrp4e" && r.missingTables.push(...xt(e).filter((e) => !(game?.collections?.get("RollTable"))?.get(e)));
			let i = Pe(n, game.settings.get(e.namespace, e.key));
			if (C(i, e.value)) {
				r.unchanged.push(t);
				continue;
			}
			r.changes.push({
				...e,
				current: i,
				label: n.name ? game.i18n.localize(n.name) : t
			}), r.requiresReload ||= !!n.requiresReload || game.system.id === "wfrp4e" && (bt(e) || F(e)), r.automaticReload ||= game.system.id === "wfrp4e" && F(e);
		} catch (e) {
			r.failed.push({
				id: t,
				reason: e instanceof Error ? e.message : String(e)
			});
		}
	}
	return r.missingTables = [...new Set(r.missingTables)], r;
}
var Et = !1;
async function Dt(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (Et) throw Error("A settings preset is already being applied.");
	Et = !0;
	try {
		let n = Tt(e, t), r = {
			...n,
			updated: [],
			blocked: !!(n.failed.length || n.skipped.length || n.conflicts.length || n.missingTables.length),
			requiresReload: !1,
			automaticReload: !1
		};
		if (r.blocked) return r;
		for (let i of yt(n.changes, game.system.id)) {
			let n = `${i.namespace}.${i.key}`;
			try {
				if (!game.user?.isGM || !I(i.namespace)) throw Error("Preset permissions or availability changed.");
				let a = Ct(e, t), o = a.entries.find((e) => e.namespace === i.namespace && e.key === i.key);
				if (a.conflicts.length || !o || !C(o.value, i.value)) throw Error("Preset choices changed; review the remaining settings again.");
				let s = game.settings.settings?.get(n);
				if (!s || s.scope !== "world") throw Error("World setting is unavailable.");
				if (Fe(s, i.value), await game.settings.set(i.namespace, i.key, structuredClone(i.value)), r.requiresReload ||= !!s.requiresReload || game.system.id === "wfrp4e" && (bt(i) || F(i)), r.automaticReload ||= game.system.id === "wfrp4e" && F(i), !C(Pe(s, game.settings.get(i.namespace, i.key)), i.value)) throw Error("Foundry did not retain the complete preset value.");
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
		Et = !1;
	}
}
//#endregion
//#region src/module/foundry/settings/presets/engine.ts
function L(e) {
	return I(e.namespace) && (e.enabled?.() ?? !0);
}
function R(e) {
	if (!L(e)) throw Error("Preset is not active.");
	return [...Object.entries(e.values).map(([t, n]) => ({
		namespace: e.namespace,
		key: t,
		value: n
	})), ...e.additionalSettings?.() ?? []];
}
async function Ot(t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (!L(t)) throw Error("Preset is not active.");
	let n = await Dt(e, R(t));
	if (n.blocked || n.failed.length) throw Error(`${n.updated.length} settings updated. ${[
		...n.skipped,
		...n.failed,
		...n.conflicts
	].map((e) => `${e.id}: ${e.reason}`).join("; ")}${n.missingTables.length ? ` Missing rule tables: ${n.missingTables.join(", ")}` : ""}`);
	return n;
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/review.ts
var kt = Promise.resolve(), At = /* @__PURE__ */ new Map();
function jt(e) {
	let t = `${e.owner}:${e.ignoreKey ?? e.title}`;
	if (e.startup && At.has(t)) return At.get(t);
	let n = kt.then(() => Mt(e)).finally(() => {
		e.startup && At.delete(t);
	});
	return e.startup && At.set(t, n), kt = n.catch(() => {}), n;
}
async function Mt(e) {
	if (!game?.ready || !game.user?.isGM || e.startup && game.users?.activeGM && game.users.activeGM.id !== game.user.id || e.startup && e.ignoreKey && game.settings.get(e.owner, e.ignoreKey) === !0 || !await wt(e.owner, e.entries())) return null;
	let t = Tt(e.owner, e.entries());
	if (e.startup && !t.changes.length && !t.skipped.length && !t.failed.length && !t.conflicts.length && !t.missingTables.length) return null;
	let n = !!(t.skipped.length || t.failed.length || t.conflicts.length || t.missingTables.length), r = await foundry.applications.api.DialogV2.wait({
		window: { title: e.title },
		position: { width: 650 },
		content: `${e.description ? `<p>${x(e.description)}</p>` : ""}${fe(t)}`,
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
	if (!C(Tt(e.owner, e.entries()), t)) throw Error("Settings or preset choices changed during review; reopen the action before applying.");
	let i = await Dt(e.owner, e.entries());
	return await pe(e.title, i), i;
}
//#endregion
//#region src/module/foundry/settings/presets/interface.ts
function Nt(e) {
	return e.title ?? game?.modules.get(e.namespace)?.title ?? e.namespace;
}
function Pt(e) {
	return e.ignoreSetting ?? `ignoreSettingsPreset-${e.namespace}`;
}
function Ft(e) {
	S(x(`Settings preset could not be completed: ${e instanceof Error ? e.message : String(e)}`), e);
}
async function It(t) {
	if (!L(t)) throw Error("Preset is not active.");
	await jt({
		owner: e,
		title: Nt(t),
		entries: () => R(t),
		...t.description ? { description: t.description } : {}
	});
}
async function Lt(t, n = !1) {
	!L(t) || game?.system.id !== "wfrp4e" || t.promptOnStartup === !1 && !n || await jt({
		owner: e,
		title: Nt(t),
		entries: () => R(t),
		startup: !0,
		ignoreKey: Pt(t),
		...t.description ? { description: t.description } : {}
	});
}
//#endregion
//#region src/module/foundry/settings/preset-runtime/export.ts
function Rt(e, t, n = !1) {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	if (!I(e)) throw Error("The selected system or module is not active.");
	if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(e)) throw Error("Invalid settings namespace.");
	if (!t.length) throw Error("Select at least one setting to export.");
	let r = Object.fromEntries([...new Set(t)].map((t) => {
		let r = game?.settings.settings?.get(`${e}.${t}`);
		if (!r || r.scope !== "world" || !r.config && !n) throw Error(`${e}.${t} is not an available selected world setting.`);
		try {
			return [t, Pe(r, game?.settings.get(e, t))];
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
function zt(e, t) {
	return [...game?.settings.settings?.values() ?? []].filter((n) => n.namespace === e && n.scope === "world" && (n.config || t)).sort((e, t) => e.key.localeCompare(t.key));
}
function Bt(e, t) {
	let n = foundry.utils.escapeHTML, r = game?.i18n.localize(e.name || e.key) ?? e.key, i, a = !1;
	try {
		let t = Pe(e, game?.settings.get(e.namespace, e.key)), n = JSON.stringify(t);
		i = n.length > 160 ? `${n.slice(0, 160)}…` : n;
	} catch (e) {
		a = !0, i = `Cannot export: ${e instanceof Error ? e.message : String(e)}`;
	}
	return `<div class="form-group"><label>
    <input type="checkbox" name="setting-${t}" ${a ? "disabled" : ""}>
    ${n(r)}${e.config ? "" : " (hidden)"}
    </label><p class="hint"><code>${n(`${e.namespace}.${e.key}`)}</code><br>${n(i)}</p></div>`;
}
async function Vt(e = "src/settings/") {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	let t = [...new Set([...game.settings.settings?.values() ?? []].filter((e) => e.scope === "world" && I(e.namespace)).map((e) => e.namespace))].sort();
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
	let a = r.includeHidden === !0, o = zt(i, a);
	if (!o.length) return ui?.notifications?.info("This namespace has no settings matching that selection."), null;
	let s = await foundry.applications.api.DialogV2.input({
		window: { title: `Export ${i} Settings` },
		content: `<p>Select the preferences to include in <strong>${n(i)}.json</strong>.</p>
      <div class="scrollable" style="max-height: 50vh">${o.map(Bt).join("")}</div>
      <p class="hint">Save the downloaded file in <code>${n(e)}</code>, then rebuild the module to add its import button.</p>`,
		ok: { label: "Download JSON" },
		rejectClose: !1
	});
	if (!s) return null;
	let c = o.filter((e, t) => s[`setting-${t}`] === !0).map(({ key: e }) => e);
	if (!c.length) return ui?.notifications?.info("No settings selected; nothing was exported."), null;
	let l = Rt(i, c, a);
	return foundry.utils.saveDataToFile(`${JSON.stringify(l.values, null, 2)}\n`, "application/json", l.filename), ui?.notifications?.info(`Exported ${c.length} settings to ${n(l.filename)}.`), l;
}
//#endregion
//#region src/module/foundry/settings/presets/api.ts
function Ht(e) {
	let t = e === void 0 ? vt().filter(L) : [_t(e)];
	if (t.some((e) => !L(e))) throw Error("Preset is not active.");
	return t.flatMap(R);
}
var Ut = {
	version: 1,
	getPresets: () => vt().filter(L).map((e) => ({
		namespace: e.namespace,
		title: Nt(e),
		entries: R(e)
	})),
	inspect: (t) => Tt(e, Ht(t)),
	apply: async (t) => Dt(e, Ht(t)),
	resolve: async (t) => wt(e, Ht(t)),
	capture: Rt
};
//#endregion
//#region src/module/functions/settings-presets/conflicts.ts
function Wt(e) {
	return Array.isArray(e) ? e.map(Wt) : e && typeof e == "object" ? Object.fromEntries(Object.keys(e).sort().map((t) => [t, Wt(e[t])])) : e;
}
function Gt(e) {
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
	return [...t.values()].filter((e) => e.candidates.some((t) => !C(t.value, e.candidates[0].value))).map((e) => (e.candidates.sort((e, t) => e.source.localeCompare(t.source)), e.signature = JSON.stringify(e.candidates.map(({ source: e, value: t }) => [e, Wt(t)])), e)).sort((e, t) => e.id.localeCompare(t.id));
}
function Kt(e, t, n) {
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
function qt(e, t) {
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
	return Gt(n).filter((e) => r.has(e.id));
}
//#endregion
//#region src/module/foundry/settings/conflicts/coordinator.ts
var Jt = "settingsPresetConflictChoices";
function Yt() {
	return game?.settings.get("wfrp4e-compatibility-box", "settingsPresetConflictChoices") ?? {};
}
var Xt = Promise.resolve(), Zt = {
	version: 1,
	inspect: qt,
	decide: $t,
	async reset() {
		if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
		await game.settings.set(e, Jt, {});
	},
	plan(e, t) {
		return Kt(t, qt(e, t), Yt());
	},
	resolve(e, t) {
		let n = Xt.then(() => Qt(e, t));
		return Xt = n.catch(() => {}), n;
	}
};
async function Qt(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to resolve preset conflicts.");
	let n = qt(e, t), r = new Set(Zt.plan(e, t).conflicts.map((e) => e.id)), i = {};
	for (let e of n.filter((e) => r.has(e.id))) {
		let t = x, n = await foundry.applications.api.DialogV2.input({
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
	return await $t(e, t, i), !0;
}
async function $t(t, n, r) {
	if (!game?.ready || !game.user?.isGM) throw Error("GM permission changed.");
	if (!Object.keys(r).length) return;
	let i = qt(t, n);
	for (let [e, t] of Object.entries(r)) {
		let n = i.find((t) => t.id === e);
		if (!n || n.signature !== t.signature) throw Error("Competing presets changed during review; reopen the action.");
		if (t.source !== null && !n.candidates.some((e) => e.source === t.source)) throw Error("Choose a listed settings source.");
	}
	await game.settings.set(e, Jt, {
		...Yt(),
		...r
	});
}
//#endregion
//#region src/types/patches/paper-doll/Equipment.ts
var en = [
	"HEAD",
	"BODY",
	"GLOVES",
	"BOOTS"
], tn = ["MAIN_LEFT", "MAIN_RIGHT"], nn = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
], rn = {
	BODY: ["body"],
	BOOTS: ["lLeg", "rLeg"],
	GLOVES: ["lArm", "rArm"],
	HEAD: ["head"]
};
function an(e, t) {
	return t.coverage - e.coverage || t.points - e.points || e.item.name.localeCompare(t.item.name) || e.item.id.localeCompare(t.item.id);
}
function on(e, t) {
	return Math.max(...rn[t].map((t) => e.armourPoints[t]));
}
function sn(e, t) {
	return rn[t].filter((t) => e.armourPoints[t] > 0).length;
}
function cn(e, t, n) {
	return on(n.item, e) - on(t.item, e) || sn(n.item, e) - sn(t.item, e) || an(t, n);
}
function ln(e) {
	return e.type === "armour" && e.equipped;
}
function un(e) {
	let t = e.armourPoints, n = nn.filter((e) => t[e] > 0);
	return {
		coverage: n.length,
		item: e,
		points: n.reduce((e, n) => e + t[n], 0)
	};
}
function dn(e) {
	let t = e.filter(ln).map(un);
	return en.flatMap((e) => {
		let n = t.filter((t) => on(t.item, e) > 0).sort((t, n) => cn(e, t, n))[0];
		return n ? [{
			slotId: e,
			uuid: n.item.uuid
		}] : [];
	});
}
function fn(e, t) {
	return e.twoHanded ? "both" : e.offhand ? t === "l" ? "r" : "l" : t;
}
function pn(e, t) {
	return Number(t.twoHanded) - Number(e.twoHanded) || e.name.localeCompare(t.name) || e.id.localeCompare(t.id);
}
function mn(e, t) {
	let n = e.filter((e) => e.type === "weapon" && e.equipped).sort(pn);
	return tn.flatMap((e) => {
		let r = e === "MAIN_LEFT" ? "l" : "r", i = n.find((e) => {
			let n = fn(e, t);
			return n === "both" || n === r;
		});
		return i ? [{
			slotId: e,
			uuid: i.uuid
		}] : [];
	});
}
function hn(e, t) {
	return [...dn(e), ...mn(e, t)];
}
//#endregion
//#region src/module/functions/patches/paper-doll/derive-paper-doll-slot-state.ts
function gn(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function _n(e, t, n, r) {
	let i = gn(e), a = new Map(t.map((e) => [e.slotId, e.uuid]));
	for (let e of [...en, ...tn]) {
		if (!r.has(e)) continue;
		let t = i[e]?.["0"] ?? null, o = a.get(e) ?? null;
		o ? (i[e] ??= {}, i[e][0] = o) : t && n.has(t) && (i[e] ??= {}, i[e][0] = null);
	}
	return i;
}
function vn(e, t, n) {
	let r = new Map(t.map((e) => [e.uuid, e])), i = gn(e);
	for (let e of Object.values(i)) for (let [t, i] of Object.entries(e)) !i || n.has(i) || r.get(i)?.equipped === !1 && (e[t] = null);
	return i;
}
function yn(e, t, n, r, i) {
	return vn(_n(e, t, n, r), i, n);
}
function bn(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-paper-doll-slot-state.ts
function xn(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Sn(e) {
	return /^(0|[1-9]\d*)$/.test(e);
}
function Cn(e) {
	return e == null || typeof e == "string" && e.length > 0;
}
function z(e) {
	return xn(e) && Object.entries(e).every(([e, t]) => e.length > 0 && xn(t) && Object.entries(t).every(([e, t]) => Sn(e) && Cn(t)));
}
//#endregion
//#region src/module/functions/patches/paper-doll/equipment-update.ts
function wn(e) {
	return e.slotId === "MAIN_LEFT" ? "l" : e.slotId === "MAIN_RIGHT" ? "r" : null;
}
function Tn(e, t, n, r) {
	if (t === null) return {};
	let i = {};
	if (t || (i["system.equipped.value"] = !0), e?.type !== "weapon") return i;
	if (!r) throw Error(`Weapon ${e.uuid} requires the actor's main hand.`);
	let a = wn(n), o = e.twoHanded ? !1 : a ? a !== r : void 0;
	return o !== void 0 && e.offhand !== o && (i["system.offhand.value"] = o), i;
}
function En(e) {
	return e === !0 ? { "system.equipped.value": !1 } : {};
}
//#endregion
//#region src/module/functions/patches/paper-doll/is-item-allowed-in-slot.ts
function Dn(e, t) {
	switch (t) {
		case "HEAD": return e.armourPoints.head > 0;
		case "BODY": return e.armourPoints.body > 0;
		case "GLOVES": return e.armourPoints.lArm > 0 || e.armourPoints.rArm > 0;
		case "BOOTS": return e.armourPoints.lLeg > 0 || e.armourPoints.rLeg > 0;
		default: return !1;
	}
}
function On(e, t, n) {
	return n === "MAIN_LEFT" || n === "MAIN_RIGHT" ? t?.type === "weapon" : n === "HEAD" || n === "BODY" || n === "GLOVES" || n === "BOOTS" ? t?.type === "armour" && Dn(t, n) : e !== "weapon" && e !== "armour";
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-runtime-types.ts
var kn = new Set([
	"character",
	"npc",
	"creature"
]);
function B(e) {
	return typeof e == "object" && !!e;
}
function V(e) {
	return B(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function H(e) {
	return V(e) && kn.has(e.type);
}
function An(e) {
	return B(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/wfrp-equipment.ts
var jn = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function Mn(e) {
	if (!B(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function Nn(e, t) {
	let n = Mn(e)[t];
	if (n === void 0) return null;
	if (!B(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function Pn(e, t) {
	let n = Nn(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function Fn(e) {
	return Nn(e, "equipped");
}
function In(e) {
	return Fn(e) !== null;
}
function Ln(e) {
	let t = Mn(e).AP;
	if (!B(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(jn.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function Rn(e) {
	if (!B(e.system) || !B(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function zn(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: Pn(e, "equipped"),
		id: e.id,
		name: e.name,
		uuid: e.uuid
	};
	return e.type === "armour" ? {
		...t,
		armourPoints: Ln(e),
		type: "armour"
	} : {
		...t,
		offhand: Pn(e, "offhand"),
		twoHanded: Pn(e, "twohanded"),
		type: "weapon"
	};
}
function Bn(e, t) {
	return On(e.type, zn(e), t);
}
async function Vn(e, t, n) {
	let r = zn(t), i = Tn(r, r?.equipped ?? Fn(t), n, r?.type === "weapon" ? Rn(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function Hn(e) {
	let t = En(zn(e)?.equipped ?? Fn(e));
	Object.keys(t).length && await e.update(t);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/report-paper-doll-error.ts
function Un(e) {
	return e instanceof Error ? e.message : String(e);
}
function Wn(e, n) {
	S(`${t}: ${e}. ${Un(n)}`, n);
}
function Gn(e, t) {
	e.catch((e) => Wn(t, e));
}
//#endregion
//#region src/module/foundry/patches/paper-doll/synchronize-paper-doll.ts
var Kn = "fvtt-paper-doll-ui", qn = "slots", Jn = /* @__PURE__ */ new Map(), Yn = /* @__PURE__ */ new Set();
function Xn(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Zn(e) {
	let t = e.getFlag(Kn, qn);
	if (t === void 0) return {};
	if (!z(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Xn(t);
}
function Qn() {
	let e = game?.settings.get(Kn, "globalConfig"), t = new Set([...en, ...tn]);
	if (B(e) && Object.keys(e).length === 0) return t;
	if (!B(e) || !B(e.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let n = Object.values(e.SLOTS);
	if (!n.every(B)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let r = new Set(n.flatMap((e) => Object.keys(e)));
	return r.size ? r : t;
}
function $n(e) {
	return Jn.has(e.uuid);
}
function er(e) {
	if (!V(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function tr(e) {
	if (!e || e.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function nr(e) {
	let t = Zn(e), n = Array.from(e.items), r = n.map(zn).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: Fn(e),
		uuid: e.uuid
	})), o = yn(t, hn(r, Rn(e)), i, Qn(), a);
	return bn(t, o) ? "unchanged" : (await e.setFlag(Kn, qn, o), "synchronized");
}
async function U(e) {
	er(e), tr(game);
	let t = e;
	if (!H(t) || !t.isOwner || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !b("paperDoll")) return "unavailable";
	let n = Jn.get(t.uuid);
	if (n) return await n, U(t);
	let r = nr(t).finally(() => {
		Jn.get(t.uuid) === r && Jn.delete(t.uuid);
	});
	return Jn.set(t.uuid, r), r;
}
function rr(e) {
	!H(e) || !e.isOwner || Yn.has(e.uuid) || (Yn.add(e.uuid), queueMicrotask(() => {
		Yn.delete(e.uuid), Gn(U(e), `could not synchronize equipped items for ${e.uuid}`);
	}));
}
async function ir() {
	return tr(game), Promise.all(Array.from(game.actors).filter(H).map(U));
}
//#endregion
//#region src/module/foundry/settings/get-optional-feature-statuses.ts
function ar() {
	return Object.entries(ue).map(([e, t]) => ({
		available: de(e),
		enabled: b(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
//#endregion
//#region src/module/functions/integrations/paper-doll-argon/bridge.ts
var or = ["TRINKET", "WRIST_RIGHT"];
function sr(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function cr(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of or) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(sr)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function lr(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function ur({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function dr(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/constants.ts
var fr = "enhancedcombathud", pr = e, mr = "enhancedcombathud-wfrp4e", hr = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", gr = "modules/enhancedcombathud/icons", _r = [
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
], vr = [{
	key: "ws",
	icon: `${gr}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${gr}/bolt-spell-cast.webp`
}], yr = [
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
async function br() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
//#endregion
//#region src/module/functions/patches/paper-doll/find-slot-changes.ts
function xr(e, t, n) {
	return e[t]?.[n] ?? null;
}
function Sr(e, t) {
	let n = new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = xr(e, i, a), o = xr(t, i, a);
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
var Cr = Symbol.for("paper-doll-wfrp4e.equipped-state");
function wr() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function Tr(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function Er(e) {
	if (!B(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function Dr() {
	return Promise.resolve();
}
function Or() {
	let e = wr(), t = e?.equip, n = globalThis.fromUuid;
	if (Tr(e, t, n), !n) throw Error("Foundry UUID resolution is unavailable.");
	if (e[Cr] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!An(a) || V(this.actor) && !H(this.actor)) return r.call(this, e, t, i);
		let o = Er(i);
		if (!t) return Dr();
		if (!H(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!Bn(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await Vn(this.actor, a, o);
		} catch (e) {
			Wn(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await U(this.actor);
			} catch (e) {
				Wn(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[Cr] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/enforce-paper-doll-slot-types.ts
var kr = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function Ar() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function jr(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function Mr() {
	let e = Ar(), t = e?.filterItems;
	if (jr(e, t), e[kr] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => An(e) && Bn(e, t));
	}, e[kr] = !0;
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-slot-tooltips.ts
var Nr = ".paper-doll .paper-doll-slot", Pr = `data-${e}-drag-tooltip`, Fr = `data-${e}-tooltip`, Ir = `data-${e}-original-tooltip`, Lr = {
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
}, Rr = !1;
function zr(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(Nr);
	return t?.closest(".paper-doll") ? t : null;
}
function Br() {
	document.querySelectorAll(`[${Fr}]`).forEach((e) => {
		let t = e.getAttribute(Ir);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(Fr), e.removeAttribute(Ir);
	});
}
function Vr() {
	document.querySelectorAll(Nr).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(Pr, t), e.removeAttribute("data-tooltip"));
	});
}
function Hr() {
	document.querySelectorAll(`[${Pr}]`).forEach((e) => {
		let t = e.getAttribute(Pr);
		t && (e.dataset.tooltip = t), e.removeAttribute(Pr);
	});
}
function Ur(e) {
	if (Rr || e.hasAttribute(Fr)) return;
	let t = Lr[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(Ir, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(Fr, "");
}
function Wr(e) {
	let t = zr(e.target);
	t && Ur(t);
}
function Gr() {
	Rr = !0, Br(), Vr();
}
function Kr() {
	Rr = !1, Hr();
}
function qr() {
	document.addEventListener("pointerover", Wr, !0), document.addEventListener("dragstart", Gr, !0), document.addEventListener("dragend", Kr, !0);
}
//#endregion
//#region src/module/foundry/patches/paper-doll/register-paper-doll-hooks.ts
var Jr = /* @__PURE__ */ new Map();
function Yr() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && b("paperDoll");
}
function Xr(e) {
	if (!B(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!B(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[Kn];
	return B(n) ? "slots" in n ? z(n.slots) ? {
		kind: "valid",
		state: n[qn]
	} : {
		kind: "malformed",
		reason: "the Paper Doll slots update has an invalid shape"
	} : { kind: "absent" } : {
		kind: "malformed",
		reason: "the Paper Doll flag update is not an object"
	};
}
function Zr(e) {
	let t = Xr(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function Qr(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function $r(e, t) {
	let n = Jr.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), Jr.set(e.uuid, n);
}
function ei(e) {
	if (!B(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function ti(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (Wn(n, AggregateError(r, n)), await U(e));
}
function ni(e, t, n) {
	if (!Yr() || !H(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!B(i) || typeof i.item != "string") continue;
		let t = ei(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = Qr(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!Bn(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(Vn(e, n, t));
	}
	r.length && Gn(ti(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function ri(e, t) {
	if (!Yr() || !H(e) || $n(e)) return;
	let n = Zr(t);
	if (!n) return;
	let r = e.getFlag(Kn, qn);
	if (r !== void 0) {
		if (!z(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of Sr(r, n)) {
			if (!t.from) continue;
			let n = Qr(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			(!t.to || n.type !== "armour") && $r(e, n.uuid);
		}
	}
}
function ii(e, t) {
	if (!Yr() || !H(e) || !Zr(t)) return;
	let n = Jr.get(e.uuid);
	Jr.delete(e.uuid), n?.size && Gn(ti(e, Array.from(n, (t) => {
		let n = Qr(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(Hn), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function ai(e) {
	!Yr() || !An(e) || e.type !== "armour" && e.type !== "weapon" && !In(e) || H(e.parent) && rr(e.parent);
}
function oi() {
	qr(), Hooks.on("paper-doll-swap", ni), Hooks.on("preUpdateActor", ri), Hooks.on("updateActor", ii), Hooks.on("updateItem", ai), Hooks.once("ready", () => {
		if (Yr()) {
			try {
				Mr(), Or();
			} catch (e) {
				throw Wn("could not initialize the required Paper Doll integration", e), e;
			}
			Gn(ir(), "could not synchronize all equipped items at startup");
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/fvtt-paper-doll-ui/register-integration.ts
var si = "fvtt-paper-doll-ui";
function ci() {
	y("fvtt-paper-doll-ui") && b("paperDoll") && oi();
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/bridge-runtime.ts
var li = "activeWeaponSet", di = "slots", fi = "weaponSets";
function pi(e) {
	let t = e.getFlag(si, di);
	if (t === void 0) return {};
	if (!z(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function mi(e) {
	let t = e.getFlag(fr, li);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function hi(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function gi(e) {
	let t = e.getFlag(fr, fi);
	if (t === void 0) return {};
	if (!B(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !B(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: hi(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: hi(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function _i(e, t) {
	let n = gi(e), r = ur({
		activeSetId: mi(e),
		mainHand: Rn(e),
		mainSlots: lr(t),
		weaponSets: n
	}), i = !dr(n, r);
	return i && await e.setFlag(fr, fi, r), await br(), i ? "synchronized" : "unchanged";
}
function vi(e) {
	if (!V(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return cr(pi(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function yi(e) {
	if (!B(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!B(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[si];
	if (!B(n) || !(di in n)) return null;
	let r = n[di];
	if (!z(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function bi(e) {
	if (!V(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return H(e) ? e.isOwner ? !b("paperDoll") || !b("argonCombatHud") || !b("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", di) === void 0 ? (await br(), "unchanged") : _i(e, pi(e)) : (await br(), "unavailable") : "unavailable";
}
//#endregion
//#region src/module/foundry/integrations/splatter/configure-splatter.ts
async function xi() {
	let e = _t(P);
	return await Ot(e), {
		automaticBloodColors: game?.settings.get(P, "useBloodsheet") === !0,
		bloodColorCount: Object.keys(game?.settings.get(P, it)).length,
		speciesPath: e.values.creatureType
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/configuration.ts
function Si(e) {
	return game?.i18n.localize(`wfrp4e-compatibility-box.BossBar.${e}`) ?? e;
}
function Ci(t) {
	console.error(`${e} | Boss Bar integration failed.`, t), ui?.notifications?.error(Si("Error"));
}
function wi() {
	return {
		currentHpPath: game?.settings.get(D, "currentHpPath"),
		maxHpPath: game?.settings.get(D, "maxHpPath"),
		woundsSystem: game?.settings.get(D, "woundsSystem")
	};
}
async function Ti() {
	return await Ot(_t(D)), ui?.notifications?.info(Si("Configured")), wi();
}
//#endregion
//#region src/module/wfrp/folders/queue.ts
var Ei = /* @__PURE__ */ new WeakMap();
async function Di(e, t) {
	let n = (Ei.get(e) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		let e = globalThis.navigator?.locks;
		e ? await e.request("foundry:folder-tidy", t) : await t();
	});
	Ei.set(e, n);
	try {
		await n;
	} finally {
		Ei.get(e) === n && Ei.delete(e);
	}
}
//#endregion
//#region src/module/wfrp/folders/merge.ts
async function Oi(e, t, n, r) {
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
function ki(e, t) {
	return e.startsWith("wfrp4e-") && [...t].some((e) => /cubicle\s*7/i.test(e.name));
}
function Ai(e, t, n) {
	let r = e["warhammer-lib"], i = e.core, a = [
		r?.source,
		e.source,
		t?.startsWith("Compendium.") ? t.split(".")[1] : void 0,
		i?.sourceId?.startsWith("Compendium.") ? i.sourceId.split(".")[1] : void 0
	];
	for (let [t, n] of Object.entries(e)) n && typeof n == "object" && "initialization-folder" in n && a.push(t);
	return a.find((e) => typeof e == "string" && n.has(e));
}
function ji(e, t) {
	if (t < 1) throw Error("WFRP folders need at least one available level.");
	return e.length <= t ? [...e] : [...e.slice(0, t - 1), e.slice(t - 1).join("/")];
}
function Mi(e, t, n, r) {
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
			let i = ji(t.map((e) => e.name), r - 1).at(-1), a = t.length === 1 || r === 2 ? n : t[Math.min(t.length - 2, r - 3)].id;
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
			path: ji(t.length ? t : e.fallbackPath ?? [e.fallback], r - 1)
		});
	}
	return f;
}
var Ni = ["keepWfrpImportedContentTidy", "keepWfrpCompendiumsTidy"];
function Pi(t) {
	if (!game?.user) throw Error("Foundry user is unavailable during WFRP setting registration.");
	for (let n of Ni) game.settings.register(e, n, {
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
var Fi = "whence-they-hang";
async function Ii(t) {
	if (!t.ready || !t.user?.isGM) return;
	let n = t.settings.storage.get("world");
	if (!n) throw Error("World settings storage is unavailable during WFRP migration.");
	for (let r of Ni) {
		if (n.getSetting(`wfrp4e-compatibility-box.${r}`)) continue;
		let i = n.getSetting(`${Fi}.${r}`)?.value;
		typeof i == "boolean" && await t.settings.set(e, r, i);
	}
}
//#endregion
//#region src/module/functions/wfrp/folder-defaults.ts
function W(e) {
	return e.replace(/^(?:WFRP(?:4e|5e)?|Warhammer Fantasy Roleplay)\s*[-–—:]\s*/i, "");
}
function Li(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let [r, i] of e) {
		let e = (i, a) => {
			let o = W(i.name), s = [...a, o];
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
var Ri = "__wfrp_tidy_root__", zi = "Warhammer Fantasy Roleplay";
async function Bi(e, t) {
	await Di(e, () => Vi(e, t));
}
async function Vi(e, t) {
	if (!e.ready || !e.user?.isGM || e.system.id !== "wfrp4e") return;
	await Ii(e);
	let n = new Set([...e.modules.entries()].filter(([e, t]) => ki(e, t.authors ?? [])).map(([e]) => e));
	n.add("wfrp4e");
	let r = (e) => Ai(e.flags ?? {}, e._stats?.compendiumSource, n), i = new Map([...e.modules.entries()].map(([e, t]) => [e, t.title ?? e])), a = Li([["wfrp4e", e.system.packFolders ?? []], ...[...e.modules.entries()].filter(([e]) => n.has(e)).map(([e, t]) => [e, t.packFolders ?? []])]), o = async (n, o) => {
		let s = [...e.folders].filter((e) => e.type === n), c = new Set([...s, ...o].map((e) => e.folder?.id)), l = s.filter((e) => !e.folder && (e.name === zi || e.name === "WFRP")).sort((e, t) => Number(c.has(t.id)) - Number(c.has(e.id)) || e.id.localeCompare(t.id)), u = l[0];
		await Oi(l, s, o, (e) => !!r(e)), u && u.name !== zi && await u.update({ name: zi });
		let d = Mi(s.map((e) => ({
			id: e.id,
			name: e.name,
			parent: e.folder?.id ?? null,
			official: !!r(e)
		})), o.map((e) => ({
			id: e.id,
			parent: e.folder?.id ?? null,
			official: !!r(e),
			fallback: W(i.get(r(e)) ?? "Content"),
			fallbackPath: n === "Compendium" ? a.packPaths.get(e.id) : void 0
		})), u?.id ?? Ri, t);
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
		u ??= await f(zi, null);
		for (let e of d.folders) await s.find((t) => t.id === e.id).update({
			name: e.name,
			folder: e.parent === Ri ? u.id : e.parent
		});
		for (let e of d.entries) {
			let n = u, r = o.find((t) => t.id === e.id), i = /* @__PURE__ */ new Map(), c = [];
			for (let e = r.folder; e; e = e.folder) c.unshift(e);
			for (let [e, n] of c.entries()) {
				let r = ji(c.slice(0, e + 1).map((e) => e.name), t - 1).at(-1);
				n.color != null && i.set(W(r), n.color.toString());
			}
			for (let t of e.path) {
				let e = s.filter((e) => W(e.name) === W(t) && e.folder?.id === n.id).sort((e, t) => e.id.localeCompare(t.id)), r = W(t);
				n = e[0] ?? await f(r, n.id, a.colors.get(r) ?? i.get(r));
			}
			await r.update({ folder: n.id });
		}
		let p = async (e) => {
			for (let t of s.filter((t) => t.folder?.id === e.id)) {
				let e = W(t.name), n = a.colors.get(e), r = {};
				e !== t.name && (r.name = e), n && n.toLowerCase() !== t.color?.toString().toLowerCase() && (r.color = n), Object.keys(r).length && await t.update(r), await p(t);
			}
		};
		await p(u), await Oi([u], s, o, (e) => !!r(e));
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
async function Hi() {
	game && await Bi(game, CONST.FOLDER_MAX_DEPTH);
}
//#endregion
//#region src/module/functions/folders/empty.ts
function Ui(e, t) {
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
function Wi() {
	if (!game?.ready || !game.user?.isGM) throw Error("Only a GM in a loaded world can purge folders.");
	return game;
}
async function Gi(e) {
	let t = Wi();
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
		candidates: n.flatMap((e) => Ui(e.folders().map((e) => ({
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
async function Ki(e) {
	let t = Wi(), n = {
		deleted: 0,
		skipped: 0
	};
	return await Di(t, async () => {
		for (let t of e.candidates) {
			Wi();
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
var qi = "Purge Empty Folders";
function Ji(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
async function Yi() {
	if (!game?.ready || !game.user?.isGM) {
		ui?.notifications?.warn("Only a GM in a loaded world can purge empty folders.");
		return;
	}
	try {
		let e = await foundry.applications.api.DialogV2.wait({
			window: { title: qi },
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
		let t = await Gi(e), n = t.skippedPacks ? ` Skipped ${t.skippedPacks} locked packs.` : "";
		if (!t.candidates.length) {
			ui?.notifications?.info(`No empty folders found.${n}`);
			return;
		}
		let r = t.candidates.map(({ group: e, name: t }) => `<li>${Ji(e.label)}: ${Ji(t)}</li>`).join("");
		if (await foundry.applications.api.DialogV2.wait({
			window: { title: qi },
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
		let i = await Ki(t);
		ui?.notifications?.info(`Removed ${i.deleted} empty folders. Skipped ${i.skipped} folders that changed.${n}`);
	} catch (e) {
		S(`${qi} stopped. Some folders may already have been removed. See the console for details.`, e);
	}
}
//#endregion
//#region src/module/foundry/diagnostics/startup-report.ts
var Xi = {
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
}, Zi = /* @__PURE__ */ new Map(), Qi = [];
function $i() {
	Zi.clear(), Qi.length = 0;
}
function G(e, t, n) {
	Zi.set(e, {
		status: t,
		detail: n
	});
}
function K(t, n, r, i) {
	try {
		n() ? G(t, "applied", r) : Zi.get(t)?.status !== "applied" && G(t, i.status, i.detail);
	} catch (n) {
		G(t, "failed", n instanceof Error ? n.message : String(n)), console.error(`${e} | ${Xi[t][0]} could not initialize.`, n);
	}
}
function ea(t, n) {
	Qi.push(n.catch((n) => {
		G(t, "failed", n instanceof Error ? n.message : String(n)), console.error(`${e} | ${Xi[t][0]} startup task failed.`, n);
	}));
}
function ta() {
	return {
		foundryVersion: game?.version ?? "unknown",
		systemId: game?.system.id ?? "unknown",
		systemVersion: game?.system.version ?? "unknown",
		fixes: Object.entries(Xi).map(([e, [t, n]]) => ({
			id: e,
			label: t,
			packageId: n,
			version: (n === game?.system.id ? game.system.version : game?.modules.get(n)?.version) ?? "not installed",
			...Zi.get(e) ?? {
				status: "pending",
				detail: "Installation has not reported a result yet."
			}
		}))
	};
}
async function na() {
	await Promise.allSettled(Qi);
	for (let e of Object.keys(Xi)) Zi.has(e) || G(e, "unavailable", "The startup registration did not report a result.");
	let t = ta();
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
var ra = {
	applied: "Applied",
	"not-needed": "Not needed",
	inactive: "Inactive",
	unsupported: "Unsupported version",
	unavailable: "Unavailable API",
	failed: "Failed",
	pending: "Pending"
};
async function ia() {
	if (!game?.ready || !game.user?.isGM) {
		ui?.notifications?.warn("Only a GM in a loaded world can open the startup fix report.");
		return;
	}
	let e = ta(), t = foundry.utils.escapeHTML, n = e.fixes.map((e) => `<tr><td>${t(e.label)}<br><small>${t(e.packageId)} ${t(e.version)}</small></td><td>${ra[e.status]}</td><td>${t(e.detail)}</td></tr>`).join("");
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
function aa() {
	$i(), Hooks.once("setup", () => {
		game?.settings.registerMenu(e, "startupFixReport", {
			name: "Startup compatibility fixes",
			label: "Startup Fix Report",
			hint: "Review applied fixes, upstream corrections, unsupported versions, and missing APIs on this client.",
			icon: "fa-solid fa-clipboard-check",
			restricted: !0,
			type: class extends foundry.applications.api.ApplicationV2 {
				async render() {
					return await ia(), this;
				}
			}
		});
	}), Hooks.once("ready", na);
}
//#endregion
//#region src/module/foundry/api/create-module-api.ts
function oa() {
	return {
		getStartupReport: ta,
		showStartupReport: ia,
		importCalendarContent: ke,
		reviewCalendarContent: Ae,
		settingsPresets: Ut,
		settingsPresetCoordinator: Zt,
		configureBossBar: Ti,
		configureSplatter: xi,
		purgeEmptyFolders: Yi,
		getOptionalFeatures: ar,
		syncAllPaperDollActors: ir,
		syncPaperDollArgonActor: bi,
		syncPaperDollActor: U,
		tidyWfrpContent: Hi
	};
}
//#endregion
//#region src/module/foundry/api/register-module-api.ts
function sa() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	let n = t;
	n.api = oa();
}
//#endregion
//#region src/module/functions/integrations/bossbar/selection.ts
function ca(e) {
	let t = e.filter((e) => e.enemy), n = (e, t) => e.traits.some((e) => e.trim().toLowerCase() === t), r = t.filter((e) => n(e, "boss"));
	if (r.length) return r;
	let i = t.filter((e) => e.maxWounds >= 30 && n(e, "grim") && (n(e, "leader") || n(e, "champion"))).sort((e, t) => t.maxWounds - e.maxWounds || t.weaponSkill - e.weaponSkill || t.strength - e.strength), a = i[0];
	if (!a) return [];
	let o = i.filter((e) => e.maxWounds === a.maxWounds && e.weaponSkill === a.weaponSkill && e.strength === a.strength);
	return o.length <= 2 ? o : [];
}
//#endregion
//#region src/module/functions/integrations/bossbar/health.ts
var la = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
};
function ua(e) {
	return Object.entries(la).every(([t, n]) => e[t] === n);
}
function da(e, t) {
	return !Number.isFinite(e) || !Number.isFinite(t) || t <= 0 ? 0 : Math.min(100, Math.max(0, 100 * e / t));
}
function fa(e) {
	let t = Number.isFinite(e.maxCriticals) ? Math.max(0, Math.floor(e.maxCriticals)) : 0;
	return {
		max: t,
		remaining: Math.max(0, t - Math.max(0, e.criticals))
	};
}
function pa(e) {
	return (typeof e == "number" || typeof e == "string" && e.trim() !== "") && Number.isFinite(Number(e));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/runtime.ts
function ma() {
	return ui && Reflect.get(ui, "bossBar");
}
function ha(e) {
	return Array.from(e.combatants).flatMap(({ actor: e, token: t }) => e ? [{
		uuid: e.uuid,
		enemy: t?.disposition === -1 && !e.hasPlayerOwner,
		traits: Array.from(e.items).filter((e) => e.type === "trait").map((e) => e.name),
		maxWounds: e.system.status?.wounds?.max ?? 0,
		weaponSkill: e.system.characteristics?.ws?.value ?? 0,
		strength: e.system.characteristics?.s?.value ?? 0
	}] : []);
}
function ga(e) {
	return {
		wounds: e.system.status?.wounds?.value ?? 0,
		maxWounds: e.system.status?.wounds?.max ?? 0,
		maxCriticals: e.system.status?.criticalWounds?.max ?? 0,
		criticals: Array.from(e.items).filter((e) => e.type === "critical" && pa(e.system?.wounds?.value)).length
	};
}
//#endregion
//#region src/module/foundry/integrations/bossbar/combat.ts
var _a = /* @__PURE__ */ new WeakSet();
async function va(e) {
	if (!game?.user?.isGM || !b("bossBar") || !game.settings.get("wfrp4e-compatibility-box", O.automatic) || !e.scene || _a.has(e)) return;
	let t = ca(ha(e)), n = e.scene.getFlag("bossbar", "actors") ?? [], r = new Set(n.map((e) => e.uuid)), i = game.settings.get(D, "barStyles"), a = t.filter((e) => r.has(e.uuid) ? !1 : (r.add(e.uuid), !0)).map((e) => ({
		uuid: e.uuid,
		style: i[0]?.id ?? "default",
		hideName: !1
	}));
	if (a.length) {
		_a.add(e);
		try {
			await e.scene.setFlag(D, "actors", [...n, ...a]);
		} finally {
			_a.delete(e);
		}
	}
}
//#endregion
//#region src/module/foundry/integrations/bossbar/critical-segments.ts
var ya = "wfrp-bossbar-segments", ba = "http://www.w3.org/2000/svg", xa = [
	"background",
	"bar",
	"foreground"
], Sa = [
	"bg",
	"bar",
	"fg"
];
function Ca(e, t) {
	let n = xa.map((t) => e.querySelector(`:scope > .bar-${t}`)), r = n.map((e) => e?.querySelector(":scope > img")), i = r.every((e, t) => e?.getAttribute("src")?.split(/[?#]/)[0]?.endsWith(`/bossbar/resources/matching-images/segmented/${Sa[t]}.png`)), a = t !== void 0 && i ? String(t) : void 0;
	if (e.dataset.wfrpBossbarSegments === a) return;
	e.querySelectorAll(`.${ya}`).forEach((e) => e.remove()), e.classList.toggle("wfrp-bossbar-segmented", a !== void 0);
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
		o.className = ya, o.setAttribute("aria-hidden", "true"), o.style.gridTemplateColumns = a === "0" ? "none" : `repeat(${a}, minmax(0, 1fr))`;
		for (let t = 0; t < Number(a); t++) o.append(wa(e.ownerDocument, n.src));
		i.append(o);
	}
}
function wa(e, t) {
	let n = e.createElementNS(ba, "svg");
	n.setAttribute("viewBox", "829 0 787 361"), n.setAttribute("preserveAspectRatio", "xMidYMid meet");
	let r = e.createElementNS(ba, "image");
	return r.setAttribute("href", t), r.setAttribute("width", "7967"), r.setAttribute("height", "361"), n.append(r), n;
}
//#endregion
//#region src/module/foundry/integrations/bossbar/wounds-bar.ts
function Ta(e, t) {
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
function Ea(e, t) {
	return e.find((e) => e.id === t) ?? e[0];
}
//#endregion
//#region src/module/foundry/integrations/bossbar/display.ts
function Da(t = ma()) {
	if (!t?.element || t.id !== "boss-bar") return;
	let n = t.element;
	n.classList.add("wfrp4e-compatibility-box-bossbar");
	let r = Ue() && game?.settings.get("wfrp4e-compatibility-box", O.stacked) === !0 && ua(wi()), i = game?.settings.get(D, "barStyles"), a = game?.settings.get(e, O.woundsStyle), o = Ea(i, a);
	for (let e of n.querySelectorAll(".bar-list-item")) {
		let n = t.bars.find((t) => t.actor.uuid === e.dataset.uuid)?.actor;
		if (!n) continue;
		let i = e.querySelector(".boss-bar-container:not(.wfrp-bossbar-wounds)");
		if (!i) continue;
		if (!r || !o) {
			Ca(i), e.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), i.dataset.wfrpBossbarPrimary && (i.style.removeProperty("--bar-percent"), i.removeAttribute("role"), i.removeAttribute("aria-label"), i.removeAttribute("aria-valuenow"), i.removeAttribute("aria-valuemax"), i.removeAttribute("aria-valuemin"), delete i.dataset.wfrpBossbarPrimary);
			continue;
		}
		let a = ga(n), s = fa(a);
		Ca(i, s.max), i.dataset.wfrpBossbarPrimary = "true", i.style.setProperty("--bar-percent", `${da(s.remaining, s.max)}%`), Oa(i, Si("CriticalCapacity"), s.remaining, s.max);
		let c = e.querySelector(".wfrp-bossbar-wounds");
		c?.dataset.style !== o.id && (e.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), c = Ta(e.ownerDocument, o), c.dataset.wfrpBossbarExtra = "", c.dataset.style = o.id, i.before(c)), c && (c.style.setProperty("--bar-percent", `${da(a.wounds, a.maxWounds)}%`), c.classList.toggle("wfrp-bossbar-threat", a.wounds <= 0), Oa(c, Si("Wounds"), Math.max(0, a.wounds), a.maxWounds));
	}
}
function Oa(e, t, n, r) {
	e.setAttribute("role", "progressbar"), e.setAttribute("aria-label", t), e.setAttribute("aria-valuemin", "0"), e.setAttribute("aria-valuemax", String(Math.max(0, r))), e.setAttribute("aria-valuenow", String(Math.min(n, Math.max(0, r))));
}
var ka = !1;
function Aa() {
	ka || (ka = !0, queueMicrotask(() => {
		ka = !1;
		let e = ma();
		if (e?.element?.isConnected) try {
			e.updateBars(), Da(e);
		} catch (e) {
			Ci(e);
		}
	}));
}
//#endregion
//#region src/module/foundry/integrations/bossbar/settings.ts
function ja() {
	if (game) {
		for (let t of ["automatic", "stacked"]) game.settings.register(e, O[t], {
			name: `${e}.BossBar.Settings.${t}.Name`,
			hint: `${e}.BossBar.Settings.${t}.Hint`,
			config: !0,
			default: !0,
			scope: "world",
			type: Boolean
		});
		game.settings.register(e, O.woundsStyle, {
			name: `${e}.BossBar.Settings.woundsStyle.Name`,
			hint: `${e}.BossBar.Settings.woundsStyle.Hint`,
			config: !0,
			default: "default-grass",
			scope: "world",
			type: String,
			choices: () => Object.fromEntries((game?.settings.get(D, "barStyles")).map((e) => [e.id, e.name]))
		});
	}
}
function Ma(t) {
	if (!game?.user?.isGM) return;
	let n = t.querySelector(`[name="${D}.currentHpPath"]`)?.closest(".form-group");
	if (!n || t.querySelector("[data-wfrp-bossbar-setup]")) return;
	let r = t.ownerDocument.createElement("div");
	r.className = "form-group", r.dataset.wfrpBossbarSetup = "";
	let i = t.ownerDocument.createElement("button");
	i.type = "button", i.textContent = Si("Configure"), i.addEventListener("click", async () => {
		i.disabled = !0;
		try {
			let n = await Ti();
			for (let [e, r] of Object.entries(n)) {
				let n = t.querySelector(`[name="bossbar.${e}"]`);
				n && (typeof r == "boolean" ? n.checked = r : n.value = r);
			}
			let r = t.querySelector(`[name="${e}.${O.stacked}"]`);
			r && (r.checked = !0);
		} catch (e) {
			Ci(e);
		} finally {
			i.disabled = !1;
		}
	}), r.append(i), n.insertAdjacentElement("beforebegin", r);
}
//#endregion
//#region src/module/foundry/integrations/bossbar/register-integration.ts
function Na() {
	if (y("bossbar") && !(!b("bossBar") || game?.system.id !== "wfrp4e")) {
		ja(), Hooks.on("combatStart", (e) => void va(e).catch(Ci)), Hooks.on("renderBossBar", (e) => Da(e)), Hooks.on("renderSettingsConfig", (e, t) => {
			t instanceof HTMLElement && Ma(t);
		});
		for (let e of [
			"updateActor",
			"createItem",
			"updateItem",
			"deleteItem",
			"createActiveEffect",
			"updateActiveEffect",
			"deleteActiveEffect"
		]) Hooks.on(e, Aa);
		Hooks.on("updateSetting", (e) => {
			let t = e.key;
			[
				"bossbar.currentHpPath",
				"bossbar.maxHpPath",
				"bossbar.woundsSystem"
			].includes(t) && ma()?.render(!0).catch(Ci), (t.startsWith("bossbar.") || t.startsWith("wfrp4e-compatibility-box.bossBar") || t === "wfrp4e.uiaCrits") && Aa();
		});
	}
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/argon-logic.ts
var Pa = new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function Fa(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function Ia(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function La(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function Ra(e) {
	return e.trim().toLowerCase();
}
function za(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function Ba(e) {
	return e.type === "trait" ? (La(e), e.rollable && !e.disabled && Pa.has(e.traitBaseName.toLowerCase())) : !1;
}
function Va(e) {
	return e.type === "weapon" || Ba(e);
}
function Ha(e) {
	return e.type === "weapon";
}
function Ua(e) {
	return Fa(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function Wa(e) {
	return Fa(e), e.advances > 0;
}
function Ga(e, t) {
	return e.forEach(Fa), t === "basic" ? e.filter((e) => !Ua(e)).map((e) => e.id) : t === "advanced" ? e.filter(Ua).map((e) => e.id) : t === "trained" ? e.filter(Wa).map((e) => e.id) : e.map((e) => e.id);
}
function Ka(e, t) {
	return e.forEach(Ia), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function qa(e) {
	return e.filter((e) => e.type === "weapon" || Ba(e)).map((e) => e.id);
}
function Ja(e) {
	return e.filter((e) => e.type === "trait" ? (La(e), e.rollable && !e.disabled) : !1).map((e) => e.id);
}
function Ya(e, t) {
	return e.forEach(Fa), t.flatMap((t) => {
		let n = Ra(t.name), r = e.find((e) => Ra(e.name) === n);
		return !r || t.trained && !Wa(r) ? [] : [r.id];
	});
}
function Xa(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function Za(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function Qa(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => Za(e.name, t))).map((e) => e.id) : [];
}
function $a(e) {
	let t = [];
	return (e.type === "weapon" || Ba(e)) && t.push({
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
function eo(e, t) {
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
var to = "argonCombatItemPatterns", no = "*Draught*, *Potion*";
function q(t, n) {
	let r = ue[n];
	de(n) && t.register(e, r.settingKey, {
		config: !0,
		default: !0,
		hint: `${e}.Settings.Features.${n}.Hint`,
		name: `${e}.Settings.Features.${n}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function ro(t) {
	de("argonCombatHud") && t.register(e, to, {
		config: !0,
		default: no,
		hint: `${e}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${e}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: br,
		scope: "world",
		type: String
	});
}
function io() {
	if (!game) throw Error(`${e} | Foundry game is unavailable during settings registration.`);
	q(game.settings, "argonCombatHud"), q(game.settings, "bossBar"), q(game.settings, "healthEstimate"), q(game.settings, "paperDoll"), q(game.settings, "paperDollArgonBridge"), q(game.settings, "simpleCalendar"), q(game.settings, "simpleTimekeeping"), ro(game.settings);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/actor-flags.ts
var ao = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function oo(e, t) {
	return e.flags?.[mr]?.[t];
}
function so(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? oo(e, t);
}
async function co(t) {
	let n = {};
	for (let r of ao) {
		if (t.getFlag("wfrp4e-compatibility-box", r) !== void 0) continue;
		let i = oo(t, r);
		i !== void 0 && (n[`flags.${e}.${r}`] = i);
	}
	Object.keys(n).length && await t.update(n);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/argon-helpers.ts
function lo(t, n) {
	if (typeof t != "object" || !t) throw Error(`${e} | ${n} must be an object.`);
	return t;
}
function J(t, n) {
	if (typeof t != "string" || !t.trim()) throw Error(`${e} | ${n} must be a non-empty string.`);
	return t;
}
function uo(t, n) {
	if (typeof t != "boolean") throw Error(`${e} | ${n} must be a boolean.`);
	return t;
}
function fo(t, n) {
	if (!Number.isNumeric(t)) throw Error(`${e} | ${n} must be numeric.`);
	return Number(t);
}
function po(e) {
	return e == null || e === "" ? null : fo(e, "item quantity");
}
function mo(t, n, r, i) {
	let a = so(t, n);
	if (a === void 0) return i;
	if (!r.includes(a)) throw Error(`${e} | Argon actor flag ${pr}.${n} has invalid value ${String(a)}.`);
	return a;
}
function ho(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = uo(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function go(e, t = !1) {
	let n = lo(e, "Argon item"), r = J(n.type, "Argon item type"), i = J(n.name, `${r} item name`), a = {
		id: J(n.id, `${r} ${i} id`),
		name: i,
		quantity: po(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = J(n.advanced?.value, `${i} advanced classification`), a.grouped = J(n.grouped?.value, `${i} grouped classification`), a.advances = fo(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = J(n.lore?.value, `${i} lore`), a.memorized = uo(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = uo(n.system?.disabled, `${i} disabled state`), a.rollable = uo(n.rollable?.value, `${i} rollable state`), a.traitBaseName = za(i)), t && ho(a, n, r), a;
}
function Y(e) {
	return [...e].map((e) => go(e));
}
function X(t, n) {
	let r = new Map([...t].map((e) => [e.id, e]));
	return n.map((t) => {
		let n = r.get(t);
		if (!n) throw Error(`${e} | Selected Argon item ${t} is no longer available.`);
		return n;
	});
}
function _o(e) {
	return $a(go(e, !0));
}
function vo(e) {
	let t = mo(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return X(n, Ga(Y(n), t));
}
function yo(e) {
	let t = mo(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return X(n, Ka(Y(n), t));
}
function bo(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return X(t, qa(Y(t)));
}
function xo(e) {
	let t = [...e.itemTypes.trait];
	return X(t, Ja(Y(t)));
}
function So(e) {
	let t = vr.map((e) => ({
		...e,
		type: "characteristic"
	})), n = yr.map((e) => ({
		name: Co(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = X(r, Ya(Y(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function Co({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = Oo(`NAME.${e}`, t);
	return n ? `${i} (${Oo(n, r)})` : i;
}
function wo(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = Xa(String(t)), r = [...e.items];
	return X(r, Qa(Y(r), n));
}
function To(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function Eo(e) {
	return Va(go(e));
}
function Do(e) {
	return Ha(go(e));
}
function Oo(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/buttons.ts
function ko(e) {
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
				details: _o(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = To(this.item);
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
			let e = yo(this.actor), t = bo(this.actor), s = xo(this.actor), c = So(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = wo(this.actor), u = [
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
				icon: `${gr}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${gr}/drink-me.webp`,
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
function Ao() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!b("argonCombatHud")) return t.apply(this, e);
	};
}
//#endregion
//#region src/module/functions/integrations/enhancedcombathud/movement.ts
function jo(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function Mo(e, t, n) {
	jo(e, "move score"), jo(t, "maximum distance"), jo(n, "used distance");
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
function No(e) {
	return jo(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
//#endregion
//#region src/module/foundry/integrations/enhancedcombathud/panels.ts
function Po(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function Fo(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function Io(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return hr;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await co(this.actor), await super._onConfigure(e);
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
			let e = _r.map((e) => {
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
			}), n = vo(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return Po(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return Po(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return Fo(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += Po(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = Mo(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${No(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${No(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: No(t.bubbleDistance),
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
function Lo(t) {
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
			if (!Eo(r) || r.actor !== this.actor) throw Error(`${e} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let i = t.currentTarget.dataset.set, a = t.currentTarget.dataset.slot;
			if (!i || !a) throw Error(`${e} | Argon weapon-set drop target has no set or slot identifier.`);
			let o = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			o[i] ??= {}, o[i][a] = r.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", o), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!so(this.actor, "switchEquip")) return;
			let n = eo(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(Do).map((e) => ({
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
function Ro() {
	if (!y("enhancedcombathud")) {
		G("argonLegacy", "inactive", "Argon Combat HUD is not active.");
		return;
	}
	if (!b("argonCombatHud")) {
		G("argonLegacy", "inactive", "Argon compatibility is disabled.");
		return;
	}
	K("argonLegacy", () => (Ao(), !0), "Legacy enhancedcombathud-wfrp4e package check bypass installed.", {
		status: "unavailable",
		detail: "Argon's legacy module-check API is unavailable."
	}), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = ko(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = Io(e), a = Lo(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	});
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/panels.ts
function zo(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = ko(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return vi(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/report-bridge-error.ts
function Bo(e) {
	return e instanceof Error ? e.message : String(e);
}
function Vo(e, n) {
	S(`${t}: ${e}. ${Bo(n)}`, n);
}
function Ho(e, t) {
	e.catch((e) => Vo(t, e));
}
//#endregion
//#region src/module/foundry/integrations/paper-doll-argon/register-integration.ts
function Uo() {
	return b("paperDoll") && b("argonCombatHud") && b("paperDollArgonBridge");
}
function Wo(e, t) {
	!Uo() || !H(e) || yi(t) && Ho(bi(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function Go() {
	y("fvtt-paper-doll-ui") && y("enhancedcombathud") && Uo() && (Hooks.on("argonInit", (e) => {
		if (!e || typeof e != "object" && typeof e != "function" || !("defineMainPanels" in e) || typeof e.defineMainPanels != "function") throw Error("Argon main panel registration API is unavailable.");
		let { PaperDollQuickItemsPanel: t } = zo(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", Wo));
}
//#endregion
//#region src/module/foundry/settings/conflicts/register.ts
function Ko() {
	Hooks.once("setup", () => {
		game?.settings.register(e, Jt, {
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
					}) === "reset" && await Zt.reset(), this;
				}
			}
		});
	});
}
//#endregion
//#region src/module/foundry/settings/presets/register.ts
function qo() {
	Ko();
	let t = vt().filter(L);
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
						await Vt();
					} catch (e) {
						Ft(e);
					}
					return this;
				}
			}
		});
		for (let n of t) {
			let t = Nt(n);
			game?.settings.register(e, Pt(n), {
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
							await It(n);
						} catch (e) {
							Ft(e);
						}
						return this;
					}
				}
			});
		}
	}), Hooks.on("updateSetting", (e) => {
		let n = e.key;
		for (let e of t.filter((e) => e.watchSettings?.includes(n))) Lt(e, !0).catch(Ft);
	}), Hooks.once("ready", async () => {
		for (let e of t) try {
			await Lt(e);
		} catch (e) {
			Ft(e);
		}
	});
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/repair-mad-prefab-exclusions.ts
var Jo = /* @__PURE__ */ new WeakSet();
function Yo(t) {
	if (Jo.has(t)) return !1;
	let n = t.Initialise, r = /* @__PURE__ */ new Set();
	return t.Initialise = function(t, ...i) {
		let a = t?.moduleName, o = a ? game?.modules.get(a) : void 0, s = t?.ignoredCompendiumPacks;
		if (!a?.startsWith("mad-") || !o?.active || !o.packs) return n.call(this, t, ...i);
		let c = `${a}-prefabs`;
		return !Array.isArray(s) || !s.includes(c) || Array.from(o.packs).some((e) => e.name === c) ? n.call(this, t, ...i) : (r.has(a) || (r.add(a), console.warn(`${e} | ${a}: skipped unavailable Scene Packer exclusion ${c}.`)), n.call(this, {
			...t,
			ignoredCompendiumPacks: s.filter((e) => e !== c)
		}, ...i));
	}, Jo.add(t), !0;
}
//#endregion
//#region src/module/foundry/integrations/scene-packer/register-integration.ts
function Xo() {
	if (!y("scene-packer")) {
		G("scenePacker", "inactive", "Scene Packer is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e") {
		G("scenePacker", "inactive", "Requires a WFRP4e world.");
		return;
	}
	if (typeof ScenePacker > "u" || typeof ScenePacker.Initialise != "function") {
		G("scenePacker", "unavailable", "Scene Packer is active but its initialization API is unavailable at init.");
		return;
	}
	K("scenePacker", () => Yo(ScenePacker), "Guard installed for unavailable MAD prefab exclusions.", {
		status: "not-needed",
		detail: "The exclusion guard was already installed."
	});
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/repair-forge-owner-detection.ts
var Zo = /* @__PURE__ */ new WeakSet();
function Qo(e, t) {
	if (Zo.has(e)) return !1;
	let n = e._detectForgeAccountId;
	return e._detectForgeAccountId = async function() {
		let e = t();
		return this.isRunningOnForge() && typeof e == "string" && /^[a-zA-Z0-9_-]+$/.test(e) && e !== "bazaar" ? (this.forgeAccountId = e, !0) : n.call(this);
	}, Zo.add(e), !0;
}
//#endregion
//#region src/module/foundry/integrations/fa-nexus/register-integration.ts
async function $o() {
	if (!y("fa-nexus")) {
		G("forgeOwner", "inactive", "FA Nexus is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e" || typeof ForgeAPI > "u") {
		G("forgeOwner", "inactive", "Requires WFRP4e with Forge's API present.");
		return;
	}
	let t = Array.from(document.querySelectorAll("script[type=\"module\"][src]")).find((e) => {
		let t = new URL(e.src).pathname;
		return /\/modules\/fa-nexus\/(?:[^/]+\/)?scripts\/core\/forge-integration\.js$/.test(t);
	});
	if (!t) {
		G("forgeOwner", "unavailable", "The loaded FA Nexus Forge integration script could not be located."), console.warn(`${e} | FA Nexus Forge integration script was not found; patch skipped.`);
		return;
	}
	try {
		let e = (await import(
			/* @vite-ignore */
			t.src
)).forgeIntegration;
		if (typeof e?._detectForgeAccountId != "function" || typeof e.isRunningOnForge != "function") throw Error("FA Nexus Forge integration API is unavailable.");
		Qo(e, () => ForgeAPI.lastStatus?.ownerUserId), G("forgeOwner", "applied", "Forge owner-metadata fallback installed on the loaded Nexus service.");
	} catch (t) {
		G("forgeOwner", "failed", t instanceof Error ? t.message : String(t)), console.error(`${e} | Could not install FA Nexus Forge compatibility.`, t);
	}
}
//#endregion
//#region src/module/foundry/integrations/simple-quest/apply-template.ts
var es = "https://source.unsplash.com/random", ts = "<div style=\"background:#9ca7a5;border-top:2px solid #252525;border-bottom:2px solid #252525;padding:0 0.5em\">\n<p><span style=\"color:#252525;text-transform:uppercase\"><strong>Lorem Ipsum</strong></span></p>\n<p><span style=\"color:#252525\">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni asperiores dicta vitae veritatis. Aut atque nobis voluptatem at alias, quam similique corrupti mollitia nihil laboriosam, consequuntur quibusdam ut, quos nesciunt.</span></p>\n</div>";
function ns(e) {
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
async function rs(e, t, n) {
	await t.close({ force: !0 });
	try {
		let r = t.document.text?.content ?? "", i = new URL(e, document.baseURI).pathname.endsWith("/modules/simple-quest/templates/JournalTemplates/boxed-text.html") ? ts : await fetch(e).then((e) => {
			if (!e.ok) throw Error(`Simple Quest template request failed: ${e.status}`);
			return e.text();
		}), a = i.match(/https:\/\/source\.unsplash\.com\/random/g) ?? [], o = [];
		for (let e of a) o.push(await ns(n));
		let s = 0;
		i = i.replaceAll(es, () => o[s++] || es), await t.document.update({ "text.content": r + "\n" + i });
	} finally {
		t.render(!0);
	}
}
//#endregion
//#region src/module/foundry/integrations/simple-quest/template-dialog.ts
var is = {
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
async function as(e, t) {
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
			icon: is[r] ?? "fad fa-file-invoice",
			callback: () => rs(n, e, t)
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
var os = ["simpleQuestBox", "simpleQuestContent"];
function ss() {
	if (!y("simple-quest")) {
		for (let e of os) G(e, "inactive", "Simple Quest is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e") {
		for (let e of os) G(e, "inactive", "Requires a WFRP4e world.");
		return;
	}
	if (game.modules.get("simple-quest")?.version !== "5.3.0" || !["14.368", "14.369"].includes(game.version)) {
		for (let e of os) G(e, "unsupported", "Requires verified SQ 5.3.0 on Foundry 14.368 or 14.369.");
		console.warn(`${e} | Simple Quest page-template fixes skipped for unverified versions.`);
		return;
	}
	Hooks.on("getHeaderControlsJournalEntryPageHandlebarsSheet", (e, t) => {
		let n = e;
		if (!n?.document || !Array.isArray(t)) return;
		let r = t.find((e) => e.class === "simple-quest-page-template");
		!r || typeof r.onClick != "function" || (r.onClick = () => as(n, foundry));
	});
	for (let e of os) G(e, "applied", "Replacement Page Template action registered for the verified versions.");
}
//#endregion
//#region src/module/foundry/integrations/image-context/register-integration.ts
var cs = /* @__PURE__ */ new WeakSet(), ls = ["#token-hud .status-effects .effect-control[data-status-id]", "#token-hud .condition-effects .effect-control[data-status-id]"].join(", ");
function us() {
	if (!y("image-context")) {
		G("imageContext", "inactive", "Image Context is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e") {
		G("imageContext", "inactive", "Requires a WFRP4e world.");
		return;
	}
	if (typeof ImageContext > "u" || typeof ImageContext.onContextMenu != "function") {
		G("imageContext", "unavailable", "Image Context is active but its context-menu API is unavailable at init.");
		return;
	}
	if (cs.has(ImageContext)) {
		G("imageContext", "applied", "The token HUD condition exclusion is already installed.");
		return;
	}
	let e = ImageContext.onContextMenu;
	ImageContext.onContextMenu = function(t) {
		if (!(t.target instanceof Element && t.target.closest(ls))) return e.call(this, t);
	}, cs.add(ImageContext), G("imageContext", "applied", "Image menus are excluded only from WFRP token HUD condition controls.");
}
//#endregion
//#region src/module/functions/patches/wfrp4e/migration-return-support.ts
function ds(e) {
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
var fs = /* @__PURE__ */ new WeakSet();
function ps(e) {
	let t = e.migrateData;
	return typeof t != "function" || fs.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, fs.add(e), !0);
}
function ms() {
	return game?.system.id !== "wfrp4e" || ds(game.system.version) !== "affected" ? 0 : [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(ps(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/repair-roll-modes.ts
function hs() {
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
function gs(e) {
	let t = Z(e);
	return {
		kind: "speaker",
		actor: Q(t.actor),
		scene: Q(t.scene),
		token: Q(t.token)
	};
}
function _s(e) {
	return gs(Z(Z(e).context).speaker);
}
function vs(e) {
	let t = e.system ?? {};
	switch (e.type) {
		case "test": return [_s(t.testData)];
		case "opposed": {
			let e = Z(t.opposedTestData);
			return [_s(e.attackerTestData), _s(e.defenderTestData)];
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
			return e.targetSpeakerData && n.push(gs(e.targetSpeakerData)), e.defenderMessageId && n.push({
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
function ys(e) {
	let t = new DOMParser().parseFromString(e, "text/html").body;
	for (let e of t.querySelectorAll("script, style, template, button, input, select, textarea, .chat-button, a[data-action], [role='button'], .dice-tooltip, .applied-breakdown, .secret:not(.revealed), [hidden], [aria-hidden='true']")) e.remove();
	for (let e of t.querySelectorAll("img")) e.replaceWith(t.ownerDocument.createTextNode(e.alt ? ` ${e.alt} ` : ""));
	for (let e of t.querySelectorAll("br, p, div, li, tr, h1, h2, h3, h4, h5, h6")) e.append(t.ownerDocument.createTextNode("\n"));
	for (let e of t.querySelectorAll("td, th")) e.append(t.ownerDocument.createTextNode(" "));
	return (t.textContent ?? "").split("\n").map((e) => e.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}
function bs(e) {
	let t = document.createElement("p");
	return t.textContent = e, t.style.whiteSpace = "pre-line", t;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/render-orphaned-chat-cards.ts
var xs = /* @__PURE__ */ new WeakSet();
function Ss(e) {
	if (!game) return !1;
	switch (e.kind) {
		case "speaker": return e.scene && e.token ? !!game.scenes.get(e.scene)?.tokens.get(e.token)?.actor : !!(e.actor && game.actors.get(e.actor));
		case "uuid": return !!(e.uuid && fromUuidSync(e.uuid)?.documentName === "Actor");
		case "message": {
			let t = game.messages.get(e.id);
			return t ? t._source.type === "test" ? vs(t._source).every(Ss) : !1 : !e.required;
		}
	}
}
async function Cs(e, t) {
	let n = e.toObject(), r = e.visible && e.isContentVisible, i = r ? ys(n.content) : "", a = new foundry.documents.ChatMessage({
		...n,
		type: "base",
		system: {},
		flags: {},
		content: bs(i).outerHTML
	}), o = await a.renderHTML(t), s = o.querySelector(".message-content");
	if (s) {
		let e = r && a.isContentVisible ? i : ys(s.innerHTML);
		s.replaceChildren(bs(e));
	}
	return o.addEventListener("contextmenu", (e) => e.stopPropagation(), { capture: !0 }), o;
}
function ws() {
	let e = CONFIG.ChatMessage.documentClass?.prototype;
	if (!e || typeof e.renderHTML != "function" || xs.has(e)) return !1;
	let t = e.renderHTML;
	return e.renderHTML = function(e) {
		return vs(this._source).some((e) => !Ss(e)) ? Cs(this, e) : t.call(this, e);
	}, xs.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/active-effect-schema.ts
function Ts(e) {
	let t = e.schema;
	if (t.fields.changes) return !1;
	let n = e.defineSchema;
	return e.defineSchema = function() {
		let e = n.call(this);
		return e.changes ||= foundry.data.ActiveEffectTypeDataModel.defineSchema().changes, e;
	}, t.extendFields({ changes: foundry.data.ActiveEffectTypeDataModel.defineSchema().changes }), !0;
}
function Es() {
	return Object.values(CONFIG.ActiveEffect?.dataModels ?? {}).reduce((e, t) => e + Number(Ts(t)), 0);
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/guard-actorless-token-ruler.ts
var Ds = /* @__PURE__ */ new WeakSet(), Os = /* @__PURE__ */ new WeakSet();
function ks() {
	let e = CONFIG.Token?.rulerClass?.prototype, t = foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	if (!e || !t || e === t || !Object.prototype.isPrototypeOf.call(t, e) || typeof e._getSegmentStyle != "function" || typeof t._getSegmentStyle != "function" || Ds.has(e)) return !1;
	let n = e._getSegmentStyle, r = t._getSegmentStyle;
	return e._getSegmentStyle = function(...e) {
		if (this.token.actor) return n.apply(this, e);
		if (!Os.has(this.token)) {
			Os.add(this.token);
			let { uuid: e, actorId: t, actorLink: n } = this.token.document;
			console.warn("WFRP4e Compatibility Box | Token has no actor; using the core ruler style.", {
				tokenUuid: e,
				actorId: t,
				actorLink: n,
				worldActorExists: !!(t && game?.actors.get(t))
			});
		}
		return r.apply(this, e);
	}, Ds.add(e), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/dual-wielder-cleanup.ts
var As = /* @__PURE__ */ new WeakSet(), js = ["10.0.3", "10.1.2"];
function Ms() {
	if (!game || !js.includes(game.system.version)) return !1;
	let e = CONFIG.Actor.documentClass;
	if (typeof e != "function") return !1;
	let t = e.prototype;
	if (!B(t) || typeof t.getScripts != "function") return !1;
	let n = t;
	if (As.has(n)) return !1;
	let r = n.getScripts;
	return n.getScripts = function(e, ...t) {
		let n = r.call(this, e, ...t);
		return e === "startTurn" ? n.filter((e) => !(e.context?.effect?.statuses.has("dualwielder") && /^this\.effect\.delete\(\);?$/.test(e.script.trim()))) : n;
	}, As.add(n), !0;
}
//#endregion
//#region src/module/foundry/patches/wfrp4e/apply-compatibility-patches.ts
function Ns() {
	if (game?.system.id !== "wfrp4e") {
		for (let e of [
			"rollModes",
			"migrationReturns",
			"effectSchema",
			"orphanedChat",
			"actorlessRuler",
			"dualWielder"
		]) G(e, "inactive", "Requires a WFRP4e world.");
		return;
	}
	K("rollModes", hs, "WFRP received an independent copy of core roll modes.", {
		status: "unavailable",
		detail: "WFRP configuration or core Chat Message roll modes are unavailable."
	});
	let e = ds(game.system.version);
	e === "fixed" ? G("migrationReturns", "not-needed", "WFRP 10.0.0+ returns migrated data natively; no wrapper installed.") : e === "unknown" ? G("migrationReturns", "unsupported", "Migration fallback is verified only for WFRP 9.6.1–9.6.4; inspect this version.") : K("migrationReturns", ms, "Fallback installed for WFRP 9.6.1–9.6.4 Actor/Item migration returns.", {
		status: "unavailable",
		detail: "No callable Actor/Item migration methods were available."
	}), Object.keys(CONFIG.ActiveEffect?.dataModels ?? {}).length ? K("effectSchema", Es, "Missing changes fields supplied using Foundry's schema factory.", {
		status: "not-needed",
		detail: "All registered effect models already define changes."
	}) : G("effectSchema", "unavailable", "Active Effect data-model registry is unavailable or empty."), K("orphanedChat", ws, "Text fallback installed for chat cards with missing actor/token references.", {
		status: "unavailable",
		detail: "The chat document renderer is unavailable."
	});
	let t = CONFIG.Token?.rulerClass?.prototype === foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	K("actorlessRuler", ks, "Core-style fallback installed for tokens without actors.", {
		status: t && CONFIG.Token?.rulerClass ? "not-needed" : "unavailable",
		detail: t && CONFIG.Token?.rulerClass ? "The world uses Foundry's core ruler." : "The expected WFRP/core ruler methods are unavailable."
	}), js.includes(game.system.version) ? K("dualWielder", Ms, "Duplicate status deletion filtered; the unique GM retains turn-start cleanup.", {
		status: "unavailable",
		detail: "Actor script collection is unavailable."
	}) : G("dualWielder", "unsupported", "Cleanup is verified for WFRP 10.0.3 and 10.1.2; inspect this version before enabling.");
}
//#endregion
//#region src/module/wfrp/folders/hooks.ts
var Ps, Fs = !1, Is = !1;
function $() {
	if (!(!game?.ready || !game.user?.isActiveGM)) {
		if (Fs) {
			Is = !0;
			return;
		}
		clearTimeout(Ps), Ps = setTimeout(() => {
			Ls();
		}, 1e3);
	}
}
async function Ls() {
	if (!(!game?.ready || !game.user?.isActiveGM || Fs)) {
		Fs = !0, Is = !1;
		try {
			await Hi();
		} catch (e) {
			console.error(`${t}: WFRP folder cleanup failed.`, e), ui?.notifications?.error(`${t}: WFRP cleanup failed and may be incomplete. See the console for details.`, {
				console: !1,
				permanent: !0
			});
		} finally {
			Fs = !1, Is && $();
		}
	}
}
function Rs() {
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
function zs() {
	aa(), Hooks.once("setup", () => Pi($)), Rs(), Hooks.once("canvasInit", ze), Hooks.once("ready", ze), Hooks.once("init", () => {
		Ns(), io(), Se(), je(), Xo(), ea("forgeOwner", $o()), ss(), us(), sa(), Na(), Ro(), ci(), Go(), qo();
	});
}
//#endregion
//#region src/module/init/index.ts
zs();
//#endregion

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map