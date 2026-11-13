// src/module/constants.ts
var e = "wfrp4e-compatibility-box", t = "Drowsy's WFRP4e Compatibility Box", n = e, r = t;
// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function i(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var a = {}, o = [], s = () => {}, c = () => !1, l = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), u = (e) => e.startsWith("onUpdate:"), d = Object.assign, f = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, p = Object.prototype.hasOwnProperty, m = (e, t) => p.call(e, t), h = Array.isArray, g = (e) => te(e) === "[object Map]", _ = (e) => te(e) === "[object Set]", v = (e) => te(e) === "[object Date]", y = (e) => typeof e == "function", b = (e) => typeof e == "string", x = (e) => typeof e == "symbol", S = (e) => typeof e == "object" && !!e, C = (e) => (S(e) || y(e)) && y(e.then) && y(e.catch), ee = Object.prototype.toString, te = (e) => ee.call(e), ne = (e) => te(e).slice(8, -1), re = (e) => te(e) === "[object Object]", ie = (e) => b(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ae = /* @__PURE__ */ i(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), oe = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, se = /-\w/g, w = /* @__PURE__ */ oe((e) => e.replace(se, (e) => e.slice(1).toUpperCase())), ce = /\B([A-Z])/g, le = /* @__PURE__ */ oe((e) => e.replace(ce, "-$1").toLowerCase()), T = /* @__PURE__ */ oe((e) => e.charAt(0).toUpperCase() + e.slice(1)), ue = /* @__PURE__ */ oe((e) => e ? `on${T(e)}` : ""), E = (e, t) => !Object.is(e, t), de = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, fe = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, pe = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, me, he = () => me ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function ge(e) {
	if (h(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = b(r) ? be(r) : ge(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (b(e) || S(e)) return e;
}
var _e = /;(?![^(]*\))/g, ve = /:([^]+)/, ye = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function be(e) {
	let t = {};
	return e.replace(ye, (e) => e.startsWith("/*") ? "" : e).split(_e).forEach((e) => {
		if (e) {
			let n = e.split(ve);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function xe(e) {
	let t = "";
	if (b(e)) t = e;
	else if (h(e)) for (let n = 0; n < e.length; n++) {
		let r = xe(e[n]);
		r && (t += r + " ");
	}
	else if (S(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var Se = /* @__PURE__ */ i("itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly");
function Ce(e) {
	return !!e || e === "";
}
function we(e, t, n) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let i = 0; r && i < e.length; i++) r = Oe(e[i], t[i], n);
	return r;
}
function Te(e, t, n) {
	if (e.size !== t.size) return !1;
	let r = Array.from(t), i = new Uint8Array(r.length);
	for (let t of e) {
		let e = -1;
		for (let a = 0; a < r.length; a++) if (!i[a] && Oe(t, r[a], n)) {
			e = a;
			break;
		}
		if (e < 0) return !1;
		i[e] = 1;
	}
	return !0;
}
function Ee(e, t, n) {
	let r = g(e), i = g(t);
	if (r || i || (r = _(e), i = _(t), r || i)) return r && i ? Te(e, t, n) : !1;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let r in e) {
		let i = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
		if (i && !a || !i && a || !Oe(e[r], t[r], n)) return !1;
	}
	return String(e) === String(t);
}
function De(e, t, n, r) {
	n ||= [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	let [i, a] = n;
	if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
	i.set(e, t), a.set(t, e);
	let o = r(e, t, n);
	return i.delete(e), a.delete(t), o;
}
function Oe(e, t, n) {
	if (e === t) return !0;
	let r = v(e), i = v(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = x(e), i = x(t), r || i ? e === t : (r = h(e), i = h(t), r || i ? r && i ? De(e, t, n, we) : !1 : (r = S(e), i = S(t), r || i ? !r || !i ? !1 : De(e, t, n, Ee) : String(e) === String(t))));
}
function ke(e, t) {
	return e.findIndex((e) => Oe(e, t));
}
var Ae = (e) => !!(e && e.__v_isRef === !0), je = (e) => b(e) ? e : e == null ? "" : h(e) || S(e) && (e.toString === ee || !y(e.toString)) ? Ae(e) ? je(e.value) : JSON.stringify(e, Me, 2) : String(e), Me = (e, t) => Ae(t) ? Me(e, t.value) : g(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Ne(t, r) + " =>"] = n, e), {}) } : _(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Ne(e)) } : x(t) ? Ne(t) : S(t) && !h(t) && !re(t) ? String(t) : t, Ne = (e, t = "") => x(e) ? `Symbol(${e.description ?? t})` : e, D, Pe = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && D && (D.active ? (this.parent = D, this.index = (D.scopes || (D.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = D;
			try {
				return D = this, e();
			} finally {
				D = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = D, D = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (D === this) D = this.prevScope;
			else {
				let e = D;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Fe(e) {
	return new Pe(e);
}
function Ie() {
	return D;
}
var O, Le = /* @__PURE__ */ new WeakSet(), Re = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, D && (D.active ? D.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Le.has(this) && (Le.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || He(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, tt(this), Ge(this);
		let e = O, t = Ze;
		O = this, Ze = !0;
		try {
			return this.fn();
		} finally {
			Ke(this), O = e, Ze = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Ye(e);
			this.deps = this.depsTail = void 0, tt(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Le.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		qe(this) && this.run();
	}
	get dirty() {
		return qe(this);
	}
}, ze = 0, Be, Ve;
function He(e, t = !1) {
	e.flags |= 8, t ? (e.next = Ve, Ve = e) : (e.next = Be, Be = e);
}
function Ue() {
	ze++;
}
function We() {
	if (--ze > 0) return;
	if (Ve) {
		let e = Ve;
		for (Ve = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Be;) {
		let t = Be;
		for (Be = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Ge(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ke(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Ye(r), Xe(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function qe(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Je(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Je(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === nt) || (e.globalVersion = nt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !qe(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = O, r = Ze;
	O = e, Ze = !0;
	try {
		Ge(e);
		let n = e.fn(e._value);
		(t.version === 0 || E(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		O = n, Ze = r, Ke(e), e.flags &= -3;
	}
}
function Ye(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Ye(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Xe(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Ze = !0, Qe = [];
function $e() {
	Qe.push(Ze), Ze = !1;
}
function et() {
	let e = Qe.pop();
	Ze = e === void 0 || e;
}
function tt(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = O;
		O = void 0;
		try {
			t();
		} finally {
			O = e;
		}
	}
}
var nt = 0, rt = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, it = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!O || !Ze || O === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== O) t = this.activeLink = new rt(O, this), O.deps ? (t.prevDep = O.depsTail, O.depsTail.nextDep = t, O.depsTail = t) : O.deps = O.depsTail = t, at(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = O.depsTail, t.nextDep = void 0, O.depsTail.nextDep = t, O.depsTail = t, O.deps === t && (O.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, nt++, this.notify(e);
	}
	notify(e) {
		Ue();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			We();
		}
	}
};
function at(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) at(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var ot = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ Symbol(""), ct = /* @__PURE__ */ Symbol(""), lt = /* @__PURE__ */ Symbol("");
function k(e, t, n) {
	if (Ze && O) {
		let t = ot.get(e);
		t || ot.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new it()), r.map = t, r.key = n), r.track();
	}
}
function ut(e, t, n, r, i, a) {
	let o = ot.get(e);
	if (!o) {
		nt++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Ue(), t === "clear") o.forEach(s);
	else {
		let i = h(e), a = i && ie(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === lt || !x(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(lt)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(st)), g(e) && s(o.get(ct)));
				break;
			case "delete":
				i || (s(o.get(st)), g(e) && s(o.get(ct)));
				break;
			case "set": g(e) && s(o.get(st));
		}
	}
	We();
}
function dt(e) {
	let t = /* @__PURE__ */ j(e);
	return t === e || (k(t, "iterate", lt), /* @__PURE__ */ A(e)) ? t : /* @__PURE__ */ Xt(e) ? /* @__PURE__ */ Yt(e) ? t.map((e) => $t(M(e))) : t.map($t) : t.map(M);
}
function ft(e) {
	return k(e = /* @__PURE__ */ j(e), "iterate", lt), e;
}
function pt(e, t) {
	return /* @__PURE__ */ Xt(e) ? $t(/* @__PURE__ */ Yt(e) ? M(t) : t) : M(t);
}
var mt = {
	__proto__: null,
	[Symbol.iterator]() {
		return ht(this, Symbol.iterator, (e) => pt(this, e));
	},
	concat(...e) {
		return dt(this).concat(...e.map((e) => h(e) ? dt(e) : e));
	},
	entries() {
		return ht(this, "entries", (e) => (e[1] = pt(this, e[1]), e));
	},
	every(e, t) {
		return vt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return vt(this, "filter", e, t, (e) => e.map((e) => pt(this, e)), arguments);
	},
	find(e, t) {
		return vt(this, "find", e, t, (e) => pt(this, e), arguments);
	},
	findIndex(e, t) {
		return vt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return vt(this, "findLast", e, t, (e) => pt(this, e), arguments);
	},
	findLastIndex(e, t) {
		return vt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return vt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return bt(this, "includes", e);
	},
	indexOf(...e) {
		return bt(this, "indexOf", e);
	},
	join(e) {
		return dt(this).join(e);
	},
	lastIndexOf(...e) {
		return bt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return vt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return xt(this, "pop");
	},
	push(...e) {
		return xt(this, "push", e);
	},
	reduce(e, ...t) {
		return yt(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return yt(this, "reduceRight", e, t);
	},
	shift() {
		return xt(this, "shift");
	},
	some(e, t) {
		return vt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return xt(this, "splice", e);
	},
	toReversed() {
		return dt(this).toReversed();
	},
	toSorted(e) {
		return dt(this).toSorted(e);
	},
	toSpliced(...e) {
		return dt(this).toSpliced(...e);
	},
	unshift(...e) {
		return xt(this, "unshift", e);
	},
	values() {
		return ht(this, "values", (e) => pt(this, e));
	}
};
function ht(e, t, n) {
	let r = ft(e), i = r[t], a = i.call(r);
	if (r !== e && !/* @__PURE__ */ A(e)) {
		if (a[Symbol.toStringTag] === "Array Iterator") {
			let e = Object.create(Object.getPrototypeOf(a));
			return e.next = () => gt(a.next(), n), i !== _t[t] && Object.defineProperties(e, {
				return: { get() {
					let e = a.return;
					return typeof e == "function" ? e.bind(a) : e;
				} },
				throw: { get() {
					let e = a.throw;
					return typeof e == "function" ? e.bind(a) : e;
				} }
			}), e;
		}
		a._next = a.next, a.next = () => gt(a._next(), n);
	}
	return a;
}
function gt(e, t) {
	return e.done || (e.value = t(e.value)), e;
}
var _t = Array.prototype;
function vt(e, t, n, r, i, a) {
	let o = ft(e), s = o !== e && !/* @__PURE__ */ A(e), c = o[t];
	if (c !== _t[t]) {
		let t = c.apply(e, a);
		return s ? M(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, pt(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function yt(e, t, n, r) {
	let i = ft(e), a = i !== e && !/* @__PURE__ */ A(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = pt(e, t)), n.call(this, t, pt(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? pt(e, c) : c;
}
function bt(e, t, n) {
	let r = /* @__PURE__ */ j(e);
	k(r, "iterate", lt);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Zt(n[0]) ? (n[0] = /* @__PURE__ */ j(n[0]), r[t](...n)) : i;
}
function xt(e, t, n = []) {
	$e(), Ue();
	let r = (/* @__PURE__ */ j(e))[t].apply(e, n);
	return We(), et(), r;
}
var St = /* @__PURE__ */ i("__proto__,__v_isRef,__isVue"), Ct = /* @__PURE__ */ new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(x));
function wt(e) {
	x(e) || (e = String(e));
	let t = /* @__PURE__ */ j(this);
	return k(t, "has", e), t.hasOwnProperty(e);
}
var Tt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Ut : Ht : i ? Vt : Bt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = h(e);
		if (!r) {
			let e;
			if (a && (e = mt[t])) return e;
			if (t === "hasOwnProperty") return wt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ N(e) ? e : n);
		if ((x(t) ? Ct.has(t) : St(t)) || (r || k(e, "get", t), i)) return o;
		if (/* @__PURE__ */ N(o)) {
			let e = a && ie(t) ? o : o.value;
			return r && S(e) ? /* @__PURE__ */ qt(e) : e;
		}
		return S(o) ? r ? /* @__PURE__ */ qt(o) : /* @__PURE__ */ Gt(o) : o;
	}
}, Et = class extends Tt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = h(e) && ie(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Xt(i);
			if (!/* @__PURE__ */ A(n) && !/* @__PURE__ */ Xt(n) && (i = /* @__PURE__ */ j(i), n = /* @__PURE__ */ j(n)), !a && /* @__PURE__ */ N(i) && !/* @__PURE__ */ N(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : m(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ N(e) ? e : r);
		return e === /* @__PURE__ */ j(r) && s && (o ? E(n, i) && ut(e, "set", t, n, i) : ut(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = m(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && ut(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return x(t) && Ct.has(t) || k(e, "has", t), n;
	}
	ownKeys(e) {
		return k(e, "iterate", h(e) ? "length" : st), Reflect.ownKeys(e);
	}
}, Dt = class extends Tt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, Ot = /* @__PURE__ */ new Et(), kt = /* @__PURE__ */ new Dt(), At = /* @__PURE__ */ new Et(!0), jt = (e) => e, Mt = (e) => Reflect.getPrototypeOf(e);
function Nt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ j(i), o = g(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? jt : t ? $t : M;
		return !t && k(a, "iterate", c ? ct : st), d(Object.create(l), { next() {
			let { value: e, done: t } = l.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [u(e[0]), u(e[1])] : u(e),
				done: t
			};
		} });
	};
}
function Pt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Ft(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ j(r), a = /* @__PURE__ */ j(n);
			e || (E(n, a) && k(i, "get", n), k(i, "get", a));
			let { has: o } = Mt(i), s = t ? jt : e ? $t : M;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && k(/* @__PURE__ */ j(t), "iterate", st), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ j(n), i = /* @__PURE__ */ j(t);
			return e || (E(t, i) && k(r, "has", t), k(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ j(a), s = t ? jt : e ? $t : M;
			return !e && k(o, "iterate", st), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return d(n, e ? {
		add: Pt("add"),
		set: Pt("set"),
		delete: Pt("delete"),
		clear: Pt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ j(this), r = Mt(n), i = /* @__PURE__ */ j(e), a = !t && !/* @__PURE__ */ A(e) && !/* @__PURE__ */ Xt(e) ? i : e;
			return r.has.call(n, a) || E(e, a) && r.has.call(n, e) || E(i, a) && r.has.call(n, i) || (n.add(a), ut(n, "add", a, a)), this;
		},
		set(e, n) {
			t || /* @__PURE__ */ A(n) || /* @__PURE__ */ Xt(n) || (n = /* @__PURE__ */ j(n));
			let r = /* @__PURE__ */ j(this), { has: i, get: a } = Mt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ j(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? E(n, s) && ut(r, "set", e, n, s) : ut(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ j(this), { has: n, get: r } = Mt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ j(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && ut(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ j(this), t = e.size !== 0, n = e.clear();
			return t && ut(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Nt(r, e, t);
	}), n;
}
function It(e, t) {
	let n = Ft(e, t);
	return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? r : Reflect.get(m(n, i) && i in r ? n : r, i, a);
}
var Lt = { get: /* @__PURE__ */ It(!1, !1) }, Rt = { get: /* @__PURE__ */ It(!1, !0) }, zt = { get: /* @__PURE__ */ It(!0, !1) }, Bt = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap();
function Wt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function Gt(e) {
	return /* @__PURE__ */ Xt(e) ? e : Jt(e, !1, Ot, Lt, Bt);
}
// @__NO_SIDE_EFFECTS__
function Kt(e) {
	return Jt(e, !1, At, Rt, Vt);
}
// @__NO_SIDE_EFFECTS__
function qt(e) {
	return Jt(e, !0, kt, zt, Ht);
}
function Jt(e, t, n, r, i) {
	if (!S(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Wt(ne(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Yt(e) {
	return /* @__PURE__ */ Xt(e) ? /* @__PURE__ */ Yt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Xt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function A(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Zt(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function j(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ j(t) : e;
}
function Qt(e) {
	return !m(e, "__v_skip") && Object.isExtensible(e) && fe(e, "__v_skip", !0), e;
}
var M = (e) => S(e) ? /* @__PURE__ */ Gt(e) : e, $t = (e) => S(e) ? /* @__PURE__ */ qt(e) : e;
// @__NO_SIDE_EFFECTS__
function N(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function en(e) {
	return tn(e, !1);
}
function tn(e, t) {
	return /* @__PURE__ */ N(e) ? e : new nn(e, t);
}
var nn = class {
	constructor(e, t) {
		this.dep = new it(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ j(e), this._value = t ? e : M(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ A(e) || /* @__PURE__ */ Xt(e);
		e = n ? e : /* @__PURE__ */ j(e), E(e, t) && (this._rawValue = e, this._value = n ? e : M(e), this.dep.trigger());
	}
};
function rn(e) {
	return /* @__PURE__ */ N(e) ? e.value : e;
}
var an = {
	get: (e, t, n) => t === "__v_raw" ? e : rn(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ N(i) && !/* @__PURE__ */ N(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function on(e) {
	return /* @__PURE__ */ Yt(e) ? e : new Proxy(e, an);
}
var sn = class {
	constructor(e) {
		this.__v_isRef = !0, this._value = void 0;
		let t = this.dep = new it(), { get: n, set: r } = e(t.track.bind(t), t.trigger.bind(t));
		this._get = n, this._set = r;
	}
	get value() {
		return this._value = this._get();
	}
	set value(e) {
		this._set(e);
	}
};
function cn(e) {
	return new sn(e);
}
var ln = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new it(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = nt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && O !== this) return He(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Je(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function un(e, t, n = !1) {
	let r, i;
	return y(e) ? r = e : (r = e.get, i = e.set), new ln(r, i, n);
}
var dn = {}, fn = /* @__PURE__ */ new WeakMap(), pn = void 0;
function mn(e, t = !1, n = pn) {
	if (n) {
		let t = fn.get(n);
		t || fn.set(n, t = []), t.push(e);
	}
}
function hn(e, t, n = a) {
	let { immediate: r, deep: i, once: o, scheduler: c, augmentJob: l, call: u } = n, d = (e) => i ? e : /* @__PURE__ */ A(e) || i === !1 || i === 0 ? gn(e, 1) : gn(e), p, m, g, _, v = !1, b = !1;
	if (/* @__PURE__ */ N(e) ? (m = () => e.value, v = /* @__PURE__ */ A(e)) : /* @__PURE__ */ Yt(e) ? (m = () => d(e), v = !0) : h(e) ? (b = !0, v = e.some((e) => /* @__PURE__ */ Yt(e) || /* @__PURE__ */ A(e)), m = () => e.map((e) => {
		if (/* @__PURE__ */ N(e)) return e.value;
		if (/* @__PURE__ */ Yt(e)) return d(e);
		if (y(e)) return u ? u(e, 2) : e();
	})) : m = y(e) ? t ? u ? () => u(e, 2) : e : () => {
		if (g) {
			$e();
			try {
				g();
			} finally {
				et();
			}
		}
		let t = pn;
		pn = p;
		try {
			return u ? u(e, 3, [_]) : e(_);
		} finally {
			pn = t;
		}
	} : s, t && i) {
		let e = m, t = i === !0 ? Infinity : i;
		m = () => gn(e(), t);
	}
	let x = Ie(), S = () => {
		p.stop(), x && x.active && f(x.effects, p);
	};
	if (o && t) {
		let e = t;
		t = (...t) => {
			try {
				return e(...t);
			} finally {
				S();
			}
		};
	}
	let C = b ? Array(e.length).fill(dn) : dn, ee = (e) => {
		if (p.flags & 1 && (p.dirty || e)) {
			if (t) {
				let n = p.run();
				if (e || i || v || (b ? n.some((e, t) => E(e, C[t])) : E(n, C))) {
					let e = pn;
					$e();
					try {
						g && g(), pn = p;
						let e = [
							n,
							C === dn ? void 0 : b && C[0] === dn ? [] : C,
							_
						];
						C = n, u ? u(t, 3, e) : t(...e);
					} finally {
						pn = e, et();
					}
				}
			} else p.run();
		}
	};
	return l && l(ee), p = new Re(m), p.scheduler = c ? () => c(ee, !1) : ee, _ = (e) => mn(e, !1, p), g = p.onStop = () => {
		let e = fn.get(p);
		if (e) {
			if (u) u(e, 4);
			else for (let t of e) t();
			fn.delete(p);
		}
	}, t ? r ? ee(!0) : C = p.run() : c ? c(ee.bind(null, !0), !0) : p.run(), S.pause = p.pause.bind(p), S.resume = p.resume.bind(p), S.stop = S, S;
}
function gn(e, t = Infinity, n) {
	if (t <= 0 || !S(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ N(e)) gn(e.value, t, n);
	else if (h(e)) for (let r = 0; r < e.length; r++) gn(e[r], t, n);
	else if (_(e) || g(e)) e.forEach((e) => {
		gn(e, t, n);
	});
	else if (re(e)) {
		for (let r in e) gn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && gn(e[r], t, n);
	}
	return e;
}
// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function _n(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		yn(e, t, n);
	}
}
function vn(e, t, n, r) {
	if (y(e)) {
		let i = _n(e, t, n, r);
		return i && C(i) && i.catch((e) => {
			yn(e, t, n, void 0, !0);
		}), i;
	}
	if (h(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(vn(e[a], t, n, r));
		return i;
	}
}
function yn(e, t, n, r = !0, i = !1) {
	let o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: c } = t && t.appContext.config || a;
	if (t) {
		let r = t.parent, a = t.proxy, o = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t && !r.isUnmounted && (!i || r.scope.active)) {
				for (let n = 0; n < t.length; n++) if (t[n](e, a, o) === !1) return;
			}
			r = r.parent;
		}
		if (s) {
			$e(), _n(s, null, 10, [
				e,
				a,
				o
			]), et();
			return;
		}
	}
	bn(e, n, o, r, c);
}
function bn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var P = [], xn = -1, Sn = [], Cn = null, wn = 0, Tn = /* @__PURE__ */ Promise.resolve(), En = null;
function Dn(e) {
	let t = En || Tn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function On(e) {
	let t = xn + 1, n = P.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = P[r], a = In(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function kn(e) {
	if (!(e.flags & 1)) {
		let t = In(e), n = P[P.length - 1];
		!n || !(e.flags & 2) && t >= In(n) ? P.push(e) : P.splice(On(t), 0, e), e.flags |= 1, An();
	}
}
function An() {
	En ||= Tn.then(Ln);
}
function jn(e) {
	if (!h(e)) Cn && e.id === -1 ? Cn.splice(wn + 1, 0, e) : e.flags & 1 || (Sn.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) Sn.push(e[t]);
	An();
}
function Mn(e, t, n, r = xn + 1) {
	for (; r < P.length; r++) {
		let n = P[r];
		if (n && n.flags & 2) {
			if (e && n.id !== e.uid || t !== void 0 && !(n.id >= t)) continue;
			P.splice(r, 1), r = e ? r - 1 : xn, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
		}
	}
}
function Nn(e, t, n = 0) {
	if (Sn.length) {
		let e = Sn, r = 0;
		if (t) {
			e = [];
			for (let i = 0; i < Sn.length; i++) {
				let a = Sn[i];
				(a.i === void 0 ? t.has(a) : !a.i || a.i.uid < n) ? Sn[r++] = a : e.push(a);
			}
		}
		let i = [...new Set(e)].sort((e, t) => In(e) - In(t));
		if (Sn.length = r, Cn) {
			for (let e = 0; e < i.length; e++) Cn.push(i[e]);
			return;
		}
		for (Cn = i, wn = 0; wn < Cn.length; wn++) {
			let e = Cn[wn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		Cn = null, wn = 0;
	}
}
var Pn = !1;
function Fn(e, t) {
	if (Pn) {
		e();
		return;
	}
	let n = t === void 0 ? void 0 : new Set(Sn);
	e(), Pn = !0;
	try {
		Mn(void 0, t), Nn(void 0, n, t);
	} finally {
		Pn = !1;
	}
}
var In = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function Ln(e) {
	try {
		for (xn = 0; xn < P.length; xn++) {
			let e = P[xn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), _n(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; xn < P.length; xn++) {
			let e = P[xn];
			e && (e.flags &= -2);
		}
		xn = -1, P.length = 0, Nn(e), En = null, (P.length || Sn.length) && Ln(e);
	}
}
var Rn = null, zn = null;
function Bn(e) {
	let t = Rn;
	return Rn = e, zn = e && e.type.__scopeId || null, t;
}
function Vn(e, t = Rn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ea(-1);
		let i = Bn(t), a = Zi.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = Zi.length; e > a; e--) Qi();
			Bn(i), r._d && ea(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Hn(e, t) {
	if (Rn === null) return e;
	let n = Ia(Rn), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, o, s, c = a] = t[e];
		i && (y(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && gn(o), r.push({
			dir: i,
			instance: n,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function Un(e, t, n, r) {
	let i = e;
	if (r === "beforeMount") e._mount = e;
	else if (r === "beforeUpdate") {
		let n = t && t._mount;
		n && (n._latest = e, e._mount = n);
	} else if (r === "mounted") {
		let t = e._latest;
		e._mount = e._latest = void 0, t && (i = t, t._mount = void 0);
	}
	let a = i.dirs, o = t && t.dirs;
	for (let s = 0; s < a.length; s++) {
		let c = a[s];
		o ? c.oldValue = o[s].value : r === "mounted" && c.oldValue !== void 0 && (c = d({}, c, { oldValue: void 0 }));
		let l = c.dir[r];
		l && ($e(), vn(l, n, 8, [
			e.el,
			c,
			i,
			t
		]), et());
	}
}
function Wn(e, t) {
	if (H) {
		let n = H.provides, r = H.parent && H.parent.provides;
		r === n && (n = H.provides = Object.create(r)), n[e] = t;
	}
}
function Gn(e, t, n = !1) {
	let r = Sa();
	if (r || ti) {
		let i = ti ? ti._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && y(t) ? t.call(r && r.proxy) : t;
	}
}
var Kn = /* @__PURE__ */ Symbol.for("v-scx"), qn = () => Gn(Kn);
function Jn(e, t) {
	return Xn(e, null, { flush: "sync" });
}
function Yn(e, t, n) {
	return Xn(e, t, n);
}
function Xn(e, t, n = a) {
	let { immediate: r, deep: i, flush: o, once: c } = n, l = d({}, n), u = t && r || !t && o !== "post", f;
	if (Oa) {
		if (o === "sync") {
			let e = qn();
			f = e.__watcherHandles ||= [];
		} else if (!u) {
			let e = () => {};
			return e.stop = s, e.resume = s, e.pause = s, e;
		}
	}
	let p = H;
	l.call = (e, t, n) => vn(e, p, t, n);
	let m = !1;
	o === "post" ? l.scheduler = (e) => {
		e.i = p, I(e, p && p.suspense);
	} : o !== "sync" && (m = !0, l.scheduler = (e, t) => {
		t ? e() : kn(e);
	}), l.augmentJob = (e) => {
		t && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = hn(e, t, l);
	return Oa && (f ? f.push(h) : u && h()), h;
}
function Zn(e, t, n) {
	let r = this.proxy, i = b(e) ? e.includes(".") ? Qn(r, e) : () => r[e] : e.bind(r, r), a;
	y(t) ? a = t : (a = t.handler, n = t);
	let o = Ta(this), s = Xn(i, a.bind(r), n);
	return o(), s;
}
function Qn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var $n = /* @__PURE__ */ Symbol("_vte"), er = (e) => e.__isTeleport, tr = /* @__PURE__ */ Symbol("_leaveCb");
function nr(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Yi) {
			t = n;
			break;
		}
	}
	return t;
}
function rr(e) {
	if (!pr(e)) return er(e.type) && e.children ? nr(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && y(n.default)) return n.default();
	}
}
function ir(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		ir(er(n.type) && rr(n) || n, t);
	} else if (e.shapeFlag & 128) {
		let n = e.suspense;
		if (n) {
			let e = n.isHydrating ? n.pendingBranch : n.activeBranch;
			e && ir(e, t.clone(e));
		} else e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
	} else if (e.transition = t, e.type === L && h(e.children)) {
		let n = li(e.children, !1);
		n && ir(n, t);
	}
}
function ar(e) {
	if (e.component) return ar(e.component.subTree);
	if (e.type === L) {
		let t = h(e.children) && li(e.children, !1);
		return t ? ar(t) : void 0;
	}
	if (e.type !== Yi) return e;
}
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return y(e) ? /* @__PURE__ */ d({ name: e.name }, t, { setup: e }) : e;
}
function sr(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function cr(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var lr = /* @__PURE__ */ new WeakMap();
function ur(e, t, n, r, i = !1) {
	if (h(e)) {
		e.forEach((e, a) => ur(e, t && (h(t) ? t[a] : t), n, r, i));
		return;
	}
	if (fr(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && ur(e, t, n, r.component.subTree);
		return;
	}
	let o = r.shapeFlag & 4 ? Ia(r.component) : r.el, s = i ? null : o, { i: l, r: u } = e, d = t && t.r, p = l.refs === a ? l.refs = {} : l.refs, g = l.setupState, _ = /* @__PURE__ */ j(g), v = g === a ? c : (e) => !cr(p, e) && m(_, e), x = (e, t) => !(t && cr(p, t));
	if (d != null && d !== u) {
		if (dr(t), b(d)) p[d] = null, v(d) && (g[d] = null);
		else if (/* @__PURE__ */ N(d)) {
			let e = t;
			x(d, e.k) && (d.value = null), e.k && (p[e.k] = null);
		}
	}
	if (y(u)) _n(u, l, 12, [s, p]);
	else {
		let t = b(u), r = /* @__PURE__ */ N(u);
		if (t || r) {
			let a = () => {
				if (e.f) {
					let n = t ? v(u) ? g[u] : p[u] : x(u) || !e.k ? u.value : p[e.k];
					if (i) h(n) && f(n, o);
					else if (h(n)) n.includes(o) || n.push(o);
					else if (t) p[u] = [o], v(u) && (g[u] = p[u]);
					else {
						let t = [o];
						x(u, e.k) && (u.value = t), e.k && (p[e.k] = t);
					}
				} else t ? (p[u] = s, v(u) && (g[u] = s)) : r && (x(u, e.k) && (u.value = s), e.k && (p[e.k] = s));
			};
			if (s) {
				let t = () => {
					a(), lr.delete(e);
				};
				t.id = -1, lr.set(e, t), I(t, n);
			} else dr(e), a();
		}
	}
}
function dr(e) {
	let t = lr.get(e);
	t && (t.flags |= 8, lr.delete(e));
}
he().requestIdleCallback, he().cancelIdleCallback;
var fr = (e) => !!e.type.__asyncLoader, pr = (e) => e.type.__isKeepAlive;
function mr(e, t) {
	gr(e, "a", t);
}
function hr(e, t) {
	gr(e, "da", t);
}
function gr(e, t, n = H) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (vr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) pr(e.parent.vnode) && _r(r, t, n, e), e = e.parent;
	}
}
function _r(e, t, n, r) {
	let i = vr(t, e, r, !0), a = vr("um", () => f(r[t], i), n);
	a.flags = 16;
}
function vr(e, t, n = H, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			$e();
			let i = Ta(n), a = vn(t, n, e, r);
			return i(), et(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var yr = (e) => (t, n = H) => {
	Oa && e !== "sp" || vr(e, (...e) => t(...e), n);
}, br = yr("bm"), xr = yr("m"), Sr = yr("bu"), Cr = yr("u"), wr = yr("bum"), Tr = yr("um"), Er = yr("sp"), Dr = yr("rtg"), Or = yr("rtc");
function kr(e, t = H) {
	vr("ec", e, t);
}
var Ar = /* @__PURE__ */ Symbol.for("v-ndc");
function jr(e, t, n, r) {
	let i, a = n && n[r], o = h(e);
	if (o || b(e)) {
		let n = o && /* @__PURE__ */ Yt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ A(e), s = /* @__PURE__ */ Xt(e), e = ft(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? $t(M(e[n])) : M(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		if (!Number.isInteger(e) || e < 0) i = [];
		else {
			i = Array(e);
			for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
		}
	} else if (S(e)) {
		if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
		else {
			let n = Object.keys(e);
			i = Array(n.length);
			for (let r = 0, o = n.length; r < o; r++) {
				let o = n[r];
				i[r] = t(e[o], o, r, a && a[r]);
			}
		}
	} else i = [];
	return n && (n[r] = i), i;
}
var Mr = (e) => e ? Da(e) ? Ia(e) : Mr(e.parent) : null, Nr = /* @__PURE__ */ d(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Mr(e.parent),
	$root: (e) => Mr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Ur(e),
	$forceUpdate: (e) => e.f ||= () => {
		kn(e.update);
	},
	$nextTick: (e) => e.n ||= Dn.bind(e.proxy),
	$watch: (e) => Zn.bind(e)
}), Pr = (e, t) => e !== a && !e.__isScriptSetup && m(e, t), Fr = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: r, data: i, props: o, accessCache: s, type: c, appContext: l } = e;
		if (t[0] !== "$") {
			let e = s[t];
			if (e !== void 0) switch (e) {
				case 1: return r[t];
				case 2: return i[t];
				case 4: return n[t];
				case 3: return o[t];
			}
			else if (Pr(r, t)) return s[t] = 1, r[t];
			else if (i !== a && m(i, t)) return s[t] = 2, i[t];
			else if (m(o, t)) return s[t] = 3, o[t];
			else if (n !== a && m(n, t)) return s[t] = 4, n[t];
			else Rr && (s[t] = 0);
		}
		let u = Nr[t], d, f;
		if (u) return t === "$attrs" && k(e.attrs, "get", ""), u(e);
		if ((d = c.__cssModules) && (d = d[t])) return d;
		if (n !== a && m(n, t)) return s[t] = 4, n[t];
		if (f = l.config.globalProperties, m(f, t)) return f[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: o } = e;
		return Pr(i, t) ? (i[t] = n, !0) : r !== a && m(r, t) ? (r[t] = n, !0) : m(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: o, type: s } }, c) {
		let l;
		return !!(n[c] || e !== a && c[0] !== "$" && m(e, c) || Pr(t, c) || m(o, c) || m(r, c) || m(Nr, c) || m(i.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? m(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Ir(e) {
	return h(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function Lr(e, t) {
	return !e || !t ? e || t : h(e) && h(t) ? e.concat(t) : d({}, Ir(e), Ir(t));
}
var Rr = !0;
function zr(e) {
	let t = Ur(e), n = e.proxy, r = e.ctx;
	Rr = !1, t.beforeCreate && Vr(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: c, provide: l, inject: u, created: d, beforeMount: f, mounted: p, beforeUpdate: m, updated: g, activated: _, deactivated: v, beforeDestroy: b, beforeUnmount: x, destroyed: C, unmounted: ee, render: te, renderTracked: ne, renderTriggered: re, errorCaptured: ie, serverPrefetch: ae, expose: oe, inheritAttrs: se, components: w, directives: ce, filters: le } = t;
	if (u && Br(u, r, null), o) for (let e in o) {
		let t = o[e];
		y(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		S(t) && (e.data = /* @__PURE__ */ Gt(t));
	}
	if (Rr = !0, a) for (let e in a) {
		let t = a[e], i = Ra({
			get: y(t) ? t.bind(n, n) : y(t.get) ? t.get.bind(n, n) : s,
			set: !y(t) && y(t.set) ? t.set.bind(n) : s
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (c) for (let e in c) Hr(c[e], r, n, e);
	if (l) {
		let e = y(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Wn(t, e[t]);
		});
	}
	d && Vr(d, e, "c");
	function T(e, t) {
		h(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (T(br, f), T(xr, p), T(Sr, m), T(Cr, g), T(mr, _), T(hr, v), T(kr, ie), T(Or, ne), T(Dr, re), T(wr, x), T(Tr, ee), T(Er, ae), h(oe)) {
		if (oe.length) {
			let t = e.exposed ||= {};
			oe.forEach((e) => {
				Object.defineProperty(t, e, {
					get: () => n[e],
					set: (t) => n[e] = t,
					enumerable: !0
				});
			});
		} else e.exposed ||= {};
	}
	te && e.render === s && (e.render = te), se != null && (e.inheritAttrs = se), w && (e.components = w), ce && (e.directives = ce), ae && sr(e);
}
function Br(e, t, n = s) {
	h(e) && (e = Jr(e));
	for (let n in e) {
		let r = e[n], i;
		i = S(r) ? "default" in r ? Gn(r.from || n, r.default, !0) : Gn(r.from || n) : Gn(r), /* @__PURE__ */ N(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Vr(e, t, n) {
	vn(h(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Hr(e, t, n, r) {
	let i = r.includes(".") ? Qn(n, r) : () => n[r];
	if (b(e)) {
		let n = t[e];
		y(n) && Yn(i, n);
	} else if (y(e)) Yn(i, e.bind(n));
	else if (S(e)) {
		if (h(e)) e.forEach((e) => Hr(e, t, n, r));
		else {
			let r = y(e.handler) ? e.handler.bind(n) : t[e.handler];
			y(r) && Yn(i, r, e);
		}
	}
}
function Ur(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Wr(c, e, o, !0)), Wr(c, t, o)), S(t) && a.set(t, c), c;
}
function Wr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Wr(e, a, n, !0), i && i.forEach((t) => Wr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Gr[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Gr = {
	data: Kr,
	props: Xr,
	emits: Xr,
	methods: Yr,
	computed: Yr,
	beforeCreate: F,
	created: F,
	beforeMount: F,
	mounted: F,
	beforeUpdate: F,
	updated: F,
	beforeDestroy: F,
	beforeUnmount: F,
	destroyed: F,
	unmounted: F,
	activated: F,
	deactivated: F,
	errorCaptured: F,
	serverPrefetch: F,
	components: Yr,
	directives: Yr,
	watch: Zr,
	provide: Kr,
	inject: qr
};
function Kr(e, t) {
	return t ? e ? function() {
		return d(y(e) ? e.call(this, this) : e, y(t) ? t.call(this, this) : t);
	} : t : e;
}
function qr(e, t) {
	return Yr(Jr(e), Jr(t));
}
function Jr(e) {
	if (h(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function F(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Yr(e, t) {
	return e ? d(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Xr(e, t) {
	return e ? h(e) && h(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : d(/* @__PURE__ */ Object.create(null), Ir(e), Ir(t ?? {})) : t;
}
function Zr(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = d(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = F(e[r], t[r]);
	return n;
}
function Qr() {
	return {
		app: null,
		config: {
			isNativeTag: c,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var $r = 0;
function ei(e, t) {
	return function(n, r = null) {
		y(n) || (n = d({}, n)), r != null && !S(r) && (r = null);
		let i = Qr(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: $r++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: za,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && y(e.install) ? (a.add(e), e.install(c, ...t)) : y(e) && (a.add(e), e(c, ...t))), c;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), c;
			},
			component(e, t) {
				return t ? (i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (!s) {
					let u = c._ceVNode || sa(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, Ia(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (vn(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = ti;
				ti = c;
				try {
					return e();
				} finally {
					ti = t;
				}
			}
		};
		return c;
	};
}
var ti = null;
function ni(e, t, n = a) {
	let r = Sa(), i = w(t), o = le(t), s = ri(e, i), c = cn((s, c) => {
		let l, u = a, d;
		return Jn(() => {
			let t = e[i];
			E(l, t) && (l = t, c());
		}), {
			get() {
				return s(), n.get ? n.get(l) : l;
			},
			set(e) {
				let s = n.set ? n.set(e) : e;
				if (!E(s, l) && !(u !== a && E(e, u))) return;
				let f = r.vnode.props, p = !!(f && (t in f || i in f || o in f) && (`onUpdate:${t}` in f || `onUpdate:${i}` in f || `onUpdate:${o}` in f));
				p || (l = e, c()), r.emit(`update:${t}`, s), E(e, u) && (E(e, s) && !E(s, d) || p && u !== a && !E(s, l)) && c(), u = e, d = s;
			}
		};
	});
	return c[Symbol.iterator] = () => {
		let e = 0;
		return { next() {
			return e < 2 ? {
				value: e++ ? s || a : c,
				done: !1
			} : { done: !0 };
		} };
	}, c;
}
var ri = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${w(t)}Modifiers`] || e[`${le(t)}Modifiers`];
function ii(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || a, i = n, o = t.startsWith("update:"), s = o && ri(r, t.slice(7));
	s && (s.trim && (i = n.map((e) => b(e) ? e.trim() : e)), s.number && (i = i.map(pe)));
	let c, l = r[c = ue(t)] || r[c = ue(w(t))];
	!l && o && (l = r[c = ue(le(t))]), l && vn(l, e, 6, i);
	let u = r[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, vn(u, e, 6, i);
	}
}
var ai = /* @__PURE__ */ new WeakMap();
function oi(e, t, n = !1) {
	let r = n ? ai : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!y(e)) {
		let r = (e) => {
			let n = oi(e, t, !0);
			n && (s = !0, d(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (S(e) && r.set(e, null), null) : (h(a) ? a.forEach((e) => o[e] = null) : d(o, a), S(e) && r.set(e, o), o);
}
function si(e, t) {
	return !e || !l(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), m(e, t[0].toLowerCase() + t.slice(1)) || m(e, le(t)) || m(e, t));
}
function ci(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = Bn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = pa(l.call(t, e, d, f, m, p, h)), y = s;
		} else {
			let e = t;
			v = pa(e.length > 1 ? e(f, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(f, null)), y = t.props ? s : di(s);
		}
	} catch (t) {
		Zi.length = 0, yn(t, e, 1), v = sa(Yi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(u) && (y = fi(y, a)), b = ua(b, y, !1, !0));
	}
	return n.dirs && (b = ua(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ir(er(b.type) && rr(b) || b, n.transition), v = b, Bn(_), v;
}
function li(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (ra(r)) {
			if (r.type !== Yi || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var di = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || l(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, fi = (e, t) => {
	let n = {};
	for (let r in e) u(r) && r.slice(9) in t || (n[r] = e[r]);
	return n;
};
function pi(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? mi(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (hi(o, r, n) && !si(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || mi(r, o, l) : !!o;
	return !1;
}
function mi(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (!m(e, a) || hi(t, e, a) && !si(n, a)) return !0;
	}
	return !1;
}
function hi(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && S(r) && S(i) ? !Oe(r, i) : r !== i;
}
function gi({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var _i = {}, vi = () => Object.create(_i), yi = (e) => Object.getPrototypeOf(e) === _i;
function bi(e, t, n, r = !1) {
	let i = {}, a = vi();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Si(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ Kt(i) : e.type.props ? i : a, e.attrs = a;
}
function xi(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ j(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (si(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) {
					if (m(a, o)) u !== a[o] && (a[o] = u, l = !0);
					else {
						let t = w(o);
						i[t] = Ci(c, s, t, u, e, !1);
					}
				} else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Si(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) t && (m(t, a) || (r = le(a)) !== a && m(t, r)) || (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = Ci(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) t && m(t, e) || (delete a[e], l = !0);
	}
	l && ut(e.attrs, "set", "");
}
function Si(e, t, n, r) {
	let [i, o] = e.propsOptions, s = !1, c;
	if (t) for (let a in t) {
		if (ae(a)) continue;
		let l = t[a], u;
		i && m(i, u = w(a)) ? !o || !o.includes(u) ? n[u] = l : (c ||= {})[u] = l : si(e.emitsOptions, a) || a in r && l === r[a] || (r[a] = l, s = !0);
	}
	if (o) {
		let t = /* @__PURE__ */ j(n), r = c || a;
		for (let a = 0; a < o.length; a++) {
			let s = o[a];
			n[s] = Ci(i, t, s, r[s], e, !m(r, s));
		}
	}
	return s;
}
function Ci(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = m(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && y(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Ta(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === le(n)) && (r = !0));
	}
	return r;
}
var wi = /* @__PURE__ */ new WeakMap();
function Ti(e, t, n = !1) {
	let r = n ? wi : t.propsCache, i = r.get(e);
	if (i) return i;
	let s = e.props, c = {}, l = [], u = !1;
	if (!y(e)) {
		let r = (e) => {
			u = !0;
			let [n, r] = Ti(e, t, !0);
			d(c, n), r && l.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!s && !u) return S(e) && r.set(e, o), o;
	if (h(s)) for (let e = 0; e < s.length; e++) {
		let t = w(s[e]);
		Ei(t) && (c[t] = a);
	}
	else if (s) for (let e in s) {
		let t = w(e);
		if (Ei(t)) {
			let n = s[e], r = c[t] = h(n) || y(n) ? { type: n } : d({}, n), i = r.type, a = !1, o = !0;
			if (h(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = y(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				}
				n === "String" && (o = !1);
			}
			else a = y(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || m(r, "default")) && l.push(t);
		}
	}
	let f = [c, l];
	return S(e) && r.set(e, f), f;
}
function Ei(e) {
	return e[0] !== "$" && !ae(e);
}
var Di = (e) => e === "_" || e === "_ctx" || e === "$stable", Oi = (e) => h(e) ? e.map(pa) : [pa(e)], ki = (e, t, n) => {
	if (t._n) return t;
	let r = Vn((...e) => Oi(t(...e)), n);
	return r._c = !1, r;
}, Ai = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Di(n)) continue;
		let i = e[n];
		if (y(i)) t[n] = ki(n, i, r);
		else if (i != null) {
			let e = Oi(i);
			t[n] = () => e;
		}
	}
}, ji = (e, t) => {
	let n = Oi(t);
	e.slots.default = () => n;
}, Mi = (e, t, n) => {
	for (let r in t) (n || !Di(r)) && (e[r] = t[r]);
}, Ni = (e, t, n) => {
	let r = e.slots = vi();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Mi(r, t, n), n && fe(r, "_", e, !0)) : Ai(t, r);
	} else t && ji(e, t);
}, Pi = (e, t, n) => {
	let { vnode: r, slots: i } = e, o = !0, s = a;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? o = !1 : Mi(i, t, n) : (o = !t.$stable, Ai(t, i)), s = t;
	} else t && (ji(e, t), s = { default: 1 });
	if (o) for (let e in i) !Di(e) && s[e] == null && delete i[e];
}, I = qi;
function Fi(e) {
	return Ii(e);
}
function Ii(e, t) {
	let n = he();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = s, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, s = void 0, c = null, l = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !ia(e, t) && (r = Se(e), _e(e, i, a, !0), e = null), t.patchFlag === -2 && (l = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === o && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: u, ref: d, shapeFlag: f } = t;
		switch (u) {
			case Ji:
				y(e, t, n, r);
				break;
			case Yi:
				b(e, t, n, r);
				break;
			case Xi:
				e ?? x(t, n, r, s);
				break;
			case L:
				w(e, t, n, r, i, a, s, c, l);
				break;
			default: f & 1 ? ee(e, t, n, r, i, a, s, c, l) : f & 6 ? ce(e, t, n, r, i, a, s, c, l) : (f & 64 || f & 128) && u.process(e, t, n, r, i, a, s, c, l, we);
		}
		d != null && i ? ur(d, e && e.ref, a, t || e, !t) : d == null && e && e.ref != null && ur(e.ref, null, a, e, !0);
	}, y = (e, t, n, i) => {
		if (e == null) r(t.el = u(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, i) => {
		e == null ? r(t.el = d(t.children || ""), n, i) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = h(e), r(e, n, i), e = a;
		r(t, n, i);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), i(e), e = n;
		i(t);
	}, ee = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) te(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), ie(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, te = (e, t, n, i, a, o, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, o, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && re(e.children, d, null, i, a, Li(e, o), s, u), _ && Un(e, null, i, "created"), ne(d, e, e.scopeId, s, i), m) {
			for (let e in m) e !== "value" && !ae(e) && c(d, e, null, m[e], o, i);
			"value" in m && c(d, "value", null, m.value, o), (f = m.onVnodeBeforeMount) && _a(f, i, e);
		}
		_ && Un(e, null, i, "beforeMount");
		let v = zi(a, g);
		v ? g.beforeEnter(d) : g && !g.persisted && (d[Ki] = !0), r(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && I(() => {
			try {
				f && _a(f, i, e), v && g.enter(d), _ && Un(e, null, i, "mounted");
			} finally {}
		}, a);
	}, ne = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Gi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ne(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, re = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? ma(e[l]) : pa(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, ie = (e, t, n, r, i, o, s) => {
		let l = t.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = t;
		u |= e.patchFlag & 16;
		let m = e.props || a, h = t.props || a, g;
		if (n && Ri(n, !1), (g = h.onVnodeBeforeUpdate) && _a(g, n, t, e), f && Un(t, e, n, "beforeUpdate"), n && Ri(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? oe(e.dynamicChildren, d, l, n, r, Li(t, i), o) : s || fe(e, t, l, null, n, r, Li(t, i), o, !1), u > 0) {
			if (u & 16) se(l, m, h, n, i);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, i), u & 4 && c(l, "style", m.style, h.style, i), u & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], a = m[r], o = h[r];
					(o !== a || r === "value") && c(l, r, a, o, i, n);
				}
			}
			u & 1 && e.children !== t.children && p(l, t.children);
		} else !s && d == null && se(l, m, h, n, i);
		((g = h.onVnodeUpdated) || f) && I(() => {
			g && _a(g, n, t, e), f && Un(t, e, n, "updated");
		}, r);
	}, oe = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el || Wi(c), d = u && (c.type === L || !ia(c, l) || c.shapeFlag & 198) ? m(u) : n;
			v(c, l, d, null, r, i, a, o, !0);
		}
	}, se = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== a) for (let a in t) !ae(a) && !(a in n) && c(e, a, t[a], null, i, r);
			for (let a in n) {
				if (ae(a)) continue;
				let o = n[a], s = t[a];
				o !== s && a !== "value" && c(e, a, s, o, i, r);
			}
			"value" in n && c(e, "value", t.value, n.value, i);
		}
	}, w = (e, t, n, i, a, o, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), re(t.children || [], n, f, a, o, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (oe(e.dynamicChildren, m, n, a, o, s, c), (t.key != null || a && t === a.subTree) && Bi(e, t, !0)) : fe(e, t, n, f, a, o, s, c, l);
	}, ce = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : le(t, n, r, i, a, o, c) : T(e, t, c);
	}, le = (e, t, n, r, i, a, o) => {
		let s = e.component = xa(e, r, i);
		if (pr(e) && (s.ctx.renderer = we), ka(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ue, o, a), !e.el) {
				let r = s.subTree = sa(Yi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ue(s, e, t, n, i, a, o);
	}, T = (e, t, n) => {
		let r = t.component = e.component;
		if (pi(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, t.placeholder = e.placeholder, E(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, t.placeholder = e.placeholder, r.vnode = t;
	}, ue = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Hi(e);
					if (n) {
						t && (t.el = c.el, E(e, t, o)), n.asyncDep.then(() => {
							let t = () => {
								e.job.flags & 8 || (i && i.pendingBranch ? I(t, i) : l());
							};
							t.flags = 48, I(t, i);
						});
						return;
					}
				}
				let u = t, d;
				Ri(e, !1), t ? (t.el = c.el, E(e, t, o)) : t = c, n && de(n), (d = t.props && t.props.onVnodeBeforeUpdate) && _a(d, s, t, c), Ri(e, !0);
				let f = ci(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el || Wi(p)), Se(p), e, i, a), t.el = f.el, u === null && gi(e, f.el), r && I(r, i), (d = t.props && t.props.onVnodeUpdated) && I(() => _a(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = fr(t);
				if (Ri(e, !1), l && de(l), !m && (o = c && c.onVnodeBeforeMount) && _a(o, d, t), Ri(e, !0), s && Ee) {
					let t = () => {
						e.subTree = ci(e), Ee(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = ci(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && I(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					I(() => _a(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && fr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && I(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Re(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => kn(u), Ri(e, !0), l();
	}, E = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, xi(e, t.props, r, n), Pi(e, t.children, n), $e(), Mn(e), et();
	}, fe = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				me(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				pe(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && xe(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? me(l, d, n, r, i, a, o, s, c) : xe(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && re(d, n, r, i, a, o, s, c));
	}, pe = (e, t, n, r, i, a, s, c, l) => {
		e ||= o, t ||= o;
		let u = e.length, d = t.length, f = Math.min(u, d), p = 0;
		for (; p < f; p++) {
			let r = t[p] = l ? ma(t[p]) : pa(t[p]);
			v(e[p], r, n, null, i, a, s, c, l);
		}
		u > d ? xe(e, i, a, !0, !1, f) : re(t, n, r, i, a, s, c, l, f);
	}, me = (e, t, n, r, i, a, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let r = e[u], o = t[u] = l ? ma(t[u]) : pa(t[u]);
			if (ia(r, o)) v(r, o, n, null, i, a, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let r = e[f], o = t[p] = l ? ma(t[p]) : pa(t[p]);
			if (ia(r, o)) v(r, o, n, null, i, a, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, o = e < d ? t[e].el : r;
				for (; u <= p;) v(null, t[u] = l ? ma(t[u]) : pa(t[u]), n, o, i, a, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) _e(e[u], i, a, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? ma(t[u]) : pa(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let r = e[u];
				if (y >= b) {
					_e(r, i, a, !0);
					continue;
				}
				let o;
				if (r.key != null) o = g.get(r.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && ia(r, t[_])) {
					o = _;
					break;
				}
				o === void 0 ? _e(r, i, a, !0) : (C[o - h] = u + 1, o >= S ? S = o : x = !0, v(r, t[o], n, null, i, a, s, c, l), y++);
			}
			let ee = x ? Vi(C) : o;
			for (_ = ee.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, o = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Wi(f) : r;
				C[u] === 0 ? v(null, o, n, p, i, a, s, c, l) : x && (_ < 0 || u !== ee[_] ? ge(o, n, p, 2) : _--);
			}
		}
	}, ge = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) ge(e.component.subTree, t, n, a);
		else if (d & 128) e.suspense.move(t, n, a);
		else if (d & 64) c.move(e, t, n, we);
		else if (c === L) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) ge(u[e], t, n, a);
			r(e.anchor, t, n);
		} else if (c === Xi) S(e, t, n);
		else if (a !== 2 && d & 1 && l) {
			if (a === 0) l.persisted && !s[tr] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), I(() => l.enter(s), o));
			else {
				let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? i(s) : r(s, t, n);
				}, d = () => {
					let e = s._isLeaving || !!s[tr];
					s._isLeaving && s[tr](!0), l.persisted && !e ? u() : a(s, () => {
						u(), c && c();
					});
				};
				o ? o(s, u, d) : d();
			}
		} else r(s, t, n);
	}, _e = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && ($e(), ur(s, null, n, e, !0), et()), p == null || e.ctx && e.ctx !== t || (t.renderCache[p] = void 0), u & 256 && t.ctx.deactivate(e)) return;
		let h = u & 1 && f, g = !fr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && _a(_, t, e), u & 6) be(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Un(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, we, r) : l && !l.hasOnce && (a !== L || d > 0 && d & 64) ? xe(l, t, n, !1, !0) : (a === L && d & 384 || !i && u & 16) && xe(c, t, n), r && ve(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && I(() => {
			_ && _a(_, t, e), h && Un(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, ve = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e, o = t === L;
		if (o && !a) {
			ye(n, r);
			return;
		}
		if (t === Xi) {
			C(e), a && !a.persisted && a.afterLeave && a.afterLeave();
			return;
		}
		let s = o ? ar(e) : e, c = () => {
			o ? m(n) && ye(n, r) : i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (s && s.shapeFlag & 1 && a && !a.persisted) {
			let { leave: e, delayLeave: t } = a, n = s.el, r = () => e(n, c);
			t ? t(n, c, r) : r();
		} else c();
	}, ye = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), i(e), e = n;
		i(t);
	}, be = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Ui(c), Ui(l), r && de(r), i.stop(), a ? (a.flags |= 8, _e(o, e, t, n)) : o && (o.transition = e.vnode.transition, _e(o, e, t, n)), s && I(s, t);
		let u = () => {
			e.isUnmounted = !0;
		};
		u.flags = 16, I(u, t);
	}, xe = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) _e(e[o], t, n, r, i);
	}, Se = (e) => {
		if (e.shapeFlag & 6) return Se(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[$n];
		return n ? h(n) : t;
	}, Ce = (e, t, n) => {
		Fn(() => {
			e == null ? t._vnode && _e(t._vnode, null, null, !0) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e;
		}, e && t._vnode ? void 0 : e && e.component ? e.component.uid : ba());
	}, we = {
		p: v,
		um: _e,
		m: ge,
		r: ve,
		mt: le,
		mc: re,
		pc: fe,
		pbc: oe,
		n: Se,
		o: e
	}, Te, Ee;
	return t && ([Te, Ee] = t(we)), {
		render: Ce,
		hydrate: Te,
		createApp: ei(Ce, Te)
	};
}
function Li({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ri({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function zi(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Bi(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (h(r) && h(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = ma(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Bi(t, a)), a.type === Ji && (a.patchFlag === -1 && (a = i[e] = ma(a)), a.el = t.el), a.type === Yi && !a.el && (a.el = t.el);
	}
}
function Vi(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Hi(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Hi(t);
}
function Ui(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Wi(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	if (t) return Wi(t.subTree);
	let n = e.suspense;
	return n && n.activeBranch ? Wi(n.activeBranch) : null;
}
var Gi = (e) => e.__isSuspense, Ki = /* @__PURE__ */ Symbol("_deferredEnter");
function qi(e, t) {
	t && t.pendingBranch ? h(e) ? t.effects.push(...e) : t.effects.push(e) : jn(e);
}
var L = /* @__PURE__ */ Symbol.for("v-fgt"), Ji = /* @__PURE__ */ Symbol.for("v-txt"), Yi = /* @__PURE__ */ Symbol.for("v-cmt"), Xi = /* @__PURE__ */ Symbol.for("v-stc"), Zi = [], R = null;
function z(e = !1) {
	Zi.push(R = e ? null : []);
}
function Qi() {
	Zi.pop(), R = Zi[Zi.length - 1] || null;
}
var $i = 1;
function ea(e, t = !1) {
	$i += e, e < 0 && R && t && (R.hasOnce = !0);
}
function ta(e) {
	return e.dynamicChildren = $i > 0 ? R || o : null, Qi(), $i > 0 && R && R.push(e), e;
}
function B(e, t, n, r, i, a) {
	return ta(V(e, t, n, r, i, a, !0));
}
function na(e, t, n, r, i) {
	return ta(sa(e, t, n, r, i, !0));
}
function ra(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function ia(e, t) {
	return e.type === t.type && e.key === t.key;
}
var aa = ({ key: e }) => e ?? null, oa = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : b(e) || /* @__PURE__ */ N(e) || y(e) ? {
	i: Rn,
	r: e,
	k: t,
	f: !!n
} : e);
function V(e, t = null, n = null, r = 0, i = null, a = e === L ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && aa(t),
		ref: t && oa(t),
		scopeId: zn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: Rn
	};
	return s ? (ha(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= b(n) ? 8 : 16), $i > 0 && !o && R && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && R.push(c), c;
}
var sa = ca;
function ca(e, t = null, n = null, r = 0, i = null, a = !1) {
	if (e && e !== Ar || (e = Yi), ra(e)) {
		let r = ua(e, t, !0);
		return n && ha(r, n), $i > 0 && !a && R && (r.shapeFlag & 6 ? R[R.indexOf(e)] = r : R.push(r)), r.patchFlag = -2, r;
	}
	if (La(e) && (e = e.__vccOpts), t) {
		t = la(t);
		let { class: e, style: n } = t;
		e && !b(e) && (t.class = xe(e)), S(n) && (/* @__PURE__ */ Zt(n) && !h(n) && (n = d({}, n)), t.style = ge(n));
	}
	let o = b(e) ? 1 : Gi(e) ? 128 : er(e) ? 64 : S(e) ? 4 : y(e) ? 2 : 0;
	return V(e, t, n, r, i, o, a, !0);
}
function la(e) {
	return e ? /* @__PURE__ */ Zt(e) ? d({}, e) : yi(e) ? d({}, e[Na] || e) : e : null;
}
function ua(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? ga(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && aa(l),
		ref: t && t.ref ? n && a ? h(a) ? a.concat(oa(t)) : [a, oa(t)] : oa(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== L ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && ua(e.ssContent),
		ssFallback: e.ssFallback && ua(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && ir(u, c.clone(u)), u;
}
function da(e = " ", t = 0) {
	return sa(Ji, null, e, t);
}
function fa(e = "", t = !1) {
	return t ? (z(), na(Yi, null, e)) : sa(Yi, null, e);
}
function pa(e) {
	return e == null || typeof e == "boolean" ? sa(Yi) : h(e) ? sa(L, null, e.slice()) : ra(e) ? ma(e) : sa(Ji, null, String(e));
}
function ma(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : ua(e);
}
function ha(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (h(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), ha(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !yi(t) ? t._ctx = Rn : r === 3 && Rn && (Rn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (y(t)) {
		if (r & 65) {
			ha(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: Rn
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [da(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function ga(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = xe([t.class, r.class]));
		else if (e === "style") t.style = ge([t.style, r.style]);
		else if (l(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(h(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !u(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function _a(e, t, n, r = null) {
	vn(e, t, 7, [n, r]);
}
var va = /* @__PURE__ */ Qr(), ya = 0;
function ba() {
	return ya;
}
function xa(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || va, o = {
		uid: ya++,
		vnode: e,
		type: r,
		parent: t,
		appContext: i,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Pe(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(i.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: Ti(r, i),
		emitsOptions: oi(r, i),
		emit: null,
		emitted: null,
		propsDefaults: a,
		inheritAttrs: r.inheritAttrs,
		ctx: a,
		data: a,
		props: a,
		attrs: a,
		slots: a,
		refs: a,
		setupState: a,
		setupContext: null,
		suspense: n,
		suspenseId: n ? n.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = ii.bind(null, o), e.ce && e.ce(o), o;
}
var H = null, Sa = () => H || Rn, Ca, wa;
{
	let e = he(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Ca = t("__VUE_INSTANCE_SETTERS__", (e) => H = e), wa = t("__VUE_SSR_SETTERS__", (e) => Oa = e);
}
var Ta = (e) => {
	let t = H;
	return Ca(e), e.scope.on(), () => {
		e.scope.off(), Ca(t);
	};
}, Ea = () => {
	H && H.scope.off(), Ca(null);
};
function Da(e) {
	return e.vnode.shapeFlag & 4;
}
var Oa = !1;
function ka(e, t = !1, n = !1) {
	t && wa(t);
	let { props: r, children: i } = e.vnode, a = Da(e);
	bi(e, r, a, t), Ni(e, i, n || t);
	let o = a ? Aa(e, t) : void 0;
	return t && wa(!1), o;
}
function Aa(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Fr);
	let { setup: r } = n;
	if (r) {
		$e();
		let n = e.setupContext = r.length > 1 ? Fa(e) : null, i = Ta(e), a = _n(r, e, 0, [e.props, n]), o = C(a);
		if (et(), i(), (o || e.sp) && !fr(e) && sr(e), o) {
			if (a.then(Ea, Ea), t) return a.then((n) => {
				wa(!0);
				try {
					ja(e, n, t);
				} finally {
					wa(!1);
				}
			}).catch((t) => {
				yn(t, e, 0, void 0, !0), e.ssrRender = (e, t) => t("<!---->");
			});
			e.asyncDep = a;
		} else ja(e, a, t);
	} else Ma(e, t);
}
function ja(e, t, n) {
	y(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : S(t) && (e.setupState = on(t)), Ma(e, n);
}
function Ma(e, t, n) {
	let r = e.type;
	e.render ||= r.render || s;
	{
		let t = Ta(e);
		$e();
		try {
			zr(e);
		} finally {
			et(), t();
		}
	}
}
var Na = /* @__PURE__ */ Symbol(), Pa = { get(e, t) {
	return k(e, "get", ""), t === Na ? e : e[t];
} };
function Fa(e) {
	return {
		attrs: new Proxy(e.attrs, Pa),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Ia(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(on(Qt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Nr) return Nr[n](e);
		},
		has(e, t) {
			return t in e || t in Nr;
		}
	}) : e.proxy;
}
function La(e) {
	return y(e) && "__vccOpts" in e;
}
var Ra = (e, t) => /* @__PURE__ */ un(e, t, Oa), za = "3.5.45", Ba = void 0, Va = typeof window < "u" && window.trustedTypes;
if (Va) try {
	Ba = /* @__PURE__ */ Va.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Ha = Ba ? (e) => Ba.createHTML(e) : (e) => e, Ua = "http://www.w3.org/2000/svg", Wa = "http://www.w3.org/1998/Math/MathML", Ga = typeof document < "u" ? document : null, Ka = Ga && /* @__PURE__ */ Ga.createElement("template"), qa = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Ga.createElementNS(Ua, e) : t === "mathml" ? Ga.createElementNS(Wa, e) : n ? Ga.createElement(e, { is: n }) : Ga.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Ga.createTextNode(e),
	createComment: (e) => Ga.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Ga.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			Ka.innerHTML = Ha(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Ka.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Ja = /* @__PURE__ */ Symbol("_vtc");
function Ya(e, t, n) {
	let r = e[Ja];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Xa = /* @__PURE__ */ Symbol("_vod"), Za = /* @__PURE__ */ Symbol("_vsh"), Qa = /* @__PURE__ */ Symbol(""), $a = /(?:^|;)\s*display\s*:/;
function eo(e, t, n) {
	let r = e.style, i = b(n), a = !1;
	if (n && !i) {
		if (t) {
			if (b(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? no(r, t, "");
			}
			else for (let e in t) n[e] ?? no(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? no(r, i, "") : oo(e, i, !b(t) && t ? t[i] : void 0, o) || no(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Qa];
			e && (n += ";" + e), r.cssText = n, a = $a.test(n);
		}
	} else t && e.removeAttribute("style");
	Xa in e && (i && t === n || (e[Xa] = a ? r.display : ""), e[Za] && (r.display = "none"));
}
var to = /\s*!important$/;
function no(e, t, n) {
	if (h(n)) n.forEach((n) => no(e, t, n));
	else if (n ??= "", t.startsWith("--")) to.test(n) ? e.setProperty(t, n.replace(to, ""), "important") : e.setProperty(t, n);
	else {
		let r = ao(e, t);
		to.test(n) ? e.setProperty(le(r), n.replace(to, ""), "important") : e[r] = n;
	}
}
var ro = [
	"Webkit",
	"Moz",
	"ms"
], io = {};
function ao(e, t) {
	let n = io[t];
	if (n) return n;
	let r = w(t);
	if (r !== "filter" && r in e) return io[t] = r;
	r = T(r);
	for (let n = 0; n < ro.length; n++) {
		let i = ro[n] + r;
		if (i in e) return io[t] = i;
	}
	return t;
}
function oo(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && b(r) && n === r;
}
var so = "http://www.w3.org/1999/xlink";
function co(e, t, n, r, i, a = Se(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(so, t.slice(6, t.length)) : e.setAttributeNS(so, t, n) : n == null || a && !Ce(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : x(n) ? String(n) : n);
}
function lo(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Ha(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		r === i && "_value" in e || (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = Ce(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function uo(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function fo(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var po = /* @__PURE__ */ Symbol("_vei");
function mo(e, t, n, r, i = null) {
	let a = e[po] || (e[po] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = _o(t);
		r ? uo(e, n, a[t] = xo(r, i), s) : o && (fo(e, n, o, s), a[t] = void 0);
	}
}
var ho = /(Once|Passive|Capture)$/, go = /^on:?(?:Once|Passive|Capture)$/;
function _o(e) {
	let t, n;
	for (; (n = e.match(ho)) && !go.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : le(e.slice(2)), t];
}
var vo = 0, yo = /* @__PURE__ */ Promise.resolve(), bo = () => vo ||= (yo.then(() => vo = 0), Date.now());
function xo(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (h(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && vn(e, t, 5, a);
			}
		} else vn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = bo(), n;
}
var So = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Co = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Ya(e, r, o) : t === "style" ? eo(e, n, r) : l(t) ? u(t) || mo(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : wo(e, t, r, o)) ? (lo(e, t, r), e.tagName.includes("-") || t !== "value" && t !== "checked" && t !== "selected" || co(e, t, r, o, a, t !== "value")) : e._isVueCE && (To(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !b(r))) ? lo(e, w(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), co(e, t, r, o));
};
function wo(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && So(t) && y(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return So(t) && b(n) ? !1 : t in e;
}
function To(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = w(t);
	return Array.isArray(n) ? n.some((e) => w(e) === r) : Object.keys(n).some((e) => w(e) === r);
}
var Eo = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return h(t) ? (e) => de(t, e) : t;
};
function Do(e) {
	e.target.composing = !0;
}
function Oo(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var ko = /* @__PURE__ */ Symbol("_assign"), Ao = /* @__PURE__ */ Symbol("_initialValue");
function jo(e, t, n) {
	return t && (e = e.trim()), n && (e = pe(e)), e;
}
var Mo = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[Ao] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Ao] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[ko] = Eo(i);
		let a = r || i.props && i.props.type === "number";
		uo(e, t ? "change" : "input", (t) => {
			t.target.composing || e[ko](jo(e.value, n, a));
		}), (n || a) && uo(e, "change", () => {
			e.value = jo(e.value, n, a);
		}), t || (uo(e, "compositionstart", Do), uo(e, "compositionend", Oo), uo(e, "change", Oo));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[Ao];
		delete e[Ao], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[ko](jo(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[ko] = Eo(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? pe(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, No = {
	deep: !0,
	created(e, t, n) {
		e[ko] = Eo(n), uo(e, "change", () => {
			let t = e._modelValue, n = Ro(e), r = e.checked, i = e[ko];
			if (h(t)) {
				let e = ke(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (_(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(zo(e, r));
		});
	},
	mounted: Po,
	beforeUpdate(e, t, n) {
		e[ko] = Eo(n), Po(e, t, n);
	}
};
function Po(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (h(t)) i = ke(t, r.props.value) > -1;
	else if (_(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Oe(t, zo(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Fo = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, uo(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? pe(Ro(e)) : Ro(e)), r = e.multiple, i = r ? _(e._modelValue) ? new Set(t) : t : t[0], a = e._pendingValue = [r, r ? h(i) ? t.slice() : t : i];
			try {
				e[ko](i);
			} finally {
				Dn(() => {
					e._pendingValue === a && (e._pendingValue = void 0);
				});
			}
		}), e[ko] = Eo(r);
	},
	mounted(e, { value: t, modifiers: { number: n } }) {
		Lo(e, t, n);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[ko] = Eo(n);
	},
	updated(e, { value: t, modifiers: { number: n } }) {
		let r = e._pendingValue;
		e._pendingValue = void 0, r && r[0] === e.multiple && Io(t, r[1], r[0]) || Lo(e, t, n);
	}
};
function Io(e, t, n) {
	if (!n || h(e)) return Oe(e, t);
	if (_(e)) {
		if (e.size !== t.length) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	return !1;
}
function Lo(e, t, n = !1) {
	let r = e.multiple, i = h(t);
	if (!r || i || _(t)) {
		for (let a = 0, o = e.options.length; a < o; a++) {
			let o = e.options[a], s = Ro(o);
			if (r) {
				if (i) {
					let e = typeof s;
					o.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(s)) : ke(t, s) > -1;
				} else o.selected = t.has(s) || n && typeof s == "string" && t.has(pe(s));
			} else if (Oe(Ro(o), t)) {
				e.selectedIndex !== a && (e.selectedIndex = a);
				return;
			}
		}
		!r && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Ro(e) {
	return "_value" in e ? e._value : e.value;
}
function zo(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Bo = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Vo = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => Bo.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ho = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Vo[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Uo = /* @__PURE__ */ d({ patchProp: Co }, qa), Wo;
function Go() {
	return Wo ||= Fi(Uo);
}
var Ko = ((...e) => {
	let t = Go().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Jo(e);
		if (!r) return;
		let i = t._component;
		y(i) || i.render || i.template || (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, qo(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function qo(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Jo(e) {
	return b(e) ? document.querySelector(e) : e;
}
// node_modules/pinia/dist/pinia.mjs
var Yo = typeof window < "u", Xo = Symbol(), Zo;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Zo ||= {});
var Qo = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function $o(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function es(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		as(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function ts(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function ns(e) {
	try {
		e.dispatchEvent(new MouseEvent("click"));
	} catch {
		let t = new MouseEvent("click", {
			bubbles: !0,
			cancelable: !0,
			view: window,
			detail: 0,
			screenX: 80,
			screenY: 20,
			clientX: 80,
			clientY: 20,
			ctrlKey: !1,
			altKey: !1,
			shiftKey: !1,
			metaKey: !1,
			button: 0,
			relatedTarget: null
		});
		e.dispatchEvent(t);
	}
}
var rs = typeof navigator == "object" ? navigator : { userAgent: "" }, is = /Macintosh/.test(rs.userAgent) && /AppleWebKit/.test(rs.userAgent) && !/Safari/.test(rs.userAgent), as = Yo ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !is ? os : "msSaveOrOpenBlob" in rs ? ss : cs : () => {};
function os(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? ns(r) : ts(r.href) ? es(e, t, n) : (r.target = "_blank", ns(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		ns(r);
	}, 0));
}
function ss(e, t = "download", n) {
	if (typeof e == "string") {
		if (ts(e)) es(e, t, n);
		else {
			let t = document.createElement("a");
			t.href = e, t.target = "_blank", setTimeout(function() {
				ns(t);
			});
		}
	} else navigator.msSaveOrOpenBlob($o(e, n), t);
}
function cs(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return es(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(Qo.HTMLElement)) || "safari" in Qo, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || is) && typeof FileReader < "u") {
		let t = new FileReader();
		t.onloadend = function() {
			let e = t.result;
			if (typeof e != "string") throw r = null, Error("Wrong reader.result type");
			e = o ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = e : location.assign(e), r = null;
		}, t.readAsDataURL(e);
	} else {
		let t = URL.createObjectURL(e);
		r ? r.location.assign(t) : location.href = t, r = null, setTimeout(function() {
			URL.revokeObjectURL(t);
		}, 4e4);
	}
}
var { assign: ls } = Object;
function us() {
	let e = Fe(!0), t = e.run(() => /* @__PURE__ */ en({})), n = [], r = [], i = Qt({
		install(e) {
			i._a = e, e.provide(Xo, i), e.config.globalProperties.$pinia = i, r.forEach((e) => n.push(e)), r = [];
		},
		use(e) {
			return this._a ? n.push(e) : r.push(e), this;
		},
		_p: n,
		_a: null,
		_e: e,
		_s: /* @__PURE__ */ new Map(),
		state: t
	});
	return i;
}
var { assign: ds } = Object, fs = class {
	#e;
	createRoot() {
		let e = document.createElement("div");
		return e.classList.add("wfrp4e-compatibility-box-root"), e.dataset.theme = "wfrp4e-compatibility-box", e;
	}
	mount(e, t, n, r) {
		this.unmount(), t.classList.add("wfrp4e-compatibility-box-app"), t.replaceChildren(e), this.#e = Ko(n, r), this.#e.use(us()), this.#e.mount(e);
	}
	unmount() {
		this.#e?.unmount(), this.#e = void 0;
	}
}, ps = class extends foundry.applications.api.ApplicationV2 {
	#e = new fs();
	getVueProps() {}
	async _renderHTML(e, t) {
		return this.#e.createRoot();
	}
	_replaceHTML(e, t, n) {
		this.#e.mount(e, t, this.getVueComponent(), this.getVueProps() ?? {});
	}
	async _preClose(e) {
		this.#e.unmount(), await super._preClose(e);
	}
};
// src/module/foundry/notifications/notify-user.ts
function ms(e, t) {
	t === void 0 ? console.error(e) : console.error(e, t);
}
function hs(e, t) {
	ms(e, t), ui?.notifications?.error(e);
}
// src/module/foundry/integrations/is-module-active.ts
function U(e) {
	if (typeof game > "u" || !game) throw Error("Optional module integrations require an initialized Foundry game.");
	return game.modules.get(e)?.active === !0;
}
// src/module/foundry/settings/optional-features.ts
var gs = {
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
function _s(e) {
	return gs[e].targetModuleIds.every((e) => U(e));
}
// src/module/foundry/integrations/bossbar/constants.ts
var vs = "bossbar", W = {
	automatic: "bossBarAutoSelect",
	frameless: "bossBarRemoveFrame",
	stacked: "bossBarStackWounds",
	woundsStyle: "bossBarWoundsStyle",
	ignorePrompt: "bossBarIgnorePresetPrompt"
}, ys = [
	"automatic",
	"frameless",
	"stacked"
], bs = {
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
}, xs = /* @__PURE__ */ new Map();
function Ss(e) {
	for (let [t, n] of xs) n.group === e && xs.delete(t);
}
function Cs(e, t, n) {
	xs.set(t, {
		group: e,
		action: n
	});
}
function ws(e) {
	return [...xs].filter(([, t]) => t.group === e).map(([e, t]) => [e, t.action]);
}
// src/module/foundry/settings/groups/controls.ts
function Ts(e) {
	for (let t of [
		"presets",
		"calendars",
		"world",
		"integrations"
	]) if (ws(t).some(([, t]) => t.settingKey === e)) return t;
	if (["simpleCalendarEnabled", "simpleTimekeepingEnabled"].includes(e) || /^ignoreSettingsPreset-(foundryvtt-simple-calendar-reborn|simple-timekeeping)$/.test(e)) return "calendars";
	if (e.startsWith("ignoreSettingsPreset-")) return "presets";
	if ([
		"keepWfrpImportedContentTidy",
		"keepWfrpCompendiumsTidy",
		"keepImportedContentTidy"
	].includes(e)) return "world";
	if ([
		...Object.values(gs).map((e) => e.settingKey),
		...Object.values(W),
		"argonCombatItemPatterns"
	].includes(e)) return "integrations";
}
function Es(t) {
	return [...game?.settings.settings ?? []].flatMap(([n, r]) => {
		if (!n.startsWith("wfrp4e-compatibility-box.")) return [];
		let i = n.slice(e.length + 1);
		if (Ts(i) !== t) return [];
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
function Ds() {
	if (!game?.ready || !game.user?.isGM) throw Error("A GM in a loaded world is required to configure Compatibility Box.");
}
async function Os(t, n, r) {
	Ds();
	let i = Es(t), a = n.filter((e) => r[e.key] !== e.value);
	for (let e of a) {
		let t = i.find((t) => t.key === e.key);
		if (!t || t.value !== e.value) throw Error("These settings changed in another window. Reopen this window before saving.");
		let n = r[e.key];
		if (e.type === Boolean && typeof n != "boolean" || e.type === String && typeof n != "string" || t.choices && !Object.hasOwn(t.choices, String(n))) throw Error(`Choose a valid value for ${e.name}.`);
	}
	for (let t of a) Ds(), await game.settings.set(e, t.key, r[t.key]);
	return a.some((e) => e.requiresReload);
}
// src/module/functions/settings/groups/layout.ts
function ks(e, t) {
	let n = new Set(t.map(([, e]) => e.settingKey));
	return {
		controls: e.filter((e) => !n.has(e.key)),
		actions: t.map(([t, { name: n, label: r, hint: i, icon: a, settingKey: o }]) => ({
			key: t,
			name: n,
			label: r,
			hint: i,
			icon: a,
			controls: e.filter((e) => e.key === o)
		}))
	};
}
function As(e) {
	return Object.fromEntries([...e.controls, ...e.actions.flatMap((e) => e.controls)].map((e) => [e.key, e.value]));
}
// src/module/apps/settings-groups/view/SettingControl.vue?vue&type=script&setup=true&lang.ts
var js = { class: "tw:flex tw:flex-col tw:gap-1" }, Ms = { class: "tw:font-semibold" }, Ns = ["value"], Ps = { class: "tw:text-sm tw:opacity-80" }, Fs = /* @__PURE__ */ or({
	__name: "SettingControl",
	props: /*@__PURE__*/ Lr({ control: {} }, {
		modelValue: {
			type: [Boolean, String],
			required: !0
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = e, n = ni(e, "modelValue"), r = `wfrp-group-${t.control.key}`;
		return (t, i) => (z(), B("div", js, [e.control.type === Boolean ? (z(), B("label", {
			key: 0,
			for: r,
			class: "tw:flex tw:items-center tw:gap-2"
		}, [Hn(V("input", {
			id: r,
			"onUpdate:modelValue": i[0] ||= (e) => n.value = e,
			type: "checkbox",
			class: "tw:dui-checkbox tw:dui-checkbox-sm"
		}, null, 512), [[No, n.value]]), V("span", Ms, je(e.control.name), 1)])) : (z(), B(L, { key: 1 }, [V("label", {
			for: r,
			class: "tw:font-semibold"
		}, je(e.control.name), 1), e.control.choices ? Hn((z(), B("select", {
			key: 0,
			id: r,
			"onUpdate:modelValue": i[1] ||= (e) => n.value = e,
			class: "tw:dui-select tw:dui-select-sm tw:w-full tw:min-w-0"
		}, [(z(!0), B(L, null, jr(e.control.choices, (e, t) => (z(), B("option", {
			key: t,
			value: t
		}, je(e), 9, Ns))), 128))], 512)), [[Fo, n.value]]) : Hn((z(), B("input", {
			key: 1,
			id: r,
			"onUpdate:modelValue": i[2] ||= (e) => n.value = e,
			type: "text",
			class: "tw:dui-input tw:dui-input-sm tw:w-full tw:min-w-0"
		}, null, 512)), [[Mo, n.value]])], 64)), V("p", Ps, je(e.control.hint) + je(e.control.requiresReload && !/reload/i.test(e.control.hint) ? " Requires a reload." : ""), 1)]));
	}
}), Is = { class: "tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-4 tw:overflow-auto" }, Ls = { class: "tw:dui-fieldset-legend" }, Rs = { class: "tw:text-sm tw:opacity-80" }, zs = ["disabled", "onClick"], Bs = { key: 0 }, Vs = { role: "status" }, Hs = { class: "tw:flex tw:gap-2" }, Us = ["disabled"], Ws = ["disabled"], Gs = /* @__PURE__ */ or({
	__name: "SettingsGroupApp",
	props: {
		hint: {},
		layout: {},
		reloadRequired: { type: Boolean },
		save: { type: Function },
		runAction: { type: Function },
		reload: { type: Function }
	},
	setup(e) {
		let t = e, n = /* @__PURE__ */ Gt(As(t.layout)), r = t.layout.controls.length > 0 || t.layout.actions.some((e) => e.controls.length > 0), i = /* @__PURE__ */ en(!1), a = /* @__PURE__ */ en(!1);
		async function o() {
			a.value = !0, await t.save({ ...n });
		}
		async function s(e) {
			a.value = !0;
			try {
				await t.runAction(e);
			} finally {
				a.value = !1;
			}
		}
		return (t, c) => (z(), B("form", {
			class: "tw:flex tw:h-full tw:min-h-0 tw:flex-col tw:gap-3",
			onSubmit: c[1] ||= Ho(() => {}, ["prevent"]),
			onChange: c[2] ||= (e) => i.value = !0,
			onInput: c[3] ||= (e) => i.value = !0
		}, [
			V("p", null, je(e.hint), 1),
			V("section", Is, [
				(z(!0), B(L, null, jr(e.layout.controls, (e) => (z(), na(Fs, {
					key: e.key,
					modelValue: n[e.key],
					"onUpdate:modelValue": (t) => n[e.key] = t,
					control: e
				}, null, 8, [
					"modelValue",
					"onUpdate:modelValue",
					"control"
				]))), 128)),
				(z(!0), B(L, null, jr(e.layout.actions, (e) => (z(), B("fieldset", {
					key: e.key,
					class: "tw:dui-fieldset tw:flex tw:flex-col tw:gap-2"
				}, [
					V("legend", Ls, je(e.name), 1),
					V("p", Rs, je(e.hint), 1),
					V("button", {
						type: "button",
						class: "tw:dui-btn tw:dui-btn-sm tw:self-start",
						disabled: a.value || i.value,
						onClick: (t) => s(e.key)
					}, [V("i", {
						class: xe(e.icon),
						"aria-hidden": "true"
					}, null, 2), da(" " + je(e.label), 1)], 8, zs),
					(z(!0), B(L, null, jr(e.controls, (e) => (z(), na(Fs, {
						key: e.key,
						modelValue: n[e.key],
						"onUpdate:modelValue": (t) => n[e.key] = t,
						control: e
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"control"
					]))), 128))
				]))), 128)),
				!rn(r) && !e.layout.actions.length ? (z(), B("p", Bs, " No supported modules are currently available for this group. ")) : fa("", !0)
			]),
			V("p", Vs, je(i.value ? "Unsaved changes. Save before running a setup action, or close to discard." : e.reloadRequired ? "Saved. Reload connected clients to activate feature changes." : "Changes take effect when you save. Setup actions open their own review."), 1),
			V("div", Hs, [rn(r) ? (z(), B("button", {
				key: 0,
				type: "button",
				class: "tw:dui-btn tw:dui-btn-primary tw:flex-1",
				disabled: a.value,
				onClick: o
			}, " Save Settings ", 8, Us)) : fa("", !0), e.reloadRequired ? (z(), B("button", {
				key: 1,
				type: "button",
				class: "tw:dui-btn tw:flex-1",
				disabled: a.value,
				onClick: c[0] ||= (...t) => e.reload && e.reload(...t)
			}, " Reload Foundry ", 8, Ws)) : fa("", !0)])
		], 32));
	}
});
// src/module/apps/settings-groups/view/SettingsGroupApplication.ts
function Ks(e) {
	let t = bs[e];
	return class extends ps {
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
		#e = !1;
		getVueComponent() {
			return Gs;
		}
		getVueProps() {
			Ds();
			let n = Es(e), r = ws(e);
			return {
				hint: t.hint,
				layout: ks(n, r),
				reloadRequired: this.#e,
				save: async (t) => {
					try {
						this.#e = await Os(e, n, t) || this.#e, ui?.notifications?.info(this.#e ? "Settings saved. Reload connected clients to activate feature changes." : "Compatibility Box settings saved.");
					} catch (e) {
						hs(e instanceof Error ? e.message : String(e), e);
					}
					await this.render(!0);
				},
				runAction: async (e) => {
					try {
						Ds();
						let t = r.find(([t]) => t === e)?.[1];
						t && await new t.type().render(!0);
					} catch (e) {
						hs(e instanceof Error ? e.message : String(e), e);
					}
				},
				reload: async () => {
					Ds(), await foundry.applications.settings.SettingsConfig.reloadConfirm({ world: !0 });
				}
			};
		}
	};
}
// src/module/foundry/settings/groups/window.ts
function qs() {
	Hooks.once("setup", () => {
		for (let t of Object.keys(bs)) {
			let n = bs[t];
			game?.settings.registerMenu(e, `settings-${t}`, {
				name: n.title,
				label: `Configure ${n.title}`,
				hint: n.hint,
				icon: n.icon,
				restricted: !0,
				type: Ks(t)
			});
		}
	});
}
var Js = {
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
}, Ys = [
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
], Xs = [
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
], Zs = [
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
], Qs = [
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
], $s = [
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
], ec = {
	sources: Js,
	holidays: Ys,
	history: [
		...Xs,
		...Zs,
		...Qs
	].sort((e, t) => e.year - t.year),
	researchNotes: $s
}, tc = {
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
}, nc = "wfrp4e-compatibility-box-imperial", G = tc.months, rc = tc.weekdays, ic = 86400, ac = (e, t) => (e % t + t) % t;
function oc(e) {
	if (!Number.isFinite(e) || Math.abs(e) > 2 ** 53 - 1) throw Error("Calendar timestamp is outside the supported range.");
	e = Math.floor(e);
	let t = Math.floor(e / ic), n = Math.floor(t / 400), r = n + 1, i = ac(t, 400), a = 0, o = n * 394;
	for (; i >= G[a].numberOfDays;) {
		let e = G[a++];
		i -= e.numberOfDays, e.intercalary || (o += e.numberOfDays);
	}
	let s = ac(e, ic);
	return {
		year: r,
		month: a,
		day: i,
		hour: Math.floor(s / 3600),
		minute: Math.floor(s / 60) % 60,
		second: s % 60,
		weekday: ac(o + i, 8)
	};
}
function sc(e) {
	let t = G[e.month];
	if (!Object.values(e).every(Number.isSafeInteger) || !t || e.day < 0 || e.day >= t.numberOfDays || e.hour < 0 || e.hour >= 24 || e.minute < 0 || e.minute >= 60 || e.second < 0 || e.second >= 60) throw Error("Choose a valid Imperial calendar date and time.");
	let n = ((e.year - 1) * 400 + G.slice(0, e.month).reduce((e, t) => e + t.numberOfDays, 0) + e.day) * ic + e.hour * 3600 + e.minute * 60 + e.second;
	if (!Number.isSafeInteger(n)) throw Error("Calendar date is outside the supported range.");
	return n;
}
function cc(e, t = !1) {
	let n = oc(e), r = G[n.month], i = (e) => String(e).padStart(2, "0");
	return t ? `${n.year} ${r.name} ${i(n.day + 1)} ${i(n.hour)}:${i(n.minute)}:${i(n.second)}` : `${r.intercalary ? "" : `${rc[n.weekday].name}, `}${r.name} ${i(n.day + 1)}, ${n.year}`;
}
function lc() {
	return {
		id: nc,
		name: "WFRP Imperial Calendar",
		description: "Compatibility Box: 400 days, eight weekdays, six festivals outside the week; timestamp zero displays IC year 1.",
		years: {
			yearZero: 0,
			firstWeekday: 0
		},
		months: { values: G.map((e) => ({
			name: e.name,
			abbreviation: e.abbreviation,
			ordinal: Math.max(1, e.numericRepresentation),
			days: e.numberOfDays,
			intercalary: e.intercalary,
			startingWeekday: null
		})) },
		days: {
			values: rc.map((e, t) => ({
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
// src/module/functions/calendars/content.ts
var K = "foundryvtt-simple-calendar-reborn", q = "simple-timekeeping", J = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]);
function uc(e) {
	let t = 2166136261, n = 5381;
	for (let r of e) t = Math.imul(t ^ r.charCodeAt(0), 16777619), n = Math.imul(n, 33) ^ r.charCodeAt(0);
	return (t >>> 0).toString(16).padStart(8, "0") + (n >>> 0).toString(16).padStart(8, "0");
}
function dc(e) {
	return `<p><strong>Sources:</strong> ${e.map((e) => {
		let t = ec.sources[e];
		if (!t) throw Error(`Unknown calendar source: ${e}`);
		return t.uuid ? `@UUID[${t.uuid}]{${t.title}}` : t.url ? `<a href="${J(t.url)}">${J(t.title)}</a>` : J(t.title);
	}).join("; ")}</p>`;
}
function fc(e) {
	let t = G[e.month], n = `${t.intercalary ? "" : `${e.day} `}${t.name}`;
	return e.month === e.endMonth && e.day === e.endDay ? n : `${n} – ${e.endDay} ${G[e.endMonth].name}`;
}
function pc(e) {
	let t = e.date ? `${e.date.day} ${G[e.date.month].name} ` : "";
	return `${e.approximate ? "c. " : ""}${t}${e.year}${e.endYear === e.year ? "" : `–${e.endYear}`} IC (${e.precision})`;
}
function mc(e, t, n, r, i) {
	return {
		_id: uc(`${e}:${t}`),
		name: n,
		folder: null,
		ownership: { default: i },
		flags: { [e]: { calendarContent: {
			id: t,
			version: 1
		} } },
		pages: [{
			_id: uc(`${e}:${t}:details`),
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
function hc(e, t, n, r, i, a) {
	if (i) {
		let a = (e) => {
			let { year: t, month: n, day: r, hour: i, minute: a, second: o } = oc(e);
			return {
				year: t,
				month: n,
				day: r,
				hour: i,
				minute: a,
				seconds: o
			};
		};
		e.flags[K] = { noteData: {
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
		} }, e.flags.core = { sheetClass: `${K}.NoteSheet` };
	}
	a && (e.pages[0].flags[q] = {
		allDay: t % 86400 == 0 && (n + 1) % 86400 == 0,
		notify: "none",
		eventTime: t,
		eventEnd: n,
		repeat: r ? "year" : ""
	});
}
function gc(e, t, n, r) {
	let i = [];
	if (t.holidays !== !1) for (let t of ec.holidays) {
		let a = sc({
			year: r,
			month: t.month,
			day: t.day - 1,
			hour: 0,
			minute: 0,
			second: 0
		}), o = sc({
			year: r,
			month: t.endMonth,
			day: t.endDay - 1,
			hour: 23,
			minute: 59,
			second: 59
		}), s = mc(e, t.id, t.name, `<p><strong>${J(fc(t))}</strong> · ${J(t.region)} · Annual observance</p><p>${J(t.summary)}</p>${dc(t.sources)}`, 2);
		hc(s, a, o, !0, n.calendarId, n.timekeeping), i.push(s);
	}
	if (t.history !== !1) {
		let t = mc(e, "ubersreik-history", "Ubersreik — Historical Almanac", `<p>GM reference. Published years and ranges are retained. Exact-date entries identify their date basis: published scenario dates use an assumed campaign year, and the deposition uses the explicitly approved provisional date of 5 Nachexen 2512 IC.</p><table><thead><tr><th>Date and precision</th><th>Event</th></tr></thead><tbody>${ec.history.map((e) => `<tr><td>${J(pc(e))}</td><td><strong>${J(e.title)}</strong><p>${J(e.summary)}</p>${e.date ? `<p><strong>Date basis:</strong> ${J(e.date.basis)}</p>` : ""}${dc(e.sources)}</td></tr>`).join("")}</tbody></table><h2>Dating notes and movable festivals</h2>${ec.researchNotes.map((e) => `<h3>${J(e.title)}</h3><p>${J(e.text)}</p>${dc(e.sources)}`).join("")}`, 0);
		i.push(t);
		for (let t of ec.history) {
			if (!t.date) continue;
			let r = sc({
				year: t.year,
				month: t.date.month,
				day: t.date.day - 1,
				hour: 0,
				minute: 0,
				second: 0
			}), a = mc(e, `history-${t.id}`, t.title, `<p><strong>${J(pc(t))}</strong></p><p>${J(t.summary)}</p><p><strong>Date basis:</strong> ${J(t.date.basis)}</p>${dc(t.sources)}`, 0);
			hc(a, r, r + 86400 - 1, !1, n.calendarId, n.timekeeping), i.push(a);
		}
	}
	return i;
}
// src/module/foundry/integrations/imperial-calendar/event-refresh.ts
var _c = !1;
function vc(e) {
	e.flags["foundryvtt-simple-calendar-reborn"]?.noteData && !_c && (_c = !0, queueMicrotask(() => {
		_c = !1;
		let e = ui?.windows;
		for (let t of Object.values(e ?? {})) t.id === "fsc-if" && t.render(!1);
	}));
}
// src/module/functions/calendars/recurrence.ts
var yc = (e, t, n) => sc({
	year: e,
	month: t,
	day: n,
	hour: 0,
	minute: 0,
	second: 0
});
function bc(e, t, n, r) {
	let i = e.isVisible, a = e.getDisplayDate;
	e.isVisible = function(e, n, r, a) {
		let o = t(this.entryId, e);
		if (!o) return i.call(this, e, n, r, a);
		if (!this.canUserView()) return !1;
		let s = yc(n, r, a);
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
// src/module/foundry/settings/is-optional-feature-enabled.ts
function Y(e) {
	if (!_s(e)) return !1;
	if (e === "bossBar") return game?.system.id === "wfrp4e" && ys.some((e) => game?.settings.get("wfrp4e-compatibility-box", W[e]) === !0);
	let t = gs[e].settingKey;
	return t !== null && game?.settings.get("wfrp4e-compatibility-box", t) !== !1;
}
// src/module/functions/settings-presets/values.ts
function xc(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function X(e, t) {
	if (Array.isArray(e) && Array.isArray(t)) return e.length === t.length && e.every((e, n) => X(e, t[n]));
	if (xc(e) && xc(t)) {
		let n = Object.keys(e);
		return n.length === Object.keys(t).length && n.every((n) => Object.hasOwn(t, n) && X(e[n], t[n]));
	}
	return e === t;
}
function Sc(e) {
	if (e !== void 0) try {
		let t = JSON.stringify(e);
		return t === void 0 ? String(e) : JSON.parse(t);
	} catch {
		return String(e);
	}
}
function Cc(e) {
	return e === void 0 ? "(not set)" : JSON.stringify(e, null, 2) ?? String(e);
}
function wc(e) {
	if (e.length < 2 || !e.every(xc)) return null;
	let t = e;
	return [...new Set(t.flatMap((e) => Object.keys(e)))].sort().filter((e) => t.some((n) => Object.hasOwn(n, e) !== Object.hasOwn(t[0], e) || !X(n[e], t[0][e])));
}
function Tc(e, t = /* @__PURE__ */ new Set()) {
	if (e === null || typeof e == "boolean" || typeof e == "string" || typeof e == "number" && Number.isFinite(e)) return e;
	if (typeof e != "object" || !e) throw Error("Value cannot be represented completely in JSON");
	if (t.has(e)) throw Error("Value contains a circular reference");
	let n = new Set(t).add(e);
	if (Array.isArray(e)) return Array.from(e, (e) => Tc(e, n));
	let r = Object.getPrototypeOf(e);
	if (r !== Object.prototype && r !== null) throw Error("Value is not a plain JSON object");
	if (Object.getOwnPropertySymbols(e).length) throw Error("Value contains properties JSON cannot preserve");
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, Tc(t, n)]));
}
// src/module/foundry/integrations/simple-timekeeping/calendar.ts
function Ec(e, t) {
	let n = Object.getPrototypeOf(e.calendar), r = n.timeToComponents;
	n.timeToComponents = function(e = 0) {
		let n = r.call(this, e);
		return t() ? {
			...n,
			dayOfWeek: oc(e).weekday
		} : n;
	}, e.initializeCalendar();
}
// src/module/functions/calendars/configuration.ts
function Dc(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Calendar configuration is unavailable or invalid.");
	return structuredClone(e);
}
function Oc(e, t) {
	let n = Dc(e), r = Dc(t), i = lc(), a = r[i.id], o = a ? Dc(a) : {}, s = {
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
function kc(e, t, n, r) {
	if (!Array.isArray(e)) throw Error("Simple Calendar configuration is unavailable.");
	if (!e.some((e) => e?.id === t)) throw Error("Choose an active Simple Calendar before applying the Imperial preset.");
	return e.map((e) => {
		let i = Dc(e);
		if (i.id !== t) return i;
		let a = Array.isArray(i.months) ? i.months : [], o = (e, t) => e.find((e) => e && typeof e == "object" && !Array.isArray(e) && e.name === t) ?? {}, s = G.map((e, t) => {
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
		}), c = Array.isArray(i.weekdays) ? i.weekdays : [], l = rc.map((e, t) => {
			let n = o(c, e.name);
			return {
				...n,
				...e,
				id: n.id ?? `wfrp-weekday-${t}`,
				numericRepresentation: t + 1
			};
		}), u = {
			...Dc(i.year),
			yearZero: 1,
			firstWeekday: 0
		}, d = {
			...Dc(i.leapYear),
			rule: "none",
			customMod: 0,
			startingYear: 0
		}, f = {
			...Dc(i.time),
			hoursInDay: 24,
			minutesInHour: 60,
			secondsInMinute: 60,
			...r ? { gameTimeRatio: 0 } : {}
		}, p = {
			...Dc(i.general),
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
		if (!X(m, i)) {
			let e = oc(n);
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
// src/module/foundry/integrations/simple-timekeeping/preset.ts
var Ac = "simple-timekeeping", jc = {
	title: "Simple Timekeeping & Calendar — WFRP Imperial Calendar",
	enabled: () => game?.system.id === "wfrp4e" && Y("simpleTimekeeping"),
	additionalSettings: () => {
		let e = Oc(game?.settings.get(Ac, "configuration"), game?.settings.get(Ac, "customCalendars"));
		return [{
			namespace: Ac,
			key: "customCalendars",
			value: e.customCalendars
		}, {
			namespace: Ac,
			key: "configuration",
			value: e.configuration
		}];
	}
};
// src/module/foundry/integrations/simple-timekeeping/register-integration.ts
function Mc() {
	if (game?.system.id !== "wfrp4e" || !Y("simpleTimekeeping")) return !1;
	let e = game.settings.get(Ac, "configuration"), t = game.settings.get(Ac, "customCalendars"), n = lc(), r = t?.[e.calendar ?? ""];
	return !r || e.calendar !== n.id ? !1 : X(r.years, n.years) && X(r.days, n.days) && r.months.values.length === n.months.values.length && n.months.values.every((e, t) => Object.entries(e).every(([e, n]) => X(r.months.values[t]?.[e], n)));
}
function Nc() {
	U("simple-timekeeping") && Y("simpleTimekeeping") && game?.system.id === "wfrp4e" && Hooks.once("initSimpleTimekeeping", () => {
		Ec(game.time, Mc);
	});
}
// src/module/foundry/integrations/imperial-calendar/recurrence.ts
var Pc = /* @__PURE__ */ new WeakSet(), Fc = /* @__PURE__ */ new WeakSet(), Ic, Lc = !1, Rc = () => [...game.journal];
function zc() {
	if (!game?.ready || !Y("simpleCalendar") || !Mc()) return !1;
	let e = game.settings.get(K, "active-calendar");
	return game.settings.get(K, "calendar-configuration")?.find((t) => t.id === e)?.year.yearZero === 1;
}
function Bc(t, n) {
	if (!zc()) return;
	let r = Rc().find((e) => e.id === t), i = r?.flags[K]?.noteData, a = r?.flags[e]?.calendarSync;
	if (!a || !i || n && n !== i.calendarId || i.calendarId !== game.settings.get("foundryvtt-simple-calendar-reborn", "active-calendar")) return;
	let o = Rc().find((e) => e.id === a.journal)?.pages?.contents.find((e) => e.id === a.page), s = ui?.simpleTimekeeping;
	if (o && Number.isFinite(o.flags["simple-timekeeping"]?.eventTime) && s?.getEventOccurrences) return {
		allDay: !!o.flags[q]?.allDay,
		occurrences: (e, t) => s.getEventOccurrences(o, e, t)
	};
}
function Vc() {
	let e = Ic.visibleCalendar, t = e.getMonthAndDayIndex("selected"), n = t.month === void 0 ? e.getMonthAndDayIndex() : t;
	return yc(t.month === void 0 ? e.year.numericRepresentation : e.year.selectedYear, n.month ?? 0, n.day ?? 0);
}
function Hc() {
	if (Lc || !zc()) return;
	let e = game.settings.menus?.get(`${K}.calendar-main-app`)?.type;
	if (!e) return;
	Ic ??= new e();
	let t = Ic.visibleCalendar;
	for (let e of Rc()) {
		let n = e.flags[K]?.noteData;
		if (!n || n.calendarId !== t.id) continue;
		let r = t.clone();
		r.year.selectedYear = n.startDate.year, r.getMonthAndDayIndex = () => ({
			month: n.startDate.month,
			day: n.startDate.day
		});
		let i = r.toTemplate().selectedDay.notes[0];
		if (!i) continue;
		let a = Object.getPrototypeOf(i);
		if (Pc.has(a)) return;
		Pc.add(a), Lc = !0;
		let o = globalThis.SimpleCalendar.api;
		bc(a, Bc, Vc, (e, t) => o.formatTimestamp(e, t ? "MMMM DD, YYYY" : "MMMM DD, YYYY HH:mm:ss"));
		let s = e.sheet;
		s?.updateNoteRepeatDropdown && Wc(s), Ic.render(!1);
		return;
	}
}
function Uc(e) {
	let t = Bc(e.object.id), n = e.journalData.flags[K]?.noteData.repeats;
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
	}), r.value = String(e.journalData.flags[K].noteData.repeats));
}
function Wc(e) {
	let t = Object.getPrototypeOf(e);
	if (!Fc.has(t)) {
		Fc.add(t);
		let n = t.getData, r = t.updateNoteRepeatDropdown;
		t.getData = async function() {
			let e = await n.call(this);
			return (Bc(this.object.id) || this.journalData.flags["foundryvtt-simple-calendar-reborn"]?.noteData.repeats === 4) && (e.edit.repeatOptions[4] = "Daily", this.journalData.flags["foundryvtt-simple-calendar-reborn"]?.noteData.repeats === 4 && (e.display.repeatsDisplay = "Daily")), e;
		}, t.updateNoteRepeatDropdown = function() {
			r.call(this), Uc(this);
		}, e.render(!1);
	}
	Uc(e);
}
function Gc() {
	Hooks.on("simple-calendar-ready", Hc), Hooks.on("ready", Hc), Hooks.on("renderMainApp", Hc), Hooks.on("createJournalEntry", () => queueMicrotask(Hc)), Hooks.on("updateJournalEntry", () => queueMicrotask(Hc)), Hooks.on("updateJournalEntryPage", (t) => {
		let n = t;
		for (let t of Rc()) {
			let r = t.flags[e]?.calendarSync;
			r?.journal === n.parent?.id && r?.page === n.id && vc(t);
		}
	}), Hooks.on("renderNoteSheet", (e) => Wc(e));
}
// src/module/functions/calendars/event-sync.ts
var Kc = [
	"",
	"week",
	"month",
	"year",
	"day"
], qc = (e) => sc({
	...e,
	second: e.seconds
}), Jc = (e) => {
	let { year: t, month: n, day: r, hour: i, minute: a, second: o } = oc(e);
	return {
		year: t,
		month: n,
		day: r,
		hour: i,
		minute: a,
		seconds: o
	};
};
function Yc(e) {
	let t = Kc[e.repeats];
	if (t === void 0) throw Error("Unsupported Simple Calendar recurrence");
	let n = qc(e.startDate), r = qc(e.endDate);
	if (e.allDay && (n = Math.floor(n / 86400) * 86400, r = Math.floor(r / 86400) * 86400 + 86399), !Number.isFinite(n) || !Number.isFinite(r) || r < n) throw Error("Invalid calendar event dates");
	return {
		eventTime: n,
		eventEnd: r,
		allDay: e.allDay,
		repeat: t
	};
}
function Xc(e, t) {
	let n = Kc.indexOf(e.repeat ?? "");
	if (n < 0) throw Error(`Simple Calendar cannot represent ${e.repeat} recurrence`);
	let r = e.eventTime, i = e.eventEnd || r;
	if (e.allDay && (r = Math.floor(r / 86400) * 86400, i = Math.floor(Math.max(i, r) / 86400) * 86400 + 86399), !Number.isFinite(r) || !Number.isFinite(i) || i < r) throw Error("Invalid calendar event dates");
	return {
		calendarId: t,
		startDate: Jc(r),
		endDate: Jc(i),
		allDay: !!e.allDay,
		repeats: n
	};
}
function Zc(e, t) {
	return Object.fromEntries([.../* @__PURE__ */ new Set([
		"default",
		...Object.keys(e),
		...Object.keys(t)
	])].map((n) => {
		let r = t[n] ?? t.default ?? -1;
		return [n, r < 0 ? e[n] ?? e.default ?? 0 : r];
	}));
}
// src/module/functions/calendars/migration.ts
function Qc(e) {
	return `${e.day + 1} ${e.monthName} ${e.year}, ${String(e.hour).padStart(2, "0")}:${String(e.minute).padStart(2, "0")}:${String(e.seconds).padStart(2, "0")}`;
}
function $c(e) {
	let t = G.findIndex((t) => t.name.toLocaleLowerCase() === e.monthName.trim().toLocaleLowerCase());
	if (t < 0) throw Error(`No Imperial month matches “${e.monthName}”. Choose elapsed time or adjust the source calendar.`);
	return sc({
		year: e.year,
		month: t,
		day: e.day,
		hour: e.hour,
		minute: e.minute,
		second: e.seconds
	});
}
var el = (e) => `${e.journal}/${e.page ?? ""}`;
function tl(e, t) {
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
			n.time = $c(r.current);
		}
		if (e.sources.some((e) => e.id === "st")) {
			let e = Dc(r(q, "configuration")), t = Dc(r(q, "customCalendars")), i = t[String(e.calendar)];
			i && (t[nc] = i);
			let a = Oc(e, t);
			n.settings.push({
				namespace: q,
				key: "customCalendars",
				value: a.customCalendars
			}, {
				namespace: q,
				key: "configuration",
				value: a.configuration
			});
		}
		if (e.activeId) {
			let t = kc(r(K, "calendar-configuration"), e.activeId, n.time, e.sources.some((e) => e.id === "st")), i = Xc({ eventTime: n.time }, e.activeId).startDate;
			for (let n of t) n && typeof n == "object" && !Array.isArray(n) && n.id === e.activeId && (n.currentDate = {
				year: i.year,
				month: i.month,
				day: i.day,
				seconds: i.hour * 3600 + i.minute * 60 + i.seconds
			});
			n.settings.push({
				namespace: K,
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
		let [e, n] = t.events === "elapsed" ? r.times : r.dates.map($c);
		if (!Number.isSafeInteger(e) || !Number.isSafeInteger(n) || n < e) throw Error("Invalid event date range.");
		i.set(el(r), {
			start: e,
			end: n,
			source: r
		});
	} catch (e) {
		n.errors.push(`${r.name}: ${e instanceof Error ? e.message : e}`);
	}
	for (let r of e.events) {
		let e = i.get(el(r)), a = r.linked ? i.get(r.linked) : void 0, o = a && (t.authority === "st" && a.source.event || t.authority === "scr" && a.source.note) ? a : e;
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
				...Xc(e, r.note.calendarId)
			} : {
				...r.event,
				...e
			};
			n.writes.push({
				journal: r.journal,
				...r.page ? { page: r.page } : {},
				key: r.note ? `flags.${K}.noteData` : `flags.${q}`,
				before: r.note ?? r.event,
				after: t
			}), n.changes.push({
				name: r.name,
				before: `${Qc(r.dates[0])} → ${Qc(r.dates[1])}`,
				after: `${cc(o.start, !0)} → ${cc(o.end, !0)}`
			});
		} catch (e) {
			n.errors.push(`${r.name}: ${e instanceof Error ? e.message : e}`);
		}
	}
	return n;
}
// src/module/foundry/settings/preset-runtime/presentation.ts
function Z(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
var nl = "style=\"white-space:pre-wrap;overflow-wrap:anywhere;margin:2px 0 8px\"";
function rl(e) {
	let t = Z, n = e.map(({ label: e, value: t }) => ({
		label: e,
		value: Sc(t)
	})), r = (e) => `<pre ${nl}>${t(Cc(e))}</pre>`, i = n.map(({ label: e, value: n }) => `<div><strong>${t(e)}</strong>${r(n)}</div>`).join(""), a = wc(n.map(({ value: e }) => e));
	if (!a) return i;
	let o = n, s = new Set(o.flatMap(({ value: e }) => Object.keys(e))).size;
	return `${a.length ? `<p>${a.length} of ${s} fields differ:</p><ul>${a.map((e) => `<li><strong>${t(e)}</strong>${o.map(({ label: n, value: i }) => `<div>${t(n)}${r(Object.hasOwn(i, e) ? i[e] : void 0)}</div>`).join("")}</li>`).join("")}</ul>` : `<p>All ${s} fields match.</p>`}<details><summary>Full values</summary>${i}</details>`;
}
function il(e) {
	let t = Z, n = e.changes.map(({ label: e, current: n, value: r }) => `<li><strong>${t(e)}</strong>${rl([{
		label: "Current",
		value: n
	}, {
		label: "Preset",
		value: r
	}])}</li>`).join(""), r = [
		...e.skipped,
		...e.failed,
		...e.conflicts
	].map(({ id: e, reason: n }) => `<li>${t(e)}: ${t(n)}</li>`).join("");
	return `<p>${e.changes.length} changes; ${e.unchanged.length} already set; ${e.excluded.length} left to the GM's current settings.</p><div class="scrollable" style="max-height:45vh"><details><summary>Review setting changes</summary><ul>${n}</ul></details>${r ? `<p>Resolve these issues before applying:</p><ul>${r}</ul>` : ""}${e.missingTables.length ? `<p>Import these missing rule tables first: ${t(e.missingTables.join(", "))}</p>` : ""}</div>${e.requiresReload ? "<p>A reload is required for these changes.</p>" : ""}`;
}
async function al(e, t) {
	let n = `${e}: ${t.updated.length} updated, ${t.unchanged.length} already set, ${t.excluded.length} left unchanged by conflict choices.`;
	t.blocked && (n += " Nothing was applied because preflight found unresolved issues.");
	let r = [
		...t.skipped,
		...t.failed,
		...t.conflicts
	];
	r.length && (n += ` ${r.map(({ id: e, reason: t }) => `${e}: ${t}`).join("; ")}.`), t.missingTables.length && (n += ` Missing rule tables: ${t.missingTables.join(", ")}.`), t.failed.length && t.updated.length && (n += " Earlier successful changes remain applied; review before retrying."), t.blocked || t.failed.length ? ui?.notifications?.error(Z(n), { permanent: !0 }) : ui?.notifications?.info(Z(n)), t.requiresReload && !t.automaticReload && await foundry.applications.settings.SettingsConfig.reloadConfirm({ world: !0 });
}
// src/module/foundry/integrations/imperial-calendar/migration/snapshot.ts
var ol = () => [...game.journal];
function sl() {
	if (!game?.ready || !game.user?.isGM || game.system.id !== "wfrp4e") throw Error("A ready WFRP GM session is required.");
}
function cl() {
	sl();
	let t = {
		time: game.time.worldTime,
		journalIds: ol().map((e) => e.id),
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
	}, r = ol();
	if (Y("simpleCalendar")) {
		let i = globalThis.SimpleCalendar?.api;
		if (!i) throw Error("Simple Calendar is not ready. Reload before migrating.");
		let a = n(K, "calendar-configuration"), o = a.length ? a : JSON.parse(JSON.stringify(i.getAllCalendars()));
		t.settings[0].value = o;
		let s = String(n(K, "active-calendar")), c = o.find((e) => e.id === s);
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
			let r = n.flags[K]?.noteData;
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
	if (Y("simpleTimekeeping")) {
		n(q, "configuration"), n(q, "customCalendars");
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
			let r = n.flags[q];
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
// src/module/foundry/integrations/imperial-calendar/migration/state.ts
var ll = "calendarMigrationRecovery";
function ul() {
	return game?.settings.settings?.has("wfrp4e-compatibility-box.calendarMigrationRecovery") ? game.settings.get(e, ll) : null;
}
function dl() {
	let t = ul();
	if (!t) return null;
	let n = [...game.journal].find((e) => e.id === t.journal)?.flags[e]?.calendarMigrationPlan;
	if (!n) throw Error("The GM recovery journal is unavailable. Restore access to that journal before continuing.");
	return {
		status: t.status,
		created: t.created,
		plan: n
	};
}
function fl() {
	let e = ul()?.status;
	return e === "applying" || e === "failed";
}
// src/module/foundry/integrations/imperial-calendar/content.ts
function pl(e, t) {
	let n = game, r;
	if (e) {
		r = String(n.settings.get(K, "active-calendar"));
		let e = n.settings.get(K, "calendar-configuration")?.find((e) => e.id === r);
		if (!e || e.year?.yearZero !== 1 || e.year.firstWeekday !== 0 || e.leapYear?.rule !== "none" || e.time?.hoursInDay !== 24 || e.time.minutesInHour !== 60 || e.time.secondsInMinute !== 60 || e.months?.length !== G.length || e.weekdays?.length !== rc.length || !G.every((t, n) => e.months[n]?.name === t.name && e.months[n]?.numberOfDays === t.numberOfDays && e.months[n]?.intercalary === t.intercalary && e.months[n]?.intercalaryInclude === !1 && e.months[n]?.startingWeekday === null) || !rc.every((t, n) => e.weekdays[n]?.name === t.name)) return { problem: "Apply the Simple Calendar WFRP Imperial preset before importing dated content." };
	}
	return t && (!Mc() || n.time.calendar.componentsToTime({
		year: 1,
		day: 0,
		hour: 0,
		minute: 0,
		second: 0
	}) !== 3456e4) ? { problem: "Apply the ST&C WFRP Imperial preset and reload before importing dated content." } : r ? { calendarId: r } : {};
}
function ml(e) {
	if (!game?.ready || !game.user?.isGM || game.system.id !== "wfrp4e") throw Error("A ready WFRP GM session is required to import calendar content.");
	let t = Y("simpleCalendar"), n = Y("simpleTimekeeping");
	if (!t && !n) throw Error("Enable a supported calendar compatibility feature first.");
	if (e.holidays === !1 && e.history === !1) return { timekeeping: !1 };
	let { calendarId: r, problem: i } = pl(t, n);
	if (i) throw Error(i);
	return {
		...r ? { calendarId: r } : {},
		timekeeping: n
	};
}
function hl(t) {
	return t.flags[e]?.calendarContent?.id;
}
function gl(e) {
	return [...game.journal].find((t) => hl(t) === hl(e));
}
function _l(e) {
	return [...game.journal].find((t) => t.id === e._id || t.name.toLocaleLowerCase() === e.name.toLocaleLowerCase());
}
function vl(t = {}) {
	let n = ml(t), r = gc(e, t, n, oc(game.time.worldTime).year);
	return {
		targets: n,
		drafts: r,
		entries: r.map((e) => ({
			name: e.name,
			status: gl(e) ? "Keep existing content; connect missing calendar support" : _l(e) ? "Skip: matching name or document ID already exists" : "Create"
		}))
	};
}
var yl = !1;
async function bl(e = {}, t) {
	if (yl) throw Error("A calendar content import is already running.");
	let n = vl(e);
	if (t && (t.calendarId !== n.targets.calendarId || t.timekeeping !== n.targets.timekeeping)) throw Error("Calendar availability changed after review. Review the content again.");
	yl = !0;
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
			let a = ml(e);
			if (a.calendarId !== n.targets.calendarId || a.timekeeping !== n.targets.timekeeping) throw Error("Calendar availability changed during import. Review the remaining content again.");
			let o = gl(t);
			if (o) {
				let e = {}, a = o.pages.contents.find((e) => e.id === t.pages[0]._id), s = o.flags[K]?.noteData, c = a?.flags[q];
				if (s && s.calendarId !== n.targets.calendarId && n.targets.calendarId) {
					r.skipped.push(`${t.name}: already connected to another Simple Calendar`);
					continue;
				}
				try {
					if (s && n.targets.timekeeping && c?.eventTime === void 0) {
						if (![0, 3].includes(s.repeats)) throw Error("unsupported repetition");
						let e = (e, t = !1) => sc({
							year: e.year,
							month: e.month,
							day: e.day,
							hour: s.allDay ? t ? 23 : 0 : e.hour,
							minute: s.allDay ? t ? 59 : 0 : e.minute,
							second: s.allDay ? t ? 59 : 0 : e.seconds
						});
						hc(t, e(s.startDate), e(s.endDate, !0), s.repeats === 3, void 0, !0);
					} else if (!s && t.flags["foundryvtt-simple-calendar-reborn"] && c?.eventTime !== void 0) {
						if (!["", "year"].includes(String(c.repeat ?? ""))) throw Error("unsupported repetition");
						let e = Number(c.eventTime);
						hc(t, e, Number(c.eventEnd ?? e), c.repeat === "year", n.targets.calendarId, !1);
					}
				} catch {
					r.skipped.push(`${t.name}: existing date or repetition cannot be connected safely`);
					continue;
				}
				let l = t.flags[K], u = t.pages[0].flags[q];
				l && !s && (e[`flags.${K}.noteData`] = l.noteData, e["flags.core.sheetClass"] = `${K}.NoteSheet`, e.folder = await i()), Object.keys(e).length && await o.update(e);
				let d = !!u && !!a && a.flags["simple-timekeeping"]?.eventTime === void 0;
				d && await o.updateEmbeddedDocuments("JournalEntryPage", [{
					_id: a.id,
					[`flags.${q}`]: u
				}]), Object.keys(e).length || d ? r.connected.push(t.name) : r.skipped.push(`${t.name}: existing content preserved`);
			} else if (_l(t)) r.skipped.push(`${t.name}: matching name or document ID exists`);
			else {
				if (t.folder = await i(), !await CONFIG.JournalEntry.documentClass.create(t, {
					keepId: !0,
					keepEmbeddedIds: !0
				})) throw Error(`Could not create ${t.name}. Earlier successful imports are retained; retry safely.`);
				r.created.push(t.name);
			}
		}
		return r;
	} finally {
		yl = !1;
	}
}
// src/module/foundry/integrations/imperial-calendar/event-sync.ts
var xl = () => ({ calendarSync: !0 }), Sl = (t) => t.flags[e]?.calendarSync, Cl = (e) => e.flags[K]?.noteData, wl = (e) => e.flags[q], Tl = () => [...game.journal], El = (e) => Tl().find((t) => t.id === e.journal)?.pages?.contents.find((t) => t.id === e.page), Dl = (e) => Tl().find((t) => {
	let n = Sl(t);
	return n?.journal === e.parent?.id && n?.page === e.id;
});
function Ol() {
	if (!game?.ready || fl() || !game.user?.isActiveGM || !Y("simpleCalendar") || !Mc()) return;
	let e = pl(!0, Y("simpleTimekeeping"));
	return e.problem ? void 0 : e.calendarId;
}
async function kl(e, t) {
	let n = e, r = Object.fromEntries(Object.entries(t).filter(([e, t]) => !X(e.split(".").reduce((e, t) => e?.[t], n), t)));
	if (t.ownership) for (let n of Object.keys(e.ownership)) Object.hasOwn(t.ownership, n) || (r[`ownership.-=${n}`] = null);
	Object.keys(r).length && await e.update(r, xl());
}
function Al(e, t, n) {
	return {
		journal: t.parent?.id ?? e.id,
		page: t.id,
		mirror: n
	};
}
function jl() {
	let e = [...game.folders].find((e) => e.type === "JournalEntry" && e.flags?.["foundryvtt-simple-calendar-reborn"]?.root);
	if (!e) throw Error("Simple Calendar notes folder is not ready");
	return e.id;
}
async function Ml(t, n) {
	let r = wl(t), i = Dl(t);
	if (!Number.isFinite(r?.eventTime)) {
		i && Sl(i)?.mirror ? await i.delete(xl()) : i && await i.update({
			[`flags.${K}.-=noteData`]: null,
			[`flags.${e}.-=calendarSync`]: null
		}, xl());
		return;
	}
	let a = Xc(r, n);
	if (i) {
		if (Cl(i)?.calendarId !== n) return;
		let e = {
			name: t.name,
			ownership: Zc(t.parent.ownership, t.ownership),
			[`flags.${K}.noteData`]: {
				...Cl(i),
				...a
			}
		};
		if (Sl(i)?.mirror) {
			let e = i.pages?.contents[0];
			e && t.text && await kl(e, {
				name: t.name,
				text: t.text
			});
		}
		await kl(i, e);
		return;
	}
	let o = t.parent;
	Cl(o)?.calendarId === n && !Sl(o) && o.pages?.contents.filter((e) => Number.isFinite(wl(e)?.eventTime)).length === 1 ? await kl(o, {
		[`flags.${e}.calendarSync`]: Al(o, t, !1),
		[`flags.${K}.noteData`]: {
			...Cl(o),
			...a
		}
	}) : await CONFIG.JournalEntry.documentClass.create({
		_id: uc(`${e}:event:${o.id}:${t.id}`),
		name: t.name,
		folder: jl(),
		ownership: {
			default: 0,
			...Zc(o.ownership, t.ownership)
		},
		flags: {
			[e]: { calendarSync: Al(o, t, !0) },
			[K]: { noteData: {
				order: 0,
				categories: [],
				remindUsers: [],
				macro: "none",
				fromPredefined: !1,
				...a
			} },
			core: { sheetClass: `${K}.NoteSheet` }
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
		...xl(),
		keepId: !0
	});
}
async function Nl(t, n) {
	let r = Cl(t);
	if (!r || r.calendarId !== n) return;
	let i = Yc(r), a = Sl(t), o = a ? El(a) : t.pages?.contents.find((e) => e.type === "text" && !Number.isFinite(wl(e)?.eventTime));
	if (a && !o) return;
	if (o || ([o] = await t.createEmbeddedDocuments("JournalEntryPage", [{
		name: t.name,
		type: "text",
		text: {
			content: "",
			format: 1
		}
	}], xl())), !o) throw Error("Could not create calendar event page");
	let s = {
		name: t.name,
		ownership: t.ownership,
		[`flags.${q}`]: {
			notify: "none",
			...wl(o),
			...i
		}
	};
	if (a?.mirror) {
		let e = t.pages?.contents[0];
		e?.text && (s.text = e.text);
	}
	await kl(o, s), a || await kl(t, { [`flags.${e}.calendarSync`]: Al(t, o, !1) });
}
var Pl = Promise.resolve(), Fl = /* @__PURE__ */ new Set();
function Il(t) {
	Pl = Pl.then(async () => {
		let e = Ol();
		e && await t(e);
	}).catch((t) => {
		console.error(`${e} | Calendar event synchronization`, t);
		let n = t instanceof Error ? t.message : String(t);
		Fl.has(n) || (Fl.add(n), ui?.notifications?.warn(`Calendar event synchronization: ${n}. The event could not be fully synchronized.`));
	});
}
function Ll() {
	Il(async (e) => {
		let t = Tl();
		for (let n of t) if (!Sl(n)?.mirror) {
			for (let t of n.pages?.contents ?? []) if (Number.isFinite(wl(t)?.eventTime)) try {
				await Ml(t, e);
			} catch (e) {
				Il(async () => {
					throw e;
				});
			}
			if (Cl(n) && !Sl(n) && !n.pages?.contents.some((e) => Number.isFinite(wl(e)?.eventTime))) try {
				await Nl(n, e);
			} catch (e) {
				Il(async () => {
					throw e;
				});
			}
		}
	});
}
function Rl() {
	let t = (e, t) => Hooks.on(e, t);
	t("ready", Ll), t("simple-calendar-ready", Ll), t("updateUser", Ll), t("updateSetting", (e) => {
		let t = e.key ?? "";
		[
			"foundryvtt-simple-calendar-reborn",
			"simple-timekeeping",
			"wfrp4e-compatibility-box"
		].some((e) => t.startsWith(e + ".")) && Ll();
	});
	for (let e of ["create", "update"]) t(`${e}JournalEntry`, (...t) => {
		let n = t[0];
		vc(n), t[e === "create" ? 1 : 2]?.calendarSync || Il(async (t) => {
			let r = n.pages?.contents.filter((e) => Number.isFinite(wl(e)?.eventTime)) ?? [];
			if (e === "create" && r.length) for (let e of r) await Ml(e, t);
			else if (Cl(n)) await Nl(n, t);
			else for (let e of n.pages?.contents ?? []) await Ml(e, t);
		});
	}), t(`${e}JournalEntryPage`, (...t) => {
		let n = t[0];
		t[e === "create" ? 1 : 2]?.calendarSync || Il(async (e) => {
			Sl(n.parent)?.mirror ? await Nl(n.parent, e) : await Ml(n, e);
		});
	});
	t("deleteJournalEntryPage", (t, n) => {
		if (n?.calendarSync) return;
		let r = t;
		Il(async () => {
			let t = Dl(r);
			t && Sl(t)?.mirror ? await t.delete(xl()) : t && await t.update({
				[`flags.${K}.-=noteData`]: null,
				[`flags.${e}.-=calendarSync`]: null
			}, xl());
		});
	}), t("deleteJournalEntry", (e, t) => {
		if (vc(e), t?.calendarSync) return;
		let n = e;
		Il(async () => {
			let e = Sl(n);
			e?.mirror && await El(e)?.delete(xl());
			for (let e of Tl()) {
				let t = Sl(e);
				t?.mirror && t.journal === n.id && await e.delete(xl());
			}
		});
	});
}
async function zl() {
	let e;
	do
		e = Pl, await e;
	while (e !== Pl);
}
// src/module/foundry/integrations/imperial-calendar/migration/restore.ts
async function Bl(t) {
	let n = new Set(t.snapshot.events.filter((e) => e.note).map((e) => e.journal)), r = new Set(t.snapshot.events.filter((e) => e.event).map((e) => `${e.journal}/${e.page}`));
	for (let i of ol()) {
		let a = i.flags[e]?.calendarSync;
		if (!a) continue;
		let o = `${a.journal}/${a.page}`;
		if (a.mirror && !t.snapshot.journalIds.includes(i.id) && r.has(o)) await i.delete({ calendarSync: !0 });
		else if (!a.mirror && n.has(i.id) && !r.has(o) && a.journal === i.id) {
			let t = i.pages?.contents.find((e) => e.id === a.page);
			t && await t.update({ [`flags.-=${q}`]: null }, { calendarSync: !0 }), await i.update({ [`flags.${e}.-=calendarSync`]: null }, { calendarSync: !0 });
		}
	}
}
// src/module/foundry/integrations/imperial-calendar/migration/apply.ts
var Vl = !1;
async function Hl(t, n = ul()?.journal) {
	if (!n) throw Error("The recovery journal is missing.");
	await game.settings.set(e, ll, {
		status: t.status,
		created: t.created,
		journal: n
	});
}
async function Ul(e, t) {
	for (let n of e.writes) {
		sl();
		let e = ol().find((e) => e.id === n.journal), r = n.page ? e?.pages?.contents.find((e) => e.id === n.page) : e;
		if (!r) throw Error(`Calendar document ${n.journal}/${n.page ?? ""} is missing.`);
		let i = t ? n.before : n.after, a = t ? n.after : n.before, o = { [n.key]: i };
		for (let e of Object.keys(a)) e in i || (o[`${n.key}.-=${e}`] = null);
		await r.update(o, { calendarSync: !0 });
	}
	for (let n of t ? e.snapshot.settings : e.settings) sl(), await game.settings.set(n.namespace, n.key, n.value);
	let n = t ? e.snapshot.time : e.time;
	n !== game.time.worldTime && await game.time.set(n, { calendarMigration: !0 });
}
async function Wl(t) {
	if (sl(), Vl || fl()) throw Error("A calendar migration needs recovery before another can begin.");
	if (t.errors.length) throw Error("Resolve the migration preview errors first.");
	let n = cl();
	if (!X(n, t.snapshot) || !X(tl(n, t.choices), t)) throw Error("Calendar data or time changed during review. Preview again before applying.");
	Vl = !0;
	let r = ul(), i = {
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
		a = n.id, await Hl(i, a), await zl();
		let r = cl();
		if (r.journalIds = r.journalIds.filter((e) => e !== a), !X(r, t.snapshot)) throw Error("Calendar data changed while pausing synchronization. Preview again.");
		if (ul()?.journal !== a) throw Error("Another GM started a calendar migration. Reopen the migration menu.");
		o = !0, await Ul(t, !1), await Hl({
			...i,
			status: "complete"
		});
	} catch (t) {
		throw o ? (a && await Hl({
			...i,
			status: "failed"
		}, a), Error(`Migration stopped: ${t instanceof Error ? t.message : t}. Event synchronization is paused. Use Restore Previous Calendar in the migration menu, then reload.`, { cause: t })) : (a && ul()?.journal === a && await game.settings.set(e, ll, r), t);
	} finally {
		Vl = !1;
	}
}
async function Gl() {
	sl();
	let e = dl();
	if (!e || e.status === "restored") throw Error("No migration is available to restore.");
	if (Vl) throw Error("A migration is already running.");
	Vl = !0;
	try {
		await Hl({
			...e,
			status: "applying"
		}), await zl(), await Ul(e.plan, !0), await Bl(e.plan), await Hl({
			...e,
			status: "restored"
		});
	} catch (t) {
		throw await Hl({
			...e,
			status: "failed"
		}), t;
	} finally {
		Vl = !1;
	}
}
// src/module/foundry/integrations/imperial-calendar/migration/menu.ts
async function Kl() {
	if (!game?.user?.isGM) throw Error("GM permission is required to migrate calendars.");
	let e = dl();
	if (e && e.status !== "restored") {
		let t = await foundry.applications.api.DialogV2.wait({
			window: { title: "Previous Calendar Migration" },
			content: `<p>Last migration: ${Z(e.created)} (${Z(e.status)}).</p><p>Restore replaces the affected calendar settings, event dates and world time with the saved values. Later edits to those values will be overwritten. Other journal content is retained.</p>`,
			buttons: [
				{
					action: "restore",
					label: "Restore Previous Calendar"
				},
				{
					action: "download",
					label: "Download Recovery Snapshot"
				},
				...fl() ? [] : [{
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
			await Gl(), ui?.notifications?.info("Previous calendar restored. Reload to refresh both calendars.");
			return;
		}
		if (t !== "next") return;
	}
	let t = cl(), n = t.sources.map((e) => {
		let t = e.months.length === G.length && e.months.every((e, t) => e.name === G[t]?.name && e.days === G[t]?.numberOfDays);
		return `<li><strong>${Z(e.name)}</strong>: ${Z(Qc(e.current))}; stored year zero ${Z(String(e.epoch))}. ${t ? "Month names and lengths match." : "Month names, order or lengths differ."} ${e.id === "st" ? "ST&C displays internal year + 1." : "Target SCR year zero: 1."}</li>`;
	}).join(""), r = await foundry.applications.api.DialogV2.input({
		window: { title: "Migrate Existing WFRP Calendars" },
		position: { width: 760 },
		content: `<p>Move the active calendars to Compatibility Box’s Imperial calendar: 400 days, eight weekdays and six festival days outside the week. Timestamp zero displays IC year 1.</p><ul>${n}</ul>
    <div class="form-group"><label>Current world date</label><select name="clock"><option value="elapsed">Keep elapsed world time (dates may change)</option>${t.sources.map((e) => `<option value="${e.id}">Keep ${Z(e.name)}’s displayed date</option>`).join("")}</select></div>
    <div class="form-group"><label>Existing events</label><select name="events"><option value="dates">Keep named dates (year, month name, day and time)</option><option value="elapsed">Keep elapsed timestamps (dates may change)</option></select></div>
    <div class="form-group"><label>Linked events use dates from</label><select name="authority"><option value="st">Simple Timekeeping &amp; Calendar</option><option value="scr">Simple Calendar Reborn</option></select></div>
    <p>Only explicitly linked events and dual-format journals share a source. Separate events remain separate, including duplicates. Unmatched month names and impossible dates appear as errors in the preview. Inactive SCR calendars are left alone.</p><p>Moon settings are retained; moon phase alignment is not migrated in this version. Moving world time can affect other time-based modules.</p>`,
		ok: { label: "Preview Migration" },
		rejectClose: !1
	});
	if (!r) return;
	let i = tl(t, {
		clock: r.clock,
		events: r.events,
		authority: r.authority
	});
	await foundry.applications.api.DialogV2.wait({
		window: { title: "Review Calendar Migration" },
		position: { width: 850 },
		content: `<p><strong>New world date:</strong> ${Z(cc(i.time, !0))}. World time changes by ${Z(String(i.time - t.time))} seconds.</p><p>${i.settings.length} calendar settings and ${i.writes.length} event records reviewed. Recurrence and event permissions remain intact; linked dates and recurrence follow the selected source.</p>${i.errors.length ? `<h3>Resolve before applying</h3><ul>${i.errors.map((e) => `<li>${Z(e)}</li>`).join("")}</ul>` : ""}<div class="scrollable" style="max-height:45vh"><table><thead><tr><th>Event</th><th>Before</th><th>After</th></tr></thead><tbody>${i.changes.map((e) => `<tr><td>${Z(e.name)}</td><td>${Z(e.before)}</td><td>${Z(e.after)}</td></tr>`).join("")}</tbody></table></div><p>A recovery snapshot is saved before changes. Reload afterward. If time or event data changes during review, the migration must be previewed again.</p>`,
		buttons: [...i.errors.length ? [] : [{
			action: "apply",
			label: "Apply Migration"
		}], {
			action: "close",
			label: "Close"
		}],
		rejectClose: !1
	}) === "apply" && (await Wl(i), ui?.notifications?.info("Calendar migration complete. Reload to refresh both calendars and reconcile events."));
}
function ql() {
	game?.settings.register(e, ll, {
		name: "Calendar migration recovery",
		hint: "Status and GM journal reference for the most recent calendar migration.",
		scope: "world",
		config: !1,
		type: Object,
		default: null
	}), Hooks.once("setup", () => Cs("calendars", "calendarMigration", {
		name: "Existing world calendars",
		label: "Migrate Existing WFRP Calendars",
		hint: "Preview calendar differences and choose how world time and events move to the shared Imperial calendar.",
		icon: "fa-solid fa-calendar-check",
		restricted: !0,
		type: class extends foundry.applications.api.ApplicationV2 {
			async render() {
				try {
					await Kl();
				} catch (e) {
					hs(e instanceof Error ? e.message : String(e), e);
				}
				return this;
			}
		}
	}));
}
// src/module/foundry/integrations/imperial-calendar/register-content.ts
async function Jl() {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
	let e = Z, t = await foundry.applications.api.DialogV2.wait({
		window: { title: "WFRP Calendar Content" },
		position: { width: 720 },
		content: `<p>Import sourced WFRP observances and Ubersreik history. Holidays are visible to players; the historical almanac and dated historical/scenario events are GM-only. Existing notes, dates and text are preserved. No macros or chat reminders are enabled.</p><table><thead><tr><th>Observance</th><th>Date</th><th>Region</th></tr></thead><tbody>${ec.holidays.map((t) => `<tr><td>${e(t.name)}</td><td>${e(fc(t))}</td><td>${e(t.region)}</td></tr>`).join("")}</tbody></table><p><strong>Ubersreik history:</strong> ${ec.history.length} sourced entries with year, range and uncertainty labels. Year-only history stays in the reference journal. Eight dated events are included without annual repetition: the provisional deposition date (5 Nachexen 2512 IC) and seven labelled scenario defaults from The Blessings that Drew Blood.</p><p><strong>Middenheim Carnival:</strong> included with holidays on 1–8 Brauzeit, using the older published default. Later books leave its seasonal timing flexible; you can adjust the imported event.</p>`,
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
	}, r = vl(n);
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
	let i = await bl(n, r.targets);
	ui?.notifications?.info(`Calendar content: ${i.created.length} created, ${i.connected.length} connected, ${i.skipped.length} preserved or skipped. Reload to refresh the calendars.`);
}
function Yl() {
	game?.system.id === "wfrp4e" && (Y("simpleCalendar") || Y("simpleTimekeeping")) && Hooks.once("setup", () => Cs("calendars", "calendarContent", {
		name: "WFRP calendar content",
		label: "Import WFRP Calendar Content",
		hint: "Review Imperial and Ubersreik holidays, including Middenheim Carnival, and import the historical almanac.",
		icon: "fa-solid fa-calendar-days",
		restricted: !0,
		type: class extends foundry.applications.api.ApplicationV2 {
			async render() {
				try {
					await Jl();
				} catch (e) {
					hs(e instanceof Error ? e.message : String(e), e);
				}
				return this;
			}
		}
	}));
}
// src/module/functions/integrations/health-estimate/estimations.ts
var Xl = {
	wounds: "Compatibility Box: WFRP Wounds",
	unconscious: "Compatibility Box: WFRP Unconscious",
	dead: "Compatibility Box: WFRP Dead"
};
function Zl(e, t) {
	if (!Array.isArray(e) || !e.length) throw Error("Health Estimate must have a default estimation table before applying its preset.");
	let n = Tc(e);
	for (let e of n) if (!e || typeof e != "object" || Array.isArray(e) || typeof e.name != "string" || !Array.isArray(e.estimates) || !Array.isArray(e.actorTypes) || !Array.isArray(e.statusEffects)) throw Error("Health Estimate's estimation tables do not match the supported version 36 schema.");
	let r = new Set(Object.values(Xl)), [i, ...a] = n.filter((e) => !r.has(e.name));
	if (!i || i.actorTypes.length || i.statusEffects.length) throw Error("Health Estimate's first table must remain its unfiltered default table.");
	let o = [
		"character",
		"npc",
		"creature"
	], s = {
		name: Xl.wounds,
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
		c(Xl.unconscious, "unconscious", "Unconscious"),
		c(Xl.dead, "dead", "Gone to Morr..."),
		...a
	];
}
// src/module/foundry/settings/preset-runtime/values.ts
function Ql(e, t) {
	return t instanceof foundry.abstract.DataModel ? t = t.toObject() : e.type instanceof foundry.data.fields.DataField && (t = e.type.toObject(t)), Tc(t);
}
function $l(e, t) {
	let n = e.type, r = Tc(t);
	if (n instanceof foundry.data.fields.DataField) r = Tc(n.clean(r)), n.validate(r, {
		fallback: !1,
		strict: !0
	});
	else if (typeof n == "function" && n.prototype instanceof foundry.abstract.DataModel) r = Tc(n.fromSource(r, { strict: !0 }).toObject());
	else if (n === String && typeof r != "string" || n === Number && typeof r != "number" || n === Boolean && typeof r != "boolean" || n === Array && !Array.isArray(r) || n === Object && (typeof r != "object" || !r || Array.isArray(r))) throw Error("Preset value does not match this world's setting type.");
	if (!X(t, r)) throw Error("Preset value does not match this world's setting schema.");
}
// src/module/foundry/integrations/health-estimate/preset.ts
var eu = "healthEstimate", tu = "core.estimations", nu = {
	title: "Health Estimate",
	watchSettings: ["wfrp4e.uiaCrits"],
	enabled: () => {
		let e = game?.modules.get(eu)?.version;
		return Y("healthEstimate") && game?.system.id === "wfrp4e" && !!e && !foundry.utils.isNewerVersion("36.1.0", e);
	},
	additionalSettings: () => {
		let e = game?.settings.settings?.get(`${eu}.${tu}`);
		if (!e) throw Error("Health Estimate's estimation setting is unavailable. Version 36.1.0 or newer is required.");
		let t = Ql(e, game?.settings.get(eu, tu)), n = game?.settings.get("wfrp4e", "uiaCrits") === !0;
		return [...n ? [{
			namespace: eu,
			key: "core.NPCsJustDie",
			value: !1
		}] : [], {
			namespace: eu,
			key: tu,
			value: Zl(t, n)
		}];
	}
}, ru = /* @__PURE__ */ new WeakSet(), iu = !1;
function au(t) {
	if (!nu.enabled?.()) return;
	let n = game && Reflect.get(game, "healthEstimate");
	if (!n || typeof n.isDead != "function") {
		if (t === "ready" && !iu) {
			iu = !0;
			let t = "Compatibility Box: Health Estimate's death check (game.healthEstimate.isDead) is unavailable, so WFRP death detection was not installed. Health Estimate is using its own death detection.";
			console.error(`${e} | ${t}`), game?.user?.isGM && ui?.notifications?.error(t, { permanent: !0 });
		}
		return;
	}
	if (ru.has(n)) return;
	let r = n.isDead;
	n.isDead = function(e, t) {
		return e.actor && [
			"character",
			"npc",
			"creature"
		].includes(e.actor.type) ? e.actor.statuses.has("dead") : r.call(this, e, t);
	}, ru.add(n);
}
// src/module/foundry/integrations/foundryvtt-simple-calendar-reborn/preset.ts
var ou = "foundryvtt-simple-calendar-reborn";
function su() {
	let e = game?.settings.get(ou, "calendar-configuration");
	if (!Array.isArray(e) || e.length) return e;
	let t = globalThis.SimpleCalendar?.api;
	return JSON.parse(JSON.stringify(t?.getAllCalendars() ?? e));
}
var cu = {
	title: "Simple Calendar Reborn — WFRP Imperial Calendar",
	enabled: () => game?.system.id === "wfrp4e" && Y("simpleCalendar"),
	additionalSettings: () => [{
		namespace: ou,
		key: "calendar-configuration",
		value: kc(su(), game?.settings.get(ou, "active-calendar"), game.time.worldTime, Y("simpleTimekeeping"))
	}]
};
// src/module/foundry/integrations/bossbar/legacy-preferences.ts
function lu(t) {
	return game?.settings.storage?.get("world")?.getSetting(`${e}.${t}`)?.value;
}
function uu() {
	return lu("bossBarEnabled") === !1;
}
// src/module/foundry/integrations/bossbar/preset.ts
function du() {
	return game?.settings.get("wfrp4e", "uiaCrits") === !0;
}
var fu = {
	title: "Boss Bar",
	watchSettings: ["wfrp4e.uiaCrits"],
	ignoreSetting: W.ignorePrompt,
	defaultIgnorePrompt: () => uu() || lu("bossBarIgnoreSetupPrompt") === !0,
	enabled: () => game?.system.id === "wfrp4e",
	additionalSettings: () => {
		if (!du() || game?.settings.get("wfrp4e-compatibility-box", W.stacked) !== !0) return [];
		let e = game?.settings.get(vs, "barStyles"), t = e.find((e) => e.id === "segmented");
		return t && e[0] !== t ? [{
			namespace: vs,
			key: "barStyles",
			value: [t, ...e.filter((e) => e !== t)]
		}] : [];
	}
}, pu = "#a51414d8", mu = "#7e1717dc", hu = "#b31f18d8", gu = "#b01832d8", _u = "#861a24d8", vu = "#541e1ed8", yu = "#6a0e0ed8", bu = "#6f3518e0", xu = "#621010e0", Su = "#771616dc", Cu = "#440707d8", wu = "#14101490", Tu = "#0b080de8", Eu = [
	["Jabberslythe", "#78d61be8"],
	["Chameleon Skink", yu],
	["Kroxigor", yu],
	["Saurus", yu],
	["Suarus", yu],
	["Skink", yu],
	["Slann", yu],
	["Reptile", yu],
	["Ogre Gorger", vu],
	["Gorger", vu],
	["Orca", pu],
	["Bloodletter", Tu],
	["Chaos Fury", Tu],
	["Blue Horror", Tu],
	["Pink Horror", Tu],
	["Nurgling", Tu],
	["Greater Daemon", Tu],
	["Daemon Prince", Tu],
	["Lesser Demon", Tu],
	["Daemon", Tu],
	["Demon", Tu],
	["Rat Ogre", Su],
	["Wolf Rat", Su],
	["Skaven", Su],
	["Bray Shaman", xu],
	["Beastman", xu],
	["Beastmen", xu],
	["Bestigor", xu],
	["Minotaur", xu],
	["Pestigor", xu],
	["Razorgor", xu],
	["Ungor", xu],
	["Gor", xu],
	["Greenskin", bu],
	["Forest Goblin", bu],
	["Night Goblin", bu],
	["Hobgoblin", bu],
	["Goblin", bu],
	["Black Orc", bu],
	["Orc", bu],
	["Snotling", bu],
	["Squig", bu],
	["Skeleton", wu],
	["Ghost", wu],
	["Tomb Banshee", wu],
	["Banshee", wu],
	["Undead", Cu],
	["Vampire", Cu],
	["Ghoul", Cu],
	["Wight", Cu],
	["Liche", Cu],
	["Maurngul", Cu],
	["Mourngul", Cu],
	["Human", pu],
	["Dwarf", mu],
	["Halfling", hu],
	["High Elf", gu],
	["helf", gu],
	["Wood Elf", _u],
	["welf", _u],
	["Ogre", vu]
];
function Du() {
	let e = {};
	for (let [t, n] of Eu) e[t] = n, e[t.toLowerCase()] ??= n;
	return e;
}
function Ou(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? {} : Object.fromEntries(Object.entries(e).filter((e) => e[0].length > 0 && typeof e[1] == "string"));
}
function ku(e = {}) {
	let t = Du();
	for (let [n, r] of Object.entries(e)) {
		let e = t[n] ?? (r ? t[r] : void 0) ?? pu;
		t[n] ??= e, r && (t[r] ??= e);
	}
	return t;
}
function Au(e, t = {}) {
	let n = Ou(e);
	for (let [e, r] of Object.entries(ku(t))) n[e] ??= r;
	return n;
}
// src/module/foundry/integrations/splatter/constants.ts
var ju = "splatter", Mu = "BloodSheetData", Nu = {
	title: "Splatter",
	ignoreSetting: "splatterIgnoreSetupPrompt",
	menuKey: "configureSplatter",
	additionalSettings: () => [{
		namespace: ju,
		key: Mu,
		value: Au(game?.settings.get(ju, Mu), game?.wfrp4e?.config.species ?? {})
	}]
}, Pu = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
}, Fu = {}, Iu = {
	"core.deathState": !0,
	"core.deathStateName": "Gone to Morr..."
}, Lu = {}, Ru = {
	creatureType: "details.species.value",
	creatureTypeCustom: "",
	currentHp: "status.wounds.value",
	maxHp: "status.wounds.max",
	useWounds: !1,
	useBloodsheet: !0
}, zu = {
	bossbar: { description: "Use WFRP Wounds paths and the compatible stacked-bar configuration." },
	splatter: { description: "Use WFRP Wounds and species for blood effects while preserving custom colors." },
	healthEstimate: { description: "Use WFRP Wounds labels: Unconscious at zero under core rules, Mortal Peril! under Up in Arms, Bloodied at 50%, and Gone to Morr... for the Dead condition. Preserve custom and vehicle tables. Recommend disabling NPCs Just Die only under Up in Arms; leave it alone under core." },
	"simple-timekeeping": { description: "Install the standard 400-day Imperial calendar. Keeps world time, events, macros, weather and display preferences. Reload after applying. Pause running clocks during setup and apply the Simple Calendar preset too if using both." },
	"foundryvtt-simple-calendar-reborn": { description: "Replace the active calendar with the standard 400-day Imperial calendar at the current Foundry world timestamp. Existing dates may display differently; timestamps and notes are not migrated. Keeps other calendars and note categories. With ST&C enabled, its clock controls advance time and Simple Calendar follows Foundry time in third-party mode with automatic clock speed zero; use ST&C to change dates and advance time. Pause running clocks during setup." }
};
// src/module/functions/settings-presets/sources.ts
function Bu(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => {
		let n = e.slice(e.lastIndexOf("/") + 1);
		if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.json$/.test(n)) throw Error(`Invalid settings preset namespace filename: ${e}`);
		if (!t || typeof t != "object" || Array.isArray(t)) throw Error(`Settings preset ${e} must be an object of setting values.`);
		let r = Object.fromEntries(Object.entries(t).map(([t, n]) => {
			if (!t.trim()) throw Error(`Settings preset ${e} contains an empty setting key.`);
			return [t, Tc(n)];
		}));
		return [n.slice(0, -5), r];
	}));
}
// src/module/functions/settings-presets/metadata.ts
function Vu(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Settings preset metadata must be an object.");
	return Object.fromEntries(Object.entries(e).map(([e, n]) => {
		if (!t.includes(e)) throw Error(`Metadata has no settings source: ${e}`);
		if (!n || typeof n != "object" || Array.isArray(n)) throw Error(`Invalid metadata for ${e}`);
		let r = n;
		for (let [t, n] of Object.entries(r)) if (t === "promptOnStartup" ? typeof n != "boolean" : !["title", "description"].includes(t) || typeof n != "string") throw Error(`Invalid preset metadata: ${e}.${t}`);
		return [e, r];
	}));
}
// src/module/foundry/settings/presets/sources.ts
var Hu = Bu(/* #__PURE__ */ Object.assign({
	"/src/settings/bossbar.json": Pu,
	"/src/settings/foundryvtt-simple-calendar-reborn.json": Fu,
	"/src/settings/healthEstimate.json": Iu,
	"/src/settings/simple-timekeeping.json": Lu,
	"/src/settings/splatter.json": Ru
})), Uu = Vu(Object.values([zu])[0] ?? {}, Object.keys(Hu)), Wu = {
	"foundryvtt-simple-calendar-reborn": cu,
	"simple-timekeeping": jc,
	bossbar: fu,
	healthEstimate: nu,
	splatter: Nu
};
function Gu(e) {
	if (!Object.hasOwn(Hu, e)) throw Error(`No settings preset exists for ${e}.`);
	return {
		namespace: e,
		values: Hu[e],
		...Wu[e],
		...Uu[e]
	};
}
function Ku() {
	return Object.keys(Hu).sort().map(Gu);
}
// src/module/functions/settings-presets/wfrp.ts
function qu(e, t) {
	return t === "wfrp4e" ? [...e].sort((e, t) => Number(Ju(e)) - Number(Ju(t))) : [...e];
}
function Ju({ namespace: e, key: t }) {
	return e === "wfrp4e" && t === "useGroupAdvantage";
}
function Yu({ namespace: e, key: t }) {
	return e === "wfrp4e" && ["homebrew", "customCursor"].includes(t) || e === "wfrp4e-rnhd" && ["showClock", "syncClock"].includes(t);
}
function Xu({ namespace: e, key: t, value: n }) {
	return e !== "wfrp4e" || t !== "tableSettings" || !n || typeof n != "object" ? [] : [...new Set(Object.values(n).flatMap((e) => String(e).split(",").filter(Boolean)))];
}
// src/module/foundry/settings/preset-runtime/coordination.ts
function Zu() {
	let e = [...game?.modules.values() ?? []].filter((e) => e.active).map((e) => e.api?.settingsPresetCoordinator).filter((e) => e?.version === 1);
	if (e.length > 1) throw Error("Multiple settings coordinators are active; disable the duplicate before applying presets.");
	return e[0];
}
function Qu(e, t) {
	return Zu()?.plan(e, t) ?? {
		entries: t,
		excluded: [],
		conflicts: []
	};
}
async function $u(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
	return await Zu()?.resolve(e, t) ?? !0;
}
// src/module/foundry/settings/preset-runtime/engine.ts
function ed(e) {
	return e === "core" || e === game?.system.id || game?.modules.get(e)?.active === !0;
}
function td(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to inspect settings presets.");
	let n = Qu(e, t), r = {
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
		if (!ed(e.namespace) || !n || n.scope !== "world") r.skipped.push({
			id: t,
			reason: "World setting is unavailable or its namespace is not active"
		});
		else try {
			$l(n, e.value), game.system.id === "wfrp4e" && r.missingTables.push(...Xu(e).filter((e) => !(game?.collections?.get("RollTable"))?.get(e)));
			let i = Ql(n, game.settings.get(e.namespace, e.key));
			if (X(i, e.value)) {
				r.unchanged.push(t);
				continue;
			}
			r.changes.push({
				...e,
				current: i,
				label: n.name ? game.i18n.localize(n.name) : t
			}), r.requiresReload ||= !!n.requiresReload || game.system.id === "wfrp4e" && (Yu(e) || Ju(e)), r.automaticReload ||= game.system.id === "wfrp4e" && Ju(e);
		} catch (e) {
			r.failed.push({
				id: t,
				reason: e instanceof Error ? e.message : String(e)
			});
		}
	}
	return r.missingTables = [...new Set(r.missingTables)], r;
}
var nd = !1;
async function rd(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (nd) throw Error("A settings preset is already being applied.");
	nd = !0;
	try {
		let n = td(e, t), r = {
			...n,
			updated: [],
			blocked: !!(n.failed.length || n.skipped.length || n.conflicts.length || n.missingTables.length),
			requiresReload: !1,
			automaticReload: !1
		};
		if (r.blocked) return r;
		for (let i of qu(n.changes, game.system.id)) {
			let n = `${i.namespace}.${i.key}`;
			try {
				if (!game.user?.isGM || !ed(i.namespace)) throw Error("Preset permissions or availability changed.");
				let a = Qu(e, t), o = a.entries.find((e) => e.namespace === i.namespace && e.key === i.key);
				if (a.conflicts.length || !o || !X(o.value, i.value)) throw Error("Preset choices changed; review the remaining settings again.");
				let s = game.settings.settings?.get(n);
				if (!s || s.scope !== "world") throw Error("World setting is unavailable.");
				if ($l(s, i.value), await game.settings.set(i.namespace, i.key, structuredClone(i.value)), r.requiresReload ||= !!s.requiresReload || game.system.id === "wfrp4e" && (Yu(i) || Ju(i)), r.automaticReload ||= game.system.id === "wfrp4e" && Ju(i), !X(Ql(s, game.settings.get(i.namespace, i.key)), i.value)) throw Error("Foundry did not retain the complete preset value.");
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
		nd = !1;
	}
}
// src/module/foundry/settings/presets/engine.ts
function id(e) {
	return ed(e.namespace) && (e.enabled?.() ?? !0);
}
function ad(e) {
	if (!id(e)) throw Error("Preset is not active.");
	return [...Object.entries(e.values).map(([t, n]) => ({
		namespace: e.namespace,
		key: t,
		value: n
	})), ...e.additionalSettings?.() ?? []];
}
function od(t) {
	if (!id(t)) return {
		changes: [],
		unavailable: [`${t.namespace}: system, module, or integration is not active`]
	};
	let n = td(e, ad(t));
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
async function sd(t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to apply settings presets.");
	if (!id(t)) throw Error("Preset is not active.");
	let n = await rd(e, ad(t));
	if (n.blocked || n.failed.length) throw Error(`${n.updated.length} settings updated. ${[
		...n.skipped,
		...n.failed,
		...n.conflicts
	].map((e) => `${e.id}: ${e.reason}`).join("; ")}${n.missingTables.length ? ` Missing rule tables: ${n.missingTables.join(", ")}` : ""}`);
	return n;
}
// src/module/foundry/settings/preset-runtime/review.ts
var cd = Promise.resolve(), ld = /* @__PURE__ */ new Map();
function ud(e) {
	let t = `${e.owner}:${e.ignoreKey ?? e.title}`;
	if (e.startup && ld.has(t)) return ld.get(t);
	let n = cd.then(() => dd(e)).finally(() => {
		e.startup && ld.delete(t);
	});
	return e.startup && ld.set(t, n), cd = n.catch(() => {}), n;
}
async function dd(e) {
	if (!game?.ready || !game.user?.isGM || e.startup && game.users?.activeGM && game.users.activeGM.id !== game.user.id || e.startup && e.ignoreKey && game.settings.get(e.owner, e.ignoreKey) === !0 || !await $u(e.owner, e.entries())) return null;
	let t = td(e.owner, e.entries());
	if (e.startup && !t.changes.length && !t.skipped.length && !t.failed.length && !t.conflicts.length && !t.missingTables.length) return null;
	let n = !!(t.skipped.length || t.failed.length || t.conflicts.length || t.missingTables.length), r = await foundry.applications.api.DialogV2.wait({
		window: { title: e.title },
		position: { width: 650 },
		content: `${e.description ? `<p>${Z(e.description)}</p>` : ""}${il(t)}`,
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
	if (!X(td(e.owner, e.entries()), t)) throw Error("Settings or preset choices changed during review; reopen the action before applying.");
	let i = await rd(e.owner, e.entries());
	return await al(e.title, i), i;
}
// src/module/foundry/settings/presets/interface.ts
var fd = (e) => [K, q].includes(e.namespace), pd = !1;
function md(e) {
	return e.title ?? game?.modules.get(e.namespace)?.title ?? e.namespace;
}
function hd(e) {
	return e.ignoreSetting ?? `ignoreSettingsPreset-${e.namespace}`;
}
function gd(e) {
	hs(Z(`Settings preset could not be completed: ${e instanceof Error ? e.message : String(e)}`), e);
}
async function _d(t) {
	if (!id(t)) throw Error("Preset is not active.");
	if (fd(t)) return Kl();
	await ud({
		owner: e,
		title: md(t),
		entries: () => ad(t),
		...t.description ? { description: t.description } : {}
	});
}
async function vd(t, n = !1) {
	if (id(t) && game?.system.id === "wfrp4e" && (t.promptOnStartup !== !1 || n)) {
		if (fd(t)) {
			if (pd || !game?.user?.isGM || game.users?.activeGM && game.users.activeGM.id !== game.user.id || game.settings.get("wfrp4e-compatibility-box", hd(t)) === !0 || !od(t).changes.length) return;
			pd = !0;
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
			if (n === "review" && await Kl(), n === "ignore") for (let n of [K, q]) {
				let r = hd({
					...t,
					namespace: n
				});
				game.settings.settings?.has(`wfrp4e-compatibility-box.${r}`) && await game.settings.set(e, r, !0);
			}
		} else await ud({
			owner: e,
			title: md(t),
			entries: () => ad(t),
			startup: !0,
			ignoreKey: hd(t),
			...t.description ? { description: t.description } : {}
		});
	}
}
// src/module/foundry/settings/preset-runtime/export.ts
function yd(e, t, n = !1) {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	if (!ed(e)) throw Error("The selected system or module is not active.");
	if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(e)) throw Error("Invalid settings namespace.");
	if (!t.length) throw Error("Select at least one setting to export.");
	let r = Object.fromEntries([...new Set(t)].map((t) => {
		let r = game?.settings.settings?.get(`${e}.${t}`);
		if (!r || r.scope !== "world" || !r.config && !n) throw Error(`${e}.${t} is not an available selected world setting.`);
		try {
			return [t, Ql(r, game?.settings.get(e, t))];
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
function bd(e, t) {
	return [...game?.settings.settings?.values() ?? []].filter((n) => n.namespace === e && n.scope === "world" && (n.config || t)).sort((e, t) => e.key.localeCompare(t.key));
}
function xd(e, t) {
	let n = foundry.utils.escapeHTML, r = game?.i18n.localize(e.name || e.key) ?? e.key, i, a = !1;
	try {
		let t = Ql(e, game?.settings.get(e.namespace, e.key)), n = JSON.stringify(t);
		i = n.length > 160 ? `${n.slice(0, 160)}…` : n;
	} catch (e) {
		a = !0, i = `Cannot export: ${e instanceof Error ? e.message : String(e)}`;
	}
	return `<div class="form-group"><label>
    <input type="checkbox" name="setting-${t}" ${a ? "disabled" : ""}>
    ${n(r)}${e.config ? "" : " (hidden)"}
    </label><p class="hint"><code>${n(`${e.namespace}.${e.key}`)}</code><br>${n(i)}</p></div>`;
}
async function Sd(e = "src/settings/") {
	if (!game?.user?.isGM) throw Error("Only a GM can export settings.");
	let t = [...new Set([...game.settings.settings?.values() ?? []].filter((e) => e.scope === "world" && ed(e.namespace)).map((e) => e.namespace))].sort();
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
	let a = r.includeHidden === !0, o = bd(i, a);
	if (!o.length) return ui?.notifications?.info("This namespace has no settings matching that selection."), null;
	let s = await foundry.applications.api.DialogV2.input({
		window: { title: `Export ${i} Settings` },
		content: `<p>Select the preferences to include in <strong>${n(i)}.json</strong>.</p>
      <div class="scrollable" style="max-height: 50vh">${o.map(xd).join("")}</div>
      <p class="hint">Save the downloaded file in <code>${n(e)}</code>, then rebuild the module to add its import button.</p>`,
		ok: { label: "Download JSON" },
		rejectClose: !1
	});
	if (!s) return null;
	let c = o.filter((e, t) => s[`setting-${t}`] === !0).map(({ key: e }) => e);
	if (!c.length) return ui?.notifications?.info("No settings selected; nothing was exported."), null;
	let l = yd(i, c, a);
	return foundry.utils.saveDataToFile(`${JSON.stringify(l.values, null, 2)}\n`, "application/json", l.filename), ui?.notifications?.info(`Exported ${c.length} settings to ${n(l.filename)}.`), l;
}
// src/module/foundry/settings/presets/api.ts
function Cd(e) {
	let t = e === void 0 ? Ku().filter(id) : [Gu(e)];
	if (t.some((e) => !id(e))) throw Error("Preset is not active.");
	return t.flatMap(ad);
}
var wd = {
	version: 1,
	getPresets: () => Ku().filter(id).map((e) => ({
		namespace: e.namespace,
		title: md(e),
		entries: ad(e)
	})),
	inspect: (t) => td(e, Cd(t)),
	apply: async (t) => rd(e, Cd(t)),
	resolve: async (t) => $u(e, Cd(t)),
	capture: yd
};
// src/module/functions/settings-presets/conflicts.ts
function Td(e) {
	return Array.isArray(e) ? e.map(Td) : e && typeof e == "object" ? Object.fromEntries(Object.keys(e).sort().map((t) => [t, Td(e[t])])) : e;
}
function Ed(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n.entries) {
		let r = `${e.namespace}.${e.key}`, i = t.get(r) ?? {
			id: r,
			namespace: e.namespace,
			key: e.key,
			candidates: [],
			signature: ""
		}, a = i.candidates.find((e) => e.source === n.source);
		if (a && !X(a.value, e.value)) throw Error(`Preset ${n.source} proposes two values for ${r}.`);
		a || i.candidates.push({
			source: n.source,
			title: n.title,
			value: e.value
		}), t.set(r, i);
	}
	return [...t.values()].filter((e) => e.candidates.some((t) => !X(t.value, e.candidates[0].value))).map((e) => (e.candidates.sort((e, t) => e.source.localeCompare(t.source)), e.signature = JSON.stringify(e.candidates.map(({ source: e, value: t }) => [e, Td(t)])), e)).sort((e, t) => e.id.localeCompare(t.id));
}
function Dd(e, t, n) {
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
		!o || o.signature !== a.signature || o.source !== null && !a.candidates.some((e) => e.source === o.source) ? r.conflicts.push({
			id: e,
			reason: "Conflicting presets need a GM choice in Compatibility Box"
		}) : o.source === null ? r.excluded.push(e) : r.entries.push({
			...i,
			value: a.candidates.find((e) => e.source === o.source).value
		});
	}
	return r;
}
// src/module/foundry/settings/conflicts/sources.ts
function Od(e, t) {
	let n = [];
	for (let [e, t] of game?.modules.entries() ?? []) {
		if (!t.active) continue;
		let r = t.api?.settingsPresets;
		if (r?.version === 1) for (let i of r.getPresets()) n.push({
			source: `${e}:${i.namespace}`,
			title: `${t.title ?? e} — ${i.title}`,
			entries: i.entries.map((e) => ({
				...e,
				value: Tc(e.value)
			}))
		});
	}
	for (let r of t) n.some((t) => t.source.startsWith(`${e}:`) && t.entries.some((e) => e.namespace === r.namespace && e.key === r.key)) || n.push({
		source: `${e}:${r.namespace}`,
		title: game?.modules.get(e)?.title ?? e,
		entries: [r]
	});
	let r = new Set(t.map((e) => `${e.namespace}.${e.key}`));
	return Ed(n).filter((e) => r.has(e.id));
}
// src/module/foundry/settings/conflicts/coordinator.ts
var kd = "settingsPresetConflictChoices";
function Ad() {
	return game?.settings.get("wfrp4e-compatibility-box", "settingsPresetConflictChoices") ?? {};
}
var jd = Promise.resolve(), Md = {
	version: 1,
	inspect: Od,
	decide: Pd,
	async reset() {
		if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required.");
		await game.settings.set(e, kd, {});
	},
	plan(e, t) {
		return Dd(t, Od(e, t), Ad());
	},
	resolve(e, t) {
		let n = jd.then(() => Nd(e, t));
		return jd = n.catch(() => {}), n;
	}
};
async function Nd(e, t) {
	if (!game?.ready || !game.user?.isGM) throw Error("A ready GM session is required to resolve preset conflicts.");
	let n = Od(e, t), r = new Set(Md.plan(e, t).conflicts.map((e) => e.id)), i = {};
	for (let e of n.filter((e) => r.has(e.id))) {
		let t = Z, n = await foundry.applications.api.DialogV2.input({
			window: { title: "Resolve Settings Preset Conflict" },
			content: `<p>Multiple packages recommend different values for <strong>${t(e.id)}</strong>. Choose which recommendation all cooperating presets should follow.</p><div class="scrollable" style="max-height:45vh">${rl([{
				label: "Current",
				value: game.settings.get(e.namespace, e.key)
			}, ...e.candidates.map(({ title: e, value: t }) => ({
				label: e,
				value: t
			}))])}</div><div class="form-group"><label>Preferred settings source</label><select name="source"><option value="">Leave this setting under my control</option>${e.candidates.map((e, n) => `<option value="${n}">${t(e.title)}</option>`).join("")}</select></div><p>This saves your preference without applying settings. You will review changes next. Updated competing values will ask again.</p>`,
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
	return await Pd(e, t, i), !0;
}
async function Pd(t, n, r) {
	if (!game?.ready || !game.user?.isGM) throw Error("GM permission changed.");
	if (!Object.keys(r).length) return;
	let i = Od(t, n);
	for (let [e, t] of Object.entries(r)) {
		let n = i.find((t) => t.id === e);
		if (!n || n.signature !== t.signature) throw Error("Competing presets changed during review; reopen the action.");
		if (t.source !== null && !n.candidates.some((e) => e.source === t.source)) throw Error("Choose a listed settings source.");
	}
	await game.settings.set(e, kd, {
		...Ad(),
		...r
	});
}
// src/types/integrations/fvtt-paper-doll-ui/Equipment.ts
var Fd = [
	"HEAD",
	"BODY",
	"GLOVES",
	"BOOTS"
], Id = ["MAIN_LEFT", "MAIN_RIGHT"], Ld = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
], Rd = {
	BODY: ["body"],
	BOOTS: ["lLeg", "rLeg"],
	GLOVES: ["lArm", "rArm"],
	HEAD: ["head"]
};
function zd(e, t) {
	return t.coverage - e.coverage || t.points - e.points || e.item.name.localeCompare(t.item.name) || e.item.id.localeCompare(t.item.id);
}
function Bd(e, t) {
	return Math.max(...Rd[t].map((t) => e.armourPoints[t]));
}
function Vd(e, t) {
	return Rd[t].filter((t) => e.armourPoints[t] > 0).length;
}
function Hd(e, t, n) {
	return Bd(n.item, e) - Bd(t.item, e) || Vd(n.item, e) - Vd(t.item, e) || zd(t, n);
}
function Ud(e) {
	return e.type === "armour" && e.equipped;
}
function Wd(e) {
	let t = e.armourPoints, n = Ld.filter((e) => t[e] > 0);
	return {
		coverage: n.length,
		item: e,
		points: n.reduce((e, n) => e + t[n], 0)
	};
}
function Gd(e) {
	let t = e.filter(Ud).map(Wd);
	return Fd.flatMap((e) => {
		let n = t.filter((t) => Bd(t.item, e) > 0).sort((t, n) => Hd(e, t, n))[0];
		return n ? [{
			slotId: e,
			uuid: n.item.uuid
		}] : [];
	});
}
function Kd(e, t) {
	return e.twoHanded ? "both" : e.offhand ? t === "l" ? "r" : "l" : t;
}
function qd(e, t) {
	return Number(t.twoHanded) - Number(e.twoHanded) || e.name.localeCompare(t.name) || e.id.localeCompare(t.id);
}
function Jd(e, t) {
	let n = e.filter((e) => e.type === "weapon" && e.equipped).sort(qd);
	return Id.flatMap((e) => {
		let r = e === "MAIN_LEFT" ? "l" : "r", i = n.find((e) => {
			let n = Kd(e, t);
			return n === "both" || n === r;
		});
		return i ? [{
			slotId: e,
			uuid: i.uuid
		}] : [];
	});
}
function Yd(e, t) {
	return [...Gd(e), ...Jd(e, t)];
}
// src/module/functions/integrations/fvtt-paper-doll-ui/derive-paper-doll-slot-state.ts
function Xd(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Zd(e, t, n, r) {
	let i = Xd(e), a = new Map(t.map((e) => [e.slotId, e.uuid]));
	for (let e of [...Fd, ...Id]) {
		if (!r.has(e)) continue;
		let t = i[e]?.["0"] ?? null, o = a.get(e) ?? null;
		o ? (i[e] ??= {}, i[e][0] = o) : t && n.has(t) && (i[e] ??= {}, i[e][0] = null);
	}
	return i;
}
function Qd(e, t, n) {
	let r = new Map(t.map((e) => [e.uuid, e])), i = Xd(e);
	for (let e of Object.values(i)) for (let [t, i] of Object.entries(e)) i && !n.has(i) && r.get(i)?.equipped === !1 && (e[t] = null);
	return i;
}
function $d(e, t, n, r, i) {
	return Qd(Zd(e, t, n, r), i, n);
}
function ef(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
// src/module/functions/integrations/fvtt-paper-doll-ui/is-paper-doll-slot-state.ts
function tf(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function nf(e) {
	return /^(0|[1-9]\d*)$/.test(e);
}
function rf(e) {
	return e == null || typeof e == "string" && e.length > 0;
}
function af(e) {
	return tf(e) && Object.entries(e).every(([e, t]) => e.length > 0 && tf(t) && Object.entries(t).every(([e, t]) => nf(e) && rf(t)));
}
// src/module/functions/integrations/fvtt-paper-doll-ui/equipment-update.ts
function of(e) {
	return e.slotId === "MAIN_LEFT" ? "l" : e.slotId === "MAIN_RIGHT" ? "r" : null;
}
function sf(e, t, n, r) {
	if (t === null) return {};
	let i = {};
	if (t || (i["system.equipped.value"] = !0), e?.type !== "weapon") return i;
	if (!r) throw Error(`Weapon ${e.uuid} requires the actor's main hand.`);
	let a = of(n), o = e.twoHanded ? !1 : a ? a !== r : void 0;
	return o !== void 0 && e.offhand !== o && (i["system.offhand.value"] = o), i;
}
function cf(e) {
	return e === !0 ? { "system.equipped.value": !1 } : {};
}
// src/module/functions/integrations/fvtt-paper-doll-ui/is-item-allowed-in-slot.ts
function lf(e, t) {
	switch (t) {
		case "HEAD": return e.armourPoints.head > 0;
		case "BODY": return e.armourPoints.body > 0;
		case "GLOVES": return e.armourPoints.lArm > 0 || e.armourPoints.rArm > 0;
		case "BOOTS": return e.armourPoints.lLeg > 0 || e.armourPoints.rLeg > 0;
		default: return !1;
	}
}
function uf(e, t, n) {
	return n === "MAIN_LEFT" || n === "MAIN_RIGHT" ? t?.type === "weapon" : n === "HEAD" || n === "BODY" || n === "GLOVES" || n === "BOOTS" ? t?.type === "armour" && lf(t, n) : e !== "weapon" && e !== "armour";
}
// src/module/foundry/integrations/fvtt-paper-doll-ui/wfrp-runtime-types.ts
var df = /* @__PURE__ */ new Set([
	"character",
	"npc",
	"creature"
]);
function Q(e) {
	return typeof e == "object" && !!e;
}
function ff(e) {
	return Q(e) ? typeof e.getFlag == "function" && e.items !== void 0 && typeof e.setFlag == "function" && typeof e.type == "string" && typeof e.uuid == "string" : !1;
}
function pf(e) {
	return ff(e) && df.has(e.type);
}
function mf(e) {
	return Q(e) ? typeof e.id == "string" && typeof e.name == "string" && typeof e.type == "string" && typeof e.update == "function" && typeof e.uuid == "string" : !1;
}
// src/module/foundry/integrations/fvtt-paper-doll-ui/wfrp-equipment.ts
var hf = [
	"head",
	"lArm",
	"rArm",
	"lLeg",
	"rLeg",
	"body"
];
function gf(e) {
	if (!Q(e.system)) throw Error(`WFRP item ${e.uuid} has no usable system data.`);
	return e.system;
}
function _f(e, t) {
	let n = gf(e)[t];
	if (n === void 0) return null;
	if (!Q(n) || typeof n.value != "boolean") throw Error(`WFRP item ${e.uuid} has an invalid ${t} field.`);
	return n.value;
}
function vf(e, t) {
	let n = _f(e, t);
	if (n === null) throw Error(`WFRP item ${e.uuid} is missing its ${t} field.`);
	return n;
}
function yf(e) {
	return _f(e, "equipped");
}
function bf(e) {
	return yf(e) !== null;
}
function xf(e) {
	let t = gf(e).AP;
	if (!Q(t)) throw Error(`WFRP armour ${e.uuid} has no usable AP data.`);
	return Object.fromEntries(hf.map((n) => {
		let r = t[n];
		if (typeof r != "number" || !Number.isFinite(r)) throw Error(`WFRP armour ${e.uuid} has an invalid AP.${n} value.`);
		return [n, r];
	}));
}
function Sf(e) {
	if (!Q(e.system) || !Q(e.system.details)) throw Error(`WFRP actor ${e.uuid} has no usable details data.`);
	let t = e.system.details.mainHand;
	if (t !== "l" && t !== "r") throw Error(`WFRP actor ${e.uuid} has an invalid details.mainHand value.`);
	return t;
}
function Cf(e) {
	if (e.type !== "armour" && e.type !== "weapon") return null;
	let t = {
		equipped: vf(e, "equipped"),
		id: e.id,
		name: e.name,
		uuid: e.uuid
	};
	return e.type === "armour" ? {
		...t,
		armourPoints: xf(e),
		type: "armour"
	} : {
		...t,
		offhand: vf(e, "offhand"),
		twoHanded: vf(e, "twohanded"),
		type: "weapon"
	};
}
function wf(e, t) {
	return uf(e.type, Cf(e), t);
}
async function Tf(e, t, n) {
	let r = Cf(t), i = sf(r, r?.equipped ?? yf(t), n, r?.type === "weapon" ? Sf(e) : null);
	Object.keys(i).length && await t.update(i);
}
async function Ef(e) {
	let t = cf(Cf(e)?.equipped ?? yf(e));
	Object.keys(t).length && await e.update(t);
}
// src/module/foundry/integrations/fvtt-paper-doll-ui/report-paper-doll-error.ts
function Df(e) {
	return e instanceof Error ? e.message : String(e);
}
function Of(e, n) {
	hs(`${t}: ${e}. ${Df(n)}`, n);
}
function kf(e, t) {
	e.catch((e) => Of(t, e));
}
// src/module/foundry/integrations/fvtt-paper-doll-ui/synchronize-paper-doll.ts
var Af = "fvtt-paper-doll-ui", jf = "slots", Mf = /* @__PURE__ */ new Map(), Nf = /* @__PURE__ */ new Set();
function Pf(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, { ...t }]));
}
function Ff(e) {
	let t = e.getFlag(Af, jf);
	if (t === void 0) return {};
	if (!af(t)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
	return Pf(t);
}
function If() {
	let e = game?.settings.get(Af, "globalConfig"), t = /* @__PURE__ */ new Set([...Fd, ...Id]);
	if (Q(e) && Object.keys(e).length === 0) return t;
	if (!Q(e) || !Q(e.SLOTS)) throw Error("Paper Doll's global slot configuration has an invalid shape.");
	let n = Object.values(e.SLOTS);
	if (!n.every(Q)) throw Error("Paper Doll's global slot configuration contains an invalid column.");
	let r = new Set(n.flatMap((e) => Object.keys(e)));
	return r.size ? r : t;
}
function Lf(e) {
	return Mf.has(e.uuid);
}
function Rf(e) {
	if (!ff(e)) throw Error("Paper Doll synchronization requires a WFRP actor document.");
}
function zf(e) {
	if (!e || e.system.id !== "wfrp4e") throw Error("Paper Doll synchronization is only available in a WFRP4e world.");
}
async function Bf(e) {
	let t = Ff(e), n = Array.from(e.items), r = n.map(Cf).filter((e) => e !== null), i = new Set(r.map((e) => e.uuid)), a = n.map((e) => ({
		equipped: yf(e),
		uuid: e.uuid
	})), o = $d(t, Yd(r, Sf(e)), i, If(), a);
	return ef(t, o) ? "unchanged" : (await e.setFlag(Af, jf, o), "synchronized");
}
async function Vf(e) {
	Rf(e), zf(game);
	let t = e;
	if (!pf(t) || !t.isOwner || game.modules.get("fvtt-paper-doll-ui")?.active !== !0 || !Y("paperDoll")) return "unavailable";
	let n = Mf.get(t.uuid);
	if (n) return await n, Vf(t);
	let r = Bf(t).finally(() => {
		Mf.get(t.uuid) === r && Mf.delete(t.uuid);
	});
	return Mf.set(t.uuid, r), r;
}
function Hf(e) {
	pf(e) && e.isOwner && (Nf.has(e.uuid) || (Nf.add(e.uuid), queueMicrotask(() => {
		Nf.delete(e.uuid), kf(Vf(e), `could not synchronize equipped items for ${e.uuid}`);
	})));
}
async function Uf() {
	return zf(game), Promise.all(Array.from(game.actors).filter(pf).map(Vf));
}
// src/module/foundry/settings/get-optional-feature-statuses.ts
function Wf() {
	return Object.entries(gs).map(([e, t]) => ({
		available: _s(e),
		enabled: Y(e),
		id: e,
		targetModuleId: t.targetModuleIds[0],
		targetModuleIds: t.targetModuleIds
	}));
}
// src/module/functions/integrations/paper-doll-argon/bridge.ts
var Gf = ["TRINKET", "WRIST_RIGHT"];
function Kf(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isInteger(n) && Number.isInteger(r) ? n - r : e.localeCompare(t);
}
function qf(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Gf) {
		let r = e[n] ?? {};
		for (let e of Object.keys(r).sort(Kf)) {
			let n = r[e];
			n && t.add(n);
		}
	}
	return [...t];
}
function Jf(e) {
	return {
		left: e.MAIN_LEFT?.["0"] ?? null,
		right: e.MAIN_RIGHT?.["0"] ?? null
	};
}
function Yf({ activeSetId: e, mainHand: t, mainSlots: n, weaponSets: r }) {
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
function Xf(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
// src/module/foundry/integrations/enhancedcombathud/constants.ts
var Zf = "enhancedcombathud", Qf = e, $f = "enhancedcombathud-wfrp4e", ep = "modules/wfrp4e-compatibility-box/templates/argon-actor-config.hbs", tp = "modules/enhancedcombathud/icons", np = [
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
], rp = [{
	key: "ws",
	icon: `${tp}/crossed-swords.webp`
}, {
	key: "bs",
	icon: `${tp}/bolt-spell-cast.webp`
}], ip = [
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
// src/module/foundry/integrations/enhancedcombathud/refresh.ts
async function ap() {
	let e = ui?.ARGON;
	if (e) {
		if (typeof e.refresh != "function") throw Error("Argon's mounted HUD does not expose its required refresh API.");
		await e.refresh.call(e);
	}
}
// src/module/functions/integrations/fvtt-paper-doll-ui/find-slot-changes.ts
function op(e, t, n) {
	return e[t]?.[n] ?? null;
}
function sp(e, t) {
	let n = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]), r = [];
	for (let i of n) {
		let n = /* @__PURE__ */ new Set([...Object.keys(e[i] ?? {}), ...Object.keys(t[i] ?? {})]);
		for (let a of n) {
			let n = op(e, i, a), o = op(t, i, a);
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
// src/module/foundry/integrations/fvtt-paper-doll-ui/enforce-paper-doll-equipped-state.ts
var cp = Symbol.for("paper-doll-wfrp4e.equipped-state");
function lp() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function up(e, t, n) {
	if (!e || typeof t != "function" || typeof n != "function") throw Error("Paper Doll's required equip integration API is unavailable.");
}
function dp(e) {
	if (!Q(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
function fp() {
	return Promise.resolve();
}
function pp() {
	let e = lp(), t = e?.equip, n = globalThis.fromUuid;
	if (up(e, t, n), !n) throw Error("Foundry UUID resolution is unavailable.");
	if (e[cp] === !0) return;
	let r = t;
	e.equip = async function(e, t, i) {
		let a = await n(e);
		if (!mf(a) || ff(this.actor) && !pf(this.actor)) return r.call(this, e, t, i);
		let o = dp(i);
		if (!t) return fp();
		if (!pf(this.actor)) throw Error(`Paper Doll did not provide a WFRP actor while equipping ${a.uuid}.`);
		if (!o) throw Error(`Paper Doll did not provide a valid slot while equipping ${a.uuid}.`);
		if (!wf(a, o.slotId)) throw Error(`Paper Doll attempted to equip ${a.uuid} in incompatible ${o.slotId} slot.`);
		try {
			await Tf(this.actor, a, o);
		} catch (e) {
			Of(`could not equip ${a.name} from Paper Doll`, e);
			try {
				await Vf(this.actor);
			} catch (e) {
				Of(`could not restore ${a.name}'s Paper Doll slot`, e);
			}
			throw e;
		}
	}, e[cp] = !0;
}
// src/module/foundry/integrations/fvtt-paper-doll-ui/enforce-paper-doll-slot-types.ts
var mp = Symbol.for("paper-doll-wfrp4e.slot-type-filter");
function hp() {
	return globalThis.ui?.paperDoll?.prototype ?? null;
}
function gp(e, t) {
	if (!e || typeof t != "function") throw Error("Paper Doll's required filterItems integration API is unavailable.");
}
function _p() {
	let e = hp(), t = e?.filterItems;
	if (gp(e, t), e[mp] === !0) return;
	let n = t;
	e.filterItems = function(e, t, r) {
		return n.call(this, e, t, r).filter((e) => mf(e) && wf(e, t));
	}, e[mp] = !0;
}
// src/module/foundry/integrations/fvtt-paper-doll-ui/slot-tooltips.ts
var vp = ".paper-doll .paper-doll-slot", yp = `data-${e}-drag-tooltip`, bp = `data-${e}-tooltip`, xp = `data-${e}-original-tooltip`, Sp = {
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
}, Cp = !1;
function wp(e) {
	if (!(e instanceof Element)) return null;
	let t = e.closest(vp);
	return t?.closest(".paper-doll") ? t : null;
}
function Tp() {
	document.querySelectorAll(`[${bp}]`).forEach((e) => {
		let t = e.getAttribute(xp);
		t ? e.dataset.tooltip = t : e.removeAttribute("data-tooltip"), e.removeAttribute(bp), e.removeAttribute(xp);
	});
}
function Ep() {
	document.querySelectorAll(vp).forEach((e) => {
		let t = e.getAttribute("data-tooltip");
		t && (e.setAttribute(yp, t), e.removeAttribute("data-tooltip"));
	});
}
function Dp() {
	document.querySelectorAll(`[${yp}]`).forEach((e) => {
		let t = e.getAttribute(yp);
		t && (e.dataset.tooltip = t), e.removeAttribute(yp);
	});
}
function Op(e) {
	if (Cp || e.hasAttribute(bp)) return;
	let t = Sp[e.dataset.id ?? ""];
	if (!t || !game) return;
	let n = game.i18n.localize(t.key), r = n === t.key ? t.fallback : n, i = e.dataset.tooltip;
	i && e.setAttribute(xp, i), e.dataset.tooltip = i ? `${r}: ${i}` : r, e.setAttribute(bp, "");
}
function kp(e) {
	let t = wp(e.target);
	t && Op(t);
}
function Ap() {
	Cp = !0, Tp(), Ep();
}
function jp() {
	Cp = !1, Dp();
}
function Mp() {
	document.addEventListener("pointerover", kp, !0), document.addEventListener("dragstart", Ap, !0), document.addEventListener("dragend", jp, !0);
}
// src/module/foundry/integrations/fvtt-paper-doll-ui/hooks.ts
var Np = /* @__PURE__ */ new Map();
function Pp() {
	return game?.system.id === "wfrp4e" && game.modules.get("fvtt-paper-doll-ui")?.active === !0 && Y("paperDoll");
}
function Fp(e) {
	if (!Q(e) || !("flags" in e)) return { kind: "absent" };
	let t = e.flags;
	if (!Q(t)) return {
		kind: "malformed",
		reason: "the flags update is not an object"
	};
	if (!("fvtt-paper-doll-ui" in t)) return { kind: "absent" };
	let n = t[Af];
	return Q(n) ? "slots" in n ? af(n.slots) ? {
		kind: "valid",
		state: n[jf]
	} : {
		kind: "malformed",
		reason: "the Paper Doll slots update has an invalid shape"
	} : { kind: "absent" } : {
		kind: "malformed",
		reason: "the Paper Doll flag update is not an object"
	};
}
function Ip(e) {
	let t = Fp(e);
	if (t.kind === "malformed") throw Error(`Paper Doll slot update cannot be synchronized: ${t.reason}.`);
	return t.kind === "valid" ? t.state : null;
}
function Lp(e, t) {
	return Array.from(e.items).find((e) => e.uuid === t) ?? null;
}
function Rp(e, t) {
	let n = Np.get(e.uuid) ?? /* @__PURE__ */ new Set();
	n.add(t), Np.set(e.uuid, n);
}
function zp(e) {
	if (!Q(e) || typeof e.slotId != "string") return null;
	let t = Number(e.slotIndex);
	return Number.isInteger(t) ? {
		slotId: e.slotId,
		slotIndex: t
	} : null;
}
async function Bp(e, t, n) {
	let r = (await Promise.allSettled(t)).flatMap((e) => e.status === "rejected" ? [e.reason] : []);
	r.length && (Of(n, AggregateError(r, n)), await Vf(e));
}
function Vp(e, t, n) {
	if (!Pp() || !pf(e)) return;
	let r = [];
	for (let i of [t, n]) {
		if (!Q(i) || typeof i.item != "string") continue;
		let t = zp(i);
		if (!t) throw Error(`Paper Doll swap for ${i.item} has an invalid slot address.`);
		let n = Lp(e, i.item);
		if (!n) throw Error(`Paper Doll swap references item ${i.item} outside the actor.`);
		if (!wf(n, t.slotId)) throw Error(`Paper Doll swap placed ${n.uuid} in incompatible ${t.slotId} slot.`);
		r.push(Tf(e, n, t));
	}
	r.length && kf(Bp(e, r, "one or more Paper Doll slot-swap equipment updates failed"), `could not restore Paper Doll slots after a failed slot swap for ${e.uuid}`);
}
function Hp(e, t) {
	if (!Pp() || !pf(e) || Lf(e)) return;
	let n = Ip(t);
	if (!n) return;
	let r = e.getFlag(Af, jf);
	if (r !== void 0) {
		if (!af(r)) throw Error("Paper Doll's existing slot flag has an invalid shape.");
		for (let t of sp(r, n)) {
			if (!t.from) continue;
			let n = Lp(e, t.from);
			if (!n) throw Error(`Paper Doll removed slot item ${t.from}, but the actor does not own it.`);
			t.to && n.type === "armour" || Rp(e, n.uuid);
		}
	}
}
function Up(e, t) {
	if (!Pp() || !pf(e) || !Ip(t)) return;
	let n = Np.get(e.uuid);
	Np.delete(e.uuid), n?.size && kf(Bp(e, Array.from(n, (t) => {
		let n = Lp(e, t);
		if (!n) throw Error(`Queued Paper Doll unequip item ${t} is no longer owned by the actor.`);
		return n;
	}).map(Ef), `one or more Paper Doll unequip updates failed for ${e.uuid}`), `could not restore Paper Doll slots after a failed unequip for ${e.uuid}`);
}
function Wp(e) {
	Pp() && mf(e) && (e.type === "armour" || e.type === "weapon" || bf(e)) && pf(e.parent) && Hf(e.parent);
}
function Gp() {
	Mp(), Hooks.on("paper-doll-swap", Vp), Hooks.on("preUpdateActor", Hp), Hooks.on("updateActor", Up), Hooks.on("updateItem", Wp), Hooks.once("ready", () => {
		if (Pp()) {
			try {
				_p(), pp();
			} catch (e) {
				throw Of("could not initialize the required Paper Doll integration", e), e;
			}
			kf(Uf(), "could not synchronize all equipped items at startup");
		}
	});
}
// src/module/foundry/integrations/fvtt-paper-doll-ui/register-integration.ts
var Kp = "fvtt-paper-doll-ui", qp = "wfrp4e-compatibility-box-paper-doll";
function Jp() {
	U("fvtt-paper-doll-ui") && Y("paperDoll") && (document.body.classList.add(qp), Gp());
}
// src/module/foundry/integrations/paper-doll-argon/bridge-runtime.ts
var Yp = "activeWeaponSet", Xp = "slots", Zp = "weaponSets";
function Qp(e) {
	let t = e.getFlag(Kp, Xp);
	if (t === void 0) return {};
	if (!af(t)) throw Error(`Paper Doll slots for ${e.uuid} have an invalid shape.`);
	return t;
}
function $p(e) {
	let t = e.getFlag(Zf, Yp);
	if (t === void 0) return "1";
	if (typeof t != "string" || !t.trim()) throw Error(`Argon's active weapon set for ${e.uuid} is invalid.`);
	return t;
}
function em(e, t) {
	if (e == null || typeof e == "string" && e.length > 0) return e;
	throw Error(`${t} must contain an item UUID, null, or be absent.`);
}
function tm(e) {
	let t = e.getFlag(Zf, Zp);
	if (t === void 0) return {};
	if (!Q(t)) throw Error(`Argon weapon sets for ${e.uuid} have an invalid shape.`);
	return Object.fromEntries(Object.entries(t).map(([e, t]) => {
		if (!e || !Q(t)) throw Error(`Argon weapon set ${e || "<empty>"} has an invalid shape.`);
		return [e, {
			primary: em(t.primary, `Argon weapon set ${e} primary slot`),
			secondary: em(t.secondary, `Argon weapon set ${e} secondary slot`)
		}];
	}));
}
async function nm(e, t) {
	let n = tm(e), r = Yf({
		activeSetId: $p(e),
		mainHand: Sf(e),
		mainSlots: Jf(t),
		weaponSets: n
	}), i = !Xf(n, r);
	return i && await e.setFlag(Zf, Zp, r), await ap(), i ? "synchronized" : "unchanged";
}
function rm(e) {
	if (!ff(e)) throw Error("Paper Doll quick items require a WFRP actor document.");
	let t = new Map(Array.from(e.items, (e) => [e.uuid, e]));
	return qf(Qp(e)).map((n) => {
		let r = t.get(n);
		if (!r) throw Error(`Paper Doll quick slot item ${n} is not owned by ${e.uuid}.`);
		if (r.type === "weapon" || r.type === "armour") throw Error(`Paper Doll quick slot ${n} contains ${r.type} equipment.`);
		return r;
	});
}
function im(e) {
	if (!Q(e) || !("flags" in e)) return null;
	let t = e.flags;
	if (!Q(t) || !("fvtt-paper-doll-ui" in t)) return null;
	let n = t[Kp];
	if (!Q(n) || !(Xp in n)) return null;
	let r = n[Xp];
	if (!af(r)) throw Error("The updated Paper Doll slots have an invalid shape.");
	return r;
}
async function am(e) {
	if (!ff(e)) throw Error("Paper Doll–Argon synchronization requires a WFRP actor document.");
	return pf(e) ? e.isOwner ? !Y("paperDoll") || !Y("argonCombatHud") || !Y("paperDollArgonBridge") ? "unavailable" : e.getFlag("fvtt-paper-doll-ui", Xp) === void 0 ? (await ap(), "unchanged") : nm(e, Qp(e)) : (await ap(), "unavailable") : "unavailable";
}
// src/module/foundry/integrations/splatter/configure-splatter.ts
async function om() {
	let e = Gu(ju);
	return await sd(e), {
		automaticBloodColors: game?.settings.get(ju, "useBloodsheet") === !0,
		bloodColorCount: Object.keys(game?.settings.get(ju, Mu)).length,
		speciesPath: e.values.creatureType
	};
}
// src/module/foundry/integrations/bossbar/configuration.ts
function sm(e) {
	return game?.i18n.localize(`wfrp4e-compatibility-box.BossBar.${e}`) ?? e;
}
function cm(t) {
	console.error(`${e} | Boss Bar integration failed.`, t), ui?.notifications?.error(sm("Error"));
}
function lm() {
	return {
		currentHpPath: game?.settings.get(vs, "currentHpPath"),
		maxHpPath: game?.settings.get(vs, "maxHpPath"),
		woundsSystem: game?.settings.get(vs, "woundsSystem")
	};
}
async function um() {
	return await sd(Gu(vs)), ui?.notifications?.info(sm("Configured")), lm();
}
// src/module/foundry/folders/queue.ts
var dm = /* @__PURE__ */ new WeakMap();
async function fm(e, t) {
	let n = (dm.get(e) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		let e = globalThis.navigator?.locks;
		return e ? await e.request("foundry:folder-tidy", t) : t();
	});
	dm.set(e, n);
	try {
		return await n;
	} finally {
		dm.get(e) === n && dm.delete(e);
	}
}
// src/module/wfrp/folders/merge.ts
async function pm(e, t, n, r) {
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
// src/module/functions/wfrp/folders.ts
function mm(e, t) {
	return e.startsWith("wfrp4e-") && [...t].some((e) => /cubicle\s*7/i.test(e.name));
}
function hm(e, t, n) {
	let r = e["warhammer-lib"], i = e.core, a = [
		r?.source,
		e.source,
		t?.startsWith("Compendium.") ? t.split(".")[1] : void 0,
		i?.sourceId?.startsWith("Compendium.") ? i.sourceId.split(".")[1] : void 0
	];
	for (let [t, n] of Object.entries(e)) n && typeof n == "object" && "initialization-folder" in n && a.push(t);
	return a.find((e) => typeof e == "string" && n.has(e));
}
function gm(e, t) {
	if (t < 1) throw Error("WFRP folders need at least one available level.");
	return e.length <= t ? [...e] : [...e.slice(0, t - 1), e.slice(t - 1).join("/")];
}
function _m(e, t, n, r) {
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
			let i = gm(t.map((e) => e.name), r - 1).at(-1), a = t.length === 1 || r === 2 ? n : t[Math.min(t.length - 2, r - 3)].id;
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
			path: gm(t.length ? t : e.fallbackPath ?? [e.fallback], r - 1)
		});
	}
	return f;
}
var vm = ["keepWfrpImportedContentTidy", "keepWfrpCompendiumsTidy"];
function ym(t) {
	if (!game?.user) throw Error("Foundry user is unavailable during WFRP setting registration.");
	for (let n of vm) game.settings.register(e, n, {
		name: `${e}.Settings.WfrpFolders.${n}.Name`,
		hint: `${e}.Settings.WfrpFolders.${n}.Hint`,
		config: !1,
		default: !0,
		scope: "world",
		type: Boolean,
		onChange: t
	});
}
// src/module/wfrp/folders/migration.ts
var bm = "whence-they-hang";
async function xm(t) {
	if (!t.ready || !t.user?.isGM) return;
	let n = t.settings.storage.get("world");
	if (!n) throw Error("World settings storage is unavailable during WFRP migration.");
	for (let r of vm) {
		if (n.getSetting(`wfrp4e-compatibility-box.${r}`)) continue;
		let i = n.getSetting(`${bm}.${r}`)?.value;
		typeof i == "boolean" && await t.settings.set(e, r, i);
	}
}
// src/module/functions/wfrp/folder-defaults.ts
function Sm(e) {
	return e.replace(/^(?:WFRP(?:4e|5e)?|Warhammer Fantasy Roleplay)\s*[-–—:]\s*/i, "");
}
function Cm(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let [r, i] of e) {
		let e = (i, a) => {
			let o = Sm(i.name), s = [...a, o];
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
// src/module/wfrp/folders/tidy.ts
var wm = "__wfrp_tidy_root__", Tm = "Warhammer Fantasy Roleplay";
async function Em(e, t) {
	await fm(e, () => Dm(e, t));
}
async function Dm(e, t) {
	if (!e.ready || !e.user?.isGM || e.system.id !== "wfrp4e") return;
	await xm(e);
	let n = new Set([...e.modules.entries()].filter(([e, t]) => mm(e, t.authors ?? [])).map(([e]) => e));
	n.add("wfrp4e");
	let r = (e) => hm(e.flags ?? {}, e._stats?.compendiumSource, n), i = new Map([...e.modules.entries()].map(([e, t]) => [e, t.title ?? e])), a = Cm([["wfrp4e", e.system.packFolders ?? []], ...[...e.modules.entries()].filter(([e]) => n.has(e)).map(([e, t]) => [e, t.packFolders ?? []])]), o = async (n, o) => {
		let s = [...e.folders].filter((e) => e.type === n), c = new Set([...s, ...o].map((e) => e.folder?.id)), l = s.filter((e) => !e.folder && (e.name === Tm || e.name === "WFRP")).sort((e, t) => Number(c.has(t.id)) - Number(c.has(e.id)) || e.id.localeCompare(t.id)), u = l[0];
		await pm(l, s, o, (e) => !!r(e)), u && u.name !== Tm && await u.update({ name: Tm });
		let d = _m(s.map((e) => ({
			id: e.id,
			name: e.name,
			parent: e.folder?.id ?? null,
			official: !!r(e)
		})), o.map((e) => ({
			id: e.id,
			parent: e.folder?.id ?? null,
			official: !!r(e),
			fallback: Sm(i.get(r(e)) ?? "Content"),
			fallbackPath: n === "Compendium" ? a.packPaths.get(e.id) : void 0
		})), u?.id ?? wm, t);
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
		u ??= await f(Tm, null);
		for (let e of d.folders) await s.find((t) => t.id === e.id).update({
			name: e.name,
			folder: e.parent === wm ? u.id : e.parent
		});
		for (let e of d.entries) {
			let n = u, r = o.find((t) => t.id === e.id), i = /* @__PURE__ */ new Map(), c = [];
			for (let e = r.folder; e; e = e.folder) c.unshift(e);
			for (let [e, n] of c.entries()) {
				let r = gm(c.slice(0, e + 1).map((e) => e.name), t - 1).at(-1);
				n.color != null && i.set(Sm(r), n.color.toString());
			}
			for (let t of e.path) {
				let e = s.filter((e) => Sm(e.name) === Sm(t) && e.folder?.id === n.id).sort((e, t) => e.id.localeCompare(t.id)), r = Sm(t);
				n = e[0] ?? await f(r, n.id, a.colors.get(r) ?? i.get(r));
			}
			await r.update({ folder: n.id });
		}
		let p = async (e) => {
			for (let t of s.filter((t) => t.folder?.id === e.id)) {
				let e = Sm(t.name), n = a.colors.get(e), r = {};
				e !== t.name && (r.name = e), n && n.toLowerCase() !== t.color?.toString().toLowerCase() && (r.color = n), Object.keys(r).length && await t.update(r), await p(t);
			}
		};
		await p(u), await pm([u], s, o, (e) => !!r(e));
	};
	if (e.settings.get("wfrp4e-compatibility-box", "keepWfrpImportedContentTidy")) for (let [t, n] of e.collections.entries()) t !== "Folder" && n.documentClass.schema.has("folder") && await o(t, [...n]);
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
async function Om() {
	game && await Em(game, CONST.FOLDER_MAX_DEPTH);
}
// src/module/functions/folders/empty.ts
function km(e, t) {
	let n = new Set(e.map((e) => e.id)), r = [];
	for (; n.size;) {
		let i = new Set(e.filter((e) => n.has(e.id)).map((e) => e.parent)), a = e.filter((e) => n.has(e.id) && !t.has(e.id) && !i.has(e.id));
		if (!a.length) break;
		for (let e of a) r.push(e), n.delete(e.id);
	}
	return r;
}
// src/module/foundry/folders/empty.ts
function Am() {
	if (!game?.ready || !game.user?.isGM) throw Error("Only a GM in a loaded world can purge folders.");
	return game;
}
async function jm(e) {
	let t = Am();
	if (![
		"world",
		"compendiums",
		"both"
	].includes(e)) throw Error("Invalid folder scope.");
	let n = [], r = () => [...t.packs.entries()].map(([, e]) => e), i = 0;
	if (e !== "compendiums") for (let [e, r] of t.collections.entries()) e !== "Folder" && r.documentClass.schema.has("folder") && n.push({
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
		for (let e of r()) e.locked ? i++ : (await e.getIndex({ fields: ["folder"] }), n.push({
			label: `Compendium: ${e.title}`,
			folders: () => [...e.folders],
			occupied: () => new Set([...e.index].flatMap((e) => e.folder ? [e.folder] : [])),
			editable: () => !e.locked && r().includes(e)
		}));
	}
	return {
		skippedPacks: i,
		candidates: n.flatMap((e) => km(e.folders().map((e) => ({
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
async function Mm(e) {
	let t = Am(), n = {
		deleted: 0,
		skipped: 0
	};
	return await fm(t, async () => {
		for (let t of e.candidates) {
			Am();
			let { group: e, id: r } = t, i = e.folders(), a = i.find((e) => e.id === r);
			if (!a || !e.editable() || e.occupied().has(r) || i.some((e) => e.folder?.id === r)) n.skipped++;
			else {
				if (!await a.delete({
					deleteSubfolders: !1,
					deleteContents: !1
				}) || e.folders().some((e) => e.id === r)) throw Error(`Could not remove empty folder "${a.name}". ${n.deleted} folders removed before stopping.`);
				n.deleted++;
			}
		}
	}), n;
}
// src/module/foundry/folders/purge-dialog.ts
var Nm = "Purge Empty Folders";
function Pm(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
async function Fm() {
	if (!game?.ready || !game.user?.isGM) ui?.notifications?.warn("Only a GM in a loaded world can purge empty folders.");
	else try {
		let e = await foundry.applications.api.DialogV2.wait({
			window: { title: Nm },
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
		let t = await jm(e), n = t.skippedPacks ? ` Skipped ${t.skippedPacks} locked packs.` : "";
		if (!t.candidates.length) {
			ui?.notifications?.info(`No empty folders found.${n}`);
			return;
		}
		let r = t.candidates.map(({ group: e, name: t }) => `<li>${Pm(e.label)}: ${Pm(t)}</li>`).join("");
		if (await foundry.applications.api.DialogV2.wait({
			window: { title: Nm },
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
		let i = await Mm(t);
		ui?.notifications?.info(`Removed ${i.deleted} empty folders. Skipped ${i.skipped} folders that changed.${n}`);
	} catch (e) {
		hs(`${Nm} stopped. Some folders may already have been removed. See the console for details.`, e);
	}
}
// src/module/foundry/diagnostics/startup-report.ts
var Im = {
	rollModes: ["Roll-mode configuration", "wfrp4e"],
	migrationReturns: ["Actor/Item migration returns", "wfrp4e"],
	effectSchema: ["Active Effect changes schema", "wfrp4e"],
	orphanedChat: ["Orphaned chat-card fallback", "wfrp4e"],
	journalCompendiumLinks: ["Journal compendium links", "wfrp4e"],
	mapPinCompendiumLinks: ["Map pin compendium links", "wfrp4e"],
	rollTableCompendiumLookup: ["Compendium lookup for chat table rolls", "wfrp4e"],
	actorlessRuler: ["Actorless-token ruler guard", "wfrp4e"],
	dualWielder: ["Dual Wielder turn-start cleanup", "wfrp4e"],
	scenePacker: ["MAD prefab exclusions", "scene-packer"],
	forgeOwner: ["Forge world-owner detection", "fa-nexus"],
	simpleQuestBox: ["Boxed Text editor preservation", "simple-quest"],
	simpleQuestContent: ["Empty-page template insertion", "simple-quest"],
	argonLegacy: ["Argon legacy module check", "enhancedcombathud"],
	imageContext: ["Token HUD condition image-menu exclusion", "image-context"]
}, Lm = /* @__PURE__ */ new Map(), Rm = [];
function zm() {
	Lm.clear(), Rm.length = 0;
}
function $(e, t, n) {
	Lm.set(e, {
		status: t,
		detail: n
	});
}
function Bm(t, n, r, i) {
	try {
		n() ? $(t, "applied", r) : Lm.get(t)?.status !== "applied" && $(t, i.status, i.detail);
	} catch (n) {
		$(t, "failed", n instanceof Error ? n.message : String(n)), console.error(`${e} | ${Im[t][0]} could not initialize.`, n);
	}
}
function Vm(t, n) {
	Rm.push(n.catch((n) => {
		$(t, "failed", n instanceof Error ? n.message : String(n)), console.error(`${e} | ${Im[t][0]} startup task failed.`, n);
	}));
}
function Hm() {
	return {
		foundryVersion: game?.version ?? "unknown",
		systemId: game?.system.id ?? "unknown",
		systemVersion: game?.system.version ?? "unknown",
		fixes: Object.entries(Im).map(([e, [t, n]]) => ({
			id: e,
			label: t,
			packageId: n,
			version: (n === game?.system.id ? game.system.version : game?.modules.get(n)?.version) ?? "not installed",
			...Lm.get(e) ?? {
				status: "pending",
				detail: "Installation has not reported a result yet."
			}
		}))
	};
}
async function Um() {
	await Promise.allSettled(Rm);
	for (let e of Object.keys(Im)) Lm.has(e) || $(e, "unavailable", "The startup registration did not report a result.");
	let t = Hm();
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
// src/module/foundry/diagnostics/register-diagnostics.ts
var Wm = {
	applied: "Applied",
	"not-needed": "Not needed",
	inactive: "Inactive",
	unsupported: "Unsupported version",
	unavailable: "Unavailable API",
	failed: "Failed",
	pending: "Pending"
};
async function Gm() {
	if (!game?.ready || !game.user?.isGM) {
		ui?.notifications?.warn("Only a GM in a loaded world can open the startup fix report.");
		return;
	}
	let e = Hm(), t = foundry.utils.escapeHTML, n = e.fixes.map((e) => `<tr><td>${t(e.label)}<br><small>${t(e.packageId)} ${t(e.version)}</small></td><td>${Wm[e.status]}</td><td>${t(e.detail)}</td></tr>`).join("");
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
function Km() {
	zm(), Hooks.once("setup", () => {
		Cs("world", "startupFixReport", {
			name: "Startup compatibility fixes",
			label: "Startup Fix Report",
			hint: "Review applied fixes, upstream corrections, unsupported versions, and missing APIs on this client.",
			icon: "fa-solid fa-clipboard-check",
			restricted: !0,
			type: class extends foundry.applications.api.ApplicationV2 {
				async render() {
					return await Gm(), this;
				}
			}
		});
	}), Hooks.once("ready", Um);
}
// src/module/foundry/api/create-module-api.ts
function qm() {
	return {
		getStartupReport: Hm,
		reviewCalendarMigration: Kl,
		showStartupReport: Gm,
		importCalendarContent: bl,
		reviewCalendarContent: Jl,
		settingsPresets: wd,
		settingsPresetCoordinator: Md,
		configureBossBar: um,
		configureSplatter: om,
		purgeEmptyFolders: Fm,
		getOptionalFeatures: Wf,
		syncAllPaperDollActors: Uf,
		syncPaperDollArgonActor: am,
		syncPaperDollActor: Vf,
		tidyWfrpContent: Om
	};
}
// src/module/foundry/api/register-module-api.ts
function Jm() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	let n = t;
	n.api = qm();
}
// src/module/functions/integrations/bossbar/selection.ts
function Ym(e) {
	let t = e.filter((e) => e.enemy), n = (e, t) => e.traits.some((e) => e.trim().toLowerCase() === t), r = t.filter((e) => n(e, "boss"));
	if (r.length) return r;
	let i = t.filter((e) => e.maxWounds >= 30 && n(e, "grim") && (n(e, "leader") || n(e, "champion"))).sort((e, t) => t.maxWounds - e.maxWounds || t.weaponSkill - e.weaponSkill || t.strength - e.strength), a = i[0];
	if (!a) return [];
	let o = i.filter((e) => e.maxWounds === a.maxWounds && e.weaponSkill === a.weaponSkill && e.strength === a.strength);
	return o.length <= 2 ? o : [];
}
// src/module/functions/integrations/bossbar/health.ts
var Xm = {
	currentHpPath: "status.wounds.value",
	maxHpPath: "status.wounds.max",
	woundsSystem: !1
};
function Zm(e) {
	return Object.entries(Xm).every(([t, n]) => e[t] === n);
}
function Qm(e, t) {
	return !Number.isFinite(e) || !Number.isFinite(t) || t <= 0 ? 0 : Math.min(100, Math.max(0, 100 * e / t));
}
function $m(e) {
	let t = Number.isFinite(e.maxCriticals) ? Math.max(0, Math.floor(e.maxCriticals)) : 0;
	return {
		max: t,
		remaining: Math.max(0, t - Math.max(0, e.criticals))
	};
}
function eh(e) {
	return (typeof e == "number" || typeof e == "string" && e.trim() !== "") && Number.isFinite(Number(e));
}
// src/module/foundry/integrations/bossbar/runtime.ts
function th() {
	return ui && Reflect.get(ui, "bossBar");
}
function nh(e) {
	return Array.from(e.combatants).flatMap(({ actor: e, token: t }) => e ? [{
		uuid: e.uuid,
		enemy: t?.disposition === -1 && !e.hasPlayerOwner,
		traits: Array.from(e.items).filter((e) => e.type === "trait").map((e) => e.name),
		maxWounds: e.system.status?.wounds?.max ?? 0,
		weaponSkill: e.system.characteristics?.ws?.value ?? 0,
		strength: e.system.characteristics?.s?.value ?? 0
	}] : []);
}
function rh(e) {
	return {
		wounds: e.system.status?.wounds?.value ?? 0,
		maxWounds: e.system.status?.wounds?.max ?? 0,
		maxCriticals: e.system.status?.criticalWounds?.max ?? 0,
		criticals: Array.from(e.items).filter((e) => e.type === "critical" && eh(e.system?.wounds?.value)).length
	};
}
// src/module/foundry/integrations/bossbar/combat.ts
var ih = /* @__PURE__ */ new WeakSet();
async function ah(e) {
	if (!game?.user?.isGM || game.system.id !== "wfrp4e" || !U("bossbar") || !game.settings.get("wfrp4e-compatibility-box", W.automatic) || !e.scene || ih.has(e)) return;
	let t = Ym(nh(e)), n = e.scene.getFlag("bossbar", "actors") ?? [], r = new Set(n.map((e) => e.uuid)), i = game.settings.get(vs, "barStyles"), a = t.filter((e) => !r.has(e.uuid) && (r.add(e.uuid), !0)).map((e) => ({
		uuid: e.uuid,
		style: i[0]?.id ?? "default",
		hideName: !1
	}));
	if (a.length) {
		ih.add(e);
		try {
			await e.scene.setFlag(vs, "actors", [...n, ...a]);
		} finally {
			ih.delete(e);
		}
	}
}
// src/module/foundry/integrations/bossbar/critical-segments.ts
var oh = "wfrp-bossbar-segments", sh = "http://www.w3.org/2000/svg", ch = [
	"background",
	"bar",
	"foreground"
], lh = [
	"bg",
	"bar",
	"fg"
];
function uh(e, t) {
	let n = ch.map((t) => e.querySelector(`:scope > .bar-${t}`)), r = n.map((e) => e?.querySelector(":scope > img")), i = r.every((e, t) => e?.getAttribute("src")?.split(/[?#]/)[0]?.endsWith(`/bossbar/resources/matching-images/segmented/${lh[t]}.png`)), a = t !== void 0 && i ? String(t) : void 0;
	if (e.dataset.wfrpBossbarSegments === a) return;
	e.querySelectorAll(`.${oh}`).forEach((e) => e.remove()), e.classList.toggle("wfrp-bossbar-segmented", a !== void 0);
	let o = e.closest(".bar-list-item");
	if (o?.classList.toggle("wfrp-bossbar-segmented-row", a !== void 0), a === void 0) o?.style.removeProperty("--wfrp-bossbar-segment-count"), delete e.dataset.wfrpBossbarSegments;
	else {
		o?.style.setProperty("--wfrp-bossbar-segment-count", a), e.dataset.wfrpBossbarSegments = a;
		for (let [t, i] of n.entries()) {
			let n = r[t];
			if (!i || !n) continue;
			let o = e.ownerDocument.createElement("div");
			o.className = oh, o.setAttribute("aria-hidden", "true"), o.style.gridTemplateColumns = a === "0" ? "none" : `repeat(${a}, minmax(0, 1fr))`;
			for (let t = 0; t < Number(a); t++) o.append(dh(e.ownerDocument, n.src));
			i.append(o);
		}
	}
}
function dh(e, t) {
	let n = e.createElementNS(sh, "svg");
	n.setAttribute("viewBox", "829 0 787 361"), n.setAttribute("preserveAspectRatio", "xMidYMid meet");
	let r = e.createElementNS(sh, "image");
	return r.setAttribute("href", t), r.setAttribute("width", "7967"), r.setAttribute("height", "361"), n.append(r), n;
}
// src/module/foundry/integrations/bossbar/wounds-bar.ts
function fh(e, t) {
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
function ph(e, t) {
	return e.find((e) => e.id === t) ?? e[0];
}
// src/module/foundry/integrations/bossbar/display.ts
var mh = "wfrp4e-compatibility-box-bossbar";
function hh(t = th()) {
	if (!t?.element || t.id !== "boss-bar") return;
	let n = t.element;
	n.classList.toggle("wfrp4e-compatibility-box-bossbar-frameless", game?.settings.get(e, W.frameless) === !0);
	let r = du() && game?.settings.get("wfrp4e-compatibility-box", W.stacked) === !0 && Zm(lm());
	if (!r && !n.classList.contains(mh)) return;
	let i = game?.settings.get(vs, "barStyles"), a = game?.settings.get(e, W.woundsStyle), o = ph(i, a);
	n.classList.toggle(mh, r && !!o);
	for (let e of n.querySelectorAll(".bar-list-item")) {
		let n = t.bars.find((t) => t.actor.uuid === e.dataset.uuid)?.actor;
		if (!n) continue;
		let i = e.querySelector(".boss-bar-container:not(.wfrp-bossbar-wounds)");
		if (!i) continue;
		if (!r || !o) {
			uh(i), e.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), i.dataset.wfrpBossbarPrimary && (i.style.removeProperty("--bar-percent"), i.removeAttribute("role"), i.removeAttribute("aria-label"), i.removeAttribute("aria-valuenow"), i.removeAttribute("aria-valuemax"), i.removeAttribute("aria-valuemin"), delete i.dataset.wfrpBossbarPrimary);
			continue;
		}
		let a = rh(n), s = $m(a);
		uh(i, s.max), i.dataset.wfrpBossbarPrimary = "true", i.style.setProperty("--bar-percent", `${Qm(s.remaining, s.max)}%`), gh(i, sm("CriticalCapacity"), s.remaining, s.max);
		let c = e.querySelector(".wfrp-bossbar-wounds");
		c?.dataset.style !== o.id && (e.querySelectorAll("[data-wfrp-bossbar-extra]").forEach((e) => e.remove()), c = fh(e.ownerDocument, o), c.dataset.wfrpBossbarExtra = "", c.dataset.style = o.id, i.before(c)), c && (c.style.setProperty("--bar-percent", `${Qm(a.wounds, a.maxWounds)}%`), c.classList.toggle("wfrp-bossbar-threat", a.wounds <= 0), gh(c, sm("Wounds"), Math.max(0, a.wounds), a.maxWounds));
	}
}
function gh(e, t, n, r) {
	e.setAttribute("role", "progressbar"), e.setAttribute("aria-label", t), e.setAttribute("aria-valuemin", "0"), e.setAttribute("aria-valuemax", String(Math.max(0, r))), e.setAttribute("aria-valuenow", String(Math.min(n, Math.max(0, r))));
}
var _h = !1;
function vh() {
	_h || (_h = !0, queueMicrotask(() => {
		_h = !1;
		let e = th();
		if (e?.element?.isConnected) try {
			(game?.settings.get("wfrp4e-compatibility-box", W.stacked) === !0 || e.element.classList.contains(mh)) && e.updateBars(), hh(e);
		} catch (e) {
			cm(e);
		}
	}));
}
// src/module/foundry/integrations/bossbar/settings.ts
function yh() {
	if (!game) return;
	let t = {
		automatic: lu("bossBarAutomatic") !== !1,
		frameless: !0,
		stacked: lu("bossBarStacked") !== !1
	}, n = uu();
	for (let r of ys) game.settings.register(e, W[r], {
		name: `${e}.BossBar.Settings.${r}.Name`,
		hint: `${e}.BossBar.Settings.${r}.Hint`,
		config: !1,
		default: !n && t[r],
		scope: "world",
		type: Boolean
	});
	game.settings.register(e, W.woundsStyle, {
		name: `${e}.BossBar.Settings.woundsStyle.Name`,
		hint: `${e}.BossBar.Settings.woundsStyle.Hint`,
		config: !1,
		default: "default-grass",
		scope: "world",
		type: String,
		choices: () => Object.fromEntries((game?.settings.get(vs, "barStyles")).map((e) => [e.id, e.name]))
	});
}
function bh(e) {
	if (!game?.user?.isGM || !Y("bossBar")) return;
	let t = e.querySelector(`[name="${vs}.currentHpPath"]`)?.closest(".form-group");
	if (!t || e.querySelector("[data-wfrp-bossbar-setup]")) return;
	let n = e.ownerDocument.createElement("div");
	n.className = "form-group", n.dataset.wfrpBossbarSetup = "";
	let r = e.ownerDocument.createElement("button");
	r.type = "button", r.textContent = sm("Configure"), r.addEventListener("click", async () => {
		r.disabled = !0;
		try {
			let t = await um();
			for (let [n, r] of Object.entries(t)) {
				let t = e.querySelector(`[name="bossbar.${n}"]`);
				t && (typeof r == "boolean" ? t.checked = r : t.value = r);
			}
		} catch (e) {
			cm(e);
		} finally {
			r.disabled = !1;
		}
	}), n.append(r), t.insertAdjacentElement("beforebegin", n);
}
// src/module/foundry/integrations/bossbar/register-integration.ts
function xh() {
	if (game?.system.id === "wfrp4e" && U("bossbar")) {
		yh(), Hooks.on("combatStart", (e) => void ah(e).catch(cm)), Hooks.on("renderBossBar", (e) => hh(e)), Hooks.on("renderSettingsConfig", (e, t) => {
			t instanceof HTMLElement && bh(t);
		});
		for (let e of [
			"updateActor",
			"createItem",
			"updateItem",
			"deleteItem",
			"createActiveEffect",
			"updateActiveEffect",
			"deleteActiveEffect"
		]) Hooks.on(e, vh);
		Hooks.on("updateSetting", (e) => {
			let t = e.key;
			[
				"bossbar.currentHpPath",
				"bossbar.maxHpPath",
				"bossbar.woundsSystem"
			].includes(t) && game?.settings.get("wfrp4e-compatibility-box", W.stacked) === !0 && th()?.render(!0).catch(cm), (t.startsWith("bossbar.") || t.startsWith("wfrp4e-compatibility-box.bossBar") || t === "wfrp4e.uiaCrits") && vh();
		});
	}
}
// src/module/functions/integrations/enhancedcombathud/argon-logic.ts
var Sh = /* @__PURE__ */ new Set([
	"weapon",
	"bite",
	"horn",
	"horns"
]);
function Ch(e) {
	if (e.type !== "skill" || typeof e.advances != "number" || typeof e.advanced != "string" || typeof e.grouped != "string") throw Error(`Argon skill snapshot ${e.id} is missing its classification fields.`);
}
function wh(e) {
	if (e.type !== "spell" || typeof e.lore != "string" || typeof e.memorized != "boolean") throw Error(`Argon spell snapshot ${e.id} is missing its visibility fields.`);
}
function Th(e) {
	if (e.type !== "trait" || typeof e.disabled != "boolean" || typeof e.rollable != "boolean" || typeof e.traitBaseName != "string") throw Error(`Argon trait snapshot ${e.id} is missing its action fields.`);
}
function Eh(e) {
	return e.trim().toLowerCase();
}
function Dh(e) {
	return e.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
function Oh(e) {
	return e.type === "trait" && (Th(e), e.rollable && !e.disabled && Sh.has(e.traitBaseName.toLowerCase()));
}
function kh(e) {
	return e.type === "weapon" || Oh(e);
}
function Ah(e) {
	return e.type === "weapon";
}
function jh(e) {
	return Ch(e), e.advanced === "adv" || e.grouped === "isSpec";
}
function Mh(e) {
	return Ch(e), e.advances > 0;
}
function Nh(e, t) {
	return e.forEach(Ch), t === "basic" ? e.filter((e) => !jh(e)).map((e) => e.id) : t === "advanced" ? e.filter(jh).map((e) => e.id) : t === "trained" ? e.filter(Mh).map((e) => e.id) : e.map((e) => e.id);
}
function Ph(e, t) {
	return e.forEach(wh), (t === "memorized" ? e.filter((e) => e.lore === "petty" || e.memorized) : e).map((e) => e.id);
}
function Fh(e) {
	return e.filter((e) => e.type === "weapon" || Oh(e)).map((e) => e.id);
}
function Ih(e) {
	return e.filter((e) => e.type === "trait" && (Th(e), e.rollable && !e.disabled)).map((e) => e.id);
}
function Lh(e, t) {
	return e.forEach(Ch), t.flatMap((t) => {
		let n = Eh(t.name), r = e.find((e) => Eh(e.name) === n);
		return !r || t.trained && !Mh(r) ? [] : [r.id];
	});
}
function Rh(e) {
	return e.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
}
function zh(e, t) {
	let n = t.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${n}$`, "i").test(e);
}
function Bh(e, t) {
	return t.length ? e.filter((e) => ![
		"skill",
		"weapon",
		"trait",
		"spell",
		"prayer"
	].includes(e.type) && (e.quantity === null || e.quantity > 0) && t.some((t) => zh(e.name, t))).map((e) => e.id) : [];
}
function Vh(e) {
	let t = [];
	return (e.type === "weapon" || Oh(e)) && t.push({
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
function Hh(e, t) {
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
// src/module/foundry/settings/register-module-settings.ts
var Uh = "argonCombatItemPatterns", Wh = "*Draught*, *Potion*";
function Gh(t, n) {
	let r = gs[n];
	r.settingKey && _s(n) && t.register(e, r.settingKey, {
		config: !1,
		default: !0,
		hint: `${e}.Settings.Features.${n}.Hint`,
		name: `${e}.Settings.Features.${n}.Name`,
		requiresReload: !0,
		scope: "world",
		type: Boolean
	});
}
function Kh(t) {
	_s("argonCombatHud") && t.register(e, Uh, {
		config: !1,
		default: Wh,
		hint: `${e}.Settings.ArgonCombatItemPatterns.Hint`,
		name: `${e}.Settings.ArgonCombatItemPatterns.Name`,
		onChange: ap,
		scope: "world",
		type: String
	});
}
function qh() {
	if (!game) throw Error(`${e} | Foundry game is unavailable during settings registration.`);
	Gh(game.settings, "argonCombatHud"), Gh(game.settings, "healthEstimate"), Gh(game.settings, "paperDoll"), Gh(game.settings, "paperDollArgonBridge"), Gh(game.settings, "simpleCalendar"), Gh(game.settings, "simpleTimekeeping"), Kh(game.settings);
}
// src/module/foundry/integrations/enhancedcombathud/actor-flags.ts
var Jh = [
	"skillVisibility",
	"spellVisibility",
	"switchEquip"
];
function Yh(e, t) {
	return e.flags?.[$f]?.[t];
}
function Xh(e, t) {
	return e.getFlag("wfrp4e-compatibility-box", t) ?? Yh(e, t);
}
async function Zh(t) {
	let n = {};
	for (let r of Jh) {
		if (t.getFlag("wfrp4e-compatibility-box", r) !== void 0) continue;
		let i = Yh(t, r);
		i !== void 0 && (n[`flags.${e}.${r}`] = i);
	}
	Object.keys(n).length && await t.update(n);
}
// src/module/foundry/integrations/enhancedcombathud/argon-helpers.ts
function Qh(t, n) {
	if (typeof t != "object" || !t) throw Error(`${e} | ${n} must be an object.`);
	return t;
}
function $h(t, n) {
	if (typeof t != "string" || !t.trim()) throw Error(`${e} | ${n} must be a non-empty string.`);
	return t;
}
function eg(t, n) {
	if (typeof t != "boolean") throw Error(`${e} | ${n} must be a boolean.`);
	return t;
}
function tg(t, n) {
	if (!Number.isNumeric(t)) throw Error(`${e} | ${n} must be numeric.`);
	return Number(t);
}
function ng(e) {
	return e == null || e === "" ? null : tg(e, "item quantity");
}
function rg(t, n, r, i) {
	let a = Xh(t, n);
	if (a === void 0) return i;
	if (!r.includes(a)) throw Error(`${e} | Argon actor flag ${Qf}.${n} has invalid value ${String(a)}.`);
	return a;
}
function ig(e, t, n) {
	(n === "weapon" || n === "trait") && (e.damage = t.DamageString, e.range = eg(t.isRanged, `${n} ${e.name} ranged state`) ? t.Range : void 0, e.reach = t.Reach), n === "skill" && (e.total = t.total?.value), n === "spell" && (e.castingNumber = t.cn?.value), (n === "spell" || n === "prayer") && (e.duration = t.Duration, e.range = t.Range, e.target = t.Target);
}
function ag(e, t = !1) {
	let n = Qh(e, "Argon item"), r = $h(n.type, "Argon item type"), i = $h(n.name, `${r} item name`), a = {
		id: $h(n.id, `${r} ${i} id`),
		name: i,
		quantity: ng(n.quantity?.value ?? n.system?.quantity?.value),
		type: r
	};
	return r === "skill" && (a.advanced = $h(n.advanced?.value, `${i} advanced classification`), a.grouped = $h(n.grouped?.value, `${i} grouped classification`), a.advances = tg(n.advances?.value ?? n.system?.advances?.value, `${i} advances`)), r === "spell" && (a.lore = $h(n.lore?.value, `${i} lore`), a.memorized = eg(n.memorized?.value, `${i} memorized state`)), r === "trait" && (a.disabled = eg(n.system?.disabled, `${i} disabled state`), a.rollable = eg(n.rollable?.value, `${i} rollable state`), a.traitBaseName = Dh(i)), t && ig(a, n, r), a;
}
function og(e) {
	return [...e].map((e) => ag(e));
}
function sg(t, n) {
	let r = new Map([...t].map((e) => [e.id, e]));
	return n.map((t) => {
		let n = r.get(t);
		if (!n) throw Error(`${e} | Selected Argon item ${t} is no longer available.`);
		return n;
	});
}
function cg(e) {
	return Vh(ag(e, !0));
}
function lg(e) {
	let t = rg(e, "skillVisibility", [
		"all",
		"basic",
		"advanced",
		"trained"
	], "all"), n = [...e.itemTypes.skill];
	return sg(n, Nh(og(n), t));
}
function ug(e) {
	let t = rg(e, "spellVisibility", ["all", "memorized"], "all"), n = [...e.itemTypes.spell];
	return sg(n, Ph(og(n), t));
}
function dg(e) {
	let t = [...e.itemTypes.weapon, ...e.itemTypes.trait];
	return sg(t, Fh(og(t)));
}
function fg(e) {
	let t = [...e.itemTypes.trait];
	return sg(t, Ih(og(t)));
}
function pg(e) {
	let t = rp.map((e) => ({
		...e,
		type: "characteristic"
	})), n = ip.map((e) => ({
		name: mg(e),
		trained: !!e.trained
	})), r = [...e.itemTypes.skill], i = sg(r, Lh(og(r), n));
	return [...t, ...i.map((e) => ({
		item: e,
		type: "skill"
	}))];
}
function mg({ nameKey: e, fallback: t, specKey: n, specFallback: r }) {
	let i = yg(`NAME.${e}`, t);
	return n ? `${i} (${yg(n, r)})` : i;
}
function hg(e) {
	let t = game.settings.get("wfrp4e-compatibility-box", "argonCombatItemPatterns") ?? "*Draught*, *Potion*", n = Rh(String(t)), r = [...e.items];
	return sg(r, Bh(og(r), n));
}
function gg(e) {
	return Number(e?.quantity?.value ?? e?.system?.quantity?.value);
}
function _g(e) {
	return kh(ag(e));
}
function vg(e) {
	return Ah(ag(e));
}
function yg(e, t) {
	let n = game.i18n.localize(e);
	return n === e ? t : n;
}
// src/module/foundry/integrations/enhancedcombathud/buttons.ts
function bg(e) {
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
				details: cg(this.item)
			};
		}
	}
	class r extends n {
		get quantity() {
			let e = gg(this.item);
			return Number.isNumeric(e) ? e : null;
		}
		async _onLeftClick(e) {
			ui.ARGON.interceptNextDialog(e.currentTarget), this.item.system?.usable && typeof this.item.system.use == "function" ? await this.item.system.use({ event: e }) : typeof this.item.postItem == "function" ? await this.item.postItem() : this.item.sheet.render(!0);
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
			let e = ug(this.actor), t = dg(this.actor), s = fg(this.actor), c = pg(this.actor).map((e) => e.type === "characteristic" ? new i(e) : new n({ item: e.item })), l = hg(this.actor), u = [
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
				icon: `${tp}/dodging.webp`
			})), l.length && u.push(new o({
				id: "combat-items",
				label: "wfrp4e-compatibility-box.Argon.Group.Items",
				items: l,
				icon: `${tp}/drink-me.webp`,
				buttonClass: r
			})), u;
		}
	}
	return {
		WFRPActionPanel: s,
		WFRPCombatItemButton: r
	};
}
// src/module/foundry/integrations/enhancedcombathud/legacy-module-check.ts
function xg() {
	let e = CONFIG.ARGON?.CORE?.CoreHud;
	if (!e || typeof e.prototype.performModuleCheck != "function") throw Error("Argon CoreHud.performModuleCheck is unavailable.");
	let t = e.prototype.performModuleCheck;
	e.prototype.performModuleCheck = function(...e) {
		if (!Y("argonCombatHud")) return t.apply(this, e);
	};
}
// src/module/functions/integrations/enhancedcombathud/movement.ts
function Sg(e, t) {
	if (!Number.isFinite(e) || e < 0) throw Error(`Argon movement ${t} must be a finite, non-negative number.`);
}
function Cg(e, t, n) {
	Sg(e, "move score"), Sg(t, "maximum distance"), Sg(n, "used distance");
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
function wg(e) {
	return Sg(e, "display distance"), Number.isInteger(e) ? String(e) : e.toFixed(1);
}
// src/module/foundry/integrations/enhancedcombathud/panels.ts
function Tg(e, t) {
	let n = typeof e == "number" ? e : typeof e == "string" && e.trim() ? Number(e) : NaN;
	if (!Number.isFinite(n)) throw Error(`WFRP actor movement ${t} must be numeric.`);
	return n;
}
function Eg(e) {
	if (typeof e != "string" || !e.trim()) throw Error("The active scene must define movement units for the Argon movement HUD.");
	return e;
}
function Dg(e) {
	let t = e.ARGON;
	class n extends t.PORTRAIT.PortraitPanel {
		get configurationTemplate() {
			return ep;
		}
		async _getButtons() {
			let e = await super._getButtons(), t = e.find((e) => e.id === "open-sheet");
			return t && (t.icon = "fas fa-user", t.label = "Open Actor Sheet"), e;
		}
		async _onConfigure(e) {
			await Zh(this.actor), await super._onConfigure(e);
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
			let e = np.map((e) => {
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
			}), n = lg(this.actor).sort((e, t) => e.name.localeCompare(t.name)).map((e) => {
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
			return Tg(this.actor.details.move.value, "value");
		}
		get movementMax() {
			return Tg(this.actor.details.move.run, "run distance");
		}
		get movementUnits() {
			return Eg(canvas.scene.grid.units);
		}
		get movementColor() {
			return this.movementMax ? super.movementColor : "base-movement";
		}
		updateMovementUsed() {
			let e = this.token.document.movementHistory;
			if (!Array.isArray(e)) throw Error("The active token must expose movement history for the Argon movement HUD.");
			this.movementUsed = Math.round(e.reduce((e, t, n) => (e += Tg(t?.cost, `history entry ${n + 1} cost`), e), 0));
		}
		updateMovement() {
			this.updateMovementUsed();
			let e = this.movementMax, t = Cg(this.moveScore, e, this.movementUsed), n = this.movementColor, r = game.i18n.localize(t.movementBlock === 0 ? "wfrp4e-compatibility-box.Argon.Movement.Run" : "wfrp4e-compatibility-box.Argon.Movement.Sprint"), i = this.element.querySelector(".movement-spaces"), a = "";
			for (let e = 0; e < t.availableBubbles; e++) a += `<div class="movement-space ${n}"></div>`;
			for (let e = 0; e < t.usedBubbles; e++) a += "<div class=\"movement-space\"></div>";
			this.element.querySelector(".movement-current").innerText = `${r} ${wg(t.remainingDistance)} ${this.movementUnits}`, this.element.querySelector(".movement-max").innerText = `${wg(t.blockLimit)} ${this.movementUnits}`, this.element.title = game.i18n.format("wfrp4e-compatibility-box.Argon.Movement.Hint", {
				move: this.moveScore,
				distance: wg(t.bubbleDistance),
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
// src/module/foundry/integrations/enhancedcombathud/weapon-sets.ts
function Og(t) {
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
			if (!_g(r) || r.actor !== this.actor) throw Error(`${e} | Weapon sets only accept weapons or weapon-like traits owned by the active actor.`);
			let i = t.currentTarget.dataset.set, a = t.currentTarget.dataset.slot;
			if (!i || !a) throw Error(`${e} | Argon weapon-set drop target has no set or slot identifier.`);
			let o = foundry.utils.deepClone(this.actor.getFlag("enhancedcombathud", "weaponSets") ?? {});
			o[i] ??= {}, o[i][a] = r.uuid, await this.actor.setFlag("enhancedcombathud", "weaponSets", o), await this.render();
		}
		async _onSetChange({ sets: e, active: t }) {
			if (!Xh(this.actor, "switchEquip")) return;
			let n = Hh(Object.entries(e).map(([e, t]) => ({
				id: e,
				items: Object.values(t).filter(Boolean).filter(vg).map((e) => ({
					equipped: !!e.isEquipped,
					id: e.id
				}))
			})), String(t));
			n.length && await this.actor.updateEmbeddedDocuments("Item", n);
		}
	}
	return r;
}
// src/module/foundry/integrations/enhancedcombathud/register-integration.ts
function kg() {
	U("enhancedcombathud") ? Y("argonCombatHud") ? (Bm("argonLegacy", () => (xg(), !0), "Legacy enhancedcombathud-wfrp4e package check bypass installed.", {
		status: "unavailable",
		detail: "Argon's legacy module-check API is unavailable."
	}), Hooks.on("argonInit", (e) => {
		let { WFRPActionPanel: t } = bg(e), { WFRPDrawerPanel: n, WFRPMovementHud: r, WFRPPortraitPanel: i } = Dg(e), a = Og(e);
		e.definePortraitPanel(i), e.defineDrawerPanel(n), e.defineMainPanels([t, e.ARGON.PREFAB.PassTurnPanel]), e.defineMovementHud(r), e.defineWeaponSets(a), e.defineSupportedActorTypes([
			"character",
			"npc",
			"creature"
		]);
	})) : $("argonLegacy", "inactive", "Argon compatibility is disabled.") : $("argonLegacy", "inactive", "Argon Combat HUD is not active.");
}
// src/module/foundry/integrations/paper-doll-argon/panels.ts
function Ag(e) {
	let t = e.ARGON, { WFRPCombatItemButton: n } = bg(e);
	class r extends t.MAIN.ActionPanel {
		get label() {
			return "wfrp4e-compatibility-box.PaperDollArgon.Panel.QuickItems";
		}
		async _getButtons() {
			return rm(this.actor).map((e) => new n({ item: e }));
		}
	}
	return { PaperDollQuickItemsPanel: r };
}
// src/module/foundry/integrations/paper-doll-argon/report-bridge-error.ts
function jg(e) {
	return e instanceof Error ? e.message : String(e);
}
function Mg(e, n) {
	hs(`${t}: ${e}. ${jg(n)}`, n);
}
function Ng(e, t) {
	e.catch((e) => Mg(t, e));
}
// src/module/foundry/integrations/paper-doll-argon/register-integration.ts
function Pg() {
	return Y("paperDoll") && Y("argonCombatHud") && Y("paperDollArgonBridge");
}
function Fg(e, t) {
	Pg() && pf(e) && im(t) && Ng(am(e), `could not synchronize Paper Doll slots with Argon for ${e.uuid}`);
}
function Ig() {
	U("fvtt-paper-doll-ui") && U("enhancedcombathud") && Pg() && (Hooks.on("argonInit", (e) => {
		if (!e || typeof e != "object" && typeof e != "function" || !("defineMainPanels" in e) || typeof e.defineMainPanels != "function") throw Error("Argon main panel registration API is unavailable.");
		let { PaperDollQuickItemsPanel: t } = Ag(e);
		e.defineMainPanels([t]);
	}), Hooks.on("updateActor", Fg));
}
// src/module/foundry/settings/conflicts/register.ts
function Lg() {
	Hooks.once("setup", () => {
		game?.settings.register(e, kd, {
			name: "Settings preset conflict choices",
			hint: "Preferred sources for conflicting settings presets.",
			scope: "world",
			config: !1,
			default: {},
			type: Object
		}), Cs("presets", "resetPresetConflictChoices", {
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
					}) === "reset" && await Md.reset(), this;
				}
			}
		});
	});
}
// src/module/foundry/settings/presets/register.ts
function Rg() {
	Ss("presets"), Lg();
	let t = Ku().filter(id);
	Hooks.once("setup", () => {
		Cs("presets", "exportSettingsPreset", {
			name: "Settings presets",
			label: "Export Settings Preset",
			hint: "Choose exact world settings to download as namespace JSON.",
			icon: "fa-solid fa-file-export",
			restricted: !0,
			type: class extends foundry.applications.api.ApplicationV2 {
				async render() {
					try {
						await Sd();
					} catch (e) {
						gd(e);
					}
					return this;
				}
			}
		});
		for (let n of t) {
			let t = md(n);
			game?.settings.register(e, hd(n), {
				name: `Ignore ${t} setup prompts`,
				hint: `Do not prompt when ${t} settings differ from the included preset. Uncheck to resume startup checks for all GMs in this world.`,
				config: !1,
				default: n.defaultIgnorePrompt?.() ?? !1,
				scope: "world",
				type: Boolean
			}), ["foundryvtt-simple-calendar-reborn", "simple-timekeeping"].includes(n.namespace) || Cs("presets", n.menuKey ?? `configureSettingsPreset-${n.namespace}`, {
				name: `${t} settings preset`,
				settingKey: hd(n),
				label: `Apply ${t} Preset`,
				hint: `Apply only the settings included in Compatibility Box's ${t} preset.`,
				icon: "fa-solid fa-gears",
				restricted: !0,
				type: class extends foundry.applications.api.ApplicationV2 {
					async render() {
						try {
							await _d(n);
						} catch (e) {
							gd(e);
						}
						return this;
					}
				}
			});
		}
	}), Hooks.on("updateSetting", (e) => {
		let n = e.key;
		for (let e of t.filter((e) => e.watchSettings?.includes(n))) vd(e, !0).catch(gd);
	}), Hooks.once("ready", async () => {
		for (let e of t) try {
			await vd(e);
		} catch (e) {
			gd(e);
		}
	});
}
// src/module/foundry/integrations/scene-packer/repair-mad-prefab-exclusions.ts
var zg = /* @__PURE__ */ new WeakSet();
function Bg(t) {
	if (zg.has(t)) return !1;
	let n = t.Initialise, r = /* @__PURE__ */ new Set();
	return t.Initialise = function(t, ...i) {
		let a = t?.moduleName, o = a ? game?.modules.get(a) : void 0, s = t?.ignoredCompendiumPacks;
		if (!a?.startsWith("mad-") || !o?.active || !o.packs) return n.call(this, t, ...i);
		let c = `${a}-prefabs`;
		return !Array.isArray(s) || !s.includes(c) || Array.from(o.packs).some((e) => e.name === c) ? n.call(this, t, ...i) : (r.has(a) || (r.add(a), console.warn(`${e} | ${a}: skipped unavailable Scene Packer exclusion ${c}.`)), n.call(this, {
			...t,
			ignoredCompendiumPacks: s.filter((e) => e !== c)
		}, ...i));
	}, zg.add(t), !0;
}
// src/module/foundry/integrations/scene-packer/register-integration.ts
function Vg() {
	U("scene-packer") ? game?.system.id === "wfrp4e" ? typeof ScenePacker > "u" || typeof ScenePacker.Initialise != "function" ? $("scenePacker", "unavailable", "Scene Packer is active but its initialization API is unavailable at init.") : Bm("scenePacker", () => Bg(ScenePacker), "Guard installed for unavailable MAD prefab exclusions.", {
		status: "not-needed",
		detail: "The exclusion guard was already installed."
	}) : $("scenePacker", "inactive", "Requires a WFRP4e world.") : $("scenePacker", "inactive", "Scene Packer is not active.");
}
// src/module/foundry/integrations/fa-nexus/repair-forge-owner-detection.ts
var Hg = /* @__PURE__ */ new WeakSet();
function Ug(e, t) {
	if (Hg.has(e)) return !1;
	let n = e._detectForgeAccountId;
	return e._detectForgeAccountId = async function() {
		let e = t();
		return this.isRunningOnForge() && typeof e == "string" && /^[a-zA-Z0-9_-]+$/.test(e) && e !== "bazaar" ? (this.forgeAccountId = e, !0) : n.call(this);
	}, Hg.add(e), !0;
}
// src/module/foundry/integrations/fa-nexus/register-integration.ts
async function Wg() {
	if (!U("fa-nexus")) {
		$("forgeOwner", "inactive", "FA Nexus is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e" || typeof ForgeAPI > "u") {
		$("forgeOwner", "inactive", "Requires WFRP4e with Forge's API present.");
		return;
	}
	let t = Array.from(document.querySelectorAll("script[type=\"module\"][src]")).find((e) => {
		let t = new URL(e.src).pathname;
		return /\/modules\/fa-nexus\/(?:[^/]+\/)?scripts\/core\/forge-integration\.js$/.test(t);
	});
	if (!t) $("forgeOwner", "unavailable", "The loaded FA Nexus Forge integration script could not be located."), console.warn(`${e} | FA Nexus Forge integration script was not found; patch skipped.`);
	else try {
		let e = (await import(
			/* @vite-ignore */
			t.src
)).forgeIntegration;
		if (typeof e?._detectForgeAccountId != "function" || typeof e.isRunningOnForge != "function") throw Error("FA Nexus Forge integration API is unavailable.");
		Ug(e, () => ForgeAPI.lastStatus?.ownerUserId), $("forgeOwner", "applied", "Forge owner-metadata fallback installed on the loaded Nexus service.");
	} catch (t) {
		$("forgeOwner", "failed", t instanceof Error ? t.message : String(t)), console.error(`${e} | Could not install FA Nexus Forge compatibility.`, t);
	}
}
// src/module/foundry/integrations/simple-quest/journal-theme.ts
function Gg() {
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
// src/module/foundry/integrations/simple-quest/apply-template.ts
var Kg = "https://source.unsplash.com/random", qg = "<div style=\"background:#9ca7a5;border-top:2px solid #252525;border-bottom:2px solid #252525;padding:0 0.5em\">\n<p><span style=\"color:#252525;text-transform:uppercase\"><strong>Lorem Ipsum</strong></span></p>\n<p><span style=\"color:#252525\">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni asperiores dicta vitae veritatis. Aut atque nobis voluptatem at alias, quam similique corrupti mollitia nihil laboriosam, consequuntur quibusdam ut, quos nesciunt.</span></p>\n</div>";
function Jg(e) {
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
async function Yg(e, t, n) {
	await t.close({ force: !0 });
	try {
		let r = t.document.text?.content ?? "", i = new URL(e, document.baseURI).pathname.endsWith("/modules/simple-quest/templates/JournalTemplates/boxed-text.html") ? qg : await fetch(e).then((e) => {
			if (!e.ok) throw Error(`Simple Quest template request failed: ${e.status}`);
			return e.text();
		}), a = i.match(/https:\/\/source\.unsplash\.com\/random/g) ?? [], o = [];
		for (let e of a) o.push(await Jg(n));
		let s = 0;
		i = i.replaceAll(Kg, () => o[s++] || Kg), await t.document.update({ "text.content": r + "\n" + i });
	} finally {
		t.render(!0);
	}
}
// src/module/foundry/integrations/simple-quest/template-dialog.ts
var Xg = {
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
async function Zg(e, t) {
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
			icon: Xg[r] ?? "fad fa-file-invoice",
			callback: () => Yg(n, e, t)
		};
	});
	(await new t.applications.api.DialogV2({
		window: { title: game.i18n.localize("simple-quest.page-template.label") },
		content: game.i18n.localize("simple-quest.page-template.description"),
		position: { width: 600 },
		buttons: a
	}).render({ force: !0 })).classList.add("simple-quest-dialog", "page-template-dialog");
}
// src/module/foundry/integrations/simple-quest/register-integration.ts
var Qg = ["simpleQuestBox", "simpleQuestContent"];
function $g() {
	if (!U("simple-quest")) for (let e of Qg) $(e, "inactive", "Simple Quest is not active.");
	else if (game?.system.id !== "wfrp4e") for (let e of Qg) $(e, "inactive", "Requires a WFRP4e world.");
	else if (Gg(), !["5.3.0", "5.4.5"].includes(game.modules.get("simple-quest")?.version ?? "") || !["14.368", "14.369"].includes(game.version)) {
		for (let e of Qg) $(e, "unsupported", "Requires SQ 5.3.0 or 5.4.5 on Foundry 14.368 or 14.369.");
		console.warn(`${e} | Simple Quest page-template fixes skipped for unverified versions.`);
	} else {
		Hooks.on("getHeaderControlsJournalEntryPageHandlebarsSheet", (e, t) => {
			let n = e;
			if (!n?.document || !Array.isArray(t)) return;
			let r = t.find((e) => e.class === "simple-quest-page-template");
			r && typeof r.onClick == "function" && (r.onClick = () => Zg(n, foundry));
		});
		for (let e of Qg) $(e, "applied", "Replacement Page Template action registered for the supported versions.");
	}
}
// src/module/foundry/integrations/image-context/register-integration.ts
var e_ = /* @__PURE__ */ new WeakSet(), t_ = "#token-hud .status-effects .effect-control[data-status-id], #token-hud .condition-effects .effect-control[data-status-id]";
function n_() {
	if (!U("image-context")) {
		$("imageContext", "inactive", "Image Context is not active.");
		return;
	}
	if (game?.system.id !== "wfrp4e") {
		$("imageContext", "inactive", "Requires a WFRP4e world.");
		return;
	}
	if (typeof ImageContext > "u" || typeof ImageContext.onContextMenu != "function") {
		$("imageContext", "unavailable", "Image Context is active but its context-menu API is unavailable at init.");
		return;
	}
	if (e_.has(ImageContext)) {
		$("imageContext", "applied", "The token HUD condition exclusion is already installed.");
		return;
	}
	let e = ImageContext.onContextMenu;
	ImageContext.onContextMenu = function(t) {
		if (!(t.target instanceof Element && t.target.closest(t_))) return e.call(this, t);
	}, e_.add(ImageContext), $("imageContext", "applied", "Image menus are excluded only from WFRP token HUD condition controls.");
}
// src/module/functions/patches/wfrp4e/migration-return-support.ts
function r_(e) {
	if ([
		"9.6.1",
		"9.6.2",
		"9.6.3",
		"9.6.4"
	].includes(e)) return "affected";
	let t = /^(\d+)\.\d+\.\d+$/.exec(e);
	return t && Number(t[1]) >= 10 ? "fixed" : "unknown";
}
// src/module/foundry/patches/wfrp4e/repair-data-model-migrations.ts
var i_ = /* @__PURE__ */ new WeakSet();
function a_(e) {
	let t = e.migrateData;
	return typeof t != "function" || i_.has(e) ? !1 : (e.migrateData = function(e) {
		let n = t.call(this, e);
		return n === void 0 ? e : n;
	}, i_.add(e), !0);
}
function o_() {
	return game?.system.id !== "wfrp4e" || r_(game.system.version) !== "affected" ? 0 : [...Object.values(CONFIG.Actor.dataModels), ...Object.values(CONFIG.Item.dataModels)].reduce((e, t) => e + Number(a_(t)), 0);
}
// src/module/foundry/patches/wfrp4e/repair-roll-modes.ts
function s_() {
	let e = game?.wfrp4e?.config, t = CONFIG.ChatMessage.modes;
	return !e || !t ? !1 : (e.rollModes = foundry.utils.deepClone(t), !0);
}
// src/module/functions/patches/wfrp4e/chat-card-references.ts
function c_(e) {
	return typeof e == "object" && e ? e : {};
}
function l_(e) {
	return typeof e == "string" ? e : "";
}
function u_(e) {
	let t = c_(e);
	return {
		kind: "speaker",
		actor: l_(t.actor),
		scene: l_(t.scene),
		token: l_(t.token)
	};
}
function d_(e) {
	return u_(c_(c_(e).context).speaker);
}
function f_(e) {
	let t = e.system ?? {};
	switch (e.type) {
		case "test": return [d_(t.testData)];
		case "opposed": {
			let e = c_(t.opposedTestData);
			return [d_(e.attackerTestData), d_(e.defenderTestData)];
		}
		case "magic": {
			let e = c_(t.sourceData), n = [{
				kind: "uuid",
				uuid: l_(e.actor)
			}];
			return e.test && n.push({
				kind: "message",
				id: l_(e.test),
				required: !1
			}), n;
		}
		case "handler": {
			let e = c_(t.opposedData), n = [{
				kind: "message",
				id: l_(e.attackerMessageId),
				required: !0
			}];
			return e.targetSpeakerData && n.push(u_(e.targetSpeakerData)), e.defenderMessageId && n.push({
				kind: "message",
				id: l_(e.defenderMessageId),
				required: !0
			}), n;
		}
		default: return [];
	}
}
// src/module/foundry/patches/wfrp4e/chat-card-text.ts
function p_(e) {
	let t = new DOMParser().parseFromString(e, "text/html").body;
	for (let e of t.querySelectorAll("script, style, template, button, input, select, textarea, .chat-button, a[data-action], [role='button'], .dice-tooltip, .applied-breakdown, .secret:not(.revealed), [hidden], [aria-hidden='true']")) e.remove();
	for (let e of t.querySelectorAll("img")) e.replaceWith(t.ownerDocument.createTextNode(e.alt ? ` ${e.alt} ` : ""));
	for (let e of t.querySelectorAll("br, p, div, li, tr, h1, h2, h3, h4, h5, h6")) e.append(t.ownerDocument.createTextNode("\n"));
	for (let e of t.querySelectorAll("td, th")) e.append(t.ownerDocument.createTextNode(" "));
	return (t.textContent ?? "").split("\n").map((e) => e.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}
function m_(e) {
	let t = document.createElement("p");
	return t.textContent = e, t.style.whiteSpace = "pre-line", t;
}
// src/module/foundry/patches/wfrp4e/render-orphaned-chat-cards.ts
var h_ = /* @__PURE__ */ new WeakSet();
function g_(e) {
	if (!game) return !1;
	switch (e.kind) {
		case "speaker": return e.scene && e.token ? !!game.scenes.get(e.scene)?.tokens.get(e.token)?.actor : !!(e.actor && game.actors.get(e.actor));
		case "uuid": return !!(e.uuid && fromUuidSync(e.uuid)?.documentName === "Actor");
		case "message": {
			let t = game.messages.get(e.id);
			return t ? t._source.type === "test" && f_(t._source).every(g_) : !e.required;
		}
	}
}
async function __(e, t) {
	let n = e.toObject(), r = e.visible && e.isContentVisible, i = r ? p_(n.content) : "", a = new foundry.documents.ChatMessage({
		...n,
		type: "base",
		system: {},
		flags: {},
		content: m_(i).outerHTML
	}), o = await a.renderHTML(t), s = o.querySelector(".message-content");
	if (s) {
		let e = r && a.isContentVisible ? i : p_(s.innerHTML);
		s.replaceChildren(m_(e));
	}
	return o.addEventListener("contextmenu", (e) => e.stopPropagation(), { capture: !0 }), o;
}
function v_() {
	let e = CONFIG.ChatMessage.documentClass?.prototype;
	if (!e || typeof e.renderHTML != "function" || h_.has(e)) return !1;
	let t = e.renderHTML;
	return e.renderHTML = function(e) {
		return f_(this._source).some((e) => !g_(e)) ? __(this, e) : t.call(this, e);
	}, h_.add(e), !0;
}
// src/module/foundry/patches/wfrp4e/active-effect-schema.ts
function y_(e) {
	let t = e.schema;
	if (t.fields.changes) return !1;
	let n = e.defineSchema;
	return e.defineSchema = function() {
		let e = n.call(this);
		return e.changes ||= foundry.data.ActiveEffectTypeDataModel.defineSchema().changes, e;
	}, t.extendFields({ changes: foundry.data.ActiveEffectTypeDataModel.defineSchema().changes }), !0;
}
function b_() {
	return Object.values(CONFIG.ActiveEffect?.dataModels ?? {}).reduce((e, t) => e + Number(y_(t)), 0);
}
// src/module/foundry/patches/wfrp4e/guard-actorless-token-ruler.ts
var x_ = /* @__PURE__ */ new WeakSet(), S_ = /* @__PURE__ */ new WeakSet();
function C_() {
	let e = CONFIG.Token?.rulerClass?.prototype, t = foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	if (!e || !t || e === t || !Object.prototype.isPrototypeOf.call(t, e) || typeof e._getSegmentStyle != "function" || typeof t._getSegmentStyle != "function" || x_.has(e)) return !1;
	let n = e._getSegmentStyle, r = t._getSegmentStyle;
	return e._getSegmentStyle = function(...e) {
		if (this.token.actor) return n.apply(this, e);
		if (!S_.has(this.token)) {
			S_.add(this.token);
			let { uuid: e, actorId: t, actorLink: n } = this.token.document;
			console.warn("WFRP4e Compatibility Box | Token has no actor; using the core ruler style.", {
				tokenUuid: e,
				actorId: t,
				actorLink: n,
				worldActorExists: !!(t && game?.actors.get(t))
			});
		}
		return r.apply(this, e);
	}, x_.add(e), !0;
}
// src/module/foundry/patches/wfrp4e/official-compendiums.ts
function w_(e, t) {
	return [...e.packs.entries()].flatMap(([n, r]) => {
		let i = r.metadata?.packageName;
		if (r.documentName !== t || !r.visible || !i) return [];
		let a = e.modules.get(i);
		return i === "wfrp4e" || a?.active && mm(i, a.authors ?? []) ? [{
			key: n,
			pack: r,
			packageId: i
		}] : [];
	}).sort((e, t) => e.key.localeCompare(t.key));
}
function T_(e, t, n, r) {
	let i = w_(e, t).filter(({ pack: e }) => e.index.has(n)), a = r?.pack?.split(".")[0] ?? hm(r?.flags ?? {}, r?._stats?.compendiumSource, new Set(i.map(({ packageId: e }) => e)));
	return i.sort((e, t) => Number(t.packageId === a) - Number(e.packageId === a));
}
// src/module/foundry/patches/wfrp4e/journal-compendium-links.ts
var E_ = /^(Actor|Item|JournalEntry|RollTable|Scene|Macro|Playlist|Cards)\.([a-z\d]{16})((?:\.[a-z]+\.[a-z\d]{16})*)$/i, D_ = /* @__PURE__ */ new WeakSet();
async function O_(e, t, n) {
	let r = t.relativeTo, i = r?.documentName === "JournalEntryPage" ? r.parent : r;
	if (i?.documentName !== "JournalEntry") return null;
	let [, a, o, s = ""] = E_.exec(n) ?? [];
	if (!a || !o) return null;
	for (let { pack: t } of T_(e, a, o, i)) {
		let e = await foundry.utils.fromUuid(t.getUuid(o) + s);
		if (e && t.visible) return e;
	}
	return null;
}
function k_() {
	let e = CONFIG.ux?.TextEditor;
	if (!e || typeof e._createContentLink != "function" || typeof e._embedContent != "function" || typeof e._parseEmbedConfig != "function" || typeof foundry.utils.fromUuid != "function" || D_.has(e)) return !1;
	let t = e._createContentLink, n = e._embedContent;
	return e._createContentLink = async function(e, n = {}) {
		let r = await t.call(this, e, n);
		if (!game || !r.matches("a.content-link.broken")) return r;
		let [, i, a, o, s] = e;
		return a ? (await O_(game, n, i === "UUID" ? a : `${i}.${a}`))?.toAnchor({
			name: s,
			dataset: { hash: o }
		}) ?? r : r;
	}, e._embedContent = async function(e, t = {}) {
		let r = await n.call(this, e, t), i = e.groups?.config;
		if (!game || !i || !r?.matches("p.broken.content-embed")) return r;
		let a = this._parseEmbedConfig(i, { relative: t.relativeTo });
		if (!a.uuid) return r;
		let o = await O_(game, t, a.uuid);
		return o ? await o.toEmbed({
			label: e.groups?.label,
			...a,
			uuid: o.uuid
		}, t) ?? r : r;
	}, D_.add(e), !0;
}
// src/module/foundry/patches/wfrp4e/map-pin-compendium-links.ts
var A_ = /* @__PURE__ */ new WeakSet();
function j_() {
	let t = CONFIG.Note?.documentClass?.prototype, n = CONFIG.Note?.objectClass?.prototype;
	if (!t || !n || A_.has(t) || typeof foundry.utils.fromUuid != "function") return !1;
	let r = Object.getOwnPropertyDescriptor(t, "entry"), i = n._draw;
	if (!r?.get || typeof i != "function") return !1;
	let a = r.get, o = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new Map();
	function c(e) {
		let t = s.get(e);
		return t || (t = foundry.utils.fromUuid(e).finally(() => s.delete(e)), s.set(e, t)), t;
	}
	async function l(e) {
		o.delete(e);
		let { entryId: t, pageId: n } = e;
		if (game && t && !a.call(e)) for (let { pack: r } of T_(game, "JournalEntry", t, e.parent)) {
			let i = await c(r.getUuid(t));
			if (e.entryId !== t || e.pageId !== n) return;
			if (i?.pages && r.visible && (!n || i.pages.get(n))) {
				o.set(e, {
					entryId: t,
					pageId: n,
					journal: i,
					pack: r
				});
				return;
			}
		}
	}
	return Object.defineProperty(t, "entry", {
		...r,
		get() {
			let e = a.call(this);
			if (e) return e;
			let t = o.get(this);
			return t?.pack.visible && t.entryId === this.entryId && t.pageId === this.pageId ? t.journal : e;
		}
	}), n._draw = async function(t) {
		try {
			await l(this.document);
		} catch (t) {
			console.warn(`${e} | Could not resolve map pin ${this.document.entryId}.`, t);
		}
		return i.call(this, t);
	}, Hooks.on("updateNote", (t, n) => {
		n && typeof n == "object" && ("entryId" in n || "pageId" in n) && t.object?.draw().catch((t) => {
			console.error(`${e} | Could not redraw the updated map pin.`, t);
		});
	}), A_.add(t), !0;
}
// src/module/foundry/patches/wfrp4e/roll-table-compendium-lookup.ts
var M_ = /* @__PURE__ */ new Set([
	"menu",
	"scatter",
	"hitloc"
]), N_ = ["flags.wfrp4e.key", "flags.wfrp4e.column"], P_ = /* @__PURE__ */ new WeakSet(), F_ = /* @__PURE__ */ new WeakMap();
function I_(e) {
	let t = F_.get(e);
	return t || (t = e.getIndex({ fields: N_ }).finally(() => F_.delete(e)), F_.set(e, t)), t;
}
function L_(e, t, n) {
	return e.settings.get("wfrp4e", "tableSettings")?.[n ? `${t}-${n}` : t]?.split(",").filter(Boolean) ?? [];
}
function R_(e) {
	return e.getFlag("wfrp4e", "column");
}
function z_(e, t, n) {
	let r = e.find((e) => (n(e) || null) === (t || null));
	if (r) return [r];
	if (t) return [];
	let i = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = n(t);
		e && !i.has(e) && i.set(e, t);
	}
	return [...i.values()];
}
function B_(e) {
	let t = e[0];
	return t && e.length > 1 ? {
		name: t.name.split("-")[0].trim(),
		columns: e
	} : t;
}
function V_(e, t, n, r) {
	let i = L_(e, n, r), a = i.length > 1 ? i.map((t) => e.tables.get(t)) : [], o = a.includes(void 0);
	if (!o) return {
		stale: o,
		table: t.findTable(n, r)
	};
	let s = a.filter((e) => e !== void 0);
	return {
		stale: o,
		table: B_(z_(s.length ? s : [...e.tables].filter((e) => e.getFlag("wfrp4e", "key") === n), r, R_))
	};
}
async function H_(e, t, n) {
	let r = w_(e, "RollTable").sort((e, t) => Number(t.packageId === "wfrp4e-core") - Number(e.packageId === "wfrp4e-core")), i = (await Promise.all(r.map(async ({ pack: e }) => ({
		pack: e,
		index: await I_(e)
	})))).filter(({ pack: e }) => e.visible).map(({ pack: e, index: t }) => [...t].map((t) => ({
		pack: e,
		id: t._id,
		name: t.name,
		key: t.flags?.wfrp4e?.key,
		column: t.flags?.wfrp4e?.column
	}))), a = L_(e, t, n), o = a.length ? a : n ? L_(e, t, null) : [];
	if (o.length) {
		let e = i.flat(), t = o.flatMap((t) => {
			let r = e.find((e) => e.id === t && (!n || a.length > 0 || e.column === n));
			return r ? [r] : [];
		}), r = n && t.length > 1 ? z_(t, n, (e) => e.column) : t;
		if (r.length) return r;
	}
	for (let e of i) {
		let r = z_(e.filter((e) => e.key === t), n, (e) => e.column);
		if (r.length) return r;
	}
	return [];
}
function U_() {
	let e = game?.wfrp4e?.tables;
	if (!e || P_.has(e) || typeof e.formatChatRoll != "function" || typeof e.findTable != "function" || typeof e.generalizeTable != "function" || typeof foundry.utils.fromUuid != "function") return !1;
	let t = e.formatChatRoll;
	e.formatChatRoll = async function(e, n, r) {
		if (!game) return t.call(this, e, n, r);
		let i = this.generalizeTable(e);
		if (M_.has(i)) return t.call(this, e, n, r);
		let a = game, o = V_(a, this, i, r);
		if (o.table && !o.stale) return t.call(this, e, n, r);
		let s = o.table ? [] : await H_(a, i, r), c = B_((await Promise.all(s.map(async ({ pack: e, id: t }) => {
			if (!e.visible) return null;
			let n = await foundry.utils.fromUuid(e.getUuid(t));
			return e.visible ? n : null;
		}))).filter((e) => e !== null));
		if (!c && !o.stale) return t.call(this, e, n, r);
		let l = V_(a, this, i, r).table ?? c, u = Object.create(this);
		return u.findTable = (e, t) => e === i && (t ?? null) === (r ?? null) ? l : this.findTable(e, t), t.call(u, e, n, r);
	};
	let n = CONFIG.TextEditor?.enrichers.find(({ pattern: e }) => e.source.startsWith("@Table\\["));
	if (n) {
		let t = n.enricher;
		n.enricher = async function(n, r) {
			let [i, a] = n[1]?.split(",") ?? [];
			if (!game || !i || n[2]) return t.call(this, n, r);
			let o = e.generalizeTable(i), s = V_(game, e, o, null).table, c = s || M_.has(o) ? [] : await H_(game, o, null), l = s?.name ?? (c.length > 1 ? c[0]?.name.split("-")[0]?.trim() : c[0]?.name) ?? i, u = document.createElement("a");
			u.className = "action-link", Object.assign(u.dataset, {
				action: "clickTable",
				table: i,
				modifier: a || "0"
			});
			let d = document.createElement("i");
			return d.className = "fas fa-list", u.append(d, l), u;
		};
	}
	return P_.add(e), !0;
}
// src/module/foundry/patches/wfrp4e/dual-wielder-cleanup.ts
function W_(e) {
	return typeof e == "object" && !!e;
}
var G_ = /* @__PURE__ */ new WeakSet(), K_ = ["10.0.3", "10.1.2"];
function q_() {
	if (!game || !K_.includes(game.system.version)) return !1;
	let e = CONFIG.Actor.documentClass;
	if (typeof e != "function") return !1;
	let t = e.prototype;
	if (!W_(t) || typeof t.getScripts != "function") return !1;
	let n = t;
	if (G_.has(n)) return !1;
	let r = n.getScripts;
	return n.getScripts = function(e, ...t) {
		let n = r.call(this, e, ...t);
		return e === "startTurn" ? n.filter((e) => !(e.context?.effect?.statuses.has("dualwielder") && /^this\.effect\.delete\(\);?$/.test(e.script.trim()))) : n;
	}, G_.add(n), !0;
}
// src/module/foundry/patches/wfrp4e/apply-compatibility-patches.ts
function J_() {
	if (game?.system.id !== "wfrp4e") {
		for (let e of [
			"rollModes",
			"migrationReturns",
			"effectSchema",
			"orphanedChat",
			"journalCompendiumLinks",
			"mapPinCompendiumLinks",
			"rollTableCompendiumLookup",
			"actorlessRuler",
			"dualWielder"
		]) $(e, "inactive", "Requires a WFRP4e world.");
		return;
	}
	Bm("rollModes", s_, "WFRP received an independent copy of core roll modes.", {
		status: "unavailable",
		detail: "WFRP configuration or core Chat Message roll modes are unavailable."
	});
	let e = r_(game.system.version);
	e === "fixed" ? $("migrationReturns", "not-needed", "WFRP 10.0.0+ returns migrated data natively; no wrapper installed.") : e === "unknown" ? $("migrationReturns", "unsupported", "Migration fallback is verified only for WFRP 9.6.1–9.6.4; inspect this version.") : Bm("migrationReturns", o_, "Fallback installed for WFRP 9.6.1–9.6.4 Actor/Item migration returns.", {
		status: "unavailable",
		detail: "No callable Actor/Item migration methods were available."
	}), Object.keys(CONFIG.ActiveEffect?.dataModels ?? {}).length ? Bm("effectSchema", b_, "Missing changes fields supplied using Foundry's schema factory.", {
		status: "not-needed",
		detail: "All registered effect models already define changes."
	}) : $("effectSchema", "unavailable", "Active Effect data-model registry is unavailable or empty."), Bm("orphanedChat", v_, "Text fallback installed for chat cards with missing actor/token references.", {
		status: "unavailable",
		detail: "The chat document renderer is unavailable."
	}), Bm("journalCompendiumLinks", k_, "Compendium fallback installed for missing journal links and embeds.", {
		status: "unavailable",
		detail: "Foundry's text enrichment or UUID resolution API is unavailable."
	}), Bm("mapPinCompendiumLinks", j_, "Compendium fallback installed for map pins with missing world journals.", {
		status: "unavailable",
		detail: "Foundry's map note or UUID resolution API is unavailable."
	}), Bm("rollTableCompendiumLookup", U_, "Compendium fallback installed for WFRP chat table rolls.", {
		status: "unavailable",
		detail: "WFRP's chat table or Foundry's UUID resolution API is unavailable."
	});
	let t = CONFIG.Token?.rulerClass?.prototype === foundry.canvas?.placeables?.tokens?.TokenRuler?.prototype;
	Bm("actorlessRuler", C_, "Core-style fallback installed for tokens without actors.", {
		status: t && CONFIG.Token?.rulerClass ? "not-needed" : "unavailable",
		detail: t && CONFIG.Token?.rulerClass ? "The world uses Foundry's core ruler." : "The expected WFRP/core ruler methods are unavailable."
	}), K_.includes(game.system.version) ? Bm("dualWielder", q_, "Duplicate status deletion filtered; the unique GM retains turn-start cleanup.", {
		status: "unavailable",
		detail: "Actor script collection is unavailable."
	}) : $("dualWielder", "unsupported", "Cleanup is verified for WFRP 10.0.3 and 10.1.2; inspect this version before enabling.");
}
// src/module/wfrp/folders/hooks.ts
var Y_, X_ = !1, Z_ = !1;
function Q_() {
	game?.ready && game.user?.isActiveGM && (X_ ? Z_ = !0 : (clearTimeout(Y_), Y_ = setTimeout(() => {
		$_();
	}, 1e3)));
}
async function $_() {
	if (game?.ready && game.user?.isActiveGM && !X_) {
		X_ = !0, Z_ = !1;
		try {
			await Om();
		} catch (e) {
			console.error(`${t}: WFRP folder cleanup failed.`, e), ui?.notifications?.error(`${t}: WFRP cleanup failed and may be incomplete. See the console for details.`, {
				console: !1,
				permanent: !0
			});
		} finally {
			X_ = !1, Z_ && Q_();
		}
	}
}
function ev() {
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
		!t.pack && !t.parent && Q_();
	});
	Hooks.on("updateSetting", (e) => {
		let t = e;
		(t.key === "core.compendiumConfiguration" || t.key?.startsWith("wfrp4e-compatibility-box.keepWfrp")) && Q_();
	}), Hooks.on("updateUser", Q_), Hooks.on("userConnected", Q_), Hooks.once("ready", Q_);
}
// src/module/functions/imported-content/folders.ts
function tv(e, t, n, r) {
	let i = new Map(e.map((e) => [e.id, e])), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set();
	function s(e) {
		if (e === null) return [];
		let t = a.get(e);
		if (t) return t;
		let n = i.get(e);
		if (!n) return [];
		if (o.has(e)) throw Error(`Cycle in world folder ancestry at ${e}.`);
		o.add(e);
		let r = [...s(n.folder?.id ?? null), n];
		return o.delete(e), a.set(e, r), r;
	}
	let c = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set();
	for (let e of t) for (let t of s(e.folderId)) (e.imported ? c : l).add(t.id);
	let u = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = s(t.id);
		for (let r of e) u.set(r.id, Math.max(u.get(r.id) ?? 0, e.length)), c.has(t.id) && t.id !== n || l.add(r.id);
	}
	let d = /* @__PURE__ */ new Map(), f = [];
	for (let e of t) {
		if (!e.imported) continue;
		let t = s(e.folderId);
		if (t.some(({ id: e }) => e === n)) continue;
		let i = t.findIndex(({ id: e }) => !l.has(e) && (u.get(e) ?? 0) < r);
		i === -1 ? f.push({
			id: e.id,
			path: t
		}) : d.set(t[i], t.slice(0, i));
	}
	return {
		branches: d,
		documents: f
	};
}
// src/module/functions/imported-content/source.ts
function nv(e, t) {
	return typeof e == "string" && e.startsWith(`Compendium.${t}.`);
}
function rv(e, t) {
	let n = e._stats?.compendiumSource;
	if (n?.startsWith("Compendium.")) return nv(n, t);
	let r = e.flags?.core;
	return nv(r?.sourceId, t);
}
// src/module/foundry/imported-content/settings.ts
var iv = "keepImportedContentTidy";
function av(t) {
	game?.settings.register(e, iv, {
		name: `${e}.Settings.ImportedContent.${iv}.Name`,
		hint: `${e}.Settings.ImportedContent.${iv}.Hint`,
		config: !1,
		default: !1,
		onChange: t,
		scope: "world",
		type: Boolean
	});
}
// src/module/foundry/imported-content/tidy.ts
var ov = "importedContentRoot";
function sv(e) {
	return e;
}
function cv(e) {
	return e?.ready === !0 && e.user?.isGM === !0 && e.user.isActiveGM === !0 && e.settings.get("wfrp4e-compatibility-box", "keepImportedContentTidy") === !0;
}
function lv(e) {
	return e.flags?.[n]?.[ov] === !0;
}
async function uv(e, t) {
	let n = t?.id ?? null;
	if ((e.folder?.id ?? null) !== n && (await e.update({ folder: n }), (e.folder?.id ?? null) !== n)) throw Error(`Could not move ${e.name}.`);
}
async function dv(e, t) {
	let r = (sv(e).collections.get(t)?.contents ?? []).filter((e) => !e.pack && !e.parent), i = new Map(r.map((e) => [e.id, e])), a = r.map((e) => ({
		id: e.id,
		folderId: e.folder?.id ?? null,
		imported: rv(e, n)
	}));
	if (!a.some((e) => e.imported)) return;
	let o = [...sv(e).folders].filter((e) => e.type === t), s = o.filter(lv), c = s.find((e) => !e.folder) ?? s[0];
	c?.folder && await uv(c, null);
	let l = CONST.FOLDER_MAX_DEPTH, u = tv(o, a, c?.id, l);
	if (!u.branches.size && !u.documents.length) return;
	async function d(e) {
		let n = await CONFIG.Folder.documentClass.create({
			type: t,
			...e
		});
		if (!n) throw Error(`Could not create ${t} folder ${String(e.name)}.`);
		return o.push(n), n;
	}
	let f = c ?? await d({
		name: "Drowsy's WFRP4e Compatibility Box",
		sorting: "a",
		flags: { "wfrp4e-compatibility-box": { [ov]: !0 } }
	});
	async function p(e) {
		let t = f, n = Math.min(e.length, l - 1);
		for (let r = 0; r < n; r++) {
			let n = e[r], i = r === l - 2 ? e.slice(r).map((e) => e.name).join("/") : n.name;
			t = o.find((e) => e.folder?.id === t.id && e.name === i) ?? await d({
				name: i,
				folder: t.id,
				sorting: n.sorting,
				color: n.color?.toString() ?? null
			});
		}
		return t;
	}
	for (let [e, t] of u.branches) await uv(e, await p(t));
	for (let { id: e, path: t } of u.documents) await uv(i.get(e), await p(t));
}
async function fv() {
	let e = game;
	e && cv(e) && await fm(e, async () => {
		if (cv(e)) for (let t of CONST.FOLDER_DOCUMENT_TYPES) t !== "Compendium" && await dv(e, t);
	});
}
// src/module/hooks/imported-content.ts
function pv(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var mv, hv = !1, gv = !1;
function _v() {
	cv(game) && (hv ? gv = !0 : (clearTimeout(mv), mv = setTimeout(() => void vv(), 1e3)));
}
async function vv() {
	hv = !0, gv = !1;
	try {
		await fv();
	} catch (e) {
		console.error(`${r}: Imported content cleanup failed.`, e), ui?.notifications?.error(`${r}: Imported content cleanup failed. See the console for details.`, {
			permanent: !0,
			console: !1
		});
	} finally {
		hv = !1, gv && _v();
	}
}
function yv(e) {
	let t = e;
	!t.pack && !t.parent && rv(t, "wfrp4e-compatibility-box") && _v();
}
function bv() {
	Hooks.once("setup", () => av(_v)), Hooks.once("ready", _v), Hooks.on("userConnected", _v), Hooks.on("updateUser", _v);
	for (let e of CONST.FOLDER_DOCUMENT_TYPES) e !== "Compendium" && (Hooks.on(`create${e}`, yv), Hooks.on(`update${e}`, (e, t) => {
		Object.hasOwn(t, "folder") && yv(e);
	}));
	Hooks.on("updateFolder", (e, t) => {
		let n = e;
		n.type !== "Compendium" && !n.pack && Object.hasOwn(t, "folder") && _v();
	}), Hooks.on("deleteFolder", (e) => {
		let t = e;
		t.type !== "Compendium" && !t.pack && _v();
	}), Hooks.on("preImportAdventure", (e, t, n, r) => {
		let i = e, a = n, o = r;
		if (nv(i.uuid, "wfrp4e-compatibility-box")) for (let e of CONST.FOLDER_DOCUMENT_TYPES) for (let t of [...a[e] ?? [], ...o[e] ?? []]) {
			let e = t._stats;
			t._stats = {
				...pv(e) ? e : {},
				compendiumSource: i.uuid
			};
		}
	}), Hooks.on("importAdventure", _v);
}
// src/module/hooks/register-module-hooks.ts
function xv() {
	qs(), Km(), Hooks.once("setup", () => ym(Q_)), ev(), bv(), Hooks.once("canvasInit", () => au("canvasInit")), Hooks.once("ready", () => au("ready")), Hooks.once("init", () => {
		J_(), qh(), ql(), Nc(), Yl(), Gc(), Rl(), Vg(), Vm("forgeOwner", Wg()), $g(), n_(), Jm(), xh(), kg(), Jp(), Ig(), Rg();
	});
}
// src/module/init/index.ts
xv();

//# sourceMappingURL=wfrp4e-compatibility-box.mjs.map