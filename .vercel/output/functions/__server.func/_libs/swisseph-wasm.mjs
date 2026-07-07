//#region node_modules/swisseph-wasm/wasm/swisseph.js
async function Swisseph(moduleArg = {}) {
	var moduleRtn;
	var Module = moduleArg;
	var ENVIRONMENT_IS_WEB = !!globalThis.window;
	var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;
	var ENVIRONMENT_IS_NODE = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
	if (ENVIRONMENT_IS_NODE) {
		const { createRequire } = await import("module");
		var require = createRequire(import.meta.url);
	}
	if (!Module["expectedDataFileDownloads"]) Module["expectedDataFileDownloads"] = 0;
	Module["expectedDataFileDownloads"]++;
	(() => {
		if (typeof ENVIRONMENT_IS_PTHREAD != "undefined" && ENVIRONMENT_IS_PTHREAD || typeof ENVIRONMENT_IS_WASM_WORKER != "undefined" && ENVIRONMENT_IS_WASM_WORKER) return;
		var isNode = globalThis.process && globalThis.process.versions && globalThis.process.versions.node && globalThis.process.type != "renderer";
		async function loadPackage(metadata) {
			if (typeof window === "object") window["encodeURIComponent"](window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")) + "/");
			else if (typeof process === "undefined" && typeof location !== "undefined") encodeURIComponent(location.pathname.substring(0, location.pathname.lastIndexOf("/")) + "/");
			var PACKAGE_NAME = "wasm/swisseph.data";
			var REMOTE_PACKAGE_BASE = "swisseph.data";
			var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
			var REMOTE_PACKAGE_SIZE = metadata["remote_package_size"];
			async function fetchRemotePackage(packageName, packageSize) {
				if (isNode) {
					var contents = require("fs").readFileSync(packageName);
					return new Uint8Array(contents).buffer;
				}
				if (!Module["dataFileDownloads"]) Module["dataFileDownloads"] = {};
				try {
					var response = await fetch(packageName);
				} catch (e) {
					throw new Error(`Network Error: ${packageName}`, { e });
				}
				if (!response.ok) throw new Error(`${response.status}: ${response.url}`);
				const chunks = [];
				const headers = response.headers;
				const total = Number(headers.get("Content-Length") || packageSize);
				let loaded = 0;
				Module["setStatus"] && Module["setStatus"]("Downloading data...");
				const reader = response.body.getReader();
				while (1) {
					var { done, value } = await reader.read();
					if (done) break;
					chunks.push(value);
					loaded += value.length;
					Module["dataFileDownloads"][packageName] = {
						loaded,
						total
					};
					let totalLoaded = 0;
					let totalSize = 0;
					for (const download of Object.values(Module["dataFileDownloads"])) {
						totalLoaded += download.loaded;
						totalSize += download.total;
					}
					Module["setStatus"] && Module["setStatus"](`Downloading data... (${totalLoaded}/${totalSize})`);
				}
				const packageData = new Uint8Array(chunks.map((c) => c.length).reduce((a, b) => a + b, 0));
				let offset = 0;
				for (const chunk of chunks) {
					packageData.set(chunk, offset);
					offset += chunk.length;
				}
				return packageData.buffer;
			}
			var fetchPromise;
			var fetched = Module["getPreloadedPackage"] && Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE);
			if (!fetched) fetchPromise = fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE);
			async function runWithFS(Module) {
				function assert(check, msg) {
					if (!check) throw new Error(msg);
				}
				Module["FS_createPath"]("/", "sweph", true, true);
				for (var file of metadata["files"]) {
					var name = file["filename"];
					Module["addRunDependency"](`fp ${name}`);
				}
				async function processPackageData(arrayBuffer) {
					assert(arrayBuffer, "Loading data file failed.");
					assert(arrayBuffer.constructor.name === ArrayBuffer.name, "bad input to processPackageData " + arrayBuffer.constructor.name);
					var byteArray = new Uint8Array(arrayBuffer);
					for (var file of metadata["files"]) {
						var name = file["filename"];
						var data = byteArray.subarray(file["start"], file["end"]);
						Module["FS_createDataFile"](name, null, data, true, true, true);
						Module["removeRunDependency"](`fp ${name}`);
					}
					Module["removeRunDependency"]("datafile_wasm/swisseph.data");
				}
				Module["addRunDependency"]("datafile_wasm/swisseph.data");
				if (!Module["preloadResults"]) Module["preloadResults"] = {};
				Module["preloadResults"][PACKAGE_NAME] = { fromCache: false };
				if (!fetched) fetched = await fetchPromise;
				processPackageData(fetched);
			}
			if (Module["calledRun"]) runWithFS(Module);
			else {
				if (!Module["preRun"]) Module["preRun"] = [];
				Module["preRun"].push(runWithFS);
			}
		}
		loadPackage({
			files: [
				{
					filename: "/sweph/seas_18.se1",
					start: 0,
					end: 223002
				},
				{
					filename: "/sweph/seasnam.txt",
					start: 223002,
					end: 10153224
				},
				{
					filename: "/sweph/sefstars.txt",
					start: 10153224,
					end: 10286461
				},
				{
					filename: "/sweph/seleapsec.txt",
					start: 10286461,
					end: 10286743
				},
				{
					filename: "/sweph/semo_18.se1",
					start: 10286743,
					end: 11591514
				},
				{
					filename: "/sweph/seorbel.txt",
					start: 11591514,
					end: 11597371
				},
				{
					filename: "/sweph/sepl_18.se1",
					start: 11597371,
					end: 12081426
				}
			],
			remote_package_size: 12081426
		});
	})();
	var thisProgram = "./this.program";
	var _scriptName = import.meta.url;
	var scriptDirectory = "";
	function locateFile(path) {
		if (Module["locateFile"]) return Module["locateFile"](path, scriptDirectory);
		return scriptDirectory + path;
	}
	var readAsync, readBinary;
	if (ENVIRONMENT_IS_NODE) {
		var fs = require("fs");
		if (_scriptName.startsWith("file:")) scriptDirectory = require("path").dirname(require("url").fileURLToPath(_scriptName)) + "/";
		readBinary = (filename) => {
			filename = isFileURI(filename) ? new URL(filename) : filename;
			return fs.readFileSync(filename);
		};
		readAsync = async (filename, binary = true) => {
			filename = isFileURI(filename) ? new URL(filename) : filename;
			return fs.readFileSync(filename, binary ? void 0 : "utf8");
		};
		if (process.argv.length > 1) thisProgram = process.argv[1].replace(/\\/g, "/");
		process.argv.slice(2);
	} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
		try {
			scriptDirectory = new URL(".", _scriptName).href;
		} catch {}
		readAsync = async (url) => {
			var response = await fetch(url, { credentials: "same-origin" });
			if (response.ok) return response.arrayBuffer();
			throw new Error(response.status + " : " + response.url);
		};
	}
	var out = console.log.bind(console);
	var err = console.error.bind(console);
	var wasmBinary;
	var ABORT = false;
	var isFileURI = (filename) => filename.startsWith("file://");
	var readyPromiseResolve, readyPromiseReject, HEAP8, HEAPU8, HEAP16, HEAP32, HEAPU32, HEAP64;
	var runtimeInitialized = false;
	function updateMemoryViews() {
		var b = wasmMemory.buffer;
		HEAP8 = new Int8Array(b);
		HEAP16 = new Int16Array(b);
		HEAPU8 = new Uint8Array(b);
		new Uint16Array(b);
		Module["HEAP32"] = HEAP32 = new Int32Array(b);
		HEAPU32 = new Uint32Array(b);
		new Float32Array(b);
		Module["HEAPF64"] = new Float64Array(b);
		HEAP64 = new BigInt64Array(b);
		new BigUint64Array(b);
	}
	function preRun() {
		if (Module["preRun"]) {
			if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
			while (Module["preRun"].length) addOnPreRun(Module["preRun"].shift());
		}
		callRuntimeCallbacks(onPreRuns);
	}
	function initRuntime() {
		runtimeInitialized = true;
		if (!Module["noFSInit"] && !FS.initialized) FS.init();
		TTY.init();
		wasmExports["l"]();
		FS.ignorePermissions = false;
	}
	function postRun() {
		if (Module["postRun"]) {
			if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
			while (Module["postRun"].length) addOnPostRun(Module["postRun"].shift());
		}
		callRuntimeCallbacks(onPostRuns);
	}
	function abort(what) {
		Module["onAbort"]?.(what);
		what = "Aborted(" + what + ")";
		err(what);
		ABORT = true;
		what += ". Build with -sASSERTIONS for more info.";
		var e = new WebAssembly.RuntimeError(what);
		readyPromiseReject?.(e);
		throw e;
	}
	var wasmBinaryFile;
	function findWasmBinary() {
		if (Module["locateFile"]) return locateFile("swisseph.wasm");
		return new URL("swisseph.wasm", import.meta.url).href;
	}
	function getBinarySync(file) {
		if (file == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
		if (readBinary) return readBinary(file);
		throw "both async and sync fetching of the wasm failed";
	}
	async function getWasmBinary(binaryFile) {
		if (!wasmBinary) try {
			var response = await readAsync(binaryFile);
			return new Uint8Array(response);
		} catch {}
		return getBinarySync(binaryFile);
	}
	async function instantiateArrayBuffer(binaryFile, imports) {
		try {
			var binary = await getWasmBinary(binaryFile);
			return await WebAssembly.instantiate(binary, imports);
		} catch (reason) {
			err(`failed to asynchronously prepare wasm: ${reason}`);
			abort(reason);
		}
	}
	async function instantiateAsync(binary, binaryFile, imports) {
		if (!binary && !ENVIRONMENT_IS_NODE) try {
			var response = fetch(binaryFile, { credentials: "same-origin" });
			return await WebAssembly.instantiateStreaming(response, imports);
		} catch (reason) {
			err(`wasm streaming compile failed: ${reason}`);
			err("falling back to ArrayBuffer instantiation");
		}
		return instantiateArrayBuffer(binaryFile, imports);
	}
	function getWasmImports() {
		return { a: wasmImports };
	}
	async function createWasm() {
		function receiveInstance(instance, module) {
			wasmExports = instance.exports;
			assignWasmExports(wasmExports);
			updateMemoryViews();
			return wasmExports;
		}
		function receiveInstantiationResult(result) {
			return receiveInstance(result["instance"]);
		}
		var info = getWasmImports();
		if (Module["instantiateWasm"]) return new Promise((resolve, reject) => {
			Module["instantiateWasm"](info, (inst, mod) => {
				resolve(receiveInstance(inst, mod));
			});
		});
		wasmBinaryFile ??= findWasmBinary();
		return receiveInstantiationResult(await instantiateAsync(wasmBinary, wasmBinaryFile, info));
	}
	var callRuntimeCallbacks = (callbacks) => {
		while (callbacks.length > 0) callbacks.shift()(Module);
	};
	var onPostRuns = [];
	var addOnPostRun = (cb) => onPostRuns.push(cb);
	var onPreRuns = [];
	var addOnPreRun = (cb) => onPreRuns.push(cb);
	var stackRestore = (val) => __emscripten_stack_restore(val);
	var stackSave = () => _emscripten_stack_get_current();
	var syscallGetVarargI = () => {
		var ret = HEAP32[+SYSCALLS.varargs >> 2];
		SYSCALLS.varargs += 4;
		return ret;
	};
	var syscallGetVarargP = syscallGetVarargI;
	var PATH = {
		isAbs: (path) => path.charAt(0) === "/",
		splitPath: (filename) => {
			return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(filename).slice(1);
		},
		normalizeArray: (parts, allowAboveRoot) => {
			var up = 0;
			for (var i = parts.length - 1; i >= 0; i--) {
				var last = parts[i];
				if (last === ".") parts.splice(i, 1);
				else if (last === "..") {
					parts.splice(i, 1);
					up++;
				} else if (up) {
					parts.splice(i, 1);
					up--;
				}
			}
			if (allowAboveRoot) for (; up; up--) parts.unshift("..");
			return parts;
		},
		normalize: (path) => {
			var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
			path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
			if (!path && !isAbsolute) path = ".";
			if (path && trailingSlash) path += "/";
			return (isAbsolute ? "/" : "") + path;
		},
		dirname: (path) => {
			var result = PATH.splitPath(path), root = result[0], dir = result[1];
			if (!root && !dir) return ".";
			if (dir) dir = dir.slice(0, -1);
			return root + dir;
		},
		basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1],
		join: (...paths) => PATH.normalize(paths.join("/")),
		join2: (l, r) => PATH.normalize(l + "/" + r)
	};
	var initRandomFill = () => {
		if (ENVIRONMENT_IS_NODE) {
			var nodeCrypto = require("crypto");
			return (view) => nodeCrypto.randomFillSync(view);
		}
		return (view) => crypto.getRandomValues(view);
	};
	var randomFill = (view) => {
		(randomFill = initRandomFill())(view);
	};
	var PATH_FS = {
		resolve: (...args) => {
			var resolvedPath = "", resolvedAbsolute = false;
			for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
				var path = i >= 0 ? args[i] : FS.cwd();
				if (typeof path != "string") throw new TypeError("Arguments to path.resolve must be strings");
				else if (!path) return "";
				resolvedPath = path + "/" + resolvedPath;
				resolvedAbsolute = PATH.isAbs(path);
			}
			resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
			return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
		},
		relative: (from, to) => {
			from = PATH_FS.resolve(from).slice(1);
			to = PATH_FS.resolve(to).slice(1);
			function trim(arr) {
				var start = 0;
				for (; start < arr.length; start++) if (arr[start] !== "") break;
				var end = arr.length - 1;
				for (; end >= 0; end--) if (arr[end] !== "") break;
				if (start > end) return [];
				return arr.slice(start, end - start + 1);
			}
			var fromParts = trim(from.split("/"));
			var toParts = trim(to.split("/"));
			var length = Math.min(fromParts.length, toParts.length);
			var samePartsLength = length;
			for (var i = 0; i < length; i++) if (fromParts[i] !== toParts[i]) {
				samePartsLength = i;
				break;
			}
			var outputParts = [];
			for (var i = samePartsLength; i < fromParts.length; i++) outputParts.push("..");
			outputParts = outputParts.concat(toParts.slice(samePartsLength));
			return outputParts.join("/");
		}
	};
	var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
	var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
		var maxIdx = idx + maxBytesToRead;
		if (ignoreNul) return maxIdx;
		while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
		return idx;
	};
	var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
		var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
		if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
		var str = "";
		while (idx < endPtr) {
			var u0 = heapOrArray[idx++];
			if (!(u0 & 128)) {
				str += String.fromCharCode(u0);
				continue;
			}
			var u1 = heapOrArray[idx++] & 63;
			if ((u0 & 224) == 192) {
				str += String.fromCharCode((u0 & 31) << 6 | u1);
				continue;
			}
			var u2 = heapOrArray[idx++] & 63;
			if ((u0 & 240) == 224) u0 = (u0 & 15) << 12 | u1 << 6 | u2;
			else u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
			if (u0 < 65536) str += String.fromCharCode(u0);
			else {
				var ch = u0 - 65536;
				str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
			}
		}
		return str;
	};
	var FS_stdin_getChar_buffer = [];
	var lengthBytesUTF8 = (str) => {
		var len = 0;
		for (var i = 0; i < str.length; ++i) {
			var c = str.charCodeAt(i);
			if (c <= 127) len++;
			else if (c <= 2047) len += 2;
			else if (c >= 55296 && c <= 57343) {
				len += 4;
				++i;
			} else len += 3;
		}
		return len;
	};
	var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
		if (!(maxBytesToWrite > 0)) return 0;
		var startIdx = outIdx;
		var endIdx = outIdx + maxBytesToWrite - 1;
		for (var i = 0; i < str.length; ++i) {
			var u = str.codePointAt(i);
			if (u <= 127) {
				if (outIdx >= endIdx) break;
				heap[outIdx++] = u;
			} else if (u <= 2047) {
				if (outIdx + 1 >= endIdx) break;
				heap[outIdx++] = 192 | u >> 6;
				heap[outIdx++] = 128 | u & 63;
			} else if (u <= 65535) {
				if (outIdx + 2 >= endIdx) break;
				heap[outIdx++] = 224 | u >> 12;
				heap[outIdx++] = 128 | u >> 6 & 63;
				heap[outIdx++] = 128 | u & 63;
			} else {
				if (outIdx + 3 >= endIdx) break;
				heap[outIdx++] = 240 | u >> 18;
				heap[outIdx++] = 128 | u >> 12 & 63;
				heap[outIdx++] = 128 | u >> 6 & 63;
				heap[outIdx++] = 128 | u & 63;
				i++;
			}
		}
		heap[outIdx] = 0;
		return outIdx - startIdx;
	};
	var intArrayFromString = (stringy, dontAddNull, length) => {
		var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
		var u8array = new Array(len);
		var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
		if (dontAddNull) u8array.length = numBytesWritten;
		return u8array;
	};
	var FS_stdin_getChar = () => {
		if (!FS_stdin_getChar_buffer.length) {
			var result = null;
			if (ENVIRONMENT_IS_NODE) {
				var BUFSIZE = 256;
				var buf = Buffer.alloc(BUFSIZE);
				var bytesRead = 0;
				var fd = process.stdin.fd;
				try {
					bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
				} catch (e) {
					if (e.toString().includes("EOF")) bytesRead = 0;
					else throw e;
				}
				if (bytesRead > 0) result = buf.slice(0, bytesRead).toString("utf-8");
			} else if (globalThis.window?.prompt) {
				result = window.prompt("Input: ");
				if (result !== null) result += "\n";
			}
			if (!result) return null;
			FS_stdin_getChar_buffer = intArrayFromString(result, true);
		}
		return FS_stdin_getChar_buffer.shift();
	};
	var TTY = {
		ttys: [],
		init() {},
		shutdown() {},
		register(dev, ops) {
			TTY.ttys[dev] = {
				input: [],
				output: [],
				ops
			};
			FS.registerDevice(dev, TTY.stream_ops);
		},
		stream_ops: {
			open(stream) {
				var tty = TTY.ttys[stream.node.rdev];
				if (!tty) throw new FS.ErrnoError(43);
				stream.tty = tty;
				stream.seekable = false;
			},
			close(stream) {
				stream.tty.ops.fsync(stream.tty);
			},
			fsync(stream) {
				stream.tty.ops.fsync(stream.tty);
			},
			read(stream, buffer, offset, length, pos) {
				if (!stream.tty || !stream.tty.ops.get_char) throw new FS.ErrnoError(60);
				var bytesRead = 0;
				for (var i = 0; i < length; i++) {
					var result;
					try {
						result = stream.tty.ops.get_char(stream.tty);
					} catch (e) {
						throw new FS.ErrnoError(29);
					}
					if (result === void 0 && bytesRead === 0) throw new FS.ErrnoError(6);
					if (result === null || result === void 0) break;
					bytesRead++;
					buffer[offset + i] = result;
				}
				if (bytesRead) stream.node.atime = Date.now();
				return bytesRead;
			},
			write(stream, buffer, offset, length, pos) {
				if (!stream.tty || !stream.tty.ops.put_char) throw new FS.ErrnoError(60);
				try {
					for (var i = 0; i < length; i++) stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
				} catch (e) {
					throw new FS.ErrnoError(29);
				}
				if (length) stream.node.mtime = stream.node.ctime = Date.now();
				return i;
			}
		},
		default_tty_ops: {
			get_char(tty) {
				return FS_stdin_getChar();
			},
			put_char(tty, val) {
				if (val === null || val === 10) {
					out(UTF8ArrayToString(tty.output));
					tty.output = [];
				} else if (val != 0) tty.output.push(val);
			},
			fsync(tty) {
				if (tty.output?.length > 0) {
					out(UTF8ArrayToString(tty.output));
					tty.output = [];
				}
			},
			ioctl_tcgets(tty) {
				return {
					c_iflag: 25856,
					c_oflag: 5,
					c_cflag: 191,
					c_lflag: 35387,
					c_cc: [
						3,
						28,
						127,
						21,
						4,
						0,
						1,
						0,
						17,
						19,
						26,
						0,
						18,
						15,
						23,
						22,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0
					]
				};
			},
			ioctl_tcsets(tty, optional_actions, data) {
				return 0;
			},
			ioctl_tiocgwinsz(tty) {
				return [24, 80];
			}
		},
		default_tty1_ops: {
			put_char(tty, val) {
				if (val === null || val === 10) {
					err(UTF8ArrayToString(tty.output));
					tty.output = [];
				} else if (val != 0) tty.output.push(val);
			},
			fsync(tty) {
				if (tty.output?.length > 0) {
					err(UTF8ArrayToString(tty.output));
					tty.output = [];
				}
			}
		}
	};
	var mmapAlloc = (size) => {
		abort();
	};
	var MEMFS = {
		ops_table: null,
		mount(mount) {
			return MEMFS.createNode(null, "/", 16895, 0);
		},
		createNode(parent, name, mode, dev) {
			if (FS.isBlkdev(mode) || FS.isFIFO(mode)) throw new FS.ErrnoError(63);
			MEMFS.ops_table ||= {
				dir: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr,
						lookup: MEMFS.node_ops.lookup,
						mknod: MEMFS.node_ops.mknod,
						rename: MEMFS.node_ops.rename,
						unlink: MEMFS.node_ops.unlink,
						rmdir: MEMFS.node_ops.rmdir,
						readdir: MEMFS.node_ops.readdir,
						symlink: MEMFS.node_ops.symlink
					},
					stream: { llseek: MEMFS.stream_ops.llseek }
				},
				file: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr
					},
					stream: {
						llseek: MEMFS.stream_ops.llseek,
						read: MEMFS.stream_ops.read,
						write: MEMFS.stream_ops.write,
						mmap: MEMFS.stream_ops.mmap,
						msync: MEMFS.stream_ops.msync
					}
				},
				link: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr,
						readlink: MEMFS.node_ops.readlink
					},
					stream: {}
				},
				chrdev: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr
					},
					stream: FS.chrdev_stream_ops
				}
			};
			var node = FS.createNode(parent, name, mode, dev);
			if (FS.isDir(node.mode)) {
				node.node_ops = MEMFS.ops_table.dir.node;
				node.stream_ops = MEMFS.ops_table.dir.stream;
				node.contents = {};
			} else if (FS.isFile(node.mode)) {
				node.node_ops = MEMFS.ops_table.file.node;
				node.stream_ops = MEMFS.ops_table.file.stream;
				node.usedBytes = 0;
				node.contents = null;
			} else if (FS.isLink(node.mode)) {
				node.node_ops = MEMFS.ops_table.link.node;
				node.stream_ops = MEMFS.ops_table.link.stream;
			} else if (FS.isChrdev(node.mode)) {
				node.node_ops = MEMFS.ops_table.chrdev.node;
				node.stream_ops = MEMFS.ops_table.chrdev.stream;
			}
			node.atime = node.mtime = node.ctime = Date.now();
			if (parent) {
				parent.contents[name] = node;
				parent.atime = parent.mtime = parent.ctime = node.atime;
			}
			return node;
		},
		getFileDataAsTypedArray(node) {
			if (!node.contents) return /* @__PURE__ */ new Uint8Array(0);
			if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
			return new Uint8Array(node.contents);
		},
		expandFileStorage(node, newCapacity) {
			var prevCapacity = node.contents ? node.contents.length : 0;
			if (prevCapacity >= newCapacity) return;
			newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < 1024 * 1024 ? 2 : 1.125) >>> 0);
			if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
			var oldContents = node.contents;
			node.contents = new Uint8Array(newCapacity);
			if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
		},
		resizeFileStorage(node, newSize) {
			if (node.usedBytes == newSize) return;
			if (newSize == 0) {
				node.contents = null;
				node.usedBytes = 0;
			} else {
				var oldContents = node.contents;
				node.contents = new Uint8Array(newSize);
				if (oldContents) node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
				node.usedBytes = newSize;
			}
		},
		node_ops: {
			getattr(node) {
				var attr = {};
				attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
				attr.ino = node.id;
				attr.mode = node.mode;
				attr.nlink = 1;
				attr.uid = 0;
				attr.gid = 0;
				attr.rdev = node.rdev;
				if (FS.isDir(node.mode)) attr.size = 4096;
				else if (FS.isFile(node.mode)) attr.size = node.usedBytes;
				else if (FS.isLink(node.mode)) attr.size = node.link.length;
				else attr.size = 0;
				attr.atime = new Date(node.atime);
				attr.mtime = new Date(node.mtime);
				attr.ctime = new Date(node.ctime);
				attr.blksize = 4096;
				attr.blocks = Math.ceil(attr.size / attr.blksize);
				return attr;
			},
			setattr(node, attr) {
				for (const key of [
					"mode",
					"atime",
					"mtime",
					"ctime"
				]) if (attr[key] != null) node[key] = attr[key];
				if (attr.size !== void 0) MEMFS.resizeFileStorage(node, attr.size);
			},
			lookup(parent, name) {
				if (!MEMFS.doesNotExistError) {
					MEMFS.doesNotExistError = new FS.ErrnoError(44);
					MEMFS.doesNotExistError.stack = "<generic error, no stack>";
				}
				throw MEMFS.doesNotExistError;
			},
			mknod(parent, name, mode, dev) {
				return MEMFS.createNode(parent, name, mode, dev);
			},
			rename(old_node, new_dir, new_name) {
				var new_node;
				try {
					new_node = FS.lookupNode(new_dir, new_name);
				} catch (e) {}
				if (new_node) {
					if (FS.isDir(old_node.mode)) for (var i in new_node.contents) throw new FS.ErrnoError(55);
					FS.hashRemoveNode(new_node);
				}
				delete old_node.parent.contents[old_node.name];
				new_dir.contents[new_name] = old_node;
				old_node.name = new_name;
				new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
			},
			unlink(parent, name) {
				delete parent.contents[name];
				parent.ctime = parent.mtime = Date.now();
			},
			rmdir(parent, name) {
				for (var i in FS.lookupNode(parent, name).contents) throw new FS.ErrnoError(55);
				delete parent.contents[name];
				parent.ctime = parent.mtime = Date.now();
			},
			readdir(node) {
				return [
					".",
					"..",
					...Object.keys(node.contents)
				];
			},
			symlink(parent, newname, oldpath) {
				var node = MEMFS.createNode(parent, newname, 41471, 0);
				node.link = oldpath;
				return node;
			},
			readlink(node) {
				if (!FS.isLink(node.mode)) throw new FS.ErrnoError(28);
				return node.link;
			}
		},
		stream_ops: {
			read(stream, buffer, offset, length, position) {
				var contents = stream.node.contents;
				if (position >= stream.node.usedBytes) return 0;
				var size = Math.min(stream.node.usedBytes - position, length);
				if (size > 8 && contents.subarray) buffer.set(contents.subarray(position, position + size), offset);
				else for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
				return size;
			},
			write(stream, buffer, offset, length, position, canOwn) {
				if (buffer.buffer === HEAP8.buffer) canOwn = false;
				if (!length) return 0;
				var node = stream.node;
				node.mtime = node.ctime = Date.now();
				if (buffer.subarray && (!node.contents || node.contents.subarray)) {
					if (canOwn) {
						node.contents = buffer.subarray(offset, offset + length);
						node.usedBytes = length;
						return length;
					} else if (node.usedBytes === 0 && position === 0) {
						node.contents = buffer.slice(offset, offset + length);
						node.usedBytes = length;
						return length;
					} else if (position + length <= node.usedBytes) {
						node.contents.set(buffer.subarray(offset, offset + length), position);
						return length;
					}
				}
				MEMFS.expandFileStorage(node, position + length);
				if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position);
				else for (var i = 0; i < length; i++) node.contents[position + i] = buffer[offset + i];
				node.usedBytes = Math.max(node.usedBytes, position + length);
				return length;
			},
			llseek(stream, offset, whence) {
				var position = offset;
				if (whence === 1) position += stream.position;
				else if (whence === 2) {
					if (FS.isFile(stream.node.mode)) position += stream.node.usedBytes;
				}
				if (position < 0) throw new FS.ErrnoError(28);
				return position;
			},
			mmap(stream, length, position, prot, flags) {
				if (!FS.isFile(stream.node.mode)) throw new FS.ErrnoError(43);
				var ptr;
				var allocated;
				var contents = stream.node.contents;
				if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
					allocated = false;
					ptr = contents.byteOffset;
				} else {
					allocated = true;
					ptr = mmapAlloc(length);
					if (!ptr) throw new FS.ErrnoError(48);
					if (contents) {
						if (position > 0 || position + length < contents.length) if (contents.subarray) contents = contents.subarray(position, position + length);
						else contents = Array.prototype.slice.call(contents, position, position + length);
						HEAP8.set(contents, ptr);
					}
				}
				return {
					ptr,
					allocated
				};
			},
			msync(stream, buffer, offset, length, mmapFlags) {
				MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
				return 0;
			}
		}
	};
	var FS_modeStringToFlags = (str) => {
		var flags = {
			r: 0,
			"r+": 2,
			w: 577,
			"w+": 578,
			a: 1089,
			"a+": 1090
		}[str];
		if (typeof flags == "undefined") throw new Error(`Unknown file open mode: ${str}`);
		return flags;
	};
	var FS_getMode = (canRead, canWrite) => {
		var mode = 0;
		if (canRead) mode |= 365;
		if (canWrite) mode |= 146;
		return mode;
	};
	var asyncLoad = async (url) => {
		var arrayBuffer = await readAsync(url);
		return new Uint8Array(arrayBuffer);
	};
	var FS_createDataFile = (...args) => FS.createDataFile(...args);
	var getUniqueRunDependency = (id) => id;
	var runDependencies = 0;
	var dependenciesFulfilled = null;
	var removeRunDependency = (id) => {
		runDependencies--;
		Module["monitorRunDependencies"]?.(runDependencies);
		if (runDependencies == 0) {
			if (dependenciesFulfilled) {
				var callback = dependenciesFulfilled;
				dependenciesFulfilled = null;
				callback();
			}
		}
	};
	var addRunDependency = (id) => {
		runDependencies++;
		Module["monitorRunDependencies"]?.(runDependencies);
	};
	var preloadPlugins = [];
	var FS_handledByPreloadPlugin = async (byteArray, fullname) => {
		if (typeof Browser != "undefined") Browser.init();
		for (var plugin of preloadPlugins) if (plugin["canHandle"](fullname)) return plugin["handle"](byteArray, fullname);
		return byteArray;
	};
	var FS_preloadFile = async (parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish) => {
		var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
		var dep = getUniqueRunDependency(`cp ${fullname}`);
		addRunDependency(dep);
		try {
			var byteArray = url;
			if (typeof url == "string") byteArray = await asyncLoad(url);
			byteArray = await FS_handledByPreloadPlugin(byteArray, fullname);
			preFinish?.();
			if (!dontCreateFile) FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
		} finally {
			removeRunDependency(dep);
		}
	};
	var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
		FS_preloadFile(parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish).then(onload).catch(onerror);
	};
	var FS = {
		root: null,
		mounts: [],
		devices: {},
		streams: [],
		nextInode: 1,
		nameTable: null,
		currentPath: "/",
		initialized: false,
		ignorePermissions: true,
		filesystems: null,
		syncFSRequests: 0,
		readFiles: {},
		ErrnoError: class {
			name = "ErrnoError";
			constructor(errno) {
				this.errno = errno;
			}
		},
		FSStream: class {
			shared = {};
			get object() {
				return this.node;
			}
			set object(val) {
				this.node = val;
			}
			get isRead() {
				return (this.flags & 2097155) !== 1;
			}
			get isWrite() {
				return (this.flags & 2097155) !== 0;
			}
			get isAppend() {
				return this.flags & 1024;
			}
			get flags() {
				return this.shared.flags;
			}
			set flags(val) {
				this.shared.flags = val;
			}
			get position() {
				return this.shared.position;
			}
			set position(val) {
				this.shared.position = val;
			}
		},
		FSNode: class {
			node_ops = {};
			stream_ops = {};
			readMode = 365;
			writeMode = 146;
			mounted = null;
			constructor(parent, name, mode, rdev) {
				if (!parent) parent = this;
				this.parent = parent;
				this.mount = parent.mount;
				this.id = FS.nextInode++;
				this.name = name;
				this.mode = mode;
				this.rdev = rdev;
				this.atime = this.mtime = this.ctime = Date.now();
			}
			get read() {
				return (this.mode & this.readMode) === this.readMode;
			}
			set read(val) {
				val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
			}
			get write() {
				return (this.mode & this.writeMode) === this.writeMode;
			}
			set write(val) {
				val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
			}
			get isFolder() {
				return FS.isDir(this.mode);
			}
			get isDevice() {
				return FS.isChrdev(this.mode);
			}
		},
		lookupPath(path, opts = {}) {
			if (!path) throw new FS.ErrnoError(44);
			opts.follow_mount ??= true;
			if (!PATH.isAbs(path)) path = FS.cwd() + "/" + path;
			linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
				var parts = path.split("/").filter((p) => !!p);
				var current = FS.root;
				var current_path = "/";
				for (var i = 0; i < parts.length; i++) {
					var islast = i === parts.length - 1;
					if (islast && opts.parent) break;
					if (parts[i] === ".") continue;
					if (parts[i] === "..") {
						current_path = PATH.dirname(current_path);
						if (FS.isRoot(current)) {
							path = current_path + "/" + parts.slice(i + 1).join("/");
							nlinks--;
							continue linkloop;
						} else current = current.parent;
						continue;
					}
					current_path = PATH.join2(current_path, parts[i]);
					try {
						current = FS.lookupNode(current, parts[i]);
					} catch (e) {
						if (e?.errno === 44 && islast && opts.noent_okay) return { path: current_path };
						throw e;
					}
					if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) current = current.mounted.root;
					if (FS.isLink(current.mode) && (!islast || opts.follow)) {
						if (!current.node_ops.readlink) throw new FS.ErrnoError(52);
						var link = current.node_ops.readlink(current);
						if (!PATH.isAbs(link)) link = PATH.dirname(current_path) + "/" + link;
						path = link + "/" + parts.slice(i + 1).join("/");
						continue linkloop;
					}
				}
				return {
					path: current_path,
					node: current
				};
			}
			throw new FS.ErrnoError(32);
		},
		getPath(node) {
			var path;
			while (true) {
				if (FS.isRoot(node)) {
					var mount = node.mount.mountpoint;
					if (!path) return mount;
					return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
				}
				path = path ? `${node.name}/${path}` : node.name;
				node = node.parent;
			}
		},
		hashName(parentid, name) {
			var hash = 0;
			for (var i = 0; i < name.length; i++) hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
			return (parentid + hash >>> 0) % FS.nameTable.length;
		},
		hashAddNode(node) {
			var hash = FS.hashName(node.parent.id, node.name);
			node.name_next = FS.nameTable[hash];
			FS.nameTable[hash] = node;
		},
		hashRemoveNode(node) {
			var hash = FS.hashName(node.parent.id, node.name);
			if (FS.nameTable[hash] === node) FS.nameTable[hash] = node.name_next;
			else {
				var current = FS.nameTable[hash];
				while (current) {
					if (current.name_next === node) {
						current.name_next = node.name_next;
						break;
					}
					current = current.name_next;
				}
			}
		},
		lookupNode(parent, name) {
			var errCode = FS.mayLookup(parent);
			if (errCode) throw new FS.ErrnoError(errCode);
			var hash = FS.hashName(parent.id, name);
			for (var node = FS.nameTable[hash]; node; node = node.name_next) {
				var nodeName = node.name;
				if (node.parent.id === parent.id && nodeName === name) return node;
			}
			return FS.lookup(parent, name);
		},
		createNode(parent, name, mode, rdev) {
			var node = new FS.FSNode(parent, name, mode, rdev);
			FS.hashAddNode(node);
			return node;
		},
		destroyNode(node) {
			FS.hashRemoveNode(node);
		},
		isRoot(node) {
			return node === node.parent;
		},
		isMountpoint(node) {
			return !!node.mounted;
		},
		isFile(mode) {
			return (mode & 61440) === 32768;
		},
		isDir(mode) {
			return (mode & 61440) === 16384;
		},
		isLink(mode) {
			return (mode & 61440) === 40960;
		},
		isChrdev(mode) {
			return (mode & 61440) === 8192;
		},
		isBlkdev(mode) {
			return (mode & 61440) === 24576;
		},
		isFIFO(mode) {
			return (mode & 61440) === 4096;
		},
		isSocket(mode) {
			return (mode & 49152) === 49152;
		},
		flagsToPermissionString(flag) {
			var perms = [
				"r",
				"w",
				"rw"
			][flag & 3];
			if (flag & 512) perms += "w";
			return perms;
		},
		nodePermissions(node, perms) {
			if (FS.ignorePermissions) return 0;
			if (perms.includes("r") && !(node.mode & 292)) return 2;
			else if (perms.includes("w") && !(node.mode & 146)) return 2;
			else if (perms.includes("x") && !(node.mode & 73)) return 2;
			return 0;
		},
		mayLookup(dir) {
			if (!FS.isDir(dir.mode)) return 54;
			var errCode = FS.nodePermissions(dir, "x");
			if (errCode) return errCode;
			if (!dir.node_ops.lookup) return 2;
			return 0;
		},
		mayCreate(dir, name) {
			if (!FS.isDir(dir.mode)) return 54;
			try {
				FS.lookupNode(dir, name);
				return 20;
			} catch (e) {}
			return FS.nodePermissions(dir, "wx");
		},
		mayDelete(dir, name, isdir) {
			var node;
			try {
				node = FS.lookupNode(dir, name);
			} catch (e) {
				return e.errno;
			}
			var errCode = FS.nodePermissions(dir, "wx");
			if (errCode) return errCode;
			if (isdir) {
				if (!FS.isDir(node.mode)) return 54;
				if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) return 10;
			} else if (FS.isDir(node.mode)) return 31;
			return 0;
		},
		mayOpen(node, flags) {
			if (!node) return 44;
			if (FS.isLink(node.mode)) return 32;
			else if (FS.isDir(node.mode)) {
				if (FS.flagsToPermissionString(flags) !== "r" || flags & 576) return 31;
			}
			return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
		},
		checkOpExists(op, err) {
			if (!op) throw new FS.ErrnoError(err);
			return op;
		},
		MAX_OPEN_FDS: 4096,
		nextfd() {
			for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) if (!FS.streams[fd]) return fd;
			throw new FS.ErrnoError(33);
		},
		getStreamChecked(fd) {
			var stream = FS.getStream(fd);
			if (!stream) throw new FS.ErrnoError(8);
			return stream;
		},
		getStream: (fd) => FS.streams[fd],
		createStream(stream, fd = -1) {
			stream = Object.assign(new FS.FSStream(), stream);
			if (fd == -1) fd = FS.nextfd();
			stream.fd = fd;
			FS.streams[fd] = stream;
			return stream;
		},
		closeStream(fd) {
			FS.streams[fd] = null;
		},
		dupStream(origStream, fd = -1) {
			var stream = FS.createStream(origStream, fd);
			stream.stream_ops?.dup?.(stream);
			return stream;
		},
		doSetAttr(stream, node, attr) {
			var setattr = stream?.stream_ops.setattr;
			var arg = setattr ? stream : node;
			setattr ??= node.node_ops.setattr;
			FS.checkOpExists(setattr, 63);
			setattr(arg, attr);
		},
		chrdev_stream_ops: {
			open(stream) {
				stream.stream_ops = FS.getDevice(stream.node.rdev).stream_ops;
				stream.stream_ops.open?.(stream);
			},
			llseek() {
				throw new FS.ErrnoError(70);
			}
		},
		major: (dev) => dev >> 8,
		minor: (dev) => dev & 255,
		makedev: (ma, mi) => ma << 8 | mi,
		registerDevice(dev, ops) {
			FS.devices[dev] = { stream_ops: ops };
		},
		getDevice: (dev) => FS.devices[dev],
		getMounts(mount) {
			var mounts = [];
			var check = [mount];
			while (check.length) {
				var m = check.pop();
				mounts.push(m);
				check.push(...m.mounts);
			}
			return mounts;
		},
		syncfs(populate, callback) {
			if (typeof populate == "function") {
				callback = populate;
				populate = false;
			}
			FS.syncFSRequests++;
			if (FS.syncFSRequests > 1) err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
			var mounts = FS.getMounts(FS.root.mount);
			var completed = 0;
			function doCallback(errCode) {
				FS.syncFSRequests--;
				return callback(errCode);
			}
			function done(errCode) {
				if (errCode) {
					if (!done.errored) {
						done.errored = true;
						return doCallback(errCode);
					}
					return;
				}
				if (++completed >= mounts.length) doCallback(null);
			}
			for (var mount of mounts) if (mount.type.syncfs) mount.type.syncfs(mount, populate, done);
			else done(null);
		},
		mount(type, opts, mountpoint) {
			var root = mountpoint === "/";
			var pseudo = !mountpoint;
			var node;
			if (root && FS.root) throw new FS.ErrnoError(10);
			else if (!root && !pseudo) {
				var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
				mountpoint = lookup.path;
				node = lookup.node;
				if (FS.isMountpoint(node)) throw new FS.ErrnoError(10);
				if (!FS.isDir(node.mode)) throw new FS.ErrnoError(54);
			}
			var mount = {
				type,
				opts,
				mountpoint,
				mounts: []
			};
			var mountRoot = type.mount(mount);
			mountRoot.mount = mount;
			mount.root = mountRoot;
			if (root) FS.root = mountRoot;
			else if (node) {
				node.mounted = mount;
				if (node.mount) node.mount.mounts.push(mount);
			}
			return mountRoot;
		},
		unmount(mountpoint) {
			var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
			if (!FS.isMountpoint(lookup.node)) throw new FS.ErrnoError(28);
			var node = lookup.node;
			var mount = node.mounted;
			var mounts = FS.getMounts(mount);
			for (var [hash, current] of Object.entries(FS.nameTable)) while (current) {
				var next = current.name_next;
				if (mounts.includes(current.mount)) FS.destroyNode(current);
				current = next;
			}
			node.mounted = null;
			var idx = node.mount.mounts.indexOf(mount);
			node.mount.mounts.splice(idx, 1);
		},
		lookup(parent, name) {
			return parent.node_ops.lookup(parent, name);
		},
		mknod(path, mode, dev) {
			var parent = FS.lookupPath(path, { parent: true }).node;
			var name = PATH.basename(path);
			if (!name) throw new FS.ErrnoError(28);
			if (name === "." || name === "..") throw new FS.ErrnoError(20);
			var errCode = FS.mayCreate(parent, name);
			if (errCode) throw new FS.ErrnoError(errCode);
			if (!parent.node_ops.mknod) throw new FS.ErrnoError(63);
			return parent.node_ops.mknod(parent, name, mode, dev);
		},
		statfs(path) {
			return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
		},
		statfsStream(stream) {
			return FS.statfsNode(stream.node);
		},
		statfsNode(node) {
			var rtn = {
				bsize: 4096,
				frsize: 4096,
				blocks: 1e6,
				bfree: 5e5,
				bavail: 5e5,
				files: FS.nextInode,
				ffree: FS.nextInode - 1,
				fsid: 42,
				flags: 2,
				namelen: 255
			};
			if (node.node_ops.statfs) Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
			return rtn;
		},
		create(path, mode = 438) {
			mode &= 4095;
			mode |= 32768;
			return FS.mknod(path, mode, 0);
		},
		mkdir(path, mode = 511) {
			mode &= 1023;
			mode |= 16384;
			return FS.mknod(path, mode, 0);
		},
		mkdirTree(path, mode) {
			var dirs = path.split("/");
			var d = "";
			for (var dir of dirs) {
				if (!dir) continue;
				if (d || PATH.isAbs(path)) d += "/";
				d += dir;
				try {
					FS.mkdir(d, mode);
				} catch (e) {
					if (e.errno != 20) throw e;
				}
			}
		},
		mkdev(path, mode, dev) {
			if (typeof dev == "undefined") {
				dev = mode;
				mode = 438;
			}
			mode |= 8192;
			return FS.mknod(path, mode, dev);
		},
		symlink(oldpath, newpath) {
			if (!PATH_FS.resolve(oldpath)) throw new FS.ErrnoError(44);
			var parent = FS.lookupPath(newpath, { parent: true }).node;
			if (!parent) throw new FS.ErrnoError(44);
			var newname = PATH.basename(newpath);
			var errCode = FS.mayCreate(parent, newname);
			if (errCode) throw new FS.ErrnoError(errCode);
			if (!parent.node_ops.symlink) throw new FS.ErrnoError(63);
			return parent.node_ops.symlink(parent, newname, oldpath);
		},
		rename(old_path, new_path) {
			var old_dirname = PATH.dirname(old_path);
			var new_dirname = PATH.dirname(new_path);
			var old_name = PATH.basename(old_path);
			var new_name = PATH.basename(new_path);
			var lookup = FS.lookupPath(old_path, { parent: true }), old_dir = lookup.node, new_dir;
			lookup = FS.lookupPath(new_path, { parent: true });
			new_dir = lookup.node;
			if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
			if (old_dir.mount !== new_dir.mount) throw new FS.ErrnoError(75);
			var old_node = FS.lookupNode(old_dir, old_name);
			var relative = PATH_FS.relative(old_path, new_dirname);
			if (relative.charAt(0) !== ".") throw new FS.ErrnoError(28);
			relative = PATH_FS.relative(new_path, old_dirname);
			if (relative.charAt(0) !== ".") throw new FS.ErrnoError(55);
			var new_node;
			try {
				new_node = FS.lookupNode(new_dir, new_name);
			} catch (e) {}
			if (old_node === new_node) return;
			var isdir = FS.isDir(old_node.mode);
			var errCode = FS.mayDelete(old_dir, old_name, isdir);
			if (errCode) throw new FS.ErrnoError(errCode);
			errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
			if (errCode) throw new FS.ErrnoError(errCode);
			if (!old_dir.node_ops.rename) throw new FS.ErrnoError(63);
			if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) throw new FS.ErrnoError(10);
			if (new_dir !== old_dir) {
				errCode = FS.nodePermissions(old_dir, "w");
				if (errCode) throw new FS.ErrnoError(errCode);
			}
			FS.hashRemoveNode(old_node);
			try {
				old_dir.node_ops.rename(old_node, new_dir, new_name);
				old_node.parent = new_dir;
			} catch (e) {
				throw e;
			} finally {
				FS.hashAddNode(old_node);
			}
		},
		rmdir(path) {
			var parent = FS.lookupPath(path, { parent: true }).node;
			var name = PATH.basename(path);
			var node = FS.lookupNode(parent, name);
			var errCode = FS.mayDelete(parent, name, true);
			if (errCode) throw new FS.ErrnoError(errCode);
			if (!parent.node_ops.rmdir) throw new FS.ErrnoError(63);
			if (FS.isMountpoint(node)) throw new FS.ErrnoError(10);
			parent.node_ops.rmdir(parent, name);
			FS.destroyNode(node);
		},
		readdir(path) {
			var node = FS.lookupPath(path, { follow: true }).node;
			return FS.checkOpExists(node.node_ops.readdir, 54)(node);
		},
		unlink(path) {
			var parent = FS.lookupPath(path, { parent: true }).node;
			if (!parent) throw new FS.ErrnoError(44);
			var name = PATH.basename(path);
			var node = FS.lookupNode(parent, name);
			var errCode = FS.mayDelete(parent, name, false);
			if (errCode) throw new FS.ErrnoError(errCode);
			if (!parent.node_ops.unlink) throw new FS.ErrnoError(63);
			if (FS.isMountpoint(node)) throw new FS.ErrnoError(10);
			parent.node_ops.unlink(parent, name);
			FS.destroyNode(node);
		},
		readlink(path) {
			var link = FS.lookupPath(path).node;
			if (!link) throw new FS.ErrnoError(44);
			if (!link.node_ops.readlink) throw new FS.ErrnoError(28);
			return link.node_ops.readlink(link);
		},
		stat(path, dontFollow) {
			var node = FS.lookupPath(path, { follow: !dontFollow }).node;
			return FS.checkOpExists(node.node_ops.getattr, 63)(node);
		},
		fstat(fd) {
			var stream = FS.getStreamChecked(fd);
			var node = stream.node;
			var getattr = stream.stream_ops.getattr;
			var arg = getattr ? stream : node;
			getattr ??= node.node_ops.getattr;
			FS.checkOpExists(getattr, 63);
			return getattr(arg);
		},
		lstat(path) {
			return FS.stat(path, true);
		},
		doChmod(stream, node, mode, dontFollow) {
			FS.doSetAttr(stream, node, {
				mode: mode & 4095 | node.mode & -4096,
				ctime: Date.now(),
				dontFollow
			});
		},
		chmod(path, mode, dontFollow) {
			var node;
			if (typeof path == "string") node = FS.lookupPath(path, { follow: !dontFollow }).node;
			else node = path;
			FS.doChmod(null, node, mode, dontFollow);
		},
		lchmod(path, mode) {
			FS.chmod(path, mode, true);
		},
		fchmod(fd, mode) {
			var stream = FS.getStreamChecked(fd);
			FS.doChmod(stream, stream.node, mode, false);
		},
		doChown(stream, node, dontFollow) {
			FS.doSetAttr(stream, node, {
				timestamp: Date.now(),
				dontFollow
			});
		},
		chown(path, uid, gid, dontFollow) {
			var node;
			if (typeof path == "string") node = FS.lookupPath(path, { follow: !dontFollow }).node;
			else node = path;
			FS.doChown(null, node, dontFollow);
		},
		lchown(path, uid, gid) {
			FS.chown(path, uid, gid, true);
		},
		fchown(fd, uid, gid) {
			var stream = FS.getStreamChecked(fd);
			FS.doChown(stream, stream.node, false);
		},
		doTruncate(stream, node, len) {
			if (FS.isDir(node.mode)) throw new FS.ErrnoError(31);
			if (!FS.isFile(node.mode)) throw new FS.ErrnoError(28);
			var errCode = FS.nodePermissions(node, "w");
			if (errCode) throw new FS.ErrnoError(errCode);
			FS.doSetAttr(stream, node, {
				size: len,
				timestamp: Date.now()
			});
		},
		truncate(path, len) {
			if (len < 0) throw new FS.ErrnoError(28);
			var node;
			if (typeof path == "string") node = FS.lookupPath(path, { follow: true }).node;
			else node = path;
			FS.doTruncate(null, node, len);
		},
		ftruncate(fd, len) {
			var stream = FS.getStreamChecked(fd);
			if (len < 0 || (stream.flags & 2097155) === 0) throw new FS.ErrnoError(28);
			FS.doTruncate(stream, stream.node, len);
		},
		utime(path, atime, mtime) {
			var node = FS.lookupPath(path, { follow: true }).node;
			FS.checkOpExists(node.node_ops.setattr, 63)(node, {
				atime,
				mtime
			});
		},
		open(path, flags, mode = 438) {
			if (path === "") throw new FS.ErrnoError(44);
			flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
			if (flags & 64) mode = mode & 4095 | 32768;
			else mode = 0;
			var node;
			var isDirPath;
			if (typeof path == "object") node = path;
			else {
				isDirPath = path.endsWith("/");
				var lookup = FS.lookupPath(path, {
					follow: !(flags & 131072),
					noent_okay: true
				});
				node = lookup.node;
				path = lookup.path;
			}
			var created = false;
			if (flags & 64) if (node) {
				if (flags & 128) throw new FS.ErrnoError(20);
			} else if (isDirPath) throw new FS.ErrnoError(31);
			else {
				node = FS.mknod(path, mode | 511, 0);
				created = true;
			}
			if (!node) throw new FS.ErrnoError(44);
			if (FS.isChrdev(node.mode)) flags &= -513;
			if (flags & 65536 && !FS.isDir(node.mode)) throw new FS.ErrnoError(54);
			if (!created) {
				var errCode = FS.mayOpen(node, flags);
				if (errCode) throw new FS.ErrnoError(errCode);
			}
			if (flags & 512 && !created) FS.truncate(node, 0);
			flags &= -131713;
			var stream = FS.createStream({
				node,
				path: FS.getPath(node),
				flags,
				seekable: true,
				position: 0,
				stream_ops: node.stream_ops,
				ungotten: [],
				error: false
			});
			if (stream.stream_ops.open) stream.stream_ops.open(stream);
			if (created) FS.chmod(node, mode & 511);
			if (Module["logReadFiles"] && !(flags & 1)) {
				if (!(path in FS.readFiles)) FS.readFiles[path] = 1;
			}
			return stream;
		},
		close(stream) {
			if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
			if (stream.getdents) stream.getdents = null;
			try {
				if (stream.stream_ops.close) stream.stream_ops.close(stream);
			} catch (e) {
				throw e;
			} finally {
				FS.closeStream(stream.fd);
			}
			stream.fd = null;
		},
		isClosed(stream) {
			return stream.fd === null;
		},
		llseek(stream, offset, whence) {
			if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
			if (!stream.seekable || !stream.stream_ops.llseek) throw new FS.ErrnoError(70);
			if (whence != 0 && whence != 1 && whence != 2) throw new FS.ErrnoError(28);
			stream.position = stream.stream_ops.llseek(stream, offset, whence);
			stream.ungotten = [];
			return stream.position;
		},
		read(stream, buffer, offset, length, position) {
			if (length < 0 || position < 0) throw new FS.ErrnoError(28);
			if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
			if ((stream.flags & 2097155) === 1) throw new FS.ErrnoError(8);
			if (FS.isDir(stream.node.mode)) throw new FS.ErrnoError(31);
			if (!stream.stream_ops.read) throw new FS.ErrnoError(28);
			var seeking = typeof position != "undefined";
			if (!seeking) position = stream.position;
			else if (!stream.seekable) throw new FS.ErrnoError(70);
			var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
			if (!seeking) stream.position += bytesRead;
			return bytesRead;
		},
		write(stream, buffer, offset, length, position, canOwn) {
			if (length < 0 || position < 0) throw new FS.ErrnoError(28);
			if (FS.isClosed(stream)) throw new FS.ErrnoError(8);
			if ((stream.flags & 2097155) === 0) throw new FS.ErrnoError(8);
			if (FS.isDir(stream.node.mode)) throw new FS.ErrnoError(31);
			if (!stream.stream_ops.write) throw new FS.ErrnoError(28);
			if (stream.seekable && stream.flags & 1024) FS.llseek(stream, 0, 2);
			var seeking = typeof position != "undefined";
			if (!seeking) position = stream.position;
			else if (!stream.seekable) throw new FS.ErrnoError(70);
			var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
			if (!seeking) stream.position += bytesWritten;
			return bytesWritten;
		},
		mmap(stream, length, position, prot, flags) {
			if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) throw new FS.ErrnoError(2);
			if ((stream.flags & 2097155) === 1) throw new FS.ErrnoError(2);
			if (!stream.stream_ops.mmap) throw new FS.ErrnoError(43);
			if (!length) throw new FS.ErrnoError(28);
			return stream.stream_ops.mmap(stream, length, position, prot, flags);
		},
		msync(stream, buffer, offset, length, mmapFlags) {
			if (!stream.stream_ops.msync) return 0;
			return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
		},
		ioctl(stream, cmd, arg) {
			if (!stream.stream_ops.ioctl) throw new FS.ErrnoError(59);
			return stream.stream_ops.ioctl(stream, cmd, arg);
		},
		readFile(path, opts = {}) {
			opts.flags = opts.flags || 0;
			opts.encoding = opts.encoding || "binary";
			if (opts.encoding !== "utf8" && opts.encoding !== "binary") abort(`Invalid encoding type "${opts.encoding}"`);
			var stream = FS.open(path, opts.flags);
			var length = FS.stat(path).size;
			var buf = new Uint8Array(length);
			FS.read(stream, buf, 0, length, 0);
			if (opts.encoding === "utf8") buf = UTF8ArrayToString(buf);
			FS.close(stream);
			return buf;
		},
		writeFile(path, data, opts = {}) {
			opts.flags = opts.flags || 577;
			var stream = FS.open(path, opts.flags, opts.mode);
			if (typeof data == "string") data = new Uint8Array(intArrayFromString(data, true));
			if (ArrayBuffer.isView(data)) FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
			else abort("Unsupported data type");
			FS.close(stream);
		},
		cwd: () => FS.currentPath,
		chdir(path) {
			var lookup = FS.lookupPath(path, { follow: true });
			if (lookup.node === null) throw new FS.ErrnoError(44);
			if (!FS.isDir(lookup.node.mode)) throw new FS.ErrnoError(54);
			var errCode = FS.nodePermissions(lookup.node, "x");
			if (errCode) throw new FS.ErrnoError(errCode);
			FS.currentPath = lookup.path;
		},
		createDefaultDirectories() {
			FS.mkdir("/tmp");
			FS.mkdir("/home");
			FS.mkdir("/home/web_user");
		},
		createDefaultDevices() {
			FS.mkdir("/dev");
			FS.registerDevice(FS.makedev(1, 3), {
				read: () => 0,
				write: (stream, buffer, offset, length, pos) => length,
				llseek: () => 0
			});
			FS.mkdev("/dev/null", FS.makedev(1, 3));
			TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
			TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
			FS.mkdev("/dev/tty", FS.makedev(5, 0));
			FS.mkdev("/dev/tty1", FS.makedev(6, 0));
			var randomBuffer = /* @__PURE__ */ new Uint8Array(1024), randomLeft = 0;
			var randomByte = () => {
				if (randomLeft === 0) {
					randomFill(randomBuffer);
					randomLeft = randomBuffer.byteLength;
				}
				return randomBuffer[--randomLeft];
			};
			FS.createDevice("/dev", "random", randomByte);
			FS.createDevice("/dev", "urandom", randomByte);
			FS.mkdir("/dev/shm");
			FS.mkdir("/dev/shm/tmp");
		},
		createSpecialDirectories() {
			FS.mkdir("/proc");
			var proc_self = FS.mkdir("/proc/self");
			FS.mkdir("/proc/self/fd");
			FS.mount({ mount() {
				var node = FS.createNode(proc_self, "fd", 16895, 73);
				node.stream_ops = { llseek: MEMFS.stream_ops.llseek };
				node.node_ops = {
					lookup(parent, name) {
						var fd = +name;
						var stream = FS.getStreamChecked(fd);
						var ret = {
							parent: null,
							mount: { mountpoint: "fake" },
							node_ops: { readlink: () => stream.path },
							id: fd + 1
						};
						ret.parent = ret;
						return ret;
					},
					readdir() {
						return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
					}
				};
				return node;
			} }, {}, "/proc/self/fd");
		},
		createStandardStreams(input, output, error) {
			if (input) FS.createDevice("/dev", "stdin", input);
			else FS.symlink("/dev/tty", "/dev/stdin");
			if (output) FS.createDevice("/dev", "stdout", null, output);
			else FS.symlink("/dev/tty", "/dev/stdout");
			if (error) FS.createDevice("/dev", "stderr", null, error);
			else FS.symlink("/dev/tty1", "/dev/stderr");
			FS.open("/dev/stdin", 0);
			FS.open("/dev/stdout", 1);
			FS.open("/dev/stderr", 1);
		},
		staticInit() {
			FS.nameTable = new Array(4096);
			FS.mount(MEMFS, {}, "/");
			FS.createDefaultDirectories();
			FS.createDefaultDevices();
			FS.createSpecialDirectories();
			FS.filesystems = { MEMFS };
		},
		init(input, output, error) {
			FS.initialized = true;
			input ??= Module["stdin"];
			output ??= Module["stdout"];
			error ??= Module["stderr"];
			FS.createStandardStreams(input, output, error);
		},
		quit() {
			FS.initialized = false;
			for (var stream of FS.streams) if (stream) FS.close(stream);
		},
		findObject(path, dontResolveLastLink) {
			var ret = FS.analyzePath(path, dontResolveLastLink);
			if (!ret.exists) return null;
			return ret.object;
		},
		analyzePath(path, dontResolveLastLink) {
			try {
				var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
				path = lookup.path;
			} catch (e) {}
			var ret = {
				isRoot: false,
				exists: false,
				error: 0,
				name: null,
				path: null,
				object: null,
				parentExists: false,
				parentPath: null,
				parentObject: null
			};
			try {
				var lookup = FS.lookupPath(path, { parent: true });
				ret.parentExists = true;
				ret.parentPath = lookup.path;
				ret.parentObject = lookup.node;
				ret.name = PATH.basename(path);
				lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
				ret.exists = true;
				ret.path = lookup.path;
				ret.object = lookup.node;
				ret.name = lookup.node.name;
				ret.isRoot = lookup.path === "/";
			} catch (e) {
				ret.error = e.errno;
			}
			return ret;
		},
		createPath(parent, path, canRead, canWrite) {
			parent = typeof parent == "string" ? parent : FS.getPath(parent);
			var parts = path.split("/").reverse();
			while (parts.length) {
				var part = parts.pop();
				if (!part) continue;
				var current = PATH.join2(parent, part);
				try {
					FS.mkdir(current);
				} catch (e) {
					if (e.errno != 20) throw e;
				}
				parent = current;
			}
			return current;
		},
		createFile(parent, name, properties, canRead, canWrite) {
			var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
			var mode = FS_getMode(canRead, canWrite);
			return FS.create(path, mode);
		},
		createDataFile(parent, name, data, canRead, canWrite, canOwn) {
			var path = name;
			if (parent) {
				parent = typeof parent == "string" ? parent : FS.getPath(parent);
				path = name ? PATH.join2(parent, name) : parent;
			}
			var mode = FS_getMode(canRead, canWrite);
			var node = FS.create(path, mode);
			if (data) {
				if (typeof data == "string") {
					var arr = new Array(data.length);
					for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
					data = arr;
				}
				FS.chmod(node, mode | 146);
				var stream = FS.open(node, 577);
				FS.write(stream, data, 0, data.length, 0, canOwn);
				FS.close(stream);
				FS.chmod(node, mode);
			}
		},
		createDevice(parent, name, input, output) {
			var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
			var mode = FS_getMode(!!input, !!output);
			FS.createDevice.major ??= 64;
			var dev = FS.makedev(FS.createDevice.major++, 0);
			FS.registerDevice(dev, {
				open(stream) {
					stream.seekable = false;
				},
				close(stream) {
					if (output?.buffer?.length) output(10);
				},
				read(stream, buffer, offset, length, pos) {
					var bytesRead = 0;
					for (var i = 0; i < length; i++) {
						var result;
						try {
							result = input();
						} catch (e) {
							throw new FS.ErrnoError(29);
						}
						if (result === void 0 && bytesRead === 0) throw new FS.ErrnoError(6);
						if (result === null || result === void 0) break;
						bytesRead++;
						buffer[offset + i] = result;
					}
					if (bytesRead) stream.node.atime = Date.now();
					return bytesRead;
				},
				write(stream, buffer, offset, length, pos) {
					for (var i = 0; i < length; i++) try {
						output(buffer[offset + i]);
					} catch (e) {
						throw new FS.ErrnoError(29);
					}
					if (length) stream.node.mtime = stream.node.ctime = Date.now();
					return i;
				}
			});
			return FS.mkdev(path, mode, dev);
		},
		forceLoadFile(obj) {
			if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
			if (globalThis.XMLHttpRequest) abort("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
			else try {
				obj.contents = readBinary(obj.url);
			} catch (e) {
				throw new FS.ErrnoError(29);
			}
		},
		createLazyFile(parent, name, url, canRead, canWrite) {
			class LazyUint8Array {
				lengthKnown = false;
				chunks = [];
				get(idx) {
					if (idx > this.length - 1 || idx < 0) return;
					var chunkOffset = idx % this.chunkSize;
					var chunkNum = idx / this.chunkSize | 0;
					return this.getter(chunkNum)[chunkOffset];
				}
				setDataGetter(getter) {
					this.getter = getter;
				}
				cacheLength() {
					var xhr = new XMLHttpRequest();
					xhr.open("HEAD", url, false);
					xhr.send(null);
					if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) abort("Couldn't load " + url + ". Status: " + xhr.status);
					var datalength = Number(xhr.getResponseHeader("Content-length"));
					var header;
					var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
					var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
					var chunkSize = 1024 * 1024;
					if (!hasByteServing) chunkSize = datalength;
					var doXHR = (from, to) => {
						if (from > to) abort("invalid range (" + from + ", " + to + ") or no bytes requested!");
						if (to > datalength - 1) abort("only " + datalength + " bytes available! programmer error!");
						var xhr = new XMLHttpRequest();
						xhr.open("GET", url, false);
						if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
						xhr.responseType = "arraybuffer";
						if (xhr.overrideMimeType) xhr.overrideMimeType("text/plain; charset=x-user-defined");
						xhr.send(null);
						if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) abort("Couldn't load " + url + ". Status: " + xhr.status);
						if (xhr.response !== void 0) return new Uint8Array(xhr.response || []);
						return intArrayFromString(xhr.responseText || "", true);
					};
					var lazyArray = this;
					lazyArray.setDataGetter((chunkNum) => {
						var start = chunkNum * chunkSize;
						var end = (chunkNum + 1) * chunkSize - 1;
						end = Math.min(end, datalength - 1);
						if (typeof lazyArray.chunks[chunkNum] == "undefined") lazyArray.chunks[chunkNum] = doXHR(start, end);
						if (typeof lazyArray.chunks[chunkNum] == "undefined") abort("doXHR failed!");
						return lazyArray.chunks[chunkNum];
					});
					if (usesGzip || !datalength) {
						chunkSize = datalength = 1;
						datalength = this.getter(0).length;
						chunkSize = datalength;
						out("LazyFiles on gzip forces download of the whole file when length is accessed");
					}
					this._length = datalength;
					this._chunkSize = chunkSize;
					this.lengthKnown = true;
				}
				get length() {
					if (!this.lengthKnown) this.cacheLength();
					return this._length;
				}
				get chunkSize() {
					if (!this.lengthKnown) this.cacheLength();
					return this._chunkSize;
				}
			}
			if (globalThis.XMLHttpRequest) {
				if (!ENVIRONMENT_IS_WORKER) abort("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
				var properties = {
					isDevice: false,
					contents: new LazyUint8Array()
				};
			} else var properties = {
				isDevice: false,
				url
			};
			var node = FS.createFile(parent, name, properties, canRead, canWrite);
			if (properties.contents) node.contents = properties.contents;
			else if (properties.url) {
				node.contents = null;
				node.url = properties.url;
			}
			Object.defineProperties(node, { usedBytes: { get: function() {
				return this.contents.length;
			} } });
			var stream_ops = {};
			for (const [key, fn] of Object.entries(node.stream_ops)) stream_ops[key] = (...args) => {
				FS.forceLoadFile(node);
				return fn(...args);
			};
			function writeChunks(stream, buffer, offset, length, position) {
				var contents = stream.node.contents;
				if (position >= contents.length) return 0;
				var size = Math.min(contents.length - position, length);
				if (contents.slice) for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
				else for (var i = 0; i < size; i++) buffer[offset + i] = contents.get(position + i);
				return size;
			}
			stream_ops.read = (stream, buffer, offset, length, position) => {
				FS.forceLoadFile(node);
				return writeChunks(stream, buffer, offset, length, position);
			};
			stream_ops.mmap = (stream, length, position, prot, flags) => {
				FS.forceLoadFile(node);
				var ptr = mmapAlloc(length);
				if (!ptr) throw new FS.ErrnoError(48);
				writeChunks(stream, HEAP8, ptr, length, position);
				return {
					ptr,
					allocated: true
				};
			};
			node.stream_ops = stream_ops;
			return node;
		}
	};
	var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : "";
	var SYSCALLS = {
		DEFAULT_POLLMASK: 5,
		calculateAt(dirfd, path, allowEmpty) {
			if (PATH.isAbs(path)) return path;
			var dir;
			if (dirfd === -100) dir = FS.cwd();
			else dir = SYSCALLS.getStreamFromFD(dirfd).path;
			if (path.length == 0) {
				if (!allowEmpty) throw new FS.ErrnoError(44);
				return dir;
			}
			return dir + "/" + path;
		},
		writeStat(buf, stat) {
			HEAPU32[buf >> 2] = stat.dev;
			HEAPU32[buf + 4 >> 2] = stat.mode;
			HEAPU32[buf + 8 >> 2] = stat.nlink;
			HEAPU32[buf + 12 >> 2] = stat.uid;
			HEAPU32[buf + 16 >> 2] = stat.gid;
			HEAPU32[buf + 20 >> 2] = stat.rdev;
			HEAP64[buf + 24 >> 3] = BigInt(stat.size);
			HEAP32[buf + 32 >> 2] = 4096;
			HEAP32[buf + 36 >> 2] = stat.blocks;
			var atime = stat.atime.getTime();
			var mtime = stat.mtime.getTime();
			var ctime = stat.ctime.getTime();
			HEAP64[buf + 40 >> 3] = BigInt(Math.floor(atime / 1e3));
			HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
			HEAP64[buf + 56 >> 3] = BigInt(Math.floor(mtime / 1e3));
			HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
			HEAP64[buf + 72 >> 3] = BigInt(Math.floor(ctime / 1e3));
			HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
			HEAP64[buf + 88 >> 3] = BigInt(stat.ino);
			return 0;
		},
		writeStatFs(buf, stats) {
			HEAPU32[buf + 4 >> 2] = stats.bsize;
			HEAPU32[buf + 60 >> 2] = stats.bsize;
			HEAP64[buf + 8 >> 3] = BigInt(stats.blocks);
			HEAP64[buf + 16 >> 3] = BigInt(stats.bfree);
			HEAP64[buf + 24 >> 3] = BigInt(stats.bavail);
			HEAP64[buf + 32 >> 3] = BigInt(stats.files);
			HEAP64[buf + 40 >> 3] = BigInt(stats.ffree);
			HEAPU32[buf + 48 >> 2] = stats.fsid;
			HEAPU32[buf + 64 >> 2] = stats.flags;
			HEAPU32[buf + 56 >> 2] = stats.namelen;
		},
		doMsync(addr, stream, len, flags, offset) {
			if (!FS.isFile(stream.node.mode)) throw new FS.ErrnoError(43);
			if (flags & 2) return 0;
			var buffer = HEAPU8.slice(addr, addr + len);
			FS.msync(stream, buffer, offset, len, flags);
		},
		getStreamFromFD(fd) {
			return FS.getStreamChecked(fd);
		},
		varargs: void 0,
		getStr(ptr) {
			return UTF8ToString(ptr);
		}
	};
	function ___syscall_fcntl64(fd, cmd, varargs) {
		SYSCALLS.varargs = varargs;
		try {
			var stream = SYSCALLS.getStreamFromFD(fd);
			switch (cmd) {
				case 0:
					var arg = syscallGetVarargI();
					if (arg < 0) return -28;
					while (FS.streams[arg]) arg++;
					return FS.dupStream(stream, arg).fd;
				case 1:
				case 2: return 0;
				case 3: return stream.flags;
				case 4:
					var arg = syscallGetVarargI();
					stream.flags |= arg;
					return 0;
				case 12:
					var arg = syscallGetVarargP();
					var offset = 0;
					HEAP16[arg + offset >> 1] = 2;
					return 0;
				case 13:
				case 14: return 0;
			}
			return -28;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return -e.errno;
		}
	}
	function ___syscall_ioctl(fd, op, varargs) {
		SYSCALLS.varargs = varargs;
		try {
			var stream = SYSCALLS.getStreamFromFD(fd);
			switch (op) {
				case 21509:
					if (!stream.tty) return -59;
					return 0;
				case 21505:
					if (!stream.tty) return -59;
					if (stream.tty.ops.ioctl_tcgets) {
						var termios = stream.tty.ops.ioctl_tcgets(stream);
						var argp = syscallGetVarargP();
						HEAP32[argp >> 2] = termios.c_iflag || 0;
						HEAP32[argp + 4 >> 2] = termios.c_oflag || 0;
						HEAP32[argp + 8 >> 2] = termios.c_cflag || 0;
						HEAP32[argp + 12 >> 2] = termios.c_lflag || 0;
						for (var i = 0; i < 32; i++) HEAP8[argp + i + 17] = termios.c_cc[i] || 0;
						return 0;
					}
					return 0;
				case 21510:
				case 21511:
				case 21512:
					if (!stream.tty) return -59;
					return 0;
				case 21506:
				case 21507:
				case 21508:
					if (!stream.tty) return -59;
					if (stream.tty.ops.ioctl_tcsets) {
						var argp = syscallGetVarargP();
						var c_iflag = HEAP32[argp >> 2];
						var c_oflag = HEAP32[argp + 4 >> 2];
						var c_cflag = HEAP32[argp + 8 >> 2];
						var c_lflag = HEAP32[argp + 12 >> 2];
						var c_cc = [];
						for (var i = 0; i < 32; i++) c_cc.push(HEAP8[argp + i + 17]);
						return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
							c_iflag,
							c_oflag,
							c_cflag,
							c_lflag,
							c_cc
						});
					}
					return 0;
				case 21519:
					if (!stream.tty) return -59;
					var argp = syscallGetVarargP();
					HEAP32[argp >> 2] = 0;
					return 0;
				case 21520:
					if (!stream.tty) return -59;
					return -28;
				case 21537:
				case 21531:
					var argp = syscallGetVarargP();
					return FS.ioctl(stream, op, argp);
				case 21523:
					if (!stream.tty) return -59;
					if (stream.tty.ops.ioctl_tiocgwinsz) {
						var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
						var argp = syscallGetVarargP();
						HEAP16[argp >> 1] = winsize[0];
						HEAP16[argp + 2 >> 1] = winsize[1];
					}
					return 0;
				case 21524:
					if (!stream.tty) return -59;
					return 0;
				case 21515:
					if (!stream.tty) return -59;
					return 0;
				default: return -28;
			}
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return -e.errno;
		}
	}
	function ___syscall_openat(dirfd, path, flags, varargs) {
		SYSCALLS.varargs = varargs;
		try {
			path = SYSCALLS.getStr(path);
			path = SYSCALLS.calculateAt(dirfd, path);
			var mode = varargs ? syscallGetVarargI() : 0;
			return FS.open(path, flags, mode).fd;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return -e.errno;
		}
	}
	var getHeapMax = () => 2147483648;
	var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
	var growMemory = (size) => {
		var pages = (size - wasmMemory.buffer.byteLength + 65535) / 65536 | 0;
		try {
			wasmMemory.grow(pages);
			updateMemoryViews();
			return 1;
		} catch (e) {}
	};
	var _emscripten_resize_heap = (requestedSize) => {
		var oldSize = HEAPU8.length;
		requestedSize >>>= 0;
		var maxHeapSize = getHeapMax();
		if (requestedSize > maxHeapSize) return false;
		for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
			var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
			overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
			if (growMemory(Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536)))) return true;
		}
		return false;
	};
	var ENV = {};
	var getExecutableName = () => thisProgram || "./this.program";
	var getEnvStrings = () => {
		if (!getEnvStrings.strings) {
			var env = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8",
				_: getExecutableName()
			};
			for (var x in ENV) if (ENV[x] === void 0) delete env[x];
			else env[x] = ENV[x];
			var strings = [];
			for (var x in env) strings.push(`${x}=${env[x]}`);
			getEnvStrings.strings = strings;
		}
		return getEnvStrings.strings;
	};
	var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
	var _environ_get = (__environ, environ_buf) => {
		var bufSize = 0;
		var envp = 0;
		for (var string of getEnvStrings()) {
			var ptr = environ_buf + bufSize;
			HEAPU32[__environ + envp >> 2] = ptr;
			bufSize += stringToUTF8(string, ptr, Infinity) + 1;
			envp += 4;
		}
		return 0;
	};
	var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
		var strings = getEnvStrings();
		HEAPU32[penviron_count >> 2] = strings.length;
		var bufSize = 0;
		for (var string of strings) bufSize += lengthBytesUTF8(string) + 1;
		HEAPU32[penviron_buf_size >> 2] = bufSize;
		return 0;
	};
	function _fd_close(fd) {
		try {
			var stream = SYSCALLS.getStreamFromFD(fd);
			FS.close(stream);
			return 0;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return e.errno;
		}
	}
	var doReadv = (stream, iov, iovcnt, offset) => {
		var ret = 0;
		for (var i = 0; i < iovcnt; i++) {
			var ptr = HEAPU32[iov >> 2];
			var len = HEAPU32[iov + 4 >> 2];
			iov += 8;
			var curr = FS.read(stream, HEAP8, ptr, len, offset);
			if (curr < 0) return -1;
			ret += curr;
			if (curr < len) break;
			if (typeof offset != "undefined") offset += curr;
		}
		return ret;
	};
	function _fd_read(fd, iov, iovcnt, pnum) {
		try {
			var num = doReadv(SYSCALLS.getStreamFromFD(fd), iov, iovcnt);
			HEAPU32[pnum >> 2] = num;
			return 0;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return e.errno;
		}
	}
	var INT53_MAX = 9007199254740992;
	var INT53_MIN = -9007199254740992;
	var bigintToI53Checked = (num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
	function _fd_seek(fd, offset, whence, newOffset) {
		offset = bigintToI53Checked(offset);
		try {
			if (isNaN(offset)) return 61;
			var stream = SYSCALLS.getStreamFromFD(fd);
			FS.llseek(stream, offset, whence);
			HEAP64[newOffset >> 3] = BigInt(stream.position);
			if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
			return 0;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return e.errno;
		}
	}
	var doWritev = (stream, iov, iovcnt, offset) => {
		var ret = 0;
		for (var i = 0; i < iovcnt; i++) {
			var ptr = HEAPU32[iov >> 2];
			var len = HEAPU32[iov + 4 >> 2];
			iov += 8;
			var curr = FS.write(stream, HEAP8, ptr, len, offset);
			if (curr < 0) return -1;
			ret += curr;
			if (curr < len) break;
			if (typeof offset != "undefined") offset += curr;
		}
		return ret;
	};
	function _fd_write(fd, iov, iovcnt, pnum) {
		try {
			var num = doWritev(SYSCALLS.getStreamFromFD(fd), iov, iovcnt);
			HEAPU32[pnum >> 2] = num;
			return 0;
		} catch (e) {
			if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
			return e.errno;
		}
	}
	var getCFunc = (ident) => {
		return Module["_" + ident];
	};
	var writeArrayToMemory = (array, buffer) => {
		HEAP8.set(array, buffer);
	};
	var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
	var stringToUTF8OnStack = (str) => {
		var size = lengthBytesUTF8(str) + 1;
		var ret = stackAlloc(size);
		stringToUTF8(str, ret, size);
		return ret;
	};
	var ccall = (ident, returnType, argTypes, args, opts) => {
		var toC = {
			string: (str) => {
				var ret = 0;
				if (str !== null && str !== void 0 && str !== 0) ret = stringToUTF8OnStack(str);
				return ret;
			},
			array: (arr) => {
				var ret = stackAlloc(arr.length);
				writeArrayToMemory(arr, ret);
				return ret;
			}
		};
		function convertReturnValue(ret) {
			if (returnType === "string") return UTF8ToString(ret);
			if (returnType === "boolean") return Boolean(ret);
			return ret;
		}
		var func = getCFunc(ident);
		var cArgs = [];
		var stack = 0;
		if (args) for (var i = 0; i < args.length; i++) {
			var converter = toC[argTypes[i]];
			if (converter) {
				if (stack === 0) stack = stackSave();
				cArgs[i] = converter(args[i]);
			} else cArgs[i] = args[i];
		}
		var ret = func(...cArgs);
		function onDone(ret) {
			if (stack !== 0) stackRestore(stack);
			return convertReturnValue(ret);
		}
		ret = onDone(ret);
		return ret;
	};
	var cwrap = (ident, returnType, argTypes, opts) => {
		var numericArgs = !argTypes || argTypes.every((type) => type === "number" || type === "boolean");
		if (returnType !== "string" && numericArgs && !opts) return getCFunc(ident);
		return (...args) => ccall(ident, returnType, argTypes, args, opts);
	};
	var FS_createPath = (...args) => FS.createPath(...args);
	var FS_unlink = (...args) => FS.unlink(...args);
	var FS_createLazyFile = (...args) => FS.createLazyFile(...args);
	var FS_createDevice = (...args) => FS.createDevice(...args);
	FS.createPreloadedFile = FS_createPreloadedFile;
	FS.preloadFile = FS_preloadFile;
	FS.staticInit();
	if (Module["noExitRuntime"]) Module["noExitRuntime"];
	if (Module["preloadPlugins"]) preloadPlugins = Module["preloadPlugins"];
	if (Module["print"]) out = Module["print"];
	if (Module["printErr"]) err = Module["printErr"];
	if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
	if (Module["arguments"]) Module["arguments"];
	if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
	if (Module["preInit"]) {
		if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
		while (Module["preInit"].length > 0) Module["preInit"].shift()();
	}
	Module["addRunDependency"] = addRunDependency;
	Module["removeRunDependency"] = removeRunDependency;
	Module["ccall"] = ccall;
	Module["cwrap"] = cwrap;
	Module["UTF8ToString"] = UTF8ToString;
	Module["stringToUTF8"] = stringToUTF8;
	Module["FS_preloadFile"] = FS_preloadFile;
	Module["FS_unlink"] = FS_unlink;
	Module["FS_createPath"] = FS_createPath;
	Module["FS_createDevice"] = FS_createDevice;
	Module["FS"] = FS;
	Module["FS_createDataFile"] = FS_createDataFile;
	Module["FS_createLazyFile"] = FS_createLazyFile;
	var __emscripten_stack_restore, __emscripten_stack_alloc, _emscripten_stack_get_current, wasmMemory;
	function assignWasmExports(wasmExports) {
		Module["_swe_sol_eclipse_where"] = wasmExports["m"];
		Module["_swe_calc"] = wasmExports["n"];
		Module["_swe_fixstar"] = wasmExports["o"];
		Module["_swe_sidtime"] = wasmExports["p"];
		Module["_swe_degnorm"] = wasmExports["q"];
		Module["_swe_set_topo"] = wasmExports["r"];
		Module["_swe_cotrans"] = wasmExports["s"];
		Module["_swe_refrac_extended"] = wasmExports["t"];
		Module["_swe_lun_occult_where"] = wasmExports["u"];
		Module["_swe_sol_eclipse_how"] = wasmExports["v"];
		Module["_swe_calc_ut"] = wasmExports["w"];
		Module["_swe_azalt"] = wasmExports["x"];
		Module["_swe_sol_eclipse_when_glob"] = wasmExports["y"];
		Module["_swe_lun_occult_when_glob"] = wasmExports["z"];
		Module["_swe_sol_eclipse_when_loc"] = wasmExports["A"];
		Module["_swe_rise_trans"] = wasmExports["B"];
		Module["_swe_lun_occult_when_loc"] = wasmExports["C"];
		Module["_swe_azalt_rev"] = wasmExports["D"];
		Module["_swe_refrac"] = wasmExports["E"];
		Module["_swe_set_lapse_rate"] = wasmExports["F"];
		Module["_swe_lun_eclipse_how"] = wasmExports["G"];
		Module["_swe_lun_eclipse_when"] = wasmExports["H"];
		Module["_swe_lun_eclipse_when_loc"] = wasmExports["I"];
		Module["_swe_rise_trans_true_hor"] = wasmExports["J"];
		Module["_swe_pheno"] = wasmExports["K"];
		Module["_swe_pheno_ut"] = wasmExports["L"];
		Module["_swe_nod_aps"] = wasmExports["M"];
		Module["_swe_nod_aps_ut"] = wasmExports["N"];
		Module["_swe_get_orbital_elements"] = wasmExports["O"];
		Module["_swe_orbit_max_min_true_distance"] = wasmExports["P"];
		Module["_swe_sidtime0"] = wasmExports["Q"];
		Module["_swe_house_pos"] = wasmExports["R"];
		Module["_swe_date_conversion"] = wasmExports["S"];
		Module["_swe_julday"] = wasmExports["T"];
		Module["_swe_revjul"] = wasmExports["U"];
		Module["_swe_utc_time_zone"] = wasmExports["V"];
		Module["_swe_utc_to_jd"] = wasmExports["W"];
		Module["_swe_jdet_to_utc"] = wasmExports["X"];
		Module["_swe_jdut1_to_utc"] = wasmExports["Y"];
		Module["_swe_d2l"] = wasmExports["Z"];
		Module["_swe_close"] = wasmExports["_"];
		Module["_swe_vis_limit_mag"] = wasmExports["$"];
		Module["_swe_fixstar_mag"] = wasmExports["aa"];
		Module["_swe_heliacal_pheno_ut"] = wasmExports["ba"];
		Module["_swe_heliacal_ut"] = wasmExports["ca"];
		Module["_swe_get_planet_name"] = wasmExports["da"];
		Module["_swe_houses"] = wasmExports["ea"];
		Module["_swe_houses_armc_ex2"] = wasmExports["fa"];
		Module["_swe_difdeg2n"] = wasmExports["ga"];
		Module["_swe_houses_ex"] = wasmExports["ha"];
		Module["_swe_houses_ex2"] = wasmExports["ia"];
		Module["_swe_set_sid_mode"] = wasmExports["ja"];
		Module["_swe_get_ayanamsa_ex"] = wasmExports["ka"];
		Module["_swe_houses_armc"] = wasmExports["la"];
		Module["_swe_radnorm"] = wasmExports["ma"];
		Module["_free"] = wasmExports["na"];
		Module["_malloc"] = wasmExports["oa"];
		Module["_swe_version"] = wasmExports["pa"];
		Module["_swe_set_tid_acc"] = wasmExports["qa"];
		Module["_swe_set_ephe_path"] = wasmExports["ra"];
		Module["_swe_difrad2n"] = wasmExports["sa"];
		Module["_swe_set_jpl_file"] = wasmExports["ta"];
		Module["_swe_get_ayanamsa_ex_ut"] = wasmExports["ua"];
		Module["_swe_get_ayanamsa"] = wasmExports["va"];
		Module["_swe_get_ayanamsa_ut"] = wasmExports["wa"];
		Module["_swe_fixstar2"] = wasmExports["xa"];
		Module["_swe_fixstar2_ut"] = wasmExports["ya"];
		Module["_swe_fixstar2_mag"] = wasmExports["za"];
		Module["_swe_get_ayanamsa_name"] = wasmExports["Aa"];
		Module["_swe_time_equ"] = wasmExports["Ba"];
		Module["_swe_fixstar_ut"] = wasmExports["Ca"];
		Module["_swe_deg_midp"] = wasmExports["Da"];
		Module["_swe_rad_midp"] = wasmExports["Ea"];
		Module["_swe_cotrans_sp"] = wasmExports["Fa"];
		Module["_swe_deltat"] = wasmExports["Ga"];
		Module["_swe_get_tid_acc"] = wasmExports["Ha"];
		Module["_swe_csnorm"] = wasmExports["Ia"];
		Module["_swe_difcsn"] = wasmExports["Ja"];
		Module["_swe_difdegn"] = wasmExports["Ka"];
		Module["_swe_difcs2n"] = wasmExports["La"];
		Module["_swe_csroundsec"] = wasmExports["Ma"];
		Module["_swe_day_of_week"] = wasmExports["Na"];
		Module["_swe_cs2timestr"] = wasmExports["Oa"];
		Module["_swe_cs2lonlatstr"] = wasmExports["Pa"];
		Module["_swe_cs2degstr"] = wasmExports["Qa"];
		Module["_swe_split_deg"] = wasmExports["Ra"];
		__emscripten_stack_restore = wasmExports["Sa"];
		__emscripten_stack_alloc = wasmExports["Ta"];
		_emscripten_stack_get_current = wasmExports["Ua"];
		wasmMemory = wasmExports["k"];
		wasmExports["__indirect_function_table"];
	}
	var wasmImports = {
		c: ___syscall_fcntl64,
		i: ___syscall_ioctl,
		j: ___syscall_openat,
		d: _emscripten_resize_heap,
		f: _environ_get,
		g: _environ_sizes_get,
		a: _fd_close,
		h: _fd_read,
		e: _fd_seek,
		b: _fd_write
	};
	function run() {
		if (runDependencies > 0) {
			dependenciesFulfilled = run;
			return;
		}
		preRun();
		if (runDependencies > 0) {
			dependenciesFulfilled = run;
			return;
		}
		function doRun() {
			Module["calledRun"] = true;
			if (ABORT) return;
			initRuntime();
			readyPromiseResolve?.(Module);
			Module["onRuntimeInitialized"]?.();
			postRun();
		}
		if (Module["setStatus"]) {
			Module["setStatus"]("Running...");
			setTimeout(() => {
				setTimeout(() => Module["setStatus"](""), 1);
				doRun();
			}, 1);
		} else doRun();
	}
	var wasmExports = await createWasm();
	run();
	if (runtimeInitialized) moduleRtn = Module;
	else moduleRtn = new Promise((resolve, reject) => {
		readyPromiseResolve = resolve;
		readyPromiseReject = reject;
	});
	return moduleRtn;
}
//#endregion
//#region node_modules/swisseph-wasm/src/swisseph.js
/**
* Swiss Ephemeris WebAssembly Library
*
* A high-precision astronomical calculation library for JavaScript,
* compiled from the renowned Swiss Ephemeris C library to WebAssembly.
*
* Features:
* - Planetary positions and velocities
* - House calculations
* - Time conversions (Julian Day, sidereal time)
* - Coordinate transformations
* - Eclipse and occultation calculations
* - Fixed star positions
* - And much more...
*
* @author prolaxu
* @version 0.0.2
* @license GPL-3.0-or-later
*
* IMPORTANT LICENSING INFORMATION:
*
* This library incorporates the Swiss Ephemeris, which is subject to dual licensing:
*
* 1. GNU General Public License (GPL) v2 or later
*    - Free for open source projects
*    - Requires derivative works to also be GPL licensed
*
* 2. Commercial License (from Astrodienst AG)
*    - Required for proprietary/commercial applications
*    - Contact: swisseph@astro.ch
*    - Website: https://www.astro.com/swisseph/
*
* For commercial use, you may need to obtain a commercial license for Swiss Ephemeris
* from Astrodienst AG. This WebAssembly wrapper is provided under GPL v3.
*
* The author is not affiliated with Astrodienst AG and cannot provide commercial
* licenses for Swiss Ephemeris.
*/
var SwissEph = class {
	SE_AUNIT_TO_KM = 149597870.7;
	SE_AUNIT_TO_LIGHTYEAR = 15812507409819728e-21;
	SE_AUNIT_TO_PARSEC = 4848136811095274e-21;
	SE_MAX_STNAME = 256;
	SE_SIDBITS = 256;
	SE_SIDBIT_ECL_T0 = 256;
	SE_SIDBIT_SSY_PLANE = 512;
	SE_SIDBIT_USER_UT = 1024;
	SE_BIT_DISC_CENTER = 256;
	SE_BIT_DISC_BOTTOM = 8192;
	SE_BIT_GEOCTR_NO_ECL_LAT = 128;
	SE_BIT_NO_REFRACTION = 512;
	SE_BIT_CIVIL_TWILIGHT = 1024;
	SE_BIT_NAUTIC_TWILIGHT = 2048;
	SE_BIT_ASTRO_TWILIGHT = 4096;
	SE_BIT_FIXED_DISC_SIZE = 16384;
	TJD_INVALID = 99999999;
	SIMULATE_VICTORVB = 1;
	SE_PHOTOPIC_FLAG = 0;
	SE_SCOTOPIC_FLAG = 1;
	SE_MIXEDOPIC_FLAG = 2;
	ephemeris = {
		swisseph: 2,
		moshier: 4,
		de200: "de200.eph",
		de405: "de405.eph",
		de406: "de406.eph",
		de406e: "de406e.eph",
		de414: "de414.eph",
		de421: "de421.eph",
		de422: "de422.eph",
		de430: "de430.eph",
		de431: "de431.eph"
	};
	SE_JUL_CAL = 0;
	SE_GREG_CAL = 1;
	SE_SUN = 0;
	SE_MOON = 1;
	SE_MERCURY = 2;
	SE_VENUS = 3;
	SE_EARTH = 14;
	SE_MARS = 4;
	SE_JUPITER = 5;
	SE_SATURN = 6;
	SE_URANUS = 7;
	SE_NEPTUNE = 8;
	SE_PLUTO = 9;
	SE_MEAN_NODE = 10;
	SE_TRUE_NODE = 11;
	SE_MEAN_APOG = 12;
	SE_OSCU_APOG = 13;
	SE_INTP_APOG = 21;
	SE_INTP_PERG = 22;
	SE_CHIRON = 15;
	SE_PHOLUS = 16;
	SE_CERES = 17;
	SE_PALLAS = 18;
	SE_JUNO = 19;
	SE_VESTA = 20;
	SE_NPLANETS = 23;
	SE_AST_OFFSET = 1e4;
	SE_VARUNA = 3e4;
	SE_FICT_OFFSET = 40;
	SE_FICT_OFFSET_1 = 39;
	SE_FICT_MAX = 999;
	SE_NFICT_ELEM = 15;
	SE_COMET_OFFSET = 1e3;
	SE_NALL_NAT_POINTS = 38;
	SE_CUPIDO = 40;
	SE_HADES = 41;
	SE_ZEUS = 42;
	SE_KRONOS = 43;
	SE_APOLLON = 44;
	SE_ADMETOS = 45;
	SE_VULKANUS = 46;
	SE_POSEIDON = 47;
	SE_ISIS = 48;
	SE_NIBIRU = 49;
	SE_HARRINGTON = 50;
	SE_NEPTUNE_LEVERRIER = 51;
	SE_NEPTUNE_ADAMS = 52;
	SE_PLUTO_LOWELL = 53;
	SE_PLUTO_PICKERING = 54;
	SE_VULCAN = 55;
	SE_WHITE_MOON = 56;
	SE_PROSERPINA = 57;
	SE_WALDEMATH = 58;
	SE_FIXSTAR = -10;
	SE_ASC = 0;
	SE_MC = 1;
	SE_ARMC = 2;
	SE_VERTEX = 3;
	SE_EQUASC = 4;
	SE_COASC1 = 5;
	SE_COASC2 = 6;
	SE_POLASC = 7;
	SE_NASCMC = 8;
	SEFLG_JPLEPH = 1;
	SEFLG_SWIEPH = 2;
	SEFLG_MOSEPH = 4;
	SEFLG_HELCTR = 8;
	SEFLG_TRUEPOS = 16;
	SEFLG_J2000 = 32;
	SEFLG_NONUT = 64;
	SEFLG_SPEED3 = 128;
	SEFLG_SPEED = 256;
	SEFLG_NOGDEFL = 512;
	SEFLG_NOABERR = 1024;
	SEFLG_ASTROMETRIC = 1536;
	SEFLG_EQUATORIAL = 2048;
	SEFLG_XYZ = 4096;
	SEFLG_RADIANS = 8192;
	SEFLG_BARYCTR = 16384;
	SEFLG_TOPOCTR = 32768;
	SEFLG_ORBEL_AA = 32768;
	SEFLG_SIDEREAL = 65536;
	SEFLG_ICRS = 131072;
	SEFLG_DPSIDEPS_1980 = 262144;
	SEFLG_JPLHOR = 262144;
	SEFLG_JPLHOR_APPROX = 524288;
	SEFLG_DEFAULTEPH = 2;
	SE_SIDM_FAGAN_BRADLEY = 0;
	SE_SIDM_LAHIRI = 1;
	SE_SIDM_DELUCE = 2;
	SE_SIDM_RAMAN = 3;
	SE_SIDM_USHASHASHI = 4;
	SE_SIDM_KRISHNAMURTI = 5;
	SE_SIDM_DJWHAL_KHUL = 6;
	SE_SIDM_YUKTESHWAR = 7;
	SE_SIDM_JN_BHASIN = 8;
	SE_SIDM_BABYL_KUGLER1 = 9;
	SE_SIDM_BABYL_KUGLER2 = 10;
	SE_SIDM_BABYL_KUGLER3 = 11;
	SE_SIDM_BABYL_HUBER = 12;
	SE_SIDM_BABYL_ETPSC = 13;
	SE_SIDM_ALDEBARAN_15TAU = 14;
	SE_SIDM_HIPPARCHOS = 15;
	SE_SIDM_SASSANIAN = 16;
	SE_SIDM_GALCENT_0SAG = 17;
	SE_SIDM_J2000 = 18;
	SE_SIDM_J1900 = 19;
	SE_SIDM_B1950 = 20;
	SE_SIDM_SURYASIDDHANTA = 21;
	SE_SIDM_SURYASIDDHANTA_MSUN = 22;
	SE_SIDM_ARYABHATA = 23;
	SE_SIDM_ARYABHATA_MSUN = 24;
	SE_SIDM_SS_REVATI = 25;
	SE_SIDM_SS_CITRA = 26;
	SE_SIDM_TRUE_CITRA = 27;
	SE_SIDM_TRUE_REVATI = 28;
	SE_SIDM_TRUE_PUSHYA = 29;
	SE_SIDM_GALCENT_RGILBRAND = 30;
	SE_SIDM_GALEQU_IAU1958 = 31;
	SE_SIDM_GALEQU_TRUE = 32;
	SE_SIDM_GALEQU_MULA = 33;
	SE_SIDM_GALALIGN_MARDYKS = 34;
	SE_SIDM_TRUE_MULA = 35;
	SE_SIDM_GALCENT_MULA_WILHELM = 36;
	SE_SIDM_ARYABHATA_522 = 37;
	SE_SIDM_BABYL_BRITTON = 38;
	SE_SIDM_TRUE_SHEORAN = 39;
	SE_SIDM_GALCENT_COCHRANE = 40;
	SE_SIDM_GALEQU_FIORENZA = 41;
	SE_SIDM_VALENS_MOON = 42;
	SE_SIDM_USER = 255;
	SE_NSIDM_PREDEF = 43;
	SE_NODBIT_MEAN = 1;
	SE_NODBIT_OSCU = 2;
	SE_NODBIT_OSCU_BAR = 4;
	SE_NODBIT_FOPOINT = 256;
	SE_ECL_NUT = -1;
	SE_ECL_CENTRAL = 1;
	SE_ECL_NONCENTRAL = 2;
	SE_ECL_TOTAL = 4;
	SE_ECL_ANNULAR = 8;
	SE_ECL_PARTIAL = 16;
	SE_ECL_ANNULAR_TOTAL = 32;
	SE_ECL_PENUMBRAL = 64;
	SE_ECL_ALLTYPES_SOLAR = 63;
	SE_ECL_ALLTYPES_LUNAR = 84;
	SE_ECL_VISIBLE = 128;
	SE_ECL_MAX_VISIBLE = 256;
	SE_ECL_1ST_VISIBLE = 512;
	SE_ECL_PARTBEG_VISIBLE = 512;
	SE_ECL_2ND_VISIBLE = 1024;
	SE_ECL_TOTBEG_VISIBLE = 1024;
	SE_ECL_3RD_VISIBLE = 2048;
	SE_ECL_TOTEND_VISIBLE = 2048;
	SE_ECL_4TH_VISIBLE = 4096;
	SE_ECL_PARTEND_VISIBLE = 4096;
	SE_ECL_PENUMBBEG_VISIBLE = 8192;
	SE_ECL_PENUMBEND_VISIBLE = 16384;
	SE_ECL_OCC_BEG_DAYLIGHT = 8192;
	SE_ECL_OCC_END_DAYLIGHT = 16384;
	SE_ECL_ONE_TRY = 32768;
	SE_CALC_RISE = 1;
	SE_CALC_SET = 2;
	SE_CALC_MTRANSIT = 4;
	SE_CALC_ITRANSIT = 8;
	SE_ECL2HOR = 0;
	SE_EQU2HOR = 1;
	SE_HOR2ECL = 0;
	SE_HOR2EQU = 1;
	SE_TRUE_TO_APP = 0;
	SE_APP_TO_TRUE = 1;
	SE_SPLIT_DEG_ROUND_SEC = 1;
	SE_SPLIT_DEG_ROUND_MIN = 2;
	SE_SPLIT_DEG_ROUND_DEG = 4;
	SE_SPLIT_DEG_ZODIACAL = 8;
	SE_SPLIT_DEG_KEEP_SIGN = 16;
	SE_SPLIT_DEG_KEEP_DEG = 32;
	SE_SPLIT_DEG_NAKSHATRA = 1024;
	SE_HELIACAL_RISING = 1;
	SE_HELIACAL_SETTING = 2;
	SE_MORNING_FIRST = 1;
	SE_EVENING_LAST = 2;
	SE_EVENING_FIRST = 3;
	SE_MORNING_LAST = 4;
	SE_ACRONYCHAL_RISING = 5;
	SE_ACRONYCHAL_SETTING = 6;
	SE_COSMICAL_SETTING = 6;
	SE_HELFLAG_LONG_SEARCH = 128;
	SE_HELFLAG_HIGH_PRECISION = 256;
	SE_HELFLAG_OPTICAL_PARAMS = 512;
	SE_HELFLAG_NO_DETAILS = 1024;
	SE_HELFLAG_SEARCH_1_PERIOD = 2048;
	SE_HELFLAG_VISLIM_DARK = 4096;
	SE_HELFLAG_VISLIM_NOMOON = 8192;
	SE_HELFLAG_VISLIM_PHOTOPIC = 16384;
	SE_HELFLAG_AVKIND_VR = 32768;
	SE_HELFLAG_AVKIND_PTO = 65536;
	SE_HELFLAG_AVKIND_MIN7 = 131072;
	SE_HELFLAG_AVKIND_MIN9 = 262144;
	SE_HELFLAG_AVKIND = 491520;
	async initSwissEph() {
		let moduleConfig = {};
		if (typeof process !== "undefined" && process.versions && process.versions.node) try {
			const { fileURLToPath } = await import("url");
			const { dirname, join } = await import("path");
			const __dirname = dirname(fileURLToPath(import.meta.url));
			moduleConfig.locateFile = (path, prefix) => {
				if (path.endsWith(".data") || path.endsWith(".wasm")) return join(__dirname, "../wasm", path);
				return prefix + path;
			};
		} catch (e) {
			console.warn("Failed to configure path resolution for SwissEph WASM:", e);
		}
		else moduleConfig.locateFile = (path, prefix) => {
			if (path.endsWith(".data") || path.endsWith(".wasm")) return new URL("../wasm/" + path, import.meta.url).href;
			return prefix + path;
		};
		this.SweModule = await Swisseph(moduleConfig);
		if (!this.SweModule.HEAP32) this.SweModule.HEAP32 = new Int32Array(this.SweModule.HEAPF64.buffer);
		this.set_ephe_path("sweph");
	}
	set_ephe_path(path) {
		return this.SweModule.ccall("swe_set_ephe_path", "string", ["string"], [path]);
	}
	house_pos(armc, geoLat, eps, hsys, lon, lat) {
		const xpinPtr = this.SweModule._malloc(16);
		const HEAPF64 = this.SweModule.HEAPF64;
		HEAPF64[xpinPtr >> 3] = lon;
		HEAPF64[(xpinPtr >> 3) + 1] = lat;
		const serr = this.SweModule._malloc(256);
		const result = this.SweModule.ccall("swe_house_pos", "number", [
			"number",
			"number",
			"number",
			"number",
			"pointer",
			"pointer"
		], [
			armc,
			geoLat,
			eps,
			hsys.charCodeAt(0),
			xpinPtr,
			serr
		]);
		this.SweModule._free(xpinPtr);
		this.SweModule._free(serr);
		return result;
	}
	julday(year, month, day, hour) {
		return this.SweModule.ccall("swe_julday", "number", [
			"number",
			"number",
			"number",
			"number",
			"number"
		], [
			year,
			month,
			day,
			hour,
			1
		]);
	}
	date_conversion(year, month, day, hour, calendar) {
		const tjdPtr = this.SweModule._malloc(8);
		const result = this.SweModule.ccall("swe_date_conversion", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			year,
			month,
			day,
			hour,
			calendar.charCodeAt(0),
			tjdPtr
		]);
		const tjd = this.SweModule.HEAPF64[tjdPtr >> 3];
		this.SweModule._free(tjdPtr);
		if (result === this.ERR) throw new Error("Invalid date");
		return tjd;
	}
	revjul(julianDay, gregflag) {
		const yearPtr = this.SweModule._malloc(4);
		const monthPtr = this.SweModule._malloc(4);
		const dayPtr = this.SweModule._malloc(4);
		const hourPtr = this.SweModule._malloc(8);
		this.SweModule.ccall("swe_revjul", "void", [
			"number",
			"number",
			"pointer",
			"pointer",
			"pointer",
			"pointer"
		], [
			julianDay,
			gregflag,
			yearPtr,
			monthPtr,
			dayPtr,
			hourPtr
		]);
		const year = this.SweModule.HEAP32[yearPtr >> 2];
		const month = this.SweModule.HEAP32[monthPtr >> 2];
		const day = this.SweModule.HEAP32[dayPtr >> 2];
		const hour = this.SweModule.HEAPF64[hourPtr >> 3];
		this.SweModule._free(yearPtr);
		this.SweModule._free(monthPtr);
		this.SweModule._free(dayPtr);
		this.SweModule._free(hourPtr);
		return {
			year,
			month,
			day,
			hour
		};
	}
	calc_ut(julianDay, body, flags) {
		const resultPtr = this.SweModule._malloc(6 * Float64Array.BYTES_PER_ELEMENT);
		const errorBuffer = this.SweModule._malloc(256);
		if (this.SweModule.ccall("swe_calc_ut", "number", [
			"number",
			"number",
			"number",
			"pointer",
			"pointer"
		], [
			julianDay,
			body,
			flags,
			resultPtr,
			errorBuffer
		]) < 0) {
			const error = this.SweModule.UTF8ToString(errorBuffer);
			this.SweModule._free(resultPtr);
			this.SweModule._free(errorBuffer);
			throw new Error(`Error in swe_calc_ut: ${error}`);
		}
		const start = resultPtr / 8;
		const result = this.SweModule.HEAPF64.slice(start, start + 6);
		this.SweModule._free(resultPtr);
		this.SweModule._free(errorBuffer);
		return result;
	}
	deltat(julianDay) {
		return this.SweModule.ccall("swe_deltat", "number", ["number"], [julianDay]);
	}
	time_equ(julianDay) {
		const tePtr = this.SweModule._malloc(8);
		const serr = this.SweModule._malloc(256);
		this.SweModule.ccall("swe_time_equ", "number", [
			"number",
			"pointer",
			"pointer"
		], [
			julianDay,
			tePtr,
			serr
		]);
		const result = this.SweModule.HEAPF64[tePtr >> 3];
		this.SweModule._free(tePtr);
		this.SweModule._free(serr);
		return result;
	}
	sidtime0(julianDay, eps, nut) {
		return this.SweModule.ccall("swe_sidtime0", "number", [
			"number",
			"number",
			"number"
		], [
			julianDay,
			eps,
			nut
		]);
	}
	sidtime(julianDay) {
		return this.SweModule.ccall("swe_sidtime", "number", ["number"], [julianDay]);
	}
	cotrans(xpo, eps) {
		const xpoPtr = this.SweModule._malloc(24);
		const xpnPtr = this.SweModule._malloc(24);
		this.SweModule.HEAPF64.set(xpo, xpoPtr >> 3);
		this.SweModule.ccall("swe_cotrans", "void", [
			"number",
			"number",
			"number"
		], [
			xpoPtr,
			xpnPtr,
			eps
		]);
		const result = new Float64Array(this.SweModule.HEAPF64.buffer, xpnPtr, 3).slice();
		this.SweModule._free(xpoPtr);
		this.SweModule._free(xpnPtr);
		return Array.from(result);
	}
	cotrans_sp(xpo, eps) {
		const xpoPtr = this.SweModule._malloc(48);
		const xpnPtr = this.SweModule._malloc(48);
		this.SweModule.HEAPF64.set(xpo, xpoPtr >> 3);
		this.SweModule.ccall("swe_cotrans_sp", "void", [
			"number",
			"number",
			"number"
		], [
			xpoPtr,
			xpnPtr,
			eps
		]);
		const result = new Float64Array(this.SweModule.HEAPF64.buffer, xpnPtr, 6).slice();
		this.SweModule._free(xpoPtr);
		this.SweModule._free(xpnPtr);
		return Array.from(result);
	}
	get_tid_acc() {
		return this.SweModule.ccall("swe_get_tid_acc", "number", [], []);
	}
	set_tid_acc(acceleration) {
		this.SweModule.ccall("swe_set_tid_acc", "void", ["number"], [acceleration]);
	}
	degnorm(x) {
		return this.SweModule.ccall("swe_degnorm", "number", ["number"], [x]);
	}
	radnorm(angle) {
		return this.SweModule.ccall("swe_radnorm", "number", ["number"], [angle]);
	}
	rad_midp(x1, x2) {
		return this.SweModule.ccall("swe_rad_midp", "number", ["number", "number"], [x1, x2]);
	}
	deg_midp(x1, x2) {
		return this.SweModule.ccall("swe_deg_midp", "number", ["number", "number"], [x1, x2]);
	}
	split_deg(ddeg, roundFlag) {
		const degPtr = this.SweModule._malloc(4);
		const minPtr = this.SweModule._malloc(4);
		const secPtr = this.SweModule._malloc(4);
		const dsecfrPtr = this.SweModule._malloc(8);
		const isgnPtr = this.SweModule._malloc(4);
		this.SweModule.ccall("swe_split_deg", "void", [
			"number",
			"number",
			"pointer",
			"pointer",
			"pointer",
			"pointer",
			"pointer"
		], [
			ddeg,
			roundFlag,
			degPtr,
			minPtr,
			secPtr,
			dsecfrPtr,
			isgnPtr
		]);
		const HEAP32 = new Int32Array(this.SweModule.HEAPF64.buffer);
		const HEAPF64 = new Float64Array(this.SweModule.HEAPF64.buffer);
		const result = {
			degree: HEAP32[degPtr >> 2],
			min: HEAP32[minPtr >> 2],
			second: HEAP32[secPtr >> 2],
			fraction: HEAPF64[dsecfrPtr >> 3],
			sign: HEAP32[isgnPtr >> 2]
		};
		this.SweModule._free(degPtr);
		this.SweModule._free(minPtr);
		this.SweModule._free(secPtr);
		this.SweModule._free(dsecfrPtr);
		this.SweModule._free(isgnPtr);
		return result;
	}
	csnorm(p) {
		return this.SweModule.ccall("swe_csnorm", "number", ["number"], [p]);
	}
	difcsn(p1, p2) {
		return this.SweModule.ccall("swe_difcsn", "number", ["number", "number"], [p1, p2]);
	}
	difdegn(p1, p2) {
		return this.SweModule.ccall("swe_difdegn", "number", ["number", "number"], [p1, p2]);
	}
	difcs2n(p1, p2) {
		return this.SweModule.ccall("swe_difcs2n", "number", ["number", "number"], [p1, p2]);
	}
	difdeg2n(p1, p2) {
		return this.SweModule.ccall("swe_difdeg2n", "number", ["number", "number"], [p1, p2]);
	}
	difrad2n(p1, p2) {
		return this.SweModule.ccall("swe_difrad2n", "number", ["number", "number"], [p1, p2]);
	}
	csroundsec(x) {
		return this.SweModule.ccall("swe_csroundsec", "number", ["number"], [x]);
	}
	d2l(x) {
		return this.SweModule.ccall("swe_d2l", "number", ["number"], [x]);
	}
	day_of_week(julianDay) {
		return this.SweModule.ccall("swe_day_of_week", "number", ["number"], [julianDay]);
	}
	cs2timestr(t, sep, suppressZero) {
		const bufPtr = this.SweModule._malloc(256);
		this.SweModule.ccall("swe_cs2timestr", "void", [
			"number",
			"number",
			"number",
			"pointer"
		], [
			t,
			sep.charCodeAt(0),
			suppressZero ? 1 : 0,
			bufPtr
		]);
		const result = this.SweModule.UTF8ToString(bufPtr);
		this.SweModule._free(bufPtr);
		return result;
	}
	cs2lonlatstr(t, pChar, mChar) {
		const bufPtr = this.SweModule._malloc(256);
		this.SweModule.ccall("swe_cs2lonlatstr", "void", [
			"number",
			"number",
			"number",
			"pointer"
		], [
			t,
			pChar.charCodeAt(0),
			mChar.charCodeAt(0),
			bufPtr
		]);
		const result = this.SweModule.UTF8ToString(bufPtr);
		this.SweModule._free(bufPtr);
		return result;
	}
	cs2degstr(t) {
		const bufPtr = this.SweModule._malloc(256);
		this.SweModule.ccall("swe_cs2degstr", "void", ["number", "pointer"], [t, bufPtr]);
		const result = this.SweModule.UTF8ToString(bufPtr);
		this.SweModule._free(bufPtr);
		return result;
	}
	utc_to_jd(year, month, day, hour, minute, second, gregflag) {
		const resultPtr = this.SweModule._malloc(2 * Float64Array.BYTES_PER_ELEMENT);
		this.SweModule.ccall("swe_utc_to_jd", "void", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			year,
			month,
			day,
			hour,
			minute,
			second,
			gregflag,
			resultPtr
		]);
		const result = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 2);
		this.SweModule._free(resultPtr);
		return {
			julianDayET: result[0],
			julianDayUT: result[1]
		};
	}
	jdet_to_utc(julianDay, gregflag) {
		const yearPtr = this.SweModule._malloc(4);
		const monthPtr = this.SweModule._malloc(4);
		const dayPtr = this.SweModule._malloc(4);
		const hourPtr = this.SweModule._malloc(4);
		const minPtr = this.SweModule._malloc(4);
		const secPtr = this.SweModule._malloc(8);
		this.SweModule.ccall("swe_jdet_to_utc", "void", [
			"number",
			"number",
			"pointer",
			"pointer",
			"pointer",
			"pointer",
			"pointer",
			"pointer"
		], [
			julianDay,
			gregflag,
			yearPtr,
			monthPtr,
			dayPtr,
			hourPtr,
			minPtr,
			secPtr
		]);
		const HEAP32 = new Int32Array(this.SweModule.HEAPF64.buffer);
		const HEAPF64 = new Float64Array(this.SweModule.HEAPF64.buffer);
		const result = {
			year: HEAP32[yearPtr >> 2],
			month: HEAP32[monthPtr >> 2],
			day: HEAP32[dayPtr >> 2],
			hour: HEAP32[hourPtr >> 2],
			minute: HEAP32[minPtr >> 2],
			second: HEAPF64[secPtr >> 3]
		};
		this.SweModule._free(yearPtr);
		this.SweModule._free(monthPtr);
		this.SweModule._free(dayPtr);
		this.SweModule._free(hourPtr);
		this.SweModule._free(minPtr);
		this.SweModule._free(secPtr);
		return result;
	}
	jdut1_to_utc(julianDay, gregflag) {
		const yearPtr = this.SweModule._malloc(4);
		const monthPtr = this.SweModule._malloc(4);
		const dayPtr = this.SweModule._malloc(4);
		const hourPtr = this.SweModule._malloc(4);
		const minPtr = this.SweModule._malloc(4);
		const secPtr = this.SweModule._malloc(8);
		this.SweModule.ccall("swe_jdut1_to_utc", "void", [
			"number",
			"number",
			"pointer",
			"pointer",
			"pointer",
			"pointer",
			"pointer",
			"pointer"
		], [
			julianDay,
			gregflag,
			yearPtr,
			monthPtr,
			dayPtr,
			hourPtr,
			minPtr,
			secPtr
		]);
		const HEAP32 = new Int32Array(this.SweModule.HEAPF64.buffer);
		const HEAPF64 = new Float64Array(this.SweModule.HEAPF64.buffer);
		const result = {
			year: HEAP32[yearPtr >> 2],
			month: HEAP32[monthPtr >> 2],
			day: HEAP32[dayPtr >> 2],
			hour: HEAP32[hourPtr >> 2],
			minute: HEAP32[minPtr >> 2],
			second: HEAPF64[secPtr >> 3]
		};
		this.SweModule._free(yearPtr);
		this.SweModule._free(monthPtr);
		this.SweModule._free(dayPtr);
		this.SweModule._free(hourPtr);
		this.SweModule._free(minPtr);
		this.SweModule._free(secPtr);
		return result;
	}
	utc_time_zone(year, month, day, hour, minute, second, timezone) {
		const yearPtr = this.SweModule._malloc(4);
		const monthPtr = this.SweModule._malloc(4);
		const dayPtr = this.SweModule._malloc(4);
		const hourPtr = this.SweModule._malloc(4);
		const minPtr = this.SweModule._malloc(4);
		const secPtr = this.SweModule._malloc(8);
		this.SweModule.ccall("swe_utc_time_zone", "void", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer",
			"pointer",
			"pointer",
			"pointer",
			"pointer",
			"pointer"
		], [
			year,
			month,
			day,
			hour,
			minute,
			second,
			timezone,
			yearPtr,
			monthPtr,
			dayPtr,
			hourPtr,
			minPtr,
			secPtr
		]);
		const HEAP32 = new Int32Array(this.SweModule.HEAPF64.buffer);
		const HEAPF64 = new Float64Array(this.SweModule.HEAPF64.buffer);
		const result = {
			year: HEAP32[yearPtr >> 2],
			month: HEAP32[monthPtr >> 2],
			day: HEAP32[dayPtr >> 2],
			hour: HEAP32[hourPtr >> 2],
			minute: HEAP32[minPtr >> 2],
			second: HEAPF64[secPtr >> 3]
		};
		this.SweModule._free(yearPtr);
		this.SweModule._free(monthPtr);
		this.SweModule._free(dayPtr);
		this.SweModule._free(hourPtr);
		this.SweModule._free(minPtr);
		this.SweModule._free(secPtr);
		return result;
	}
	version() {
		const bufPtr = this.SweModule._malloc(256);
		this.SweModule.ccall("swe_version", "void", ["pointer"], [bufPtr]);
		const version = this.SweModule.UTF8ToString(bufPtr);
		this.SweModule._free(bufPtr);
		return version;
	}
	calc(julianDay, body, flags) {
		const resultPtr = this.SweModule._malloc(6 * Float64Array.BYTES_PER_ELEMENT);
		const errorBuffer = this.SweModule._malloc(256);
		if (this.SweModule.ccall("swe_calc", "number", [
			"number",
			"number",
			"number",
			"pointer",
			"pointer"
		], [
			julianDay,
			body,
			flags,
			resultPtr,
			errorBuffer
		]) < 0) {
			const error = this.SweModule.UTF8ToString(errorBuffer);
			this.SweModule._free(resultPtr);
			this.SweModule._free(errorBuffer);
			throw new Error(`Error in swe_calc: ${error}`);
		}
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 6).slice();
		this.SweModule._free(resultPtr);
		this.SweModule._free(errorBuffer);
		return {
			longitude: results[0],
			latitude: results[1],
			distance: results[2],
			longitudeSpeed: results[3],
			latitudeSpeed: results[4],
			distanceSpeed: results[5]
		};
	}
	fixstar(star, julianDay, flags) {
		const resultPtr = this.SweModule._malloc(6 * Float64Array.BYTES_PER_ELEMENT);
		const starBuffer = this.SweModule._malloc(star.length + 1);
		this.SweModule.stringToUTF8(star, starBuffer, star.length + 1);
		const retFlag = this.SweModule.ccall("swe_fixstar", "number", [
			"pointer",
			"number",
			"number",
			"pointer"
		], [
			starBuffer,
			julianDay,
			flags,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 6);
		this.SweModule._free(starBuffer);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	fixstar_ut(star, julianDay, flags) {
		const resultPtr = this.SweModule._malloc(6 * Float64Array.BYTES_PER_ELEMENT);
		const starBuffer = this.SweModule._malloc(star.length + 1);
		this.SweModule.stringToUTF8(star, starBuffer, star.length + 1);
		const retFlag = this.SweModule.ccall("swe_fixstar_ut", "number", [
			"pointer",
			"number",
			"number",
			"pointer"
		], [
			starBuffer,
			julianDay,
			flags,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 6);
		this.SweModule._free(starBuffer);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	fixstar_mag(star) {
		const magBuffer = this.SweModule._malloc(8);
		const starBuffer = this.SweModule._malloc(star.length + 1);
		this.SweModule.stringToUTF8(star, starBuffer, star.length + 1);
		const retFlag = this.SweModule.ccall("swe_fixstar_mag", "number", ["pointer", "pointer"], [starBuffer, magBuffer]);
		const magnitude = this.SweModule.HEAPF64[magBuffer / 8];
		this.SweModule._free(starBuffer);
		this.SweModule._free(magBuffer);
		return retFlag < 0 ? null : magnitude;
	}
	fixstar2(star, julianDay, flags) {
		const resultPtr = this.SweModule._malloc(6 * Float64Array.BYTES_PER_ELEMENT);
		const starBuffer = this.SweModule._malloc(star.length + 1);
		this.SweModule.stringToUTF8(star, starBuffer, star.length + 1);
		const retFlag = this.SweModule.ccall("swe_fixstar2", "number", [
			"pointer",
			"number",
			"number",
			"pointer"
		], [
			starBuffer,
			julianDay,
			flags,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 6);
		this.SweModule._free(starBuffer);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	fixstar2_ut(star, julianDay, flags) {
		const resultPtr = this.SweModule._malloc(6 * Float64Array.BYTES_PER_ELEMENT);
		const starBuffer = this.SweModule._malloc(star.length + 1);
		this.SweModule.stringToUTF8(star, starBuffer, star.length + 1);
		const retFlag = this.SweModule.ccall("swe_fixstar2_ut", "number", [
			"pointer",
			"number",
			"number",
			"pointer"
		], [
			starBuffer,
			julianDay,
			flags,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 6);
		this.SweModule._free(starBuffer);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	fixstar2_mag(star) {
		const magBuffer = this.SweModule._malloc(8);
		const starBuffer = this.SweModule._malloc(star.length + 1);
		this.SweModule.stringToUTF8(star, starBuffer, star.length + 1);
		const retFlag = this.SweModule.ccall("swe_fixstar2_mag", "number", ["pointer", "pointer"], [starBuffer, magBuffer]);
		const magnitude = this.SweModule.HEAPF64[magBuffer / 8];
		this.SweModule._free(starBuffer);
		this.SweModule._free(magBuffer);
		return retFlag < 0 ? null : magnitude;
	}
	close() {
		this.SweModule.ccall("swe_close", "void", [], []);
	}
	set_jpl_file(filename) {
		const fileBuffer = this.SweModule._malloc(filename.length + 1);
		this.SweModule.stringToUTF8(filename, fileBuffer, filename.length + 1);
		const result = this.SweModule.ccall("swe_set_jpl_file", "string", ["pointer"], [fileBuffer]);
		this.SweModule._free(fileBuffer);
		return result;
	}
	get_planet_name(planetId) {
		const bufPtr = this.SweModule._malloc(256);
		this.SweModule.ccall("swe_get_planet_name", "void", ["number", "pointer"], [planetId, bufPtr]);
		const name = this.SweModule.UTF8ToString(bufPtr);
		this.SweModule._free(bufPtr);
		return name;
	}
	set_topo(longitude, latitude, altitude) {
		this.SweModule.ccall("swe_set_topo", "void", [
			"number",
			"number",
			"number"
		], [
			longitude,
			latitude,
			altitude
		]);
	}
	set_sid_mode(sidMode, t0, ayanT0) {
		this.SweModule.ccall("swe_set_sid_mode", "void", [
			"number",
			"number",
			"number"
		], [
			sidMode,
			t0,
			ayanT0
		]);
	}
	get_ayanamsa(julianDay) {
		return this.SweModule.ccall("swe_get_ayanamsa", "number", ["number"], [julianDay]);
	}
	get_ayanamsa_ut(julianDay) {
		return this.SweModule.ccall("swe_get_ayanamsa_ut", "number", ["number"], [julianDay]);
	}
	get_ayanamsa_ex(julianDay, ephemerisFlag) {
		const resultPtr = this.SweModule._malloc(8);
		const errorPtr = this.SweModule._malloc(256);
		const retFlag = this.SweModule.ccall("swe_get_ayanamsa_ex", "number", [
			"number",
			"number",
			"pointer",
			"pointer"
		], [
			julianDay,
			ephemerisFlag,
			resultPtr,
			errorPtr
		]);
		const result = this.SweModule.HEAPF64[resultPtr / 8];
		this.SweModule._free(resultPtr);
		this.SweModule._free(errorPtr);
		return retFlag < 0 ? null : result;
	}
	get_ayanamsa_ex_ut(julianDay, ephemerisFlag) {
		const resultPtr = this.SweModule._malloc(8);
		const errorPtr = this.SweModule._malloc(256);
		const retFlag = this.SweModule.ccall("swe_get_ayanamsa_ex_ut", "number", [
			"number",
			"number",
			"pointer",
			"pointer"
		], [
			julianDay,
			ephemerisFlag,
			resultPtr,
			errorPtr
		]);
		const result = this.SweModule.HEAPF64[resultPtr / 8];
		this.SweModule._free(resultPtr);
		this.SweModule._free(errorPtr);
		return retFlag < 0 ? null : result;
	}
	get_ayanamsa_name(siderealMode) {
		return this.SweModule.ccall("swe_get_ayanamsa_name", "string", ["number"], [siderealMode]);
	}
	nod_aps(julianDay, planet, flags, method) {
		const xnPtr = this.SweModule._malloc(32);
		const xasPtr = this.SweModule._malloc(32);
		const serrPtr = this.SweModule._malloc(256);
		const retFlag = this.SweModule.ccall("swe_nod_aps", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"number"
		], [
			julianDay,
			planet,
			flags,
			method,
			xnPtr,
			xasPtr,
			serrPtr
		]);
		if (retFlag < 0) {
			this.SweModule._free(xnPtr);
			this.SweModule._free(xasPtr);
			this.SweModule._free(serrPtr);
			return { error: retFlag };
		}
		const nodes = new Float64Array(this.SweModule.HEAPF64.buffer, xnPtr, 4).slice();
		const apsides = new Float64Array(this.SweModule.HEAPF64.buffer, xasPtr, 4).slice();
		this.SweModule._free(xnPtr);
		this.SweModule._free(xasPtr);
		this.SweModule._free(serrPtr);
		return {
			nodes: Array.from(nodes),
			apsides: Array.from(apsides),
			asc_node: nodes[0],
			desc_node: nodes[1],
			perihelion: apsides[0],
			aphelion: apsides[1]
		};
	}
	nod_aps_ut(julianDay, planet, flags, method) {
		const xnPtr = this.SweModule._malloc(32);
		const xasPtr = this.SweModule._malloc(32);
		const serrPtr = this.SweModule._malloc(256);
		const retFlag = this.SweModule.ccall("swe_nod_aps_ut", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"number"
		], [
			julianDay,
			planet,
			flags,
			method,
			xnPtr,
			xasPtr,
			serrPtr
		]);
		if (retFlag < 0) {
			this.SweModule._free(xnPtr);
			this.SweModule._free(xasPtr);
			this.SweModule._free(serrPtr);
			return { error: retFlag };
		}
		const nodes = new Float64Array(this.SweModule.HEAPF64.buffer, xnPtr, 4).slice();
		const apsides = new Float64Array(this.SweModule.HEAPF64.buffer, xasPtr, 4).slice();
		this.SweModule._free(xnPtr);
		this.SweModule._free(xasPtr);
		this.SweModule._free(serrPtr);
		return {
			nodes: Array.from(nodes),
			apsides: Array.from(apsides),
			asc_node: nodes[0],
			desc_node: nodes[1],
			perihelion: apsides[0],
			aphelion: apsides[1]
		};
	}
	get_orbital_elements(julianDay, planet, flags) {
		return this.SweModule.ccall("swe_get_orbital_elements", "number", [
			"number",
			"number",
			"number"
		], [
			julianDay,
			planet,
			flags
		]);
	}
	orbit_max_min_true_distance(julianDay, planet, flags) {
		return this.SweModule.ccall("swe_orbit_max_min_true_distance", "number", [
			"number",
			"number",
			"number"
		], [
			julianDay,
			planet,
			flags
		]);
	}
	heliacal_ut(julianDayStart, geoPos, atmosData, observerData, objectName, eventType, flags) {
		return this.SweModule.ccall("swe_heliacal_ut", "number", [
			"number",
			"array",
			"array",
			"array",
			"string",
			"number",
			"number"
		], [
			julianDayStart,
			geoPos,
			atmosData,
			observerData,
			objectName,
			eventType,
			flags
		]);
	}
	heliacal_pheno_ut(julianDay, geoPos, atmosData, observerData, objectName, eventType, heliacalFlag) {
		return this.SweModule.ccall("swe_heliacal_pheno_ut", "number", [
			"number",
			"array",
			"array",
			"array",
			"string",
			"number",
			"number"
		], [
			julianDay,
			geoPos,
			atmosData,
			observerData,
			objectName,
			eventType,
			heliacalFlag
		]);
	}
	vis_limit_mag(julianDay, geoPos, atmosData, observerData, objectName, heliacalFlag) {
		return this.SweModule.ccall("swe_vis_limit_mag", "number", [
			"number",
			"array",
			"array",
			"array",
			"string",
			"number"
		], [
			julianDay,
			geoPos,
			atmosData,
			observerData,
			objectName,
			heliacalFlag
		]);
	}
	houses(julianDay, geoLat, geoLon, houseSystem) {
		const cuspsPtr = this.SweModule._malloc(104);
		const ascmcPtr = this.SweModule._malloc(80);
		this.SweModule.ccall("swe_houses", "number", [
			"number",
			"number",
			"number",
			"number",
			"pointer",
			"pointer"
		], [
			julianDay,
			geoLat,
			geoLon,
			houseSystem.charCodeAt(0),
			cuspsPtr,
			ascmcPtr
		]);
		const cusps = new Float64Array(this.SweModule.HEAPF64.buffer, cuspsPtr, 13).slice();
		const ascmc = new Float64Array(this.SweModule.HEAPF64.buffer, ascmcPtr, 10).slice();
		this.SweModule._free(cuspsPtr);
		this.SweModule._free(ascmcPtr);
		return {
			cusps,
			ascmc
		};
	}
	houses_ex(julianDay, iflag, geoLat, geoLon, houseSystem) {
		const cuspsPtr = this.SweModule._malloc(104);
		const ascmcPtr = this.SweModule._malloc(80);
		this.SweModule.ccall("swe_houses_ex", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer",
			"pointer"
		], [
			julianDay,
			iflag,
			geoLat,
			geoLon,
			houseSystem.charCodeAt(0),
			cuspsPtr,
			ascmcPtr
		]);
		const cusps = new Float64Array(this.SweModule.HEAPF64.buffer, cuspsPtr, 13).slice();
		const ascmc = new Float64Array(this.SweModule.HEAPF64.buffer, ascmcPtr, 10).slice();
		this.SweModule._free(cuspsPtr);
		this.SweModule._free(ascmcPtr);
		return {
			cusps,
			ascmc
		};
	}
	houses_ex2(julianDay, iflag, geoLat, geoLon, houseSystem) {
		const cuspsPtr = this.SweModule._malloc(104);
		const ascmcPtr = this.SweModule._malloc(80);
		this.SweModule.ccall("swe_houses_ex2", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer",
			"pointer"
		], [
			julianDay,
			iflag,
			geoLat,
			geoLon,
			houseSystem.charCodeAt(0),
			cuspsPtr,
			ascmcPtr
		]);
		const cusps = new Float64Array(this.SweModule.HEAPF64.buffer, cuspsPtr, 13).slice();
		const ascmc = new Float64Array(this.SweModule.HEAPF64.buffer, ascmcPtr, 10).slice();
		this.SweModule._free(cuspsPtr);
		this.SweModule._free(ascmcPtr);
		return {
			cusps,
			ascmc
		};
	}
	houses_armc(armc, geoLat, eps, houseSystem) {
		const cuspsPtr = this.SweModule._malloc(104);
		const ascmcPtr = this.SweModule._malloc(80);
		this.SweModule.ccall("swe_houses_armc", "number", [
			"number",
			"number",
			"number",
			"number",
			"pointer",
			"pointer"
		], [
			armc,
			geoLat,
			eps,
			houseSystem.charCodeAt(0),
			cuspsPtr,
			ascmcPtr
		]);
		const cusps = new Float64Array(this.SweModule.HEAPF64.buffer, cuspsPtr, 13).slice();
		const ascmc = new Float64Array(this.SweModule.HEAPF64.buffer, ascmcPtr, 10).slice();
		this.SweModule._free(cuspsPtr);
		this.SweModule._free(ascmcPtr);
		return {
			cusps,
			ascmc
		};
	}
	houses_armc_ex2(armc, geoLat, eps, houseSystem) {
		const cuspsPtr = this.SweModule._malloc(104);
		const ascmcPtr = this.SweModule._malloc(80);
		this.SweModule.ccall("swe_houses_armc_ex2", "number", [
			"number",
			"number",
			"number",
			"number",
			"pointer",
			"pointer"
		], [
			armc,
			geoLat,
			eps,
			houseSystem.charCodeAt(0),
			cuspsPtr,
			ascmcPtr
		]);
		const cusps = new Float64Array(this.SweModule.HEAPF64.buffer, cuspsPtr, 13).slice();
		const ascmc = new Float64Array(this.SweModule.HEAPF64.buffer, ascmcPtr, 10).slice();
		this.SweModule._free(cuspsPtr);
		this.SweModule._free(ascmcPtr);
		return {
			cusps,
			ascmc
		};
	}
	sol_eclipse_where(julianDay, flags) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_sol_eclipse_where", "number", [
			"number",
			"number",
			"pointer"
		], [
			julianDay,
			flags,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	lun_occult_where(julianDay, planet, starName, flags) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const starBuffer = this.SweModule._malloc(starName.length + 1);
		this.SweModule.stringToUTF8(starName, starBuffer, starName.length + 1);
		const retFlag = this.SweModule.ccall("swe_lun_occult_where", "number", [
			"number",
			"number",
			"pointer",
			"number",
			"pointer"
		], [
			julianDay,
			planet,
			starBuffer,
			flags,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(starBuffer);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	sol_eclipse_how(julianDay, flags, longitude, latitude, altitude) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_sol_eclipse_how", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDay,
			flags,
			longitude,
			latitude,
			altitude,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	sol_eclipse_when_loc(julianDayStart, flags, longitude, latitude, altitude, backward) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_sol_eclipse_when_loc", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDayStart,
			flags,
			longitude,
			latitude,
			altitude,
			backward,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	lun_occult_when_loc(julianDayStart, planet, starName, flags, longitude, latitude, altitude, backward) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const starBuffer = this.SweModule._malloc(starName.length + 1);
		this.SweModule.stringToUTF8(starName, starBuffer, starName.length + 1);
		const retFlag = this.SweModule.ccall("swe_lun_occult_when_loc", "number", [
			"number",
			"number",
			"pointer",
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDayStart,
			planet,
			starBuffer,
			flags,
			longitude,
			latitude,
			altitude,
			backward,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(starBuffer);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	sol_eclipse_when_glob(julianDayStart, flags, eclipseType, backward) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_sol_eclipse_when_glob", "number", [
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDayStart,
			flags,
			eclipseType,
			backward,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	lun_occult_when_glob(julianDayStart, planet, starName, flags, eclipseType, backward) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const starBuffer = this.SweModule._malloc(starName.length + 1);
		this.SweModule.stringToUTF8(starName, starBuffer, starName.length + 1);
		const retFlag = this.SweModule.ccall("swe_lun_occult_when_glob", "number", [
			"number",
			"number",
			"pointer",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDayStart,
			planet,
			starBuffer,
			flags,
			eclipseType,
			backward,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(starBuffer);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	lun_eclipse_how(julianDay, flags, longitude, latitude, altitude) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_lun_eclipse_how", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDay,
			flags,
			longitude,
			latitude,
			altitude,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	lun_eclipse_when(julianDayStart, flags, eclipseType, backward) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_lun_eclipse_when", "number", [
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDayStart,
			flags,
			eclipseType,
			backward,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	lun_eclipse_when_loc(julianDayStart, flags, longitude, latitude, altitude, backward) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_lun_eclipse_when_loc", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDayStart,
			flags,
			longitude,
			latitude,
			altitude,
			backward,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	pheno(julianDay, planet, flags) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_pheno", "number", [
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDay,
			planet,
			flags,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	pheno_ut(julianDay, planet, flags) {
		const resultPtr = this.SweModule._malloc(8 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_pheno_ut", "number", [
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDay,
			planet,
			flags,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 8);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	refrac(julianDay, geoLat, geoLon, altitude, pressure, temperature) {
		const resultPtr = this.SweModule._malloc(4 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_refrac", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDay,
			geoLat,
			geoLon,
			altitude,
			pressure,
			temperature,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 4);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	refrac_extended(julianDay, geoLat, geoLon, altitude, pressure, temperature, distance) {
		const resultPtr = this.SweModule._malloc(4 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_refrac_extended", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDay,
			geoLat,
			geoLon,
			altitude,
			pressure,
			temperature,
			distance,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 4);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	set_lapse_rate(lapseRate) {
		this.SweModule.ccall("swe_set_lapse_rate", "void", ["number"], [lapseRate]);
	}
	houses(julianDay, geoLat, geoLon, houseSystem) {
		const cuspsPtr = this.SweModule._malloc(104);
		const ascmcPtr = this.SweModule._malloc(80);
		this.SweModule.ccall("swe_houses", "number", [
			"number",
			"number",
			"number",
			"string",
			"pointer",
			"pointer"
		], [
			julianDay,
			geoLat,
			geoLon,
			houseSystem,
			cuspsPtr,
			ascmcPtr
		]);
		const cusps = new Float64Array(this.SweModule.HEAPF64.buffer, cuspsPtr, 13).slice();
		const ascmc = new Float64Array(this.SweModule.HEAPF64.buffer, ascmcPtr, 10).slice();
		this.SweModule._free(cuspsPtr);
		this.SweModule._free(ascmcPtr);
		return {
			cusps,
			ascmc
		};
	}
	azalt(tjd_ut, calc_flag, geopos, atpress, attemp, xin) {
		const xazPtr = this.SweModule._malloc(24);
		const xinPtr = this.SweModule._malloc(24);
		const geoposPtr = this.SweModule._malloc(24);
		const HEAPF64 = this.SweModule.HEAPF64;
		HEAPF64[xinPtr >> 3] = xin[0];
		HEAPF64[(xinPtr >> 3) + 1] = xin[1];
		HEAPF64[(xinPtr >> 3) + 2] = xin[2];
		HEAPF64[geoposPtr >> 3] = geopos[0];
		HEAPF64[(geoposPtr >> 3) + 1] = geopos[1];
		HEAPF64[(geoposPtr >> 3) + 2] = geopos[2];
		this.SweModule.ccall("swe_azalt", "void", [
			"number",
			"number",
			"pointer",
			"number",
			"number",
			"pointer",
			"pointer"
		], [
			tjd_ut,
			calc_flag,
			geoposPtr,
			atpress,
			attemp,
			xinPtr,
			xazPtr
		]);
		const result = {
			azimuth: HEAPF64[xazPtr >> 3],
			trueAltitude: HEAPF64[(xazPtr >> 3) + 1],
			apparentAltitude: HEAPF64[(xazPtr >> 3) + 2]
		};
		this.SweModule._free(xazPtr);
		this.SweModule._free(xinPtr);
		this.SweModule._free(geoposPtr);
		return result;
	}
	azalt_rev(tjd_ut, calc_flag, geopos, xin) {
		const xoutPtr = this.SweModule._malloc(24);
		const xinPtr = this.SweModule._malloc(24);
		const geoposPtr = this.SweModule._malloc(24);
		const HEAPF64 = this.SweModule.HEAPF64;
		HEAPF64[xinPtr >> 3] = xin[0];
		HEAPF64[(xinPtr >> 3) + 1] = xin[1];
		HEAPF64[(xinPtr >> 3) + 2] = xin[2];
		HEAPF64[geoposPtr >> 3] = geopos[0];
		HEAPF64[(geoposPtr >> 3) + 1] = geopos[1];
		HEAPF64[(geoposPtr >> 3) + 2] = geopos[2];
		this.SweModule.ccall("swe_azalt_rev", "void", [
			"number",
			"number",
			"pointer",
			"pointer",
			"pointer"
		], [
			tjd_ut,
			calc_flag,
			geoposPtr,
			xinPtr,
			xoutPtr
		]);
		const result = {
			ra: HEAPF64[xoutPtr >> 3],
			dec: HEAPF64[(xoutPtr >> 3) + 1],
			distance: HEAPF64[(xoutPtr >> 3) + 2]
		};
		this.SweModule._free(xoutPtr);
		this.SweModule._free(xinPtr);
		this.SweModule._free(geoposPtr);
		return result;
	}
	rise_trans(julianDay, planet, longitude, latitude, altitude, flags) {
		const resultPtr = this.SweModule._malloc(4 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_rise_trans", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDay,
			planet,
			longitude,
			latitude,
			altitude,
			flags,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 4);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
	rise_trans_true_hor(julianDay, planet, longitude, latitude, altitude, flags) {
		const resultPtr = this.SweModule._malloc(4 * Float64Array.BYTES_PER_ELEMENT);
		const retFlag = this.SweModule.ccall("swe_rise_trans_true_hor", "number", [
			"number",
			"number",
			"number",
			"number",
			"number",
			"number",
			"pointer"
		], [
			julianDay,
			planet,
			longitude,
			latitude,
			altitude,
			flags,
			resultPtr
		]);
		const results = new Float64Array(this.SweModule.HEAPF64.buffer, resultPtr, 4);
		this.SweModule._free(resultPtr);
		return retFlag < 0 ? null : results;
	}
};
//#endregion
export { SwissEph as t };
