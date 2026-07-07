//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-ClIJSLbi.js
var manifest = { "0c2399c008f0faa53af1fe249e814d7fd339af0b2351bc3e63c5cfb0fb0bb3f1": {
	functionName: "getChart_createServerFn_handler",
	importer: () => import("./_ssr/chart-server-CJwHYIdl.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
