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
"[externals]/better-sqlite3 [external] (better-sqlite3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("better-sqlite3", () => require("better-sqlite3"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/teklif-formu/src/lib/database.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDatabase",
    ()=>getDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
// Veritabanı dosyasının yolu
const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'products.db');
// Veritabanı bağlantısı
let db;
function getDatabase() {
    if (!db) {
        // Data klasörü yoksa oluştur
        const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
        const dataDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(dbPath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, {
                recursive: true
            });
        }
        db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__["default"](dbPath);
        // Ürünler tablosunu oluştur
        db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        code TEXT UNIQUE,
        brand TEXT,
        model TEXT,
        category TEXT,
        price REAL,
        description TEXT,
        specifications TEXT,
        stock_quantity INTEGER DEFAULT 0,
        unit TEXT DEFAULT 'adet',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Müşteriler tablosunu oluştur
        db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        company TEXT,
        address TEXT,
        tax_number TEXT,
        tax_office TEXT,
        balance REAL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Teklifler tablosunu oluştur
        db.exec(`
      CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        customer_email TEXT,
        customer_phone TEXT,
        company TEXT,
        total_amount REAL DEFAULT 0,
        status TEXT DEFAULT 'draft',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Teklif kalemleri tablosunu oluştur
        db.exec(`
      CREATE TABLE IF NOT EXISTS quote_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quote_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price REAL NOT NULL,
        total_price REAL NOT NULL,
        FOREIGN KEY (quote_id) REFERENCES quotes (id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id)
      )
    `);
        // Cari hareketler tablosunu oluştur
        db.exec(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('tahsilat', 'ödeme', 'çek', 'borç')),
        method TEXT NOT NULL CHECK(method IN ('nakit', 'kredi', 'çek', 'manuel')),
        amount REAL NOT NULL,
        description TEXT,
        verilis_tarihi TEXT,
        vade_tarihi TEXT,
        bank TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
      )
    `);
        // Eğer customers tablosunda balance kolonu yoksa ekle
        const tableInfo = db.prepare("PRAGMA table_info(customers)").all();
        const hasBalance = tableInfo.some((col)=>col.name === 'balance');
        if (!hasBalance) {
            db.exec(`ALTER TABLE customers ADD COLUMN balance REAL DEFAULT 0`);
        }
        // Tanımlı projeler tablosunu oluştur
        db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Tedarikçiler tablosunu oluştur
        db.exec(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        contact_name TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Products tablosuna supplier_id kolonu ekle (yoksa)
        const productsTableInfo = db.prepare("PRAGMA table_info(products)").all();
        const hasSupplierId = productsTableInfo.some((col)=>col.name === 'supplier_id');
        if (!hasSupplierId) {
            db.exec(`ALTER TABLE products ADD COLUMN supplier_id INTEGER REFERENCES suppliers(id)`);
        }
        // Proje grupları tablosunu oluştur (kategoriler)
        db.exec(`
      CREATE TABLE IF NOT EXISTS project_groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
      )
    `);
        // Proje ürünleri tablosunu oluştur
        db.exec(`
      CREATE TABLE IF NOT EXISTS project_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        group_id INTEGER,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity INTEGER DEFAULT 1,
        unit_price REAL DEFAULT 0,
        discount REAL DEFAULT 0,
        margin REAL DEFAULT 0,
        sales_price REAL DEFAULT 0,
        square_meters REAL DEFAULT 0,
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
        FOREIGN KEY (group_id) REFERENCES project_groups (id) ON DELETE SET NULL,
        FOREIGN KEY (product_id) REFERENCES products (id)
      )
    `);
    }
    return db;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/teklif-formu/src/lib/database.ts [app-route] (ecmascript)");
;
;
async function GET(request, { params }) {
    try {
        const { id } = await params;
        const projectId = parseInt(id);
        if (isNaN(projectId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid project ID'
            }, {
                status: 400
            });
        }
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
        // Proje bilgisi
        const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
        if (!project) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Proje bulunamadı'
            }, {
                status: 404
            });
        }
        // Proje grupları
        const groups = db.prepare('SELECT * FROM project_groups WHERE project_id = ? ORDER BY sort_order').all(projectId);
        // Proje ürünleri
        const items = db.prepare('SELECT * FROM project_items WHERE project_id = ? ORDER BY sort_order').all(projectId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ...project,
            groups,
            items
        });
    } catch (error) {
        console.error('Proje getirilirken hata:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const projectId = parseInt(id);
        if (isNaN(projectId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid project ID'
            }, {
                status: 400
            });
        }
        const body = await request.json();
        const { name, description } = body;
        if (!name?.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Proje adı gereklidir'
            }, {
                status: 400
            });
        }
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
        const result = db.prepare(`
      UPDATE projects 
      SET name = ?, description = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(name, description || null, projectId);
        if (result.changes === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Proje bulunamadı'
            }, {
                status: 404
            });
        }
        const updatedProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updatedProject);
    } catch (error) {
        console.error('Proje güncellenirken hata:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const projectId = parseInt(id);
        if (isNaN(projectId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid project ID'
            }, {
                status: 400
            });
        }
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
        const result = db.prepare('DELETE FROM projects WHERE id = ?').run(projectId);
        if (result.changes === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Proje bulunamadı'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Proje başarıyla silindi'
        });
    } catch (error) {
        console.error('Proje silinirken hata:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$teklif$2d$formu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1de806c7._.js.map