module.exports = [
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[turbopack]_browser_dev_hmr-client_hmr-client_ts_818f0fdf._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack]/browser/dev/hmr-client/hmr-client.ts [app-ssr] (ecmascript)");
    });
});
}),
"[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_47e513c7._.js",
  "server/chunks/ssr/node_modules_b2cbefa4._.js",
  "server/chunks/ssr/[externals]_module_aa10390c._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-ssr] (ecmascript)");
    });
});
}),
];