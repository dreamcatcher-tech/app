import { r as require$$1, g as getDefaultExportFromCjs, c as commonjsGlobal } from "./index-b27a6772.js";
import { p as pathExports } from "./path-9f4b90fa.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var dist = { exports: {} };
(() => {
  var e = { 650: (e2) => {
    var r2 = Object.prototype.toString;
    var n = typeof Buffer.alloc === "function" && typeof Buffer.allocUnsafe === "function" && typeof Buffer.from === "function";
    function isArrayBuffer(e3) {
      return r2.call(e3).slice(8, -1) === "ArrayBuffer";
    }
    function fromArrayBuffer(e3, r3, t) {
      r3 >>>= 0;
      var o = e3.byteLength - r3;
      if (o < 0) {
        throw new RangeError("'offset' is out of bounds");
      }
      if (t === void 0) {
        t = o;
      } else {
        t >>>= 0;
        if (t > o) {
          throw new RangeError("'length' is out of bounds");
        }
      }
      return n ? Buffer.from(e3.slice(r3, r3 + t)) : new Buffer(new Uint8Array(e3.slice(r3, r3 + t)));
    }
    function fromString(e3, r3) {
      if (typeof r3 !== "string" || r3 === "") {
        r3 = "utf8";
      }
      if (!Buffer.isEncoding(r3)) {
        throw new TypeError('"encoding" must be a valid string encoding');
      }
      return n ? Buffer.from(e3, r3) : new Buffer(e3, r3);
    }
    function bufferFrom(e3, r3, t) {
      if (typeof e3 === "number") {
        throw new TypeError('"value" argument must not be a number');
      }
      if (isArrayBuffer(e3)) {
        return fromArrayBuffer(e3, r3, t);
      }
      if (typeof e3 === "string") {
        return fromString(e3, r3);
      }
      return n ? Buffer.from(e3) : new Buffer(e3);
    }
    e2.exports = bufferFrom;
  }, 274: (e2, r2, n) => {
    var t = n(339);
    var o = Object.prototype.hasOwnProperty;
    var i = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = i ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    ArraySet.fromArray = function ArraySet_fromArray(e3, r3) {
      var n2 = new ArraySet();
      for (var t2 = 0, o2 = e3.length; t2 < o2; t2++) {
        n2.add(e3[t2], r3);
      }
      return n2;
    };
    ArraySet.prototype.size = function ArraySet_size() {
      return i ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    };
    ArraySet.prototype.add = function ArraySet_add(e3, r3) {
      var n2 = i ? e3 : t.toSetString(e3);
      var a = i ? this.has(e3) : o.call(this._set, n2);
      var u = this._array.length;
      if (!a || r3) {
        this._array.push(e3);
      }
      if (!a) {
        if (i) {
          this._set.set(e3, u);
        } else {
          this._set[n2] = u;
        }
      }
    };
    ArraySet.prototype.has = function ArraySet_has(e3) {
      if (i) {
        return this._set.has(e3);
      } else {
        var r3 = t.toSetString(e3);
        return o.call(this._set, r3);
      }
    };
    ArraySet.prototype.indexOf = function ArraySet_indexOf(e3) {
      if (i) {
        var r3 = this._set.get(e3);
        if (r3 >= 0) {
          return r3;
        }
      } else {
        var n2 = t.toSetString(e3);
        if (o.call(this._set, n2)) {
          return this._set[n2];
        }
      }
      throw new Error('"' + e3 + '" is not in the set.');
    };
    ArraySet.prototype.at = function ArraySet_at(e3) {
      if (e3 >= 0 && e3 < this._array.length) {
        return this._array[e3];
      }
      throw new Error("No element indexed by " + e3);
    };
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice();
    };
    r2.I = ArraySet;
  }, 449: (e2, r2, n) => {
    var t = n(190);
    var o = 5;
    var i = 1 << o;
    var a = i - 1;
    var u = i;
    function toVLQSigned(e3) {
      return e3 < 0 ? (-e3 << 1) + 1 : (e3 << 1) + 0;
    }
    function fromVLQSigned(e3) {
      var r3 = (e3 & 1) === 1;
      var n2 = e3 >> 1;
      return r3 ? -n2 : n2;
    }
    r2.encode = function base64VLQ_encode(e3) {
      var r3 = "";
      var n2;
      var i2 = toVLQSigned(e3);
      do {
        n2 = i2 & a;
        i2 >>>= o;
        if (i2 > 0) {
          n2 |= u;
        }
        r3 += t.encode(n2);
      } while (i2 > 0);
      return r3;
    };
    r2.decode = function base64VLQ_decode(e3, r3, n2) {
      var i2 = e3.length;
      var s = 0;
      var l = 0;
      var c, p;
      do {
        if (r3 >= i2) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }
        p = t.decode(e3.charCodeAt(r3++));
        if (p === -1) {
          throw new Error("Invalid base64 digit: " + e3.charAt(r3 - 1));
        }
        c = !!(p & u);
        p &= a;
        s = s + (p << l);
        l += o;
      } while (c);
      n2.value = fromVLQSigned(s);
      n2.rest = r3;
    };
  }, 190: (e2, r2) => {
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    r2.encode = function(e3) {
      if (0 <= e3 && e3 < n.length) {
        return n[e3];
      }
      throw new TypeError("Must be between 0 and 63: " + e3);
    };
    r2.decode = function(e3) {
      var r3 = 65;
      var n2 = 90;
      var t = 97;
      var o = 122;
      var i = 48;
      var a = 57;
      var u = 43;
      var s = 47;
      var l = 26;
      var c = 52;
      if (r3 <= e3 && e3 <= n2) {
        return e3 - r3;
      }
      if (t <= e3 && e3 <= o) {
        return e3 - t + l;
      }
      if (i <= e3 && e3 <= a) {
        return e3 - i + c;
      }
      if (e3 == u) {
        return 62;
      }
      if (e3 == s) {
        return 63;
      }
      return -1;
    };
  }, 345: (e2, r2) => {
    r2.GREATEST_LOWER_BOUND = 1;
    r2.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(e3, n, t, o, i, a) {
      var u = Math.floor((n - e3) / 2) + e3;
      var s = i(t, o[u], true);
      if (s === 0) {
        return u;
      } else if (s > 0) {
        if (n - u > 1) {
          return recursiveSearch(u, n, t, o, i, a);
        }
        if (a == r2.LEAST_UPPER_BOUND) {
          return n < o.length ? n : -1;
        } else {
          return u;
        }
      } else {
        if (u - e3 > 1) {
          return recursiveSearch(e3, u, t, o, i, a);
        }
        if (a == r2.LEAST_UPPER_BOUND) {
          return u;
        } else {
          return e3 < 0 ? -1 : e3;
        }
      }
    }
    r2.search = function search(e3, n, t, o) {
      if (n.length === 0) {
        return -1;
      }
      var i = recursiveSearch(-1, n.length, e3, n, t, o || r2.GREATEST_LOWER_BOUND);
      if (i < 0) {
        return -1;
      }
      while (i - 1 >= 0) {
        if (t(n[i], n[i - 1], true) !== 0) {
          break;
        }
        --i;
      }
      return i;
    };
  }, 680: (e2, r2, n) => {
    var t = n(339);
    function generatedPositionAfter(e3, r3) {
      var n2 = e3.generatedLine;
      var o = r3.generatedLine;
      var i = e3.generatedColumn;
      var a = r3.generatedColumn;
      return o > n2 || o == n2 && a >= i || t.compareByGeneratedPositionsInflated(e3, r3) <= 0;
    }
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    MappingList.prototype.unsortedForEach = function MappingList_forEach(e3, r3) {
      this._array.forEach(e3, r3);
    };
    MappingList.prototype.add = function MappingList_add(e3) {
      if (generatedPositionAfter(this._last, e3)) {
        this._last = e3;
        this._array.push(e3);
      } else {
        this._sorted = false;
        this._array.push(e3);
      }
    };
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(t.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    };
    r2.H = MappingList;
  }, 758: (e2, r2) => {
    function swap(e3, r3, n) {
      var t = e3[r3];
      e3[r3] = e3[n];
      e3[n] = t;
    }
    function randomIntInRange(e3, r3) {
      return Math.round(e3 + Math.random() * (r3 - e3));
    }
    function doQuickSort(e3, r3, n, t) {
      if (n < t) {
        var o = randomIntInRange(n, t);
        var i = n - 1;
        swap(e3, o, t);
        var a = e3[t];
        for (var u = n; u < t; u++) {
          if (r3(e3[u], a) <= 0) {
            i += 1;
            swap(e3, i, u);
          }
        }
        swap(e3, i + 1, u);
        var s = i + 1;
        doQuickSort(e3, r3, n, s - 1);
        doQuickSort(e3, r3, s + 1, t);
      }
    }
    r2.U = function(e3, r3) {
      doQuickSort(e3, r3, 0, e3.length - 1);
    };
  }, 952: (e2, r2, n) => {
    var o = n(339);
    var i = n(345);
    var a = n(274).I;
    var u = n(449);
    var s = n(758).U;
    function SourceMapConsumer(e3, r3) {
      var n2 = e3;
      if (typeof e3 === "string") {
        n2 = o.parseSourceMapInput(e3);
      }
      return n2.sections != null ? new IndexedSourceMapConsumer(n2, r3) : new BasicSourceMapConsumer(n2, r3);
    }
    SourceMapConsumer.fromSourceMap = function(e3, r3) {
      return BasicSourceMapConsumer.fromSourceMap(e3, r3);
    };
    SourceMapConsumer.prototype._version = 3;
    SourceMapConsumer.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", { configurable: true, enumerable: true, get: function() {
      if (!this.__generatedMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }
      return this.__generatedMappings;
    } });
    SourceMapConsumer.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", { configurable: true, enumerable: true, get: function() {
      if (!this.__originalMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }
      return this.__originalMappings;
    } });
    SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(e3, r3) {
      var n2 = e3.charAt(r3);
      return n2 === ";" || n2 === ",";
    };
    SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(e3, r3) {
      throw new Error("Subclasses must implement _parseMappings");
    };
    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;
    SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(e3, r3, n2) {
      var t = r3 || null;
      var i2 = n2 || SourceMapConsumer.GENERATED_ORDER;
      var a2;
      switch (i2) {
        case SourceMapConsumer.GENERATED_ORDER:
          a2 = this._generatedMappings;
          break;
        case SourceMapConsumer.ORIGINAL_ORDER:
          a2 = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var u2 = this.sourceRoot;
      a2.map(function(e4) {
        var r4 = e4.source === null ? null : this._sources.at(e4.source);
        r4 = o.computeSourceURL(u2, r4, this._sourceMapURL);
        return { source: r4, generatedLine: e4.generatedLine, generatedColumn: e4.generatedColumn, originalLine: e4.originalLine, originalColumn: e4.originalColumn, name: e4.name === null ? null : this._names.at(e4.name) };
      }, this).forEach(e3, t);
    };
    SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(e3) {
      var r3 = o.getArg(e3, "line");
      var n2 = { source: o.getArg(e3, "source"), originalLine: r3, originalColumn: o.getArg(e3, "column", 0) };
      n2.source = this._findSourceIndex(n2.source);
      if (n2.source < 0) {
        return [];
      }
      var t = [];
      var a2 = this._findMapping(n2, this._originalMappings, "originalLine", "originalColumn", o.compareByOriginalPositions, i.LEAST_UPPER_BOUND);
      if (a2 >= 0) {
        var u2 = this._originalMappings[a2];
        if (e3.column === void 0) {
          var s2 = u2.originalLine;
          while (u2 && u2.originalLine === s2) {
            t.push({ line: o.getArg(u2, "generatedLine", null), column: o.getArg(u2, "generatedColumn", null), lastColumn: o.getArg(u2, "lastGeneratedColumn", null) });
            u2 = this._originalMappings[++a2];
          }
        } else {
          var l = u2.originalColumn;
          while (u2 && u2.originalLine === r3 && u2.originalColumn == l) {
            t.push({ line: o.getArg(u2, "generatedLine", null), column: o.getArg(u2, "generatedColumn", null), lastColumn: o.getArg(u2, "lastGeneratedColumn", null) });
            u2 = this._originalMappings[++a2];
          }
        }
      }
      return t;
    };
    r2.SourceMapConsumer = SourceMapConsumer;
    function BasicSourceMapConsumer(e3, r3) {
      var n2 = e3;
      if (typeof e3 === "string") {
        n2 = o.parseSourceMapInput(e3);
      }
      var t = o.getArg(n2, "version");
      var i2 = o.getArg(n2, "sources");
      var u2 = o.getArg(n2, "names", []);
      var s2 = o.getArg(n2, "sourceRoot", null);
      var l = o.getArg(n2, "sourcesContent", null);
      var c = o.getArg(n2, "mappings");
      var p = o.getArg(n2, "file", null);
      if (t != this._version) {
        throw new Error("Unsupported version: " + t);
      }
      if (s2) {
        s2 = o.normalize(s2);
      }
      i2 = i2.map(String).map(o.normalize).map(function(e4) {
        return s2 && o.isAbsolute(s2) && o.isAbsolute(e4) ? o.relative(s2, e4) : e4;
      });
      this._names = a.fromArray(u2.map(String), true);
      this._sources = a.fromArray(i2, true);
      this._absoluteSources = this._sources.toArray().map(function(e4) {
        return o.computeSourceURL(s2, e4, r3);
      });
      this.sourceRoot = s2;
      this.sourcesContent = l;
      this._mappings = c;
      this._sourceMapURL = r3;
      this.file = p;
    }
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
    BasicSourceMapConsumer.prototype._findSourceIndex = function(e3) {
      var r3 = e3;
      if (this.sourceRoot != null) {
        r3 = o.relative(this.sourceRoot, r3);
      }
      if (this._sources.has(r3)) {
        return this._sources.indexOf(r3);
      }
      var n2;
      for (n2 = 0; n2 < this._absoluteSources.length; ++n2) {
        if (this._absoluteSources[n2] == e3) {
          return n2;
        }
      }
      return -1;
    };
    BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(e3, r3) {
      var n2 = Object.create(BasicSourceMapConsumer.prototype);
      var t = n2._names = a.fromArray(e3._names.toArray(), true);
      var i2 = n2._sources = a.fromArray(e3._sources.toArray(), true);
      n2.sourceRoot = e3._sourceRoot;
      n2.sourcesContent = e3._generateSourcesContent(n2._sources.toArray(), n2.sourceRoot);
      n2.file = e3._file;
      n2._sourceMapURL = r3;
      n2._absoluteSources = n2._sources.toArray().map(function(e4) {
        return o.computeSourceURL(n2.sourceRoot, e4, r3);
      });
      var u2 = e3._mappings.toArray().slice();
      var l = n2.__generatedMappings = [];
      var c = n2.__originalMappings = [];
      for (var p = 0, f = u2.length; p < f; p++) {
        var g = u2[p];
        var h = new Mapping();
        h.generatedLine = g.generatedLine;
        h.generatedColumn = g.generatedColumn;
        if (g.source) {
          h.source = i2.indexOf(g.source);
          h.originalLine = g.originalLine;
          h.originalColumn = g.originalColumn;
          if (g.name) {
            h.name = t.indexOf(g.name);
          }
          c.push(h);
        }
        l.push(h);
      }
      s(n2.__originalMappings, o.compareByOriginalPositions);
      return n2;
    };
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", { get: function() {
      return this._absoluteSources.slice();
    } });
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }
    BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(e3, r3) {
      var n2 = 1;
      var t = 0;
      var i2 = 0;
      var a2 = 0;
      var l = 0;
      var c = 0;
      var p = e3.length;
      var f = 0;
      var g = {};
      var h = {};
      var d = [];
      var m = [];
      var v, S, _, C, y;
      while (f < p) {
        if (e3.charAt(f) === ";") {
          n2++;
          f++;
          t = 0;
        } else if (e3.charAt(f) === ",") {
          f++;
        } else {
          v = new Mapping();
          v.generatedLine = n2;
          for (C = f; C < p; C++) {
            if (this._charIsMappingSeparator(e3, C)) {
              break;
            }
          }
          S = e3.slice(f, C);
          _ = g[S];
          if (_) {
            f += S.length;
          } else {
            _ = [];
            while (f < C) {
              u.decode(e3, f, h);
              y = h.value;
              f = h.rest;
              _.push(y);
            }
            if (_.length === 2) {
              throw new Error("Found a source, but no line and column");
            }
            if (_.length === 3) {
              throw new Error("Found a source and line, but no column");
            }
            g[S] = _;
          }
          v.generatedColumn = t + _[0];
          t = v.generatedColumn;
          if (_.length > 1) {
            v.source = l + _[1];
            l += _[1];
            v.originalLine = i2 + _[2];
            i2 = v.originalLine;
            v.originalLine += 1;
            v.originalColumn = a2 + _[3];
            a2 = v.originalColumn;
            if (_.length > 4) {
              v.name = c + _[4];
              c += _[4];
            }
          }
          m.push(v);
          if (typeof v.originalLine === "number") {
            d.push(v);
          }
        }
      }
      s(m, o.compareByGeneratedPositionsDeflated);
      this.__generatedMappings = m;
      s(d, o.compareByOriginalPositions);
      this.__originalMappings = d;
    };
    BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(e3, r3, n2, t, o2, a2) {
      if (e3[n2] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + e3[n2]);
      }
      if (e3[t] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + e3[t]);
      }
      return i.search(e3, r3, o2, a2);
    };
    BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
      for (var e3 = 0; e3 < this._generatedMappings.length; ++e3) {
        var r3 = this._generatedMappings[e3];
        if (e3 + 1 < this._generatedMappings.length) {
          var n2 = this._generatedMappings[e3 + 1];
          if (r3.generatedLine === n2.generatedLine) {
            r3.lastGeneratedColumn = n2.generatedColumn - 1;
            continue;
          }
        }
        r3.lastGeneratedColumn = Infinity;
      }
    };
    BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(e3) {
      var r3 = { generatedLine: o.getArg(e3, "line"), generatedColumn: o.getArg(e3, "column") };
      var n2 = this._findMapping(r3, this._generatedMappings, "generatedLine", "generatedColumn", o.compareByGeneratedPositionsDeflated, o.getArg(e3, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
      if (n2 >= 0) {
        var t = this._generatedMappings[n2];
        if (t.generatedLine === r3.generatedLine) {
          var i2 = o.getArg(t, "source", null);
          if (i2 !== null) {
            i2 = this._sources.at(i2);
            i2 = o.computeSourceURL(this.sourceRoot, i2, this._sourceMapURL);
          }
          var a2 = o.getArg(t, "name", null);
          if (a2 !== null) {
            a2 = this._names.at(a2);
          }
          return { source: i2, line: o.getArg(t, "originalLine", null), column: o.getArg(t, "originalColumn", null), name: a2 };
        }
      }
      return { source: null, line: null, column: null, name: null };
    };
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(e3) {
        return e3 == null;
      });
    };
    BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(e3, r3) {
      if (!this.sourcesContent) {
        return null;
      }
      var n2 = this._findSourceIndex(e3);
      if (n2 >= 0) {
        return this.sourcesContent[n2];
      }
      var t = e3;
      if (this.sourceRoot != null) {
        t = o.relative(this.sourceRoot, t);
      }
      var i2;
      if (this.sourceRoot != null && (i2 = o.urlParse(this.sourceRoot))) {
        var a2 = t.replace(/^file:\/\//, "");
        if (i2.scheme == "file" && this._sources.has(a2)) {
          return this.sourcesContent[this._sources.indexOf(a2)];
        }
        if ((!i2.path || i2.path == "/") && this._sources.has("/" + t)) {
          return this.sourcesContent[this._sources.indexOf("/" + t)];
        }
      }
      if (r3) {
        return null;
      } else {
        throw new Error('"' + t + '" is not in the SourceMap.');
      }
    };
    BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(e3) {
      var r3 = o.getArg(e3, "source");
      r3 = this._findSourceIndex(r3);
      if (r3 < 0) {
        return { line: null, column: null, lastColumn: null };
      }
      var n2 = { source: r3, originalLine: o.getArg(e3, "line"), originalColumn: o.getArg(e3, "column") };
      var t = this._findMapping(n2, this._originalMappings, "originalLine", "originalColumn", o.compareByOriginalPositions, o.getArg(e3, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
      if (t >= 0) {
        var i2 = this._originalMappings[t];
        if (i2.source === n2.source) {
          return { line: o.getArg(i2, "generatedLine", null), column: o.getArg(i2, "generatedColumn", null), lastColumn: o.getArg(i2, "lastGeneratedColumn", null) };
        }
      }
      return { line: null, column: null, lastColumn: null };
    };
    function IndexedSourceMapConsumer(e3, r3) {
      var n2 = e3;
      if (typeof e3 === "string") {
        n2 = o.parseSourceMapInput(e3);
      }
      var t = o.getArg(n2, "version");
      var i2 = o.getArg(n2, "sections");
      if (t != this._version) {
        throw new Error("Unsupported version: " + t);
      }
      this._sources = new a();
      this._names = new a();
      var u2 = { line: -1, column: 0 };
      this._sections = i2.map(function(e4) {
        if (e4.url) {
          throw new Error("Support for url field in sections not implemented.");
        }
        var n3 = o.getArg(e4, "offset");
        var t2 = o.getArg(n3, "line");
        var i3 = o.getArg(n3, "column");
        if (t2 < u2.line || t2 === u2.line && i3 < u2.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.");
        }
        u2 = n3;
        return { generatedOffset: { generatedLine: t2 + 1, generatedColumn: i3 + 1 }, consumer: new SourceMapConsumer(o.getArg(e4, "map"), r3) };
      });
    }
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", { get: function() {
      var e3 = [];
      for (var r3 = 0; r3 < this._sections.length; r3++) {
        for (var n2 = 0; n2 < this._sections[r3].consumer.sources.length; n2++) {
          e3.push(this._sections[r3].consumer.sources[n2]);
        }
      }
      return e3;
    } });
    IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(e3) {
      var r3 = { generatedLine: o.getArg(e3, "line"), generatedColumn: o.getArg(e3, "column") };
      var n2 = i.search(r3, this._sections, function(e4, r4) {
        var n3 = e4.generatedLine - r4.generatedOffset.generatedLine;
        if (n3) {
          return n3;
        }
        return e4.generatedColumn - r4.generatedOffset.generatedColumn;
      });
      var t = this._sections[n2];
      if (!t) {
        return { source: null, line: null, column: null, name: null };
      }
      return t.consumer.originalPositionFor({ line: r3.generatedLine - (t.generatedOffset.generatedLine - 1), column: r3.generatedColumn - (t.generatedOffset.generatedLine === r3.generatedLine ? t.generatedOffset.generatedColumn - 1 : 0), bias: e3.bias });
    };
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(e3) {
        return e3.consumer.hasContentsOfAllSources();
      });
    };
    IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(e3, r3) {
      for (var n2 = 0; n2 < this._sections.length; n2++) {
        var t = this._sections[n2];
        var o2 = t.consumer.sourceContentFor(e3, true);
        if (o2) {
          return o2;
        }
      }
      if (r3) {
        return null;
      } else {
        throw new Error('"' + e3 + '" is not in the SourceMap.');
      }
    };
    IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(e3) {
      for (var r3 = 0; r3 < this._sections.length; r3++) {
        var n2 = this._sections[r3];
        if (n2.consumer._findSourceIndex(o.getArg(e3, "source")) === -1) {
          continue;
        }
        var t = n2.consumer.generatedPositionFor(e3);
        if (t) {
          var i2 = { line: t.line + (n2.generatedOffset.generatedLine - 1), column: t.column + (n2.generatedOffset.generatedLine === t.line ? n2.generatedOffset.generatedColumn - 1 : 0) };
          return i2;
        }
      }
      return { line: null, column: null };
    };
    IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(e3, r3) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var n2 = 0; n2 < this._sections.length; n2++) {
        var t = this._sections[n2];
        var i2 = t.consumer._generatedMappings;
        for (var a2 = 0; a2 < i2.length; a2++) {
          var u2 = i2[a2];
          var l = t.consumer._sources.at(u2.source);
          l = o.computeSourceURL(t.consumer.sourceRoot, l, this._sourceMapURL);
          this._sources.add(l);
          l = this._sources.indexOf(l);
          var c = null;
          if (u2.name) {
            c = t.consumer._names.at(u2.name);
            this._names.add(c);
            c = this._names.indexOf(c);
          }
          var p = { source: l, generatedLine: u2.generatedLine + (t.generatedOffset.generatedLine - 1), generatedColumn: u2.generatedColumn + (t.generatedOffset.generatedLine === u2.generatedLine ? t.generatedOffset.generatedColumn - 1 : 0), originalLine: u2.originalLine, originalColumn: u2.originalColumn, name: c };
          this.__generatedMappings.push(p);
          if (typeof p.originalLine === "number") {
            this.__originalMappings.push(p);
          }
        }
      }
      s(this.__generatedMappings, o.compareByGeneratedPositionsDeflated);
      s(this.__originalMappings, o.compareByOriginalPositions);
    };
  }, 591: (e2, r2, n) => {
    var t = n(449);
    var o = n(339);
    var i = n(274).I;
    var a = n(680).H;
    function SourceMapGenerator(e3) {
      if (!e3) {
        e3 = {};
      }
      this._file = o.getArg(e3, "file", null);
      this._sourceRoot = o.getArg(e3, "sourceRoot", null);
      this._skipValidation = o.getArg(e3, "skipValidation", false);
      this._sources = new i();
      this._names = new i();
      this._mappings = new a();
      this._sourcesContents = null;
    }
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(e3) {
      var r3 = e3.sourceRoot;
      var n2 = new SourceMapGenerator({ file: e3.file, sourceRoot: r3 });
      e3.eachMapping(function(e4) {
        var t2 = { generated: { line: e4.generatedLine, column: e4.generatedColumn } };
        if (e4.source != null) {
          t2.source = e4.source;
          if (r3 != null) {
            t2.source = o.relative(r3, t2.source);
          }
          t2.original = { line: e4.originalLine, column: e4.originalColumn };
          if (e4.name != null) {
            t2.name = e4.name;
          }
        }
        n2.addMapping(t2);
      });
      e3.sources.forEach(function(t2) {
        var i2 = t2;
        if (r3 !== null) {
          i2 = o.relative(r3, t2);
        }
        if (!n2._sources.has(i2)) {
          n2._sources.add(i2);
        }
        var a2 = e3.sourceContentFor(t2);
        if (a2 != null) {
          n2.setSourceContent(t2, a2);
        }
      });
      return n2;
    };
    SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(e3) {
      var r3 = o.getArg(e3, "generated");
      var n2 = o.getArg(e3, "original", null);
      var t2 = o.getArg(e3, "source", null);
      var i2 = o.getArg(e3, "name", null);
      if (!this._skipValidation) {
        this._validateMapping(r3, n2, t2, i2);
      }
      if (t2 != null) {
        t2 = String(t2);
        if (!this._sources.has(t2)) {
          this._sources.add(t2);
        }
      }
      if (i2 != null) {
        i2 = String(i2);
        if (!this._names.has(i2)) {
          this._names.add(i2);
        }
      }
      this._mappings.add({ generatedLine: r3.line, generatedColumn: r3.column, originalLine: n2 != null && n2.line, originalColumn: n2 != null && n2.column, source: t2, name: i2 });
    };
    SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(e3, r3) {
      var n2 = e3;
      if (this._sourceRoot != null) {
        n2 = o.relative(this._sourceRoot, n2);
      }
      if (r3 != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = /* @__PURE__ */ Object.create(null);
        }
        this._sourcesContents[o.toSetString(n2)] = r3;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[o.toSetString(n2)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };
    SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(e3, r3, n2) {
      var t2 = r3;
      if (r3 == null) {
        if (e3.file == null) {
          throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);
        }
        t2 = e3.file;
      }
      var a2 = this._sourceRoot;
      if (a2 != null) {
        t2 = o.relative(a2, t2);
      }
      var u = new i();
      var s = new i();
      this._mappings.unsortedForEach(function(r4) {
        if (r4.source === t2 && r4.originalLine != null) {
          var i2 = e3.originalPositionFor({ line: r4.originalLine, column: r4.originalColumn });
          if (i2.source != null) {
            r4.source = i2.source;
            if (n2 != null) {
              r4.source = o.join(n2, r4.source);
            }
            if (a2 != null) {
              r4.source = o.relative(a2, r4.source);
            }
            r4.originalLine = i2.line;
            r4.originalColumn = i2.column;
            if (i2.name != null) {
              r4.name = i2.name;
            }
          }
        }
        var l = r4.source;
        if (l != null && !u.has(l)) {
          u.add(l);
        }
        var c = r4.name;
        if (c != null && !s.has(c)) {
          s.add(c);
        }
      }, this);
      this._sources = u;
      this._names = s;
      e3.sources.forEach(function(r4) {
        var t3 = e3.sourceContentFor(r4);
        if (t3 != null) {
          if (n2 != null) {
            r4 = o.join(n2, r4);
          }
          if (a2 != null) {
            r4 = o.relative(a2, r4);
          }
          this.setSourceContent(r4, t3);
        }
      }, this);
    };
    SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(e3, r3, n2, t2) {
      if (r3 && typeof r3.line !== "number" && typeof r3.column !== "number") {
        throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
      }
      if (e3 && "line" in e3 && "column" in e3 && e3.line > 0 && e3.column >= 0 && !r3 && !n2 && !t2) {
        return;
      } else if (e3 && "line" in e3 && "column" in e3 && r3 && "line" in r3 && "column" in r3 && e3.line > 0 && e3.column >= 0 && r3.line > 0 && r3.column >= 0 && n2) {
        return;
      } else {
        throw new Error("Invalid mapping: " + JSON.stringify({ generated: e3, source: n2, original: r3, name: t2 }));
      }
    };
    SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
      var e3 = 0;
      var r3 = 1;
      var n2 = 0;
      var i2 = 0;
      var a2 = 0;
      var u = 0;
      var s = "";
      var l;
      var c;
      var p;
      var f;
      var g = this._mappings.toArray();
      for (var h = 0, d = g.length; h < d; h++) {
        c = g[h];
        l = "";
        if (c.generatedLine !== r3) {
          e3 = 0;
          while (c.generatedLine !== r3) {
            l += ";";
            r3++;
          }
        } else {
          if (h > 0) {
            if (!o.compareByGeneratedPositionsInflated(c, g[h - 1])) {
              continue;
            }
            l += ",";
          }
        }
        l += t.encode(c.generatedColumn - e3);
        e3 = c.generatedColumn;
        if (c.source != null) {
          f = this._sources.indexOf(c.source);
          l += t.encode(f - u);
          u = f;
          l += t.encode(c.originalLine - 1 - i2);
          i2 = c.originalLine - 1;
          l += t.encode(c.originalColumn - n2);
          n2 = c.originalColumn;
          if (c.name != null) {
            p = this._names.indexOf(c.name);
            l += t.encode(p - a2);
            a2 = p;
          }
        }
        s += l;
      }
      return s;
    };
    SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(e3, r3) {
      return e3.map(function(e4) {
        if (!this._sourcesContents) {
          return null;
        }
        if (r3 != null) {
          e4 = o.relative(r3, e4);
        }
        var n2 = o.toSetString(e4);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, n2) ? this._sourcesContents[n2] : null;
      }, this);
    };
    SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
      var e3 = { version: this._version, sources: this._sources.toArray(), names: this._names.toArray(), mappings: this._serializeMappings() };
      if (this._file != null) {
        e3.file = this._file;
      }
      if (this._sourceRoot != null) {
        e3.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        e3.sourcesContent = this._generateSourcesContent(e3.sources, e3.sourceRoot);
      }
      return e3;
    };
    SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };
    r2.h = SourceMapGenerator;
  }, 351: (e2, r2, n) => {
    var o = n(591).h;
    var i = n(339);
    var a = /(\r?\n)/;
    var u = 10;
    var s = "$$$isSourceNode$$$";
    function SourceNode(e3, r3, n2, t, o2) {
      this.children = [];
      this.sourceContents = {};
      this.line = e3 == null ? null : e3;
      this.column = r3 == null ? null : r3;
      this.source = n2 == null ? null : n2;
      this.name = o2 == null ? null : o2;
      this[s] = true;
      if (t != null)
        this.add(t);
    }
    SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(e3, r3, n2) {
      var t = new SourceNode();
      var o2 = e3.split(a);
      var u2 = 0;
      var shiftNextLine = function() {
        var e4 = getNextLine();
        var r4 = getNextLine() || "";
        return e4 + r4;
        function getNextLine() {
          return u2 < o2.length ? o2[u2++] : void 0;
        }
      };
      var s2 = 1, l = 0;
      var c = null;
      r3.eachMapping(function(e4) {
        if (c !== null) {
          if (s2 < e4.generatedLine) {
            addMappingWithCode(c, shiftNextLine());
            s2++;
            l = 0;
          } else {
            var r4 = o2[u2] || "";
            var n3 = r4.substr(0, e4.generatedColumn - l);
            o2[u2] = r4.substr(e4.generatedColumn - l);
            l = e4.generatedColumn;
            addMappingWithCode(c, n3);
            c = e4;
            return;
          }
        }
        while (s2 < e4.generatedLine) {
          t.add(shiftNextLine());
          s2++;
        }
        if (l < e4.generatedColumn) {
          var r4 = o2[u2] || "";
          t.add(r4.substr(0, e4.generatedColumn));
          o2[u2] = r4.substr(e4.generatedColumn);
          l = e4.generatedColumn;
        }
        c = e4;
      }, this);
      if (u2 < o2.length) {
        if (c) {
          addMappingWithCode(c, shiftNextLine());
        }
        t.add(o2.splice(u2).join(""));
      }
      r3.sources.forEach(function(e4) {
        var o3 = r3.sourceContentFor(e4);
        if (o3 != null) {
          if (n2 != null) {
            e4 = i.join(n2, e4);
          }
          t.setSourceContent(e4, o3);
        }
      });
      return t;
      function addMappingWithCode(e4, r4) {
        if (e4 === null || e4.source === void 0) {
          t.add(r4);
        } else {
          var o3 = n2 ? i.join(n2, e4.source) : e4.source;
          t.add(new SourceNode(e4.originalLine, e4.originalColumn, o3, r4, e4.name));
        }
      }
    };
    SourceNode.prototype.add = function SourceNode_add(e3) {
      if (Array.isArray(e3)) {
        e3.forEach(function(e4) {
          this.add(e4);
        }, this);
      } else if (e3[s] || typeof e3 === "string") {
        if (e3) {
          this.children.push(e3);
        }
      } else {
        throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + e3);
      }
      return this;
    };
    SourceNode.prototype.prepend = function SourceNode_prepend(e3) {
      if (Array.isArray(e3)) {
        for (var r3 = e3.length - 1; r3 >= 0; r3--) {
          this.prepend(e3[r3]);
        }
      } else if (e3[s] || typeof e3 === "string") {
        this.children.unshift(e3);
      } else {
        throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + e3);
      }
      return this;
    };
    SourceNode.prototype.walk = function SourceNode_walk(e3) {
      var r3;
      for (var n2 = 0, t = this.children.length; n2 < t; n2++) {
        r3 = this.children[n2];
        if (r3[s]) {
          r3.walk(e3);
        } else {
          if (r3 !== "") {
            e3(r3, { source: this.source, line: this.line, column: this.column, name: this.name });
          }
        }
      }
    };
    SourceNode.prototype.join = function SourceNode_join(e3) {
      var r3;
      var n2;
      var t = this.children.length;
      if (t > 0) {
        r3 = [];
        for (n2 = 0; n2 < t - 1; n2++) {
          r3.push(this.children[n2]);
          r3.push(e3);
        }
        r3.push(this.children[n2]);
        this.children = r3;
      }
      return this;
    };
    SourceNode.prototype.replaceRight = function SourceNode_replaceRight(e3, r3) {
      var n2 = this.children[this.children.length - 1];
      if (n2[s]) {
        n2.replaceRight(e3, r3);
      } else if (typeof n2 === "string") {
        this.children[this.children.length - 1] = n2.replace(e3, r3);
      } else {
        this.children.push("".replace(e3, r3));
      }
      return this;
    };
    SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(e3, r3) {
      this.sourceContents[i.toSetString(e3)] = r3;
    };
    SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(e3) {
      for (var r3 = 0, n2 = this.children.length; r3 < n2; r3++) {
        if (this.children[r3][s]) {
          this.children[r3].walkSourceContents(e3);
        }
      }
      var t = Object.keys(this.sourceContents);
      for (var r3 = 0, n2 = t.length; r3 < n2; r3++) {
        e3(i.fromSetString(t[r3]), this.sourceContents[t[r3]]);
      }
    };
    SourceNode.prototype.toString = function SourceNode_toString() {
      var e3 = "";
      this.walk(function(r3) {
        e3 += r3;
      });
      return e3;
    };
    SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(e3) {
      var r3 = { code: "", line: 1, column: 0 };
      var n2 = new o(e3);
      var t = false;
      var i2 = null;
      var a2 = null;
      var s2 = null;
      var l = null;
      this.walk(function(e4, o2) {
        r3.code += e4;
        if (o2.source !== null && o2.line !== null && o2.column !== null) {
          if (i2 !== o2.source || a2 !== o2.line || s2 !== o2.column || l !== o2.name) {
            n2.addMapping({ source: o2.source, original: { line: o2.line, column: o2.column }, generated: { line: r3.line, column: r3.column }, name: o2.name });
          }
          i2 = o2.source;
          a2 = o2.line;
          s2 = o2.column;
          l = o2.name;
          t = true;
        } else if (t) {
          n2.addMapping({ generated: { line: r3.line, column: r3.column } });
          i2 = null;
          t = false;
        }
        for (var c = 0, p = e4.length; c < p; c++) {
          if (e4.charCodeAt(c) === u) {
            r3.line++;
            r3.column = 0;
            if (c + 1 === p) {
              i2 = null;
              t = false;
            } else if (t) {
              n2.addMapping({ source: o2.source, original: { line: o2.line, column: o2.column }, generated: { line: r3.line, column: r3.column }, name: o2.name });
            }
          } else {
            r3.column++;
          }
        }
      });
      this.walkSourceContents(function(e4, r4) {
        n2.setSourceContent(e4, r4);
      });
      return { code: r3.code, map: n2 };
    };
  }, 339: (e2, r2) => {
    function getArg(e3, r3, n2) {
      if (r3 in e3) {
        return e3[r3];
      } else if (arguments.length === 3) {
        return n2;
      } else {
        throw new Error('"' + r3 + '" is a required argument.');
      }
    }
    r2.getArg = getArg;
    var n = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var t = /^data:.+\,.+$/;
    function urlParse(e3) {
      var r3 = e3.match(n);
      if (!r3) {
        return null;
      }
      return { scheme: r3[1], auth: r3[2], host: r3[3], port: r3[4], path: r3[5] };
    }
    r2.urlParse = urlParse;
    function urlGenerate(e3) {
      var r3 = "";
      if (e3.scheme) {
        r3 += e3.scheme + ":";
      }
      r3 += "//";
      if (e3.auth) {
        r3 += e3.auth + "@";
      }
      if (e3.host) {
        r3 += e3.host;
      }
      if (e3.port) {
        r3 += ":" + e3.port;
      }
      if (e3.path) {
        r3 += e3.path;
      }
      return r3;
    }
    r2.urlGenerate = urlGenerate;
    function normalize(e3) {
      var n2 = e3;
      var t2 = urlParse(e3);
      if (t2) {
        if (!t2.path) {
          return e3;
        }
        n2 = t2.path;
      }
      var o2 = r2.isAbsolute(n2);
      var i = n2.split(/\/+/);
      for (var a, u = 0, s = i.length - 1; s >= 0; s--) {
        a = i[s];
        if (a === ".") {
          i.splice(s, 1);
        } else if (a === "..") {
          u++;
        } else if (u > 0) {
          if (a === "") {
            i.splice(s + 1, u);
            u = 0;
          } else {
            i.splice(s, 2);
            u--;
          }
        }
      }
      n2 = i.join("/");
      if (n2 === "") {
        n2 = o2 ? "/" : ".";
      }
      if (t2) {
        t2.path = n2;
        return urlGenerate(t2);
      }
      return n2;
    }
    r2.normalize = normalize;
    function join(e3, r3) {
      if (e3 === "") {
        e3 = ".";
      }
      if (r3 === "") {
        r3 = ".";
      }
      var n2 = urlParse(r3);
      var o2 = urlParse(e3);
      if (o2) {
        e3 = o2.path || "/";
      }
      if (n2 && !n2.scheme) {
        if (o2) {
          n2.scheme = o2.scheme;
        }
        return urlGenerate(n2);
      }
      if (n2 || r3.match(t)) {
        return r3;
      }
      if (o2 && !o2.host && !o2.path) {
        o2.host = r3;
        return urlGenerate(o2);
      }
      var i = r3.charAt(0) === "/" ? r3 : normalize(e3.replace(/\/+$/, "") + "/" + r3);
      if (o2) {
        o2.path = i;
        return urlGenerate(o2);
      }
      return i;
    }
    r2.join = join;
    r2.isAbsolute = function(e3) {
      return e3.charAt(0) === "/" || n.test(e3);
    };
    function relative(e3, r3) {
      if (e3 === "") {
        e3 = ".";
      }
      e3 = e3.replace(/\/$/, "");
      var n2 = 0;
      while (r3.indexOf(e3 + "/") !== 0) {
        var t2 = e3.lastIndexOf("/");
        if (t2 < 0) {
          return r3;
        }
        e3 = e3.slice(0, t2);
        if (e3.match(/^([^\/]+:\/)?\/*$/)) {
          return r3;
        }
        ++n2;
      }
      return Array(n2 + 1).join("../") + r3.substr(e3.length + 1);
    }
    r2.relative = relative;
    var o = function() {
      var e3 = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in e3);
    }();
    function identity(e3) {
      return e3;
    }
    function toSetString(e3) {
      if (isProtoString(e3)) {
        return "$" + e3;
      }
      return e3;
    }
    r2.toSetString = o ? identity : toSetString;
    function fromSetString(e3) {
      if (isProtoString(e3)) {
        return e3.slice(1);
      }
      return e3;
    }
    r2.fromSetString = o ? identity : fromSetString;
    function isProtoString(e3) {
      if (!e3) {
        return false;
      }
      var r3 = e3.length;
      if (r3 < 9) {
        return false;
      }
      if (e3.charCodeAt(r3 - 1) !== 95 || e3.charCodeAt(r3 - 2) !== 95 || e3.charCodeAt(r3 - 3) !== 111 || e3.charCodeAt(r3 - 4) !== 116 || e3.charCodeAt(r3 - 5) !== 111 || e3.charCodeAt(r3 - 6) !== 114 || e3.charCodeAt(r3 - 7) !== 112 || e3.charCodeAt(r3 - 8) !== 95 || e3.charCodeAt(r3 - 9) !== 95) {
        return false;
      }
      for (var n2 = r3 - 10; n2 >= 0; n2--) {
        if (e3.charCodeAt(n2) !== 36) {
          return false;
        }
      }
      return true;
    }
    function compareByOriginalPositions(e3, r3, n2) {
      var t2 = strcmp(e3.source, r3.source);
      if (t2 !== 0) {
        return t2;
      }
      t2 = e3.originalLine - r3.originalLine;
      if (t2 !== 0) {
        return t2;
      }
      t2 = e3.originalColumn - r3.originalColumn;
      if (t2 !== 0 || n2) {
        return t2;
      }
      t2 = e3.generatedColumn - r3.generatedColumn;
      if (t2 !== 0) {
        return t2;
      }
      t2 = e3.generatedLine - r3.generatedLine;
      if (t2 !== 0) {
        return t2;
      }
      return strcmp(e3.name, r3.name);
    }
    r2.compareByOriginalPositions = compareByOriginalPositions;
    function compareByGeneratedPositionsDeflated(e3, r3, n2) {
      var t2 = e3.generatedLine - r3.generatedLine;
      if (t2 !== 0) {
        return t2;
      }
      t2 = e3.generatedColumn - r3.generatedColumn;
      if (t2 !== 0 || n2) {
        return t2;
      }
      t2 = strcmp(e3.source, r3.source);
      if (t2 !== 0) {
        return t2;
      }
      t2 = e3.originalLine - r3.originalLine;
      if (t2 !== 0) {
        return t2;
      }
      t2 = e3.originalColumn - r3.originalColumn;
      if (t2 !== 0) {
        return t2;
      }
      return strcmp(e3.name, r3.name);
    }
    r2.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function strcmp(e3, r3) {
      if (e3 === r3) {
        return 0;
      }
      if (e3 === null) {
        return 1;
      }
      if (r3 === null) {
        return -1;
      }
      if (e3 > r3) {
        return 1;
      }
      return -1;
    }
    function compareByGeneratedPositionsInflated(e3, r3) {
      var n2 = e3.generatedLine - r3.generatedLine;
      if (n2 !== 0) {
        return n2;
      }
      n2 = e3.generatedColumn - r3.generatedColumn;
      if (n2 !== 0) {
        return n2;
      }
      n2 = strcmp(e3.source, r3.source);
      if (n2 !== 0) {
        return n2;
      }
      n2 = e3.originalLine - r3.originalLine;
      if (n2 !== 0) {
        return n2;
      }
      n2 = e3.originalColumn - r3.originalColumn;
      if (n2 !== 0) {
        return n2;
      }
      return strcmp(e3.name, r3.name);
    }
    r2.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(e3) {
      return JSON.parse(e3.replace(/^\)]}'[^\n]*\n/, ""));
    }
    r2.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(e3, r3, n2) {
      r3 = r3 || "";
      if (e3) {
        if (e3[e3.length - 1] !== "/" && r3[0] !== "/") {
          e3 += "/";
        }
        r3 = e3 + r3;
      }
      if (n2) {
        var t2 = urlParse(n2);
        if (!t2) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (t2.path) {
          var o2 = t2.path.lastIndexOf("/");
          if (o2 >= 0) {
            t2.path = t2.path.substring(0, o2 + 1);
          }
        }
        r3 = join(urlGenerate(t2), r3);
      }
      return normalize(r3);
    }
    r2.computeSourceURL = computeSourceURL;
  }, 997: (e2, r2, n) => {
    n(591).h;
    r2.SourceMapConsumer = n(952).SourceMapConsumer;
    n(351);
  }, 284: (e2, r2, n) => {
    e2 = n.nmd(e2);
    var t = n(997).SourceMapConsumer;
    var o = n(17);
    var i;
    try {
      i = n(147);
      if (!i.existsSync || !i.readFileSync) {
        i = null;
      }
    } catch (e3) {
    }
    var a = n(650);
    function dynamicRequire(e3, r3) {
      return e3.require(r3);
    }
    var u = false;
    var s = false;
    var l = false;
    var c = "auto";
    var p = {};
    var f = {};
    var g = /^data:application\/json[^,]+base64,/;
    var h = [];
    var d = [];
    function isInBrowser() {
      if (c === "browser")
        return true;
      if (c === "node")
        return false;
      return typeof window !== "undefined" && typeof XMLHttpRequest === "function" && !(window.require && window.module && window.process && window.process.type === "renderer");
    }
    function hasGlobalProcessEventEmitter() {
      return typeof process === "object" && process !== null && typeof process.on === "function";
    }
    function globalProcessVersion() {
      if (typeof process === "object" && process !== null) {
        return process.version;
      } else {
        return "";
      }
    }
    function globalProcessStderr() {
      if (typeof process === "object" && process !== null) {
        return process.stderr;
      }
    }
    function globalProcessExit(e3) {
      if (typeof process === "object" && process !== null && typeof process.exit === "function") {
        return process.exit(e3);
      }
    }
    function handlerExec(e3) {
      return function(r3) {
        for (var n2 = 0; n2 < e3.length; n2++) {
          var t2 = e3[n2](r3);
          if (t2) {
            return t2;
          }
        }
        return null;
      };
    }
    var m = handlerExec(h);
    h.push(function(e3) {
      e3 = e3.trim();
      if (/^file:/.test(e3)) {
        e3 = e3.replace(/file:\/\/\/(\w:)?/, function(e4, r4) {
          return r4 ? "" : "/";
        });
      }
      if (e3 in p) {
        return p[e3];
      }
      var r3 = "";
      try {
        if (!i) {
          var n2 = new XMLHttpRequest();
          n2.open("GET", e3, false);
          n2.send(null);
          if (n2.readyState === 4 && n2.status === 200) {
            r3 = n2.responseText;
          }
        } else if (i.existsSync(e3)) {
          r3 = i.readFileSync(e3, "utf8");
        }
      } catch (e4) {
      }
      return p[e3] = r3;
    });
    function supportRelativeURL(e3, r3) {
      if (!e3)
        return r3;
      var n2 = o.dirname(e3);
      var t2 = /^\w+:\/\/[^\/]*/.exec(n2);
      var i2 = t2 ? t2[0] : "";
      var a2 = n2.slice(i2.length);
      if (i2 && /^\/\w\:/.test(a2)) {
        i2 += "/";
        return i2 + o.resolve(n2.slice(i2.length), r3).replace(/\\/g, "/");
      }
      return i2 + o.resolve(n2.slice(i2.length), r3);
    }
    function retrieveSourceMapURL(e3) {
      var r3;
      if (isInBrowser()) {
        try {
          var n2 = new XMLHttpRequest();
          n2.open("GET", e3, false);
          n2.send(null);
          r3 = n2.readyState === 4 ? n2.responseText : null;
          var t2 = n2.getResponseHeader("SourceMap") || n2.getResponseHeader("X-SourceMap");
          if (t2) {
            return t2;
          }
        } catch (e4) {
        }
      }
      r3 = m(e3);
      var o2 = /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/gm;
      var i2, a2;
      while (a2 = o2.exec(r3))
        i2 = a2;
      if (!i2)
        return null;
      return i2[1];
    }
    var v = handlerExec(d);
    d.push(function(e3) {
      var r3 = retrieveSourceMapURL(e3);
      if (!r3)
        return null;
      var n2;
      if (g.test(r3)) {
        var t2 = r3.slice(r3.indexOf(",") + 1);
        n2 = a(t2, "base64").toString();
        r3 = e3;
      } else {
        r3 = supportRelativeURL(e3, r3);
        n2 = m(r3);
      }
      if (!n2) {
        return null;
      }
      return { url: r3, map: n2 };
    });
    function mapSourcePosition(e3) {
      var r3 = f[e3.source];
      if (!r3) {
        var n2 = v(e3.source);
        if (n2) {
          r3 = f[e3.source] = { url: n2.url, map: new t(n2.map) };
          if (r3.map.sourcesContent) {
            r3.map.sources.forEach(function(e4, n3) {
              var t2 = r3.map.sourcesContent[n3];
              if (t2) {
                var o3 = supportRelativeURL(r3.url, e4);
                p[o3] = t2;
              }
            });
          }
        } else {
          r3 = f[e3.source] = { url: null, map: null };
        }
      }
      if (r3 && r3.map && typeof r3.map.originalPositionFor === "function") {
        var o2 = r3.map.originalPositionFor(e3);
        if (o2.source !== null) {
          o2.source = supportRelativeURL(r3.url, o2.source);
          return o2;
        }
      }
      return e3;
    }
    function mapEvalOrigin(e3) {
      var r3 = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(e3);
      if (r3) {
        var n2 = mapSourcePosition({ source: r3[2], line: +r3[3], column: r3[4] - 1 });
        return "eval at " + r3[1] + " (" + n2.source + ":" + n2.line + ":" + (n2.column + 1) + ")";
      }
      r3 = /^eval at ([^(]+) \((.+)\)$/.exec(e3);
      if (r3) {
        return "eval at " + r3[1] + " (" + mapEvalOrigin(r3[2]) + ")";
      }
      return e3;
    }
    function CallSiteToString() {
      var e3;
      var r3 = "";
      if (this.isNative()) {
        r3 = "native";
      } else {
        e3 = this.getScriptNameOrSourceURL();
        if (!e3 && this.isEval()) {
          r3 = this.getEvalOrigin();
          r3 += ", ";
        }
        if (e3) {
          r3 += e3;
        } else {
          r3 += "<anonymous>";
        }
        var n2 = this.getLineNumber();
        if (n2 != null) {
          r3 += ":" + n2;
          var t2 = this.getColumnNumber();
          if (t2) {
            r3 += ":" + t2;
          }
        }
      }
      var o2 = "";
      var i2 = this.getFunctionName();
      var a2 = true;
      var u2 = this.isConstructor();
      var s2 = !(this.isToplevel() || u2);
      if (s2) {
        var l2 = this.getTypeName();
        if (l2 === "[object Object]") {
          l2 = "null";
        }
        var c2 = this.getMethodName();
        if (i2) {
          if (l2 && i2.indexOf(l2) != 0) {
            o2 += l2 + ".";
          }
          o2 += i2;
          if (c2 && i2.indexOf("." + c2) != i2.length - c2.length - 1) {
            o2 += " [as " + c2 + "]";
          }
        } else {
          o2 += l2 + "." + (c2 || "<anonymous>");
        }
      } else if (u2) {
        o2 += "new " + (i2 || "<anonymous>");
      } else if (i2) {
        o2 += i2;
      } else {
        o2 += r3;
        a2 = false;
      }
      if (a2) {
        o2 += " (" + r3 + ")";
      }
      return o2;
    }
    function cloneCallSite(e3) {
      var r3 = {};
      Object.getOwnPropertyNames(Object.getPrototypeOf(e3)).forEach(function(n2) {
        r3[n2] = /^(?:is|get)/.test(n2) ? function() {
          return e3[n2].call(e3);
        } : e3[n2];
      });
      r3.toString = CallSiteToString;
      return r3;
    }
    function wrapCallSite(e3, r3) {
      if (r3 === void 0) {
        r3 = { nextPosition: null, curPosition: null };
      }
      if (e3.isNative()) {
        r3.curPosition = null;
        return e3;
      }
      var n2 = e3.getFileName() || e3.getScriptNameOrSourceURL();
      if (n2) {
        var t2 = e3.getLineNumber();
        var o2 = e3.getColumnNumber() - 1;
        var i2 = /^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/;
        var a2 = i2.test(globalProcessVersion()) ? 0 : 62;
        if (t2 === 1 && o2 > a2 && !isInBrowser() && !e3.isEval()) {
          o2 -= a2;
        }
        var u2 = mapSourcePosition({ source: n2, line: t2, column: o2 });
        r3.curPosition = u2;
        e3 = cloneCallSite(e3);
        var s2 = e3.getFunctionName;
        e3.getFunctionName = function() {
          if (r3.nextPosition == null) {
            return s2();
          }
          return r3.nextPosition.name || s2();
        };
        e3.getFileName = function() {
          return u2.source;
        };
        e3.getLineNumber = function() {
          return u2.line;
        };
        e3.getColumnNumber = function() {
          return u2.column + 1;
        };
        e3.getScriptNameOrSourceURL = function() {
          return u2.source;
        };
        return e3;
      }
      var l2 = e3.isEval() && e3.getEvalOrigin();
      if (l2) {
        l2 = mapEvalOrigin(l2);
        e3 = cloneCallSite(e3);
        e3.getEvalOrigin = function() {
          return l2;
        };
        return e3;
      }
      return e3;
    }
    function prepareStackTrace(e3, r3) {
      if (l) {
        p = {};
        f = {};
      }
      var n2 = e3.name || "Error";
      var t2 = e3.message || "";
      var o2 = n2 + ": " + t2;
      var i2 = { nextPosition: null, curPosition: null };
      var a2 = [];
      for (var u2 = r3.length - 1; u2 >= 0; u2--) {
        a2.push("\n    at " + wrapCallSite(r3[u2], i2));
        i2.nextPosition = i2.curPosition;
      }
      i2.curPosition = i2.nextPosition = null;
      return o2 + a2.reverse().join("");
    }
    function getErrorSource(e3) {
      var r3 = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(e3.stack);
      if (r3) {
        var n2 = r3[1];
        var t2 = +r3[2];
        var o2 = +r3[3];
        var a2 = p[n2];
        if (!a2 && i && i.existsSync(n2)) {
          try {
            a2 = i.readFileSync(n2, "utf8");
          } catch (e4) {
            a2 = "";
          }
        }
        if (a2) {
          var u2 = a2.split(/(?:\r\n|\r|\n)/)[t2 - 1];
          if (u2) {
            return n2 + ":" + t2 + "\n" + u2 + "\n" + new Array(o2).join(" ") + "^";
          }
        }
      }
      return null;
    }
    function printErrorAndExit(e3) {
      var r3 = getErrorSource(e3);
      var n2 = globalProcessStderr();
      if (n2 && n2._handle && n2._handle.setBlocking) {
        n2._handle.setBlocking(true);
      }
      if (r3) {
        console.error();
        console.error(r3);
      }
      console.error(e3.stack);
      globalProcessExit(1);
    }
    function shimEmitUncaughtException() {
      var e3 = process.emit;
      process.emit = function(r3) {
        if (r3 === "uncaughtException") {
          var n2 = arguments[1] && arguments[1].stack;
          var t2 = this.listeners(r3).length > 0;
          if (n2 && !t2) {
            return printErrorAndExit(arguments[1]);
          }
        }
        return e3.apply(this, arguments);
      };
    }
    var S = h.slice(0);
    var _ = d.slice(0);
    r2.wrapCallSite = wrapCallSite;
    r2.getErrorSource = getErrorSource;
    r2.mapSourcePosition = mapSourcePosition;
    r2.retrieveSourceMap = v;
    r2.install = function(r3) {
      r3 = r3 || {};
      if (r3.environment) {
        c = r3.environment;
        if (["node", "browser", "auto"].indexOf(c) === -1) {
          throw new Error("environment " + c + " was unknown. Available options are {auto, browser, node}");
        }
      }
      if (r3.retrieveFile) {
        if (r3.overrideRetrieveFile) {
          h.length = 0;
        }
        h.unshift(r3.retrieveFile);
      }
      if (r3.retrieveSourceMap) {
        if (r3.overrideRetrieveSourceMap) {
          d.length = 0;
        }
        d.unshift(r3.retrieveSourceMap);
      }
      if (r3.hookRequire && !isInBrowser()) {
        var n2 = dynamicRequire(e2, "module");
        var t2 = n2.prototype._compile;
        if (!t2.__sourceMapSupport) {
          n2.prototype._compile = function(e3, r4) {
            p[r4] = e3;
            f[r4] = void 0;
            return t2.call(this, e3, r4);
          };
          n2.prototype._compile.__sourceMapSupport = true;
        }
      }
      if (!l) {
        l = "emptyCacheBetweenOperations" in r3 ? r3.emptyCacheBetweenOperations : false;
      }
      if (!u) {
        u = true;
        Error.prepareStackTrace = prepareStackTrace;
      }
      if (!s) {
        var o2 = "handleUncaughtExceptions" in r3 ? r3.handleUncaughtExceptions : true;
        try {
          var i2 = dynamicRequire(e2, "worker_threads");
          if (i2.isMainThread === false) {
            o2 = false;
          }
        } catch (e3) {
        }
        if (o2 && hasGlobalProcessEventEmitter()) {
          s = true;
          shimEmitUncaughtException();
        }
      }
    };
    r2.resetRetrieveHandlers = function() {
      h.length = 0;
      d.length = 0;
      h = S.slice(0);
      d = _.slice(0);
      v = handlerExec(d);
      m = handlerExec(h);
    };
  }, 147: (e2) => {
    e2.exports = require$$1;
  }, 17: (e2) => {
    e2.exports = pathExports;
  } };
  var r = {};
  function __webpack_require__(n) {
    var t = r[n];
    if (t !== void 0) {
      return t.exports;
    }
    var o = r[n] = { id: n, loaded: false, exports: {} };
    var i = true;
    try {
      e[n](o, o.exports, __webpack_require__);
      i = false;
    } finally {
      if (i)
        delete r[n];
    }
    o.loaded = true;
    return o.exports;
  }
  (() => {
    __webpack_require__.nmd = (e2) => {
      e2.paths = [];
      if (!e2.children)
        e2.children = [];
      return e2;
    };
  })();
  if (typeof __webpack_require__ !== "undefined")
    __webpack_require__.ab = __dirname + "/";
  (() => {
    __webpack_require__(284).install();
  })();
})();
(() => {
  var e = { 421: (e2) => {
    var r2 = { utf8: { stringToBytes: function(e3) {
      return r2.bin.stringToBytes(unescape(encodeURIComponent(e3)));
    }, bytesToString: function(e3) {
      return decodeURIComponent(escape(r2.bin.bytesToString(e3)));
    } }, bin: { stringToBytes: function(e3) {
      for (var r3 = [], t2 = 0; t2 < e3.length; t2++)
        r3.push(e3.charCodeAt(t2) & 255);
      return r3;
    }, bytesToString: function(e3) {
      for (var r3 = [], t2 = 0; t2 < e3.length; t2++)
        r3.push(String.fromCharCode(e3[t2]));
      return r3.join("");
    } } };
    e2.exports = r2;
  }, 935: (e2) => {
    (function() {
      var r2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t2 = { rotl: function(e3, r3) {
        return e3 << r3 | e3 >>> 32 - r3;
      }, rotr: function(e3, r3) {
        return e3 << 32 - r3 | e3 >>> r3;
      }, endian: function(e3) {
        if (e3.constructor == Number) {
          return t2.rotl(e3, 8) & 16711935 | t2.rotl(e3, 24) & 4278255360;
        }
        for (var r3 = 0; r3 < e3.length; r3++)
          e3[r3] = t2.endian(e3[r3]);
        return e3;
      }, randomBytes: function(e3) {
        for (var r3 = []; e3 > 0; e3--)
          r3.push(Math.floor(Math.random() * 256));
        return r3;
      }, bytesToWords: function(e3) {
        for (var r3 = [], t3 = 0, n = 0; t3 < e3.length; t3++, n += 8)
          r3[n >>> 5] |= e3[t3] << 24 - n % 32;
        return r3;
      }, wordsToBytes: function(e3) {
        for (var r3 = [], t3 = 0; t3 < e3.length * 32; t3 += 8)
          r3.push(e3[t3 >>> 5] >>> 24 - t3 % 32 & 255);
        return r3;
      }, bytesToHex: function(e3) {
        for (var r3 = [], t3 = 0; t3 < e3.length; t3++) {
          r3.push((e3[t3] >>> 4).toString(16));
          r3.push((e3[t3] & 15).toString(16));
        }
        return r3.join("");
      }, hexToBytes: function(e3) {
        for (var r3 = [], t3 = 0; t3 < e3.length; t3 += 2)
          r3.push(parseInt(e3.substr(t3, 2), 16));
        return r3;
      }, bytesToBase64: function(e3) {
        for (var t3 = [], n = 0; n < e3.length; n += 3) {
          var s = e3[n] << 16 | e3[n + 1] << 8 | e3[n + 2];
          for (var i = 0; i < 4; i++)
            if (n * 8 + i * 6 <= e3.length * 8)
              t3.push(r2.charAt(s >>> 6 * (3 - i) & 63));
            else
              t3.push("=");
        }
        return t3.join("");
      }, base64ToBytes: function(e3) {
        e3 = e3.replace(/[^A-Z0-9+\/]/gi, "");
        for (var t3 = [], n = 0, s = 0; n < e3.length; s = ++n % 4) {
          if (s == 0)
            continue;
          t3.push((r2.indexOf(e3.charAt(n - 1)) & Math.pow(2, -2 * s + 8) - 1) << s * 2 | r2.indexOf(e3.charAt(n)) >>> 6 - s * 2);
        }
        return t3;
      } };
      e2.exports = t2;
    })();
  }, 525: (e2, r2) => {
    Object.defineProperty(r2, "__esModule", { value: true }), r2.promisify = promisify;
    var t2 = "__ES6-PROMISIFY--CUSTOM-ARGUMENTS__";
    function promisify(e3) {
      if ("function" != typeof e3)
        throw new TypeError("Argument to promisify must be a function");
      var r3 = e3[t2], n = promisify.Promise || Promise;
      if ("function" != typeof n)
        throw new Error("No Promise implementation found; do you need a polyfill?");
      return function() {
        for (var t3 = this, s = arguments.length, i = Array(s), o = 0; o < s; o++)
          i[o] = arguments[o];
        return new n(function(n2, s2) {
          i.push(function(e4) {
            if (e4)
              return s2(e4);
            for (var t4 = arguments.length, i2 = Array(1 < t4 ? t4 - 1 : 0), o2 = 1; o2 < t4; o2++)
              i2[o2 - 1] = arguments[o2];
            if (1 === i2.length || !r3)
              return n2(i2[0]);
            var a = {};
            i2.forEach(function(e5, t5) {
              var n3 = r3[t5];
              n3 && (a[n3] = e5);
            }), n2(a);
          }), e3.apply(t3, i);
        });
      };
    }
    promisify.argumentNames = "__ES6-PROMISIFY--CUSTOM-ARGUMENTS__", promisify.Promise = void 0;
  }, 625: (e2) => {
    /*!
     * Determine if an object is a Buffer
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    e2.exports = function(e3) {
      return e3 != null && (isBuffer(e3) || isSlowBuffer(e3) || !!e3._isBuffer);
    };
    function isBuffer(e3) {
      return !!e3.constructor && typeof e3.constructor.isBuffer === "function" && e3.constructor.isBuffer(e3);
    }
    function isSlowBuffer(e3) {
      return typeof e3.readFloatLE === "function" && typeof e3.slice === "function" && isBuffer(e3.slice(0, 0));
    }
  }, 126: (e2, r2, t2) => {
    t2(147);
    var s;
    if (process.platform === "win32" || commonjsGlobal.TESTING_WINDOWS) {
      s = t2(1);
    } else {
      s = t2(728);
    }
    e2.exports = isexe;
    isexe.sync = sync;
    function isexe(e3, r3, t3) {
      if (typeof r3 === "function") {
        t3 = r3;
        r3 = {};
      }
      if (!t3) {
        if (typeof Promise !== "function") {
          throw new TypeError("callback not provided");
        }
        return new Promise(function(t4, n) {
          isexe(e3, r3 || {}, function(e4, r4) {
            if (e4) {
              n(e4);
            } else {
              t4(r4);
            }
          });
        });
      }
      s(e3, r3 || {}, function(e4, n) {
        if (e4) {
          if (e4.code === "EACCES" || r3 && r3.ignoreErrors) {
            e4 = null;
            n = false;
          }
        }
        t3(e4, n);
      });
    }
    function sync(e3, r3) {
      try {
        return s.sync(e3, r3 || {});
      } catch (e4) {
        if (r3 && r3.ignoreErrors || e4.code === "EACCES") {
          return false;
        } else {
          throw e4;
        }
      }
    }
  }, 728: (e2, r2, t2) => {
    e2.exports = isexe;
    isexe.sync = sync;
    var n = t2(147);
    function isexe(e3, r3, t3) {
      n.stat(e3, function(e4, n2) {
        t3(e4, e4 ? false : checkStat(n2, r3));
      });
    }
    function sync(e3, r3) {
      return checkStat(n.statSync(e3), r3);
    }
    function checkStat(e3, r3) {
      return e3.isFile() && checkMode(e3, r3);
    }
    function checkMode(e3, r3) {
      var t3 = e3.mode;
      var n2 = e3.uid;
      var s = e3.gid;
      var i = r3.uid !== void 0 ? r3.uid : process.getuid && process.getuid();
      var o = r3.gid !== void 0 ? r3.gid : process.getgid && process.getgid();
      var a = parseInt("100", 8);
      var c = parseInt("010", 8);
      var u = parseInt("001", 8);
      var f = a | c;
      var p = t3 & u || t3 & c && s === o || t3 & a && n2 === i || t3 & f && i === 0;
      return p;
    }
  }, 1: (e2, r2, t2) => {
    e2.exports = isexe;
    isexe.sync = sync;
    var n = t2(147);
    function checkPathExt(e3, r3) {
      var t3 = r3.pathExt !== void 0 ? r3.pathExt : {}.PATHEXT;
      if (!t3) {
        return true;
      }
      t3 = t3.split(";");
      if (t3.indexOf("") !== -1) {
        return true;
      }
      for (var n2 = 0; n2 < t3.length; n2++) {
        var s = t3[n2].toLowerCase();
        if (s && e3.substr(-s.length).toLowerCase() === s) {
          return true;
        }
      }
      return false;
    }
    function checkStat(e3, r3, t3) {
      if (!e3.isSymbolicLink() && !e3.isFile()) {
        return false;
      }
      return checkPathExt(r3, t3);
    }
    function isexe(e3, r3, t3) {
      n.stat(e3, function(n2, s) {
        t3(n2, n2 ? false : checkStat(s, e3, r3));
      });
    }
    function sync(e3, r3) {
      return checkStat(n.statSync(e3), e3, r3);
    }
  }, 711: (e2, r2, t2) => {
    (function() {
      var r3 = t2(935), n = t2(421).utf8, s = t2(625), i = t2(421).bin, md5 = function(e3, t3) {
        if (e3.constructor == String)
          if (t3 && t3.encoding === "binary")
            e3 = i.stringToBytes(e3);
          else
            e3 = n.stringToBytes(e3);
        else if (s(e3))
          e3 = Array.prototype.slice.call(e3, 0);
        else if (!Array.isArray(e3) && e3.constructor !== Uint8Array)
          e3 = e3.toString();
        var o = r3.bytesToWords(e3), a = e3.length * 8, c = 1732584193, u = -271733879, f = -1732584194, p = 271733878;
        for (var l = 0; l < o.length; l++) {
          o[l] = (o[l] << 8 | o[l] >>> 24) & 16711935 | (o[l] << 24 | o[l] >>> 8) & 4278255360;
        }
        o[a >>> 5] |= 128 << a % 32;
        o[(a + 64 >>> 9 << 4) + 14] = a;
        var d = md5._ff, h = md5._gg, g = md5._hh, v = md5._ii;
        for (var l = 0; l < o.length; l += 16) {
          var y = c, m = u, E = f, P = p;
          c = d(c, u, f, p, o[l + 0], 7, -680876936);
          p = d(p, c, u, f, o[l + 1], 12, -389564586);
          f = d(f, p, c, u, o[l + 2], 17, 606105819);
          u = d(u, f, p, c, o[l + 3], 22, -1044525330);
          c = d(c, u, f, p, o[l + 4], 7, -176418897);
          p = d(p, c, u, f, o[l + 5], 12, 1200080426);
          f = d(f, p, c, u, o[l + 6], 17, -1473231341);
          u = d(u, f, p, c, o[l + 7], 22, -45705983);
          c = d(c, u, f, p, o[l + 8], 7, 1770035416);
          p = d(p, c, u, f, o[l + 9], 12, -1958414417);
          f = d(f, p, c, u, o[l + 10], 17, -42063);
          u = d(u, f, p, c, o[l + 11], 22, -1990404162);
          c = d(c, u, f, p, o[l + 12], 7, 1804603682);
          p = d(p, c, u, f, o[l + 13], 12, -40341101);
          f = d(f, p, c, u, o[l + 14], 17, -1502002290);
          u = d(u, f, p, c, o[l + 15], 22, 1236535329);
          c = h(c, u, f, p, o[l + 1], 5, -165796510);
          p = h(p, c, u, f, o[l + 6], 9, -1069501632);
          f = h(f, p, c, u, o[l + 11], 14, 643717713);
          u = h(u, f, p, c, o[l + 0], 20, -373897302);
          c = h(c, u, f, p, o[l + 5], 5, -701558691);
          p = h(p, c, u, f, o[l + 10], 9, 38016083);
          f = h(f, p, c, u, o[l + 15], 14, -660478335);
          u = h(u, f, p, c, o[l + 4], 20, -405537848);
          c = h(c, u, f, p, o[l + 9], 5, 568446438);
          p = h(p, c, u, f, o[l + 14], 9, -1019803690);
          f = h(f, p, c, u, o[l + 3], 14, -187363961);
          u = h(u, f, p, c, o[l + 8], 20, 1163531501);
          c = h(c, u, f, p, o[l + 13], 5, -1444681467);
          p = h(p, c, u, f, o[l + 2], 9, -51403784);
          f = h(f, p, c, u, o[l + 7], 14, 1735328473);
          u = h(u, f, p, c, o[l + 12], 20, -1926607734);
          c = g(c, u, f, p, o[l + 5], 4, -378558);
          p = g(p, c, u, f, o[l + 8], 11, -2022574463);
          f = g(f, p, c, u, o[l + 11], 16, 1839030562);
          u = g(u, f, p, c, o[l + 14], 23, -35309556);
          c = g(c, u, f, p, o[l + 1], 4, -1530992060);
          p = g(p, c, u, f, o[l + 4], 11, 1272893353);
          f = g(f, p, c, u, o[l + 7], 16, -155497632);
          u = g(u, f, p, c, o[l + 10], 23, -1094730640);
          c = g(c, u, f, p, o[l + 13], 4, 681279174);
          p = g(p, c, u, f, o[l + 0], 11, -358537222);
          f = g(f, p, c, u, o[l + 3], 16, -722521979);
          u = g(u, f, p, c, o[l + 6], 23, 76029189);
          c = g(c, u, f, p, o[l + 9], 4, -640364487);
          p = g(p, c, u, f, o[l + 12], 11, -421815835);
          f = g(f, p, c, u, o[l + 15], 16, 530742520);
          u = g(u, f, p, c, o[l + 2], 23, -995338651);
          c = v(c, u, f, p, o[l + 0], 6, -198630844);
          p = v(p, c, u, f, o[l + 7], 10, 1126891415);
          f = v(f, p, c, u, o[l + 14], 15, -1416354905);
          u = v(u, f, p, c, o[l + 5], 21, -57434055);
          c = v(c, u, f, p, o[l + 12], 6, 1700485571);
          p = v(p, c, u, f, o[l + 3], 10, -1894986606);
          f = v(f, p, c, u, o[l + 10], 15, -1051523);
          u = v(u, f, p, c, o[l + 1], 21, -2054922799);
          c = v(c, u, f, p, o[l + 8], 6, 1873313359);
          p = v(p, c, u, f, o[l + 15], 10, -30611744);
          f = v(f, p, c, u, o[l + 6], 15, -1560198380);
          u = v(u, f, p, c, o[l + 13], 21, 1309151649);
          c = v(c, u, f, p, o[l + 4], 6, -145523070);
          p = v(p, c, u, f, o[l + 11], 10, -1120210379);
          f = v(f, p, c, u, o[l + 2], 15, 718787259);
          u = v(u, f, p, c, o[l + 9], 21, -343485551);
          c = c + y >>> 0;
          u = u + m >>> 0;
          f = f + E >>> 0;
          p = p + P >>> 0;
        }
        return r3.endian([c, u, f, p]);
      };
      md5._ff = function(e3, r4, t3, n2, s2, i2, o) {
        var a = e3 + (r4 & t3 | ~r4 & n2) + (s2 >>> 0) + o;
        return (a << i2 | a >>> 32 - i2) + r4;
      };
      md5._gg = function(e3, r4, t3, n2, s2, i2, o) {
        var a = e3 + (r4 & n2 | t3 & ~n2) + (s2 >>> 0) + o;
        return (a << i2 | a >>> 32 - i2) + r4;
      };
      md5._hh = function(e3, r4, t3, n2, s2, i2, o) {
        var a = e3 + (r4 ^ t3 ^ n2) + (s2 >>> 0) + o;
        return (a << i2 | a >>> 32 - i2) + r4;
      };
      md5._ii = function(e3, r4, t3, n2, s2, i2, o) {
        var a = e3 + (t3 ^ (r4 | ~n2)) + (s2 >>> 0) + o;
        return (a << i2 | a >>> 32 - i2) + r4;
      };
      md5._blocksize = 16;
      md5._digestsize = 16;
      e2.exports = function(e3, t3) {
        if (e3 === void 0 || e3 === null)
          throw new Error("Illegal argument " + e3);
        var n2 = r3.wordsToBytes(md5(e3, t3));
        return t3 && t3.asBytes ? n2 : t3 && t3.asString ? i.bytesToString(n2) : r3.bytesToHex(n2);
      };
    })();
  }, 284: (e2) => {
    var r2 = process.platform === "win32";
    var t2 = r2 ? /[^:]\\$/ : /.\/$/;
    e2.exports = function() {
      var e3;
      if (r2) {
        e3 = {}.TEMP || {}.TMP || ({}.SystemRoot || {}.windir) + "\\temp";
      } else {
        e3 = {}.TMPDIR || {}.TMP || {}.TEMP || "/tmp";
      }
      if (t2.test(e3)) {
        e3 = e3.slice(0, -1);
      }
      return e3;
    };
  }, 207: (e2, r2, t2) => {
    const n = process.platform === "win32" || {}.OSTYPE === "cygwin" || {}.OSTYPE === "msys";
    const s = t2(17);
    const i = n ? ";" : ":";
    const o = t2(126);
    const getNotFoundError = (e3) => Object.assign(new Error(`not found: ${e3}`), { code: "ENOENT" });
    const getPathInfo = (e3, r3) => {
      const t3 = r3.colon || i;
      const s2 = e3.match(/\//) || n && e3.match(/\\/) ? [""] : [...n ? [process.cwd()] : [], ...(r3.path || {}.PATH || "").split(t3)];
      const o2 = n ? r3.pathExt || {}.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
      const a = n ? o2.split(t3) : [""];
      if (n) {
        if (e3.indexOf(".") !== -1 && a[0] !== "")
          a.unshift("");
      }
      return { pathEnv: s2, pathExt: a, pathExtExe: o2 };
    };
    const which = (e3, r3, t3) => {
      if (typeof r3 === "function") {
        t3 = r3;
        r3 = {};
      }
      if (!r3)
        r3 = {};
      const { pathEnv: n2, pathExt: i2, pathExtExe: a } = getPathInfo(e3, r3);
      const c = [];
      const step = (t4) => new Promise((i3, o2) => {
        if (t4 === n2.length)
          return r3.all && c.length ? i3(c) : o2(getNotFoundError(e3));
        const a2 = n2[t4];
        const u = /^".*"$/.test(a2) ? a2.slice(1, -1) : a2;
        const f = s.join(u, e3);
        const p = !u && /^\.[\\\/]/.test(e3) ? e3.slice(0, 2) + f : f;
        i3(subStep(p, t4, 0));
      });
      const subStep = (e4, t4, n3) => new Promise((s2, u) => {
        if (n3 === i2.length)
          return s2(step(t4 + 1));
        const f = i2[n3];
        o(e4 + f, { pathExt: a }, (i3, o2) => {
          if (!i3 && o2) {
            if (r3.all)
              c.push(e4 + f);
            else
              return s2(e4 + f);
          }
          return s2(subStep(e4, t4, n3 + 1));
        });
      });
      return t3 ? step(0).then((e4) => t3(null, e4), t3) : step(0);
    };
    const whichSync = (e3, r3) => {
      r3 = r3 || {};
      const { pathEnv: t3, pathExt: n2, pathExtExe: i2 } = getPathInfo(e3, r3);
      const a = [];
      for (let c = 0; c < t3.length; c++) {
        const u = t3[c];
        const f = /^".*"$/.test(u) ? u.slice(1, -1) : u;
        const p = s.join(f, e3);
        const l = !f && /^\.[\\\/]/.test(e3) ? e3.slice(0, 2) + p : p;
        for (let e4 = 0; e4 < n2.length; e4++) {
          const t4 = l + n2[e4];
          try {
            const e5 = o.sync(t4, { pathExt: i2 });
            if (e5) {
              if (r3.all)
                a.push(t4);
              else
                return t4;
            }
          } catch (e5) {
          }
        }
      }
      if (r3.all && a.length)
        return a;
      if (r3.nothrow)
        return null;
      throw getNotFoundError(e3);
    };
    e2.exports = which;
    which.sync = whichSync;
  }, 81: (e2) => {
    e2.exports = require$$1;
  }, 113: (e2) => {
    e2.exports = require$$1;
  }, 147: (e2) => {
    e2.exports = require$$1;
  }, 808: (e2) => {
    e2.exports = require$$1;
  }, 17: (e2) => {
    e2.exports = pathExports;
  }, 254: (e2, r2, t2) => {
    var n = t2(702);
    var s = t2(649);
    var { debug: i } = t2(762);
    e2.exports.PEM2DER = function(e3, r3, t3, s2) {
      if (!s2 && typeof t3 === "function") {
        s2 = t3;
        t3 = "x509";
      }
      var i2 = [t3, "-outform", "der", "-in", e3, "-out", r3];
      n.spawnWrapper(i2, false, function(e4, r4) {
        if (e4) {
          s2(e4);
        } else {
          s2(null, r4 === 0);
        }
      });
    };
    e2.exports.DER2PEM = function(e3, r3, t3, s2) {
      if (!s2 && typeof t3 === "function") {
        s2 = t3;
        t3 = "x509";
      }
      var i2 = [t3, "-inform", "der", "-in", e3, "-out", r3];
      n.spawnWrapper(i2, false, function(e4, r4) {
        if (e4) {
          s2(e4);
        } else {
          s2(null, r4 === 0);
        }
      });
    };
    e2.exports.PEM2P7B = function(e3, r3, t3) {
      var s2 = ["crl2pkcs7", "-nocrl", "-certfile", e3.cert, "-out", r3];
      if (e3.ca) {
        if (!Array.isArray(e3.ca)) {
          e3.ca = [e3.ca];
        }
        e3.ca.forEach(function(e4) {
          s2.push("-certfile");
          s2.push(e4);
        });
      }
      n.spawnWrapper(s2, false, function(e4, r4) {
        if (e4) {
          t3(e4);
        } else {
          t3(null, r4 === 0);
        }
      });
    };
    e2.exports.P7B2PEM = function(e3, r3, t3) {
      var s2 = ["pkcs7", "-print_certs", "-in", e3, "-out", r3];
      n.spawnWrapper(s2, false, function(e4, r4) {
        if (e4) {
          t3(e4);
        } else {
          t3(null, r4 === 0);
        }
      });
    };
    e2.exports.PEM2PFX = function(e3, r3, t3, i2) {
      var o = ["pkcs12", "-export", "-out", r3, "-inkey", e3.key, "-in", e3.cert];
      if (e3.ca) {
        if (!Array.isArray(e3.ca)) {
          e3.ca = [e3.ca];
        }
        e3.ca.forEach(function(e4) {
          o.push("-certfile");
          o.push(e4);
        });
      }
      var a = [];
      s.createPasswordFile({ cipher: "", password: t3, passType: "in" }, o, a);
      s.createPasswordFile({ cipher: "", password: t3, passType: "out" }, o, a);
      n.spawnWrapper(o, false, function(e4, r4) {
        function done(e5) {
          if (e5) {
            i2(e5);
          } else {
            i2(null, r4 === 0);
          }
        }
        s.deleteTempFiles(a, function(r5) {
          done(e4 || r5);
        });
      });
    };
    e2.exports.PFX2PEM = function(e3, r3, t3, i2) {
      var o = ["pkcs12", "-in", e3, "-out", r3, "-nodes"];
      var a = [];
      s.createPasswordFile({ cipher: "", password: t3, passType: "in" }, o, a);
      s.createPasswordFile({ cipher: "", password: t3, passType: "out" }, o, a);
      n.spawnWrapper(o, false, function(e4, r4) {
        function done(e5) {
          if (e5) {
            i2(e5);
          } else {
            i2(null, r4 === 0);
          }
        }
        s.deleteTempFiles(a, function(r5) {
          done(e4 || r5);
        });
      });
    };
    e2.exports.P7B2PFX = function(e3, r3, t3, o) {
      var a = e3.cert.replace(/\.[^.]+$/, ".cer");
      var c = ["pkcs7", "-print_certs", "-in", e3.cert, "-out", a];
      n.spawnWrapper(c, false, function(c2, u) {
        i("P7B2PFX", { error: c2, code: u });
        if (c2) {
          o(c2);
        } else {
          var f = ["pkcs12", "-export", "-in", a, "-inkey", e3.key, "-out", r3];
          if (e3.ca) {
            if (!Array.isArray(e3.ca)) {
              e3.ca = [e3.ca];
            }
            e3.ca.forEach(function(e4) {
              f.push("-certfile");
              f.push(e4);
            });
          }
          var p = [a];
          s.createPasswordFile({ cipher: "", password: t3, passType: "in" }, f, p);
          s.createPasswordFile({ cipher: "", password: t3, passType: "out" }, f, p);
          n.spawnWrapper(f, false, function(e4, r4) {
            function done(e5) {
              if (e5) {
                o(e5);
              } else {
                o(null, r4 === 0);
              }
            }
            s.deleteTempFiles(p, function(r5) {
              done(e4 || r5);
            });
          });
        }
      });
    };
  }, 762: (e2) => {
    function debug(e3, r2) {
      if ({}.CI === "true") {
        console.log(`::group::${e3}`);
        console.log(JSON.stringify(r2, null, 3));
        console.log("::endgroup::");
      }
    }
    e2.exports = { debug };
  }, 649: (e2, r2, t2) => {
    var n = t2(17);
    var s = t2(147);
    var i = t2(113);
    var o = t2(284);
    var a = {}.PEMJS_TMPDIR || o();
    e2.exports.isNumber = function(e3) {
      if (Array.isArray(e3)) {
        return false;
      }
      return /^\d+$/g.test(e3);
    };
    e2.exports.isHex = function isHex(e3) {
      return /^(0x){0,1}([0-9A-F]{1,40}|[0-9A-F]{1,40})$/gi.test(e3);
    };
    e2.exports.toHex = function toHex(e3) {
      var r3 = "";
      for (var t3 = 0; t3 < e3.length; t3++) {
        r3 += "" + e3.charCodeAt(t3).toString(16);
      }
      return r3;
    };
    e2.exports.ciphers = ["aes128", "aes192", "aes256", "camellia128", "camellia192", "camellia256", "des", "des3", "idea"];
    var c = e2.exports.ciphers;
    e2.exports.createPasswordFile = function(e3, r3, t3) {
      if (!e3 || !Object.prototype.hasOwnProperty.call(e3, "password") || !Object.prototype.hasOwnProperty.call(e3, "passType") || !/^(word|in|out)$/.test(e3.passType)) {
        return false;
      }
      var o2 = n.join(a, i.randomBytes(20).toString("hex"));
      t3.push(o2);
      e3.password = e3.password.trim();
      if (e3.password === "") {
        e3.mustPass = true;
      }
      if (e3.cipher && c.indexOf(e3.cipher) !== -1) {
        r3.push("-" + e3.cipher);
      }
      r3.push("-pass" + e3.passType);
      if (e3.mustPass) {
        r3.push("pass:" + e3.password);
      } else {
        s.writeFileSync(o2, e3.password);
        r3.push("file:" + o2);
      }
      return true;
    };
    e2.exports.deleteTempFiles = function(e3, r3) {
      var t3 = [];
      if (typeof e3 === "string") {
        t3.push(e3);
      } else if (Array.isArray(e3)) {
        t3 = e3;
      } else {
        return r3(new Error("Unexcepted files parameter type; only string or array supported"));
      }
      var deleteSeries = function(e4, r4) {
        if (e4.length) {
          var t4 = e4.shift();
          var myCallback = function(t5) {
            if (t5 && t5.code === "ENOENT") {
              return deleteSeries(e4, r4);
            } else if (t5) {
              return r4(t5);
            } else {
              return deleteSeries(e4, r4);
            }
          };
          if (t4 && typeof t4 === "string") {
            s.unlink(t4, myCallback);
          } else {
            return deleteSeries(e4, r4);
          }
        } else {
          return r4(null);
        }
      };
      deleteSeries(t3, r3);
    };
  }, 702: (e2, r2, t2) => {
    var n = t2(649);
    var { debug: s } = t2(762);
    var i = t2(81).spawn;
    var o = t2(81).spawnSync;
    var a = t2(17);
    var c = t2(147);
    var u = t2(284);
    var f = t2(113);
    var p = t2(207);
    var l = {};
    var d = {}.PEMJS_TMPDIR || u();
    const h = new RegExp("^(OpenSSL|LibreSSL) (((\\d+).(\\d+)).(\\d+))([a-z]+)?");
    if ("CI" in process.env && {}.CI === "true") {
      if ("LIBRARY" in process.env && "VERSION" in process.env && {}.LIBRARY != "" && {}.VERSION != "") {
        const e3 = `./openssl/${{}.LIBRARY}_v${{}.VERSION}/bin/openssl`;
        if (c.existsSync(e3))
          ;
      }
    }
    function set(e3, r3) {
      l[e3] = r3;
    }
    function get(e3) {
      return l[e3] || null;
    }
    function exec(e3, r3, t3, n2) {
      if (!n2 && typeof t3 === "function") {
        n2 = t3;
        t3 = false;
      }
      spawnWrapper(e3, t3, function(e4, t4, s2, i2) {
        var o2, a2;
        if (e4) {
          return n2(e4);
        }
        if (o2 = s2.match(new RegExp("-+BEGIN " + r3 + "-+$", "mu"))) {
          o2 = o2.index;
        } else {
          o2 = -1;
        }
        if (r3 === "EC PARAMETERS") {
          r3 = "EC PRIVATE KEY";
        }
        if (a2 = s2.match(new RegExp("^\\-+END " + r3 + "\\-+", "m"))) {
          a2 = a2.index + a2[0].length;
        } else {
          a2 = -1;
        }
        if (o2 >= 0 && a2 >= 0) {
          return n2(null, s2.substring(o2, a2));
        } else {
          return n2(new Error(r3 + " not found from openssl output:\n---stdout---\n" + s2 + "\n---stderr---\n" + i2 + "\ncode: " + t4));
        }
      });
    }
    function execBinary(e3, r3, t3) {
      if (!t3 && typeof r3 === "function") {
        t3 = r3;
        r3 = false;
      }
      spawnWrapper(e3, r3, true, function(e4, r4, n2, i2) {
        s("execBinary", { err: e4, code: r4, stdout: n2, stderr: i2 });
        if (e4) {
          return t3(e4);
        }
        return t3(null, n2);
      });
    }
    function spawn(e3, r3, t3) {
      var n2 = get("pathOpenSSL") || {}.OPENSSL_BIN || "openssl";
      testOpenSSLPath(n2, function(s2) {
        if (s2) {
          return t3(s2);
        }
        var o2 = i(n2, e3);
        var a2 = "";
        var c2 = r3 ? Buffer.alloc(0) : "";
        o2.stdout.on("data", function(e4) {
          if (!r3) {
            c2 += e4.toString("binary");
          } else {
            c2 = Buffer.concat([c2, e4]);
          }
        });
        o2.stderr.on("data", function(e4) {
          a2 += e4.toString("binary");
        });
        var u2 = 2;
        var f2 = -1;
        var p2 = false;
        var done = function(r4) {
          if (p2) {
            return;
          }
          if (r4) {
            p2 = true;
            return t3(r4);
          }
          if (--u2 < 1) {
            p2 = true;
            if (f2 !== 0) {
              if (f2 === 2 && (a2 === "" || /depth lookup: unable to/.test(a2) || /depth lookup: self(-|\s)signed certificate/.test(a2))) {
                return t3(null, f2, c2, a2);
              }
              return t3(new Error("Invalid openssl exit code: " + f2 + "\n% openssl " + e3.join(" ") + "\n" + a2), f2);
            } else {
              return t3(null, f2, c2, a2);
            }
          }
        };
        o2.on("error", done);
        o2.on("exit", function(e4) {
          f2 = e4;
          done();
        });
        o2.on("close", function() {
          c2 = r3 ? c2 : Buffer.from(c2, "binary").toString("utf-8");
          a2 = Buffer.from(a2, "binary").toString("utf-8");
          done();
        });
      });
    }
    function spawnWrapper(e3, r3, t3, i2) {
      if (!i2 && typeof t3 === "function") {
        i2 = t3;
        t3 = false;
      }
      var o2 = [];
      var u2 = [];
      if (r3) {
        r3 = [].concat(r3);
        var p2, l2;
        for (l2 = 0; l2 < e3.length; l2++) {
          if (e3[l2] === "--TMPFILE--") {
            p2 = a.join(d, f.randomBytes(20).toString("hex"));
            o2.push({ path: p2, contents: r3.shift() });
            e3[l2] = p2;
            u2.push(p2);
          }
        }
      }
      var h2;
      for (l2 = 0; l2 < o2.length; l2++) {
        h2 = o2[l2];
        c.writeFileSync(h2.path, h2.contents);
      }
      spawn(e3, t3, function(r4, t4, o3, a2) {
        n.deleteTempFiles(u2, function(n2) {
          s(e3[0], { err: r4, fsErr: n2, code: t4, stdout: o3, stderr: a2 });
          i2(r4 || n2, t4, o3, a2);
        });
      });
    }
    function testOpenSSLPath(e3, r3) {
      p(e3, function(t3) {
        if (t3) {
          return r3(new Error("Could not find openssl on your system on this path: " + e3));
        }
        r3();
      });
    }
    function setVersion() {
      var e3 = get("pathOpenSSL") || {}.OPENSSL_BIN || "openssl";
      var r3 = o(e3, ["version"]);
      var t3 = String(r3.stdout) + "\n" + String(r3.stderr) + "\n" + String(r3.error);
      let n2 = h.exec(t3);
      if (n2 === null || n2.length <= 7)
        return;
      set("openSslVersion", n2[1].toUpperCase());
      set("Vendor", n2[1].toUpperCase());
      set("VendorVersion", n2[2]);
      set("VendorVersionMajorMinor", n2[3]);
      set("VendorVersionMajor", n2[4]);
      set("VendorVersionMinor", n2[5]);
      set("VendorVersionPatch", n2[6]);
      set("VendorVersionBuildChar", typeof n2[7] === "undefined" ? "" : n2[7]);
    }
    setVersion();
    e2.exports = { exec, execBinary, spawn, spawnWrapper, settings: l, set, get };
  }, 214: (e2, r2, t2) => {
    const { debug: n } = t2(762);
    const { promisify: s } = t2(525);
    var i = t2(808);
    var o = t2(649);
    var a = t2(702);
    const c = t2(711);
    e2.exports.createPrivateKey = createPrivateKey;
    e2.exports.createDhparam = createDhparam;
    e2.exports.createEcparam = createEcparam;
    e2.exports.createCSR = createCSR;
    e2.exports.createCertificate = createCertificate;
    e2.exports.readCertificateInfo = readCertificateInfo;
    e2.exports.getPublicKey = getPublicKey;
    e2.exports.getFingerprint = getFingerprint;
    e2.exports.getModulus = getModulus;
    e2.exports.getDhparamInfo = getDhparamInfo;
    e2.exports.createPkcs12 = createPkcs12;
    e2.exports.readPkcs12 = readPkcs12;
    e2.exports.verifySigningChain = verifySigningChain;
    e2.exports.checkCertificate = checkCertificate;
    e2.exports.checkPkcs12 = checkPkcs12;
    e2.exports.config = config;
    e2.exports.convert = t2(254);
    var u = "-----BEGIN PRIVATE KEY-----";
    var f = "-----END PRIVATE KEY-----";
    var p = "-----BEGIN RSA PRIVATE KEY-----";
    var l = "-----END RSA PRIVATE KEY-----";
    var d = "-----BEGIN ENCRYPTED PRIVATE KEY-----";
    var h = "-----END ENCRYPTED PRIVATE KEY-----";
    var g = "-----BEGIN CERTIFICATE-----";
    var v = "-----END CERTIFICATE-----";
    function createPrivateKey(e3, r3, t3) {
      if (!t3 && !r3 && typeof e3 === "function") {
        t3 = e3;
        e3 = void 0;
        r3 = {};
      } else if (!t3 && e3 && typeof r3 === "function") {
        t3 = r3;
        r3 = {};
      }
      e3 = Number(e3) || 2048;
      var s2 = ["genrsa"];
      if (a.get("Vendor") === "OPENSSL" && a.get("VendorVersionMajor") >= 3) {
        s2.push("-traditional");
      }
      var i2 = [];
      if (r3 && r3.cipher && Number(o.ciphers.indexOf(r3.cipher)) !== -1 && r3.password) {
        n("helper.createPasswordFile", { cipher: r3.cipher, password: r3.password, passType: "out" });
        o.createPasswordFile({ cipher: r3.cipher, password: r3.password, passType: "out" }, s2, i2);
      }
      s2.push(e3);
      n("version", a.get("openSslVersion"));
      a.exec(s2, "(RSA |ENCRYPTED |)PRIVATE KEY", function(e4, r4) {
        function done(e5) {
          if (e5) {
            return t3(e5);
          }
          return t3(null, { key: r4 });
        }
        o.deleteTempFiles(i2, function(t4) {
          n("createPrivateKey", { sslErr: e4, fsErr: t4, key: r4, keyLength: r4 && r4.length });
          done(e4 || t4);
        });
      });
    }
    function createDhparam(e3, r3) {
      if (!r3 && typeof e3 === "function") {
        r3 = e3;
        e3 = void 0;
      }
      e3 = Number(e3) || 512;
      var t3 = ["dhparam", "-outform", "PEM", e3];
      a.exec(t3, "DH PARAMETERS", function(e4, t4) {
        if (e4) {
          return r3(e4);
        }
        return r3(null, { dhparam: t4 });
      });
    }
    function createEcparam(e3, r3, t3, n2) {
      if (!n2 && typeof t3 === "undefined" && !r3 && typeof e3 === "function") {
        n2 = e3;
        e3 = void 0;
      } else if (!n2 && typeof t3 === "undefined" && e3 && typeof r3 === "function") {
        n2 = r3;
        r3 = void 0;
      } else if (!n2 && typeof t3 === "function" && e3 && r3) {
        n2 = t3;
        t3 = void 0;
      }
      e3 = e3 || "secp256k1";
      r3 = r3 || "explicit";
      t3 = t3 || false;
      var s2 = ["ecparam", "-name", e3, "-genkey", "-param_enc", r3];
      var i2 = "EC PARAMETERS";
      if (t3) {
        s2.push("-noout");
        i2 = "EC PRIVATE KEY";
      }
      a.exec(s2, i2, function(e4, r4) {
        if (e4) {
          return n2(e4);
        }
        return n2(null, { ecparam: r4 });
      });
    }
    function createCSR(e3, r3) {
      if (!r3 && typeof e3 === "function") {
        r3 = e3;
        e3 = void 0;
      }
      let t3 = [];
      e3 = e3 || {};
      if (e3.commonName && (i.isIPv4(e3.commonName) || i.isIPv6(e3.commonName))) {
        if (!e3.altNames) {
          e3.altNames = [e3.commonName];
        } else if (e3.altNames.indexOf(e3.commonName) === -1) {
          e3.altNames = e3.altNames.concat([e3.commonName]);
        }
      }
      if (!e3.clientKey) {
        if (e3 && (e3.password || e3.clientKeyPassword)) {
          e3.password = e3.password || e3.clientKeyPassword || "";
        }
        createPrivateKey(e3.keyBitsize || 2048, e3, function(t4, n3) {
          if (t4) {
            return r3(t4);
          }
          e3.clientKey = n3.key;
          createCSR(e3, r3);
        });
        return;
      }
      var n2 = ["req", "-new", "-" + (e3.hash || "sha256")];
      if (e3.csrConfigFile) {
        n2.push("-config");
        n2.push(e3.csrConfigFile);
      } else {
        n2.push("-subj");
        n2.push(generateCSRSubject(e3));
      }
      n2.push("-key");
      n2.push("--TMPFILE--");
      var s2 = [e3.clientKey];
      var c2 = null;
      if (e3 && (e3.password || e3.clientKeyPassword)) {
        o.createPasswordFile({ cipher: "", password: e3.password || e3.clientKeyPassword, passType: "in" }, n2, t3);
      }
      if (e3.altNames && Array.isArray(e3.altNames) && e3.altNames.length) {
        n2.push("-extensions");
        n2.push("v3_req");
        n2.push("-config");
        n2.push("--TMPFILE--");
        var u2 = [];
        for (var f2 = 0; f2 < e3.altNames.length; f2++) {
          u2.push((i.isIP(e3.altNames[f2]) ? "IP" : "DNS") + "." + (f2 + 1) + " = " + e3.altNames[f2]);
        }
        s2.push(c2 = ["[req]", "req_extensions = v3_req", "distinguished_name = req_distinguished_name", "[v3_req]", "subjectAltName = @alt_names", "[alt_names]", u2.join("\n"), "[req_distinguished_name]", "commonName = Common Name", "commonName_max = 64"].join("\n"));
      } else if (e3.config) {
        c2 = e3.config;
      }
      if (e3.clientKeyPassword) {
        o.createPasswordFile({ cipher: "", password: e3.clientKeyPassword, passType: "in" }, n2, t3);
      }
      a.exec(n2, "CERTIFICATE REQUEST", s2, function(n3, s3) {
        function done(t4) {
          if (t4) {
            return r3(t4);
          }
          r3(null, { csr: s3, config: c2, clientKey: e3.clientKey });
        }
        o.deleteTempFiles(t3, function(e4) {
          done(n3 || e4);
        });
      });
    }
    function createCertificate(e3, r3) {
      if (!r3 && typeof e3 === "function") {
        r3 = e3;
        e3 = void 0;
      }
      e3 = e3 || {};
      if (!e3.csr) {
        createCSR(e3, function(t3, n2) {
          if (t3) {
            return r3(t3);
          }
          e3.csr = n2.csr;
          e3.config = n2.config;
          e3.clientKey = n2.clientKey;
          createCertificate(e3, r3);
        });
        return;
      }
      if (!e3.clientKey) {
        e3.clientKey = "";
      }
      if (!e3.serviceKey) {
        if (e3.selfSigned) {
          e3.serviceKey = e3.clientKey;
        } else {
          createPrivateKey(e3.keyBitsize || 2048, { cipher: e3.cipher, password: e3.clientKeyPassword || "" }, function(t3, n2) {
            if (t3) {
              return r3(t3);
            }
            e3.serviceKey = n2.key;
            createCertificate(e3, r3);
          });
          return;
        }
      }
      readCertificateInfo(e3.csr, function(t3, n2) {
        if (t3) {
          return r3(t3);
        }
        var s2 = ["x509", "-req", "-" + (e3.hash || "sha256"), "-days", Number(e3.days) || "365", "-in", "--TMPFILE--"];
        var i2 = [e3.csr];
        var c2 = [];
        if (e3.serviceCertificate) {
          s2.push("-CA");
          s2.push("--TMPFILE--");
          s2.push("-CAkey");
          s2.push("--TMPFILE--");
          if (e3.serial) {
            s2.push("-set_serial");
            if (o.isNumber(e3.serial)) {
              s2.push("0x" + ("0000000000000000000000000000000000000000" + e3.serial.toString(16)).slice(-40));
            } else {
              if (o.isHex(e3.serial)) {
                if (e3.serial.startsWith("0x")) {
                  e3.serial = e3.serial.substring(2, e3.serial.length);
                }
                s2.push("0x" + ("0000000000000000000000000000000000000000" + e3.serial).slice(-40));
              } else {
                s2.push("0x" + ("0000000000000000000000000000000000000000" + o.toHex(e3.serial)).slice(-40));
              }
            }
          } else {
            s2.push("-CAcreateserial");
            if (e3.serialFile) {
              s2.push("-CAserial");
              s2.push(e3.serialFile + ".srl");
            }
          }
          if (e3.serviceKeyPassword) {
            o.createPasswordFile({ cipher: "", password: e3.serviceKeyPassword, passType: "in" }, s2, c2);
          }
          i2.push(e3.serviceCertificate);
          i2.push(e3.serviceKey);
        } else {
          s2.push("-signkey");
          s2.push("--TMPFILE--");
          if (e3.serviceKeyPassword) {
            o.createPasswordFile({ cipher: "", password: e3.serviceKeyPassword, passType: "in" }, s2, c2);
          }
          i2.push(e3.serviceKey);
        }
        if (e3.config) {
          s2.push("-extensions");
          s2.push("v3_req");
          s2.push("-extfile");
          s2.push("--TMPFILE--");
          i2.push(e3.config);
        } else if (e3.extFile) {
          s2.push("-extfile");
          s2.push(e3.extFile);
        } else {
          var u2 = [];
          if (n2 && n2.san) {
            for (var f2 = 0; f2 < n2.san.dns.length; f2++) {
              u2.push("DNS." + (f2 + 1) + " = " + n2.san.dns[f2]);
            }
            for (var p2 = 0; p2 < n2.san.ip.length; p2++) {
              u2.push("IP." + (p2 + 1) + " = " + n2.san.ip[p2]);
            }
            for (var l2 = 0; l2 < n2.san.email.length; l2++) {
              u2.push("email." + (l2 + 1) + " = " + n2.san.email[l2]);
            }
            s2.push("-extensions");
            s2.push("v3_req");
            s2.push("-extfile");
            s2.push("--TMPFILE--");
            i2.push(["[v3_req]", "subjectAltName = @alt_names", "[alt_names]", u2.join("\n")].join("\n"));
          }
        }
        if (e3.clientKeyPassword) {
          o.createPasswordFile({ cipher: "", password: e3.clientKeyPassword, passType: "in" }, s2, c2);
        }
        a.exec(s2, "CERTIFICATE", i2, function(t4, n3) {
          function done(t5) {
            if (t5) {
              return r3(t5);
            }
            var s3 = { csr: e3.csr, clientKey: e3.clientKey, certificate: n3, serviceKey: e3.serviceKey };
            return r3(null, s3);
          }
          o.deleteTempFiles(c2, function(e4) {
            done(t4 || e4);
          });
        });
      });
    }
    function getPublicKey(e3, r3) {
      if (!r3 && typeof e3 === "function") {
        r3 = e3;
        e3 = void 0;
      }
      e3 = (e3 || "").toString();
      var t3;
      if (e3.match(/BEGIN(\sNEW)? CERTIFICATE REQUEST/)) {
        t3 = ["req", "-in", "--TMPFILE--", "-pubkey", "-noout"];
      } else if (e3.match(/BEGIN RSA PRIVATE KEY/) || e3.match(/BEGIN PRIVATE KEY/)) {
        t3 = ["rsa", "-in", "--TMPFILE--", "-pubout"];
      } else {
        t3 = ["x509", "-in", "--TMPFILE--", "-pubkey", "-noout"];
      }
      a.exec(t3, "PUBLIC KEY", e3, function(e4, t4) {
        if (e4) {
          return r3(e4);
        }
        return r3(null, { publicKey: t4 });
      });
    }
    function readCertificateInfo(e3, r3) {
      if (!r3 && typeof e3 === "function") {
        r3 = e3;
        e3 = void 0;
      }
      e3 = (e3 || "").toString();
      var t3 = e3.match(/BEGIN(\sNEW)? CERTIFICATE REQUEST/);
      var n2 = t3 ? "req" : "x509";
      var s2 = [n2, "-noout", "-nameopt", "RFC2253,sep_multiline,space_eq,-esc_msb,utf8", "-text", "-in", "--TMPFILE--"];
      a.spawnWrapper(s2, e3, function(e4, t4, n3, s3) {
        if (e4) {
          return r3(e4);
        } else if (s3) {
          return r3(s3);
        }
        return fetchCertificateData(n3, r3);
      });
    }
    function getModulus(e3, r3, t3, n2) {
      if (!n2 && !t3 && typeof r3 === "function") {
        n2 = r3;
        r3 = void 0;
        t3 = false;
      } else if (!n2 && t3 && typeof t3 === "function") {
        n2 = t3;
        t3 = false;
      }
      if (t3 && t3 !== "md5") {
        t3 = false;
      }
      e3 = Buffer.isBuffer(e3) && e3.toString() || e3;
      let s2;
      if (e3.match(/BEGIN(\sNEW)? CERTIFICATE REQUEST/)) {
        s2 = "req";
      } else if (e3.match(/BEGIN RSA PRIVATE KEY/) || e3.match(/BEGIN PRIVATE KEY/)) {
        s2 = "rsa";
      } else {
        s2 = "x509";
      }
      let i2 = [s2, "-noout", "-modulus", "-in", "--TMPFILE--"];
      let u2 = [];
      if (r3) {
        o.createPasswordFile({ cipher: "", password: r3, passType: "in" }, i2, u2);
      }
      a.spawnWrapper(i2, e3, function(e4, r4, s3, i3) {
        function done(e5) {
          if (e5) {
            return n2(e5);
          }
          var r5 = s3.match(/Modulus=([0-9a-fA-F]+)$/m);
          if (r5) {
            if (t3 === "md5") {
              return n2(null, { modulus: c(r5[1]) });
            }
            return n2(null, { modulus: r5[1] });
          } else {
            return n2(new Error("No modulus"));
          }
        }
        o.deleteTempFiles(u2, function(r5) {
          done(e4 || r5 || i3);
        });
      });
    }
    function getDhparamInfo(e3, r3) {
      e3 = Buffer.isBuffer(e3) && e3.toString() || e3;
      var t3 = ["dhparam", "-text", "-in", "--TMPFILE--"];
      a.spawnWrapper(t3, e3, function(e4, t4, n2, s2) {
        if (e4) {
          return r3(e4);
        } else if (s2) {
          return r3(s2);
        }
        var i2 = {};
        var o2 = n2.match(/Parameters: \((\d+) bit\)/);
        if (o2) {
          i2.size = Number(o2[1]);
        }
        var a2 = "";
        n2.split("\n").forEach(function(e5) {
          if (/\s+([0-9a-f][0-9a-f]:)+[0-9a-f]?[0-9a-f]?/g.test(e5)) {
            a2 += e5.trim();
          }
        });
        if (a2) {
          i2.prime = a2;
        }
        if (!o2 && !a2) {
          return r3(new Error("No DH info found"));
        }
        return r3(null, i2);
      });
    }
    function config(e3) {
      Object.keys(e3).forEach(function(r3) {
        a.set(r3, e3[r3]);
      });
    }
    function getFingerprint(e3, r3, t3) {
      if (!t3 && typeof r3 === "function") {
        t3 = r3;
        r3 = void 0;
      }
      r3 = r3 || "sha1";
      var n2 = ["x509", "-in", "--TMPFILE--", "-fingerprint", "-noout", "-" + r3];
      a.spawnWrapper(n2, e3, function(e4, r4, n3, s2) {
        if (e4) {
          return t3(e4);
        } else if (s2) {
          return t3(s2);
        }
        var i2 = n3.match(/Fingerprint=([0-9a-fA-F:]+)$/m);
        if (i2) {
          return t3(null, { fingerprint: i2[1] });
        } else {
          return t3(new Error("No fingerprint"));
        }
      });
    }
    function createPkcs12(e3, r3, t3, n2, s2) {
      if (!s2 && typeof n2 === "function") {
        s2 = n2;
        n2 = {};
      }
      var i2 = ["pkcs12", "-export"];
      var c2 = [];
      if (n2.cipher && n2.clientKeyPassword) {
        o.createPasswordFile({ cipher: n2.cipher, password: n2.clientKeyPassword, passType: "in" }, i2, c2);
      }
      o.createPasswordFile({ cipher: "", password: t3, passType: "word" }, i2, c2);
      i2.push("-in");
      i2.push("--TMPFILE--");
      i2.push("-inkey");
      i2.push("--TMPFILE--");
      var u2 = [r3, e3];
      if (n2.certFiles) {
        u2.push(n2.certFiles.join(""));
        i2.push("-certfile");
        i2.push("--TMPFILE--");
      }
      a.execBinary(i2, u2, function(e4, r4) {
        function done(e5) {
          if (e5) {
            return s2(e5);
          }
          return s2(null, { pkcs12: r4 });
        }
        o.deleteTempFiles(c2, function(r5) {
          done(e4 || r5);
        });
      });
    }
    function readPkcs12(e3, r3, t3) {
      if (!t3 && typeof r3 === "function") {
        t3 = r3;
        r3 = {};
      }
      r3.p12Password = r3.p12Password || "";
      var s2 = [];
      var i2 = [];
      var c2 = ["pkcs12", "-in", e3];
      o.createPasswordFile({ cipher: "", password: r3.p12Password, passType: "in" }, c2, i2);
      if (Buffer.isBuffer(e3)) {
        s2 = [e3];
        c2[2] = "--TMPFILE--";
      }
      if (a.get("Vendor") === "OPENSSL" && a.get("VendorVersionMajor") >= 3) {
        c2.push("-legacy");
        c2.push("-traditional");
      }
      if (r3.clientKeyPassword) {
        o.createPasswordFile({ cipher: "", password: r3.clientKeyPassword, passType: "out" }, c2, i2);
      } else {
        c2.push("-nodes");
      }
      a.execBinary(c2, s2, function(e4, s3) {
        function done(e5) {
          var i3 = {};
          if (e5 && e5.message.indexOf("No such file or directory") !== -1) {
            e5.code = "ENOENT";
          }
          if (!e5) {
            var o2 = readFromString(s3, g, v);
            i3.cert = o2.shift();
            i3.ca = o2;
            i3.key = readFromString(s3, u, f).pop();
            n("readPkcs12.execBinary - PRIVATE KEY - ?: ", i3.key);
            if (i3.key) {
              var c3 = ["rsa"];
              if (a.get("Vendor") === "OPENSSL" && a.get("VendorVersionMajor") >= 3) {
                c3.push("-traditional");
              }
              c3.push("-in");
              c3.push("--TMPFILE--");
              return a.exec(c3, "(RSA |)PRIVATE KEY", [i3.key], function(e6, r4) {
                if (e6) {
                  n("readPkcs12.execBinary - PRIVATE KEY convert - error: ", e6);
                }
                i3.key = r4;
                return t3(e6, i3);
              });
            }
            if (r3.clientKeyPassword) {
              i3.key = readFromString(s3, d, h).pop();
              n("readPkcs12.execBinary - ENCRYPTED PRIVATE KEY - ?: ", i3.key);
            } else {
              i3.key = readFromString(s3, p, l).pop();
              n("readPkcs12.execBinary - RSA PRIVATE KEY - ?: ", i3.key);
            }
          }
          return t3(e5, i3);
        }
        o.deleteTempFiles(i2, function(r4) {
          done(e4 || r4);
        });
      });
    }
    function checkCertificate(e3, r3, t3) {
      var n2;
      var s2 = [];
      if (!t3 && typeof r3 === "function") {
        t3 = r3;
        r3 = void 0;
      }
      e3 = (e3 || "").toString();
      if (e3.match(/BEGIN(\sNEW)? CERTIFICATE REQUEST/)) {
        n2 = ["req", "-text", "-noout", "-verify", "-in", "--TMPFILE--"];
      } else if (e3.match(/BEGIN RSA PRIVATE KEY/) || e3.match(/BEGIN PRIVATE KEY/)) {
        n2 = ["rsa", "-noout", "-check", "-in", "--TMPFILE--"];
      } else {
        n2 = ["x509", "-text", "-noout", "-in", "--TMPFILE--"];
      }
      if (r3) {
        o.createPasswordFile({ cipher: "", password: r3, passType: "in" }, n2, s2);
      }
      a.spawnWrapper(n2, e3, function(e4, r4, i2, c2) {
        function done(e5) {
          i2 = i2 && i2.trim();
          var r5;
          switch (n2[0]) {
            case "rsa":
              r5 = /^Rsa key ok$/i.test(i2);
              break;
            default:
              r5 = /Signature Algorithm/im.test(i2);
              break;
          }
          if (!r5) {
            if (a.get("Vendor") === "OPENSSL" && a.get("VendorVersionMajor") >= 3) {
              if (!(c2 && c2.toString().trim().endsWith("verify OK"))) {
                return t3(new Error(c2.toString()));
              }
            }
            if (e5 && e5.toString().trim() !== "verify OK") {
              return t3(e5);
            }
          }
          t3(null, r5);
        }
        o.deleteTempFiles(s2, function(r5) {
          done(e4 || r5 || c2);
        });
      });
    }
    function checkPkcs12(e3, r3, t3) {
      if (!t3 && typeof r3 === "function") {
        t3 = r3;
        r3 = "";
      }
      var s2 = [];
      var i2 = [];
      var c2 = ["pkcs12", "-info", "-in", e3, "-noout", "-maciter", "-nodes"];
      o.createPasswordFile({ cipher: "", password: r3, passType: "in" }, c2, i2);
      if (Buffer.isBuffer(e3)) {
        s2 = [e3];
        c2[3] = "--TMPFILE--";
      }
      if (a.get("Vendor") === "OPENSSL" && a.get("VendorVersionMajor") >= 3) {
        c2.splice(2, 0, "-legacy");
      }
      a.spawnWrapper(c2, s2, function(e4, r4, s3, a2) {
        n("checkPkcs12 error", { err: e4, code: r4, stdout: s3, stdoutResult: /MAC verified OK/im.test(a2) || !/MAC verified OK/im.test(a2) && !/Mac verify error/im.test(a2), stderr: a2 });
        function done(e5) {
          if (e5) {
            return t3(e5);
          }
          t3(null, /MAC verified OK/im.test(a2) || !/MAC verified OK/im.test(a2) && !/Mac verify error/im.test(a2));
        }
        o.deleteTempFiles(i2, function(t4) {
          n("checkPkcs12 clean-up error", { sslErr: e4, fsErr: t4, code: r4, stdout: s3, stdoutResult: /MAC verified OK/im.test(a2) || !/MAC verified OK/im.test(a2) && !/Mac verify error/im.test(a2), stderr: a2 });
          done(e4 || t4);
        });
      });
    }
    function verifySigningChain(e3, r3, t3) {
      if (!t3 && typeof r3 === "function") {
        t3 = r3;
        r3 = void 0;
      }
      if (!Array.isArray(e3)) {
        e3 = readFromString(e3, g, v);
      }
      if (!Array.isArray(r3) && r3 !== void 0) {
        if (r3 !== "") {
          r3 = [r3];
        }
      }
      var s2 = ["verify"];
      var i2 = [];
      if (r3 !== void 0) {
        s2.push("-CAfile");
        s2.push("--TMPFILE--");
        i2.push(r3.join("\n"));
      }
      var o2 = e3.shift();
      if (e3.length > 0) {
        s2.push("-untrusted");
        s2.push("--TMPFILE--");
        i2.push(e3.join("\n"));
      }
      s2.push("--TMPFILE--");
      i2.push(o2);
      a.spawnWrapper(s2, i2, function(e4, r4, s3, i3) {
        n("Vendor", a.get("Vendor"));
        n("VendorVersionMajor", a.get("VendorVersionMajor"));
        n("openssl.get('VendorVersionMajor') >= 3", a.get("VendorVersionMajor") >= 3);
        if (a.get("Vendor") === "OPENSSL" && a.get("VendorVersionMajor") >= 3) {
          let o3 = !!(s3 && s3.trim().includes(": OK"));
          if (e4) {
            n("verifySigningChain error", { err: e4, code: r4, stdout: s3, stdoutResult: o3, stderr: i3 });
            return t3(e4);
          }
          n("verifySigningChain error - use stderr", { err: e4, code: r4, stdout: s3.trim(), stdoutResult: o3, stderr: i3.trim() });
          return t3(null, o3);
        }
        if (e4) {
          n("verifySigningChain error", { err: e4, code: r4, stdout: s3, stdoutResult: s3 && s3.trim().slice(-4) === ": OK", stderr: i3 });
          return t3(e4);
        }
        n("verifySigningChain", { err: e4, code: r4, stdout: s3, stdoutResult: s3 && s3.trim().slice(-4) === ": OK", stderr: i3 });
        t3(null, s3 && s3.trim().slice(-4) === ": OK");
      });
    }
    function fetchCertificateData(e3, r3) {
      try {
        e3 = (e3 || "").toString();
        var t3, n2, s2, i2;
        var o2 = { issuer: {} };
        var a2 = {};
        var c2;
        var u2, f2;
        if ((t3 = e3.match(/\s*Serial Number:\r?\n?\s*([^\r\n]*)\r?\n\s*\b/)) && t3.length > 1) {
          o2.serial = t3[1];
        }
        if ((n2 = e3.match(/\s*Subject:\r?\n(\s*(([a-zA-Z0-9.]+)\s=\s[^\r\n]+\r?\n))*\s*\b/)) && n2.length > 1) {
          n2 = n2[0];
          s2 = matchAll(n2, /\s([a-zA-Z0-9.]+)\s=\s([^\r\n].*)/g);
          if (s2) {
            for (f2 = 0; f2 < s2.length; f2++) {
              u2 = s2[f2][1].trim();
              if (u2.match("(C|ST|L|O|OU|CN|emailAddress|DC)") || u2 === "") {
                continue;
              }
              o2[u2] = s2[f2][2].trim();
            }
          }
          s2 = n2.match(/\sC\s=\s([^\r\n].*?)[\r\n]/);
          o2.country = s2 && s2[1] || "";
          s2 = n2.match(/\sST\s=\s([^\r\n].*?)[\r\n]/);
          o2.state = s2 && s2[1] || "";
          s2 = n2.match(/\sL\s=\s([^\r\n].*?)[\r\n]/);
          o2.locality = s2 && s2[1] || "";
          s2 = matchAll(n2, /\sO\s=\s([^\r\n].*)/g);
          o2.organization = s2 ? s2.length > 1 ? s2.sort(function(e4, r4) {
            var t4 = e4[1].toUpperCase();
            var n3 = r4[1].toUpperCase();
            return n3 > t4 ? -1 : t4 > n3 ? 1 : 0;
          }).sort(function(e4, r4) {
            return e4[1].length - r4[1].length;
          }).map(function(e4) {
            return e4[1];
          }) : s2[0][1] : "";
          s2 = matchAll(n2, /\sOU\s=\s([^\r\n].*)/g);
          o2.organizationUnit = s2 ? s2.length > 1 ? s2.sort(function(e4, r4) {
            var t4 = e4[1].toUpperCase();
            var n3 = r4[1].toUpperCase();
            return n3 > t4 ? -1 : t4 > n3 ? 1 : 0;
          }).sort(function(e4, r4) {
            return e4[1].length - r4[1].length;
          }).map(function(e4) {
            return e4[1];
          }) : s2[0][1] : "";
          s2 = matchAll(n2, /\sCN\s=\s([^\r\n].*)/g);
          o2.commonName = s2 ? s2.length > 1 ? s2.sort(function(e4, r4) {
            var t4 = e4[1].toUpperCase();
            var n3 = r4[1].toUpperCase();
            return n3 > t4 ? -1 : t4 > n3 ? 1 : 0;
          }).sort(function(e4, r4) {
            return e4[1].length - r4[1].length;
          }).map(function(e4) {
            return e4[1];
          }) : s2[0][1] : "";
          s2 = matchAll(n2, /emailAddress\s=\s([^\r\n].*)/g);
          o2.emailAddress = s2 ? s2.length > 1 ? s2.sort(function(e4, r4) {
            var t4 = e4[1].toUpperCase();
            var n3 = r4[1].toUpperCase();
            return n3 > t4 ? -1 : t4 > n3 ? 1 : 0;
          }).sort(function(e4, r4) {
            return e4[1].length - r4[1].length;
          }).map(function(e4) {
            return e4[1];
          }) : s2[0][1] : "";
          s2 = matchAll(n2, /\sDC\s=\s([^\r\n].*)/g);
          o2.dc = s2 ? s2.length > 1 ? s2.sort(function(e4, r4) {
            var t4 = e4[1].toUpperCase();
            var n3 = r4[1].toUpperCase();
            return n3 > t4 ? -1 : t4 > n3 ? 1 : 0;
          }).sort(function(e4, r4) {
            return e4[1].length - r4[1].length;
          }).map(function(e4) {
            return e4[1];
          }) : s2[0][1] : "";
        }
        if ((i2 = e3.match(/\s*Issuer:\r?\n(\s*([a-zA-Z0-9.]+)\s=\s[^\r\n].*\r?\n)*\s*\b/)) && i2.length > 1) {
          i2 = i2[0];
          s2 = matchAll(i2, /\s([a-zA-Z0-9.]+)\s=\s([^\r\n].*)/g);
          for (f2 = 0; f2 < s2.length; f2++) {
            u2 = s2[f2][1].toString();
            if (u2.match("(C|ST|L|O|OU|CN|emailAddress|DC)")) {
              continue;
            }
            o2.issuer[u2] = s2[f2][2].toString();
          }
          s2 = i2.match(/\sC\s=\s([^\r\n].*?)[\r\n]/);
          o2.issuer.country = s2 && s2[1] || "";
          s2 = i2.match(/\sST\s=\s([^\r\n].*?)[\r\n]/);
          o2.issuer.state = s2 && s2[1] || "";
          s2 = i2.match(/\sL\s=\s([^\r\n].*?)[\r\n]/);
          o2.issuer.locality = s2 && s2[1] || "";
          s2 = matchAll(i2, /\sO\s=\s([^\r\n].*)/g);
          o2.issuer.organization = s2 ? s2.length > 1 ? s2.sort(function(e4, r4) {
            var t4 = e4[1].toUpperCase();
            var n3 = r4[1].toUpperCase();
            return n3 > t4 ? -1 : t4 > n3 ? 1 : 0;
          }).sort(function(e4, r4) {
            return e4[1].length - r4[1].length;
          }).map(function(e4) {
            return e4[1];
          }) : s2[0][1] : "";
          s2 = matchAll(i2, /\sOU\s=\s([^\r\n].*)/g);
          o2.issuer.organizationUnit = s2 ? s2.length > 1 ? s2.sort(function(e4, r4) {
            var t4 = e4[1].toUpperCase();
            var n3 = r4[1].toUpperCase();
            return n3 > t4 ? -1 : t4 > n3 ? 1 : 0;
          }).sort(function(e4, r4) {
            return e4[1].length - r4[1].length;
          }).map(function(e4) {
            return e4[1];
          }) : s2[0][1] : "";
          s2 = matchAll(i2, /\sCN\s=\s([^\r\n].*)/g);
          o2.issuer.commonName = s2 ? s2.length > 1 ? s2.sort(function(e4, r4) {
            var t4 = e4[1].toUpperCase();
            var n3 = r4[1].toUpperCase();
            return n3 > t4 ? -1 : t4 > n3 ? 1 : 0;
          }).sort(function(e4, r4) {
            return e4[1].length - r4[1].length;
          }).map(function(e4) {
            return e4[1];
          }) : s2[0][1] : "";
          s2 = matchAll(i2, /\sDC\s=\s([^\r\n].*)/g);
          o2.issuer.dc = s2 ? s2.length > 1 ? s2.sort(function(e4, r4) {
            var t4 = e4[1].toUpperCase();
            var n3 = r4[1].toUpperCase();
            return n3 > t4 ? -1 : t4 > n3 ? 1 : 0;
          }).sort(function(e4, r4) {
            return e4[1].length - r4[1].length;
          }).map(function(e4) {
            return e4[1];
          }) : s2[0][1] : "";
        }
        if ((c2 = e3.match(/X509v3 Subject Alternative Name: \r?\n([^\r\n]*)\r?\n/)) && c2.length > 1) {
          c2 = c2[1].trim() + "\n";
          o2.san = {};
          s2 = pregMatchAll("DNS:([^,\\r\\n].*?)[,\\r\\n\\s]", c2);
          o2.san.dns = s2 || "";
          s2 = pregMatchAll("IP Address:([^,\\r\\n].*?)[,\\r\\n\\s]", c2);
          o2.san.ip = s2 || "";
          s2 = pregMatchAll("email:([^,\\r\\n].*?)[,\\r\\n\\s]", c2);
          o2.san.email = s2 || "";
        }
        if ((s2 = e3.match(/Not Before\s?:\s?([^\r\n]*)\r?\n/)) && s2.length > 1) {
          a2.start = Date.parse(s2 && s2[1] || "");
        }
        if ((s2 = e3.match(/Not After\s?:\s?([^\r\n]*)\r?\n/)) && s2.length > 1) {
          a2.end = Date.parse(s2 && s2[1] || "");
        }
        if (a2.start && a2.end) {
          o2.validity = a2;
        }
        if ((s2 = e3.match(/Signature Algorithm: ([^\r\n]*)\r?\n/)) && s2.length > 1) {
          o2.signatureAlgorithm = s2 && s2[1] || "";
        }
        if ((s2 = e3.match(/Public[ -]Key: ([^\r\n]*)\r?\n/)) && s2.length > 1) {
          o2.publicKeySize = (s2 && s2[1] || "").replace(/[()]/g, "");
        }
        if ((s2 = e3.match(/Public Key Algorithm: ([^\r\n]*)\r?\n/)) && s2.length > 1) {
          o2.publicKeyAlgorithm = s2 && s2[1] || "";
        }
        r3(null, o2);
      } catch (e4) {
        r3(e4);
      }
    }
    function matchAll(e3, r3) {
      var t3 = [];
      e3.replace(r3, function() {
        var e4 = [].slice.call(arguments, 0);
        var r4 = e4.splice(-2);
        e4.index = r4[0];
        e4.input = r4[1];
        t3.push(e4);
      });
      return t3.length ? t3 : null;
    }
    function pregMatchAll(e3, r3) {
      var t3 = new RegExp(e3, "g");
      var n2 = r3.match(t3) || [];
      var s2 = [];
      var i2, o2;
      for (var a2 = 0; a2 < n2.length; a2++) {
        i2 = new RegExp(e3);
        o2 = n2[a2].match(i2);
        s2.push(o2[1]);
      }
      return s2;
    }
    function generateCSRSubject(e3) {
      e3 = e3 || {};
      var r3 = { C: e3.country || e3.C, ST: e3.state || e3.ST, L: e3.locality || e3.L, O: e3.organization || e3.O, OU: e3.organizationUnit || e3.OU, CN: e3.commonName || e3.CN || "localhost", DC: e3.dc || e3.DC || "", emailAddress: e3.emailAddress };
      var t3 = Object.keys(r3).map(function(e4) {
        if (r3[e4]) {
          if (typeof r3[e4] === "object" && r3[e4].length >= 1) {
            var t4 = "";
            r3[e4].map(function(r4) {
              t4 += "/" + e4 + "=" + r4.replace(/[^\w\s-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]+/g, " ").replace("/", "\\/").replace("+", "\\+").trim();
            });
            return t4;
          } else {
            return "/" + e4 + "=" + r3[e4].replace(/[^\w\s-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]+/g, " ").replace("/", "\\/").replace("+", "\\+").trim();
          }
        }
      });
      return t3.join("");
    }
    function readFromString(e3, r3, t3) {
      if (Buffer.isBuffer(e3)) {
        e3 = e3.toString("utf8");
      }
      var n2 = [];
      if (!e3) {
        return n2;
      }
      var s2 = e3.indexOf(r3);
      while (s2 !== -1) {
        e3 = e3.substring(s2);
        var i2 = e3.indexOf(t3);
        if (i2 === -1) {
          break;
        }
        i2 += t3.length;
        n2.push(e3.substring(0, i2));
        s2 = e3.indexOf(r3, i2);
      }
      return n2;
    }
    e2.exports.promisified = { createPrivateKey: s(createPrivateKey), createDhparam: s(createDhparam), createEcparam: s(createEcparam), createCSR: s(createCSR), createCertificate: s(createCertificate), readCertificateInfo: s(readCertificateInfo), getPublicKey: s(getPublicKey), getFingerprint: s(getFingerprint), getModulus: s(getModulus), getDhparamInfo: s(getDhparamInfo), createPkcs12: s(createPkcs12), readPkcs12: s(readPkcs12), verifySigningChain: s(verifySigningChain), checkCertificate: s(checkCertificate), checkPkcs12: s(checkPkcs12) };
  } };
  var r = {};
  function __nccwpck_require__(t2) {
    var n = r[t2];
    if (n !== void 0) {
      return n.exports;
    }
    var s = r[t2] = { exports: {} };
    var i = true;
    try {
      e[t2](s, s.exports, __nccwpck_require__);
      i = false;
    } finally {
      if (i)
        delete r[t2];
    }
    return s.exports;
  }
  if (typeof __nccwpck_require__ !== "undefined")
    __nccwpck_require__.ab = __dirname + "/";
  var t = __nccwpck_require__(214);
  dist.exports = t;
})();
var distExports = dist.exports;
const index = /* @__PURE__ */ getDefaultExportFromCjs(distExports);
const index$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [distExports]);
export {
  index$1 as i
};
