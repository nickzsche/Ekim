module.exports = [
"[project]/teklif-formu/.next-internal/server/app/api/projects/[id]/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/teklif-formu/src/lib/projects.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Basit dosya tabanlı (JSON) proje kaydı (ileride DB'ye taşınabilir)
__turbopack_context__.s([
    "addProject",
    ()=>addProject,
    "getAllProjects",
    ()=>getAllProjects,
    "getProjectById",
    ()=>getProjectById,
    "saveAllProjects",
    ()=>saveAllProjects
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const projectsFile = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'projects.json');
function getAllProjects() {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(projectsFile)) return [];
    const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(projectsFile, 'utf-8');
    return JSON.parse(raw);
}
function saveAllProjects(projects) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(projectsFile, JSON.stringify(projects, null, 2), 'utf-8');
}
function addProject(name, products) {
    const projects = getAllProjects();
    const newProject = {
        id: Date.now(),
        name,
        products
    };
    projects.push(newProject);
    saveAllProjects(projects);
    return newProject;
}
function getProjectById(id) {
    return getAllProjects().find((p)=>p.id === id);
}
}),
"[project]/teklif-formu/src/app/api/projects/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$projects$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/src/lib/projects.ts [app-route] (ecmascript)");
;
;
async function GET(req, { params }) {
    const id = Number(params.id);
    const project = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$projects$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProjectById"])(id);
    if (!project) return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Proje bulunamadı'
    }, {
        status: 404
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(project);
}
async function PUT(req, { params }) {
    const id = Number(params.id);
    const { name, products } = await req.json();
    if (!name || !Array.isArray(products)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Eksik veri'
        }, {
            status: 400
        });
    }
    const projects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$projects$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllProjects"])();
    const idx = projects.findIndex((p)=>p.id === id);
    if (idx === -1) return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Proje bulunamadı'
    }, {
        status: 404
    });
    projects[idx] = {
        ...projects[idx],
        name,
        products: products
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$projects$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveAllProjects"])(projects);
    return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(projects[idx]);
}
async function DELETE(req, { params }) {
    const id = Number(params.id);
    const projects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$projects$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllProjects"])();
    const idx = projects.findIndex((p)=>p.id === id);
    if (idx === -1) return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Proje bulunamadı'
    }, {
        status: 404
    });
    const deleted = projects.splice(idx, 1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$projects$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveAllProjects"])(projects);
    return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(deleted[0]);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1a3c9b96._.js.map