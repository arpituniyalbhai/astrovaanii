import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BL5fsJnz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chart-server-DQkIKrsH.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getChart = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("0c2399c008f0faa53af1fe249e814d7fd339af0b2351bc3e63c5cfb0fb0bb3f1"));
//#endregion
export { getChart as t };
