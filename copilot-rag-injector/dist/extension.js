"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __glob = (map) => (path5) => {
  var fn = map[path5];
  if (fn) return fn();
  throw new Error("Module not found in bundle: " + path5);
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/web-tree-sitter/tree-sitter.js
var require_tree_sitter = __commonJS({
  "node_modules/web-tree-sitter/tree-sitter.js"(exports, module) {
    var Module = void 0 !== Module ? Module : {};
    var TreeSitter = (function() {
      var initPromise, document = "object" == typeof window ? { currentScript: window.document.currentScript } : null;
      class Parser {
        constructor() {
          this.initialize();
        }
        initialize() {
          throw new Error("cannot construct a Parser before calling `init()`");
        }
        static init(moduleOptions) {
          return initPromise || (Module = Object.assign({}, Module, moduleOptions), initPromise = new Promise(((resolveInitPromise) => {
            var moduleOverrides = Object.assign({}, Module), arguments_ = [], thisProgram = "./this.program", quit_ = (e, t) => {
              throw t;
            }, ENVIRONMENT_IS_WEB = "object" == typeof window, ENVIRONMENT_IS_WORKER = "function" == typeof importScripts, ENVIRONMENT_IS_NODE = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, scriptDirectory = "", read_, readAsync, readBinary;
            function locateFile(e) {
              return Module.locateFile ? Module.locateFile(e, scriptDirectory) : scriptDirectory + e;
            }
            if (ENVIRONMENT_IS_NODE) {
              var fs = require("fs"), nodePath = require("path");
              scriptDirectory = ENVIRONMENT_IS_WORKER ? nodePath.dirname(scriptDirectory) + "/" : __dirname + "/", read_ = (e, t) => (e = isFileURI(e) ? new URL(e) : nodePath.normalize(e), fs.readFileSync(e, t ? void 0 : "utf8")), readBinary = (e) => {
                var t = read_(e, true);
                return t.buffer || (t = new Uint8Array(t)), t;
              }, readAsync = (e, t, _, s = true) => {
                e = isFileURI(e) ? new URL(e) : nodePath.normalize(e), fs.readFile(e, s ? void 0 : "utf8", ((e2, r) => {
                  e2 ? _(e2) : t(s ? r.buffer : r);
                }));
              }, !Module.thisProgram && process.argv.length > 1 && (thisProgram = process.argv[1].replace(/\\/g, "/")), arguments_ = process.argv.slice(2), "undefined" != typeof module && (module.exports = Module), quit_ = (e, t) => {
                throw process.exitCode = e, t;
              };
            } else (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && (ENVIRONMENT_IS_WORKER ? scriptDirectory = self.location.href : void 0 !== document && document.currentScript && (scriptDirectory = document.currentScript.src), scriptDirectory = scriptDirectory.startsWith("blob:") ? "" : scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1), read_ = (e) => {
              var t = new XMLHttpRequest();
              return t.open("GET", e, false), t.send(null), t.responseText;
            }, ENVIRONMENT_IS_WORKER && (readBinary = (e) => {
              var t = new XMLHttpRequest();
              return t.open("GET", e, false), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
            }), readAsync = (e, t, _) => {
              var s = new XMLHttpRequest();
              s.open("GET", e, true), s.responseType = "arraybuffer", s.onload = () => {
                200 == s.status || 0 == s.status && s.response ? t(s.response) : _();
              }, s.onerror = _, s.send(null);
            });
            var out = Module.print || console.log.bind(console), err = Module.printErr || console.error.bind(console);
            Object.assign(Module, moduleOverrides), moduleOverrides = null, Module.arguments && (arguments_ = Module.arguments), Module.thisProgram && (thisProgram = Module.thisProgram), Module.quit && (quit_ = Module.quit);
            var dynamicLibraries = Module.dynamicLibraries || [], wasmBinary, wasmMemory;
            Module.wasmBinary && (wasmBinary = Module.wasmBinary), "object" != typeof WebAssembly && abort("no native wasm support detected");
            var ABORT = false, EXITSTATUS, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
            function updateMemoryViews() {
              var e = wasmMemory.buffer;
              Module.HEAP8 = HEAP8 = new Int8Array(e), Module.HEAP16 = HEAP16 = new Int16Array(e), Module.HEAPU8 = HEAPU8 = new Uint8Array(e), Module.HEAPU16 = HEAPU16 = new Uint16Array(e), Module.HEAP32 = HEAP32 = new Int32Array(e), Module.HEAPU32 = HEAPU32 = new Uint32Array(e), Module.HEAPF32 = HEAPF32 = new Float32Array(e), Module.HEAPF64 = HEAPF64 = new Float64Array(e);
            }
            var INITIAL_MEMORY = Module.INITIAL_MEMORY || 33554432;
            wasmMemory = Module.wasmMemory ? Module.wasmMemory : new WebAssembly.Memory({ initial: INITIAL_MEMORY / 65536, maximum: 32768 }), updateMemoryViews(), INITIAL_MEMORY = wasmMemory.buffer.byteLength;
            var __ATPRERUN__ = [], __ATINIT__ = [], __ATMAIN__ = [], __ATPOSTRUN__ = [], __RELOC_FUNCS__ = [], runtimeInitialized = false;
            function preRun() {
              if (Module.preRun) for ("function" == typeof Module.preRun && (Module.preRun = [Module.preRun]); Module.preRun.length; ) addOnPreRun(Module.preRun.shift());
              callRuntimeCallbacks(__ATPRERUN__);
            }
            function initRuntime() {
              runtimeInitialized = true, callRuntimeCallbacks(__RELOC_FUNCS__), callRuntimeCallbacks(__ATINIT__);
            }
            function preMain() {
              callRuntimeCallbacks(__ATMAIN__);
            }
            function postRun() {
              if (Module.postRun) for ("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]); Module.postRun.length; ) addOnPostRun(Module.postRun.shift());
              callRuntimeCallbacks(__ATPOSTRUN__);
            }
            function addOnPreRun(e) {
              __ATPRERUN__.unshift(e);
            }
            function addOnInit(e) {
              __ATINIT__.unshift(e);
            }
            function addOnPostRun(e) {
              __ATPOSTRUN__.unshift(e);
            }
            var runDependencies = 0, runDependencyWatcher = null, dependenciesFulfilled = null;
            function getUniqueRunDependency(e) {
              return e;
            }
            function addRunDependency(e) {
              runDependencies++, Module.monitorRunDependencies?.(runDependencies);
            }
            function removeRunDependency(e) {
              if (runDependencies--, Module.monitorRunDependencies?.(runDependencies), 0 == runDependencies && (null !== runDependencyWatcher && (clearInterval(runDependencyWatcher), runDependencyWatcher = null), dependenciesFulfilled)) {
                var t = dependenciesFulfilled;
                dependenciesFulfilled = null, t();
              }
            }
            function abort(e) {
              throw Module.onAbort?.(e), err(e = "Aborted(" + e + ")"), ABORT = true, EXITSTATUS = 1, e += ". Build with -sASSERTIONS for more info.", new WebAssembly.RuntimeError(e);
            }
            var dataURIPrefix = "data:application/octet-stream;base64,", isDataURI = (e) => e.startsWith(dataURIPrefix), isFileURI = (e) => e.startsWith("file://"), wasmBinaryFile;
            function getBinarySync(e) {
              if (e == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
              if (readBinary) return readBinary(e);
              throw "both async and sync fetching of the wasm failed";
            }
            function getBinaryPromise(e) {
              if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
                if ("function" == typeof fetch && !isFileURI(e)) return fetch(e, { credentials: "same-origin" }).then(((t) => {
                  if (!t.ok) throw `failed to load wasm binary file at '${e}'`;
                  return t.arrayBuffer();
                })).catch((() => getBinarySync(e)));
                if (readAsync) return new Promise(((t, _) => {
                  readAsync(e, ((e2) => t(new Uint8Array(e2))), _);
                }));
              }
              return Promise.resolve().then((() => getBinarySync(e)));
            }
            function instantiateArrayBuffer(e, t, _) {
              return getBinaryPromise(e).then(((e2) => WebAssembly.instantiate(e2, t))).then(_, ((e2) => {
                err(`failed to asynchronously prepare wasm: ${e2}`), abort(e2);
              }));
            }
            function instantiateAsync(e, t, _, s) {
              return e || "function" != typeof WebAssembly.instantiateStreaming || isDataURI(t) || isFileURI(t) || ENVIRONMENT_IS_NODE || "function" != typeof fetch ? instantiateArrayBuffer(t, _, s) : fetch(t, { credentials: "same-origin" }).then(((e2) => WebAssembly.instantiateStreaming(e2, _).then(s, (function(e3) {
                return err(`wasm streaming compile failed: ${e3}`), err("falling back to ArrayBuffer instantiation"), instantiateArrayBuffer(t, _, s);
              }))));
            }
            function createWasm() {
              var e = { env: wasmImports, wasi_snapshot_preview1: wasmImports, "GOT.mem": new Proxy(wasmImports, GOTHandler), "GOT.func": new Proxy(wasmImports, GOTHandler) };
              function t(e2, t2) {
                wasmExports = e2.exports, wasmExports = relocateExports(wasmExports, 1024);
                var _ = getDylinkMetadata(t2);
                return _.neededDynlibs && (dynamicLibraries = _.neededDynlibs.concat(dynamicLibraries)), mergeLibSymbols(wasmExports, "main"), LDSO.init(), loadDylibs(), addOnInit(wasmExports.__wasm_call_ctors), __RELOC_FUNCS__.push(wasmExports.__wasm_apply_data_relocs), removeRunDependency("wasm-instantiate"), wasmExports;
              }
              if (addRunDependency("wasm-instantiate"), Module.instantiateWasm) try {
                return Module.instantiateWasm(e, t);
              } catch (e2) {
                return err(`Module.instantiateWasm callback failed with error: ${e2}`), false;
              }
              return instantiateAsync(wasmBinary, wasmBinaryFile, e, (function(e2) {
                t(e2.instance, e2.module);
              })), {};
            }
            wasmBinaryFile = "tree-sitter.wasm", isDataURI(wasmBinaryFile) || (wasmBinaryFile = locateFile(wasmBinaryFile));
            var ASM_CONSTS = {};
            function ExitStatus(e) {
              this.name = "ExitStatus", this.message = `Program terminated with exit(${e})`, this.status = e;
            }
            var GOT = {}, currentModuleWeakSymbols = /* @__PURE__ */ new Set([]), GOTHandler = { get(e, t) {
              var _ = GOT[t];
              return _ || (_ = GOT[t] = new WebAssembly.Global({ value: "i32", mutable: true })), currentModuleWeakSymbols.has(t) || (_.required = true), _;
            } }, callRuntimeCallbacks = (e) => {
              for (; e.length > 0; ) e.shift()(Module);
            }, UTF8Decoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, UTF8ArrayToString = (e, t, _) => {
              for (var s = t + _, r = t; e[r] && !(r >= s); ) ++r;
              if (r - t > 16 && e.buffer && UTF8Decoder) return UTF8Decoder.decode(e.subarray(t, r));
              for (var a = ""; t < r; ) {
                var o = e[t++];
                if (128 & o) {
                  var n = 63 & e[t++];
                  if (192 != (224 & o)) {
                    var l = 63 & e[t++];
                    if ((o = 224 == (240 & o) ? (15 & o) << 12 | n << 6 | l : (7 & o) << 18 | n << 12 | l << 6 | 63 & e[t++]) < 65536) a += String.fromCharCode(o);
                    else {
                      var d = o - 65536;
                      a += String.fromCharCode(55296 | d >> 10, 56320 | 1023 & d);
                    }
                  } else a += String.fromCharCode((31 & o) << 6 | n);
                } else a += String.fromCharCode(o);
              }
              return a;
            }, getDylinkMetadata = (e) => {
              var t = 0, _ = 0;
              function s() {
                for (var _2 = 0, s2 = 1; ; ) {
                  var r2 = e[t++];
                  if (_2 += (127 & r2) * s2, s2 *= 128, !(128 & r2)) break;
                }
                return _2;
              }
              function r() {
                var _2 = s();
                return UTF8ArrayToString(e, (t += _2) - _2, _2);
              }
              function a(e2, t2) {
                if (e2) throw new Error(t2);
              }
              var o = "dylink.0";
              if (e instanceof WebAssembly.Module) {
                var n = WebAssembly.Module.customSections(e, o);
                0 === n.length && (o = "dylink", n = WebAssembly.Module.customSections(e, o)), a(0 === n.length, "need dylink section"), _ = (e = new Uint8Array(n[0])).length;
              } else {
                a(!(1836278016 == new Uint32Array(new Uint8Array(e.subarray(0, 24)).buffer)[0]), "need to see wasm magic number"), a(0 !== e[8], "need the dylink section to be first"), t = 9;
                var l = s();
                _ = t + l, o = r();
              }
              var d = { neededDynlibs: [], tlsExports: /* @__PURE__ */ new Set(), weakImports: /* @__PURE__ */ new Set() };
              if ("dylink" == o) {
                d.memorySize = s(), d.memoryAlign = s(), d.tableSize = s(), d.tableAlign = s();
                for (var u = s(), m = 0; m < u; ++m) {
                  var c = r();
                  d.neededDynlibs.push(c);
                }
              } else {
                a("dylink.0" !== o);
                for (; t < _; ) {
                  var w = e[t++], p = s();
                  if (1 === w) d.memorySize = s(), d.memoryAlign = s(), d.tableSize = s(), d.tableAlign = s();
                  else if (2 === w) for (u = s(), m = 0; m < u; ++m) c = r(), d.neededDynlibs.push(c);
                  else if (3 === w) for (var h = s(); h--; ) {
                    var g2 = r();
                    256 & s() && d.tlsExports.add(g2);
                  }
                  else if (4 === w) for (h = s(); h--; ) {
                    r(), g2 = r();
                    1 == (3 & s()) && d.weakImports.add(g2);
                  }
                  else t += p;
                }
              }
              return d;
            };
            function getValue(e, t = "i8") {
              switch (t.endsWith("*") && (t = "*"), t) {
                case "i1":
                case "i8":
                  return HEAP8[e];
                case "i16":
                  return HEAP16[e >> 1];
                case "i32":
                  return HEAP32[e >> 2];
                case "i64":
                  abort("to do getValue(i64) use WASM_BIGINT");
                case "float":
                  return HEAPF32[e >> 2];
                case "double":
                  return HEAPF64[e >> 3];
                case "*":
                  return HEAPU32[e >> 2];
                default:
                  abort(`invalid type for getValue: ${t}`);
              }
            }
            var newDSO = (e, t, _) => {
              var s = { refcount: 1 / 0, name: e, exports: _, global: true };
              return LDSO.loadedLibsByName[e] = s, null != t && (LDSO.loadedLibsByHandle[t] = s), s;
            }, LDSO = { loadedLibsByName: {}, loadedLibsByHandle: {}, init() {
              newDSO("__main__", 0, wasmImports);
            } }, ___heap_base = 78096, zeroMemory = (e, t) => (HEAPU8.fill(0, e, e + t), e), alignMemory = (e, t) => Math.ceil(e / t) * t, getMemory = (e) => {
              if (runtimeInitialized) return zeroMemory(_malloc(e), e);
              var t = ___heap_base, _ = t + alignMemory(e, 16);
              return ___heap_base = _, GOT.__heap_base.value = _, t;
            }, isInternalSym = (e) => ["__cpp_exception", "__c_longjmp", "__wasm_apply_data_relocs", "__dso_handle", "__tls_size", "__tls_align", "__set_stack_limits", "_emscripten_tls_init", "__wasm_init_tls", "__wasm_call_ctors", "__start_em_asm", "__stop_em_asm", "__start_em_js", "__stop_em_js"].includes(e) || e.startsWith("__em_js__"), uleb128Encode = (e, t) => {
              e < 128 ? t.push(e) : t.push(e % 128 | 128, e >> 7);
            }, sigToWasmTypes = (e) => {
              for (var t = { i: "i32", j: "i64", f: "f32", d: "f64", e: "externref", p: "i32" }, _ = { parameters: [], results: "v" == e[0] ? [] : [t[e[0]]] }, s = 1; s < e.length; ++s) _.parameters.push(t[e[s]]);
              return _;
            }, generateFuncType = (e, t) => {
              var _ = e.slice(0, 1), s = e.slice(1), r = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 };
              t.push(96), uleb128Encode(s.length, t);
              for (var a = 0; a < s.length; ++a) t.push(r[s[a]]);
              "v" == _ ? t.push(0) : t.push(1, r[_]);
            }, convertJsFunctionToWasm = (e, t) => {
              if ("function" == typeof WebAssembly.Function) return new WebAssembly.Function(sigToWasmTypes(t), e);
              var _ = [1];
              generateFuncType(t, _);
              var s = [0, 97, 115, 109, 1, 0, 0, 0, 1];
              uleb128Encode(_.length, s), s.push(..._), s.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
              var r = new WebAssembly.Module(new Uint8Array(s));
              return new WebAssembly.Instance(r, { e: { f: e } }).exports.f;
            }, wasmTableMirror = [], wasmTable = new WebAssembly.Table({ initial: 27, element: "anyfunc" }), getWasmTableEntry = (e) => {
              var t = wasmTableMirror[e];
              return t || (e >= wasmTableMirror.length && (wasmTableMirror.length = e + 1), wasmTableMirror[e] = t = wasmTable.get(e)), t;
            }, updateTableMap = (e, t) => {
              if (functionsInTableMap) for (var _ = e; _ < e + t; _++) {
                var s = getWasmTableEntry(_);
                s && functionsInTableMap.set(s, _);
              }
            }, functionsInTableMap, getFunctionAddress = (e) => (functionsInTableMap || (functionsInTableMap = /* @__PURE__ */ new WeakMap(), updateTableMap(0, wasmTable.length)), functionsInTableMap.get(e) || 0), freeTableIndexes = [], getEmptyTableSlot = () => {
              if (freeTableIndexes.length) return freeTableIndexes.pop();
              try {
                wasmTable.grow(1);
              } catch (e) {
                if (!(e instanceof RangeError)) throw e;
                throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
              }
              return wasmTable.length - 1;
            }, setWasmTableEntry = (e, t) => {
              wasmTable.set(e, t), wasmTableMirror[e] = wasmTable.get(e);
            }, addFunction = (e, t) => {
              var _ = getFunctionAddress(e);
              if (_) return _;
              var s = getEmptyTableSlot();
              try {
                setWasmTableEntry(s, e);
              } catch (_2) {
                if (!(_2 instanceof TypeError)) throw _2;
                var r = convertJsFunctionToWasm(e, t);
                setWasmTableEntry(s, r);
              }
              return functionsInTableMap.set(e, s), s;
            }, updateGOT = (e, t) => {
              for (var _ in e) if (!isInternalSym(_)) {
                var s = e[_];
                _.startsWith("orig$") && (_ = _.split("$")[1], t = true), GOT[_] ||= new WebAssembly.Global({ value: "i32", mutable: true }), (t || 0 == GOT[_].value) && ("function" == typeof s ? GOT[_].value = addFunction(s) : "number" == typeof s ? GOT[_].value = s : err(`unhandled export type for '${_}': ${typeof s}`));
              }
            }, relocateExports = (e, t, _) => {
              var s = {};
              for (var r in e) {
                var a = e[r];
                "object" == typeof a && (a = a.value), "number" == typeof a && (a += t), s[r] = a;
              }
              return updateGOT(s, _), s;
            }, isSymbolDefined = (e) => {
              var t = wasmImports[e];
              return !(!t || t.stub);
            }, dynCallLegacy = (e, t, _) => (0, Module["dynCall_" + e])(t, ..._), dynCall = (e, t, _ = []) => e.includes("j") ? dynCallLegacy(e, t, _) : getWasmTableEntry(t)(..._), createInvokeFunction = (e) => function() {
              var t = stackSave();
              try {
                return dynCall(e, arguments[0], Array.prototype.slice.call(arguments, 1));
              } catch (e2) {
                if (stackRestore(t), e2 !== e2 + 0) throw e2;
                _setThrew(1, 0);
              }
            }, resolveGlobalSymbol = (e, t = false) => {
              var _;
              return t && "orig$" + e in wasmImports && (e = "orig$" + e), isSymbolDefined(e) ? _ = wasmImports[e] : e.startsWith("invoke_") && (_ = wasmImports[e] = createInvokeFunction(e.split("_")[1])), { sym: _, name: e };
            }, UTF8ToString = (e, t) => e ? UTF8ArrayToString(HEAPU8, e, t) : "", loadWebAssemblyModule = (binary, flags, libName, localScope, handle) => {
              var metadata = getDylinkMetadata(binary);
              function loadModule() {
                var firstLoad = !handle || !HEAP8[handle + 8];
                if (firstLoad) {
                  var memAlign = Math.pow(2, metadata.memoryAlign), memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0, tableBase = metadata.tableSize ? wasmTable.length : 0;
                  handle && (HEAP8[handle + 8] = 1, HEAPU32[handle + 12 >> 2] = memoryBase, HEAP32[handle + 16 >> 2] = metadata.memorySize, HEAPU32[handle + 20 >> 2] = tableBase, HEAP32[handle + 24 >> 2] = metadata.tableSize);
                } else memoryBase = HEAPU32[handle + 12 >> 2], tableBase = HEAPU32[handle + 20 >> 2];
                var tableGrowthNeeded = tableBase + metadata.tableSize - wasmTable.length, moduleExports;
                function resolveSymbol(e) {
                  var t = resolveGlobalSymbol(e).sym;
                  return !t && localScope && (t = localScope[e]), t || (t = moduleExports[e]), t;
                }
                tableGrowthNeeded > 0 && wasmTable.grow(tableGrowthNeeded);
                var proxyHandler = { get(e, t) {
                  switch (t) {
                    case "__memory_base":
                      return memoryBase;
                    case "__table_base":
                      return tableBase;
                  }
                  if (t in wasmImports && !wasmImports[t].stub) return wasmImports[t];
                  var _;
                  t in e || (e[t] = (...e2) => (_ ||= resolveSymbol(t), _(...e2)));
                  return e[t];
                } }, proxy = new Proxy({}, proxyHandler), info = { "GOT.mem": new Proxy({}, GOTHandler), "GOT.func": new Proxy({}, GOTHandler), env: proxy, wasi_snapshot_preview1: proxy };
                function postInstantiation(module, instance) {
                  function addEmAsm(addr, body) {
                    for (var args = [], arity = 0; arity < 16 && -1 != body.indexOf("$" + arity); arity++) args.push("$" + arity);
                    args = args.join(",");
                    var func = `(${args}) => { ${body} };`;
                    ASM_CONSTS[start] = eval(func);
                  }
                  if (updateTableMap(tableBase, metadata.tableSize), moduleExports = relocateExports(instance.exports, memoryBase), flags.allowUndefined || reportUndefinedSymbols(), "__start_em_asm" in moduleExports) for (var start = moduleExports.__start_em_asm, stop = moduleExports.__stop_em_asm; start < stop; ) {
                    var jsString = UTF8ToString(start);
                    addEmAsm(start, jsString), start = HEAPU8.indexOf(0, start) + 1;
                  }
                  function addEmJs(name, cSig, body) {
                    var jsArgs = [];
                    if (cSig = cSig.slice(1, -1), "void" != cSig) for (var i in cSig = cSig.split(","), cSig) {
                      var jsArg = cSig[i].split(" ").pop();
                      jsArgs.push(jsArg.replace("*", ""));
                    }
                    var func = `(${jsArgs}) => ${body};`;
                    moduleExports[name] = eval(func);
                  }
                  for (var name in moduleExports) if (name.startsWith("__em_js__")) {
                    var start = moduleExports[name], jsString = UTF8ToString(start), parts = jsString.split("<::>");
                    addEmJs(name.replace("__em_js__", ""), parts[0], parts[1]), delete moduleExports[name];
                  }
                  var applyRelocs = moduleExports.__wasm_apply_data_relocs;
                  applyRelocs && (runtimeInitialized ? applyRelocs() : __RELOC_FUNCS__.push(applyRelocs));
                  var init = moduleExports.__wasm_call_ctors;
                  return init && (runtimeInitialized ? init() : __ATINIT__.push(init)), moduleExports;
                }
                if (flags.loadAsync) {
                  if (binary instanceof WebAssembly.Module) {
                    var instance = new WebAssembly.Instance(binary, info);
                    return Promise.resolve(postInstantiation(binary, instance));
                  }
                  return WebAssembly.instantiate(binary, info).then(((e) => postInstantiation(e.module, e.instance)));
                }
                var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary), instance = new WebAssembly.Instance(module, info);
                return postInstantiation(module, instance);
              }
              return currentModuleWeakSymbols = metadata.weakImports, flags.loadAsync ? metadata.neededDynlibs.reduce(((e, t) => e.then((() => loadDynamicLibrary(t, flags)))), Promise.resolve()).then(loadModule) : (metadata.neededDynlibs.forEach(((e) => loadDynamicLibrary(e, flags, localScope))), loadModule());
            }, mergeLibSymbols = (e, t) => {
              for (var [_, s] of Object.entries(e)) {
                const e2 = (e3) => {
                  isSymbolDefined(e3) || (wasmImports[e3] = s);
                };
                e2(_);
                const t2 = "__main_argc_argv";
                "main" == _ && e2(t2), _ == t2 && e2("main"), _.startsWith("dynCall_") && !Module.hasOwnProperty(_) && (Module[_] = s);
              }
            }, asyncLoad = (e, t, _, s) => {
              var r = s ? "" : getUniqueRunDependency(`al ${e}`);
              readAsync(e, ((e2) => {
                t(new Uint8Array(e2)), r && removeRunDependency(r);
              }), ((t2) => {
                if (!_) throw `Loading data file "${e}" failed.`;
                _();
              })), r && addRunDependency(r);
            };
            function loadDynamicLibrary(e, t = { global: true, nodelete: true }, _, s) {
              var r = LDSO.loadedLibsByName[e];
              if (r) return t.global ? r.global || (r.global = true, mergeLibSymbols(r.exports, e)) : _ && Object.assign(_, r.exports), t.nodelete && r.refcount !== 1 / 0 && (r.refcount = 1 / 0), r.refcount++, s && (LDSO.loadedLibsByHandle[s] = r), !t.loadAsync || Promise.resolve(true);
              function a() {
                if (s) {
                  var _2 = HEAPU32[s + 28 >> 2], r2 = HEAPU32[s + 32 >> 2];
                  if (_2 && r2) {
                    var a2 = HEAP8.slice(_2, _2 + r2);
                    return t.loadAsync ? Promise.resolve(a2) : a2;
                  }
                }
                var o2 = locateFile(e);
                if (t.loadAsync) return new Promise((function(e2, t2) {
                  asyncLoad(o2, e2, t2);
                }));
                if (!readBinary) throw new Error(`${o2}: file not found, and synchronous loading of external files is not available`);
                return readBinary(o2);
              }
              function o() {
                return t.loadAsync ? a().then(((r2) => loadWebAssemblyModule(r2, t, e, _, s))) : loadWebAssemblyModule(a(), t, e, _, s);
              }
              function n(t2) {
                r.global ? mergeLibSymbols(t2, e) : _ && Object.assign(_, t2), r.exports = t2;
              }
              return (r = newDSO(e, s, "loading")).refcount = t.nodelete ? 1 / 0 : 1, r.global = t.global, t.loadAsync ? o().then(((e2) => (n(e2), true))) : (n(o()), true);
            }
            var reportUndefinedSymbols = () => {
              for (var [e, t] of Object.entries(GOT)) if (0 == t.value) {
                var _ = resolveGlobalSymbol(e, true).sym;
                if (!_ && !t.required) continue;
                if ("function" == typeof _) t.value = addFunction(_, _.sig);
                else {
                  if ("number" != typeof _) throw new Error(`bad export type for '${e}': ${typeof _}`);
                  t.value = _;
                }
              }
            }, loadDylibs = () => {
              dynamicLibraries.length ? (addRunDependency("loadDylibs"), dynamicLibraries.reduce(((e, t) => e.then((() => loadDynamicLibrary(t, { loadAsync: true, global: true, nodelete: true, allowUndefined: true })))), Promise.resolve()).then((() => {
                reportUndefinedSymbols(), removeRunDependency("loadDylibs");
              }))) : reportUndefinedSymbols();
            }, noExitRuntime = Module.noExitRuntime || true;
            function setValue(e, t, _ = "i8") {
              switch (_.endsWith("*") && (_ = "*"), _) {
                case "i1":
                case "i8":
                  HEAP8[e] = t;
                  break;
                case "i16":
                  HEAP16[e >> 1] = t;
                  break;
                case "i32":
                  HEAP32[e >> 2] = t;
                  break;
                case "i64":
                  abort("to do setValue(i64) use WASM_BIGINT");
                case "float":
                  HEAPF32[e >> 2] = t;
                  break;
                case "double":
                  HEAPF64[e >> 3] = t;
                  break;
                case "*":
                  HEAPU32[e >> 2] = t;
                  break;
                default:
                  abort(`invalid type for setValue: ${_}`);
              }
            }
            var ___memory_base = new WebAssembly.Global({ value: "i32", mutable: false }, 1024), ___stack_pointer = new WebAssembly.Global({ value: "i32", mutable: true }, 78096), ___table_base = new WebAssembly.Global({ value: "i32", mutable: false }, 1), nowIsMonotonic = 1, __emscripten_get_now_is_monotonic = () => nowIsMonotonic;
            __emscripten_get_now_is_monotonic.sig = "i";
            var _abort = () => {
              abort("");
            };
            _abort.sig = "v";
            var _emscripten_date_now = () => Date.now(), _emscripten_get_now;
            _emscripten_date_now.sig = "d", _emscripten_get_now = () => performance.now(), _emscripten_get_now.sig = "d";
            var _emscripten_memcpy_js = (e, t, _) => HEAPU8.copyWithin(e, t, t + _);
            _emscripten_memcpy_js.sig = "vppp";
            var getHeapMax = () => 2147483648, growMemory = (e) => {
              var t = (e - wasmMemory.buffer.byteLength + 65535) / 65536;
              try {
                return wasmMemory.grow(t), updateMemoryViews(), 1;
              } catch (e2) {
              }
            }, _emscripten_resize_heap = (e) => {
              var t = HEAPU8.length;
              e >>>= 0;
              var _ = getHeapMax();
              if (e > _) return false;
              for (var s, r, a = 1; a <= 4; a *= 2) {
                var o = t * (1 + 0.2 / a);
                o = Math.min(o, e + 100663296);
                var n = Math.min(_, (s = Math.max(e, o)) + ((r = 65536) - s % r) % r);
                if (growMemory(n)) return true;
              }
              return false;
            };
            _emscripten_resize_heap.sig = "ip";
            var _fd_close = (e) => 52;
            _fd_close.sig = "ii";
            var convertI32PairToI53Checked = (e, t) => t + 2097152 >>> 0 < 4194305 - !!e ? (e >>> 0) + 4294967296 * t : NaN;
            function _fd_seek(e, t, _, s, r) {
              convertI32PairToI53Checked(t, _);
              return 70;
            }
            _fd_seek.sig = "iiiiip";
            var printCharBuffers = [null, [], []], printChar = (e, t) => {
              var _ = printCharBuffers[e];
              0 === t || 10 === t ? ((1 === e ? out : err)(UTF8ArrayToString(_, 0)), _.length = 0) : _.push(t);
            }, SYSCALLS = { varargs: void 0, get() {
              var e = HEAP32[+SYSCALLS.varargs >> 2];
              return SYSCALLS.varargs += 4, e;
            }, getp: () => SYSCALLS.get(), getStr: (e) => UTF8ToString(e) }, _fd_write = (e, t, _, s) => {
              for (var r = 0, a = 0; a < _; a++) {
                var o = HEAPU32[t >> 2], n = HEAPU32[t + 4 >> 2];
                t += 8;
                for (var l = 0; l < n; l++) printChar(e, HEAPU8[o + l]);
                r += n;
              }
              return HEAPU32[s >> 2] = r, 0;
            };
            function _tree_sitter_log_callback(e, t) {
              if (currentLogCallback) {
                const _ = UTF8ToString(t);
                currentLogCallback(_, 0 !== e);
              }
            }
            function _tree_sitter_parse_callback(e, t, _, s, r) {
              const a = currentParseCallback(t, { row: _, column: s });
              "string" == typeof a ? (setValue(r, a.length, "i32"), stringToUTF16(a, e, 10240)) : setValue(r, 0, "i32");
            }
            _fd_write.sig = "iippp";
            var runtimeKeepaliveCounter = 0, keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0, _proc_exit = (e) => {
              EXITSTATUS = e, keepRuntimeAlive() || (Module.onExit?.(e), ABORT = true), quit_(e, new ExitStatus(e));
            };
            _proc_exit.sig = "vi";
            var exitJS = (e, t) => {
              EXITSTATUS = e, _proc_exit(e);
            }, handleException = (e) => {
              if (e instanceof ExitStatus || "unwind" == e) return EXITSTATUS;
              quit_(1, e);
            }, lengthBytesUTF8 = (e) => {
              for (var t = 0, _ = 0; _ < e.length; ++_) {
                var s = e.charCodeAt(_);
                s <= 127 ? t++ : s <= 2047 ? t += 2 : s >= 55296 && s <= 57343 ? (t += 4, ++_) : t += 3;
              }
              return t;
            }, stringToUTF8Array = (e, t, _, s) => {
              if (!(s > 0)) return 0;
              for (var r = _, a = _ + s - 1, o = 0; o < e.length; ++o) {
                var n = e.charCodeAt(o);
                if (n >= 55296 && n <= 57343) n = 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++o);
                if (n <= 127) {
                  if (_ >= a) break;
                  t[_++] = n;
                } else if (n <= 2047) {
                  if (_ + 1 >= a) break;
                  t[_++] = 192 | n >> 6, t[_++] = 128 | 63 & n;
                } else if (n <= 65535) {
                  if (_ + 2 >= a) break;
                  t[_++] = 224 | n >> 12, t[_++] = 128 | n >> 6 & 63, t[_++] = 128 | 63 & n;
                } else {
                  if (_ + 3 >= a) break;
                  t[_++] = 240 | n >> 18, t[_++] = 128 | n >> 12 & 63, t[_++] = 128 | n >> 6 & 63, t[_++] = 128 | 63 & n;
                }
              }
              return t[_] = 0, _ - r;
            }, stringToUTF8 = (e, t, _) => stringToUTF8Array(e, HEAPU8, t, _), stringToUTF8OnStack = (e) => {
              var t = lengthBytesUTF8(e) + 1, _ = stackAlloc(t);
              return stringToUTF8(e, _, t), _;
            }, stringToUTF16 = (e, t, _) => {
              if (_ ??= 2147483647, _ < 2) return 0;
              for (var s = t, r = (_ -= 2) < 2 * e.length ? _ / 2 : e.length, a = 0; a < r; ++a) {
                var o = e.charCodeAt(a);
                HEAP16[t >> 1] = o, t += 2;
              }
              return HEAP16[t >> 1] = 0, t - s;
            }, AsciiToString = (e) => {
              for (var t = ""; ; ) {
                var _ = HEAPU8[e++];
                if (!_) return t;
                t += String.fromCharCode(_);
              }
            }, wasmImports = { __heap_base: ___heap_base, __indirect_function_table: wasmTable, __memory_base: ___memory_base, __stack_pointer: ___stack_pointer, __table_base: ___table_base, _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic, abort: _abort, emscripten_get_now: _emscripten_get_now, emscripten_memcpy_js: _emscripten_memcpy_js, emscripten_resize_heap: _emscripten_resize_heap, fd_close: _fd_close, fd_seek: _fd_seek, fd_write: _fd_write, memory: wasmMemory, tree_sitter_log_callback: _tree_sitter_log_callback, tree_sitter_parse_callback: _tree_sitter_parse_callback }, wasmExports = createWasm(), ___wasm_call_ctors = () => (___wasm_call_ctors = wasmExports.__wasm_call_ctors)(), ___wasm_apply_data_relocs = () => (___wasm_apply_data_relocs = wasmExports.__wasm_apply_data_relocs)(), _malloc = Module._malloc = (e) => (_malloc = Module._malloc = wasmExports.malloc)(e), _calloc = Module._calloc = (e, t) => (_calloc = Module._calloc = wasmExports.calloc)(e, t), _realloc = Module._realloc = (e, t) => (_realloc = Module._realloc = wasmExports.realloc)(e, t), _free = Module._free = (e) => (_free = Module._free = wasmExports.free)(e), _ts_language_symbol_count = Module._ts_language_symbol_count = (e) => (_ts_language_symbol_count = Module._ts_language_symbol_count = wasmExports.ts_language_symbol_count)(e), _ts_language_state_count = Module._ts_language_state_count = (e) => (_ts_language_state_count = Module._ts_language_state_count = wasmExports.ts_language_state_count)(e), _ts_language_version = Module._ts_language_version = (e) => (_ts_language_version = Module._ts_language_version = wasmExports.ts_language_version)(e), _ts_language_field_count = Module._ts_language_field_count = (e) => (_ts_language_field_count = Module._ts_language_field_count = wasmExports.ts_language_field_count)(e), _ts_language_next_state = Module._ts_language_next_state = (e, t, _) => (_ts_language_next_state = Module._ts_language_next_state = wasmExports.ts_language_next_state)(e, t, _), _ts_language_symbol_name = Module._ts_language_symbol_name = (e, t) => (_ts_language_symbol_name = Module._ts_language_symbol_name = wasmExports.ts_language_symbol_name)(e, t), _ts_language_symbol_for_name = Module._ts_language_symbol_for_name = (e, t, _, s) => (_ts_language_symbol_for_name = Module._ts_language_symbol_for_name = wasmExports.ts_language_symbol_for_name)(e, t, _, s), _strncmp = Module._strncmp = (e, t, _) => (_strncmp = Module._strncmp = wasmExports.strncmp)(e, t, _), _ts_language_symbol_type = Module._ts_language_symbol_type = (e, t) => (_ts_language_symbol_type = Module._ts_language_symbol_type = wasmExports.ts_language_symbol_type)(e, t), _ts_language_field_name_for_id = Module._ts_language_field_name_for_id = (e, t) => (_ts_language_field_name_for_id = Module._ts_language_field_name_for_id = wasmExports.ts_language_field_name_for_id)(e, t), _ts_lookahead_iterator_new = Module._ts_lookahead_iterator_new = (e, t) => (_ts_lookahead_iterator_new = Module._ts_lookahead_iterator_new = wasmExports.ts_lookahead_iterator_new)(e, t), _ts_lookahead_iterator_delete = Module._ts_lookahead_iterator_delete = (e) => (_ts_lookahead_iterator_delete = Module._ts_lookahead_iterator_delete = wasmExports.ts_lookahead_iterator_delete)(e), _ts_lookahead_iterator_reset_state = Module._ts_lookahead_iterator_reset_state = (e, t) => (_ts_lookahead_iterator_reset_state = Module._ts_lookahead_iterator_reset_state = wasmExports.ts_lookahead_iterator_reset_state)(e, t), _ts_lookahead_iterator_reset = Module._ts_lookahead_iterator_reset = (e, t, _) => (_ts_lookahead_iterator_reset = Module._ts_lookahead_iterator_reset = wasmExports.ts_lookahead_iterator_reset)(e, t, _), _ts_lookahead_iterator_next = Module._ts_lookahead_iterator_next = (e) => (_ts_lookahead_iterator_next = Module._ts_lookahead_iterator_next = wasmExports.ts_lookahead_iterator_next)(e), _ts_lookahead_iterator_current_symbol = Module._ts_lookahead_iterator_current_symbol = (e) => (_ts_lookahead_iterator_current_symbol = Module._ts_lookahead_iterator_current_symbol = wasmExports.ts_lookahead_iterator_current_symbol)(e), _memset = Module._memset = (e, t, _) => (_memset = Module._memset = wasmExports.memset)(e, t, _), _memcpy = Module._memcpy = (e, t, _) => (_memcpy = Module._memcpy = wasmExports.memcpy)(e, t, _), _ts_parser_delete = Module._ts_parser_delete = (e) => (_ts_parser_delete = Module._ts_parser_delete = wasmExports.ts_parser_delete)(e), _ts_parser_reset = Module._ts_parser_reset = (e) => (_ts_parser_reset = Module._ts_parser_reset = wasmExports.ts_parser_reset)(e), _ts_parser_set_language = Module._ts_parser_set_language = (e, t) => (_ts_parser_set_language = Module._ts_parser_set_language = wasmExports.ts_parser_set_language)(e, t), _ts_parser_timeout_micros = Module._ts_parser_timeout_micros = (e) => (_ts_parser_timeout_micros = Module._ts_parser_timeout_micros = wasmExports.ts_parser_timeout_micros)(e), _ts_parser_set_timeout_micros = Module._ts_parser_set_timeout_micros = (e, t, _) => (_ts_parser_set_timeout_micros = Module._ts_parser_set_timeout_micros = wasmExports.ts_parser_set_timeout_micros)(e, t, _), _ts_parser_set_included_ranges = Module._ts_parser_set_included_ranges = (e, t, _) => (_ts_parser_set_included_ranges = Module._ts_parser_set_included_ranges = wasmExports.ts_parser_set_included_ranges)(e, t, _), _memmove = Module._memmove = (e, t, _) => (_memmove = Module._memmove = wasmExports.memmove)(e, t, _), _memcmp = Module._memcmp = (e, t, _) => (_memcmp = Module._memcmp = wasmExports.memcmp)(e, t, _), _ts_query_new = Module._ts_query_new = (e, t, _, s, r) => (_ts_query_new = Module._ts_query_new = wasmExports.ts_query_new)(e, t, _, s, r), _ts_query_delete = Module._ts_query_delete = (e) => (_ts_query_delete = Module._ts_query_delete = wasmExports.ts_query_delete)(e), _iswspace = Module._iswspace = (e) => (_iswspace = Module._iswspace = wasmExports.iswspace)(e), _iswalnum = Module._iswalnum = (e) => (_iswalnum = Module._iswalnum = wasmExports.iswalnum)(e), _ts_query_pattern_count = Module._ts_query_pattern_count = (e) => (_ts_query_pattern_count = Module._ts_query_pattern_count = wasmExports.ts_query_pattern_count)(e), _ts_query_capture_count = Module._ts_query_capture_count = (e) => (_ts_query_capture_count = Module._ts_query_capture_count = wasmExports.ts_query_capture_count)(e), _ts_query_string_count = Module._ts_query_string_count = (e) => (_ts_query_string_count = Module._ts_query_string_count = wasmExports.ts_query_string_count)(e), _ts_query_capture_name_for_id = Module._ts_query_capture_name_for_id = (e, t, _) => (_ts_query_capture_name_for_id = Module._ts_query_capture_name_for_id = wasmExports.ts_query_capture_name_for_id)(e, t, _), _ts_query_string_value_for_id = Module._ts_query_string_value_for_id = (e, t, _) => (_ts_query_string_value_for_id = Module._ts_query_string_value_for_id = wasmExports.ts_query_string_value_for_id)(e, t, _), _ts_query_predicates_for_pattern = Module._ts_query_predicates_for_pattern = (e, t, _) => (_ts_query_predicates_for_pattern = Module._ts_query_predicates_for_pattern = wasmExports.ts_query_predicates_for_pattern)(e, t, _), _ts_query_disable_capture = Module._ts_query_disable_capture = (e, t, _) => (_ts_query_disable_capture = Module._ts_query_disable_capture = wasmExports.ts_query_disable_capture)(e, t, _), _ts_tree_copy = Module._ts_tree_copy = (e) => (_ts_tree_copy = Module._ts_tree_copy = wasmExports.ts_tree_copy)(e), _ts_tree_delete = Module._ts_tree_delete = (e) => (_ts_tree_delete = Module._ts_tree_delete = wasmExports.ts_tree_delete)(e), _ts_init = Module._ts_init = () => (_ts_init = Module._ts_init = wasmExports.ts_init)(), _ts_parser_new_wasm = Module._ts_parser_new_wasm = () => (_ts_parser_new_wasm = Module._ts_parser_new_wasm = wasmExports.ts_parser_new_wasm)(), _ts_parser_enable_logger_wasm = Module._ts_parser_enable_logger_wasm = (e, t) => (_ts_parser_enable_logger_wasm = Module._ts_parser_enable_logger_wasm = wasmExports.ts_parser_enable_logger_wasm)(e, t), _ts_parser_parse_wasm = Module._ts_parser_parse_wasm = (e, t, _, s, r) => (_ts_parser_parse_wasm = Module._ts_parser_parse_wasm = wasmExports.ts_parser_parse_wasm)(e, t, _, s, r), _ts_parser_included_ranges_wasm = Module._ts_parser_included_ranges_wasm = (e) => (_ts_parser_included_ranges_wasm = Module._ts_parser_included_ranges_wasm = wasmExports.ts_parser_included_ranges_wasm)(e), _ts_language_type_is_named_wasm = Module._ts_language_type_is_named_wasm = (e, t) => (_ts_language_type_is_named_wasm = Module._ts_language_type_is_named_wasm = wasmExports.ts_language_type_is_named_wasm)(e, t), _ts_language_type_is_visible_wasm = Module._ts_language_type_is_visible_wasm = (e, t) => (_ts_language_type_is_visible_wasm = Module._ts_language_type_is_visible_wasm = wasmExports.ts_language_type_is_visible_wasm)(e, t), _ts_tree_root_node_wasm = Module._ts_tree_root_node_wasm = (e) => (_ts_tree_root_node_wasm = Module._ts_tree_root_node_wasm = wasmExports.ts_tree_root_node_wasm)(e), _ts_tree_root_node_with_offset_wasm = Module._ts_tree_root_node_with_offset_wasm = (e) => (_ts_tree_root_node_with_offset_wasm = Module._ts_tree_root_node_with_offset_wasm = wasmExports.ts_tree_root_node_with_offset_wasm)(e), _ts_tree_edit_wasm = Module._ts_tree_edit_wasm = (e) => (_ts_tree_edit_wasm = Module._ts_tree_edit_wasm = wasmExports.ts_tree_edit_wasm)(e), _ts_tree_included_ranges_wasm = Module._ts_tree_included_ranges_wasm = (e) => (_ts_tree_included_ranges_wasm = Module._ts_tree_included_ranges_wasm = wasmExports.ts_tree_included_ranges_wasm)(e), _ts_tree_get_changed_ranges_wasm = Module._ts_tree_get_changed_ranges_wasm = (e, t) => (_ts_tree_get_changed_ranges_wasm = Module._ts_tree_get_changed_ranges_wasm = wasmExports.ts_tree_get_changed_ranges_wasm)(e, t), _ts_tree_cursor_new_wasm = Module._ts_tree_cursor_new_wasm = (e) => (_ts_tree_cursor_new_wasm = Module._ts_tree_cursor_new_wasm = wasmExports.ts_tree_cursor_new_wasm)(e), _ts_tree_cursor_delete_wasm = Module._ts_tree_cursor_delete_wasm = (e) => (_ts_tree_cursor_delete_wasm = Module._ts_tree_cursor_delete_wasm = wasmExports.ts_tree_cursor_delete_wasm)(e), _ts_tree_cursor_reset_wasm = Module._ts_tree_cursor_reset_wasm = (e) => (_ts_tree_cursor_reset_wasm = Module._ts_tree_cursor_reset_wasm = wasmExports.ts_tree_cursor_reset_wasm)(e), _ts_tree_cursor_reset_to_wasm = Module._ts_tree_cursor_reset_to_wasm = (e, t) => (_ts_tree_cursor_reset_to_wasm = Module._ts_tree_cursor_reset_to_wasm = wasmExports.ts_tree_cursor_reset_to_wasm)(e, t), _ts_tree_cursor_goto_first_child_wasm = Module._ts_tree_cursor_goto_first_child_wasm = (e) => (_ts_tree_cursor_goto_first_child_wasm = Module._ts_tree_cursor_goto_first_child_wasm = wasmExports.ts_tree_cursor_goto_first_child_wasm)(e), _ts_tree_cursor_goto_last_child_wasm = Module._ts_tree_cursor_goto_last_child_wasm = (e) => (_ts_tree_cursor_goto_last_child_wasm = Module._ts_tree_cursor_goto_last_child_wasm = wasmExports.ts_tree_cursor_goto_last_child_wasm)(e), _ts_tree_cursor_goto_first_child_for_index_wasm = Module._ts_tree_cursor_goto_first_child_for_index_wasm = (e) => (_ts_tree_cursor_goto_first_child_for_index_wasm = Module._ts_tree_cursor_goto_first_child_for_index_wasm = wasmExports.ts_tree_cursor_goto_first_child_for_index_wasm)(e), _ts_tree_cursor_goto_first_child_for_position_wasm = Module._ts_tree_cursor_goto_first_child_for_position_wasm = (e) => (_ts_tree_cursor_goto_first_child_for_position_wasm = Module._ts_tree_cursor_goto_first_child_for_position_wasm = wasmExports.ts_tree_cursor_goto_first_child_for_position_wasm)(e), _ts_tree_cursor_goto_next_sibling_wasm = Module._ts_tree_cursor_goto_next_sibling_wasm = (e) => (_ts_tree_cursor_goto_next_sibling_wasm = Module._ts_tree_cursor_goto_next_sibling_wasm = wasmExports.ts_tree_cursor_goto_next_sibling_wasm)(e), _ts_tree_cursor_goto_previous_sibling_wasm = Module._ts_tree_cursor_goto_previous_sibling_wasm = (e) => (_ts_tree_cursor_goto_previous_sibling_wasm = Module._ts_tree_cursor_goto_previous_sibling_wasm = wasmExports.ts_tree_cursor_goto_previous_sibling_wasm)(e), _ts_tree_cursor_goto_descendant_wasm = Module._ts_tree_cursor_goto_descendant_wasm = (e, t) => (_ts_tree_cursor_goto_descendant_wasm = Module._ts_tree_cursor_goto_descendant_wasm = wasmExports.ts_tree_cursor_goto_descendant_wasm)(e, t), _ts_tree_cursor_goto_parent_wasm = Module._ts_tree_cursor_goto_parent_wasm = (e) => (_ts_tree_cursor_goto_parent_wasm = Module._ts_tree_cursor_goto_parent_wasm = wasmExports.ts_tree_cursor_goto_parent_wasm)(e), _ts_tree_cursor_current_node_type_id_wasm = Module._ts_tree_cursor_current_node_type_id_wasm = (e) => (_ts_tree_cursor_current_node_type_id_wasm = Module._ts_tree_cursor_current_node_type_id_wasm = wasmExports.ts_tree_cursor_current_node_type_id_wasm)(e), _ts_tree_cursor_current_node_state_id_wasm = Module._ts_tree_cursor_current_node_state_id_wasm = (e) => (_ts_tree_cursor_current_node_state_id_wasm = Module._ts_tree_cursor_current_node_state_id_wasm = wasmExports.ts_tree_cursor_current_node_state_id_wasm)(e), _ts_tree_cursor_current_node_is_named_wasm = Module._ts_tree_cursor_current_node_is_named_wasm = (e) => (_ts_tree_cursor_current_node_is_named_wasm = Module._ts_tree_cursor_current_node_is_named_wasm = wasmExports.ts_tree_cursor_current_node_is_named_wasm)(e), _ts_tree_cursor_current_node_is_missing_wasm = Module._ts_tree_cursor_current_node_is_missing_wasm = (e) => (_ts_tree_cursor_current_node_is_missing_wasm = Module._ts_tree_cursor_current_node_is_missing_wasm = wasmExports.ts_tree_cursor_current_node_is_missing_wasm)(e), _ts_tree_cursor_current_node_id_wasm = Module._ts_tree_cursor_current_node_id_wasm = (e) => (_ts_tree_cursor_current_node_id_wasm = Module._ts_tree_cursor_current_node_id_wasm = wasmExports.ts_tree_cursor_current_node_id_wasm)(e), _ts_tree_cursor_start_position_wasm = Module._ts_tree_cursor_start_position_wasm = (e) => (_ts_tree_cursor_start_position_wasm = Module._ts_tree_cursor_start_position_wasm = wasmExports.ts_tree_cursor_start_position_wasm)(e), _ts_tree_cursor_end_position_wasm = Module._ts_tree_cursor_end_position_wasm = (e) => (_ts_tree_cursor_end_position_wasm = Module._ts_tree_cursor_end_position_wasm = wasmExports.ts_tree_cursor_end_position_wasm)(e), _ts_tree_cursor_start_index_wasm = Module._ts_tree_cursor_start_index_wasm = (e) => (_ts_tree_cursor_start_index_wasm = Module._ts_tree_cursor_start_index_wasm = wasmExports.ts_tree_cursor_start_index_wasm)(e), _ts_tree_cursor_end_index_wasm = Module._ts_tree_cursor_end_index_wasm = (e) => (_ts_tree_cursor_end_index_wasm = Module._ts_tree_cursor_end_index_wasm = wasmExports.ts_tree_cursor_end_index_wasm)(e), _ts_tree_cursor_current_field_id_wasm = Module._ts_tree_cursor_current_field_id_wasm = (e) => (_ts_tree_cursor_current_field_id_wasm = Module._ts_tree_cursor_current_field_id_wasm = wasmExports.ts_tree_cursor_current_field_id_wasm)(e), _ts_tree_cursor_current_depth_wasm = Module._ts_tree_cursor_current_depth_wasm = (e) => (_ts_tree_cursor_current_depth_wasm = Module._ts_tree_cursor_current_depth_wasm = wasmExports.ts_tree_cursor_current_depth_wasm)(e), _ts_tree_cursor_current_descendant_index_wasm = Module._ts_tree_cursor_current_descendant_index_wasm = (e) => (_ts_tree_cursor_current_descendant_index_wasm = Module._ts_tree_cursor_current_descendant_index_wasm = wasmExports.ts_tree_cursor_current_descendant_index_wasm)(e), _ts_tree_cursor_current_node_wasm = Module._ts_tree_cursor_current_node_wasm = (e) => (_ts_tree_cursor_current_node_wasm = Module._ts_tree_cursor_current_node_wasm = wasmExports.ts_tree_cursor_current_node_wasm)(e), _ts_node_symbol_wasm = Module._ts_node_symbol_wasm = (e) => (_ts_node_symbol_wasm = Module._ts_node_symbol_wasm = wasmExports.ts_node_symbol_wasm)(e), _ts_node_field_name_for_child_wasm = Module._ts_node_field_name_for_child_wasm = (e, t) => (_ts_node_field_name_for_child_wasm = Module._ts_node_field_name_for_child_wasm = wasmExports.ts_node_field_name_for_child_wasm)(e, t), _ts_node_children_by_field_id_wasm = Module._ts_node_children_by_field_id_wasm = (e, t) => (_ts_node_children_by_field_id_wasm = Module._ts_node_children_by_field_id_wasm = wasmExports.ts_node_children_by_field_id_wasm)(e, t), _ts_node_first_child_for_byte_wasm = Module._ts_node_first_child_for_byte_wasm = (e) => (_ts_node_first_child_for_byte_wasm = Module._ts_node_first_child_for_byte_wasm = wasmExports.ts_node_first_child_for_byte_wasm)(e), _ts_node_first_named_child_for_byte_wasm = Module._ts_node_first_named_child_for_byte_wasm = (e) => (_ts_node_first_named_child_for_byte_wasm = Module._ts_node_first_named_child_for_byte_wasm = wasmExports.ts_node_first_named_child_for_byte_wasm)(e), _ts_node_grammar_symbol_wasm = Module._ts_node_grammar_symbol_wasm = (e) => (_ts_node_grammar_symbol_wasm = Module._ts_node_grammar_symbol_wasm = wasmExports.ts_node_grammar_symbol_wasm)(e), _ts_node_child_count_wasm = Module._ts_node_child_count_wasm = (e) => (_ts_node_child_count_wasm = Module._ts_node_child_count_wasm = wasmExports.ts_node_child_count_wasm)(e), _ts_node_named_child_count_wasm = Module._ts_node_named_child_count_wasm = (e) => (_ts_node_named_child_count_wasm = Module._ts_node_named_child_count_wasm = wasmExports.ts_node_named_child_count_wasm)(e), _ts_node_child_wasm = Module._ts_node_child_wasm = (e, t) => (_ts_node_child_wasm = Module._ts_node_child_wasm = wasmExports.ts_node_child_wasm)(e, t), _ts_node_named_child_wasm = Module._ts_node_named_child_wasm = (e, t) => (_ts_node_named_child_wasm = Module._ts_node_named_child_wasm = wasmExports.ts_node_named_child_wasm)(e, t), _ts_node_child_by_field_id_wasm = Module._ts_node_child_by_field_id_wasm = (e, t) => (_ts_node_child_by_field_id_wasm = Module._ts_node_child_by_field_id_wasm = wasmExports.ts_node_child_by_field_id_wasm)(e, t), _ts_node_next_sibling_wasm = Module._ts_node_next_sibling_wasm = (e) => (_ts_node_next_sibling_wasm = Module._ts_node_next_sibling_wasm = wasmExports.ts_node_next_sibling_wasm)(e), _ts_node_prev_sibling_wasm = Module._ts_node_prev_sibling_wasm = (e) => (_ts_node_prev_sibling_wasm = Module._ts_node_prev_sibling_wasm = wasmExports.ts_node_prev_sibling_wasm)(e), _ts_node_next_named_sibling_wasm = Module._ts_node_next_named_sibling_wasm = (e) => (_ts_node_next_named_sibling_wasm = Module._ts_node_next_named_sibling_wasm = wasmExports.ts_node_next_named_sibling_wasm)(e), _ts_node_prev_named_sibling_wasm = Module._ts_node_prev_named_sibling_wasm = (e) => (_ts_node_prev_named_sibling_wasm = Module._ts_node_prev_named_sibling_wasm = wasmExports.ts_node_prev_named_sibling_wasm)(e), _ts_node_descendant_count_wasm = Module._ts_node_descendant_count_wasm = (e) => (_ts_node_descendant_count_wasm = Module._ts_node_descendant_count_wasm = wasmExports.ts_node_descendant_count_wasm)(e), _ts_node_parent_wasm = Module._ts_node_parent_wasm = (e) => (_ts_node_parent_wasm = Module._ts_node_parent_wasm = wasmExports.ts_node_parent_wasm)(e), _ts_node_descendant_for_index_wasm = Module._ts_node_descendant_for_index_wasm = (e) => (_ts_node_descendant_for_index_wasm = Module._ts_node_descendant_for_index_wasm = wasmExports.ts_node_descendant_for_index_wasm)(e), _ts_node_named_descendant_for_index_wasm = Module._ts_node_named_descendant_for_index_wasm = (e) => (_ts_node_named_descendant_for_index_wasm = Module._ts_node_named_descendant_for_index_wasm = wasmExports.ts_node_named_descendant_for_index_wasm)(e), _ts_node_descendant_for_position_wasm = Module._ts_node_descendant_for_position_wasm = (e) => (_ts_node_descendant_for_position_wasm = Module._ts_node_descendant_for_position_wasm = wasmExports.ts_node_descendant_for_position_wasm)(e), _ts_node_named_descendant_for_position_wasm = Module._ts_node_named_descendant_for_position_wasm = (e) => (_ts_node_named_descendant_for_position_wasm = Module._ts_node_named_descendant_for_position_wasm = wasmExports.ts_node_named_descendant_for_position_wasm)(e), _ts_node_start_point_wasm = Module._ts_node_start_point_wasm = (e) => (_ts_node_start_point_wasm = Module._ts_node_start_point_wasm = wasmExports.ts_node_start_point_wasm)(e), _ts_node_end_point_wasm = Module._ts_node_end_point_wasm = (e) => (_ts_node_end_point_wasm = Module._ts_node_end_point_wasm = wasmExports.ts_node_end_point_wasm)(e), _ts_node_start_index_wasm = Module._ts_node_start_index_wasm = (e) => (_ts_node_start_index_wasm = Module._ts_node_start_index_wasm = wasmExports.ts_node_start_index_wasm)(e), _ts_node_end_index_wasm = Module._ts_node_end_index_wasm = (e) => (_ts_node_end_index_wasm = Module._ts_node_end_index_wasm = wasmExports.ts_node_end_index_wasm)(e), _ts_node_to_string_wasm = Module._ts_node_to_string_wasm = (e) => (_ts_node_to_string_wasm = Module._ts_node_to_string_wasm = wasmExports.ts_node_to_string_wasm)(e), _ts_node_children_wasm = Module._ts_node_children_wasm = (e) => (_ts_node_children_wasm = Module._ts_node_children_wasm = wasmExports.ts_node_children_wasm)(e), _ts_node_named_children_wasm = Module._ts_node_named_children_wasm = (e) => (_ts_node_named_children_wasm = Module._ts_node_named_children_wasm = wasmExports.ts_node_named_children_wasm)(e), _ts_node_descendants_of_type_wasm = Module._ts_node_descendants_of_type_wasm = (e, t, _, s, r, a, o) => (_ts_node_descendants_of_type_wasm = Module._ts_node_descendants_of_type_wasm = wasmExports.ts_node_descendants_of_type_wasm)(e, t, _, s, r, a, o), _ts_node_is_named_wasm = Module._ts_node_is_named_wasm = (e) => (_ts_node_is_named_wasm = Module._ts_node_is_named_wasm = wasmExports.ts_node_is_named_wasm)(e), _ts_node_has_changes_wasm = Module._ts_node_has_changes_wasm = (e) => (_ts_node_has_changes_wasm = Module._ts_node_has_changes_wasm = wasmExports.ts_node_has_changes_wasm)(e), _ts_node_has_error_wasm = Module._ts_node_has_error_wasm = (e) => (_ts_node_has_error_wasm = Module._ts_node_has_error_wasm = wasmExports.ts_node_has_error_wasm)(e), _ts_node_is_error_wasm = Module._ts_node_is_error_wasm = (e) => (_ts_node_is_error_wasm = Module._ts_node_is_error_wasm = wasmExports.ts_node_is_error_wasm)(e), _ts_node_is_missing_wasm = Module._ts_node_is_missing_wasm = (e) => (_ts_node_is_missing_wasm = Module._ts_node_is_missing_wasm = wasmExports.ts_node_is_missing_wasm)(e), _ts_node_is_extra_wasm = Module._ts_node_is_extra_wasm = (e) => (_ts_node_is_extra_wasm = Module._ts_node_is_extra_wasm = wasmExports.ts_node_is_extra_wasm)(e), _ts_node_parse_state_wasm = Module._ts_node_parse_state_wasm = (e) => (_ts_node_parse_state_wasm = Module._ts_node_parse_state_wasm = wasmExports.ts_node_parse_state_wasm)(e), _ts_node_next_parse_state_wasm = Module._ts_node_next_parse_state_wasm = (e) => (_ts_node_next_parse_state_wasm = Module._ts_node_next_parse_state_wasm = wasmExports.ts_node_next_parse_state_wasm)(e), _ts_query_matches_wasm = Module._ts_query_matches_wasm = (e, t, _, s, r, a, o, n, l, d) => (_ts_query_matches_wasm = Module._ts_query_matches_wasm = wasmExports.ts_query_matches_wasm)(e, t, _, s, r, a, o, n, l, d), _ts_query_captures_wasm = Module._ts_query_captures_wasm = (e, t, _, s, r, a, o, n, l, d) => (_ts_query_captures_wasm = Module._ts_query_captures_wasm = wasmExports.ts_query_captures_wasm)(e, t, _, s, r, a, o, n, l, d), _iswalpha = Module._iswalpha = (e) => (_iswalpha = Module._iswalpha = wasmExports.iswalpha)(e), _iswblank = Module._iswblank = (e) => (_iswblank = Module._iswblank = wasmExports.iswblank)(e), _iswdigit = Module._iswdigit = (e) => (_iswdigit = Module._iswdigit = wasmExports.iswdigit)(e), _iswlower = Module._iswlower = (e) => (_iswlower = Module._iswlower = wasmExports.iswlower)(e), _iswupper = Module._iswupper = (e) => (_iswupper = Module._iswupper = wasmExports.iswupper)(e), _iswxdigit = Module._iswxdigit = (e) => (_iswxdigit = Module._iswxdigit = wasmExports.iswxdigit)(e), _memchr = Module._memchr = (e, t, _) => (_memchr = Module._memchr = wasmExports.memchr)(e, t, _), _strlen = Module._strlen = (e) => (_strlen = Module._strlen = wasmExports.strlen)(e), _strcmp = Module._strcmp = (e, t) => (_strcmp = Module._strcmp = wasmExports.strcmp)(e, t), _strncat = Module._strncat = (e, t, _) => (_strncat = Module._strncat = wasmExports.strncat)(e, t, _), _strncpy = Module._strncpy = (e, t, _) => (_strncpy = Module._strncpy = wasmExports.strncpy)(e, t, _), _towlower = Module._towlower = (e) => (_towlower = Module._towlower = wasmExports.towlower)(e), _towupper = Module._towupper = (e) => (_towupper = Module._towupper = wasmExports.towupper)(e), _setThrew = (e, t) => (_setThrew = wasmExports.setThrew)(e, t), stackSave = () => (stackSave = wasmExports.stackSave)(), stackRestore = (e) => (stackRestore = wasmExports.stackRestore)(e), stackAlloc = (e) => (stackAlloc = wasmExports.stackAlloc)(e), dynCall_jiji = Module.dynCall_jiji = (e, t, _, s, r) => (dynCall_jiji = Module.dynCall_jiji = wasmExports.dynCall_jiji)(e, t, _, s, r), _orig$ts_parser_timeout_micros = Module._orig$ts_parser_timeout_micros = (e) => (_orig$ts_parser_timeout_micros = Module._orig$ts_parser_timeout_micros = wasmExports.orig$ts_parser_timeout_micros)(e), _orig$ts_parser_set_timeout_micros = Module._orig$ts_parser_set_timeout_micros = (e, t) => (_orig$ts_parser_set_timeout_micros = Module._orig$ts_parser_set_timeout_micros = wasmExports.orig$ts_parser_set_timeout_micros)(e, t), calledRun;
            function callMain(e = []) {
              var t = resolveGlobalSymbol("main").sym;
              if (t) {
                e.unshift(thisProgram);
                var _ = e.length, s = stackAlloc(4 * (_ + 1)), r = s;
                e.forEach(((e2) => {
                  HEAPU32[r >> 2] = stringToUTF8OnStack(e2), r += 4;
                })), HEAPU32[r >> 2] = 0;
                try {
                  var a = t(_, s);
                  return exitJS(a, true), a;
                } catch (e2) {
                  return handleException(e2);
                }
              }
            }
            function run(e = arguments_) {
              function t() {
                calledRun || (calledRun = true, Module.calledRun = true, ABORT || (initRuntime(), preMain(), Module.onRuntimeInitialized && Module.onRuntimeInitialized(), shouldRunNow && callMain(e), postRun()));
              }
              runDependencies > 0 || (preRun(), runDependencies > 0 || (Module.setStatus ? (Module.setStatus("Running..."), setTimeout((function() {
                setTimeout((function() {
                  Module.setStatus("");
                }), 1), t();
              }), 1)) : t()));
            }
            if (Module.AsciiToString = AsciiToString, Module.stringToUTF16 = stringToUTF16, dependenciesFulfilled = function e() {
              calledRun || run(), calledRun || (dependenciesFulfilled = e);
            }, Module.preInit) for ("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]); Module.preInit.length > 0; ) Module.preInit.pop()();
            var shouldRunNow = true;
            Module.noInitialRun && (shouldRunNow = false), run();
            const C = Module, INTERNAL = {}, SIZE_OF_INT = 4, SIZE_OF_CURSOR = 4 * SIZE_OF_INT, SIZE_OF_NODE = 5 * SIZE_OF_INT, SIZE_OF_POINT = 2 * SIZE_OF_INT, SIZE_OF_RANGE = 2 * SIZE_OF_INT + 2 * SIZE_OF_POINT, ZERO_POINT = { row: 0, column: 0 }, QUERY_WORD_REGEX = /[\w-.]*/g, PREDICATE_STEP_TYPE_CAPTURE = 1, PREDICATE_STEP_TYPE_STRING = 2, LANGUAGE_FUNCTION_REGEX = /^_?tree_sitter_\w+/;
            let VERSION, MIN_COMPATIBLE_VERSION, TRANSFER_BUFFER, currentParseCallback, currentLogCallback;
            class ParserImpl {
              static init() {
                TRANSFER_BUFFER = C._ts_init(), VERSION = getValue(TRANSFER_BUFFER, "i32"), MIN_COMPATIBLE_VERSION = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
              }
              initialize() {
                C._ts_parser_new_wasm(), this[0] = getValue(TRANSFER_BUFFER, "i32"), this[1] = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
              }
              delete() {
                C._ts_parser_delete(this[0]), C._free(this[1]), this[0] = 0, this[1] = 0;
              }
              setLanguage(e) {
                let t;
                if (e) {
                  if (e.constructor !== Language) throw new Error("Argument must be a Language");
                  {
                    t = e[0];
                    const _ = C._ts_language_version(t);
                    if (_ < MIN_COMPATIBLE_VERSION || VERSION < _) throw new Error(`Incompatible language version ${_}. Compatibility range ${MIN_COMPATIBLE_VERSION} through ${VERSION}.`);
                  }
                } else t = 0, e = null;
                return this.language = e, C._ts_parser_set_language(this[0], t), this;
              }
              getLanguage() {
                return this.language;
              }
              parse(e, t, _) {
                if ("string" == typeof e) currentParseCallback = (t2, _2) => e.slice(t2);
                else {
                  if ("function" != typeof e) throw new Error("Argument must be a string or a function");
                  currentParseCallback = e;
                }
                this.logCallback ? (currentLogCallback = this.logCallback, C._ts_parser_enable_logger_wasm(this[0], 1)) : (currentLogCallback = null, C._ts_parser_enable_logger_wasm(this[0], 0));
                let s = 0, r = 0;
                if (_?.includedRanges) {
                  s = _.includedRanges.length, r = C._calloc(s, SIZE_OF_RANGE);
                  let e2 = r;
                  for (let t2 = 0; t2 < s; t2++) marshalRange(e2, _.includedRanges[t2]), e2 += SIZE_OF_RANGE;
                }
                const a = C._ts_parser_parse_wasm(this[0], this[1], t ? t[0] : 0, r, s);
                if (!a) throw currentParseCallback = null, currentLogCallback = null, new Error("Parsing failed");
                const o = new Tree(INTERNAL, a, this.language, currentParseCallback);
                return currentParseCallback = null, currentLogCallback = null, o;
              }
              reset() {
                C._ts_parser_reset(this[0]);
              }
              getIncludedRanges() {
                C._ts_parser_included_ranges_wasm(this[0]);
                const e = getValue(TRANSFER_BUFFER, "i32"), t = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), _ = new Array(e);
                if (e > 0) {
                  let s = t;
                  for (let t2 = 0; t2 < e; t2++) _[t2] = unmarshalRange(s), s += SIZE_OF_RANGE;
                  C._free(t);
                }
                return _;
              }
              getTimeoutMicros() {
                return C._ts_parser_timeout_micros(this[0]);
              }
              setTimeoutMicros(e) {
                C._ts_parser_set_timeout_micros(this[0], e);
              }
              setLogger(e) {
                if (e) {
                  if ("function" != typeof e) throw new Error("Logger callback must be a function");
                } else e = null;
                return this.logCallback = e, this;
              }
              getLogger() {
                return this.logCallback;
              }
            }
            class Tree {
              constructor(e, t, _, s) {
                assertInternal(e), this[0] = t, this.language = _, this.textCallback = s;
              }
              copy() {
                const e = C._ts_tree_copy(this[0]);
                return new Tree(INTERNAL, e, this.language, this.textCallback);
              }
              delete() {
                C._ts_tree_delete(this[0]), this[0] = 0;
              }
              edit(e) {
                marshalEdit(e), C._ts_tree_edit_wasm(this[0]);
              }
              get rootNode() {
                return C._ts_tree_root_node_wasm(this[0]), unmarshalNode(this);
              }
              rootNodeWithOffset(e, t) {
                const _ = TRANSFER_BUFFER + SIZE_OF_NODE;
                return setValue(_, e, "i32"), marshalPoint(_ + SIZE_OF_INT, t), C._ts_tree_root_node_with_offset_wasm(this[0]), unmarshalNode(this);
              }
              getLanguage() {
                return this.language;
              }
              walk() {
                return this.rootNode.walk();
              }
              getChangedRanges(e) {
                if (e.constructor !== Tree) throw new TypeError("Argument must be a Tree");
                C._ts_tree_get_changed_ranges_wasm(this[0], e[0]);
                const t = getValue(TRANSFER_BUFFER, "i32"), _ = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), s = new Array(t);
                if (t > 0) {
                  let e2 = _;
                  for (let _2 = 0; _2 < t; _2++) s[_2] = unmarshalRange(e2), e2 += SIZE_OF_RANGE;
                  C._free(_);
                }
                return s;
              }
              getIncludedRanges() {
                C._ts_tree_included_ranges_wasm(this[0]);
                const e = getValue(TRANSFER_BUFFER, "i32"), t = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), _ = new Array(e);
                if (e > 0) {
                  let s = t;
                  for (let t2 = 0; t2 < e; t2++) _[t2] = unmarshalRange(s), s += SIZE_OF_RANGE;
                  C._free(t);
                }
                return _;
              }
            }
            class Node {
              constructor(e, t) {
                assertInternal(e), this.tree = t;
              }
              get typeId() {
                return marshalNode(this), C._ts_node_symbol_wasm(this.tree[0]);
              }
              get grammarId() {
                return marshalNode(this), C._ts_node_grammar_symbol_wasm(this.tree[0]);
              }
              get type() {
                return this.tree.language.types[this.typeId] || "ERROR";
              }
              get grammarType() {
                return this.tree.language.types[this.grammarId] || "ERROR";
              }
              get endPosition() {
                return marshalNode(this), C._ts_node_end_point_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
              }
              get endIndex() {
                return marshalNode(this), C._ts_node_end_index_wasm(this.tree[0]);
              }
              get text() {
                return getText(this.tree, this.startIndex, this.endIndex);
              }
              get parseState() {
                return marshalNode(this), C._ts_node_parse_state_wasm(this.tree[0]);
              }
              get nextParseState() {
                return marshalNode(this), C._ts_node_next_parse_state_wasm(this.tree[0]);
              }
              get isNamed() {
                return marshalNode(this), 1 === C._ts_node_is_named_wasm(this.tree[0]);
              }
              get hasError() {
                return marshalNode(this), 1 === C._ts_node_has_error_wasm(this.tree[0]);
              }
              get hasChanges() {
                return marshalNode(this), 1 === C._ts_node_has_changes_wasm(this.tree[0]);
              }
              get isError() {
                return marshalNode(this), 1 === C._ts_node_is_error_wasm(this.tree[0]);
              }
              get isMissing() {
                return marshalNode(this), 1 === C._ts_node_is_missing_wasm(this.tree[0]);
              }
              get isExtra() {
                return marshalNode(this), 1 === C._ts_node_is_extra_wasm(this.tree[0]);
              }
              equals(e) {
                return this.id === e.id;
              }
              child(e) {
                return marshalNode(this), C._ts_node_child_wasm(this.tree[0], e), unmarshalNode(this.tree);
              }
              namedChild(e) {
                return marshalNode(this), C._ts_node_named_child_wasm(this.tree[0], e), unmarshalNode(this.tree);
              }
              childForFieldId(e) {
                return marshalNode(this), C._ts_node_child_by_field_id_wasm(this.tree[0], e), unmarshalNode(this.tree);
              }
              childForFieldName(e) {
                const t = this.tree.language.fields.indexOf(e);
                return -1 !== t ? this.childForFieldId(t) : null;
              }
              fieldNameForChild(e) {
                marshalNode(this);
                const t = C._ts_node_field_name_for_child_wasm(this.tree[0], e);
                if (!t) return null;
                return AsciiToString(t);
              }
              childrenForFieldName(e) {
                const t = this.tree.language.fields.indexOf(e);
                return -1 !== t && 0 !== t ? this.childrenForFieldId(t) : [];
              }
              childrenForFieldId(e) {
                marshalNode(this), C._ts_node_children_by_field_id_wasm(this.tree[0], e);
                const t = getValue(TRANSFER_BUFFER, "i32"), _ = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), s = new Array(t);
                if (t > 0) {
                  let e2 = _;
                  for (let _2 = 0; _2 < t; _2++) s[_2] = unmarshalNode(this.tree, e2), e2 += SIZE_OF_NODE;
                  C._free(_);
                }
                return s;
              }
              firstChildForIndex(e) {
                marshalNode(this);
                return setValue(TRANSFER_BUFFER + SIZE_OF_NODE, e, "i32"), C._ts_node_first_child_for_byte_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              firstNamedChildForIndex(e) {
                marshalNode(this);
                return setValue(TRANSFER_BUFFER + SIZE_OF_NODE, e, "i32"), C._ts_node_first_named_child_for_byte_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get childCount() {
                return marshalNode(this), C._ts_node_child_count_wasm(this.tree[0]);
              }
              get namedChildCount() {
                return marshalNode(this), C._ts_node_named_child_count_wasm(this.tree[0]);
              }
              get firstChild() {
                return this.child(0);
              }
              get firstNamedChild() {
                return this.namedChild(0);
              }
              get lastChild() {
                return this.child(this.childCount - 1);
              }
              get lastNamedChild() {
                return this.namedChild(this.namedChildCount - 1);
              }
              get children() {
                if (!this._children) {
                  marshalNode(this), C._ts_node_children_wasm(this.tree[0]);
                  const e = getValue(TRANSFER_BUFFER, "i32"), t = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
                  if (this._children = new Array(e), e > 0) {
                    let _ = t;
                    for (let t2 = 0; t2 < e; t2++) this._children[t2] = unmarshalNode(this.tree, _), _ += SIZE_OF_NODE;
                    C._free(t);
                  }
                }
                return this._children;
              }
              get namedChildren() {
                if (!this._namedChildren) {
                  marshalNode(this), C._ts_node_named_children_wasm(this.tree[0]);
                  const e = getValue(TRANSFER_BUFFER, "i32"), t = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
                  if (this._namedChildren = new Array(e), e > 0) {
                    let _ = t;
                    for (let t2 = 0; t2 < e; t2++) this._namedChildren[t2] = unmarshalNode(this.tree, _), _ += SIZE_OF_NODE;
                    C._free(t);
                  }
                }
                return this._namedChildren;
              }
              descendantsOfType(e, t, _) {
                Array.isArray(e) || (e = [e]), t || (t = ZERO_POINT), _ || (_ = ZERO_POINT);
                const s = [], r = this.tree.language.types;
                for (let t2 = 0, _2 = r.length; t2 < _2; t2++) e.includes(r[t2]) && s.push(t2);
                const a = C._malloc(SIZE_OF_INT * s.length);
                for (let e2 = 0, t2 = s.length; e2 < t2; e2++) setValue(a + e2 * SIZE_OF_INT, s[e2], "i32");
                marshalNode(this), C._ts_node_descendants_of_type_wasm(this.tree[0], a, s.length, t.row, t.column, _.row, _.column);
                const o = getValue(TRANSFER_BUFFER, "i32"), n = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), l = new Array(o);
                if (o > 0) {
                  let e2 = n;
                  for (let t2 = 0; t2 < o; t2++) l[t2] = unmarshalNode(this.tree, e2), e2 += SIZE_OF_NODE;
                }
                return C._free(n), C._free(a), l;
              }
              get nextSibling() {
                return marshalNode(this), C._ts_node_next_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get previousSibling() {
                return marshalNode(this), C._ts_node_prev_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get nextNamedSibling() {
                return marshalNode(this), C._ts_node_next_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get previousNamedSibling() {
                return marshalNode(this), C._ts_node_prev_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get descendantCount() {
                return marshalNode(this), C._ts_node_descendant_count_wasm(this.tree[0]);
              }
              get parent() {
                return marshalNode(this), C._ts_node_parent_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              descendantForIndex(e, t = e) {
                if ("number" != typeof e || "number" != typeof t) throw new Error("Arguments must be numbers");
                marshalNode(this);
                const _ = TRANSFER_BUFFER + SIZE_OF_NODE;
                return setValue(_, e, "i32"), setValue(_ + SIZE_OF_INT, t, "i32"), C._ts_node_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              namedDescendantForIndex(e, t = e) {
                if ("number" != typeof e || "number" != typeof t) throw new Error("Arguments must be numbers");
                marshalNode(this);
                const _ = TRANSFER_BUFFER + SIZE_OF_NODE;
                return setValue(_, e, "i32"), setValue(_ + SIZE_OF_INT, t, "i32"), C._ts_node_named_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              descendantForPosition(e, t = e) {
                if (!isPoint(e) || !isPoint(t)) throw new Error("Arguments must be {row, column} objects");
                marshalNode(this);
                const _ = TRANSFER_BUFFER + SIZE_OF_NODE;
                return marshalPoint(_, e), marshalPoint(_ + SIZE_OF_POINT, t), C._ts_node_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              namedDescendantForPosition(e, t = e) {
                if (!isPoint(e) || !isPoint(t)) throw new Error("Arguments must be {row, column} objects");
                marshalNode(this);
                const _ = TRANSFER_BUFFER + SIZE_OF_NODE;
                return marshalPoint(_, e), marshalPoint(_ + SIZE_OF_POINT, t), C._ts_node_named_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              walk() {
                return marshalNode(this), C._ts_tree_cursor_new_wasm(this.tree[0]), new TreeCursor(INTERNAL, this.tree);
              }
              toString() {
                marshalNode(this);
                const e = C._ts_node_to_string_wasm(this.tree[0]), t = AsciiToString(e);
                return C._free(e), t;
              }
            }
            class TreeCursor {
              constructor(e, t) {
                assertInternal(e), this.tree = t, unmarshalTreeCursor(this);
              }
              delete() {
                marshalTreeCursor(this), C._ts_tree_cursor_delete_wasm(this.tree[0]), this[0] = this[1] = this[2] = 0;
              }
              reset(e) {
                marshalNode(e), marshalTreeCursor(this, TRANSFER_BUFFER + SIZE_OF_NODE), C._ts_tree_cursor_reset_wasm(this.tree[0]), unmarshalTreeCursor(this);
              }
              resetTo(e) {
                marshalTreeCursor(this, TRANSFER_BUFFER), marshalTreeCursor(e, TRANSFER_BUFFER + SIZE_OF_CURSOR), C._ts_tree_cursor_reset_to_wasm(this.tree[0], e.tree[0]), unmarshalTreeCursor(this);
              }
              get nodeType() {
                return this.tree.language.types[this.nodeTypeId] || "ERROR";
              }
              get nodeTypeId() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_type_id_wasm(this.tree[0]);
              }
              get nodeStateId() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_state_id_wasm(this.tree[0]);
              }
              get nodeId() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_id_wasm(this.tree[0]);
              }
              get nodeIsNamed() {
                return marshalTreeCursor(this), 1 === C._ts_tree_cursor_current_node_is_named_wasm(this.tree[0]);
              }
              get nodeIsMissing() {
                return marshalTreeCursor(this), 1 === C._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0]);
              }
              get nodeText() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_start_index_wasm(this.tree[0]), t = C._ts_tree_cursor_end_index_wasm(this.tree[0]);
                return getText(this.tree, e, t);
              }
              get startPosition() {
                return marshalTreeCursor(this), C._ts_tree_cursor_start_position_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
              }
              get endPosition() {
                return marshalTreeCursor(this), C._ts_tree_cursor_end_position_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
              }
              get startIndex() {
                return marshalTreeCursor(this), C._ts_tree_cursor_start_index_wasm(this.tree[0]);
              }
              get endIndex() {
                return marshalTreeCursor(this), C._ts_tree_cursor_end_index_wasm(this.tree[0]);
              }
              get currentNode() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get currentFieldId() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_field_id_wasm(this.tree[0]);
              }
              get currentFieldName() {
                return this.tree.language.fields[this.currentFieldId];
              }
              get currentDepth() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_depth_wasm(this.tree[0]);
              }
              get currentDescendantIndex() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_descendant_index_wasm(this.tree[0]);
              }
              gotoFirstChild() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_goto_first_child_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === e;
              }
              gotoLastChild() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_goto_last_child_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === e;
              }
              gotoFirstChildForIndex(e) {
                marshalTreeCursor(this), setValue(TRANSFER_BUFFER + SIZE_OF_CURSOR, e, "i32");
                const t = C._ts_tree_cursor_goto_first_child_for_index_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === t;
              }
              gotoFirstChildForPosition(e) {
                marshalTreeCursor(this), marshalPoint(TRANSFER_BUFFER + SIZE_OF_CURSOR, e);
                const t = C._ts_tree_cursor_goto_first_child_for_position_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === t;
              }
              gotoNextSibling() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === e;
              }
              gotoPreviousSibling() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_goto_previous_sibling_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === e;
              }
              gotoDescendant(e) {
                marshalTreeCursor(this), C._ts_tree_cursor_goto_descendant_wasm(this.tree[0], e), unmarshalTreeCursor(this);
              }
              gotoParent() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_goto_parent_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === e;
              }
            }
            class Language {
              constructor(e, t) {
                assertInternal(e), this[0] = t, this.types = new Array(C._ts_language_symbol_count(this[0]));
                for (let e2 = 0, t2 = this.types.length; e2 < t2; e2++) C._ts_language_symbol_type(this[0], e2) < 2 && (this.types[e2] = UTF8ToString(C._ts_language_symbol_name(this[0], e2)));
                this.fields = new Array(C._ts_language_field_count(this[0]) + 1);
                for (let e2 = 0, t2 = this.fields.length; e2 < t2; e2++) {
                  const t3 = C._ts_language_field_name_for_id(this[0], e2);
                  this.fields[e2] = 0 !== t3 ? UTF8ToString(t3) : null;
                }
              }
              get version() {
                return C._ts_language_version(this[0]);
              }
              get fieldCount() {
                return this.fields.length - 1;
              }
              get stateCount() {
                return C._ts_language_state_count(this[0]);
              }
              fieldIdForName(e) {
                const t = this.fields.indexOf(e);
                return -1 !== t ? t : null;
              }
              fieldNameForId(e) {
                return this.fields[e] || null;
              }
              idForNodeType(e, t) {
                const _ = lengthBytesUTF8(e), s = C._malloc(_ + 1);
                stringToUTF8(e, s, _ + 1);
                const r = C._ts_language_symbol_for_name(this[0], s, _, t);
                return C._free(s), r || null;
              }
              get nodeTypeCount() {
                return C._ts_language_symbol_count(this[0]);
              }
              nodeTypeForId(e) {
                const t = C._ts_language_symbol_name(this[0], e);
                return t ? UTF8ToString(t) : null;
              }
              nodeTypeIsNamed(e) {
                return !!C._ts_language_type_is_named_wasm(this[0], e);
              }
              nodeTypeIsVisible(e) {
                return !!C._ts_language_type_is_visible_wasm(this[0], e);
              }
              nextState(e, t) {
                return C._ts_language_next_state(this[0], e, t);
              }
              lookaheadIterator(e) {
                const t = C._ts_lookahead_iterator_new(this[0], e);
                return t ? new LookaheadIterable(INTERNAL, t, this) : null;
              }
              query(e) {
                const t = lengthBytesUTF8(e), _ = C._malloc(t + 1);
                stringToUTF8(e, _, t + 1);
                const s = C._ts_query_new(this[0], _, t, TRANSFER_BUFFER, TRANSFER_BUFFER + SIZE_OF_INT);
                if (!s) {
                  const t2 = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), s2 = getValue(TRANSFER_BUFFER, "i32"), r2 = UTF8ToString(_, s2).length, a2 = e.substr(r2, 100).split("\n")[0];
                  let o2, n2 = a2.match(QUERY_WORD_REGEX)[0];
                  switch (t2) {
                    case 2:
                      o2 = new RangeError(`Bad node name '${n2}'`);
                      break;
                    case 3:
                      o2 = new RangeError(`Bad field name '${n2}'`);
                      break;
                    case 4:
                      o2 = new RangeError(`Bad capture name @${n2}`);
                      break;
                    case 5:
                      o2 = new TypeError(`Bad pattern structure at offset ${r2}: '${a2}'...`), n2 = "";
                      break;
                    default:
                      o2 = new SyntaxError(`Bad syntax at offset ${r2}: '${a2}'...`), n2 = "";
                  }
                  throw o2.index = r2, o2.length = n2.length, C._free(_), o2;
                }
                const r = C._ts_query_string_count(s), a = C._ts_query_capture_count(s), o = C._ts_query_pattern_count(s), n = new Array(a), l = new Array(r);
                for (let e2 = 0; e2 < a; e2++) {
                  const t2 = C._ts_query_capture_name_for_id(s, e2, TRANSFER_BUFFER), _2 = getValue(TRANSFER_BUFFER, "i32");
                  n[e2] = UTF8ToString(t2, _2);
                }
                for (let e2 = 0; e2 < r; e2++) {
                  const t2 = C._ts_query_string_value_for_id(s, e2, TRANSFER_BUFFER), _2 = getValue(TRANSFER_BUFFER, "i32");
                  l[e2] = UTF8ToString(t2, _2);
                }
                const d = new Array(o), u = new Array(o), m = new Array(o), c = new Array(o), w = new Array(o);
                for (let e2 = 0; e2 < o; e2++) {
                  const t2 = C._ts_query_predicates_for_pattern(s, e2, TRANSFER_BUFFER), _2 = getValue(TRANSFER_BUFFER, "i32");
                  c[e2] = [], w[e2] = [];
                  const r2 = [];
                  let a2 = t2;
                  for (let t3 = 0; t3 < _2; t3++) {
                    const t4 = getValue(a2, "i32");
                    a2 += SIZE_OF_INT;
                    const _3 = getValue(a2, "i32");
                    if (a2 += SIZE_OF_INT, t4 === PREDICATE_STEP_TYPE_CAPTURE) r2.push({ type: "capture", name: n[_3] });
                    else if (t4 === PREDICATE_STEP_TYPE_STRING) r2.push({ type: "string", value: l[_3] });
                    else if (r2.length > 0) {
                      if ("string" !== r2[0].type) throw new Error("Predicates must begin with a literal value");
                      const t5 = r2[0].value;
                      let _4, s2 = true, a3 = true;
                      switch (t5) {
                        case "any-not-eq?":
                        case "not-eq?":
                          s2 = false;
                        case "any-eq?":
                        case "eq?":
                          if (3 !== r2.length) throw new Error(`Wrong number of arguments to \`#${t5}\` predicate. Expected 2, got ${r2.length - 1}`);
                          if ("capture" !== r2[1].type) throw new Error(`First argument of \`#${t5}\` predicate must be a capture. Got "${r2[1].value}"`);
                          if (a3 = !t5.startsWith("any-"), "capture" === r2[2].type) {
                            const t6 = r2[1].name, _5 = r2[2].name;
                            w[e2].push(((e3) => {
                              const r3 = [], o3 = [];
                              for (const s3 of e3) s3.name === t6 && r3.push(s3.node), s3.name === _5 && o3.push(s3.node);
                              const n3 = (e4, t7, _6) => _6 ? e4.text === t7.text : e4.text !== t7.text;
                              return a3 ? r3.every(((e4) => o3.some(((t7) => n3(e4, t7, s2))))) : r3.some(((e4) => o3.some(((t7) => n3(e4, t7, s2)))));
                            }));
                          } else {
                            _4 = r2[1].name;
                            const t6 = r2[2].value, o3 = (e3) => e3.text === t6, n3 = (e3) => e3.text !== t6;
                            w[e2].push(((e3) => {
                              const t7 = [];
                              for (const s3 of e3) s3.name === _4 && t7.push(s3.node);
                              const r3 = s2 ? o3 : n3;
                              return a3 ? t7.every(r3) : t7.some(r3);
                            }));
                          }
                          break;
                        case "any-not-match?":
                        case "not-match?":
                          s2 = false;
                        case "any-match?":
                        case "match?":
                          if (3 !== r2.length) throw new Error(`Wrong number of arguments to \`#${t5}\` predicate. Expected 2, got ${r2.length - 1}.`);
                          if ("capture" !== r2[1].type) throw new Error(`First argument of \`#${t5}\` predicate must be a capture. Got "${r2[1].value}".`);
                          if ("string" !== r2[2].type) throw new Error(`Second argument of \`#${t5}\` predicate must be a string. Got @${r2[2].value}.`);
                          _4 = r2[1].name;
                          const o2 = new RegExp(r2[2].value);
                          a3 = !t5.startsWith("any-"), w[e2].push(((e3) => {
                            const t6 = [];
                            for (const s3 of e3) s3.name === _4 && t6.push(s3.node.text);
                            const r3 = (e4, t7) => t7 ? o2.test(e4) : !o2.test(e4);
                            return 0 === t6.length ? !s2 : a3 ? t6.every(((e4) => r3(e4, s2))) : t6.some(((e4) => r3(e4, s2)));
                          }));
                          break;
                        case "set!":
                          if (r2.length < 2 || r2.length > 3) throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${r2.length - 1}.`);
                          if (r2.some(((e3) => "string" !== e3.type))) throw new Error('Arguments to `#set!` predicate must be a strings.".');
                          d[e2] || (d[e2] = {}), d[e2][r2[1].value] = r2[2] ? r2[2].value : null;
                          break;
                        case "is?":
                        case "is-not?":
                          if (r2.length < 2 || r2.length > 3) throw new Error(`Wrong number of arguments to \`#${t5}\` predicate. Expected 1 or 2. Got ${r2.length - 1}.`);
                          if (r2.some(((e3) => "string" !== e3.type))) throw new Error(`Arguments to \`#${t5}\` predicate must be a strings.".`);
                          const n2 = "is?" === t5 ? u : m;
                          n2[e2] || (n2[e2] = {}), n2[e2][r2[1].value] = r2[2] ? r2[2].value : null;
                          break;
                        case "not-any-of?":
                          s2 = false;
                        case "any-of?":
                          if (r2.length < 2) throw new Error(`Wrong number of arguments to \`#${t5}\` predicate. Expected at least 1. Got ${r2.length - 1}.`);
                          if ("capture" !== r2[1].type) throw new Error(`First argument of \`#${t5}\` predicate must be a capture. Got "${r2[1].value}".`);
                          for (let e3 = 2; e3 < r2.length; e3++) if ("string" !== r2[e3].type) throw new Error(`Arguments to \`#${t5}\` predicate must be a strings.".`);
                          _4 = r2[1].name;
                          const l2 = r2.slice(2).map(((e3) => e3.value));
                          w[e2].push(((e3) => {
                            const t6 = [];
                            for (const s3 of e3) s3.name === _4 && t6.push(s3.node.text);
                            return 0 === t6.length ? !s2 : t6.every(((e4) => l2.includes(e4))) === s2;
                          }));
                          break;
                        default:
                          c[e2].push({ operator: t5, operands: r2.slice(1) });
                      }
                      r2.length = 0;
                    }
                  }
                  Object.freeze(d[e2]), Object.freeze(u[e2]), Object.freeze(m[e2]);
                }
                return C._free(_), new Query(INTERNAL, s, n, w, c, Object.freeze(d), Object.freeze(u), Object.freeze(m));
              }
              static load(e) {
                let t;
                if (e instanceof Uint8Array) t = Promise.resolve(e);
                else {
                  const _ = e;
                  if ("undefined" != typeof process && process.versions && process.versions.node) {
                    const e2 = require("fs");
                    t = Promise.resolve(e2.readFileSync(_));
                  } else t = fetch(_).then(((e2) => e2.arrayBuffer().then(((t2) => {
                    if (e2.ok) return new Uint8Array(t2);
                    {
                      const _2 = new TextDecoder("utf-8").decode(t2);
                      throw new Error(`Language.load failed with status ${e2.status}.

${_2}`);
                    }
                  }))));
                }
                return t.then(((e2) => loadWebAssemblyModule(e2, { loadAsync: true }))).then(((e2) => {
                  const t2 = Object.keys(e2), _ = t2.find(((e3) => LANGUAGE_FUNCTION_REGEX.test(e3) && !e3.includes("external_scanner_")));
                  _ || console.log(`Couldn't find language function in WASM file. Symbols:
${JSON.stringify(t2, null, 2)}`);
                  const s = e2[_]();
                  return new Language(INTERNAL, s);
                }));
              }
            }
            class LookaheadIterable {
              constructor(e, t, _) {
                assertInternal(e), this[0] = t, this.language = _;
              }
              get currentTypeId() {
                return C._ts_lookahead_iterator_current_symbol(this[0]);
              }
              get currentType() {
                return this.language.types[this.currentTypeId] || "ERROR";
              }
              delete() {
                C._ts_lookahead_iterator_delete(this[0]), this[0] = 0;
              }
              resetState(e) {
                return C._ts_lookahead_iterator_reset_state(this[0], e);
              }
              reset(e, t) {
                return !!C._ts_lookahead_iterator_reset(this[0], e[0], t) && (this.language = e, true);
              }
              [Symbol.iterator]() {
                const e = this;
                return { next: () => C._ts_lookahead_iterator_next(e[0]) ? { done: false, value: e.currentType } : { done: true, value: "" } };
              }
            }
            class Query {
              constructor(e, t, _, s, r, a, o, n) {
                assertInternal(e), this[0] = t, this.captureNames = _, this.textPredicates = s, this.predicates = r, this.setProperties = a, this.assertedProperties = o, this.refutedProperties = n, this.exceededMatchLimit = false;
              }
              delete() {
                C._ts_query_delete(this[0]), this[0] = 0;
              }
              matches(e, { startPosition: t = ZERO_POINT, endPosition: _ = ZERO_POINT, startIndex: s = 0, endIndex: r = 0, matchLimit: a = 4294967295, maxStartDepth: o = 4294967295 } = {}) {
                if ("number" != typeof a) throw new Error("Arguments must be numbers");
                marshalNode(e), C._ts_query_matches_wasm(this[0], e.tree[0], t.row, t.column, _.row, _.column, s, r, a, o);
                const n = getValue(TRANSFER_BUFFER, "i32"), l = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), d = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"), u = new Array(n);
                this.exceededMatchLimit = Boolean(d);
                let m = 0, c = l;
                for (let t2 = 0; t2 < n; t2++) {
                  const t3 = getValue(c, "i32");
                  c += SIZE_OF_INT;
                  const _2 = getValue(c, "i32");
                  c += SIZE_OF_INT;
                  const s2 = new Array(_2);
                  if (c = unmarshalCaptures(this, e.tree, c, s2), this.textPredicates[t3].every(((e2) => e2(s2)))) {
                    u[m] = { pattern: t3, captures: s2 };
                    const e2 = this.setProperties[t3];
                    e2 && (u[m].setProperties = e2);
                    const _3 = this.assertedProperties[t3];
                    _3 && (u[m].assertedProperties = _3);
                    const r2 = this.refutedProperties[t3];
                    r2 && (u[m].refutedProperties = r2), m++;
                  }
                }
                return u.length = m, C._free(l), u;
              }
              captures(e, { startPosition: t = ZERO_POINT, endPosition: _ = ZERO_POINT, startIndex: s = 0, endIndex: r = 0, matchLimit: a = 4294967295, maxStartDepth: o = 4294967295 } = {}) {
                if ("number" != typeof a) throw new Error("Arguments must be numbers");
                marshalNode(e), C._ts_query_captures_wasm(this[0], e.tree[0], t.row, t.column, _.row, _.column, s, r, a, o);
                const n = getValue(TRANSFER_BUFFER, "i32"), l = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), d = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"), u = [];
                this.exceededMatchLimit = Boolean(d);
                const m = [];
                let c = l;
                for (let t2 = 0; t2 < n; t2++) {
                  const t3 = getValue(c, "i32");
                  c += SIZE_OF_INT;
                  const _2 = getValue(c, "i32");
                  c += SIZE_OF_INT;
                  const s2 = getValue(c, "i32");
                  if (c += SIZE_OF_INT, m.length = _2, c = unmarshalCaptures(this, e.tree, c, m), this.textPredicates[t3].every(((e2) => e2(m)))) {
                    const e2 = m[s2], _3 = this.setProperties[t3];
                    _3 && (e2.setProperties = _3);
                    const r2 = this.assertedProperties[t3];
                    r2 && (e2.assertedProperties = r2);
                    const a2 = this.refutedProperties[t3];
                    a2 && (e2.refutedProperties = a2), u.push(e2);
                  }
                }
                return C._free(l), u;
              }
              predicatesForPattern(e) {
                return this.predicates[e];
              }
              disableCapture(e) {
                const t = lengthBytesUTF8(e), _ = C._malloc(t + 1);
                stringToUTF8(e, _, t + 1), C._ts_query_disable_capture(this[0], _, t), C._free(_);
              }
              didExceedMatchLimit() {
                return this.exceededMatchLimit;
              }
            }
            function getText(e, t, _) {
              const s = _ - t;
              let r = e.textCallback(t, null, _);
              for (t += r.length; t < _; ) {
                const s2 = e.textCallback(t, null, _);
                if (!(s2 && s2.length > 0)) break;
                t += s2.length, r += s2;
              }
              return t > _ && (r = r.slice(0, s)), r;
            }
            function unmarshalCaptures(e, t, _, s) {
              for (let r = 0, a = s.length; r < a; r++) {
                const a2 = getValue(_, "i32"), o = unmarshalNode(t, _ += SIZE_OF_INT);
                _ += SIZE_OF_NODE, s[r] = { name: e.captureNames[a2], node: o };
              }
              return _;
            }
            function assertInternal(e) {
              if (e !== INTERNAL) throw new Error("Illegal constructor");
            }
            function isPoint(e) {
              return e && "number" == typeof e.row && "number" == typeof e.column;
            }
            function marshalNode(e) {
              let t = TRANSFER_BUFFER;
              setValue(t, e.id, "i32"), t += SIZE_OF_INT, setValue(t, e.startIndex, "i32"), t += SIZE_OF_INT, setValue(t, e.startPosition.row, "i32"), t += SIZE_OF_INT, setValue(t, e.startPosition.column, "i32"), t += SIZE_OF_INT, setValue(t, e[0], "i32");
            }
            function unmarshalNode(e, t = TRANSFER_BUFFER) {
              const _ = getValue(t, "i32");
              if (0 === _) return null;
              const s = getValue(t += SIZE_OF_INT, "i32"), r = getValue(t += SIZE_OF_INT, "i32"), a = getValue(t += SIZE_OF_INT, "i32"), o = getValue(t += SIZE_OF_INT, "i32"), n = new Node(INTERNAL, e);
              return n.id = _, n.startIndex = s, n.startPosition = { row: r, column: a }, n[0] = o, n;
            }
            function marshalTreeCursor(e, t = TRANSFER_BUFFER) {
              setValue(t + 0 * SIZE_OF_INT, e[0], "i32"), setValue(t + 1 * SIZE_OF_INT, e[1], "i32"), setValue(t + 2 * SIZE_OF_INT, e[2], "i32"), setValue(t + 3 * SIZE_OF_INT, e[3], "i32");
            }
            function unmarshalTreeCursor(e) {
              e[0] = getValue(TRANSFER_BUFFER + 0 * SIZE_OF_INT, "i32"), e[1] = getValue(TRANSFER_BUFFER + 1 * SIZE_OF_INT, "i32"), e[2] = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"), e[3] = getValue(TRANSFER_BUFFER + 3 * SIZE_OF_INT, "i32");
            }
            function marshalPoint(e, t) {
              setValue(e, t.row, "i32"), setValue(e + SIZE_OF_INT, t.column, "i32");
            }
            function unmarshalPoint(e) {
              return { row: getValue(e, "i32") >>> 0, column: getValue(e + SIZE_OF_INT, "i32") >>> 0 };
            }
            function marshalRange(e, t) {
              marshalPoint(e, t.startPosition), marshalPoint(e += SIZE_OF_POINT, t.endPosition), setValue(e += SIZE_OF_POINT, t.startIndex, "i32"), setValue(e += SIZE_OF_INT, t.endIndex, "i32"), e += SIZE_OF_INT;
            }
            function unmarshalRange(e) {
              const t = {};
              return t.startPosition = unmarshalPoint(e), e += SIZE_OF_POINT, t.endPosition = unmarshalPoint(e), e += SIZE_OF_POINT, t.startIndex = getValue(e, "i32") >>> 0, e += SIZE_OF_INT, t.endIndex = getValue(e, "i32") >>> 0, t;
            }
            function marshalEdit(e) {
              let t = TRANSFER_BUFFER;
              marshalPoint(t, e.startPosition), t += SIZE_OF_POINT, marshalPoint(t, e.oldEndPosition), t += SIZE_OF_POINT, marshalPoint(t, e.newEndPosition), t += SIZE_OF_POINT, setValue(t, e.startIndex, "i32"), t += SIZE_OF_INT, setValue(t, e.oldEndIndex, "i32"), t += SIZE_OF_INT, setValue(t, e.newEndIndex, "i32"), t += SIZE_OF_INT;
            }
            for (const e of Object.getOwnPropertyNames(ParserImpl.prototype)) Object.defineProperty(Parser.prototype, e, { value: ParserImpl.prototype[e], enumerable: false, writable: false });
            Parser.Language = Language, Module.onRuntimeInitialized = () => {
              ParserImpl.init(), resolveInitPromise();
            };
          })));
        }
      }
      return Parser;
    })();
    "object" == typeof exports && (module.exports = TreeSitter);
  }
});

// node_modules/@xenova/transformers/src/utils/core.js
function dispatchCallback(progress_callback, data) {
  if (progress_callback !== null) progress_callback(data);
}
function reverseDictionary(data) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function isString(text) {
  return typeof text === "string" || text instanceof String;
}
function isTypedArray(val) {
  return val?.prototype?.__proto__?.constructor?.name === "TypedArray";
}
function isIntegralNumber(x) {
  return Number.isInteger(x) || typeof x === "bigint";
}
function exists(x) {
  return x !== void 0 && x !== null;
}
function calculateDimensions(arr) {
  const dimensions = [];
  let current = arr;
  while (Array.isArray(current)) {
    dimensions.push(current.length);
    current = current[0];
  }
  return dimensions;
}
var Callable;
var init_core = __esm({
  "node_modules/@xenova/transformers/src/utils/core.js"() {
    Callable = /** @type {any} */
    class {
      /**
      * Creates a new instance of the Callable class.
      */
      constructor() {
        let closure = function(...args2) {
          return closure._call(...args2);
        };
        return Object.setPrototypeOf(closure, new.target.prototype);
      }
      /**
       * This method should be implemented in subclasses to provide the
       * functionality of the callable object.
       *
       * @param {any[]} args
       * @throws {Error} If the subclass does not implement the `_call` method.
       */
      _call(...args2) {
        throw Error("Must implement _call method in subclass");
      }
    };
  }
});

// node_modules/onnxruntime-common/dist/ort-common.node.js
var require_ort_common_node = __commonJS({
  "node_modules/onnxruntime-common/dist/ort-common.node.js"(exports2) {
    (() => {
      "use strict";
      var e = { d: (t2, r2) => {
        for (var n2 in r2) e.o(r2, n2) && !e.o(t2, n2) && Object.defineProperty(t2, n2, { enumerable: true, get: r2[n2] });
      }, o: (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r: (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      } }, t = {};
      e.r(t), e.d(t, { InferenceSession: () => c, Tensor: () => g2, env: () => i2, registerBackend: () => o });
      const r = {}, n = [], o = (e2, t2, o2) => {
        if (!t2 || "function" != typeof t2.init || "function" != typeof t2.createSessionHandler) throw new TypeError("not a valid backend");
        {
          const i3 = r[e2];
          if (void 0 === i3) r[e2] = { backend: t2, priority: o2 };
          else {
            if (i3.priority > o2) return;
            if (i3.priority === o2 && i3.backend !== t2) throw new Error(`cannot register backend "${e2}" using priority ${o2}`);
          }
          if (o2 >= 0) {
            const t3 = n.indexOf(e2);
            -1 !== t3 && n.splice(t3, 1);
            for (let t4 = 0; t4 < n.length; t4++) if (r[n[t4]].priority <= o2) return void n.splice(t4, 0, e2);
            n.push(e2);
          }
        }
      }, i2 = new class {
        constructor() {
          this.wasm = {}, this.webgl = {}, this.logLevelInternal = "warning";
        }
        set logLevel(e2) {
          if (void 0 !== e2) {
            if ("string" != typeof e2 || -1 === ["verbose", "info", "warning", "error", "fatal"].indexOf(e2)) throw new Error(`Unsupported logging level: ${e2}`);
            this.logLevelInternal = e2;
          }
        }
        get logLevel() {
          return this.logLevelInternal;
        }
      }(), a = "undefined" != typeof BigInt64Array && "function" == typeof BigInt64Array.from, s = "undefined" != typeof BigUint64Array && "function" == typeof BigUint64Array.from, d = /* @__PURE__ */ new Map([["float32", Float32Array], ["uint8", Uint8Array], ["int8", Int8Array], ["uint16", Uint16Array], ["int16", Int16Array], ["int32", Int32Array], ["bool", Uint8Array], ["float64", Float64Array], ["uint32", Uint32Array]]), f = /* @__PURE__ */ new Map([[Float32Array, "float32"], [Uint8Array, "uint8"], [Int8Array, "int8"], [Uint16Array, "uint16"], [Int16Array, "int16"], [Int32Array, "int32"], [Float64Array, "float64"], [Uint32Array, "uint32"]]);
      a && (d.set("int64", BigInt64Array), f.set(BigInt64Array, "int64")), s && (d.set("uint64", BigUint64Array), f.set(BigUint64Array, "uint64"));
      class h {
        constructor(e2, t2, r2) {
          let n2, o2, i3;
          if ("string" == typeof e2) if (n2 = e2, i3 = r2, "string" === e2) {
            if (!Array.isArray(t2)) throw new TypeError("A string tensor's data must be a string array.");
            o2 = t2;
          } else {
            const r3 = d.get(e2);
            if (void 0 === r3) throw new TypeError(`Unsupported tensor type: ${e2}.`);
            if (Array.isArray(t2)) o2 = r3.from(t2);
            else {
              if (!(t2 instanceof r3)) throw new TypeError(`A ${n2} tensor's data must be type of ${r3}`);
              o2 = t2;
            }
          }
          else if (i3 = t2, Array.isArray(e2)) {
            if (0 === e2.length) throw new TypeError("Tensor type cannot be inferred from an empty array.");
            const t3 = typeof e2[0];
            if ("string" === t3) n2 = "string", o2 = e2;
            else {
              if ("boolean" !== t3) throw new TypeError(`Invalid element type of data array: ${t3}.`);
              n2 = "bool", o2 = Uint8Array.from(e2);
            }
          } else {
            const t3 = f.get(e2.constructor);
            if (void 0 === t3) throw new TypeError(`Unsupported type for tensor data: ${e2.constructor}.`);
            n2 = t3, o2 = e2;
          }
          if (void 0 === i3) i3 = [o2.length];
          else if (!Array.isArray(i3)) throw new TypeError("A tensor's dims must be a number array");
          const a2 = ((e3) => {
            let t3 = 1;
            for (let r3 = 0; r3 < e3.length; r3++) {
              const n3 = e3[r3];
              if ("number" != typeof n3 || !Number.isSafeInteger(n3)) throw new TypeError(`dims[${r3}] must be an integer, got: ${n3}`);
              if (n3 < 0) throw new RangeError(`dims[${r3}] must be a non-negative integer, got: ${n3}`);
              t3 *= n3;
            }
            return t3;
          })(i3);
          if (a2 !== o2.length) throw new Error(`Tensor's size(${a2}) does not match data length(${o2.length}).`);
          this.dims = i3, this.type = n2, this.data = o2, this.size = a2;
        }
        static bufferToTensor(e2, t2) {
          if (void 0 === e2) throw new Error("Image buffer must be defined");
          if (void 0 === t2.height || void 0 === t2.width) throw new Error("Image height and width must be defined");
          const { height: r2, width: n2 } = t2, o2 = t2.norm;
          let i3, a2;
          i3 = void 0 === o2 || void 0 === o2.mean ? 255 : o2.mean, a2 = void 0 === o2 || void 0 === o2.bias ? 0 : o2.bias;
          const s2 = void 0 !== t2.bitmapFormat ? t2.bitmapFormat : "RGBA", d2 = void 0 !== t2.tensorFormat && void 0 !== t2.tensorFormat ? t2.tensorFormat : "RGB", f2 = r2 * n2, g3 = "RGBA" === d2 ? new Float32Array(4 * f2) : new Float32Array(3 * f2);
          let m2 = 4, c2 = 0, l2 = 1, w2 = 2, u = 3, p = 0, y = f2, b = 2 * f2, v = -1;
          "RGB" === s2 && (m2 = 3, c2 = 0, l2 = 1, w2 = 2, u = -1), "RGBA" === d2 ? v = 3 * f2 : "RBG" === d2 ? (p = 0, b = f2, y = 2 * f2) : "BGR" === d2 && (b = 0, y = f2, p = 2 * f2);
          for (let t3 = 0; t3 < f2; t3++, c2 += m2, w2 += m2, l2 += m2, u += m2) g3[p++] = (e2[c2] + a2) / i3, g3[y++] = (e2[l2] + a2) / i3, g3[b++] = (e2[w2] + a2) / i3, -1 !== v && -1 !== u && (g3[v++] = (e2[u] + a2) / i3);
          return new h("float32", g3, "RGBA" === d2 ? [1, 4, r2, n2] : [1, 3, r2, n2]);
        }
        static async fromImage(e2, t2) {
          const r2 = "undefined" != typeof HTMLImageElement && e2 instanceof HTMLImageElement, n2 = "undefined" != typeof ImageData && e2 instanceof ImageData, o2 = "undefined" != typeof ImageBitmap && e2 instanceof ImageBitmap, i3 = "undefined" != typeof String && (e2 instanceof String || "string" == typeof e2);
          let a2, s2 = {};
          if (r2) {
            const r3 = document.createElement("canvas"), n3 = r3.getContext("2d");
            if (null == n3) throw new Error("Can not access image data");
            {
              let o3 = e2.naturalHeight, i4 = e2.naturalWidth;
              if (void 0 !== t2 && void 0 !== t2.resizedHeight && void 0 !== t2.resizedWidth && (o3 = t2.resizedHeight, i4 = t2.resizedWidth), void 0 !== t2) {
                if (s2 = t2, void 0 !== t2.tensorFormat) throw new Error("Image input config format must be RGBA for HTMLImageElement");
                if (s2.tensorFormat = "RGBA", void 0 !== t2.height && t2.height !== o3) throw new Error("Image input config height doesn't match HTMLImageElement height");
                if (s2.height = o3, void 0 !== t2.width && t2.width !== i4) throw new Error("Image input config width doesn't match HTMLImageElement width");
                s2.width = i4;
              } else s2.tensorFormat = "RGBA", s2.height = o3, s2.width = i4;
              r3.width = i4, r3.height = o3, n3.drawImage(e2, 0, 0, i4, o3), a2 = n3.getImageData(0, 0, i4, o3).data;
            }
          } else {
            if (!n2) {
              if (o2) {
                if (void 0 === t2) throw new Error("Please provide image config with format for Imagebitmap");
                if (void 0 !== t2.bitmapFormat) throw new Error("Image input config format must be defined for ImageBitmap");
                const r3 = document.createElement("canvas").getContext("2d");
                if (null != r3) {
                  const n3 = e2.height, o3 = e2.width;
                  if (r3.drawImage(e2, 0, 0, o3, n3), a2 = r3.getImageData(0, 0, o3, n3).data, void 0 !== t2) {
                    if (void 0 !== t2.height && t2.height !== n3) throw new Error("Image input config height doesn't match ImageBitmap height");
                    if (s2.height = n3, void 0 !== t2.width && t2.width !== o3) throw new Error("Image input config width doesn't match ImageBitmap width");
                    s2.width = o3;
                  } else s2.height = n3, s2.width = o3;
                  return h.bufferToTensor(a2, s2);
                }
                throw new Error("Can not access image data");
              }
              if (i3) return new Promise(((r3, n3) => {
                const o3 = document.createElement("canvas"), i4 = o3.getContext("2d");
                if (!e2 || !i4) return n3();
                const a3 = new Image();
                a3.crossOrigin = "Anonymous", a3.src = e2, a3.onload = () => {
                  o3.width = a3.width, o3.height = a3.height, i4.drawImage(a3, 0, 0, o3.width, o3.height);
                  const e3 = i4.getImageData(0, 0, o3.width, o3.height);
                  if (void 0 !== t2) {
                    if (void 0 !== t2.height && t2.height !== o3.height) throw new Error("Image input config height doesn't match ImageBitmap height");
                    if (s2.height = o3.height, void 0 !== t2.width && t2.width !== o3.width) throw new Error("Image input config width doesn't match ImageBitmap width");
                    s2.width = o3.width;
                  } else s2.height = o3.height, s2.width = o3.width;
                  r3(h.bufferToTensor(e3.data, s2));
                };
              }));
              throw new Error("Input data provided is not supported - aborted tensor creation");
            }
            {
              const r3 = "RGBA";
              let n3, o3;
              if (void 0 !== t2 && void 0 !== t2.resizedWidth && void 0 !== t2.resizedHeight ? (n3 = t2.resizedHeight, o3 = t2.resizedWidth) : (n3 = e2.height, o3 = e2.width), void 0 !== t2) {
                if (s2 = t2, void 0 !== t2.bitmapFormat && t2.bitmapFormat !== r3) throw new Error("Image input config format must be RGBA for ImageData");
                s2.bitmapFormat = "RGBA";
              } else s2.bitmapFormat = "RGBA";
              if (s2.height = n3, s2.width = o3, void 0 !== t2) {
                const t3 = document.createElement("canvas");
                t3.width = o3, t3.height = n3;
                const r4 = t3.getContext("2d");
                if (null == r4) throw new Error("Can not access image data");
                r4.putImageData(e2, 0, 0), a2 = r4.getImageData(0, 0, o3, n3).data;
              } else a2 = e2.data;
            }
          }
          if (void 0 !== a2) return h.bufferToTensor(a2, s2);
          throw new Error("Input data provided is not supported - aborted tensor creation");
        }
        toImageData(e2) {
          var t2, r2;
          const n2 = document.createElement("canvas").getContext("2d");
          let o2;
          if (null == n2) throw new Error("Can not access image data");
          {
            const i3 = this.dims[3], a2 = this.dims[2], s2 = this.dims[1], d2 = void 0 !== e2 && void 0 !== e2.format ? e2.format : "RGB", f2 = void 0 !== e2 && void 0 !== (null === (t2 = e2.norm) || void 0 === t2 ? void 0 : t2.mean) ? e2.norm.mean : 255, h2 = void 0 !== e2 && void 0 !== (null === (r2 = e2.norm) || void 0 === r2 ? void 0 : r2.bias) ? e2.norm.bias : 0, g3 = a2 * i3;
            if (void 0 !== e2) {
              if (void 0 !== e2.height && e2.height !== a2) throw new Error("Image output config height doesn't match tensor height");
              if (void 0 !== e2.width && e2.width !== i3) throw new Error("Image output config width doesn't match tensor width");
              if (void 0 !== e2.format && 4 === s2 && "RGBA" !== e2.format || 3 === s2 && "RGB" !== e2.format && "BGR" !== e2.format) throw new Error("Tensor format doesn't match input tensor dims");
            }
            const m2 = 4;
            let c2 = 0, l2 = 1, w2 = 2, u = 3, p = 0, y = g3, b = 2 * g3, v = -1;
            "RGBA" === d2 ? (p = 0, y = g3, b = 2 * g3, v = 3 * g3) : "RGB" === d2 ? (p = 0, y = g3, b = 2 * g3) : "RBG" === d2 && (p = 0, b = g3, y = 2 * g3), o2 = n2.createImageData(i3, a2);
            for (let e3 = 0; e3 < a2 * i3; c2 += m2, l2 += m2, w2 += m2, u += m2, e3++) o2.data[c2] = (this.data[p++] - h2) * f2, o2.data[l2] = (this.data[y++] - h2) * f2, o2.data[w2] = (this.data[b++] - h2) * f2, o2.data[u] = -1 === v ? 255 : (this.data[v++] - h2) * f2;
          }
          return o2;
        }
        reshape(e2) {
          return new h(this.type, this.data, e2);
        }
      }
      const g2 = h;
      class m {
        constructor(e2) {
          this.handler = e2;
        }
        async run(e2, t2, r2) {
          const n2 = {};
          let o2 = {};
          if ("object" != typeof e2 || null === e2 || e2 instanceof g2 || Array.isArray(e2)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
          let i3 = true;
          if ("object" == typeof t2) {
            if (null === t2) throw new TypeError("Unexpected argument[1]: cannot be null.");
            if (t2 instanceof g2) throw new TypeError("'fetches' cannot be a Tensor");
            if (Array.isArray(t2)) {
              if (0 === t2.length) throw new TypeError("'fetches' cannot be an empty array.");
              i3 = false;
              for (const e3 of t2) {
                if ("string" != typeof e3) throw new TypeError("'fetches' must be a string array or an object.");
                if (-1 === this.outputNames.indexOf(e3)) throw new RangeError(`'fetches' contains invalid output name: ${e3}.`);
                n2[e3] = null;
              }
              if ("object" == typeof r2 && null !== r2) o2 = r2;
              else if (void 0 !== r2) throw new TypeError("'options' must be an object.");
            } else {
              let e3 = false;
              const a3 = Object.getOwnPropertyNames(t2);
              for (const r3 of this.outputNames) if (-1 !== a3.indexOf(r3)) {
                const o3 = t2[r3];
                (null === o3 || o3 instanceof g2) && (e3 = true, i3 = false, n2[r3] = o3);
              }
              if (e3) {
                if ("object" == typeof r2 && null !== r2) o2 = r2;
                else if (void 0 !== r2) throw new TypeError("'options' must be an object.");
              } else o2 = t2;
            }
          } else if (void 0 !== t2) throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
          for (const t3 of this.inputNames) if (void 0 === e2[t3]) throw new Error(`input '${t3}' is missing in 'feeds'.`);
          if (i3) for (const e3 of this.outputNames) n2[e3] = null;
          const a2 = await this.handler.run(e2, n2, o2), s2 = {};
          for (const e3 in a2) Object.hasOwnProperty.call(a2, e3) && (s2[e3] = new g2(a2[e3].type, a2[e3].data, a2[e3].dims));
          return s2;
        }
        static async create(e2, t2, o2, i3) {
          let a2, s2 = {};
          if ("string" == typeof e2) {
            if (a2 = e2, "object" == typeof t2 && null !== t2) s2 = t2;
            else if (void 0 !== t2) throw new TypeError("'options' must be an object.");
          } else if (e2 instanceof Uint8Array) {
            if (a2 = e2, "object" == typeof t2 && null !== t2) s2 = t2;
            else if (void 0 !== t2) throw new TypeError("'options' must be an object.");
          } else {
            if (!(e2 instanceof ArrayBuffer || "undefined" != typeof SharedArrayBuffer && e2 instanceof SharedArrayBuffer)) throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
            {
              const r2 = e2;
              let n2 = 0, d3 = e2.byteLength;
              if ("object" == typeof t2 && null !== t2) s2 = t2;
              else if ("number" == typeof t2) {
                if (n2 = t2, !Number.isSafeInteger(n2)) throw new RangeError("'byteOffset' must be an integer.");
                if (n2 < 0 || n2 >= r2.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${r2.byteLength}).`);
                if (d3 = e2.byteLength - n2, "number" == typeof o2) {
                  if (d3 = o2, !Number.isSafeInteger(d3)) throw new RangeError("'byteLength' must be an integer.");
                  if (d3 <= 0 || n2 + d3 > r2.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${r2.byteLength - n2}].`);
                  if ("object" == typeof i3 && null !== i3) s2 = i3;
                  else if (void 0 !== i3) throw new TypeError("'options' must be an object.");
                } else if (void 0 !== o2) throw new TypeError("'byteLength' must be a number.");
              } else if (void 0 !== t2) throw new TypeError("'options' must be an object.");
              a2 = new Uint8Array(r2, n2, d3);
            }
          }
          const d2 = (s2.executionProviders || []).map(((e3) => "string" == typeof e3 ? e3 : e3.name)), f2 = await (async (e3) => {
            const t3 = 0 === e3.length ? n : e3, o3 = [];
            for (const e4 of t3) {
              const t4 = r[e4];
              if (t4) {
                if (t4.initialized) return t4.backend;
                if (t4.aborted) continue;
                const r2 = !!t4.initPromise;
                try {
                  return r2 || (t4.initPromise = t4.backend.init()), await t4.initPromise, t4.initialized = true, t4.backend;
                } catch (n2) {
                  r2 || o3.push({ name: e4, err: n2 }), t4.aborted = true;
                } finally {
                  delete t4.initPromise;
                }
              }
            }
            throw new Error(`no available backend found. ERR: ${o3.map(((e4) => `[${e4.name}] ${e4.err}`)).join(", ")}`);
          })(d2), h2 = await f2.createSessionHandler(a2, s2);
          return new m(h2);
        }
        startProfiling() {
          this.handler.startProfiling();
        }
        endProfiling() {
          this.handler.endProfiling();
        }
        get inputNames() {
          return this.handler.inputNames;
        }
        get outputNames() {
          return this.handler.outputNames;
        }
      }
      const c = m;
      var l = exports2;
      for (var w in t) l[w] = t[w];
      t.__esModule && Object.defineProperty(l, "__esModule", { value: true });
    })();
  }
});

// node_modules/onnxruntime-node/bin/napi-v3/darwin/arm64/onnxruntime_binding.node
var require_onnxruntime_binding = __commonJS({
  "node_modules/onnxruntime-node/bin/napi-v3/darwin/arm64/onnxruntime_binding.node"(exports2, module2) {
    module2.exports = "./onnxruntime_binding-4LK5T42I.node";
  }
});

// node_modules/onnxruntime-node/bin/napi-v3/darwin/x64/onnxruntime_binding.node
var require_onnxruntime_binding2 = __commonJS({
  "node_modules/onnxruntime-node/bin/napi-v3/darwin/x64/onnxruntime_binding.node"(exports2, module2) {
    module2.exports = "./onnxruntime_binding-NH5JCQKK.node";
  }
});

// node_modules/onnxruntime-node/bin/napi-v3/linux/arm64/onnxruntime_binding.node
var require_onnxruntime_binding3 = __commonJS({
  "node_modules/onnxruntime-node/bin/napi-v3/linux/arm64/onnxruntime_binding.node"(exports2, module2) {
    module2.exports = "./onnxruntime_binding-ZTPWXQRS.node";
  }
});

// node_modules/onnxruntime-node/bin/napi-v3/linux/x64/onnxruntime_binding.node
var require_onnxruntime_binding4 = __commonJS({
  "node_modules/onnxruntime-node/bin/napi-v3/linux/x64/onnxruntime_binding.node"(exports2, module2) {
    module2.exports = "./onnxruntime_binding-I6FPYYOQ.node";
  }
});

// node_modules/onnxruntime-node/bin/napi-v3/win32/arm64/onnxruntime_binding.node
var require_onnxruntime_binding5 = __commonJS({
  "node_modules/onnxruntime-node/bin/napi-v3/win32/arm64/onnxruntime_binding.node"(exports2, module2) {
    module2.exports = "./onnxruntime_binding-L2PGCXTQ.node";
  }
});

// node_modules/onnxruntime-node/bin/napi-v3/win32/x64/onnxruntime_binding.node
var require_onnxruntime_binding6 = __commonJS({
  "node_modules/onnxruntime-node/bin/napi-v3/win32/x64/onnxruntime_binding.node"(exports2, module2) {
    module2.exports = "./onnxruntime_binding-OTOMEMLG.node";
  }
});

// require("../bin/napi-v3/**/*/**/*/onnxruntime_binding.node") in node_modules/onnxruntime-node/dist/binding.js
var globRequire_bin_napi_v3_onnxruntime_binding_node;
var init_ = __esm({
  'require("../bin/napi-v3/**/*/**/*/onnxruntime_binding.node") in node_modules/onnxruntime-node/dist/binding.js'() {
    globRequire_bin_napi_v3_onnxruntime_binding_node = __glob({
      "../bin/napi-v3/darwin/arm64/onnxruntime_binding.node": () => require_onnxruntime_binding(),
      "../bin/napi-v3/darwin/x64/onnxruntime_binding.node": () => require_onnxruntime_binding2(),
      "../bin/napi-v3/linux/arm64/onnxruntime_binding.node": () => require_onnxruntime_binding3(),
      "../bin/napi-v3/linux/x64/onnxruntime_binding.node": () => require_onnxruntime_binding4(),
      "../bin/napi-v3/win32/arm64/onnxruntime_binding.node": () => require_onnxruntime_binding5(),
      "../bin/napi-v3/win32/x64/onnxruntime_binding.node": () => require_onnxruntime_binding6()
    });
  }
});

// node_modules/onnxruntime-node/dist/binding.js
var require_binding = __commonJS({
  "node_modules/onnxruntime-node/dist/binding.js"(exports2) {
    "use strict";
    init_();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.binding = void 0;
    exports2.binding = globRequire_bin_napi_v3_onnxruntime_binding_node(`../bin/napi-v3/${process.platform}/${process.arch}/onnxruntime_binding.node`);
  }
});

// node_modules/onnxruntime-node/dist/backend.js
var require_backend = __commonJS({
  "node_modules/onnxruntime-node/dist/backend.js"(exports2) {
    "use strict";
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _OnnxruntimeSessionHandler_inferenceSession;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.onnxruntimeBackend = void 0;
    var binding_1 = require_binding();
    var OnnxruntimeSessionHandler = class {
      constructor(pathOrBuffer, options) {
        _OnnxruntimeSessionHandler_inferenceSession.set(this, void 0);
        __classPrivateFieldSet(this, _OnnxruntimeSessionHandler_inferenceSession, new binding_1.binding.InferenceSession(), "f");
        if (typeof pathOrBuffer === "string") {
          __classPrivateFieldGet(this, _OnnxruntimeSessionHandler_inferenceSession, "f").loadModel(pathOrBuffer, options);
        } else {
          __classPrivateFieldGet(this, _OnnxruntimeSessionHandler_inferenceSession, "f").loadModel(pathOrBuffer.buffer, pathOrBuffer.byteOffset, pathOrBuffer.byteLength, options);
        }
        this.inputNames = __classPrivateFieldGet(this, _OnnxruntimeSessionHandler_inferenceSession, "f").inputNames;
        this.outputNames = __classPrivateFieldGet(this, _OnnxruntimeSessionHandler_inferenceSession, "f").outputNames;
      }
      async dispose() {
        return Promise.resolve();
      }
      startProfiling() {
      }
      endProfiling() {
      }
      async run(feeds, fetches, options) {
        return new Promise((resolve, reject) => {
          process.nextTick(() => {
            try {
              resolve(__classPrivateFieldGet(this, _OnnxruntimeSessionHandler_inferenceSession, "f").run(feeds, fetches, options));
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    };
    _OnnxruntimeSessionHandler_inferenceSession = /* @__PURE__ */ new WeakMap();
    var OnnxruntimeBackend = class {
      async init() {
        return Promise.resolve();
      }
      async createSessionHandler(pathOrBuffer, options) {
        return new Promise((resolve, reject) => {
          process.nextTick(() => {
            try {
              resolve(new OnnxruntimeSessionHandler(pathOrBuffer, options || {}));
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    };
    exports2.onnxruntimeBackend = new OnnxruntimeBackend();
  }
});

// node_modules/onnxruntime-node/dist/index.js
var require_dist = __commonJS({
  "node_modules/onnxruntime-node/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_ort_common_node(), exports2);
    var onnxruntime_common_1 = require_ort_common_node();
    var backend_1 = require_backend();
    (0, onnxruntime_common_1.registerBackend)("cpu", backend_1.onnxruntimeBackend, 100);
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/backend-impl.js
var backends, backendsSortedByPriority, registerBackend, tryResolveAndInitializeBackend, resolveBackendAndExecutionProviders;
var init_backend_impl = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/backend-impl.js"() {
    backends = /* @__PURE__ */ new Map();
    backendsSortedByPriority = [];
    registerBackend = (name2, backend, priority) => {
      if (backend && typeof backend.init === "function" && typeof backend.createInferenceSessionHandler === "function") {
        const currentBackend = backends.get(name2);
        if (currentBackend === void 0) {
          backends.set(name2, { backend, priority });
        } else if (currentBackend.priority > priority) {
          return;
        } else if (currentBackend.priority === priority) {
          if (currentBackend.backend !== backend) {
            throw new Error(`cannot register backend "${name2}" using priority ${priority}`);
          }
        }
        if (priority >= 0) {
          const i2 = backendsSortedByPriority.indexOf(name2);
          if (i2 !== -1) {
            backendsSortedByPriority.splice(i2, 1);
          }
          for (let i3 = 0; i3 < backendsSortedByPriority.length; i3++) {
            if (backends.get(backendsSortedByPriority[i3]).priority <= priority) {
              backendsSortedByPriority.splice(i3, 0, name2);
              return;
            }
          }
          backendsSortedByPriority.push(name2);
        }
        return;
      }
      throw new TypeError("not a valid backend");
    };
    tryResolveAndInitializeBackend = async (backendName) => {
      const backendInfo = backends.get(backendName);
      if (!backendInfo) {
        return "backend not found.";
      }
      if (backendInfo.initialized) {
        return backendInfo.backend;
      } else if (backendInfo.aborted) {
        return backendInfo.error;
      } else {
        const isInitializing = !!backendInfo.initPromise;
        try {
          if (!isInitializing) {
            backendInfo.initPromise = backendInfo.backend.init(backendName);
          }
          await backendInfo.initPromise;
          backendInfo.initialized = true;
          return backendInfo.backend;
        } catch (e) {
          if (!isInitializing) {
            backendInfo.error = `${e}`;
            backendInfo.aborted = true;
          }
          return backendInfo.error;
        } finally {
          delete backendInfo.initPromise;
        }
      }
    };
    resolveBackendAndExecutionProviders = async (options) => {
      const eps = options.executionProviders || [];
      const backendHints = eps.map((i2) => typeof i2 === "string" ? i2 : i2.name);
      const backendNames = backendHints.length === 0 ? backendsSortedByPriority : backendHints;
      let backend;
      const errors = [];
      const availableBackendNames = /* @__PURE__ */ new Set();
      for (const backendName of backendNames) {
        const resolveResult = await tryResolveAndInitializeBackend(backendName);
        if (typeof resolveResult === "string") {
          errors.push({ name: backendName, err: resolveResult });
        } else {
          if (!backend) {
            backend = resolveResult;
          }
          if (backend === resolveResult) {
            availableBackendNames.add(backendName);
          }
        }
      }
      if (!backend) {
        throw new Error(`no available backend found. ERR: ${errors.map((e) => `[${e.name}] ${e.err}`).join(", ")}`);
      }
      for (const { name: name2, err: err2 } of errors) {
        if (backendHints.includes(name2)) {
          console.warn(`removing requested execution provider "${name2}" from session options because it is not available: ${err2}`);
        }
      }
      const filteredEps = eps.filter((i2) => availableBackendNames.has(typeof i2 === "string" ? i2 : i2.name));
      return [
        backend,
        new Proxy(options, {
          get: (target, prop) => {
            if (prop === "executionProviders") {
              return filteredEps;
            }
            return Reflect.get(target, prop);
          }
        })
      ];
    };
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/backend.js
var init_backend = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/backend.js"() {
    init_backend_impl();
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/version.js
var version;
var init_version = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/version.js"() {
    version = "1.24.3";
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/env-impl.js
var logLevelValue, env;
var init_env_impl = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/env-impl.js"() {
    init_version();
    logLevelValue = "warning";
    env = {
      wasm: {},
      webgl: {},
      webgpu: {},
      versions: { common: version },
      set logLevel(value) {
        if (value === void 0) {
          return;
        }
        if (typeof value !== "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(value) === -1) {
          throw new Error(`Unsupported logging level: ${value}`);
        }
        logLevelValue = value;
      },
      get logLevel() {
        return logLevelValue;
      }
    };
    Object.defineProperty(env, "logLevel", { enumerable: true });
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/env.js
var env2;
var init_env = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/env.js"() {
    init_env_impl();
    env2 = env;
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-conversion-impl.js
var tensorToDataURL, tensorToImageData;
var init_tensor_conversion_impl = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-conversion-impl.js"() {
    tensorToDataURL = (tensor, options) => {
      const canvas = typeof document !== "undefined" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
      canvas.width = tensor.dims[3];
      canvas.height = tensor.dims[2];
      const pixels2DContext = canvas.getContext("2d");
      if (pixels2DContext != null) {
        let width;
        let height;
        if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
          width = tensor.dims[2];
          height = tensor.dims[3];
        } else {
          width = tensor.dims[3];
          height = tensor.dims[2];
        }
        const inputformat = options?.format !== void 0 ? options.format : "RGB";
        const norm = options?.norm;
        let normMean;
        let normBias;
        if (norm === void 0 || norm.mean === void 0) {
          normMean = [255, 255, 255, 255];
        } else {
          if (typeof norm.mean === "number") {
            normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
          } else {
            normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 0];
            if (norm.mean[3] !== void 0) {
              normMean[3] = norm.mean[3];
            }
          }
        }
        if (norm === void 0 || norm.bias === void 0) {
          normBias = [0, 0, 0, 0];
        } else {
          if (typeof norm.bias === "number") {
            normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
          } else {
            normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
            if (norm.bias[3] !== void 0) {
              normBias[3] = norm.bias[3];
            }
          }
        }
        const stride = height * width;
        let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
        if (inputformat === "RGBA") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
          aTensorPointer = stride * 3;
        } else if (inputformat === "RGB") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
        } else if (inputformat === "RBG") {
          rTensorPointer = 0;
          bTensorPointer = stride;
          gTensorPointer = stride * 2;
        }
        for (let i2 = 0; i2 < height; i2++) {
          for (let j2 = 0; j2 < width; j2++) {
            const R = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
            const G = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
            const B = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
            const A2 = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
            pixels2DContext.fillStyle = "rgba(" + R + "," + G + "," + B + "," + A2 + ")";
            pixels2DContext.fillRect(j2, i2, 1, 1);
          }
        }
        if ("toDataURL" in canvas) {
          return canvas.toDataURL();
        } else {
          throw new Error("toDataURL is not supported");
        }
      } else {
        throw new Error("Can not access image data");
      }
    };
    tensorToImageData = (tensor, options) => {
      const pixels2DContext = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d");
      let image;
      if (pixels2DContext != null) {
        let width;
        let height;
        let channels;
        if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
          width = tensor.dims[2];
          height = tensor.dims[1];
          channels = tensor.dims[3];
        } else {
          width = tensor.dims[3];
          height = tensor.dims[2];
          channels = tensor.dims[1];
        }
        const inputformat = options !== void 0 ? options.format !== void 0 ? options.format : "RGB" : "RGB";
        const norm = options?.norm;
        let normMean;
        let normBias;
        if (norm === void 0 || norm.mean === void 0) {
          normMean = [255, 255, 255, 255];
        } else {
          if (typeof norm.mean === "number") {
            normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
          } else {
            normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 255];
            if (norm.mean[3] !== void 0) {
              normMean[3] = norm.mean[3];
            }
          }
        }
        if (norm === void 0 || norm.bias === void 0) {
          normBias = [0, 0, 0, 0];
        } else {
          if (typeof norm.bias === "number") {
            normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
          } else {
            normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
            if (norm.bias[3] !== void 0) {
              normBias[3] = norm.bias[3];
            }
          }
        }
        const stride = height * width;
        if (options !== void 0) {
          if (options.format !== void 0 && channels === 4 && options.format !== "RGBA" || channels === 3 && options.format !== "RGB" && options.format !== "BGR") {
            throw new Error("Tensor format doesn't match input tensor dims");
          }
        }
        const step = 4;
        let rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
        let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
        if (inputformat === "RGBA") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
          aTensorPointer = stride * 3;
        } else if (inputformat === "RGB") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
        } else if (inputformat === "RBG") {
          rTensorPointer = 0;
          bTensorPointer = stride;
          gTensorPointer = stride * 2;
        }
        image = pixels2DContext.createImageData(width, height);
        for (let i2 = 0; i2 < height * width; rImagePointer += step, gImagePointer += step, bImagePointer += step, aImagePointer += step, i2++) {
          image.data[rImagePointer] = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
          image.data[gImagePointer] = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
          image.data[bImagePointer] = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
          image.data[aImagePointer] = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
        }
      } else {
        throw new Error("Can not access image data");
      }
      return image;
    };
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-factory-impl.js
var bufferToTensor, tensorFromImage, tensorFromTexture, tensorFromGpuBuffer, tensorFromMLTensor, tensorFromPinnedBuffer;
var init_tensor_factory_impl = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-factory-impl.js"() {
    init_tensor_impl();
    bufferToTensor = (buffer, options) => {
      if (buffer === void 0) {
        throw new Error("Image buffer must be defined");
      }
      if (options.height === void 0 || options.width === void 0) {
        throw new Error("Image height and width must be defined");
      }
      if (options.tensorLayout === "NHWC") {
        throw new Error("NHWC Tensor layout is not supported yet");
      }
      const { height, width } = options;
      const norm = options.norm ?? { mean: 255, bias: 0 };
      let normMean;
      let normBias;
      if (typeof norm.mean === "number") {
        normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
      } else {
        normMean = [norm.mean[0], norm.mean[1], norm.mean[2], norm.mean[3] ?? 255];
      }
      if (typeof norm.bias === "number") {
        normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
      } else {
        normBias = [norm.bias[0], norm.bias[1], norm.bias[2], norm.bias[3] ?? 0];
      }
      const inputformat = options.format !== void 0 ? options.format : "RGBA";
      const outputformat = options.tensorFormat !== void 0 ? options.tensorFormat !== void 0 ? options.tensorFormat : "RGB" : "RGB";
      const stride = height * width;
      const float32Data = outputformat === "RGBA" ? new Float32Array(stride * 4) : new Float32Array(stride * 3);
      let step = 4, rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
      let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
      if (inputformat === "RGB") {
        step = 3;
        rImagePointer = 0;
        gImagePointer = 1;
        bImagePointer = 2;
        aImagePointer = -1;
      }
      if (outputformat === "RGBA") {
        aTensorPointer = stride * 3;
      } else if (outputformat === "RBG") {
        rTensorPointer = 0;
        bTensorPointer = stride;
        gTensorPointer = stride * 2;
      } else if (outputformat === "BGR") {
        bTensorPointer = 0;
        gTensorPointer = stride;
        rTensorPointer = stride * 2;
      }
      for (let i2 = 0; i2 < stride; i2++, rImagePointer += step, bImagePointer += step, gImagePointer += step, aImagePointer += step) {
        float32Data[rTensorPointer++] = (buffer[rImagePointer] + normBias[0]) / normMean[0];
        float32Data[gTensorPointer++] = (buffer[gImagePointer] + normBias[1]) / normMean[1];
        float32Data[bTensorPointer++] = (buffer[bImagePointer] + normBias[2]) / normMean[2];
        if (aTensorPointer !== -1 && aImagePointer !== -1) {
          float32Data[aTensorPointer++] = (buffer[aImagePointer] + normBias[3]) / normMean[3];
        }
      }
      const outputTensor = outputformat === "RGBA" ? new Tensor("float32", float32Data, [1, 4, height, width]) : new Tensor("float32", float32Data, [1, 3, height, width]);
      return outputTensor;
    };
    tensorFromImage = async (image, options) => {
      const isHTMLImageEle = typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement;
      const isImageDataEle = typeof ImageData !== "undefined" && image instanceof ImageData;
      const isImageBitmap = typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap;
      const isString2 = typeof image === "string";
      let data;
      let bufferToTensorOptions = options ?? {};
      const createCanvas = () => {
        if (typeof document !== "undefined") {
          return document.createElement("canvas");
        } else if (typeof OffscreenCanvas !== "undefined") {
          return new OffscreenCanvas(1, 1);
        } else {
          throw new Error("Canvas is not supported");
        }
      };
      const createCanvasContext = (canvas) => {
        if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement) {
          return canvas.getContext("2d");
        } else if (canvas instanceof OffscreenCanvas) {
          return canvas.getContext("2d");
        } else {
          return null;
        }
      };
      if (isHTMLImageEle) {
        const canvas = createCanvas();
        canvas.width = image.width;
        canvas.height = image.height;
        const pixels2DContext = createCanvasContext(canvas);
        if (pixels2DContext != null) {
          let height = image.height;
          let width = image.width;
          if (options !== void 0 && options.resizedHeight !== void 0 && options.resizedWidth !== void 0) {
            height = options.resizedHeight;
            width = options.resizedWidth;
          }
          if (options !== void 0) {
            bufferToTensorOptions = options;
            if (options.tensorFormat !== void 0) {
              throw new Error("Image input config format must be RGBA for HTMLImageElement");
            } else {
              bufferToTensorOptions.tensorFormat = "RGBA";
            }
            bufferToTensorOptions.height = height;
            bufferToTensorOptions.width = width;
          } else {
            bufferToTensorOptions.tensorFormat = "RGBA";
            bufferToTensorOptions.height = height;
            bufferToTensorOptions.width = width;
          }
          pixels2DContext.drawImage(image, 0, 0);
          data = pixels2DContext.getImageData(0, 0, width, height).data;
        } else {
          throw new Error("Can not access image data");
        }
      } else if (isImageDataEle) {
        let height;
        let width;
        if (options !== void 0 && options.resizedWidth !== void 0 && options.resizedHeight !== void 0) {
          height = options.resizedHeight;
          width = options.resizedWidth;
        } else {
          height = image.height;
          width = image.width;
        }
        if (options !== void 0) {
          bufferToTensorOptions = options;
        }
        bufferToTensorOptions.format = "RGBA";
        bufferToTensorOptions.height = height;
        bufferToTensorOptions.width = width;
        if (options !== void 0) {
          const tempCanvas = createCanvas();
          tempCanvas.width = width;
          tempCanvas.height = height;
          const pixels2DContext = createCanvasContext(tempCanvas);
          if (pixels2DContext != null) {
            pixels2DContext.putImageData(image, 0, 0);
            data = pixels2DContext.getImageData(0, 0, width, height).data;
          } else {
            throw new Error("Can not access image data");
          }
        } else {
          data = image.data;
        }
      } else if (isImageBitmap) {
        if (options === void 0) {
          throw new Error("Please provide image config with format for Imagebitmap");
        }
        const canvas = createCanvas();
        canvas.width = image.width;
        canvas.height = image.height;
        const pixels2DContext = createCanvasContext(canvas);
        if (pixels2DContext != null) {
          const height = image.height;
          const width = image.width;
          pixels2DContext.drawImage(image, 0, 0, width, height);
          data = pixels2DContext.getImageData(0, 0, width, height).data;
          bufferToTensorOptions.height = height;
          bufferToTensorOptions.width = width;
          return bufferToTensor(data, bufferToTensorOptions);
        } else {
          throw new Error("Can not access image data");
        }
      } else if (isString2) {
        return new Promise((resolve, reject) => {
          const canvas = createCanvas();
          const context = createCanvasContext(canvas);
          if (!image || !context) {
            return reject();
          }
          const newImage = new Image();
          newImage.crossOrigin = "Anonymous";
          newImage.src = image;
          newImage.onload = () => {
            canvas.width = newImage.width;
            canvas.height = newImage.height;
            context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
            const img = context.getImageData(0, 0, canvas.width, canvas.height);
            bufferToTensorOptions.height = canvas.height;
            bufferToTensorOptions.width = canvas.width;
            resolve(bufferToTensor(img.data, bufferToTensorOptions));
          };
        });
      } else {
        throw new Error("Input data provided is not supported - aborted tensor creation");
      }
      if (data !== void 0) {
        return bufferToTensor(data, bufferToTensorOptions);
      } else {
        throw new Error("Input data provided is not supported - aborted tensor creation");
      }
    };
    tensorFromTexture = (texture, options) => {
      const { width, height, download, dispose } = options;
      const dims = [1, height, width, 4];
      return new Tensor({ location: "texture", type: "float32", texture, dims, download, dispose });
    };
    tensorFromGpuBuffer = (gpuBuffer, options) => {
      const { dataType, dims, download, dispose } = options;
      return new Tensor({ location: "gpu-buffer", type: dataType ?? "float32", gpuBuffer, dims, download, dispose });
    };
    tensorFromMLTensor = (mlTensor, options) => {
      const { dataType, dims, download, dispose } = options;
      return new Tensor({ location: "ml-tensor", type: dataType ?? "float32", mlTensor, dims, download, dispose });
    };
    tensorFromPinnedBuffer = (type, buffer, dims) => new Tensor({ location: "cpu-pinned", type, data: buffer, dims: dims ?? [buffer.length] });
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-impl-type-mapping.js
var NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP, NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP, isTypedArrayChecked, checkTypedArray;
var init_tensor_impl_type_mapping = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-impl-type-mapping.js"() {
    NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP = /* @__PURE__ */ new Map([
      ["float32", Float32Array],
      ["uint8", Uint8Array],
      ["int8", Int8Array],
      ["uint16", Uint16Array],
      ["int16", Int16Array],
      ["int32", Int32Array],
      ["bool", Uint8Array],
      ["float64", Float64Array],
      ["uint32", Uint32Array],
      ["int4", Uint8Array],
      ["uint4", Uint8Array]
    ]);
    NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP = /* @__PURE__ */ new Map([
      [Float32Array, "float32"],
      [Uint8Array, "uint8"],
      [Int8Array, "int8"],
      [Uint16Array, "uint16"],
      [Int16Array, "int16"],
      [Int32Array, "int32"],
      [Float64Array, "float64"],
      [Uint32Array, "uint32"]
    ]);
    isTypedArrayChecked = false;
    checkTypedArray = () => {
      if (!isTypedArrayChecked) {
        isTypedArrayChecked = true;
        const isBigInt64ArrayAvailable = typeof BigInt64Array !== "undefined" && BigInt64Array.from;
        const isBigUint64ArrayAvailable = typeof BigUint64Array !== "undefined" && BigUint64Array.from;
        const Float16Array2 = globalThis.Float16Array;
        const isFloat16ArrayAvailable = typeof Float16Array2 !== "undefined" && Float16Array2.from;
        if (isBigInt64ArrayAvailable) {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("int64", BigInt64Array);
          NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array, "int64");
        }
        if (isBigUint64ArrayAvailable) {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("uint64", BigUint64Array);
          NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array, "uint64");
        }
        if (isFloat16ArrayAvailable) {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Float16Array2);
          NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(Float16Array2, "float16");
        } else {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Uint16Array);
        }
      }
    };
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-utils-impl.js
var calculateSize, tensorReshape;
var init_tensor_utils_impl = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-utils-impl.js"() {
    init_tensor_impl();
    calculateSize = (dims) => {
      let size = 1;
      for (let i2 = 0; i2 < dims.length; i2++) {
        const dim = dims[i2];
        if (typeof dim !== "number" || !Number.isSafeInteger(dim)) {
          throw new TypeError(`dims[${i2}] must be an integer, got: ${dim}`);
        }
        if (dim < 0) {
          throw new RangeError(`dims[${i2}] must be a non-negative integer, got: ${dim}`);
        }
        size *= dim;
      }
      return size;
    };
    tensorReshape = (tensor, dims) => {
      switch (tensor.location) {
        case "cpu":
          return new Tensor(tensor.type, tensor.data, dims);
        case "cpu-pinned":
          return new Tensor({
            location: "cpu-pinned",
            data: tensor.data,
            type: tensor.type,
            dims
          });
        case "texture":
          return new Tensor({
            location: "texture",
            texture: tensor.texture,
            type: tensor.type,
            dims
          });
        case "gpu-buffer":
          return new Tensor({
            location: "gpu-buffer",
            gpuBuffer: tensor.gpuBuffer,
            type: tensor.type,
            dims
          });
        case "ml-tensor":
          return new Tensor({
            location: "ml-tensor",
            mlTensor: tensor.mlTensor,
            type: tensor.type,
            dims
          });
        default:
          throw new Error(`tensorReshape: tensor location ${tensor.location} is not supported`);
      }
    };
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-impl.js
var Tensor;
var init_tensor_impl = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-impl.js"() {
    init_tensor_conversion_impl();
    init_tensor_factory_impl();
    init_tensor_impl_type_mapping();
    init_tensor_utils_impl();
    Tensor = class {
      /**
       * implementation.
       */
      constructor(arg0, arg1, arg2) {
        checkTypedArray();
        let type;
        let dims;
        if (typeof arg0 === "object" && "location" in arg0) {
          this.dataLocation = arg0.location;
          type = arg0.type;
          dims = arg0.dims;
          switch (arg0.location) {
            case "cpu-pinned": {
              const expectedTypedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(type);
              if (!expectedTypedArrayConstructor) {
                throw new TypeError(`unsupported type "${type}" to create tensor from pinned buffer`);
              }
              if (!(arg0.data instanceof expectedTypedArrayConstructor)) {
                throw new TypeError(`buffer should be of type ${expectedTypedArrayConstructor.name}`);
              }
              this.cpuData = arg0.data;
              break;
            }
            case "texture": {
              if (type !== "float32") {
                throw new TypeError(`unsupported type "${type}" to create tensor from texture`);
              }
              this.gpuTextureData = arg0.texture;
              this.downloader = arg0.download;
              this.disposer = arg0.dispose;
              break;
            }
            case "gpu-buffer": {
              if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
                throw new TypeError(`unsupported type "${type}" to create tensor from gpu buffer`);
              }
              this.gpuBufferData = arg0.gpuBuffer;
              this.downloader = arg0.download;
              this.disposer = arg0.dispose;
              break;
            }
            case "ml-tensor": {
              if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint64" && type !== "int8" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
                throw new TypeError(`unsupported type "${type}" to create tensor from MLTensor`);
              }
              this.mlTensorData = arg0.mlTensor;
              this.downloader = arg0.download;
              this.disposer = arg0.dispose;
              break;
            }
            default:
              throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
          }
        } else {
          let data;
          let maybeDims;
          if (typeof arg0 === "string") {
            type = arg0;
            maybeDims = arg2;
            if (arg0 === "string") {
              if (!Array.isArray(arg1)) {
                throw new TypeError("A string tensor's data must be a string array.");
              }
              data = arg1;
            } else {
              const typedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(arg0);
              if (typedArrayConstructor === void 0) {
                throw new TypeError(`Unsupported tensor type: ${arg0}.`);
              }
              if (Array.isArray(arg1)) {
                if (arg0 === "float16" && typedArrayConstructor === Uint16Array || arg0 === "uint4" || arg0 === "int4") {
                  throw new TypeError(`Creating a ${arg0} tensor from number array is not supported. Please use ${typedArrayConstructor.name} as data.`);
                } else if (arg0 === "uint64" || arg0 === "int64") {
                  data = typedArrayConstructor.from(arg1, BigInt);
                } else {
                  data = typedArrayConstructor.from(arg1);
                }
              } else if (arg1 instanceof typedArrayConstructor) {
                data = arg1;
              } else if (arg1 instanceof Uint8ClampedArray) {
                if (arg0 === "uint8") {
                  data = Uint8Array.from(arg1);
                } else {
                  throw new TypeError(`A Uint8ClampedArray tensor's data must be type of uint8`);
                }
              } else if (arg0 === "float16" && arg1 instanceof Uint16Array && typedArrayConstructor !== Uint16Array) {
                data = new globalThis.Float16Array(arg1.buffer, arg1.byteOffset, arg1.length);
              } else {
                throw new TypeError(`A ${type} tensor's data must be type of ${typedArrayConstructor}`);
              }
            }
          } else {
            maybeDims = arg1;
            if (Array.isArray(arg0)) {
              if (arg0.length === 0) {
                throw new TypeError("Tensor type cannot be inferred from an empty array.");
              }
              const firstElementType = typeof arg0[0];
              if (firstElementType === "string") {
                type = "string";
                data = arg0;
              } else if (firstElementType === "boolean") {
                type = "bool";
                data = Uint8Array.from(arg0);
              } else {
                throw new TypeError(`Invalid element type of data array: ${firstElementType}.`);
              }
            } else if (arg0 instanceof Uint8ClampedArray) {
              type = "uint8";
              data = Uint8Array.from(arg0);
            } else {
              const mappedType = NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.get(arg0.constructor);
              if (mappedType === void 0) {
                throw new TypeError(`Unsupported type for tensor data: ${arg0.constructor}.`);
              }
              type = mappedType;
              data = arg0;
            }
          }
          if (maybeDims === void 0) {
            maybeDims = [data.length];
          } else if (!Array.isArray(maybeDims)) {
            throw new TypeError("A tensor's dims must be a number array");
          }
          dims = maybeDims;
          this.cpuData = data;
          this.dataLocation = "cpu";
        }
        const size = calculateSize(dims);
        if (this.cpuData && size !== this.cpuData.length) {
          if ((type === "uint4" || type === "int4") && Math.ceil(size / 2) === this.cpuData.length) {
          } else {
            throw new Error(`Tensor's size(${size}) does not match data length(${this.cpuData.length}).`);
          }
        }
        this.type = type;
        this.dims = dims;
        this.size = size;
      }
      // #endregion
      // #region factory
      static async fromImage(image, options) {
        return tensorFromImage(image, options);
      }
      static fromTexture(texture, options) {
        return tensorFromTexture(texture, options);
      }
      static fromGpuBuffer(gpuBuffer, options) {
        return tensorFromGpuBuffer(gpuBuffer, options);
      }
      static fromMLTensor(mlTensor, options) {
        return tensorFromMLTensor(mlTensor, options);
      }
      static fromPinnedBuffer(type, buffer, dims) {
        return tensorFromPinnedBuffer(type, buffer, dims);
      }
      // #endregion
      // #region conversions
      toDataURL(options) {
        return tensorToDataURL(this, options);
      }
      toImageData(options) {
        return tensorToImageData(this, options);
      }
      // #endregion
      // #region properties
      get data() {
        this.ensureValid();
        if (!this.cpuData) {
          throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
        }
        return this.cpuData;
      }
      get location() {
        return this.dataLocation;
      }
      get texture() {
        this.ensureValid();
        if (!this.gpuTextureData) {
          throw new Error("The data is not stored as a WebGL texture.");
        }
        return this.gpuTextureData;
      }
      get gpuBuffer() {
        this.ensureValid();
        if (!this.gpuBufferData) {
          throw new Error("The data is not stored as a WebGPU buffer.");
        }
        return this.gpuBufferData;
      }
      get mlTensor() {
        this.ensureValid();
        if (!this.mlTensorData) {
          throw new Error("The data is not stored as a WebNN MLTensor.");
        }
        return this.mlTensorData;
      }
      // #endregion
      // #region methods
      async getData(releaseData) {
        this.ensureValid();
        switch (this.dataLocation) {
          case "cpu":
          case "cpu-pinned":
            return this.data;
          case "texture":
          case "gpu-buffer":
          case "ml-tensor": {
            if (!this.downloader) {
              throw new Error("The current tensor is not created with a specified data downloader.");
            }
            if (this.isDownloading) {
              throw new Error("The current tensor is being downloaded.");
            }
            try {
              this.isDownloading = true;
              const data = await this.downloader();
              this.downloader = void 0;
              this.dataLocation = "cpu";
              this.cpuData = data;
              if (releaseData && this.disposer) {
                this.disposer();
                this.disposer = void 0;
              }
              return data;
            } finally {
              this.isDownloading = false;
            }
          }
          default:
            throw new Error(`cannot get data from location: ${this.dataLocation}`);
        }
      }
      dispose() {
        if (this.isDownloading) {
          throw new Error("The current tensor is being downloaded.");
        }
        if (this.disposer) {
          this.disposer();
          this.disposer = void 0;
        }
        this.cpuData = void 0;
        this.gpuTextureData = void 0;
        this.gpuBufferData = void 0;
        this.mlTensorData = void 0;
        this.downloader = void 0;
        this.isDownloading = void 0;
        this.dataLocation = "none";
      }
      // #endregion
      // #region tensor utilities
      ensureValid() {
        if (this.dataLocation === "none") {
          throw new Error("The tensor is disposed.");
        }
      }
      reshape(dims) {
        this.ensureValid();
        if (this.downloader || this.disposer) {
          throw new Error("Cannot reshape a tensor that owns GPU resource.");
        }
        return tensorReshape(this, dims);
      }
    };
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor.js
var Tensor2;
var init_tensor = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor.js"() {
    init_tensor_impl();
    Tensor2 = Tensor;
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/trace.js
var TRACE, TRACE_FUNC, TRACE_FUNC_BEGIN, TRACE_FUNC_END, TRACE_EVENT_BEGIN, TRACE_EVENT_END;
var init_trace = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/trace.js"() {
    init_env_impl();
    TRACE = (deviceType, label) => {
      if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
        return;
      }
      console.timeStamp(`${deviceType}::ORT::${label}`);
    };
    TRACE_FUNC = (msg, extraMsg) => {
      const stack = new Error().stack?.split(/\r\n|\r|\n/g) || [];
      let hasTraceFunc = false;
      for (let i2 = 0; i2 < stack.length; i2++) {
        if (hasTraceFunc && !stack[i2].includes("TRACE_FUNC")) {
          let label = `FUNC_${msg}::${stack[i2].trim().split(" ")[1]}`;
          if (extraMsg) {
            label += `::${extraMsg}`;
          }
          TRACE("CPU", label);
          return;
        }
        if (stack[i2].includes("TRACE_FUNC")) {
          hasTraceFunc = true;
        }
      }
    };
    TRACE_FUNC_BEGIN = (extraMsg) => {
      if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
        return;
      }
      TRACE_FUNC("BEGIN", extraMsg);
    };
    TRACE_FUNC_END = (extraMsg) => {
      if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
        return;
      }
      TRACE_FUNC("END", extraMsg);
    };
    TRACE_EVENT_BEGIN = (extraMsg) => {
      if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
        return;
      }
      console.time(`ORT::${extraMsg}`);
    };
    TRACE_EVENT_END = (extraMsg) => {
      if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
        return;
      }
      console.timeEnd(`ORT::${extraMsg}`);
    };
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/inference-session-impl.js
var InferenceSession;
var init_inference_session_impl = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/inference-session-impl.js"() {
    init_backend_impl();
    init_tensor();
    init_trace();
    InferenceSession = class _InferenceSession {
      constructor(handler) {
        this.handler = handler;
      }
      async run(feeds, arg1, arg2) {
        TRACE_FUNC_BEGIN();
        TRACE_EVENT_BEGIN("InferenceSession.run");
        const fetches = {};
        let options = {};
        if (typeof feeds !== "object" || feeds === null || feeds instanceof Tensor2 || Array.isArray(feeds)) {
          throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
        }
        let isFetchesEmpty = true;
        if (typeof arg1 === "object") {
          if (arg1 === null) {
            throw new TypeError("Unexpected argument[1]: cannot be null.");
          }
          if (arg1 instanceof Tensor2) {
            throw new TypeError("'fetches' cannot be a Tensor");
          }
          if (Array.isArray(arg1)) {
            if (arg1.length === 0) {
              throw new TypeError("'fetches' cannot be an empty array.");
            }
            isFetchesEmpty = false;
            for (const name2 of arg1) {
              if (typeof name2 !== "string") {
                throw new TypeError("'fetches' must be a string array or an object.");
              }
              if (this.outputNames.indexOf(name2) === -1) {
                throw new RangeError(`'fetches' contains invalid output name: ${name2}.`);
              }
              fetches[name2] = null;
            }
            if (typeof arg2 === "object" && arg2 !== null) {
              options = arg2;
            } else if (typeof arg2 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
          } else {
            let isFetches = false;
            const arg1Keys = Object.getOwnPropertyNames(arg1);
            for (const name2 of this.outputNames) {
              if (arg1Keys.indexOf(name2) !== -1) {
                const v = arg1[name2];
                if (v === null || v instanceof Tensor2) {
                  isFetches = true;
                  isFetchesEmpty = false;
                  fetches[name2] = v;
                }
              }
            }
            if (isFetches) {
              if (typeof arg2 === "object" && arg2 !== null) {
                options = arg2;
              } else if (typeof arg2 !== "undefined") {
                throw new TypeError("'options' must be an object.");
              }
            } else {
              options = arg1;
            }
          }
        } else if (typeof arg1 !== "undefined") {
          throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
        }
        for (const name2 of this.inputNames) {
          if (typeof feeds[name2] === "undefined") {
            throw new Error(`input '${name2}' is missing in 'feeds'.`);
          }
        }
        if (isFetchesEmpty) {
          for (const name2 of this.outputNames) {
            fetches[name2] = null;
          }
        }
        const results = await this.handler.run(feeds, fetches, options);
        const returnValue = {};
        for (const key in results) {
          if (Object.hasOwnProperty.call(results, key)) {
            const result = results[key];
            if (result instanceof Tensor2) {
              returnValue[key] = result;
            } else {
              returnValue[key] = new Tensor2(result.type, result.data, result.dims);
            }
          }
        }
        TRACE_EVENT_END("InferenceSession.run");
        TRACE_FUNC_END();
        return returnValue;
      }
      async release() {
        return this.handler.dispose();
      }
      static async create(arg0, arg1, arg2, arg3) {
        TRACE_FUNC_BEGIN();
        TRACE_EVENT_BEGIN("InferenceSession.create");
        let filePathOrUint8Array;
        let options = {};
        if (typeof arg0 === "string") {
          filePathOrUint8Array = arg0;
          if (typeof arg1 === "object" && arg1 !== null) {
            options = arg1;
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("'options' must be an object.");
          }
        } else if (arg0 instanceof Uint8Array) {
          filePathOrUint8Array = arg0;
          if (typeof arg1 === "object" && arg1 !== null) {
            options = arg1;
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("'options' must be an object.");
          }
        } else if (arg0 instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && arg0 instanceof SharedArrayBuffer) {
          const buffer = arg0;
          let byteOffset = 0;
          let byteLength = arg0.byteLength;
          if (typeof arg1 === "object" && arg1 !== null) {
            options = arg1;
          } else if (typeof arg1 === "number") {
            byteOffset = arg1;
            if (!Number.isSafeInteger(byteOffset)) {
              throw new RangeError("'byteOffset' must be an integer.");
            }
            if (byteOffset < 0 || byteOffset >= buffer.byteLength) {
              throw new RangeError(`'byteOffset' is out of range [0, ${buffer.byteLength}).`);
            }
            byteLength = arg0.byteLength - byteOffset;
            if (typeof arg2 === "number") {
              byteLength = arg2;
              if (!Number.isSafeInteger(byteLength)) {
                throw new RangeError("'byteLength' must be an integer.");
              }
              if (byteLength <= 0 || byteOffset + byteLength > buffer.byteLength) {
                throw new RangeError(`'byteLength' is out of range (0, ${buffer.byteLength - byteOffset}].`);
              }
              if (typeof arg3 === "object" && arg3 !== null) {
                options = arg3;
              } else if (typeof arg3 !== "undefined") {
                throw new TypeError("'options' must be an object.");
              }
            } else if (typeof arg2 !== "undefined") {
              throw new TypeError("'byteLength' must be a number.");
            }
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("'options' must be an object.");
          }
          filePathOrUint8Array = new Uint8Array(buffer, byteOffset, byteLength);
        } else {
          throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
        }
        const [backend, optionsWithValidatedEPs] = await resolveBackendAndExecutionProviders(options);
        const handler = await backend.createInferenceSessionHandler(filePathOrUint8Array, optionsWithValidatedEPs);
        TRACE_EVENT_END("InferenceSession.create");
        TRACE_FUNC_END();
        return new _InferenceSession(handler);
      }
      startProfiling() {
        this.handler.startProfiling();
      }
      endProfiling() {
        this.handler.endProfiling();
      }
      get inputNames() {
        return this.handler.inputNames;
      }
      get outputNames() {
        return this.handler.outputNames;
      }
      get inputMetadata() {
        return this.handler.inputMetadata;
      }
      get outputMetadata() {
        return this.handler.outputMetadata;
      }
    };
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/inference-session.js
var InferenceSession2;
var init_inference_session = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/inference-session.js"() {
    init_inference_session_impl();
    InferenceSession2 = InferenceSession;
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-conversion.js
var init_tensor_conversion = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-conversion.js"() {
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-factory.js
var init_tensor_factory = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/tensor-factory.js"() {
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/onnx-model.js
var init_onnx_model = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/onnx-model.js"() {
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/onnx-value.js
var init_onnx_value = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/onnx-value.js"() {
  }
});

// node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  InferenceSession: () => InferenceSession2,
  TRACE: () => TRACE,
  TRACE_EVENT_BEGIN: () => TRACE_EVENT_BEGIN,
  TRACE_EVENT_END: () => TRACE_EVENT_END,
  TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
  TRACE_FUNC_END: () => TRACE_FUNC_END,
  Tensor: () => Tensor2,
  env: () => env2,
  registerBackend: () => registerBackend
});
var init_esm = __esm({
  "node_modules/onnxruntime-web/node_modules/onnxruntime-common/dist/esm/index.js"() {
    init_backend();
    init_env();
    init_inference_session();
    init_tensor();
    init_tensor_conversion();
    init_tensor_factory();
    init_trace();
    init_onnx_model();
    init_onnx_value();
  }
});

// node_modules/onnxruntime-web/dist/ort.node.min.mjs
var ort_node_min_exports = {};
__export(ort_node_min_exports, {
  InferenceSession: () => InferenceSession2,
  TRACE: () => TRACE,
  TRACE_EVENT_BEGIN: () => TRACE_EVENT_BEGIN,
  TRACE_EVENT_END: () => TRACE_EVENT_END,
  TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
  TRACE_FUNC_END: () => TRACE_FUNC_END,
  Tensor: () => Tensor2,
  default: () => Hr,
  env: () => env2,
  registerBackend: () => registerBackend
});
var import_module, import_meta, require2, pe, Et, St, ht, de, C2, Ot, It, Tt, j, re, Ae, Lt, Bt, $, xe, De, _t, Pt, vt, Dt, Ue, Ce, me, be, we, ne, Me, Ut, At, xt, We, E, V, A, K, g, oe, Fe, ke, Ct, Mt, Wt, se, Ft, Re, Ne, J, ae, q, Ge, je, ie, ue, $e, ge, Q, ye, kt, qe, Ye, Y, Rt, Ve, Ee, Ze, Xe, Je, Ke, Qe, et, Se, tt, rt, nt, ot, st, at, it, ut, ct, Oe, pt, Gt, ce, dt, bt, mt, le, jt, wt, ve, Hr;
var init_ort_node_min = __esm({
  "node_modules/onnxruntime-web/dist/ort.node.min.mjs"() {
    import_module = require("module");
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    init_esm();
    import_meta = {};
    require2 = (0, import_module.createRequire)(import_meta.url);
    pe = Object.defineProperty;
    Et = Object.getOwnPropertyDescriptor;
    St = Object.getOwnPropertyNames;
    ht = Object.prototype.hasOwnProperty;
    de = ((e) => typeof require2 < "u" ? require2 : typeof Proxy < "u" ? new Proxy(e, { get: (t, n) => (typeof require2 < "u" ? require2 : t)[n] }) : e)(function(e) {
      if (typeof require2 < "u") return require2.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    C2 = (e, t) => () => (e && (t = e(e = 0)), t);
    Ot = (e, t) => {
      for (var n in t) pe(e, n, { get: t[n], enumerable: true });
    };
    It = (e, t, n, o) => {
      if (t && typeof t == "object" || typeof t == "function") for (let r of St(t)) !ht.call(e, r) && r !== n && pe(e, r, { get: () => t[r], enumerable: !(o = Et(t, r)) || o.enumerable });
      return e;
    };
    Tt = (e) => It(pe({}, "__esModule", { value: true }), e);
    re = C2(() => {
      "use strict";
      j = !!(typeof process < "u" && process.versions && process.versions.node);
    });
    me = C2(() => {
      "use strict";
      re();
      Ae = j || typeof location > "u" ? void 0 : location.origin, Lt = import_meta.url > "file:" && import_meta.url < "file;", Bt = () => {
        if (!j) {
          if (Lt) {
            let e = URL;
            return new URL(new e("ort.node.min.mjs", import_meta.url).href, Ae).href;
          }
          return import_meta.url;
        }
      }, $ = Bt(), xe = () => {
        if ($ && !$.startsWith("blob:")) return $.substring(0, $.lastIndexOf("/") + 1);
      }, De = (e, t) => {
        try {
          let n = t ?? $;
          return (n ? new URL(e, n) : new URL(e)).origin === Ae;
        } catch {
          return false;
        }
      }, _t = (e, t) => {
        let n = t ?? $;
        try {
          return (n ? new URL(e, n) : new URL(e)).href;
        } catch {
          return;
        }
      }, Pt = (e, t) => `${t ?? "./"}${e}`, vt = async (e) => {
        let n = await (await fetch(e, { credentials: "same-origin" })).blob();
        return URL.createObjectURL(n);
      }, Dt = async (e) => (await import(
        /*webpackIgnore:true*/
        /*@vite-ignore*/
        e
      )).default, Ue = void 0, Ce = async (e, t, n, o) => {
        let r = Ue && !(e || t);
        if (r) if ($) r = De($) || o && !n;
        else if (o && !n) r = true;
        else throw new Error("cannot determine the script source URL.");
        if (r) return [void 0, Ue];
        {
          let a = "ort-wasm-simd-threaded.mjs", s = e ?? _t(a, t), i2 = !j && n && s && !De(s, t), u = i2 ? await vt(s) : s ?? Pt(a, t);
          return [i2 ? u : void 0, await Dt(u)];
        }
      };
    });
    V = C2(() => {
      "use strict";
      me();
      we = false, ne = false, Me = false, Ut = () => {
        if (typeof SharedArrayBuffer > "u") return false;
        try {
          return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
        } catch {
          return false;
        }
      }, At = () => {
        try {
          return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 30, 1, 28, 0, 65, 0, 253, 15, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 253, 186, 1, 26, 11]));
        } catch {
          return false;
        }
      }, xt = () => {
        try {
          return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 19, 1, 17, 0, 65, 1, 253, 15, 65, 2, 253, 15, 65, 3, 253, 15, 253, 147, 2, 11]));
        } catch {
          return false;
        }
      }, We = async (e) => {
        if (we) return Promise.resolve();
        if (ne) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
        if (Me) throw new Error("previous call to 'initializeWebAssembly()' failed.");
        ne = true;
        let t = e.initTimeout, n = e.numThreads;
        if (e.simd !== false) {
          if (e.simd === "relaxed") {
            if (!xt()) throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
          } else if (!At()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
        }
        let o = Ut();
        n > 1 && !o && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + n + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), e.numThreads = n = 1);
        let r = e.wasmPaths, a = typeof r == "string" ? r : void 0, s = r?.mjs, i2 = s?.href ?? s, u = r?.wasm, f = u?.href ?? u, w = e.wasmBinary, [l, c] = await Ce(i2, a, n > 1, !!w || !!f), p = false, S = [];
        if (t > 0 && S.push(new Promise((h) => {
          setTimeout(() => {
            p = true, h();
          }, t);
        })), S.push(new Promise((h, v) => {
          let m = { numThreads: n };
          if (w) m.wasmBinary = w, m.locateFile = (b) => b;
          else if (f || a) m.locateFile = (b) => f ?? a + b;
          else if (i2 && i2.indexOf("blob:") !== 0) m.locateFile = (b) => new URL(b, i2).href;
          else if (l) {
            let b = xe();
            b && (m.locateFile = (M) => b + M);
          }
          c(m).then((b) => {
            ne = false, we = true, be = b, h(), l && URL.revokeObjectURL(l);
          }, (b) => {
            ne = false, Me = true, v(b);
          });
        })), await Promise.race(S), p) throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`);
      }, E = () => {
        if (we && be) return be;
        throw new Error("WebAssembly is not initialized yet.");
      };
    });
    oe = C2(() => {
      "use strict";
      V();
      A = (e, t) => {
        let n = E(), o = n.lengthBytesUTF8(e) + 1, r = n._malloc(o);
        return n.stringToUTF8(e, r, o), t.push(r), r;
      }, K = (e, t, n, o) => {
        if (typeof e == "object" && e !== null) {
          if (n.has(e)) throw new Error("Circular reference in options");
          n.add(e);
        }
        Object.entries(e).forEach(([r, a]) => {
          let s = t ? t + r : r;
          if (typeof a == "object") K(a, s + ".", n, o);
          else if (typeof a == "string" || typeof a == "number") o(s, a.toString());
          else if (typeof a == "boolean") o(s, a ? "1" : "0");
          else throw new Error(`Can't handle extra config type: ${typeof a}`);
        });
      }, g = (e) => {
        let t = E(), n = t.stackSave();
        try {
          let o = t.PTR_SIZE, r = t.stackAlloc(2 * o);
          t._OrtGetLastError(r, r + o);
          let a = Number(t.getValue(r, o === 4 ? "i32" : "i64")), s = t.getValue(r + o, "*"), i2 = s ? t.UTF8ToString(s) : "";
          throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${i2}`);
        } finally {
          t.stackRestore(n);
        }
      };
    });
    ke = C2(() => {
      "use strict";
      V();
      oe();
      Fe = (e) => {
        let t = E(), n = 0, o = [], r = e || {};
        try {
          if (e?.logSeverityLevel === void 0) r.logSeverityLevel = 2;
          else if (typeof e.logSeverityLevel != "number" || !Number.isInteger(e.logSeverityLevel) || e.logSeverityLevel < 0 || e.logSeverityLevel > 4) throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);
          if (e?.logVerbosityLevel === void 0) r.logVerbosityLevel = 0;
          else if (typeof e.logVerbosityLevel != "number" || !Number.isInteger(e.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);
          e?.terminate === void 0 && (r.terminate = false);
          let a = 0;
          return e?.tag !== void 0 && (a = A(e.tag, o)), n = t._OrtCreateRunOptions(r.logSeverityLevel, r.logVerbosityLevel, !!r.terminate, a), n === 0 && g("Can't create run options."), e?.extra !== void 0 && K(e.extra, "", /* @__PURE__ */ new WeakSet(), (s, i2) => {
            let u = A(s, o), f = A(i2, o);
            t._OrtAddRunConfigEntry(n, u, f) !== 0 && g(`Can't set a run config entry: ${s} - ${i2}.`);
          }), [n, o];
        } catch (a) {
          throw n !== 0 && t._OrtReleaseRunOptions(n), o.forEach((s) => t._free(s)), a;
        }
      };
    });
    Ne = C2(() => {
      "use strict";
      V();
      oe();
      Ct = (e) => {
        switch (e) {
          case "disabled":
            return 0;
          case "basic":
            return 1;
          case "extended":
            return 2;
          case "layout":
            return 3;
          case "all":
            return 99;
          default:
            throw new Error(`unsupported graph optimization level: ${e}`);
        }
      }, Mt = (e) => {
        switch (e) {
          case "sequential":
            return 0;
          case "parallel":
            return 1;
          default:
            throw new Error(`unsupported execution mode: ${e}`);
        }
      }, Wt = (e) => {
        e.extra || (e.extra = {}), e.extra.session || (e.extra.session = {});
        let t = e.extra.session;
        t.use_ort_model_bytes_directly || (t.use_ort_model_bytes_directly = "1"), e.executionProviders && e.executionProviders.some((n) => (typeof n == "string" ? n : n.name) === "webgpu") && (e.enableMemPattern = false);
      }, se = (e, t, n, o) => {
        let r = A(t, o), a = A(n, o);
        E()._OrtAddSessionConfigEntry(e, r, a) !== 0 && g(`Can't set a session config entry: ${t} - ${n}.`);
      }, Ft = async (e, t, n) => {
        let o = t.executionProviders;
        for (let r of o) {
          let a = typeof r == "string" ? r : r.name, s = [];
          switch (a) {
            case "webnn":
              if (a = "WEBNN", typeof r != "string") {
                let c = r?.deviceType;
                c && se(e, "deviceType", c, n);
              }
              break;
            case "webgpu":
              if (a = "JS", typeof r != "string") {
                let l = r;
                if (l?.preferredLayout) {
                  if (l.preferredLayout !== "NCHW" && l.preferredLayout !== "NHWC") throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${l.preferredLayout}`);
                  se(e, "preferredLayout", l.preferredLayout, n);
                }
              }
              break;
            case "wasm":
            case "cpu":
              continue;
            default:
              throw new Error(`not supported execution provider: ${a}`);
          }
          let i2 = A(a, n), u = s.length, f = 0, w = 0;
          if (u > 0) {
            f = E()._malloc(u * E().PTR_SIZE), n.push(f), w = E()._malloc(u * E().PTR_SIZE), n.push(w);
            for (let l = 0; l < u; l++) E().setValue(f + l * E().PTR_SIZE, s[l][0], "*"), E().setValue(w + l * E().PTR_SIZE, s[l][1], "*");
          }
          await E()._OrtAppendExecutionProvider(e, i2, f, w, u) !== 0 && g(`Can't append execution provider: ${a}.`);
        }
      }, Re = async (e) => {
        let t = E(), n = 0, o = [], r = e || {};
        Wt(r);
        try {
          let a = Ct(r.graphOptimizationLevel ?? "all"), s = Mt(r.executionMode ?? "sequential"), i2 = typeof r.logId == "string" ? A(r.logId, o) : 0, u = r.logSeverityLevel ?? 2;
          if (!Number.isInteger(u) || u < 0 || u > 4) throw new Error(`log severity level is not valid: ${u}`);
          let f = r.logVerbosityLevel ?? 0;
          if (!Number.isInteger(f) || f < 0 || f > 4) throw new Error(`log verbosity level is not valid: ${f}`);
          let w = typeof r.optimizedModelFilePath == "string" ? A(r.optimizedModelFilePath, o) : 0;
          if (n = t._OrtCreateSessionOptions(a, !!r.enableCpuMemArena, !!r.enableMemPattern, s, !!r.enableProfiling, 0, i2, u, f, w), n === 0 && g("Can't create session options."), r.executionProviders && await Ft(n, r, o), r.enableGraphCapture !== void 0) {
            if (typeof r.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${r.enableGraphCapture}`);
            se(n, "enableGraphCapture", r.enableGraphCapture.toString(), o);
          }
          if (r.freeDimensionOverrides) for (let [l, c] of Object.entries(r.freeDimensionOverrides)) {
            if (typeof l != "string") throw new Error(`free dimension override name must be a string: ${l}`);
            if (typeof c != "number" || !Number.isInteger(c) || c < 0) throw new Error(`free dimension override value must be a non-negative integer: ${c}`);
            let p = A(l, o);
            t._OrtAddFreeDimensionOverride(n, p, c) !== 0 && g(`Can't set a free dimension override: ${l} - ${c}.`);
          }
          return r.extra !== void 0 && K(r.extra, "", /* @__PURE__ */ new WeakSet(), (l, c) => {
            se(n, l, c, o);
          }), [n, o];
        } catch (a) {
          throw n !== 0 && t._OrtReleaseSessionOptions(n) !== 0 && g("Can't release session options."), o.forEach((s) => t._free(s)), a;
        }
      };
    });
    ge = C2(() => {
      "use strict";
      J = (e) => {
        switch (e) {
          case "int8":
            return 3;
          case "uint8":
            return 2;
          case "bool":
            return 9;
          case "int16":
            return 5;
          case "uint16":
            return 4;
          case "int32":
            return 6;
          case "uint32":
            return 12;
          case "float16":
            return 10;
          case "float32":
            return 1;
          case "float64":
            return 11;
          case "string":
            return 8;
          case "int64":
            return 7;
          case "uint64":
            return 13;
          case "int4":
            return 22;
          case "uint4":
            return 21;
          default:
            throw new Error(`unsupported data type: ${e}`);
        }
      }, ae = (e) => {
        switch (e) {
          case 3:
            return "int8";
          case 2:
            return "uint8";
          case 9:
            return "bool";
          case 5:
            return "int16";
          case 4:
            return "uint16";
          case 6:
            return "int32";
          case 12:
            return "uint32";
          case 10:
            return "float16";
          case 1:
            return "float32";
          case 11:
            return "float64";
          case 8:
            return "string";
          case 7:
            return "int64";
          case 13:
            return "uint64";
          case 22:
            return "int4";
          case 21:
            return "uint4";
          default:
            throw new Error(`unsupported data type: ${e}`);
        }
      }, q = (e, t) => {
        let n = [-1, 4, 1, 1, 2, 2, 4, 8, -1, 1, 2, 8, 4, 8, -1, -1, -1, -1, -1, -1, -1, 0.5, 0.5][e], o = typeof t == "number" ? t : t.reduce((r, a) => r * a, 1);
        return n > 0 ? Math.ceil(o * n) : void 0;
      }, Ge = (e) => {
        switch (e) {
          case "float16":
            return typeof Float16Array < "u" && Float16Array.from ? Float16Array : Uint16Array;
          case "float32":
            return Float32Array;
          case "uint8":
            return Uint8Array;
          case "int8":
            return Int8Array;
          case "uint16":
            return Uint16Array;
          case "int16":
            return Int16Array;
          case "int32":
            return Int32Array;
          case "bool":
            return Uint8Array;
          case "float64":
            return Float64Array;
          case "uint32":
            return Uint32Array;
          case "int64":
            return BigInt64Array;
          case "uint64":
            return BigUint64Array;
          default:
            throw new Error(`unsupported type: ${e}`);
        }
      }, je = (e) => {
        switch (e) {
          case "verbose":
            return 0;
          case "info":
            return 1;
          case "warning":
            return 2;
          case "error":
            return 3;
          case "fatal":
            return 4;
          default:
            throw new Error(`unsupported logging level: ${e}`);
        }
      }, ie = (e) => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", ue = (e) => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint64" || e === "int8" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", $e = (e) => {
        switch (e) {
          case "none":
            return 0;
          case "cpu":
            return 1;
          case "cpu-pinned":
            return 2;
          case "texture":
            return 3;
          case "gpu-buffer":
            return 4;
          case "ml-tensor":
            return 5;
          default:
            throw new Error(`unsupported data location: ${e}`);
        }
      };
    });
    ye = C2(() => {
      "use strict";
      re();
      Q = async (e) => {
        if (typeof e == "string") if (j) try {
          let { readFile: t } = de("node:fs/promises");
          return new Uint8Array(await t(e));
        } catch (t) {
          if (t.code === "ERR_FS_FILE_TOO_LARGE") {
            let { createReadStream: n } = de("node:fs"), o = n(e), r = [];
            for await (let a of o) r.push(a);
            return new Uint8Array(Buffer.concat(r));
          }
          throw t;
        }
        else {
          let t = await fetch(e);
          if (!t.ok) throw new Error(`failed to load external data file: ${e}`);
          let n = t.headers.get("Content-Length"), o = n ? parseInt(n, 10) : 0;
          if (o < 1073741824) return new Uint8Array(await t.arrayBuffer());
          {
            if (!t.body) throw new Error(`failed to load external data file: ${e}, no response body.`);
            let r = t.body.getReader(), a;
            try {
              a = new ArrayBuffer(o);
            } catch (i2) {
              if (i2 instanceof RangeError) {
                let u = Math.ceil(o / 65536);
                a = new WebAssembly.Memory({ initial: u, maximum: u }).buffer;
              } else throw i2;
            }
            let s = 0;
            for (; ; ) {
              let { done: i2, value: u } = await r.read();
              if (i2) break;
              let f = u.byteLength;
              new Uint8Array(a, s, f).set(u), s += f;
            }
            return new Uint8Array(a, 0, o);
          }
        }
        else return e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : e instanceof Uint8Array ? e : new Uint8Array(e);
      };
    });
    et = C2(() => {
      "use strict";
      ke();
      Ne();
      ge();
      V();
      oe();
      ye();
      kt = (e, t) => {
        E()._OrtInit(e, t) !== 0 && g("Can't initialize onnxruntime.");
      }, qe = async (e) => {
        kt(e.wasm.numThreads, je(e.logLevel));
      }, Ye = async (e, t) => {
        E().asyncInit?.();
        let n = e.webgpu.adapter;
        if (t === "webgpu") {
          if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment");
          if (n) {
            if (typeof n.limits != "object" || typeof n.features != "object" || typeof n.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
          } else {
            let o = e.webgpu.powerPreference;
            if (o !== void 0 && o !== "low-power" && o !== "high-performance") throw new Error(`Invalid powerPreference setting: "${o}"`);
            let r = e.webgpu.forceFallbackAdapter;
            if (r !== void 0 && typeof r != "boolean") throw new Error(`Invalid forceFallbackAdapter setting: "${r}"`);
            if (n = await navigator.gpu.requestAdapter({ powerPreference: o, forceFallbackAdapter: r }), !n) throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.');
          }
        }
        if (t === "webnn" && (typeof navigator > "u" || !navigator.ml)) throw new Error("WebNN is not supported in current environment");
      }, Y = /* @__PURE__ */ new Map(), Rt = (e) => {
        let t = E(), n = t.stackSave();
        try {
          let o = t.PTR_SIZE, r = t.stackAlloc(2 * o);
          t._OrtGetInputOutputCount(e, r, r + o) !== 0 && g("Can't get session input/output count.");
          let s = o === 4 ? "i32" : "i64";
          return [Number(t.getValue(r, s)), Number(t.getValue(r + o, s))];
        } finally {
          t.stackRestore(n);
        }
      }, Ve = (e, t) => {
        let n = E(), o = n.stackSave(), r = 0;
        try {
          let a = n.PTR_SIZE, s = n.stackAlloc(2 * a);
          n._OrtGetInputOutputMetadata(e, t, s, s + a) !== 0 && g("Can't get session input/output metadata.");
          let u = Number(n.getValue(s, "*"));
          r = Number(n.getValue(s + a, "*"));
          let f = n.HEAP32[r / 4];
          if (f === 0) return [u, 0];
          let w = n.HEAPU32[r / 4 + 1], l = [];
          for (let c = 0; c < w; c++) {
            let p = Number(n.getValue(r + 8 + c * a, "*"));
            l.push(p !== 0 ? n.UTF8ToString(p) : Number(n.getValue(r + 8 + (c + w) * a, "*")));
          }
          return [u, f, l];
        } finally {
          n.stackRestore(o), r !== 0 && n._OrtFree(r);
        }
      }, Ee = (e) => {
        let t = E(), n = t._malloc(e.byteLength);
        if (n === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);
        return t.HEAPU8.set(e, n), [n, e.byteLength];
      }, Ze = async (e, t) => {
        let n, o, r = E();
        Array.isArray(e) ? [n, o] = e : e.buffer === r.HEAPU8.buffer ? [n, o] = [e.byteOffset, e.byteLength] : [n, o] = Ee(e);
        let a = 0, s = 0, i2 = 0, u = [], f = [], w = [];
        try {
          if ([s, u] = await Re(t), t?.externalData && r.mountExternalData) {
            let y = [];
            for (let O of t.externalData) {
              let B = typeof O == "string" ? O : O.path;
              y.push(Q(typeof O == "string" ? O : O.data).then((U) => {
                r.mountExternalData(B, U);
              }));
            }
            await Promise.all(y);
          }
          for (let y of t?.executionProviders ?? []) if ((typeof y == "string" ? y : y.name) === "webnn") {
            if (r.shouldTransferToMLTensor = false, typeof y != "string") {
              let B = y, U = B?.context, _ = B?.gpuDevice, Z = B?.deviceType, z = B?.powerPreference;
              U ? r.currentContext = U : _ ? r.currentContext = await r.webnnCreateMLContext(_) : r.currentContext = await r.webnnCreateMLContext({ deviceType: Z, powerPreference: z });
            } else r.currentContext = await r.webnnCreateMLContext();
            break;
          }
          a = await r._OrtCreateSession(n, o, s), r.webgpuOnCreateSession?.(a), a === 0 && g("Can't create a session."), r.jsepOnCreateSession?.(), r.currentContext && (r.webnnRegisterMLContext(a, r.currentContext), r.currentContext = void 0, r.shouldTransferToMLTensor = true);
          let [l, c] = Rt(a), p = !!t?.enableGraphCapture, S = [], h = [], v = [], m = [], b = [];
          for (let y = 0; y < l; y++) {
            let [O, B, U] = Ve(a, y);
            O === 0 && g("Can't get an input name."), f.push(O);
            let _ = r.UTF8ToString(O);
            S.push(_), v.push(B === 0 ? { name: _, isTensor: false } : { name: _, isTensor: true, type: ae(B), shape: U });
          }
          for (let y = 0; y < c; y++) {
            let [O, B, U] = Ve(a, y + l);
            O === 0 && g("Can't get an output name."), w.push(O);
            let _ = r.UTF8ToString(O);
            h.push(_), m.push(B === 0 ? { name: _, isTensor: false } : { name: _, isTensor: true, type: ae(B), shape: U });
          }
          return Y.set(a, [a, f, w, null, p, false]), [a, S, h, v, m];
        } catch (l) {
          throw f.forEach((c) => r._OrtFree(c)), w.forEach((c) => r._OrtFree(c)), i2 !== 0 && r._OrtReleaseBinding(i2) !== 0 && g("Can't release IO binding."), a !== 0 && r._OrtReleaseSession(a) !== 0 && g("Can't release session."), l;
        } finally {
          r._free(n), s !== 0 && r._OrtReleaseSessionOptions(s) !== 0 && g("Can't release session options."), u.forEach((l) => r._free(l)), r.unmountExternalData?.();
        }
      }, Xe = (e) => {
        let t = E(), n = Y.get(e);
        if (!n) throw new Error(`cannot release session. invalid session id: ${e}`);
        let [o, r, a, s, i2] = n;
        s && (i2 && t._OrtClearBoundOutputs(s.handle) !== 0 && g("Can't clear bound outputs."), t._OrtReleaseBinding(s.handle) !== 0 && g("Can't release IO binding.")), t.jsepOnReleaseSession?.(e), t.webnnOnReleaseSession?.(e), t.webgpuOnReleaseSession?.(e), r.forEach((u) => t._OrtFree(u)), a.forEach((u) => t._OrtFree(u)), t._OrtReleaseSession(o) !== 0 && g("Can't release session."), Y.delete(e);
      }, Je = async (e, t, n, o, r, a, s = false) => {
        if (!e) {
          t.push(0);
          return;
        }
        let i2 = E(), u = i2.PTR_SIZE, f = e[0], w = e[1], l = e[3], c = l, p, S;
        if (f === "string" && (l === "gpu-buffer" || l === "ml-tensor")) throw new Error("String tensor is not supported on GPU.");
        if (s && l !== "gpu-buffer") throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);
        if (l === "gpu-buffer") {
          let m = e[2].gpuBuffer;
          S = q(J(f), w);
          {
            let b = i2.jsepRegisterBuffer;
            if (!b) throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
            p = b(o, a, m, S);
          }
        } else if (l === "ml-tensor") {
          let m = e[2].mlTensor;
          S = q(J(f), w);
          let b = i2.webnnRegisterMLTensor;
          if (!b) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
          p = b(o, m, J(f), w);
        } else {
          let m = e[2];
          if (Array.isArray(m)) {
            S = u * m.length, p = i2._malloc(S), n.push(p);
            for (let b = 0; b < m.length; b++) {
              if (typeof m[b] != "string") throw new TypeError(`tensor data at index ${b} is not a string`);
              i2.setValue(p + b * u, A(m[b], n), "*");
            }
          } else {
            let b = i2.webnnIsGraphInput, M = i2.webnnIsGraphOutput;
            if (f !== "string" && b && M) {
              let y = i2.UTF8ToString(r);
              if (b(o, y) || M(o, y)) {
                let O = J(f);
                S = q(O, w), c = "ml-tensor";
                let B = i2.webnnCreateTemporaryTensor, U = i2.webnnUploadTensor;
                if (!B || !U) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
                let _ = await B(o, O, w);
                U(_, new Uint8Array(m.buffer, m.byteOffset, m.byteLength)), p = _;
              } else S = m.byteLength, p = i2._malloc(S), n.push(p), i2.HEAPU8.set(new Uint8Array(m.buffer, m.byteOffset, S), p);
            } else S = m.byteLength, p = i2._malloc(S), n.push(p), i2.HEAPU8.set(new Uint8Array(m.buffer, m.byteOffset, S), p);
          }
        }
        let h = i2.stackSave(), v = i2.stackAlloc(4 * w.length);
        try {
          w.forEach((b, M) => i2.setValue(v + M * u, b, u === 4 ? "i32" : "i64"));
          let m = i2._OrtCreateTensor(J(f), p, S, v, w.length, $e(c));
          m === 0 && g(`Can't create tensor for input/output. session=${o}, index=${a}.`), t.push(m);
        } finally {
          i2.stackRestore(h);
        }
      }, Ke = async (e, t, n, o, r, a) => {
        let s = E(), i2 = s.PTR_SIZE, u = Y.get(e);
        if (!u) throw new Error(`cannot run inference. invalid session id: ${e}`);
        let f = u[0], w = u[1], l = u[2], c = u[3], p = u[4], S = u[5], h = t.length, v = o.length, m = 0, b = [], M = [], y = [], O = [], B = [], U = s.stackSave(), _ = s.stackAlloc(h * i2), Z = s.stackAlloc(h * i2), z = s.stackAlloc(v * i2), Te = s.stackAlloc(v * i2);
        try {
          [m, b] = Fe(a), TRACE_EVENT_BEGIN("wasm prepareInputOutputTensor");
          for (let d = 0; d < h; d++) await Je(n[d], M, O, e, w[t[d]], t[d], p);
          for (let d = 0; d < v; d++) await Je(r[d], y, O, e, l[o[d]], h + o[d], p);
          TRACE_EVENT_END("wasm prepareInputOutputTensor");
          for (let d = 0; d < h; d++) s.setValue(_ + d * i2, M[d], "*"), s.setValue(Z + d * i2, w[t[d]], "*");
          for (let d = 0; d < v; d++) s.setValue(z + d * i2, y[d], "*"), s.setValue(Te + d * i2, l[o[d]], "*");
          s.jsepOnRunStart?.(f), s.webnnOnRunStart?.(f);
          let x;
          x = await s._OrtRun(f, Z, _, h, Te, v, z, m), x !== 0 && g("failed to call OrtRun().");
          let k = [], Le = [];
          TRACE_EVENT_BEGIN("wasm ProcessOutputTensor");
          for (let d = 0; d < v; d++) {
            let W = Number(s.getValue(z + d * i2, "*"));
            if (W === y[d] || B.includes(y[d])) {
              k.push(r[d]), W !== y[d] && s._OrtReleaseTensor(W) !== 0 && g("Can't release tensor.");
              continue;
            }
            let Be = s.stackSave(), F = s.stackAlloc(4 * i2), H = false, T, P = 0;
            try {
              s._OrtGetTensorData(W, F, F + i2, F + 2 * i2, F + 3 * i2) !== 0 && g(`Can't access output tensor data on index ${d}.`);
              let fe = i2 === 4 ? "i32" : "i64", ee = Number(s.getValue(F, fe));
              P = s.getValue(F + i2, "*");
              let _e = s.getValue(F + i2 * 2, "*"), yt = Number(s.getValue(F + i2 * 3, fe)), R = [];
              for (let L = 0; L < yt; L++) R.push(Number(s.getValue(_e + L * i2, fe)));
              s._OrtFree(_e) !== 0 && g("Can't free memory for tensor dims.");
              let N = R.reduce((L, I) => L * I, 1);
              T = ae(ee);
              let X = c?.outputPreferredLocations[o[d]];
              if (T === "string") {
                if (X === "gpu-buffer" || X === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
                let L = [];
                for (let I = 0; I < N; I++) {
                  let G = s.getValue(P + I * i2, "*"), te = s.getValue(P + (I + 1) * i2, "*"), Pe = I === N - 1 ? void 0 : te - G;
                  L.push(s.UTF8ToString(G, Pe));
                }
                k.push([T, R, L, "cpu"]);
              } else if (X === "gpu-buffer" && N > 0) {
                let L = s.jsepGetBuffer;
                if (!L) throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
                let I = L(P), G = q(ee, N);
                if (G === void 0 || !ie(T)) throw new Error(`Unsupported data type: ${T}`);
                H = true, k.push([T, R, { gpuBuffer: I, download: s.jsepCreateDownloader(I, G, T), dispose: () => {
                  s._OrtReleaseTensor(W) !== 0 && g("Can't release tensor.");
                } }, "gpu-buffer"]);
              } else if (X === "ml-tensor" && N > 0) {
                let L = s.webnnEnsureTensor, I = s.webnnIsGraphInputOutputTypeSupported;
                if (!L || !I) throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
                if (q(ee, N) === void 0 || !ue(T)) throw new Error(`Unsupported data type: ${T}`);
                if (!I(e, T, false)) throw new Error(`preferredLocation "ml-tensor" for ${T} output is not supported by current WebNN Context.`);
                let te = await L(e, P, ee, R, false);
                H = true, k.push([T, R, { mlTensor: te, download: s.webnnCreateMLTensorDownloader(P, T), dispose: () => {
                  s.webnnReleaseTensorId(P), s._OrtReleaseTensor(W);
                } }, "ml-tensor"]);
              } else if (X === "ml-tensor-cpu-output" && N > 0) {
                let L = s.webnnCreateMLTensorDownloader(P, T)(), I = k.length;
                H = true, Le.push((async () => {
                  let G = [I, await L];
                  return s.webnnReleaseTensorId(P), s._OrtReleaseTensor(W), G;
                })()), k.push([T, R, [], "cpu"]);
              } else {
                let L = Ge(T), I = new L(N);
                new Uint8Array(I.buffer, I.byteOffset, I.byteLength).set(s.HEAPU8.subarray(P, P + I.byteLength)), k.push([T, R, I, "cpu"]);
              }
            } finally {
              s.stackRestore(Be), T === "string" && P && s._free(P), H || s._OrtReleaseTensor(W);
            }
          }
          c && !p && (s._OrtClearBoundOutputs(c.handle) !== 0 && g("Can't clear bound outputs."), Y.set(e, [f, w, l, c, p, false]));
          for (let [d, W] of await Promise.all(Le)) k[d][2] = W;
          return TRACE_EVENT_END("wasm ProcessOutputTensor"), k;
        } finally {
          s.webnnOnRunEnd?.(f), s.stackRestore(U), M.forEach((x) => s._OrtReleaseTensor(x)), y.forEach((x) => s._OrtReleaseTensor(x)), O.forEach((x) => s._free(x)), m !== 0 && s._OrtReleaseRunOptions(m), b.forEach((x) => s._free(x));
        }
      }, Qe = (e) => {
        let t = E(), n = Y.get(e);
        if (!n) throw new Error("invalid session id");
        let o = n[0], r = t._OrtEndProfiling(o);
        r === 0 && g("Can't get an profile file name."), t._OrtFree(r);
      };
    });
    Oe = C2(() => {
      "use strict";
      et();
      V();
      me();
      Se = false, tt = false, rt = false, nt = async () => {
        if (!tt) {
          if (Se) throw new Error("multiple calls to 'initWasm()' detected.");
          if (rt) throw new Error("previous call to 'initWasm()' failed.");
          Se = true;
          try {
            await We(env2.wasm), await qe(env2), tt = true;
          } catch (e) {
            throw rt = true, e;
          } finally {
            Se = false;
          }
        }
      }, ot = async (e) => {
        await Ye(env2, e);
      }, st = async (e) => Ee(e), at = async (e, t) => Ze(e, t), it = async (e) => {
        Xe(e);
      }, ut = async (e, t, n, o, r, a) => Ke(e, t, n, o, r, a), ct = async (e) => {
        Qe(e);
      };
    });
    dt = C2(() => {
      "use strict";
      Oe();
      ge();
      re();
      ye();
      pt = (e, t) => {
        switch (e.location) {
          case "cpu":
            return [e.type, e.dims, e.data, "cpu"];
          case "gpu-buffer":
            return [e.type, e.dims, { gpuBuffer: e.gpuBuffer }, "gpu-buffer"];
          case "ml-tensor":
            return [e.type, e.dims, { mlTensor: e.mlTensor }, "ml-tensor"];
          default:
            throw new Error(`invalid data location: ${e.location} for ${t()}`);
        }
      }, Gt = (e) => {
        switch (e[3]) {
          case "cpu":
            return new Tensor2(e[0], e[2], e[1]);
          case "gpu-buffer": {
            let t = e[0];
            if (!ie(t)) throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);
            let { gpuBuffer: n, download: o, dispose: r } = e[2];
            return Tensor2.fromGpuBuffer(n, { dataType: t, dims: e[1], download: o, dispose: r });
          }
          case "ml-tensor": {
            let t = e[0];
            if (!ue(t)) throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);
            let { mlTensor: n, download: o, dispose: r } = e[2];
            return Tensor2.fromMLTensor(n, { dataType: t, dims: e[1], download: o, dispose: r });
          }
          default:
            throw new Error(`invalid data location: ${e[3]}`);
        }
      }, ce = class {
        async fetchModelAndCopyToWasmMemory(t) {
          return st(await Q(t));
        }
        async loadModel(t, n) {
          TRACE_FUNC_BEGIN();
          let o;
          typeof t == "string" ? j ? o = await Q(t) : o = await this.fetchModelAndCopyToWasmMemory(t) : o = t, [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await at(o, n), TRACE_FUNC_END();
        }
        async dispose() {
          return it(this.sessionId);
        }
        async run(t, n, o) {
          TRACE_FUNC_BEGIN();
          let r = [], a = [];
          Object.entries(t).forEach((c) => {
            let p = c[0], S = c[1], h = this.inputNames.indexOf(p);
            if (h === -1) throw new Error(`invalid input '${p}'`);
            r.push(S), a.push(h);
          });
          let s = [], i2 = [];
          Object.entries(n).forEach((c) => {
            let p = c[0], S = c[1], h = this.outputNames.indexOf(p);
            if (h === -1) throw new Error(`invalid output '${p}'`);
            s.push(S), i2.push(h);
          });
          let u = r.map((c, p) => pt(c, () => `input "${this.inputNames[a[p]]}"`)), f = s.map((c, p) => c ? pt(c, () => `output "${this.outputNames[i2[p]]}"`) : null), w = await ut(this.sessionId, a, u, i2, f, o), l = {};
          for (let c = 0; c < w.length; c++) l[this.outputNames[i2[c]]] = s[c] ?? Gt(w[c]);
          return TRACE_FUNC_END(), l;
        }
        startProfiling() {
        }
        endProfiling() {
          ct(this.sessionId);
        }
      };
    });
    bt = {};
    Ot(bt, { OnnxruntimeWebAssemblyBackend: () => le, initializeFlags: () => mt, wasmBackend: () => jt });
    wt = C2(() => {
      "use strict";
      Oe();
      dt();
      mt = () => {
        (typeof env2.wasm.initTimeout != "number" || env2.wasm.initTimeout < 0) && (env2.wasm.initTimeout = 0);
        let e = env2.wasm.simd;
        if (typeof e != "boolean" && e !== void 0 && e !== "fixed" && e !== "relaxed" && (console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`), env2.wasm.simd = false), typeof env2.wasm.proxy != "boolean" && (env2.wasm.proxy = false), typeof env2.wasm.trace != "boolean" && (env2.wasm.trace = false), typeof env2.wasm.numThreads != "number" || !Number.isInteger(env2.wasm.numThreads) || env2.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) env2.wasm.numThreads = 1;
        else {
          let t = typeof navigator > "u" ? de("node:os").cpus().length : navigator.hardwareConcurrency;
          env2.wasm.numThreads = Math.min(4, Math.ceil((t || 1) / 2));
        }
      }, le = class {
        async init(t) {
          mt(), await nt(), await ot(t);
        }
        async createInferenceSessionHandler(t, n) {
          let o = new ce();
          return await o.loadModel(t, n), o;
        }
      }, jt = new le();
    });
    ve = "1.24.3";
    Hr = esm_exports;
    {
      let e = (wt(), Tt(bt)).wasmBackend;
      registerBackend("cpu", e, 10), registerBackend("wasm", e, 10);
    }
    Object.defineProperty(env2.versions, "web", { value: ve, enumerable: true });
  }
});

// node_modules/@xenova/transformers/src/backends/onnx.js
var ONNX_NODE, ONNX, executionProviders;
var init_onnx = __esm({
  "node_modules/@xenova/transformers/src/backends/onnx.js"() {
    ONNX_NODE = __toESM(require_dist(), 1);
    init_ort_node_min();
    executionProviders = [
      // 'webgpu',
      "wasm"
    ];
    if (typeof process !== "undefined" && process?.release?.name === "node") {
      ONNX = ONNX_NODE;
      executionProviders.unshift("cpu");
    } else {
      ONNX = ort_node_min_exports;
      const isIOS = typeof navigator !== "undefined" && /iP(hone|od|ad)/.test(navigator.userAgent);
      if (isIOS) {
        ONNX.env.wasm.simd = false;
      }
    }
    ONNX = ONNX.default ?? ONNX;
  }
});

// node_modules/@xenova/transformers/src/env.js
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
var import_fs, import_path, import_url, import_meta2, onnx_env, WEB_CACHE_AVAILABLE, FS_AVAILABLE, PATH_AVAILABLE, RUNNING_LOCALLY, __dirname2, DEFAULT_CACHE_DIR, DEFAULT_LOCAL_MODEL_PATH, localModelPath, env3;
var init_env2 = __esm({
  "node_modules/@xenova/transformers/src/env.js"() {
    import_fs = __toESM(require("fs"), 1);
    import_path = __toESM(require("path"), 1);
    import_url = __toESM(require("url"), 1);
    init_onnx();
    import_meta2 = {};
    ({ env: onnx_env } = ONNX);
    WEB_CACHE_AVAILABLE = typeof self !== "undefined" && "caches" in self;
    FS_AVAILABLE = !isEmpty(import_fs.default);
    PATH_AVAILABLE = !isEmpty(import_path.default);
    RUNNING_LOCALLY = FS_AVAILABLE && PATH_AVAILABLE;
    __dirname2 = RUNNING_LOCALLY ? import_path.default.dirname(import_path.default.dirname(import_url.default.fileURLToPath(import_meta2.url))) : "./";
    DEFAULT_CACHE_DIR = RUNNING_LOCALLY ? import_path.default.join(__dirname2, "/.cache/") : null;
    DEFAULT_LOCAL_MODEL_PATH = "/models/";
    localModelPath = RUNNING_LOCALLY ? import_path.default.join(__dirname2, DEFAULT_LOCAL_MODEL_PATH) : DEFAULT_LOCAL_MODEL_PATH;
    onnx_env.wasm.wasmPaths = RUNNING_LOCALLY ? import_path.default.join(__dirname2, "/dist/") : "https://cdn.jsdelivr.net/npm/@xenova/transformers/dist/";
    env3 = {
      /////////////////// Backends settings ///////////////////
      backends: {
        // onnxruntime-web/onnxruntime-node
        onnx: onnx_env,
        // TensorFlow.js
        tfjs: {}
      },
      __dirname: __dirname2,
      /////////////////// Model settings ///////////////////
      allowRemoteModels: true,
      remoteHost: "https://huggingface.co/",
      remotePathTemplate: "{model}/resolve/{revision}/",
      allowLocalModels: true,
      localModelPath,
      useFS: FS_AVAILABLE,
      /////////////////// Cache settings ///////////////////
      useBrowserCache: WEB_CACHE_AVAILABLE,
      useFSCache: FS_AVAILABLE,
      cacheDir: DEFAULT_CACHE_DIR
      //////////////////////////////////////////////////////
    };
  }
});

// node_modules/@xenova/transformers/src/utils/hub.js
function isValidHttpUrl(string) {
  let url2;
  try {
    url2 = new URL(string);
  } catch (_) {
    return false;
  }
  return url2.protocol === "http:" || url2.protocol === "https:";
}
async function getFile(urlOrPath) {
  if (env3.useFS && !isValidHttpUrl(urlOrPath)) {
    return new FileResponse(urlOrPath);
  } else {
    return fetch(urlOrPath);
  }
}
function handleError(status, remoteURL, fatal) {
  if (!fatal) {
    return null;
  }
  switch (status) {
    // 4xx errors (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses)
    case 400:
      throw Error(`Bad request error occurred while trying to load file: "${remoteURL}".`);
    case 401:
      throw Error(`Unauthorized access to file: "${remoteURL}".`);
    case 403:
      throw Error(`Forbidden access to file: "${remoteURL}".`);
    case 404:
      throw Error(`Could not locate file: "${remoteURL}".`);
    case 408:
      throw Error(`Request timeout error occurred while trying to load file: "${remoteURL}".`);
    // 5xx errors (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses)
    case 500:
      throw Error(`Internal server error error occurred while trying to load file: "${remoteURL}".`);
    case 502:
      throw Error(`Bad gateway error occurred while trying to load file: "${remoteURL}".`);
    case 503:
      throw Error(`Service unavailable error occurred while trying to load file: "${remoteURL}".`);
    case 504:
      throw Error(`Gateway timeout error occurred while trying to load file: "${remoteURL}".`);
    // Other:
    default:
      throw Error(`Error (${status}) occurred while trying to load file: "${remoteURL}".`);
  }
}
async function getModelFile(path_or_repo_id, filename, fatal = true, options = {}) {
  if (!env3.allowLocalModels) {
    if (options.local_files_only) {
      throw Error("Invalid configuration detected: local models are disabled (`env.allowLocalModels=false`) but you have requested to only use local models (`local_files_only=true`).");
    } else if (!env3.allowRemoteModels) {
      throw Error("Invalid configuration detected: both local and remote models are disabled. Fix by setting `env.allowLocalModels` or `env.allowRemoteModels` to `true`.");
    }
  }
  dispatchCallback(options.progress_callback, {
    status: "initiate",
    name: path_or_repo_id,
    file: filename
  });
  let cache;
  if (!cache && env3.useBrowserCache) {
    if (typeof caches === "undefined") {
      throw Error("Browser cache is not available in this environment.");
    }
    cache = await caches.open("transformers-cache");
  }
  if (!cache && env3.useFSCache) {
    cache = new FileCache(options.cache_dir ?? env3.cacheDir);
  }
  const request = pathJoin(path_or_repo_id, filename);
  let responseToCache;
  let response;
  if (cache) {
    response = await cache.match(request);
  }
  if (response === void 0) {
    let isURL = isValidHttpUrl(request);
    let localPath = pathJoin(env3.localModelPath, request);
    if (env3.allowLocalModels) {
      if (!isURL) {
        try {
          response = await getFile(localPath);
        } catch (e) {
          console.warn(`Unable to load from local path "${localPath}": "${e}"`);
        }
      } else if (options.local_files_only) {
        throw new Error(`\`local_files_only=true\`, but attempted to load a remote file from: ${request}.`);
      } else if (!env3.allowRemoteModels) {
        throw new Error(`\`env.allowRemoteModels=false\`, but attempted to load a remote file from: ${request}.`);
      }
    }
    if (response === void 0 || response.status === 404) {
      if (options.local_files_only || !env3.allowRemoteModels) {
        if (fatal) {
          throw Error(`\`local_files_only=true\` or \`env.allowRemoteModels=false\` and file was not found locally at "${localPath}".`);
        } else {
          return null;
        }
      }
      let remoteURL = pathJoin(
        env3.remoteHost,
        env3.remotePathTemplate.replace("{model}", path_or_repo_id).replace("{revision}", options.revision ?? "main"),
        filename
      );
      response = await getFile(remoteURL);
      if (response.status !== 200) {
        return handleError(response.status, remoteURL, fatal);
      }
    }
    if (cache && response instanceof Response && response.status === 200) {
      responseToCache = response.clone();
    }
  }
  dispatchCallback(options.progress_callback, {
    status: "download",
    name: path_or_repo_id,
    file: filename
  });
  const buffer = await readResponse(response, (data) => {
    dispatchCallback(options.progress_callback, {
      status: "progress",
      ...data,
      name: path_or_repo_id,
      file: filename
    });
  });
  if (
    // Only cache web responses
    // i.e., do not cache FileResponses (prevents duplication)
    responseToCache && // Check again whether request is in cache. If not, we add the response to the cache
    await cache.match(request) === void 0
  ) {
    await cache.put(request, responseToCache).catch((err2) => {
      console.warn(`Unable to add ${request} to browser cache: ${err2}.`);
    });
  }
  dispatchCallback(options.progress_callback, {
    status: "done",
    name: path_or_repo_id,
    file: filename
  });
  return buffer;
}
async function getModelJSON(modelPath, fileName, fatal = true, options = {}) {
  let buffer = await getModelFile(modelPath, fileName, fatal, options);
  if (buffer === null) {
    return {};
  }
  let decoder = new TextDecoder("utf-8");
  let jsonData = decoder.decode(buffer);
  return JSON.parse(jsonData);
}
async function readResponse(response, progress_callback) {
  const contentLength = response.headers.get("Content-Length");
  if (contentLength === null) {
    console.warn("Unable to determine content-length from response headers. Will expand buffer when needed.");
  }
  let total = parseInt(contentLength ?? "0");
  let buffer = new Uint8Array(total);
  let loaded = 0;
  const reader = response.body.getReader();
  async function read() {
    const { done, value } = await reader.read();
    if (done) return;
    let newLoaded = loaded + value.length;
    if (newLoaded > total) {
      total = newLoaded;
      let newBuffer = new Uint8Array(total);
      newBuffer.set(buffer);
      buffer = newBuffer;
    }
    buffer.set(value, loaded);
    loaded = newLoaded;
    const progress = loaded / total * 100;
    progress_callback({
      progress,
      loaded,
      total
    });
    return read();
  }
  await read();
  return buffer;
}
function pathJoin(...parts2) {
  parts2 = parts2.map((part, index) => {
    if (index) {
      part = part.replace(new RegExp("^/"), "");
    }
    if (index !== parts2.length - 1) {
      part = part.replace(new RegExp("/$"), "");
    }
    return part;
  });
  return parts2.join("/");
}
var import_fs2, import_path2, import_web, Headers, FileResponse, FileCache;
var init_hub = __esm({
  "node_modules/@xenova/transformers/src/utils/hub.js"() {
    import_fs2 = __toESM(require("fs"), 1);
    import_path2 = __toESM(require("path"), 1);
    import_web = __toESM(require("stream/web"), 1);
    init_env2();
    init_core();
    if (!globalThis.ReadableStream) {
      globalThis.ReadableStream = import_web.default.ReadableStream;
    }
    Headers = class _Headers extends Object {
      constructor(...args2) {
        super();
        Object.assign(this, args2);
      }
      get(key) {
        return this[key];
      }
      clone() {
        return new _Headers(this);
      }
    };
    FileResponse = class _FileResponse {
      /**
       * Mapping from file extensions to MIME types.
       */
      _CONTENT_TYPE_MAP = {
        "txt": "text/plain",
        "html": "text/html",
        "css": "text/css",
        "js": "text/javascript",
        "json": "application/json",
        "png": "image/png",
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "gif": "image/gif"
      };
      /**
       * Creates a new `FileResponse` object.
       * @param {string|URL} filePath
       */
      constructor(filePath) {
        this.filePath = filePath;
        this.headers = new Headers();
        this.exists = import_fs2.default.existsSync(filePath);
        if (this.exists) {
          this.status = 200;
          this.statusText = "OK";
          let stats = import_fs2.default.statSync(filePath);
          this.headers["content-length"] = stats.size;
          this.updateContentType();
          let self2 = this;
          this.body = new ReadableStream({
            start(controller) {
              self2.arrayBuffer().then((buffer) => {
                controller.enqueue(new Uint8Array(buffer));
                controller.close();
              });
            }
          });
        } else {
          this.status = 404;
          this.statusText = "Not Found";
          this.body = null;
        }
      }
      /**
       * Updates the 'content-type' header property of the response based on the extension of
       * the file specified by the filePath property of the current object.
       * @returns {void}
       */
      updateContentType() {
        const extension = this.filePath.toString().split(".").pop().toLowerCase();
        this.headers["content-type"] = this._CONTENT_TYPE_MAP[extension] ?? "application/octet-stream";
      }
      /**
       * Clone the current FileResponse object.
       * @returns {FileResponse} A new FileResponse object with the same properties as the current object.
       */
      clone() {
        let response = new _FileResponse(this.filePath);
        response.exists = this.exists;
        response.status = this.status;
        response.statusText = this.statusText;
        response.headers = this.headers.clone();
        return response;
      }
      /**
       * Reads the contents of the file specified by the filePath property and returns a Promise that
       * resolves with an ArrayBuffer containing the file's contents.
       * @returns {Promise<ArrayBuffer>} A Promise that resolves with an ArrayBuffer containing the file's contents.
       * @throws {Error} If the file cannot be read.
       */
      async arrayBuffer() {
        const data = await import_fs2.default.promises.readFile(this.filePath);
        return data.buffer;
      }
      /**
       * Reads the contents of the file specified by the filePath property and returns a Promise that
       * resolves with a Blob containing the file's contents.
       * @returns {Promise<Blob>} A Promise that resolves with a Blob containing the file's contents.
       * @throws {Error} If the file cannot be read.
       */
      async blob() {
        const data = await import_fs2.default.promises.readFile(this.filePath);
        return new Blob([data], { type: this.headers["content-type"] });
      }
      /**
       * Reads the contents of the file specified by the filePath property and returns a Promise that
       * resolves with a string containing the file's contents.
       * @returns {Promise<string>} A Promise that resolves with a string containing the file's contents.
       * @throws {Error} If the file cannot be read.
       */
      async text() {
        const data = await import_fs2.default.promises.readFile(this.filePath, "utf8");
        return data;
      }
      /**
       * Reads the contents of the file specified by the filePath property and returns a Promise that
       * resolves with a parsed JavaScript object containing the file's contents.
       * 
       * @returns {Promise<Object>} A Promise that resolves with a parsed JavaScript object containing the file's contents.
       * @throws {Error} If the file cannot be read.
       */
      async json() {
        return JSON.parse(await this.text());
      }
    };
    FileCache = class {
      /**
       * Instantiate a `FileCache` object.
       * @param {string} path 
       */
      constructor(path5) {
        this.path = path5;
      }
      /**
       * Checks whether the given request is in the cache.
       * @param {string} request 
       * @returns {Promise<FileResponse | undefined>}
       */
      async match(request) {
        let filePath = import_path2.default.join(this.path, request);
        let file = new FileResponse(filePath);
        if (file.exists) {
          return file;
        } else {
          return void 0;
        }
      }
      /**
       * Adds the given response to the cache.
       * @param {string} request 
       * @param {Response|FileResponse} response 
       * @returns {Promise<void>}
       */
      async put(request, response) {
        const buffer = Buffer.from(await response.arrayBuffer());
        let outputPath = import_path2.default.join(this.path, request);
        try {
          await import_fs2.default.promises.mkdir(import_path2.default.dirname(outputPath), { recursive: true });
          await import_fs2.default.promises.writeFile(outputPath, buffer);
        } catch (err2) {
          console.warn("An error occurred while writing the file to cache:", err2);
        }
      }
      // TODO add the rest?
      // addAll(requests: RequestInfo[]): Promise<void>;
      // delete(request: RequestInfo | URL, options?: CacheQueryOptions): Promise<boolean>;
      // keys(request?: RequestInfo | URL, options?: CacheQueryOptions): Promise<ReadonlyArray<Request>>;
      // match(request: RequestInfo | URL, options?: CacheQueryOptions): Promise<Response | undefined>;
      // matchAll(request?: RequestInfo | URL, options?: CacheQueryOptions): Promise<ReadonlyArray<Response>>;
    };
  }
});

// node_modules/@xenova/transformers/src/utils/maths.js
function interpolate_data(input, [in_channels, in_height, in_width], [out_height, out_width], mode = "bilinear", align_corners = false) {
  const x_scale = out_width / in_width;
  const y_scale = out_height / in_height;
  const out_img = new input.constructor(out_height * out_width * in_channels);
  const inStride = in_height * in_width;
  const outStride = out_height * out_width;
  for (let i2 = 0; i2 < out_height; ++i2) {
    for (let j2 = 0; j2 < out_width; ++j2) {
      const outOffset = i2 * out_width + j2;
      const x = (j2 + 0.5) / x_scale - 0.5;
      const y = (i2 + 0.5) / y_scale - 0.5;
      let x1 = Math.floor(x);
      let y1 = Math.floor(y);
      const x2 = Math.min(x1 + 1, in_width - 1);
      const y2 = Math.min(y1 + 1, in_height - 1);
      x1 = Math.max(x1, 0);
      y1 = Math.max(y1, 0);
      const s = x - x1;
      const t = y - y1;
      const w1 = (1 - s) * (1 - t);
      const w2 = s * (1 - t);
      const w3 = (1 - s) * t;
      const w4 = s * t;
      const yStride = y1 * in_width;
      const xStride = y2 * in_width;
      const idx1 = yStride + x1;
      const idx2 = yStride + x2;
      const idx3 = xStride + x1;
      const idx4 = xStride + x2;
      for (let k = 0; k < in_channels; ++k) {
        const cOffset = k * inStride;
        out_img[k * outStride + outOffset] = w1 * input[cOffset + idx1] + w2 * input[cOffset + idx2] + w3 * input[cOffset + idx3] + w4 * input[cOffset + idx4];
      }
    }
  }
  return out_img;
}
function transpose_data(array, dims, axes) {
  const shape = new Array(axes.length);
  const stride = new Array(axes.length);
  for (let i2 = axes.length - 1, s = 1; i2 >= 0; --i2) {
    stride[i2] = s;
    shape[i2] = dims[axes[i2]];
    s *= shape[i2];
  }
  const invStride = axes.map((_, i2) => stride[axes.indexOf(i2)]);
  const transposedData = new array.constructor(array.length);
  for (let i2 = 0; i2 < array.length; ++i2) {
    let newIndex = 0;
    for (let j2 = dims.length - 1, k = i2; j2 >= 0; --j2) {
      newIndex += k % dims[j2] * invStride[j2];
      k = Math.floor(k / dims[j2]);
    }
    transposedData[newIndex] = array[i2];
  }
  return [transposedData, shape];
}
function softmax(arr) {
  const maxVal = max(arr)[0];
  const exps = arr.map((x) => Math.exp(x - maxVal));
  const sumExps = exps.reduce((acc, val) => acc + val, 0);
  const softmaxArr = exps.map((x) => x / sumExps);
  return softmaxArr;
}
function log_softmax(arr) {
  const softmaxArr = softmax(arr);
  const logSoftmaxArr = softmaxArr.map((x) => Math.log(x));
  return logSoftmaxArr;
}
function dot(arr1, arr2) {
  return arr1.reduce((acc, val, i2) => acc + val * arr2[i2], 0);
}
function getTopItems(items, top_k = 0) {
  items = Array.from(items).map((x, i2) => [i2, x]).sort((a, b) => b[1] - a[1]);
  if (top_k > 0) {
    items = items.slice(0, top_k);
  }
  return items;
}
function cos_sim(arr1, arr2) {
  const dotProduct = dot(arr1, arr2);
  const magnitudeA = magnitude2(arr1);
  const magnitudeB = magnitude2(arr2);
  const cosineSimilarity2 = dotProduct / (magnitudeA * magnitudeB);
  return cosineSimilarity2;
}
function magnitude2(arr) {
  return Math.sqrt(arr.reduce((acc, val) => acc + val * val, 0));
}
function min(arr) {
  if (arr.length === 0) throw Error("Array must not be empty");
  let min2 = arr[0];
  let indexOfMin = 0;
  for (let i2 = 1; i2 < arr.length; ++i2) {
    if (arr[i2] < min2) {
      min2 = arr[i2];
      indexOfMin = i2;
    }
  }
  return [min2, indexOfMin];
}
function max(arr) {
  if (arr.length === 0) throw Error("Array must not be empty");
  let max2 = arr[0];
  let indexOfMax = 0;
  for (let i2 = 1; i2 < arr.length; ++i2) {
    if (arr[i2] > max2) {
      max2 = arr[i2];
      indexOfMax = i2;
    }
  }
  return [max2, indexOfMax];
}
function rfftfreq(n, d = 1) {
  if (!Number.isInteger(n)) {
    throw new TypeError(`n should be an integer, but ${n} given.`);
  }
  const val = 1 / (n * d);
  const len = Math.floor(n / 2) + 1;
  const results = new Array(len);
  for (let i2 = 0; i2 < len; ++i2) {
    results[i2] = i2 * val;
  }
  return results;
}
var FFT;
var init_maths = __esm({
  "node_modules/@xenova/transformers/src/utils/maths.js"() {
    FFT = class {
      /**
       * @param {number} size The size of the input array. Must be a power of two and bigger than 1.
       * @throws {Error} FFT size must be a power of two and bigger than 1.
       */
      constructor(size) {
        this.size = size | 0;
        if (this.size <= 1 || (this.size & this.size - 1) !== 0)
          throw new Error("FFT size must be a power of two and bigger than 1");
        this._csize = size << 1;
        this.table = new Float32Array(this.size * 2);
        for (let i2 = 0; i2 < this.table.length; i2 += 2) {
          const angle = Math.PI * i2 / this.size;
          this.table[i2] = Math.cos(angle);
          this.table[i2 + 1] = -Math.sin(angle);
        }
        let power = 0;
        for (let t = 1; this.size > t; t <<= 1)
          ++power;
        this._width = power % 2 === 0 ? power - 1 : power;
        this._bitrev = new Int32Array(1 << this._width);
        for (let j2 = 0; j2 < this._bitrev.length; ++j2) {
          this._bitrev[j2] = 0;
          for (let shift = 0; shift < this._width; shift += 2) {
            const revShift = this._width - shift - 2;
            this._bitrev[j2] |= (j2 >>> shift & 3) << revShift;
          }
        }
      }
      /**
       * Create a complex number array with size `2 * size`
       *
       * @returns {Float32Array} A complex number array with size `2 * size`
       */
      createComplexArray() {
        return new Float32Array(this._csize);
      }
      /**
       * Converts a complex number representation stored in a Float32Array to an array of real numbers.
       * 
       * @param {Float32Array} complex The complex number representation to be converted.
       * @param {number[]} [storage] An optional array to store the result in.
       * @returns {number[]} An array of real numbers representing the input complex number representation.
       */
      fromComplexArray(complex, storage) {
        const res = storage || new Array(complex.length >>> 1);
        for (let i2 = 0; i2 < complex.length; i2 += 2)
          res[i2 >>> 1] = complex[i2];
        return res;
      }
      /**
       * Convert a real-valued input array to a complex-valued output array.
       * @param {Float32Array} input The real-valued input array.
       * @param {Float32Array} [storage] Optional buffer to store the output array.
       * @returns {Float32Array} The complex-valued output array.
       */
      toComplexArray(input, storage) {
        const res = storage || this.createComplexArray();
        for (let i2 = 0; i2 < res.length; i2 += 2) {
          res[i2] = input[i2 >>> 1];
          res[i2 + 1] = 0;
        }
        return res;
      }
      /**
       * Completes the spectrum by adding its mirrored negative frequency components.
       * @param {Float32Array} spectrum The input spectrum.
       * @returns {void}
       */
      completeSpectrum(spectrum) {
        const size = this._csize;
        const half = size >>> 1;
        for (let i2 = 2; i2 < half; i2 += 2) {
          spectrum[size - i2] = spectrum[i2];
          spectrum[size - i2 + 1] = -spectrum[i2 + 1];
        }
      }
      /**
       * Performs a Fast Fourier Transform (FFT) on the given input data and stores the result in the output buffer.
       * 
       * @param {Float32Array} out The output buffer to store the result.
       * @param {Float32Array} data The input data to transform.
       * 
       * @throws {Error} Input and output buffers must be different.
       * 
       * @returns {void}
       */
      transform(out2, data) {
        if (out2 === data)
          throw new Error("Input and output buffers must be different");
        this._transform4(
          out2,
          data,
          1
          /* DONE */
        );
      }
      /**
       * Performs a real-valued forward FFT on the given input buffer and stores the result in the given output buffer.
       * The input buffer must contain real values only, while the output buffer will contain complex values. The input and
       * output buffers must be different.
       *
       * @param {Float32Array} out The output buffer.
       * @param {Float32Array} data The input buffer containing real values.
       *
       * @throws {Error} If the input and output buffers are the same.
       */
      realTransform(out2, data) {
        if (out2 === data)
          throw new Error("Input and output buffers must be different");
        this._realTransform4(
          out2,
          data,
          1
          /* DONE */
        );
      }
      /**
       * Performs an inverse FFT transformation on the given `data` array, and stores the result in `out`.
       * The `out` array must be a different buffer than the `data` array. The `out` array will contain the
       * result of the transformation. The `data` array will not be modified.
       * 
       * @param {Float32Array} out The output buffer for the transformed data.
       * @param {Float32Array} data The input data to transform.
       * @throws {Error} If `out` and `data` refer to the same buffer.
       * @returns {void}
       */
      inverseTransform(out2, data) {
        if (out2 === data)
          throw new Error("Input and output buffers must be different");
        this._transform4(
          out2,
          data,
          -1
          /* DONE */
        );
        for (let i2 = 0; i2 < out2.length; ++i2)
          out2[i2] /= this.size;
      }
      /**
       * Performs a radix-4 implementation of a discrete Fourier transform on a given set of data.
       *
       * @param {Float32Array} out The output buffer for the transformed data.
       * @param {Float32Array} data The input buffer of data to be transformed.
       * @param {number} inv A scaling factor to apply to the transform.
       * @returns {void}
       */
      _transform4(out2, data, inv) {
        const size = this._csize;
        const width = this._width;
        let step = 1 << width;
        let len = size / step << 1;
        let outOff;
        let t;
        let bitrev = this._bitrev;
        if (len === 4) {
          for (outOff = 0, t = 0; outOff < size; outOff += len, ++t) {
            const off = bitrev[t];
            this._singleTransform2(data, out2, outOff, off, step);
          }
        } else {
          for (outOff = 0, t = 0; outOff < size; outOff += len, ++t) {
            const off = bitrev[t];
            this._singleTransform4(data, out2, outOff, off, step, inv);
          }
        }
        for (step >>= 2; step >= 2; step >>= 2) {
          len = size / step << 1;
          let quarterLen = len >>> 2;
          for (outOff = 0; outOff < size; outOff += len) {
            let limit = outOff + quarterLen;
            for (let i2 = outOff, k = 0; i2 < limit; i2 += 2, k += step) {
              const A2 = i2;
              const B = A2 + quarterLen;
              const C3 = B + quarterLen;
              const D = C3 + quarterLen;
              const Ar = out2[A2];
              const Ai = out2[A2 + 1];
              const Br = out2[B];
              const Bi = out2[B + 1];
              const Cr = out2[C3];
              const Ci = out2[C3 + 1];
              const Dr = out2[D];
              const Di = out2[D + 1];
              const tableBr = this.table[k];
              const tableBi = inv * this.table[k + 1];
              const MBr = Br * tableBr - Bi * tableBi;
              const MBi = Br * tableBi + Bi * tableBr;
              const tableCr = this.table[2 * k];
              const tableCi = inv * this.table[2 * k + 1];
              const MCr = Cr * tableCr - Ci * tableCi;
              const MCi = Cr * tableCi + Ci * tableCr;
              const tableDr = this.table[3 * k];
              const tableDi = inv * this.table[3 * k + 1];
              const MDr = Dr * tableDr - Di * tableDi;
              const MDi = Dr * tableDi + Di * tableDr;
              const T0r = Ar + MCr;
              const T0i = Ai + MCi;
              const T1r = Ar - MCr;
              const T1i = Ai - MCi;
              const T2r = MBr + MDr;
              const T2i = MBi + MDi;
              const T3r = inv * (MBr - MDr);
              const T3i = inv * (MBi - MDi);
              out2[A2] = T0r + T2r;
              out2[A2 + 1] = T0i + T2i;
              out2[B] = T1r + T3i;
              out2[B + 1] = T1i - T3r;
              out2[C3] = T0r - T2r;
              out2[C3 + 1] = T0i - T2i;
              out2[D] = T1r - T3i;
              out2[D + 1] = T1i + T3r;
            }
          }
        }
      }
      /**
       * Performs a radix-2 implementation of a discrete Fourier transform on a given set of data.
       *
       * @param {Float32Array} data The input buffer of data to be transformed.
       * @param {Float32Array} out The output buffer for the transformed data.
       * @param {number} outOff The offset at which to write the output data.
       * @param {number} off The offset at which to begin reading the input data.
       * @param {number} step The step size for indexing the input data.
       * @returns {void}
       */
      _singleTransform2(data, out2, outOff, off, step) {
        const evenR = data[off];
        const evenI = data[off + 1];
        const oddR = data[off + step];
        const oddI = data[off + step + 1];
        out2[outOff] = evenR + oddR;
        out2[outOff + 1] = evenI + oddI;
        out2[outOff + 2] = evenR - oddR;
        out2[outOff + 3] = evenI - oddI;
      }
      /**
       * Performs radix-4 transformation on input data of length 8
       *
       * @param {Float32Array} data Input data array of length 8
       * @param {Float32Array} out Output data array of length 8
       * @param {number} outOff Index of output array to start writing from
       * @param {number} off Index of input array to start reading from
       * @param {number} step Step size between elements in input array
       * @param {number} inv Scaling factor for inverse transform
       * 
       * @returns {void}
       */
      _singleTransform4(data, out2, outOff, off, step, inv) {
        const step2 = step * 2;
        const step3 = step * 3;
        const Ar = data[off];
        const Ai = data[off + 1];
        const Br = data[off + step];
        const Bi = data[off + step + 1];
        const Cr = data[off + step2];
        const Ci = data[off + step2 + 1];
        const Dr = data[off + step3];
        const Di = data[off + step3 + 1];
        const T0r = Ar + Cr;
        const T0i = Ai + Ci;
        const T1r = Ar - Cr;
        const T1i = Ai - Ci;
        const T2r = Br + Dr;
        const T2i = Bi + Di;
        const T3r = inv * (Br - Dr);
        const T3i = inv * (Bi - Di);
        out2[outOff] = T0r + T2r;
        out2[outOff + 1] = T0i + T2i;
        out2[outOff + 2] = T1r + T3i;
        out2[outOff + 3] = T1i - T3r;
        out2[outOff + 4] = T0r - T2r;
        out2[outOff + 5] = T0i - T2i;
        out2[outOff + 6] = T1r - T3i;
        out2[outOff + 7] = T1i + T3r;
      }
      /**
       * Real input radix-4 implementation
       * @param {Float32Array} out Output array for the transformed data
       * @param {Float32Array} data Input array of real data to be transformed
       * @param {number} inv The scale factor used to normalize the inverse transform
       */
      _realTransform4(out2, data, inv) {
        const size = this._csize;
        const width = this._width;
        let step = 1 << width;
        let len = size / step << 1;
        var outOff;
        var t;
        var bitrev = this._bitrev;
        if (len === 4) {
          for (outOff = 0, t = 0; outOff < size; outOff += len, ++t) {
            const off = bitrev[t];
            this._singleRealTransform2(data, out2, outOff, off >>> 1, step >>> 1);
          }
        } else {
          for (outOff = 0, t = 0; outOff < size; outOff += len, ++t) {
            const off = bitrev[t];
            this._singleRealTransform4(data, out2, outOff, off >>> 1, step >>> 1, inv);
          }
        }
        for (step >>= 2; step >= 2; step >>= 2) {
          len = size / step << 1;
          const halfLen = len >>> 1;
          const quarterLen = halfLen >>> 1;
          const hquarterLen = quarterLen >>> 1;
          for (outOff = 0; outOff < size; outOff += len) {
            for (let i2 = 0, k = 0; i2 <= hquarterLen; i2 += 2, k += step) {
              const A2 = outOff + i2;
              const B = A2 + quarterLen;
              const C3 = B + quarterLen;
              const D = C3 + quarterLen;
              const Ar = out2[A2];
              const Ai = out2[A2 + 1];
              const Br = out2[B];
              const Bi = out2[B + 1];
              const Cr = out2[C3];
              const Ci = out2[C3 + 1];
              const Dr = out2[D];
              const Di = out2[D + 1];
              const tableBr = this.table[k];
              const tableBi = inv * this.table[k + 1];
              const MBr = Br * tableBr - Bi * tableBi;
              const MBi = Br * tableBi + Bi * tableBr;
              const tableCr = this.table[2 * k];
              const tableCi = inv * this.table[2 * k + 1];
              const MCr = Cr * tableCr - Ci * tableCi;
              const MCi = Cr * tableCi + Ci * tableCr;
              const tableDr = this.table[3 * k];
              const tableDi = inv * this.table[3 * k + 1];
              const MDr = Dr * tableDr - Di * tableDi;
              const MDi = Dr * tableDi + Di * tableDr;
              const T0r = Ar + MCr;
              const T0i = Ai + MCi;
              const T1r = Ar - MCr;
              const T1i = Ai - MCi;
              const T2r = MBr + MDr;
              const T2i = MBi + MDi;
              const T3r = inv * (MBr - MDr);
              const T3i = inv * (MBi - MDi);
              out2[A2] = T0r + T2r;
              out2[A2 + 1] = T0i + T2i;
              out2[B] = T1r + T3i;
              out2[B + 1] = T1i - T3r;
              if (i2 === 0) {
                out2[C3] = T0r - T2r;
                out2[C3 + 1] = T0i - T2i;
                continue;
              }
              if (i2 === hquarterLen)
                continue;
              const SA = outOff + quarterLen - i2;
              const SB = outOff + halfLen - i2;
              out2[SA] = T1r + -inv * T3i;
              out2[SA + 1] = -T1i - inv * T3r;
              out2[SB] = T0r + -inv * T2r;
              out2[SB + 1] = -T0i + inv * T2i;
            }
          }
        }
      }
      /**
       * Performs a single real input radix-2 transformation on the provided data
       * 
       * @param {Float32Array} data The input data array
       * @param {Float32Array} out The output data array
       * @param {number} outOff The output offset
       * @param {number} off The input offset
       * @param {number} step The step
       * 
       * @returns {void}
       */
      _singleRealTransform2(data, out2, outOff, off, step) {
        const evenR = data[off];
        const oddR = data[off + step];
        out2[outOff] = evenR + oddR;
        out2[outOff + 1] = 0;
        out2[outOff + 2] = evenR - oddR;
        out2[outOff + 3] = 0;
      }
      /**
       * Computes a single real-valued transform using radix-4 algorithm.
       * This method is only called for len=8.
       *
       * @param {Float32Array} data The input data array.
       * @param {Float32Array} out The output data array.
       * @param {number} outOff The offset into the output array.
       * @param {number} off The offset into the input array.
       * @param {number} step The step size for the input array.
       * @param {number} inv The value of inverse.
       */
      _singleRealTransform4(data, out2, outOff, off, step, inv) {
        const step2 = step * 2;
        const step3 = step * 3;
        const Ar = data[off];
        const Br = data[off + step];
        const Cr = data[off + step2];
        const Dr = data[off + step3];
        const T0r = Ar + Cr;
        const T1r = Ar - Cr;
        const T2r = Br + Dr;
        const T3r = inv * (Br - Dr);
        out2[outOff] = T0r + T2r;
        out2[outOff + 1] = 0;
        out2[outOff + 2] = T1r;
        out2[outOff + 3] = -T3r;
        out2[outOff + 4] = T0r - T2r;
        out2[outOff + 5] = 0;
        out2[outOff + 6] = T1r;
        out2[outOff + 7] = T3r;
      }
    };
  }
});

// node_modules/@xenova/transformers/src/utils/tensor.js
function reshape(data, dimensions) {
  const totalElements = data.length;
  const dimensionSize = dimensions.reduce((a, b) => a * b);
  if (totalElements !== dimensionSize) {
    throw Error(`cannot reshape array of size ${totalElements} into shape (${dimensions})`);
  }
  let reshapedArray = data;
  for (let i2 = dimensions.length - 1; i2 >= 0; i2--) {
    reshapedArray = reshapedArray.reduce((acc, val) => {
      let lastArray = acc[acc.length - 1];
      if (lastArray.length < dimensions[i2]) {
        lastArray.push(val);
      } else {
        acc.push([val]);
      }
      return acc;
    }, [[]]);
  }
  return reshapedArray[0];
}
function transpose(tensor, axes) {
  const [transposedData, shape] = transpose_data(tensor.data, tensor.dims, axes);
  return new Tensor3(tensor.type, transposedData, shape);
}
function cat(tensors) {
  if (tensors.length === 0) {
    return tensors[0];
  }
  let tensorType = tensors[0].type;
  let tensorShape = [...tensors[0].dims];
  tensorShape[0] = tensors.length;
  let total = 0;
  for (let t of tensors) {
    total += t.data.length;
  }
  let data = new tensors[0].data.constructor(total);
  let offset = 0;
  for (let t of tensors) {
    data.set(t.data, offset);
    offset += t.data.length;
  }
  return new Tensor3(tensorType, data, tensorShape);
}
function interpolate(input, [out_height, out_width], mode = "bilinear", align_corners = false) {
  const in_channels = input.dims.at(-3) ?? 1;
  const in_height = input.dims.at(-2);
  const in_width = input.dims.at(-1);
  let output = interpolate_data(
    input.data,
    [in_channels, in_height, in_width],
    [out_height, out_width],
    mode,
    align_corners
  );
  return new Tensor3(input.type, output, [in_channels, out_height, out_width]);
}
var ONNXTensor, Tensor3;
var init_tensor2 = __esm({
  "node_modules/@xenova/transformers/src/utils/tensor.js"() {
    init_onnx();
    init_maths();
    ONNXTensor = ONNX.Tensor;
    Tensor3 = class _Tensor extends ONNXTensor {
      /**
       * Create a new Tensor or copy an existing Tensor.
       * @param {[string, Array|AnyTypedArray, number[]]|[ONNXTensor]} args
       */
      constructor(...args2) {
        if (args2[0] instanceof ONNX.Tensor) {
          super(args2[0].type, args2[0].data, args2[0].dims);
        } else {
          super(...args2);
        }
        return new Proxy(this, {
          get: (obj, key) => {
            if (typeof key === "string") {
              let index = Number(key);
              if (Number.isInteger(index)) {
                return obj._getitem(index);
              }
            }
            return obj[key];
          },
          set: (obj, key, value) => {
            return obj[key] = value;
          }
        });
      }
      /**
       * Returns an iterator object for iterating over the tensor data in row-major order.
       * If the tensor has more than one dimension, the iterator will yield subarrays.
       * @returns {Iterator} An iterator object for iterating over the tensor data in row-major order.
       */
      *[Symbol.iterator]() {
        const [iterLength, ...iterDims] = this.dims;
        if (iterDims.length > 0) {
          const iterSize = iterDims.reduce((a, b) => a * b);
          for (let i2 = 0; i2 < iterLength; ++i2) {
            yield this._subarray(i2, iterSize, iterDims);
          }
        } else {
          yield* this.data;
        }
      }
      /**
       * Index into a Tensor object.
       * @param {number} index The index to access.
       * @returns {Tensor} The data at the specified index.
       */
      _getitem(index) {
        const [iterLength, ...iterDims] = this.dims;
        if (index >= iterLength || index < -iterLength) {
          throw new Error(`Index ${index} is out of bounds for dimension 0 with size ${iterLength}`);
        }
        if (index < 0) {
          index += iterLength;
        }
        if (iterDims.length > 0) {
          const iterSize = iterDims.reduce((a, b) => a * b);
          return this._subarray(index, iterSize, iterDims);
        } else {
          return new _Tensor(this.type, [this.data[index]], iterDims);
        }
      }
      /**
       * @param {number|bigint} item The item to search for in the tensor
       * @returns {number} The index of the first occurrence of item in the tensor data.
       */
      indexOf(item) {
        for (let index = 0; index < this.data.length; ++index) {
          if (this.data[index] == item) {
            return index;
          }
        }
        return -1;
      }
      /**
       * @param {number} index 
       * @param {number} iterSize 
       * @param {any} iterDims 
       * @returns {Tensor}
       */
      _subarray(index, iterSize, iterDims) {
        let data = this.data.subarray(index * iterSize, (index + 1) * iterSize);
        return new _Tensor(this.type, data, iterDims);
      }
      /**
       * Returns the value of this tensor as a standard JavaScript Number. This only works
       * for tensors with one element. For other cases, see `Tensor.tolist()`.
       * @returns {number} The value of this tensor as a standard JavaScript Number.
       * @throws {Error} If the tensor has more than one element.
       */
      item() {
        if (this.data.length !== 1) {
          throw new Error(`a Tensor with ${this.data.length} elements cannot be converted to Scalar`);
        }
        return this.data[0];
      }
      /**
       * Convert tensor data to a n-dimensional JS list
       * @returns {Array}
       */
      tolist() {
        return reshape(this.data, this.dims);
      }
      /**
       * Return a new Tensor the sigmoid function applied to each element.
       * @returns {Tensor} The tensor with the sigmoid function applied.
       */
      sigmoid() {
        return this.clone().sigmoid_();
      }
      /**
       * Applies the sigmoid function to the tensor in place.
       * @returns {Tensor} Returns `this`.
       */
      sigmoid_() {
        for (let i2 = 0; i2 < this.data.length; ++i2) {
          this.data[i2] = 1 / (1 + Math.exp(-this.data[i2]));
        }
        return this;
      }
      clone() {
        return new _Tensor(this.type, this.data.slice(), this.dims.slice());
      }
      slice(...slices) {
        let newTensorDims = [];
        let newOffsets = [];
        for (let sliceIndex = 0; sliceIndex < this.dims.length; ++sliceIndex) {
          let slice = slices[sliceIndex];
          if (slice === null || slice === void 0) {
            newOffsets.push([0, this.dims[sliceIndex]]);
            newTensorDims.push(this.dims[sliceIndex]);
          } else if (typeof slice === "number") {
            if (slice < -this.dims[sliceIndex] || slice >= this.dims[sliceIndex]) {
              throw new Error(`IndexError: index ${slice} is out of bounds for dimension ${sliceIndex} with size ${this.dims[sliceIndex]}`);
            }
            if (slice < 0) {
              slice += this.dims[sliceIndex];
            }
            newOffsets.push([slice, slice + 1]);
          } else if (Array.isArray(slice) && slice.length === 2) {
            if (slice[0] > slice[1]) {
              throw new Error(`Invalid slice: ${slice}`);
            }
            let offsets = [
              Math.max(slice[0], 0),
              Math.min(slice[1], this.dims[sliceIndex])
            ];
            newOffsets.push(offsets);
            newTensorDims.push(offsets[1] - offsets[0]);
          } else {
            throw new Error(`Invalid slice: ${slice}`);
          }
        }
        let newDims = newOffsets.map(([start2, end]) => end - start2);
        let newBufferSize = newDims.reduce((a, b) => a * b);
        let data = new this.data.constructor(newBufferSize);
        const stride = new Array(this.dims.length);
        for (let i2 = newDims.length - 1, s2 = 1; i2 >= 0; --i2) {
          stride[i2] = s2;
          s2 *= this.dims[i2];
        }
        for (let i2 = 0; i2 < newBufferSize; ++i2) {
          let originalIndex = 0;
          for (let j2 = newDims.length - 1, num = i2; j2 >= 0; --j2) {
            const size = newDims[j2];
            originalIndex += (num % size + newOffsets[j2][0]) * stride[j2];
            num = Math.floor(num / size);
          }
          data[i2] = this.data[originalIndex];
        }
        return new _Tensor(this.type, data, newTensorDims);
      }
      /**
       * Return a transposed version of this Tensor, according to the provided dimensions.
       * @param  {...number} dims Dimensions to transpose.
       * @returns {Tensor} The transposed tensor.
       */
      transpose(...dims) {
        return transpose(this, dims);
      }
      // TODO add .max() and .min() methods
    };
  }
});

// node_modules/@xenova/transformers/src/tokenizers.js
async function loadTokenizer(pretrained_model_name_or_path, options) {
  let info3 = await Promise.all([
    getModelJSON(pretrained_model_name_or_path, "tokenizer.json", true, options),
    getModelJSON(pretrained_model_name_or_path, "tokenizer_config.json", true, options)
  ]);
  return info3;
}
function createPattern(pattern) {
  if (pattern.Regex) {
    return new RegExp(pattern.Regex, "gu");
  } else if (pattern.String) {
    return pattern.String;
  } else {
    console.warn("Unknown pattern type:", pattern);
    return null;
  }
}
function clean_up_tokenization(text) {
  return text.replace(/ \./g, ".").replace(/ \?/g, "?").replace(/ \!/g, "!").replace(/ ,/g, ",").replace(/ \' /g, "'").replace(/ n\'t/g, "n't").replace(/ \'m/g, "'m").replace(/ \'s/g, "'s").replace(/ \'ve/g, "'ve").replace(/ \'re/g, "'re");
}
function fuse(arr, value) {
  let fused = [];
  let i2 = 0;
  while (i2 < arr.length) {
    fused.push(arr[i2]);
    if (arr[i2] !== value) {
      ++i2;
      continue;
    }
    while (i2 < arr.length && arr[i2] === value) {
      ++i2;
    }
  }
  return fused;
}
function whitespace_split(text) {
  return text.match(/\S+/g) || [];
}
function add_token_types(inputs) {
  if (inputs.input_ids instanceof Tensor3) {
    inputs.token_type_ids = new Tensor3(
      "int64",
      new BigInt64Array(inputs.input_ids.data.length),
      inputs.input_ids.dims
    );
  } else if (Array.isArray(inputs.input_ids)) {
    if (Array.isArray(inputs.input_ids[0])) {
      inputs.token_type_ids = inputs.input_ids.map(
        (x) => new Array(x.length).fill(0)
      );
    } else {
      inputs.token_type_ids = new Array(inputs.input_ids.length).fill(0);
    }
  } else {
    throw new Error("Input ids must be a Tensor or an Array");
  }
  return inputs;
}
var TokenizerModel, WordPieceTokenizer, Unigram, BYTES_TO_UNICODE, UNICODE_TO_BYTES, BPE, Normalizer, Replace, NFC, NFKD, StripAccents, Lowercase, Prepend, NormalizerSequence, BertNormalizer, PreTokenizer, BertPreTokenizer, ByteLevelPreTokenizer, SplitPreTokenizer, PostProcessor, RobertaProcessing, TemplateProcessing, ByteLevelPostProcessor, Decoder, ReplaceDecoder, ByteFallback, FuseDecoder, StripDecoder, WordPieceDecoder, ByteLevelDecoder, DecoderSequence, MetaspacePreTokenizer, MetaspaceDecoder, Precompiled, PreTokenizerSequence, WhitespaceSplit, PreTrainedTokenizer, BertTokenizer, AlbertTokenizer, MobileBertTokenizer, SqueezeBertTokenizer, DistilBertTokenizer, T5Tokenizer, GPT2Tokenizer, BartTokenizer, RobertaTokenizer, BloomTokenizer, LlamaTokenizer, NllbTokenizer, WhisperTokenizer, CodeGenTokenizer, CLIPTokenizer, MarianTokenizer, CharTrie, CharTrieNode, TokenLattice, TokenLatticeNode, AutoTokenizer;
var init_tokenizers = __esm({
  "node_modules/@xenova/transformers/src/tokenizers.js"() {
    init_core();
    init_hub();
    init_maths();
    init_tensor2();
    TokenizerModel = class extends Callable {
      /**
       * Creates a new instance of TokenizerModel.
       * @param {Object} config The configuration object for the TokenizerModel.
       */
      constructor(config) {
        super();
        this.config = config;
        this.vocab = [];
        this.tokens_to_ids = /* @__PURE__ */ new Map();
        this.unk_token_id = void 0;
        this.unk_token = void 0;
        this.end_of_word_suffix = void 0;
        this.fuse_unk = false;
      }
      /**
       * Instantiates a new TokenizerModel instance based on the configuration object provided.
       * @param {Object} config The configuration object for the TokenizerModel.
       * @param {...*} args Optional arguments to pass to the specific TokenizerModel constructor.
       * @returns {TokenizerModel} A new instance of a TokenizerModel.
       * @throws Will throw an error if the TokenizerModel type in the config is not recognized.
       */
      static fromConfig(config, ...args2) {
        switch (config.type) {
          case "WordPiece":
            return new WordPieceTokenizer(config);
          case "Unigram":
            return new Unigram(config, ...args2);
          case "BPE":
            return new BPE(config, ...args2);
          default:
            throw new Error(`Unknown TokenizerModel type: ${config.type}`);
        }
      }
      /**
       * Internal function to call the TokenizerModel instance.
       * @param {string[]} tokens The tokens to encode.
       * @returns {number[]} The encoded token IDs.
       */
      _call(tokens) {
        return this.encode(tokens);
      }
      /**
       * Encodes a list of tokens into a list of token IDs.
       * @param {string[]} tokens The tokens to encode.
       * @returns {number[]} The encoded token IDs.
       * @throws Will throw an error if not implemented in a subclass.
       */
      encode(tokens) {
        throw Error("encode should be implemented in subclass.");
      }
      /**
       * Converts a list of tokens into a list of token IDs.
       * @param {string[]} tokens The tokens to convert.
       * @returns {number[]} The converted token IDs.
       */
      convert_tokens_to_ids(tokens) {
        let ids = tokens.map((t) => this.tokens_to_ids.get(t) ?? this.unk_token_id);
        if (this.fuse_unk) {
          ids = fuse(ids, this.unk_token_id);
        }
        return ids;
      }
      /**
       * Converts a list of token IDs into a list of tokens.
       * @param {number[]} ids The token IDs to convert.
       * @returns {string[]} The converted tokens.
       */
      convert_ids_to_tokens(ids) {
        return ids.map((i2) => this.vocab[i2] ?? this.unk_token);
      }
    };
    WordPieceTokenizer = class extends TokenizerModel {
      /**
       * @param {Object} config The configuration object.
       * @param {Map<string, number>} config.vocab A mapping of tokens to ids.
       * @param {string} config.unk_token The unknown token string.
       * @param {string} config.continuing_subword_prefix The prefix to use for continuing subwords.
       */
      constructor(config) {
        super(config);
        this.tokens_to_ids = config.vocab;
        this.unk_token_id = this.tokens_to_ids.get(config.unk_token);
        this.unk_token = config.unk_token;
        this.vocab = new Array(this.tokens_to_ids.size);
        for (const [key, value] of this.tokens_to_ids) {
          this.vocab[value] = key;
        }
      }
      /**
       * Encodes an array of tokens using WordPiece encoding.
       * @param {Array} tokens The tokens to encode.
       * @returns {Array} An array of encoded tokens.
       */
      encode(tokens) {
        let outputTokens = [];
        for (let token of tokens) {
          let chars = [...token];
          let isUnknown = false;
          let start2 = 0;
          let subTokens = [];
          while (start2 < chars.length) {
            let end = chars.length;
            let currentSubstring = null;
            while (start2 < end) {
              let substr = chars.slice(start2, end).join("");
              if (start2 > 0) {
                substr = this.config.continuing_subword_prefix + substr;
              }
              if (this.tokens_to_ids.has(substr)) {
                currentSubstring = substr;
                break;
              }
              --end;
            }
            if (currentSubstring === null) {
              isUnknown = true;
              break;
            }
            subTokens.push(currentSubstring);
            start2 = end;
          }
          if (isUnknown) {
            outputTokens.push(this.unk_token);
          } else {
            outputTokens.push(...subTokens);
          }
        }
        return outputTokens;
      }
    };
    Unigram = class extends TokenizerModel {
      /**
       * Create a new Unigram tokenizer model.
       * @param {Object} config The configuration object for the Unigram model.
       * @param {number} config.unk_id The ID of the unknown token
       * @param {Map<string, number>} config.vocab A mapping of tokens to scores.
       * @param {Object} moreConfig Additional configuration object for the Unigram model.
       */
      constructor(config, moreConfig) {
        super(config);
        this.vocab = new Array(config.vocab.size);
        this.scores = new Array(config.vocab.size);
        let count = 0;
        config.vocab.forEach((value, key) => {
          this.vocab[count] = key;
          this.scores[count] = value;
          ++count;
        });
        this.unk_token_id = config.unk_id;
        this.unk_token = this.vocab[config.unk_id];
        this.tokens_to_ids = new Map(this.vocab.map((x, i2) => [x, i2]));
        this.bosToken = " ";
        this.bosTokenId = this.tokens_to_ids.get(this.bosToken);
        this.eosToken = moreConfig.eos_token;
        this.eosTokenId = this.tokens_to_ids.get(this.eosToken);
        this.unkToken = this.vocab[this.unk_token_id];
        this.minScore = min(this.scores)[0];
        this.unkScore = this.minScore - 10;
        this.scores[this.unk_token_id] = this.unkScore;
        this.trie = new CharTrie();
        this.trie.extend(this.vocab);
        this.fuse_unk = true;
      }
      /**
       * Populates lattice nodes.
       * @param {TokenLattice} lattice The token lattice to populate with nodes.
       */
      populateNodes(lattice) {
        const sentence = lattice.sentence;
        const len = sentence.length;
        let beginPos = 0;
        while (beginPos < len) {
          const mblen = 1;
          let hasSingleNode = false;
          const tokens = [];
          for (let token of this.trie.commonPrefixSearch(sentence.slice(beginPos))) {
            tokens.push(token);
            const tokenId = this.tokens_to_ids.get(token);
            const tokenScore = this.scores[tokenId];
            const n = token.length;
            lattice.insert(beginPos, n, tokenScore, tokenId);
            if (!hasSingleNode && n === mblen) {
              hasSingleNode = true;
            }
          }
          if (!hasSingleNode) {
            lattice.insert(beginPos, mblen, this.unkScore, this.unk_token_id);
          }
          beginPos += mblen;
        }
      }
      /**
       * Encodes an array of tokens into an array of subtokens using the unigram model.
       *
       * @param {string} normalized The normalized string.
       * @returns {string[]} An array of subtokens obtained by encoding the input tokens using the unigram model.
       */
      tokenize(normalized) {
        const lattice = new TokenLattice(normalized, this.bosTokenId, this.eosTokenId);
        this.populateNodes(lattice);
        return lattice.tokens();
      }
      /**
       * Encodes an array of tokens using WordPiece encoding.
       * @param {Array} tokens The tokens to encode.
       * @returns {Array} An array of encoded tokens.
       */
      encode(tokens) {
        let toReturn = [];
        for (let token of tokens) {
          const tokenized = this.tokenize(token);
          toReturn.push(...tokenized);
        }
        return toReturn;
      }
    };
    BYTES_TO_UNICODE = (() => {
      const bs = [
        ...Array.from({ length: "~".charCodeAt(0) - "!".charCodeAt(0) + 1 }, (_, i2) => i2 + "!".charCodeAt(0)),
        ...Array.from({ length: "\xAC".charCodeAt(0) - "\xA1".charCodeAt(0) + 1 }, (_, i2) => i2 + "\xA1".charCodeAt(0)),
        ...Array.from({ length: "\xFF".charCodeAt(0) - "\xAE".charCodeAt(0) + 1 }, (_, i2) => i2 + "\xAE".charCodeAt(0))
      ];
      let cs = bs.slice();
      let n = 0;
      for (let b = 0; b < 256; ++b) {
        if (!bs.includes(b)) {
          bs.push(b);
          cs.push(256 + n);
          n += 1;
        }
      }
      let ccs = cs.map((n2) => String.fromCharCode(n2));
      return Object.fromEntries(bs.map((b, i2) => [b, ccs[i2]]));
    })();
    UNICODE_TO_BYTES = reverseDictionary(BYTES_TO_UNICODE);
    BPE = class extends TokenizerModel {
      /**
       * Create a BPE instance.
       * @param {Object} config The configuration object for BPE.
       * @param {Map<string, number>} config.vocab A mapping of tokens to ids.
       * @param {string} config.unk_token The unknown token used for out of vocabulary words.
       * @param {string} config.end_of_word_suffix The suffix to place at the end of each word.
       * @param {Array} config.merges An array of BPE merges as strings.
       */
      constructor(config) {
        super(config);
        this.tokens_to_ids = config.vocab;
        this.unk_token_id = this.tokens_to_ids.get(config.unk_token);
        this.unk_token = config.unk_token;
        this.vocab = new Array(this.tokens_to_ids.size);
        for (const [key, value] of this.tokens_to_ids) {
          this.vocab[value] = key;
        }
        this.bpe_ranks = Object.fromEntries(config.merges.map((x, i2) => [x, i2]));
        this.merges = config.merges.map((x) => x.split(/\s+/));
        this.end_of_word_suffix = config.end_of_word_suffix;
        this.byte_fallback = this.config.byte_fallback ?? false;
        if (this.byte_fallback) {
          this.text_encoder = new TextEncoder();
        }
        this.cache = /* @__PURE__ */ Object.create(null);
        this.fuse_unk ??= this.config.fuse_unk;
      }
      /**
       * Get all the possible pairs of characters in a word.
       * @param {string[]} word The word to get pairs from.
       * @returns {Array} An array of pairs.
       */
      get_pairs(word) {
        let pairs = /* @__PURE__ */ new Set();
        let prev_char = word[0];
        for (let i2 = 1; i2 < word.length; ++i2) {
          let char = word[i2];
          pairs.add(`${prev_char} ${char}`);
          prev_char = char;
        }
        return Array.from(pairs);
      }
      /**
       * Apply Byte-Pair-Encoding (BPE) to a given token.
       * @param {string} token The token to encode.
       * @returns {string} The BPE encoded token.
       */
      bpe(token) {
        if (token in this.cache) {
          return this.cache[token];
        }
        let word = Array.from(token);
        if (this.end_of_word_suffix) {
          word[word.length - 1] += this.end_of_word_suffix;
        }
        let pairs = this.get_pairs(word);
        if (!pairs.length) {
          if (this.end_of_word_suffix) {
            token += this.end_of_word_suffix;
          }
          return token;
        }
        while (true) {
          let bigram = pairs.reduce((a, b) => {
            let c = this.bpe_ranks[a] ?? Infinity;
            let d = this.bpe_ranks[b] ?? Infinity;
            return c <= d ? a : b;
          });
          if (!(bigram in this.bpe_ranks)) {
            break;
          }
          let [first, second] = bigram.split(/\s+/g);
          let new_word = [];
          let i2 = 0;
          let j2 = -1;
          while (i2 < word.length) {
            try {
              j2 = word.indexOf(first, i2);
              if (j2 === -1) throw "Error";
            } catch (e) {
              new_word.push(...word.slice(i2));
              break;
            }
            new_word.push(...word.slice(i2, j2));
            i2 = j2;
            if (word[i2] === first && i2 < word.length - 1 && word[i2 + 1] === second) {
              new_word.push(first + second);
              i2 += 2;
            } else {
              new_word.push(word[i2]);
              i2 += 1;
            }
          }
          word = new_word;
          if (word.length === 1) {
            break;
          } else {
            pairs = this.get_pairs(word);
          }
        }
        let final_word = word.join(" ");
        this.cache[token] = final_word;
        return final_word;
      }
      /**
       * Encodes the input sequence of tokens using the BPE algorithm and returns the resulting subword tokens.
       * @param {Array} tokens The input sequence of tokens to encode.
       * @returns {Array} The resulting subword tokens after applying the BPE algorithm to the input sequence of tokens.
       */
      encode(tokens) {
        let outputTokens = [];
        for (let token of tokens) {
          let bpe_token_list = this.bpe(token).split(" ");
          for (let t of bpe_token_list) {
            if (this.tokens_to_ids.has(t)) {
              outputTokens.push(t);
            } else {
              if (this.byte_fallback) {
                outputTokens.push(
                  ...Array.from(this.text_encoder.encode(t)).map((x) => `<0x${x.toString(16).toUpperCase().padStart(2, "0")}>`)
                );
              } else {
                outputTokens.push(this.unk_token);
              }
            }
          }
        }
        return outputTokens;
      }
    };
    Normalizer = class extends Callable {
      /**
       * @param {Object} config The configuration object for the normalizer.
       */
      constructor(config) {
        super();
        this.config = config;
      }
      /**
       * Factory method for creating normalizers from config objects.
       * @static
       * @param {Object} config The configuration object for the normalizer.
       * @returns {Normalizer} A Normalizer object.
       * @throws {Error} If an unknown Normalizer type is specified in the config.
       */
      static fromConfig(config) {
        if (config === null) return null;
        switch (config.type) {
          case "BertNormalizer":
            return new BertNormalizer(config);
          case "Precompiled":
            return new Precompiled(config);
          case "Sequence":
            return new NormalizerSequence(config);
          case "Replace":
            return new Replace(config);
          case "NFC":
            return new NFC(config);
          case "NFKD":
            return new NFKD(config);
          case "StripAccents":
            return new StripAccents(config);
          case "Lowercase":
            return new Lowercase(config);
          case "Prepend":
            return new Prepend(config);
          default:
            throw new Error(`Unknown Normalizer type: ${config.type}`);
        }
      }
      /**
       * Normalize the input text.
       * @abstract
       * @param {string} text The text to normalize.
       * @returns {string} The normalized text.
       * @throws {Error} If this method is not implemented in a subclass.
       */
      normalize(text) {
        throw Error("normalize should be implemented in subclass.");
      }
      /**
       * Alias for {@link Normalizer#normalize}.
       * @param {string} text The text to normalize.
       * @returns {string} The normalized text.
       */
      _call(text) {
        return this.normalize(text);
      }
    };
    Replace = class extends Normalizer {
      /**
       * Normalize the input text by replacing the pattern with the content.
       * @param {string} text The input text to be normalized.
       * @returns {string} The normalized text after replacing the pattern with the content.
       */
      normalize(text) {
        let pattern = createPattern(this.config.pattern);
        if (pattern === null) {
          return text;
        }
        text = text.replaceAll(pattern, this.config.content);
        return text;
      }
    };
    NFC = class extends Normalizer {
      /**
       * Normalize the input text by applying Unicode normalization form C (NFC).
       * @param {string} text The input text to be normalized.
       * @returns {string} The normalized text.
       */
      normalize(text) {
        text = text.normalize("NFC");
        return text;
      }
    };
    NFKD = class extends Normalizer {
      /**
       * Normalize text using NFKD normalization.
       * @param {string} text The text to be normalized.
       * @returns {string} The normalized text.
       */
      normalize(text) {
        text = text.normalize("NFKD");
        return text;
      }
    };
    StripAccents = class extends Normalizer {
      /**
       * Remove all accents from the text.
       * @param {string} text The input text.
       * @returns {string} The normalized text without accents.
       */
      normalize(text) {
        text = text.replace(/[\u0300-\u036f]/g, "");
        return text;
      }
    };
    Lowercase = class extends Normalizer {
      /**
       * Lowercases the input string.
       * @param {string} text The text to normalize.
       * @returns {string} The normalized text.
       */
      normalize(text) {
        text = text.toLowerCase();
        return text;
      }
    };
    Prepend = class extends Normalizer {
      /**
       * Prepends the input string.
       * @param {string} text The text to normalize.
       * @returns {string} The normalized text.
       */
      normalize(text) {
        text = this.config.prepend + text;
        return text;
      }
    };
    NormalizerSequence = class extends Normalizer {
      /**
      * Create a new instance of NormalizerSequence.
      * @param {Object} config The configuration object.
      * @param {Object[]} config.normalizers An array of Normalizer configuration objects.
      */
      constructor(config) {
        super(config);
        this.normalizers = config.normalizers.map((x) => Normalizer.fromConfig(x));
      }
      /**
      * Apply a sequence of Normalizers to the input text.
      * @param {string} text The text to normalize.
      * @returns {string} The normalized text.
      */
      normalize(text) {
        return this.normalizers.reduce((t, normalizer) => {
          return normalizer.normalize(t);
        }, text);
      }
    };
    BertNormalizer = class extends Normalizer {
      /**
       * Adds whitespace around any CJK (Chinese, Japanese, or Korean) character in the input text.
       *
       * @param {string} text The input text to tokenize.
       * @returns {string} The tokenized text with whitespace added around CJK characters.
       */
      _tokenize_chinese_chars(text) {
        let output = [];
        for (let i2 = 0; i2 < text.length; ++i2) {
          let char = text[i2];
          let cp = char.charCodeAt(0);
          if (this._is_chinese_char(cp)) {
            output.push(" ");
            output.push(char);
            output.push(" ");
          } else {
            output.push(char);
          }
        }
        return output.join("");
      }
      /**
       * Checks whether the given Unicode codepoint represents a CJK (Chinese, Japanese, or Korean) character.
       *
       * A "chinese character" is defined as anything in the CJK Unicode block:
       * https://en.wikipedia.org/wiki/CJK_Unified_Ideographs_(Unicode_block)
       *
       * Note that the CJK Unicode block is NOT all Japanese and Korean characters, despite its name.
       * The modern Korean Hangul alphabet is a different block, as is Japanese Hiragana and Katakana.
       * Those alphabets are used to write space-separated words, so they are not treated specially
       * and are handled like all other languages.
       *
       * @param {number} cp The Unicode codepoint to check.
       * @returns {boolean} True if the codepoint represents a CJK character, false otherwise.
       */
      _is_chinese_char(cp) {
        return cp >= 19968 && cp <= 40959 || cp >= 13312 && cp <= 19903 || cp >= 131072 && cp <= 173791 || cp >= 173824 && cp <= 177983 || cp >= 177984 && cp <= 178207 || cp >= 178208 && cp <= 183983 || cp >= 63744 && cp <= 64255 || cp >= 194560 && cp <= 195103;
      }
      /**
       * Strips accents from the given text.
       * @param {string} text The text to strip accents from.
       * @returns {string} The text with accents removed.
       */
      stripAccents(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }
      /**
       * Normalizes the given text based on the configuration.
       * @param {string} text The text to normalize.
       * @returns {string} The normalized text.
       */
      normalize(text) {
        if (this.config.handle_chinese_chars) {
          text = this._tokenize_chinese_chars(text);
        }
        if (this.config.lowercase) {
          text = text.toLowerCase();
          if (this.config.strip_accents !== false) {
            text = this.stripAccents(text);
          }
        } else if (this.config.strip_accents) {
          text = this.stripAccents(text);
        }
        return text;
      }
    };
    PreTokenizer = class extends Callable {
      /**
      * Factory method that returns an instance of a subclass of `PreTokenizer` based on the provided configuration.
      *
      * @static
      * @param {Object} config A configuration object for the pre-tokenizer.
      * @returns {PreTokenizer} An instance of a subclass of `PreTokenizer`.
      * @throws {Error} If the provided configuration object does not correspond to any known pre-tokenizer.
      */
      static fromConfig(config) {
        if (config === null) return null;
        switch (config.type) {
          case "BertPreTokenizer":
            return new BertPreTokenizer(config);
          case "Sequence":
            return new PreTokenizerSequence(config);
          case "WhitespaceSplit":
            return new WhitespaceSplit(config);
          case "Metaspace":
            return new MetaspacePreTokenizer(config);
          case "ByteLevel":
            return new ByteLevelPreTokenizer(config);
          case "Split":
            return new SplitPreTokenizer(config);
          default:
            throw new Error(`Unknown PreTokenizer type: ${config.type}`);
        }
      }
      /**
      * Method that should be implemented by subclasses to define the specific pre-tokenization logic.
      *
      * @abstract
      * @param {string} text The text to pre-tokenize.
      * @returns {string[]} The pre-tokenized text.
      * @throws {Error} If the method is not implemented in the subclass.
      */
      pre_tokenize_text(text) {
        throw Error("pre_tokenize_text should be implemented in subclass.");
      }
      /**
       * Tokenizes the given text into pre-tokens.
       * @param {string|string[]} text The text or array of texts to pre-tokenize.
       * @returns {string[]} An array of pre-tokens.
       */
      pre_tokenize(text) {
        let result = [];
        if (Array.isArray(text)) {
          result = text.map((x) => this.pre_tokenize_text(x));
        } else {
          result = this.pre_tokenize_text(text);
        }
        return result.flat();
      }
      /**
       * Alias for {@link PreTokenizer#pre_tokenize}.
       * @param {string|string[]} text The text or array of texts to pre-tokenize.
       * @returns {string[]} An array of pre-tokens.
       */
      _call(text) {
        return this.pre_tokenize(text);
      }
    };
    BertPreTokenizer = class extends PreTokenizer {
      /**
       * A PreTokenizer that splits text into wordpieces using a basic tokenization scheme
       * similar to that used in the original implementation of BERT.
       * 
       * @param {Object} config The configuration object.
       */
      constructor(config) {
        super();
        const punctuation = "\\p{P}\\u0021-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E";
        this.pattern = new RegExp(`[^\\s${punctuation}]+|[${punctuation}]`, "gu");
      }
      /**
       * Tokenizes a single text using the BERT pre-tokenization scheme.
       * 
       * @param {string} text The text to tokenize.
       * @returns {Array<string>} An array of tokens.
       */
      pre_tokenize_text(text) {
        return text.trim().match(this.pattern) || [];
      }
    };
    ByteLevelPreTokenizer = class extends PreTokenizer {
      /**
       * Creates a new instance of the `ByteLevelPreTokenizer` class.
       * @param {Object} config The configuration object.
       */
      constructor(config) {
        super();
        this.config = config;
        this.add_prefix_space = this.config.add_prefix_space;
        this.trim_offsets = this.config.trim_offsets;
        this.use_regex = this.config.use_regex ?? true;
        this.pattern = new RegExp("'s|'t|'re|'ve|'m|'ll|'d| ?\\p{L}+| ?\\p{N}+| ?[^\\s\\p{L}\\p{N}]+|\\s+(?!\\S)|\\s+", "gu");
        this.byte_encoder = BYTES_TO_UNICODE;
        this.text_encoder = new TextEncoder();
      }
      /**
       * Tokenizes a single piece of text using byte-level tokenization.
       * @param {string} text The text to tokenize.
       * @returns {string[]} An array of tokens.
       */
      pre_tokenize_text(text) {
        let tokens = this.use_regex ? text.match(this.pattern) || [] : [text];
        return tokens.map((token) => {
          if (this.add_prefix_space && !token.startsWith(" ")) {
            token = " " + token;
          }
          token = Array.from(this.text_encoder.encode(token), (byte) => this.byte_encoder[byte]).join("");
          return token;
        });
      }
    };
    SplitPreTokenizer = class extends PreTokenizer {
      /**
       * @param {Object} config The configuration options for the pre-tokenizer.
       * @param {Object} config.pattern The pattern used to split the text. Can be a string or a regex object.
       * @param {string|undefined} config.pattern.String The string to use for splitting. Only defined if the pattern is a string.
       * @param {string|undefined} config.pattern.Regex The regex to use for splitting. Only defined if the pattern is a regex.
       * @param {'isolated'|'removed'} config.behavior The behavior to use when splitting.
       */
      constructor(config) {
        super();
        this.config = config;
      }
      /**
       * Tokenizes text by splitting it using the given pattern.
       * @param {string} text The text to tokenize.
       * @returns {string[]} An array of tokens.
       */
      pre_tokenize_text(text) {
        let pattern = createPattern(this.config.pattern);
        if (pattern === null) {
          return [];
        }
        switch (this.config.behavior.toLowerCase()) {
          // TODO add merged_with_previous, merged_with_next, contiguous
          // TODO these should act slightly differently. Currently, we haven't found a tokenizer which produces different results.
          case "isolated":
          case "removed":
            return text.match(pattern) || [];
          default:
            console.warn(`Unknown split behavior: "${this.config.behavior}"`);
            return [];
        }
      }
    };
    PostProcessor = class extends Callable {
      /**
       * @param {Object} config The configuration for the post-processor.
       */
      constructor(config) {
        super();
        this.config = config;
      }
      /**
       * Factory method to create a PostProcessor object from a configuration object.
       *
       * @param {Object} config Configuration object representing a PostProcessor.
       * @returns {PostProcessor} A PostProcessor object created from the given configuration.
       * @throws {Error} If an unknown PostProcessor type is encountered.
       */
      static fromConfig(config) {
        switch (config.type) {
          case "TemplateProcessing":
            return new TemplateProcessing(config);
          case "ByteLevel":
            return new ByteLevelPostProcessor(config);
          case "RobertaProcessing":
            return new RobertaProcessing(config);
          default:
            throw new Error(`Unknown PostProcessor type: ${config.type}`);
        }
      }
      /**
       * Method to be implemented in subclass to apply post-processing on the given tokens.
       *
       * @param {Array} tokens The input tokens to be post-processed.
       * @param {...*} args Additional arguments required by the post-processing logic.
       * @returns {Array} The post-processed tokens.
       * @throws {Error} If the method is not implemented in subclass.
       */
      post_process(tokens, ...args2) {
        throw Error("post_process should be implemented in subclass.");
      }
      /**
       * Alias for {@link PostProcessor#post_process}.
       * @param {Array} tokens The text or array of texts to post-process.
       * @param {...*} args Additional arguments required by the post-processing logic.
       * @returns {Array} An array of post-processed tokens.
       */
      _call(tokens, ...args2) {
        return this.post_process(tokens, ...args2);
      }
    };
    RobertaProcessing = class extends PostProcessor {
      /**
       * @param {Object} config The configuration for the post-processor.
       * @param {string[]} config.cls The special tokens to add to the beginning of the input.
       * @param {string[]} config.sep The special tokens to add to the end of the input.
       */
      constructor(config) {
        super(config);
        this.cls = config.cls[0];
        this.sep = config.sep[0];
      }
      /**
       * Adds the special tokens to the beginning and end of the input.
       * @param {string[]} tokens The input tokens.
       * @param {string[]|null} tokens_pair An optional second set of input tokens.
       * @returns {string[]} The input tokens with the special tokens added to the beginning and end.
       */
      post_process(tokens, tokens_pair = null) {
        tokens = [this.cls, ...tokens, this.sep];
        if (tokens_pair !== null) {
          tokens = [...tokens, this.sep, ...tokens_pair, this.sep];
        }
        return tokens;
      }
    };
    TemplateProcessing = class extends PostProcessor {
      /**
       * Creates a new instance of `TemplateProcessing`.
       * @param {Object} config The configuration options for the post processor.
       * @param {Array} config.single The template for a single sequence of tokens.
       * @param {Array} config.pair The template for a pair of sequences of tokens.
       */
      constructor(config) {
        super(config);
        this.single = config.single;
        this.pair = config.pair;
      }
      /**
       * Replaces special tokens in the template with actual tokens.
       * @param {Array} tokens The list of tokens for the first sequence.
       * @param {Array} [tokens_pair=null] The list of tokens for the second sequence (optional).
       * @returns {Array} The list of tokens with the special tokens replaced with actual tokens.
       */
      post_process(tokens, tokens_pair = null) {
        let type = tokens_pair === null ? this.single : this.pair;
        let toReturn = [];
        for (let item of type) {
          if ("SpecialToken" in item) {
            toReturn.push(item.SpecialToken.id);
          } else if ("Sequence" in item) {
            if (item.Sequence.id === "A") {
              toReturn.push(...tokens);
            } else if (item.Sequence.id === "B") {
              toReturn.push(...tokens_pair);
            }
          }
        }
        return toReturn;
      }
    };
    ByteLevelPostProcessor = class extends PostProcessor {
      /**
       * Post process the given tokens.
       * @param {string[]} tokens The tokens to be post processed.
       * @returns {string[]} The post processed tokens.
       */
      post_process(tokens) {
        return tokens;
      }
    };
    Decoder = class extends Callable {
      /**
      * Creates an instance of `Decoder`.
      *
      * @param {Object} config The configuration object.
      */
      constructor(config) {
        super();
        this.config = config;
        this.added_tokens = [];
        this.end_of_word_suffix = null;
        this.trim_offsets = config.trim_offsets;
      }
      /**
      * Creates a decoder instance based on the provided configuration.
      *
      * @param {Object} config The configuration object.
      * @returns {Decoder} A decoder instance.
      * @throws {Error} If an unknown decoder type is provided.
      */
      static fromConfig(config) {
        switch (config.type) {
          case "WordPiece":
            return new WordPieceDecoder(config);
          case "Metaspace":
            return new MetaspaceDecoder(config);
          case "ByteLevel":
            return new ByteLevelDecoder(config);
          case "Replace":
            return new ReplaceDecoder(config);
          case "ByteFallback":
            return new ByteFallback(config);
          case "Fuse":
            return new FuseDecoder(config);
          case "Strip":
            return new StripDecoder(config);
          case "Sequence":
            return new DecoderSequence(config);
          default:
            throw new Error(`Unknown Decoder type: ${config.type}`);
        }
      }
      /**
      * Calls the `decode` method.
      *
      * @param {string[]} tokens The list of tokens.
      * @returns {string} The decoded string.
      */
      _call(tokens) {
        return this.decode(tokens);
      }
      /**
      * Decodes a list of tokens.
      * @param {string[]} tokens The list of tokens.
      * @returns {string} The decoded string.
      */
      decode(tokens) {
        return this.decode_chain(tokens).join("");
      }
      /**
       * Apply the decoder to a list of tokens.
       * 
       * @param {string[]} tokens The list of tokens.
       * @returns {string[]} The decoded list of tokens.
       * @throws {Error} If the `decode_chain` method is not implemented in the subclass.
       */
      decode_chain(tokens) {
        throw Error("`decode_chain` should be implemented in subclass.");
      }
    };
    ReplaceDecoder = class extends Decoder {
      constructor(config) {
        super(config);
      }
      /** @type {Decoder['decode_chain']} */
      decode_chain(tokens) {
        let pattern = createPattern(this.config.pattern);
        if (pattern === null) {
          return tokens;
        }
        return tokens.map((token) => token.replaceAll(pattern, this.config.content));
      }
    };
    ByteFallback = class extends Decoder {
      constructor(config) {
        super(config);
        this.text_decoder = new TextDecoder();
      }
      /** @type {Decoder['decode_chain']} */
      decode_chain(tokens) {
        let new_tokens = [];
        let previous_byte_tokens = [];
        for (let token of tokens) {
          let bytes = null;
          if (token.length === 6 && token.startsWith("<0x") && token.endsWith(">")) {
            let byte = parseInt(token.slice(3, 5), 16);
            if (!isNaN(byte)) {
              bytes = byte;
            }
          }
          if (bytes !== null) {
            previous_byte_tokens.push(bytes);
          } else {
            if (previous_byte_tokens.length > 0) {
              let string = this.text_decoder.decode(Uint8Array.from(previous_byte_tokens));
              new_tokens.push(string);
              previous_byte_tokens = [];
            }
            new_tokens.push(token);
          }
        }
        if (previous_byte_tokens.length > 0) {
          let string = this.text_decoder.decode(Uint8Array.from(previous_byte_tokens));
          new_tokens.push(string);
          previous_byte_tokens = [];
        }
        return new_tokens;
      }
    };
    FuseDecoder = class extends Decoder {
      constructor(config) {
        super(config);
      }
      /** @type {Decoder['decode_chain']} */
      decode_chain(tokens) {
        return [tokens.join("")];
      }
    };
    StripDecoder = class extends Decoder {
      constructor(config) {
        super(config);
        this.content = this.config.content;
        this.start = this.config.start;
        this.stop = this.config.stop;
      }
      /** @type {Decoder['decode_chain']} */
      decode_chain(tokens) {
        return tokens.map((token) => {
          let start_cut = 0;
          for (let i2 = 0; i2 < this.start; ++i2) {
            if (token[i2] === this.content) {
              start_cut = i2 + 1;
              continue;
            } else {
              break;
            }
          }
          let stop_cut = token.length;
          for (let i2 = 0; i2 < this.stop; ++i2) {
            const index = token.length - i2 - 1;
            if (token[index] === this.content) {
              stop_cut = index;
              continue;
            } else {
              break;
            }
          }
          return token.slice(start_cut, stop_cut);
        });
      }
    };
    WordPieceDecoder = class extends Decoder {
      /**
       * Creates a new instance of WordPieceDecoder.
       * @param {Object} config The configuration object.
       * @param {string} config.prefix The prefix used for WordPiece encoding.
       * @param {boolean} config.cleanup Whether to cleanup the decoded string.
       */
      constructor(config) {
        super(config);
        this.cleanup = config.cleanup;
      }
      /** @type {Decoder['decode_chain']} */
      decode_chain(tokens) {
        return tokens.map((token, i2) => {
          if (i2 !== 0) {
            if (token.startsWith(this.config.prefix)) {
              token = token.replace(this.config.prefix, "");
            } else {
              token = " " + token;
            }
          }
          if (this.cleanup) {
            token = clean_up_tokenization(token);
          }
          return token;
        });
      }
    };
    ByteLevelDecoder = class extends Decoder {
      /**
       * Create a `ByteLevelDecoder` object.
       * @param {Object} config Configuration object.
       */
      constructor(config) {
        super(config);
        this.byte_decoder = UNICODE_TO_BYTES;
        this.text_decoder = new TextDecoder("utf-8", {
          fatal: false,
          ignoreBOM: true
        });
        this.end_of_word_suffix = null;
      }
      /**
       * Convert an array of tokens to string by decoding each byte.
       * @param {string[]} tokens Array of tokens to be decoded.
       * @returns {string} The decoded string.
       */
      convert_tokens_to_string(tokens) {
        let text = tokens.join("");
        let byteArray = new Uint8Array([...text].map((c) => this.byte_decoder[c]));
        let decoded_text = this.text_decoder.decode(byteArray);
        return decoded_text;
      }
      /** @type {Decoder['decode_chain']} */
      decode_chain(tokens) {
        let sub_texts = [];
        let current_sub_text = [];
        for (let token of tokens) {
          if (this.added_tokens.includes(token)) {
            if (current_sub_text.length > 0) {
              sub_texts.push(this.convert_tokens_to_string(current_sub_text));
              current_sub_text = [];
            }
            sub_texts.push(token);
          } else {
            current_sub_text.push(token);
          }
        }
        if (current_sub_text.length > 0) {
          sub_texts.push(this.convert_tokens_to_string(current_sub_text));
        }
        return sub_texts;
      }
    };
    DecoderSequence = class extends Decoder {
      /**
       * Creates a new instance of DecoderSequence.
       * @param {Object} config The configuration object.
       * @param {Decoder[]} config.decoders The list of decoders to apply.
       */
      constructor(config) {
        super(config);
        this.decoders = config.decoders.map((x) => Decoder.fromConfig(x));
      }
      /** @type {Decoder['decode_chain']} */
      decode_chain(tokens) {
        return this.decoders.reduce((toks, decoder) => {
          return decoder.decode_chain(toks);
        }, tokens);
      }
    };
    MetaspacePreTokenizer = class extends PreTokenizer {
      /**
       * @param {Object} config The configuration object for the MetaspacePreTokenizer.
       * @param {boolean} config.add_prefix_space Whether to add a prefix space to the first token.
       * @param {string} config.replacement The character to replace spaces with.
       * @param {string} [config.str_rep=config.replacement] An optional string representation of the replacement character.
       */
      constructor(config) {
        super();
        this.addPrefixSpace = config.add_prefix_space;
        this.replacement = config.replacement;
        this.strRep = config.str_rep || this.replacement;
      }
      /**
       * This method takes a list of normalized tokens, replaces spaces with the replacement character,
       * adds a prefix space if requested, and returns a new list of tokens.
       * @param {string[]|string} normalizedTokens The list of normalized tokens to pre-tokenize.
       * @returns {string[]} A new list of pre-tokenized tokens.
       */
      pre_tokenize(normalizedTokens) {
        if (typeof normalizedTokens === "string") {
          normalizedTokens = normalizedTokens.trimStart().split(/\s+/);
        }
        const result = [];
        for (let token of normalizedTokens) {
          let normalized = token.replaceAll(" ", this.strRep);
          if (this.addPrefixSpace && !normalized.startsWith(this.replacement)) {
            normalized = this.strRep + normalized;
          }
          result.push(normalized);
        }
        return result;
      }
    };
    MetaspaceDecoder = class extends Decoder {
      /**
       * Constructs a new MetaspaceDecoder object.
       * @param {Object} config The configuration object for the MetaspaceDecoder.
       * @param {boolean} config.add_prefix_space Whether to add a prefix space to the decoded string.
       * @param {string} config.replacement The string to replace spaces with.
       */
      constructor(config) {
        super(config);
        this.addPrefixSpace = config.add_prefix_space;
        this.replacement = config.replacement;
      }
      /** @type {Decoder['decode_chain']} */
      decode_chain(tokens) {
        let result = [];
        for (let i2 = 0; i2 < tokens.length; ++i2) {
          let normalized = tokens[i2].replaceAll(this.replacement, " ");
          if (this.addPrefixSpace && i2 == 0 && normalized.startsWith(" ")) {
            normalized = normalized.substring(1);
          }
          result.push(normalized);
        }
        return result;
      }
    };
    Precompiled = class extends Normalizer {
      /**
       * Create a new instance of Precompiled normalizer.
       * @param {Object} config The configuration object.
       * @param {any} config.precompiled_charsmap Precompiled chars mapping.
       */
      constructor(config) {
        super(config);
        this.charsmap = config.precompiled_charsmap;
      }
      /**
       * Normalizes the given text by applying the precompiled charsmap.
       * @param {string} text The text to normalize.
       * @returns {string} The normalized text.
       */
      normalize(text) {
        return text;
      }
    };
    PreTokenizerSequence = class extends PreTokenizer {
      /**
       * Creates an instance of PreTokenizerSequence.
       * @param {Object} config The configuration object for the pre-tokenizer sequence.
       * @param {Object[]} config.pretokenizers An array of pre-tokenizer configurations.
       */
      constructor(config) {
        super();
        this.tokenizers = config.pretokenizers.map((x) => PreTokenizer.fromConfig(x));
      }
      /**
       * Applies each pre-tokenizer in the sequence to the input text in turn.
       * @param {string|string[]} text The text(s) to pre-tokenize.
       * @returns {string[]} The pre-tokenized text.
       */
      pre_tokenize_text(text) {
        if (typeof text === "string") {
          text = [text];
        }
        return this.tokenizers.reduce((preTokenizedText, tokenizer) => {
          return tokenizer.pre_tokenize(preTokenizedText);
        }, text);
      }
    };
    WhitespaceSplit = class extends PreTokenizer {
      /**
       * Creates an instance of WhitespaceSplit.
       * @param {Object} config The configuration object for the pre-tokenizer sequence.
       */
      constructor(config) {
        super();
      }
      /**
       * Pre-tokenizes the input text by splitting it on whitespace characters.
       * @param {string} text The text to be pre-tokenized.
       * @returns {string[]} An array of tokens produced by splitting the input text on whitespace.
       */
      pre_tokenize_text(text) {
        return whitespace_split(text);
      }
    };
    PreTrainedTokenizer = class extends Callable {
      /**
       * Create a new PreTrainedTokenizer instance.
       * @param {Object} tokenizerJSON The JSON of the tokenizer.
       * @param {Object} tokenizerConfig The config of the tokenizer.
       */
      constructor(tokenizerJSON, tokenizerConfig) {
        super();
        this.normalizer = Normalizer.fromConfig(tokenizerJSON.normalizer);
        this.pre_tokenizer = PreTokenizer.fromConfig(tokenizerJSON.pre_tokenizer);
        if (tokenizerJSON.model.vocab) {
          if (!Array.isArray(tokenizerJSON.model.vocab)) {
            tokenizerJSON.model.vocab = Object.entries(tokenizerJSON.model.vocab);
          }
          tokenizerJSON.model.vocab = new Map(tokenizerJSON.model.vocab);
        }
        this.model = TokenizerModel.fromConfig(tokenizerJSON.model, tokenizerConfig);
        this.post_processor = PostProcessor.fromConfig(tokenizerJSON.post_processor);
        this.decoder = Decoder.fromConfig(tokenizerJSON.decoder);
        this.decoder.end_of_word_suffix = this.model.end_of_word_suffix;
        this.special_tokens = [];
        this.all_special_ids = [];
        this.added_tokens = [];
        for (let addedToken of tokenizerJSON.added_tokens) {
          let id = addedToken.id;
          let content = addedToken.content;
          this.added_tokens.push(content);
          this.model.tokens_to_ids.set(content, id);
          this.model.vocab[id] = content;
          if (addedToken.special) {
            this.special_tokens.push(content);
            this.all_special_ids.push(id);
          }
        }
        this.decoder.added_tokens = this.added_tokens;
        this.added_tokens_regex = new RegExp(
          "(" + this.added_tokens.map(escapeRegExp).join("|") + ")"
        );
        this.mask_token = this.getToken(tokenizerConfig, "mask_token");
        this.mask_token_id = this.model.tokens_to_ids.get(this.mask_token);
        this.pad_token = this.getToken(tokenizerConfig, "pad_token", "eos_token");
        this.pad_token_id = this.model.tokens_to_ids.get(this.pad_token);
        this.sep_token = this.getToken(tokenizerConfig, "sep_token");
        this.sep_token_id = this.model.tokens_to_ids.get(this.sep_token);
        this.model_max_length = tokenizerConfig.model_max_length;
        this.remove_space = tokenizerConfig.remove_space;
        this.clean_up_tokenization_spaces = tokenizerConfig.clean_up_tokenization_spaces ?? true;
        this.padding_side = "right";
      }
      /**
       * Returns the value of the first matching key in the tokenizer config object.
       * @param {...string} keys One or more keys to search for in the tokenizer config object.
       * @returns {string|null} The value associated with the first matching key, or null if no match is found.
       * @throws {Error} If an object is found for a matching key and its __type property is not "AddedToken".
       */
      getToken(tokenizerConfig, ...keys) {
        for (let key of keys) {
          let item = tokenizerConfig[key];
          if (!item) continue;
          if (typeof item === "object") {
            if (item.__type === "AddedToken") {
              return item.content;
            } else {
              throw Error(`Unknown token: ${item}`);
            }
          } else {
            return item;
          }
        }
        return null;
      }
      /**
       * Loads a pre-trained tokenizer from the given `pretrained_model_name_or_path`. 
       * 
       * @param {string} pretrained_model_name_or_path The path to the pre-trained tokenizer.
       * @param {PretrainedOptions} options Additional options for loading the tokenizer. For more information, @see {@link PreTrainedTokenizer.from_pretrained}.
       * 
       * @throws {Error} Throws an error if the tokenizer.json or tokenizer_config.json files are not found in the `pretrained_model_name_or_path`.
       * @returns {Promise<PreTrainedTokenizer>} A new instance of the `PreTrainedTokenizer` class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        let info3 = await loadTokenizer(pretrained_model_name_or_path, {
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        return new this(...info3);
      }
      /**
       * This function can be overridden by a subclass to apply additional preprocessing
       * to a model's input data.
       * @param {Object} inputs An object containing input data as properties.
       * @returns {Object} The modified inputs object.
       */
      prepare_model_inputs(inputs) {
        return inputs;
      }
      /**
       * Encode/tokenize the given text(s).
       * @param {string|string[]} text The text to tokenize.
       * @param {Object} options An optional object containing the following properties:
       * @param {string|string[]} [options.text_pair=null] Optional second sequence to be encoded. If set, must be the same type as text.
       * @param {boolean} [options.padding=false] Whether to pad the input sequences.
       * @param {boolean} [options.truncation=null] Whether to truncate the input sequences.
       * @param {number} [options.max_length=null] Maximum length of the returned list and optionally padding length.
       * @param {boolean} [options.return_tensor=true] Whether to return the results as Tensors or arrays.
       * @returns {{ input_ids: number[]|number[][]|Tensor, attention_mask: any[]|Tensor }} Object to be passed to the model.
       */
      _call(text, {
        text_pair = null,
        // add_special_tokens = true, // TODO
        padding = false,
        truncation = null,
        max_length = null,
        return_tensor = true
        // Different to HF
      } = {}) {
        let tokens;
        if (Array.isArray(text)) {
          if (text.length === 0) {
            throw Error("text array must be non-empty");
          }
          if (text_pair !== null) {
            if (!Array.isArray(text_pair)) {
              throw Error("text_pair must also be an array");
            } else if (text.length !== text_pair.length) {
              throw Error("text and text_pair must have the same length");
            }
            tokens = text.map(
              (t, i2) => this.encode(t, text_pair[i2])
            );
          } else {
            tokens = text.map((x) => this.encode(x));
          }
        } else {
          if (text === null) {
            throw Error("text may not be null");
          }
          if (Array.isArray(text_pair)) {
            throw Error("When specifying `text_pair`, since `text` is a string, `text_pair` must also be a string (i.e., not an array).");
          }
          tokens = [this.encode(text, text_pair)];
        }
        let maxLengthOfBatch = Math.max(...tokens.map((x) => x.length));
        if (max_length === null) {
          max_length = maxLengthOfBatch;
        }
        max_length = Math.min(max_length, this.model_max_length);
        let attention_mask = [];
        if (padding || truncation) {
          for (let i2 = 0; i2 < tokens.length; ++i2) {
            if (tokens[i2].length === max_length) {
              attention_mask.push(new Array(tokens[i2].length).fill(1));
              continue;
            } else if (tokens[i2].length > max_length) {
              if (truncation) {
                tokens[i2] = tokens[i2].slice(0, max_length);
              }
              attention_mask.push(new Array(tokens[i2].length).fill(1));
            } else {
              if (padding) {
                let diff = max_length - tokens[i2].length;
                if (this.padding_side === "right") {
                  attention_mask.push(
                    new Array(tokens[i2].length).fill(1).concat(new Array(diff).fill(0))
                  );
                  tokens[i2].push(...new Array(diff).fill(this.pad_token_id));
                } else {
                  attention_mask.push(
                    new Array(diff).fill(0).concat(new Array(tokens[i2].length).fill(1))
                  );
                  tokens[i2].unshift(...new Array(diff).fill(this.pad_token_id));
                }
              } else {
                attention_mask.push(new Array(tokens[i2].length).fill(1));
              }
            }
          }
        } else {
          attention_mask = tokens.map((x) => new Array(x.length).fill(1));
        }
        if (return_tensor) {
          if (!(padding && truncation)) {
            if (tokens.some((x) => x.length !== tokens[0].length)) {
              throw Error(
                "Unable to create tensor, you should probably activate truncation and/or padding with 'padding=true' and 'truncation=true' to have batched tensors with the same length."
              );
            }
          }
          let dims = [tokens.length, tokens[0].length];
          tokens = new Tensor3(
            "int64",
            BigInt64Array.from(tokens.flat().map(BigInt)),
            dims
          );
          attention_mask = new Tensor3(
            "int64",
            BigInt64Array.from(attention_mask.flat().map(BigInt)),
            dims
          );
        } else {
          if (!Array.isArray(text)) {
            tokens = tokens[0];
            attention_mask = attention_mask[0];
          }
        }
        let modelInputs = {
          input_ids: tokens,
          attention_mask
        };
        modelInputs = this.prepare_model_inputs(modelInputs);
        return modelInputs;
      }
      /**
       * Encodes a single text using the preprocessor pipeline of the tokenizer.
       *
       * @param {string|null} text The text to encode.
       * @returns {Array} The encoded tokens.
       */
      _encode_text(text) {
        if (text === null) return null;
        const sections = text.split(this.added_tokens_regex).filter((x) => x);
        let tokens = sections.map((x) => {
          if (this.added_tokens.includes(x)) {
            return x;
          } else {
            if (this.remove_space === true) {
              x = x.trim().split(/\s+/).join(" ");
            }
            if (this.normalizer !== null) {
              x = this.normalizer(x);
            }
            let sectionTokens = this.pre_tokenizer !== null ? this.pre_tokenizer(x) : [x];
            let tokens2 = this.model(sectionTokens);
            return tokens2;
          }
        }).flat();
        return tokens;
      }
      /**
       * Encodes a single text or a pair of texts using the model's tokenizer.
       *
       * @param {string} text The text to encode.
       * @param {string|null} text_pair The optional second text to encode.
       * @returns {number[]} An array of token IDs representing the encoded text(s).
       */
      encode(text, text_pair = null) {
        let tokens = this._encode_text(text);
        let tokens2 = this._encode_text(text_pair);
        let combinedTokens = this.post_processor(tokens, tokens2);
        let ids = this.model.convert_tokens_to_ids(combinedTokens);
        return ids;
      }
      /**
       * Decode a batch of tokenized sequences.
       * @param {number[][]} batch List of tokenized input sequences.
       * @param {Object} decode_args (Optional) Object with decoding arguments.
       * @returns {string[]} List of decoded sequences.
       */
      batch_decode(batch, decode_args = {}) {
        return batch.map((x) => this.decode(x, decode_args));
      }
      /**
       * Decodes a sequence of token IDs back to a string.
       *
       * @param {number[]} token_ids List of token IDs to decode.
       * @param {Object} [decode_args={}]
       * @param {boolean} [decode_args.skip_special_tokens=false] If true, special tokens are removed from the output string.
       * @param {boolean} [decode_args.clean_up_tokenization_spaces=true] If true, spaces before punctuations and abbreviated forms are removed.
       *
       * @returns {string} The decoded string.
       * @throws {Error} If `token_ids` is not a non-empty array of integers.
       */
      decode(token_ids, decode_args = {}) {
        if (!Array.isArray(token_ids) || token_ids.length === 0 || !isIntegralNumber(token_ids[0])) {
          throw Error("token_ids must be a non-empty array of integers.");
        }
        return this.decode_single(token_ids, decode_args);
      }
      /**
       * Decode a single list of token ids to a string.
       * @param {number[]} token_ids List of token ids to decode
       * @param {Object} decode_args Optional arguments for decoding
       * @param {boolean} [decode_args.skip_special_tokens=false] Whether to skip special tokens during decoding
       * @param {boolean} [decode_args.clean_up_tokenization_spaces=null] Whether to clean up tokenization spaces during decoding.
       * If null, the value is set to `this.decoder.cleanup` if it exists, falling back to `this.clean_up_tokenization_spaces` if it exists, falling back to `true`.
       * @returns {string} The decoded string
       */
      decode_single(token_ids, {
        skip_special_tokens = false,
        clean_up_tokenization_spaces = null
      }) {
        let tokens = this.model.convert_ids_to_tokens(token_ids);
        if (skip_special_tokens) {
          tokens = tokens.filter((x) => !this.special_tokens.includes(x));
        }
        let decoded = this.decoder(tokens);
        if (this.decoder.end_of_word_suffix) {
          decoded = decoded.replaceAll(this.decoder.end_of_word_suffix, " ");
          if (skip_special_tokens) {
            decoded = decoded.trim();
          }
        }
        if (clean_up_tokenization_spaces ?? this.clean_up_tokenization_spaces) {
          decoded = clean_up_tokenization(decoded);
        }
        return decoded;
      }
    };
    BertTokenizer = class extends PreTrainedTokenizer {
      /** @see {@link add_token_types} */
      prepare_model_inputs(inputs) {
        return add_token_types(inputs);
      }
    };
    AlbertTokenizer = class extends PreTrainedTokenizer {
      /** @see {@link add_token_types} */
      prepare_model_inputs(inputs) {
        return add_token_types(inputs);
      }
    };
    MobileBertTokenizer = class extends PreTrainedTokenizer {
      /** @see {@link add_token_types} */
      prepare_model_inputs(inputs) {
        return add_token_types(inputs);
      }
    };
    SqueezeBertTokenizer = class extends PreTrainedTokenizer {
      /** @see {@link add_token_types} */
      prepare_model_inputs(inputs) {
        return add_token_types(inputs);
      }
    };
    DistilBertTokenizer = class extends PreTrainedTokenizer {
    };
    T5Tokenizer = class extends PreTrainedTokenizer {
    };
    GPT2Tokenizer = class extends PreTrainedTokenizer {
    };
    BartTokenizer = class extends PreTrainedTokenizer {
    };
    RobertaTokenizer = class extends PreTrainedTokenizer {
    };
    BloomTokenizer = class extends PreTrainedTokenizer {
    };
    LlamaTokenizer = class extends PreTrainedTokenizer {
      /** @see {@link add_token_types} */
      prepare_model_inputs(inputs) {
        return add_token_types(inputs);
      }
    };
    NllbTokenizer = class extends PreTrainedTokenizer {
      constructor(tokenizerJSON, tokenizerConfig) {
        super(tokenizerJSON, tokenizerConfig);
        this.languageRegex = /^[a-z]{3}_[A-Z][a-z]{3}$/;
        this.language_codes = this.special_tokens.filter((x) => this.languageRegex.test(x));
      }
      /**
       * Helper function to build translation inputs for an `NllbTokenizer`.
       * @param {string|string[]} raw_inputs The text to tokenize.
       * @param {Object} tokenizer_options Options to be sent to the tokenizer
       * @param {Object} generate_kwargs Generation options.
       * @returns {Object} Object to be passed to the model.
       */
      _build_translation_inputs(raw_inputs, tokenizer_options, generate_kwargs) {
        if (!this.language_codes.includes(generate_kwargs.tgt_lang)) {
          throw new Error(`Target language code "${generate_kwargs.tgt_lang}" is not valid. Must be one of: {${this.language_codes.join(", ")}}`);
        }
        if (generate_kwargs.src_lang !== void 0) {
          if (!this.language_codes.includes(generate_kwargs.src_lang)) {
            throw new Error(`Source language code "${generate_kwargs.src_lang}" is not valid. Must be one of: {${this.language_codes.join(", ")}}`);
          }
          for (let item of this.post_processor.config.single) {
            if ("SpecialToken" in item && this.languageRegex.test(item.SpecialToken.id)) {
              item.SpecialToken.id = generate_kwargs.src_lang;
              break;
            }
          }
        }
        generate_kwargs.forced_bos_token_id = this.model.convert_tokens_to_ids([generate_kwargs.tgt_lang])[0];
        return this._call(raw_inputs, tokenizer_options);
      }
    };
    WhisperTokenizer = class _WhisperTokenizer extends PreTrainedTokenizer {
      static LANGUAGES = {
        "en": "english",
        "zh": "chinese",
        "de": "german",
        "es": "spanish",
        "ru": "russian",
        "ko": "korean",
        "fr": "french",
        "ja": "japanese",
        "pt": "portuguese",
        "tr": "turkish",
        "pl": "polish",
        "ca": "catalan",
        "nl": "dutch",
        "ar": "arabic",
        "sv": "swedish",
        "it": "italian",
        "id": "indonesian",
        "hi": "hindi",
        "fi": "finnish",
        "vi": "vietnamese",
        "he": "hebrew",
        "uk": "ukrainian",
        "el": "greek",
        "ms": "malay",
        "cs": "czech",
        "ro": "romanian",
        "da": "danish",
        "hu": "hungarian",
        "ta": "tamil",
        "no": "norwegian",
        "th": "thai",
        "ur": "urdu",
        "hr": "croatian",
        "bg": "bulgarian",
        "lt": "lithuanian",
        "la": "latin",
        "mi": "maori",
        "ml": "malayalam",
        "cy": "welsh",
        "sk": "slovak",
        "te": "telugu",
        "fa": "persian",
        "lv": "latvian",
        "bn": "bengali",
        "sr": "serbian",
        "az": "azerbaijani",
        "sl": "slovenian",
        "kn": "kannada",
        "et": "estonian",
        "mk": "macedonian",
        "br": "breton",
        "eu": "basque",
        "is": "icelandic",
        "hy": "armenian",
        "ne": "nepali",
        "mn": "mongolian",
        "bs": "bosnian",
        "kk": "kazakh",
        "sq": "albanian",
        "sw": "swahili",
        "gl": "galician",
        "mr": "marathi",
        "pa": "punjabi",
        "si": "sinhala",
        "km": "khmer",
        "sn": "shona",
        "yo": "yoruba",
        "so": "somali",
        "af": "afrikaans",
        "oc": "occitan",
        "ka": "georgian",
        "be": "belarusian",
        "tg": "tajik",
        "sd": "sindhi",
        "gu": "gujarati",
        "am": "amharic",
        "yi": "yiddish",
        "lo": "lao",
        "uz": "uzbek",
        "fo": "faroese",
        "ht": "haitian creole",
        "ps": "pashto",
        "tk": "turkmen",
        "nn": "nynorsk",
        "mt": "maltese",
        "sa": "sanskrit",
        "lb": "luxembourgish",
        "my": "myanmar",
        "bo": "tibetan",
        "tl": "tagalog",
        "mg": "malagasy",
        "as": "assamese",
        "tt": "tatar",
        "haw": "hawaiian",
        "ln": "lingala",
        "ha": "hausa",
        "ba": "bashkir",
        "jw": "javanese",
        "su": "sundanese"
      };
      /**
       * Decodes automatic speech recognition (ASR) sequences.
       * @param {Array<{tokens: number[], stride: number[]}>} sequences The sequences to decode.
       * @param {Object} options The options to use for decoding.
       * @returns {Array<string|{chunks?: undefined|Array<{language: string|null, timestamp: Array<number|null>, text: string}>}>} The decoded sequences.
       */
      _decode_asr(sequences, {
        return_timestamps = false,
        return_language = false,
        time_precision = null,
        force_full_sequences = true
      } = {}) {
        if (time_precision === null) {
          throw Error("Must specify time_precision");
        }
        let last_language = null;
        function new_chunk() {
          return { "language": last_language, "timestamp": [null, null], "text": "" };
        }
        const chunks = [];
        let chunk = new_chunk();
        let time_offset = 0;
        const timestamp_begin = this.model.convert_tokens_to_ids(["<|notimestamps|>"])[0] + 1;
        let previous_tokens = [];
        let skip = false;
        let right_stride_start = null;
        const all_special_ids = new Set(this.all_special_ids);
        for (let output of sequences) {
          const token_ids = output.tokens;
          let last_timestamp = null;
          let first_timestamp = timestamp_begin;
          if ("stride" in output) {
            const [chunk_len, stride_left, stride_right] = output.stride;
            time_offset -= stride_left;
            right_stride_start = chunk_len - stride_right;
            if (stride_left) {
              first_timestamp = stride_left / time_precision + timestamp_begin;
            }
            if (stride_right) {
              for (let i2 = token_ids.length - 1; i2 >= 0; --i2) {
                const token = token_ids[i2];
                if (token >= timestamp_begin) {
                  if (last_timestamp !== null && (token - timestamp_begin) * time_precision < right_stride_start) {
                    break;
                  }
                  last_timestamp = token;
                }
              }
            }
          }
          let current_tokens = [];
          for (const token of token_ids) {
            if (all_special_ids.has(token)) {
              const text = this.decode([token]);
              if (text[0] === "[" && text[text.length - 1] === "]") {
                const language = _WhisperTokenizer.LANGUAGES[text.slice(1, -1)];
                if (language !== void 0) {
                  if (last_language !== null && language !== last_language && !return_timestamps) {
                    previous_tokens.push(current_tokens);
                    const resolved_tokens = this.findLongestCommonSequence(previous_tokens);
                    const resolved_text = this.decode(resolved_tokens);
                    chunk.text = resolved_text;
                    chunks.push(chunk);
                    previous_tokens = [];
                    current_tokens = [];
                    chunk = new_chunk();
                  }
                  last_language = chunk.language = language;
                } else {
                }
              }
            } else if (token >= timestamp_begin) {
              const time = (token - timestamp_begin) * time_precision + time_offset;
              const rounded_time = Math.round(time * 100) / 100;
              if (last_timestamp !== null && token >= last_timestamp) {
                skip = true;
              } else if (skip || previous_tokens.length > 0 && token < first_timestamp) {
                skip = false;
              } else if (chunk.timestamp[0] === null) {
                chunk.timestamp[0] = rounded_time;
              } else {
                if (rounded_time === chunk.timestamp[0]) {
                } else {
                  chunk.timestamp[1] = time;
                  previous_tokens.push(current_tokens);
                  const resolved_tokens = this.findLongestCommonSequence(previous_tokens);
                  const resolved_text = this.decode(resolved_tokens);
                  chunk.text = resolved_text;
                  chunks.push(chunk);
                  previous_tokens = [];
                  current_tokens = [];
                  chunk = new_chunk();
                }
              }
            } else {
              current_tokens.push(token);
            }
          }
          if ("stride" in output) {
            const [chunk_len, stride_left, stride_right] = output.stride;
            time_offset += chunk_len - stride_right;
          }
          if (current_tokens.length > 0) {
            previous_tokens.push(current_tokens);
          } else if (previous_tokens.every((p) => p.length === 0)) {
            chunk = new_chunk();
            previous_tokens = [];
            current_tokens = [];
          }
        }
        if (previous_tokens.length > 0) {
          if (force_full_sequences && return_timestamps) {
            throw new Error("There was an error while processing timestamps, we haven't found a timestamp as last token.");
          }
          const resolved_tokens = this.findLongestCommonSequence(previous_tokens);
          const resolved_text = this.decode(resolved_tokens);
          chunk.text = resolved_text;
          chunks.push(chunk);
        }
        let optional = /* @__PURE__ */ Object.create(null);
        const full_text = chunks.map((chunk2) => chunk2.text).join("");
        if (return_timestamps || return_language) {
          for (let i2 = 0; i2 < chunks.length; ++i2) {
            const chunk2 = chunks[i2];
            if (!return_timestamps) {
              delete chunk2["timestamp"];
            }
            if (!return_language) {
              delete chunk2["language"];
            }
          }
          optional = { "chunks": chunks };
        }
        return [full_text, optional];
      }
      /**
       * Finds the longest common sequence among the provided sequences.
       * @param {number[][]} sequences An array of sequences of token ids to compare.
       * @returns {number[]} The longest common sequence found.
       * @throws {Error} If there is a bug within the function.
       */
      findLongestCommonSequence(sequences) {
        let leftSequence = sequences[0];
        let leftLength = leftSequence.length;
        let totalSequence = [];
        for (let i2 = 1; i2 < sequences.length; ++i2) {
          const rightSequence = sequences[i2];
          let max2 = 0;
          let maxIndices = [leftLength, leftLength, 0, 0];
          const rightLength = rightSequence.length;
          for (let j2 = 1; j2 < leftLength + rightLength; ++j2) {
            const eps = j2 / 1e4;
            const leftStart2 = Math.max(0, leftLength - j2);
            const leftStop2 = Math.min(leftLength, leftLength + rightLength - j2);
            const left = leftSequence.slice(leftStart2, leftStop2);
            const rightStart2 = Math.max(0, j2 - leftLength);
            const rightStop2 = Math.min(rightLength, j2);
            const right = rightSequence.slice(rightStart2, rightStop2);
            if (left.length !== right.length) {
              throw new Error("There is a bug within whisper `decode_asr` function, please report it. Dropping to prevent bad inference.");
            }
            const matches = left.filter((elem, idx) => elem === right[idx]).length;
            const matching = matches / j2 + eps;
            if (matches > 1 && matching > max2) {
              max2 = matching;
              maxIndices = [leftStart2, leftStop2, rightStart2, rightStop2];
            }
          }
          const [leftStart, leftStop, rightStart, rightStop] = maxIndices;
          const leftMid = Math.floor((leftStop + leftStart) / 2);
          const rightMid = Math.floor((rightStop + rightStart) / 2);
          totalSequence.push(...leftSequence.slice(0, leftMid));
          leftSequence = rightSequence.slice(rightMid);
          leftLength = leftSequence.length;
        }
        totalSequence.push(...leftSequence);
        return totalSequence;
      }
    };
    CodeGenTokenizer = class extends PreTrainedTokenizer {
    };
    CLIPTokenizer = class extends PreTrainedTokenizer {
    };
    MarianTokenizer = class extends PreTrainedTokenizer {
      /**
       * Create a new MarianTokenizer instance.
       * @param {Object} tokenizerJSON The JSON of the tokenizer.
       * @param {Object} tokenizerConfig The config of the tokenizer.
       */
      constructor(tokenizerJSON, tokenizerConfig) {
        super(tokenizerJSON, tokenizerConfig);
        this.languageRegex = /^(>>\w+<<)\s*/g;
        this.supported_language_codes = this.model.vocab.filter(
          (x) => this.languageRegex.test(x)
        );
        console.warn('WARNING: `MarianTokenizer` is not yet supported by Hugging Face\'s "fast" tokenizers library. Therefore, you may experience slightly inaccurate results.');
      }
      /**
       * Encodes a single text. Overriding this method is necessary since the language codes
       * must be removed before encoding with sentencepiece model.
       * @see https://github.com/huggingface/transformers/blob/12d51db243a00726a548a43cc333390ebae731e3/src/transformers/models/marian/tokenization_marian.py#L204-L213
       *
       * @param {string|null} text The text to encode.
       * @returns {Array} The encoded tokens.
       */
      _encode_text(text) {
        if (text === null) return null;
        let [matchInfo, ...remainder] = text.trim().split(this.languageRegex);
        if (remainder.length === 0) {
          return super._encode_text(matchInfo);
        } else if (remainder.length === 2) {
          let [language, text2] = remainder;
          if (!this.supported_language_codes.includes(language)) {
            console.warn(`Unsupported language code "${language}" detected, which may lead to unexpected behavior. Should be one of: ${JSON.stringify(this.supported_language_codes)}`);
          }
          return [language, ...super._encode_text(text2)];
        }
      }
    };
    CharTrie = class {
      constructor() {
        this.root = CharTrieNode.default();
      }
      /**
       * Adds one or more `texts` to the trie.
       * @param {string[]} texts The strings to add to the trie.
       */
      extend(texts) {
        for (let text of texts) {
          this.push(text);
        }
      }
      /**
       * Adds one or more `texts` to the trie.
       * @param {*} text The strings to add to the trie.
       */
      push(text) {
        let node = this.root;
        for (let ch of text) {
          let child = node.children.get(ch);
          if (child === void 0) {
            child = CharTrieNode.default();
            node.children.set(ch, child);
          }
          node = child;
        }
        node.isLeaf = true;
      }
      /**
       * Searches the trie for all strings with a common prefix of `text`.
       * @param {string} text The common prefix to search for.
       * @yields {string} Each string in the trie that has `text` as a prefix.
       */
      *commonPrefixSearch(text) {
        let node = this.root;
        let prefix = "";
        for (let i2 = 0; i2 < text.length && node !== void 0; ++i2) {
          const ch = text[i2];
          prefix += ch;
          node = node.children.get(ch);
          if (node !== void 0 && node.isLeaf) {
            yield prefix;
          }
        }
      }
    };
    CharTrieNode = class _CharTrieNode {
      constructor(isLeaf, children) {
        this.isLeaf = isLeaf;
        this.children = children;
      }
      /**
       * Returns a new `CharTrieNode` instance with default values.
       * @returns {CharTrieNode} A new `CharTrieNode` instance with `isLeaf` set to `false` and an empty `children` map.
       */
      static default() {
        return new _CharTrieNode(false, /* @__PURE__ */ new Map());
      }
    };
    TokenLattice = class {
      /**
       * Creates a new TokenLattice instance.
       *
       * @param {string} sentence The input sentence to be tokenized.
       * @param {number} bosTokenId The beginning-of-sequence token ID.
       * @param {number} eosTokenId The end-of-sequence token ID.
       */
      constructor(sentence, bosTokenId, eosTokenId) {
        this.sentence = sentence;
        this.len = sentence.length;
        this.bosTokenId = bosTokenId;
        this.eosTokenId = eosTokenId;
        this.nodes = [];
        this.beginNodes = new Array(this.len + 1);
        this.endNodes = new Array(this.len + 1);
        for (let i2 = 0; i2 < this.len + 1; ++i2) {
          this.beginNodes[i2] = [];
          this.endNodes[i2] = [];
        }
        const bos = new TokenLatticeNode(this.bosTokenId, 0, 0, 0, 0);
        const eos = new TokenLatticeNode(this.eosTokenId, 1, this.len, 0, 0);
        this.nodes.push(bos.clone());
        this.nodes.push(eos.clone());
        this.beginNodes[this.len].push(eos);
        this.endNodes[0].push(bos);
      }
      /**
       * Inserts a new token node into the token lattice.
       *
       * @param {number} pos The starting position of the token.
       * @param {number} length The length of the token.
       * @param {number} score The score of the token.
       * @param {number} tokenId The token ID of the token.
       */
      insert(pos, length, score, tokenId) {
        const nodeId = this.nodes.length;
        const node = new TokenLatticeNode(tokenId, nodeId, pos, length, score);
        this.beginNodes[pos].push(node);
        this.endNodes[pos + length].push(node);
        this.nodes.push(node);
      }
      /**
       * Implements the Viterbi algorithm to compute the most likely sequence of tokens.
       *
       * @returns {TokenLatticeNode[]} The array of nodes representing the most likely sequence of tokens.
       */
      viterbi() {
        const len = this.len;
        let pos = 0;
        while (pos <= len) {
          if (this.beginNodes[pos].length == 0) {
            return [];
          }
          for (let rnode of this.beginNodes[pos]) {
            rnode.prev = null;
            let bestScore = 0;
            let bestNode = null;
            for (let lnode of this.endNodes[pos]) {
              const score = lnode.backtraceScore + rnode.score;
              if (bestNode === null || score > bestScore) {
                bestNode = lnode.clone();
                bestScore = score;
              }
            }
            if (bestNode !== null) {
              rnode.prev = bestNode;
              rnode.backtraceScore = bestScore;
            } else {
              return [];
            }
          }
          ++pos;
        }
        const results = [];
        const root = this.beginNodes[len][0];
        const prev = root.prev;
        if (prev === null) {
          return [];
        }
        let node = prev.clone();
        while (node.prev !== null) {
          results.push(node.clone());
          const n = node.clone();
          node = n.prev.clone();
        }
        results.reverse();
        return results;
      }
      /**
       * @param {TokenLatticeNode} node
       * @returns {string} The array of nodes representing the most likely sequence of tokens.
       */
      piece(node) {
        return this.sentence.slice(node.pos, node.pos + node.length);
      }
      /**
       * @returns {Array} The array of nodes representing the most likely sequence of tokens.
       */
      tokens() {
        const nodes = this.viterbi();
        return nodes.map((x) => this.piece(x));
      }
      /**
       * @returns {Array} The array of nodes representing the most likely sequence of tokens.
       */
      tokenIds() {
        const nodes = this.viterbi();
        return nodes.map((x) => x.tokenId);
      }
    };
    TokenLatticeNode = class _TokenLatticeNode {
      /**
       * Represents a node in a token lattice for a given sentence.
       * @param {number} tokenId The ID of the token associated with this node.
       * @param {number} nodeId The ID of this node.
       * @param {number} pos The starting position of the token in the sentence.
       * @param {number} length The length of the token.
       * @param {number} score The score associated with the token.
       */
      constructor(tokenId, nodeId, pos, length, score) {
        this.tokenId = tokenId;
        this.nodeId = nodeId;
        this.pos = pos;
        this.length = length;
        this.score = score;
        this.prev = null;
        this.backtraceScore = 0;
      }
      /**
       * Returns a clone of this node.
       * @returns {TokenLatticeNode} A clone of this node.
       */
      clone() {
        const n = new _TokenLatticeNode(this.tokenId, this.nodeId, this.pos, this.length, this.score);
        n.prev = this.prev;
        n.backtraceScore = this.backtraceScore;
        return n;
      }
    };
    AutoTokenizer = class {
      static TOKENIZER_CLASS_MAPPING = {
        "T5Tokenizer": T5Tokenizer,
        "DistilBertTokenizer": DistilBertTokenizer,
        "BertTokenizer": BertTokenizer,
        "MobileBertTokenizer": MobileBertTokenizer,
        "SqueezeBertTokenizer": SqueezeBertTokenizer,
        "AlbertTokenizer": AlbertTokenizer,
        "GPT2Tokenizer": GPT2Tokenizer,
        "BartTokenizer": BartTokenizer,
        "RobertaTokenizer": RobertaTokenizer,
        "WhisperTokenizer": WhisperTokenizer,
        "CodeGenTokenizer": CodeGenTokenizer,
        "CLIPTokenizer": CLIPTokenizer,
        "MarianTokenizer": MarianTokenizer,
        "BloomTokenizer": BloomTokenizer,
        "NllbTokenizer": NllbTokenizer,
        "LlamaTokenizer": LlamaTokenizer
      };
      /**
       * Instantiate one of the tokenizer classes of the library from a pretrained model.
       * 
       * The tokenizer class to instantiate is selected based on the `tokenizer_class` property of the config object
       * (either passed as an argument or loaded from `pretrained_model_name_or_path` if possible)
       * 
       * @param {string} pretrained_model_name_or_path The name or path of the pretrained model. Can be either:
       * - A string, the *model id* of a pretrained tokenizer hosted inside a model repo on huggingface.co.
       *   Valid model ids can be located at the root-level, like `bert-base-uncased`, or namespaced under a
       *   user or organization name, like `dbmdz/bert-base-german-cased`.
       * - A path to a *directory* containing tokenizer files, e.g., `./my_model_directory/`.
       * @param {PretrainedOptions} options Additional options for loading the tokenizer.
       * 
       * @returns {Promise<PreTrainedTokenizer>} A new instance of the PreTrainedTokenizer class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        let [tokenizerJSON, tokenizerConfig] = await loadTokenizer(pretrained_model_name_or_path, {
          quantized,
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        let tokenizerName = tokenizerConfig.tokenizer_class.replace(/Fast$/, "");
        let cls = this.TOKENIZER_CLASS_MAPPING[tokenizerName];
        if (!cls) {
          console.warn(`Unknown tokenizer class "${tokenizerName}", attempting to construct from base class.`);
          cls = PreTrainedTokenizer;
        }
        return new cls(tokenizerJSON, tokenizerConfig);
      }
    };
  }
});

// node_modules/@xenova/transformers/src/utils/generation.js
var LogitsProcessorList, LogitsProcessor, ForceTokensLogitsProcessor, ForcedBOSTokenLogitsProcessor, ForcedEOSTokenLogitsProcessor, WhisperTimeStampLogitsProcessor, NoRepeatNGramLogitsProcessor, RepetitionPenaltyLogitsProcessor, GenerationConfig, Sampler, GreedySampler, TopKSampler, BeamSearchSampler;
var init_generation = __esm({
  "node_modules/@xenova/transformers/src/utils/generation.js"() {
    init_tensor2();
    init_core();
    init_maths();
    LogitsProcessorList = class extends Callable {
      /**
       * Constructs a new instance of `LogitsProcessorList`.
       */
      constructor() {
        super();
        this.processors = [];
      }
      /**
       * Adds a new logits processor to the list.
       *
       * @param {LogitsProcessor} item The logits processor function to add.
       */
      push(item) {
        this.processors.push(item);
      }
      /**
       * Adds multiple logits processors to the list.
       *
       * @param {LogitsProcessor[]} items The logits processor functions to add.
       */
      extend(items) {
        this.processors.push(...items);
      }
      /**
       * Applies all logits processors in the list to a batch of logits, modifying them in-place.
       *
       * @param {number[]} input_ids The input IDs for the language model.
       * @param {number[][]} batchedLogits A 2D array of logits, where each row corresponds to a single
       *                                                input sequence in the batch.
       */
      _call(input_ids, batchedLogits) {
        for (let logits of batchedLogits) {
          this.processors.forEach(
            (func2) => func2(input_ids, logits)
          );
        }
      }
      [Symbol.iterator]() {
        return this.processors.values();
      }
    };
    LogitsProcessor = class extends Callable {
      /**
       * Apply the processor to the input logits.
       *
       * @abstract
       * @param {Array} input_ids The input ids.
       * @param {Tensor} logits The logits to process.
       * @throws {Error} Throws an error if `_call` is not implemented in the subclass.
       */
      _call(input_ids, logits) {
        throw Error("`_call` should be implemented in a subclass");
      }
    };
    ForceTokensLogitsProcessor = class extends LogitsProcessor {
      /**
       * Constructs a new instance of `ForceTokensLogitsProcessor`.
       * 
       * @param {Array} forced_decoder_ids The ids of tokens that should be forced.
       */
      constructor(forced_decoder_ids) {
        super();
        this.force_token_map = Object.fromEntries(forced_decoder_ids ?? []);
      }
      /**
       * Apply the processor to the input logits.
       *
       * @param {Array} input_ids The input ids.
       * @param {any} logits The logits to process.
       * @returns {Array} The processed logits.
       */
      _call(input_ids, logits) {
        let map = this.force_token_map[input_ids.length];
        if (exists(map)) {
          logits.data.fill(-Infinity);
          logits.data[map] = 0;
        }
        return logits;
      }
    };
    ForcedBOSTokenLogitsProcessor = class extends LogitsProcessor {
      /**
       * Create a ForcedBOSTokenLogitsProcessor.
       * @param {number} bos_token_id The ID of the beginning-of-sequence token to be forced.
       */
      constructor(bos_token_id) {
        super();
        this.bos_token_id = bos_token_id;
      }
      /**
       * Apply the BOS token forcing to the logits.
       * @param {Array} input_ids The input IDs.
       * @param {Object} logits The logits.
       * @returns {Object} The logits with BOS token forcing.
       */
      _call(input_ids, logits) {
        if (input_ids.length === 1) {
          logits.data.fill(-Infinity);
          logits.data[this.bos_token_id] = 0;
        }
      }
    };
    ForcedEOSTokenLogitsProcessor = class extends LogitsProcessor {
      /**
       * Create a ForcedEOSTokenLogitsProcessor.
       * @param {number} max_length Max length of the sequence.
       * @param {number|number[]} forced_eos_token_id The ID of the end-of-sequence token to be forced.
       */
      constructor(max_length, forced_eos_token_id) {
        super();
        this.max_length = max_length;
        this.forced_eos_token_id = forced_eos_token_id;
      }
      /**
       * Apply the processor to input_ids and logits.
       * 
       * @param {number[]} input_ids The input ids.
       * @param {any} logits The logits tensor.
       */
      _call(input_ids, logits) {
      }
    };
    WhisperTimeStampLogitsProcessor = class extends LogitsProcessor {
      /**
       * Constructs a new WhisperTimeStampLogitsProcessor.
       * @param {Object} generate_config The config object passed to the `generate()` method of a transformer model.
       * @param {number} generate_config.eos_token_id The ID of the end-of-sequence token.
       * @param {number} generate_config.no_timestamps_token_id The ID of the token used to indicate that a token should not have a timestamp.
       * @param {number[][]} [generate_config.forced_decoder_ids] An array of two-element arrays representing decoder IDs that are forced to appear in the output. The second element of each array indicates whether the token is a timestamp.
       * @param {number} [generate_config.max_initial_timestamp_index] The maximum index at which an initial timestamp can appear.
       */
      constructor(generate_config) {
        super();
        this.eos_token_id = generate_config.eos_token_id;
        this.no_timestamps_token_id = generate_config.no_timestamps_token_id;
        this.timestamp_begin = this.no_timestamps_token_id + 1;
        this.begin_index = (generate_config.forced_decoder_ids || []).length + 2;
        if (generate_config.forced_decoder_ids.slice(-1)[0][1] === this.no_timestamps_token_id) {
          this.begin_index -= 1;
        }
        this.max_initial_timestamp_index = generate_config.max_initial_timestamp_index;
      }
      /**
       * Modify the logits to handle timestamp tokens.
       * @param {Array} input_ids The input sequence of tokens.
       * @param {Tensor} logits The logits output by the model.
       * @returns {Tensor} The modified logits.
       */
      _call(input_ids, logits) {
        logits.data[this.no_timestamps_token_id] = -Infinity;
        if (input_ids.length === this.begin_index - 1) {
          logits.data.fill(-Infinity);
          logits.data[this.timestamp_begin] = 0;
          return logits;
        }
        const seq = input_ids.slice(this.begin_index);
        const last_was_timestamp = seq.length >= 1 && seq[seq.length - 1] >= this.timestamp_begin;
        const penultimate_was_timestamp = seq.length < 2 || seq[seq.length - 2] >= this.timestamp_begin;
        if (last_was_timestamp) {
          if (penultimate_was_timestamp) {
            logits.data.subarray(this.timestamp_begin).fill(-Infinity);
          } else {
            logits.data.subarray(0, this.eos_token_id).fill(-Infinity);
          }
        }
        if (input_ids.length === this.begin_index && this.max_initial_timestamp_index !== null) {
          const last_allowed = this.timestamp_begin + this.max_initial_timestamp_index;
          logits.data.subarray(last_allowed + 1).fill(-Infinity);
        }
        const logprobs = log_softmax(logits.data);
        const timestamp_logprob = Math.log(logprobs.subarray(this.timestamp_begin).map(Math.exp).reduce((a, b) => a + b));
        const max_text_token_logprob = Math.max(...logprobs.subarray(0, this.timestamp_begin));
        if (timestamp_logprob > max_text_token_logprob) {
          logits.data.subarray(0, this.timestamp_begin).fill(-Infinity);
        }
        return logits;
      }
    };
    NoRepeatNGramLogitsProcessor = class extends LogitsProcessor {
      /**
       * Create a NoRepeatNGramLogitsProcessor.
       * @param {number} no_repeat_ngram_size The no-repeat-ngram size. All ngrams of this size can only occur once.
       */
      constructor(no_repeat_ngram_size) {
        super();
        this.no_repeat_ngram_size = no_repeat_ngram_size;
      }
      /**
       * Generate n-grams from a sequence of token ids.
       * @param {number[]} prevInputIds List of previous input ids
       * @returns {Map<string, number[]>} Map of generated n-grams
       */
      getNgrams(prevInputIds) {
        const curLen = prevInputIds.length;
        const ngrams = [];
        for (let j2 = 0; j2 < curLen + 1 - this.no_repeat_ngram_size; ++j2) {
          const ngram = [];
          for (let k = 0; k < this.no_repeat_ngram_size; ++k) {
            ngram.push(prevInputIds[j2 + k]);
          }
          ngrams.push(ngram);
        }
        const generatedNgram = /* @__PURE__ */ new Map();
        for (const ngram of ngrams) {
          const prevNgram = ngram.slice(0, ngram.length - 1);
          const prevNgramKey = JSON.stringify(prevNgram);
          const prevNgramValue = generatedNgram.get(prevNgramKey) ?? [];
          prevNgramValue.push(ngram[ngram.length - 1]);
          generatedNgram.set(prevNgramKey, prevNgramValue);
        }
        return generatedNgram;
      }
      /**
       * Generate n-grams from a sequence of token ids.
       * @param {Map<string, number[]>} bannedNgrams Map of banned n-grams
       * @param {number[]} prevInputIds List of previous input ids
       * @returns {number[]} Map of generated n-grams
       */
      getGeneratedNgrams(bannedNgrams, prevInputIds) {
        const ngramIdx = prevInputIds.slice(prevInputIds.length + 1 - this.no_repeat_ngram_size, prevInputIds.length);
        const banned = bannedNgrams.get(JSON.stringify(ngramIdx)) ?? [];
        return banned;
      }
      /**
       * Calculate banned n-gram tokens
       * @param {number[]} prevInputIds List of previous input ids
       * @returns {number[]} Map of generated n-grams
       */
      calcBannedNgramTokens(prevInputIds) {
        const bannedTokens = [];
        if (prevInputIds.length + 1 < this.no_repeat_ngram_size) {
          return bannedTokens;
        } else {
          const generatedNgrams = this.getNgrams(prevInputIds);
          const bannedTokens2 = this.getGeneratedNgrams(generatedNgrams, prevInputIds);
          return bannedTokens2;
        }
      }
      /**
       * Apply the no-repeat-ngram processor to the logits.
       * @param {Array} input_ids The input IDs.
       * @param {Object} logits The logits.
       * @returns {Object} The logits with no-repeat-ngram processing.
       */
      _call(input_ids, logits) {
        const bannedTokens = this.calcBannedNgramTokens(input_ids);
        for (const token of bannedTokens) {
          logits.data[token] = -Infinity;
        }
        return logits;
      }
    };
    RepetitionPenaltyLogitsProcessor = class extends LogitsProcessor {
      /**
       * Create a RepetitionPenaltyLogitsProcessor.
       * @param {number} penalty The penalty to apply for repeated tokens.
       */
      constructor(penalty) {
        super();
        this.penalty = penalty;
      }
      /**
       * Apply the repetition penalty to the logits.
       * @param {Array} input_ids The input IDs.
       * @param {Object} logits The logits.
       * @returns {Object} The logits with repetition penalty processing.
       */
      _call(input_ids, logits) {
        for (const input_id of input_ids) {
          if (logits.data[input_id] < 0) {
            logits.data[input_id] *= this.penalty;
          } else {
            logits.data[input_id] /= this.penalty;
          }
        }
        return logits;
      }
    };
    GenerationConfig = class {
      /**
       * Create a GenerationConfig object
       * @param {Object} [kwargs={}] The configuration parameters. If not set, the default values are used.
       * @param {number} [kwargs.max_length=20] The maximum length the generated tokens can have. Corresponds to the length of the input prompt + `max_new_tokens`. Its effect is overridden by `max_new_tokens`, if also set.
       * @param {number} [kwargs.max_new_tokens=null] The maximum numbers of tokens to generate, ignoring the number of tokens in the prompt.
       * @param {number} [kwargs.min_length=0] The minimum length of the sequence to be generated. Corresponds to the length of the input prompt + `min_new_tokens`. Its effect is overridden by `min_new_tokens`, if also set.
       * @param {number} [kwargs.min_new_tokens=null] The minimum numbers of tokens to generate, ignoring the number of tokens in the prompt.
       * @param {boolean|"never"} [kwargs.early_stopping=false] Controls the stopping condition for beam-based methods, like beam-search. It accepts the following values:
       * - `true`, where the generation stops as soon as there are `num_beams` complete candidates;
       * - `false`, where an heuristic is applied and the generation stops when is it very unlikely to find better candidates;
       * - `"never"`, where the beam search procedure only stops when there cannot be better candidates (canonical beam search algorithm).
       * @param {number} [kwargs.max_time=null] The maximum amount of time you allow the computation to run for in seconds. Generation will still finish the current pass after allocated time has been passed.
       *
       * @param {boolean} [kwargs.do_sample=false] Whether or not to use sampling; use greedy decoding otherwise.
       * @param {number} [kwargs.num_beams=1] Number of beams for beam search. 1 means no beam search.
       * @param {number} [kwargs.num_beam_groups=1] Number of groups to divide `num_beams` into in order to ensure diversity among different groups of beams. See [this paper](https://arxiv.org/pdf/1610.02424.pdf) for more details.
       * @param {number} [kwargs.penalty_alpha=null] The values balance the model confidence and the degeneration penalty in contrastive search decoding.
       * @param {boolean} [kwargs.use_cache=true] Whether or not the model should use the past last key/values attentions (if applicable to the model) to speed up decoding.
       *
       * @param {number} [kwargs.temperature=1.0] The value used to modulate the next token probabilities.
       * @param {number} [kwargs.top_k=50] The number of highest probability vocabulary tokens to keep for top-k-filtering.
       * @param {number} [kwargs.top_p=1.0] If set to float < 1, only the smallest set of most probable tokens with probabilities that add up to `top_p` or higher are kept for generation.
       * @param {number} [kwargs.typical_p=1.0] Local typicality measures how similar the conditional probability of predicting a target token next is to the expected conditional probability of predicting a random token next, given the partial text already generated. If set to float < 1, the smallest set of the most locally typical tokens with probabilities that add up to `typical_p` or higher are kept for generation. See [this paper](https://arxiv.org/pdf/2202.00666.pdf) for more details.
       * @param {number} [kwargs.epsilon_cutoff=0.0] If set to float strictly between 0 and 1, only tokens with a conditional probability greater than `epsilon_cutoff` will be sampled. In the paper, suggested values range from 3e-4 to 9e-4, depending on the size of the model. See [Truncation Sampling as Language Model Desmoothing](https://arxiv.org/abs/2210.15191) for more details.
       * @param {number} [kwargs.eta_cutoff=0.0] Eta sampling is a hybrid of locally typical sampling and epsilon sampling. If set to float strictly between 0 and 1, a token is only considered if it is greater than either `eta_cutoff` or `sqrt(eta_cutoff) * exp(-entropy(softmax(next_token_logits)))`. The latter term is intuitively the expected next token probability, scaled by `sqrt(eta_cutoff)`. In the paper, suggested values range from 3e-4 to 2e-3, depending on the size of the model. See [Truncation Sampling as Language Model Desmoothing](https://arxiv.org/abs/2210.15191) for more details.
       * @param {number} [kwargs.diversity_penalty=0.0] This value is subtracted from a beam's score if it generates a token same as any beam from other group at a particular time. Note that `diversity_penalty` is only effective if `group beam search` is enabled.
       * @param {number} [kwargs.repetition_penalty=1.0] The parameter for repetition penalty. 1.0 means no penalty. See [this paper](https://arxiv.org/pdf/1909.05858.pdf) for more details.
       * @param {number} [kwargs.encoder_repetition_penalty=1.0] The paramater for encoder_repetition_penalty. An exponential penalty on sequences that are not in the original input. 1.0 means no penalty.
       * @param {number} [kwargs.length_penalty=1.0] Exponential penalty to the length that is used with beam-based generation. It is applied as an exponent to the sequence length, which in turn is used to divide the score of the sequence. Since the score is the log likelihood of the sequence (i.e. negative), `length_penalty` > 0.0 promotes longer sequences, while `length_penalty` < 0.0 encourages shorter sequences.
       * @param {number} [kwargs.no_repeat_ngram_size=0] If set to int > 0, all ngrams of that size can only occur once.
       * @param {number[][]} [kwargs.bad_words_ids=null] List of token ids that are not allowed to be generated. In order to get the token ids of the words that should not appear in the generated text, use `(await tokenizer(bad_words, {add_prefix_space: true, add_special_tokens: false})).input_ids`.
       * @param {number[][]|number[][][]} [kwargs.force_words_ids=null] List of token ids that must be generated. If given a `number[][]`, this is treated as a simple list of words that must be included, the opposite to `bad_words_ids`. If given `number[][][]`, this triggers a [disjunctive constraint](https://github.com/huggingface/transformers/issues/14081), where one can allow different forms of each word.
       * @param {boolean} [kwargs.renormalize_logits=false] Whether to renormalize the logits after applying all the logits processors or warpers (including the custom ones). It's highly recommended to set this flag to `true` as the search algorithms suppose the score logits are normalized but some logit processors or warpers break the normalization.
       * @param {Object[]} [kwargs.constraints=null] Custom constraints that can be added to the generation to ensure that the output will contain the use of certain tokens as defined by `Constraint` objects, in the most sensible way possible.
       * 
       * @param {number} [kwargs.forced_bos_token_id=null] The id of the token to force as the first generated token after the `decoder_start_token_id`. Useful for multilingual models like mBART where the first generated token needs to be the target language token.
       * @param {number|number[]} [kwargs.forced_eos_token_id=null] The id of the token to force as the last generated token when `max_length` is reached. Optionally, use a list to set multiple *end-of-sequence* tokens.
       * @param {boolean} [kwargs.remove_invalid_values=false] Whether to remove possible *nan* and *inf* outputs of the model to prevent the generation method to crash. Note that using `remove_invalid_values` can slow down generation.
       * @param {number[]} [kwargs.exponential_decay_length_penalty=null] This Tuple adds an exponentially increasing length penalty, after a certain amount of tokens have been generated. The tuple shall consist of: `(start_index, decay_factor)` where `start_index` indicates where penalty starts and `decay_factor` represents the factor of exponential decay.
       * @param {number[]} [kwargs.suppress_tokens=null] A list of tokens that will be suppressed at generation. The `SupressTokens` logit processor will set their log probs to `-inf` so that they are not sampled.
       * @param {number[]} [kwargs.begin_suppress_tokens=null] A list of tokens that will be suppressed at the beginning of the generation. The `SupressBeginTokens` logit processor will set their log probs to `-inf` so that they are not sampled.
       * @param {number[][]} [kwargs.forced_decoder_ids=null] A list of pairs of integers which indicates a mapping from generation indices to token indices that will be forced before sampling. For example, `[[1, 123]]` means the second generated token will always be a token of index 123.
       * 
       * @param {number} [kwargs.num_return_sequences=1] The number of independently computed returned sequences for each element in the batch.
       * @param {boolean} [kwargs.output_attentions=false] Whether or not to return the attentions tensors of all attention layers. See `attentions` under returned tensors for more details.
       * @param {boolean} [kwargs.output_hidden_states=false] Whether or not to return the hidden states of all layers. See `hidden_states` under returned tensors for more details.
       * @param {boolean} [kwargs.output_scores=false] Whether or not to return the prediction scores. See `scores` under returned tensors for more details.
       * @param {boolean} [kwargs.return_dict_in_generate=false] Whether or not to return a `ModelOutput` instead of a plain tuple.
       * 
       * @param {number} [kwargs.pad_token_id=null] The id of the *padding* token.
       * @param {number} [kwargs.bos_token_id=null] The id of the *beginning-of-sequence* token.
       * @param {number|number[]} [kwargs.eos_token_id=null] The id of the *end-of-sequence* token. Optionally, use a list to set multiple *end-of-sequence* tokens.
       * 
       * @param {number} [kwargs.encoder_no_repeat_ngram_size=0] If set to int > 0, all ngrams of that size that occur in the `encoder_input_ids` cannot occur in the `decoder_input_ids`.
       * @param {number} [kwargs.decoder_start_token_id=null] If an encoder-decoder model starts decoding with a different token than *bos*, the id of that token.
       * 
       * @param {Object} [kwargs.generation_kwargs={}] Additional generation kwargs will be forwarded to the `generate` function of the model. Kwargs that are not present in `generate`'s signature will be used in the model forward pass.
       */
      constructor(kwargs = {}) {
        this.max_length = kwargs.max_length ?? 20;
        this.max_new_tokens = kwargs.max_new_tokens ?? null;
        this.min_length = kwargs.min_length ?? 0;
        this.min_new_tokens = kwargs.min_new_tokens ?? null;
        this.early_stopping = kwargs.early_stopping ?? false;
        this.max_time = kwargs.max_time ?? null;
        this.do_sample = kwargs.do_sample ?? false;
        this.num_beams = kwargs.num_beams ?? 1;
        this.num_beam_groups = kwargs.num_beam_groups ?? 1;
        this.penalty_alpha = kwargs.penalty_alpha ?? null;
        this.use_cache = kwargs.use_cache ?? true;
        this.temperature = kwargs.temperature ?? 1;
        this.top_k = kwargs.top_k ?? 50;
        this.top_p = kwargs.top_p ?? 1;
        this.typical_p = kwargs.typical_p ?? 1;
        this.epsilon_cutoff = kwargs.epsilon_cutoff ?? 0;
        this.eta_cutoff = kwargs.eta_cutoff ?? 0;
        this.diversity_penalty = kwargs.diversity_penalty ?? 0;
        this.repetition_penalty = kwargs.repetition_penalty ?? 1;
        this.encoder_repetition_penalty = kwargs.encoder_repetition_penalty ?? 1;
        this.length_penalty = kwargs.length_penalty ?? 1;
        this.no_repeat_ngram_size = kwargs.no_repeat_ngram_size ?? 0;
        this.bad_words_ids = kwargs.bad_words_ids ?? null;
        this.force_words_ids = kwargs.force_words_ids ?? null;
        this.renormalize_logits = kwargs.renormalize_logits ?? false;
        this.constraints = kwargs.constraints ?? null;
        this.forced_bos_token_id = kwargs.forced_bos_token_id ?? null;
        this.forced_eos_token_id = kwargs.forced_eos_token_id ?? null;
        this.remove_invalid_values = kwargs.remove_invalid_values ?? false;
        this.exponential_decay_length_penalty = kwargs.exponential_decay_length_penalty ?? null;
        this.suppress_tokens = kwargs.suppress_tokens ?? null;
        this.begin_suppress_tokens = kwargs.begin_suppress_tokens ?? null;
        this.forced_decoder_ids = kwargs.forced_decoder_ids ?? null;
        this.num_return_sequences = kwargs.num_return_sequences ?? 1;
        this.output_attentions = kwargs.output_attentions ?? false;
        this.output_hidden_states = kwargs.output_hidden_states ?? false;
        this.output_scores = kwargs.output_scores ?? false;
        this.return_dict_in_generate = kwargs.return_dict_in_generate ?? false;
        this.pad_token_id = kwargs.pad_token_id ?? null;
        this.bos_token_id = kwargs.bos_token_id ?? null;
        this.eos_token_id = kwargs.eos_token_id ?? null;
        this.encoder_no_repeat_ngram_size = kwargs.encoder_no_repeat_ngram_size ?? 0;
        this.decoder_start_token_id = kwargs.decoder_start_token_id ?? null;
        this.generation_kwargs = kwargs.generation_kwargs ?? {};
      }
    };
    Sampler = class extends Callable {
      /**
       * Creates a new Sampler object with the specified temperature.
       * @param {number} temperature The temperature to use when sampling. Higher values result in more random samples.
       */
      constructor(temperature) {
        super();
        this.temperature = temperature;
      }
      /**
       * Executes the sampler, using the specified logits.
       * @param {any} logits
       * @param {number} index
       * @returns {void}
       */
      _call(logits, index = -1) {
        return this.sample(logits, index);
      }
      /**
       * Abstract method for sampling the logits.
       * @param {any} logits
       * @param {number} index
       * @throws {Error}
       */
      sample(logits, index) {
        throw Error("sample should be implemented in subclasses.");
      }
      /**
       * Returns the specified logits as an array, with temperature applied.
       * @param {any} logits
       * @param {number} index
       * @returns {Array}
       */
      getLogits(logits, index) {
        let vocabSize = logits.dims[2];
        let logs = logits.data;
        if (index === -1) {
          logs = logs.slice(-vocabSize);
        } else {
          let startIndex = index * vocabSize;
          logs = logs.slice(startIndex, startIndex + vocabSize);
        }
        if (this.temperature > 0) {
          logs = logs.map((x) => x / this.temperature);
        }
        return logs;
      }
      /**
       * Selects an item randomly based on the specified probabilities.
       * @param {Array} probabilities An array of probabilities to use for selection.
       * @returns {number} The index of the selected item.
       */
      randomSelect(probabilities) {
        let sumProbabilities = probabilities.reduce((acc, curr) => acc + curr, 0);
        let r = Math.random() * sumProbabilities;
        for (let i2 = 0; i2 < probabilities.length; ++i2) {
          r -= probabilities[i2];
          if (r <= 0) {
            return i2;
          }
        }
        return 0;
      }
      /**
       * Returns a Sampler object based on the specified options.
       * @param {Object} generation_config An object containing options for the sampler.
       * @returns {Sampler} A Sampler object.
       */
      static getSampler(generation_config) {
        if (generation_config.num_beams > 1) {
          return new BeamSearchSampler(
            generation_config.temperature,
            generation_config.num_beams,
            generation_config.do_sample,
            generation_config.top_k
          );
        } else if (generation_config.do_sample) {
          return new TopKSampler(
            generation_config.temperature,
            generation_config.top_k
          );
        } else {
          if (generation_config.num_return_sequences > 1) {
            throw Error(`num_return_sequences has to be 1 when doing greedy search, but is ${generation_config.num_return_sequences}.`);
          }
          return new GreedySampler(generation_config.temperature);
        }
      }
    };
    GreedySampler = class extends Sampler {
      /**
       * Sample the maximum probability of a given logits tensor.
       * @param {any} logits
       * @param {number} [index=-1]
       * @returns {Array} An array with a single tuple, containing the index of the maximum value and a meaningless score (since this is a greedy search).
       */
      sample(logits, index = -1) {
        let logs = this.getLogits(logits, index);
        let argmax = max(logs)[1];
        return [
          [argmax, 0]
        ];
      }
    };
    TopKSampler = class extends Sampler {
      /**
       * Create a TopKSampler.
       * @param {number} temperature
       * @param {number} k
       */
      constructor(temperature, k) {
        super(temperature);
        this.k = k;
      }
      /**
       * Sample from the logits using the top-k sampling strategy.
       * @param {any} logits
       * @param {number} index
       * @returns {Array}
       */
      sample(logits, index = -1) {
        let [batchSize, seqLength, vocabSize] = logits.dims;
        let k = vocabSize;
        if (this.k > 0) {
          k = Math.min(this.k, k);
        }
        let logs = this.getLogits(logits, index);
        let topLogits = getTopItems(logs, k);
        let probabilities = softmax(topLogits.map((x) => x[1]));
        let sampledIndex = this.randomSelect(probabilities);
        let tokenId = topLogits[sampledIndex][0];
        let score = Math.log(probabilities[sampledIndex]);
        return [
          [tokenId, score]
        ];
      }
    };
    BeamSearchSampler = class extends Sampler {
      /**
      * Create a BeamSearchSampler.
      * @param {number} temperature
      * @param {number} num_beams
      * @param {boolean} do_sample
      * @param {number} top_k
      */
      constructor(temperature, num_beams, do_sample, top_k) {
        super(temperature);
        this.num_beams = num_beams;
        this.do_sample = do_sample;
        this.top_k = top_k;
      }
      /**
      * Samples from the logits to generate a sequence using beam search.
      * @param {any} logits The logits to sample from.
      * @param {number} [index=-1] The index to sample from, if applicable.
      * @returns {Array} An array of arrays containing tokens and scores.
      */
      sample(logits, index = -1) {
        let logs = this.getLogits(logits, index);
        if (this.do_sample || this.top_k > 0) {
          const [batchSize, seqLength, vocabSize] = logits.dims;
          let k = vocabSize;
          if (this.top_k > 0) {
            k = Math.min(this.top_k, k);
          }
          const topLogits = getTopItems(logs, k);
          const probabilities = softmax(topLogits.map((x) => x[1]));
          return Array.from({ length: this.num_beams }, () => {
            const sampledIndex = this.randomSelect(probabilities);
            const tokenId = topLogits[sampledIndex][0];
            return [tokenId, Math.log(probabilities[sampledIndex])];
          });
        } else {
          const logProbabilities = log_softmax(logs);
          const topLogits = getTopItems(logProbabilities, this.num_beams);
          return topLogits;
        }
      }
    };
  }
});

// node_modules/@xenova/transformers/src/models.js
async function constructSession(pretrained_model_name_or_path, fileName, options) {
  let modelFileName = `onnx/${fileName}${options.quantized ? "_quantized" : ""}.onnx`;
  let buffer = await getModelFile(pretrained_model_name_or_path, modelFileName, true, options);
  try {
    return await InferenceSession3.create(buffer, {
      executionProviders
    });
  } catch (err2) {
    if (executionProviders.length === 1 && executionProviders[0] === "wasm") {
      throw err2;
    }
    console.warn(err2);
    console.warn(
      "Something went wrong during model construction (most likely a missing operation). Using `wasm` as a fallback. "
    );
    return await InferenceSession3.create(buffer, {
      executionProviders: ["wasm"]
    });
  }
}
async function sessionRun(session, inputs) {
  const checkedInputs = {};
  const missingInputs = [];
  for (let inputName of session.inputNames) {
    if (inputs[inputName] === void 0) {
      missingInputs.push(inputName);
    } else {
      checkedInputs[inputName] = inputs[inputName];
    }
  }
  if (missingInputs.length > 0) {
    throw new Error(
      `An error occurred during model execution: "Missing the following inputs: ${missingInputs.join(", ")}.`
    );
  }
  const numInputsProvided = Object.keys(inputs).length;
  const numInputsNeeded = session.inputNames.length;
  if (numInputsProvided > numInputsNeeded) {
    let ignored = Object.keys(inputs).filter((inputName) => !session.inputNames.includes(inputName));
    console.warn(`WARNING: Too many inputs were provided (${numInputsProvided} > ${numInputsNeeded}). The following inputs will be ignored: "${ignored.join(", ")}".`);
  }
  try {
    let output = await session.run(checkedInputs);
    output = replaceTensors(output);
    return output;
  } catch (e) {
    console.error(`An error occurred during model execution: "${e}".`);
    console.error("Inputs given to model:", checkedInputs);
    throw e;
  }
}
function replaceTensors(obj) {
  for (let prop in obj) {
    if (obj[prop] instanceof ONNXTensor2) {
      obj[prop] = new Tensor3(obj[prop]);
    }
  }
  return obj;
}
function toI64Tensor(items) {
  if (items instanceof Tensor3) {
    return items;
  }
  if (items.length === 0) {
    throw Error("items must be non-empty");
  }
  if (Array.isArray(items[0])) {
    if (items.some((x) => x.length !== items[0].length)) {
      throw Error("Unable to create tensor, you should probably activate truncation and/or padding with 'padding=True' and/or 'truncation=True' to have batched tensors with the same length.");
    }
    return new Tensor3(
      "int64",
      BigInt64Array.from(items.flat().map((x) => BigInt(x))),
      [items.length, items[0].length]
    );
  } else {
    return new Tensor3(
      "int64",
      BigInt64Array.from(items.map((x) => BigInt(x))),
      [1, items.length]
    );
  }
}
function _prepare_attention_mask(self2, tokens) {
  let pad_token_id = self2.config.pad_token_id ?? null;
  let eos_token_id = self2.config.eos_token_id ?? null;
  if (isIntegralNumber(eos_token_id)) {
    eos_token_id = [eos_token_id];
  }
  let is_pad_token_in_inputs = tokens.indexOf(pad_token_id) !== -1;
  let is_pad_token_not_equal_to_eos_token_id = eos_token_id === null || !eos_token_id.includes(pad_token_id);
  if (is_pad_token_in_inputs && is_pad_token_not_equal_to_eos_token_id) {
    let data = BigInt64Array.from(
      // Note: != so that int matches bigint
      tokens.data.map((x) => x != pad_token_id)
    );
    return new Tensor3("int64", data, tokens.dims);
  } else {
    return new Tensor3(
      "int64",
      new BigInt64Array(tokens.data.length).fill(1n),
      tokens.dims
    );
  }
}
function boolTensor(value) {
  return new Tensor3("bool", [value], [1]);
}
async function loadAutoModel(pretrained_model_name_or_path, options) {
  let config = options.config ?? await getModelJSON(pretrained_model_name_or_path, "config.json", true, options);
  let modelName = config.is_encoder_decoder ? "encoder_model" : "model";
  let session = await constructSession(pretrained_model_name_or_path, modelName, options);
  return [config, session];
}
async function loadModel(pretrained_model_name_or_path, options) {
  let info3 = await Promise.all([
    options.config ?? getModelJSON(pretrained_model_name_or_path, "config.json", true, options),
    constructSession(pretrained_model_name_or_path, "model", options)
  ]);
  return info3;
}
async function seq2seqLoadModel(pretrained_model_name_or_path, options) {
  let info3 = await Promise.all([
    options.config ?? getModelJSON(pretrained_model_name_or_path, "config.json", true, options),
    constructSession(pretrained_model_name_or_path, "encoder_model", options),
    constructSession(pretrained_model_name_or_path, "decoder_model_merged", options),
    getModelJSON(pretrained_model_name_or_path, "generation_config.json", false, options)
  ]);
  return info3;
}
async function encoderDecoderLoadModel(pretrained_model_name_or_path, options) {
  let info3 = await Promise.all([
    options.config ?? getModelJSON(pretrained_model_name_or_path, "config.json", true, options),
    constructSession(pretrained_model_name_or_path, "encoder_model", options),
    constructSession(pretrained_model_name_or_path, "decoder_model_merged", options)
  ]);
  return info3;
}
async function decoderLoadModel(pretrained_model_name_or_path, options) {
  let info3 = await Promise.all([
    options.config ?? getModelJSON(pretrained_model_name_or_path, "config.json", true, options),
    constructSession(pretrained_model_name_or_path, "decoder_model_merged", options)
  ]);
  return info3;
}
async function seq2seq_forward(self2, model_inputs, {
  encoder_input_name = "input_ids",
  add_decoder_pkv = true
} = {}) {
  let encoderOutputs = model_inputs.encoder_outputs;
  let pastKeyValues = model_inputs.past_key_values;
  if (encoderOutputs === null) {
    const encoderFeeds = {
      [encoder_input_name]: model_inputs[encoder_input_name]
    };
    if (self2.session.inputNames.includes("attention_mask")) {
      encoderFeeds.attention_mask = model_inputs.attention_mask;
    }
    const encoderResults = await sessionRun(self2.session, encoderFeeds);
    encoderOutputs = encoderResults.last_hidden_state;
  }
  let decoderFeeds = {
    input_ids: model_inputs.decoder_input_ids,
    encoder_hidden_states: encoderOutputs,
    use_cache_branch: boolTensor(pastKeyValues !== null)
  };
  if (self2.decoder_merged_session.inputNames.includes("encoder_attention_mask")) {
    decoderFeeds.encoder_attention_mask = model_inputs.attention_mask;
  }
  self2.addPastKeyValues(decoderFeeds, pastKeyValues, add_decoder_pkv);
  const decoderResults = await sessionRun(self2.decoder_merged_session, decoderFeeds);
  let logits = decoderResults.logits;
  pastKeyValues = self2.getPastKeyValues(decoderResults, pastKeyValues);
  return new Seq2SeqLMOutput(logits, pastKeyValues, encoderOutputs);
}
function seq2seqStartBeams(self2, inputTokenIds, numOutputTokens, requires_attention_mask = true) {
  let beams = [];
  let beamId = 0;
  for (let tokens of inputTokenIds) {
    tokens.dims = [1, ...tokens.dims];
    let start2 = {
      inputs: tokens,
      encoder_outputs: null,
      past_key_values: null,
      // decoder_input_ids == output_token_ids
      output_token_ids: [self2.config.decoder_start_token_id],
      done: false,
      score: 0,
      id: beamId++
      // assign unique id to beams
    };
    if (requires_attention_mask) {
      start2.attention_mask = _prepare_attention_mask(self2, tokens);
    }
    beams.push(start2);
  }
  return beams;
}
async function seq2seqRunBeam(self2, beam, {
  input_name = "input_ids"
} = {}) {
  let model_inputs = {
    [input_name]: beam.inputs,
    decoder_input_ids: toI64Tensor(beam.output_token_ids.slice(-1)),
    encoder_outputs: beam.encoder_outputs,
    past_key_values: beam.past_key_values
  };
  if (beam.attention_mask) {
    model_inputs.attention_mask = beam.attention_mask;
  }
  let output = await self2.forward(model_inputs);
  beam.past_key_values = output.past_key_values;
  beam.encoder_outputs = output.encoder_outputs;
  return output;
}
async function textgen_forward(self2, model_inputs) {
  let past_key_values = model_inputs.past_key_values;
  let decoderFeeds = {
    input_ids: model_inputs.input_ids,
    attention_mask: model_inputs.attention_mask,
    use_cache_branch: boolTensor(past_key_values !== null)
  };
  self2.addPastKeyValues(decoderFeeds, past_key_values);
  let decoderResults = await sessionRun(self2.session, decoderFeeds);
  let logits = decoderResults.logits;
  past_key_values = self2.getPastKeyValues(decoderResults, past_key_values);
  return { logits, past_key_values };
}
function textgenStartBeams(self2, inputTokenIds, numOutputTokens, inputs_attention_mask) {
  let beams = [];
  let beamId = 0;
  for (let tokens of inputTokenIds) {
    tokens.dims = [1, ...tokens.dims];
    let attn_mask;
    if (inputs_attention_mask) {
      attn_mask = inputs_attention_mask[beamId];
      attn_mask.dims = [1, ...attn_mask.dims];
    } else {
      attn_mask = _prepare_attention_mask(self2, tokens);
    }
    let start2 = {
      input: tokens,
      model_input_ids: tokens,
      attention_mask: attn_mask,
      past_key_values: null,
      output_token_ids: [],
      num_output_tokens: numOutputTokens,
      done: false,
      score: 0,
      id: beamId++
      // assign unique id to beams
    };
    beams.push(start2);
  }
  return beams;
}
async function textgenRunBeam(self2, beam) {
  let attnMaskData = new BigInt64Array(beam.input.data.length + beam.output_token_ids.length).fill(1n);
  let model_inputs = {
    input_ids: beam.model_input_ids,
    attention_mask: new Tensor3(
      "int64",
      attnMaskData,
      [1, attnMaskData.length]
    ),
    past_key_values: beam.past_key_values
  };
  let output = await self2.forward(model_inputs);
  beam.past_key_values = output.past_key_values;
  return output;
}
function textgenUpdatebeam(beam, newTokenId) {
  beam.output_token_ids = [...beam.output_token_ids, newTokenId];
  beam.model_input_ids = new Tensor3("int64", [BigInt(newTokenId)], [1, 1]);
}
var InferenceSession3, ONNXTensor2, PreTrainedModel, ModelOutput, BertPreTrainedModel, BertModel, BertForMaskedLM, BertForSequenceClassification, BertForTokenClassification, BertForQuestionAnswering, DistilBertPreTrainedModel, DistilBertModel, DistilBertForSequenceClassification, DistilBertForTokenClassification, DistilBertForQuestionAnswering, DistilBertForMaskedLM, MobileBertPreTrainedModel, MobileBertModel, MobileBertForMaskedLM, MobileBertForSequenceClassification, MobileBertForQuestionAnswering, SqueezeBertPreTrainedModel, SqueezeBertModel, SqueezeBertForMaskedLM, SqueezeBertForSequenceClassification, SqueezeBertForQuestionAnswering, AlbertPreTrainedModel, AlbertModel, AlbertForSequenceClassification, AlbertForQuestionAnswering, AlbertForMaskedLM, T5PreTrainedModel, T5Model, T5ForConditionalGeneration, MT5PreTrainedModel, MT5Model, MT5ForConditionalGeneration, BartPretrainedModel, BartModel, BartForConditionalGeneration, BartForSequenceClassification, RobertaPreTrainedModel, RobertaModel, RobertaForMaskedLM, RobertaForSequenceClassification, RobertaForQuestionAnswering, WhisperPreTrainedModel, WhisperModel, WhisperForConditionalGeneration, VisionEncoderDecoderModel, CLIPPreTrainedModel, CLIPModel, GPT2PreTrainedModel, GPT2Model, GPT2LMHeadModel, GPTNeoPreTrainedModel, GPTNeoModel, GPTNeoForCausalLM, CodeGenPreTrainedModel, CodeGenModel, CodeGenForCausalLM, ViTPreTrainedModel, ViTForImageClassification, DetrPreTrainedModel, DetrForObjectDetection, DetrForSegmentation, DetrObjectDetectionOutput, DetrSegmentationOutput, SamPreTrainedModel, SamModel, SamImageSegmentationOutput, MarianPreTrainedModel, MarianModel, MarianMTModel, M2M100PreTrainedModel, M2M100Model, M2M100ForConditionalGeneration, PretrainedMixin, AutoModel, AutoModelForSequenceClassification, AutoModelForTokenClassification, AutoModelForSeq2SeqLM, AutoModelForCausalLM, AutoModelForMaskedLM, AutoModelForQuestionAnswering, AutoModelForVision2Seq, AutoModelForImageClassification, AutoModelForImageSegmentation, AutoModelForObjectDetection, AutoModelForMaskGeneration, Seq2SeqLMOutput, SequenceClassifierOutput, TokenClassifierOutput, MaskedLMOutput, QuestionAnsweringModelOutput;
var init_models = __esm({
  "node_modules/@xenova/transformers/src/models.js"() {
    init_core();
    init_hub();
    init_generation();
    init_tensor2();
    init_onnx();
    ({ InferenceSession: InferenceSession3, Tensor: ONNXTensor2 } = ONNX);
    PreTrainedModel = class extends Callable {
      /**
       * Creates a new instance of the `PreTrainedModel` class.
       * @param {Object} config The model configuration.
       * @param {any} session session for the model.
       */
      constructor(config, session) {
        super();
        this.config = config;
        this.session = session;
      }
      /**
      * Disposes of all the ONNX sessions that were created during inference.
      * @returns {Promise<unknown[]>} An array of promises, one for each ONNX session that is being disposed.
      */
      async dispose() {
        let promises = [];
        for (let key of Object.keys(this)) {
          let item = this[key];
          if (item instanceof InferenceSession3) {
            promises.push(item.handler.dispose());
          }
        }
        return await Promise.all(promises);
      }
      /**
       * Loads a pre-trained model from the given `pretrained_model_name_or_path`. 
       * 
       * @param {string} pretrained_model_name_or_path The path to the pre-trained model.
       * @param {PretrainedOptions} options Additional options for loading the model. For more information, @see {@link PreTrainedModel.from_pretrained}.
       * 
       * @returns {Promise<PreTrainedModel>} A new instance of the `PreTrainedModel` class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        let info3 = await loadAutoModel(pretrained_model_name_or_path, {
          quantized,
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        return new this(...info3);
      }
      /**
       * Runs the model with the provided inputs
       * @param {Object} model_inputs Object containing input tensors
       * @returns {Promise<Object>} Object containing output tensors
       */
      async _call(model_inputs) {
        return await sessionRun(this.session, model_inputs);
      }
      /**
       * Forward method should be implemented in subclasses.
       * @abstract
       * @param {Object} model_inputs The input data to the model in the format specified in the ONNX model.
       * @returns {Promise<Object>} The output data from the model in the format specified in the ONNX model.
       * @throws {Error} This method must be implemented in subclasses.
       */
      async forward(model_inputs) {
        throw Error("forward should be implemented in subclasses.");
      }
      /**
       * @param {GenerationConfig} generation_config 
       * @param {number} input_ids_seq_length 
       * @returns {LogitsProcessorList}
       */
      _get_logits_processor(generation_config, input_ids_seq_length, logits_processor = null) {
        const processors = new LogitsProcessorList();
        if (generation_config.repetition_penalty !== null && generation_config.repetition_penalty !== 1) {
          processors.push(new RepetitionPenaltyLogitsProcessor(generation_config.repetition_penalty));
        }
        if (generation_config.no_repeat_ngram_size !== null && generation_config.no_repeat_ngram_size > 0) {
          processors.push(new NoRepeatNGramLogitsProcessor(generation_config.no_repeat_ngram_size));
        }
        if (generation_config.forced_bos_token_id !== null) {
          processors.push(new ForcedBOSTokenLogitsProcessor(generation_config.forced_bos_token_id));
        }
        if (generation_config.forced_eos_token_id !== null) {
          processors.push(new ForcedEOSTokenLogitsProcessor(
            generation_config.max_length,
            generation_config.forced_eos_token_id
          ));
        }
        if (generation_config.forced_decoder_ids !== null) {
          processors.push(new ForceTokensLogitsProcessor(generation_config.forced_decoder_ids));
        }
        if (logits_processor !== null) {
          processors.extend(logits_processor);
        }
        return processors;
      }
      /**
      * This function merges multiple generation configs together to form a final generation config to be used by the model for text generation.
      * It first creates an empty `GenerationConfig` object, then it applies the model's own `generation_config` property to it. Finally, if a `generation_config` object was passed in the arguments, it overwrites the corresponding properties in the final config with those of the passed config object.
      *
      * @param {GenerationConfig} generation_config A `GenerationConfig` object containing generation parameters.
      * @returns {GenerationConfig} The final generation config object to be used by the model for text generation.
      */
      _get_generation_config(generation_config) {
        let gen_config = new GenerationConfig();
        if ("generation_config" in this) {
          Object.assign(gen_config, this.generation_config);
        }
        if (generation_config !== null) {
          Object.assign(gen_config, generation_config);
        }
        return gen_config;
      }
      /**
       * @typedef {import('./utils/maths.js').TypedArray} TypedArray
       */
      /**
       * Generates text based on the given inputs and generation configuration using the model.
       * @param {Tensor|Array|TypedArray} inputs An array of input token IDs.
       * @param {Object|null} generation_config The generation configuration to use. If null, default configuration will be used.
       * @param {Object|null} logits_processor An optional logits processor to use. If null, a new LogitsProcessorList instance will be created.
       * @param {Object} options options
       * @param {Object} [options.inputs_attention_mask=null] An optional attention mask for the inputs.
       * @returns {Promise<Array>} An array of generated output sequences, where each sequence is an array of token IDs.
       * @throws {Error} Throws an error if the inputs array is empty.
       */
      async generate(inputs, generation_config = null, logits_processor = null, {
        inputs_attention_mask = null
      } = {}) {
        if (!(inputs instanceof Tensor3) && !isTypedArray(inputs) && !Array.isArray(inputs)) {
          throw Error(`\`inputs\` must be a Tensor, TypedArray, or Array, but is "${inputs.constructor.name}".`);
        }
        if (inputs.length === 0) {
          throw Error("Must supply a non-empty array of input token ids.");
        }
        generation_config = this._get_generation_config(generation_config);
        logits_processor = logits_processor ?? new LogitsProcessorList();
        logits_processor = this._get_logits_processor(
          generation_config,
          inputs.length,
          logits_processor
        );
        let numOutputTokens = 1;
        const maxOutputTokens = numOutputTokens + (generation_config.max_new_tokens ?? Infinity);
        let sampler = Sampler.getSampler(generation_config);
        let beams = this.getStartBeams(inputs, numOutputTokens, inputs_attention_mask);
        while (beams.some((x) => !x.done) && numOutputTokens < maxOutputTokens) {
          let newest_beams = [];
          for (let beam of beams) {
            if (beam.done) {
              newest_beams.push(beam);
              continue;
            }
            let output = await this.runBeam(beam);
            let logits = output.logits.slice(null, -1, null);
            logits_processor(beam.output_token_ids, logits);
            let sampledTokens = sampler(logits);
            for (let [newTokenId, logProb] of sampledTokens) {
              let newBeam = { ...beam };
              this.updateBeam(newBeam, newTokenId);
              newBeam.score += logProb;
              if (newTokenId === this.config.eos_token_id) {
                newBeam.done = true;
              }
              newest_beams.push(newBeam);
            }
          }
          ++numOutputTokens;
          newest_beams = this.groupBeams(newest_beams).map(
            (group) => group.sort((a, b) => b.score - a.score).slice(0, generation_config.num_beams)
            // remove outside beam width
          );
          beams = newest_beams.flat();
          if (generation_config.callback_function) {
            generation_config.callback_function(beams);
          }
        }
        return this.groupBeams(beams).map(
          (batch) => {
            if (generation_config.num_return_sequences > 1) {
              return batch.slice(0, generation_config.num_return_sequences).map((x) => x.output_token_ids);
            } else {
              return [batch[0].output_token_ids];
            }
          }
        );
      }
      /**
       * Groups an array of beam objects by their ids.
       *
       * @param {Array} beams The array of beam objects to group.
       * @returns {Array} An array of arrays, where each inner array contains beam objects with the same id.
       */
      groupBeams(beams) {
        const groups = /* @__PURE__ */ Object.create(null);
        for (const obj of beams) {
          if (groups[obj.id] === void 0) {
            groups[obj.id] = [obj];
          } else {
            groups[obj.id].push(obj);
          }
        }
        return Object.values(groups);
      }
      /**
       * Returns an object containing past key values from the given decoder results object.
       *
       * @param {Object} decoderResults The decoder results object.
       * @param {Object} pastKeyValues The previous past key values.
       * @returns {Object} An object containing past key values.
       */
      getPastKeyValues(decoderResults, pastKeyValues) {
        const pkvs = /* @__PURE__ */ Object.create(null);
        for (const name2 in decoderResults) {
          if (name2.startsWith("present")) {
            let newName = name2.replace("present", "past_key_values");
            if (pastKeyValues !== null && name2.includes("encoder")) {
              pkvs[newName] = pastKeyValues[newName];
            } else {
              pkvs[newName] = decoderResults[name2];
            }
          }
        }
        return pkvs;
      }
      /**
       * Adds past key values to the decoder feeds object. If pastKeyValues is null, creates new tensors for past key values.
       *
       * @param {Object} decoderFeeds The decoder feeds object to add past key values to.
       * @param {Object} pastKeyValues An object containing past key values.
       * @param {boolean} [hasDecoder=false] Whether the model has a decoder.
       */
      addPastKeyValues(decoderFeeds, pastKeyValues, hasDecoder = false) {
        if (pastKeyValues === null) {
          if (hasDecoder) {
            let encoder_dims = [1, this.num_encoder_heads, 0, this.encoder_dim_kv];
            for (let i2 = 0; i2 < this.num_encoder_layers; ++i2) {
              decoderFeeds[`past_key_values.${i2}.encoder.key`] = new Tensor3("float32", [], encoder_dims);
              decoderFeeds[`past_key_values.${i2}.encoder.value`] = new Tensor3("float32", [], encoder_dims);
            }
            let decoder_dims = [1, this.num_decoder_heads, 0, this.decoder_dim_kv];
            for (let i2 = 0; i2 < this.num_decoder_layers; ++i2) {
              decoderFeeds[`past_key_values.${i2}.decoder.key`] = new Tensor3("float32", [], decoder_dims);
              decoderFeeds[`past_key_values.${i2}.decoder.value`] = new Tensor3("float32", [], decoder_dims);
            }
          } else {
            let dims = [1, this.num_heads, 0, this.dim_kv];
            for (let i2 = 0; i2 < this.num_layers; ++i2) {
              decoderFeeds[`past_key_values.${i2}.key`] = new Tensor3("float32", [], dims);
              decoderFeeds[`past_key_values.${i2}.value`] = new Tensor3("float32", [], dims);
            }
          }
        } else {
          Object.assign(decoderFeeds, pastKeyValues);
        }
      }
    };
    ModelOutput = class {
    };
    BertPreTrainedModel = class extends PreTrainedModel {
    };
    BertModel = class extends BertPreTrainedModel {
    };
    BertForMaskedLM = class extends BertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<MaskedLMOutput>} An object containing the model's output logits for masked language modeling.
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new MaskedLMOutput(logits);
      }
    };
    BertForSequenceClassification = class extends BertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new SequenceClassifierOutput(logits);
      }
    };
    BertForTokenClassification = class extends BertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new TokenClassifierOutput(logits);
      }
    };
    BertForQuestionAnswering = class extends BertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
       */
      async _call(model_inputs) {
        let outputs = await super._call(model_inputs);
        return new QuestionAnsweringModelOutput(outputs.start_logits, outputs.end_logits);
      }
    };
    DistilBertPreTrainedModel = class extends PreTrainedModel {
    };
    DistilBertModel = class extends DistilBertPreTrainedModel {
    };
    DistilBertForSequenceClassification = class extends DistilBertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new SequenceClassifierOutput(logits);
      }
    };
    DistilBertForTokenClassification = class extends DistilBertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new TokenClassifierOutput(logits);
      }
    };
    DistilBertForQuestionAnswering = class extends DistilBertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
       */
      async _call(model_inputs) {
        let outputs = await super._call(model_inputs);
        return new QuestionAnsweringModelOutput(outputs.start_logits, outputs.end_logits);
      }
    };
    DistilBertForMaskedLM = class extends DistilBertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<MaskedLMOutput>} returned object
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new MaskedLMOutput(logits);
      }
    };
    MobileBertPreTrainedModel = class extends PreTrainedModel {
    };
    MobileBertModel = class extends MobileBertPreTrainedModel {
    };
    MobileBertForMaskedLM = class extends MobileBertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<MaskedLMOutput>} returned object
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new MaskedLMOutput(logits);
      }
    };
    MobileBertForSequenceClassification = class extends MobileBertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<SequenceClassifierOutput>} returned object
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new SequenceClassifierOutput(logits);
      }
    };
    MobileBertForQuestionAnswering = class extends MobileBertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<QuestionAnsweringModelOutput>} returned object
       */
      async _call(model_inputs) {
        let outputs = await super._call(model_inputs);
        return new QuestionAnsweringModelOutput(outputs.start_logits, outputs.end_logits);
      }
    };
    SqueezeBertPreTrainedModel = class extends PreTrainedModel {
    };
    SqueezeBertModel = class extends SqueezeBertPreTrainedModel {
    };
    SqueezeBertForMaskedLM = class extends SqueezeBertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<MaskedLMOutput>} returned object
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new MaskedLMOutput(logits);
      }
    };
    SqueezeBertForSequenceClassification = class extends SqueezeBertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<SequenceClassifierOutput>} returned object
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new SequenceClassifierOutput(logits);
      }
    };
    SqueezeBertForQuestionAnswering = class extends SqueezeBertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<QuestionAnsweringModelOutput>} returned object
       */
      async _call(model_inputs) {
        let outputs = await super._call(model_inputs);
        return new QuestionAnsweringModelOutput(outputs.start_logits, outputs.end_logits);
      }
    };
    AlbertPreTrainedModel = class extends PreTrainedModel {
    };
    AlbertModel = class extends AlbertPreTrainedModel {
    };
    AlbertForSequenceClassification = class extends AlbertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<SequenceClassifierOutput>} returned object
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new SequenceClassifierOutput(logits);
      }
    };
    AlbertForQuestionAnswering = class extends AlbertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<QuestionAnsweringModelOutput>} returned object
       */
      async _call(model_inputs) {
        let outputs = await super._call(model_inputs);
        return new QuestionAnsweringModelOutput(outputs.start_logits, outputs.end_logits);
      }
    };
    AlbertForMaskedLM = class extends AlbertPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<MaskedLMOutput>} returned object
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new MaskedLMOutput(logits);
      }
    };
    T5PreTrainedModel = class extends PreTrainedModel {
    };
    T5Model = class extends T5PreTrainedModel {
      /**
       * Generates text based on the provided arguments.
       * @throws {Error} Throws an error as the current model class (T5Model) is not compatible with `.generate()`.
       * @returns {Promise<any>}
       * @param {any[]} args
       */
      async generate(...args2) {
        throw Error(
          "The current model class (T5Model) is not compatible with `.generate()`, as it doesn't have a language model head. Please use one of the following classes instead: {'T5ForConditionalGeneration'}"
        );
      }
    };
    T5ForConditionalGeneration = class extends T5PreTrainedModel {
      /**
       * Creates a new instance of the `T5ForConditionalGeneration` class.
       * @param {Object} config The model configuration.
       * @param {any} session session for the model.
       * @param {any} decoder_merged_session session for the decoder.
       * @param {GenerationConfig} generation_config The generation configuration.
       */
      constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;
        this.num_decoder_layers = this.config.num_decoder_layers;
        this.num_decoder_heads = this.config.num_heads;
        this.decoder_dim_kv = this.config.d_kv;
        this.num_encoder_layers = this.config.num_layers;
        this.num_encoder_heads = this.config.num_heads;
        this.encoder_dim_kv = this.config.d_kv;
      }
      /**
       * Loads a pre-trained model from the given `pretrained_model_name_or_path`.
       * 
       * @param {string} pretrained_model_name_or_path The path to the pre-trained model.
       * @param {PretrainedOptions} options Additional options for loading the model. For more information, @see {@link PreTrainedModel.from_pretrained}.
       * 
       * @returns {Promise<T5ForConditionalGeneration>} A new instance of the `T5ForConditionalGeneration` class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        let info3 = await seq2seqLoadModel(pretrained_model_name_or_path, {
          quantized,
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        return new this(...info3);
      }
      /**
       * Generates the start beams for a given set of inputs and output length.
       * @param {number[][]} inputs The input token IDs.
       * @param {number} numOutputTokens The desired output length.
       * @returns {Array} The start beams.
       */
      getStartBeams(inputs, numOutputTokens, ...args2) {
        return seq2seqStartBeams(this, inputs, numOutputTokens);
      }
      /**
       * Runs a single step of the beam search generation algorithm.
       * @param {any} beam The current beam being generated.
       * @returns {Promise<any>} The updated beam after a single generation step.
       */
      async runBeam(beam) {
        return await seq2seqRunBeam(this, beam);
      }
      /**
       * Updates the given beam with a new token ID.
       * @param {any} beam The current beam.
       * @param {number} newTokenId The new token ID to add to the output sequence.
       */
      updateBeam(beam, newTokenId) {
        beam.output_token_ids = [...beam.output_token_ids, newTokenId];
      }
      /**
       * Runs the forward pass of the model for a given set of inputs.
       * @param {Object} model_inputs The model inputs.
       * @returns {Promise<Object>} The model output.
       */
      async forward(model_inputs) {
        return await seq2seq_forward(this, model_inputs);
      }
    };
    MT5PreTrainedModel = class extends PreTrainedModel {
    };
    MT5Model = class extends MT5PreTrainedModel {
      /**
       * 
       * @param  {...any} args
       * @returns {Promise<any>}
       * @throws {Error}
       */
      async generate(...args2) {
        throw Error(
          "The current model class (MT5Model) is not compatible with `.generate()`, as it doesn't have a language model head. Please use one of the following classes instead: {'MT5ForConditionalGeneration'}"
        );
      }
    };
    MT5ForConditionalGeneration = class extends MT5PreTrainedModel {
      /**
       * Creates a new instance of the `MT5ForConditionalGeneration` class.
       * @param {any} config The model configuration.
       * @param {any} session The ONNX session containing the encoder weights.
       * @param {any} decoder_merged_session The ONNX session containing the merged decoder weights.
       * @param {GenerationConfig} generation_config The generation configuration.
       */
      constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;
        this.num_decoder_layers = this.config.num_decoder_layers;
        this.num_decoder_heads = this.config.num_heads;
        this.decoder_dim_kv = this.config.d_kv;
        this.num_encoder_layers = this.config.num_layers;
        this.num_encoder_heads = this.config.num_heads;
        this.encoder_dim_kv = this.config.d_kv;
      }
      /**
       * Loads a pre-trained model from the given `pretrained_model_name_or_path`.
       * 
       * @param {string} pretrained_model_name_or_path The path to the pre-trained model.
       * @param {PretrainedOptions} options Additional options for loading the model. For more information, @see {@link PreTrainedModel.from_pretrained}.
       * 
       * @returns {Promise<MT5ForConditionalGeneration>} A new instance of the `MT5ForConditionalGeneration` class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        let info3 = await seq2seqLoadModel(pretrained_model_name_or_path, {
          quantized,
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        return new this(...info3);
      }
      /**
      * Generates the start beams for the given input tokens and output sequence length.
      *
      * @param {any[]} inputs The input sequence.
      * @param {number} numOutputTokens The desired length of the output sequence.
      * @param {...*} args Additional arguments to pass to the `seq2seqStartBeams` function.
      * @returns {any[]} An array of `Beam` objects representing the start beams.
      */
      getStartBeams(inputs, numOutputTokens, ...args2) {
        return seq2seqStartBeams(this, inputs, numOutputTokens);
      }
      /**
       * Runs a single step of the beam search generation algorithm.
       * @param {any} beam The current beam being generated.
       * @returns {Promise<any>} The updated beam after a single generation step.
       */
      async runBeam(beam) {
        return await seq2seqRunBeam(this, beam);
      }
      /**
       * Updates the given beam with the new predicted token.
       * @param {any} beam The beam to update.
       * @param {number} newTokenId The index of the predicted token.
      */
      updateBeam(beam, newTokenId) {
        beam.output_token_ids = [...beam.output_token_ids, newTokenId];
      }
      /**
      * Runs the forward pass of the model on the given inputs.
      * @param {any} model_inputs The model inputs.
      * @returns {Promise<any>} A Promise that resolves to the model outputs.
      */
      async forward(model_inputs) {
        return await seq2seq_forward(this, model_inputs);
      }
    };
    BartPretrainedModel = class extends PreTrainedModel {
    };
    BartModel = class extends BartPretrainedModel {
      /**
       * Throws an error because the current model class (BartModel) is not compatible with `.generate()`.
       * 
       * @throws {Error} The current model class (BartModel) is not compatible with `.generate()`.
       * @returns {Promise<any>}
       */
      async generate(...args2) {
        throw Error(
          "The current model class (BartModel) is not compatible with `.generate()`, as it doesn't have a language model head. Please use one of the following classes instead: {'BartForConditionalGeneration'}"
        );
      }
    };
    BartForConditionalGeneration = class extends BartPretrainedModel {
      /**
       * Creates a new instance of the `BartForConditionalGeneration` class.
       * @param {Object} config The configuration object for the Bart model.
       * @param {Object} session The ONNX session used to execute the model.
       * @param {Object} decoder_merged_session The ONNX session used to execute the decoder.
       * @param {Object} generation_config The generation configuration object.
       */
      constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;
        this.num_decoder_layers = this.config.decoder_layers;
        this.num_decoder_heads = this.config.decoder_attention_heads;
        this.decoder_dim_kv = this.config.d_model / this.num_decoder_heads;
        this.num_encoder_layers = this.config.encoder_layers;
        this.num_encoder_heads = this.config.encoder_attention_heads;
        this.encoder_dim_kv = this.config.d_model / this.num_encoder_heads;
      }
      /**
       * Loads a pre-trained model from the given `pretrained_model_name_or_path`.
       * 
       * @param {string} pretrained_model_name_or_path The path to the pre-trained model.
       * @param {PretrainedOptions} options Additional options for loading the model. For more information, @see {@link PreTrainedModel.from_pretrained}.
       * 
       * @returns {Promise<BartForConditionalGeneration>} A new instance of the `BartForConditionalGeneration` class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        let info3 = await seq2seqLoadModel(pretrained_model_name_or_path, {
          quantized,
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        return new this(...info3);
      }
      /**
       * Returns the initial beam for generating output text.
       * @param {Object} inputs The input object containing the encoded input text.
       * @param {number} numOutputTokens The maximum number of output tokens to generate.
       * @param  {...any} args Additional arguments to pass to the sequence-to-sequence generation function.
       * @returns {any} The initial beam for generating output text.
       */
      getStartBeams(inputs, numOutputTokens, ...args2) {
        return seq2seqStartBeams(this, inputs, numOutputTokens);
      }
      /**
       * Runs a single step of the beam search generation algorithm.
       * @param {any} beam The current beam being generated.
       * @returns {Promise<any>} The updated beam after a single generation step.
       */
      async runBeam(beam) {
        return await seq2seqRunBeam(this, beam);
      }
      /**
       * Updates the beam by appending the newly generated token ID to the list of output token IDs.
       * @param {any} beam The current beam being generated.
       * @param {number} newTokenId The ID of the newly generated token to append to the list of output token IDs.
       */
      updateBeam(beam, newTokenId) {
        beam.output_token_ids = [...beam.output_token_ids, newTokenId];
      }
      /**
       * Runs the forward pass of the model for a given set of inputs.
       * @param {Object} model_inputs The model inputs.
       * @returns {Promise<Object>} The model output.
       */
      async forward(model_inputs) {
        return await seq2seq_forward(this, model_inputs);
      }
    };
    BartForSequenceClassification = class extends BartPretrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new SequenceClassifierOutput(logits);
      }
    };
    RobertaPreTrainedModel = class extends PreTrainedModel {
    };
    RobertaModel = class extends RobertaPreTrainedModel {
    };
    RobertaForMaskedLM = class extends RobertaPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<MaskedLMOutput>} returned object
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new MaskedLMOutput(logits);
      }
    };
    RobertaForSequenceClassification = class extends RobertaPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<SequenceClassifierOutput>} returned object
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new SequenceClassifierOutput(logits);
      }
    };
    RobertaForQuestionAnswering = class extends RobertaPreTrainedModel {
      /**
       * Calls the model on new inputs.
       *
       * @param {Object} model_inputs The inputs to the model.
       * @returns {Promise<QuestionAnsweringModelOutput>} returned object
       */
      async _call(model_inputs) {
        let outputs = await super._call(model_inputs);
        return new QuestionAnsweringModelOutput(outputs.start_logits, outputs.end_logits);
      }
    };
    WhisperPreTrainedModel = class extends PreTrainedModel {
    };
    WhisperModel = class extends WhisperPreTrainedModel {
      /**
       * Throws an error when attempting to generate output since this model doesn't have a language model head.
       * @throws Error
       * @returns {Promise<any>}
       * @param {any[]} args
       */
      async generate(...args2) {
        throw Error(
          "The current model class (WhisperModel) is not compatible with `.generate()`, as it doesn't have a language model head. Please use one of the following classes instead: {'WhisperForConditionalGeneration'}"
        );
      }
    };
    WhisperForConditionalGeneration = class extends WhisperPreTrainedModel {
      /**
       * Creates a new instance of the `WhisperForConditionalGeneration` class.
       * @param {Object} config Configuration object for the model.
       * @param {Object} session ONNX Session object for the model.
       * @param {Object} decoder_merged_session ONNX Session object for the decoder.
       * @param {Object} generation_config Configuration object for the generation process.
       */
      constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;
        this.num_decoder_layers = this.config.decoder_layers;
        this.num_decoder_heads = this.config.decoder_attention_heads;
        this.decoder_dim_kv = this.config.d_model / this.num_decoder_heads;
        this.num_encoder_layers = this.config.encoder_layers;
        this.num_encoder_heads = this.config.encoder_attention_heads;
        this.encoder_dim_kv = this.config.d_model / this.num_encoder_heads;
      }
      /**
       * Generates outputs based on input and generation configuration.
       * @param {Object} inputs Input data for the model.
       * @param {Object} generation_config Configuration object for the generation process.
       * @param {Object} logits_processor Optional logits processor object.
       * @returns {Promise<Object>} Promise object represents the generated outputs.
       */
      async generate(inputs, generation_config = null, logits_processor = null) {
        generation_config = this._get_generation_config(generation_config);
        generation_config.return_timestamps ??= false;
        if (generation_config.return_timestamps) {
          logits_processor = [new WhisperTimeStampLogitsProcessor(generation_config)];
        }
        return super.generate(inputs, generation_config, logits_processor);
      }
      /**
       * Loads a pre-trained model from the given `pretrained_model_name_or_path`.
       * 
       * @param {string} pretrained_model_name_or_path The path to the pre-trained model.
       * @param {PretrainedOptions} options Additional options for loading the model. For more information, @see {@link PreTrainedModel.from_pretrained}.
       * 
       * @returns {Promise<WhisperForConditionalGeneration>} A new instance of the `WhisperForConditionalGeneration` class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        let info3 = await seq2seqLoadModel(pretrained_model_name_or_path, {
          quantized,
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        return new this(...info3);
      }
      /**
       * Gets the start beams for generating outputs.
       * @param {Array} inputTokenIds Array of input token IDs.
       * @param {number} numOutputTokens Number of output tokens to generate.
       * @returns {Array} Array of start beams.
       */
      getStartBeams(inputTokenIds, numOutputTokens, ...args2) {
        return seq2seqStartBeams(this, inputTokenIds, numOutputTokens, false);
      }
      /**
       * Runs a single step of the beam search generation algorithm.
       * @param {any} beam The current beam being generated.
       * @returns {Promise<any>} The updated beam after a single generation step.
       */
      async runBeam(beam) {
        return await seq2seqRunBeam(this, beam, {
          input_name: "input_features"
        });
      }
      /**
       * Updates the beam by appending the newly generated token ID to the list of output token IDs.
       * @param {any} beam The current beam being generated.
       * @param {number} newTokenId The ID of the newly generated token to append to the list of output token IDs.
       */
      updateBeam(beam, newTokenId) {
        beam.output_token_ids = [...beam.output_token_ids, newTokenId];
      }
      /**
       * Runs the forward pass of the model for a given set of inputs.
       * @param {Object} model_inputs The model inputs.
       * @returns {Promise<Object>} The model output.
       */
      async forward(model_inputs) {
        return await seq2seq_forward(this, model_inputs, {
          encoder_input_name: "input_features"
        });
      }
    };
    VisionEncoderDecoderModel = class extends PreTrainedModel {
      /**
       * Creates a new instance of the `VisionEncoderDecoderModel` class.
       * @param {Object} config The configuration object specifying the hyperparameters and other model settings.
       * @param {Object} session The ONNX session containing the encoder model.
       * @param {any} decoder_merged_session The ONNX session containing the merged decoder model.
       */
      constructor(config, session, decoder_merged_session) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.num_layers = this.config.decoder.n_layer;
        this.num_heads = this.config.decoder.n_head;
        this.dim_kv = this.config.decoder.n_embd / this.num_heads;
      }
      /**
       * Loads a pre-trained model from the given `pretrained_model_name_or_path`.
       * 
       * @param {string} pretrained_model_name_or_path The path to the pre-trained model.
       * @param {PretrainedOptions} options Additional options for loading the model. For more information, @see {@link PreTrainedModel.from_pretrained}.
       * 
       * @returns {Promise<VisionEncoderDecoderModel>} A new instance of the `VisionEncoderDecoderModel` class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        let info3 = await encoderDecoderLoadModel(pretrained_model_name_or_path, {
          quantized,
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        return new this(...info3);
      }
      /**
       * Generate beam search outputs for the given input pixels and number of output tokens.
       *
       * @param {array} inputs The input pixels as a Tensor.
       * @param {number} numOutputTokens The number of output tokens to generate.
       * @param {...*} args Optional additional arguments to pass to seq2seqStartBeams.
       * @returns {any} An array of Beam objects representing the top-K output sequences.
       */
      getStartBeams(inputs, numOutputTokens, ...args2) {
        return seq2seqStartBeams(this, inputs, numOutputTokens);
      }
      /**
       * Runs a single step of the beam search generation algorithm.
       * @param {any} beam The current beam being generated.
       * @returns {Promise<any>} The updated beam after a single generation step.
       */
      async runBeam(beam) {
        return seq2seqRunBeam(this, beam, {
          input_name: "pixel_values"
        });
      }
      /**
       * Update the given beam with the additional predicted token ID.
       *
       * @param {any} beam The current beam.
       * @param {number} newTokenId The new predicted token ID to add to the beam's output sequence.
       */
      updateBeam(beam, newTokenId) {
        beam.output_token_ids = [...beam.output_token_ids, newTokenId];
      }
      /**
       * Compute the forward pass of the model on the given input tensors.
       *
       * @param {Object} model_inputs The input tensors as an object with keys 'pixel_values' and 'decoder_input_ids'.
       * @returns {Promise<any>} The output tensor of the model.
       */
      async forward(model_inputs) {
        return await seq2seq_forward(this, model_inputs, {
          encoder_input_name: "pixel_values",
          add_decoder_pkv: false
        });
      }
    };
    CLIPPreTrainedModel = class extends PreTrainedModel {
    };
    CLIPModel = class extends CLIPPreTrainedModel {
    };
    GPT2PreTrainedModel = class extends PreTrainedModel {
    };
    GPT2Model = class extends GPT2PreTrainedModel {
      /**
       * 
       * @param  {...any} args 
       * @throws {Error}
       * @returns {Promise<any>}
       */
      async generate(...args2) {
        throw Error(
          "The current model class (GPT2Model) is not compatible with `.generate()`, as it doesn't have a language model head. Please use one of the following classes instead: {'GPT2LMHeadModel'}"
        );
      }
    };
    GPT2LMHeadModel = class extends GPT2PreTrainedModel {
      /**
       * Creates a new instance of the `GPT2LMHeadModel` class.
       * @param {Object} config The configuration of the model.
       * @param {any} session The ONNX session containing the model weights.
       */
      constructor(config, session) {
        super(config, session);
        this.config.pad_token_id = this.config.eos_token_id;
        this.num_heads = this.config.n_head;
        this.num_layers = this.config.n_layer;
        this.dim_kv = this.config.n_embd / this.num_heads;
      }
      /**
       * Initializes and returns the beam for text generation task
       * @param {Tensor} inputTokenIds The input token ids.
       * @param {number} numOutputTokens The number of tokens to be generated.
       * @param {Tensor} inputs_attention_mask Optional input attention mask.
       * @returns {any} A Beam object representing the initialized beam.
       */
      getStartBeams(inputTokenIds, numOutputTokens, inputs_attention_mask) {
        return textgenStartBeams(this, inputTokenIds, numOutputTokens, inputs_attention_mask);
      }
      /**
       * Runs a single step of the beam search generation algorithm.
       * @param {any} beam The current beam being generated.
       * @returns {Promise<any>} The updated beam after a single generation step.
       */
      async runBeam(beam) {
        return await textgenRunBeam(this, beam);
      }
      /**
       * Updates the given beam with the new generated token id.
       * @param {any} beam The Beam object representing the beam.
       * @param {number} newTokenId The new generated token id to be added to the beam.
       */
      updateBeam(beam, newTokenId) {
        return textgenUpdatebeam(beam, newTokenId);
      }
      /**
       * Forward pass for the model.
       * @param {Object} model_inputs The inputs for the model.
       * @returns {Promise<any>} The output tensor of the model.
       */
      async forward(model_inputs) {
        return await textgen_forward(this, model_inputs);
      }
    };
    GPTNeoPreTrainedModel = class extends PreTrainedModel {
    };
    GPTNeoModel = class extends GPTNeoPreTrainedModel {
      /**
       * 
       * @param  {...any} args 
       * @throws {Error}
       * @returns {Promise<any>}
       */
      async generate(...args2) {
        throw Error(
          "The current model class (GPTNeoModel) is not compatible with `.generate()`, as it doesn't have a language model head. Please use one of the following classes instead: {'GPTNeoForCausalLM'}"
        );
      }
    };
    GPTNeoForCausalLM = class extends GPTNeoPreTrainedModel {
      /**
       * Creates a new instance of the `GPTNeoForCausalLM` class.
       * @param {Object} config The configuration of the model.
       * @param {any} session The ONNX session containing the model weights.
       */
      constructor(config, session) {
        super(config, session);
        this.config.pad_token_id = this.config.eos_token_id;
        this.num_heads = this.config.num_heads;
        this.num_layers = this.config.num_layers;
        this.dim_kv = this.config.hidden_size / this.num_heads;
      }
      /**
       * Initializes and returns the beam for text generation task
       * @param {Tensor} inputTokenIds The input token ids.
       * @param {number} numOutputTokens The number of tokens to be generated.
       * @param {Tensor} inputs_attention_mask Optional input attention mask.
       * @returns {any} A Beam object representing the initialized beam.
       */
      getStartBeams(inputTokenIds, numOutputTokens, inputs_attention_mask) {
        return textgenStartBeams(this, inputTokenIds, numOutputTokens, inputs_attention_mask);
      }
      /**
       * Runs a single step of the beam search generation algorithm.
       * @param {any} beam The current beam being generated.
       * @returns {Promise<any>} The updated beam after a single generation step.
       */
      async runBeam(beam) {
        return await textgenRunBeam(this, beam);
      }
      /**
       * Updates the given beam with the new generated token id.
       * @param {any} beam The Beam object representing the beam.
       * @param {number} newTokenId The new generated token id to be added to the beam.
       */
      updateBeam(beam, newTokenId) {
        return textgenUpdatebeam(beam, newTokenId);
      }
      /**
       * Forward pass for the model.
       * @param {Object} model_inputs The inputs for the model.
       * @returns {Promise<any>} The output tensor of the model.
       */
      async forward(model_inputs) {
        return await textgen_forward(this, model_inputs);
      }
    };
    CodeGenPreTrainedModel = class extends PreTrainedModel {
    };
    CodeGenModel = class extends CodeGenPreTrainedModel {
      /**
       * Throws an error indicating that the current model class is not compatible with `.generate()`,
       * as it doesn't have a language model head.
       * 
       * @throws {Error} The current model class is not compatible with `.generate()`
       * 
       * @param  {...any} args Arguments passed to the generate function
       * @returns {Promise<any>}
       */
      async generate(...args2) {
        throw Error(
          "The current model class (CodeGenModel) is not compatible with `.generate()`, as it doesn't have a language model head. Please use one of the following classes instead: {'CodeGenForCausalLM'}"
        );
      }
    };
    CodeGenForCausalLM = class extends CodeGenPreTrainedModel {
      /**
       * Creates a new instance of the `CodeGenForCausalLM` class.
      * @param {Object} config The model configuration object.
      * @param {Object} session The ONNX session object.
      */
      constructor(config, session) {
        super(config, session);
        this.config.pad_token_id = this.config.eos_token_id;
        this.num_heads = this.config.n_head;
        this.num_layers = this.config.n_layer;
        this.dim_kv = this.config.n_embd / this.num_heads;
      }
      /**
       * Initializes and returns the beam for text generation task
       * @param {Tensor} inputTokenIds The input token ids.
       * @param {number} numOutputTokens The number of tokens to be generated.
       * @param {Tensor} inputs_attention_mask Optional input attention mask.
       * @returns {any} A Beam object representing the initialized beam.
       */
      getStartBeams(inputTokenIds, numOutputTokens, inputs_attention_mask) {
        return textgenStartBeams(this, inputTokenIds, numOutputTokens, inputs_attention_mask);
      }
      /**
       * Runs a single step of the beam search generation algorithm.
       * @param {any} beam The current beam being generated.
       * @returns {Promise<any>} The updated beam after a single generation step.
       */
      async runBeam(beam) {
        return await textgenRunBeam(this, beam);
      }
      /**
       * Updates the given beam with the new generated token id.
       * @param {any} beam The Beam object representing the beam.
       * @param {number} newTokenId The new generated token id to be added to the beam.
       */
      updateBeam(beam, newTokenId) {
        return textgenUpdatebeam(beam, newTokenId);
      }
      /**
       * Forward pass for the model.
       * @param {Object} model_inputs The inputs for the model.
       * @returns {Promise<any>} The output tensor of the model.
       */
      async forward(model_inputs) {
        return await textgen_forward(this, model_inputs);
      }
    };
    ViTPreTrainedModel = class extends PreTrainedModel {
    };
    ViTForImageClassification = class extends ViTPreTrainedModel {
      /**
       * @param {any} model_inputs
       */
      async _call(model_inputs) {
        let logits = (await super._call(model_inputs)).logits;
        return new SequenceClassifierOutput(logits);
      }
    };
    DetrPreTrainedModel = class extends PreTrainedModel {
    };
    DetrForObjectDetection = class extends DetrPreTrainedModel {
      /**
       * @param {any} model_inputs
       */
      async _call(model_inputs) {
        let output = await super._call(model_inputs);
        return new DetrObjectDetectionOutput(output.logits, output.pred_boxes);
      }
    };
    DetrForSegmentation = class extends DetrPreTrainedModel {
      /**
       * Runs the model with the provided inputs
       * @param {Object} model_inputs Model inputs
       * @returns {Promise<DetrSegmentationOutput>} Object containing segmentation outputs
       */
      async _call(model_inputs) {
        let output = await super._call(model_inputs);
        return new DetrSegmentationOutput(output.logits, output.pred_boxes, output.pred_masks);
      }
    };
    DetrObjectDetectionOutput = class extends ModelOutput {
      /**
       * @param {Tensor} logits
       * @param {Tensor} pred_boxes
       */
      constructor(logits, pred_boxes) {
        super();
        this.logits = logits;
        this.pred_boxes = pred_boxes;
      }
    };
    DetrSegmentationOutput = class extends ModelOutput {
      /**
       * @param {Tensor} logits The output logits of the model.
       * @param {Tensor} pred_boxes Predicted boxes.
       * @param {Tensor} pred_masks Predicted masks.
       */
      constructor(logits, pred_boxes, pred_masks) {
        super();
        this.logits = logits;
        this.pred_boxes = pred_boxes;
        this.pred_masks = pred_masks;
      }
    };
    SamPreTrainedModel = class extends PreTrainedModel {
    };
    SamModel = class extends SamPreTrainedModel {
      /**
       * @param {Object} model_inputs
       * @param {Tensor} model_inputs.pixel_values Pixel values as a Tensor with shape `(batch_size, num_channels, height, width)`.
       * @param {Tensor} model_inputs.input_points Input 2D spatial points with shape `(batch_size, num_points, 2)`. This is used by the prompt encoder to encode the prompt.
       * @todo Add support for `input_labels`, `input_boxes`, `input_masks`, and `image_embeddings`.
       */
      async _call(model_inputs) {
        let output = await super._call(model_inputs);
        return new SamImageSegmentationOutput(output.iou_scores, output.pred_masks);
      }
    };
    SamImageSegmentationOutput = class extends ModelOutput {
      /**
       * @param {Tensor} iou_scores The output logits of the model.
       * @param {Tensor} pred_masks Predicted boxes.
       */
      constructor(iou_scores, pred_masks) {
        super();
        this.iou_scores = iou_scores;
        this.pred_masks = pred_masks;
      }
    };
    MarianPreTrainedModel = class extends PreTrainedModel {
    };
    MarianModel = class extends MarianPreTrainedModel {
      /**
       * 
       * @param  {...any} args 
       * @throws {Error}
       * @returns {Promise<any>}
       */
      async generate(...args2) {
        throw Error(
          "The current model class (MarianModel) is not compatible with `.generate()`, as it doesn't have a language model head. Please use one of the following classes instead: {'MarianMTModel'}"
        );
      }
    };
    MarianMTModel = class extends MarianPreTrainedModel {
      /**
       * Creates a new instance of the `MarianMTModel` class.
      * @param {Object} config The model configuration object.
      * @param {Object} session The ONNX session object.
      * @param {any} decoder_merged_session 
      * @param {any} generation_config 
      */
      constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;
        this.num_decoder_layers = this.config.decoder_layers;
        this.num_decoder_heads = this.config.decoder_attention_heads;
        this.decoder_dim_kv = this.config.d_model / this.num_decoder_heads;
        this.num_encoder_layers = this.config.encoder_layers;
        this.num_encoder_heads = this.config.encoder_attention_heads;
        this.encoder_dim_kv = this.config.d_model / this.num_encoder_heads;
      }
      /**
       * Loads a pre-trained model from the given `pretrained_model_name_or_path`.
       * 
       * @param {string} pretrained_model_name_or_path The path to the pre-trained model.
       * @param {PretrainedOptions} options Additional options for loading the model. For more information, @see {@link PreTrainedModel.from_pretrained}.
       * 
       * @returns {Promise<MarianMTModel>} A new instance of the `MarianMTModel` class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        let info3 = await seq2seqLoadModel(pretrained_model_name_or_path, {
          quantized,
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        return new this(...info3);
      }
      /**
       * Initializes and returns the beam for text generation task
       * @param {any[]} inputs The input token ids.
       * @param {number} numOutputTokens The number of tokens to be generated.
       * @returns {any} A Beam object representing the initialized beam.
       * @param {any[]} args
       */
      getStartBeams(inputs, numOutputTokens, ...args2) {
        return seq2seqStartBeams(this, inputs, numOutputTokens);
      }
      /**
       * Runs a single step of the beam search generation algorithm.
       * @param {any} beam The current beam being generated.
       * @returns {Promise<any>} The updated beam after a single generation step.
       */
      async runBeam(beam) {
        return await seq2seqRunBeam(this, beam);
      }
      /**
       * @param {any} beam
       * @param {any} newTokenId
       */
      updateBeam(beam, newTokenId) {
        beam.output_token_ids = [...beam.output_token_ids, newTokenId];
      }
      /**
       * @param {any} model_inputs
       * @returns {Promise<Seq2SeqLMOutput>}
       */
      async forward(model_inputs) {
        return await seq2seq_forward(this, model_inputs);
      }
    };
    M2M100PreTrainedModel = class extends PreTrainedModel {
    };
    M2M100Model = class extends M2M100PreTrainedModel {
      /**
       * 
       * @param  {...any} args 
       * @throws {Error}
       * @returns {Promise<any>}
       */
      async generate(...args2) {
        throw Error(
          "The current model class (M2M100Model) is not compatible with `.generate()`, as it doesn't have a language model head. Please use one of the following classes instead: {'M2M100ForConditionalGeneration'}"
        );
      }
    };
    M2M100ForConditionalGeneration = class extends M2M100PreTrainedModel {
      /**
       * Creates a new instance of the `M2M100ForConditionalGeneration` class.
      * @param {Object} config The model configuration object.
      * @param {Object} session The ONNX session object.
      * @param {any} decoder_merged_session 
      * @param {any} generation_config 
      */
      constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;
        this.num_decoder_layers = this.config.decoder_layers;
        this.num_decoder_heads = this.config.decoder_attention_heads;
        this.decoder_dim_kv = this.config.d_model / this.num_decoder_heads;
        this.num_encoder_layers = this.config.encoder_layers;
        this.num_encoder_heads = this.config.encoder_attention_heads;
        this.encoder_dim_kv = this.config.d_model / this.num_encoder_heads;
      }
      /**
       * Loads a pre-trained model from the given `pretrained_model_name_or_path`.
       * 
       * @param {string} pretrained_model_name_or_path The path to the pre-trained model.
       * @param {PretrainedOptions} options Additional options for loading the model. For more information, @see {@link PreTrainedModel.from_pretrained}.
       * 
       * @returns {Promise<M2M100ForConditionalGeneration>} A new instance of the `M2M100ForConditionalGeneration` class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        let info3 = await seq2seqLoadModel(pretrained_model_name_or_path, {
          quantized,
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        return new this(...info3);
      }
      /**
       * Initializes and returns the beam for text generation task
       * @param {any[]} inputs The input token ids.
       * @param {number} numOutputTokens The number of tokens to be generated.
       * @returns {any} A Beam object representing the initialized beam.
       * @param {any[]} args
       */
      getStartBeams(inputs, numOutputTokens, ...args2) {
        return seq2seqStartBeams(this, inputs, numOutputTokens);
      }
      /**
       * Runs a single step of the beam search generation algorithm.
       * @param {any} beam The current beam being generated.
       * @returns {Promise<any>} The updated beam after a single generation step.
       */
      async runBeam(beam) {
        return await seq2seqRunBeam(this, beam);
      }
      /**
       * @param {any} beam
       * @param {any} newTokenId
       */
      updateBeam(beam, newTokenId) {
        beam.output_token_ids = [...beam.output_token_ids, newTokenId];
      }
      /**
       * @param {any} model_inputs
       * @returns {Promise<Seq2SeqLMOutput>}
       */
      async forward(model_inputs) {
        return await seq2seq_forward(this, model_inputs);
      }
    };
    PretrainedMixin = class {
      /**
       * Mapping from model type to model class.
       */
      static MODEL_CLASS_MAPPING = /* @__PURE__ */ Object.create(null);
      /**
       * Whether to attempt to instantiate the base class (`PretrainedModel`) if 
       * the model type is not found in the mapping.
       */
      static BASE_IF_FAIL = false;
      /**
       * The function to use to load the pretrained model.
       */
      static LOAD_FUNCTION = null;
      /**
       * Instantiate one of the model classes of the library from a pretrained model.
       * 
       * The model class to instantiate is selected based on the `model_type` property of the config object
       * (either passed as an argument or loaded from `pretrained_model_name_or_path` if possible)
       * 
       * @param {string} pretrained_model_name_or_path The name or path of the pretrained model. Can be either:
       * - A string, the *model id* of a pretrained model hosted inside a model repo on huggingface.co.
       *   Valid model ids can be located at the root-level, like `bert-base-uncased`, or namespaced under a
       *   user or organization name, like `dbmdz/bert-base-german-cased`.
       * - A path to a *directory* containing model weights, e.g., `./my_model_directory/`.
       * @param {PretrainedOptions} options Additional options for loading the model.
       * 
       * @returns {Promise<PreTrainedModel>} A new instance of the PreTrainedModel class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        if (this.LOAD_FUNCTION === null) {
          throw new Error("`LOAD_FUNCTION` not implemented for this model");
        }
        let info3 = await this.LOAD_FUNCTION(pretrained_model_name_or_path, {
          quantized,
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        let cls = this.MODEL_CLASS_MAPPING[info3[0].model_type];
        if (!cls) {
          if (this.BASE_IF_FAIL) {
            console.warn(`Unknown model class "${info3[0].model_type}", attempting to construct from base class.`);
            cls = PreTrainedModel;
          } else {
            throw Error(`Unsupported model type: ${info3[0].model_type}`);
          }
        }
        return new cls(...info3);
      }
    };
    AutoModel = class extends PretrainedMixin {
      static LOAD_FUNCTION = loadAutoModel;
      static BASE_IF_FAIL = true;
      static MODEL_CLASS_MAPPING = {
        "bert": BertModel,
        "albert": AlbertModel,
        "distilbert": DistilBertModel,
        "t5": T5Model,
        "mt5": MT5Model,
        "gpt2": GPT2Model,
        "gpt_neo": GPTNeoModel,
        "codegen": CodeGenModel,
        "bart": BartModel,
        "roberta": RobertaModel,
        "whisper": WhisperModel,
        "clip": CLIPModel,
        "mobilebert": MobileBertModel,
        "squeezebert": SqueezeBertModel,
        "marian": MarianModel,
        "m2m_100": M2M100Model,
        "sam": SamModel
      };
    };
    AutoModelForSequenceClassification = class extends PretrainedMixin {
      static LOAD_FUNCTION = loadModel;
      static MODEL_CLASS_MAPPING = {
        "bert": BertForSequenceClassification,
        "albert": AlbertForSequenceClassification,
        "distilbert": DistilBertForSequenceClassification,
        "roberta": RobertaForSequenceClassification,
        "bart": BartForSequenceClassification,
        "mobilebert": MobileBertForSequenceClassification,
        "squeezebert": SqueezeBertForSequenceClassification
      };
    };
    AutoModelForTokenClassification = class extends PretrainedMixin {
      static LOAD_FUNCTION = loadModel;
      static MODEL_CLASS_MAPPING = {
        "bert": BertForTokenClassification,
        "distilbert": DistilBertForTokenClassification
      };
    };
    AutoModelForSeq2SeqLM = class extends PretrainedMixin {
      static LOAD_FUNCTION = seq2seqLoadModel;
      static MODEL_CLASS_MAPPING = {
        "t5": T5ForConditionalGeneration,
        "mt5": MT5ForConditionalGeneration,
        "bart": BartForConditionalGeneration,
        "whisper": WhisperForConditionalGeneration,
        "marian": MarianMTModel,
        "m2m_100": M2M100ForConditionalGeneration
      };
    };
    AutoModelForCausalLM = class extends PretrainedMixin {
      static LOAD_FUNCTION = decoderLoadModel;
      static MODEL_CLASS_MAPPING = {
        "gpt2": GPT2LMHeadModel,
        "gpt_neo": GPTNeoForCausalLM,
        "codegen": CodeGenForCausalLM
      };
    };
    AutoModelForMaskedLM = class extends PretrainedMixin {
      static LOAD_FUNCTION = loadAutoModel;
      static MODEL_CLASS_MAPPING = {
        "bert": BertForMaskedLM,
        "albert": AlbertForMaskedLM,
        "distilbert": DistilBertForMaskedLM,
        "roberta": RobertaForMaskedLM,
        "mobilebert": MobileBertForMaskedLM,
        "squeezebert": SqueezeBertForMaskedLM
      };
    };
    AutoModelForQuestionAnswering = class extends PretrainedMixin {
      static LOAD_FUNCTION = loadModel;
      static MODEL_CLASS_MAPPING = {
        "bert": BertForQuestionAnswering,
        "albert": AlbertForQuestionAnswering,
        "distilbert": DistilBertForQuestionAnswering,
        "roberta": RobertaForQuestionAnswering,
        "mobilebert": MobileBertForQuestionAnswering,
        "squeezebert": SqueezeBertForQuestionAnswering
      };
    };
    AutoModelForVision2Seq = class extends PretrainedMixin {
      static LOAD_FUNCTION = encoderDecoderLoadModel;
      static MODEL_CLASS_MAPPING = {
        "vision-encoder-decoder": VisionEncoderDecoderModel
      };
    };
    AutoModelForImageClassification = class extends PretrainedMixin {
      static LOAD_FUNCTION = loadModel;
      static MODEL_CLASS_MAPPING = {
        "vit": ViTForImageClassification
      };
    };
    AutoModelForImageSegmentation = class extends PretrainedMixin {
      static LOAD_FUNCTION = loadModel;
      static MODEL_CLASS_MAPPING = {
        "detr": DetrForSegmentation
      };
    };
    AutoModelForObjectDetection = class extends PretrainedMixin {
      static LOAD_FUNCTION = loadModel;
      static MODEL_CLASS_MAPPING = {
        "detr": DetrForObjectDetection
      };
    };
    AutoModelForMaskGeneration = class extends PretrainedMixin {
      static LOAD_FUNCTION = loadModel;
      static MODEL_CLASS_MAPPING = {
        "sam": SamModel
      };
    };
    Seq2SeqLMOutput = class extends ModelOutput {
      /**
       * @param {Tensor} logits The output logits of the model.
       * @param {Tensor} past_key_values An tensor of key/value pairs that represent the previous state of the model.
       * @param {Tensor} encoder_outputs The output of the encoder in a sequence-to-sequence model.
       */
      constructor(logits, past_key_values, encoder_outputs) {
        super();
        this.logits = logits;
        this.past_key_values = past_key_values;
        this.encoder_outputs = encoder_outputs;
      }
    };
    SequenceClassifierOutput = class extends ModelOutput {
      /**
       * @param {Tensor} logits 
       */
      constructor(logits) {
        super();
        this.logits = logits;
      }
    };
    TokenClassifierOutput = class extends ModelOutput {
      /**
       * @param {Tensor} logits 
       */
      constructor(logits) {
        super();
        this.logits = logits;
      }
    };
    MaskedLMOutput = class extends ModelOutput {
      /**
       * @param {Tensor} logits 
       */
      constructor(logits) {
        super();
        this.logits = logits;
      }
    };
    QuestionAnsweringModelOutput = class extends ModelOutput {
      /**
       * @param {Tensor} start_logits The logits for start positions of the answer.
       * @param {Tensor} end_logits The logits for end positions of the answer.
       */
      constructor(start_logits, end_logits) {
        super();
        this.start_logits = start_logits;
        this.end_logits = end_logits;
      }
    };
  }
});

// node_modules/sharp/lib/is.js
var require_is = __commonJS({
  "node_modules/sharp/lib/is.js"(exports2, module2) {
    "use strict";
    var defined = function(val) {
      return typeof val !== "undefined" && val !== null;
    };
    var object = function(val) {
      return typeof val === "object";
    };
    var plainObject = function(val) {
      return Object.prototype.toString.call(val) === "[object Object]";
    };
    var fn = function(val) {
      return typeof val === "function";
    };
    var bool = function(val) {
      return typeof val === "boolean";
    };
    var buffer = function(val) {
      return val instanceof Buffer;
    };
    var typedArray = function(val) {
      if (defined(val)) {
        switch (val.constructor) {
          case Uint8Array:
          case Uint8ClampedArray:
          case Int8Array:
          case Uint16Array:
          case Int16Array:
          case Uint32Array:
          case Int32Array:
          case Float32Array:
          case Float64Array:
            return true;
        }
      }
      return false;
    };
    var arrayBuffer = function(val) {
      return val instanceof ArrayBuffer;
    };
    var string = function(val) {
      return typeof val === "string" && val.length > 0;
    };
    var number = function(val) {
      return typeof val === "number" && !Number.isNaN(val);
    };
    var integer = function(val) {
      return Number.isInteger(val);
    };
    var inRange = function(val, min2, max2) {
      return val >= min2 && val <= max2;
    };
    var inArray = function(val, list) {
      return list.includes(val);
    };
    var invalidParameterError = function(name2, expected, actual) {
      return new Error(
        `Expected ${expected} for ${name2} but received ${actual} of type ${typeof actual}`
      );
    };
    module2.exports = {
      defined,
      object,
      plainObject,
      fn,
      bool,
      buffer,
      typedArray,
      arrayBuffer,
      string,
      number,
      integer,
      inRange,
      inArray,
      invalidParameterError
    };
  }
});

// node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/semver/internal/debug.js"(exports2, module2) {
    "use strict";
    var debug2 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args2) => console.error("SEMVER", ...args2) : () => {
    };
    module2.exports = debug2;
  }
});

// node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "node_modules/semver/internal/constants.js"(exports2, module2) {
    "use strict";
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module2.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/semver/internal/re.js"(exports2, module2) {
    "use strict";
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug2 = require_debug();
    exports2 = module2.exports = {};
    var re2 = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var safeSrc = exports2.safeSrc = [];
    var t = exports2.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max2] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max2}}`).split(`${token}+`).join(`${token}{1,${max2}}`);
      }
      return value;
    };
    var createToken = (name2, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug2(name2, index, value);
      t[name2] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports2, module2) {
    "use strict";
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module2.exports = parseOptions;
  }
});

// node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports2, module2) {
    "use strict";
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a === b ? 0 : a < b ? -1 : 1;
      }
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/semver/classes/semver.js"(exports2, module2) {
    "use strict";
    var debug2 = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re2, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version2, options) {
        options = parseOptions(options);
        if (version2 instanceof _SemVer) {
          if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
            return version2;
          } else {
            version2 = version2.version;
          }
        } else if (typeof version2 !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version2}".`);
        }
        if (version2.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug2("SemVer", version2, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version2.trim().match(options.loose ? re2[t.LOOSE] : re2[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version2}`);
        }
        this.raw = version2;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug2("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.major < other.major) {
          return -1;
        }
        if (this.major > other.major) {
          return 1;
        }
        if (this.minor < other.minor) {
          return -1;
        }
        if (this.minor > other.minor) {
          return 1;
        }
        if (this.patch < other.patch) {
          return -1;
        }
        if (this.patch > other.patch) {
          return 1;
        }
        return 0;
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i2 = 0;
        do {
          const a = this.prerelease[i2];
          const b = other.prerelease[i2];
          debug2("prerelease compare", i2, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i2);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i2 = 0;
        do {
          const a = this.build[i2];
          const b = other.build[i2];
          debug2("build compare", i2, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i2);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match = `-${identifier}`.match(this.options.loose ? re2[t.PRERELEASELOOSE] : re2[t.PRERELEASE]);
            if (!match || match[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i2 = this.prerelease.length;
              while (--i2 >= 0) {
                if (typeof this.prerelease[i2] === "number") {
                  this.prerelease[i2]++;
                  i2 = -2;
                }
              }
              if (i2 === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "node_modules/semver/functions/parse.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = (version2, options, throwErrors = false) => {
      if (version2 instanceof SemVer) {
        return version2;
      }
      try {
        return new SemVer(version2, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module2.exports = parse;
  }
});

// node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "node_modules/semver/functions/coerce.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = require_parse();
    var { safeRe: re2, t } = require_re();
    var coerce = (version2, options) => {
      if (version2 instanceof SemVer) {
        return version2;
      }
      if (typeof version2 === "number") {
        version2 = String(version2);
      }
      if (typeof version2 !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version2.match(options.includePrerelease ? re2[t.COERCEFULL] : re2[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re2[t.COERCERTLFULL] : re2[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version2)) && (!match || match.index + match[0].length !== version2.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      const major = match[2];
      const minor = match[3] || "0";
      const patch = match[4] || "0";
      const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
      const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
      return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    };
    module2.exports = coerce;
  }
});

// node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/semver/functions/compare.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare;
  }
});

// node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/semver/functions/gte.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module2.exports = gte;
  }
});

// node_modules/detect-libc/lib/process.js
var require_process = __commonJS({
  "node_modules/detect-libc/lib/process.js"(exports2, module2) {
    "use strict";
    var isLinux = () => process.platform === "linux";
    var report = null;
    var getReport = () => {
      if (!report) {
        if (isLinux() && process.report) {
          const orig = process.report.excludeNetwork;
          process.report.excludeNetwork = true;
          report = process.report.getReport();
          process.report.excludeNetwork = orig;
        } else {
          report = {};
        }
      }
      return report;
    };
    module2.exports = { isLinux, getReport };
  }
});

// node_modules/detect-libc/lib/filesystem.js
var require_filesystem = __commonJS({
  "node_modules/detect-libc/lib/filesystem.js"(exports2, module2) {
    "use strict";
    var fs7 = require("fs");
    var LDD_PATH = "/usr/bin/ldd";
    var SELF_PATH = "/proc/self/exe";
    var MAX_LENGTH = 2048;
    var readFileSync2 = (path5) => {
      const fd = fs7.openSync(path5, "r");
      const buffer = Buffer.alloc(MAX_LENGTH);
      const bytesRead = fs7.readSync(fd, buffer, 0, MAX_LENGTH, 0);
      fs7.close(fd, () => {
      });
      return buffer.subarray(0, bytesRead);
    };
    var readFile = (path5) => new Promise((resolve, reject) => {
      fs7.open(path5, "r", (err2, fd) => {
        if (err2) {
          reject(err2);
        } else {
          const buffer = Buffer.alloc(MAX_LENGTH);
          fs7.read(fd, buffer, 0, MAX_LENGTH, 0, (_, bytesRead) => {
            resolve(buffer.subarray(0, bytesRead));
            fs7.close(fd, () => {
            });
          });
        }
      });
    });
    module2.exports = {
      LDD_PATH,
      SELF_PATH,
      readFileSync: readFileSync2,
      readFile
    };
  }
});

// node_modules/detect-libc/lib/elf.js
var require_elf = __commonJS({
  "node_modules/detect-libc/lib/elf.js"(exports2, module2) {
    "use strict";
    var interpreterPath = (elf) => {
      if (elf.length < 64) {
        return null;
      }
      if (elf.readUInt32BE(0) !== 2135247942) {
        return null;
      }
      if (elf.readUInt8(4) !== 2) {
        return null;
      }
      if (elf.readUInt8(5) !== 1) {
        return null;
      }
      const offset = elf.readUInt32LE(32);
      const size = elf.readUInt16LE(54);
      const count = elf.readUInt16LE(56);
      for (let i2 = 0; i2 < count; i2++) {
        const headerOffset = offset + i2 * size;
        const type = elf.readUInt32LE(headerOffset);
        if (type === 3) {
          const fileOffset = elf.readUInt32LE(headerOffset + 8);
          const fileSize = elf.readUInt32LE(headerOffset + 32);
          return elf.subarray(fileOffset, fileOffset + fileSize).toString().replace(/\0.*$/g, "");
        }
      }
      return null;
    };
    module2.exports = {
      interpreterPath
    };
  }
});

// node_modules/detect-libc/lib/detect-libc.js
var require_detect_libc = __commonJS({
  "node_modules/detect-libc/lib/detect-libc.js"(exports2, module2) {
    "use strict";
    var childProcess = require("child_process");
    var { isLinux, getReport } = require_process();
    var { LDD_PATH, SELF_PATH, readFile, readFileSync: readFileSync2 } = require_filesystem();
    var { interpreterPath } = require_elf();
    var cachedFamilyInterpreter;
    var cachedFamilyFilesystem;
    var cachedVersionFilesystem;
    var command = "getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true";
    var commandOut = "";
    var safeCommand = () => {
      if (!commandOut) {
        return new Promise((resolve) => {
          childProcess.exec(command, (err2, out2) => {
            commandOut = err2 ? " " : out2;
            resolve(commandOut);
          });
        });
      }
      return commandOut;
    };
    var safeCommandSync = () => {
      if (!commandOut) {
        try {
          commandOut = childProcess.execSync(command, { encoding: "utf8" });
        } catch (_err) {
          commandOut = " ";
        }
      }
      return commandOut;
    };
    var GLIBC = "glibc";
    var RE_GLIBC_VERSION = /LIBC[a-z0-9 \-).]*?(\d+\.\d+)/i;
    var MUSL = "musl";
    var isFileMusl = (f) => f.includes("libc.musl-") || f.includes("ld-musl-");
    var familyFromReport = () => {
      const report = getReport();
      if (report.header && report.header.glibcVersionRuntime) {
        return GLIBC;
      }
      if (Array.isArray(report.sharedObjects)) {
        if (report.sharedObjects.some(isFileMusl)) {
          return MUSL;
        }
      }
      return null;
    };
    var familyFromCommand = (out2) => {
      const [getconf, ldd1] = out2.split(/[\r\n]+/);
      if (getconf && getconf.includes(GLIBC)) {
        return GLIBC;
      }
      if (ldd1 && ldd1.includes(MUSL)) {
        return MUSL;
      }
      return null;
    };
    var familyFromInterpreterPath = (path5) => {
      if (path5) {
        if (path5.includes("/ld-musl-")) {
          return MUSL;
        } else if (path5.includes("/ld-linux-")) {
          return GLIBC;
        }
      }
      return null;
    };
    var getFamilyFromLddContent = (content) => {
      content = content.toString();
      if (content.includes("musl")) {
        return MUSL;
      }
      if (content.includes("GNU C Library")) {
        return GLIBC;
      }
      return null;
    };
    var familyFromFilesystem = async () => {
      if (cachedFamilyFilesystem !== void 0) {
        return cachedFamilyFilesystem;
      }
      cachedFamilyFilesystem = null;
      try {
        const lddContent = await readFile(LDD_PATH);
        cachedFamilyFilesystem = getFamilyFromLddContent(lddContent);
      } catch (e) {
      }
      return cachedFamilyFilesystem;
    };
    var familyFromFilesystemSync = () => {
      if (cachedFamilyFilesystem !== void 0) {
        return cachedFamilyFilesystem;
      }
      cachedFamilyFilesystem = null;
      try {
        const lddContent = readFileSync2(LDD_PATH);
        cachedFamilyFilesystem = getFamilyFromLddContent(lddContent);
      } catch (e) {
      }
      return cachedFamilyFilesystem;
    };
    var familyFromInterpreter = async () => {
      if (cachedFamilyInterpreter !== void 0) {
        return cachedFamilyInterpreter;
      }
      cachedFamilyInterpreter = null;
      try {
        const selfContent = await readFile(SELF_PATH);
        const path5 = interpreterPath(selfContent);
        cachedFamilyInterpreter = familyFromInterpreterPath(path5);
      } catch (e) {
      }
      return cachedFamilyInterpreter;
    };
    var familyFromInterpreterSync = () => {
      if (cachedFamilyInterpreter !== void 0) {
        return cachedFamilyInterpreter;
      }
      cachedFamilyInterpreter = null;
      try {
        const selfContent = readFileSync2(SELF_PATH);
        const path5 = interpreterPath(selfContent);
        cachedFamilyInterpreter = familyFromInterpreterPath(path5);
      } catch (e) {
      }
      return cachedFamilyInterpreter;
    };
    var family = async () => {
      let family2 = null;
      if (isLinux()) {
        family2 = await familyFromInterpreter();
        if (!family2) {
          family2 = await familyFromFilesystem();
          if (!family2) {
            family2 = familyFromReport();
          }
          if (!family2) {
            const out2 = await safeCommand();
            family2 = familyFromCommand(out2);
          }
        }
      }
      return family2;
    };
    var familySync = () => {
      let family2 = null;
      if (isLinux()) {
        family2 = familyFromInterpreterSync();
        if (!family2) {
          family2 = familyFromFilesystemSync();
          if (!family2) {
            family2 = familyFromReport();
          }
          if (!family2) {
            const out2 = safeCommandSync();
            family2 = familyFromCommand(out2);
          }
        }
      }
      return family2;
    };
    var isNonGlibcLinux = async () => isLinux() && await family() !== GLIBC;
    var isNonGlibcLinuxSync = () => isLinux() && familySync() !== GLIBC;
    var versionFromFilesystem = async () => {
      if (cachedVersionFilesystem !== void 0) {
        return cachedVersionFilesystem;
      }
      cachedVersionFilesystem = null;
      try {
        const lddContent = await readFile(LDD_PATH);
        const versionMatch = lddContent.match(RE_GLIBC_VERSION);
        if (versionMatch) {
          cachedVersionFilesystem = versionMatch[1];
        }
      } catch (e) {
      }
      return cachedVersionFilesystem;
    };
    var versionFromFilesystemSync = () => {
      if (cachedVersionFilesystem !== void 0) {
        return cachedVersionFilesystem;
      }
      cachedVersionFilesystem = null;
      try {
        const lddContent = readFileSync2(LDD_PATH);
        const versionMatch = lddContent.match(RE_GLIBC_VERSION);
        if (versionMatch) {
          cachedVersionFilesystem = versionMatch[1];
        }
      } catch (e) {
      }
      return cachedVersionFilesystem;
    };
    var versionFromReport = () => {
      const report = getReport();
      if (report.header && report.header.glibcVersionRuntime) {
        return report.header.glibcVersionRuntime;
      }
      return null;
    };
    var versionSuffix = (s) => s.trim().split(/\s+/)[1];
    var versionFromCommand = (out2) => {
      const [getconf, ldd1, ldd2] = out2.split(/[\r\n]+/);
      if (getconf && getconf.includes(GLIBC)) {
        return versionSuffix(getconf);
      }
      if (ldd1 && ldd2 && ldd1.includes(MUSL)) {
        return versionSuffix(ldd2);
      }
      return null;
    };
    var version2 = async () => {
      let version3 = null;
      if (isLinux()) {
        version3 = await versionFromFilesystem();
        if (!version3) {
          version3 = versionFromReport();
        }
        if (!version3) {
          const out2 = await safeCommand();
          version3 = versionFromCommand(out2);
        }
      }
      return version3;
    };
    var versionSync = () => {
      let version3 = null;
      if (isLinux()) {
        version3 = versionFromFilesystemSync();
        if (!version3) {
          version3 = versionFromReport();
        }
        if (!version3) {
          const out2 = safeCommandSync();
          version3 = versionFromCommand(out2);
        }
      }
      return version3;
    };
    module2.exports = {
      GLIBC,
      MUSL,
      family,
      familySync,
      isNonGlibcLinux,
      isNonGlibcLinuxSync,
      version: version2,
      versionSync
    };
  }
});

// node_modules/sharp/lib/platform.js
var require_platform = __commonJS({
  "node_modules/sharp/lib/platform.js"(exports2, module2) {
    "use strict";
    var detectLibc = require_detect_libc();
    var env4 = process.env;
    module2.exports = function() {
      const arch = env4.npm_config_arch || process.arch;
      const platform = env4.npm_config_platform || process.platform;
      const libc = process.env.npm_config_libc || /* istanbul ignore next */
      (detectLibc.isNonGlibcLinuxSync() ? detectLibc.familySync() : "");
      const libcId = platform !== "linux" || libc === detectLibc.GLIBC ? "" : libc;
      const platformId = [`${platform}${libcId}`];
      if (arch === "arm") {
        const fallback = process.versions.electron ? "7" : "6";
        platformId.push(`armv${env4.npm_config_arm_version || process.config.variables.arm_version || fallback}`);
      } else if (arch === "arm64") {
        platformId.push(`arm64v${env4.npm_config_arm_version || "8"}`);
      } else {
        platformId.push(arch);
      }
      return platformId.join("-");
    };
  }
});

// node_modules/sharp/package.json
var require_package = __commonJS({
  "node_modules/sharp/package.json"(exports2, module2) {
    module2.exports = {
      name: "sharp",
      description: "High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, GIF, AVIF and TIFF images",
      version: "0.32.6",
      author: "Lovell Fuller <npm@lovell.info>",
      homepage: "https://github.com/lovell/sharp",
      contributors: [
        "Pierre Inglebert <pierre.inglebert@gmail.com>",
        "Jonathan Ong <jonathanrichardong@gmail.com>",
        "Chanon Sajjamanochai <chanon.s@gmail.com>",
        "Juliano Julio <julianojulio@gmail.com>",
        "Daniel Gasienica <daniel@gasienica.ch>",
        "Julian Walker <julian@fiftythree.com>",
        "Amit Pitaru <pitaru.amit@gmail.com>",
        "Brandon Aaron <hello.brandon@aaron.sh>",
        "Andreas Lind <andreas@one.com>",
        "Maurus Cuelenaere <mcuelenaere@gmail.com>",
        "Linus Unneb\xE4ck <linus@folkdatorn.se>",
        "Victor Mateevitsi <mvictoras@gmail.com>",
        "Alaric Holloway <alaric.holloway@gmail.com>",
        "Bernhard K. Weisshuhn <bkw@codingforce.com>",
        "Chris Riley <criley@primedia.com>",
        "David Carley <dacarley@gmail.com>",
        "John Tobin <john@limelightmobileinc.com>",
        "Kenton Gray <kentongray@gmail.com>",
        "Felix B\xFCnemann <Felix.Buenemann@gmail.com>",
        "Samy Al Zahrani <samyalzahrany@gmail.com>",
        "Chintan Thakkar <lemnisk8@gmail.com>",
        "F. Orlando Galashan <frulo@gmx.de>",
        "Kleis Auke Wolthuizen <info@kleisauke.nl>",
        "Matt Hirsch <mhirsch@media.mit.edu>",
        "Matthias Thoemmes <thoemmes@gmail.com>",
        "Patrick Paskaris <patrick@paskaris.gr>",
        "J\xE9r\xE9my Lal <kapouer@melix.org>",
        "Rahul Nanwani <r.nanwani@gmail.com>",
        "Alice Monday <alice0meta@gmail.com>",
        "Kristo Jorgenson <kristo.jorgenson@gmail.com>",
        "YvesBos <yves_bos@outlook.com>",
        "Guy Maliar <guy@tailorbrands.com>",
        "Nicolas Coden <nicolas@ncoden.fr>",
        "Matt Parrish <matt.r.parrish@gmail.com>",
        "Marcel Bretschneider <marcel.bretschneider@gmail.com>",
        "Matthew McEachen <matthew+github@mceachen.org>",
        "Jarda Kot\u011B\u0161ovec <jarda.kotesovec@gmail.com>",
        "Kenric D'Souza <kenric.dsouza@gmail.com>",
        "Oleh Aleinyk <oleg.aleynik@gmail.com>",
        "Marcel Bretschneider <marcel.bretschneider@gmail.com>",
        "Andrea Bianco <andrea.bianco@unibas.ch>",
        "Rik Heywood <rik@rik.org>",
        "Thomas Parisot <hi@oncletom.io>",
        "Nathan Graves <nathanrgraves+github@gmail.com>",
        "Tom Lokhorst <tom@lokhorst.eu>",
        "Espen Hovlandsdal <espen@hovlandsdal.com>",
        "Sylvain Dumont <sylvain.dumont35@gmail.com>",
        "Alun Davies <alun.owain.davies@googlemail.com>",
        "Aidan Hoolachan <ajhoolachan21@gmail.com>",
        "Axel Eirola <axel.eirola@iki.fi>",
        "Freezy <freezy@xbmc.org>",
        "Daiz <taneli.vatanen@gmail.com>",
        "Julian Aubourg <j@ubourg.net>",
        "Keith Belovay <keith@picthrive.com>",
        "Michael B. Klein <mbklein@gmail.com>",
        "Jordan Prudhomme <jordan@raboland.fr>",
        "Ilya Ovdin <iovdin@gmail.com>",
        "Andargor <andargor@yahoo.com>",
        "Paul Neave <paul.neave@gmail.com>",
        "Brendan Kennedy <brenwken@gmail.com>",
        "Brychan Bennett-Odlum <git@brychan.io>",
        "Edward Silverton <e.silverton@gmail.com>",
        "Roman Malieiev <aromaleev@gmail.com>",
        "Tomas Szabo <tomas.szabo@deftomat.com>",
        "Robert O'Rourke <robert@o-rourke.org>",
        "Guillermo Alfonso Varela Chouci\xF1o <guillevch@gmail.com>",
        "Christian Flintrup <chr@gigahost.dk>",
        "Manan Jadhav <manan@motionden.com>",
        "Leon Radley <leon@radley.se>",
        "alza54 <alza54@thiocod.in>",
        "Jacob Smith <jacob@frende.me>",
        "Michael Nutt <michael@nutt.im>",
        "Brad Parham <baparham@gmail.com>",
        "Taneli Vatanen <taneli.vatanen@gmail.com>",
        "Joris Dugu\xE9 <zaruike10@gmail.com>",
        "Chris Banks <christopher.bradley.banks@gmail.com>",
        "Ompal Singh <ompal.hitm09@gmail.com>",
        "Brodan <christopher.hranj@gmail.com",
        "Ankur Parihar <ankur.github@gmail.com>",
        "Brahim Ait elhaj <brahima@gmail.com>",
        "Mart Jansink <m.jansink@gmail.com>",
        "Lachlan Newman <lachnewman007@gmail.com>"
      ],
      scripts: {
        install: "(node install/libvips && node install/dll-copy && prebuild-install) || (node install/can-compile && node-gyp rebuild && node install/dll-copy)",
        clean: "rm -rf node_modules/ build/ vendor/ .nyc_output/ coverage/ test/fixtures/output.*",
        test: "npm run test-lint && npm run test-unit && npm run test-licensing && npm run test-types",
        "test-lint": "semistandard && cpplint",
        "test-unit": "nyc --reporter=lcov --reporter=text --check-coverage --branches=100 mocha",
        "test-licensing": 'license-checker --production --summary --onlyAllow="Apache-2.0;BSD;ISC;MIT"',
        "test-leak": "./test/leak/leak.sh",
        "test-types": "tsd",
        "docs-build": "node docs/build && node docs/search-index/build",
        "docs-serve": "cd docs && npx serve",
        "docs-publish": "cd docs && npx firebase-tools deploy --project pixelplumbing --only hosting:pixelplumbing-sharp"
      },
      main: "lib/index.js",
      types: "lib/index.d.ts",
      files: [
        "binding.gyp",
        "install/**",
        "lib/**",
        "src/**"
      ],
      repository: {
        type: "git",
        url: "git://github.com/lovell/sharp"
      },
      keywords: [
        "jpeg",
        "png",
        "webp",
        "avif",
        "tiff",
        "gif",
        "svg",
        "jp2",
        "dzi",
        "image",
        "resize",
        "thumbnail",
        "crop",
        "embed",
        "libvips",
        "vips"
      ],
      dependencies: {
        color: "^4.2.3",
        "detect-libc": "^2.0.2",
        "node-addon-api": "^6.1.0",
        "prebuild-install": "^7.1.1",
        semver: "^7.5.4",
        "simple-get": "^4.0.1",
        "tar-fs": "^3.0.4",
        "tunnel-agent": "^0.6.0"
      },
      devDependencies: {
        "@types/node": "*",
        async: "^3.2.4",
        cc: "^3.0.1",
        "exif-reader": "^1.2.0",
        "extract-zip": "^2.0.1",
        icc: "^3.0.0",
        "jsdoc-to-markdown": "^8.0.0",
        "license-checker": "^25.0.1",
        mocha: "^10.2.0",
        "mock-fs": "^5.2.0",
        nyc: "^15.1.0",
        prebuild: "^12.0.0",
        semistandard: "^16.0.1",
        tsd: "^0.29.0"
      },
      license: "Apache-2.0",
      config: {
        libvips: "8.14.5",
        integrity: {
          "darwin-arm64v8": "sha512-1QZzICfCJd4wAO0P6qmYI5e5VFMt9iCE4QgefI8VMMbdSzjIXA9L/ARN6pkMQPZ3h20Y9RtJ2W1skgCsvCIccw==",
          "darwin-x64": "sha512-sMIKMYXsdU9FlIfztj6Kt/SfHlhlDpP0Ups7ftVFqwjaszmYmpI9y/d/q3mLb4jrzuSiSUEislSWCwBnW7MPTw==",
          "linux-arm64v8": "sha512-CD8owELzkDumaom+O3jJ8fKamILAQdj+//KK/VNcHK3sngUcFpdjx36C8okwbux9sml/T7GTB/gzpvReDrAejQ==",
          "linux-armv6": "sha512-wk6IPHatDFVWKJy7lI1TJezHGHPQut1wF2bwx256KlZwXUQU3fcVcMpV1zxXjgLFewHq2+uhyMkoSGBPahWzlA==",
          "linux-armv7": "sha512-HEZC9KYtkmBK5rUR2MqBhrVarnQVZ/TwLUeLkKq0XuoM2pc/eXI6N0Fh5NGEFwdXI2XE8g1ySf+OYS6DDi+xCQ==",
          "linux-x64": "sha512-SlFWrITSW5XVUkaFPQOySAaSGXnhkGJCj8X2wGYYta9hk5piZldQyMp4zwy0z6UeRu1qKTKtZvmq28W3Gnh9xA==",
          "linuxmusl-arm64v8": "sha512-ga9iX7WUva3sG/VsKkOD318InLlCfPIztvzCZKZ2/+izQXRbQi8VoXWMHgEN4KHACv45FTl7mJ/8CRqUzhS8wQ==",
          "linuxmusl-x64": "sha512-yeaHnpfee1hrZLok2l4eFceHzlfq8gN3QOu0R4Mh8iMK5O5vAUu97bdtxeZZeJJvHw8tfh2/msGi0qysxKN8bw==",
          "win32-arm64v8": "sha512-kR91hy9w1+GEXK56hLh51+hBCBo7T+ijM4Slkmvb/2PsYZySq5H7s61n99iDYl6kTJP2y9sW5Xcvm3uuXDaDgg==",
          "win32-ia32": "sha512-HrnofEbzHNpHJ0vVnjsTj5yfgVdcqdWshXuwFO2zc8xlEjA83BvXZ0lVj9MxPxkxJ2ta+/UlLr+CFzc5bOceMw==",
          "win32-x64": "sha512-BwKckinJZ0Fu/EcunqiLPwOLEBWp4xf8GV7nvmVuKKz5f6B+GxoA2k9aa2wueqv4r4RJVgV/aWXZWFKOIjre/Q=="
        },
        runtime: "napi",
        target: 7
      },
      engines: {
        node: ">=14.15.0"
      },
      funding: {
        url: "https://opencollective.com/libvips"
      },
      binary: {
        napi_versions: [
          7
        ]
      },
      semistandard: {
        env: [
          "mocha"
        ]
      },
      cc: {
        linelength: "120",
        filter: [
          "build/include"
        ]
      },
      tsd: {
        directory: "test/types/"
      }
    };
  }
});

// node_modules/sharp/lib/libvips.js
var require_libvips = __commonJS({
  "node_modules/sharp/lib/libvips.js"(exports2, module2) {
    "use strict";
    var fs7 = require("fs");
    var os = require("os");
    var path5 = require("path");
    var spawnSync = require("child_process").spawnSync;
    var semverCoerce = require_coerce();
    var semverGreaterThanOrEqualTo = require_gte();
    var platform = require_platform();
    var { config } = require_package();
    var env4 = process.env;
    var minimumLibvipsVersionLabelled = env4.npm_package_config_libvips || /* istanbul ignore next */
    config.libvips;
    var minimumLibvipsVersion = semverCoerce(minimumLibvipsVersionLabelled).version;
    var spawnSyncOptions = {
      encoding: "utf8",
      shell: true
    };
    var vendorPath = path5.join(__dirname, "..", "vendor", minimumLibvipsVersion, platform());
    var mkdirSync2 = function(dirPath) {
      try {
        fs7.mkdirSync(dirPath, { recursive: true });
      } catch (err2) {
        if (err2.code !== "EEXIST") {
          throw err2;
        }
      }
    };
    var cachePath = function() {
      const npmCachePath = env4.npm_config_cache || /* istanbul ignore next */
      (env4.APPDATA ? path5.join(env4.APPDATA, "npm-cache") : path5.join(os.homedir(), ".npm"));
      mkdirSync2(npmCachePath);
      const libvipsCachePath = path5.join(npmCachePath, "_libvips");
      mkdirSync2(libvipsCachePath);
      return libvipsCachePath;
    };
    var integrity = function(platformAndArch) {
      return env4[`npm_package_config_integrity_${platformAndArch.replace("-", "_")}`] || config.integrity[platformAndArch];
    };
    var log = function(item) {
      if (item instanceof Error) {
        console.error(`sharp: Installation error: ${item.message}`);
      } else {
        console.log(`sharp: ${item}`);
      }
    };
    var isRosetta = function() {
      if (process.platform === "darwin" && process.arch === "x64") {
        const translated = spawnSync("sysctl sysctl.proc_translated", spawnSyncOptions).stdout;
        return (translated || "").trim() === "sysctl.proc_translated: 1";
      }
      return false;
    };
    var globalLibvipsVersion = function() {
      if (process.platform !== "win32") {
        const globalLibvipsVersion2 = spawnSync("pkg-config --modversion vips-cpp", {
          ...spawnSyncOptions,
          env: {
            ...env4,
            PKG_CONFIG_PATH: pkgConfigPath()
          }
        }).stdout;
        return (globalLibvipsVersion2 || "").trim();
      } else {
        return "";
      }
    };
    var hasVendoredLibvips = function() {
      return fs7.existsSync(vendorPath);
    };
    var removeVendoredLibvips = function() {
      fs7.rmSync(vendorPath, { recursive: true, maxRetries: 3, force: true });
    };
    var pkgConfigPath = function() {
      if (process.platform !== "win32") {
        const brewPkgConfigPath = spawnSync(
          'which brew >/dev/null 2>&1 && brew environment --plain | grep PKG_CONFIG_LIBDIR | cut -d" " -f2',
          spawnSyncOptions
        ).stdout || "";
        return [
          brewPkgConfigPath.trim(),
          env4.PKG_CONFIG_PATH,
          "/usr/local/lib/pkgconfig",
          "/usr/lib/pkgconfig",
          "/usr/local/libdata/pkgconfig",
          "/usr/libdata/pkgconfig"
        ].filter(Boolean).join(":");
      } else {
        return "";
      }
    };
    var useGlobalLibvips = function() {
      if (Boolean(env4.SHARP_IGNORE_GLOBAL_LIBVIPS) === true) {
        return false;
      }
      if (isRosetta()) {
        log("Detected Rosetta, skipping search for globally-installed libvips");
        return false;
      }
      const globalVipsVersion = globalLibvipsVersion();
      return !!globalVipsVersion && /* istanbul ignore next */
      semverGreaterThanOrEqualTo(globalVipsVersion, minimumLibvipsVersion);
    };
    module2.exports = {
      minimumLibvipsVersion,
      minimumLibvipsVersionLabelled,
      cachePath,
      integrity,
      log,
      globalLibvipsVersion,
      hasVendoredLibvips,
      removeVendoredLibvips,
      pkgConfigPath,
      useGlobalLibvips,
      mkdirSync: mkdirSync2
    };
  }
});

// node_modules/sharp/build/Release/sharp-win32-x64.node
var require_sharp_win32_x64 = __commonJS({
  "node_modules/sharp/build/Release/sharp-win32-x64.node"(exports2, module2) {
    module2.exports = "./sharp-win32-x64-CXV3GA3G.node";
  }
});

// require("../build/Release/sharp-*.node") in node_modules/sharp/lib/sharp.js
var globRequire_build_Release_sharp_node;
var init_2 = __esm({
  'require("../build/Release/sharp-*.node") in node_modules/sharp/lib/sharp.js'() {
    globRequire_build_Release_sharp_node = __glob({
      "../build/Release/sharp-win32-x64.node": () => require_sharp_win32_x64()
    });
  }
});

// node_modules/sharp/lib/sharp.js
var require_sharp = __commonJS({
  "node_modules/sharp/lib/sharp.js"(exports2, module2) {
    "use strict";
    init_2();
    var platformAndArch = require_platform()();
    try {
      module2.exports = globRequire_build_Release_sharp_node(`../build/Release/sharp-${platformAndArch}.node`);
    } catch (err2) {
      const help = ["", 'Something went wrong installing the "sharp" module', "", err2.message, "", "Possible solutions:"];
      if (/dylib/.test(err2.message) && /Incompatible library version/.test(err2.message)) {
        help.push('- Update Homebrew: "brew update && brew upgrade vips"');
      } else {
        const [platform, arch] = platformAndArch.split("-");
        if (platform === "linux" && /Module did not self-register/.test(err2.message)) {
          help.push("- Using worker threads? See https://sharp.pixelplumbing.com/install#worker-threads");
        }
        help.push(
          '- Install with verbose logging and look for errors: "npm install --ignore-scripts=false --foreground-scripts --verbose sharp"',
          `- Install for the current ${platformAndArch} runtime: "npm install --platform=${platform} --arch=${arch} sharp"`
        );
      }
      help.push(
        "- Consult the installation documentation: https://sharp.pixelplumbing.com/install"
      );
      if (process.platform === "win32" || /symbol/.test(err2.message)) {
        const loadedModule = Object.keys(require.cache).find((i2) => /[\\/]build[\\/]Release[\\/]sharp(.*)\.node$/.test(i2));
        if (loadedModule) {
          const [, loadedPackage] = loadedModule.match(/node_modules[\\/]([^\\/]+)[\\/]/);
          help.push(`- Ensure the version of sharp aligns with the ${loadedPackage} package: "npm ls sharp"`);
        }
      }
      throw new Error(help.join("\n"));
    }
  }
});

// node_modules/sharp/lib/constructor.js
var require_constructor = __commonJS({
  "node_modules/sharp/lib/constructor.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var stream2 = require("stream");
    var is = require_is();
    require_libvips().hasVendoredLibvips();
    require_sharp();
    var debuglog = util.debuglog("sharp");
    var Sharp = function(input, options) {
      if (arguments.length === 1 && !is.defined(input)) {
        throw new Error("Invalid input");
      }
      if (!(this instanceof Sharp)) {
        return new Sharp(input, options);
      }
      stream2.Duplex.call(this);
      this.options = {
        // resize options
        topOffsetPre: -1,
        leftOffsetPre: -1,
        widthPre: -1,
        heightPre: -1,
        topOffsetPost: -1,
        leftOffsetPost: -1,
        widthPost: -1,
        heightPost: -1,
        width: -1,
        height: -1,
        canvas: "crop",
        position: 0,
        resizeBackground: [0, 0, 0, 255],
        useExifOrientation: false,
        angle: 0,
        rotationAngle: 0,
        rotationBackground: [0, 0, 0, 255],
        rotateBeforePreExtract: false,
        flip: false,
        flop: false,
        extendTop: 0,
        extendBottom: 0,
        extendLeft: 0,
        extendRight: 0,
        extendBackground: [0, 0, 0, 255],
        extendWith: "background",
        withoutEnlargement: false,
        withoutReduction: false,
        affineMatrix: [],
        affineBackground: [0, 0, 0, 255],
        affineIdx: 0,
        affineIdy: 0,
        affineOdx: 0,
        affineOdy: 0,
        affineInterpolator: this.constructor.interpolators.bilinear,
        kernel: "lanczos3",
        fastShrinkOnLoad: true,
        // operations
        tintA: 128,
        tintB: 128,
        flatten: false,
        flattenBackground: [0, 0, 0],
        unflatten: false,
        negate: false,
        negateAlpha: true,
        medianSize: 0,
        blurSigma: 0,
        sharpenSigma: 0,
        sharpenM1: 1,
        sharpenM2: 2,
        sharpenX1: 2,
        sharpenY2: 10,
        sharpenY3: 20,
        threshold: 0,
        thresholdGrayscale: true,
        trimBackground: [],
        trimThreshold: 0,
        gamma: 0,
        gammaOut: 0,
        greyscale: false,
        normalise: false,
        normaliseLower: 1,
        normaliseUpper: 99,
        claheWidth: 0,
        claheHeight: 0,
        claheMaxSlope: 3,
        brightness: 1,
        saturation: 1,
        hue: 0,
        lightness: 0,
        booleanBufferIn: null,
        booleanFileIn: "",
        joinChannelIn: [],
        extractChannel: -1,
        removeAlpha: false,
        ensureAlpha: -1,
        colourspace: "srgb",
        colourspaceInput: "last",
        composite: [],
        // output
        fileOut: "",
        formatOut: "input",
        streamOut: false,
        withMetadata: false,
        withMetadataOrientation: -1,
        withMetadataDensity: 0,
        withMetadataIcc: "",
        withMetadataStrs: {},
        resolveWithObject: false,
        // output format
        jpegQuality: 80,
        jpegProgressive: false,
        jpegChromaSubsampling: "4:2:0",
        jpegTrellisQuantisation: false,
        jpegOvershootDeringing: false,
        jpegOptimiseScans: false,
        jpegOptimiseCoding: true,
        jpegQuantisationTable: 0,
        pngProgressive: false,
        pngCompressionLevel: 6,
        pngAdaptiveFiltering: false,
        pngPalette: false,
        pngQuality: 100,
        pngEffort: 7,
        pngBitdepth: 8,
        pngDither: 1,
        jp2Quality: 80,
        jp2TileHeight: 512,
        jp2TileWidth: 512,
        jp2Lossless: false,
        jp2ChromaSubsampling: "4:4:4",
        webpQuality: 80,
        webpAlphaQuality: 100,
        webpLossless: false,
        webpNearLossless: false,
        webpSmartSubsample: false,
        webpPreset: "default",
        webpEffort: 4,
        webpMinSize: false,
        webpMixed: false,
        gifBitdepth: 8,
        gifEffort: 7,
        gifDither: 1,
        gifInterFrameMaxError: 0,
        gifInterPaletteMaxError: 3,
        gifReuse: true,
        gifProgressive: false,
        tiffQuality: 80,
        tiffCompression: "jpeg",
        tiffPredictor: "horizontal",
        tiffPyramid: false,
        tiffBitdepth: 8,
        tiffTile: false,
        tiffTileHeight: 256,
        tiffTileWidth: 256,
        tiffXres: 1,
        tiffYres: 1,
        tiffResolutionUnit: "inch",
        heifQuality: 50,
        heifLossless: false,
        heifCompression: "av1",
        heifEffort: 4,
        heifChromaSubsampling: "4:4:4",
        jxlDistance: 1,
        jxlDecodingTier: 0,
        jxlEffort: 7,
        jxlLossless: false,
        rawDepth: "uchar",
        tileSize: 256,
        tileOverlap: 0,
        tileContainer: "fs",
        tileLayout: "dz",
        tileFormat: "last",
        tileDepth: "last",
        tileAngle: 0,
        tileSkipBlanks: -1,
        tileBackground: [255, 255, 255, 255],
        tileCentre: false,
        tileId: "https://example.com/iiif",
        tileBasename: "",
        timeoutSeconds: 0,
        linearA: [],
        linearB: [],
        // Function to notify of libvips warnings
        debuglog: (warning) => {
          this.emit("warning", warning);
          debuglog(warning);
        },
        // Function to notify of queue length changes
        queueListener: function(queueLength) {
          Sharp.queue.emit("change", queueLength);
        }
      };
      this.options.input = this._createInputDescriptor(input, options, { allowStream: true });
      return this;
    };
    Object.setPrototypeOf(Sharp.prototype, stream2.Duplex.prototype);
    Object.setPrototypeOf(Sharp, stream2.Duplex);
    function clone() {
      const clone2 = this.constructor.call();
      clone2.options = Object.assign({}, this.options);
      if (this._isStreamInput()) {
        this.on("finish", () => {
          this._flattenBufferIn();
          clone2.options.bufferIn = this.options.bufferIn;
          clone2.emit("finish");
        });
      }
      return clone2;
    }
    Object.assign(Sharp.prototype, { clone });
    module2.exports = Sharp;
  }
});

// node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/color-name/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/is-arrayish/index.js
var require_is_arrayish = __commonJS({
  "node_modules/is-arrayish/index.js"(exports2, module2) {
    module2.exports = function isArrayish(obj) {
      if (!obj || typeof obj === "string") {
        return false;
      }
      return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== "String");
    };
  }
});

// node_modules/simple-swizzle/index.js
var require_simple_swizzle = __commonJS({
  "node_modules/simple-swizzle/index.js"(exports2, module2) {
    "use strict";
    var isArrayish = require_is_arrayish();
    var concat = Array.prototype.concat;
    var slice = Array.prototype.slice;
    var swizzle = module2.exports = function swizzle2(args2) {
      var results = [];
      for (var i2 = 0, len = args2.length; i2 < len; i2++) {
        var arg = args2[i2];
        if (isArrayish(arg)) {
          results = concat.call(results, slice.call(arg));
        } else {
          results.push(arg);
        }
      }
      return results;
    };
    swizzle.wrap = function(fn) {
      return function() {
        return fn(swizzle(arguments));
      };
    };
  }
});

// node_modules/color-string/index.js
var require_color_string = __commonJS({
  "node_modules/color-string/index.js"(exports2, module2) {
    var colorNames = require_color_name();
    var swizzle = require_simple_swizzle();
    var hasOwnProperty = Object.hasOwnProperty;
    var reverseNames = /* @__PURE__ */ Object.create(null);
    for (name2 in colorNames) {
      if (hasOwnProperty.call(colorNames, name2)) {
        reverseNames[colorNames[name2]] = name2;
      }
    }
    var name2;
    var cs = module2.exports = {
      to: {},
      get: {}
    };
    cs.get = function(string) {
      var prefix = string.substring(0, 3).toLowerCase();
      var val;
      var model;
      switch (prefix) {
        case "hsl":
          val = cs.get.hsl(string);
          model = "hsl";
          break;
        case "hwb":
          val = cs.get.hwb(string);
          model = "hwb";
          break;
        default:
          val = cs.get.rgb(string);
          model = "rgb";
          break;
      }
      if (!val) {
        return null;
      }
      return { model, value: val };
    };
    cs.get.rgb = function(string) {
      if (!string) {
        return null;
      }
      var abbr = /^#([a-f0-9]{3,4})$/i;
      var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
      var rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
      var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
      var keyword = /^(\w+)$/;
      var rgb = [0, 0, 0, 1];
      var match;
      var i2;
      var hexAlpha;
      if (match = string.match(hex)) {
        hexAlpha = match[2];
        match = match[1];
        for (i2 = 0; i2 < 3; i2++) {
          var i22 = i2 * 2;
          rgb[i2] = parseInt(match.slice(i22, i22 + 2), 16);
        }
        if (hexAlpha) {
          rgb[3] = parseInt(hexAlpha, 16) / 255;
        }
      } else if (match = string.match(abbr)) {
        match = match[1];
        hexAlpha = match[3];
        for (i2 = 0; i2 < 3; i2++) {
          rgb[i2] = parseInt(match[i2] + match[i2], 16);
        }
        if (hexAlpha) {
          rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
        }
      } else if (match = string.match(rgba)) {
        for (i2 = 0; i2 < 3; i2++) {
          rgb[i2] = parseInt(match[i2 + 1], 0);
        }
        if (match[4]) {
          if (match[5]) {
            rgb[3] = parseFloat(match[4]) * 0.01;
          } else {
            rgb[3] = parseFloat(match[4]);
          }
        }
      } else if (match = string.match(per)) {
        for (i2 = 0; i2 < 3; i2++) {
          rgb[i2] = Math.round(parseFloat(match[i2 + 1]) * 2.55);
        }
        if (match[4]) {
          if (match[5]) {
            rgb[3] = parseFloat(match[4]) * 0.01;
          } else {
            rgb[3] = parseFloat(match[4]);
          }
        }
      } else if (match = string.match(keyword)) {
        if (match[1] === "transparent") {
          return [0, 0, 0, 0];
        }
        if (!hasOwnProperty.call(colorNames, match[1])) {
          return null;
        }
        rgb = colorNames[match[1]];
        rgb[3] = 1;
        return rgb;
      } else {
        return null;
      }
      for (i2 = 0; i2 < 3; i2++) {
        rgb[i2] = clamp(rgb[i2], 0, 255);
      }
      rgb[3] = clamp(rgb[3], 0, 1);
      return rgb;
    };
    cs.get.hsl = function(string) {
      if (!string) {
        return null;
      }
      var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
      var match = string.match(hsl);
      if (match) {
        var alpha = parseFloat(match[4]);
        var h = (parseFloat(match[1]) % 360 + 360) % 360;
        var s = clamp(parseFloat(match[2]), 0, 100);
        var l = clamp(parseFloat(match[3]), 0, 100);
        var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
        return [h, s, l, a];
      }
      return null;
    };
    cs.get.hwb = function(string) {
      if (!string) {
        return null;
      }
      var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
      var match = string.match(hwb);
      if (match) {
        var alpha = parseFloat(match[4]);
        var h = (parseFloat(match[1]) % 360 + 360) % 360;
        var w = clamp(parseFloat(match[2]), 0, 100);
        var b = clamp(parseFloat(match[3]), 0, 100);
        var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
        return [h, w, b, a];
      }
      return null;
    };
    cs.to.hex = function() {
      var rgba = swizzle(arguments);
      return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : "");
    };
    cs.to.rgb = function() {
      var rgba = swizzle(arguments);
      return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ")" : "rgba(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ", " + rgba[3] + ")";
    };
    cs.to.rgb.percent = function() {
      var rgba = swizzle(arguments);
      var r = Math.round(rgba[0] / 255 * 100);
      var g2 = Math.round(rgba[1] / 255 * 100);
      var b = Math.round(rgba[2] / 255 * 100);
      return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + r + "%, " + g2 + "%, " + b + "%)" : "rgba(" + r + "%, " + g2 + "%, " + b + "%, " + rgba[3] + ")";
    };
    cs.to.hsl = function() {
      var hsla = swizzle(arguments);
      return hsla.length < 4 || hsla[3] === 1 ? "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)" : "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
    };
    cs.to.hwb = function() {
      var hwba = swizzle(arguments);
      var a = "";
      if (hwba.length >= 4 && hwba[3] !== 1) {
        a = ", " + hwba[3];
      }
      return "hwb(" + hwba[0] + ", " + hwba[1] + "%, " + hwba[2] + "%" + a + ")";
    };
    cs.to.keyword = function(rgb) {
      return reverseNames[rgb.slice(0, 3)];
    };
    function clamp(num, min2, max2) {
      return Math.min(Math.max(min2, num), max2);
    }
    function hexDouble(num) {
      var str = Math.round(num).toString(16).toUpperCase();
      return str.length < 2 ? "0" + str : str;
    }
  }
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "node_modules/color-convert/conversions.js"(exports2, module2) {
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    module2.exports = convert;
    for (const model of Object.keys(convert)) {
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const { channels, labels } = convert[model];
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", { value: channels });
      Object.defineProperty(convert[model], "labels", { value: labels });
    }
    convert.rgb.hsl = function(rgb) {
      const r = rgb[0] / 255;
      const g2 = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min2 = Math.min(r, g2, b);
      const max2 = Math.max(r, g2, b);
      const delta = max2 - min2;
      let h;
      let s;
      if (max2 === min2) {
        h = 0;
      } else if (r === max2) {
        h = (g2 - b) / delta;
      } else if (g2 === max2) {
        h = 2 + (b - r) / delta;
      } else if (b === max2) {
        h = 4 + (r - g2) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      const l = (min2 + max2) / 2;
      if (max2 === min2) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max2 + min2);
      } else {
        s = delta / (2 - max2 - min2);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g2 = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g2, b);
      const diff = v - Math.min(r, g2, b);
      const diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g2);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g2 === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      const r = rgb[0];
      const g2 = rgb[1];
      let b = rgb[2];
      const h = convert.rgb.hsl(rgb)[0];
      const w = 1 / 255 * Math.min(r, Math.min(g2, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g2, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      const r = rgb[0] / 255;
      const g2 = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g2, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g2 - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
    }
    convert.rgb.keyword = function(rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      let r = rgb[0] / 255;
      let g2 = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g2 = g2 > 0.04045 ? ((g2 + 0.055) / 1.055) ** 2.4 : g2 / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x = r * 0.4124 + g2 * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g2 * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g2 * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      const xyz = convert.rgb.xyz(rgb);
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i2 = 0; i2 < 3; i2++) {
        t3 = h + 1 / 3 * -(i2 - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i2] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q2 = 255 * v * (1 - s * f);
      const t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q2, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q2, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q2];
      }
    };
    convert.hsv.hsl = function(hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i2 = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i2;
      if ((i2 & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g2;
      let b;
      switch (i2) {
        default:
        case 6:
        case 0:
          r = v;
          g2 = n;
          b = wh;
          break;
        case 1:
          r = n;
          g2 = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g2 = v;
          b = n;
          break;
        case 3:
          r = wh;
          g2 = n;
          b = v;
          break;
        case 4:
          r = n;
          g2 = wh;
          b = v;
          break;
        case 5:
          r = v;
          g2 = wh;
          b = n;
          break;
      }
      return [r * 255, g2 * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g2 = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g2 * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g2;
      let b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g2 = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g2 = g2 > 31308e-7 ? 1.055 * g2 ** (1 / 2.4) - 0.055 : g2 * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g2 = Math.min(Math.max(0, g2), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g2 * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x;
      let y;
      let z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x2 = x ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = h / 360 * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args2, saturation = null) {
      const [r, g2, b] = args2;
      let value = saturation === null ? convert.rgb.hsv(args2)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g2 / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args2) {
      return convert.rgb.ansi16(convert.hsv.rgb(args2), args2[2]);
    };
    convert.rgb.ansi256 = function(args2) {
      const r = args2[0];
      const g2 = args2[1];
      const b = args2[2];
      if (r === g2 && g2 === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g2 / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args2) {
      let color = args2 % 10;
      if (color === 0 || color === 7) {
        if (args2 > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      const mult = (~~(args2 > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g2 = (color >> 1 & 1) * mult * 255;
      const b = (color >> 2 & 1) * mult * 255;
      return [r, g2, b];
    };
    convert.ansi256.rgb = function(args2) {
      if (args2 >= 232) {
        const c = (args2 - 232) * 10 + 8;
        return [c, c, c];
      }
      args2 -= 16;
      let rem;
      const r = Math.floor(args2 / 36) / 5 * 255;
      const g2 = Math.floor((rem = args2 % 36) / 6) / 5 * 255;
      const b = rem % 6 / 5 * 255;
      return [r, g2, b];
    };
    convert.rgb.hex = function(args2) {
      const integer = ((Math.round(args2[0]) & 255) << 16) + ((Math.round(args2[1]) & 255) << 8) + (Math.round(args2[2]) & 255);
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args2) {
      const match = args2.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      let colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map((char) => {
          return char + char;
        }).join("");
      }
      const integer = parseInt(colorString, 16);
      const r = integer >> 16 & 255;
      const g2 = integer >> 8 & 255;
      const b = integer & 255;
      return [r, g2, b];
    };
    convert.rgb.hcg = function(rgb) {
      const r = rgb[0] / 255;
      const g2 = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max2 = Math.max(Math.max(r, g2), b);
      const min2 = Math.min(Math.min(r, g2), b);
      const chroma = max2 - min2;
      let grayscale;
      let hue;
      if (chroma < 1) {
        grayscale = min2 / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max2 === r) {
        hue = (g2 - b) / chroma % 6;
      } else if (max2 === g2) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g2) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g2 = hcg[2] / 100;
      if (c === 0) {
        return [g2 * 255, g2 * 255, g2 * 255];
      }
      const pure = [0, 0, 0];
      const hi = h % 1 * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g2;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      const c = hcg[1] / 100;
      const g2 = hcg[2] / 100;
      const v = c + g2 * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      const c = hcg[1] / 100;
      const g2 = hcg[2] / 100;
      const l = g2 * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      const c = hcg[1] / 100;
      const g2 = hcg[2] / 100;
      const v = c + g2 * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g2 = 0;
      if (c < 1) {
        g2 = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g2 * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args2) {
      return [args2[0] / 100 * 255, args2[0] / 100 * 255, args2[0] / 100 * 255];
    };
    convert.gray.hsl = function(args2) {
      return [0, 0, args2[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      const val = Math.round(gray[0] / 100 * 255) & 255;
      const integer = (val << 16) + (val << 8) + val;
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/color-convert/route.js"(exports2, module2) {
    var conversions = require_conversions();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i2 = 0; i2 < len; i2++) {
        graph[models[i2]] = {
          // http://jsperf.com/1-vs-infinity
          // micro-opt, but this is simple.
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      const graph = buildGraph();
      const queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        const current = queue.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i2 = 0; i2 < len; i2++) {
          const adjacent = adjacents[i2];
          const node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args2) {
        return to(from(args2));
      };
    }
    function wrapConversion(toModel, graph) {
      const path5 = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path5.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path5;
      return fn;
    }
    module2.exports = function(fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i2 = 0; i2 < len; i2++) {
        const toModel = models[i2];
        const node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "node_modules/color-convert/index.js"(exports2, module2) {
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = function(...args2) {
        const arg0 = args2[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args2 = arg0;
        }
        return fn(args2);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      const wrappedFn = function(...args2) {
        const arg0 = args2[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args2 = arg0;
        }
        const result = fn(args2);
        if (typeof result === "object") {
          for (let len = result.length, i2 = 0; i2 < len; i2++) {
            result[i2] = Math.round(result[i2]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach((fromModel) => {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// node_modules/color/index.js
var require_color = __commonJS({
  "node_modules/color/index.js"(exports2, module2) {
    var colorString = require_color_string();
    var convert = require_color_convert();
    var skippedModels = [
      // To be honest, I don't really feel like keyword belongs in color convert, but eh.
      "keyword",
      // Gray conflicts with some method names, and has its own method defined.
      "gray",
      // Shouldn't really be in color-convert either...
      "hex"
    ];
    var hashedModelKeys = {};
    for (const model of Object.keys(convert)) {
      hashedModelKeys[[...convert[model].labels].sort().join("")] = model;
    }
    var limiters = {};
    function Color(object, model) {
      if (!(this instanceof Color)) {
        return new Color(object, model);
      }
      if (model && model in skippedModels) {
        model = null;
      }
      if (model && !(model in convert)) {
        throw new Error("Unknown model: " + model);
      }
      let i2;
      let channels;
      if (object == null) {
        this.model = "rgb";
        this.color = [0, 0, 0];
        this.valpha = 1;
      } else if (object instanceof Color) {
        this.model = object.model;
        this.color = [...object.color];
        this.valpha = object.valpha;
      } else if (typeof object === "string") {
        const result = colorString.get(object);
        if (result === null) {
          throw new Error("Unable to parse color from string: " + object);
        }
        this.model = result.model;
        channels = convert[this.model].channels;
        this.color = result.value.slice(0, channels);
        this.valpha = typeof result.value[channels] === "number" ? result.value[channels] : 1;
      } else if (object.length > 0) {
        this.model = model || "rgb";
        channels = convert[this.model].channels;
        const newArray = Array.prototype.slice.call(object, 0, channels);
        this.color = zeroArray(newArray, channels);
        this.valpha = typeof object[channels] === "number" ? object[channels] : 1;
      } else if (typeof object === "number") {
        this.model = "rgb";
        this.color = [
          object >> 16 & 255,
          object >> 8 & 255,
          object & 255
        ];
        this.valpha = 1;
      } else {
        this.valpha = 1;
        const keys = Object.keys(object);
        if ("alpha" in object) {
          keys.splice(keys.indexOf("alpha"), 1);
          this.valpha = typeof object.alpha === "number" ? object.alpha : 0;
        }
        const hashedKeys = keys.sort().join("");
        if (!(hashedKeys in hashedModelKeys)) {
          throw new Error("Unable to parse color from object: " + JSON.stringify(object));
        }
        this.model = hashedModelKeys[hashedKeys];
        const { labels } = convert[this.model];
        const color = [];
        for (i2 = 0; i2 < labels.length; i2++) {
          color.push(object[labels[i2]]);
        }
        this.color = zeroArray(color);
      }
      if (limiters[this.model]) {
        channels = convert[this.model].channels;
        for (i2 = 0; i2 < channels; i2++) {
          const limit = limiters[this.model][i2];
          if (limit) {
            this.color[i2] = limit(this.color[i2]);
          }
        }
      }
      this.valpha = Math.max(0, Math.min(1, this.valpha));
      if (Object.freeze) {
        Object.freeze(this);
      }
    }
    Color.prototype = {
      toString() {
        return this.string();
      },
      toJSON() {
        return this[this.model]();
      },
      string(places) {
        let self2 = this.model in colorString.to ? this : this.rgb();
        self2 = self2.round(typeof places === "number" ? places : 1);
        const args2 = self2.valpha === 1 ? self2.color : [...self2.color, this.valpha];
        return colorString.to[self2.model](args2);
      },
      percentString(places) {
        const self2 = this.rgb().round(typeof places === "number" ? places : 1);
        const args2 = self2.valpha === 1 ? self2.color : [...self2.color, this.valpha];
        return colorString.to.rgb.percent(args2);
      },
      array() {
        return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
      },
      object() {
        const result = {};
        const { channels } = convert[this.model];
        const { labels } = convert[this.model];
        for (let i2 = 0; i2 < channels; i2++) {
          result[labels[i2]] = this.color[i2];
        }
        if (this.valpha !== 1) {
          result.alpha = this.valpha;
        }
        return result;
      },
      unitArray() {
        const rgb = this.rgb().color;
        rgb[0] /= 255;
        rgb[1] /= 255;
        rgb[2] /= 255;
        if (this.valpha !== 1) {
          rgb.push(this.valpha);
        }
        return rgb;
      },
      unitObject() {
        const rgb = this.rgb().object();
        rgb.r /= 255;
        rgb.g /= 255;
        rgb.b /= 255;
        if (this.valpha !== 1) {
          rgb.alpha = this.valpha;
        }
        return rgb;
      },
      round(places) {
        places = Math.max(places || 0, 0);
        return new Color([...this.color.map(roundToPlace(places)), this.valpha], this.model);
      },
      alpha(value) {
        if (value !== void 0) {
          return new Color([...this.color, Math.max(0, Math.min(1, value))], this.model);
        }
        return this.valpha;
      },
      // Rgb
      red: getset("rgb", 0, maxfn(255)),
      green: getset("rgb", 1, maxfn(255)),
      blue: getset("rgb", 2, maxfn(255)),
      hue: getset(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (value) => (value % 360 + 360) % 360),
      saturationl: getset("hsl", 1, maxfn(100)),
      lightness: getset("hsl", 2, maxfn(100)),
      saturationv: getset("hsv", 1, maxfn(100)),
      value: getset("hsv", 2, maxfn(100)),
      chroma: getset("hcg", 1, maxfn(100)),
      gray: getset("hcg", 2, maxfn(100)),
      white: getset("hwb", 1, maxfn(100)),
      wblack: getset("hwb", 2, maxfn(100)),
      cyan: getset("cmyk", 0, maxfn(100)),
      magenta: getset("cmyk", 1, maxfn(100)),
      yellow: getset("cmyk", 2, maxfn(100)),
      black: getset("cmyk", 3, maxfn(100)),
      x: getset("xyz", 0, maxfn(95.047)),
      y: getset("xyz", 1, maxfn(100)),
      z: getset("xyz", 2, maxfn(108.833)),
      l: getset("lab", 0, maxfn(100)),
      a: getset("lab", 1),
      b: getset("lab", 2),
      keyword(value) {
        if (value !== void 0) {
          return new Color(value);
        }
        return convert[this.model].keyword(this.color);
      },
      hex(value) {
        if (value !== void 0) {
          return new Color(value);
        }
        return colorString.to.hex(this.rgb().round().color);
      },
      hexa(value) {
        if (value !== void 0) {
          return new Color(value);
        }
        const rgbArray = this.rgb().round().color;
        let alphaHex = Math.round(this.valpha * 255).toString(16).toUpperCase();
        if (alphaHex.length === 1) {
          alphaHex = "0" + alphaHex;
        }
        return colorString.to.hex(rgbArray) + alphaHex;
      },
      rgbNumber() {
        const rgb = this.rgb().color;
        return (rgb[0] & 255) << 16 | (rgb[1] & 255) << 8 | rgb[2] & 255;
      },
      luminosity() {
        const rgb = this.rgb().color;
        const lum = [];
        for (const [i2, element] of rgb.entries()) {
          const chan = element / 255;
          lum[i2] = chan <= 0.04045 ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
        }
        return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
      },
      contrast(color2) {
        const lum1 = this.luminosity();
        const lum2 = color2.luminosity();
        if (lum1 > lum2) {
          return (lum1 + 0.05) / (lum2 + 0.05);
        }
        return (lum2 + 0.05) / (lum1 + 0.05);
      },
      level(color2) {
        const contrastRatio = this.contrast(color2);
        if (contrastRatio >= 7) {
          return "AAA";
        }
        return contrastRatio >= 4.5 ? "AA" : "";
      },
      isDark() {
        const rgb = this.rgb().color;
        const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 1e4;
        return yiq < 128;
      },
      isLight() {
        return !this.isDark();
      },
      negate() {
        const rgb = this.rgb();
        for (let i2 = 0; i2 < 3; i2++) {
          rgb.color[i2] = 255 - rgb.color[i2];
        }
        return rgb;
      },
      lighten(ratio) {
        const hsl = this.hsl();
        hsl.color[2] += hsl.color[2] * ratio;
        return hsl;
      },
      darken(ratio) {
        const hsl = this.hsl();
        hsl.color[2] -= hsl.color[2] * ratio;
        return hsl;
      },
      saturate(ratio) {
        const hsl = this.hsl();
        hsl.color[1] += hsl.color[1] * ratio;
        return hsl;
      },
      desaturate(ratio) {
        const hsl = this.hsl();
        hsl.color[1] -= hsl.color[1] * ratio;
        return hsl;
      },
      whiten(ratio) {
        const hwb = this.hwb();
        hwb.color[1] += hwb.color[1] * ratio;
        return hwb;
      },
      blacken(ratio) {
        const hwb = this.hwb();
        hwb.color[2] += hwb.color[2] * ratio;
        return hwb;
      },
      grayscale() {
        const rgb = this.rgb().color;
        const value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
        return Color.rgb(value, value, value);
      },
      fade(ratio) {
        return this.alpha(this.valpha - this.valpha * ratio);
      },
      opaquer(ratio) {
        return this.alpha(this.valpha + this.valpha * ratio);
      },
      rotate(degrees) {
        const hsl = this.hsl();
        let hue = hsl.color[0];
        hue = (hue + degrees) % 360;
        hue = hue < 0 ? 360 + hue : hue;
        hsl.color[0] = hue;
        return hsl;
      },
      mix(mixinColor, weight) {
        if (!mixinColor || !mixinColor.rgb) {
          throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
        }
        const color1 = mixinColor.rgb();
        const color2 = this.rgb();
        const p = weight === void 0 ? 0.5 : weight;
        const w = 2 * p - 1;
        const a = color1.alpha() - color2.alpha();
        const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
        const w2 = 1 - w1;
        return Color.rgb(
          w1 * color1.red() + w2 * color2.red(),
          w1 * color1.green() + w2 * color2.green(),
          w1 * color1.blue() + w2 * color2.blue(),
          color1.alpha() * p + color2.alpha() * (1 - p)
        );
      }
    };
    for (const model of Object.keys(convert)) {
      if (skippedModels.includes(model)) {
        continue;
      }
      const { channels } = convert[model];
      Color.prototype[model] = function(...args2) {
        if (this.model === model) {
          return new Color(this);
        }
        if (args2.length > 0) {
          return new Color(args2, model);
        }
        return new Color([...assertArray(convert[this.model][model].raw(this.color)), this.valpha], model);
      };
      Color[model] = function(...args2) {
        let color = args2[0];
        if (typeof color === "number") {
          color = zeroArray(args2, channels);
        }
        return new Color(color, model);
      };
    }
    function roundTo(number, places) {
      return Number(number.toFixed(places));
    }
    function roundToPlace(places) {
      return function(number) {
        return roundTo(number, places);
      };
    }
    function getset(model, channel, modifier) {
      model = Array.isArray(model) ? model : [model];
      for (const m of model) {
        (limiters[m] || (limiters[m] = []))[channel] = modifier;
      }
      model = model[0];
      return function(value) {
        let result;
        if (value !== void 0) {
          if (modifier) {
            value = modifier(value);
          }
          result = this[model]();
          result.color[channel] = value;
          return result;
        }
        result = this[model]().color[channel];
        if (modifier) {
          result = modifier(result);
        }
        return result;
      };
    }
    function maxfn(max2) {
      return function(v) {
        return Math.max(0, Math.min(max2, v));
      };
    }
    function assertArray(value) {
      return Array.isArray(value) ? value : [value];
    }
    function zeroArray(array, length) {
      for (let i2 = 0; i2 < length; i2++) {
        if (typeof array[i2] !== "number") {
          array[i2] = 0;
        }
      }
      return array;
    }
    module2.exports = Color;
  }
});

// node_modules/sharp/lib/input.js
var require_input = __commonJS({
  "node_modules/sharp/lib/input.js"(exports2, module2) {
    "use strict";
    var color = require_color();
    var is = require_is();
    var sharp2 = require_sharp();
    var align = {
      left: "low",
      center: "centre",
      centre: "centre",
      right: "high"
    };
    function _inputOptionsFromObject(obj) {
      const { raw, density, limitInputPixels, ignoreIcc, unlimited, sequentialRead, failOn, failOnError, animated, page, pages, subifd } = obj;
      return [raw, density, limitInputPixels, ignoreIcc, unlimited, sequentialRead, failOn, failOnError, animated, page, pages, subifd].some(is.defined) ? { raw, density, limitInputPixels, ignoreIcc, unlimited, sequentialRead, failOn, failOnError, animated, page, pages, subifd } : void 0;
    }
    function _createInputDescriptor(input, inputOptions, containerOptions) {
      const inputDescriptor = {
        failOn: "warning",
        limitInputPixels: Math.pow(16383, 2),
        ignoreIcc: false,
        unlimited: false,
        sequentialRead: true
      };
      if (is.string(input)) {
        inputDescriptor.file = input;
      } else if (is.buffer(input)) {
        if (input.length === 0) {
          throw Error("Input Buffer is empty");
        }
        inputDescriptor.buffer = input;
      } else if (is.arrayBuffer(input)) {
        if (input.byteLength === 0) {
          throw Error("Input bit Array is empty");
        }
        inputDescriptor.buffer = Buffer.from(input, 0, input.byteLength);
      } else if (is.typedArray(input)) {
        if (input.length === 0) {
          throw Error("Input Bit Array is empty");
        }
        inputDescriptor.buffer = Buffer.from(input.buffer, input.byteOffset, input.byteLength);
      } else if (is.plainObject(input) && !is.defined(inputOptions)) {
        inputOptions = input;
        if (_inputOptionsFromObject(inputOptions)) {
          inputDescriptor.buffer = [];
        }
      } else if (!is.defined(input) && !is.defined(inputOptions) && is.object(containerOptions) && containerOptions.allowStream) {
        inputDescriptor.buffer = [];
      } else {
        throw new Error(`Unsupported input '${input}' of type ${typeof input}${is.defined(inputOptions) ? ` when also providing options of type ${typeof inputOptions}` : ""}`);
      }
      if (is.object(inputOptions)) {
        if (is.defined(inputOptions.failOnError)) {
          if (is.bool(inputOptions.failOnError)) {
            inputDescriptor.failOn = inputOptions.failOnError ? "warning" : "none";
          } else {
            throw is.invalidParameterError("failOnError", "boolean", inputOptions.failOnError);
          }
        }
        if (is.defined(inputOptions.failOn)) {
          if (is.string(inputOptions.failOn) && is.inArray(inputOptions.failOn, ["none", "truncated", "error", "warning"])) {
            inputDescriptor.failOn = inputOptions.failOn;
          } else {
            throw is.invalidParameterError("failOn", "one of: none, truncated, error, warning", inputOptions.failOn);
          }
        }
        if (is.defined(inputOptions.density)) {
          if (is.inRange(inputOptions.density, 1, 1e5)) {
            inputDescriptor.density = inputOptions.density;
          } else {
            throw is.invalidParameterError("density", "number between 1 and 100000", inputOptions.density);
          }
        }
        if (is.defined(inputOptions.ignoreIcc)) {
          if (is.bool(inputOptions.ignoreIcc)) {
            inputDescriptor.ignoreIcc = inputOptions.ignoreIcc;
          } else {
            throw is.invalidParameterError("ignoreIcc", "boolean", inputOptions.ignoreIcc);
          }
        }
        if (is.defined(inputOptions.limitInputPixels)) {
          if (is.bool(inputOptions.limitInputPixels)) {
            inputDescriptor.limitInputPixels = inputOptions.limitInputPixels ? Math.pow(16383, 2) : 0;
          } else if (is.integer(inputOptions.limitInputPixels) && is.inRange(inputOptions.limitInputPixels, 0, Number.MAX_SAFE_INTEGER)) {
            inputDescriptor.limitInputPixels = inputOptions.limitInputPixels;
          } else {
            throw is.invalidParameterError("limitInputPixels", "positive integer", inputOptions.limitInputPixels);
          }
        }
        if (is.defined(inputOptions.unlimited)) {
          if (is.bool(inputOptions.unlimited)) {
            inputDescriptor.unlimited = inputOptions.unlimited;
          } else {
            throw is.invalidParameterError("unlimited", "boolean", inputOptions.unlimited);
          }
        }
        if (is.defined(inputOptions.sequentialRead)) {
          if (is.bool(inputOptions.sequentialRead)) {
            inputDescriptor.sequentialRead = inputOptions.sequentialRead;
          } else {
            throw is.invalidParameterError("sequentialRead", "boolean", inputOptions.sequentialRead);
          }
        }
        if (is.defined(inputOptions.raw)) {
          if (is.object(inputOptions.raw) && is.integer(inputOptions.raw.width) && inputOptions.raw.width > 0 && is.integer(inputOptions.raw.height) && inputOptions.raw.height > 0 && is.integer(inputOptions.raw.channels) && is.inRange(inputOptions.raw.channels, 1, 4)) {
            inputDescriptor.rawWidth = inputOptions.raw.width;
            inputDescriptor.rawHeight = inputOptions.raw.height;
            inputDescriptor.rawChannels = inputOptions.raw.channels;
            inputDescriptor.rawPremultiplied = !!inputOptions.raw.premultiplied;
            switch (input.constructor) {
              case Uint8Array:
              case Uint8ClampedArray:
                inputDescriptor.rawDepth = "uchar";
                break;
              case Int8Array:
                inputDescriptor.rawDepth = "char";
                break;
              case Uint16Array:
                inputDescriptor.rawDepth = "ushort";
                break;
              case Int16Array:
                inputDescriptor.rawDepth = "short";
                break;
              case Uint32Array:
                inputDescriptor.rawDepth = "uint";
                break;
              case Int32Array:
                inputDescriptor.rawDepth = "int";
                break;
              case Float32Array:
                inputDescriptor.rawDepth = "float";
                break;
              case Float64Array:
                inputDescriptor.rawDepth = "double";
                break;
              default:
                inputDescriptor.rawDepth = "uchar";
                break;
            }
          } else {
            throw new Error("Expected width, height and channels for raw pixel input");
          }
        }
        if (is.defined(inputOptions.animated)) {
          if (is.bool(inputOptions.animated)) {
            inputDescriptor.pages = inputOptions.animated ? -1 : 1;
          } else {
            throw is.invalidParameterError("animated", "boolean", inputOptions.animated);
          }
        }
        if (is.defined(inputOptions.pages)) {
          if (is.integer(inputOptions.pages) && is.inRange(inputOptions.pages, -1, 1e5)) {
            inputDescriptor.pages = inputOptions.pages;
          } else {
            throw is.invalidParameterError("pages", "integer between -1 and 100000", inputOptions.pages);
          }
        }
        if (is.defined(inputOptions.page)) {
          if (is.integer(inputOptions.page) && is.inRange(inputOptions.page, 0, 1e5)) {
            inputDescriptor.page = inputOptions.page;
          } else {
            throw is.invalidParameterError("page", "integer between 0 and 100000", inputOptions.page);
          }
        }
        if (is.defined(inputOptions.level)) {
          if (is.integer(inputOptions.level) && is.inRange(inputOptions.level, 0, 256)) {
            inputDescriptor.level = inputOptions.level;
          } else {
            throw is.invalidParameterError("level", "integer between 0 and 256", inputOptions.level);
          }
        }
        if (is.defined(inputOptions.subifd)) {
          if (is.integer(inputOptions.subifd) && is.inRange(inputOptions.subifd, -1, 1e5)) {
            inputDescriptor.subifd = inputOptions.subifd;
          } else {
            throw is.invalidParameterError("subifd", "integer between -1 and 100000", inputOptions.subifd);
          }
        }
        if (is.defined(inputOptions.create)) {
          if (is.object(inputOptions.create) && is.integer(inputOptions.create.width) && inputOptions.create.width > 0 && is.integer(inputOptions.create.height) && inputOptions.create.height > 0 && is.integer(inputOptions.create.channels)) {
            inputDescriptor.createWidth = inputOptions.create.width;
            inputDescriptor.createHeight = inputOptions.create.height;
            inputDescriptor.createChannels = inputOptions.create.channels;
            if (is.defined(inputOptions.create.noise)) {
              if (!is.object(inputOptions.create.noise)) {
                throw new Error("Expected noise to be an object");
              }
              if (!is.inArray(inputOptions.create.noise.type, ["gaussian"])) {
                throw new Error("Only gaussian noise is supported at the moment");
              }
              if (!is.inRange(inputOptions.create.channels, 1, 4)) {
                throw is.invalidParameterError("create.channels", "number between 1 and 4", inputOptions.create.channels);
              }
              inputDescriptor.createNoiseType = inputOptions.create.noise.type;
              if (is.number(inputOptions.create.noise.mean) && is.inRange(inputOptions.create.noise.mean, 0, 1e4)) {
                inputDescriptor.createNoiseMean = inputOptions.create.noise.mean;
              } else {
                throw is.invalidParameterError("create.noise.mean", "number between 0 and 10000", inputOptions.create.noise.mean);
              }
              if (is.number(inputOptions.create.noise.sigma) && is.inRange(inputOptions.create.noise.sigma, 0, 1e4)) {
                inputDescriptor.createNoiseSigma = inputOptions.create.noise.sigma;
              } else {
                throw is.invalidParameterError("create.noise.sigma", "number between 0 and 10000", inputOptions.create.noise.sigma);
              }
            } else if (is.defined(inputOptions.create.background)) {
              if (!is.inRange(inputOptions.create.channels, 3, 4)) {
                throw is.invalidParameterError("create.channels", "number between 3 and 4", inputOptions.create.channels);
              }
              const background = color(inputOptions.create.background);
              inputDescriptor.createBackground = [
                background.red(),
                background.green(),
                background.blue(),
                Math.round(background.alpha() * 255)
              ];
            } else {
              throw new Error("Expected valid noise or background to create a new input image");
            }
            delete inputDescriptor.buffer;
          } else {
            throw new Error("Expected valid width, height and channels to create a new input image");
          }
        }
        if (is.defined(inputOptions.text)) {
          if (is.object(inputOptions.text) && is.string(inputOptions.text.text)) {
            inputDescriptor.textValue = inputOptions.text.text;
            if (is.defined(inputOptions.text.height) && is.defined(inputOptions.text.dpi)) {
              throw new Error("Expected only one of dpi or height");
            }
            if (is.defined(inputOptions.text.font)) {
              if (is.string(inputOptions.text.font)) {
                inputDescriptor.textFont = inputOptions.text.font;
              } else {
                throw is.invalidParameterError("text.font", "string", inputOptions.text.font);
              }
            }
            if (is.defined(inputOptions.text.fontfile)) {
              if (is.string(inputOptions.text.fontfile)) {
                inputDescriptor.textFontfile = inputOptions.text.fontfile;
              } else {
                throw is.invalidParameterError("text.fontfile", "string", inputOptions.text.fontfile);
              }
            }
            if (is.defined(inputOptions.text.width)) {
              if (is.number(inputOptions.text.width)) {
                inputDescriptor.textWidth = inputOptions.text.width;
              } else {
                throw is.invalidParameterError("text.textWidth", "number", inputOptions.text.width);
              }
            }
            if (is.defined(inputOptions.text.height)) {
              if (is.number(inputOptions.text.height)) {
                inputDescriptor.textHeight = inputOptions.text.height;
              } else {
                throw is.invalidParameterError("text.height", "number", inputOptions.text.height);
              }
            }
            if (is.defined(inputOptions.text.align)) {
              if (is.string(inputOptions.text.align) && is.string(this.constructor.align[inputOptions.text.align])) {
                inputDescriptor.textAlign = this.constructor.align[inputOptions.text.align];
              } else {
                throw is.invalidParameterError("text.align", "valid alignment", inputOptions.text.align);
              }
            }
            if (is.defined(inputOptions.text.justify)) {
              if (is.bool(inputOptions.text.justify)) {
                inputDescriptor.textJustify = inputOptions.text.justify;
              } else {
                throw is.invalidParameterError("text.justify", "boolean", inputOptions.text.justify);
              }
            }
            if (is.defined(inputOptions.text.dpi)) {
              if (is.number(inputOptions.text.dpi) && is.inRange(inputOptions.text.dpi, 1, 1e5)) {
                inputDescriptor.textDpi = inputOptions.text.dpi;
              } else {
                throw is.invalidParameterError("text.dpi", "number between 1 and 100000", inputOptions.text.dpi);
              }
            }
            if (is.defined(inputOptions.text.rgba)) {
              if (is.bool(inputOptions.text.rgba)) {
                inputDescriptor.textRgba = inputOptions.text.rgba;
              } else {
                throw is.invalidParameterError("text.rgba", "bool", inputOptions.text.rgba);
              }
            }
            if (is.defined(inputOptions.text.spacing)) {
              if (is.number(inputOptions.text.spacing)) {
                inputDescriptor.textSpacing = inputOptions.text.spacing;
              } else {
                throw is.invalidParameterError("text.spacing", "number", inputOptions.text.spacing);
              }
            }
            if (is.defined(inputOptions.text.wrap)) {
              if (is.string(inputOptions.text.wrap) && is.inArray(inputOptions.text.wrap, ["word", "char", "wordChar", "none"])) {
                inputDescriptor.textWrap = inputOptions.text.wrap;
              } else {
                throw is.invalidParameterError("text.wrap", "one of: word, char, wordChar, none", inputOptions.text.wrap);
              }
            }
            delete inputDescriptor.buffer;
          } else {
            throw new Error("Expected a valid string to create an image with text.");
          }
        }
      } else if (is.defined(inputOptions)) {
        throw new Error("Invalid input options " + inputOptions);
      }
      return inputDescriptor;
    }
    function _write(chunk, encoding, callback) {
      if (Array.isArray(this.options.input.buffer)) {
        if (is.buffer(chunk)) {
          if (this.options.input.buffer.length === 0) {
            this.on("finish", () => {
              this.streamInFinished = true;
            });
          }
          this.options.input.buffer.push(chunk);
          callback();
        } else {
          callback(new Error("Non-Buffer data on Writable Stream"));
        }
      } else {
        callback(new Error("Unexpected data on Writable Stream"));
      }
    }
    function _flattenBufferIn() {
      if (this._isStreamInput()) {
        this.options.input.buffer = Buffer.concat(this.options.input.buffer);
      }
    }
    function _isStreamInput() {
      return Array.isArray(this.options.input.buffer);
    }
    function metadata2(callback) {
      if (is.fn(callback)) {
        if (this._isStreamInput()) {
          this.on("finish", () => {
            this._flattenBufferIn();
            sharp2.metadata(this.options, callback);
          });
        } else {
          sharp2.metadata(this.options, callback);
        }
        return this;
      } else {
        if (this._isStreamInput()) {
          return new Promise((resolve, reject) => {
            const finished = () => {
              this._flattenBufferIn();
              sharp2.metadata(this.options, (err2, metadata3) => {
                if (err2) {
                  reject(err2);
                } else {
                  resolve(metadata3);
                }
              });
            };
            if (this.writableFinished) {
              finished();
            } else {
              this.once("finish", finished);
            }
          });
        } else {
          return new Promise((resolve, reject) => {
            sharp2.metadata(this.options, (err2, metadata3) => {
              if (err2) {
                reject(err2);
              } else {
                resolve(metadata3);
              }
            });
          });
        }
      }
    }
    function stats(callback) {
      if (is.fn(callback)) {
        if (this._isStreamInput()) {
          this.on("finish", () => {
            this._flattenBufferIn();
            sharp2.stats(this.options, callback);
          });
        } else {
          sharp2.stats(this.options, callback);
        }
        return this;
      } else {
        if (this._isStreamInput()) {
          return new Promise((resolve, reject) => {
            this.on("finish", function() {
              this._flattenBufferIn();
              sharp2.stats(this.options, (err2, stats2) => {
                if (err2) {
                  reject(err2);
                } else {
                  resolve(stats2);
                }
              });
            });
          });
        } else {
          return new Promise((resolve, reject) => {
            sharp2.stats(this.options, (err2, stats2) => {
              if (err2) {
                reject(err2);
              } else {
                resolve(stats2);
              }
            });
          });
        }
      }
    }
    module2.exports = function(Sharp) {
      Object.assign(Sharp.prototype, {
        // Private
        _inputOptionsFromObject,
        _createInputDescriptor,
        _write,
        _flattenBufferIn,
        _isStreamInput,
        // Public
        metadata: metadata2,
        stats
      });
      Sharp.align = align;
    };
  }
});

// node_modules/sharp/lib/resize.js
var require_resize = __commonJS({
  "node_modules/sharp/lib/resize.js"(exports2, module2) {
    "use strict";
    var is = require_is();
    var gravity = {
      center: 0,
      centre: 0,
      north: 1,
      east: 2,
      south: 3,
      west: 4,
      northeast: 5,
      southeast: 6,
      southwest: 7,
      northwest: 8
    };
    var position = {
      top: 1,
      right: 2,
      bottom: 3,
      left: 4,
      "right top": 5,
      "right bottom": 6,
      "left bottom": 7,
      "left top": 8
    };
    var extendWith = {
      background: "background",
      copy: "copy",
      repeat: "repeat",
      mirror: "mirror"
    };
    var strategy = {
      entropy: 16,
      attention: 17
    };
    var kernel = {
      nearest: "nearest",
      cubic: "cubic",
      mitchell: "mitchell",
      lanczos2: "lanczos2",
      lanczos3: "lanczos3"
    };
    var fit = {
      contain: "contain",
      cover: "cover",
      fill: "fill",
      inside: "inside",
      outside: "outside"
    };
    var mapFitToCanvas = {
      contain: "embed",
      cover: "crop",
      fill: "ignore_aspect",
      inside: "max",
      outside: "min"
    };
    function isRotationExpected(options) {
      return options.angle % 360 !== 0 || options.useExifOrientation === true || options.rotationAngle !== 0;
    }
    function isResizeExpected(options) {
      return options.width !== -1 || options.height !== -1;
    }
    function resize(widthOrOptions, height, options) {
      if (isResizeExpected(this.options)) {
        this.options.debuglog("ignoring previous resize options");
      }
      if (is.defined(widthOrOptions)) {
        if (is.object(widthOrOptions) && !is.defined(options)) {
          options = widthOrOptions;
        } else if (is.integer(widthOrOptions) && widthOrOptions > 0) {
          this.options.width = widthOrOptions;
        } else {
          throw is.invalidParameterError("width", "positive integer", widthOrOptions);
        }
      } else {
        this.options.width = -1;
      }
      if (is.defined(height)) {
        if (is.integer(height) && height > 0) {
          this.options.height = height;
        } else {
          throw is.invalidParameterError("height", "positive integer", height);
        }
      } else {
        this.options.height = -1;
      }
      if (is.object(options)) {
        if (is.defined(options.width)) {
          if (is.integer(options.width) && options.width > 0) {
            this.options.width = options.width;
          } else {
            throw is.invalidParameterError("width", "positive integer", options.width);
          }
        }
        if (is.defined(options.height)) {
          if (is.integer(options.height) && options.height > 0) {
            this.options.height = options.height;
          } else {
            throw is.invalidParameterError("height", "positive integer", options.height);
          }
        }
        if (is.defined(options.fit)) {
          const canvas = mapFitToCanvas[options.fit];
          if (is.string(canvas)) {
            this.options.canvas = canvas;
          } else {
            throw is.invalidParameterError("fit", "valid fit", options.fit);
          }
        }
        if (is.defined(options.position)) {
          const pos = is.integer(options.position) ? options.position : strategy[options.position] || position[options.position] || gravity[options.position];
          if (is.integer(pos) && (is.inRange(pos, 0, 8) || is.inRange(pos, 16, 17))) {
            this.options.position = pos;
          } else {
            throw is.invalidParameterError("position", "valid position/gravity/strategy", options.position);
          }
        }
        this._setBackgroundColourOption("resizeBackground", options.background);
        if (is.defined(options.kernel)) {
          if (is.string(kernel[options.kernel])) {
            this.options.kernel = kernel[options.kernel];
          } else {
            throw is.invalidParameterError("kernel", "valid kernel name", options.kernel);
          }
        }
        if (is.defined(options.withoutEnlargement)) {
          this._setBooleanOption("withoutEnlargement", options.withoutEnlargement);
        }
        if (is.defined(options.withoutReduction)) {
          this._setBooleanOption("withoutReduction", options.withoutReduction);
        }
        if (is.defined(options.fastShrinkOnLoad)) {
          this._setBooleanOption("fastShrinkOnLoad", options.fastShrinkOnLoad);
        }
      }
      if (isRotationExpected(this.options) && isResizeExpected(this.options)) {
        this.options.rotateBeforePreExtract = true;
      }
      return this;
    }
    function extend(extend2) {
      if (is.integer(extend2) && extend2 > 0) {
        this.options.extendTop = extend2;
        this.options.extendBottom = extend2;
        this.options.extendLeft = extend2;
        this.options.extendRight = extend2;
      } else if (is.object(extend2)) {
        if (is.defined(extend2.top)) {
          if (is.integer(extend2.top) && extend2.top >= 0) {
            this.options.extendTop = extend2.top;
          } else {
            throw is.invalidParameterError("top", "positive integer", extend2.top);
          }
        }
        if (is.defined(extend2.bottom)) {
          if (is.integer(extend2.bottom) && extend2.bottom >= 0) {
            this.options.extendBottom = extend2.bottom;
          } else {
            throw is.invalidParameterError("bottom", "positive integer", extend2.bottom);
          }
        }
        if (is.defined(extend2.left)) {
          if (is.integer(extend2.left) && extend2.left >= 0) {
            this.options.extendLeft = extend2.left;
          } else {
            throw is.invalidParameterError("left", "positive integer", extend2.left);
          }
        }
        if (is.defined(extend2.right)) {
          if (is.integer(extend2.right) && extend2.right >= 0) {
            this.options.extendRight = extend2.right;
          } else {
            throw is.invalidParameterError("right", "positive integer", extend2.right);
          }
        }
        this._setBackgroundColourOption("extendBackground", extend2.background);
        if (is.defined(extend2.extendWith)) {
          if (is.string(extendWith[extend2.extendWith])) {
            this.options.extendWith = extendWith[extend2.extendWith];
          } else {
            throw is.invalidParameterError("extendWith", "one of: background, copy, repeat, mirror", extend2.extendWith);
          }
        }
      } else {
        throw is.invalidParameterError("extend", "integer or object", extend2);
      }
      return this;
    }
    function extract(options) {
      const suffix = isResizeExpected(this.options) || this.options.widthPre !== -1 ? "Post" : "Pre";
      if (this.options[`width${suffix}`] !== -1) {
        this.options.debuglog("ignoring previous extract options");
      }
      ["left", "top", "width", "height"].forEach(function(name2) {
        const value = options[name2];
        if (is.integer(value) && value >= 0) {
          this.options[name2 + (name2 === "left" || name2 === "top" ? "Offset" : "") + suffix] = value;
        } else {
          throw is.invalidParameterError(name2, "integer", value);
        }
      }, this);
      if (isRotationExpected(this.options) && !isResizeExpected(this.options)) {
        if (this.options.widthPre === -1 || this.options.widthPost === -1) {
          this.options.rotateBeforePreExtract = true;
        }
      }
      return this;
    }
    function trim(trim2) {
      if (!is.defined(trim2)) {
        this.options.trimThreshold = 10;
      } else if (is.string(trim2)) {
        this._setBackgroundColourOption("trimBackground", trim2);
        this.options.trimThreshold = 10;
      } else if (is.number(trim2)) {
        if (trim2 >= 0) {
          this.options.trimThreshold = trim2;
        } else {
          throw is.invalidParameterError("threshold", "positive number", trim2);
        }
      } else if (is.object(trim2)) {
        this._setBackgroundColourOption("trimBackground", trim2.background);
        if (!is.defined(trim2.threshold)) {
          this.options.trimThreshold = 10;
        } else if (is.number(trim2.threshold) && trim2.threshold >= 0) {
          this.options.trimThreshold = trim2.threshold;
        } else {
          throw is.invalidParameterError("threshold", "positive number", trim2);
        }
      } else {
        throw is.invalidParameterError("trim", "string, number or object", trim2);
      }
      if (isRotationExpected(this.options)) {
        this.options.rotateBeforePreExtract = true;
      }
      return this;
    }
    module2.exports = function(Sharp) {
      Object.assign(Sharp.prototype, {
        resize,
        extend,
        extract,
        trim
      });
      Sharp.gravity = gravity;
      Sharp.strategy = strategy;
      Sharp.kernel = kernel;
      Sharp.fit = fit;
      Sharp.position = position;
    };
  }
});

// node_modules/sharp/lib/composite.js
var require_composite = __commonJS({
  "node_modules/sharp/lib/composite.js"(exports2, module2) {
    "use strict";
    var is = require_is();
    var blend = {
      clear: "clear",
      source: "source",
      over: "over",
      in: "in",
      out: "out",
      atop: "atop",
      dest: "dest",
      "dest-over": "dest-over",
      "dest-in": "dest-in",
      "dest-out": "dest-out",
      "dest-atop": "dest-atop",
      xor: "xor",
      add: "add",
      saturate: "saturate",
      multiply: "multiply",
      screen: "screen",
      overlay: "overlay",
      darken: "darken",
      lighten: "lighten",
      "colour-dodge": "colour-dodge",
      "color-dodge": "colour-dodge",
      "colour-burn": "colour-burn",
      "color-burn": "colour-burn",
      "hard-light": "hard-light",
      "soft-light": "soft-light",
      difference: "difference",
      exclusion: "exclusion"
    };
    function composite(images) {
      if (!Array.isArray(images)) {
        throw is.invalidParameterError("images to composite", "array", images);
      }
      this.options.composite = images.map((image) => {
        if (!is.object(image)) {
          throw is.invalidParameterError("image to composite", "object", image);
        }
        const inputOptions = this._inputOptionsFromObject(image);
        const composite2 = {
          input: this._createInputDescriptor(image.input, inputOptions, { allowStream: false }),
          blend: "over",
          tile: false,
          left: 0,
          top: 0,
          hasOffset: false,
          gravity: 0,
          premultiplied: false
        };
        if (is.defined(image.blend)) {
          if (is.string(blend[image.blend])) {
            composite2.blend = blend[image.blend];
          } else {
            throw is.invalidParameterError("blend", "valid blend name", image.blend);
          }
        }
        if (is.defined(image.tile)) {
          if (is.bool(image.tile)) {
            composite2.tile = image.tile;
          } else {
            throw is.invalidParameterError("tile", "boolean", image.tile);
          }
        }
        if (is.defined(image.left)) {
          if (is.integer(image.left)) {
            composite2.left = image.left;
          } else {
            throw is.invalidParameterError("left", "integer", image.left);
          }
        }
        if (is.defined(image.top)) {
          if (is.integer(image.top)) {
            composite2.top = image.top;
          } else {
            throw is.invalidParameterError("top", "integer", image.top);
          }
        }
        if (is.defined(image.top) !== is.defined(image.left)) {
          throw new Error("Expected both left and top to be set");
        } else {
          composite2.hasOffset = is.integer(image.top) && is.integer(image.left);
        }
        if (is.defined(image.gravity)) {
          if (is.integer(image.gravity) && is.inRange(image.gravity, 0, 8)) {
            composite2.gravity = image.gravity;
          } else if (is.string(image.gravity) && is.integer(this.constructor.gravity[image.gravity])) {
            composite2.gravity = this.constructor.gravity[image.gravity];
          } else {
            throw is.invalidParameterError("gravity", "valid gravity", image.gravity);
          }
        }
        if (is.defined(image.premultiplied)) {
          if (is.bool(image.premultiplied)) {
            composite2.premultiplied = image.premultiplied;
          } else {
            throw is.invalidParameterError("premultiplied", "boolean", image.premultiplied);
          }
        }
        return composite2;
      });
      return this;
    }
    module2.exports = function(Sharp) {
      Sharp.prototype.composite = composite;
      Sharp.blend = blend;
    };
  }
});

// node_modules/sharp/lib/operation.js
var require_operation = __commonJS({
  "node_modules/sharp/lib/operation.js"(exports2, module2) {
    "use strict";
    var color = require_color();
    var is = require_is();
    function rotate(angle, options) {
      if (this.options.useExifOrientation || this.options.angle || this.options.rotationAngle) {
        this.options.debuglog("ignoring previous rotate options");
      }
      if (!is.defined(angle)) {
        this.options.useExifOrientation = true;
      } else if (is.integer(angle) && !(angle % 90)) {
        this.options.angle = angle;
      } else if (is.number(angle)) {
        this.options.rotationAngle = angle;
        if (is.object(options) && options.background) {
          const backgroundColour = color(options.background);
          this.options.rotationBackground = [
            backgroundColour.red(),
            backgroundColour.green(),
            backgroundColour.blue(),
            Math.round(backgroundColour.alpha() * 255)
          ];
        }
      } else {
        throw is.invalidParameterError("angle", "numeric", angle);
      }
      return this;
    }
    function flip(flip2) {
      this.options.flip = is.bool(flip2) ? flip2 : true;
      return this;
    }
    function flop(flop2) {
      this.options.flop = is.bool(flop2) ? flop2 : true;
      return this;
    }
    function affine(matrix, options) {
      const flatMatrix = [].concat(...matrix);
      if (flatMatrix.length === 4 && flatMatrix.every(is.number)) {
        this.options.affineMatrix = flatMatrix;
      } else {
        throw is.invalidParameterError("matrix", "1x4 or 2x2 array", matrix);
      }
      if (is.defined(options)) {
        if (is.object(options)) {
          this._setBackgroundColourOption("affineBackground", options.background);
          if (is.defined(options.idx)) {
            if (is.number(options.idx)) {
              this.options.affineIdx = options.idx;
            } else {
              throw is.invalidParameterError("options.idx", "number", options.idx);
            }
          }
          if (is.defined(options.idy)) {
            if (is.number(options.idy)) {
              this.options.affineIdy = options.idy;
            } else {
              throw is.invalidParameterError("options.idy", "number", options.idy);
            }
          }
          if (is.defined(options.odx)) {
            if (is.number(options.odx)) {
              this.options.affineOdx = options.odx;
            } else {
              throw is.invalidParameterError("options.odx", "number", options.odx);
            }
          }
          if (is.defined(options.ody)) {
            if (is.number(options.ody)) {
              this.options.affineOdy = options.ody;
            } else {
              throw is.invalidParameterError("options.ody", "number", options.ody);
            }
          }
          if (is.defined(options.interpolator)) {
            if (is.inArray(options.interpolator, Object.values(this.constructor.interpolators))) {
              this.options.affineInterpolator = options.interpolator;
            } else {
              throw is.invalidParameterError("options.interpolator", "valid interpolator name", options.interpolator);
            }
          }
        } else {
          throw is.invalidParameterError("options", "object", options);
        }
      }
      return this;
    }
    function sharpen(options, flat, jagged) {
      if (!is.defined(options)) {
        this.options.sharpenSigma = -1;
      } else if (is.bool(options)) {
        this.options.sharpenSigma = options ? -1 : 0;
      } else if (is.number(options) && is.inRange(options, 0.01, 1e4)) {
        this.options.sharpenSigma = options;
        if (is.defined(flat)) {
          if (is.number(flat) && is.inRange(flat, 0, 1e4)) {
            this.options.sharpenM1 = flat;
          } else {
            throw is.invalidParameterError("flat", "number between 0 and 10000", flat);
          }
        }
        if (is.defined(jagged)) {
          if (is.number(jagged) && is.inRange(jagged, 0, 1e4)) {
            this.options.sharpenM2 = jagged;
          } else {
            throw is.invalidParameterError("jagged", "number between 0 and 10000", jagged);
          }
        }
      } else if (is.plainObject(options)) {
        if (is.number(options.sigma) && is.inRange(options.sigma, 1e-6, 10)) {
          this.options.sharpenSigma = options.sigma;
        } else {
          throw is.invalidParameterError("options.sigma", "number between 0.000001 and 10", options.sigma);
        }
        if (is.defined(options.m1)) {
          if (is.number(options.m1) && is.inRange(options.m1, 0, 1e6)) {
            this.options.sharpenM1 = options.m1;
          } else {
            throw is.invalidParameterError("options.m1", "number between 0 and 1000000", options.m1);
          }
        }
        if (is.defined(options.m2)) {
          if (is.number(options.m2) && is.inRange(options.m2, 0, 1e6)) {
            this.options.sharpenM2 = options.m2;
          } else {
            throw is.invalidParameterError("options.m2", "number between 0 and 1000000", options.m2);
          }
        }
        if (is.defined(options.x1)) {
          if (is.number(options.x1) && is.inRange(options.x1, 0, 1e6)) {
            this.options.sharpenX1 = options.x1;
          } else {
            throw is.invalidParameterError("options.x1", "number between 0 and 1000000", options.x1);
          }
        }
        if (is.defined(options.y2)) {
          if (is.number(options.y2) && is.inRange(options.y2, 0, 1e6)) {
            this.options.sharpenY2 = options.y2;
          } else {
            throw is.invalidParameterError("options.y2", "number between 0 and 1000000", options.y2);
          }
        }
        if (is.defined(options.y3)) {
          if (is.number(options.y3) && is.inRange(options.y3, 0, 1e6)) {
            this.options.sharpenY3 = options.y3;
          } else {
            throw is.invalidParameterError("options.y3", "number between 0 and 1000000", options.y3);
          }
        }
      } else {
        throw is.invalidParameterError("sigma", "number between 0.01 and 10000", options);
      }
      return this;
    }
    function median(size) {
      if (!is.defined(size)) {
        this.options.medianSize = 3;
      } else if (is.integer(size) && is.inRange(size, 1, 1e3)) {
        this.options.medianSize = size;
      } else {
        throw is.invalidParameterError("size", "integer between 1 and 1000", size);
      }
      return this;
    }
    function blur(sigma) {
      if (!is.defined(sigma)) {
        this.options.blurSigma = -1;
      } else if (is.bool(sigma)) {
        this.options.blurSigma = sigma ? -1 : 0;
      } else if (is.number(sigma) && is.inRange(sigma, 0.3, 1e3)) {
        this.options.blurSigma = sigma;
      } else {
        throw is.invalidParameterError("sigma", "number between 0.3 and 1000", sigma);
      }
      return this;
    }
    function flatten(options) {
      this.options.flatten = is.bool(options) ? options : true;
      if (is.object(options)) {
        this._setBackgroundColourOption("flattenBackground", options.background);
      }
      return this;
    }
    function unflatten() {
      this.options.unflatten = true;
      return this;
    }
    function gamma(gamma2, gammaOut) {
      if (!is.defined(gamma2)) {
        this.options.gamma = 2.2;
      } else if (is.number(gamma2) && is.inRange(gamma2, 1, 3)) {
        this.options.gamma = gamma2;
      } else {
        throw is.invalidParameterError("gamma", "number between 1.0 and 3.0", gamma2);
      }
      if (!is.defined(gammaOut)) {
        this.options.gammaOut = this.options.gamma;
      } else if (is.number(gammaOut) && is.inRange(gammaOut, 1, 3)) {
        this.options.gammaOut = gammaOut;
      } else {
        throw is.invalidParameterError("gammaOut", "number between 1.0 and 3.0", gammaOut);
      }
      return this;
    }
    function negate(options) {
      this.options.negate = is.bool(options) ? options : true;
      if (is.plainObject(options) && "alpha" in options) {
        if (!is.bool(options.alpha)) {
          throw is.invalidParameterError("alpha", "should be boolean value", options.alpha);
        } else {
          this.options.negateAlpha = options.alpha;
        }
      }
      return this;
    }
    function normalise(options) {
      if (is.plainObject(options)) {
        if (is.defined(options.lower)) {
          if (is.number(options.lower) && is.inRange(options.lower, 0, 99)) {
            this.options.normaliseLower = options.lower;
          } else {
            throw is.invalidParameterError("lower", "number between 0 and 99", options.lower);
          }
        }
        if (is.defined(options.upper)) {
          if (is.number(options.upper) && is.inRange(options.upper, 1, 100)) {
            this.options.normaliseUpper = options.upper;
          } else {
            throw is.invalidParameterError("upper", "number between 1 and 100", options.upper);
          }
        }
      }
      if (this.options.normaliseLower >= this.options.normaliseUpper) {
        throw is.invalidParameterError(
          "range",
          "lower to be less than upper",
          `${this.options.normaliseLower} >= ${this.options.normaliseUpper}`
        );
      }
      this.options.normalise = true;
      return this;
    }
    function normalize(options) {
      return this.normalise(options);
    }
    function clahe(options) {
      if (is.plainObject(options)) {
        if (is.integer(options.width) && options.width > 0) {
          this.options.claheWidth = options.width;
        } else {
          throw is.invalidParameterError("width", "integer greater than zero", options.width);
        }
        if (is.integer(options.height) && options.height > 0) {
          this.options.claheHeight = options.height;
        } else {
          throw is.invalidParameterError("height", "integer greater than zero", options.height);
        }
        if (is.defined(options.maxSlope)) {
          if (is.integer(options.maxSlope) && is.inRange(options.maxSlope, 0, 100)) {
            this.options.claheMaxSlope = options.maxSlope;
          } else {
            throw is.invalidParameterError("maxSlope", "integer between 0 and 100", options.maxSlope);
          }
        }
      } else {
        throw is.invalidParameterError("options", "plain object", options);
      }
      return this;
    }
    function convolve(kernel) {
      if (!is.object(kernel) || !Array.isArray(kernel.kernel) || !is.integer(kernel.width) || !is.integer(kernel.height) || !is.inRange(kernel.width, 3, 1001) || !is.inRange(kernel.height, 3, 1001) || kernel.height * kernel.width !== kernel.kernel.length) {
        throw new Error("Invalid convolution kernel");
      }
      if (!is.integer(kernel.scale)) {
        kernel.scale = kernel.kernel.reduce(function(a, b) {
          return a + b;
        }, 0);
      }
      if (kernel.scale < 1) {
        kernel.scale = 1;
      }
      if (!is.integer(kernel.offset)) {
        kernel.offset = 0;
      }
      this.options.convKernel = kernel;
      return this;
    }
    function threshold(threshold2, options) {
      if (!is.defined(threshold2)) {
        this.options.threshold = 128;
      } else if (is.bool(threshold2)) {
        this.options.threshold = threshold2 ? 128 : 0;
      } else if (is.integer(threshold2) && is.inRange(threshold2, 0, 255)) {
        this.options.threshold = threshold2;
      } else {
        throw is.invalidParameterError("threshold", "integer between 0 and 255", threshold2);
      }
      if (!is.object(options) || options.greyscale === true || options.grayscale === true) {
        this.options.thresholdGrayscale = true;
      } else {
        this.options.thresholdGrayscale = false;
      }
      return this;
    }
    function boolean(operand, operator, options) {
      this.options.boolean = this._createInputDescriptor(operand, options);
      if (is.string(operator) && is.inArray(operator, ["and", "or", "eor"])) {
        this.options.booleanOp = operator;
      } else {
        throw is.invalidParameterError("operator", "one of: and, or, eor", operator);
      }
      return this;
    }
    function linear(a, b) {
      if (!is.defined(a) && is.number(b)) {
        a = 1;
      } else if (is.number(a) && !is.defined(b)) {
        b = 0;
      }
      if (!is.defined(a)) {
        this.options.linearA = [];
      } else if (is.number(a)) {
        this.options.linearA = [a];
      } else if (Array.isArray(a) && a.length && a.every(is.number)) {
        this.options.linearA = a;
      } else {
        throw is.invalidParameterError("a", "number or array of numbers", a);
      }
      if (!is.defined(b)) {
        this.options.linearB = [];
      } else if (is.number(b)) {
        this.options.linearB = [b];
      } else if (Array.isArray(b) && b.length && b.every(is.number)) {
        this.options.linearB = b;
      } else {
        throw is.invalidParameterError("b", "number or array of numbers", b);
      }
      if (this.options.linearA.length !== this.options.linearB.length) {
        throw new Error("Expected a and b to be arrays of the same length");
      }
      return this;
    }
    function recomb(inputMatrix) {
      if (!Array.isArray(inputMatrix) || inputMatrix.length !== 3 || inputMatrix[0].length !== 3 || inputMatrix[1].length !== 3 || inputMatrix[2].length !== 3) {
        throw new Error("Invalid recombination matrix");
      }
      this.options.recombMatrix = [
        inputMatrix[0][0],
        inputMatrix[0][1],
        inputMatrix[0][2],
        inputMatrix[1][0],
        inputMatrix[1][1],
        inputMatrix[1][2],
        inputMatrix[2][0],
        inputMatrix[2][1],
        inputMatrix[2][2]
      ].map(Number);
      return this;
    }
    function modulate(options) {
      if (!is.plainObject(options)) {
        throw is.invalidParameterError("options", "plain object", options);
      }
      if ("brightness" in options) {
        if (is.number(options.brightness) && options.brightness >= 0) {
          this.options.brightness = options.brightness;
        } else {
          throw is.invalidParameterError("brightness", "number above zero", options.brightness);
        }
      }
      if ("saturation" in options) {
        if (is.number(options.saturation) && options.saturation >= 0) {
          this.options.saturation = options.saturation;
        } else {
          throw is.invalidParameterError("saturation", "number above zero", options.saturation);
        }
      }
      if ("hue" in options) {
        if (is.integer(options.hue)) {
          this.options.hue = options.hue % 360;
        } else {
          throw is.invalidParameterError("hue", "number", options.hue);
        }
      }
      if ("lightness" in options) {
        if (is.number(options.lightness)) {
          this.options.lightness = options.lightness;
        } else {
          throw is.invalidParameterError("lightness", "number", options.lightness);
        }
      }
      return this;
    }
    module2.exports = function(Sharp) {
      Object.assign(Sharp.prototype, {
        rotate,
        flip,
        flop,
        affine,
        sharpen,
        median,
        blur,
        flatten,
        unflatten,
        gamma,
        negate,
        normalise,
        normalize,
        clahe,
        convolve,
        threshold,
        boolean,
        linear,
        recomb,
        modulate
      });
    };
  }
});

// node_modules/sharp/lib/colour.js
var require_colour = __commonJS({
  "node_modules/sharp/lib/colour.js"(exports2, module2) {
    "use strict";
    var color = require_color();
    var is = require_is();
    var colourspace = {
      multiband: "multiband",
      "b-w": "b-w",
      bw: "b-w",
      cmyk: "cmyk",
      srgb: "srgb"
    };
    function tint(rgb) {
      const colour = color(rgb);
      this.options.tintA = colour.a();
      this.options.tintB = colour.b();
      return this;
    }
    function greyscale(greyscale2) {
      this.options.greyscale = is.bool(greyscale2) ? greyscale2 : true;
      return this;
    }
    function grayscale(grayscale2) {
      return this.greyscale(grayscale2);
    }
    function pipelineColourspace(colourspace2) {
      if (!is.string(colourspace2)) {
        throw is.invalidParameterError("colourspace", "string", colourspace2);
      }
      this.options.colourspaceInput = colourspace2;
      return this;
    }
    function pipelineColorspace(colorspace) {
      return this.pipelineColourspace(colorspace);
    }
    function toColourspace(colourspace2) {
      if (!is.string(colourspace2)) {
        throw is.invalidParameterError("colourspace", "string", colourspace2);
      }
      this.options.colourspace = colourspace2;
      return this;
    }
    function toColorspace(colorspace) {
      return this.toColourspace(colorspace);
    }
    function _setBackgroundColourOption(key, value) {
      if (is.defined(value)) {
        if (is.object(value) || is.string(value)) {
          const colour = color(value);
          this.options[key] = [
            colour.red(),
            colour.green(),
            colour.blue(),
            Math.round(colour.alpha() * 255)
          ];
        } else {
          throw is.invalidParameterError("background", "object or string", value);
        }
      }
    }
    module2.exports = function(Sharp) {
      Object.assign(Sharp.prototype, {
        // Public
        tint,
        greyscale,
        grayscale,
        pipelineColourspace,
        pipelineColorspace,
        toColourspace,
        toColorspace,
        // Private
        _setBackgroundColourOption
      });
      Sharp.colourspace = colourspace;
      Sharp.colorspace = colourspace;
    };
  }
});

// node_modules/sharp/lib/channel.js
var require_channel = __commonJS({
  "node_modules/sharp/lib/channel.js"(exports2, module2) {
    "use strict";
    var is = require_is();
    var bool = {
      and: "and",
      or: "or",
      eor: "eor"
    };
    function removeAlpha() {
      this.options.removeAlpha = true;
      return this;
    }
    function ensureAlpha(alpha) {
      if (is.defined(alpha)) {
        if (is.number(alpha) && is.inRange(alpha, 0, 1)) {
          this.options.ensureAlpha = alpha;
        } else {
          throw is.invalidParameterError("alpha", "number between 0 and 1", alpha);
        }
      } else {
        this.options.ensureAlpha = 1;
      }
      return this;
    }
    function extractChannel(channel) {
      const channelMap = { red: 0, green: 1, blue: 2, alpha: 3 };
      if (Object.keys(channelMap).includes(channel)) {
        channel = channelMap[channel];
      }
      if (is.integer(channel) && is.inRange(channel, 0, 4)) {
        this.options.extractChannel = channel;
      } else {
        throw is.invalidParameterError("channel", "integer or one of: red, green, blue, alpha", channel);
      }
      return this;
    }
    function joinChannel(images, options) {
      if (Array.isArray(images)) {
        images.forEach(function(image) {
          this.options.joinChannelIn.push(this._createInputDescriptor(image, options));
        }, this);
      } else {
        this.options.joinChannelIn.push(this._createInputDescriptor(images, options));
      }
      return this;
    }
    function bandbool(boolOp) {
      if (is.string(boolOp) && is.inArray(boolOp, ["and", "or", "eor"])) {
        this.options.bandBoolOp = boolOp;
      } else {
        throw is.invalidParameterError("boolOp", "one of: and, or, eor", boolOp);
      }
      return this;
    }
    module2.exports = function(Sharp) {
      Object.assign(Sharp.prototype, {
        // Public instance functions
        removeAlpha,
        ensureAlpha,
        extractChannel,
        joinChannel,
        bandbool
      });
      Sharp.bool = bool;
    };
  }
});

// node_modules/sharp/lib/output.js
var require_output = __commonJS({
  "node_modules/sharp/lib/output.js"(exports2, module2) {
    "use strict";
    var path5 = require("path");
    var is = require_is();
    var sharp2 = require_sharp();
    var formats = /* @__PURE__ */ new Map([
      ["heic", "heif"],
      ["heif", "heif"],
      ["avif", "avif"],
      ["jpeg", "jpeg"],
      ["jpg", "jpeg"],
      ["jpe", "jpeg"],
      ["tile", "tile"],
      ["dz", "tile"],
      ["png", "png"],
      ["raw", "raw"],
      ["tiff", "tiff"],
      ["tif", "tiff"],
      ["webp", "webp"],
      ["gif", "gif"],
      ["jp2", "jp2"],
      ["jpx", "jp2"],
      ["j2k", "jp2"],
      ["j2c", "jp2"],
      ["jxl", "jxl"]
    ]);
    var jp2Regex = /\.(jp[2x]|j2[kc])$/i;
    var errJp2Save = () => new Error("JP2 output requires libvips with support for OpenJPEG");
    var bitdepthFromColourCount = (colours) => 1 << 31 - Math.clz32(Math.ceil(Math.log2(colours)));
    function toFile(fileOut, callback) {
      let err2;
      if (!is.string(fileOut)) {
        err2 = new Error("Missing output file path");
      } else if (is.string(this.options.input.file) && path5.resolve(this.options.input.file) === path5.resolve(fileOut)) {
        err2 = new Error("Cannot use same file for input and output");
      } else if (jp2Regex.test(path5.extname(fileOut)) && !this.constructor.format.jp2k.output.file) {
        err2 = errJp2Save();
      }
      if (err2) {
        if (is.fn(callback)) {
          callback(err2);
        } else {
          return Promise.reject(err2);
        }
      } else {
        this.options.fileOut = fileOut;
        return this._pipeline(callback);
      }
      return this;
    }
    function toBuffer(options, callback) {
      if (is.object(options)) {
        this._setBooleanOption("resolveWithObject", options.resolveWithObject);
      } else if (this.options.resolveWithObject) {
        this.options.resolveWithObject = false;
      }
      this.options.fileOut = "";
      return this._pipeline(is.fn(options) ? options : callback);
    }
    function withMetadata(options) {
      this.options.withMetadata = is.bool(options) ? options : true;
      if (is.object(options)) {
        if (is.defined(options.orientation)) {
          if (is.integer(options.orientation) && is.inRange(options.orientation, 1, 8)) {
            this.options.withMetadataOrientation = options.orientation;
          } else {
            throw is.invalidParameterError("orientation", "integer between 1 and 8", options.orientation);
          }
        }
        if (is.defined(options.density)) {
          if (is.number(options.density) && options.density > 0) {
            this.options.withMetadataDensity = options.density;
          } else {
            throw is.invalidParameterError("density", "positive number", options.density);
          }
        }
        if (is.defined(options.icc)) {
          if (is.string(options.icc)) {
            this.options.withMetadataIcc = options.icc;
          } else {
            throw is.invalidParameterError("icc", "string filesystem path to ICC profile", options.icc);
          }
        }
        if (is.defined(options.exif)) {
          if (is.object(options.exif)) {
            for (const [ifd, entries] of Object.entries(options.exif)) {
              if (is.object(entries)) {
                for (const [k, v] of Object.entries(entries)) {
                  if (is.string(v)) {
                    this.options.withMetadataStrs[`exif-${ifd.toLowerCase()}-${k}`] = v;
                  } else {
                    throw is.invalidParameterError(`exif.${ifd}.${k}`, "string", v);
                  }
                }
              } else {
                throw is.invalidParameterError(`exif.${ifd}`, "object", entries);
              }
            }
          } else {
            throw is.invalidParameterError("exif", "object", options.exif);
          }
        }
      }
      return this;
    }
    function toFormat(format, options) {
      const actualFormat = formats.get((is.object(format) && is.string(format.id) ? format.id : format).toLowerCase());
      if (!actualFormat) {
        throw is.invalidParameterError("format", `one of: ${[...formats.keys()].join(", ")}`, format);
      }
      return this[actualFormat](options);
    }
    function jpeg(options) {
      if (is.object(options)) {
        if (is.defined(options.quality)) {
          if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
            this.options.jpegQuality = options.quality;
          } else {
            throw is.invalidParameterError("quality", "integer between 1 and 100", options.quality);
          }
        }
        if (is.defined(options.progressive)) {
          this._setBooleanOption("jpegProgressive", options.progressive);
        }
        if (is.defined(options.chromaSubsampling)) {
          if (is.string(options.chromaSubsampling) && is.inArray(options.chromaSubsampling, ["4:2:0", "4:4:4"])) {
            this.options.jpegChromaSubsampling = options.chromaSubsampling;
          } else {
            throw is.invalidParameterError("chromaSubsampling", "one of: 4:2:0, 4:4:4", options.chromaSubsampling);
          }
        }
        const optimiseCoding = is.bool(options.optimizeCoding) ? options.optimizeCoding : options.optimiseCoding;
        if (is.defined(optimiseCoding)) {
          this._setBooleanOption("jpegOptimiseCoding", optimiseCoding);
        }
        if (is.defined(options.mozjpeg)) {
          if (is.bool(options.mozjpeg)) {
            if (options.mozjpeg) {
              this.options.jpegTrellisQuantisation = true;
              this.options.jpegOvershootDeringing = true;
              this.options.jpegOptimiseScans = true;
              this.options.jpegProgressive = true;
              this.options.jpegQuantisationTable = 3;
            }
          } else {
            throw is.invalidParameterError("mozjpeg", "boolean", options.mozjpeg);
          }
        }
        const trellisQuantisation = is.bool(options.trellisQuantization) ? options.trellisQuantization : options.trellisQuantisation;
        if (is.defined(trellisQuantisation)) {
          this._setBooleanOption("jpegTrellisQuantisation", trellisQuantisation);
        }
        if (is.defined(options.overshootDeringing)) {
          this._setBooleanOption("jpegOvershootDeringing", options.overshootDeringing);
        }
        const optimiseScans = is.bool(options.optimizeScans) ? options.optimizeScans : options.optimiseScans;
        if (is.defined(optimiseScans)) {
          this._setBooleanOption("jpegOptimiseScans", optimiseScans);
          if (optimiseScans) {
            this.options.jpegProgressive = true;
          }
        }
        const quantisationTable = is.number(options.quantizationTable) ? options.quantizationTable : options.quantisationTable;
        if (is.defined(quantisationTable)) {
          if (is.integer(quantisationTable) && is.inRange(quantisationTable, 0, 8)) {
            this.options.jpegQuantisationTable = quantisationTable;
          } else {
            throw is.invalidParameterError("quantisationTable", "integer between 0 and 8", quantisationTable);
          }
        }
      }
      return this._updateFormatOut("jpeg", options);
    }
    function png(options) {
      if (is.object(options)) {
        if (is.defined(options.progressive)) {
          this._setBooleanOption("pngProgressive", options.progressive);
        }
        if (is.defined(options.compressionLevel)) {
          if (is.integer(options.compressionLevel) && is.inRange(options.compressionLevel, 0, 9)) {
            this.options.pngCompressionLevel = options.compressionLevel;
          } else {
            throw is.invalidParameterError("compressionLevel", "integer between 0 and 9", options.compressionLevel);
          }
        }
        if (is.defined(options.adaptiveFiltering)) {
          this._setBooleanOption("pngAdaptiveFiltering", options.adaptiveFiltering);
        }
        const colours = options.colours || options.colors;
        if (is.defined(colours)) {
          if (is.integer(colours) && is.inRange(colours, 2, 256)) {
            this.options.pngBitdepth = bitdepthFromColourCount(colours);
          } else {
            throw is.invalidParameterError("colours", "integer between 2 and 256", colours);
          }
        }
        if (is.defined(options.palette)) {
          this._setBooleanOption("pngPalette", options.palette);
        } else if ([options.quality, options.effort, options.colours, options.colors, options.dither].some(is.defined)) {
          this._setBooleanOption("pngPalette", true);
        }
        if (this.options.pngPalette) {
          if (is.defined(options.quality)) {
            if (is.integer(options.quality) && is.inRange(options.quality, 0, 100)) {
              this.options.pngQuality = options.quality;
            } else {
              throw is.invalidParameterError("quality", "integer between 0 and 100", options.quality);
            }
          }
          if (is.defined(options.effort)) {
            if (is.integer(options.effort) && is.inRange(options.effort, 1, 10)) {
              this.options.pngEffort = options.effort;
            } else {
              throw is.invalidParameterError("effort", "integer between 1 and 10", options.effort);
            }
          }
          if (is.defined(options.dither)) {
            if (is.number(options.dither) && is.inRange(options.dither, 0, 1)) {
              this.options.pngDither = options.dither;
            } else {
              throw is.invalidParameterError("dither", "number between 0.0 and 1.0", options.dither);
            }
          }
        }
      }
      return this._updateFormatOut("png", options);
    }
    function webp(options) {
      if (is.object(options)) {
        if (is.defined(options.quality)) {
          if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
            this.options.webpQuality = options.quality;
          } else {
            throw is.invalidParameterError("quality", "integer between 1 and 100", options.quality);
          }
        }
        if (is.defined(options.alphaQuality)) {
          if (is.integer(options.alphaQuality) && is.inRange(options.alphaQuality, 0, 100)) {
            this.options.webpAlphaQuality = options.alphaQuality;
          } else {
            throw is.invalidParameterError("alphaQuality", "integer between 0 and 100", options.alphaQuality);
          }
        }
        if (is.defined(options.lossless)) {
          this._setBooleanOption("webpLossless", options.lossless);
        }
        if (is.defined(options.nearLossless)) {
          this._setBooleanOption("webpNearLossless", options.nearLossless);
        }
        if (is.defined(options.smartSubsample)) {
          this._setBooleanOption("webpSmartSubsample", options.smartSubsample);
        }
        if (is.defined(options.preset)) {
          if (is.string(options.preset) && is.inArray(options.preset, ["default", "photo", "picture", "drawing", "icon", "text"])) {
            this.options.webpPreset = options.preset;
          } else {
            throw is.invalidParameterError("preset", "one of: default, photo, picture, drawing, icon, text", options.preset);
          }
        }
        if (is.defined(options.effort)) {
          if (is.integer(options.effort) && is.inRange(options.effort, 0, 6)) {
            this.options.webpEffort = options.effort;
          } else {
            throw is.invalidParameterError("effort", "integer between 0 and 6", options.effort);
          }
        }
        if (is.defined(options.minSize)) {
          this._setBooleanOption("webpMinSize", options.minSize);
        }
        if (is.defined(options.mixed)) {
          this._setBooleanOption("webpMixed", options.mixed);
        }
      }
      trySetAnimationOptions(options, this.options);
      return this._updateFormatOut("webp", options);
    }
    function gif(options) {
      if (is.object(options)) {
        if (is.defined(options.reuse)) {
          this._setBooleanOption("gifReuse", options.reuse);
        }
        if (is.defined(options.progressive)) {
          this._setBooleanOption("gifProgressive", options.progressive);
        }
        const colours = options.colours || options.colors;
        if (is.defined(colours)) {
          if (is.integer(colours) && is.inRange(colours, 2, 256)) {
            this.options.gifBitdepth = bitdepthFromColourCount(colours);
          } else {
            throw is.invalidParameterError("colours", "integer between 2 and 256", colours);
          }
        }
        if (is.defined(options.effort)) {
          if (is.number(options.effort) && is.inRange(options.effort, 1, 10)) {
            this.options.gifEffort = options.effort;
          } else {
            throw is.invalidParameterError("effort", "integer between 1 and 10", options.effort);
          }
        }
        if (is.defined(options.dither)) {
          if (is.number(options.dither) && is.inRange(options.dither, 0, 1)) {
            this.options.gifDither = options.dither;
          } else {
            throw is.invalidParameterError("dither", "number between 0.0 and 1.0", options.dither);
          }
        }
        if (is.defined(options.interFrameMaxError)) {
          if (is.number(options.interFrameMaxError) && is.inRange(options.interFrameMaxError, 0, 32)) {
            this.options.gifInterFrameMaxError = options.interFrameMaxError;
          } else {
            throw is.invalidParameterError("interFrameMaxError", "number between 0.0 and 32.0", options.interFrameMaxError);
          }
        }
        if (is.defined(options.interPaletteMaxError)) {
          if (is.number(options.interPaletteMaxError) && is.inRange(options.interPaletteMaxError, 0, 256)) {
            this.options.gifInterPaletteMaxError = options.interPaletteMaxError;
          } else {
            throw is.invalidParameterError("interPaletteMaxError", "number between 0.0 and 256.0", options.interPaletteMaxError);
          }
        }
      }
      trySetAnimationOptions(options, this.options);
      return this._updateFormatOut("gif", options);
    }
    function jp2(options) {
      if (!this.constructor.format.jp2k.output.buffer) {
        throw errJp2Save();
      }
      if (is.object(options)) {
        if (is.defined(options.quality)) {
          if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
            this.options.jp2Quality = options.quality;
          } else {
            throw is.invalidParameterError("quality", "integer between 1 and 100", options.quality);
          }
        }
        if (is.defined(options.lossless)) {
          if (is.bool(options.lossless)) {
            this.options.jp2Lossless = options.lossless;
          } else {
            throw is.invalidParameterError("lossless", "boolean", options.lossless);
          }
        }
        if (is.defined(options.tileWidth)) {
          if (is.integer(options.tileWidth) && is.inRange(options.tileWidth, 1, 32768)) {
            this.options.jp2TileWidth = options.tileWidth;
          } else {
            throw is.invalidParameterError("tileWidth", "integer between 1 and 32768", options.tileWidth);
          }
        }
        if (is.defined(options.tileHeight)) {
          if (is.integer(options.tileHeight) && is.inRange(options.tileHeight, 1, 32768)) {
            this.options.jp2TileHeight = options.tileHeight;
          } else {
            throw is.invalidParameterError("tileHeight", "integer between 1 and 32768", options.tileHeight);
          }
        }
        if (is.defined(options.chromaSubsampling)) {
          if (is.string(options.chromaSubsampling) && is.inArray(options.chromaSubsampling, ["4:2:0", "4:4:4"])) {
            this.options.jp2ChromaSubsampling = options.chromaSubsampling;
          } else {
            throw is.invalidParameterError("chromaSubsampling", "one of: 4:2:0, 4:4:4", options.chromaSubsampling);
          }
        }
      }
      return this._updateFormatOut("jp2", options);
    }
    function trySetAnimationOptions(source, target) {
      if (is.object(source) && is.defined(source.loop)) {
        if (is.integer(source.loop) && is.inRange(source.loop, 0, 65535)) {
          target.loop = source.loop;
        } else {
          throw is.invalidParameterError("loop", "integer between 0 and 65535", source.loop);
        }
      }
      if (is.object(source) && is.defined(source.delay)) {
        if (is.integer(source.delay) && is.inRange(source.delay, 0, 65535)) {
          target.delay = [source.delay];
        } else if (Array.isArray(source.delay) && source.delay.every(is.integer) && source.delay.every((v) => is.inRange(v, 0, 65535))) {
          target.delay = source.delay;
        } else {
          throw is.invalidParameterError("delay", "integer or an array of integers between 0 and 65535", source.delay);
        }
      }
    }
    function tiff(options) {
      if (is.object(options)) {
        if (is.defined(options.quality)) {
          if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
            this.options.tiffQuality = options.quality;
          } else {
            throw is.invalidParameterError("quality", "integer between 1 and 100", options.quality);
          }
        }
        if (is.defined(options.bitdepth)) {
          if (is.integer(options.bitdepth) && is.inArray(options.bitdepth, [1, 2, 4, 8])) {
            this.options.tiffBitdepth = options.bitdepth;
          } else {
            throw is.invalidParameterError("bitdepth", "1, 2, 4 or 8", options.bitdepth);
          }
        }
        if (is.defined(options.tile)) {
          this._setBooleanOption("tiffTile", options.tile);
        }
        if (is.defined(options.tileWidth)) {
          if (is.integer(options.tileWidth) && options.tileWidth > 0) {
            this.options.tiffTileWidth = options.tileWidth;
          } else {
            throw is.invalidParameterError("tileWidth", "integer greater than zero", options.tileWidth);
          }
        }
        if (is.defined(options.tileHeight)) {
          if (is.integer(options.tileHeight) && options.tileHeight > 0) {
            this.options.tiffTileHeight = options.tileHeight;
          } else {
            throw is.invalidParameterError("tileHeight", "integer greater than zero", options.tileHeight);
          }
        }
        if (is.defined(options.pyramid)) {
          this._setBooleanOption("tiffPyramid", options.pyramid);
        }
        if (is.defined(options.xres)) {
          if (is.number(options.xres) && options.xres > 0) {
            this.options.tiffXres = options.xres;
          } else {
            throw is.invalidParameterError("xres", "number greater than zero", options.xres);
          }
        }
        if (is.defined(options.yres)) {
          if (is.number(options.yres) && options.yres > 0) {
            this.options.tiffYres = options.yres;
          } else {
            throw is.invalidParameterError("yres", "number greater than zero", options.yres);
          }
        }
        if (is.defined(options.compression)) {
          if (is.string(options.compression) && is.inArray(options.compression, ["none", "jpeg", "deflate", "packbits", "ccittfax4", "lzw", "webp", "zstd", "jp2k"])) {
            this.options.tiffCompression = options.compression;
          } else {
            throw is.invalidParameterError("compression", "one of: none, jpeg, deflate, packbits, ccittfax4, lzw, webp, zstd, jp2k", options.compression);
          }
        }
        if (is.defined(options.predictor)) {
          if (is.string(options.predictor) && is.inArray(options.predictor, ["none", "horizontal", "float"])) {
            this.options.tiffPredictor = options.predictor;
          } else {
            throw is.invalidParameterError("predictor", "one of: none, horizontal, float", options.predictor);
          }
        }
        if (is.defined(options.resolutionUnit)) {
          if (is.string(options.resolutionUnit) && is.inArray(options.resolutionUnit, ["inch", "cm"])) {
            this.options.tiffResolutionUnit = options.resolutionUnit;
          } else {
            throw is.invalidParameterError("resolutionUnit", "one of: inch, cm", options.resolutionUnit);
          }
        }
      }
      return this._updateFormatOut("tiff", options);
    }
    function avif(options) {
      return this.heif({ ...options, compression: "av1" });
    }
    function heif(options) {
      if (is.object(options)) {
        if (is.defined(options.quality)) {
          if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
            this.options.heifQuality = options.quality;
          } else {
            throw is.invalidParameterError("quality", "integer between 1 and 100", options.quality);
          }
        }
        if (is.defined(options.lossless)) {
          if (is.bool(options.lossless)) {
            this.options.heifLossless = options.lossless;
          } else {
            throw is.invalidParameterError("lossless", "boolean", options.lossless);
          }
        }
        if (is.defined(options.compression)) {
          if (is.string(options.compression) && is.inArray(options.compression, ["av1", "hevc"])) {
            this.options.heifCompression = options.compression;
          } else {
            throw is.invalidParameterError("compression", "one of: av1, hevc", options.compression);
          }
        }
        if (is.defined(options.effort)) {
          if (is.integer(options.effort) && is.inRange(options.effort, 0, 9)) {
            this.options.heifEffort = options.effort;
          } else {
            throw is.invalidParameterError("effort", "integer between 0 and 9", options.effort);
          }
        }
        if (is.defined(options.chromaSubsampling)) {
          if (is.string(options.chromaSubsampling) && is.inArray(options.chromaSubsampling, ["4:2:0", "4:4:4"])) {
            this.options.heifChromaSubsampling = options.chromaSubsampling;
          } else {
            throw is.invalidParameterError("chromaSubsampling", "one of: 4:2:0, 4:4:4", options.chromaSubsampling);
          }
        }
      }
      return this._updateFormatOut("heif", options);
    }
    function jxl(options) {
      if (is.object(options)) {
        if (is.defined(options.quality)) {
          if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
            this.options.jxlDistance = options.quality >= 30 ? 0.1 + (100 - options.quality) * 0.09 : 53 / 3e3 * options.quality * options.quality - 23 / 20 * options.quality + 25;
          } else {
            throw is.invalidParameterError("quality", "integer between 1 and 100", options.quality);
          }
        } else if (is.defined(options.distance)) {
          if (is.number(options.distance) && is.inRange(options.distance, 0, 15)) {
            this.options.jxlDistance = options.distance;
          } else {
            throw is.invalidParameterError("distance", "number between 0.0 and 15.0", options.distance);
          }
        }
        if (is.defined(options.decodingTier)) {
          if (is.integer(options.decodingTier) && is.inRange(options.decodingTier, 0, 4)) {
            this.options.jxlDecodingTier = options.decodingTier;
          } else {
            throw is.invalidParameterError("decodingTier", "integer between 0 and 4", options.decodingTier);
          }
        }
        if (is.defined(options.lossless)) {
          if (is.bool(options.lossless)) {
            this.options.jxlLossless = options.lossless;
          } else {
            throw is.invalidParameterError("lossless", "boolean", options.lossless);
          }
        }
        if (is.defined(options.effort)) {
          if (is.integer(options.effort) && is.inRange(options.effort, 3, 9)) {
            this.options.jxlEffort = options.effort;
          } else {
            throw is.invalidParameterError("effort", "integer between 3 and 9", options.effort);
          }
        }
      }
      return this._updateFormatOut("jxl", options);
    }
    function raw(options) {
      if (is.object(options)) {
        if (is.defined(options.depth)) {
          if (is.string(options.depth) && is.inArray(
            options.depth,
            ["char", "uchar", "short", "ushort", "int", "uint", "float", "complex", "double", "dpcomplex"]
          )) {
            this.options.rawDepth = options.depth;
          } else {
            throw is.invalidParameterError("depth", "one of: char, uchar, short, ushort, int, uint, float, complex, double, dpcomplex", options.depth);
          }
        }
      }
      return this._updateFormatOut("raw");
    }
    function tile(options) {
      if (is.object(options)) {
        if (is.defined(options.size)) {
          if (is.integer(options.size) && is.inRange(options.size, 1, 8192)) {
            this.options.tileSize = options.size;
          } else {
            throw is.invalidParameterError("size", "integer between 1 and 8192", options.size);
          }
        }
        if (is.defined(options.overlap)) {
          if (is.integer(options.overlap) && is.inRange(options.overlap, 0, 8192)) {
            if (options.overlap > this.options.tileSize) {
              throw is.invalidParameterError("overlap", `<= size (${this.options.tileSize})`, options.overlap);
            }
            this.options.tileOverlap = options.overlap;
          } else {
            throw is.invalidParameterError("overlap", "integer between 0 and 8192", options.overlap);
          }
        }
        if (is.defined(options.container)) {
          if (is.string(options.container) && is.inArray(options.container, ["fs", "zip"])) {
            this.options.tileContainer = options.container;
          } else {
            throw is.invalidParameterError("container", "one of: fs, zip", options.container);
          }
        }
        if (is.defined(options.layout)) {
          if (is.string(options.layout) && is.inArray(options.layout, ["dz", "google", "iiif", "iiif3", "zoomify"])) {
            this.options.tileLayout = options.layout;
          } else {
            throw is.invalidParameterError("layout", "one of: dz, google, iiif, iiif3, zoomify", options.layout);
          }
        }
        if (is.defined(options.angle)) {
          if (is.integer(options.angle) && !(options.angle % 90)) {
            this.options.tileAngle = options.angle;
          } else {
            throw is.invalidParameterError("angle", "positive/negative multiple of 90", options.angle);
          }
        }
        this._setBackgroundColourOption("tileBackground", options.background);
        if (is.defined(options.depth)) {
          if (is.string(options.depth) && is.inArray(options.depth, ["onepixel", "onetile", "one"])) {
            this.options.tileDepth = options.depth;
          } else {
            throw is.invalidParameterError("depth", "one of: onepixel, onetile, one", options.depth);
          }
        }
        if (is.defined(options.skipBlanks)) {
          if (is.integer(options.skipBlanks) && is.inRange(options.skipBlanks, -1, 65535)) {
            this.options.tileSkipBlanks = options.skipBlanks;
          } else {
            throw is.invalidParameterError("skipBlanks", "integer between -1 and 255/65535", options.skipBlanks);
          }
        } else if (is.defined(options.layout) && options.layout === "google") {
          this.options.tileSkipBlanks = 5;
        }
        const centre = is.bool(options.center) ? options.center : options.centre;
        if (is.defined(centre)) {
          this._setBooleanOption("tileCentre", centre);
        }
        if (is.defined(options.id)) {
          if (is.string(options.id)) {
            this.options.tileId = options.id;
          } else {
            throw is.invalidParameterError("id", "string", options.id);
          }
        }
        if (is.defined(options.basename)) {
          if (is.string(options.basename)) {
            this.options.tileBasename = options.basename;
          } else {
            throw is.invalidParameterError("basename", "string", options.basename);
          }
        }
      }
      if (is.inArray(this.options.formatOut, ["jpeg", "png", "webp"])) {
        this.options.tileFormat = this.options.formatOut;
      } else if (this.options.formatOut !== "input") {
        throw is.invalidParameterError("format", "one of: jpeg, png, webp", this.options.formatOut);
      }
      return this._updateFormatOut("dz");
    }
    function timeout(options) {
      if (!is.plainObject(options)) {
        throw is.invalidParameterError("options", "object", options);
      }
      if (is.integer(options.seconds) && is.inRange(options.seconds, 0, 3600)) {
        this.options.timeoutSeconds = options.seconds;
      } else {
        throw is.invalidParameterError("seconds", "integer between 0 and 3600", options.seconds);
      }
      return this;
    }
    function _updateFormatOut(formatOut, options) {
      if (!(is.object(options) && options.force === false)) {
        this.options.formatOut = formatOut;
      }
      return this;
    }
    function _setBooleanOption(key, val) {
      if (is.bool(val)) {
        this.options[key] = val;
      } else {
        throw is.invalidParameterError(key, "boolean", val);
      }
    }
    function _read() {
      if (!this.options.streamOut) {
        this.options.streamOut = true;
        this._pipeline();
      }
    }
    function _pipeline(callback) {
      if (typeof callback === "function") {
        if (this._isStreamInput()) {
          this.on("finish", () => {
            this._flattenBufferIn();
            sharp2.pipeline(this.options, callback);
          });
        } else {
          sharp2.pipeline(this.options, callback);
        }
        return this;
      } else if (this.options.streamOut) {
        if (this._isStreamInput()) {
          this.once("finish", () => {
            this._flattenBufferIn();
            sharp2.pipeline(this.options, (err2, data, info3) => {
              if (err2) {
                this.emit("error", err2);
              } else {
                this.emit("info", info3);
                this.push(data);
              }
              this.push(null);
              this.on("end", () => this.emit("close"));
            });
          });
          if (this.streamInFinished) {
            this.emit("finish");
          }
        } else {
          sharp2.pipeline(this.options, (err2, data, info3) => {
            if (err2) {
              this.emit("error", err2);
            } else {
              this.emit("info", info3);
              this.push(data);
            }
            this.push(null);
            this.on("end", () => this.emit("close"));
          });
        }
        return this;
      } else {
        if (this._isStreamInput()) {
          return new Promise((resolve, reject) => {
            this.once("finish", () => {
              this._flattenBufferIn();
              sharp2.pipeline(this.options, (err2, data, info3) => {
                if (err2) {
                  reject(err2);
                } else {
                  if (this.options.resolveWithObject) {
                    resolve({ data, info: info3 });
                  } else {
                    resolve(data);
                  }
                }
              });
            });
          });
        } else {
          return new Promise((resolve, reject) => {
            sharp2.pipeline(this.options, (err2, data, info3) => {
              if (err2) {
                reject(err2);
              } else {
                if (this.options.resolveWithObject) {
                  resolve({ data, info: info3 });
                } else {
                  resolve(data);
                }
              }
            });
          });
        }
      }
    }
    module2.exports = function(Sharp) {
      Object.assign(Sharp.prototype, {
        // Public
        toFile,
        toBuffer,
        withMetadata,
        toFormat,
        jpeg,
        jp2,
        png,
        webp,
        tiff,
        avif,
        heif,
        jxl,
        gif,
        raw,
        tile,
        timeout,
        // Private
        _updateFormatOut,
        _setBooleanOption,
        _read,
        _pipeline
      });
    };
  }
});

// node_modules/sharp/vendor/8.14.5/win32-x64/versions.json
var require_versions = __commonJS({
  "node_modules/sharp/vendor/8.14.5/win32-x64/versions.json"(exports2, module2) {
    module2.exports = {
      aom: "3.7.0",
      archive: "3.7.2",
      cairo: "1.17.8",
      cgif: "0.3.2",
      exif: "0.6.24",
      expat: "2.5.0",
      ffi: "3.4.4",
      fontconfig: "2.14.2",
      freetype: "2.13.2",
      fribidi: "1.0.13",
      gdkpixbuf: "2.42.10",
      glib: "2.78.0",
      harfbuzz: "8.2.0",
      heif: "1.16.2",
      imagequant: "2.4.1",
      lcms: "2.15",
      mozjpeg: "4.1.4",
      orc: "0.4.34",
      pango: "1.51.0",
      pixman: "0.42.2",
      png: "1.6.40",
      "proxy-libintl": "0.4",
      rsvg: "2.57.0",
      spng: "0.7.4",
      tiff: "4.6.0",
      vips: "8.14.5",
      webp: "1.3.2",
      xml: "2.11.5",
      "zlib-ng": "2.1.3"
    };
  }
});

// require("../vendor/**/*/**/*/versions.json") in node_modules/sharp/lib/utility.js
var globRequire_vendor_versions_json;
var init_3 = __esm({
  'require("../vendor/**/*/**/*/versions.json") in node_modules/sharp/lib/utility.js'() {
    globRequire_vendor_versions_json = __glob({
      "../vendor/8.14.5/win32-x64/versions.json": () => require_versions()
    });
  }
});

// node_modules/sharp/lib/utility.js
var require_utility = __commonJS({
  "node_modules/sharp/lib/utility.js"(exports2, module2) {
    "use strict";
    init_3();
    var fs7 = require("fs");
    var path5 = require("path");
    var events = require("events");
    var detectLibc = require_detect_libc();
    var is = require_is();
    var platformAndArch = require_platform()();
    var sharp2 = require_sharp();
    var format = sharp2.format();
    format.heif.output.alias = ["avif", "heic"];
    format.jpeg.output.alias = ["jpe", "jpg"];
    format.tiff.output.alias = ["tif"];
    format.jp2k.output.alias = ["j2c", "j2k", "jp2", "jpx"];
    var interpolators = {
      /** [Nearest neighbour interpolation](http://en.wikipedia.org/wiki/Nearest-neighbor_interpolation). Suitable for image enlargement only. */
      nearest: "nearest",
      /** [Bilinear interpolation](http://en.wikipedia.org/wiki/Bilinear_interpolation). Faster than bicubic but with less smooth results. */
      bilinear: "bilinear",
      /** [Bicubic interpolation](http://en.wikipedia.org/wiki/Bicubic_interpolation) (the default). */
      bicubic: "bicubic",
      /** [LBB interpolation](https://github.com/libvips/libvips/blob/master/libvips/resample/lbb.cpp#L100). Prevents some "[acutance](http://en.wikipedia.org/wiki/Acutance)" but typically reduces performance by a factor of 2. */
      locallyBoundedBicubic: "lbb",
      /** [Nohalo interpolation](http://eprints.soton.ac.uk/268086/). Prevents acutance but typically reduces performance by a factor of 3. */
      nohalo: "nohalo",
      /** [VSQBS interpolation](https://github.com/libvips/libvips/blob/master/libvips/resample/vsqbs.cpp#L48). Prevents "staircasing" when enlarging. */
      vertexSplitQuadraticBasisSpline: "vsqbs"
    };
    var versions = {
      vips: sharp2.libvipsVersion()
    };
    try {
      versions = globRequire_vendor_versions_json(`../vendor/${versions.vips}/${platformAndArch}/versions.json`);
    } catch (_err) {
    }
    versions.sharp = require_package().version;
    var vendor = {
      current: platformAndArch,
      installed: []
    };
    try {
      vendor.installed = fs7.readdirSync(path5.join(__dirname, `../vendor/${versions.vips}`));
    } catch (_err) {
    }
    function cache(options) {
      if (is.bool(options)) {
        if (options) {
          return sharp2.cache(50, 20, 100);
        } else {
          return sharp2.cache(0, 0, 0);
        }
      } else if (is.object(options)) {
        return sharp2.cache(options.memory, options.files, options.items);
      } else {
        return sharp2.cache();
      }
    }
    cache(true);
    function concurrency(concurrency2) {
      return sharp2.concurrency(is.integer(concurrency2) ? concurrency2 : null);
    }
    if (detectLibc.familySync() === detectLibc.GLIBC && !sharp2._isUsingJemalloc()) {
      sharp2.concurrency(1);
    }
    var queue = new events.EventEmitter();
    function counters() {
      return sharp2.counters();
    }
    function simd(simd2) {
      return sharp2.simd(is.bool(simd2) ? simd2 : null);
    }
    simd(true);
    function block(options) {
      if (is.object(options)) {
        if (Array.isArray(options.operation) && options.operation.every(is.string)) {
          sharp2.block(options.operation, true);
        } else {
          throw is.invalidParameterError("operation", "Array<string>", options.operation);
        }
      } else {
        throw is.invalidParameterError("options", "object", options);
      }
    }
    function unblock(options) {
      if (is.object(options)) {
        if (Array.isArray(options.operation) && options.operation.every(is.string)) {
          sharp2.block(options.operation, false);
        } else {
          throw is.invalidParameterError("operation", "Array<string>", options.operation);
        }
      } else {
        throw is.invalidParameterError("options", "object", options);
      }
    }
    module2.exports = function(Sharp) {
      Sharp.cache = cache;
      Sharp.concurrency = concurrency;
      Sharp.counters = counters;
      Sharp.simd = simd;
      Sharp.format = format;
      Sharp.interpolators = interpolators;
      Sharp.versions = versions;
      Sharp.vendor = vendor;
      Sharp.queue = queue;
      Sharp.block = block;
      Sharp.unblock = unblock;
    };
  }
});

// node_modules/sharp/lib/index.js
var require_lib = __commonJS({
  "node_modules/sharp/lib/index.js"(exports2, module2) {
    "use strict";
    var Sharp = require_constructor();
    require_input()(Sharp);
    require_resize()(Sharp);
    require_composite()(Sharp);
    require_operation()(Sharp);
    require_colour()(Sharp);
    require_channel()(Sharp);
    require_output()(Sharp);
    require_utility()(Sharp);
    module2.exports = Sharp;
  }
});

// node_modules/@xenova/transformers/src/utils/image.js
var import_fs3, import_sharp, BROWSER_ENV, createCanvasFunction, ImageDataClass, loadImageFunction, RESAMPLING_MAPPING, RawImage;
var init_image = __esm({
  "node_modules/@xenova/transformers/src/utils/image.js"() {
    import_fs3 = __toESM(require("fs"), 1);
    init_core();
    init_hub();
    init_env2();
    import_sharp = __toESM(require_lib(), 1);
    BROWSER_ENV = typeof self !== "undefined";
    if (BROWSER_ENV) {
      createCanvasFunction = (width, height) => {
        if (!self.OffscreenCanvas) {
          throw new Error("OffscreenCanvas not supported by this browser.");
        }
        return new self.OffscreenCanvas(width, height);
      };
      loadImageFunction = self.createImageBitmap;
      ImageDataClass = self.ImageData;
    } else if (import_sharp.default) {
      loadImageFunction = async (img) => {
        let { data, info: info3 } = await img.raw().toBuffer({ resolveWithObject: true });
        return new RawImage(new Uint8ClampedArray(data), info3.width, info3.height, info3.channels);
      };
    } else {
      throw new Error("Unable to load image processing library.");
    }
    RESAMPLING_MAPPING = {
      0: "nearest",
      1: "lanczos",
      2: "bilinear",
      3: "bicubic",
      4: "box",
      5: "hamming"
    };
    RawImage = class _RawImage {
      /**
       * Create a new `RawImage` object.
       * @param {Uint8ClampedArray} data The pixel data.
       * @param {number} width The width of the image.
       * @param {number} height The height of the image.
       * @param {1|2|3|4} channels The number of channels.
       */
      constructor(data, width, height, channels) {
        this._update(data, width, height, channels);
      }
      /**
       * Helper method for reading an image from a variety of input types.
       * @param {RawImage|string|URL} input 
       * @returns The image object.
       */
      static async read(input) {
        if (input instanceof _RawImage) {
          return input;
        } else if (isString(input) || input instanceof URL) {
          return await this.fromURL(input);
        } else {
          throw new Error(`Unsupported input type: ${typeof input}`);
        }
      }
      /**
       * Read an image from a URL or file path.
       * @param {string|URL} url The URL or file path to read the image from.
       * @returns {Promise<RawImage>} The image object.
       */
      static async fromURL(url2) {
        let response = await getFile(url2);
        let blob = await response.blob();
        return this.fromBlob(blob);
      }
      /**
       * Helper method to create a new Image from a blob.
       * @param {Blob} blob The blob to read the image from.
       * @returns {Promise<RawImage>} The image object.
       */
      static async fromBlob(blob) {
        if (BROWSER_ENV) {
          let img = await loadImageFunction(blob);
          const ctx = createCanvasFunction(img.width, img.height).getContext("2d");
          ctx.drawImage(img, 0, 0);
          return new this(ctx.getImageData(0, 0, img.width, img.height).data, img.width, img.height, 4);
        } else {
          let img = (0, import_sharp.default)(await blob.arrayBuffer());
          return await loadImageFunction(img);
        }
      }
      /**
       * Convert the image to grayscale format.
       * @returns {RawImage} `this` to support chaining.
       */
      grayscale() {
        if (this.channels === 1) {
          return this;
        }
        let newData = new Uint8ClampedArray(this.width * this.height * 3);
        switch (this.channels) {
          case 3:
          // rgb to grayscale
          case 4:
            for (let i2 = 0, offset = 0; i2 < this.data.length; i2 += this.channels) {
              const red = this.data[i2];
              const green = this.data[i2 + 1];
              const blue = this.data[i2 + 2];
              newData[offset++] = Math.round(0.2989 * red + 0.587 * green + 0.114 * blue);
            }
            break;
          default:
            throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
        }
        return this._update(newData, this.width, this.height, 1);
      }
      /**
       * Convert the image to RGB format.
       * @returns {RawImage} `this` to support chaining.
       */
      rgb() {
        if (this.channels === 3) {
          return this;
        }
        let newData = new Uint8ClampedArray(this.width * this.height * 3);
        switch (this.channels) {
          case 1:
            for (let i2 = 0, offset = 0; i2 < this.data.length; ++i2) {
              newData[offset++] = this.data[i2];
              newData[offset++] = this.data[i2];
              newData[offset++] = this.data[i2];
            }
            break;
          case 4:
            for (let i2 = 0, offset = 0; i2 < this.data.length; i2 += 4) {
              newData[offset++] = this.data[i2];
              newData[offset++] = this.data[i2 + 1];
              newData[offset++] = this.data[i2 + 2];
            }
            break;
          default:
            throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
        }
        return this._update(newData, this.width, this.height, 3);
      }
      /**
       * Convert the image to RGBA format.
       * @returns {RawImage} `this` to support chaining.
       */
      rgba() {
        if (this.channels === 4) {
          return this;
        }
        let newData = new Uint8ClampedArray(this.width * this.height * 4);
        switch (this.channels) {
          case 1:
            for (let i2 = 0, offset = 0; i2 < this.data.length; ++i2) {
              newData[offset++] = this.data[i2];
              newData[offset++] = this.data[i2];
              newData[offset++] = this.data[i2];
              newData[offset++] = 255;
            }
            break;
          case 3:
            for (let i2 = 0, offset = 0; i2 < this.data.length; i2 += 3) {
              newData[offset++] = this.data[i2];
              newData[offset++] = this.data[i2 + 1];
              newData[offset++] = this.data[i2 + 2];
              newData[offset++] = 255;
            }
            break;
          default:
            throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
        }
        return this._update(newData, this.width, this.height, 4);
      }
      /**
       * Resize the image to the given dimensions. This method uses the canvas API to perform the resizing.
       * @param {number} width The width of the new image.
       * @param {number} height The height of the new image.
       * @param {Object} options Additional options for resizing.
       * @param {0|1|2|3|4|5|string} [options.resample] The resampling method to use.
       * @returns {Promise<RawImage>} `this` to support chaining.
       */
      async resize(width, height, {
        resample = 2
      } = {}) {
        let resampleMethod = RESAMPLING_MAPPING[resample] ?? resample;
        if (BROWSER_ENV) {
          let numChannels = this.channels;
          let canvas = this.toCanvas();
          const ctx = createCanvasFunction(width, height).getContext("2d");
          ctx.drawImage(canvas, 0, 0, width, height);
          let resizedImage = new _RawImage(ctx.getImageData(0, 0, width, height).data, width, height, 4);
          return resizedImage.convert(numChannels);
        } else {
          let img = (0, import_sharp.default)(this.data, {
            raw: {
              width: this.width,
              height: this.height,
              channels: this.channels
            }
          });
          switch (resampleMethod) {
            case "box":
            case "hamming":
              if (resampleMethod === "box" || resampleMethod === "hamming") {
                console.warn(`Resampling method ${resampleMethod} is not yet supported. Using bilinear instead.`);
                resampleMethod = "bilinear";
              }
            case "nearest":
            case "bilinear":
            case "bicubic":
              img = img.affine([width / this.width, 0, 0, height / this.height], {
                interpolator: resampleMethod
              });
              break;
            case "lanczos":
              img = img.resize({
                width,
                height,
                fit: "fill",
                kernel: "lanczos3"
                // PIL Lanczos uses a kernel size of 3 
              });
              break;
            default:
              throw new Error(`Resampling method ${resampleMethod} is not supported.`);
          }
          return await loadImageFunction(img);
        }
      }
      async pad([left, right, top, bottom]) {
        left = Math.max(left, 0);
        right = Math.max(right, 0);
        top = Math.max(top, 0);
        bottom = Math.max(bottom, 0);
        if (left === 0 && right === 0 && top === 0 && bottom === 0) {
          return this;
        }
        if (BROWSER_ENV) {
          let numChannels = this.channels;
          let canvas = this.toCanvas();
          let newWidth = this.width + left + right;
          let newHeight = this.height + top + bottom;
          const ctx = createCanvasFunction(newWidth, newHeight).getContext("2d");
          ctx.drawImage(
            canvas,
            0,
            0,
            this.width,
            this.height,
            left,
            top,
            newWidth,
            newHeight
          );
          let paddedImage = new _RawImage(
            ctx.getImageData(0, 0, newWidth, newHeight).data,
            newWidth,
            newHeight,
            4
          );
          return paddedImage.convert(numChannels);
        } else {
          let img = (0, import_sharp.default)(this.data, {
            raw: {
              width: this.width,
              height: this.height,
              channels: this.channels
            }
          }).extend({ left, right, top, bottom });
          return await loadImageFunction(img);
        }
      }
      async center_crop(crop_width, crop_height) {
        if (this.width === crop_width && this.height === crop_height) {
          return this;
        }
        let width_offset = (this.width - crop_width) / 2;
        let height_offset = (this.height - crop_height) / 2;
        if (BROWSER_ENV) {
          let numChannels = this.channels;
          let canvas = this.toCanvas();
          const ctx = createCanvasFunction(crop_width, crop_height).getContext("2d");
          let sourceX = 0;
          let sourceY = 0;
          let destX = 0;
          let destY = 0;
          if (width_offset >= 0) {
            sourceX = width_offset;
          } else {
            destX = -width_offset;
          }
          if (height_offset >= 0) {
            sourceY = height_offset;
          } else {
            destY = -height_offset;
          }
          ctx.drawImage(
            canvas,
            sourceX,
            sourceY,
            crop_width,
            crop_height,
            destX,
            destY,
            crop_width,
            crop_height
          );
          let resizedImage = new _RawImage(ctx.getImageData(0, 0, crop_width, crop_height).data, crop_width, crop_height, 4);
          return resizedImage.convert(numChannels);
        } else {
          let img = (0, import_sharp.default)(this.data, {
            raw: {
              width: this.width,
              height: this.height,
              channels: this.channels
            }
          });
          if (width_offset >= 0 && height_offset >= 0) {
            img = img.extract({
              left: Math.floor(width_offset),
              top: Math.floor(height_offset),
              width: crop_width,
              height: crop_height
            });
          } else if (width_offset <= 0 && height_offset <= 0) {
            let top = Math.floor(-height_offset);
            let left = Math.floor(-width_offset);
            img = img.extend({
              top,
              left,
              // Ensures the resulting image has the desired dimensions
              right: crop_width - this.width - left,
              bottom: crop_height - this.height - top
            });
          } else {
            let y_padding = [0, 0];
            let y_extract = 0;
            if (height_offset < 0) {
              y_padding[0] = Math.floor(-height_offset);
              y_padding[1] = crop_height - this.height - y_padding[0];
            } else {
              y_extract = Math.floor(height_offset);
            }
            let x_padding = [0, 0];
            let x_extract = 0;
            if (width_offset < 0) {
              x_padding[0] = Math.floor(-width_offset);
              x_padding[1] = crop_width - this.width - x_padding[0];
            } else {
              x_extract = Math.floor(width_offset);
            }
            img = img.extend({
              top: y_padding[0],
              bottom: y_padding[1],
              left: x_padding[0],
              right: x_padding[1]
            }).extract({
              left: x_extract,
              top: y_extract,
              width: crop_width,
              height: crop_height
            });
          }
          return await loadImageFunction(img);
        }
      }
      toCanvas() {
        let cloned = this.clone().rgba();
        let clonedCanvas = createCanvasFunction(cloned.width, cloned.height);
        let data = new ImageDataClass(cloned.data, cloned.width, cloned.height);
        clonedCanvas.getContext("2d").putImageData(data, 0, 0);
        return clonedCanvas;
      }
      /**
       * Helper method to update the image data.
       * @param {Uint8ClampedArray} data The new image data.
       * @param {number} width The new width of the image.
       * @param {number} height The new height of the image.
       * @param {1|2|3|4} channels The new number of channels of the image.
       */
      _update(data, width, height, channels = null) {
        this.data = data;
        this.width = width;
        this.height = height;
        if (channels !== null) {
          this.channels = channels;
        }
        return this;
      }
      /**
       * Clone the image
       * @returns {RawImage} The cloned image
       */
      clone() {
        return new _RawImage(this.data.slice(), this.width, this.height, this.channels);
      }
      /**
       * Helper method for converting image to have a certain number of channels
       * @param {number} numChannels The number of channels. Must be 1, 3, or 4.
       * @returns {RawImage} `this` to support chaining.
       */
      convert(numChannels) {
        if (this.channels === numChannels) return this;
        switch (numChannels) {
          case 1:
            this.grayscale();
            break;
          case 3:
            this.rgb();
            break;
          case 4:
            this.rgba();
            break;
          default:
            throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
        }
        return this;
      }
      /**
       * Save the image to the given path. This method is only available in environments with access to the FileSystem.
       * @param {string|Buffer|URL} path The path to save the image to.
       * @param {string} [mime='image/png'] The mime type of the image.
       */
      save(path5, mime = "image/png") {
        if (!env3.useFS) {
          throw new Error("Unable to save the image because filesystem is disabled in this environment.");
        }
        let canvas = this.toCanvas();
        const buffer = canvas.toBuffer(mime);
        import_fs3.default.writeFileSync(path5, buffer);
      }
    };
  }
});

// node_modules/@xenova/transformers/src/utils/audio.js
async function read_audio(url2, sampling_rate) {
  if (typeof AudioContext === "undefined") {
    throw Error(
      "Unable to load audio from path/URL since `AudioContext` is not available in your environment. As a result, audio data must be passed directly to the processor. If you are running in node.js, you can use an external library (e.g., https://github.com/audiojs/web-audio-api) to do this."
    );
  }
  const response = await (await getFile(url2)).arrayBuffer();
  const audioCTX = new AudioContext({ sampleRate: sampling_rate });
  const decoded = await audioCTX.decodeAudioData(response);
  let audio;
  if (decoded.numberOfChannels === 2) {
    const SCALING_FACTOR = Math.sqrt(2);
    let left = decoded.getChannelData(0);
    let right = decoded.getChannelData(1);
    audio = new Float32Array(left.length);
    for (let i2 = 0; i2 < decoded.length; ++i2) {
      audio[i2] = SCALING_FACTOR * (left[i2] + right[i2]) / 2;
    }
  } else {
    audio = decoded.getChannelData(0);
  }
  return audio;
}
function getMelFilters(sr, n_fft, n_mels = 128) {
  n_mels = Math.floor(n_mels);
  const mel_size = Math.floor(1 + n_fft / 2);
  const weights = new Array(n_mels);
  const fftfreqs = rfftfreq(n_fft, 1 / sr);
  const min_mel = 0;
  const max_mel = 45.245640471924965;
  const mel_range = max_mel - min_mel;
  const mel_scale = mel_range / (n_mels + 1);
  const f_min = 0;
  const f_sp = 200 / 3;
  const freqs = new Array(n_mels + 2);
  const min_log_hz = 1e3;
  const min_log_mel = (min_log_hz - f_min) / f_sp;
  const logstep = Math.log(6.4) / 27;
  const ramps = new Array(freqs.length);
  for (let i2 = 0; i2 < freqs.length; ++i2) {
    const mel = i2 * mel_scale + min_mel;
    if (mel >= min_log_mel) {
      freqs[i2] = min_log_hz * Math.exp(logstep * (mel - min_log_mel));
    } else {
      freqs[i2] = f_min + f_sp * mel;
    }
    ramps[i2] = fftfreqs.map((k) => freqs[i2] - k);
  }
  const fdiffinv = freqs.slice(1).map((v, i2) => 1 / (v - freqs[i2]));
  for (let i2 = 0; i2 < weights.length; ++i2) {
    weights[i2] = new Array(mel_size);
    const a = fdiffinv[i2];
    const b = fdiffinv[i2 + 1];
    const c = ramps[i2];
    const d = ramps[i2 + 2];
    const enorm = 2 / (freqs[i2 + 2] - freqs[i2]);
    for (let j2 = 0; j2 < weights[i2].length; ++j2) {
      const lower = -c[j2] * a;
      const upper = d[j2] * b;
      weights[i2][j2] = Math.max(0, Math.min(lower, upper)) * enorm;
    }
  }
  return weights;
}
var init_audio = __esm({
  "node_modules/@xenova/transformers/src/utils/audio.js"() {
    init_hub();
    init_maths();
  }
});

// node_modules/@xenova/transformers/src/processors.js
var FeatureExtractor, ImageFeatureExtractor, ViTFeatureExtractor, DetrFeatureExtractor, SamImageProcessor, WhisperFeatureExtractor, Processor, SamProcessor, WhisperProcessor, AutoProcessor;
var init_processors = __esm({
  "node_modules/@xenova/transformers/src/processors.js"() {
    init_core();
    init_hub();
    init_maths();
    init_tensor2();
    init_image();
    init_audio();
    FeatureExtractor = class extends Callable {
      /**
       * Constructs a new FeatureExtractor instance.
       *
       * @param {Object} config The configuration for the feature extractor.
       */
      constructor(config) {
        super();
        this.config = config;
      }
    };
    ImageFeatureExtractor = class extends FeatureExtractor {
      /**
       * Constructs a new ViTFeatureExtractor instance.
       *
       * @param {Object} config The configuration for the feature extractor.
       * @param {number[]} config.image_mean The mean values for image normalization.
       * @param {number[]} config.image_std The standard deviation values for image normalization.
       * @param {boolean} config.do_rescale Whether to rescale the image pixel values to the [0,1] range.
       * @param {number} config.rescale_factor The factor to use for rescaling the image pixel values.
       * @param {boolean} config.do_normalize Whether to normalize the image pixel values.
       * @param {boolean} config.do_resize Whether to resize the image.
       * @param {number} config.resample What method to use for resampling.
       * @param {number} config.size The size to resize the image to.
       */
      constructor(config) {
        super(config);
        this.image_mean = this.config.image_mean;
        this.image_std = this.config.image_std;
        this.resample = this.config.resample ?? 2;
        this.do_rescale = this.config.do_rescale ?? true;
        this.rescale_factor = this.config.rescale_factor ?? 1 / 255;
        this.do_normalize = this.config.do_normalize;
        this.do_resize = this.config.do_resize;
        this.size = this.config.size;
        this.do_center_crop = this.config.do_center_crop;
        this.crop_size = this.config.crop_size;
        this.do_convert_rgb = this.config.do_convert_rgb ?? true;
        this.pad_size = this.config.pad_size;
        this.do_pad = (this.config.do_pad ?? false) && this.pad_size;
      }
      /**
       * Preprocesses the given image.
       *
       * @param {RawImage} image The image to preprocess.
       * @returns {Promise<any>} The preprocessed image as a Tensor.
       */
      async preprocess(image) {
        if (this.do_convert_rgb) {
          image = image.rgb();
        }
        const srcWidth = image.width;
        const srcHeight = image.height;
        if (this.do_resize) {
          let shortest_edge;
          let longest_edge;
          if (Number.isInteger(this.size)) {
            shortest_edge = this.size;
            longest_edge = this.config.max_size ?? shortest_edge;
          } else {
            shortest_edge = this.size.shortest_edge;
            longest_edge = this.size.longest_edge;
          }
          if (shortest_edge !== void 0 || longest_edge !== void 0) {
            const shortResizeFactor = shortest_edge === void 0 ? 1 : Math.max(shortest_edge / srcWidth, shortest_edge / srcHeight);
            const newWidth = srcWidth * shortResizeFactor;
            const newHeight = srcHeight * shortResizeFactor;
            const longResizeFactor = longest_edge === void 0 ? 1 : Math.min(longest_edge / newWidth, longest_edge / newHeight);
            image = await image.resize(Math.floor(newWidth * longResizeFactor), Math.floor(newHeight * longResizeFactor), {
              resample: this.resample
            });
          } else if (this.size.width !== void 0 && this.size.height !== void 0) {
            image = await image.resize(this.size.width, this.size.height, {
              resample: this.resample
            });
          } else {
            throw new Error(`Could not resize image due to unsupported \`this.size\` option in config: ${JSON.stringify(this.size)}`);
          }
        }
        if (this.do_center_crop) {
          let crop_width;
          let crop_height;
          if (Number.isInteger(this.crop_size)) {
            crop_width = this.crop_size;
            crop_height = this.crop_size;
          } else {
            crop_width = this.crop_size.width;
            crop_height = this.crop_size.height;
          }
          image = await image.center_crop(crop_width, crop_height);
        }
        let reshaped_input_size = [image.height, image.width];
        if (this.do_pad) {
          let left = 0;
          let right = this.pad_size.width - image.width;
          let top = 0;
          let bottom = this.pad_size.height - image.height;
          image = await image.pad([left, right, top, bottom]);
        }
        const pixelData = Float32Array.from(image.data);
        if (this.do_rescale) {
          for (let i2 = 0; i2 < pixelData.length; ++i2) {
            pixelData[i2] = this.rescale_factor * pixelData[i2];
          }
        }
        if (this.do_normalize) {
          let image_mean = this.image_mean;
          if (!Array.isArray(this.image_mean)) {
            image_mean = new Array(image.channels).fill(image_mean);
          }
          let image_std = this.image_std;
          if (!Array.isArray(this.image_std)) {
            image_std = new Array(image.channels).fill(image_mean);
          }
          if (image_mean.length !== image.channels || image_std.length !== image.channels) {
            throw new Error(`When set to arrays, the length of \`image_mean\` (${image_mean.length}) and \`image_std\` (${image_std.length}) must match the number of channels in the image (${image.channels}).`);
          }
          for (let i2 = 0; i2 < pixelData.length; i2 += image.channels) {
            for (let j2 = 0; j2 < image.channels; ++j2) {
              pixelData[i2 + j2] = (pixelData[i2 + j2] - this.image_mean[j2]) / this.image_std[j2];
            }
          }
        }
        let imgDims = [image.height, image.width, image.channels];
        let img = new Tensor3("float32", pixelData, imgDims);
        let transposed = transpose(img, [2, 0, 1]);
        return {
          original_size: [srcHeight, srcWidth],
          reshaped_input_size,
          pixel_values: transposed
        };
      }
      /**
       * Calls the feature extraction process on an array of image
       * URLs, preprocesses each image, and concatenates the resulting
       * features into a single Tensor.
       * @param {any} images The URL(s) of the image(s) to extract features from.
       * @returns {Promise<Object>} An object containing the concatenated pixel values (and other metadata) of the preprocessed images.
       */
      async _call(images) {
        if (!Array.isArray(images)) {
          images = [images];
        }
        let imageData = await Promise.all(images.map((x) => this.preprocess(x)));
        imageData.forEach((x) => x.pixel_values.dims = [1, ...x.pixel_values.dims]);
        let pixel_values = cat(imageData.map((x) => x.pixel_values));
        return {
          pixel_values,
          // Original sizes of images
          original_sizes: imageData.map((x) => x.original_size),
          // Reshaped sizes of images, before padding or cropping
          reshaped_input_sizes: imageData.map((x) => x.reshaped_input_size)
        };
      }
    };
    ViTFeatureExtractor = class extends ImageFeatureExtractor {
    };
    DetrFeatureExtractor = class extends ImageFeatureExtractor {
      /**
       * Calls the feature extraction process on an array of image
       * URLs, preprocesses each image, and concatenates the resulting
       * features into a single Tensor.
       * @param {any} urls The URL(s) of the image(s) to extract features from.
       * @returns {Promise<Object>} An object containing the concatenated pixel values of the preprocessed images.
       */
      async _call(urls) {
        let result = await super._call(urls);
        let maskSize = [result.pixel_values.dims[0], 64, 64];
        result.pixel_mask = new Tensor3(
          "int64",
          // TODO: fix error below
          new BigInt64Array(maskSize.reduce((a, b) => a * b)).fill(1n),
          maskSize
        );
        return result;
      }
      /**
       * @param {number[]} arr The URL(s) of the image(s) to extract features from.
       * @returns {number[]} An object containing the concatenated pixel values of the preprocessed images.
       */
      center_to_corners_format([centerX, centerY, width, height]) {
        return [
          centerX - width / 2,
          centerY - height / 2,
          centerX + width / 2,
          centerY + height / 2
        ];
      }
      /**
       * Post-processes the outputs of the model (for object detection).
       * @param {Object} outputs The outputs of the model that must be post-processed
       * @param {Tensor} outputs.logits The logits
       * @param {Tensor} outputs.pred_boxes The predicted boxes.
       * @return {Object[]} An array of objects containing the post-processed outputs.
       */
      post_process_object_detection(outputs, threshold = 0.5, target_sizes = null) {
        const out_logits = outputs.logits;
        const out_bbox = outputs.pred_boxes;
        const [batch_size, num_boxes, num_classes] = out_logits.dims;
        if (target_sizes !== null && target_sizes.length !== batch_size) {
          throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits");
        }
        let toReturn = [];
        for (let i2 = 0; i2 < batch_size; ++i2) {
          let target_size = target_sizes !== null ? target_sizes[i2] : null;
          let info3 = {
            boxes: [],
            classes: [],
            scores: []
          };
          let logits = out_logits[i2];
          let bbox = out_bbox[i2];
          for (let j2 = 0; j2 < num_boxes; ++j2) {
            let logit = logits[j2];
            let maxIndex = max(logit.data)[1];
            if (maxIndex === num_classes - 1) {
              continue;
            }
            let probs = softmax(logit.data);
            let score = probs[maxIndex];
            if (score > threshold) {
              let box = bbox[j2].data;
              box = this.center_to_corners_format(box);
              if (target_size !== null) {
                box = box.map((x, i3) => x * target_size[(i3 + 1) % 2]);
              }
              info3.boxes.push(box);
              info3.classes.push(maxIndex);
              info3.scores.push(score);
            }
          }
          toReturn.push(info3);
        }
        return toReturn;
      }
      /**
       * Binarize the given masks using `object_mask_threshold`, it returns the associated values of `masks`, `scores` and `labels`.
       * @param {Tensor} class_logits The class logits.
       * @param {Tensor} mask_logits The mask logits.
       * @param {number} object_mask_threshold A number between 0 and 1 used to binarize the masks.
       * @param {number} num_labels The number of labels.
       * @returns {[Tensor[], number[], number[]]} The binarized masks, the scores, and the labels.
       */
      remove_low_and_no_objects(class_logits, mask_logits, object_mask_threshold, num_labels) {
        let mask_probs_item = [];
        let pred_scores_item = [];
        let pred_labels_item = [];
        for (let j2 = 0; j2 < class_logits.dims[0]; ++j2) {
          let cls = class_logits[j2];
          let mask = mask_logits[j2];
          let pred_label = max(cls.data)[1];
          if (pred_label === num_labels) {
            continue;
          }
          let scores = softmax(cls.data);
          let pred_score = scores[pred_label];
          if (pred_score > object_mask_threshold) {
            mask_probs_item.push(mask);
            pred_scores_item.push(pred_score);
            pred_labels_item.push(pred_label);
          }
        }
        return [mask_probs_item, pred_scores_item, pred_labels_item];
      }
      /**
       * Checks whether the segment is valid or not.
       * @param {Int32Array} mask_labels Labels for each pixel in the mask.
       * @param {Tensor[]} mask_probs Probabilities for each pixel in the masks.
       * @param {number} k The class id of the segment.
       * @param {number} mask_threshold The mask threshold.
       * @param {number} overlap_mask_area_threshold The overlap mask area threshold.
       * @returns {[boolean, number[]]} Whether the segment is valid or not, and the indices of the valid labels.
       */
      check_segment_validity(mask_labels, mask_probs, k, mask_threshold = 0.5, overlap_mask_area_threshold = 0.8) {
        let mask_k = [];
        let mask_k_area = 0;
        let original_area = 0;
        for (let i2 = 0; i2 < mask_labels.length; ++i2) {
          if (mask_labels[i2] === k) {
            mask_k.push(i2);
            ++mask_k_area;
          }
          if (mask_probs[k].data[i2] >= mask_threshold) {
            ++original_area;
          }
        }
        let mask_exists = mask_k_area > 0 && original_area > 0;
        if (mask_exists) {
          let area_ratio = mask_k_area / original_area;
          mask_exists = area_ratio > overlap_mask_area_threshold;
        }
        return [mask_exists, mask_k];
      }
      /**
       * Computes the segments.
       * @param {Tensor[]} mask_probs The mask probabilities.
       * @param {number[]} pred_scores The predicted scores.
       * @param {number[]} pred_labels The predicted labels.
       * @param {number} mask_threshold The mask threshold.
       * @param {number} overlap_mask_area_threshold The overlap mask area threshold.
       * @param {Set<number>} label_ids_to_fuse The label ids to fuse.
       * @param {number[]} target_size The target size of the image.
       * @returns {[Tensor, Array<{id: number, label_id: number, score: number}>]} The computed segments.
       */
      compute_segments(mask_probs, pred_scores, pred_labels, mask_threshold, overlap_mask_area_threshold, label_ids_to_fuse = null, target_size = null) {
        let [height, width] = target_size ?? mask_probs[0].dims;
        let segmentation = new Tensor3(
          "int32",
          new Int32Array(height * width),
          [height, width]
        );
        let segments = [];
        if (target_size !== null) {
          for (let i2 = 0; i2 < mask_probs.length; ++i2) {
            mask_probs[i2] = interpolate(mask_probs[i2], target_size, "bilinear", false);
          }
        }
        let mask_labels = new Int32Array(mask_probs[0].data.length);
        let bestScores = new Float32Array(mask_probs[0].data.length);
        for (let i2 = 0; i2 < mask_probs.length; ++i2) {
          let score = pred_scores[i2];
          for (let j2 = 0; j2 < mask_probs[i2].data.length; ++j2) {
            mask_probs[i2].data[j2] *= score;
            if (mask_probs[i2].data[j2] > bestScores[j2]) {
              mask_labels[j2] = i2;
              bestScores[j2] = mask_probs[i2].data[j2];
            }
          }
        }
        let current_segment_id = 0;
        for (let k = 0; k < pred_labels.length; ++k) {
          let pred_class = pred_labels[k];
          let [mask_exists, mask_k] = this.check_segment_validity(
            mask_labels,
            mask_probs,
            k,
            mask_threshold,
            overlap_mask_area_threshold
          );
          if (!mask_exists) {
            continue;
          }
          ++current_segment_id;
          for (let index of mask_k) {
            segmentation.data[index] = current_segment_id;
          }
          segments.push({
            id: current_segment_id,
            label_id: pred_class,
            // was_fused: should_fuse, TODO
            score: pred_scores[k]
          });
        }
        return [segmentation, segments];
      }
      /**
       * Post-process the model output to generate the final panoptic segmentation.
       * @param {*} outputs The model output to post process
       * @param {number} [threshold=0.5] The probability score threshold to keep predicted instance masks.
       * @param {number} [mask_threshold=0.5] Threshold to use when turning the predicted masks into binary values.
       * @param {number} [overlap_mask_area_threshold=0.8] The overlap mask area threshold to merge or discard small disconnected parts within each binary instance mask.
       * @param {Set<number>} [label_ids_to_fuse=null] The labels in this state will have all their instances be fused together.
       * @param {number[][]} [target_sizes=null] The target sizes to resize the masks to.
       * @returns {Array<{ segmentation: Tensor, segments_info: Array<{id: number, label_id: number, score: number}>}>}
       */
      post_process_panoptic_segmentation(outputs, threshold = 0.5, mask_threshold = 0.5, overlap_mask_area_threshold = 0.8, label_ids_to_fuse = null, target_sizes = null) {
        if (label_ids_to_fuse === null) {
          console.warn("`label_ids_to_fuse` unset. No instance will be fused.");
          label_ids_to_fuse = /* @__PURE__ */ new Set();
        }
        const class_queries_logits = outputs.logits;
        const masks_queries_logits = outputs.pred_masks;
        const mask_probs = masks_queries_logits.sigmoid();
        let [batch_size, num_queries, num_labels] = class_queries_logits.dims;
        num_labels -= 1;
        if (target_sizes !== null && target_sizes.length !== batch_size) {
          throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits");
        }
        let toReturn = [];
        for (let i2 = 0; i2 < batch_size; ++i2) {
          let target_size = target_sizes !== null ? target_sizes[i2] : null;
          let class_logits = class_queries_logits[i2];
          let mask_logits = mask_probs[i2];
          let [mask_probs_item, pred_scores_item, pred_labels_item] = this.remove_low_and_no_objects(class_logits, mask_logits, threshold, num_labels);
          if (pred_labels_item.length === 0) {
            let [height, width] = target_size ?? mask_logits.dims.slice(-2);
            let segmentation2 = new Tensor3(
              "int32",
              new Int32Array(height * width).fill(-1),
              [height, width]
            );
            toReturn.push({
              segmentation: segmentation2,
              segments_info: []
            });
            continue;
          }
          let [segmentation, segments] = this.compute_segments(
            mask_probs_item,
            pred_scores_item,
            pred_labels_item,
            mask_threshold,
            overlap_mask_area_threshold,
            label_ids_to_fuse,
            target_size
          );
          toReturn.push({
            segmentation,
            segments_info: segments
          });
        }
        return toReturn;
      }
      post_process_instance_segmentation() {
        throw Error("Not implemented yet");
      }
    };
    SamImageProcessor = class extends ImageFeatureExtractor {
      async _call(images, input_points) {
        let {
          pixel_values,
          original_sizes,
          reshaped_input_sizes
        } = await super._call(images);
        let shape = calculateDimensions(input_points);
        if (shape.length === 3) {
          shape = [1, ...shape];
          input_points = [input_points];
        } else if (shape.length !== 4) {
          throw Error("The input_points must be a 4D tensor of shape `batch_size`, `point_batch_size`, `nb_points_per_image`, `2`.");
        }
        for (let i2 = 0; i2 < input_points.length; ++i2) {
          let originalImageSize = original_sizes[i2];
          let reshapedImageSize = reshaped_input_sizes[i2];
          let resizeFactors = [
            reshapedImageSize[0] / originalImageSize[0],
            reshapedImageSize[1] / originalImageSize[1]
          ];
          for (let j2 = 0; j2 < input_points[i2].length; ++j2) {
            for (let k = 0; k < input_points[i2][j2].length; ++k) {
              for (let w = 0; w < input_points[i2][j2][k].length; ++w) {
                input_points[i2][j2][k][w] *= resizeFactors[w];
              }
            }
          }
        }
        let input_points_tensor = new Tensor3(
          "int64",
          BigInt64Array.from(input_points.flat(Infinity).map((x) => BigInt(Math.round(x)))),
          shape
        );
        return {
          pixel_values,
          original_sizes,
          reshaped_input_sizes,
          input_points: input_points_tensor
        };
      }
      /**
       * Remove padding and upscale masks to the original image size.
       * @param {Tensor} masks Batched masks from the mask_decoder in (batch_size, num_channels, height, width) format.
       * @param {number[][]} original_sizes The original sizes of each image before it was resized to the model's expected input shape, in (height, width) format.
       * @param {number[][]} reshaped_input_sizes The size of each image as it is fed to the model, in (height, width) format. Used to remove padding.
       * @param {Object} options Optional parameters for post-processing.
       * @param {number} [options.mask_threshold] The threshold to use for binarizing the masks.
       * @param {boolean} [options.binarize] Whether to binarize the masks.
       * @param {Object} [options.pad_size] The target size the images were padded to before being passed to the model. If `null`, the target size is assumed to be the processor's `pad_size`.
       * @param {number} [options.pad_size.height] The height the images were padded to.
       * @param {number} [options.pad_size.width] The width the images were padded to.
       * @returns {Tensor[]} Batched masks in batch_size, num_channels, height, width) format, where (height, width) is given by original_size.
       */
      post_process_masks(masks, original_sizes, reshaped_input_sizes, {
        mask_threshold = 0,
        binarize = true,
        pad_size = null
      } = {}) {
        let output_masks = [];
        pad_size = pad_size ?? this.pad_size;
        let target_image_size = [pad_size.height, pad_size.width];
        for (let i2 = 0; i2 < original_sizes.length; ++i2) {
          let original_size = original_sizes[i2];
          let reshaped_input_size = reshaped_input_sizes[i2];
          let mask = masks[i2];
          let interpolated_masks = [];
          for (let j2 = 0; j2 < mask.dims[0]; ++j2) {
            let m = mask[j2];
            let interpolated_mask = interpolate(m, target_image_size, "bilinear", false);
            interpolated_mask = interpolated_mask.slice(null, [0, reshaped_input_size[0]], [0, reshaped_input_size[1]]);
            interpolated_mask = interpolate(mask, original_size, "bilinear", false);
            if (binarize) {
              interpolated_mask = new Tensor3(
                "bool",
                Array.from(interpolated_mask.data).map((x) => x > mask_threshold),
                interpolated_mask.dims
              );
            }
            interpolated_mask.dims = [1, ...interpolated_mask.dims];
            interpolated_masks.push(interpolated_mask);
          }
          let concatenated = cat(interpolated_masks);
          output_masks.push(concatenated);
        }
        return output_masks;
      }
    };
    WhisperFeatureExtractor = class extends FeatureExtractor {
      constructor(config) {
        super(config);
        this.config.mel_filters ??= getMelFilters(this.config.sampling_rate, this.config.n_fft, this.config.feature_size);
      }
      /**
       * Calculates the index offset for a given index and window size.
       * @param {number} i The index.
       * @param {number} w The window size.
       * @returns {number} The index offset.
       */
      calcOffset(i2, w) {
        return Math.abs((i2 + w) % (2 * w) - w);
      }
      /**
       * Pads an array with a reflected version of itself on both ends.
       * @param {Float32Array} array The array to pad.
       * @param {number} left The amount of padding to add to the left.
       * @param {number} right The amount of padding to add to the right.
       * @returns {Float32Array} The padded array.
       */
      padReflect(array, left, right) {
        const padded = new Float32Array(array.length + left + right);
        const w = array.length - 1;
        for (let i2 = 0; i2 < array.length; ++i2) {
          padded[left + i2] = array[i2];
        }
        for (let i2 = 1; i2 <= left; ++i2) {
          padded[left - i2] = array[this.calcOffset(i2, w)];
        }
        for (let i2 = 1; i2 <= right; ++i2) {
          padded[w + left + i2] = array[this.calcOffset(w - i2, w)];
        }
        return padded;
      }
      /**
       * Calculates the complex Short-Time Fourier Transform (STFT) of the given framed signal.
       * 
       * @param {number[][]} frames A 2D array representing the signal frames.
       * @param {number[]} window A 1D array representing the window to be applied to the frames.
       * @returns {Object} An object with the following properties:
       * - data: A 1D array representing the complex STFT of the signal.
       * - dims: An array representing the dimensions of the STFT data, i.e. [num_frames, num_fft_bins].
       */
      stft(frames, window5) {
        const fft_size = this.config.n_fft;
        const a = 2 * (fft_size - 1);
        const b = 2 * (2 * fft_size - 1);
        const nextP2 = 2 ** Math.ceil(Math.log2(b));
        const num_fft_bins = fft_size + 2;
        const data = new Float32Array(num_fft_bins * frames.length);
        const chirp = new Float32Array(b);
        const ichirp = new Float32Array(nextP2);
        const buffer1 = new Float32Array(nextP2);
        const buffer2 = new Float32Array(nextP2);
        const outBuffer = new Float32Array(nextP2);
        const outBuffer2 = new Float32Array(nextP2);
        const outBuffer3 = new Float32Array(nextP2);
        const theta = -2 * Math.PI / fft_size;
        const baseR = Math.cos(theta);
        const baseI = Math.sin(theta);
        for (let i2 = 0; i2 < b >> 1; ++i2) {
          const e = (i2 + 1 - fft_size) ** 2 / 2;
          const result_mod = Math.sqrt(baseR ** 2 + baseI ** 2) ** e;
          const result_arg = e * Math.atan2(baseI, baseR);
          let i22 = 2 * i2;
          chirp[i22] = result_mod * Math.cos(result_arg);
          chirp[i22 + 1] = result_mod * Math.sin(result_arg);
          ichirp[i22] = chirp[i22];
          ichirp[i22 + 1] = -chirp[i22 + 1];
        }
        const slicedChirp = chirp.subarray(a, b);
        const f = new FFT(nextP2 >> 1);
        f.transform(outBuffer, ichirp);
        for (let i2 = 0; i2 < frames.length; ++i2) {
          const frame = frames[i2];
          for (let j2 = 0; j2 < slicedChirp.length; j2 += 2) {
            const j22 = j2 + 1;
            const j3 = j2 >> 1;
            const a_real = frame[j3] * window5[j3];
            buffer1[j2] = a_real * slicedChirp[j2];
            buffer1[j22] = a_real * slicedChirp[j22];
          }
          f.transform(outBuffer2, buffer1);
          for (let j2 = 0; j2 < outBuffer.length; j2 += 2) {
            const j22 = j2 + 1;
            buffer2[j2] = outBuffer2[j2] * outBuffer[j2] - outBuffer2[j22] * outBuffer[j22];
            buffer2[j22] = outBuffer2[j2] * outBuffer[j22] + outBuffer2[j22] * outBuffer[j2];
          }
          f.inverseTransform(outBuffer3, buffer2);
          const offset = i2 * num_fft_bins;
          for (let j2 = 0; j2 < num_fft_bins; j2 += 2) {
            const a_real = outBuffer3[j2 + a];
            const a_imag = outBuffer3[j2 + a + 1];
            const b_real = slicedChirp[j2];
            const b_imag = slicedChirp[j2 + 1];
            const o1 = offset + j2;
            data[o1] = a_real * b_real - a_imag * b_imag;
            data[o1 + 1] = a_real * b_imag + a_imag * b_real;
          }
        }
        return {
          data,
          dims: [frames.length, num_fft_bins]
          // [3001, 402]
        };
      }
      /**
       * Creates an array of frames from a given waveform.
       *
       * @param {Float32Array} waveform The waveform to create frames from.
       * @param {boolean} [center=true] Whether to center the frames on their corresponding positions in the waveform. Defaults to true.
       * @returns {Array} An array of frames.
       */
      fram_wave(waveform, center = true) {
        const frames = [];
        const half_window = Math.floor((this.config.n_fft - 1) / 2) + 1;
        const waveformLength = waveform.length;
        for (let i2 = 0; i2 < waveformLength + 1; i2 += this.config.hop_length) {
          let frame;
          if (center) {
            let frameStart = i2 > half_window ? i2 - half_window : 0;
            let frameEnd = i2 < waveformLength - half_window ? i2 + half_window : waveformLength;
            frame = waveform.subarray(frameStart, frameEnd);
            if (frameStart === 0) {
              frame = this.padReflect(
                frame,
                -i2 + half_window,
                0
              );
            } else if (frameEnd === waveformLength) {
              frame = this.padReflect(
                frame,
                0,
                i2 - waveformLength + half_window
              );
            }
          } else {
            frame = new Float32Array(this.config.n_fft);
            const frameArray = waveform.subarray(i2, i2 + this.config.n_fft);
            if (frameArray.length < this.config.n_fft) {
              frame.set(frameArray);
              frame.fill(0, frameArray.length, this.config.n_fft);
            } else {
              frame = frameArray;
            }
          }
          frames.push(frame);
        }
        return frames;
      }
      /**
       * Generates a Hanning window of length M.
       *
       * @param {number} M The length of the Hanning window to generate.
       * @returns {*} The generated Hanning window.
       */
      hanning(M) {
        if (M < 1) {
          return [];
        }
        if (M === 1) {
          return [1];
        }
        const denom = M - 1;
        const cos_vals = new Float32Array(denom);
        for (let i2 = 0; i2 < denom; ++i2) {
          const n = 2 * i2 - M + 1;
          cos_vals[i2] = 0.5 + 0.5 * Math.cos(Math.PI * n / denom);
        }
        return cos_vals;
      }
      /**
       * Computes the log-Mel spectrogram of the provided audio waveform.
       * @param {Float32Array} waveform The audio waveform to process.
       * @returns {{data: Float32Array, dims: number[]}} An object containing the log-Mel spectrogram data as a Float32Array and its dimensions as an array of numbers.
       */
      _extract_fbank_features(waveform) {
        const buffer = new Float32Array(this.config.n_samples);
        buffer.set(waveform);
        const window5 = this.hanning(this.config.n_fft + 1);
        const frames = this.fram_wave(buffer);
        const stft = this.stft(frames, window5);
        const stftData = stft.data;
        const d1 = stft.dims[0] - 1;
        const d2 = stft.dims[1] >> 1;
        const magnitudes = new Float32Array(d1 * d2);
        for (let i2 = 0; i2 < d1; ++i2) {
          for (let j2 = 0; j2 < d2; ++j2) {
            let outOffset = i2 * d2 + j2;
            let inOffset = outOffset << 1;
            let magnitude3 = stftData[inOffset] ** 2 + stftData[inOffset + 1] ** 2;
            magnitudes[outOffset] = magnitude3;
          }
        }
        const mel_filters = this.config.mel_filters;
        const num_mel_filters = mel_filters.length;
        const mel_spec = new Float32Array(num_mel_filters * d1);
        let mIndex = 0;
        for (let i2 = 0; i2 < num_mel_filters; ++i2) {
          const mel_filter = mel_filters[i2];
          for (let j2 = 0; j2 < d1; ++j2) {
            let sum = 0;
            for (let k = 0; k < d2; ++k) {
              sum += mel_filter[k] * magnitudes[j2 * d2 + k];
            }
            mel_spec[mIndex++] = sum;
          }
        }
        const a_min = 1e-10;
        const log_spec = new Float32Array(mel_spec.length);
        let maxLogSpec = 0;
        for (let i2 = 0; i2 < mel_spec.length; ++i2) {
          const clipped = Math.max(a_min, mel_spec[i2]);
          const log10 = Math.log10(clipped);
          log_spec[i2] = log10;
          maxLogSpec = Math.max(log10, maxLogSpec);
        }
        for (let i2 = 0; i2 < log_spec.length; ++i2) {
          log_spec[i2] = Math.max(log_spec[i2], maxLogSpec - 8);
          log_spec[i2] = (log_spec[i2] + 4) / 4;
        }
        return {
          data: log_spec,
          dims: [num_mel_filters, d1]
        };
      }
      /**
       * Asynchronously extracts features from a given audio using the provided configuration.
       * @param {Float32Array} audio The audio data as a Float32Array.
       * @returns {Promise<{ input_features: Tensor }>} A Promise resolving to an object containing the extracted input features as a Tensor.
      */
      async _call(audio) {
        if (audio.length > this.config.n_samples) {
          console.warn(
            "Attempting to extract features for audio longer than 30 seconds. If using a pipeline to extract transcript from a long audio clip, remember to specify `chunk_length_s` and/or `stride_length_s`."
          );
        }
        let waveform = audio.slice(0, this.config.n_samples);
        let features = this._extract_fbank_features(waveform);
        return {
          input_features: new Tensor3(
            "float32",
            features.data,
            [1, ...features.dims]
          )
        };
      }
    };
    Processor = class extends Callable {
      /**
       * Creates a new Processor with the given feature extractor.
       * @param {FeatureExtractor} feature_extractor The function used to extract features from the input.
       */
      constructor(feature_extractor) {
        super();
        this.feature_extractor = feature_extractor;
      }
      /**
       * Calls the feature_extractor function with the given input.
       * @param {any} input The input to extract features from.
       * @returns {Promise<any>} A Promise that resolves with the extracted features.
       */
      async _call(input) {
        return await this.feature_extractor(input);
      }
    };
    SamProcessor = class extends Processor {
      async _call(images, input_points) {
        return await this.feature_extractor(images, input_points);
      }
      /**
       * @borrows SamImageProcessor#post_process_masks as post_process_masks
       */
      post_process_masks(...args2) {
        return this.feature_extractor.post_process_masks(...args2);
      }
    };
    WhisperProcessor = class extends Processor {
      /**
       * Calls the feature_extractor function with the given audio input.
       * @param {any} audio The audio input to extract features from.
       * @returns {Promise<any>} A Promise that resolves with the extracted features.
       */
      async _call(audio) {
        return await this.feature_extractor(audio);
      }
    };
    AutoProcessor = class {
      static FEATURE_EXTRACTOR_CLASS_MAPPING = {
        "WhisperFeatureExtractor": WhisperFeatureExtractor,
        "ViTFeatureExtractor": ViTFeatureExtractor,
        "DetrFeatureExtractor": DetrFeatureExtractor,
        "SamImageProcessor": SamImageProcessor
      };
      static PROCESSOR_CLASS_MAPPING = {
        "WhisperProcessor": WhisperProcessor,
        "SamProcessor": SamProcessor
      };
      /**
       * Instantiate one of the processor classes of the library from a pretrained model.
       * 
       * The processor class to instantiate is selected based on the `feature_extractor_type` property of the config object
       * (either passed as an argument or loaded from `pretrained_model_name_or_path` if possible)
       * 
       * @param {string} pretrained_model_name_or_path The name or path of the pretrained model. Can be either:
       * - A string, the *model id* of a pretrained processor hosted inside a model repo on huggingface.co.
       *   Valid model ids can be located at the root-level, like `bert-base-uncased`, or namespaced under a
       *   user or organization name, like `dbmdz/bert-base-german-cased`.
       * - A path to a *directory* containing processor files, e.g., `./my_model_directory/`.
       * @param {PretrainedOptions} options Additional options for loading the processor.
       * 
       * @returns {Promise<Processor>} A new instance of the Processor class.
       */
      static async from_pretrained(pretrained_model_name_or_path, {
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = "main"
      } = {}) {
        let preprocessorConfig = config ?? await getModelJSON(pretrained_model_name_or_path, "preprocessor_config.json", true, {
          progress_callback,
          config,
          cache_dir,
          local_files_only,
          revision
        });
        let key = preprocessorConfig.feature_extractor_type ?? preprocessorConfig.image_processor_type;
        let feature_extractor_class = this.FEATURE_EXTRACTOR_CLASS_MAPPING[key];
        if (!feature_extractor_class) {
          if (preprocessorConfig.size !== void 0) {
            console.warn("Feature extractor type not specified, assuming ImageFeatureExtractor due to size parameter in config.");
            feature_extractor_class = ImageFeatureExtractor;
          } else {
            throw new Error(`Unknown Feature Extractor type: ${preprocessorConfig.feature_extractor_type}`);
          }
        }
        let processor_class = this.PROCESSOR_CLASS_MAPPING[preprocessorConfig.processor_class] ?? Processor;
        let feature_extractor = new feature_extractor_class(preprocessorConfig);
        return new processor_class(feature_extractor);
      }
    };
  }
});

// node_modules/@xenova/transformers/src/pipelines.js
async function prepareImages(images) {
  if (!Array.isArray(images)) {
    images = [images];
  }
  images = await Promise.all(images.map((x) => RawImage.read(x)));
  return images;
}
async function pipeline(task, model = null, {
  quantized = true,
  progress_callback = null,
  config = null,
  cache_dir = null,
  local_files_only = false,
  revision = "main"
} = {}) {
  task = TASK_ALIASES[task] ?? task;
  let pipelineInfo = SUPPORTED_TASKS[task.split("_", 1)[0]];
  if (!pipelineInfo) {
    throw Error(`Unsupported pipeline: ${task}. Must be one of [${Object.keys(SUPPORTED_TASKS)}]`);
  }
  if (!model) {
    model = pipelineInfo.default.model;
    console.log(`No model specified. Using default model: "${model}".`);
  }
  let tokenizerClass = pipelineInfo.tokenizer;
  let modelClass = pipelineInfo.model;
  let pipelineClass = pipelineInfo.pipeline;
  let processorClass = pipelineInfo.processor;
  let promises = [];
  let pretrainedOptions = {
    quantized,
    progress_callback,
    config,
    cache_dir,
    local_files_only,
    revision
  };
  if (tokenizerClass) {
    promises.push(
      tokenizerClass.from_pretrained(model, pretrainedOptions)
    );
  }
  if (modelClass) {
    promises.push(
      modelClass.from_pretrained(model, pretrainedOptions)
    );
  }
  if (processorClass) {
    promises.push(
      processorClass.from_pretrained(model, pretrainedOptions)
    );
  }
  let items = await Promise.all(promises);
  dispatchCallback(progress_callback, {
    "status": "ready",
    "task": task,
    "model": model
  });
  return new pipelineClass(task, ...items);
}
function product(...a) {
  return a.reduce((a2, b) => a2.flatMap((d) => b.map((e) => [d, e])));
}
var Pipeline, TextClassificationPipeline, TokenClassificationPipeline, QuestionAnsweringPipeline, FillMaskPipeline, Text2TextGenerationPipeline, SummarizationPipeline, TranslationPipeline, TextGenerationPipeline, ZeroShotClassificationPipeline, FeatureExtractionPipeline, AutomaticSpeechRecognitionPipeline, ImageToTextPipeline, ImageClassificationPipeline, ImageSegmentationPipeline, ZeroShotImageClassificationPipeline, ObjectDetectionPipeline, SUPPORTED_TASKS, TASK_ALIASES;
var init_pipelines = __esm({
  "node_modules/@xenova/transformers/src/pipelines.js"() {
    init_tokenizers();
    init_models();
    init_processors();
    init_core();
    init_maths();
    init_audio();
    init_tensor2();
    init_image();
    Pipeline = class extends Callable {
      /**
       * Create a new Pipeline.
       * @param {string} task The task of the pipeline. Useful for specifying subtasks.
       * @param {PreTrainedTokenizer} tokenizer The tokenizer to use.
       * @param {PreTrainedModel} model The model to use.
       */
      constructor(task, tokenizer, model) {
        super();
        this.task = task;
        this.tokenizer = tokenizer;
        this.model = model;
      }
      /**
       * Disposes the model.
       * @returns {Promise<void>} A promise that resolves when the model has been disposed.
       */
      async dispose() {
        await this.model.dispose();
      }
      /**
       * Executes the task associated with the pipeline.
       * @param {any} texts The input texts to be processed.
       * @returns {Promise<any>} A promise that resolves to an array containing the inputs and outputs of the task.
       */
      async _call(texts) {
        let inputs = this.tokenizer(texts, {
          padding: true,
          truncation: true
        });
        let outputs = await this.model(inputs);
        return [inputs, outputs];
      }
    };
    TextClassificationPipeline = class extends Pipeline {
      /**
       * Executes the text classification task.
       * @param {any} texts The input texts to be classified.
       * @param {Object} options An optional object containing the following properties:
       * @param {number} [options.topk=1] The number of top predictions to be returned.
       * @returns {Promise<Object[]|Object>} A promise that resolves to an array or object containing the predicted labels and scores.
       */
      async _call(texts, {
        topk = 1
      } = {}) {
        let [inputs, outputs] = await super._call(texts);
        let id2label = this.model.config.id2label;
        let toReturn = [];
        for (let batch of outputs.logits) {
          let scores = getTopItems(softmax(batch.data), topk);
          let vals = scores.map(function(x) {
            return {
              label: id2label[x[0]],
              score: x[1]
            };
          });
          if (topk === 1) {
            toReturn.push(...vals);
          } else {
            toReturn.push(vals);
          }
        }
        return Array.isArray(texts) || topk === 1 ? toReturn : toReturn[0];
      }
    };
    TokenClassificationPipeline = class extends Pipeline {
      /**
       * Executes the token classification task.
       * @param {any} texts The input texts to be classified.
       * @param {Object} options An optional object containing the following properties:
       * @returns {Promise<Object[]|Object>} A promise that resolves to an array or object containing the predicted labels and scores.
       */
      async _call(texts, {
        ignore_labels = ["O"]
        // TODO init param?
      } = {}) {
        let isBatched = Array.isArray(texts);
        if (!isBatched) {
          texts = [texts];
        }
        let tokenizer = this.tokenizer;
        let [inputs, outputs] = await super._call(texts);
        let logits = outputs.logits;
        let id2label = this.model.config.id2label;
        let toReturn = [];
        for (let i2 = 0; i2 < logits.dims[0]; ++i2) {
          let ids = inputs.input_ids[i2];
          let batch = logits[i2];
          let tokens = [];
          for (let j2 = 0; j2 < batch.dims[0]; ++j2) {
            let tokenData = batch[j2];
            let topScoreIndex = max(tokenData.data)[1];
            let entity = id2label[topScoreIndex];
            if (ignore_labels.includes(entity)) {
              continue;
            }
            let word = tokenizer.decode([ids[j2].item()], { skip_special_tokens: true });
            if (word === "") {
              continue;
            }
            let scores = softmax(tokenData.data);
            tokens.push({
              entity,
              score: scores[topScoreIndex],
              index: j2,
              word,
              // TODO: null for now, but will add
              start: null,
              end: null
            });
          }
          toReturn.push(tokens);
        }
        return isBatched ? toReturn : toReturn[0];
      }
    };
    QuestionAnsweringPipeline = class extends Pipeline {
      /**
       * Executes the question answering task.
       * @param {string|string[]} question The question(s) to be answered.
       * @param {string|string[]} context The context(s) where the answer(s) can be found.
       * @param {Object} options An optional object containing the following properties:
       * @param {number} [options.topk=1] The number of top answer predictions to be returned.
       * @returns {Promise<any>} A promise that resolves to an array or object containing the predicted answers and scores.
       */
      // @ts-ignore
      async _call(question, context, {
        topk = 1
      } = {}) {
        let inputs = this.tokenizer(question, {
          text_pair: context
        });
        let output = await this.model(inputs);
        let toReturn = [];
        for (let j2 = 0; j2 < output.start_logits.dims[0]; ++j2) {
          let ids = inputs.input_ids[j2];
          let sepIndex = ids.indexOf(this.tokenizer.sep_token_id);
          let s1 = Array.from(softmax(output.start_logits[j2].data)).map((x, i2) => [x, i2]).filter((x) => x[1] > sepIndex);
          let e1 = Array.from(softmax(output.end_logits[j2].data)).map((x, i2) => [x, i2]).filter((x) => x[1] > sepIndex);
          let options = product(s1, e1).filter((x) => x[0][1] <= x[1][1]).map((x) => [x[0][1], x[1][1], x[0][0] * x[1][0]]).sort((a, b) => b[2] - a[2]);
          for (let k = 0; k < Math.min(options.length, topk); ++k) {
            let [start2, end, score] = options[k];
            let answer_tokens = [...ids].slice(start2, end + 1);
            let answer = this.tokenizer.decode(answer_tokens, {
              skip_special_tokens: true
            });
            toReturn.push({
              answer,
              score
            });
          }
        }
        return topk === 1 ? toReturn[0] : toReturn;
      }
    };
    FillMaskPipeline = class extends Pipeline {
      /**
       * Fill the masked token in the text(s) given as inputs.
       * @param {any} texts The masked input texts.
       * @param {Object} options An optional object containing the following properties:
       * @param {number} [options.topk=5] The number of top predictions to be returned.
       * @returns {Promise<Object[]|Object>} A promise that resolves to an array or object containing the predicted tokens and scores.
       */
      async _call(texts, {
        topk = 5
      } = {}) {
        let [inputs, outputs] = await super._call(texts);
        let tokenizer = this.tokenizer;
        let toReturn = [];
        for (let i2 = 0; i2 < inputs.input_ids.dims[0]; ++i2) {
          let ids = inputs.input_ids[i2];
          let mask_token_index = ids.indexOf(this.tokenizer.mask_token_id);
          if (mask_token_index === -1) {
            throw Error(`Mask token (${tokenizer.mask_token}) not found in text.`);
          }
          let logits = outputs.logits[i2];
          let itemLogits = logits[mask_token_index];
          let scores = getTopItems(softmax(itemLogits.data), topk);
          toReturn.push(scores.map((x) => {
            let sequence = [...ids];
            sequence[mask_token_index] = x[0];
            return {
              score: x[1],
              token: x[0],
              token_str: tokenizer.model.vocab[x[0]],
              sequence: tokenizer.decode(sequence, { skip_special_tokens: true })
            };
          }));
        }
        return Array.isArray(texts) ? toReturn : toReturn[0];
      }
    };
    Text2TextGenerationPipeline = class extends Pipeline {
      _key = null;
      /**
       * Fill the masked token in the text(s) given as inputs.
       * @param {string|string[]} texts The text or array of texts to be processed.
       * @param {Object} [options={}] Options for the fill-mask pipeline.
       * @param {number} [options.topk=5] The number of top-k predictions to return.
       * @returns {Promise<any>} An array of objects containing the score, predicted token, predicted token string,
       * and the sequence with the predicted token filled in, or an array of such arrays (one for each input text).
       * If only one input text is given, the output will be an array of objects.
       * @throws {Error} When the mask token is not found in the input text.
       */
      async _call(texts, generate_kwargs = {}) {
        if (!Array.isArray(texts)) {
          texts = [texts];
        }
        if (this.model.config.prefix) {
          texts = texts.map((x) => this.model.config.prefix + x);
        }
        let task_specific_params = this.model.config.task_specific_params;
        if (task_specific_params && task_specific_params[this.task]) {
          if (task_specific_params[this.task].prefix) {
            texts = texts.map((x) => task_specific_params[this.task].prefix + x);
          }
        }
        let tokenizer_options = {
          padding: true,
          truncation: true
        };
        let input_ids;
        if (this instanceof TranslationPipeline && "_build_translation_inputs" in this.tokenizer) {
          input_ids = this.tokenizer._build_translation_inputs(texts, tokenizer_options, generate_kwargs).input_ids;
        } else {
          input_ids = this.tokenizer(texts, tokenizer_options).input_ids;
        }
        let outputTokenIds = (await this.model.generate(input_ids, generate_kwargs)).flat();
        let toReturn = this.tokenizer.batch_decode(outputTokenIds, {
          skip_special_tokens: true
        });
        if (this._key !== null) {
          toReturn = toReturn.map((text) => {
            return this._key === null ? text : { [this._key]: text };
          });
        }
        return toReturn;
      }
    };
    SummarizationPipeline = class extends Text2TextGenerationPipeline {
      _key = "summary_text";
    };
    TranslationPipeline = class extends Text2TextGenerationPipeline {
      _key = "translation_text";
    };
    TextGenerationPipeline = class extends Pipeline {
      /**
       * Generates text based on an input prompt.
       * @param {any} texts The input prompt or prompts to generate text from.
       * @param {Object} [generate_kwargs={}] Additional arguments for text generation.
       * @returns {Promise<any>} The generated text or texts.
       */
      async _call(texts, generate_kwargs = {}) {
        let stringInput = typeof texts === "string" || texts instanceof String;
        if (stringInput) {
          texts = [texts];
        }
        this.tokenizer.padding_side = "left";
        let inputs = this.tokenizer(texts, {
          padding: true,
          truncation: true
        });
        let input_ids = inputs.input_ids;
        let attention_mask = inputs.attention_mask;
        let outputTokenIds = await this.model.generate(input_ids, generate_kwargs, null, {
          inputs_attention_mask: attention_mask
        });
        let toReturn = outputTokenIds.map((outTokens, i2) => {
          let startText = texts[i2].trim();
          let decoded = this.tokenizer.batch_decode(outTokens, {
            skip_special_tokens: true
          }).map((x) => {
            return {
              generated_text: startText + x
            };
          });
          return decoded;
        });
        return stringInput && toReturn.length === 1 ? toReturn[0] : toReturn;
      }
    };
    ZeroShotClassificationPipeline = class extends Pipeline {
      /**
       * Create a new ZeroShotClassificationPipeline.
       * @param {string} task The task of the pipeline. Useful for specifying subtasks.
       * @param {PreTrainedTokenizer} tokenizer The tokenizer to use.
       * @param {PreTrainedModel} model The model to use.
       */
      constructor(task, tokenizer, model) {
        super(task, tokenizer, model);
        this.label2id = Object.fromEntries(
          Object.entries(this.model.config.label2id).map(
            ([k, v]) => [k.toLowerCase(), v]
          )
        );
        this.entailment_id = this.label2id["entailment"];
        if (this.entailment_id === void 0) {
          console.warn("Could not find 'entailment' in label2id mapping. Using 2 as entailment_id.");
          this.entailment_id = 2;
        }
        this.contradiction_id = this.label2id["contradiction"];
        if (this.contradiction_id === void 0) {
          console.warn("Could not find 'contradiction' in label2id mapping. Using 0 as contradiction_id.");
          this.contradiction_id = 0;
        }
      }
      /**
       * @param {any[]} texts
       * @param {string[]} candidate_labels
       * @param {Object} options Additional options:
       * @param {string} [options.hypothesis_template="This example is {}."] The template used to turn each
       * candidate label into an NLI-style hypothesis. The candidate label will replace the {} placeholder.
       * @param {boolean} [options.multi_label=false] Whether or not multiple candidate labels can be true.
       * If `false`, the scores are normalized such that the sum of the label likelihoods for each sequence
       * is 1. If `true`, the labels are considered independent and probabilities are normalized for each
       * candidate by doing a softmax of the entailment score vs. the contradiction score.
       * @return {Promise<Object|Object[]>} The prediction(s), as a map (or list of maps) from label to score.
       */
      // @ts-ignore
      async _call(texts, candidate_labels, {
        hypothesis_template = "This example is {}.",
        multi_label = false
      } = {}) {
        let isBatched = Array.isArray(texts);
        if (!isBatched) {
          texts = [texts];
        }
        if (!Array.isArray(candidate_labels)) {
          candidate_labels = [candidate_labels];
        }
        let hypotheses = candidate_labels.map(
          (x) => hypothesis_template.replace("{}", x)
        );
        let softmaxEach = multi_label || candidate_labels.length === 1;
        let toReturn = [];
        for (let premise of texts) {
          let entails_logits = [];
          for (let hypothesis of hypotheses) {
            let inputs = this.tokenizer(premise, {
              text_pair: hypothesis
            });
            let outputs = await this.model(inputs);
            if (softmaxEach) {
              entails_logits.push([
                outputs.logits.data[this.contradiction_id],
                outputs.logits.data[this.entailment_id]
              ]);
            } else {
              entails_logits.push(outputs.logits.data[this.entailment_id]);
            }
          }
          let scores;
          if (softmaxEach) {
            scores = entails_logits.map((x) => softmax(x)[1]);
          } else {
            scores = softmax(entails_logits);
          }
          let scores_sorted = scores.map((x, i2) => [x, i2]).sort((a, b) => {
            return b[0] - a[0];
          });
          toReturn.push({
            sequence: premise,
            labels: scores_sorted.map((x) => candidate_labels[x[1]]),
            scores: scores_sorted.map((x) => x[0])
          });
        }
        return isBatched ? toReturn : toReturn[0];
      }
    };
    FeatureExtractionPipeline = class extends Pipeline {
      /**
       * Private method to perform mean pooling of the last hidden state followed by a normalization step.
       * @param {Tensor} last_hidden_state Tensor of shape [batchSize, seqLength, embedDim]
       * @param {Tensor} attention_mask Tensor of shape [batchSize, seqLength]
       * @returns {Tensor} Returns a new Tensor of shape [batchSize, embedDim].
       * @private
       */
      _mean_pooling(last_hidden_state, attention_mask) {
        let shape = [last_hidden_state.dims[0], last_hidden_state.dims[2]];
        let returnedData = new last_hidden_state.data.constructor(shape[0] * shape[1]);
        let [batchSize, seqLength, embedDim] = last_hidden_state.dims;
        let outIndex = 0;
        for (let i2 = 0; i2 < batchSize; ++i2) {
          let offset = i2 * embedDim * seqLength;
          for (let k = 0; k < embedDim; ++k) {
            let sum = 0;
            let count = 0;
            let attnMaskOffset = i2 * seqLength;
            let offset2 = offset + k;
            for (let j2 = 0; j2 < seqLength; ++j2) {
              let attn = Number(attention_mask.data[attnMaskOffset + j2]);
              count += attn;
              sum += last_hidden_state.data[offset2 + j2 * embedDim] * attn;
            }
            let avg = sum / count;
            returnedData[outIndex++] = avg;
          }
        }
        return new Tensor3(
          last_hidden_state.type,
          returnedData,
          shape
        );
      }
      /**
       * Private method to normalize the input tensor along dim=1. 
       * NOTE: only works for tensors of shape [batchSize, embedDim]. Operates in-place.
       * @param {any} tensor Tensor of shape [batchSize, embedDim]
       * @returns {any} Returns the same Tensor object after performing normalization.
       * @private
       */
      _normalize(tensor) {
        for (let batch of tensor) {
          let norm = Math.sqrt(batch.data.reduce((a, b) => a + b * b, 0));
          for (let i2 = 0; i2 < batch.data.length; ++i2) {
            batch.data[i2] /= norm;
          }
        }
        return tensor;
      }
      /**
       * Method to perform mean pooling and normalization of the input texts.
       * @param {string[]} texts An array of texts to embed.
       * @returns {Promise<Tensor>} Returns a new Tensor of shape [batchSize, embedDim].
       */
      async _call(texts) {
        let [inputs, outputs] = await super._call(texts);
        return this._normalize(this._mean_pooling(outputs.last_hidden_state, inputs.attention_mask));
      }
      /**
       * @param {number[]} arr1
       * @param {number[]} arr2
       */
      cos_sim(arr1, arr2, is_normalised = false) {
        return is_normalised ? dot(arr1, arr2) : cos_sim(arr1, arr2);
      }
    };
    AutomaticSpeechRecognitionPipeline = class extends Pipeline {
      /**
       * Create a new AutomaticSpeechRecognitionPipeline.
       * @param {string} task The task of the pipeline. Useful for specifying subtasks.
       * @param {PreTrainedTokenizer} tokenizer The tokenizer to use.
       * @param {PreTrainedModel} model The model to use.
       * @param {Processor} processor The processor to use.
       */
      constructor(task, tokenizer, model, processor) {
        super(task, tokenizer, model);
        this.processor = processor;
      }
      /**
       * Preprocesses the input audio for the AutomaticSpeechRecognitionPipeline.
       * @param {any} audio The audio to be preprocessed.
       * @param {number} sampling_rate The sampling rate of the audio.
       * @returns {Promise<string | ArrayBuffer>} A promise that resolves to the preprocessed audio data.
       * @private
       */
      async _preprocess(audio, sampling_rate) {
        if (isString(audio)) {
          audio = await read_audio(audio, sampling_rate);
        }
        return audio;
      }
      /**
       * Asynchronously processes audio and generates text transcription using the model.
       * @param {Array} audio The audio to be transcribed. Can be a single Float32Array or an array of Float32Arrays.
       * @param {Object} [kwargs={}] Optional arguments.
       * @param {boolean} [kwargs.return_timestamps] Whether to return timestamps or not. Default is false.
       * @param {number} [kwargs.chunk_length_s] The length of audio chunks to process in seconds. Default is 0 (no chunking).
       * @param {number} [kwargs.stride_length_s] The length of overlap between consecutive audio chunks in seconds. If not provided, defaults to chunk_length_s / 6.
       * @param {function} [kwargs.chunk_callback] Callback function to be called with each chunk processed.
       * @param {boolean} [kwargs.force_full_sequences] Whether to force outputting full sequences or not. Default is false.
       * @returns {Promise<Object>} A Promise that resolves to an object containing the transcription text and optionally timestamps if return_timestamps is true.
       */
      async _call(audio, kwargs = {}) {
        let return_timestamps = kwargs.return_timestamps ?? false;
        let chunk_length_s = kwargs.chunk_length_s ?? 0;
        let stride_length_s = kwargs.stride_length_s ?? null;
        let chunk_callback = kwargs.chunk_callback ?? null;
        let force_full_sequences = kwargs.force_full_sequences ?? false;
        let single = !Array.isArray(audio);
        if (single) {
          audio = [audio];
        }
        const sampling_rate = this.processor.feature_extractor.config.sampling_rate;
        const time_precision = this.processor.feature_extractor.config.chunk_length / this.model.config.max_source_positions;
        let toReturn = [];
        for (let aud of audio) {
          aud = await this._preprocess(aud, sampling_rate);
          let chunks = [];
          if (chunk_length_s > 0) {
            if (stride_length_s === null) {
              stride_length_s = chunk_length_s / 6;
            } else if (chunk_length_s <= stride_length_s) {
              throw Error("`chunk_length_s` must be larger than `stride_length_s`.");
            }
            const window5 = sampling_rate * chunk_length_s;
            const stride = sampling_rate * stride_length_s;
            const jump = window5 - 2 * stride;
            let offset = 0;
            while (offset < aud.length) {
              let subarr = aud.subarray(offset, offset + window5);
              let feature = await this.processor(subarr);
              let isFirst = offset === 0;
              let isLast = offset + jump >= aud.length;
              chunks.push({
                stride: [
                  subarr.length,
                  isFirst ? 0 : stride,
                  isLast ? 0 : stride
                ],
                input_features: feature.input_features,
                is_last: isLast
              });
              offset += jump;
            }
          } else {
            chunks = [{
              stride: [aud.length, 0, 0],
              input_features: (await this.processor(aud)).input_features,
              is_last: true
            }];
          }
          for (let chunk of chunks) {
            let data = await this.model.generate(chunk.input_features, kwargs);
            chunk.tokens = data[0].flat();
            chunk.stride = chunk.stride.map((x) => x / sampling_rate);
            if (chunk_callback !== null) {
              chunk_callback(chunk);
            }
          }
          let [full_text, optional] = this.tokenizer._decode_asr(chunks, {
            time_precision,
            return_timestamps,
            force_full_sequences
          });
          toReturn.push({ text: full_text, ...optional });
        }
        return single ? toReturn[0] : toReturn;
      }
    };
    ImageToTextPipeline = class extends Pipeline {
      /**
       * Create a new ImageToTextPipeline.
       * @param {string} task The task of the pipeline. Useful for specifying subtasks.
       * @param {PreTrainedTokenizer} tokenizer The tokenizer to use.
       * @param {PreTrainedModel} model The model to use.
       * @param {Processor} processor The processor to use.
       */
      constructor(task, tokenizer, model, processor) {
        super(task, tokenizer, model);
        this.processor = processor;
      }
      /**
       * Assign labels to the image(s) passed as inputs.
       * @param {any[]} images The images to be captioned.
       * @param {Object} [generate_kwargs={}] Optional generation arguments.
       * @returns {Promise<Object|Object[]>} A Promise that resolves to an object (or array of objects) containing the generated text(s).
       */
      async _call(images, generate_kwargs = {}) {
        let isBatched = Array.isArray(images);
        images = await prepareImages(images);
        let { pixel_values } = await this.processor(images);
        let toReturn = [];
        for (let batch of pixel_values) {
          batch.dims = [1, ...batch.dims];
          let output = (await this.model.generate(batch, generate_kwargs)).flat();
          let decoded = this.tokenizer.batch_decode(output, {
            skip_special_tokens: true
          }).map((x) => {
            return { generated_text: x.trim() };
          });
          toReturn.push(decoded);
        }
        return isBatched ? toReturn : toReturn[0];
      }
    };
    ImageClassificationPipeline = class extends Pipeline {
      /**
       * Create a new ImageClassificationPipeline.
       * @param {string} task The task of the pipeline. Useful for specifying subtasks.
       * @param {PreTrainedModel} model The model to use.
       * @param {Processor} processor The processor to use.
       */
      constructor(task, model, processor) {
        super(task, null, model);
        this.processor = processor;
      }
      /**
       * Classify the given images.
       * @param {any} images The images to classify.
       * @param {Object} options The options to use for classification.
       * @param {number} [options.topk=1] The number of top results to return.
       * @returns {Promise<any>} The top classification results for the images.
       */
      async _call(images, {
        topk = 1
      } = {}) {
        let isBatched = Array.isArray(images);
        images = await prepareImages(images);
        let { pixel_values } = await this.processor(images);
        let output = await this.model({ pixel_values });
        let id2label = this.model.config.id2label;
        let toReturn = [];
        for (let batch of output.logits) {
          let scores = getTopItems(softmax(batch.data), topk);
          let vals = scores.map(function(x) {
            return {
              label: id2label[x[0]],
              score: x[1]
            };
          });
          if (topk === 1) {
            toReturn.push(...vals);
          } else {
            toReturn.push(vals);
          }
        }
        return isBatched || topk === 1 ? toReturn : toReturn[0];
      }
    };
    ImageSegmentationPipeline = class extends Pipeline {
      /**
       * Create a new ImageSegmentationPipeline.
       * @param {string} task The task of the pipeline. Useful for specifying subtasks.
       * @param {PreTrainedModel} model The model to use.
       * @param {Processor} processor The processor to use.
       */
      constructor(task, model, processor) {
        super(task, null, model);
        this.processor = processor;
        this.subtasks_mapping = {
          // Mapping of subtasks to their corresponding post-processing function names.
          panoptic: "post_process_panoptic_segmentation",
          instance: "post_process_instance_segmentation",
          semantic: "post_process_semantic_segmentation"
        };
      }
      /**
       * Segment the input images.
       * @param {Array} images The input images.
       * @param {Object} options The options to use for segmentation.
       * @param {number} [options.threshold=0.5] Probability threshold to filter out predicted masks.
       * @param {number} [options.mask_threshold=0.5] Threshold to use when turning the predicted masks into binary values.
       * @param {number} [options.overlap_mask_area_threshold=0.8] Mask overlap threshold to eliminate small, disconnected segments.
       * @param {null|string} [options.subtask=null] Segmentation task to be performed. One of [`panoptic`, `instance`, and `semantic`], depending on model capabilities. If not set, the pipeline will attempt to resolve (in that order).
       * @param {Array} [options.label_ids_to_fuse=null] List of label ids to fuse. If not set, do not fuse any labels.
       * @param {Array} [options.target_sizes=null] List of target sizes for the input images. If not set, use the original image sizes.
       * @returns {Promise<Array>} The annotated segments.
       */
      async _call(images, {
        threshold = 0.5,
        mask_threshold = 0.5,
        overlap_mask_area_threshold = 0.8,
        label_ids_to_fuse = null,
        target_sizes = null,
        subtask = null
        // TODO use
      } = {}) {
        let isBatched = Array.isArray(images);
        if (isBatched && images.length !== 1) {
          throw Error("Image segmentation pipeline currently only supports a batch size of 1.");
        }
        images = await prepareImages(images);
        let imageSizes = images.map((x) => [x.height, x.width]);
        let { pixel_values, pixel_mask } = await this.processor(images);
        let output = await this.model({ pixel_values, pixel_mask });
        let fn = null;
        if (subtask !== null) {
          fn = this.subtasks_mapping[subtask];
        } else {
          for (let [task, func2] of Object.entries(this.subtasks_mapping)) {
            if (func2 in this.processor.feature_extractor) {
              fn = this.processor.feature_extractor[func2].bind(this.processor.feature_extractor);
              subtask = task;
              break;
            }
          }
        }
        let annotation = [];
        if (subtask === "panoptic" || subtask === "instance") {
          let processed = fn(
            output,
            threshold,
            mask_threshold,
            overlap_mask_area_threshold,
            label_ids_to_fuse,
            target_sizes ?? imageSizes
            // TODO FIX?
          )[0];
          let segmentation = processed.segmentation;
          let id2label = this.model.config.id2label;
          for (let segment of processed.segments_info) {
            let maskData = new Uint8ClampedArray(segmentation.data.length);
            for (let i2 = 0; i2 < segmentation.data.length; ++i2) {
              if (segmentation.data[i2] === segment.id) {
                maskData[i2] = 255;
              }
            }
            let mask = new RawImage(maskData, segmentation.dims[1], segmentation.dims[0], 1);
            annotation.push({
              score: segment.score,
              label: id2label[segment.label_id],
              mask
            });
          }
        } else if (subtask === "semantic") {
          throw Error(`semantic segmentation not yet supported.`);
        } else {
          throw Error(`Subtask ${subtask} not supported.`);
        }
        return annotation;
      }
    };
    ZeroShotImageClassificationPipeline = class extends Pipeline {
      /**
       * Create a new ZeroShotImageClassificationPipeline.
       * @param {string} task The task of the pipeline. Useful for specifying subtasks.
       * @param {PreTrainedTokenizer} tokenizer The tokenizer to use.
       * @param {PreTrainedModel} model The model to use.
       * @param {Processor} processor The processor to use.
       */
      constructor(task, tokenizer, model, processor) {
        super(task, tokenizer, model);
        this.processor = processor;
      }
      /**
       * Classify the input images with candidate labels using a zero-shot approach.
       * @param {Array} images The input images.
       * @param {Array} candidate_labels The candidate labels.
       * @param {Object} options The options for the classification.
       * @param {string} [options.hypothesis_template] The hypothesis template to use for zero-shot classification. Default: "This is a photo of {}".
       * @returns {Promise<any>} An array of classifications for each input image or a single classification object if only one input image is provided.
       */
      // @ts-ignore
      async _call(images, candidate_labels, {
        hypothesis_template = "This is a photo of {}"
      } = {}) {
        let isBatched = Array.isArray(images);
        images = await prepareImages(images);
        let texts = candidate_labels.map(
          (x) => hypothesis_template.replace("{}", x)
        );
        let text_inputs = this.tokenizer(texts, {
          padding: true,
          truncation: true
        });
        let { pixel_values } = await this.processor(images);
        let output = await this.model({ ...text_inputs, pixel_values });
        let toReturn = [];
        for (let batch of output.logits_per_image) {
          let probs = softmax(batch.data);
          toReturn.push([...probs].map((x, i2) => {
            return {
              score: x,
              label: candidate_labels[i2]
            };
          }));
        }
        return isBatched ? toReturn : toReturn[0];
      }
    };
    ObjectDetectionPipeline = class extends Pipeline {
      /**
       * Create a new ObjectDetectionPipeline.
       * @param {string} task The task of the pipeline. Useful for specifying subtasks.
       * @param {PreTrainedModel} model The model to use.
       * @param {Processor} processor The processor to use.
       */
      constructor(task, model, processor) {
        super(task, null, model);
        this.processor = processor;
      }
      /**
       * Detect objects (bounding boxes & classes) in the image(s) passed as inputs.
       * @param {any[]} images The input images.
       * @param {Object} options The options for the object detection.
       * @param {number} [options.threshold=0.9] The threshold used to filter boxes by score.
       * @param {boolean} [options.percentage=false] Whether to return the boxes coordinates in percentage (true) or in pixels (false).
       */
      async _call(images, {
        threshold = 0.9,
        percentage = false
      } = {}) {
        let isBatched = Array.isArray(images);
        if (isBatched && images.length !== 1) {
          throw Error("Object detection pipeline currently only supports a batch size of 1.");
        }
        images = await prepareImages(images);
        let imageSizes = percentage ? null : images.map((x) => [x.height, x.width]);
        let { pixel_values, pixel_mask } = await this.processor(images);
        let output = await this.model({ pixel_values, pixel_mask });
        let processed = this.processor.feature_extractor.post_process_object_detection(output, threshold, imageSizes);
        let id2label = this.model.config.id2label;
        processed.forEach((x) => x.labels = x.classes.map((y) => id2label[y]));
        return isBatched ? processed : processed[0];
      }
    };
    SUPPORTED_TASKS = {
      "text-classification": {
        "tokenizer": AutoTokenizer,
        "pipeline": TextClassificationPipeline,
        "model": AutoModelForSequenceClassification,
        "default": {
          // TODO: replace with original
          // "model": "distilbert-base-uncased-finetuned-sst-2-english",
          "model": "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
        },
        "type": "text"
      },
      "token-classification": {
        "tokenizer": AutoTokenizer,
        "pipeline": TokenClassificationPipeline,
        "model": AutoModelForTokenClassification,
        "default": {
          // TODO: replace with original
          // "model": "Davlan/bert-base-multilingual-cased-ner-hrl",
          "model": "Xenova/bert-base-multilingual-cased-ner-hrl"
        },
        "type": "text"
      },
      "question-answering": {
        "tokenizer": AutoTokenizer,
        "pipeline": QuestionAnsweringPipeline,
        "model": AutoModelForQuestionAnswering,
        "default": {
          // TODO: replace with original
          // "model": "distilbert-base-cased-distilled-squad",
          "model": "Xenova/distilbert-base-cased-distilled-squad"
        },
        "type": "text"
      },
      "fill-mask": {
        "tokenizer": AutoTokenizer,
        "pipeline": FillMaskPipeline,
        "model": AutoModelForMaskedLM,
        "default": {
          // TODO: replace with original
          // "model": "bert-base-uncased",
          "model": "Xenova/bert-base-uncased"
        },
        "type": "text"
      },
      "summarization": {
        "tokenizer": AutoTokenizer,
        "pipeline": SummarizationPipeline,
        "model": AutoModelForSeq2SeqLM,
        "default": {
          // TODO: replace with original
          // "model": "sshleifer/distilbart-cnn-6-6",
          "model": "Xenova/distilbart-cnn-6-6"
        },
        "type": "text"
      },
      "translation": {
        "tokenizer": AutoTokenizer,
        "pipeline": TranslationPipeline,
        "model": AutoModelForSeq2SeqLM,
        "default": {
          // TODO: replace with original
          // "model": "t5-small",
          "model": "Xenova/t5-small"
        },
        "type": "text"
      },
      "text2text-generation": {
        "tokenizer": AutoTokenizer,
        "pipeline": Text2TextGenerationPipeline,
        "model": AutoModelForSeq2SeqLM,
        "default": {
          // TODO: replace with original
          // "model": "google/flan-t5-small",
          "model": "Xenova/flan-t5-small"
        },
        "type": "text"
      },
      "text-generation": {
        "tokenizer": AutoTokenizer,
        "pipeline": TextGenerationPipeline,
        "model": AutoModelForCausalLM,
        "default": {
          // TODO: replace with original
          // "model": "gpt2",
          "model": "Xenova/gpt2"
        },
        "type": "text"
      },
      "zero-shot-classification": {
        "tokenizer": AutoTokenizer,
        "pipeline": ZeroShotClassificationPipeline,
        "model": AutoModelForSequenceClassification,
        "default": {
          // TODO: replace with original
          // "model": "typeform/distilbert-base-uncased-mnli",
          "model": "Xenova/distilbert-base-uncased-mnli"
        },
        "type": "text"
      },
      "automatic-speech-recognition": {
        "tokenizer": AutoTokenizer,
        "pipeline": AutomaticSpeechRecognitionPipeline,
        "model": AutoModelForSeq2SeqLM,
        "processor": AutoProcessor,
        "default": {
          // TODO: replace with original
          // "model": "openai/whisper-tiny.en",
          "model": "Xenova/whisper-tiny.en"
        },
        "type": "multimodal"
      },
      "image-to-text": {
        "tokenizer": AutoTokenizer,
        "pipeline": ImageToTextPipeline,
        "model": AutoModelForVision2Seq,
        "processor": AutoProcessor,
        "default": {
          // TODO: replace with original
          // "model": "nlpconnect/vit-gpt2-image-captioning",
          "model": "Xenova/vit-gpt2-image-captioning"
        },
        "type": "multimodal"
      },
      "image-classification": {
        // no tokenizer
        "pipeline": ImageClassificationPipeline,
        "model": AutoModelForImageClassification,
        "processor": AutoProcessor,
        "default": {
          // TODO: replace with original
          // "model": "google/vit-base-patch16-224",
          "model": "Xenova/vit-base-patch16-224"
        },
        "type": "multimodal"
      },
      "image-segmentation": {
        // no tokenizer
        "pipeline": ImageSegmentationPipeline,
        "model": AutoModelForImageSegmentation,
        "processor": AutoProcessor,
        "default": {
          // TODO: replace with original
          // "model": "facebook/detr-resnet-50-panoptic",
          "model": "Xenova/detr-resnet-50-panoptic"
        },
        "type": "multimodal"
      },
      "zero-shot-image-classification": {
        // no tokenizer
        "tokenizer": AutoTokenizer,
        "pipeline": ZeroShotImageClassificationPipeline,
        "model": AutoModel,
        "processor": AutoProcessor,
        "default": {
          // TODO: replace with original
          // "model": "openai/clip-vit-base-patch32",
          "model": "Xenova/clip-vit-base-patch32"
        },
        "type": "multimodal"
      },
      "object-detection": {
        // no tokenizer
        "pipeline": ObjectDetectionPipeline,
        "model": AutoModelForObjectDetection,
        "processor": AutoProcessor,
        "default": {
          // TODO: replace with original
          // "model": "facebook/detr-resnet-50",
          "model": "Xenova/detr-resnet-50"
        },
        "type": "multimodal"
      },
      // This task serves as a useful interface for dealing with sentence-transformers (https://huggingface.co/sentence-transformers).
      "feature-extraction": {
        "tokenizer": AutoTokenizer,
        "pipeline": FeatureExtractionPipeline,
        "model": AutoModel,
        "default": {
          // TODO: replace with original
          // "model": "sentence-transformers/all-MiniLM-L6-v2",
          "model": "Xenova/all-MiniLM-L6-v2"
        },
        "type": "text"
      }
    };
    TASK_ALIASES = {
      "sentiment-analysis": "text-classification",
      "ner": "token-classification",
      "vqa": "visual-question-answering",
      // Add for backwards compatibility
      "embeddings": "feature-extraction"
    };
  }
});

// node_modules/@xenova/transformers/src/transformers.js
var transformers_exports = {};
__export(transformers_exports, {
  AlbertForMaskedLM: () => AlbertForMaskedLM,
  AlbertForQuestionAnswering: () => AlbertForQuestionAnswering,
  AlbertForSequenceClassification: () => AlbertForSequenceClassification,
  AlbertModel: () => AlbertModel,
  AlbertPreTrainedModel: () => AlbertPreTrainedModel,
  AlbertTokenizer: () => AlbertTokenizer,
  AutoModel: () => AutoModel,
  AutoModelForCausalLM: () => AutoModelForCausalLM,
  AutoModelForImageClassification: () => AutoModelForImageClassification,
  AutoModelForImageSegmentation: () => AutoModelForImageSegmentation,
  AutoModelForMaskGeneration: () => AutoModelForMaskGeneration,
  AutoModelForMaskedLM: () => AutoModelForMaskedLM,
  AutoModelForObjectDetection: () => AutoModelForObjectDetection,
  AutoModelForQuestionAnswering: () => AutoModelForQuestionAnswering,
  AutoModelForSeq2SeqLM: () => AutoModelForSeq2SeqLM,
  AutoModelForSequenceClassification: () => AutoModelForSequenceClassification,
  AutoModelForTokenClassification: () => AutoModelForTokenClassification,
  AutoModelForVision2Seq: () => AutoModelForVision2Seq,
  AutoProcessor: () => AutoProcessor,
  AutoTokenizer: () => AutoTokenizer,
  AutomaticSpeechRecognitionPipeline: () => AutomaticSpeechRecognitionPipeline,
  BartForConditionalGeneration: () => BartForConditionalGeneration,
  BartForSequenceClassification: () => BartForSequenceClassification,
  BartModel: () => BartModel,
  BartPretrainedModel: () => BartPretrainedModel,
  BartTokenizer: () => BartTokenizer,
  BertForMaskedLM: () => BertForMaskedLM,
  BertForQuestionAnswering: () => BertForQuestionAnswering,
  BertForSequenceClassification: () => BertForSequenceClassification,
  BertForTokenClassification: () => BertForTokenClassification,
  BertModel: () => BertModel,
  BertPreTrainedModel: () => BertPreTrainedModel,
  BertTokenizer: () => BertTokenizer,
  BloomTokenizer: () => BloomTokenizer,
  CLIPModel: () => CLIPModel,
  CLIPPreTrainedModel: () => CLIPPreTrainedModel,
  CLIPTokenizer: () => CLIPTokenizer,
  CodeGenForCausalLM: () => CodeGenForCausalLM,
  CodeGenModel: () => CodeGenModel,
  CodeGenPreTrainedModel: () => CodeGenPreTrainedModel,
  CodeGenTokenizer: () => CodeGenTokenizer,
  DetrFeatureExtractor: () => DetrFeatureExtractor,
  DetrForObjectDetection: () => DetrForObjectDetection,
  DetrForSegmentation: () => DetrForSegmentation,
  DetrObjectDetectionOutput: () => DetrObjectDetectionOutput,
  DetrPreTrainedModel: () => DetrPreTrainedModel,
  DetrSegmentationOutput: () => DetrSegmentationOutput,
  DistilBertForMaskedLM: () => DistilBertForMaskedLM,
  DistilBertForQuestionAnswering: () => DistilBertForQuestionAnswering,
  DistilBertForSequenceClassification: () => DistilBertForSequenceClassification,
  DistilBertForTokenClassification: () => DistilBertForTokenClassification,
  DistilBertModel: () => DistilBertModel,
  DistilBertPreTrainedModel: () => DistilBertPreTrainedModel,
  DistilBertTokenizer: () => DistilBertTokenizer,
  FFT: () => FFT,
  FeatureExtractionPipeline: () => FeatureExtractionPipeline,
  FeatureExtractor: () => FeatureExtractor,
  FillMaskPipeline: () => FillMaskPipeline,
  GPT2LMHeadModel: () => GPT2LMHeadModel,
  GPT2Model: () => GPT2Model,
  GPT2PreTrainedModel: () => GPT2PreTrainedModel,
  GPT2Tokenizer: () => GPT2Tokenizer,
  GPTNeoForCausalLM: () => GPTNeoForCausalLM,
  GPTNeoModel: () => GPTNeoModel,
  GPTNeoPreTrainedModel: () => GPTNeoPreTrainedModel,
  ImageClassificationPipeline: () => ImageClassificationPipeline,
  ImageFeatureExtractor: () => ImageFeatureExtractor,
  ImageSegmentationPipeline: () => ImageSegmentationPipeline,
  ImageToTextPipeline: () => ImageToTextPipeline,
  LlamaTokenizer: () => LlamaTokenizer,
  M2M100ForConditionalGeneration: () => M2M100ForConditionalGeneration,
  M2M100Model: () => M2M100Model,
  M2M100PreTrainedModel: () => M2M100PreTrainedModel,
  MT5ForConditionalGeneration: () => MT5ForConditionalGeneration,
  MT5Model: () => MT5Model,
  MT5PreTrainedModel: () => MT5PreTrainedModel,
  MarianMTModel: () => MarianMTModel,
  MarianModel: () => MarianModel,
  MarianPreTrainedModel: () => MarianPreTrainedModel,
  MarianTokenizer: () => MarianTokenizer,
  MaskedLMOutput: () => MaskedLMOutput,
  MobileBertForMaskedLM: () => MobileBertForMaskedLM,
  MobileBertForQuestionAnswering: () => MobileBertForQuestionAnswering,
  MobileBertForSequenceClassification: () => MobileBertForSequenceClassification,
  MobileBertModel: () => MobileBertModel,
  MobileBertPreTrainedModel: () => MobileBertPreTrainedModel,
  MobileBertTokenizer: () => MobileBertTokenizer,
  ModelOutput: () => ModelOutput,
  NllbTokenizer: () => NllbTokenizer,
  ObjectDetectionPipeline: () => ObjectDetectionPipeline,
  Pipeline: () => Pipeline,
  PreTrainedModel: () => PreTrainedModel,
  PreTrainedTokenizer: () => PreTrainedTokenizer,
  PretrainedMixin: () => PretrainedMixin,
  Processor: () => Processor,
  QuestionAnsweringModelOutput: () => QuestionAnsweringModelOutput,
  QuestionAnsweringPipeline: () => QuestionAnsweringPipeline,
  RawImage: () => RawImage,
  RobertaForMaskedLM: () => RobertaForMaskedLM,
  RobertaForQuestionAnswering: () => RobertaForQuestionAnswering,
  RobertaForSequenceClassification: () => RobertaForSequenceClassification,
  RobertaModel: () => RobertaModel,
  RobertaPreTrainedModel: () => RobertaPreTrainedModel,
  RobertaTokenizer: () => RobertaTokenizer,
  SamImageProcessor: () => SamImageProcessor,
  SamImageSegmentationOutput: () => SamImageSegmentationOutput,
  SamModel: () => SamModel,
  SamPreTrainedModel: () => SamPreTrainedModel,
  SamProcessor: () => SamProcessor,
  Seq2SeqLMOutput: () => Seq2SeqLMOutput,
  SequenceClassifierOutput: () => SequenceClassifierOutput,
  SqueezeBertForMaskedLM: () => SqueezeBertForMaskedLM,
  SqueezeBertForQuestionAnswering: () => SqueezeBertForQuestionAnswering,
  SqueezeBertForSequenceClassification: () => SqueezeBertForSequenceClassification,
  SqueezeBertModel: () => SqueezeBertModel,
  SqueezeBertPreTrainedModel: () => SqueezeBertPreTrainedModel,
  SqueezeBertTokenizer: () => SqueezeBertTokenizer,
  SummarizationPipeline: () => SummarizationPipeline,
  T5ForConditionalGeneration: () => T5ForConditionalGeneration,
  T5Model: () => T5Model,
  T5PreTrainedModel: () => T5PreTrainedModel,
  T5Tokenizer: () => T5Tokenizer,
  Tensor: () => Tensor3,
  Text2TextGenerationPipeline: () => Text2TextGenerationPipeline,
  TextClassificationPipeline: () => TextClassificationPipeline,
  TextGenerationPipeline: () => TextGenerationPipeline,
  TokenClassificationPipeline: () => TokenClassificationPipeline,
  TokenClassifierOutput: () => TokenClassifierOutput,
  TokenizerModel: () => TokenizerModel,
  TranslationPipeline: () => TranslationPipeline,
  ViTFeatureExtractor: () => ViTFeatureExtractor,
  ViTForImageClassification: () => ViTForImageClassification,
  ViTPreTrainedModel: () => ViTPreTrainedModel,
  VisionEncoderDecoderModel: () => VisionEncoderDecoderModel,
  WhisperFeatureExtractor: () => WhisperFeatureExtractor,
  WhisperForConditionalGeneration: () => WhisperForConditionalGeneration,
  WhisperModel: () => WhisperModel,
  WhisperPreTrainedModel: () => WhisperPreTrainedModel,
  WhisperProcessor: () => WhisperProcessor,
  WhisperTokenizer: () => WhisperTokenizer,
  ZeroShotClassificationPipeline: () => ZeroShotClassificationPipeline,
  ZeroShotImageClassificationPipeline: () => ZeroShotImageClassificationPipeline,
  cat: () => cat,
  cos_sim: () => cos_sim,
  dot: () => dot,
  env: () => env3,
  getMelFilters: () => getMelFilters,
  getTopItems: () => getTopItems,
  interpolate: () => interpolate,
  interpolate_data: () => interpolate_data,
  log_softmax: () => log_softmax,
  magnitude: () => magnitude2,
  max: () => max,
  min: () => min,
  pipeline: () => pipeline,
  read_audio: () => read_audio,
  rfftfreq: () => rfftfreq,
  softmax: () => softmax,
  transpose: () => transpose,
  transpose_data: () => transpose_data
});
var init_transformers = __esm({
  "node_modules/@xenova/transformers/src/transformers.js"() {
    init_pipelines();
    init_env2();
    init_models();
    init_tokenizers();
    init_processors();
    init_audio();
    init_image();
    init_tensor2();
    init_maths();
  }
});

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode7 = __toESM(require("vscode"));

// src/utils/logger.ts
var vscode = __toESM(require("vscode"));
var LOG_LEVEL_PRIORITY = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};
var outputChannel;
var currentLevel = "info";
function initLogger(context) {
  outputChannel = vscode.window.createOutputChannel("Copilot RAG Injector");
  context.subscriptions.push(outputChannel);
}
function shouldLog(level) {
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentLevel];
}
function formatMessage(level, message) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}
function debug(message, ...args2) {
  if (!shouldLog("debug")) {
    return;
  }
  const formatted = formatMessage("debug", message);
  outputChannel?.appendLine(formatted);
  if (args2.length > 0) {
    outputChannel?.appendLine(`  ${JSON.stringify(args2)}`);
  }
}
function info2(message, ...args2) {
  if (!shouldLog("info")) {
    return;
  }
  const formatted = formatMessage("info", message);
  outputChannel?.appendLine(formatted);
  if (args2.length > 0) {
    outputChannel?.appendLine(`  ${JSON.stringify(args2)}`);
  }
}
function warn(message, ...args2) {
  if (!shouldLog("warn")) {
    return;
  }
  const formatted = formatMessage("warn", message);
  outputChannel?.appendLine(formatted);
  if (args2.length > 0) {
    outputChannel?.appendLine(`  ${JSON.stringify(args2)}`);
  }
}
function error(message, error2) {
  if (!shouldLog("error")) {
    return;
  }
  const formatted = formatMessage("error", message);
  outputChannel?.appendLine(formatted);
  if (error2 instanceof Error) {
    outputChannel?.appendLine(`  ${error2.message}`);
    if (error2.stack) {
      outputChannel?.appendLine(`  ${error2.stack}`);
    }
  } else if (error2 !== void 0) {
    outputChannel?.appendLine(`  ${JSON.stringify(error2)}`);
  }
}

// src/ragEngine/vectorStore.ts
function magnitude(vec) {
  let sum = 0;
  for (let i2 = 0; i2 < vec.length; i2++) {
    sum += vec[i2] * vec[i2];
  }
  return Math.sqrt(sum);
}
function cosineSimilarity(a, magA, b, magB) {
  if (magA === 0 || magB === 0) {
    return 0;
  }
  let dotProduct = 0;
  for (let i2 = 0; i2 < a.length; i2++) {
    dotProduct += a[i2] * b[i2];
  }
  return dotProduct / (magA * magB);
}
var VectorStore = class {
  entries = /* @__PURE__ */ new Map();
  /**
   * Adds a code chunk and its embedding to the store.
   * @param chunk - The code chunk metadata and content.
   * @param embedding - The embedding vector for the chunk.
   */
  add(chunk, embedding) {
    this.entries.set(chunk.id, {
      chunk,
      embedding,
      magnitude: magnitude(embedding)
    });
  }
  /**
   * Searches for the top-K most similar chunks to the query embedding.
   * @param queryEmbedding - The embedding vector of the search query.
   * @param topK - Number of top results to return.
   * @returns Array of scored chunks sorted by descending similarity.
   */
  search(queryEmbedding, topK) {
    const queryMag = magnitude(queryEmbedding);
    const results = [];
    for (const entry of this.entries.values()) {
      const score = cosineSimilarity(
        queryEmbedding,
        queryMag,
        entry.embedding,
        entry.magnitude
      );
      results.push({ chunk: entry.chunk, score });
    }
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }
  /**
   * Removes all chunks associated with a given file path.
   * Used for incremental re-indexing when files change.
   * @param filePath - The workspace-relative file path to invalidate.
   */
  invalidate(filePath) {
    const toDelete = [];
    for (const [id, entry] of this.entries) {
      if (entry.chunk.filePath === filePath) {
        toDelete.push(id);
      }
    }
    for (const id of toDelete) {
      this.entries.delete(id);
    }
    if (toDelete.length > 0) {
      debug(`Invalidated ${toDelete.length} chunks for ${filePath}`);
    }
  }
  /**
   * Returns the total number of chunks in the store.
   */
  get size() {
    return this.entries.size;
  }
  /**
   * Returns all chunk IDs in the store.
   */
  getAllChunkIds() {
    return Array.from(this.entries.keys());
  }
  /**
   * Returns all chunks and their embeddings for cache persistence.
   */
  getAllEntries() {
    const result = /* @__PURE__ */ new Map();
    for (const [id, entry] of this.entries) {
      result.set(id, entry.embedding);
    }
    return result;
  }
  /**
   * Clears all entries from the store.
   */
  clear() {
    this.entries.clear();
  }
};

// src/ragEngine/indexer.ts
var vscode3 = __toESM(require("vscode"));
var fs6 = __toESM(require("fs"));

// src/ragEngine/chunker.ts
var vscode2 = __toESM(require("vscode"));

// src/treeSitter/languages.ts
var LANGUAGE_CONFIGS = [
  {
    id: "javascript",
    extensions: [".js", ".jsx"],
    wasmFile: "tree-sitter-javascript.wasm",
    chunkNodeTypes: [
      "function_declaration",
      "arrow_function",
      "class_declaration",
      "method_definition",
      "export_statement"
    ]
  },
  {
    id: "typescript",
    extensions: [".ts", ".tsx"],
    wasmFile: "tree-sitter-typescript.wasm",
    chunkNodeTypes: [
      "function_declaration",
      "arrow_function",
      "class_declaration",
      "method_definition",
      "export_statement"
    ]
  },
  {
    id: "python",
    extensions: [".py"],
    wasmFile: "tree-sitter-python.wasm",
    chunkNodeTypes: [
      "function_definition",
      "class_definition",
      "decorated_definition"
    ]
  },
  {
    id: "rust",
    extensions: [".rs"],
    wasmFile: "tree-sitter-rust.wasm",
    chunkNodeTypes: [
      "function_item",
      "impl_item",
      "struct_item",
      "trait_item"
    ]
  }
];
function detectLanguage(filePath) {
  const lowerPath = filePath.toLowerCase();
  return LANGUAGE_CONFIGS.find(
    (config) => config.extensions.some((ext) => lowerPath.endsWith(ext))
  );
}

// src/treeSitter/parser.ts
var path = __toESM(require("path"));
var treeSitterModule;
var loadedLanguages = /* @__PURE__ */ new Map();
var initialized = false;
function getWasmDir(extensionPath) {
  return path.join(extensionPath, "dist");
}
async function initTreeSitter(extensionPath) {
  if (initialized) {
    return;
  }
  const TreeSitter2 = require_tree_sitter();
  const wasmDir = getWasmDir(extensionPath);
  const treeSitterWasm = path.join(wasmDir, "tree-sitter.wasm");
  await TreeSitter2.init({
    locateFile: () => treeSitterWasm
  });
  treeSitterModule = TreeSitter2;
  initialized = true;
  info2("Tree-sitter initialized");
}
async function loadLanguage(language, extensionPath) {
  if (loadedLanguages.has(language.id)) {
    return loadedLanguages.get(language.id);
  }
  if (!treeSitterModule) {
    error("Tree-sitter not initialized");
    return void 0;
  }
  const wasmPath = path.join(getWasmDir(extensionPath), language.wasmFile);
  try {
    const lang = await treeSitterModule.Language.load(wasmPath);
    loadedLanguages.set(language.id, lang);
    info2(`Loaded Tree-sitter grammar: ${language.id}`);
    return lang;
  } catch (err2) {
    error(`Failed to load grammar for ${language.id}`, err2);
    return void 0;
  }
}
async function parseCode(code, language, extensionPath) {
  if (!treeSitterModule) {
    error("Tree-sitter not initialized");
    return void 0;
  }
  const lang = await loadLanguage(language, extensionPath);
  if (!lang) {
    return void 0;
  }
  const parser = new treeSitterModule();
  parser.setLanguage(lang);
  try {
    const tree = parser.parse(code);
    const rootNode = tree.rootNode;
    return rootNode;
  } catch (err2) {
    error(`Parse error for ${language.id}`, err2);
    return void 0;
  }
}

// src/ragEngine/chunker.ts
function estimateTokens(text) {
  return text.split(/[\s]+/).filter((t) => t.length > 0).length;
}
function makeChunkId(filePath, startLine, endLine) {
  return `${filePath}#${startLine}-${endLine}`;
}
function extractChunksFromNode(node, filePath, config, sourceCode, maxTokens) {
  const chunks = [];
  if (config.chunkNodeTypes.includes(node.type)) {
    const code = node.text;
    const tokens = estimateTokens(code);
    if (tokens < 10) {
      return chunks;
    }
    if (tokens <= maxTokens) {
      chunks.push({
        id: makeChunkId(filePath, node.startPosition.row, node.endPosition.row),
        filePath,
        language: config.id,
        nodeType: node.type,
        code,
        startLine: node.startPosition.row,
        endLine: node.endPosition.row
      });
    } else {
      const childChunks = splitLargeNode(node, filePath, config, sourceCode, maxTokens);
      chunks.push(...childChunks);
    }
    return chunks;
  }
  for (const child of node.namedChildren) {
    chunks.push(...extractChunksFromNode(child, filePath, config, sourceCode, maxTokens));
  }
  return chunks;
}
function splitLargeNode(node, filePath, config, _sourceCode, maxTokens) {
  const chunks = [];
  if (node.namedChildCount === 0) {
    chunks.push({
      id: makeChunkId(filePath, node.startPosition.row, node.endPosition.row),
      filePath,
      language: config.id,
      nodeType: node.type,
      code: node.text,
      startLine: node.startPosition.row,
      endLine: node.endPosition.row
    });
    return chunks;
  }
  for (const child of node.namedChildren) {
    const childCode = child.text;
    const tokens = estimateTokens(childCode);
    if (tokens < 10) {
      continue;
    }
    if (tokens <= maxTokens) {
      chunks.push({
        id: makeChunkId(filePath, child.startPosition.row, child.endPosition.row),
        filePath,
        language: config.id,
        nodeType: child.type,
        code: childCode,
        startLine: child.startPosition.row,
        endLine: child.endPosition.row
      });
    } else {
      chunks.push(...splitLargeNode(child, filePath, config, _sourceCode, maxTokens));
    }
  }
  return chunks;
}
function slidingWindowChunk(sourceCode, filePath, language, windowSize = 40, overlap = 10) {
  const lines = sourceCode.split("\n");
  const chunks = [];
  const step = windowSize - overlap;
  for (let i2 = 0; i2 < lines.length; i2 += step) {
    const end = Math.min(i2 + windowSize, lines.length);
    const chunkLines = lines.slice(i2, end);
    const code = chunkLines.join("\n");
    const tokens = estimateTokens(code);
    if (tokens < 10) {
      continue;
    }
    chunks.push({
      id: makeChunkId(filePath, i2, end - 1),
      filePath,
      language,
      nodeType: "sliding_window",
      code,
      startLine: i2,
      endLine: end - 1
    });
    if (end >= lines.length) {
      break;
    }
  }
  return chunks;
}
async function chunkFile(sourceCode, filePath, extensionPath, token) {
  if (token?.isCancellationRequested) {
    return [];
  }
  const config = vscode2.workspace.getConfiguration("copilot-rag-injector");
  const maxTokens = config.get("maxTokensPerChunk", 512);
  const langConfig = detectLanguage(filePath);
  if (!langConfig) {
    const ext = filePath.split(".").pop() ?? "unknown";
    debug(`No Tree-sitter grammar for .${ext}, using sliding window`);
    return slidingWindowChunk(sourceCode, filePath, ext);
  }
  const rootNode = await parseCode(sourceCode, langConfig, extensionPath);
  if (!rootNode) {
    warn(`Failed to parse ${filePath}, falling back to sliding window`);
    return slidingWindowChunk(sourceCode, filePath, langConfig.id);
  }
  const chunks = extractChunksFromNode(rootNode, filePath, langConfig, sourceCode, maxTokens);
  if (chunks.length === 0) {
    return slidingWindowChunk(sourceCode, filePath, langConfig.id);
  }
  debug(`Chunked ${filePath}: ${chunks.length} chunks`);
  return chunks;
}

// src/ragEngine/embedder.ts
var path4 = __toESM(require("path"));
var fs5 = __toESM(require("fs"));
var pipeline2;
var modelLoading;
async function ensureModel() {
  if (pipeline2) {
    return;
  }
  if (modelLoading) {
    await modelLoading;
    return;
  }
  modelLoading = (async () => {
    info2("Loading embedding model (all-MiniLM-L6-v2)...");
    try {
      const { pipeline: createPipeline, env: env4 } = await Promise.resolve().then(() => (init_transformers(), transformers_exports));
      env4.allowRemoteModels = true;
      env4.allowLocalModels = true;
      const extractor = await createPipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2",
        { quantized: true }
      );
      pipeline2 = async (texts) => {
        const results = [];
        for (const text of texts) {
          const output = await extractor(text, {
            pooling: "mean",
            normalize: true
          });
          results.push(new Float32Array(output.data));
        }
        return results;
      };
      info2("Embedding model loaded successfully");
    } catch (err2) {
      error("Failed to load embedding model", err2);
      throw err2;
    }
  })();
  await modelLoading;
}
async function embedText(text) {
  await ensureModel();
  if (!pipeline2) {
    throw new Error("Embedding model not available");
  }
  const [embedding] = await pipeline2([text]);
  return embedding;
}
async function embedBatch(texts, batchSize = 20, token) {
  await ensureModel();
  if (!pipeline2) {
    throw new Error("Embedding model not available");
  }
  const allEmbeddings = [];
  for (let i2 = 0; i2 < texts.length; i2 += batchSize) {
    if (token?.isCancellationRequested) {
      break;
    }
    const batch = texts.slice(i2, i2 + batchSize);
    const embeddings = await pipeline2(batch);
    allEmbeddings.push(...embeddings);
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  return allEmbeddings;
}
async function saveCache(cache, workspacePath) {
  const cacheDir = path4.join(workspacePath, ".vscode");
  const cachePath = path4.join(cacheDir, "rag-cache.json");
  const entries = [];
  for (const [id, embedding] of cache) {
    entries.push({
      id,
      embedding: Array.from(embedding)
    });
  }
  try {
    if (!fs5.existsSync(cacheDir)) {
      fs5.mkdirSync(cacheDir, { recursive: true });
    }
    fs5.writeFileSync(cachePath, JSON.stringify(entries), "utf-8");
    info2(`Saved embedding cache: ${entries.length} entries`);
  } catch (err2) {
    error("Failed to save embedding cache", err2);
  }
}
function loadCache(workspacePath) {
  const cachePath = path4.join(workspacePath, ".vscode", "rag-cache.json");
  const cache = /* @__PURE__ */ new Map();
  try {
    if (!fs5.existsSync(cachePath)) {
      return cache;
    }
    const raw = fs5.readFileSync(cachePath, "utf-8");
    const entries = JSON.parse(raw);
    for (const entry of entries) {
      cache.set(entry.id, new Float32Array(entry.embedding));
    }
    info2(`Loaded embedding cache: ${cache.size} entries`);
  } catch (err2) {
    error("Failed to load embedding cache", err2);
  }
  return cache;
}

// src/ragEngine/indexer.ts
var SUPPORTED_EXTENSIONS = /* @__PURE__ */ new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".py",
  ".rs",
  ".go",
  ".java",
  ".cpp",
  ".c"
]);
var MAX_FILE_SIZE = 500 * 1024;
var Indexer = class {
  constructor(vectorStore, extensionPath) {
    this.vectorStore = vectorStore;
    this.extensionPath = extensionPath;
  }
  vectorStore;
  extensionPath;
  /**
   * Indexes the entire workspace, populating the vector store.
   * Respects .gitignore and user-configured exclude patterns.
   *
   * @param token - Cancellation token.
   * @param progress - Progress reporter for the UI.
   */
  async indexWorkspace(token, progress) {
    const workspaceFolders = vscode3.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      warn("No workspace folder open \u2014 skipping indexing");
      return;
    }
    await initTreeSitter(this.extensionPath);
    const cachedEmbeddings = loadCache(workspaceFolders[0].uri.fsPath);
    progress?.report({ message: "Discovering files..." });
    const files = await this.discoverFiles(token);
    if (token?.isCancellationRequested) {
      return;
    }
    info2(`Discovered ${files.length} files for indexing`);
    progress?.report({ message: `Indexing ${files.length} files...` });
    const batchSize = 20;
    let processedFiles = 0;
    let totalChunks = 0;
    for (let i2 = 0; i2 < files.length; i2 += batchSize) {
      if (token?.isCancellationRequested) {
        break;
      }
      const batch = files.slice(i2, i2 + batchSize);
      const batchChunks = [];
      for (const fileUri of batch) {
        if (token?.isCancellationRequested) {
          break;
        }
        try {
          const relativePath = vscode3.workspace.asRelativePath(fileUri);
          const content = await this.readFileContent(fileUri);
          if (!content) {
            continue;
          }
          const chunks = await chunkFile(content, relativePath, this.extensionPath, token);
          batchChunks.push(...chunks);
        } catch (err2) {
          error(`Error chunking file: ${fileUri.fsPath}`, err2);
        }
      }
      if (batchChunks.length === 0) {
        processedFiles += batch.length;
        continue;
      }
      const uncachedChunks = [];
      const uncachedTexts = [];
      for (const chunk of batchChunks) {
        const cached = cachedEmbeddings.get(chunk.id);
        if (cached) {
          this.vectorStore.add(chunk, cached);
        } else {
          uncachedChunks.push(chunk);
          uncachedTexts.push(chunk.code);
        }
      }
      if (uncachedTexts.length > 0) {
        try {
          const embeddings = await embedBatch(uncachedTexts, 20, token);
          for (let j2 = 0; j2 < uncachedChunks.length; j2++) {
            this.vectorStore.add(uncachedChunks[j2], embeddings[j2]);
          }
        } catch (err2) {
          error("Embedding batch failed", err2);
        }
      }
      processedFiles += batch.length;
      totalChunks += batchChunks.length;
      const pct = Math.round(processedFiles / files.length * 100);
      progress?.report({
        message: `Indexed ${processedFiles}/${files.length} files (${totalChunks} chunks)`,
        increment: batch.length / files.length * 100
      });
    }
    info2(`Indexing complete: ${totalChunks} chunks from ${processedFiles} files`);
  }
  /**
   * Re-indexes specific files (incremental update).
   * Removes old chunks for the changed files, then re-chunks and re-embeds.
   *
   * @param uris - File URIs that changed.
   * @param token - Cancellation token.
   */
  async reindexFiles(uris, token) {
    await initTreeSitter(this.extensionPath);
    for (const uri of uris) {
      if (token?.isCancellationRequested) {
        break;
      }
      const relativePath = vscode3.workspace.asRelativePath(uri);
      this.vectorStore.invalidate(relativePath);
      if (!fs6.existsSync(uri.fsPath)) {
        debug(`File deleted, removed chunks: ${relativePath}`);
        continue;
      }
      try {
        const content = await this.readFileContent(uri);
        if (!content) {
          continue;
        }
        const chunks = await chunkFile(content, relativePath, this.extensionPath, token);
        if (chunks.length === 0) {
          continue;
        }
        const texts = chunks.map((c) => c.code);
        const embeddings = await embedBatch(texts, 20, token);
        for (let i2 = 0; i2 < chunks.length; i2++) {
          this.vectorStore.add(chunks[i2], embeddings[i2]);
        }
        debug(`Re-indexed ${relativePath}: ${chunks.length} chunks`);
      } catch (err2) {
        error(`Error re-indexing ${relativePath}`, err2);
      }
    }
  }
  /**
   * Persists the current embedding cache to disk.
   */
  async persistCache() {
    const workspaceFolders = vscode3.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      return;
    }
    const cacheData = this.vectorStore.getAllEntries();
    await saveCache(cacheData, workspaceFolders[0].uri.fsPath);
  }
  /**
   * Discovers all indexable files in the workspace.
   */
  async discoverFiles(token) {
    const config = vscode3.workspace.getConfiguration("copilot-rag-injector");
    const excludePatterns = config.get("excludePatterns", [
      "**/node_modules/**",
      "**/dist/**",
      "**/.git/**",
      "**/build/**",
      "**/*.min.js"
    ]);
    const excludeGlob = `{${excludePatterns.join(",")}}`;
    const extGlob = `**/*.{${Array.from(SUPPORTED_EXTENSIONS).map((e) => e.slice(1)).join(",")}}`;
    const files = await vscode3.workspace.findFiles(extGlob, excludeGlob, void 0, token);
    return files.filter((uri) => {
      try {
        const stat = fs6.statSync(uri.fsPath);
        return stat.size <= MAX_FILE_SIZE;
      } catch {
        return false;
      }
    });
  }
  /**
   * Reads file content as a string, returning undefined on failure.
   */
  async readFileContent(uri) {
    try {
      const bytes = await vscode3.workspace.fs.readFile(uri);
      return Buffer.from(bytes).toString("utf-8");
    } catch (err2) {
      error(`Failed to read file: ${uri.fsPath}`, err2);
      return void 0;
    }
  }
};

// src/ragEngine/retriever.ts
var vscode4 = __toESM(require("vscode"));
var Retriever = class {
  constructor(vectorStore) {
    this.vectorStore = vectorStore;
  }
  vectorStore;
  /**
   * Retrieves the most relevant code chunks for a given query.
   *
   * Pipeline:
   * 1. Embed the query string
   * 2. Over-fetch from vector store (topK * 3)
   * 3. Deduplicate by file path (max 2 chunks per file)
   * 4. Re-rank: boost chunks whose file matches the active editor (+0.1)
   * 5. Return final top-K results
   *
   * @param query - The user's search query.
   * @param topK - Number of chunks to return (default from config or 5).
   * @returns Array of scored chunks sorted by relevance.
   */
  async retrieve(query, topK) {
    const config = vscode4.workspace.getConfiguration("copilot-rag-injector");
    const k = topK ?? config.get("topK", 5);
    if (this.vectorStore.size === 0) {
      warn("Vector store is empty \u2014 no chunks to retrieve");
      return [];
    }
    const queryEmbedding = await embedText(query);
    const overFetchK = k * 3;
    const candidates = this.vectorStore.search(queryEmbedding, overFetchK);
    const fileCount = /* @__PURE__ */ new Map();
    const deduplicated = [];
    for (const candidate of candidates) {
      const fp = candidate.chunk.filePath;
      const count = fileCount.get(fp) ?? 0;
      if (count >= 2) {
        continue;
      }
      fileCount.set(fp, count + 1);
      deduplicated.push(candidate);
    }
    const activeFilePath = this.getActiveEditorRelativePath();
    const reranked = deduplicated.map((sc) => {
      let boostedScore = sc.score;
      if (activeFilePath && sc.chunk.filePath === activeFilePath) {
        boostedScore += 0.1;
      }
      return { chunk: sc.chunk, score: boostedScore };
    });
    reranked.sort((a, b) => b.score - a.score);
    const results = reranked.slice(0, k);
    debug(`Retrieved ${results.length} chunks for query: "${query.slice(0, 50)}..."`);
    return results;
  }
  /**
   * Gets the workspace-relative path of the currently active editor.
   */
  getActiveEditorRelativePath() {
    const editor = vscode4.window.activeTextEditor;
    if (!editor) {
      return void 0;
    }
    return vscode4.workspace.asRelativePath(editor.document.uri);
  }
};

// src/chatParticipant.ts
var vscode5 = __toESM(require("vscode"));

// src/contextBuilder.ts
var MAX_PREFIX_TOKENS = 3e3;
function estimateTokens2(text) {
  return text.split(/[\s]+/).filter((t) => t.length > 0).length;
}
function languageTag(language) {
  const map = {
    javascript: "javascript",
    typescript: "typescript",
    python: "python",
    rust: "rust",
    go: "go",
    java: "java",
    cpp: "cpp",
    c: "c"
  };
  return map[language] ?? language;
}
function buildPrefix(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  const header = `<codebase_context>
The following code snippets from this repository are semantically relevant to your query.
Use them to inform your response.

`;
  const footer = `</codebase_context>`;
  let totalTokens = estimateTokens2(header) + estimateTokens2(footer);
  const includedBlocks = [];
  for (let i2 = 0; i2 < chunks.length; i2++) {
    const sc = chunks[i2];
    const lang = languageTag(sc.chunk.language);
    const label = `[${i2 + 1}] ${sc.chunk.filePath} \u2014 ${sc.chunk.nodeType} (score: ${sc.score.toFixed(2)})`;
    const block = `${label}
\`\`\`${lang}
${sc.chunk.code}
\`\`\`
`;
    const blockTokens = estimateTokens2(block);
    if (totalTokens + blockTokens > MAX_PREFIX_TOKENS) {
      break;
    }
    totalTokens += blockTokens;
    includedBlocks.push(block);
  }
  if (includedBlocks.length === 0) {
    return "";
  }
  return header + includedBlocks.join("\n") + "\n" + footer;
}
function buildEnrichedPrompt(chunks, userQuery) {
  const prefix = buildPrefix(chunks);
  if (!prefix) {
    return userQuery;
  }
  return `${prefix}

User query: ${userQuery}`;
}
function buildContextSummary(chunks) {
  if (chunks.length === 0) {
    return "\u{1F4CE} No relevant context found in the codebase.";
  }
  const lines = chunks.map(
    (sc, i2) => `${i2 + 1}. \`${sc.chunk.filePath}\` \u2014 ${sc.chunk.nodeType} (L${sc.chunk.startLine + 1}\u2013L${sc.chunk.endLine + 1}, score: ${sc.score.toFixed(2)})`
  );
  return `\u{1F4CE} **Context injected** (${chunks.length} snippets):
${lines.join("\n")}`;
}

// src/chatParticipant.ts
function registerChatParticipant(context, retriever) {
  const participant = vscode5.chat.createChatParticipant(
    "copilot-rag-injector.assistant",
    async (request, _context, stream2, token) => {
      await handleChatRequest(request, stream2, token, retriever);
    }
  );
  participant.iconPath = new vscode5.ThemeIcon("database");
  context.subscriptions.push(participant);
  return participant;
}
async function handleChatRequest(request, stream2, token, retriever) {
  const query = request.prompt;
  if (!query.trim()) {
    stream2.markdown("Please provide a query to search the codebase.");
    return;
  }
  if (token.isCancellationRequested) {
    return;
  }
  info2(`Chat query: "${query.slice(0, 80)}..."`);
  stream2.progress("Searching codebase for relevant context...");
  let chunks;
  try {
    chunks = await retriever.retrieve(query);
  } catch (err2) {
    error("Retrieval failed", err2);
    stream2.markdown('\u26A0\uFE0F Failed to search the codebase. Please try re-indexing with the "RAG: Re-index Workspace" command.');
    return;
  }
  if (token.isCancellationRequested) {
    return;
  }
  const summary = buildContextSummary(chunks);
  stream2.markdown(summary + "\n\n---\n\n");
  const enrichedPrompt = buildEnrichedPrompt(chunks, query);
  try {
    const models = await vscode5.lm.selectChatModels({
      vendor: "copilot",
      family: "gpt-4o"
    });
    if (models.length === 0) {
      const fallbackModels = await vscode5.lm.selectChatModels({ vendor: "copilot" });
      if (fallbackModels.length === 0) {
        stream2.markdown(
          "\u26A0\uFE0F No Copilot language model found. Please ensure GitHub Copilot is installed and active."
        );
        return;
      }
      await streamModelResponse(fallbackModels[0], enrichedPrompt, stream2, token);
    } else {
      await streamModelResponse(models[0], enrichedPrompt, stream2, token);
    }
  } catch (err2) {
    if (token.isCancellationRequested) {
      return;
    }
    error("LLM streaming failed", err2);
    stream2.markdown("\u26A0\uFE0F Failed to get a response from the language model.");
  }
}
async function streamModelResponse(model, prompt, stream2, token) {
  const messages = [
    vscode5.LanguageModelChatMessage.User(prompt)
  ];
  const response = await model.sendRequest(messages, {}, token);
  for await (const fragment of response.text) {
    if (token.isCancellationRequested) {
      break;
    }
    stream2.markdown(fragment);
  }
}

// src/utils/fileWatcher.ts
var vscode6 = __toESM(require("vscode"));
function createFileWatcher(context, onFilesChanged) {
  const disposables = [];
  const pendingChanges = /* @__PURE__ */ new Map();
  let debounceTimer;
  const supportedExtensions = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".py",
    ".rs",
    ".go",
    ".java",
    ".cpp",
    ".c"
  ];
  const watcher = vscode6.workspace.createFileSystemWatcher("**/*");
  disposables.push(watcher);
  function isSupportedFile(uri) {
    return supportedExtensions.some((ext) => uri.fsPath.endsWith(ext));
  }
  function isExcluded(uri) {
    const config = vscode6.workspace.getConfiguration("copilot-rag-injector");
    const excludePatterns = config.get("excludePatterns", [
      "**/node_modules/**",
      "**/dist/**",
      "**/.git/**",
      "**/build/**",
      "**/*.min.js"
    ]);
    const relativePath = vscode6.workspace.asRelativePath(uri);
    return excludePatterns.some((pattern) => {
      const regex = globToRegex(pattern);
      return regex.test(relativePath);
    });
  }
  function scheduleReindex() {
    const config = vscode6.workspace.getConfiguration("copilot-rag-injector");
    const autoReindex = config.get("autoReindex", true);
    if (!autoReindex) {
      return;
    }
    if (debounceTimer !== void 0) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(async () => {
      const uris = Array.from(pendingChanges.values());
      pendingChanges.clear();
      if (uris.length > 0) {
        info2(`File watcher: re-indexing ${uris.length} changed file(s)`);
        try {
          await onFilesChanged(uris);
        } catch (err2) {
          error("File watcher: re-index failed", err2);
        }
      }
    }, 1500);
  }
  function handleChange(uri) {
    if (!isSupportedFile(uri) || isExcluded(uri)) {
      return;
    }
    pendingChanges.set(uri.fsPath, uri);
    scheduleReindex();
  }
  watcher.onDidChange(handleChange);
  watcher.onDidCreate(handleChange);
  watcher.onDidDelete((uri) => {
    if (!isSupportedFile(uri)) {
      return;
    }
    pendingChanges.set(uri.fsPath, uri);
    scheduleReindex();
  });
  const disposable = vscode6.Disposable.from(...disposables, {
    dispose() {
      if (debounceTimer !== void 0) {
        clearTimeout(debounceTimer);
      }
    }
  });
  context.subscriptions.push(disposable);
  return disposable;
}
function globToRegex(glob) {
  let regex = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "<<<GLOBSTAR>>>").replace(/\*/g, "[^/]*").replace(/<<<GLOBSTAR>>>/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${regex}$`);
}

// src/extension.ts
var statusBarItem;
var indexer;
async function activate(context) {
  initLogger(context);
  info2("Copilot RAG Context Injector activating...");
  const copilotExtension = vscode7.extensions.getExtension("GitHub.copilot-chat");
  if (!copilotExtension) {
    vscode7.window.showWarningMessage(
      "Copilot RAG Injector: GitHub Copilot Chat extension is not installed. The @RAG participant will still work, but may not have an LLM to stream responses to."
    );
  }
  statusBarItem = vscode7.window.createStatusBarItem(vscode7.StatusBarAlignment.Left, 100);
  statusBarItem.text = "$(sync~spin) RAG: Indexing...";
  statusBarItem.tooltip = "Copilot RAG Context Injector \u2014 indexing workspace";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);
  const vectorStore = new VectorStore();
  indexer = new Indexer(vectorStore, context.extensionPath);
  const retriever = new Retriever(vectorStore);
  indexWorkspaceWithProgress(vectorStore).catch((err2) => {
    error("Initial indexing failed", err2);
    statusBarItem.text = "$(warning) RAG: Index failed";
    statusBarItem.tooltip = "Indexing failed. Click to re-index.";
  });
  registerChatParticipant(context, retriever);
  createFileWatcher(context, async (uris) => {
    statusBarItem.text = "$(sync~spin) RAG: Updating...";
    try {
      await indexer.reindexFiles(uris);
      statusBarItem.text = `$(database) RAG: ${vectorStore.size} chunks`;
    } catch (err2) {
      error("Incremental re-index failed", err2);
    }
  });
  const reindexCmd = vscode7.commands.registerCommand(
    "copilot-rag-injector.reindex",
    async () => {
      vectorStore.clear();
      await indexWorkspaceWithProgress(vectorStore);
    }
  );
  context.subscriptions.push(reindexCmd);
  statusBarItem.command = "copilot-rag-injector.reindex";
  info2("Copilot RAG Context Injector activated");
}
async function indexWorkspaceWithProgress(vectorStore) {
  await vscode7.window.withProgress(
    {
      location: vscode7.ProgressLocation.Notification,
      title: "RAG: Indexing workspace",
      cancellable: true
    },
    async (progress, token) => {
      await indexer.indexWorkspace(token, progress);
      statusBarItem.text = `$(database) RAG: ${vectorStore.size} chunks`;
      statusBarItem.tooltip = `Copilot RAG Context Injector \u2014 ${vectorStore.size} chunks indexed`;
    }
  );
}
async function deactivate() {
  info2("Copilot RAG Context Injector deactivating...");
  try {
    await indexer?.persistCache();
  } catch (err2) {
    error("Failed to persist cache on deactivation", err2);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
/*! Bundled license information:

onnxruntime-common/dist/ort-common.node.js:
  (*!
   * ONNX Runtime Common v1.14.0
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)

onnxruntime-web/dist/ort.node.min.mjs:
  (*!
   * ONNX Runtime Web v1.24.3
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)
*/
//# sourceMappingURL=extension.js.map
